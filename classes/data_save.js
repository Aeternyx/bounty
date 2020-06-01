// GML
// classes and enums
/* globals ButtonBase, obj_stats, MouseButtons, Rooms */
// functions and stuff
/* globals button_click, room_goto, save_game */

class DataSave extends ButtonBase {
  step() {
    super.step()
    let self = this
    button_click.call(self)
    if (self.pressed === MouseButtons.left) {
      obj_stats.data = self.number
      obj_stats.instances.forEach(self => {
        save_game.call(self, self.data)
      })
      room_goto(Rooms.rm_main)
      self.pressed = 0
    }
  }
}

window.classes.push(DataSave)
/* globals Sprites */
DataSave.prototype.sprite_index = Sprites.spr_button_small
window.obj_data_save = __gml_proto_proxy(DataSave.prototype)
