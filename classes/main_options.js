// gml
// classes and enums
/* globals ButtonBase, obj_stats, MouseButtons, Rooms */
// functions and stuff
/* globals button_click, room_goto */

class MainOptions extends ButtonBase {
  step() {
    super.step()
    let self = this
    button_click.call(self)
    self.text = "Options"
    if (self.pressed === MouseButtons.left) {
      room_goto(Rooms.rm_options)
      self.pressed = 0
    }
    if (obj_stats.fame_current > 0) {
      self.glow = true
    } else {
      self.glow = false
    }
  }
}

window.classes.push(MainOptions)
window.obj_main_options = __gml_proto_proxy(MainOptions.prototype)
