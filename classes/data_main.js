// GML
/* globals GMLObject */
// classes and enums
/* globals obj_stats, obj_data_save, obj_data_load, obj_data_desc, Rooms */
// functions and stuff
/* globals obj_stats, button_create */

class DataMain extends GMLObject {
  create() {
    let self = this
    self.inst = null
    self.obj = obj_data_save
    self.yy = self.y
    if (obj_stats.last_room !== Rooms.rm_start) {
      button_create.call(self, self.x, self.yy)
      self.inst.number = 1
      self.inst.text = "Save 1"
      button_create.call(self, self.x, self.yy)
      self.inst.number = 2
      self.inst.text = "Save 2"
      button_create.call(self, self.x, self.yy)
      self.inst.number = 3
      self.inst.text = "Save 3"
    }
    self.obj = obj_data_load
    self.yy = self.y
    self.x = 520
    self.inst = instance_create(self.x - 400, self.yy, obj_data_desc)
    self.inst.data = 1
    button_create.call(self, self.x, self.yy)
    self.inst.number = 1
    self.inst.text = "Load 1"
    self.inst = instance_create(self.x - 400, self.yy, obj_data_desc)
    self.inst.data = 2
    button_create.call(self, self.x, self.yy)
    self.inst.number = 2
    self.inst.text = "Load 2"
    self.inst = instance_create(self.x - 400, self.yy, obj_data_desc)
    self.inst.data = 3
    button_create.call(self, self.x, self.yy)
    self.inst.number = 3
    self.inst.text = "Load 3"
    instance_destroy.call(self)
  }
}

window.classes.push(DataMain)
window.obj_data_main = __gml_proto_proxy(DataMain.prototype)