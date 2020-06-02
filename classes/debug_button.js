// gml
// classes and enums
/* globals ButtonBase, obj_stats, MouseButtons, Rooms */
// functions and stuff
/* globals button_click, inventory_exist, inventory_add */

class DebugButton extends ButtonBase {
  step() {
    super.step()
    let self = this
    button_click.call(self)
    if (self.pressed === MouseButtons.left) {
      switch (self.text) {
        case "Actions": obj_stats.keypress65(); break
        case "Fame": obj_stats.keypress70(); break
        case "Cash": obj_stats.keypress67(); break
        case "Life": obj_stats.keypress76(); break
        case "Mood": obj_stats.keypress77(); break
        case "Hygiene": obj_stats.keypress72(); break
        case "Advantages": obj_stats.keypress80(); break
      }
      self.pressed = 0
    }
  }
}

window.classes.push(DebugButton)
window.obj_debug_button = __gml_proto_proxy(DebugButton.prototype)
