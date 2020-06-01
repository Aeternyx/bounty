// GML
// classes and enums
/* globals Sprites */
// functions and stuff
/* globals obj_stats */

class Dice extends GMLObject {
  create() {
    super.create()
    const self = this
    self.image_speed = 0
    self.active = false
    self.text = "None"
    switch (obj_stats.dice_type) {
      case 1: self.sprite_index = Sprites.spr_dice; break
      case 2: self.sprite_index = Sprites.spr_dice_2; break
      case 3: self.sprite_index = Sprites.spr_dice_3; break
      case 4: self.sprite_index = Sprites.spr_dice_4; break
      case 5: self.sprite_index = Sprites.spr_dice_5; break
    }
  }
  
  step() {
    super.step()
    const self = this
    switch (obj_stats.dice_type) {
      case 1: self.sprite_index = Sprites.spr_dice; break
      case 2: self.sprite_index = Sprites.spr_dice_2; break
      case 3: self.sprite_index = Sprites.spr_dice_3; break
      case 4: self.sprite_index = Sprites.spr_dice_4; break
      // NOTE: idk why case 5 is excluded here. note the settings logic also excludes it. probs some kind of "premium" dice. but what are the conditions????...
    }
  }
  
  // draw
  /* globals draw_self, draw_set_ext, draw_set_color, draw_set_transformed, draw_set_font, draw_set_halign, draw_set_valign, Colors */
  // draw text
  /* globals draw_text, draw_text_ext, draw_text_color, draw_text_transformed, draw_text_ext_color, draw_text_ext_transformed, draw_text_transformed_color, draw_text_ext_transformed_color, draw_highscore */
  // align
  /* globals VAligns, HAligns */
  draw() {
    const self = this
    draw_self.call(self)
    if (self.active && self.text !== "None") {
      draw_set_color(Colors.c_white)
      draw_set_halign(1)
      draw_set_valign(2)
      draw_set_font(0)
      draw_text(self.x + 10, self.y - 1, string(self.text))
    }
  }
  
  // mouse10
  mouseenter() {
    super.mouseenter()
    const self = this
    self.active = true
  }
  
  // mouse11
  mouseleave() {
    super.mouseleave()
    const self = this
    self.active = false
  }
}

window.classes.push(Dice)
Dice.prototype.depth = -2
window.obj_dice = __gml_proto_proxy(Dice.prototype)
