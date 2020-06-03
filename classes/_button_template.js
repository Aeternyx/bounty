// gml
// classes and enums
/* globals ButtonBase, MouseButtons, Rooms */
// functions and stuff
/* globals button_click, room_goto */

class  extends ButtonBase {
  step() {
    let self = this
    button_click.call(self)
    self.text = ""
    if (self.pressed === MouseButtons.left) {
      room_goto(Rooms.)
      self.pressed = 0
    }
  }
}

window.classes.push()
window.obj_ = __gml_proto_proxy(.prototype)
