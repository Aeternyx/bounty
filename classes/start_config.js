// gml
// classes and enums
/* globals ButtonBase, MouseButtons, Rooms */
// functions and stuff
/* globals button_click, room_goto */

class StartConfig extends ButtonBase {
  step() {
    const self = this
    button_click.call(self)
    let i = 0
    self.text = "Configuration"
    if (self.pressed === MouseButtons.left) {
      room_goto(Rooms.rm_config)
      self.pressed = 0
    }
  }
}

window.classes.push(StartConfig)
window.obj_start_config = __gml_proto_proxy(StartConfig.prototype)
