// gml
// classes and enums
/* globals ButtonBase, obj_stats, MouseButtons, Rooms, Races, Subraces */
// functions and stuff
/* globals button_click, room_goto */

class SubcharButton extends ButtonBase {
  step() {
    let self = this
    button_click.call(self)
    if (self.pressed === MouseButtons.left) {
      obj_stats.subrace = self.number
      self.pressed = 0
      switch (obj_stats.subrace) {
        case Subraces[Races.human].noble:
          obj_stats.body = 3
          obj_stats.mind = 3
          obj_stats.charm = 3
          break
        case Subraces[Races.human].barbarian:
          obj_stats.body = 3
          obj_stats.mind = 3
          obj_stats.charm = 3
          break
        case Subraces[Races.human].armegian:
          obj_stats.body = 3
          obj_stats.mind = 3
          obj_stats.charm = 3
          break
        case Subraces[Races.elf].high:
          obj_stats.body = 2
          obj_stats.mind = 4
          obj_stats.charm = 3
          break
        case Subraces[Races.elf].wild:
          obj_stats.body = 3
          obj_stats.mind = 2
          obj_stats.charm = 4
          break
        case Subraces[Races.elf].deep:
          obj_stats.body = 2
          obj_stats.mind = 3
          obj_stats.charm = 4
          break
        case Subraces[Races.dwarf].hill:
          obj_stats.body = 4
          obj_stats.mind = 3
          obj_stats.charm = 2
          break
        case Subraces[Races.dwarf].mountain:
          obj_stats.body = 5
          obj_stats.mind = 2
          obj_stats.charm = 2
          break
        case Subraces[Races.halfling].rural:
          obj_stats.body = 3
          obj_stats.mind = 3
          obj_stats.charm = 3
          break
        case Subraces[Races.halfling].fae:
          obj_stats.body = 3
          obj_stats.mind = 3
          obj_stats.charm = 3
          break
        case Subraces[Races.goblin].green:
          obj_stats.body = 3
          obj_stats.mind = 3
          obj_stats.charm = 3
          break
        case Subraces[Races.goblin].black:
          obj_stats.body = 3
          obj_stats.mind = 3
          obj_stats.charm = 3
          break
        case Subraces[Races.orc].half:
          obj_stats.body = 3
          obj_stats.mind = 3
          obj_stats.charm = 3
          break
        case Subraces[Races.orc].tribal:
          obj_stats.body = 3
          obj_stats.mind = 2
          obj_stats.charm = 3
          break
      }
    }
  }
}

window.classes.push(SubcharButton)
window.obj_subchar_button = __gml_proto_proxy(SubcharButton.prototype)
