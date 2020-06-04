// GML
// classes and enums
/* globals Races */
// functions and stuff
/* globals button_create */

class CharMain extends GMLObject {
  create() {
    let self = this
    self.inst = null
    self.obj = obj_char_button
    self.yy = self.y
    button_create.call(self, self.x, self.yy)
    self.inst.number = Races.human
    self.inst.text = Races.human
    button_create.call(self, self.x, self.yy)
    self.inst.number = Races.half_elf
    self.inst.text = Races.half_elf
    button_create.call(self, self.x, self.yy)
    self.inst.number = Races.elf
    self.inst.text = Races.elf
    button_create.call(self, self.x, self.yy)
    self.inst.number = Races.dwarf
    self.inst.text = Races.dwarf
    button_create.call(self, self.x, self.yy)
    self.inst.number = Races.halfling
    self.inst.text = Races.halfling
    button_create.call(self, self.x, self.yy)
    self.inst.number = Races.goblin
    self.inst.text = Races.goblin
    button_create.call(self, self.x, self.yy)
    self.inst.number = Races.orc
    self.inst.text = Races.orc
    button_create.call(self, self.x, self.yy)
    self.inst.number = Races.none
    self.inst.text = Races.none
    button_create.call(self, self.x, self.yy)
    self.inst.number = Races.none
    self.inst.text = Races.none
    button_create.call(self, self.x, self.yy)
    self.inst.number = Races.none
    self.inst.text = Races.none
    instance_destroy.call(self)
  }
}

window.classes.push(CharMain)
window.obj_char_main = __gml_proto_proxy(CharMain.prototype)
