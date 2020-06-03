// gml
// classes and enums
/* globals ButtonBase, obj_stats, MouseButtons */
// functions and stuff
/* globals button_click */

class TimelineButton extends ButtonBase {
  step() {
    let self = this
    button_click.call(self)
    if (self.pressed === MouseButtons.left) {
      obj_stats.timeline = self.number
      self.pressed = 0
    }
  }
}

window.classes.push(TimelineButton)
window.obj_timeline_button = __gml_proto_proxy(TimelineButton.prototype)
