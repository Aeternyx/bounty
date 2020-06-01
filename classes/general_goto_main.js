// gml
// classes and enums
/* globals ButtonBase, obj_stats, MouseButtons, Rooms */
// functions and stuff
/* globals button_click, room_goto */

class GeneralGotoMain extends ButtonBase {
  step() {
    super.step()
    let self = this
    button_click.call(self)
    self.text = "Menu"
    if (self.pressed === MouseButtons.left) {
      room_goto(Rooms.rm_main)
      self.pressed = 0
    }
  }
}

window.classes.push(GeneralGotoMain)
/* globals Sprites */
GeneralGotoMain.prototype.sprite_index = Sprites.spr_button_round
window.obj_general_goto_main = __gml_proto_proxy(GeneralGotoMain.prototype)
