// gml
// classes and enums
/* globals ButtonBase, obj_stats, MouseButtons, Rooms, Fonts */
// functions and stuff
/* globals button_click, advantage_exist */

class OptionButton extends ButtonBase {
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
    draw_text(self.x + 50, self.y + 10, string(self.text))
    draw_text(self.x + 50, self.y + 25, string(self.text2))
  }
  
  step() {
    super.step()
    let self = this
    button_click.call(self)
    if (self.pressed === MouseButtons.left || self.pressed === MouseButtons.right) {
      let i
      if (self.pressed === MouseButtons.left) {
        i = 1
      } else {
        i = -1
      }
      switch (self.number) {
        case "Vaginal":
          obj_stats.o_vaginal += i
          if (obj_stats.o_vaginal === 5) {
            obj_stats.o_vaginal = 1
          } else if (obj_stats.o_vaginal === 0) {
            obj_stats.o_vaginal = 4
          }
          break
        case "Anal":
          obj_stats.o_anal += i
          if (obj_stats.o_anal === 5) {
            obj_stats.o_anal = 1
          } else if (obj_stats.o_anal === 0) {
            obj_stats.o_anal = 4
          }
          break
        case "Oral":
          obj_stats.o_oral += i
          if (obj_stats.o_oral === 5) {
            obj_stats.o_oral = 1
          } else if (obj_stats.o_oral === 0) {
            obj_stats.o_oral = 4
          }
          break
        case "Hands":
          obj_stats.o_hands += i
          if (obj_stats.o_hands === 4) {
            obj_stats.o_hands = 1
          } else if (obj_stats.o_hands === 0) {
            obj_stats.o_hands = 3
          }
          break
        case "Gangbang":
          obj_stats.o_gangbang += i
          if (obj_stats.o_gangbang === 4) {
            obj_stats.o_gangbang = 1
          } else if (obj_stats.o_gangbang === 0) {
            obj_stats.o_gangbang = 3
          }
          break
        case "Price":
          obj_stats.o_price += i
          if (obj_stats.o_price === 4) {
            obj_stats.o_price = 1
          } else if (obj_stats.o_price === 0) {
            obj_stats.o_price = 3
          }
          break
        case "Safety":
          obj_stats.o_safety += i
          if (obj_stats.o_safety === 4) {
            obj_stats.o_safety = 1
          } else if (obj_stats.o_safety === 0) {
            obj_stats.o_safety = 3
          }
          break
      }
      self.pressed = 0
    }
    switch (self.number) {
      case "Vaginal":
        switch (obj_stats.o_vaginal) {
          case 1: self.text2 = "Resist"; break
          case 2: self.text2 = "Decline"; break
          case 3: self.text2 = "Accept"; break
          case 4: self.text2 = "Inside"; break
        }
        break
      case "Anal":
        switch (obj_stats.o_anal) {
          case 1: self.text2 = "Resist"; break
          case 2: self.text2 = "Decline"; break
          case 3: self.text2 = "Accept"; break
          case 4: self.text2 = "Inside"; break
        }
        break
      case "Oral":
        switch (obj_stats.o_oral) {
          case 1: self.text2 = "Resist"; break
          case 2: self.text2 = "Decline"; break
          case 3: self.text2 = "Accept"; break
          case 4: self.text2 = "Inside"; break
        }
        break
      case "Hands":
        switch (obj_stats.o_hands) {
          case 1: self.text2 = "Resist"; break
          case 2: self.text2 = "Decline"; break
          case 3: self.text2 = "Accept"; break
        }
        break
      case "Gangbang":
        switch (obj_stats.o_gangbang) {
          case 1: self.text2 = "Resist"; break
          case 2: self.text2 = "Decline"; break
          case 3: self.text2 = "Accept"; break
        }
        break
      case "Price":
        switch (obj_stats.o_price) {
          case 1: self.text2 = "Cheap"; break
          case 2: self.text2 = "Standard"; break
          case 3: self.text2 = "Expensive"; break
        }
        break
      case "Safety":
        switch (obj_stats.o_safety) {
          case 1: self.text2 = "Low"; break
          case 2: self.text2 = "Normal"; break
          case 3: self.text2 = "High"; break
        }
        break
    }
  }
}

window.classes.push(OptionButton)
/* globals sprites */
OptionButton.prototype.sprite_index = Sprites.spr_button_small
window.obj_option_button = __gml_proto_proxy(OptionButton.prototype)
