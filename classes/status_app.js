// gml
// classes and enums
/* globals ButtonBase, MouseButtons, Rooms */
// functions and stuff
/* globals button_click, room_goto */

class StatusApp extends ButtonBase {
  step() {
    let self = this
    button_click.call(self)
    self.text = "Appearance"
    if (self.pressed === MouseButtons.left) {
      room_goto(Rooms.rm_appearance)
      self.pressed = 0
    }
  }
}

window.classes.push(StatusApp)
window.obj_status_app = __gml_proto_proxy(StatusApp.prototype)
