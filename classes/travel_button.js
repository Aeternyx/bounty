// gml
// classes and enums
/* globals ButtonBase, obj_stats, MouseButtons, Rooms */
// functions and stuff
/* globals button_click, room_goto */

class TravelButton extends ButtonBase {
  step() {
    let self = this
    button_click.call(self)
    if (obj_stats.cash < self.price) {
      self.locked = true
    } else {
      self.locked = false
    }
    if (self.type === 14 && self.pressed === MouseButtons.left && !self.locked) {
      obj_stats.cash -= self.price
      obj_stats.location_now = "Olyvia"
      room_goto(Rooms.rm_victory_1)
    } else if (self.type === 1 && self.pressed === MouseButtons.left && !self.locked) {
      obj_stats.cash -= self.price
      obj_stats.location = self.level
      obj_stats.distance = obj_stats.loc_1_dist
      obj_stats.location_name = obj_stats.loc_1_name
      obj_stats.location_trait = obj_stats.loc_1_trt
      room_goto(Rooms.rm_road)
    } else if (self.type === 2 && self.pressed === MouseButtons.left && !self.locked) {
      obj_stats.cash -= self.price
      obj_stats.location = self.level
      obj_stats.distance = obj_stats.loc_2_dist
      obj_stats.location_name = obj_stats.loc_2_name
      obj_stats.location_trait = obj_stats.loc_2_trt
      room_goto(Rooms.rm_road)
    } else if (self.type === 3 && self.pressed === MouseButtons.left && !self.locked) {
      obj_stats.cash -= self.price
      obj_stats.location = self.level
      obj_stats.distance = obj_stats.loc_3_dist
      obj_stats.location_name = obj_stats.loc_3_name
      obj_stats.location_trait = obj_stats.loc_3_trt
      room_goto(Rooms.rm_road)
    }
  }
}

window.classes.push(TravelButton)
window.obj_travel_button = __gml_proto_proxy(TravelButton.prototype)
