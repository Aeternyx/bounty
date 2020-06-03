// gml
// classes and enums
/* globals obj_stats, obj_main_loc_button */
// functions and stuff
/* globals button_create */

class MainLocMain extends GMLObject {
  create() {
    let self = this
    self.inst = null
    self.obj = obj_main_loc_button
    self.yy = self.y
    if (obj_stats.location_1 !== "None") {
      button_create.call(self, self.x, self.yy)
      self.inst.number = obj_stats.location_1
      self.inst.text = self.inst.number
    }
    if (obj_stats.location_2 !== "None") {
      button_create.call(self, self.x, self.yy)
      self.inst.number = obj_stats.location_2
      self.inst.text = self.inst.number
    }
    if (obj_stats.location_3 !== "None") {
      button_create.call(self, self.x, self.yy)
      self.inst.number = obj_stats.location_3
      self.inst.text = self.inst.number
    }
    if (obj_stats.actions === 0) {
      obj_main_loc_button.instances.forEach(self => {
        self.no_use = true
      })
    }
    instance_destroy.call(self)
  }
}

window.classes.push(MainLocMain)
window.obj_main_loc_main = __gml_proto_proxy(MainLocMain.prototype)
