// GML
// classes and enums
/* globals Fonts */

class CreditsList extends GMLObject {
  create() {
    super.create()
    let self = this
    self.text = "Credits#"
    self.text += "#Developer#Captain of the Guard"
    self.text += "##Project Supporters"
    self.text += "#Elmsdor"
    self.text += "##Special thanks to everyone who has supported the project, including:"
    self.text += "#TNT90"
    self.text += "##Thank you for playing!"
  }
  
  // draw
  /* globals draw_set_ext, draw_set_color, draw_set_transformed, draw_set_font, draw_set_halign, draw_set_valign, Colors */
  // draw text
  /* globals draw_text, draw_text_ext, draw_text_color, draw_text_transformed, draw_text_ext_color, draw_text_ext_transformed, draw_text_transformed_color, draw_text_ext_transformed_color, draw_highscore */
  // align
  /* globals VAligns, HAligns */
  draw() {
    let self = this
    let xx = 320
    draw_set_color(Colors.c_white)
    draw_set_font(Fonts.f_console)
    draw_set_halign(HAligns.fa_center)
    draw_set_valign(VAligns.fa_top)
    draw_text_ext(xx, self.y, self.text, 13, 600)
  }
}

window.classes.push(CreditsList)
window.obj_credits_list = __gml_proto_proxy(CreditsList.prototype)
