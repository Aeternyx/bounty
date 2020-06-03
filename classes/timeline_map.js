// gml
// classes and enums
/* globals obj_stats */

class TimelineMap extends GMLObject {
  create() {
    let self = this
    self.image_speed = 0
  }
  
  step() {
    let self = this
    self.image_index = obj_stats.timeline - 1
  }
}

window.classes.push(TimelineMap)
/* globals Sprites */
TimelineMap.prototype.sprite_index = Sprites.spr_timeline_map
window.obj_timeline_map = __gml_proto_proxy(TimelineMap.prototype)
