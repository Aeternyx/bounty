// classes and enums
/* global obj_stats, obj_dice, obj_dice_extra, irandom_range, random, floor, Colors, instance_create, instance_number, mouse_check_button_pressed, mouse_check_button_released */

// NOTE: 1: is dice divider; 2: is dice i think

const Tags = window.Tags = {
  hair_color: 0,
  hair_length: 1,
  hair_straightness: 2,
  hair_style: 3,
  eye_color: 4,
  skin_color: 5,
  height: 6,
  weight: 7,
  other: 8,
  racial: 9,
  breast_size: 10,
  ass_size: 11,
}

const SkillTypes = window.SkillTypes = {
  none: 0,
  vaginal: 1,
  anal: 2,
  oral: 3,
  hands: 4,
  sword: 5,
  axe: 6,
  weapon: 7,
  gangbang: 8,
}

const Sprites = window.Sprites = {
  spr_button: 0,
  spr_button_data: 1,
  spr_button_blank: 2,
  spr_button_increase: 3,
  spr_button_decrease: 4,
  spr_button_item_drop: 5,
  spr_button_item_use: 6,
  spr_button_small: 7,
  spr_button_arrow: 8,
  spr_button_round: 9,
  spr_scroll_bar_back: 10,
  spr_scroll_bar_tip: 11,
  spr_scroll_bar_center: 12,
  spr_star: 13,
  spr_advantage_block: 14,
  spr_item_block: 15,
  spr_equip_block: 16,
  spr_coins: 17,
  spr_control: 18,
  spr_encounter: 19,
  spr_bounty: 20,
  spr_travel: 21,
  spr_location: 22,
  spr_reader_block: 23,
  spr_main_block: 24,
  spr_stat_block: 25,
  spr_towns: 26,
  spr_towns_bonus: 27,
  spr_stat_icons: 28,
  spr_towns_races: 29,
  spr_bounty_title: 30,
  spr_bar_1: 31,
  spr_bar_2: 32,
  spr_divider: 33,
  spr_dice: 34,
  spr_dice_3: 35,
  spr_dice_2: 36,
  spr_dice_4: 37,
  spr_dice_5: 38,
  spr_mask_100x13: 39,
  spr_timeline_map: 40,
  spr_input_bar: 41,
}

// TODO: replace all usages of pressed = 1. do a grep idk even
const MouseButtons = window.MouseButtons = {
  none: 0,
  pressed: 1,
  left: 2,
  right: 3,
}

const Prices = window.Prices = {
  cheap: 1,
  standard: 2,
  expensive: 3,
}

const StatLevels = window.StatLevels = {
  low: 0,
  medium: 1,
  high: 2,
  over: 3,
}

const Classes = window.Classes = {
  obj_button_base: 0,
  obj_dice: 1,
  obj_dice_extra: 2,
  obj_stats: 3,
  obj_adv_button: 4,
  obj_adv_main_creation: 5,
  obj_char_button: 6,
  obj_char_main: 7,
  obj_subchar_button: 8,
  obj_subchar_main: 9,
  obj_timeline_button: 10,
  obj_timeline_main: 11,
  obj_subchar_bonuses: 12,
  obj_start_new: 13,
  obj_start_credits: 14,
  obj_start_config: 15,
  obj_general_next: 16,
  obj_general_back: 17,
  obj_general_goto_main: 18,
  obj_general_last_room: 19,
  obj_general_bounty: 20,
  obj_general_gameover: 21,
  obj_general_end: 22,
  obj_general_restart: 23,
  obj_general_restart_big: 24,
  obj_option_button: 25,
  obj_fame_button: 26,
  obj_option_main: 27,
  obj_fame_main: 28,
  obj_main_options: 29,
  obj_main_data: 30,
  obj_main_status: 31,
  obj_main_loc_main: 32,
  obj_main_loc_button: 33,
  obj_main_store: 34,
  obj_main_food: 35,
  obj_main_travel: 36,
  obj_main_encounter: 37,
  obj_encounter_repeat: 38,
  obj_store_button: 39,
  obj_store_main: 40,
  obj_travel_button: 41,
  obj_travel_reset: 42,
  obj_travel_main: 43,
  obj_road_goto_encounter: 44,
  obj_location_button: 45,
  obj_location_store: 46,
  obj_location_scroll: 47,
  obj_status_adv: 48,
  obj_status_aff: 49,
  obj_adv_main: 50,
  obj_status_mask: 51,
  obj_item_use: 52,
  obj_item_drop: 53,
  obj_data_save: 54,
  obj_data_desc: 55,
  obj_data_load: 56,
  obj_data_main: 57,
  obj_config_button: 58,
  obj_config_main: 59,
  obj_stat_block: 60,
  obj_stat_block_2: 61,
  obj_skill_block: 62,
  obj_character_block: 63,
  obj_advantage_block: 64,
  obj_item_block: 65,
  obj_equip_block: 66,
  obj_affliction_block: 67,
  obj_adv_reader: 68,
  obj_race_reader: 69,
  obj_equip_reader: 70,
  obj_timeline_reader: 71,
  obj_options_reader: 72,
  obj_encounter: 73,
  obj_day_begin: 74,
  obj_travel: 75,
  obj_location: 76,
  obj_bounty: 77,
  obj_main: 78,
  obj_intro: 79,
  obj_travel_block: 80,
  obj_main_block: 81,
  obj_timeline_map: 82,
  obj_title_logo: 83,
  obj_divider_fame: 84,
  obj_credits_list: 85,
  obj_main_debug: 86,
  obj_debug_button: 87,
  obj_debug_main: 88,
  obj_overview_button: 89,
  obj_overview_main: 90,
  obj_overview_finished: 91,
  obj_name_input: 92,
  obj_name_block: 93,
  obj_appearance_reader: 94,
  obj_status_app: 95,
  obj_intro_edit: 96,
}

const Rooms = window.Rooms = {
  rm_init: 0,
  rm_start: 1,
  rm_credits: 2,
  rm_timeline: 3,
  rm_intro_1: 4,
  rm_intro_2: 5,
  rm_intro_3: 6,
  rm_creation_1: 7,
  rm_creation_1_2: 8,
  rm_creation_2: 9,
  rm_creation_3: 10,
  rm_main: 11,
  rm_store: 12,
  rm_options: 13,
  rm_config: 14,
  rm_status: 15,
  rm_advantages: 16,
  rm_afflictions: 17,
  rm_location: 18,
  rm_data: 19,
  rm_day_begin: 20,
  rm_encounter: 21,
  rm_bounty: 22,
  rm_travel: 23,
  rm_gameover: 24,
  rm_road: 25,
  rm_road_encounter: 26,
  rm_victory_1: 27,
  rm_victory_2: 28,
  rm_victory_3: 29,
  rm_debug: 30,
  rm_appearance: 31,
}

const Fonts = window.Fonts = {
  f_button: 0,
  f_console: 1,
  f_header: 2,
}

const StatTypes = window.StatTypes = {
  body: "Body",
  mind: "Mind",
  charm: "Charm",
}

const Acceptances = window.Acceptances = {
  resist: 1,
  decline: 2,
  accept: 3,
  inside: 4,
}

const Locations = window.Locations = {
  port: 1,
  farmland: 2,
  city: 3,
  church: 4,
  university: 5,
  military_camp: 6,
  island: 7,
  colosseum: 8,
  forestry: 9,
  cult: 10,
  herbarium: 11,
  barracks: 12,
  slaver_camp: 13,
}
// NOTE: proper names: Island, Capital, Enclave, Cult, Eastern, and Barbarian

const AttackedActions = window.AttackedActions = {
  submit: 0,
  win: 1,
  lose: 2,
}

const GameOvers = window.GameOvers = {
  captured: "Captured",
  raped: "Raped",
}

// TODO: consistency between half-elf and half-orc treatment
const Races = window.Races = {
  none: "",
  mixed: "Mixed",
  human: "Human",
  half_elf: "Half Elf",
  elf: "Elf",
  dwarf: "Dwarf",
  halfling: "Halfling",
  goblin: "Goblin",
  orc: "Orc",
}

const Subraces = window.Subraces = {
  [Races.human]: {
    noble: "Noble",
    barbarian: "Barbarian",
    armegian: "Armegian",
  },
  [Races.elf]: {
    high: "High",
    wild: "Wild",
    deep: "Deep",
  },
  [Races.dwarf]: {
    hill: "Hill",
    mountain: "Mountain",
  },
  [Races.halfling]: {
    rural: "Rural",
    fae: "Fae",
  },
  [Races.goblin]: {
    green: "Green",
    black: "Black",
  },
  [Races.orc]: {
    half: "Half",
    tribal: "Tribal",
  },
}

const Dangers = window.Dangers = {
  none: 0,
  inside: 1,
  rough: 2,
  threaten: 3,
  rape: 4,
}

const EquipmentTypes = window.EquipmentTypes = {
  sword: 1,
  axe: 2,
  body: 3,
  legs: 4,
  feet: 5,
}

const WeaponClasses = window.WeaponClasses = {
  unarmed: "Unarmed",
  sword: "Sword",
  axe: "Axe",
}

const Victories = window.Victories = {
  virgin: 1,
  defiled: 2,
  pregnant: 3,
}

const Subvictories = window.Subvictories = {
  [Victories.virgin]: {
  },
  [Victories.defiled]: {
    kitchen_worker: 1,
    drill_sergeant: 2,
    accountant: 3,
    dancer: 4,
  },
  [Victories.pregnant]: {
    normal: 1,
    miscarried: 2,
  },
}

const Advantages = window.Advantages = {
  none: "None",
  free: "Free",
  elf: "Elf",
  small: "Small",
  xenophobic: "Xenophobic",
  well_off: "Well-Off",
  slut: "Slut",
  big_tits: "Big Tits",
  healthy: "Healthy",
  feisty: "Feisty",
  immunity: "Immunity",
  tight_pussy: "Tight Pussy",
  naturally_wet: "Naturally Wet",
  cum_dumpster: "Cum Dumpster",
  willpower: "Willpower",
  unbreakable: "Unbreakable",
  perfect_ass: "Perfect Ass",
  gag_resist: "Gag Resist",
  titfuck: "Titfuck",
  deepthroat: "Deepthroat",
  footjob: "Footjob",
  discreet_feet: "Discreet Feet", // NOTE: Discrete Feet in source
  beautiful_feet: "Beautiful Feet",
  party_girl: "Party Girl",
  nympho: "Nympho",
  gangbang_slut: "Gangbang Slut",
  seduce: "Seduce",
  succubus: "Succubus",
  relief_girl: "Relief Girl",
  sensual: "Sensual",
  lesbianism: "Lesbianism",
  gentle_hands: "Gentle Hands",
  ass_pussy: "Ass Pussy",
  cum_in_me: "Cum In Me!",
  stretchy_body: "Stretchy Body",
  connections: "Connections",
  versatility: "Versatility",
  mastery: "Mastery",
  elf_maiden: "Elf Maiden",
  mistress: "Mistress",
  orc_warrior: "Orc Warrior",
  orc_berserker: "Orc Berserker",
  goblin_lust: "Goblin Lust",
  goblin_breeder: "Goblin Breeder",
  dwarf_pleasure: "Dwarf Pleasure",
  neophyte: "Neophyte",
  acolyte: "Acolyte",
  beastmaster: "Beastmaster",
  recruit: "Recruit",
  enchantress: "Enchantress",
}

function add_fame(fame) {
  obj_stats.fame += fame
  obj_stats.fame_current += fame
}

function advantage_add(advantage) {
  let success = false
  for (let i = 0; i < 20; i++) {
    if (obj_stats.advantages[i] === Advantages.none || obj_stats.advantages[i] === Advantages.free && advantage !== Advantages.free) {
      obj_stats.advantages[i] = advantage
      break
    }
  }
  switch (advantage) {
    case Advantages.well_off:
      obj_stats.cash += 100
      break
    case Advantages.slut:
      // NOTE: +1 all in source; description says otherwise
      obj_stats.vaginal += 2
      obj_stats.anal += 2
      obj_stats.oral += 2
      obj_stats.hands += 2
      obj_stats.virgin = false
      break
    case Advantages.big_tits:
      obj_stats.charm += 1
      break
    case Advantages.healthy:
      break
    case Advantages.feisty:
      obj_stats.sword += 2
      obj_stats.axe += 2
      break
    case Advantages.discreet_feet:
      obj_stats.negotiate += 1
      break
    case Advantages.seduce:
      obj_stats.negotiate += 1
      break
    case Advantages.elf_maiden:
      obj_stats.negotiate += 1
      break
    case Advantages.mistress:
      obj_stats.vaginal += 1
      obj_stats.anal += 1
      obj_stats.oral += 1
      obj_stats.hands += 1
      break
    case Advantages.orc_warrior:
      obj_stats.life += 10
      break
    case Advantages.enchantress:
      break
    case Advantages.orc_berserker:
      obj_stats.body += 1
      obj_stats.life += 10
      break
    case Advantages.mastery:
      advantage_add(Advantages.free)
      advantage_add(Advantages.free)
      obj_stats.level += 1
      break
  }
}

function advantage_exist(advantage) {
  for (let i = 0; i < 20; i++) {
    if (obj_stats.advantages[i] == advantage)
      return true
  }
  return false
}

function button_click() {
  const self = this
  if ('__override_button' in self) {
    self.pressed = self.__override_button
    delete self.__override_button
    return
  }
  if (self.active) {
    if (mouse_check_button_pressed(1) || mouse_check_button_pressed(2)) {
      self.pressed = MouseButtons.pressed
    }
  }
  if (mouse_check_button_released(1)) {
    if (!self.active) {
      self.pressed = MouseButtons.none
    } else if (self.active && self.pressed === MouseButtons.pressed) {
      self.pressed = MouseButtons.left
    }
  } else if (mouse_check_button_released(2)) {
    if (!self.active) {
      self.pressed = MouseButtons.none
    } else if (self.active && self.pressed === MouseButtons.pressed) {
      self.pressed = MouseButtons.right
    }
  }
}

function button_create(x, yy) {
  const self = this
  if (self.x === 20 && self.yy === 400) {
    self.x = 220
    self.yy = 0
  }
  self.inst = instance_create(x, yy, self.obj)
  self.yy += 40
}

function cap_stat(stat, stat_cap, stat_change) {
  if (stat <= stat_cap || stat_change < 0) {
    stat += stat_change
    if (stat > stat_cap) {
      stat = stat_cap
    } else if (stat < 0) {
      stat = 0
    }
  }
  return stat
}

function check_allure() {
  let i = 0, allure = obj_stats.fame_allure
  while (allure >= 6) {
    allure -= 6
    i += 1
  }
  if (irandom_range(1, 6) >= allure) {
    i += 1
  }
  return i
}

// TODO: add NOTE to Discrete Feet and stuff and uhh that 1 misspelt perk... Fiesty

function check_multi(arg) {
  let i = 0, ii = 1, town = 1
  if (obj_stats.location_trait === 1) {
    town = 1.2
  }
  if (obj_stats.location_trait === 2) {
    town = 0.8
  }
  if (advantage_exist(Advantages.xenophobic)) {
    if (obj_stats.location_race !== obj_stats.race) {
      town -= 0.1
    }
  }
  // NOTE: source had missing breaks here
  switch (arg) {
    case 1: i = 1.2; break
    case 2: i = 1.2; break
    case 3: i = 1; break
    case 4:
      if (advantage_exist(Advantages.footjob)) {
        ii += 0.5
      }
      if (advantage_exist(Advantages.discreet_feet)) {
        i += 0.25
      }
      if (advantage_exist(Advantages.beautiful_feet)) {
        i += 0.25
      }
      i = 0.5 * ii
      break
    case 5:
      i = 1
      if (advantage_exist(Advantages.sensual)) {
        i += 0.25
      }
      break
    case 6:
      i = 1
      if (advantage_exist(Advantages.lesbianism)) {
        i += 0.5
      }
  }
  i *= town
  // TODO: encounter type none. vrey important.
  // TODO: check like the ~ bools in encounter or something. also improtum
  if (obj_stats.negotiate_used !== 0) {
    if (!advantage_exist(Advantages.succubus)) {
      i *= 0.5
    }
  }
  return i
}

function inventory_exist(item, amount) {
  for (let i = 0; i < 15; i++) {
    if (obj_stats.inventory[i][0] === item && obj_stats.inventory[i][1] >= amount) {
      return true
    }
  }
  return false
}

function check_req(a, b, c, d) {
  let ii = 0, i = ""
  for (let r = 0; r < 4; r++) {
    i = [a, b, c, d][r]
    switch (i) {
      case "V":
        if (obj_stats.o_vaginal >= 3) {
          ii += 1
        }
        break
      case "VI":
        if (obj_stats.o_vaginal >= 4) {
          ii += 1
        }
        break
      case "A":
        if (obj_stats.o_anal >= 3) {
          ii += 1
        }
        break
      case "AI":
        if (obj_stats.o_anal >= 4) {
          ii += 1
        }
        break
      case "O":
        if (obj_stats.o_oral >= 3) {
          ii += 1
        }
        break
      case "OI":
        if (obj_stats.o_oral >= 4) {
          ii += 1
        }
        break
      case "H":
        if (obj_stats.o_hands >= 3) {
          ii += 1
        }
        break
      case "G":
        if (obj_stats.o_gangbang >= 3) {
          ii += 1
        }
        break
      case null:
        ii += 1
        break
    }
  }
  return ii === 4 // whether all 4 checks succeeded
}

function check_skill(type) {
  // TODO: even longer
  let i = 0
  switch (type) {
    case SkillTypes.vaginal:
      i = obj_stats.vaginal
      if (advantage_exist(Advantages.tight_pussy)) {
        i += 2
      }
      if (advantage_exist(Advantages.naturally_wet)) {
        i += 2
      }
      if (advantage_exist(Advantages.beautiful_feet)) {
        i += 2
      }
      if (advantage_exist(Advantages.goblin_lust)) {
        if (stat_low(obj_stats.hygiene) === StatLevels.low) {
          i += 1
        }
      }
      if (advantage_exist(Advantages.goblin_breeder)) {
        if (stat_low(obj_stats.hygiene) <= StatLevels.medium) {
          i += 1
        }
      }
      i -= obj_stats.sick_v
      break
    case SkillTypes.anal:
      i = obj_stats.anal
      if (advantage_exist(Advantages.ass_pussy)) {
        i += 3
      }
      if (advantage_exist(Advantages.dwarf_plasure)) {
        i += 2
      }
      if (advantage_exist(Advantages.goblin_lust)) {
        if (stat_low(obj_stats.hygiene) === StatLevels.low) {
          i += 1
        }
      }
      if (advantage_exist(Advantages.goblin_breeder)) {
        if (stat_low(obj_stats.hygiene) <= StatLevels.medium) {
          i += 1
        }
      }
      if (advantage_exist(Advantages.perfect_ass)) {
        if (obj_stats.virgin) {
          i += 1
        }
      }
      i -= obj_stats.sick_a
      break
    case SkillTypes.oral:
      i = obj_stats.oral
      if (advantage_exist(Advantages.titfuck)) {
        i += 2
      }
      if (advantage_exist(Advantages.deepthroat)) {
        i += 2
      }
      if (advantage_exist(Advantages.gentle_hands)) {
        i += 2
      }
      if (advantage_exist(Advantages.goblin_lust)) {
        if (stat_low(obj_stats.hygiene) === StatLevels.low) {
          i += 1
        }
      }
      if (advantage_exist(Advantages.goblin_breeder)) {
        if (stat_low(obj_stats.hygiene) <= StatLevels.medium) {
          i += 1
        }
      }
      i -= obj_stats.sick_o
      break
    case SkillTypes.hands:
      i = obj_stats.hands
      if (advantage_exist(Advantages.gentle_hands)) {
        i += 2
      }
      if (advantage_exist(Advantages.goblin_lust)) {
        if (stat_low(obj_stats.hygiene) === StatLevels.low) {
          i += 1
        }
      }
      if (advantage_exist(Advantages.goblin_breeder)) {
        if (stat_low(obj_stats.hygiene) <= StatLevels.medium) {
          i += 1
        }
      }
      if (advantage_exist(Advantages.naturally_wet)) {
        if (obj_stats.virgin) {
          i += 1
        }
      }
      if (inventory_exist("Manicure & pedicure", 1)) {
        i += 1
      }
      i -= obj_stats.sick_h
      break
    case SkillTypes.sword:
      i = obj_stats.sword
      if (advantage_exist(Advantages.fencer)) {
        i += 2
      }
      break
    case SkillTypes.axe:
      i = obj_stats.axe
      if (advantage_exist(Advantages.orc_warrior)) {
        i += 2
      }
      break
    case SkillTypes.weapon:
      switch (obj_stats.weapon_class) {
        case WeaponClasses.unarmed:
          i = 0
          break
        case WeaponClasses.sword:
          i = obj_stats.sword
          if (advantage_exist(Advantages.fencer)) {
            i += 2
          }
          break
        case WeaponClasses.axe:
          i = obj_stats.axe
          if (advantage_exist(Advantages.orc_warrior)) {
            i += 2
          }
          break
      }
      i += obj_stats.weapon_type
      i += check_stat(StatTypes.body) // obj_stats.body
      if (advantage_exist(Advantages.recruit)) {
        i += 1
      }
      if (advantage_exist(Advantages.feisty)) {
        i += 2
      }
      if (advantage_exist(Advantages.feisty)) {
        if (obj_stats.virgin) {
          i += 1
        }
      }
      if (advantage_exist(Advantages.small)) {
        i -= 1
      }
      // TODO: enum for subrace
      if (obj_stats.subrace === Subraces[Races.halfling].fae) {
        i -= 1
      }
      if (stat_low(obj_stats.life) === StatLevels.over) {
        i += 1
      }
      break
  }
  return i
}

function check_stat(stat) {
  let i = 0
  switch (stat) {
    case "Body":
      i = obj_stats.body
      if (stat_low(obj_stats.life) === StatLevels.low) {
        i -= 2
      }
      break
    case "Mind":
      i = obj_stats.mind
      break
    case "Charm":
      i = obj_stats.charm
      if (stat_low(obj_stats.life) === StatLevels.medium) {
        i -= 1
      } else if (stat_low(obj_stats.life) === StatLevels.low) {
        i -= 2
      }
      if (inventory_exist("Silver combs", 0)) {
        i += 1
      }
      if (advantage_exist(Advantages.enchantress)) {
        i += 1
      }
      if (obj_stats.virgin) {
        if (advantage_exist(Advantages.elf_maiden)) {
          i += 1
        }
      }
      break
  }
  return i
}

function compare_stats(a, b) {
  // NOTE: in the source it was 3, 2, 1
  if (b > a) {
    stat_color(100)
  } else if (b === a) {
    stat_color(70)
  } else if (b < a) {
    stat_color(40)
  }
}

function draw_cash(x, text, bal, valign_ig, halign_ig) {
  let i = bal, c = 0, s = 9, g = 0, p = 0, ii = 0
  // NOTE: redone. because ew while loops.
  p = floor(i / 1000)
  i %= 1000
  g = floor(i / 100)
  i %= 100
  s = floor(i / 10)
  i %= 10
  c = i
  // redone big brain currency thing end
  i = 0
  ii = 10
  // TODO: is ii ever set...
  draw_set_halign(0)
  draw_set_valign(0)
  if (arguments.length > 3) {
    draw_set_halign(halign_ig)
  }
  if (p > 0) {
    // TODO: second arg is text or color?
    draw_text(x + i, text, string(p))
    i += ii
    draw_sprite(17, 3, x + i, text)
    i += ii
  }
  if (g > 0) {
    draw_text(x + i, text, string(g))
    i += ii
    draw_sprite(17, 2, x + i, text)
    i += ii
  }
  if (s > 0) {
    draw_text(x + i, text, string(s))
    i += ii
    draw_sprite(17, 1, x + i, text)
    i += ii
  }
  if (c > 0) {
    draw_text(x + i, text, string(c))
    i += ii
    draw_sprite(17, 0, x + i, text)
    i += ii
  }
}

function draw_stats(x, y, base, current) {
  draw_text(x, y, string(base))
  if (current > base) {
    draw_set_color(Colors.c_aqua)
  } else if (current === base) {
    draw_set_color(Colors.c_silver)
  } else if (current < base) {
    draw_set_color(make_color_rgb(255, 50, 50))
  }
  draw_text(x + 25, y, "(" + string(current) + ")")
  draw_set_color(Colors.c_white)
}

function get_afflictions(type, amount) {
  let ii = amount
  if (advantage_exist(Advantages.healthy)) {
    ii -= 1
  }
  if (advantage_exist(Advantages.immunity)) {
    ii -= 1
  }
  switch (stat_low(obj_stats.hygiene)) {
    case StatLevels.over:
      ii -= 1
      break
    case StatLevels.medium:
      ii += 1
      break
    case StatLevels.low:
      ii += 2
      break
  }
  if (obj_stats.hygiene === 0) {
    ii += 2
  }
  i = ""
  let roll = roll_d6(ii, "Health hazard", 2)
  if (roll >= 13) {
    switch (roll_d6(0, "Affliction")) {
      case 1:
        obj_stats.hygiene = cap_stat(obj_stats.hygiene, 100, -10)
        i = "##You smell horrible after everything. You don't feel sick, but you should consider yourself lucky."
        break
      case 2:
        obj_stats.mood = cap_stat(obj_stats.mood, 100, -10)
        i = "##You itch for a while after. It eventually stops, but you can't help but feel worried about what could have happened."
        break
      case 3:
        if (advantage_exist(Advantages.immunity)) {
          i = "##You sneeze a few times, but otherwise seem to be fine after that. It must be something you're immune to."
          break
        }
        break // NOTE: there was no break here??!
      case 4:
        if (obj_stats.sick_level < 3) {
          obj_stats.sick_level += 1
          i = "##You aren't feeling so well after that."
        }
        break // NOTE: nor here
      case 5:
        switch (type) {
          case SkillTypes.vaginal:
            obj_stats.sick_v += 1
            break
          case SkillTypes.anal:
            obj_stats.sick_a += 1
            break
          case SkillTypes.oral:
            obj_stats.sick_o += 1
            break
          case SkillTypes.hands:
            obj_stats.sick_h += 1
            break
        }
        i = "##You don't feel very clean after that. You may have caught something."
        break // NOTE: here too... sigh
      case 6:
        switch (type) {
          case SkillTypes.vaginal:
            obj_stats.sick_v += 2
            break
          case SkillTypes.anal:
            obj_stats.sick_a += 2
            break
          case SkillTypes.oral:
            obj_stats.sick_o += 2
            break
          case SkillTypes.hands:
            obj_stats.sick_h += 2
            break
        }
        i = "##You've caught something pretty bad from that. Hopefully nobody else will notice."
        break
    }
  }
  return i
}

function get_race(race, subrace) {
  let i = false
  if (obj_stats.race === race) {
    i = true
    if (arguments.length > 1) {
      if (obj_stats.subrace !== subrace) {
        i = false
      }
    }
  }
  return i
}

function get_request(num) {
  i = SkillTypes.none
  // NOTE: used to be vvaooh; now vvaohgg
  switch (num) {
    case 1:
    case 2:
      i = SkillTypes.vaginal
      break
    case 3:
      i = SkillTypes.anal
      break
    case 4:
    case 5:
      i = SkillTypes.oral
      break
    case 6:
      i = SkillTypes.hands
      break
  }
  // NOTE: gangbang
  // TODO: -2 to deactivate
  let threshold = 2 // 2
  if (advantage_exist(Advantages.gangbang_slut)) {
    threshold += 1
  }
  if (roll_d6(0, "Gangbang chance", 2) <= threshold) {
    i = SkillTypes.gangbang
  }
  if (advantage_exist(Advantages.perfect_ass)) {
    switch (i) {
      case SkillTypes.vaginal:
        i = SkillTypes.anal
        break
      case SkillTypes.anal:
        // NOTE: to swap the chances i guess. note that this does not affect chances w/ gangbang slut
        i = SkillTypes.vaginal
        break
    }
  }
  return i
}

function loc_but(name, price, req1=null, req2=null, req3=null, req4=null) {
  const self = this
  let i = 0
  if (self.button_1 === "None") {
    i = 1
  } else if (self.button_2 === "None") {
    i = 2
  } else if (self.button_3 === "None") {
    i = 3
  }
  switch (i) {
    case 1:
      self.button_1 = name
      self.button_1_price = price
      if (arguments.length > 2) {
        self.button_1_req1 = req1
      }
      if (arguments.length > 3) {
        self.button_1_req2 = req2
      }
      if (arguments.length > 4) {
        self.button_1_req3 = req3
      }
      if (arguments.length > 5) {
        self.button_1_req4 = req4
      }
      break
    case 2:
      self.button_2 = name
      self.button_2_price = price
      if (arguments.length > 2) {
        self.button_2_req1 = req1
      }
      if (arguments.length > 3) {
        self.button_2_req2 = req2
      }
      if (arguments.length > 4) {
        self.button_2_req3 = req3
      }
      if (arguments.length > 5) {
        self.button_2_req4 = req4
      }
      break
    case 3:
      self.button_3 = name
      self.button_3_price = price
      if (arguments.length > 2) {
        self.button_3_req1 = req1
      }
      if (arguments.length > 3) {
        self.button_3_req2 = req2
      }
      if (arguments.length > 4) {
        self.button_3_req3 = req3
      }
      if (arguments.length > 5) {
        self.button_3_req4 = req4
      }
      break
  }
}

function location_store_button(type, name, cost) {
  let self = this
  if (self.b1_type === 0) {
    self.b1_type = type
    self.b1_name = name
    self.b1_cost = cost
  } else if (self.b2_type === 0) {
    self.b2_type = type
    self.b2_name = name
    self.b2_cost = cost
  } else if (self.b3_type === 0) {
    self.b3_type = type
    self.b3_name = name
    self.b3_cost = cost
  } else if (self.b4_type === 0) {
    self.b4_type = type
    self.b4_name = name
    self.b4_cost = cost
  } else if (self.b5_type === 0) {
    self.b5_type = type
    self.b5_name = name
    self.b5_cost = cost
  }
}

function location_store_create() {
  const self = this
  let i = 0
  self.inst = null
  self.level = 1
  self.obj = obj_store_button
  if (self.b1_type > 0) {
    button_create.call(self, self.x, self.yy)
    self.inst.type = self.b1_type
    self.inst.price = self.b1_cost
    self.inst.text = self.b1_name
    self.inst.level = self.level + 1
  }
  if (self.b2_type > 0) {
    button_create.call(self, self.x, self.yy)
    self.inst.type = self.b2_type
    self.inst.price = self.b2_cost
    self.inst.text = self.b2_name
    self.inst.level = self.level + 1
  }
  if (self.b3_type > 0) {
    button_create.call(self, self.x, self.yy)
    self.inst.type = self.b3_type
    self.inst.price = self.b3_cost
    self.inst.text = self.b3_name
    self.inst.level = self.level + 1
  }
  if (self.b4_type > 0) {
    button_create.call(self, self.x, self.yy)
    self.inst.type = self.b4_type
    self.inst.price = self.b4_cost
    self.inst.text = self.b4_name
    self.inst.level = self.level + 1
  }
  if (self.b5_type > 0) {
    button_create.call(self, self.x, self.yy)
    self.inst.type = self.b5_type
    self.inst.price = self.b5_cost
    self.inst.text = self.b5_name
    self.inst.level = self.level + 1
  }
  obj_store_button.instances.forEach(function() {
    let self = this
    if (self.type > 0) {
      if (self.type < 6) {
        self.text = get_text_equip_name(self.level, self.type)
      }
    }
  })
}

function stat_color(stat) {
  switch (stat_low(stat)) {
    case StatLevels.low:
      draw_set_color(make_color_rgb(255, 50, 50))
      break
    case StatLevels.medium:
      draw_set_color(make_color_rgb(255, 200, 50))
      break
    case StatLevels.high:
      draw_set_color(Colors.c_white)
      break
    case StatLevels.over:
      draw_set_color(Colors.c_aqua)
      break
  }
}

function stat_low(stat) {
  if (stat <= 40) {
    return StatLevels.low
  }
  if (stat <= 70) {
    return StatLevels.medium
  }
  if (stat <= 100) {
    return StatLevels.high
  }
  if (stat > 100) {
    return StatLevels.over
  }
  return StatLevels.high
}

function pregnancy() {
  let preg = false
  if (obj_stats.vaginal < 3) {
    preg = false
  } else if (obj_stats.vaginal < 10) {
    preg = irandom_range(1, 20) === 1
  } else {
    preg = irandom_range(1, 6) === 1
  }
  if (preg) {
    if (inventory_exist("Spermicide")) {
      inventory_sub("Spermicide", 1)
      preg = false
    }
  }
  if (preg) {
    obj_stats.pregnant = true
    return true
  } else {
    return false
  }
}

// TODO: idfk ok
function roll_d6(mod, text, extra_dice) {
  let size = obj_stats.dice_size,
    i = floor(random(6)) + 1 + mod,
    ii = instance_create(80 + instance_number(obj_dice_extra) * 20 * size + instance_number(obj_dice) * 25 * size, 480 - 20 * size, obj_dice)
  ii.image_index = i - 1 - mod
  if (text !== "None") {
    ii.text = text
  }
  let roll = i
  if (arguments.length > 2) {
    for (let j = 1; j < extra_dice; j++) {
      i = floor(random(6)) + 1 + mod
      roll += i
      ii = instance_create(75 + instance_number(obj_dice_extra) * 20 * size + instance_number(obj_dice) * 25 * size, 480 - 20 * size, obj_dice_extra)
      ii.image_index = i - 1 - mod
      if (text !== "None") {
        ii.text = text
      }
    }
  }
  return roll
}
