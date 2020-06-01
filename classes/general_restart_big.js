// gml
// classes and enums
/* globals ButtonBase, obj_stats, Rooms, MouseButtons */
// functions and stuff
/* globals button_click */

class GeneralRestartBig extends ButtonBase {
  step() {
    super.step()
    let self = this
    button_click.call(self)
    if (obj_stats.last_room !== Rooms.rm_main) {
      instance_destroy.call(self)
    }
    self.text = "Quit Game"
    if (self.pressed === MouseButtons.left) {
      game_restart()
    }
  }
}

window.classes.push(GeneralRestartBig)
window.obj_general_restart_big = __gml_proto_proxy(GeneralRestartBig.prototype)
