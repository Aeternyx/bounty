// gml
// classes and enums
/* globals ButtonBase, MouseButtons */
// functions and stuff
/* globals button_click */

class OverviewFinished extends ButtonBase {
  step() {
    const self = this
    button_click.call(self)
    self.text = "Finished"
    if (self.pressed === MouseButtons.left) {
      room_goto(Rooms.rm_main)
      self.pressed = 0
    }
  }
}

window.classes.push(OverviewFinished)
/* globals Sprites */
OverviewFinished.prototype.sprite_index = Sprites.spr_button_small
window.obj_overview_finished = __gml_proto_proxy(OverviewFinished.prototype)
