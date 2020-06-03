// gml
/* globals GMLObject, string_height_ext */
// classes and enums
/* globals obj_stats, obj_general_goto_main, obj_location_scroll, obj_location_button, Races, Subraces, Advantages, StatLevels, Fonts */
// functions and stuff
/* globals get_race, advantage_exist, get_text_location, button_create, check_req, location_store_create, level_up_check, roll_d6, stat_low, life_modify, mood_modify, cap_stat, get_text_symbol, pregnancy */

class Location extends GMLObject {
  create() {
    let self = this
    self.no_escape = 0
    self.scroll = 0
    self.scale = 0
    let count = 0
    self.food = 0
    self.hygiene = 0
    self.life = 0
    self.cash = 0
    self.mood = 0
    self.cash_multi = 1
    self.xp = 0
    self.life_cap = 100
    self.hygiene_cap = 100
    self.mood_cap = 100
    if (get_race(Races.orc, Subraces[Races.orc].half)) {
      self.life_cap += 30
    }
    if (advantage_exist(Advantages.orc_warrior)) {
      self.life_cap += 10
    }
    if (advantage_exist(Advantages.orc_berserker)) {
      self.life_cap += 10
    }
    self.vag = 0
    self.vag_in = 0
    self.anal = 0
    self.anal_in = 0
    self.oral = 0
    self.oral_in = 0
    self.hands = 0
    self.gang = 0
    self.kissing = 0
    self.woman = 0
    self.forced = 0
    self.danger = 0
    self.rough = 0
    self.text = 0
    self.level = obj_stats.stage_tier
    self.button_1 = "None"
    self.button_2 = "None"
    self.button_3 = "None"
    self.button_1_price = 0
    self.button_2_price = 0
    self.button_3_price = 0
    self.button_1_req1 = null
    self.button_1_req2 = null
    self.button_1_req3 = null
    self.button_1_req4 = null
    self.button_2_req1 = null
    self.button_2_req2 = null
    self.button_2_req3 = null
    self.button_2_req4 = null
    self.button_3_req1 = null
    self.button_3_req2 = null
    self.button_3_req3 = null
    self.button_3_req4 = null
    self.b1_type = 0
    self.b1_name = 0
    self.b1_cost = 0
    self.b2_type = 0
    self.b2_name = 0
    self.b2_cost = 0
    self.b3_type = 0
    self.b3_name = 0
    self.b3_cost = 0
    self.b4_type = 0
    self.b4_name = 0
    self.b4_cost = 0
    self.b5_type = 0
    self.b5_name = 0
    self.b5_cost = 0
    self.text = get_text_location.call(self, obj_stats.location_now)
    self.inst = null
    self.obj = obj_location_button
    self.yy = 160
    if (self.button_1 !== "None") {
      button_create.call(self, 420, self.yy)
      self.inst.number = self.button_1
      self.inst.text = self.button_1
      self.inst.price = self.button_1_price
      if (!check_req(self.button_1_req1, self.button_1_req2, self.button_1_req3, self.button_1_req4)) {
        self.inst.red = true
      }
    }
    if (self.button_2 !== "None") {
      button_create.call(self, 420, self.yy)
      self.inst.number = self.button_2
      self.inst.text = self.button_2
      self.inst.price = self.button_2_price
      if (!check_req(self.button_2_req1, self.button_2_req2, self.button_2_req3, self.button_2_req4)) {
        self.inst.red = true
      }
    }
    if (self.button_3 !== "None") {
      button_create.call(self, 420, self.yy)
      self.inst.number = self.button_3
      self.inst.text = self.button_3
      self.inst.price = self.button_3_price
      if (!check_req(self.button_3_req1, self.button_3_req2, self.button_3_req3, self.button_3_req4)) {
        self.inst.red = true
      }
    }
    self.yy = 120
    location_store_create.call(self)
    if (self.vag + self.vag_in === 1) {
      obj_stats.xp_vaginal += 2
    } else if (self.vag + self.vag_in > 1) {
      obj_stats.xp_vaginal += self.vag + self.vag_in + 1
    }
    if (self.anal + self.anal_in === 1) {
      obj_stats.xp_anal += 2
    } else if (self.anal + self.anal_in > 1) {
      obj_stats.xp_anal += self.anal + self.anal_in + 1
    }
    if (self.oral + self.oral_in === 1) {
      obj_stats.xp_oral += 2
    } else if (self.oral + self.oral_in > 1) {
      obj_stats.xp_oral += self.oral + self.oral_in + 1
    }
    if (self.hands > 0) {
      obj_stats.xp_hands += self.hands + 1
    }
    self.xp = self.vag + self.vag_in + self.anal + self.anal_in + self.oral + self.oral_in + self.hands
    if (self.xp === 1) {
      self.xp = 2
    } else if (self.xp > 1) {
      self.xp += 1
    }
    self.text += level_up_check()
    count = self.vag + self.vag_in + self.anal + self.anal_in + self.oral + self.oral_in + self.hands
    if (!advantage_exist(Advantages.willpower) && !advantage_exist(Advantages.unbreakable)) {
      if (self.anal + self.anal_in > 0) {
        self.mood -= roll_d6(0, "Anal pain")
      }
    } else if (advantage_exist(Advantages.willpower) && !advantage_exist(Advantages.unbreakable)) {
      if (self.anal + self.anal_in > 0) {
        self.mood += roll_d6(0, "Slight anal pain") / 2
      }
    }
    if (advantage_exist(Advantages.cum_in_me)) {
      if (self.vag_in > 0) {
        self.mood += self.vag_in
      }
    }
    if (!advantage_exist(Advantages.party_girl)) {
      if (self.gang > 0) {
        self.mood -= roll_d6(count - 1, "Gangbang stress", self.gang)
      }
    }
    if (!advantage_exist(Advantages.nympho)) {
      if (self.forced > 0) {
        self.mood -= roll_d6(0, "Rape stress", self.forced)
      }
    }
    if (advantage_exist(Advantages.stretchy_body)) {
      if (self.rough > 0) {
        self.mood -= roll_d6(0, "Too rough", self.rough)
      }
    } else if (advantage_exist(Advantages.stretchy_body)) {
      if (self.rough > 0) {
        self.mood += roll_d6(0, "Stretched", self.rough)
      }
    }
    if (advantage_exist(Advantages.versatile)) {
      if (count > 0) {
        self.xp += 1
      }
    }
    if (get_race(Races.half_elf)) {
      if (count === 1) {
        self.xp += 1
      }
    }
    if (self.kissing && advantage_exist(Advantages.sensual)) {
      self.cash_multi += 0.25
    }
    if (self.woman && advantage_exist(Advantages.lesbianism)) {
      self.cash_multi += 0.5
    }
    if (obj_stats.virgin && (self.vag > 0 || self.vag_in > 0)) {
      self.text += "##You've tossed your virginity away. Was it really worth it?"
      self.mood -= 10
      self.cash_multi *= 1.5
      obj_stats.virgin = false
    }
    if (obj_stats.mood === 0) {
      self.cash_multi *= 0.5
    } else {
      switch (stat_low(obj_stats.mood)) {
        case StatLevels.low: self.cash_multi *= 0.75; break
        case StatLevels.medium: self.cash_multi *= 0.9; break
        case StatLevels.over: self.cash_multi *= 1.1; break
      }
    }
    self.text += "#"
    if (self.life !== 0) {
      self.life = life_modify(self.life)
      obj_stats.life = cap_stat(obj_stats.life, self.life_cap, self.life)
      self.text += "#" + get_text_symbol(self.life) + string(self.life) + " Life"
    }
    if (self.hygiene !== 0) {
      obj_stats.hygiene = cap_stat(obj_stats.hygiene, self.hygiene_cap, self.hygiene)
      self.hygiene += "#" + get_text_symbol(self.hygiene) + string(self.hygiene) + " Hygiene"
    }
    if (self.mood !== 0) {
      self.mood = mood_modify(self.mood)
      obj_stats.mood = cap_stat(obj_stats.mood, self.mood_cap, self.mood)
      self.text += "#" + get_text_symbol(self.mood) + string(self.mood) + " Mood"
    }
    if (self.cash !== 0) {
      self.cash *= self.cash_multi
      obj_stats.cash += self.cash
    }
    if (self.food) {
      obj_stats.food = 5
    }
    if (self.xp !== 0) {
      self.text += "#+" + string(self.xp) + " XP"
      obj_stats.xp += self.xp
    }
    if (self.vag_in > 0) {
      pregnancy()
    }
    if (self.no_escape) {
      obj_general_goto_main.instances.forEach(self => {
        instance_destroy.call(self)
      })
    }
    let i = string_height_ext(self.text, 13, 390)
    if (i > 440) {
      i = string_height_ext(self.text, 13, 390)
      self.scale = (i + 40) / 440
      self.scroll = true
    } else {
      obj_location_scroll.instances.forEach(self => {
        instance_destroy.call(self)
      })
    }
    self.yy = self.y
    // TODO: fix anal bonuses i guess
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
    if (!self.scroll) {
      draw_text_ext(self.x, self.yy, self.text, 13, 390)
    } else if (self.scroll) {
      draw_text_ext(self.x, self.yy, self.text, 13, 380)
    }
    if (instance_exists(obj_location_scroll) && obj_stats.debug) {
      draw_text_ext(430, 0, string(floor(self.yy)) + " " + string(floor(obj_location_scroll.position)) + " " + string(self.scale), 13, 390)
    }
  }
  
  step() {
    let self = this
    if (self.scroll) {
      self.yy = self.y - self.scale * obj_location_scroll.position
    }
  }
}

window.classes.push(Location)
window.obj_location = __gml_proto_proxy(Location.prototype)
