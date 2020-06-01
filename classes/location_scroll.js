// gml
/* globals GMLObject */
// classes and enums
/* globals MouseButtons, Sprites */
// functions and stuff
/* globals button_click */

class LocationScroll extends GMLObject {
  create() {
    super.create()
    let self = this
    self.active = false
    self.pressed = 0
    self.position = 0
    self.scale = 0
    self.y_top = 40
    self.y_bot = 440
    self.y = self.y_top
  }
  
  /* globals draw_sprite, draw_sprite_ext, Colors */
  draw() {
    let self = this
    draw_sprite_ext(Sprites.spr_scroll_bar_back, 0, self.x, 240, 1, 10, 0, Colors.c_white, 1)
    draw_sprite(Sprites.spr_scroll_bar_center, 0, self.x, self.y)
  }
  
  // mouse_10
  mouseenter() {
    super.mouseenter()
    const self = this
    self.active = true
  }
  
  // mouse_11
  mouseleave() {
    super.mouseleave()
    const self = this
    self.active = false
  }
  
  step() {
    super.step()
    let self = this
    button_click.call(self)
    if (self.pressed === MouseButtons.pressed) {
      self.y = mouse_y
    }
    if (self.y < self.y_top) {
      self.y = self.y_top
    } else if (self.y > self.y_bot) {
      self.y = self.y_bot
    }
    self.position = (self.y - 40) / 4
  }
}

window.classes.push(LocationScroll)
/* globals Sprites */
LocationScroll.prototype.sprite_index = Sprites.spr_scroll_bar_center
window.obj_location_scroll = __gml_proto_proxy(LocationScroll.prototype)
