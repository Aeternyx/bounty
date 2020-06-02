// gml
// classes and enums
/* globals obj_status_mask, obj_stat_block, obj_stat_block_2, obj_skill_block, obj_advantage_block, obj_item_block, obj_item_drop, obj_item_use, obj_equip_block, obj_affliction_block, obj_travel_block, Advantages, Rooms, Fonts, SkillTypes, StatLevels, Races, Sprites */
// functions and stuff
/* globals room_goto, load_config, get_text_town_name, town_gen, advantage_add, stat_color, draw_cash, draw_stats, check_stat, check_skill, item_bound, stat_low */

class Stats extends GMLObject {
  create() {
    super.create()
    const self = this
    self.debug = false
    self.fpsreal = fps_real
    self.data = 0
    self.last_room = room
    self.race = "Human"
    self.subrace = ""
    self.spec_training = 0
    self.fame_current = 0
    self.fame_renown = 0
    self.fame_value = 0
    self.fame_allure = 0
    self.sick_level = 0
    self.sick_v = 0
    self.sick_a = 0
    self.sick_o = 0
    self.sick_h = 0
    self.name = ""
    self.skin = ""
    self.height = ""
    self.weight = ""
    self.hair_c = ""
    self.hair_l = ""
    self.dice_type = 1
    self.dice_size = 1
    self.bar_type = 1
    self.bar_visible = 4
    self.screen_outline = 1
    self.scale_type = 1
    self.title_bar = 1
    self.title_text = ""
    load_config.call(self)
    self.body = 3
    self.mind = 3
    self.charm = 3
    self.mood = 80
    self.life = 100
    self.cash = 15
    self.hygiene = 80
    self.virgin = 1
    self.vaginal = 0
    self.anal = 0
    self.oral = 0
    self.hands = 0
    self.sword = 0
    self.axe = 0
    self.fame = 0
    self.encounters = 0
    self.negotiate = 0
    self.negotiate_used = 0
    self.negotiate_inside = 0
    self.weapon_type = 0
    self.weapon_name = "None"
    self.weapon_class = "Unarmed"
    self.armor_top_type = 0
    self.armor_top_name = "Tattered Dress"
    self.armor_leg_type = 0
    self.armor_leg_name = "Tattered Skirt"
    self.armor_foot_type = 0
    self.armor_foot_name = "Tattered Shoes"
    self.timeline = 1
    self.pregnant = 0
    self.captured = 0
    self.stage_tier = 1
    self.stage = 1
    self.location = irandom_range(1, 6) // floor(random(6)) + 1 // TODO: this is fake dice roll
    self.distance = 12
    self.location_name = get_text_town_name(self.location)
    self.stage = 1
    self.actions = 1
    self.location_1 = "FAILED"
    self.location_2 = "TO"
    self.location_3 = "LOAD"
    self.location_now = "None"
    self.location_choice_1 = "ERROR"
    self.location_choice_2 = "PLEASE"
    self.location_choice_3 = "REPORT"
    self.location_trait = 0
    self.location_race = "Human"
    self.loc_reset = 1
    self.loc_1_type = 1
    self.loc_1_name = "ERROR"
    self.loc_1_dist = 1
    self.loc_2_type = 1
    self.loc_2_name = "SCRIPT"
    self.loc_2_dist = 1
    self.loc_3_type = 1
    self.loc_3_name = "FAILURE"
    self.loc_3_dist = 1
    self.loc_1_trt = 0
    self.loc_2_trt = 0
    self.loc_3_trt = 0
    self.loc_1_race = "Human"
    self.loc_2_race = "Human"
    self.loc_3_race = "Human"
    self.level = 1
    self.xp = 0
    self.xp_next = 20
    self.xp_stats = 0
    self.xp_vaginal = 0
    self.xp_anal = 0
    self.xp_oral = 0
    self.xp_hands = 0
    self.o_vaginal = 3
    self.o_anal = 3
    self.o_oral = 3
    self.o_hands = 3
    self.o_gangbang = 3
    self.o_price = 2
    self.o_safety = 2
    self.o_prostitution = 2
    self.o_self_defense = 2
    self.visits = 1
    self.food = 2
    self.bonus_encounters = 0
    self.bonus_payment = 0
    self.bonus_combat = 0
    self.bonus_health = 0
    self.bounty_distance = 9
    self.gameover = 0
    self.advantages = []
    self.inventory = []
    for (let i = 0; i < 20; i++) {
      self.advantages[i] = Advantages.none
    }
    for (let i = 0; i < 15; i++) {
      self.inventory[i] = ["None", 0]
    }
    town_gen()
  }
  
  // draw
  /* globals draw_set_ext, draw_set_color, draw_set_transformed, draw_set_font, draw_set_halign, draw_set_valign, draw_sprite, draw_sprite_ext, draw_rectangle, Colors */
  // draw text
  /* globals draw_text, draw_text_ext, draw_text_color, draw_text_transformed, draw_text_ext_color, draw_text_ext_transformed, draw_text_transformed_color, draw_text_ext_transformed_color, draw_highscore */
  // align
  /* globals VAligns, HAligns */
  draw() {
    const self = this
    let ii = 13 // TODO: wats dis
    let mask = false
    let obj = null
    if (!instance_exists(obj_status_mask)) {
      mask = true
    }
    if (self.screen_outline) {
      draw_set_color(Colors.c_dark_gray)
      draw_rectangle(0, 0, 639, 479, 1)
    }
    let i
    if (self.bar_type === 1) {
      i = Sprites.spr_bar_1
    } else if (self.bar_type === 2) {
      i = Sprites.spr_bar_2
    }
    if (self.bar_visible === 2 || self.bar_visible === 4) {
      draw_sprite(i, 0, 0, 0)
    }
    if (self.bar_visible === 3 || self.bar_visible === 4) {
      draw_sprite(i, 1, 0, 440)
    }
    if (self.title_bar) {
      draw_set_font(Fonts.f_header)
      draw_set_halign(HAligns.fa_left)
      draw_set_valign(VAligns.fa_middle)
      draw_set_color(Colors.c_white)
      draw_text(10, 20, self.title_text)
    }
    if (instance_exists(obj_stat_block)) {
      let xx = obj_stat_block.x
      let yy = obj_stat_block.y
      draw_set_font(Fonts.f_console)
      draw_set_halign(HAligns.fa_left)
      draw_set_valign(VAligns.fa_top)
      draw_set_color(Colors.c_white)
      if (self.subrace === "") {
        draw_text(xx, yy, string(self.race) + " female")
      } else {
        draw_text(xx, yy, string(self.subrace) + " " + string(self.race) + " female")
      }
      let i = yy + ii
      stat_color(self.life)
      draw_text(xx + 12, i, string(self.life))
      draw_sprite(Sprites.spr_stat_icons, 0, xx, i)
      stat_color(self.mood)
      draw_text(xx + 78, i, string(self.mood))
      draw_sprite(Sprites.spr_stat_icons, 1, xx + 66, i)
      stat_color(self.hygiene)
      draw_text(xx + 145, i, string(self.hygiene))
      draw_sprite(Sprites.spr_stat_icons, 2, xx + 133, i)
      i += ii
      draw_set_color(Colors.c_white)
      draw_cash(xx, i, self.cash)
      i += ii
      i += ii
      draw_text(xx, i, " Body: ")
      draw_stats(xx + 80, i, self.body, check_stat("Body"))
      i += ii
      draw_text(xx, i, " Mind: ")
      draw_stats(xx + 80, i, self.mind, check_stat("Mind"))
      i += ii
      draw_text(xx, i, " Charm: ")
      draw_stats(xx + 80, i, self.charm, check_stat("Charm"))
      i += ii
    }
    if (instance_exists(obj_stat_block_2)) {
      let xx = obj_stat_block_2.x
      let yy = obj_stat_block_2.y
      let i = yy
      draw_set_font(Fonts.f_console)
      draw_set_halign(HAligns.fa_right)
      draw_set_valign(VAligns.fa_top)
      draw_set_color(Colors.c_white)
      draw_text(xx + 190, i, "XP: " + string(self.xp) + "/" + string(self.xp_next))
      draw_set_halign(HAligns.fa_left)
      draw_text(xx, i, "Level: " + string(self.level))
      i += ii
      draw_text(xx, i, "Fame: " + string(self.fame))
      i += ii
      draw_text(xx, i, "Combat Score: " + string(check_skill(SkillTypes.weapon)))
      i += ii
      if (self.virgin) {
        draw_text(xx, i, "Virginity intact")
        i += ii
      } else if (!self.virgin) {
        draw_set_color(Colors.c_gray)
        draw_text(xx, i, "Virginity lost")
        i += ii
      }
      if (self.pregnant) {
        draw_set_color(Colors.c_gray)
        draw_text(xx, i, "Pregnant")
        i += ii
      }
    }
    if (instance_exists(obj_skill_block)) {
      let xx = obj_skill_block.x
      let yy = obj_skill_block.y
      draw_set_font(Fonts.f_console)
      draw_set_halign(HAligns.fa_left)
      draw_set_valign(VAligns.fa_top)
      draw_set_color(Colors.c_white)
      draw_text(xx + 10, yy, "Skills")
      yy += ii
      draw_text(xx, yy, "Vaginal")
      yy += ii
      draw_text(xx, yy, "Anal")
      yy += ii
      draw_text(xx, yy, "Oral")
      yy += ii
      draw_text(xx, yy, "Hands")
      yy += ii
      draw_text(xx, yy, "Sword")
      yy += ii
      draw_text(xx, yy, "Axe")
      yy += ii
      draw_text(xx, yy, "Negotiate")
      yy += ii
      xx = obj_skill_block.x + 80
      yy = obj_skill_block.y
      yy += ii
      draw_stats(xx, yy, self.vaginal, check_skill(SkillTypes.vaginal))
      yy += ii
      draw_stats(xx, yy, self.anal, check_skill(SkillTypes.anal))
      yy += ii
      draw_stats(xx, yy, self.oral, check_skill(SkillTypes.oral))
      yy += ii
      draw_stats(xx, yy, self.hands, check_skill(SkillTypes.hands))
      yy += ii
      draw_stats(xx, yy, self.sword, check_skill(SkillTypes.sword))
      yy += ii
      draw_stats(xx, yy, self.axe, check_skill(SkillTypes.axe))
      yy += ii
      draw_text(xx, yy, string(self.negotiate))
      yy += ii
      xx = obj_skill_block.x + 140
      yy = obj_skill_block.y
      draw_text(xx, yy, "XP")
      yy += ii
      draw_set_color(Colors.c_gray)
      draw_text(xx, yy, self.xp_vaginal + "/" + string((self.vaginal + 1) * 10))
      yy += ii
      draw_text(xx, yy, self.xp_anal + "/" + string((self.anal + 1) * 10))
      yy += ii
      draw_text(xx, yy, self.xp_oral + "/" + string((self.oral + 1) * 10))
      yy += ii
      draw_text(xx, yy, self.xp_hands + "/" + string((self.hands + 1) * 10))
      yy += ii
    // TODO
    }
    if (instance_exists(obj_advantage_block)) {
      let xx = obj_advantage_block.x
      let yy = obj_advantage_block.y
      draw_set_font(Fonts.f_console)
      draw_set_halign(HAligns.fa_left)
      draw_set_valign(VAligns.fa_top)
      draw_set_color(Colors.c_white)
      draw_text(xx, yy, "Perks:")
      yy += ii
      i = 0
      for (let i = 0; i < 20; i++) {
        if (self.advantages[i] !== Advantages.none || self.debug) {
          draw_text(xx, yy, string(self.advantages[i]))
          if (mask) {
            let obj = instance_create(xx, yy, obj_status_mask)
            obj.type = 1 // NOTE: type = advantage
            obj.number = self.advantages[i]
          }
        }
        yy += ii
      }
    }
    if (instance_exists(obj_item_block)) {
      let xx = obj_item_block.x
      let yy = obj_item_block.y
      draw_set_font(Fonts.f_console)
      draw_set_halign(HAligns.fa_left)
      draw_set_valign(VAligns.fa_top)
      draw_set_color(Colors.c_white)
      draw_text(xx, yy, "Items:")
      yy += ii
      for (let i = 0; i < 15; i++) {
        if (self.inventory[i][0] !== "None" || self.debug) {
          draw_text(xx, yy, string(self.inventory[i][0]))
          if (self.inventory[i][1] !== 0) {
            draw_set_halign(HAligns.fa_right)
            draw_text(xx + 164, yy, string(self.inventory[i][1]))
            draw_set_halign(HAligns.fa_left)
          }
          if (mask) {
            let obj = instance_create(xx, yy, obj_status_mask)
            obj.type = 2 // NOTE: type = inventory
            obj.number = self.inventory[i][1]
            if (!item_bound(self.inventory[i][0])) {
              let obj = instance_create(xx + 200, yy + 3, obj_item_drop)
              obj.item = self.inventory[i][0]
            }
            if (!item_bound(self.inventory[i][0])) {
              let obj = instance_create(xx + 188, yy + 3, obj_item_use)
              obj.item = self.inventory[i][0]
            }
          }
        }
        yy += ii
      }
    }
    if (instance_exists(obj_equip_block)) {
      let xx = obj_equip_block.x
      let yy = obj_equip_block.y
      draw_set_font(Fonts.f_console)
      draw_set_halign(HAligns.fa_left)
      draw_set_valign(VAligns.fa_top)
      draw_set_color(Colors.c_white)
      let i = yy
      draw_text(xx, i, "Arms: [" + string(self.weapon_type) + "]")
      i += ii
      draw_text(xx, i, string(self.weapon_name))
      i += ii
      draw_text(xx, i, "Body: [" + string(self.armor_top_type) + "]")
      i += ii
      draw_text(xx, i, string(self.armor_top_name))
      i += ii
      draw_text(xx, i, "Legs: [" + string(self.armor_leg_type) + "]")
      i += ii
      draw_text(xx, i, string(self.armor_leg_name))
      i += ii
      draw_text(xx, i, "Feet: [" + string(self.armor_foot_type) + "]")
      i += ii
      draw_text(xx, i, string(self.armor_foot_name))
      i += ii
    }
    if (instance_exists(obj_affliction_block)) {
      let count = 0
      let sick_text = ""
      let xx = obj_affliction_block.x
      let yy = obj_affliction_block.y
      draw_set_font(Fonts.f_console)
      draw_set_halign(HAligns.fa_left)
      draw_set_valign(VAligns.fa_top)
      draw_set_color(Colors.c_white)
      if (self.sick_level > 0) {
        switch (self.sick_level) {
          case 1: sick_text += "You're feeling a little under the weather."; break
          case 2: sick_text += "You're not feeling all that great right now."; break
          case 3: sick_text += "You feel absolutely terrible. Maybe you should get some rest."; break
        }
        count += 1
      }
      if (self.sick_v > 0) {
        sick_text += "##Vaginal -" + string(self.sick_v)
        count += 1
      }
      if (self.sick_a > 0) {
        sick_text += "##Anal -" + string(self.sick_a)
        count += 1
      }
      if (self.sick_o > 0) {
        sick_text += "##Oral -" + string(self.sick_o)
        count += 1
      }
      if (self.sick_h > 0) {
        sick_text += "##Hands -" + string(self.sick_h)
        count += 1
      }
      if (count === 0) {
        switch (stat_low(self.life)) {
          case StatLevels.over: sick_text += "You've never felt better!"; break
          case StatLevels.high: sick_text += "You're feeling pretty good right now."; break
          case StatLevels.medium: sick_text += "You're bruised a bit, but otherwise healthy."; break
          case StatLevels.low: sick_text += "You're falling apart, but at least you're not sick."; break
        }
        switch (stat_low(self.hygiene)) {
          case StatLevels.over: sick_text += "##How could you even get sick, being as clean as you are?"; break
          case StatLevels.high: sick_text += "##Your self-maintenance probably keeps you safe."; break
          case StatLevels.medium: sick_text += "##You're about as resistant to illnesses as the average person around you."; break
          case StatLevels.low:
            if (self.hygiene !== 0) {
              sick_text += "##Deep down, you understand that you're going to come down with something if you don't take better care of yourself."
            } else {
              sick_text += "##It's a miracle you're not riddled with disease right now."
            }
            break
        }
      } else {
        switch (stat_low(self.hygiene)) {
          case StatLevels.over: sick_text += "##With your lifestyle, you should be over it very soon."; break
          case StatLevels.high: sick_text += "##Hopefully, it will all pass soon."; break
          case StatLevels.medium: sick_text += "##You feel like cleaning yourself would make you feel better."; break
          case StatLevels.low:
            if (self.hygiene !== 0) {
              sick_text += "##You'd feel better if you weren't caked in grime. Maybe you should clean yourself up."
            } else {
              sick_text += "##Your body is only going to get worse from here. You desperately need to clean yourself up."
            }
            break
        }
      }
      draw_text_ext(xx, yy, string(sick_text), 13, 390)
    }
    if (instance_exists(obj_travel_block)) {
      let spr = null
      let xx = obj_travel_block.x
      let yy = obj_travel_block.y
      draw_set_font(Fonts.f_console)
      draw_set_halign(HAligns.fa_left)
      draw_set_valign(VAligns.fa_top)
      draw_set_color(Colors.c_white)
      let i = yy
      draw_sprite_ext(Sprites.spr_towns, self.loc_1_type - 1, xx, i, 1, 1, 0, Colors.c_white, 1)
      if (self.loc_1_trt <= 2) {
        draw_sprite(Sprites.spr_towns_bonus, self.loc_1_trt - 1, xx + 40, i + 20)
      }
      draw_text(xx + 42, i, string(self.loc_1_name))
      switch (self.loc_1_race) {
        case Races.human:
          draw_sprite(Sprites.spr_towns_races, 0, xx + 60, i + 20)
          draw_sprite(Sprites.spr_towns_races, 0, xx + 70, i + 20)
          draw_sprite(Sprites.spr_towns_races, 0, xx + 80, i + 20)
          break
        case Races.elf:
          draw_sprite(Sprites.spr_towns_races, 1, xx + 60, i + 20)
          draw_sprite(Sprites.spr_towns_races, 1, xx + 70, i + 20)
          draw_sprite(Sprites.spr_towns_races, 1, xx + 80, i + 20)
          break
        case Races.dwarf:
          draw_sprite(Sprites.spr_towns_races, 2, xx + 60, i + 20)
          draw_sprite(Sprites.spr_towns_races, 2, xx + 70, i + 20)
          draw_sprite(Sprites.spr_towns_races, 2, xx + 80, i + 20)
          break
          case Races.orc:
          draw_sprite(Sprites.spr_towns_races, 3, xx + 60, i + 20)
          draw_sprite(Sprites.spr_towns_races, 3, xx + 70, i + 20)
          draw_sprite(Sprites.spr_towns_races, 3, xx + 80, i + 20)
          break
        case Races.mixed:
          // NOTE: 1 0 2 lmao seems a bit arbitrary. also no orcs big gae
          draw_sprite(Sprites.spr_towns_races, 1, xx + 60, i + 20)
          draw_sprite(Sprites.spr_towns_races, 0, xx + 70, i + 20)
          draw_sprite(Sprites.spr_towns_races, 2, xx + 80, i + 20)
          break
      }
      i += 40
      if (self.loc_1_type !== 14) {
        draw_sprite_ext(Sprites.spr_towns, self.loc_2_type - 1, xx, i, 1, 1, 0, Colors.c_white, 1)
        if (self.loc_2_trt <= 2) {
          draw_sprite(Sprites.spr_towns_bonus, self.loc_2_trt - 1, xx + 40, i + 20)
        }
        draw_text(xx + 42, i, string(self.loc_2_name))
        switch (self.loc_2_race) {
          case Races.human:
            draw_sprite(Sprites.spr_towns_races, 0, xx + 60, i + 20)
            draw_sprite(Sprites.spr_towns_races, 0, xx + 70, i + 20)
            draw_sprite(Sprites.spr_towns_races, 0, xx + 80, i + 20)
            break
          case Races.elf:
            draw_sprite(Sprites.spr_towns_races, 1, xx + 60, i + 20)
            draw_sprite(Sprites.spr_towns_races, 1, xx + 70, i + 20)
            draw_sprite(Sprites.spr_towns_races, 1, xx + 80, i + 20)
            break
          case Races.dwarf:
            draw_sprite(Sprites.spr_towns_races, 2, xx + 60, i + 20)
            draw_sprite(Sprites.spr_towns_races, 2, xx + 70, i + 20)
            draw_sprite(Sprites.spr_towns_races, 2, xx + 80, i + 20)
            break
            case Races.orc:
            draw_sprite(Sprites.spr_towns_races, 3, xx + 60, i + 20)
            draw_sprite(Sprites.spr_towns_races, 3, xx + 70, i + 20)
            draw_sprite(Sprites.spr_towns_races, 3, xx + 80, i + 20)
            break
          case Races.mixed:
            draw_sprite(Sprites.spr_towns_races, 1, xx + 60, i + 20)
            draw_sprite(Sprites.spr_towns_races, 0, xx + 70, i + 20)
            draw_sprite(Sprites.spr_towns_races, 2, xx + 80, i + 20)
            break
        }
        i += 40
        draw_sprite_ext(Sprites.spr_towns, self.loc_3_type - 1, xx, i, 1, 1, 0, Colors.c_white, 1)
        if (self.loc_3_trt <= 2) {
          draw_sprite(Sprites.spr_towns_bonus, self.loc_3_trt - 1, xx + 40, i + 20)
        }
        draw_text(xx + 42, i, string(self.loc_3_name))
        switch (self.loc_3_race) {
          case Races.human:
            draw_sprite(Sprites.spr_towns_races, 0, xx + 60, i + 20)
            draw_sprite(Sprites.spr_towns_races, 0, xx + 70, i + 20)
            draw_sprite(Sprites.spr_towns_races, 0, xx + 80, i + 20)
            break
          case Races.elf:
            draw_sprite(Sprites.spr_towns_races, 1, xx + 60, i + 20)
            draw_sprite(Sprites.spr_towns_races, 1, xx + 70, i + 20)
            draw_sprite(Sprites.spr_towns_races, 1, xx + 80, i + 20)
            break
          case Races.dwarf:
            draw_sprite(Sprites.spr_towns_races, 2, xx + 60, i + 20)
            draw_sprite(Sprites.spr_towns_races, 2, xx + 70, i + 20)
            draw_sprite(Sprites.spr_towns_races, 2, xx + 80, i + 20)
            break
            case Races.orc:
            draw_sprite(Sprites.spr_towns_races, 3, xx + 60, i + 20)
            draw_sprite(Sprites.spr_towns_races, 3, xx + 70, i + 20)
            draw_sprite(Sprites.spr_towns_races, 3, xx + 80, i + 20)
            break
          case Races.mixed:
            draw_sprite(Sprites.spr_towns_races, 1, xx + 60, i + 20)
            draw_sprite(Sprites.spr_towns_races, 0, xx + 70, i + 20)
            draw_sprite(Sprites.spr_towns_races, 2, xx + 80, i + 20)
            break
        }
        i += 40
      }
    }
    if (self.debug) {
      draw_set_halign(HAligns.fa_left)
      draw_set_valign(VAligns.fa_top)
      draw_set_color(Colors.c_white)
      draw_set_font(Fonts.f_console)
      draw_text(0, 462, string(self.fpsreal.toFixed(2)))
    }
  }
  
  alarm0() {
    super.alarm0()
    const self = this
    self.fpsreal = fps_real
    self.alarm[0] = 30
  }
  
  // a
  keypress65() {
    super.keypress65()
    const self = this
    if (self.debug) {
      self.actions = 1
      if (room === Rooms.rm_main) {
        room_restart()
      }
    }
  }
  
  // c
  keypress67() {
    super.keypress67()
    const self = this
    if (self.debug) {
      self.cash += 100
    }
  }
  
  // f
  keypress70() {
    super.keypress70()
    const self = this
    if (self.debug) {
      add_fame(1)
    }
  }
  
  // h
  keypress72() {
    super.keypress72()
    const self = this
    if (self.debug) {
      self.hygiene += 10
    }
  }
  
  // l
  keypress76() {
    super.keypress76()
    const self = this
    if (self.debug) {
      self.life += 10
    }
  }
  
  // m
  keypress77() {
    super.keypress77()
    const self = this
    if (self.debug) {
      self.mood += 10
    }
  }
  
  // p
  keypress80() {
    super.keypress80()
    const self = this
    if (self.debug) {
      advantage_add(Advantages.free)
    }
  }
  
  // f9
  keypress120() {
    super.keypress120()
    const self = this
    if (self.debug) {
      self.debug = false
      delete self.alarm[0]
    } else {
      self.debug = true
      self.alarm[0] = 30
    }
  }
  
  roomstart() {
    super.roomstart()
    const self = this
    if (self.life <= 0) {
      self.gameover = "Raped"
      room_goto(Rooms.rm_gameover)
    }
    let i = ""
    switch (room) {
      case Rooms.rm_timeline: i = "Timeline"; break
      case Rooms.rm_intro_1: case Rooms.rm_intro_2: case Rooms.rm_intro_3: i = "Intro"; break
      case Rooms.rm_creation_1: i = "New Character - Race"; break
      case Rooms.rm_creation_1_2: i = "New Character - Sub-race"; break
      case Rooms.rm_creation_2: i = "New Character - Perks"; break
      case Rooms.rm_creation_3: i = "New Character - Overview"; break
      case Rooms.rm_main: i = self.location_name; break
      case Rooms.rm_status: i = "Character"; break
      case Rooms.rm_store: i = "Marketplace"; break
      case Rooms.rm_advantages: i = "Perks"; break
      case Rooms.rm_location: i = self.location_now; break
      case Rooms.rm_road: i = "On The Road"; break
      case Rooms.rm_data: i = "Data"; break
      case Rooms.rm_options: i = "Options"; break
      case Rooms.rm_config: i = "Configuration"; break
      default: i = ""; break
    }
    self.title_text = i
  }
  
  roomend() {
    super.roomend()
    const self = this
    self.last_room = room
  }
}

window.classes.push(Stats)
Stats.prototype.persistent = true
Stats.prototype.depth = -1
window.obj_stats = __gml_proto_proxy(Stats.prototype)
