// GML
// classes and enums
/* globals ButtonBase, Advantages, MouseButtons */
// functions and stuff
/* globals button_click, advantage_exist, advantage_add */

class AdvButton extends ButtonBase {
  step() {
    let self = this
    button_click.call(self)
    self.locked = true
    if (advantage_exist(Advantages.free) && !advantage_exist(self.number)) {
      self.locked = false
    }
    if (self.pressed === MouseButtons.left && !self.locked) {
      advantage_add(self.number)
      room_restart()
    }
  }
}

window.classes.push(AdvButton)
window.obj_adv_button = __gml_proto_proxy(AdvButton.prototype)
