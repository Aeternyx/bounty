// gml
// classes and enums
/* globals ButtonBase, MouseButtons */
// functions and stuff
/* globals button_click */

class IntroEdit extends ButtonBase {
  step() {
    let self = this
    button_click.call(self)
    self.text = "Edit"
    if (self.pressed === MouseButtons.left) {
      room_goto_previous()
      self.pressed = 0
    }
    if (obj_stats.last_room === Rooms.rm_debug) {
      instance_destroy.call(self)
    }
  }
}

window.classes.push(IntroEdit)
/* globals Sprites */
IntroEdit.prototype.sprite_index = Sprites.spr_button_small
window.obj_intro_edit = __gml_proto_proxy(IntroEdit.prototype)
