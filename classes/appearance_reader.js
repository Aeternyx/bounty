// gml
/* globals GMLObject, string_lower */
// classes and enums
/* globals obj_race_reader, obj_char_button, obj_subchar_button, Fonts, Advantages */
// functions and stuff
/* globals get_text_races */

class AppearanceReader extends GMLObject {
  create() {
    const self = this
    self.text = "You are a female "
    if (!get_race(Races.half_elf)) {
      self.text += string_lower(obj_stats.subrace) + " "
    }
    self.text += string_lower(obj_stats.race) + ". ##You have "
    if (obj_stats.a_hair_style !== 3 && obj_stats.a_hair_style !== 7) {
      // if not plural
      if (obj_stats.a_hair_color === 6) {
        self.text += "an "
      } else {
        self.text += "a "
      }
    }
    let i = ""
    switch (obj_stats.a_hair_color) {
      case 1: i = "Platinum Blonde"; break
      case 2: i = "Blonde"; break
      case 3: i = "Dirty Blonde"; break
      case 4: i = "Brown"; break
      case 5: i = "Black"; break
      case 6: i = "Orange"; break
      case 7: i = "Red"; break
    }
    self.text += string_lower(i)
    if (obj_stats.a_hair_style <= 7) {
      switch (obj_stats.a_hair_length) {
        case 1: i = "Short"; break
        case 2: i = "Neck Length"; break
        case 3: i = "Shoulder Length"; break
        case 4: i = "Shoulder Blade Length"; break
        case 5: i = "Waist Length"; break
        case 6: i = "Ass Length"; break
        case 7: i = "Hip Length"; break
        case 8: i = "Knee Length"; break
        case 9: i = "Floor Length"; break
      }
      self.text += ", " + string_lower(i)
    }
    switch (obj_stats.a_hair_straightness) {
      case 1: i = "Straight"; break
      case 2: i = "Wavy"; break
      case 3: i = "Curly"; break
    }
    self.text += ", " + string_lower(i)
    switch (obj_stats.a_hair_style) {
      case 1: i = "Hair"; break
      case 2: i = "Ponytail"; break
      case 3: i = "Twintails"; break
      case 4: i = "Half-Bun"; break
      case 5: i = "Braid"; break
      case 6: i = "Twin Braid"; break
      case 7: i = "Dreadlocks"; break
      case 8: i = "Pixie Cut"; break
      case 9: i = "Bob Cut"; break
      case 10: i = "Bun"; break
    }
    self.text += " " + string_lower(i) + ". ##You have "
    switch (obj_stats.a_eye_color) {
      case 1: i = "Blue"; break
      case 2: i = "Green"; break
      case 3: i = "Hazel"; break
      case 4: i = "Grey"; break
      case 5: i = "Brown"; break
      case 6: i = "Black"; break
      case 7: i = "Red"; break
      case 8: i = "Silver"; break
    }
    self.text += string_lower(i) + " eyes and "
    switch (obj_stats.a_skin_color) {
      case 1: i = "Pale"; break
      case 2: i = "Fair"; break
      case 3: i = "Light"; break
      case 4: i = "Tanned"; break
      case 5: i = "Coffee"; break
      case 6: i = "Chocolate"; break
      case 7: i = "Brown"; break
      case 8: i = "Dark"; break
      case 9: i = "Green"; break
      case 10: i = "Black"; break
    }
    self.text += string_lower(i) + " skin, and you are "
    switch (obj_stats.a_height) {
      case 1: i = "Short"; break
      case 2: i = "Of Average Height"; break
      case 3: i = "Tall"; break
    }
    self.text += string_lower(i) + " and "
    switch (obj_stats.a_weight) {
      case 1: i = "Skinny"; break
      case 2: i = "Of Average Weight"; break
      case 3: i = "Chubby"; break
    }
    self.text += string_lower(i)
    if (obj_stats.a_other !== 1) {
      switch (obj_stats.a_other) {
        case 2: i = "Freckles"; break
        case 3: i = "Facepaint"; break
        case 4: i = "Eye Scar"; break
        case 5: i = "Nose Scar"; break
        case 6: i = "Battlescars"; break
        case 7: i = "Heavy Battlescars"; break
      }
      self.text += ", with " + string_lower(i)
    }
    if (obj_stats.a_racial !== 1 && (get_race(Races.elf) || get_race(Races.goblin) || get_race(Races.orc))) {
      if (obj_stats.a_other !== 1) {
        self.text += " and "
      } else {
        self.text += ", with "
      }
      switch (obj_stats.race) {
        case Races.elf:
          switch (obj_stats.a_racial) {
            case 2: i = "Pointed Ears"; break
            case 3: i = "Long Pointed Ears"; break
          }
          break
        case Races.goblin:
          switch (obj_stats.a_racial) {
            case 2: i = "Fangs"; break
          }
          break
        case Races.orc:
          switch (obj_stats.a_racial) {
            case 2: i = "Tusks"; break
            case 3: i = "Fangs"; break
            case 4: i = "Tusks and Fangs"; break
          }
          break
      }
      self.text += string_lower(i)
    }
    self.text += "."
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
    draw_text_ext(self.x, self.y, self.text, 13, 600)
  }
}

window.classes.push(AppearanceReader)
window.obj_race_reader = __gml_proto_proxy(AppearanceReader.prototype)
