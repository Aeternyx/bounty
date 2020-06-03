// gml
// classes and enums
/* globals obj_option_button */
// functions and stuff
/* globals button_create */

class OptionMain extends GMLObject {
  create() {
    let self = this
    self.inst = 0
    self.obj = obj_option_button
    self.yy = self.y
    button_create.call(self, self.x, self.yy)
    self.inst.number = "Vaginal"
    self.inst.text = "Vaginal"
    button_create.call(self, self.x, self.yy)
    self.inst.number = "Anal"
    self.inst.text = "Anal"
    button_create.call(self, self.x, self.yy)
    self.inst.number = "Oral"
    self.inst.text = "Oral"
    button_create.call(self, self.x, self.yy)
    self.inst.number = "Hands"
    self.inst.text = "Hands"
    button_create.call(self, self.x, self.yy)
    self.inst.number = "Gangbang"
    self.inst.text = "Gangbang"
    button_create.call(self, self.x, self.yy)
    self.inst.number = "Price"
    self.inst.text = "Price"
    button_create.call(self, self.x, self.yy)
    self.inst.number = "Safety"
    self.inst.text = "Safety"
    instance_destroy.call(self)
  }
}

window.classes.push(OptionMain)
window.obj_option_main = __gml_proto_proxy(OptionMain.prototype)
