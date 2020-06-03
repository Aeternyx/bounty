// gml
// classes and enums
/* globals obj_race_reader, obj_char_button, obj_subchar_button, Fonts, Advantages */
// functions and stuff
/* globals get_text_races */

class RaceReader extends GMLObject {
  create() {
    let self = this
    self.text = ""
    self.advantage = Advantages.none
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
    draw_text_ext(self.x, self.y, self.text, 13, 198)
  }
  
  step() {
    const self = this
    if (instance_exists(obj_char_button)) {
      obj_char_button.instances.forEach(self => {
        if (self.active) {
            obj_race_reader.advantage = self.number
            obj_race_reader.text = get_text_races(obj_race_reader.advantage)
        }
      })
    }
    if (instance_exists(obj_subchar_button)) {
      obj_subchar_button.instances.forEach(self => {
        if (self.active) {
          obj_race_reader.advantage = self.number
          obj_race_reader.text = get_text_races(obj_race_reader.advantage)
        }
      })
    }
  }
}

window.classes.push(RaceReader)
window.obj_race_reader = __gml_proto_proxy(RaceReader.prototype)
