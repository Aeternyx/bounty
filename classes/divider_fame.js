// GML

class DividerFame extends GMLObject {
  // draw
  /* globals draw_self, draw_set_ext, draw_set_color, draw_set_transformed, draw_set_font, draw_set_halign, draw_set_valign, Colors */
  // draw text
  /* globals draw_text, draw_text_ext, draw_text_color, draw_text_transformed, draw_text_ext_color, draw_text_ext_transformed, draw_text_transformed_color, draw_text_ext_transformed_color, draw_highscore */
  // align
  /* globals VAligns, HAligns */
  draw() {
    let self = this
    draw_set_color(Colors.c_white)
    draw_set_font(2)
    draw_set_halign(1)
    draw_set_valign(1)
    draw_self.call(self)
    draw_text(self.x + 100, self.y - 8, "Fame")
  }
}

window.classes.push(DividerFame)
/* globals sprites */
DividerFame.prototype.sprite_index = Sprites.spr_divider
window.obj_divider_fame = __gml_proto_proxy(DividerFame.prototype)