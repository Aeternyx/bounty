// gml
// classes and enums
/* globals obj_timeline_button, obj_timeline_reader, Fonts */
// functions and stuff
/* globals get_text_timeline */

class TimelineReader extends GMLObject {
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
    draw_text_ext(self.x, self.y, self.text, 14, 390)
  }
  
  step() {
    let self = this
    obj_timeline_button.instances.forEach(step => {
      if (self.active) {
        obj_timeline_reader.type = self.number
      }
    })
    self.text = get_text_timeline(self.type)
  }
}

window.classes.push(TimelineReader)
window.obj_timeline_reader = __gml_proto_proxy(TimelineReader.prototype)
