// gml
// classes and enums
/* globals obj_stats, obj_store_button, Locations */
// functions and stuff
/* globals button_create */

class StoreMain extends GMLObject {
  create() {
    let self = this
    self.inst = null
    self.level = obj_stats.stage_tier
    self.obj = obj_store_button
    self.yy = self.y
    if (obj_stats.location !== Locations.university) {
      if (obj_stats.location !== Locations.barracks) {
        button_create.call(self, self.x, self.yy)
        self.inst.type = 1 // TODO: inst enum and stuff
        self.inst.level = self.level
        self.inst.price = 50 * self.level * (self.level + 1)
      }
      if (obj_stats.location !== Locations.herbarium) {
        button_create.call(self, self.x, self.yy)
        self.inst.type = 2
        self.inst.level = self.level
        self.inst.price = 50 * self.level * (self.level + 1)
      }
    }
    button_create.call(self, self.x, self.yy)
    self.inst.type = 3
    self.inst.level = self.level
    self.inst.price = 35 * self.level * (self.level + 1)
    button_create.call(self, self.x, self.yy)
    self.inst.type = 4
    self.inst.level = self.level
    self.inst.price = 30 * self.level * (self.level + 1)
    button_create.call(self, self.x, self.yy)
    self.inst.type = 5
    self.inst.level = self.level
    self.inst.price = 30 * self.level * (self.level + 1)
    obj_store_button.instances.forEach(self => {
      self.text = get_text_equip_name(self.level, self.type)
    })
  }
  
  // draw
  /* globals draw_set_ext, draw_set_color, draw_set_transformed, draw_set_font, draw_set_halign, draw_set_valign, Colors */
  // draw text
  /* globals draw_text, draw_text_ext, draw_text_color, draw_text_transformed, draw_text_ext_color, draw_text_ext_transformed, draw_text_transformed_color, draw_text_ext_transformed_color, draw_highscore */
  // align
  /* globals VAligns, HAligns */
  draw() {
    let self = this
  }
}

window.classes.push(StoreMain)
window.obj_store_main = __gml_proto_proxy(StoreMain.prototype)
