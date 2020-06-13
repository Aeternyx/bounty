// gml
/* globals GMLObject, floor */
// functions and stuff
/* globals roll_d6 */

// TODO: female customers in gangbang???
// this b just for do_gangbang_enc
function do_gangbang_encounter() {
  const self = this
  let mood_cap = 100
  let hygiene_cap = 100
  let life_cap = 100
  let ignore = false
  const customers = floor(roll_d6(6, "Customers (scaled)") / 2)
  let gb_mult = ln(customers) * 2 - 1 // 0.7 * customers
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
  let ii = 0
  self.text = approach
  for (let j = 0; j < customers - 2; j++) {
    self.text += get_text_customer() + ", "
  }
  if (customers > 1) {
    self.text += get_text_customer() + " and "
  }
  self.text += get_text_customer() + ". "
  if (self.type !== SkillTypes.hands) {
    i = roll_d6(ii, "Request internal")
  } else {
    i = 0
  }
  let inside = i >= 5
  if (obj_stats.negotiate_used > 0) {
    self.text += "They want to " + (obj_stats.negotiate_inside ? "fill " : "use ")
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
      self.text += "but you couldn't convince them otherwise."
    } else {
      self.text += "but they can't resist you. "
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
        i += "you follow them to "
        break
      case 2:
        i += "you tag along to "
        break
      case 3:
        i += "they take you to "
        break
    }
    self.text += i
    accept = true
  } else {
    // TODO: wat
    // TODO: should negotiation chances be different here? (n rolls needed where n is number of peoples)
    // let neg_v = 
    if (roll_d6(obj_stats.negotiate + self.neg_mod, "Negotiation") > 5) {
      obj_stats.negotiate_used = self.type
      obj_stats.negotiate_inside = inside
      obj_stats.encounters += 1
      room_restart()
      return
    } else {
      // TODO: check
      if (obj_stats.negotiate_used === 0) {
        i = "##You declined."
      } else if (obj_stats.negotiate_used > 0) {
        i = "##You weren't able to work something out in the end."
      }
      self.text += i
      accept = false
    }
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
    let i = roll_d6(self.safety, "Danger", 2)
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
    // TODO: below this line is shit
    // NOTE: line 297-304 of original file. this is inline get_text_encounter_g
    self.text += "##pretend this is gangbang text"
    let roll = irandom_range(1, 2)
    i = ""
    switch (irandom_range(1, 4)) {
      case 1:
        // TODO: adapt for gb
        if (roll === 1) {
          i = "##Laying down on your back, you pull your legs toward you. "
        } else if (roll === 2) {
          i = "##Laying on your back, you grab your legs and pull them tightly. "
        }
        break
      case 2:
        if (roll === 1) {
          i = "##Before long, you get down to your hands and knees, and lift your ass up. "
        } else if (roll === 2) {
          i = "##Quickly, you slump to your hands and knees, wiggling your ass in the air. "
        }
        break
      case 3:
        if (roll === 1) {
          i = "##You lean forward and place your hands on the wall, presenting yourself. "
        } else if (roll === 2) {
          i = "##Presenting yourself, you lean forward while spreading your legs. "
        }
        break
      case 4:
        i = "##You climb upon him as he presses against your hole. "
        break
    }
    ii = i
    switch (irandom_range(1, 9)) {
      case 1: i = "For a while, he makes short, rapid thrusts into your ass. "; break
      case 2: i = "He pushes his cock deeply in and out of your ass. "; break
      case 3: i = "You try to keep yourself steady as he furiously pounds into your ass. "; break
      case 4: i = "You feel his cock slowly push into your ass, over and over. "; break
      case 5: i = "He keeps you pinned in place as he roughly plunges into your ass. "; break
      case 6: i = "His thrusts force you to lift yourself, and he begins to firmly squeeze your breasts. "; break
      case 7: i = "He savagely fucks your ass, occasionally spanking you as he thrusts. "; break
      case 8: i = "Reaching down, you help guide cautiously guide his cock into your ass, and he slowly begins to thrust. "; break
      case 9: i = "He crudely slams himself against your ass. "; break
    }
    ii += i
    if (self.danger === Dangers.rough) {
      switch (irandom_range(1, 5)) {
        case 1:
          if (!advantage_exist(Advantages.stretchy_body)) {
            i = "His cock is too large, and you try to stay silent as he forces it all in each thrust. "
          } else if (advantage_exist(Advantages.stretchy_body)) {
            i = "His cock is too large for your body, but your body hungrily stretches around his cock. " // NOTE: but the your
          }
          break
        case 2:
          if (!advantage_exist(Advantages.stretchy_body)) {
            i = "You feel your hole stretch and rip every time he plunges his oversized cock into you. "
          } else if (advantage_exist(Advantages.stretchy_body)) {
            i = "You moan each time your ass stretches around his oversized cock. "
          }
          break
        case 3:
          if (!advantage_exist(Advantages.stretchy_body)) {
            i = "His relentless thrusting is too much for your ass to handle and is starting to hurt. "
          } else if (advantage_exist(Advantages.stretchy_body)) {
            i = "His relentless thrusting deep inside of you forces you to orgasm more than once. "
          }
          break
        case 4:
          if (!advantage_exist(Advantages.stretchy_body)) {
            i = "The loud smacking sounds of his hips slamming against you hides your pathetic whimpering. "
          } else if (advantage_exist(Advantages.stretchy_body)) {
            i = "The loud smacking sounds of his hips slamming against you accompanies your moans of ecstasy. "
          }
          break
        case 5:
          if (!advantage_exist(Advantages.stretchy_body)) {
            i = "Dick inside of you, he reaches down and crudely smacks you. "
          } else if (advantage_exist(Advantages.stretchy_body)) {
            i = "Your body tingles as his cock crashes against your insides. "
          }
          break
      }
      ii += i
    }
    if (!inside) {
      switch (irandom_range(1, 4)) {
        case 1: i = "He pulls out and rests his cock on you, just as he cums. "; break
        case 2: i = "He barely pulls out in time, covering your hole with his seed. "; break
        case 3: i = "He quickly pulls out and begins jerking himself before cumming over your body. "; break
        case 4: i = "As he pulls out, you reach down and begin to pull on his cock with both hands until he cums on your stomach. "; break
      }
    } else if (inside) {
      switch (irandom_range(1, 4)) {
        case 1: i = "You feel his hips press firmly against your ass as his cock begins to pulsate, filling you with cum. "; break
        case 2: i = "His thrusts become quicker and quicker until you can feel his cum being poured into your ass. "; break
        case 3: i = "You feel his cock reach deep inside of you before he begins pumping you full of cum. "; break
        case 4: i = "He pulls out enough so that only the tip of his cock is inside, and cums in your ass. "; break
      }
    }
    ii += i
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
    obj_stats.cash += round(self.pay * gb_mult)
    if (self.type === SkillTypes.anal) {
      if (!advantage_exist(Advantages.willpower) && !advantage_exist(Advantages.unbreakable)) {
        self.mood += roll_d6(0, "Anal pain")
      } else if (advantage_exist(Advantages.willpower) && !advantage_exist(Advantages.unbreakable)) {
        // NOTE: was just "anal pain"
        self.mood += round(roll_d6(0, "Slight anal pain") / 2)
      }
    }
    self.text += get_afflictions(self.type, inside)
    self.xp = 2
    // TODO: indivitual counts for each type
    obj_stats.xp_vaginal += max(round(self.xp * gb_mult/ 4), 1)
    obj_stats.xp_anal += max(round(self.xp * gb_mult / 4), 1)
    obj_stats.xp_oral += max(round(self.xp * gb_mult / 4), 1)
    obj_stats.xp_hands += max(round(self.xp * gb_mult / 4), 1)
    if (advantage_exist(Advantages.versatility)) {
      self.xp += round(gb_mult)
    }
    if (obj_stats.race === Races.half_elf) {
      self.xp += round(gb_mult)
    }
    obj_stats.xp += self.xp
    if (self.damage !== 0) {
      self.damage = life_modify(round(-self.damage * gb_mult))
      obj_stats.life = cap_stat(obj_stats.life, life_cap, self.damage)
    }
    if (self.mood !== 0) {
      self.mood = mood_modify(round(-self.mood * gb_mult))
      obj_stats.mood = cap_stat(obj_stats.mood, mood_cap, self.mood)
    }
    if (self.hygiene !== 0) {
      obj_stats.hygiene = cap_stat(obj_stats.hygiene, hygiene_cap, round(-self.hygiene * gb_mult))
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
    if (/*self.type === SkillTypes.vaginal && */inside) {
      pregnancy()
      pregnancy() // TODO: here too. count # of vaginal
    }
  }
  obj_stats.negotiate_used = 0
  obj_stats.negotiate_inside = false
}
