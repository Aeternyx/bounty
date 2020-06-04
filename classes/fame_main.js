// gml
// classes and enums
/* globals obj_fame_button */
// functions and stuff
/* globals button_create */

class FameMain extends GMLObject {
  create() {
    let self = this
    self.inst = null
    self.obj = obj_fame_button
    self.yy = self.y
    button_create.call(self, self.x, self.yy)
    self.inst.number = "Renown"
    self.inst.text = "Renown"
    button_create.call(self, self.x, self.yy)
    self.inst.number = "Value"
    self.inst.text = "Value"
    button_create.call(self, self.x, self.yy)
    self.inst.number = "Allure"
    self.inst.text = "Allure"
    button_create.call(self, self.x, self.yy)
    self.inst.number = "Free"
    self.inst.text = "Free"
    instance_destroy.call(self)
  }
}

window.classes.push(FameMain)
window.obj_fame_main = __gml_proto_proxy(FameMain.prototype)
