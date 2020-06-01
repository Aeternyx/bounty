// gml
// classes and enums
/* globals ButtonBase, MouseButtons, Rooms */
// functions and stuff
/* globals button_click, room_goto */

class MainData extends ButtonBase {
  step() {
    super.step()
    let self = this
    button_click.call(self)
    self.text = "Data"
    if (self.pressed === MouseButtons.left) {
      room_goto(Rooms.rm_data)
      self.pressed = 0
    }
  }
}

window.classes.push(MainData)
window.obj_main_data = __gml_proto_proxy(MainData.prototype)
