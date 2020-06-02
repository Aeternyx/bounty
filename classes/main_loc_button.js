// gml
// classes and enums
/* globals ButtonBase, obj_stats, MouseButtons, Rooms */
// functions and stuff
/* globals button_click, room_goto */

class MainLocButton extends ButtonBase {
  step() {
    super.step()
    let self = this
    button_click.call(self)
    if (self.no_use) {
      self.locked = true
    } else if (self.pressed === MouseButtons.left) {
      obj_stats.location_now = string(self.number)
      room_goto(Rooms.rm_location)
      self.pressed = 0
    }
  }
}

window.classes.push(MainLocButton)
window.obj_main_loc_button = __gml_proto_proxy(MainLocButton.prototype)
