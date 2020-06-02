// gml
// classes and enums
/* globals obj_option_button */
// functions and stuff
/* globals button_create */

class DebugMain extends GMLObject {
  create() {
    super.create()
    let self = this
    self.inst = 0
    self.obj = obj_debug_button
    self.yy = self.y
    button_create.call(self, self.x, self.yy)
    self.inst.number = "Actions"
    self.inst.text = "Actions"
    button_create.call(self, self.x, self.yy)
    self.inst.number = "Fame"
    self.inst.text = "Fame"
    button_create.call(self, self.x, self.yy)
    self.inst.number = "Cash"
    self.inst.text = "Cash"
    button_create.call(self, self.x, self.yy)
    self.inst.number = "Life"
    self.inst.text = "Life"
    button_create.call(self, self.x, self.yy)
    self.inst.number = "Mood"
    self.inst.text = "Mood"
    button_create.call(self, self.x, self.yy)
    self.inst.number = "Hygiene"
    self.inst.text = "Hygiene"
    button_create.call(self, self.x, self.yy)
    self.inst.number = "Advantages"
    self.inst.text = "Advantages"
    instance_destroy.call(self)
  }
}

window.classes.push(DebugMain)
window.obj_option_main = __gml_proto_proxy(DebugMain.prototype)
