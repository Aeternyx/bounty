// gml
// classes and enums
/* globals obj_stats, obj_travel_button, obj_travel_reset */
// functions and stuff
/* globals button_create */

class TravelMain extends GMLObject {
  create() {
    super.create()
    let self = this
    self.inst = null
    self.level = obj_stats.stage_tier
    self.obj = obj_travel_button
    self.yy = self.y
    if (obj_stats.timeline === 1 && obj_stats.stage_tier === 4 && obj_stats.stage === 5) {
      button_create.call(self, self.x, self.yy)
      self.inst.type = 14
      self.inst.level = obj_stats.loc_1_type
      self.inst.price = 100 * (self.level + 0.1) * obj_stats.loc_1_dist
      self.inst.text = "Travel"
      self.inst.town = 14
      obj_stats.loc_1_type = 14
      obj_stats.loc_1_name = "Olyvia"
    } else {
      button_create.call(self, self.x, self.yy)
      self.inst.type = 1
      self.inst.level = obj_stats.loc_1_type
      self.inst.price = 100 * (self.level / 10) * obj_stats.loc_1_dist
      self.inst.text = "Travel"
      self.inst.town = 1
      button_create.call(self, self.x, self.yy)
      self.inst.type = 2
      self.inst.level = obj_stats.loc_2_type
      self.inst.price = 100 * (self.level / 10) * obj_stats.loc_2_dist
      self.inst.text = "Travel"
      self.inst.town = 1
      button_create.call(self, self.x, self.yy)
      self.inst.type = 3
      self.inst.level = obj_stats.loc_3_type
      self.inst.price = 100 * (self.level / 10) * obj_stats.loc_3_dist
      self.inst.text = "Travel"
      self.inst.town = 1
      self.obj = obj_travel_reset
      button_create.call(self, self.x, self.yy)
      self.inst.level = obj_stats.stage_tier
    }
    instance_destroy.call(self)
  }
}

window.classes.push(TravelMain)
window.obj_travel_main = __gml_proto_proxy(TravelMain.prototype)
