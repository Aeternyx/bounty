// gml
// classes and enums
/* globals obj_stats, obj_general_goto_main, obj_road_goto_encounter, Locations, Advantages, Fonts */
// functions and stuff
/* globals roll_d6, get_text_travel_start, get_text_travel_weather, get_text_stage_tier, town_gen, advantage_exist, add_fame */

class Travel extends GMLObject {
  create() {
    super.create()
    let self = this
    self.food = 0
    self.hygiene = 0
    self.life = 0
    self.cash = 0
    self.text = 0
    self.roll = 0
    self.safety = 0
    self.encounter = 0
    if (obj_stats.food === 5) {
      obj_stats.food = 2
    }
    switch (obj_stats.location) {
      case Locations.military_camp: self.safety = 1; break
      case Locations.island: self.safety = 1; break
      case Locations.barracks: self.safety = 1; break
    }
    switch (obj_stats.stage_tier) {
      case 3: self.safety -= 1; break
      case 4: self.safety -= 2; break
    }
    self.roll = roll_d6(-self.safety, "Danger")
    if (self.roll >= 6) {
      self.encounter = 1
    }
    self.text = get_text_travel_start()
    self.text += "##" + string(get_text_travel_weather())
    if (obj_stats.stage >= 5) {
      obj_stats.stage -= 5
      obj_stats.stage_tier += 1
      self.text += "##" + string(get_text_stage_tier())
    }
    obj_stats.stage += 1
    town_gen()
    obj_stats.fame = 0
    obj_stats.fame_current = 0
    obj_stats.fame_renown = 0
    obj_stats.fame_value = 0
    obj_stats.fame_allure = 0
    if (advantage_exist(Advantages.relief_girl)) {
      add_fame(2)
    }
    for (let i = 8; i > 0;) {
      if (obj_stats.bounty_distance < 10) {
        obj_stats.bounty_distance += 1
        i -= 1
      } else if (obj_stats.bounty_distance >= 10) {
        obj_stats.bounty_distance += 1
        i -= 2
      }
    }
    if (self.encounter > 0) {
      obj_general_goto_main.instances.forEach(self => {
        instance_change.call(self, obj_road_goto_encounter, true)
      })
      self.roll = irandom_range(1, 4) // NOTE: ew. was ew random floor thing
      switch (self.roll) {
        case 1: obj_stats.location_now = "On The Road - Bandits"; break
        case 2: obj_stats.location_now = "On The Road - Slavers"; break
        case 3: obj_stats.location_now = "On The Road - Goblin Raiders"; break
        case 4: obj_stats.location_now = "On The Road - Gnoll War Party"; break
      }
    }
  }
  
  // draw
  /* globals draw_set_ext, draw_set_color, draw_set_transformed, draw_set_font, draw_set_halign, draw_set_valign, Colors */
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

window.classes.push(Travel)
window.obj_travel = __gml_proto_proxy(Travel.prototype)
