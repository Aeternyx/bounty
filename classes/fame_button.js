// gml
// classes and enums
/* globals ButtonBase, obj_stats, Fonts, Sprites, MouseButtons */
// functions and stuff
/* globals button_click */

class FameButton extends ButtonBase {
  step() {
    let self = this
    button_click.call(self)
    if (self.number === "Free") {
      self.locked = true
    }
    let i
    if (self.pressed === MouseButtons.left && obj_stats.fame_current > 0 || self.pressed === MouseButtons.right && obj_stats.fame_current < obj_stats.fame) {
      if (self.pressed === MouseButtons.left) {
        i = 1
      } else {
        i = -1
      }
      switch (self.number) {
        case "Renown":
          if (obj_stats.fame_renown + i >= 0 && obj_stats.fame_renown + i < 10) {
            obj_stats.fame_renown += i
            obj_stats.fame_current -= i
          }
          break
        case "Value":
          if (obj_stats.fame_value + i >= 0 && obj_stats.fame_value + i < 10) {
            obj_stats.fame_value += i
            obj_stats.fame_current -= i
          }
          break
        case "Allure":
          if (obj_stats.fame_allure + i >= 0 && obj_stats.fame_allure + i < 10) {
            obj_stats.fame_allure += i
            obj_stats.fame_current -= i
          }
          break
      }
      self.pressed = 0
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
    let xx = self.x + 100
    let yy = self.y
    let i = 0
    let spr = 3
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
    if (self.number !== "Free") {
      draw_sprite(self.sprite_index, self.pressed ? 1 : 0, self.x, self.y)
    }
    draw_text(self.x + 50, self.y + 20, string(self.text))
    switch (self.number) {
      case "Renown": i = obj_stats.fame_renown; spr = 0; break
      case "Value": i = obj_stats.fame_value; spr = 1; break
      case "Allure": i = obj_stats.fame_allure; spr = 2; break
      case "Free": i = obj_stats.fame_current; spr = 3; break
    }
    for (; i > 0; i--) {
      draw_sprite(Sprites.spr_star, spr, xx, yy)
      xx += 10
      if (yy === self.y) {
        yy = self.y + 10
      } else {
        yy = self.y
      }
    }
  }
}

window.classes.push(FameButton)
/* globals sprites */
FameButton.prototype.sprite_index = Sprites.spr_button_small
window.obj_fame_button = __gml_proto_proxy(FameButton.prototype)
