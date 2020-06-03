// GML
// classes/enums
/* globals Advantages, Races, Dangers, SkillTypes, Prices, Fonts */
// functions mostly
/* globals obj_stats, get_request, get_text_customer, roll_d6, advantage_exist, cap_stat, stat_low, irandom_range, string_insert, string_length, check_skill, pregnancy, level_up_check, get_text_encounter_request */
/* globals mood_modify, life_modify, get_afflictions, check_allure, check_multi, draw_cash, do_gangbang_encounter */
// get_text
/* globals get_text_danger, get_text_encounter_v, get_text_encounter_a, get_text_encounter_o, get_text_encounter_h */
class Encounter extends GMLObject {
  create() {
    super.create()
    let self = this
    self.type = 0
    let mood_cap = 100
    let hygiene_cap = 100
    let life_cap = 100
    let ignore = false
    self.pay = 0
    self.text = null
    self.xp = 0
    self.virgin = 0
    self.damage = 0
    self.hygiene = 0
    self.mood = 0
    self.danger = 0
    self.success = 0
    self.pullout_mod = 0
    self.safety = 0
    self.neg_mod = 0
    self.race = "None"
    self.combat_you = 0
    self.combat_them = 0
    self.combat_wep = 0
    obj_stats.encounters -= 1
    if (obj_stats.encounters > 0) {
      instance_create(580, 400, obj_encounter_repeat)
    } else {
      instance_create(580, 400, obj_general_goto_main)
    }
    let i = roll_d6(0, "Request type")
    self.type = get_request(i)
    if (self.types === SkillTypes.gangbang) {
      do_gangbang_encounter.call(self)
      return
    }
    let roll = irandom_range(1, 3), approach = ""
    switch (roll) {
      case 1:
        approach = "You're approached by "
        break
      case 2:
        approach = "You have found "
        break
      case 3:
        approach = "You're solicited by "
        break
    }
    self.text = approach + get_text_customer() + ". "
    let ii = 0
    switch (self.type) {
      case SkillTypes.vaginal:
        if (advantage_exist(Advantages.tight_pussy)) {
          ii += 1
        }
        if (advantage_exist(Advantages.naturally_wet)) {
          ii += 1
        }
        break
      case SkillTypes.oral:
        if (advantage_exist(Advantages.titfuck)) {
          ii -= 1
        }
        if (advantage_exist(Advantages.deepthroat)) {
          ii += 1
        }
        break
      default:
        i = 0
        break
    }
    if (self.type !== SkillTypes.hands) {
      i = roll_d6(ii, "Request internal")
    } else {
      i = 0
    }
    let inside = i >= 5
    if (obj_stats.negotiate_used > 0) {
      self.text += "He wants to " + (obj_stats.negotiate_inside ? "fill " : "use ")
      switch (obj_stats.negotiate_used) {
        case SkillTypes.vaginal:
          self.text += "your pussy, "
          break
        case SkillTypes.anal:
          self.text += "your ass, "
          break
        case SkillTypes.oral:
          self.text += "your mouth, "
          break
        case SkillTypes.hands:
          self.text += "your hands, "
          break
      }
      if (self.type == obj_stats.negotiate && inside === obj_stats.negotiate_inside) {
        self.text += "but you couldn't convince him otherwise."
      } else {
        self.text += "but he can't resist you. "
      }
    }
    if (!ignore) {
      self.text += get_text_encounter_request(self.type, inside)
    }
    switch (self.type) {
      case SkillTypes.vaginal:
        i = obj_stats.o_vaginal
        break
      case SkillTypes.anal:
        i = obj_stats.o_anal
        break
      case SkillTypes.oral:
        i = obj_stats.o_oral
        break
      case SkillTypes.hands:
        i = obj_stats.o_hands
        break
    }
    i -= inside
    self.neg_mod = (obj_stats.o_price - 2) * -1
    self.neg_mod += 1
    self.neg_mod += check_allure()
    let accept = false
    if (i >= 3) { // NOTE: if setting is inside
      if (obj_stats.mood > 0) {
        i = "##You agree to a price, and "
      } else {
        switch (irandom_range(1, 5)) {
          case 1:
            i = "You want to say no, but why even bother? So "
            break
          case 2:
            i = "Like a good whore, you graciously accept, and "
            break
          case 3:
            i = "You don't even give a price before accepting, as "
            break
          case 4:
            i = "You're quivering at the thought of being given attention, and "
            break
          case 5:
            i = "A slut like yourself could never decline, so "
            break
        }
      }
      switch (irandom_range(1, 3)) {
        case 1:
          i += "you follow him to "
          break
        case 2:
          i += "you tag along to "
          break
        case 3:
          i += "he takes you to "
          break
      }
      self.text += i
      accept = true
    } else if (roll_d6(obj_stats.negotiate + self.neg_mod, "Negotiation") > 5) {
      obj_stats.negotiate_used = self.type
      obj_stats.negotiate_inside = inside
      obj_stats.encounters += 1
      room_restart()
      return
    } else {
      if (obj_stats.negotiate_used === 0) {
        i = "##You declined."
      } else if (obj_stats.negotiate_used > 0) {
        i = "##You weren't able to work something out in the end."
      }
      self.text += i
      accept = false
    }
    obj_stats.negotiate_used = 0
    if (accept) {
      switch (roll_d6(0, "Location")) {
        case 1:
          ii = "the nearest alleyway."
          break
        case 2:
          ii = "a local tavern."
          break
        case 3:
          ii = "a secluded spot in a field behind some foliage."
          break
        case 4:
          ii = "a nearby inn, where he shows you to his room."
          break
        case 5:
          ii = "a small house not far from where you met."
          break
        case 6:
          ii = "a fairly nice house in what appears to be a good neighborhood."
          break
      }
      self.text += ii
      self.safety = (obj_stats.o_safety - 2) * -1
      i = roll_d6(self.safety, "Danger", 2)
      switch (i) {
        case 7:
          if (!(self.pullout_mod <= 1)) {
            break
          }
        case 8:
          if (!(self.pullout_mod <= 0)) {
            break
          }
        case 9:
          if (!(inside || self.type === SkillTypes.hands)) {
            break
          } else {
            self.danger = Dangers.inside
            inside = true
            break
          }
          break
        case 10:
          if (self.type === SkillTypes.hands) {
            break
          }
          self.danger = Dangers.rough
          break
        case 11:
          self.danger = Dangers.threaten
          break
        case 12:
        case 13:
        case 14:
        case 15:
          self.danger = Dangers.rape
          break
      }
      // NOTE: orc
      // TODO: check if it works
      if (self.danger === Dangers.none && get_race(Races.elf) && self.location_race === Races.orc) {
        i = roll_d6(0, "Danger from orcs")
        if (i >= 6) {
          self.danger = Dangers.rough
        } else if (i >= 4) {
          self.danger = Dangers.inside
          inside = true
        }
      }
      if (!inside && self.danger === 0) {
        if (advantage_exist("Cum In Me!")) {
          self.danger = 1
          inside = true
        }
      }
      if (self.danger >= Dangers.threaten) {
        self.combat_you = check_skill(SkillTypes.weapon)
        self.combat_them = roll_d6(5, "Enemy Strength")
        if (stat_low(obj_stats.mood) === StatLevels.low) {
          self.combat_you = 0
        }
        if (self.combat_you >= self.combat_them) {
          self.success = 1
          self.mood += roll_d6(0, "Mood penalty")
        } else if (self.combat_you !== 0) {
          self.success = 2
          self.damage = roll_d6(6, "Damage", 2)
          if (!advantage_exist(Advantages.nympho)) {
            self.mood += roll_d6(6, "Rape stress")
          }
          inside = true
          i = roll_d6(0, "Rape action")
          self.type = get_request(i)
        } else if (self.combat_you === 0) {
          self.success = 2
          self.damage = roll_d6(0, "Damage")
          if (!advantage_exist(Advantages.nympho)) {
            self.mood += roll_d6(6, "Rape stress")
          }
          inside = true
          i = roll_d6(0, "Rape action")
          self.type = get_request(i)
        }
        ii = get_text_danger(self.danger, self.success)
        self.text += ii
      }
      switch (self.type) {
        case SkillTypes.vaginal:
          ii = get_text_encounter_v(inside)
          break
        case SkillTypes.anal:
          ii = get_text_encounter_a(inside)
          break
        case SkillTypes.oral:
          ii = get_text_encounter_o(inside)
          break
        case SkillTypes.hands:
          ii = get_text_encounter_h()
          break
        default:
          console.log(self.type)
          ii = "[ERROR]"
          break
      }
      self.text += ii
      if (self.danger === Dangers.inside && self.type !== SkillTypes.hands) {
        ii = get_text_danger(self.danger, self.success)
        self.text += ii
        self.mood += roll_d6(0, "Internal stress")
      } else if (self.danger === Dangers.rough && self.type !== SkillTypes.hands) {
        ii = get_text_danger(self.danger, self.success)
        self.text += ii
        if (advantage_exist(Advantages.stretchy_body)) {
          self.mood -= roll_d6(0, "Stretched")
        } else {
          self.mood += roll_d6(0, "Too rough")
        }
      }
      self.hygiene = roll_d6(0, "Hygiene")
      switch (self.type) {
        case SkillTypes.vaginal:
          self.hygiene += 4 * inside
          if (advantage_exist(Advantages.cum_in_me)) {
            if (inside) {
              self.mood -= 1
            }
          }
          break
        case SkillTypes.anal:
          self.hygiene += 3 * inside
          break
        case SkillTypes.oral:
          self.hygiene -= 2 * inside
          break
        case SkillTypes.hands:
          break
      }
      if (self.hygiene < 0) {
        self.hygiene = 0
      }
      switch (self.type) {
        case SkillTypes.vaginal:
          i = check_skill(self.type)
          if (obj_stats.virgin) {
            i *= 2
          }
        case SkillTypes.anal:
        case SkillTypes.oral:
        case SkillTypes.hands:
          i = check_skill(self.type)
      }
      if (inside && self.danger !== 1) {
        i *= 2
      }
      i += obj_stats.charm + obj_stats.fame_value
      ii = check_multi(self.type)
      switch (obj_stats.o_price) {
        case Prices.cheap:
          ii *= 0.75
          break
        case Prices.standard:
          ii *= 1
          break
        case Prices.expensive:
          ii *= 1.25
          break
      }
      if (self.type === SkillTypes.vaginal) {
        if (obj_stats.virgin) {
          self.virgin = true
          obj_stats.virgin = false
          if (advantage_exist(Advantages.nympho)) {
            ii *= 4
          } else {
            ii *= 3
          }
          self.mood += 10
        }
      }
      self.pay = floor(i * ii)
      if (self.danger >= Dangers.threaten) {
        self.pay = 0
        i = ""
        switch (self.type) {
          case SkillTypes.vaginal:
          case SkillTypes.anal:
            i = "##He leaves your sore, cum-filled body on the ground and leaves without paying. "
          case SkillTypes.oral:
            i = "##You're pushed to the floor before he leaves without paying. "
          case SkillTypes.hands:
            i = "##He casts you to the side like a used object before leaving without paying you. "
        }
        self.text += i
      } else {
        self.pay += roll_d6(0, "Pay modifier")
      }
      obj_stats.cash += self.pay
      if (self.type === SkillTypes.anal) {
        if (!advantage_exist(Advantages.willpower) && !advantage_exist(Advantages.unbreakable)) {
          self.mood += roll_d6(0, "Anal pain")
        } else if (advantage_exist(Advantages.willpower) && !advantage_exist(Advantages.unbreakable)) {
          // NOTE: was just "anal pain"
          self.mood += roll_d6(0, "Slight anal pain") / 2
        }
      }
      self.text += get_afflictions(self.type, inside)
      self.xp = 2
      switch (self.type) {
        case SkillTypes.vaginal:
          obj_stats.xp_vaginal += self.xp
          break
        case SkillTypes.anal:
          obj_stats.xp_anal += self.xp
          break
        case SkillTypes.oral:
          obj_stats.xp_oral += self.xp
          break
        case SkillTypes.hands:
          obj_stats.xp_hands += self.xp
          break
      }
      if (advantage_exist(Advantages.versatility)) {
        self.xp += 1
      }
      if (obj_stats.race === Races.half_elf) {
        self.xp += 1
      }
      obj_stats.xp += self.xp
      if (self.damage !== 0) {
        self.damage = life_modify(-self.damage)
        obj_stats.life = cap_stat(obj_stats.life, life_cap, self.damage)
      }
      if (self.mood !== 0) {
        self.mood = mood_modify(-self.mood)
        obj_stats.life = cap_stat(obj_stats.mood, mood_cap, self.mood)
      }
      if (self.hygiene !== 0) {
        obj_stats.hygiene = cap_stat(obj_stats.hygiene, hygiene_cap, -self.hygiene)
      }
      if (self.virgin) {
        if (self.danger > Dangers.rough) {
          i = "##You've been robbed of your virginity by a stranger, and it's your own fault."
        } else if (self.danger < Dangers.threaten && stat_low(obj_stats.mood) === 0) {
          i = "##Your virginity didn't matter anyway, did it?"
        } else /* if (self.danger < Dangers.threaten) */ {
          i = "##You've sold your virginity to a stranger, and you feel disgusting."
        }
        self.text += i
      }
      self.text += level_up_check()
      if (self.type === SkillTypes.vaginal && inside) {
        pregnancy()
      }
    }
    obj_stats.negotiate_used = 0
    obj_stats.negotiate_inside = false
  }
  
  // draw
  /* globals draw_set_ext, draw_set_color, draw_set_transformed, draw_set_font, draw_set_halign, draw_set_valign, Colors */
  // draw text
  /* globals draw_text, draw_text_ext, draw_text_color, draw_text_transformed, draw_text_ext_color, draw_text_ext_transformed, draw_text_transformed_color, draw_text_ext_transformed_color, draw_highscore */
  // align
  /* globals VAligns, HAligns */
  draw() {
    const self = this
    draw_set_font(Fonts.f_console)
    draw_set_halign(HAligns.fa_left)
    draw_set_valign(VAligns.fa_top)
    draw_set_color(Colors.c_white)
    draw_text_ext(self.x, self.y, self.text, 13, 390)
    let i = string_height_ext(self.text, 13, 390) + 13
    draw_cash(self.x, self.y + i, self.pay)
    if (self.xp !== 0) {
      i += 13
      draw_text(self.x, self.y + i, "+" + string(self.xp) + " XP")
    }
    if (self.damage < 0) {
      i += 13
      draw_text(self.x, self.y + i, "-" + string(-self.damage) + " Life")
    }
    if (self.mood !== 0) {
      i += 13
      draw_text(self.x, self.y + i, (self.mood > 0 ? "+" : "-") + string(abs(self.mood)) + " Mood")
    }
    if (self.hygiene !== 0) {
      i += 13
      draw_text(self.x, self.y + i, (self.hygiene > 0 ? "+" : "-") + string(abs(self.hygiene)) + " Hygiene")
    }
    i += 26
    if (obj_stats.encounters === 0) {
      draw_text(self.x, self.y + i, "Afterwards, you return and sleep.")
    } else if (obj_stats.encounters === 1) {
      draw_text(self.x, self.y + i, "You have 1 more encounter.")
    } else if (obj_stats.encounters > 1) {
      draw_text(self.x, self.y + i, "You have " + string(obj_stats.encounters) + " more encounters.")
    }
  }
}

window.classes.push(Encounter)
window.obj_encounter = __gml_proto_proxy(Encounter.prototype)
