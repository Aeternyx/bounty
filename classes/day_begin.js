// GML
// classes and enums
/* globals obj_stats, obj_general_next, obj_general_bounty, Races, Subraces, Advantages, StatLevels, Fonts */
// functions and stuff
/* globals get_race, advantage_exist, inventory_exist, inventory_sub, roll_d6, stat_low, life_modify, get_text_food */

class DayBegin extends GMLObject {
  create() {
    super.create()
    let self = this
    let i = ""
    let eat = 0 // TODO: bool?
    let wash = 0
    let hygiene_cap = 100
    let life_cap = 100
    let mood_cap = 100
    // if (obj_stats.race == Races.half_orc) {
    if (get_race(Races.orc, Subraces[Races.orc].half)) {
      life_cap += 30
    }
    if (advantage_exist(Advantages.orc_warrior)) {
      life_cap += 10
    }
    if (advantage_exist(Advantages.orc_berserker)) {
      life_cap += 10
    }
    self.food = 0
    self.hygiene = 0
    self.life = 0
    self.cash = 0
    self.text = ""
    self.mood = 0
    obj_stats.actions = 1
    if (inventory_exist("Silken sheets", 0)) {
      switch (irandom_range(1, 3)) {
        case 1: self.text = "After a great sleep with your luxury bed set, you begin preparations for the upcoming day."; break
        case 2: self.text = "You begin preparations for the upcoming day, renewed from your silken slumber."; break
        case 3: self.text = "Everything feels wonderful after a romp with your soft sheets, and you begin your daily preparations."; break
      }
      self.mood += 1
    } else {
      self.text = "You begin preparations for the upcoming day. "
    }
    if (inventory_exist("Luxurious soap", 1)) {
      inventory_sub("Luxurious soap", 1)
      wash = 2
      self.hygiene += roll_d6(24, "Wash with luxurious soap")
      // hygiene_cap = 130
      hygiene_cap += 30 // NOTE: changed to work with bonuses
    } else if (inventory_exist("Soap", 1)) {
      inventory_sub("Soap", 1)
      wash = 1
      self.hygiene += roll_d6(12, "Wash with soap")
    } else {
      self.hygiene += 2
    }
    // NOTE: was if (obj_stats.hygiene > 70) {
    switch (stat_low(obj_stats.hygiene)) {
      case StatLevels.over:
      case StatLevels.high:
        switch (wash) {
          case 2: i = "##The soapy gel feels great against your skin. After rinsing it from your sparkling body, you can't help but to smell yourself."; break
          case 1: i = "##Mixing soap into some water, you gently rinse your body."; break
          case 0: i = "##You spend a little bit of time rinsing your fairly-clean body.";  break
        }
        break
      case StatLevels.medium:
        switch (wash) {
          case 2: i = "##Massaging the liquid soap into your body feels amazing, and you feel much cleaner after washing yourself."; break
          case 1: i = "##You wash your body thoroughly with soap, cleansing your body from your previous exploits."; break
          case 0: i = "##You try to wash yourself with a wet washrag, but it's not very effective without soap.";  break
        }
        break
      default:
        switch (wash) {
          case 2: i = "##You hold nothing back as you work the fragrant soap all over your grimy body, paying extra attention to your loins. The dirt and stains rapidly fade as your skin returns to it's normal colors."; break
          case 1: i = "##You scrub your disgusting body with soap and water, removing dried cum and sweat. You still feel gross, but you're much cleaner than when you started."; break
          case 0: i = "##You scrub your filthy cum-soaked body, but without soap, you feel just as dirty as when you started.";  break
        }
        break
    }
    if (inventory_exist("Scented candle", 1)) {
      if (self.mood < 80) {
        // let roll = floor(random(4)) + 1
        switch (irandom_range(1, 4)) {
          case 1: i += " You burned a candle while bathing, filling the air with a vanilla aroma."; break
          case 2: i += " While you were cleaning up, you burned a candle, making a fruity aroma."; break
          case 3: i += " Your candle burns while you bathe, emitting a cinnamon aroma."; break
          case 4: i += " The scent of lavender fills the air as your candle burns."; break
        }
      }
    }
    self.text += i
    if (inventory_exist("Silver combs", 1)) {
      // let roll = floor(random(3)) + 1
      i = "##Spending some time using your silver combs, "
      switch (irandom_range(1, 3)) {
        case 1: i += "your hair feels clean and silky, making you look much more attractive."; break
        case 2: i += "the light causes your hair to shine, looking more beautiful than ever."; break
        case 3: i += "the comb easily sinks into your hair, smoothing it out."; break
      }
      self.text += i
    }
    if (inventory_exist("Perfume", 1)) {
      inventory_sub("Perfume", 1)
      if (!inventory_exist("Perfume", 1)) {
        self.text += "##You empty the last of your perfume onto your fingers before applying."
      } else {
        self.text += "##When you've finished, you dab some perfume onto your wrists and neck."
      }
    }
    obj_stats.encounters += 1
    if (inventory_exist("Manicure & pedicure", 1)) {
      inventory_sub("Manicure & pedicure", 1)
      if (!inventory_exist("Manicure & pedicure", 1)) {
        self.text += "##Your manicure and pedicure has worn off, and your nails look dull again."
      }
    }
    self.food = obj_stats.food
    switch (self.food) {
      case 1:
        if (obj_stats.cash >= 5) {
          obj_stats.life -= life_modify(roll_d6(0, "Food effect"))
          obj_stats.cash -= 5
          eat = 1
        }
        break
      case 2:
        if (obj_stats.cash >= 10) {
          obj_stats.life += 1
          obj_stats.cash -= 10
          eat = 2
        }
        break
      case 3:
        if (obj_stats.cash >= 30) {
          obj_stats.life += life_modify(roll_d6(0, "Food effect"))
          obj_stats.cash -= 30
          // life_cap = 130
          life_cap += 30 // NOTE: changed to work with bonuses
          eat = 3
        }
        break
      case 5:
        // 1-day free meal i guess
        obj_stats.life += 1
        eat = 5
        obj_stats.food = 2
        break
    }
    // NOTE: eat is mostly the same as obj_stats.food. for now at least.
    if (eat > 0) {
      i = "##For lunch, you had " + string(get_text_food(self.food)) + "."
    } else {
      // starve ;_;
      obj_stats.life -= roll_d6(12, "Starvation")
      i = "##Your stomach growls the entire day. If only you were able to get something to eat."
    }
    self.text += i
    let sick = 0, sick_mod = 0 // TODO: big TODO
    switch (stat_low(obj_stats.hygiene)) {
      case 0: sick_mod = -2; break
      case 1: sick_mod = -1; break
      case 2: sick_mod = 0; break
      case 3: sick_mod = 1; break
    }
    sick_mod += advantage_exist(Advantages.healthy) + advantage_exist(Advantages.immunity) + obj_stats.bonus_health
    sick = roll_d6(sick_mod, "Illness recover", 2)
    if (sick >= 9) {
      i = 0
      if (obj_stats.sick_level > 0) {
        obj_stats.sick_level -= 1
        i += 1
      }
      if (obj_stats.sick_v > 0) {
        obj_stats.sick_v -= 1
        i += 1
      }
      if (obj_stats.sick_a > 0) {
        obj_stats.sick_a -= 1
        i += 1
      }
      if (obj_stats.sick_o > 0) {
        obj_stats.sick_o -= 1
        i += 1
      }
      if (obj_stats.sick_h > 0) {
        obj_stats.sick_h -= 1
        i += 1
      }
      if (i > 0) {
        switch (irandom_range(1, 3)) {
          case 1: i = "##You feel a lot better today than you did yesterday."; break
          case 2: i = "##Your body doesn't feel as bad today."; break
          case 3: i = "##You're starting to recover from your sickness."; break
        }
        self.text += i
      }
    }
    obj_stats.bonus_health = 0
    if (obj_stats.bounty_distance === 0) {
      let stealth = 0
      if (inventory_exist("Elven cloak")) {
        stealth = 1
      }
      // if (obj_stats.subrace === "Black") {
      if (get_race(Races.goblin, Subraces[Races.goblin].black)) {
        stealth = 1
      }
      let bounty = roll_d6(-stealth, "Bounty hunter activity")
      if (bounty > 3) {
        obj_general_next.instances.forEach(self => {
          instance_change.call(self, obj_general_bounty, true)
        })
      }
    } else if (obj_stats.bounty_distance > 0) {
      obj_stats.bounty_distance -= 1
    }
    obj_stats.cash += self.cash
    if (obj_stats.life < life_cap) {
      if (self.life !== 0) {
        obj_stats.life += self.life
        if (obj_stats.life > life_cap) {
          obj_stats.life = life_cap
        }
      }
    }
    if (obj_stats.hygiene < hygiene_cap) {
      if (self.hygiene !== 0) {
        obj_stats.hygiene += self.hygiene
        if (obj_stats.hygiene > hygiene_cap) {
          obj_stats.hygiene = hygiene_cap
        }
      }
    }
    if (obj_stats.mood < mood_cap) {
      if (self.mood !== 0) {
        obj_stats.mood += self.mood
        if (obj_stats.mood > mood_cap) {
          obj_stats.mood = mood_cap
        }
      }
    }
    self.text += "##Afterwards, you set out to make some coin."
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

window.classes.push(DayBegin)
window.obj_day_begin = __gml_proto_proxy(DayBegin.prototype)
