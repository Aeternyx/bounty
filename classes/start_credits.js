// gml
// classes and enums
/* globals ButtonBase, MouseButtons, Rooms */
// functions and stuff
/* globals button_click, room_goto */

class StartCredits extends ButtonBase {
  step() {
    const self = this
    button_click.call(self)
    let i = 0
    self.text = "Credits"
    if (self.pressed === MouseButtons.left) {
      room_goto(Rooms.rm_credits)
      self.pressed = 0
    }
  }
}

window.classes.push(StartCredits)
window.obj_start_credits = __gml_proto_proxy(StartCredits.prototype)
