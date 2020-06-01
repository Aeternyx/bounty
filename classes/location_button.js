// gml
// classes and objects
/* globals ButtonBase, obj_stats, MouseButtons, Rooms, Fonts */
// functions and stuff
/* globals button_click, room_goto, draw_cash */

class LocationButton extends ButtonBase {
  step() {
    super.step()
    let self = this
    button_click.call(self)
    if (self.price > obj_stats.cash) {
      self.locked = true
    } else {
      self.locked = false
    }
    if (self.pressed === MouseButtons.left) {
      if (!self.locked) {
        if (self.price > 0) {
          obj_stats.cash -= self.price
        }
        let i = string(obj_stats.location_now) + " - " + string(self.number)
        obj_stats.location_now = string(i)
        if (obj_stats.actions > 0) {
          obj_stats.actions -= 1
        }
        room_goto(Rooms.rm_location)
        self.pressed = 0
      }
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
    let i = 0
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
    if (self.red) {
      draw_set_color(Colors.c_red)
    }
    if (self.locked) {
      draw_sprite(self.sprite_index, 2, self.x, self.y)
    } else {
      draw_sprite(self.sprite_index, self.pressed, self.x, self.y)
    }
    if (self.price === 0) {
      i = 20
    } else {
      i = 10
    }
    draw_text(self.x + 100, self.y + i, string(self.text))
    if (self.price > 0) {
      draw_cash(self.x + 120, self.y + 15, self.price)
    }
  }
}

window.classes.push(LocationButton)
window.obj_location_button = __gml_proto_proxy(LocationButton.prototype)
