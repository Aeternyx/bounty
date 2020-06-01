// gml
// classes and enums
/* globals ButtonBase, MouseButtons, Rooms */
// functions and stuff
/* globals button_click, room_goto */

class StartNew extends ButtonBase {
  step() {
    super.step()
    const self = this
    button_click.call(self)
    let i = 0
    self.text = "New Game"
    if (self.pressed === MouseButtons.left) {
      // repeat 3
      for (let j = 0; j < 3; j++) {
        // NOTE: disgusting...
        randomize()
        i = random(100)
        // NOTE: also it do jack shit
      }
      room_goto(Rooms.rm_timeline)
      self.pressed = 0
    }
  }
}

window.classes.push(StartNew)
window.obj_start_new = __gml_proto_proxy(StartNew.prototype)
