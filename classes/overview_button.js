// gml
// classes and enums
/* globals ButtonBase, obj_stats, MouseButtons, Rooms, Fonts */
// functions and stuff
/* globals button_click, advantage_exist */

class OverviewButton extends ButtonBase {
  // draw
  /* globals draw_set_ext, draw_set_color, draw_set_transformed, draw_set_font, draw_set_halign, draw_set_valign, draw_sprite, Colors */
  // draw text
  /* globals draw_text, draw_text_ext, draw_text_color, draw_text_transformed, draw_text_ext_color, draw_text_ext_transformed, draw_text_transformed_color, draw_text_ext_transformed_color, draw_highscore */
  // align
  /* globals VAligns, HAligns */
  draw() {
    const self = this
    draw_set_font(Fonts.f_button)
    draw_set_halign(HAligns.fa_center)
    draw_set_valign(VAligns.fa_middle)
    if (self.locked) {
      draw_set_color(Colors.c_gray)
    } else if (self.pressed) {
      draw_set_color(Colors.c_yellow)
    } else if (!self.pressed) {
      draw_set_color(Colors.c_white)
    }
    if (self.locked) {
      draw_sprite(self.sprite_index, 2, self.x, self.y)
    } else {
      draw_sprite(self.sprite_index, self.pressed, self.x, self.y)
    }
    draw_text(self.x + 100, self.y + 10, string(self.text))
    draw_text(self.x + 100, self.y + 25, string(self.text2))
  }
  
  step() {
    const self = this
    if (self.number === "Hair Length") {
      if (obj_stats.a_hair_style > 7) {
        // NOTE: lengthless hair
        self.locked = true
        self.text2 = "N/A"
      } else {
        self.locked = false
      }
    }
    if (self.locked) {
      return
    }
    button_click.call(self)
    if (self.pressed === MouseButtons.left || self.pressed === MouseButtons.right) {
      let i
      if (self.pressed === MouseButtons.left) {
        i = 1
      } else {
        i = -1
      }
      switch (self.number) {
        case "Eye Color":
          obj_stats.a_eye_color += i
          if (!get_race(Races.goblin) && !get_race(Races.orc) && obj_stats.a_eye_color === 7) {
            obj_stats.a_eye_color += i
          }
          if (!get_race(Races.elf) && obj_stats.a_eye_color === 8) {
            // NOTE: can only happen when i === 1; so it never goes back to red-eye
            obj_stats.a_eye_color += i
          }
          if (obj_stats.a_eye_color === 9) {
            obj_stats.a_eye_color = 1
          } else if (obj_stats.a_eye_color === 0) {
            if (get_race(Races.elf)) {
              obj_stats.a_eye_color = 8
            } else if (get_race(Races.goblin) || get_race(Races.orc)) {
              obj_stats.a_eye_color = 7
            } else {
              obj_stats.a_eye_color = 6
            }
          }
          break
        case "Skin Color":
          obj_stats.a_skin_color += i
          if (get_race(Races.goblin) || get_race(Races.orc)) {
            if (get_race(Races.goblin, Subraces[Races.goblin].black)) {
              obj_stats.a_skin_color = 10
            } else {
              obj_stats.a_skin_color = 9
            }
            self.locked = true
          } else {
            if (obj_stats.a_skin_color === 9) {
              obj_stats.a_skin_color = 1
            } else if (obj_stats.a_skin_color === 0) {
              obj_stats.a_skin_color = 8
            }
          }
          break
        case "Height":
          obj_stats.a_height += i
          if (obj_stats.a_height === 4) {
            obj_stats.a_height = 1
          } else if (obj_stats.a_height === 0) {
            obj_stats.a_height = 3
          }
          break
        case "Weight":
          obj_stats.a_weight += i
          if (obj_stats.a_weight === 4) {
            obj_stats.a_weight = 1
          } else if (obj_stats.a_weight === 0) {
            obj_stats.a_weight = 3
          }
          break
        case "Other":
          obj_stats.a_other += i
          if (obj_stats.a_other === 8) {
            obj_stats.a_other = 1
          } else if (obj_stats.a_other === 0) {
            obj_stats.a_other = 7
          }
          break
        case "Racial":
          obj_stats.a_racial += i
          switch (obj_stats.race) {
            case Races.elf:
              if (obj_stats.a_racial === 4) {
                obj_stats.a_racial = 1
              } else if (obj_stats.a_racial === 0) {
                obj_stats.a_racial = 3
              }
              break
            case Races.goblin:
              if (obj_stats.a_racial === 3) {
                obj_stats.a_racial = 1
              } else if (obj_stats.a_racial === 0) {
                obj_stats.a_racial = 2
              }
              break
            case Races.orc:
              if (obj_stats.a_racial === 5) {
                obj_stats.a_racial = 1
              } else if (obj_stats.a_racial === 0) {
                obj_stats.a_racial = 4
              }
              break
          }
          break
        case "Hair Color":
          obj_stats.a_hair_color += i
          if (!get_race(Races.elf) && obj_stats.a_hair_color === 1) {
            // NOTE: can only happen when i === -1
            obj_stats.a_hair_color += i
          }
          if (obj_stats.a_hair_color === 8) {
            obj_stats.a_hair_color = 1
          } else if (obj_stats.a_hair_color === 0) {
            obj_stats.a_hair_color = 7
          }
          break
        case "Hair Length":
          obj_stats.a_hair_length += i
          if (obj_stats.a_hair_length === 10) {
            obj_stats.a_hair_length = 1
          } else if (obj_stats.a_hair_length === 0) {
            obj_stats.a_hair_length = 9
          }
          break
        case "Hair Straightness":
          obj_stats.a_hair_straightness += i
          if (obj_stats.a_hair_straightness === 4) {
            obj_stats.a_hair_straightness = 1
          } else if (obj_stats.a_hair_straightness === 0) {
            obj_stats.a_hair_straightness = 3
          }
          break
        case "Hair Style":
          obj_stats.a_hair_style += i
          if (obj_stats.a_hair_style === 11) {
            obj_stats.a_hair_style = 1
          } else if (obj_stats.a_hair_style === 0) {
            obj_stats.a_hair_style = 10
          }
          break
      }
      self.pressed = 0
    }
    switch (self.number) {
      case "Eye Color":
        switch (obj_stats.a_eye_color) {
          case 1: self.text2 = "Blue"; break
          case 2: self.text2 = "Green"; break
          case 3: self.text2 = "Hazel"; break
          case 4: self.text2 = "Grey"; break
          case 5: self.text2 = "Brown"; break
          case 6: self.text2 = "Black"; break
          case 7: self.text2 = "Red"; break
          case 8: self.text2 = "Silver"; break
        }
        break
      case "Skin Color":
        // TODO: more race_specific skin colors?
        switch (obj_stats.a_skin_color) {
          case 1: self.text2 = "Pale"; break
          case 2: self.text2 = "Fair"; break
          case 3: self.text2 = "Light"; break
          case 4: self.text2 = "Tanned"; break
          case 5: self.text2 = "Coffee"; break
          case 6: self.text2 = "Chocolate"; break
          case 7: self.text2 = "Brown"; break
          case 8: self.text2 = "Dark"; break
          case 9: self.text2 = "Green"; break
          case 10: self.text2 = "Black"; break
        }
        break
      case "Height":
        switch (obj_stats.a_height) {
          case 1: self.text2 = "Short"; break
          case 2: self.text2 = "Average"; break
          case 3: self.text2 = "Tall"; break
        }
        break
      case "Weight":
        switch (obj_stats.a_weight) {
          case 1: self.text2 = "Skinny"; break
          case 2: self.text2 = "Average"; break
          case 3: self.text2 = "Chubby"; break
        }
        break
      case "Other":
        switch (obj_stats.a_other) {
          case 1: self.text2 = "None"; break
          case 2: self.text2 = "Freckles"; break
          case 3: self.text2 = "Facepaint"; break
          case 4: self.text2 = "Eye Scar"; break
          case 5: self.text2 = "Nose Scar"; break
          case 6: self.text2 = "Battlescars"; break
          case 7: self.text2 = "Heavy Battlescars"; break
          // TODO: piercings???? hmmmm
        }
        break
      case "Racial": // NOTE: here self.number is not self.text
        switch (obj_stats.race) {
          case Races.elf:
            switch (obj_stats.a_racial) {
              case 1: self.text2 = "Round"; break
              case 2: self.text2 = "Pointed"; break
              case 3: self.text2 = "Long Pointed"; break
            }
            break
          case Races.goblin:
            switch (obj_stats.a_racial) {
              case 1: self.text2 = "Normal"; break
              case 2: self.text2 = "Fangs"; break
            }
            break
          case Races.orc:
            switch (obj_stats.a_racial) {
              case 1: self.text2 = "Normal"; break
              case 2: self.text2 = "Tusks"; break
              case 3: self.text2 = "Fangs"; break
              case 4: self.text2 = "Tusks and Fangs"; break
            }
            break
        }
        break
      case "Hair Color":
        switch (obj_stats.a_hair_color) {
          case 1: self.text2 = "Platinum Blonde"; break
          case 2: self.text2 = "Blonde"; break
          case 3: self.text2 = "Dirty Blonde"; break
          case 4: self.text2 = "Brown"; break
          case 5: self.text2 = "Black"; break
          case 6: self.text2 = "Orange"; break
          case 7: self.text2 = "Red"; break
        }
        break
      case "Hair Length":
        switch (obj_stats.a_hair_length) {
          case 1: self.text2 = "Short"; break
          case 2: self.text2 = "Neck"; break
          case 3: self.text2 = "Shoulder"; break
          case 4: self.text2 = "Shoulder Blade"; break
          case 5: self.text2 = "Waist"; break
          case 6: self.text2 = "Ass"; break
          case 7: self.text2 = "Hip"; break
          case 8: self.text2 = "Knee"; break
          case 9: self.text2 = "Floor"; break
        }
        break
      case "Hair Straightness":
        switch (obj_stats.a_hair_straightness) {
          case 1: self.text2 = "Straight"; break
          case 2: self.text2 = "Wavy"; break
          case 3: self.text2 = "Curly"; break
        }
        break
      case "Hair Style":
        switch (obj_stats.a_hair_style) {
          case 1: self.text2 = "Normal"; break
          case 2: self.text2 = "Ponytail"; break
          case 3: self.text2 = "Twintails"; break
          case 4: self.text2 = "Half-Bun"; break
          case 5: self.text2 = "Braid"; break
          case 6: self.text2 = "Twin Braid"; break
          case 7: self.text2 = "Dreadlocks"; break
          case 8: self.text2 = "Pixie Cut"; break
          case 9: self.text2 = "Bob Cut"; break
          case 10: self.text2 = "Bun"; break
          // case : self.text2 = "Twin Drills"; break
        }
        break
    }
  }
}

window.classes.push(OverviewButton)
window.obj_overview_button = __gml_proto_proxy(OverviewButton.prototype)
