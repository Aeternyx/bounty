// GML
// classes and enums
/* globals ButtonBase, MouseButtons */
// functions and stuff
/* globals button_click */

class EncounterRepeat extends ButtonBase {
  step() {
    const self = this
    button_click.call(self)
    self.text = "Next Encounter"
    if (self.pressed === MouseButtons.left) {
      room_restart()
      self.pressed = 0
    }
  }
}

window.classes.push(EncounterRepeat)
/* globals Sprites */
EncounterRepeat.prototype.sprite_index = Sprites.spr_button_round
window.obj_encounter_repeat = __gml_proto_proxy(EncounterRepeat.prototype)
