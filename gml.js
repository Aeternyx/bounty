const canvas = document.getElementById('gml_screen'),
  ctx = canvas.getContext('2d'),
  tcanvas = new OffscreenCanvas(0, 0),
  tctx = tcanvas.getContext('2d')
ctx.imageSmoothingEnabled = false

const classes = window.classes = []
const rooms = window.rooms = []

/* globals sheets, textures, sprites */

let __gml_draw_handle = 0,
  __gml_current_room = null,
  room = 0,
  mouse_x = 0,
  mouse_y = 0,
  old_mouse_x = 0,
  old_mouse_y = 0,
  __gml_global_variables = [],
  __gml_room_variables = [],
  fps_real = 1,
  __gml_is_stepping = false,
  __gml_to_step = [],
  room_speed = 60,
  __gml_drawgui_used = false,
  __gml_xscale = 1,
  __gml_yscale = 1,
  __gml_scale_mode = 0,
  __gml_pixelated = false,
  keyboard_string = ''

if (__gml_pixelated) {
  canvas.style.imageRendering = 'pixelated'
}

// TODO: begin rng, non-gml
let __gml_prng_c = (function () {
  function XorGen(seed) {
    var me = this;

    // Set up generator function.
    me.next = function() {
      // Update xor generator.
      var X = me.x, i = me.i, t, v, w;
      t = X[i]; t ^= (t >>> 7); v = t ^ (t << 24);
      t = X[(i + 1) & 7]; v ^= t ^ (t >>> 10);
      t = X[(i + 3) & 7]; v ^= t ^ (t >>> 3);
      t = X[(i + 4) & 7]; v ^= t ^ (t << 7);
      t = X[(i + 7) & 7]; t = t ^ (t << 13); v ^= t ^ (t << 9);
      X[i] = v;
      me.i = (i + 1) & 7;
      return v;
    };

    function init(me, seed) {
      var j, w, X = [];

      if (seed === seed | 0) {
        // Seed state array using a 32-bit integer.
        w = X[0] = seed;
      } else {
        // Seed state using a string.
        seed = '' + seed;
        for (j = 0; j < seed.length; ++j) {
          X[j & 7] = (X[j & 7] << 15) ^
              (seed.charCodeAt(j) + X[(j + 1) & 7] << 13);
        }
      }
      // Enforce an array length of 8, not all zeroes.
      while (X.length < 8) X.push(0);
      for (j = 0; j < 8 && X[j] === 0; ++j);
      if (j == 8) w = X[7] = -1; else w = X[j];

      me.x = X;
      me.i = 0;

      // Discard an initial 256 values.
      for (j = 256; j > 0; --j) {
        me.next();
      }
    }

    init(me, seed);
  }

  function copy(f, t) {
    t.x = f.x;
    t.i = f.i;
    return t;
  };

  function impl(seed, opts) {
    if (seed == null) seed = +(new Date);
    var xg = new XorGen(seed),
        state = opts && opts.state,
        prng = function() { return (xg.next() >>> 0) / ((1 << 30) * 4); };
    prng.double = function() {
      do {
        var top = xg.next() >>> 11,
            bot = (xg.next() >>> 0) / ((1 << 30) * 4),
            result = (top + bot) / (1 << 21);
      } while (result === 0);
      return result;
    };
    prng.int32 = xg.next;
    if (state) {
      if (state.X) copy(state, xg);
      prng.state = function() { return copy(xg, {}); }
    }
    return prng;
  }
  
  return impl;
})();

let __gml_prng = __gml_prng_c(0);
const UINT32_MAX = 4294967295;
const UINT32_OFFSET = 2147483648;

// end rng, non-gml

function random_set_seed(seed) {
  __gml_prng = __gml_prng_c(seed);
}

function randomize() {
  __gml_prng = __gml_prng_c();
}

// begin random
// NOTE: 32-bit ints only

function random(max) {
  return (__gml_prng.int32() + UINT32_OFFSET) * max / UINT32_MAX
}

function random_range(min, max) {
  return min + (__gml_prng.int32() + UINT32_OFFSET) * (max - min) / UINT32_MAX
}

function irandom(max) {
  let maxp1 = max + 1,
    res = max === 0 ? 0 : 1
  do {
    res = Math.floor((__gml_prng.int32() + UINT32_OFFSET) * maxp1 / UINT32_MAX)
  } while (res === max)
  return res
}

function irandom_range(min, max) {
  let deltap1 = max - min + 1,
    res = max === 0 ? 0 : 1
  do {
    res = min + Math.floor((__gml_prng.int32() + UINT32_OFFSET) * deltap1 / UINT32_MAX)
  } while (res === max)
  return res
}

// end random

// begin math

window.floor = Math.floor

window.ceil = Math.ceil

window.round = Math.round

window.abs = Math.abs

// end math

// begin string

window.string = window.String

function string_insert(bit, string, index) {
  return string.slice(0, index) + bit + string.slice(index)
}

function string_length(string) {
  return string.length
}

function string_replace_all(content, replacee, replacer) {
  return content.split(replacee).join(replacer)
}

function string_copy(str, index, count) {
  return str.slice(index - 1, index - 1 + count)
}

function string_lower(str) {
  return str.toLowerCase()
}

function string_upper(str) {
  return str.toUpperCase()
}

// end string

// begin file stuff

let __gml_ini_path = ''
let __gml_ini_contents = {}

function ini_open(path) {
  __gml_ini_path = path
  ini_open_from_string(localStorage.getItem('__gml_fs_' + info.name + '_' + path))
}

function ini_open_from_string(str) {
  if (!str) {
    return __gml_ini_contents = {}
  }
  const sectionList = str.split(/\s+(?=\[[^\]]+\])/g).map(section => section.match(/^(?:\[([^\]]+)\])([\s\S]+)/))
  let sections = {}
  for (let [_, name, contents] of sectionList) {
    const keyList = contents.trim().split(/\s+(?=.+?=.+)/g).map(line => line.match(/(.+?)=(.+)/))
    let section = sections[name] = {}
    for (let [_, key, value] of keyList) {
      section[key] = value
    }
  }
  __gml_ini_contents = sections
}

function ini_read_real(section, key, default_) {
  return +ini_read_string(section, key, default_)
}

function ini_read_string(section, key, default_) {
  let value = (__gml_ini_contents[section] || {})[key]
  return value === undefined ? default_ : value
}

function ini_write_real(section, key, value) {
  ini_write_string(section, key, value)
}

function ini_write_string(section, key, value) {
  if (__gml_ini_contents[section] === undefined)
    __gml_ini_contents[section] = {}
  __gml_ini_contents[section][key] = value.toString()
}

function ini_section_exists(section) {
  return __gml_ini_contents[section] !== undefined
}

function ini_key_exists(section, key) {
  return __gml_ini_contents[section] !== undefined && __gml_ini_contents[section][key] !== undefined
}

function ini_section_delete(section) {
  delete __gml_ini_contents[section]
}

function ini_key_delete(section, key) {
  delete __gml_ini_contents[section][key]
}

function ini_close() {
  let result = ''
  for (let section in __gml_ini_contents) {
    result += `[${section}]\n`
    let sectionObj = __gml_ini_contents[section]
    for (let key in sectionObj) {
      result += `${key}=${sectionObj[key]}\n`
    }
    result += `\n`
  }
  localStorage.setItem('__gml_fs_' + info.name + '_' + __gml_ini_path, result)
  __gml_ini_path = ''
  __gml_ini_contents = {}
  return result
}

// end file stuff

// begin obj stuff

const __baseproto = Object.getPrototypeOf(class{})

function instance_create(x, y, proto, room_start=false) {
  let clazz = proto.constructor
  let instance = new clazz()
  // TODO: i hope hoisting works
  // TODO: lmao so hacky
  while (clazz !== __baseproto) {
    clazz.instances.push(instance)
    clazz = Object.getPrototypeOf(clazz)
  }
  instance.xstart = instance.x = x
  instance.ystart = instance.y = y
  if (instance.__global) {
    __gml_global_variables.push(instance)
  } else {
    __gml_room_variables.push(instance)
  }
  if (!room_start) {
    instance.create()
  }
  if (!__gml_drawgui_used && instance.drawgui !== noop) {
    __gml_drawgui_used = true
  }
  __gml_physics_collection.add(instance)
  if (__gml_is_stepping) {
    __gml_to_step.push(instance)
  }
  return instance
}

function instance_number(obj) {
  const clazz = obj.constructor
  return clazz.instances.reduce((p, c) => p + (c.constructor === clazz), 0)
}

// TODO: __instances

function instance_destroy(instance=null) {
  // TODO: handle proxy
  if (instance === null) {
    instance = this
  }
  instance.destroy()
  __gml_physics_collection.remove(instance)
  let clazz = instance.constructor
  while (clazz !== __baseproto) {
    let instances = clazz.instances
    instances.splice(instances.indexOf(instance), 1)
    clazz = Object.getPrototypeOf(clazz)
  }
  if (instance.__global) {
    const globIndex = __gml_global_variables.indexOf(instance)
    if (globIndex > -1) {
      __gml_global_variables.splice(globIndex, 1)
    }
  } else {
    const index = __gml_room_variables.indexOf(instance)
    if (index > -1) {
      __gml_room_variables.splice(index, 1)
    }
  }
}

function instance_exists(obj) {
  return __gml_global_variables.some(obj2 => obj2 instanceof obj.constructor)  || __gml_room_variables.some(obj2 => obj2 instanceof obj.constructor)
}

function instance_change(type, call_events=false) {
  if (call_events) {
    this.destroy()
  }
  this.constructor = type.constructor
  Object.setPrototypeOf(this, type.constructor.prototype)
  if (call_events) {
    this.create()
  }
}

// end obj stuff

class PhysicsCollection {
  add(obj) { throw 'not implemented' }
  remove(obj) { throw 'not implemented' } // TODO: fix sig?
}

class ListCollection {
  constructor() {
    this.data = []
  }
  
  add(obj) {
    this.data.push(obj)
  }
  
  remove(obj) {
    const index = this.data.indexOf(obj)
    if (index !== -1) {
      this.data.splice(index, 1)
    }
  }
  
  forEach(cb) {
    this.data.forEach(cb)
  }
}

class QuadtreeCollection extends PhysicsCollection {
  constructor() {
    this.data = []
  }
  
  add(x, y, obj) {
    // TODO
  }
  
  remove(x, y, obj) {
    //
  }
}

for (const sprite of sprites) {
  if (typeof sprite.textures === 'number') {
    sprite.textures = [sprite.textures]
  }
}

const fontlookups = []

for (const font of fonts) {
  const lookup = {}
  for (const c of font.chars) {
    lookup[c.char] = c
  }
  fontlookups.push(lookup)
}

const __gml_physics_collection = new ListCollection(),
  __gml_texture_sheets = []
let __gml_alpha = 1

// begin draw stuff
// draw
/* globals draw_self, draw_set_ext, draw_set_color, draw_set_transformed, draw_set_font, draw_set_halign, draw_set_valign, draw_sprite, Colors, VAligns, HAligns */
// draw text
/* globals draw_text, draw_text_ext, draw_text_color, draw_text_transformed, draw_text_ext_color, draw_text_ext_transformed, draw_text_transformed_color, draw_text_ext_transformed_color, draw_highscore */

const Colors = window.Colors = {
  c_white: 0xffffff,
  c_silver: 0xc0c0c0,
  c_ltgray: 0xc0c0c0,
  c_gray: 0x808080,
  c_dkgray: 0x404040,
  c_black: 0x000000,
  c_aqua: 0xffff00,
  c_fuchsia: 0xff00ff,
  c_yellow: 0x00ffff,
  c_teal: 0x808000,
  c_purple: 0x800080,
  c_olive: 0x008080,
  c_red: 0x0000ff,
  c_lime: 0x00ff00,
  c_blue: 0xff0000,
  c_maroon: 0x000080,
  c_green: 0x008000,
  c_navy: 0x800000,
  c_orange: 0x40a0ff,
}

function color_get_red(color) {
  return color & 0xff
}

function color_get_green(color) {
  return (color >> 8) & 0xff
}

function color_get_blue(color) {
  return color >> 16
}

function color_get_hue(color) {
  const r = (color & 0xff) / 255,
    g = ((color >> 8) & 0xff) / 255
    b = (color >> 16) / 255
  let max = r, min = r
  if (g > max) { max = g }
  else if (g < min) { min = g }
  if (b > max) { max = b }
  else if (b < min) { min = b }
  const hue = 0
  if (min === max) {
    return 0
  }
  if (r >= g && r >= b) {
    hue = (g - b) / (max - min)
    return Math.round(hue < 0 ? hue * 255 / 6 + 255 : hue * 255 / 6)
  } else if (g >= r && g >= b) {
    hue = 2 + (b - r) / (max - min)
    return Math.round(hue < 0 ? hue * 255 / 6 + 255 : hue * 255 / 6)
  } else {
    hue = 4 + (r - g) / (max - min)
    return Math.round(hue < 0 ? hue * 255 / 6 + 255 : hue * 255 / 6)
  }
}

/* TODO:
colour_get_saturation
colour_get_value
draw_getpixel
draw_getpixel_ext
draw_get_colour
draw_get_alpha
*/

function make_color_rgb(r, g, b) {
  return b << 16 | g << 8 | r
}

function make_color_hsv(h_, s, v) {
  const c_ = v * s / 65025,
    x_ = c * (1 - Math.abs(h / 60 % 2 - 1))
    h = h_ * 360 / 255,
    m = v / 255 - c,
    c = Math.round((c_ + m) * 255),
    x = Math.round((x_ + m) * 255),
    z = Math.round(m * 255)
  switch (Math.floor(h / 60)) {
    case 0:
      return make_color_rgb(c, x, z)
    case 1:
      return make_color_rgb(x, c, z)
    case 2:
      return make_color_rgb(z, c, x)
    case 3:
      return make_color_rgb(z, x, c)
    case 4:
      return make_color_rgb(x, z, c)
    case 5:
      return make_color_rgb(c, z, x)
  }
}

function merge_color(col1, col2, amount) {
  return make_color_rgb(
    Math.round((col1 >> 16) * amount + (col2 >> 16) * (1 - amount)),
    Math.round(((col1 >> 8) & 0xff) * amount + ((col2 >> 8) & 0xff) * (1 - amount)),
    Math.round((col1 & 0xff) * amount + (col2 & 0xff) * (1 - amount))
  )
}

const VAligns = window.VAligns = {
  fa_top: 0,
  fa_middle: 1,
  fa_bottom: 2,
}

const HAligns = window.HAligns = {
  fa_left: 0,
  fa_center: 1,
  fa_right: 2,
}

const __gml_draw_config = { color: Colors.c_white, font: 0, valign: VAligns.fa_top, halign: HAligns.fa_left, ext: { sep: -1, w: -1 }, transform: { xscale: 1, yscale: 1, angle: 0 } }
// TODO: ext.sep = -1 defaults to m char height. dont cache bc font changes
// TODO: degrees not radians
// TODO: const self = this, not let

function draw_self() {
  const self = this
  GMLObject.prototype.draw.call(self)
}

function draw_set_ext(sep, w) {
  __gml_draw_config.ext = { sep, w }
}

function draw_set_color(color) {
  __gml_draw_config.color = color
}

function draw_set_transformed(xscale, yscale, angle) {
  __gml_draw_config.transform = { xscale, yscale, angle }
}

function draw_set_font(font) {
  __gml_draw_config.font = font
}

function draw_set_halign(halign) {
  __gml_draw_config.halign = halign
}

function draw_set_valign(valign) {
  __gml_draw_config.valign = valign
}

function string_height_ext(string, sep, w) {
  let font = fonts[__gml_draw_config.font],
    lookup = fontlookups[__gml_draw_config.font],
    h = sep === -1 ? lookup['M'].frame.height : sep,
    lines = string.split('#')
  if (w === -1) {
    return lines.length * h
  }
  if (w !== -1) {
    const minWidth = font.chars.reduce((p, c) => p < c.frame.width ? p : c.frame.width, 1000000000),
      maxWidth = font.chars.reduce((p, c) => p > c.frame.width ? p : c.frame.width, 0),
      minLength = Math.floor(w / maxWidth)
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      if (line.length <= minLength) {
        // can never be too long
        continue
      }
      let j = 0, width = 0
      for (; j <= minLength; j++) {
        width += lookup[line[j]].shift
      }
      for (; j < line.length; j++) {
        width += lookup[line[j]].shift
        if (width > w) {
          while (j > 0 && line[j] !== ' ') {
            j--
          }
          if (j === 0) {
            break
          }
          lines[i] = line.slice(0, j)
          lines.splice(i + 1, 0, line.slice(j + 1))
          break
        }
      }
    }
  }
  return lines.length * h
}

for (const font of fonts) {
  font.__maxWidth = font.chars.reduce((p, c) => p > c.frame.width ? p : c.frame.width, 0)
}

// TODO: lru, for if some dumbass wants rainbow text
const __gml_color_font_cache = Array(fonts.length).fill().map(() => [])

function draw_text(x, y, string) {
  const font = fonts[__gml_draw_config.font],
    lookup = fontlookups[__gml_draw_config.font],
    image = textures[font.texture],
    lines = string.split('#'),
    lineHeight = __gml_draw_config.ext.sep === -1 ? lookup['M'].frame.height : __gml_draw_config.ext.sep,
    lineWidth = __gml_draw_config.ext.w,
    height = lineHeight * lines.length
  if (1 !== __gml_alpha) { // TODO: are font alphas a thing
    ctx.globalAlpha = __gml_alpha = 1
  }
  let y2 = y
  switch (__gml_draw_config.valign) {
    case VAligns.fa_middle: y2 -= Math.ceil(height / 2); break
    case VAligns.fa_bottom: y2 -= height; break
  }
  if (lineWidth !== -1) {
    const minLength = lineWidth / font.__maxWidth
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      if (line.length <= minLength) {
        // can never be too long
        continue
      }
      let j = 0, width = 0
      for (; j <= minLength; j++) {
        width += lookup[line[j]].shift
      }
      for (; j < line.length; j++) {
        width += lookup[line[j]].shift
        if (width > lineWidth) {
          while (j > 0 && line[j] !== ' ') {
            j--
          }
          if (j === 0) {
            break
          }
          lines[i] = line.slice(0, j)
          lines.splice(i + 1, 0, line.slice(j + 1))
          break
        }
      }
    }
  }
  let sheet = __gml_texture_sheets[image.sheetid],
    bx = image.src.x,
    by = image.src.y,
    halign = __gml_draw_config.halign;
  if (__gml_draw_config.color !== 0xffffff) {
    bx = 0
    by = 0
    const cached = __gml_color_font_cache[__gml_draw_config.font][__gml_draw_config.color]
    if (cached) {
      sheet = cached
    } else {
      tcanvas.width = sheet.width
      tcanvas.height = sheet.height
      tctx.clearRect(0, 0, tcanvas.width, tcanvas.height)
      tctx.drawImage(sheet, image.src.x, image.src.y, image.src.width, image.src.height, 0, 0, image.dest.width, image.dest.height)
      const sheetData = tctx.getImageData(0, 0, image.src.width, image.src.height)
      const b = __gml_draw_config.color >> 16,
        g = (__gml_draw_config.color >> 8) & 0xff,
        r = __gml_draw_config.color & 0xff,
        data = sheetData.data
      for (let i = 0; i < data.length; i += 4) {
        data[i] *= r / 0xff;
      }
      for (let i = 1; i < data.length; i += 4) {
        data[i] *= g / 0xff;
      }
      for (let i = 2; i < data.length; i += 4) {
        data[i] *= b / 0xff;
      }
      tctx.clearRect(0, 0, tcanvas.width, tcanvas.height)
      tctx.putImageData(sheetData, 0, 0)
      sheet = __gml_color_font_cache[__gml_draw_config.font][__gml_draw_config.color] = tcanvas.transferToImageBitmap()
    }
  }
  for (let line of lines) {
    let width = Array.from(line).reduce((p, c) => p + lookup[c].shift, 0),
      x2 = x
    switch (halign) {
      case HAligns.fa_center: x2 -= Math.ceil(width / 2); break
      case HAligns.fa_right: x2 -= width; break
    }
    for (let c of line) {
      let ch = lookup[c]
      ctx.drawImage(sheet, bx + ch.frame.x, by + ch.frame.y, ch.frame.width, ch.frame.height, x2 + ch.offset, y2, ch.frame.width, ch.frame.height)
      x2 += ch.shift
    }
    y2 += lineHeight
  }
}

function draw_text_ext(x, y, string, sep, w) {
  let ext = __gml_draw_config.ext
  draw_set_ext(sep, w)
  draw_text(x, y, string)
  __gml_draw_config.ext = ext
}

function draw_text_color(x, y, string, color) {
  let color_ = __gml_draw_config.color
  draw_set_color(color)
  draw_text(x, y, string)
  __gml_draw_config.color = color_
}

function draw_text_transformed(x, y, string, xscale, yscale, angle) {
  let transformed = __gml_draw_config.transformed
  draw_set_transformed(xscale, yscale, angle)
  draw_text(x, y, string)
  __gml_draw_config.transformed = transformed
}

function draw_text_ext_color(x, y, string, sep, w, color) {
  let ext = __gml_draw_config.ext
  let color_ = __gml_draw_config.color
  draw_set_ext(sep, w)
  draw_set_color(color)
  draw_text(x, y, string)
  __gml_draw_config.ext = ext
  __gml_draw_config.color = color_
}

function draw_text_ext_transformed(x, y, string, sep, w, xscale, yscale, angle) {
  let ext = __gml_draw_config.ext
  let transformed = __gml_draw_config.transformed
  draw_set_ext(sep, w)
  draw_set_transformed(xscale, yscale, angle)
  draw_text(x, y, string)
  __gml_draw_config.ext = ext
  __gml_draw_config.transformed = transformed
}

function draw_text_transformed_color(x, y, string, xscale, yscale, angle, color) {
  let transformed = __gml_draw_config.transformed
  let color_ = __gml_draw_config.color
  draw_set_transformed(xscale, yscale, angle)
  draw_set_color(color)
  draw_text(x, y, string)
  __gml_draw_config.transformed = transformed
  __gml_draw_config.color = color_
}

function draw_text_ext_transformed_color(x, y, string, sep, w, xscale, yscale, angle, color) {
  let ext = __gml_draw_config.ext
  let transformed = __gml_draw_config.transformed
  let color_ = __gml_draw_config.color
  draw_set_ext(sep, w)
  draw_set_transformed(xscale, yscale, angle)
  draw_set_color(color)
  draw_text(x, y, string)
  __gml_draw_config.ext = ext
  __gml_draw_config.transformed = transformed
  __gml_draw_config.color = color_
}

function draw_rectangle(x, y, x2, y2, outline_only) {
  ctx.strokeStyle = `#${__gml_draw_config.color.toString(16).padStart(6, '0')}`
  if (outline_only) {
    ctx.strokeRect(x, y, x2 - x + 1, y2 - y + 1)
  } else {
    ctx.fillStyle = ctx.strokeStyle
    ctx.fillRect(x, y, x2 -  x + 1, y2 - y + 1)
  }
}

function draw_sprite(sprite_index, image_index, x, y, opts=null) {
  opts = opts || {}
  const image_alpha = 'image_alpha' in opts ? 1 : opts.image_alpha
  if (image_alpha !== __gml_alpha) {
    ctx.globalAlpha = __gml_alpha = image_alpha
  }
  const sprite = sprites[sprite_index],
    image = textures[sprite.textures[image_index]]
  if ('image_xscale' in opts || 'image_yscale' in opts) {
    x /= opts.image_xscale
    y /= opts.image_yscale
    ctx.scale(opts.image_xscale, opts.image_yscale)
    ctx.drawImage(__gml_texture_sheets[image.sheetid], image.src.x, image.src.y, image.src.width, image.src.height, x - sprite.origin.x, y - sprite.origin.y, image.dest.width, image.dest.height)
    ctx.setTransform(1, 0, 0, 1, 0, 0)
  } else {
    ctx.drawImage(__gml_texture_sheets[image.sheetid], image.src.x, image.src.y, image.src.width, image.src.height, x - sprite.origin.x, y - sprite.origin.y, image.dest.width, image.dest.height)
  }
}

function draw_sprite_ext(sprite_index, image_index, x, y, xscale, yscale, rot, color, alpha) {
  x /= xscale
  y /= yscale
  const s = Math.sin(rot * Math.PI / 180),
    c = Math.cos(rot * Math.PI / 180);
  [x, y] = [round(x * c - y * s), round(x * s + y * c)]
  ctx.scale(xscale, yscale)
  ctx.rotate(rot)
  draw_sprite(sprite_index, image_index, x, y, { image_alpha: alpha })
  ctx.setTransform(1, 0, 0, 1, 0, 0)
  // TODO
}

function draw_highscore() {
  // TODO
}

function __gml_rescale() {
  const h = window.innerHeight,
    w = window.innerWidth,
    room_ = roomdatas[room]
  switch (__gml_scale_mode) {
    case 0:
    default:
      __gml_xscale = __gml_yscale = 1
      canvas.style.width = canvas.style.height = null
      break
    case 1:
      __gml_xscale = __gml_yscale = Math.min(w / room_.size.width, h / room_.size.height)
      canvas.style.width = `${Math.round(room_.size.width * __gml_xscale)}px`
      canvas.style.height = `${Math.round(room_.size.height * __gml_yscale)}px`
      break
    case 2:
      __gml_xscale = w / room_.size.width
      __gml_yscale = h / room_.size.height
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      break
  }
}

window.addEventListener('resize', e => {
  __gml_rescale()
})

// end draw stuff

function room_goto(id, restart=false) {
  const oldRoom = __gml_current_room
  if (oldRoom !== null) {
    for (const instance of __gml_global_variables) {
      instance.roomend()
    }
    for (const instance of __gml_room_variables) {
      instance.roomend()
    }
    oldRoom.destroy(restart)
  }
  const newRoom = __gml_current_room = rooms[id]
  room = id
  room_speed = roomdatas[id].speed
  newRoom.create(restart)
  for (const instance of __gml_global_variables) {
    instance.roomstart()
  }
  for (const instance of __gml_room_variables) {
    instance.roomstart()
  }
  __gml_activate(mouse_x, mouse_y, true)
}

function room_goto_next() {
  room_goto(room + 1)
}

function room_goto_previous() {
  room_goto(room - 1)
}

function room_restart() {
  room_goto(room)
}

function game_restart() {
  room_goto(0, true)
}

class GMLObject {
  create() {}
  destroy() {}
  
  draw() {
    const self = this
    if (self.sprite_index === undefined || self.__visible === false) {
      return
    }
    draw_sprite(self.sprite_index, self.image_index, self.x, self.y, self)
  }
  
  mouseenter() {}
  mouseleave() {}
  
  roomstart() {}
  roomend() {}
  
  get alarm() {
    if (this.__alarm === null) {
      this.__alarm = []
    }
    return this.__alarm
  }
  
  set alarm(val) {
    this.__alarm = val
  }
  
  get instances() {
    if (!this.hasOwnProperty('__instances')) {
      this.__instances = []
    }
    return this.__instances
  }
  
  static get instances() {
    if (!this.hasOwnProperty('__instances')) {
      this.__instances = []
    }
    return this.__instances
  }
}

GMLObject.prototype.persistent = false
GMLObject.prototype.depth = 0
GMLObject.prototype.x = GMLObject.prototype.xstart = GMLObject.prototype.xprevious = 0
GMLObject.prototype.y = GMLObject.prototype.ystart = GMLObject.prototype.yprevious = 0
GMLObject.prototype.image_xscale = GMLObject.prototype.image_yscale = 1
GMLObject.prototype.sprite_index = 0
GMLObject.prototype.image_index = 0
GMLObject.prototype.image_alpha = 1 // TODO: shit like this
GMLObject.prototype.__alarm = null

const all = GMLObject

function sprite_get_width(sprite_index) {
  return sprites[sprite_index].size.width
}

function sprite_get_height(sprite_index) {
  return sprites[sprite_index].size.height
}

let noop = function() {}

GMLObject.prototype.beginstep = noop
GMLObject.prototype.step = noop
GMLObject.prototype.endstep = noop
GMLObject.prototype.drawgui = noop

for (let i = 0; i < 12; i++) {
  GMLObject.prototype['alarm' + i] = noop
}
for (let i = 0; i <= 0xff; i++) {
  GMLObject.prototype['keypress' + i] = noop
}
for (let i = 0; i < 8; i++) {
  GMLObject.prototype['outsideview' + i] = noop
  GMLObject.prototype['boundaryview' + i] = noop
}
for (let i = 0; i < 16; i++) {
  GMLObject.prototype['user' + i] = noop
}

// TODO: trigger alarms only if they are not noop

let __gml_left_pressed = false,
  __gml_middle_pressed = false,
  __gml_right_pressed = false,
  __gml_left_released = false,
  __gml_middle_released = false,
  __gml_right_released = false

class GMLRoom {
  draw() {
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    const oldRoom = room
    __gml_is_stepping = true
    // TODO: when are alarms supposed to run
    for (const instance of __gml_global_variables) {
      if (instance.alarm.length !== 0) {
        for (let i = 0; i < 12; i++) {
          if (instance.alarm[i]) {
            instance.alarm[i]--
            if (instance.alarm[i] === 0) {
              delete instance.alarm[i]
              switch (i) {
                case 0: instance.alarm0(); break
                case 1: instance.alarm1(); break
                case 2: instance.alarm2(); break
                case 3: instance.alarm3(); break
                case 4: instance.alarm4(); break
                case 5: instance.alarm5(); break
                case 6: instance.alarm6(); break
                case 7: instance.alarm7(); break
                case 8: instance.alarm8(); break
                case 9: instance.alarm9(); break
                case 10: instance.alarm10(); break
                case 11: instance.alarm11(); break
              }
              if (oldRoom !== room) { break }
            }
          }
        }
      }
    }
    for (const instance of __gml_room_variables) {
      if (instance.alarm.length !== 0) {
        for (let i = 0; i < 12; i++) {
          if (instance.alarm[i]) {
            instance.alarm[i]--
            if (instance.alarm[i] === 0) {
              delete instance.alarm[i]
              switch (i) {
                case 0: instance.alarm0(); break
                case 1: instance.alarm1(); break
                case 2: instance.alarm2(); break
                case 3: instance.alarm3(); break
                case 4: instance.alarm4(); break
                case 5: instance.alarm5(); break
                case 6: instance.alarm6(); break
                case 7: instance.alarm7(); break
                case 8: instance.alarm8(); break
                case 9: instance.alarm9(); break
                case 10: instance.alarm10(); break
                case 11: instance.alarm11(); break
              }
              if (oldRoom !== room) { break }
            }
          }
        }
      }
    }
    let to_step = __gml_global_variables
    while (to_step.length !== 0) {
      __gml_to_step = []
      for (const instance of to_step) {
        if (instance.beginstep === noop) { continue }
        instance.xprevious = instance.x
        instance.yprevious = instance.y
        instance.beginstep()
        if (oldRoom !== room) { break }
      }
      to_step = __gml_to_step
    }
    to_step = __gml_room_variables
    while (to_step.length !== 0) {
      __gml_to_step = []
      for (const instance of to_step) {
        if (instance.beginstep === noop) { continue }
        instance.xprevious = instance.x
        instance.yprevious = instance.y
        instance.beginstep()
        if (oldRoom !== room) { break }
      }
      to_step = __gml_to_step
    }
    to_step = __gml_global_variables
    while (to_step.length !== 0) {
      __gml_to_step = []
      for (const instance of to_step) {
        if (instance.step === noop) { continue }
        instance.step()
        if (oldRoom !== room) { break }
      }
      to_step = __gml_to_step
    }
    to_step = __gml_room_variables
    while (to_step.length !== 0) {
      __gml_to_step = []
      for (const instance of to_step) {
        if (instance.step === noop) { continue }
        instance.step()
        if (oldRoom !== room) { break }
      }
      to_step = __gml_to_step
    }
    to_step = __gml_global_variables
    while (to_step.length !== 0) {{
      __gml_to_step = []
      for (const instance of to_step) 
        if (instance.endstep === noop) { continue }
        instance.endstep()
        if (oldRoom !== room) { break }
      }
      to_step = __gml_to_step
    }
    to_step = __gml_room_variables
    while (to_step.length !== 0) {
      __gml_to_step = []
      for (const instance of to_step) {
        if (instance.endstep === noop) { continue }
        instance.endstep()
        if (oldRoom !== room) { break }
      }
      to_step = __gml_to_step
    }
    __gml_is_stepping = false
    // TODO: predraw/postdraw
    for (const instance of __gml_global_variables.sort((a, b) => b.depth - a.depth)) {
      if (instance.draw === noop) { continue }
      instance.draw()
      if (oldRoom !== room) { break }
    }
    for (const instance of __gml_room_variables.sort((a, b) => b.depth - a.depth)) {
      if (instance.draw === noop) { continue }
      instance.draw()
      if (oldRoom !== room) { break }
    }
    if (__gml_drawgui_used) {
      for (const instance of __gml_global_variables.sort((a, b) => b.depth - a.depth)) {
        if (instance.drawgui === noop) { continue }
        instance.drawgui()
        if (oldRoom !== room) { break }
      }
      for (const instance of __gml_room_variables.sort((a, b) => b.depth - a.depth)) {
        if (instance.drawgui === noop) { continue }
        instance.drawgui()
        if (oldRoom !== room) { break }
      }
    }
    __gml_left_pressed = false
    __gml_middle_pressed = false
    __gml_right_pressed = false
    __gml_left_released = false
    __gml_middle_released = false
    __gml_right_released = false
  }
  
  create(restart=false) {
    const id = rooms.indexOf(this),
      data = roomdatas[id]
    let instances = [] // NOTE: instance_create adds to current room
    // this is so all instances can be created before any create events are called
    for (const obj of data.objs) {
      instances.push(instance_create(obj.pos.x, obj.pos.y, classes[Classes[obj.obj]].prototype, true))
    }
    for (const instance of instances) {
      instance.create()
    }
  }
  
  destroy(restart=false) {
    const id = rooms.indexOf(this.constructor),
      data = roomdatas[id]
    for (const obj of __gml_room_variables.slice()) {
      if (restart || !obj.persistent) {
        instance_destroy(obj)
      }
    }
  }
}

function __gml_proto_proxy(proto) {
  let clazz = proto.constructor
  return new Proxy(proto, {
    get: function(obj, prop) {
      if (prop === 'instances') { return clazz.instances }
      if (prop === 'constructor') { return clazz }
      let obj2 = __gml_global_variables.find(obj3 => obj3 instanceof clazz)
      if (obj2 === undefined) {
        obj2 = __gml_room_variables.find(obj3 => obj3 instanceof clazz)
      }
      if (obj2 === undefined) {
        obj2 = proto
      }
      const result = obj2[prop]
      return typeof result === 'function' ? result.bind(obj2) : result
    },
    set: function(obj, prop, val) {
      if (prop === 'instances') { obj.instances = val; return true }
      if (prop === 'constructor') { obj.constructor = clazz = val; return true }
      let obj2 = __gml_global_variables.find(obj3 => obj3 instanceof clazz)
      if (obj2 === undefined) {
        obj2 = __gml_room_variables.find(obj3 => obj3 instanceof clazz)
      }
      if (obj2 === undefined) {
        obj2 = proto
      }
      obj2[prop] = val
      return true
    },
  })
}

// begin mouse stuff

canvas.addEventListener('keydown', e => {
  if (e.key.length === 1) {
    keyboard_string += e.key
    if (keyboard_string.length > 1024) {
      keyboard_string = keyboard_string.slice(keyboard_string.length - 1024)
    }
  } else if (e.keyCode === 8) {
    // backspace
    if (keyboard_string.length > 0) {
      keyboard_string = keyboard_string.slice(0, keyboard_string.length - 1)
    }
  }
  const id = 'keypress' + e.keyCode
  __gml_global_variables.forEach(obj => {
    if (obj[id] !== noop) {
      obj[id]()
    }
  })
  __gml_room_variables.forEach(obj => {
    if (obj[id] !== noop) {
      obj[id]()
    }
  })
})

canvas.addEventListener('mousedown', e => {
  switch (e.button) {
    case 0: __gml_left_pressed = true; break
    case 1: __gml_middle_pressed = true; break
    case 2: __gml_right_pressed = true; break
  }
})

canvas.addEventListener('contextmenu', e => {
  __gml_right_released = true
  e.preventDefault()
  e.stopPropagation()
})

canvas.addEventListener('mouseup', e => {
  switch (e.button) {
    case 0: __gml_left_released = true; break
    case 1: __gml_middle_released = true; break
    case 2: __gml_right_released = true; break
  }
})

function __gml_activate(ax, ay, override=false) {
  __gml_physics_collection.forEach(obj => {
    const bx = obj.x, by = obj.y
    let x = (ax - bx + sprites[obj.sprite_index].origin.x) / obj.image_xscale, y = (ay - by + sprites[obj.sprite_index].origin.y) / obj.image_yscale
    if (x >= 0 && y >= 0 && x < sprites[obj.sprite_index].size.width && y < sprites[obj.sprite_index].size.height && sprites[obj.sprite_index].colmasks.every(mask => mask.data(x, y))) {
      if (override || !obj.__active) {
        obj.__active = true
        obj.mouseenter()
      }
    } else {
      if (override || obj.__active) {
        obj.__active = false
        obj.mouseleave()
      }
    }
  })
  old_mouse_x = mouse_x
  old_mouse_y = mouse_y
}

canvas.addEventListener('mousemove', e => {
  __gml_activate(mouse_x=e.offsetX/__gml_xscale, mouse_y=e.offsetY/__gml_yscale)
})

function mouse_check_button_pressed(button) {
  let result = false
  switch (button) {
    case 1: return __gml_left_pressed
    case 2: return __gml_right_pressed
    default: return false
  }
}

function mouse_check_button_released(button) {
  let result = false
  switch (button) {
    case 1: return __gml_left_released
    case 2: return __gml_right_released
    default: return false
  }
}

// end mouse stuff

function loadit() {
  for (const [i, url] of sheets.entries()) {
    const sheet = document.createElement('img')
    sheet.src = url
    sheet.id = '__gml_sheet_' + i
    sheet.style.display = 'none' // TODO: may block loading
    __gml_texture_sheets.push(sheet)
    document.head.appendChild(sheet)
  }
}

function drawit() {
  const start = performance.now()
  __gml_current_room.draw()
  const end = performance.now()
  const newfps = 1000 / Math.max(0.01, end - start)
  fps_real = 0.9 * fps_real + 0.1 * newfps
  __gml_draw_handle = setTimeout(drawit, Math.max(0, 1000 / room_speed - (end - start)))
}

function dewit(room) {
  room_goto(room)
  __gml_rescale()
  drawit()
}

function dontdewit() {
  clearInterval(__gml_draw_handle);
}
