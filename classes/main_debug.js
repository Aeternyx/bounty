// gml
// classes and enums
/* globals ButtonBase, obj_stats, MouseButtons, Rooms */
// functions and stuff
/* globals button_click, inventory_exist, inventory_add */

class MainDebug extends ButtonBase {
  step() {
    super.step()
    let self = this
    button_click.call(self)
    self.text = "Debug"
    if (self.pressed === MouseButtons.left) {
      obj_stats.debug = true
      obj_stats.alarm[0] = 30
      room_goto(Rooms.rm_debug)
      self.pressed = 0
    }
  }
}

window.classes.push(MainDebug)
window.obj_main_debug = __gml_proto_proxy(MainDebug.prototype)
