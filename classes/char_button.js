// GML
// classes and enums
/* globals ButtonBase, obj_stats */
// functions and stuff
/* globals button_click */

class CharButton extends ButtonBase {
  step() {
    super.step()
    let self = this
    button_click.call(self)
    if (self.text === "") {
      self.locked = true
    }
    if (self.pressed === 2) {
      if (!self.locked) {
        let i = 3 // NOTE: useless variable lol
        obj_stats.race = self.number
        self.pressed = 0
      }
    }
  }
}

window.classes.push(CharButton)
window.obj_char_button = __gml_proto_proxy(CharButton.prototype)
