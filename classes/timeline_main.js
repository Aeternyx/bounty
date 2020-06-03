// gml
// classes and enums
/* globals obj_timeline_button */
// functions and stuff
/* globals button_create */

class TimelineMain extends GMLObject {
  create() {
    let self = this
    self.inst = null
    self.obj = obj_timeline_button
    self.yy = self.y
    button_create.call(self, self.x, self.yy)
    self.inst.text = "1140EE"
    self.inst.text2 = "Normal"
    self.inst.number = 1
    instance_destroy.call(self)
  }
}

window.classes.push(TimelineMain)
window.obj_timeline_main = __gml_proto_proxy(TimelineMain.prototype)
