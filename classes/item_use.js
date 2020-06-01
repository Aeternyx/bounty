// gml
// classes and enums
/* globals obj_stats, MouseButtons */
// functions and stuff
/* globals button_click, inventory_sub, add_fame, roll_d6, cap_stat */

class ItemUse extends GMLObject {
  create() {
    super.create()
    let self = this
    self.item = 0 // TODO: null?
    self.active = false
    self.pressed = 0
  }
  
  /* globals draw_sprite */
  draw() {
    let self = this
    draw_sprite(self.sprite_index, self.pressed, self.x, self.y)
  }
  
  // mouse_10
  mouseenter() {
    super.mouseenter()
    let self = this
    self.active = true
  }
  
  // mouse_11
  mouseleave() {
    super.mouseleave()
    let self = this
    self.active = false
  }
  
  step() {
    super.step()
    let self = this
    button_click.call(self)
    if (self.pressed === MouseButtons.left) {
      inventory_sub(self.item, 1)
      switch (self.item) {
        case "Scroll of Charm":
          add_fame(3)
          break
        case "Scroll of Rejuvenation":
          // maybe fix the cap. i guess it's intentional tho
          obj_stats.life = cap_stat(obj_stats.life, 130, roll_d6(0, "Rejuvenation", 5))
          break
        case "Tonic":
          obj_stats.bonus_health = 6
          break
      }
      room_restart()
    }
  }
}

window.classes.push(ItemUse)
/* global Sprites */
ItemUse.prototype.sprite_index = Sprites.spr_button_item_use
window.obj_item_use = __gml_proto_proxy(ItemUse.prototype)
