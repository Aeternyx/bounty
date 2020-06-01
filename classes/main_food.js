// gml
// classes and enums
/* globals ButtonBase, obj_stats, Fonts, MouseButtons, Sprites */
// functions and stuff
/* globals draw_cash, button_click */

class MainFood extends ButtonBase {
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
    if (self.price > 0) {
      draw_set_color(Colors.c_white)
      draw_cash(self.x + 110, self.y + 20, self.price)
    }
  }
  
  step() {
    super.step()
    let self = this
    button_click.call(self)
    self.text = "Food"
    if (obj_stats.food !== 5) {
      if (self.pressed === MouseButtons.left) {
        obj_stats.food += 1
        if (obj_stats.food === 4) {
          obj_stats.food = 1
        }
      } else if (self.pressed === MouseButtons.right) {
        obj_stats.food -= 1
        if (obj_stats.food === 0) {
          obj_stats.food = 3
        }
      }
      self.pressed = 0
    } else {
      self.locked = true
    }
    switch (obj_stats.food) {
      case 1: self.text2 = "Scarce"; self.price = 5; break
      case 2: self.text2 = "Reasonable"; self.price = 10; break
      case 3: self.text2 = "Abundant"; self.price = 30; break
      case 5: if (obj_stats.location === 2) { self.text2 = "Fruit Basket" } self.price = 0; break
    }
  }
}

window.classes.push(MainFood)
/* globals Sprites */
MainFood.prototype.sprite_index = Sprites.spr_button_small
window.obj_main_food = __gml_proto_proxy(MainFood.prototype)
