// GML
// classes and enums
/* globals ButtonBase, obj_stats, MouseButtons, Fonts */
// functions and stuff
/* globals button_click */

class ConfigButton extends ButtonBase {
  step() {
    super.step()
    let self = this
    button_click.call(self)
    let i = 0
    if (self.pressed === MouseButtons.left || self.pressed === MouseButtons.right) {
      if (self.pressed === MouseButtons.left) {
        i = 1
      } else {
        i = -1
      }
      switch (self.number) {
        case "Dice Type":
          obj_stats.dice_type += i
          if (obj_stats.dice_type === 5) {
            obj_stats.dice_type = 1
          } else if (obj_stats.dice_type === 0) {
            obj_stats.dice_type = 4
          }
          break
        case "Dice Size":
          obj_stats.dice_size += i
          if (obj_stats.dice_size === 3) {
            obj_stats.dice_size = 1
          } else if (obj_stats.dice_size === 0) {
            obj_stats.dice_size = 2
          }
          break
        case "Bar Type":
          obj_stats.bar_type += i
          if (obj_stats.bar_type === 3) {
            obj_stats.bar_type = 1
          } else if (obj_stats.bar_type === 0) {
            obj_stats.bar_type = 2
          }
          break
        case "Active Bars":
          obj_stats.bar_visible += i
          if (obj_stats.bar_visible === 5) {
            obj_stats.bar_visible = 1
          } else if (obj_stats.bar_visible === 0) {
            obj_stats.bar_visible = 4
          }
          break
        case "Window Outline":
          obj_stats.screen_outline += i
          if (obj_stats.screen_outline === 3) {
            obj_stats.screen_outline = 1
          } else if (obj_stats.screen_outline === 0) {
            obj_stats.screen_outline = 2
          }
          break
        case "Scaling":
          obj_stats.scaling += i
          if (obj_stats.scaling === 4) {
            obj_stats.scaling = 1
          } else if (obj_stats.scaling === 0) {
            obj_stats.scaling = 3
          }
          break
      }
      self.pressed = 0
    }
    switch (self.number) {
      case "Dice Type":
        switch (obj_stats.dice_type) {
          case 1: self.text2 = "Classic"; break
          case 2: self.text2 = "Bold"; break
          case 3: self.text2 = "Numeric"; break
          case 4: self.text2 = "Lovely"; break
        }
        break
      case "Dice Size":
        // TODO: i guess this needs to affect maybe dice, definitely roll_d6
        switch (obj_stats.dice_size) {
          case 1: self.text2 = "Normal"; break
          case 2: self.text2 = "Jumbo"; break
        }
        break
      case "Bar Type":
        switch (obj_stats.bar_type) {
          case 1: self.text2 = "Classic"; break
          case 2: self.text2 = "Lovely"; break
        }
        break
      case "Active Bars":
        switch (obj_stats.bar_visible) {
          case 1: self.text2 = "None"; break
          case 2: self.text2 = "Top"; break
          case 3: self.text2 = "Bottom"; break
          case 4: self.text2 = "Both"; break
        }
        break
      case "Window Outline":
        switch (obj_stats.screen_outline) {
          case 1: self.text2 = "On"; break
          case 2: self.text2 = "Off"; break
        }
        break
      case "Scaling":
        // TODO: gotta implement this shit in js. have like a little thing in the bottom right corner of the canvas i guess. and/or window resize
        // probs just window resize for now
        switch (obj_stats.scaling) {
          case 1: self.text2 = "None"; break
          case 2: self.text2 = "Aspect Ratio"; break
          case 3: self.text2 = "Stretch"; break
        }
        break
    }
  }
  
  // draw
  /* globals draw_set_ext, draw_set_color, draw_set_transformed, draw_set_font, draw_set_halign, draw_set_valign, draw_sprite, Colors */
  // draw text
  /* globals draw_text, draw_text_ext, draw_text_color, draw_text_transformed, draw_text_ext_color, draw_text_ext_transformed, draw_text_transformed_color, draw_text_ext_transformed_color, draw_highscore */
  // align
  /* globals VAligns, HAligns */
  draw() {
    let self = this
    draw_set_font(Fonts.f_button)
    draw_set_halign(HAligns.fa_center)
    draw_set_valign(VAligns.fa_middle)
    if (self.locked) {
      draw_set_color(Colors.c_gray)
    } else if (self.pressed) {
      draw_set_color(Colors.c_yellow)
    } else if (!self.pressed) {
      draw_set_color(Colors.c_white)
    }
    if (self.locked) {
      draw_sprite(self.sprite_index, 2, self.x, self.y)
    } else {
      draw_sprite(self.sprite_index, self.pressed, self.x, self.y)
    }
    draw_text(self.x + 100, self.y + 10, string(self.text))
    draw_text(self.x + 100, self.y + 25, string(self.text2))
  }
}

window.classes.push(ConfigButton)
window.obj_config_button = __gml_proto_proxy(ConfigButton.prototype)
