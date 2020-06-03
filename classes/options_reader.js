// gml
// classes and enums
/* globals obj_options_reader, obj_option_button, Fonts */
// functions and stuff
/* globals get_text_option */

class OptionsReader extends GMLObject {
  create() {
    let self = this
    self.text = ""
    self.level = 0
    self.type = 0
  }
  
  // draw
  /* globals draw_set_ext, draw_set_color, draw_set_transformed, draw_set_font, draw_set_halign, draw_set_valign, Colors */
  // draw text
  /* globals draw_text, draw_text_ext, draw_text_color, draw_text_transformed, draw_text_ext_color, draw_text_ext_transformed, draw_text_transformed_color, draw_text_ext_transformed_color, draw_highscore */
  // align
  /* globals VAligns, HAligns */
  draw() {
    let self = this
    draw_set_font(Fonts.f_console)
    draw_set_halign(HAligns.fa_left)
    draw_set_valign(VAligns.fa_top)
    draw_set_color(Colors.c_white)
    draw_text_ext(self.x, self.y, self.text, 13, 190)
  }
  
  step() {
    let self = this
    obj_option_button.instances.forEach(self => {
      if (self.active) {
        obj_options_reader.type = self.number
      }
    })
    // TODO: does the `obj_options_reader` refer to `other` here. docs say only `other` does. assuming this is singleton then
    self.text = get_text_option(self.type)
  }
}

window.classes.push(OptionsReader)
window.obj_options_reader = __gml_proto_proxy(OptionsReader.prototype)
