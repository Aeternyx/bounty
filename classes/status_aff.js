// gml
// classes and enums
/* globals ButtonBase, MouseButtons, Rooms */
// functions and stuff
/* globals button_click, room_goto */

class StatusAff extends ButtonBase {
  step() {
    let self = this
    button_click.call(self)
    self.text = "Afflictions"
    if (self.pressed === MouseButtons.left) {
      room_goto(Rooms.rm_afflictions)
      self.pressed = 0
    }
  }
}

window.classes.push(StatusAff)
window.obj_status_aff = __gml_proto_proxy(StatusAff.prototype)
