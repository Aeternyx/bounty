// gml
// classes and enums
/* globals ButtonBase, obj_stats, Rooms, MouseButtons */
// functions and stuff
/* globals button_click */

class GeneralRestart extends ButtonBase {
  step() {
    super.step()
    let self = this
    button_click.call(self)
    self.text = "Menu"
    if (self.pressed === MouseButtons.left) {
      game_restart()
    }
  }
}

window.classes.push(GeneralRestart)
/* globals Sprites */
GeneralNext.prototype.sprite_index = Sprites.spr_button_round
window.obj_general_restart = __gml_proto_proxy(GeneralRestart.prototype)
