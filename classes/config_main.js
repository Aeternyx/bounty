// GML
// classes and enums
/* globals obj_config_button, obj_dice */
// functions and stuff
/* globals button_create */

class ConfigMain extends GMLObject {
  create() {
    let self = this
    let i = self.x + 220
    let ii = 0
    self.inst = null
    self.obj = obj_config_button
    self.yy = self.y
    button_create.call(self, self.x, self.yy)
    self.inst.number = "Bar Type"
    self.inst.text = "Bar Type"
    button_create.call(self, self.x, self.yy)
    self.inst.number = "Active Bars"
    self.inst.text = "Active Bars"
    // NOTE: ok yea its repeat(6)
    for (let j = 6; j > 0; j--) {
      self.inst = instance_create(i, self.yy, obj_dice)
      self.inst.image_index = ii
      ii += 1
      i += 25
    }
    button_create.call(self, self.x, self.yy)
    self.inst.number = "Dice Type"
    self.inst.text = "Dice Type"
    button_create.call(self, self.x, self.yy)
    self.inst.number = "Window Outline"
    self.inst.text = "Window Outline"
    instance_destroy.call(self)
  }
}

window.classes.push(ConfigMain)
window.obj_config_main = __gml_proto_proxy(ConfigMain.prototype)
