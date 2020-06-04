// gml
/* globals GMLObject, keyboard_string */
// classes and enums
/* globals ButtonBase */

class NameInput extends GMLObject {
  create() {
    const self = this
    keyboard_string = obj_stats.name
  }
  
  // draw
  /* globals draw_set_ext, draw_set_color, draw_set_transformed, draw_set_font, draw_set_halign, draw_set_valign, Colors */
  // draw text
  /* globals draw_text, draw_text_ext, draw_text_color, draw_text_transformed, draw_text_ext_color, draw_text_ext_transformed, draw_text_transformed_color, draw_text_ext_transformed_color, draw_highscore */
  // align
  /* globals VAligns, HAligns */
  draw() {
    const self = this
    obj_stats.name = keyboard_string
    draw_self.call(self)
    draw_set_font(Fonts.f_console)
    draw_set_halign(HAligns.left)
    draw_set_valign(VAligns.top)
    draw_text(self.x, self.y - 20, "Name")
    draw_text(self.x + 5, self.y, obj_stats.name)
  }
}

window.classes.push(NameInput)
/* globals Sprites */
NameInput.prototype.sprite_index = Sprites.spr_input_bar
window.obj_name_input = __gml_proto_proxy(NameInput.prototype)
