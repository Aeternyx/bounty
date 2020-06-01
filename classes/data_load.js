// GML
// classes and enums
/* globals ButtonBase, obj_stats, MouseButtons, Rooms */
// functions and stuff
/* globals button_click, room_goto, load_game */

class DataLoad extends ButtonBase {
  step() {
    super.step()
    let self = this
    button_click.call(self)
    if (self.pressed === MouseButtons.left && !self.locked) {
      obj_stats.data = self.number
      obj_stats.instances.forEach(self => {
        load_game.call(self, self.data)
      })
      room_goto(Rooms.rm_main)
      self.pressed = 0
    }
  }
}

window.classes.push(DataLoad)
/* globals Sprites */
DataLoad.prototype.sprite_index = Sprites.spr_button_small
window.obj_data_load = __gml_proto_proxy(DataLoad.prototype)