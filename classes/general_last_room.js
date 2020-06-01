// gml
// classes and enums
/* globals ButtonBase, obj_stats, MouseButtons, Rooms */
// functions and stuff
/* globals button_click, room_goto, save_config */

class GeneralLastRoom extends ButtonBase {
  step() {
    super.step()
    const self = this
    button_click.call(self)
    self.text = "Back"
    if (self.pressed === MouseButtons.left) {
      if (room === Rooms.rm_config) {
        obj_stats.instances.forEach(self => {
          save_config.call(self)
        })
      }
      room_goto(obj_stats.last_room)
      self.pressed = 0
    }
  }
}

window.classes.push(GeneralLastRoom)
/* globals Sprites */
GeneralLastRoom.prototype.sprite_index = Sprites.spr_button_round
window.obj_general_last_room = __gml_proto_proxy(GeneralLastRoom.prototype)
