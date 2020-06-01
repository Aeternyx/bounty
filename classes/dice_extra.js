// gml

class DiceExtra extends GMLObject {
  create() {
    super.create()
    let self = this
  }
  
  // draw
  /* globals draw_set_ext, draw_set_color, draw_set_transformed, draw_set_font, draw_set_halign, draw_set_valign, Colors */
  // draw text
  /* globals draw_text, draw_text_ext, draw_text_color, draw_text_transformed, draw_text_ext_color, draw_text_ext_transformed, draw_text_transformed_color, draw_text_ext_transformed_color, draw_highscore */
  // align
  /* globals VAligns, HAligns */
  draw() {
    let self = this
  }
}

window.classes.push(DiceExtra)
DiceExtra.prototype.depth = -2
window.obj_dice_extra = __gml_proto_proxy(DiceExtra.prototype)
