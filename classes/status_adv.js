// gml
// classes and enums
/* globals ButtonBase, obj_stats, MouseButtons, Rooms, Advantages */
// functions and stuff
/* globals button_click, room_goto, advantage_exist */

class StatusAdv extends ButtonBase {
  step() {
    let self = this
    button_click.call(self)
    self.text = "Perks"
    if (self.pressed === MouseButtons.left) {
      room_goto(Rooms.rm_advantages)
      self.pressed = 0
    }
    if (advantage_exist(Advantages.free)) {
      self.glow = true
    } else {
      self.glow = false
    }
  }
}

window.classes.push(StatusAdv)
window.obj_status_adv = __gml_proto_proxy(StatusAdv.prototype)
