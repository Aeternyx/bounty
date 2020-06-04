// gml
// classes and enums
/* globals ButtonBase, obj_stats, MouseButtons, Rooms */
// functions and stuff
/* globals button_click, inventory_exist, inventory_add */

class StoreButton extends ButtonBase {
  step() {
    let self = this
    button_click.call(self)
    if (obj_stats.cash < self.price) {
      self.locked = true
    } else {
      self.locked = false
    }
    if (self.type === 6 && inventory_exist(self.text, 0)) {
      self.locked = true
    }
    if (self.type === 1 && self.pressed === MouseButtons.left && !self.locked) {
      obj_stats.cash -= self.price
      obj_stats.weapon_type = self.level
      obj_stats.weapon_name = self.text
      obj_stats.weapon_class = "Sword"
      self.pressed = 0
      instance_destroy.call(self)
    }
    if (self.type === 2 && self.pressed === MouseButtons.left && !self.locked) {
      obj_stats.cash -= self.price
      obj_stats.weapon_type = self.level
      obj_stats.weapon_name = self.text
      obj_stats.weapon_class = "Axe"
      self.pressed = 0
      instance_destroy.call(self)
    }
    if (self.type === 3 && self.pressed === MouseButtons.left && !self.locked) {
      obj_stats.cash -= self.price
      obj_stats.armor_top_type = self.level
      obj_stats.armor_top_name = self.text
      self.pressed = 0
      instance_destroy.call(self)
    }
    if (self.type === 4 && self.pressed === MouseButtons.left && !self.locked) {
      obj_stats.cash -= self.price
      obj_stats.armor_leg_type = self.level
      obj_stats.armor_leg_name = self.text
      self.pressed = 0
      instance_destroy.call(self)
    }
    if (self.type === 5 && self.pressed === MouseButtons.left && !self.locked) {
      obj_stats.cash -= self.price
      obj_stats.armor_foot_type = self.level
      obj_stats.armor_foot_name = self.text
      self.pressed = 0
      instance_destroy.call(self)
    }
    if (self.type === 6 && self.pressed === MouseButtons.left && !self.locked) {
      obj_stats.cash -= self.price
      inventory_add(self.text, 0)
      self.pressed = 0
    }
    if (self.type === 7 && self.pressed === MouseButtons.left && !self.locked) {
      obj_stats.cash -= self.price
      inventory_add(self.text, 1)
      self.pressed = 0
    }
  }
}

window.classes.push(StoreButton)
window.obj_store_button = __gml_proto_proxy(StoreButton.prototype)
