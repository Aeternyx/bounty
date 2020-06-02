// gml
// classes and enums
/* globals obj_store_button */
// functions and stuff
/* globals button_create, get_text_equip_name */

class LocationStore extends GMLObject {
  create() {
    super.create()
    let self = this
    self.b1_type = 0
    self.b1_name = null
    self.b1_cost = 0
    self.b2_type = 0
    self.b2_name = null
    self.b2_cost = 0
    self.b3_type = 0
    self.b3_name = null
    self.b3_cost = 0
    self.b4_type = 0
    self.b4_name = null
    self.b4_cost = 0
    self.b5_type = 0
    self.b5_name = null
    self.b5_cost = 0
    self.inst = null
    self.level = 1
    self.obj = obj_store_button
    self.yy = self.y
    // TODO: when are these > 0... they be set to 0 right above
    if (self.b1_type > 0) {
      button_create.call(self, self.x, self.yy)
      self.inst.type = self.b1_type
      self.inst.price = self.b1_cost
      self.inst.text = self.b1_name
      self.inst.level = self.level + 1
    }
    if (self.b2_type > 0) {
      button_create.call(self, self.x, self.yy)
      self.inst.type = self.b2_type
      self.inst.price = self.b2_cost
      self.inst.text = self.b2_name
      self.inst.level = self.level + 1
    }
    if (self.b3_type > 0) {
      button_create.call(self, self.x, self.yy)
      self.inst.type = self.b3_type
      self.inst.price = self.b3_cost
      self.inst.text = self.b3_name
      self.inst.level = self.level + 1
    }
    obj_store_button.instances.forEach(self => {
      if (self.type > 0 && self.type < 6) {
        self.text = get_text_equip_name(self.level, self.type)
      }
    })
    instance_destroy.call(self)
  }
}

window.classes.push(LocationStore)
window.obj_location_store = __gml_proto_proxy(LocationStore.prototype)
