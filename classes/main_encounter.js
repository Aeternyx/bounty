// gml
// classes and enums
/* globals ButtonBase, obj_stats, MouseButtons, Rooms */
// functions and stuff
/* globals button_click, room_goto, roll_d6 */

class MainEncounter extends ButtonBase {
  step() {
    super.step()
    let self = this
    button_click.call(self)
    self.text = "Begin Day"
    if (self.pressed === MouseButtons.left) {
      obj_stats.actions = 1
      let equip = obj_stats.armor_top_type + obj_stats.armor_leg_type + obj_stats.armor_foot_type
      let i = ceil(roll_d6(obj_stats.fame_renown + equip, "None") / 2)
      if (obj_stats.o_safety === 1) {
        i += 1
      } else if (obj_stats.o_safety === 3 && i > 1) {
        i += 1
      }
      i += obj_stats.bonus_encounters
      obj_stats.encounters = i
      obj_stats.bonus_encounters = 0
      obj_stats.loc_reset = true
      room_goto(Rooms.rm_day_begin)
      self.pressed = 0
    }
  }
}

window.classes.push(MainEncounter)
window.obj_main_encounter = __gml_proto_proxy(MainEncounter.prototype)
