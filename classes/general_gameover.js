// gml
// classes and enums
/* globals ButtonBase, obj_stats, MouseButtons, Rooms */
// functions and stuff
/* globals button_click, room_goto */

class GeneralGameover extends ButtonBase {
  step() {
    let self = this
    button_click.call(self)
    self.text = "Next"
    if (self.pressed === MouseButtons.left) {
      room_goto(Rooms.rm_gameover)
      self.pressed = 0
    }
  }
}

window.classes.push(GeneralGameover)
/* globals Sprites */
GeneralGameover.prototype.sprite_index = Sprites.spr_button_round
window.obj_general_gameover = __gml_proto_proxy(GeneralGameover.prototype)
