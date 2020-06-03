// gml
// classes and enums
/* globals obj_stats, obj_subchar_button, Races, Subraces */
// functions and stuff
/* globals button_create */

class SubcharMain extends GMLObject {
  create() {
    let self = this
    self.inst = null
    self.obj = obj_subchar_button
    self.yy = self.y
    switch (obj_stats.race) {
      case Races.human:
        obj_stats.subrace = Subraces[Races.human].noble
        button_create.call(self, self.x, self.yy)
        self.inst.number = Subraces[Races.human].noble
        self.inst.text = Subraces[Races.human].noble
        button_create.call(self, self.x, self.yy)
        self.inst.number = Subraces[Races.human].barbarian
        self.inst.text = Subraces[Races.human].barbarian
        button_create.call(self, self.x, self.yy)
        self.inst.number = Subraces[Races.human].armegian
        self.inst.text = Subraces[Races.human].armegian
        break
      case Races.half_elf:
        obj_stats.subrace = ""
        room_goto_next()
        break
      case Races.elf:
        obj_stats.subrace = Subraces[Races.elf].high
        button_create.call(self, self.x, self.yy)
        self.inst.number = Subraces[Races.elf].high
        self.inst.text = Subraces[Races.elf].high
        button_create.call(self, self.x, self.yy)
        self.inst.number = Subraces[Races.elf].wild
        self.inst.text = Subraces[Races.elf].wild
        button_create.call(self, self.x, self.yy)
        self.inst.number = Subraces[Races.elf].deep
        self.inst.text = Subraces[Races.elf].deep
        break
      case Races.dwarf:
        obj_stats.subrace = Subraces[Races.dwarf].hill
        button_create.call(self, self.x, self.yy)
        self.inst.number = Subraces[Races.dwarf].hill
        self.inst.text = Subraces[Races.dwarf].hill
        button_create.call(self, self.x, self.yy)
        self.inst.number = Subraces[Races.dwarf].mountain
        self.inst.text = Subraces[Races.dwarf].mountain
        break
      case Races.halfling:
        obj_stats.subrace = Subraces[Races.halfling].rural
        button_create.call(self, self.x, self.yy)
        self.inst.number = Subraces[Races.halfling].rural
        self.inst.text = Subraces[Races.halfling].rural
        button_create.call(self, self.x, self.yy)
        self.inst.number = Subraces[Races.halfling].fae
        self.inst.text = Subraces[Races.halfling].fae
        break
      case Races.goblin:
        obj_stats.subrace = Subraces[Races.goblin].green
        button_create.call(self, self.x, self.yy)
        self.inst.number = Subraces[Races.goblin].green
        self.inst.text = Subraces[Races.goblin].green
        button_create.call(self, self.x, self.yy)
        self.inst.number = Subraces[Races.goblin].black
        self.inst.text = Subraces[Races.goblin].black
        break
      case Races.orc:
        obj_stats.subrace = Subraces[Races.orc].half
        button_create.call(self, self.x, self.yy)
        self.inst.number = Subraces[Races.orc].half
        self.inst.text = Subraces[Races.orc].half
        button_create.call(self, self.x, self.yy)
        self.inst.number = Subraces[Races.orc].tribal
        self.inst.text = Subraces[Races.orc].tribal
        break
    }
    instance_destroy.call(self)
  }
}

window.classes.push(SubcharMain)
window.obj_subchar_main = __gml_proto_proxy(SubcharMain.prototype)
