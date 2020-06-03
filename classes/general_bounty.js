// gml
// classes and enums
/* globals ButtonBase, MouseButtons, Rooms */
// functions and stuff
/* globals button_click, room_goto */

class GeneralBounty extends ButtonBase {
  step() {
    let self = this
    button_click.call(self)
    self.text = "Next"
    if (self.pressed === MouseButtons.left) {
      room_goto(Rooms.rm_bounty)
      self.pressed = 0
    }
  }
}

window.classes.push(GeneralBounty)
window.obj_general_bounty = __gml_proto_proxy(GeneralBounty.prototype)
