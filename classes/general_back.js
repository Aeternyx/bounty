// gml
// classes and enums
/* globals ButtonBase, MouseButtons */
// functions and stuff
/* globals button_click */

class GeneralBack extends ButtonBase {
  step() {
    let self = this
    button_click.call(self)
    self.text = "Back"
    if (self.pressed === MouseButtons.left) {
      room_goto_previous()
      self.pressed = 0
    }
  }
}

window.classes.push(GeneralBack)
/* globals Sprites */
GeneralBack.prototype.sprite_index = Sprites.spr_button_round
window.obj_general_back = __gml_proto_proxy(GeneralBack.prototype)
