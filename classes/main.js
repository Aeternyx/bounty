// gml
// classes and enums
/* globals obj_stats, Fonts */
// functions and stuff
/* globals get_text_town_desc */

class Main extends GMLObject {
  create() {
    super.create()
    let self = this
    let i = ""
    if (obj_stats.bounty_distance > 7) {
      i = "You have plenty of time before your trail is followed, with " + string(obj_stats.bounty_distance) + " days until any bounty hunters arrive."
    } else if (obj_stats.bounty_distance === 7) {
      i = "You still have a week left before you have to worry about bounty hunters."
    } else if (obj_stats.bounty_distance > 3) {
      i = "Time is dwindling, and you only have " + string(obj_stats.bounty_distance) + " days until bounty hunters catch up to you."
    } else if (obj_stats.bounty_distance > 1) {
      i = "You should prepare to leave the city soon, with only " + string(obj_stats.bounty_distance) + " days of safety remaining."
    } else if (obj_stats.bounty_distance === 1) {
      i = "Today is the last day you can safely stay in this city. Tomorrow, the bounty hunters will arrive."
    } else if (obj_stats.bounty_distance === 0) {
      i = "Bounty hunters have arrived in the city to search for you - you are not safe here."
    }
    self.text = string(obj_stats.location_name) + " " + get_text_town_desc(obj_stats.location) + "##" + string(i)
    
    if (!obj_stats.debug && !window.matchMedia("(pointer: coarse)").matches) {
      obj_main_debug.instances.forEach(self => {
        instance_destroy.call(self)
      })
    }
  }
  
  // draw
  /* globals draw_set_ext, draw_set_color, draw_set_transformed, draw_set_font, draw_set_halign, draw_set_valign, draw_sprite, Colors */
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
    draw_text_ext(self.x, self.y, self.text, 13, 380)
  }
}

window.classes.push(Main)
window.obj_main = __gml_proto_proxy(Main.prototype)
