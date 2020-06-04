// gml
/* globals GMLObject */
// classes and enums
/* globals ButtonBase, obj_overview_button */
// functions and stuff
/* globals button_create */

class OverviewMain extends GMLObject {
  create() {
    const self = this
    self.inst = null
    self.obj = obj_overview_button
    self.yy = self.y + 40
    button_create.call(self, self.x, self.yy)
    self.inst.number = "Eye Color"
    self.inst.text = "Eye Color"
    button_create.call(self, self.x, self.yy)
    self.inst.number = "Skin Color"
    self.inst.text = "Skin Color"
    button_create.call(self, self.x, self.yy)
    self.inst.number = "Height"
    self.inst.text = "Height"
    button_create.call(self, self.x, self.yy)
    self.inst.number = "Weight"
    self.inst.text = "Weight"
    button_create.call(self, self.x, self.yy)
    self.inst.number = "Other"
    self.inst.text = "Other"
    if (get_race(Races.elf) || get_race(Races.goblin) || get_race(Races.orc)) {
      button_create.call(self, self.x, self.yy)
      self.inst.number = "Racial"
      switch (obj_stats.race) {
        case Races.elf: self.inst.text = "Elf Ears"; break
        case Races.goblin: self.inst.text = "Goblin Teeth"; break
        case Races.orc: self.inst.text = "Orc Teeth"; break
      }
    }
    self.yy = self.y + 40
    button_create.call(self, self.x + 200, self.yy)
    self.inst.number = "Hair Color"
    self.inst.text = "Hair Color"
    button_create.call(self, self.x + 200, self.yy)
    self.inst.number = "Hair Length"
    self.inst.text = "Hair Length"
    button_create.call(self, self.x + 200, self.yy)
    self.inst.number = "Hair Straightness"
    self.inst.text = "Hair Straightness"
    button_create.call(self, self.x + 200, self.yy)
    self.inst.number = "Hair Style"
    self.inst.text = "Hair Style"
  }
  
  // draw
  /* globals draw_set_ext, draw_set_color, draw_set_transformed, draw_set_font, draw_set_halign, draw_set_valign, Colors */
  // draw text
  /* globals draw_text, draw_text_ext, draw_text_color, draw_text_transformed, draw_text_ext_color, draw_text_ext_transformed, draw_text_transformed_color, draw_text_ext_transformed_color, draw_highscore */
  // align
  /* globals VAligns, HAligns */
  draw() {
    const self = this
    draw_set_font(Fonts.f_header)
    draw_set_halign(HAligns.fa_center)
    draw_set_valign(VAligns.fa_top)
    draw_text(self.x + 100, self.y, "Appearance")
    draw_sprite(Sprites.spr_divider, 0, self.x, self.y + 20)
    draw_text(self.x + 300, self.y, "Hair")
    draw_sprite(Sprites.spr_divider, 0, self.x + 200, self.y + 20)
  }
  
}

window.classes.push(OverviewMain)
window.obj_overview_main = __gml_proto_proxy(OverviewMain.prototype)
