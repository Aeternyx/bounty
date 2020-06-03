// gml
// classes and enums
/* globals ButtonBase, MouseButtons */
// functions and stuff
/* globals button_click */

class GeneralNext extends ButtonBase {
  step() {
    const self = this
    button_click.call(self)
    self.text = "Next"
    if (self.pressed === MouseButtons.left) {
      room_goto_next()
      self.pressed = 0
    }
  }
}

window.classes.push(GeneralNext)
/* globals Sprites */
GeneralNext.prototype.sprite_index = Sprites.spr_button_round
window.obj_general_next = __gml_proto_proxy(GeneralNext.prototype)
