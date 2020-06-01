// gml
// classes and enums
/* globals ButtonBase, MouseButtons, Rooms */
// functions and stuff
/* globals button_click, room_goto */

class RoadGotoEncounter extends ButtonBase {
  step() {
    super.step()
    let self = this
    button_click.call(self)
    self.text = "Next"
    if (self.pressed === MouseButtons.left) {
      room_goto(Rooms.rm_location)
      self.pressed = 0
    }
  }
}

window.classes.push(RoadGotoEncounter)
window.obj_road_goto_encounter = __gml_proto_proxy(RoadGotoEncounter.prototype)
