// GML
// classes and enums
/* globals obj_store_button, obj_equip_reader, Fonts */

class EquipReader extends GMLObject {
  create() {
    let self = this
    self.text = ""
    self.level = 0
    self.type = 0
  }
  
  step() {
    let self = this
    obj_store_button.instances.forEach(self => {
      if (self.active) {
        obj_equip_reader.type = self.type
        obj_equip_reader.level = self.level
      }
    })
    self.text = get_text_equip_description(self.level, self.type)
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
    draw_text_ext(self.x, self.y, self.text, 14, 198)
  }
}

window.classes.push(EquipReader)
/* globals Sprites */
EquipReader.prototype.sprite_index = Sprites.spr_reader_block
window.obj_equip_reader = __gml_proto_proxy(EquipReader.prototype)
