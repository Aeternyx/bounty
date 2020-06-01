// gml
// classes and enums
/* globals ButtonBase, obj_stats, MouseButtons, Rooms, Advantages */
// functions and stuff
/* globals button_click, room_goto, advantage_exist */

class MainTravel extends ButtonBase {
  step() {
    super.step()
    let self = this
    button_click.call(self)
    if (obj_stats.captured) {
      self.locked = true
    }
    if (obj_stats.actions === 0) {
      self.locked = true
    }
    self.text = "Travel"
    if (self.pressed === MouseButtons.left && !self.locked) {
      room_goto(Rooms.rm_travel)
      self.pressed = 0
    }
  }
}

window.classes.push(MainTravel)
window.obj_main_travel = __gml_proto_proxy(MainTravel.prototype)
