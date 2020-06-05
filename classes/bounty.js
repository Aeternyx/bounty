// GML
// classes and enums
/* globals Fonts */
// functions and stuff
/* globals obj_stats, get_text_bounty, roll_d6 */

class Bounty extends GMLObject {
  create() {
    let self = this
    self.gameover = 0
    self.hygiene = 0
    self.life = 0
    self.cash = 0
    self.mood = 0
    self.vag = 0
    self.vag_in = 0
    self.anal = 0
    self.anal_in = 0
    self.oral = 0
    self.oral_in = 0
    self.hands = 0
    self.gang = 0
    self.forced = false // TODO: i think its unanimously bool. so chang it everywear els
    self.text = get_text_bounty.call(self)
    if (self.vag_in === 1) { // TODO: handle >1...?
      obj_stats.xp_vaginal += 2
      self.hygiene += 4 + roll_d6(0, "Hygiene")
    }
    if (self.anal_in === 1) { // TODO: handle >1...?
      obj_stats.xp_vaginal += 2
      self.hygiene += 3 + roll_d6(0, "Hygiene")
    }
    if (self.oral_in === 1) { // TODO: handle >1...?
      obj_stats.xp_vaginal += 2
      self.hygiene += 2 + roll_d6(0, "Hygiene")
    }
    if (self.hands > 0) { // TODO: handle >1...?
      obj_stats.xp_vaginal += 2
      self.hygiene += 2 + roll_d6(0, "Hygiene")
    }
    if (self.hygiene !== 0) {
      obj_stats.hygiene -= self.hygiene
    }
    if (self.life !== 0) {
      obj_stats.life -= self.life
    }
    if (self.mood !== 0) {
      obj_stats.mood -= self.mood
    }
    if (self.gameover) {
      obj_stats.gameover = "Captured"
      obj_general_goto_main.instances.forEach(self => {
        instance_change.call(self, obj_general_gameover, true)
      })
    }
  }
  
  // draw
  /* globals draw_set_ext, draw_set_color, draw_set_transformed, draw_set_font, draw_set_halign, draw_set_valign */
  // draw text
  /* globals draw_text, draw_text_ext, draw_text_color, draw_text_transformed, draw_text_ext_color, draw_text_ext_transformed, draw_text_transformed_color, draw_text_ext_transformed_color, draw_highscore */
  // align
  /* globals VAligns, HAligns */
  draw() {
    let self = this
    draw_set_font(Fonts.f_console)
    draw_set_halign(HAligns.fa_left)
    draw_set_valign(VAligns.fa_top)
    draw_set_color(Colors.c_white)
    draw_text_ext(self.x, self.y, self.text, 13, 390)
  }
}

window.classes.push(Bounty)
window.obj_bounty = __gml_proto_proxy(Bounty.prototype)
