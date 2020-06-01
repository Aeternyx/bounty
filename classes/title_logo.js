// gml
// classes and enums
/* globals Fonts */

class TitleLogo extends GMLObject {
  create() {
    super.create()
    const self = this
    self.x = 320
    self.image_alpha = 0
    self.text = "Alpha 5.4"
  }
  
  // draw
  /* globals draw_set_ext, draw_set_color, draw_set_transformed, draw_set_font, draw_set_halign, draw_set_valign, draw_self, Colors */
  // draw text
  /* globals draw_text, draw_text_ext, draw_text_color, draw_text_transformed, draw_text_ext_color, draw_text_ext_transformed, draw_text_transformed_color, draw_text_ext_transformed_color, draw_highscore */
  // align
  /* globals VAligns, HAligns */
  draw() {
    const self = this
    draw_self.call(self)
    draw_set_halign(HAligns.fa_right)
    draw_set_font(Fonts.f_console)
    draw_set_color(Colors.c_white) // NOTE: added by me
    draw_text(640, 468, string(self.text))
  }
  
  step() {
    super.step()
    let self = this
    if (self.image_alpha < 1) {
      self.image_alpha += 0.01
    }
  }
}

window.classes.push(TitleLogo)
TitleLogo.prototype.depth = -10
/* globals Sprites */
TitleLogo.prototype.sprite_index = Sprites.spr_bounty_title
window.obj_title_logo = __gml_proto_proxy(TitleLogo.prototype)
