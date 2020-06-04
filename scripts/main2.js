// GML
/* globals round, string, string_replace_all, irandom_range */
// classes and enums
/* globals Advantages, Locations, Races */
// functions and stuff
/* globals obj_stats, advantage_add, advantage_exist, get_race, ini_open, ini_read_string, ini_read_real, ini_write_string, ini_write_real, ini_close, get_text_town_name */

// NOTE NOTE: 3: is player/obj_stats i guess. most functions self is obj_stats, 39: is probs button

function inventory_add(item, amount) {
  let success = false
  for (let i = 0; i < 15; i++) {
    if (obj_stats.inventory[i][0] === item) {
      obj_stats.inventory[i][1] += amount
      break
    }
  }
  if (!success) {
    for (let i = 0; i < 15; i++) {
      if (obj_stats.inventory[i][0] === "None" || obj_stats.inventory[i][0] === item) {
        obj_stats.inventory[i][0] = item
        obj_stats.inventory[i][1] = amount
        break
      }
    }
  }
  let i = 3
}

function inventory_sub(item, amount) {
  let success = false
  for (let i = 0; i < 15; i++) {
    if (obj_stats.inventory[i][0] === item) {
      obj_stats.inventory[i][1] -= amount
      if (obj_stats.inventory[i][1] <= 0) {
        obj_stats.inventory[i][0] = "None"
        obj_stats.inventory[i][1] = 0
      }
      break
    }
  }
}

function item_bound(item) {
  let i = false
  switch (item) {
    case "Certificate, remedial":
    case "Certificate, general":
    case "Certificate, advanced":
    case "Apprentice's degree":
      i = true
      break
  }
  return i
}

function item_usable(item) {
  let i = false
  switch (item) {
    case "Tonic":
      if (obj_stats.bonus_health === 0) {
        i = true
      }
      break
    case "Scroll of Rejuvenation":
    case "Scroll of Charm":
      i = true
      break
  }
  return i
}

function level_up_check(item) {
  let i = "##"
  if (obj_stats.xp >= obj_stats.xp_next) {
    obj_stats.xp -= obj_stats.xp_next
    obj_stats.xp_next += 10
    obj_stats.level += 1
    advantage_add(Advantages.free)
    i += "You've learned a lot about pleasing men lately!#" // NOTE: added missing #
  }
  if (obj_stats.xp_vaginal >= (obj_stats.vaginal + 1) * 10) {
    obj_stats.xp_vaginal -= (obj_stats.vaginal + 1) * 10
    obj_stats.vaginal += 1
    i += "You're getting better at taking cock.#"
  }
  if (obj_stats.xp_anal >= (obj_stats.anal + 1) * 10) {
    obj_stats.xp_anal -= (obj_stats.anal + 1) * 10
    obj_stats.anal += 1
    i += "Your body is more used to anal.#"
  }
  if (obj_stats.xp_oral >= (obj_stats.oral + 1) * 10) {
    obj_stats.xp_oral -= (obj_stats.oral + 1) * 10
    obj_stats.oral += 1
    i += "You feel more confident giving oral.#"
  }
  if (obj_stats.xp_hands >= (obj_stats.hands + 1) * 10) {
    obj_stats.xp_hands -= (obj_stats.hands + 1) * 10
    obj_stats.hands += 1
    i += "You're becoming more effective, even without penetration.#"
  }
  if (i === "##") {
    i = ""
  }
  return i
}

function life_modify(amt) {
  let i = amt, dir = 0
  if (i > 0) {
    dir = 1
  } else if (i < 0) {
    dir = -1
  }
  if (dir === -1 && advantage_exist(Advantages.immunity)) {
    i *= 0.8
  } else if (dir === 1 && advantage_exist(Advantages.healthy)) {
    i *= 1.2
  }
  if (i <= -1 && inventory_exist("Buckler", 0)) {
    i += 1
  }
  return round(i)
}

function mood_modify(amt) {
  let i = amt, dir = 0
  if (i > 0) {
    dir = 1
  } else if (i < 0) {
    dir = -1
  }
  // NOTE: was halfing lmfao
  // if (obj_stats.race === Races.halfling) {
  if (dir === 1 && get_race(Races.halfling)) {
    i *= 1.5
  }
  i = round(i)
  return i
}

function load_config() {
  let self = this
  let slot = "SETTINGS"
  ini_open("data.ini")
  self.dice_type = ini_read_real(slot, "DiceType", self.dice_type)
  self.dice_size = ini_read_real(slot, "DiceSize", self.dice_size)
  self.bar_type = ini_read_real(slot, "BarType", self.bar_type)
  self.bar_visible = ini_read_real(slot, "BarActive", self.bar_visible)
  self.screen_outline = ini_read_real(slot, "Outline", self.screen_outline)
  self.scale_type = ini_read_real(slot, "Scaling", self.scale_type)
  self.title_bar = ini_read_real(slot, "TitleBar", self.title_bar)
  ini_close()
}

function save_config() {
  const self = this
  let slot = "SETTINGS"
  ini_open("data.ini")
  ini_write_real(slot, "DiceType", self.dice_type)
  ini_write_real(slot, "DiceSize", self.dice_size)
  ini_write_real(slot, "BarType", self.bar_type)
  ini_write_real(slot, "BarActive", self.bar_visible)
  ini_write_real(slot, "Outline", self.screen_outline)
  ini_write_real(slot, "Scaling", self.scale_type)
  ini_write_real(slot, "TitleBar", self.title_bar)
  ini_close()
}

function load_game(save_num) {
  const self = this
  let slot = "DATA" + string(save_num)
  ini_open("data.ini")
  self.name = ini_read_string(slot, "N", "Maria")
  self.race = ini_read_string(slot, "RC", "Human")
  self.subrace = ini_read_string(slot, "RCS", "Noble")
  self.spec_training = ini_read_real(slot, "SPECTR", self.spec_training)
  self.location_race = ini_read_string(slot, "LOCRC", self.location_race)
  self.loc_1_race = ini_read_string(slot, "LOCR1", self.loc_)
  self.loc_2_race = ini_read_string(slot, "LOCR2", self.loc_)
  self.loc_3_race = ini_read_string(slot, "LOCR3", self.loc_)
  self.loc_reset = ini_read_real(slot, "LOCRST", self.loc_reset)
  self.sick_level = ini_read_real(slot, "AFL", self.sick_level)
  self.sick_v = ini_read_real(slot, "AFV", self.sick_v)
  self.sick_a = ini_read_real(slot, "AFA", self.sick_a)
  self.sick_o = ini_read_real(slot, "AFO", self.sick_o)
  self.sick_h = ini_read_real(slot, "AFH", self.sick_h)
  self.stage_tier = ini_read_real(slot, "STT", self.stage_tier)
  self.stage = ini_read_real(slot, "STS", self.stage)
  self.pregnant = ini_read_real(slot, "PRG", self.pregnant) !== 0
  self.loc_1_trt = ini_read_real(slot, "L1R", self.loc_)
  self.loc_2_trt = ini_read_real(slot, "L2R", self.loc_)
  self.loc_3_trt = ini_read_real(slot, "L3R", self.loc_)
  self.location_trait = ini_read_real(slot, "LNR", self.location_trait)
  self.body = ini_read_real(slot, "AB", self.body)
  self.mind = ini_read_real(slot, "AM", self.mind)
  self.charm = ini_read_real(slot, "AC", self.charm)
  self.mood = ini_read_real(slot, "SM", self.mood)
  self.life = ini_read_real(slot, "SL", self.life)
  self.cash = ini_read_real(slot, "SC", self.cash)
  self.hygiene = ini_read_real(slot, "SH", self.hygiene)
  self.virgin = !!ini_read_real(slot, "SV", self.virgin)
  self.vaginal = ini_read_real(slot, "KV", self.vaginal)
  self.anal = ini_read_real(slot, "KA", self.anal)
  self.oral = ini_read_real(slot, "KO", self.oral)
  self.hands = ini_read_real(slot, "KH", self.hands)
  self.sword = ini_read_real(slot, "WS", self.sword)
  self.axe = ini_read_real(slot, "WA", self.axe)
  self.fame = ini_read_real(slot, "KF", self.fame)
  self.fame_current = ini_read_real(slot, "KFC", self.fame_current)
  self.fame_renown = ini_read_real(slot, "KFR", self.fame_renown)
  self.fame_value = ini_read_real(slot, "KFV", self.fame_value)
  self.fame_allure = ini_read_real(slot, "KFA", self.fame_allure)
  self.negotiate = ini_read_real(slot, "KN", self.negotiate)
  self.weapon_type = ini_read_real(slot, "EWT", self.weapon_type)
  self.weapon_name = ini_read_string(slot, "EWN", self.weapon_name)
  self.weapon_class = ini_read_string(slot, "EWC", self.weapon_class)
  self.armor_top_type = ini_read_real(slot, "ATT", self.armor_top_type)
  self.armor_top_name = ini_read_string(slot, "ATN", self.armor_top_name)
  self.armor_leg_type = ini_read_real(slot, "ALT", self.armor_leg_type)
  self.armor_leg_name = ini_read_string(slot, "ALN", self.armor_leg_name)
  self.armor_foot_type = ini_read_real(slot, "AFT", self.armor_foot_type)
  self.armor_foot_name = ini_read_string(slot, "AFN", self.armor_foot_name)
  self.timeline = ini_read_real(slot, "TL", self.timeline)
  self.location = ini_read_real(slot, "LLC", self.location)
  self.distance = ini_read_real(slot, "LDS", self.distance)
  self.location_name = ini_read_string(slot, "LLN", self.location_name)
  self.stage = ini_read_real(slot, "LST", self.stage)
  self.actions = ini_read_real(slot, "LAC", self.actions)
  self.location_1 = ini_read_string(slot, "LV1", self.location_1)
  self.location_2 = ini_read_string(slot, "LV2", self.location_2)
  self.location_3 = ini_read_string(slot, "LV3", self.location_3)
  self.loc_1_type = ini_read_real(slot, "L1T", self.loc_1_type)
  self.loc_1_name = ini_read_string(slot, "L1N", self.loc_1_name)
  self.loc_1_dist = ini_read_real(slot, "L1D", self.loc_1_dist)
  self.loc_2_type = ini_read_real(slot, "L2T", self.loc_2_type)
  self.loc_2_name = ini_read_string(slot, "L2N", self.loc_2_name)
  self.loc_2_dist = ini_read_real(slot, "L2D", self.loc_2_dist)
  self.loc_3_type = ini_read_real(slot, "L3T", self.loc_3_type)
  self.loc_3_name = ini_read_string(slot, "L3N", self.loc_3_name)
  self.loc_3_dist = ini_read_real(slot, "L3D", self.loc_3_dist)
  self.level = ini_read_real(slot, "XLV", self.level)
  self.xp = ini_read_real(slot, "XPC", self.xp)
  self.xp_next = ini_read_real(slot, "XPN", self.xp_next)
  self.xp_stats = ini_read_real(slot, "XPS", self.xp_stats)
  self.xp_vaginal = ini_read_real(slot, "XPV", self.xp_vaginal)
  self.xp_anal = ini_read_real(slot, "XPA", self.xp_anal)
  self.xp_oral = ini_read_real(slot, "XPO", self.xp_oral)
  self.xp_hands = ini_read_real(slot, "XPH", self.xp_hands)
  self.o_vaginal = ini_read_real(slot, "OPV", self.o_vaginal)
  self.o_anal = ini_read_real(slot, "OPA", self.o_anal)
  self.o_oral = ini_read_real(slot, "OPO", self.o_oral)
  self.o_hands = ini_read_real(slot, "OPH", self.o_hands)
  self.o_gangbang = ini_read_real(slot, "OPG", self.o_gangbang)
  self.o_price = ini_read_real(slot, "OPP", self.o_price)
  self.o_safety = ini_read_real(slot, "OPS", self.o_safety)
  // NOTE: the 2 below appear to be planned but not fully implemented
  // pRostitution, Martial arts aka one punch man (fully unintentional btw)
  self.o_prostitution = ini_read_real(slot, "OPR", self.o_prostitution)
  self.o_self_defense = ini_read_real(slot, "OPM", self.o_self_defense)
  self.a_eye_color = ini_read_real(slot, "OAE", self.a_eye_color)
  self.a_skin_color = ini_read_real(slot, "OAS", self.a_skin_color)
  self.a_height = ini_read_real(slot, "OAH", self.a_height)
  self.a_weight = ini_read_real(slot, "OAW", self.a_weight)
  self.a_other = ini_read_real(slot, "OAO", self.a_other)
  self.a_racial = ini_read_real(slot, "OAR", self.a_racial)
  self.a_hair_color = ini_read_real(slot, "OAHC", self.a_hair_color)
  self.a_hair_length = ini_read_real(slot, "OAHL", self.a_hair_length)
  self.a_hair_straightness = ini_read_real(slot, "OAH-", self.a_hair_straightness)
  self.a_hair_style = ini_read_real(slot, "OAHS", self.a_hair_style)
  self.food = ini_read_real(slot, "MFD", self.food)
  self.bonus_encounters = ini_read_real(slot, "MBE", self.bonus_encounters)
  self.bonus_payment = ini_read_real(slot, "MBP", self.bonus_payment)
  self.bonus_combat = ini_read_real(slot, "MBC", self.bonus_combat)
  self.bonus_health = ini_read_real(slot, "MBH", self.bonus_health)
  self.bounty_distance = ini_read_real(slot, "BHD", self.bounty_distance)
  let ii, ii2
  for (let i = 0; i < 20; i++) {
    if (i < 10) {
      ii = "A0" + string(i)
    } else {
      ii = "A" + string(i)
    }
    self.advantages[i] = ini_read_string(slot, ii, self.advantages[i])
  }
  for (let i = 0; i < 15; i++) {
    if (i < 10) {
      ii = "I0" + string(i)
      ii2 = "N0" + string(i)
    } else {
      ii = "I" + string(i)
      ii2 = "N" + string(i)
    }
    self.inventory[i][0] = ini_read_string(slot, ii, self.inventory[i][0])
    self.inventory[i][1] = ini_read_real(slot, ii2, self.inventory[i][1])
  }
  ini_close()
}

function save_game(save_num) {
  let self = this
  let slot = "DATA" + string(save_num)
  ini_open("data.ini")
  ini_write_string(slot, "N", self.name)
  ini_write_string(slot, "RC", self.race)
  ini_write_string(slot, "RCS", self.subrace)
  ini_write_real(slot, "SPECTR", self.spec_training)
  ini_write_string(slot, "LOCRC", self.location_race)
  ini_write_string(slot, "LOCR1", self.loc_1_race)
  ini_write_string(slot, "LOCR2", self.loc_2_race)
  ini_write_string(slot, "LOCR3", self.loc_3_race)
  ini_write_real(slot, "LOCRST", self.loc_reset)
  ini_write_real(slot, "AFL", self.sick_level)
  ini_write_real(slot, "AFV", self.sick_v)
  ini_write_real(slot, "AFA", self.sick_a)
  ini_write_real(slot, "AFO", self.sick_o)
  ini_write_real(slot, "AFH", self.sick_h)
  ini_write_real(slot, "STT", self.stage_tier)
  ini_write_real(slot, "STS", self.stage)
  ini_write_real(slot, "PRG", +self.pregnant)
  ini_write_real(slot, "L1R", self.loc_1_trt)
  ini_write_real(slot, "L2R", self.loc_2_trt)
  ini_write_real(slot, "L3R", self.loc_3_trt)
  ini_write_real(slot, "LNR", self.location_trait)
  ini_write_real(slot, "AB", self.body)
  ini_write_real(slot, "AM", self.mind)
  ini_write_real(slot, "AC", self.charm)
  ini_write_real(slot, "SM", self.mood)
  ini_write_real(slot, "SL", self.life)
  ini_write_real(slot, "SC", self.cash)
  ini_write_real(slot, "SH", self.hygiene)
  ini_write_real(slot, "SV", self.virgin)
  ini_write_real(slot, "KV", self.vaginal)
  ini_write_real(slot, "KA", self.anal)
  ini_write_real(slot, "KO", self.oral)
  ini_write_real(slot, "KH", self.hands)
  ini_write_real(slot, "WS", self.sword)
  ini_write_real(slot, "WA", self.axe)
  ini_write_real(slot, "KF", self.fame)
  ini_write_real(slot, "KFC", self.fame_current)
  ini_write_real(slot, "KFR", self.fame_renown)
  ini_write_real(slot, "KFV", self.fame_value)
  ini_write_real(slot, "KFA", self.fame_allure)
  ini_write_real(slot, "KN", self.negotiate)
  ini_write_real(slot, "EWT", self.weapon_type)
  ini_write_string(slot, "EWN", self.weapon_name)
  ini_write_string(slot, "EWC", self.weapon_class)
  ini_write_real(slot, "ATT", self.armor_top_type)
  ini_write_string(slot, "ATN", self.armor_top_name)
  ini_write_real(slot, "ALT", self.armor_leg_type)
  ini_write_string(slot, "ALN", self.armor_leg_name)
  ini_write_real(slot, "AFT", self.armor_foot_type)
  ini_write_string(slot, "AFN", self.armor_foot_name)
  ini_write_real(slot, "TL", self.timeline)
  ini_write_real(slot, "LLC", self.location)
  ini_write_real(slot, "LDS", self.distance)
  ini_write_string(slot, "LLN", self.location_name)
  ini_write_real(slot, "LST", self.stage)
  ini_write_real(slot, "LAC", self.actions)
  ini_write_string(slot, "LV1", self.location_1)
  ini_write_string(slot, "LV2", self.location_2)
  ini_write_string(slot, "LV3", self.location_3)
  ini_write_real(slot, "L1T", self.loc_1_type)
  ini_write_string(slot, "L1N", self.loc_1_name)
  ini_write_real(slot, "L1D", self.loc_1_dist)
  ini_write_real(slot, "L2T", self.loc_2_type)
  ini_write_string(slot, "L2N", self.loc_2_name)
  ini_write_real(slot, "L2D", self.loc_2_dist)
  ini_write_real(slot, "L3T", self.loc_3_type)
  ini_write_string(slot, "L3N", self.loc_3_name)
  ini_write_real(slot, "L3D", self.loc_3_dist)
  ini_write_real(slot, "XLV", self.level)
  ini_write_real(slot, "XPC", self.xp)
  ini_write_real(slot, "XPN", self.xp_next)
  ini_write_real(slot, "XPS", self.xp_stats)
  ini_write_real(slot, "XPV", self.xp_vaginal)
  ini_write_real(slot, "XPA", self.xp_anal)
  ini_write_real(slot, "XPO", self.xp_oral)
  ini_write_real(slot, "XPH", self.xp_hands)
  ini_write_real(slot, "OPV", self.o_vaginal)
  ini_write_real(slot, "OPA", self.o_anal)
  ini_write_real(slot, "OPO", self.o_oral)
  ini_write_real(slot, "OPH", self.o_hands)
  ini_write_real(slot, "OPG", self.o_gangbang)
  ini_write_real(slot, "OPP", self.o_price)
  ini_write_real(slot, "OPS", self.o_safety)
  ini_write_real(slot, "OPR", self.o_prostitution)
  ini_write_real(slot, "OPM", self.o_self_defense)
  ini_write_real(slot, "OAE", self.a_eye_color)
  ini_write_real(slot, "OAS", self.a_skin_color)
  ini_write_real(slot, "OAH", self.a_height)
  ini_write_real(slot, "OAW", self.a_weight)
  ini_write_real(slot, "OAO", self.a_other)
  ini_write_real(slot, "OAR", self.a_racial)
  ini_write_real(slot, "OAHC", self.a_hair_color)
  ini_write_real(slot, "OAHL", self.a_hair_length)
  ini_write_real(slot, "OAH-", self.a_hair_straightness)
  ini_write_real(slot, "OAHS", self.a_hair_style)
  ini_write_real(slot, "MFD", self.food)
  ini_write_real(slot, "MBE", self.bonus_encounters)
  ini_write_real(slot, "MBP", self.bonus_payment)
  ini_write_real(slot, "MBC", self.bonus_combat)
  ini_write_real(slot, "MBH", self.bonus_health)
  ini_write_real(slot, "BHD", self.bounty_distance)
  let ii, ii2
  for (let i = 0; i < 20; i++) {
    if (i < 10) {
      ii = "A0" + string(i)
    } else {
      ii = "A" + string(i)
    }
    ini_write_string(slot, ii, self.advantages[i])
  }
  for (let i = 0; i < 15; i++) {
    if (i < 10) {
      ii = "I0" + string(i)
      ii2 = "N0" + string(i)
    } else {
      ii = "I" + string(i)
      ii2 = "N" + string(i)
    }
    ini_write_string(slot, ii, self.inventory[i][0])
    ini_write_real(slot, ii2, self.inventory[i][1])
  }
  ini_close()
}

function tag_replace(content) {
  // NOTE: was not returning or reassinging shit (strings). must be usin wack ass version of gml
  // TODO: edit all uses of tag replace
  content = string_replace_all(content, "/name", obj_stats.name)
  content = string_replace_all(content, "/skin", obj_stats.skin)
  content = string_replace_all(content, "/height", obj_stats.height)
  content = string_replace_all(content, "/weight", obj_stats.weight)
  content = string_replace_all(content, "/hair_c", obj_stats.hair_c)
  content = string_replace_all(content, "/hair_l", obj_stats.hair_l)
  return content
}

function town_gen() {
  let relief = 0
  if (advantage_exist(Advantages.relief_girl)) {
    relief = 0.05
  } else {
    relief = 0
  }
  let roll = 0
  if (obj_stats.location < 7 /* Locations.island */) {
    roll = irandom_range(1, 6)
  } else {
    roll = irandom_range(1, 6)
  }
  if (roll === 7) {
    roll += obj_stats.location - 1
  }
  obj_stats.loc_1_type = roll
  obj_stats.loc_1_name = get_text_town_name(roll)
  obj_stats.loc_1_dist = irandom_range(0, 5) / 10 + 1 - relief
  obj_stats.loc_1_trt = irandom_range(1, 10)
  let i = ""
  switch (irandom_range(1, 6)) {
    case 1: i = Races.human; break
    case 2: i = Races.human; break
    case 3: i = Races.elf; break
    case 4: i = Races.dwarf; break
    case 5: i = Races.orc; break
    case 6: i = Races.mixed; break
  }
  obj_stats.loc_1_race = i
  if (obj_stats.location < 7 /* Locations.island */) {
    roll = irandom_range(1, 6)
  } else {
    roll = irandom_range(1, 6)
  }
  if (roll === 7) {
    roll += obj_stats.location - 1
  }
  obj_stats.loc_2_type = roll
  obj_stats.loc_2_name = get_text_town_name(roll)
  obj_stats.loc_2_dist = irandom_range(0, 5) / 10 + 1 - relief
  obj_stats.loc_2_trt = irandom_range(1, 10)
  i = ""
  switch (irandom_range(1, 6)) {
    case 1: i = Races.human; break
    case 2: i = Races.human; break
    case 3: i = Races.elf; break
    case 4: i = Races.dwarf; break
    case 5: i = Races.orc; break
    case 6: i = Races.mixed; break
  }
  obj_stats.loc_2_race = i
  if (obj_stats.location < 7 /* Locations.island */) {
    roll = irandom_range(1, 7)
  } else {
    roll = irandom_range(1, 6)
  }
  if (roll === 7) {
    roll += obj_stats.location - 1
  }
  obj_stats.loc_3_type = roll
  obj_stats.loc_3_name = get_text_town_name(roll)
  obj_stats.loc_3_dist = irandom_range(0, 5) / 10 + 1 - relief
  obj_stats.loc_3_trt = irandom_range(1, 10)
  i = ""
  switch (irandom_range(1, 6)) {
    case 1: i = Races.human; break
    case 2: i = Races.human; break
    case 3: i = Races.elf; break
    case 4: i = Races.dwarf; break
    case 5: i = Races.orc; break
    case 6: i = Races.mixed; break
  }
  switch (obj_stats.loc_3_type) {
    case 9: i = Races.elf; break
    case 11: i = Races.human; break
  }
  obj_stats.loc_3_race = i
  switch (obj_stats.location) {
    case Locations.port:
      obj_stats.location_1 = "Docks"
      obj_stats.location_2 = "Brothel"
      obj_stats.location_3 = "None"
      break
    case Locations.farmland:
      obj_stats.location_1 = "Stables"
      obj_stats.location_2 = "Orchard"
      obj_stats.location_3 = "None"
      break
    case Locations.city:
      obj_stats.location_1 = "Theatre"
      obj_stats.location_2 = "Shady Shop"
      obj_stats.location_3 = "City Park"
      break
    case Locations.church:
      obj_stats.location_1 = "Temple"
      obj_stats.location_2 = "Bathhouse"
      obj_stats.location_3 = "None"
      break
    case Locations.university:
      obj_stats.location_1 = "University"
      obj_stats.location_2 = "Library"
      obj_stats.location_3 = "Magic Shop"
      break
    case Locations.military_camp:
      obj_stats.location_1 = "Barracks"
      obj_stats.location_2 = "Armory"
      obj_stats.location_3 = "Tavern"
      break
    case Locations.island:
      obj_stats.location_1 = "Beach"
      obj_stats.location_2 = "Spa"
      obj_stats.location_3 = "None"
      break
    case Locations.colosseum:
      obj_stats.location_1 = "Colosseum"
      obj_stats.location_2 = "Forum"
      obj_stats.location_3 = "Palace"
      break
    case Locations.forestry:
      obj_stats.location_1 = "Forestry"
      obj_stats.location_2 = "Lake"
      obj_stats.location_3 = "None"
      break
    case Locations.cult:
      obj_stats.location_1 = "Church"
      obj_stats.location_2 = "General Store"
      obj_stats.location_3 = "None"
      break
    case Locations.herbarium:
      obj_stats.location_1 = "Dojo"
      obj_stats.location_2 = "Tea House"
      obj_stats.location_3 = "Garden"
      break
    case Locations.barracks:
      obj_stats.location_1 = "Meeting Hall"
      obj_stats.location_2 = "Pagan Shrine"
      obj_stats.location_3 = "Kennel"
      break
    case Locations.slaver_camp:
      obj_stats.location_1 = "Slave Trader"
      obj_stats.location_2 = "Whore Den"
      obj_stats.location_3 = "None"
      break
    default:
      obj_stats.location_1 = "None"
      obj_stats.location_2 = "None"
      obj_stats.location_3 = "None"
      break
  }
}
