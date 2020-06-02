// gml
// classes and enums
/* globals ButtonBase, obj_stats, MouseButtons, Rooms */
// functions and stuff
/* globals button_click, room_goto */

class GeneralEnd extends ButtonBase {
  step() {
    super.step()
    let self = this
    button_click.call(self)
    self.text = "End"
    if (self.pressed === MouseButtons.left) {
      obj_stats.instances.forEach(self => {
        instance_destroy.call(self)
      })
      instance_create(0, 0, obj_stats)
      room_goto(Rooms.rm_start)
      self.pressed = 0
    }
  }
}

window.classes.push(GeneralEnd)
/* globals Sprites */
GeneralEnd.prototype.sprite_index = Sprites.spr_button_round
window.obj_general_end = __gml_proto_proxy(GeneralEnd.prototype)
