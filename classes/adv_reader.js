// GML
// classes and enums
/* globals obj_status, obj_adv_button, obj_status_mask, obj_adv_reader, Advantages, Fonts */
// functions and stuff
/* globals get_text_advantage */

class AdvReader extends GMLObject {
  create() {
    super.create()
    let self = this
    self.text = ""
    self.advantage = Advantages.none
  }
  
  step() {
    super.step()
    let self = this
    if (instance_exists(obj_adv_button)) {
      obj_adv_button.instances.forEach(self => {
        if (self.active) {
          // TODO: assuming self.active is bool
          // TODO: where tf is obj_adv_reader from. is it closest parent adv reader
          obj_adv_reader.advantage = self.number
          obj_adv_reader.text = get_text_advantage(obj_adv_reader.advantage)
        }
      })
    }
    if (instance_exists(obj_status_mask)) {
      obj_status_mask.instances.forEach(self => {
        if (self.type === 1) { // NOTE: type === advantage
          if (self.active) {
            obj_adv_reader.advantage = self.number
            obj_adv_reader.text = get_text_advantage(obj_adv_reader.advantage)
          }
          return
        } else if (self.type === 2) { // NOTE: type === inventory
          if (self.active) {
            obj_adv_reader.advantage = self.number
            obj_adv_reader.text = get_text_inventory(obj_adv_reader.advantage)
          }
          return
        }
      })
    }
  }
  
  // draw
  /* globals draw_set_ext, draw_set_color, draw_set_transformed, draw_set_font, draw_set_halign, draw_set_valign */
  // draw text
  /* globals draw_text, draw_text_ext, draw_text_color, draw_text_transformed, draw_text_ext_color, draw_text_ext_transformed, draw_text_transformed_color, draw_text_ext_transformed_color, draw_highscore */
  // align
  /* globals VAligns, HAligns */
  draw() {
    let self = this
    draw_set_font(Fonts.f_console)
    draw_set_halign(HAligns.fa_left)
    draw_set_valign(VAligns.fa_top)
    draw_set_color(0xFFFFFF)
    draw_text_ext(self.x, self.y, self.text, 14, 198)
  }
}

window.classes.push(AdvReader)
window.obj_adv_reader = __gml_proto_proxy(AdvReader.prototype)