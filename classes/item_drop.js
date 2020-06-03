// gml
// classes and enums
/* globals MouseButtons */
// functions and stuff
/* globals button_click, inventory_sub */

class ItemDrop extends GMLObject {
  create() {
    let self = this
    self.item = 0 // TODO: null?
    self.active = false
    self.pressed = 0
  }
  
  draw() {
    let self = this
    draw_sprite(self.sprite_index, self.pressed, self.x, self.y)
  }
  
  // mouse_10
  mouseenter() {
    let self = this
    self.active = true
  }
  
  // mouse_11
  mouseleave() {
    let self = this
    self.active = false
  }
  
  step() {
    let self = this
    button_click.call(self)
    if (self.pressed === MouseButtons.left) {
      inventory_sub(self.item, 1)
      room_restart()
    }
  }
}

window.classes.push(ItemDrop)
/* global Sprites */
ItemDrop.prototype.sprite_index = Sprites.spr_button_item_drop
window.obj_item_drop = __gml_proto_proxy(ItemDrop.prototype)
