// gml
// classes and enums
/* globals obj_stats */

class StatusMask extends GMLObject {
  create() {
    super.create()
    let self = this
    self.number = 0
    self.active = false
    self.image_speed = 0
  }
  
  step() {
    super.step()
    let self = this
    if (!obj_stats.debug) {
      self.image_index = 0
    } else {
      self.image_index = 1
    }
  }
  
  mouseenter() {
    super.mouseenter()
    let self = this
    self.active = true
  }
  
  mouseleave() {
    super.mouseleave()
    let self = this
    self.active = false
  }
}

window.classes.push(StatusMask)
/* global Sprites */
StatusMask.prototype.sprite_index = Sprites.spr_mask_100x13
window.obj_status_mask = __gml_proto_proxy(StatusMask.prototype)
