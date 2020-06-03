// gml
// classes and enums
/* globals ButtonBase, obj_stats, MouseButtons, Rooms, Advantages */
// functions and stuff
/* globals button_click, room_goto, advantage_exist */

class MainStore extends ButtonBase {
  step() {
    let self = this
    button_click.call(self)
    if (obj_stats.location === Rooms.rm_options) {
      instance_destroy.call(self)
    }
    self.text = "Purchase Equip"
    if (self.pressed === MouseButtons.left) {
      room_goto(Rooms.rm_store)
      self.pressed = 0
    }
  }
}

window.classes.push(MainStore)
window.obj_main_store = __gml_proto_proxy(MainStore.prototype)
