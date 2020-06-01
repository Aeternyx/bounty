// GML
// classes and enums
/* globals Fonts */
// functions and stuff
/* globals room, draw_cash, sprite_get_width, sprite_get_height */

class ButtonBase extends GMLObject {
  create() {
    super.create()
    const self = this
    self.active = 0
    self.number = 0
    self.locked = false
    self.no_use = 0
    self.glow = false
    self.red = 0
    self.require = "None"
    self.pressed = 0
    self.text = "undefined"
    self.text2 = 0
    self.type = 0
    self.level = 0
    self.price = 0
    self.town = 0
    self.b_width = sprite_get_width(self.sprite_index)
    self.b_height = sprite_get_height(self.sprite_index)
  }
  
  // draw
  /* globals draw_set_ext, draw_set_color, draw_set_transformed, draw_set_font, draw_set_halign, draw_set_valign, draw_sprite, Colors */
  // draw text
  /* globals draw_text, draw_text_ext, draw_text_color, draw_text_transformed, draw_text_ext_color, draw_text_ext_transformed, draw_text_transformed_color, draw_text_ext_transformed_color, draw_highscore */
  // align
  /* globals VAligns, HAligns */
  draw() {
    const self = this
    draw_set_font(Fonts.f_button)
    draw_set_halign(HAligns.fa_center)
    draw_set_valign(VAligns.fa_middle)
    if (self.locked) {
      draw_set_color(Colors.c_gray)
    } else if (self.pressed === 1) {
      draw_set_color(Colors.c_yellow)
    } else if (self.pressed === 0) {
      draw_set_color(Colors.c_white)
    }
    if (self.locked) {
      draw_sprite(self.sprite_index, 2, self.x, self.y)
    } else if (self.glow) {
      draw_sprite(self.sprite_index, self.pressed + 3, self.x, self.y)
    } else {
      draw_sprite(self.sprite_index, self.pressed, self.x, self.y)
    }
    switch (self.text) {
      case "Next":
      case "Next Encounter":
        draw_sprite(Sprites.spr_button_arrow, 0, self.x + (self.b_width - 40) / 2, self.y)
        break
      case "Back":
        draw_sprite(Sprites.spr_button_arrow, 1, self.x, self.y)
        break
      case "Menu":
        draw_sprite(Sprites.spr_button_arrow, 2, self.x, self.y)
        break
      default:
        draw_text(self.x + self.b_width / 2, self.y + self.b_height / 2, string(self.text))
        break
    }
    if (self.price > 0) {
      let i = 0
      draw_set_color(Colors.c_white)
      if (room === Rooms.rm_travel) {
        i = 300
      } else {
        i = 260
      }
      draw_cash(self.x + i, self.y + 20, self.price)
    }
  }
  
  // step1
  beginstep() {
    super.beginstep()
    const self = this
    self.b_width = sprite_get_width(self.sprite_index)
    self.b_height = sprite_get_height(self.sprite_index)
  }
  
  // mouse10
  mouseenter() {
    super.mouseenter()
    const self = this
    self.active = true
  }
  
  // TODO: remember to trigger mouseleave on window inactive. enter on re-active if needed
  // mouse11
  mouseleave() {
    super.mouseleave()
    let self = this
    self.active = false
  }
}

window.classes.push(ButtonBase)
/* globals Sprites */
ButtonBase.prototype.sprite_index = Sprites.spr_button
window.obj_button_base = __gml_proto_proxy(ButtonBase.prototype)