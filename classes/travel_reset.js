// gml
// classes and enums
/* globals ButtonBase, obj_stats, MouseButtons, Rooms */
// functions and stuff
/* globals button_click, town_gen */

class TravelReset extends ButtonBase {
  step() {
    super.step()
    let self = this
    button_click.call(self)
    self.text = "Reset"
    self.price = 100 * obj_stats.stage_tier / 10 * (0.75 + 0.1 * obj_stats.loc_reset)
    if (obj_stats.cash < self.price) {
      self.locked = true
    } else {
      self.locked = false
    }
    if (self.pressed === MouseButtons.left && !self.locked) {
      obj_stats.cash -= self.price
      town_gen()
      obj_stats.loc_reset += 1
      room_restart()
    }
  }
}

window.classes.push(TravelReset)
window.obj_travel_reset = __gml_proto_proxy(TravelReset.prototype)
