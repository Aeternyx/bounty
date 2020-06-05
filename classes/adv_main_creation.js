// GML
// classes and enums
/* globals obj_stats, obj_general_next, obj_adv_button, Advantages, Races */
// functions and stuff
/* globals advantage_add, advantage_exist, get_race, button_create */

class AdvMainCreation extends GMLObject {
  create() {
    const self = this
    self.inst = null
    if (
      obj_stats.advantages[0] === Advantages.none ||
      obj_stats.advantages[0] !== Advantages.small && (get_race(Races.halfling) || get_race(Races.goblin) || get_race(Races.dwarf)) ||
      obj_stats.advantages[0] === Advantages.small && !(get_race(Races.halfling) || get_race(Races.goblin) || get_race(Races.dwarf)) ||
      obj_stats.advantages[0] !== Advantages.elf && (get_race(Races.elf) || get_race(Races.half_elf)) ||
      obj_stats.advantages[0] === Advantages.elf && !(get_race(Races.elf) || get_race(Races.half_elf)) ||
      obj_stats.advantages[1] !== Advantages.non && !(get_race(Races.human) || get_race(Races.halfling) || get_race(Races.goblin) || get_race(Races.dwarf) || get_race(Races.elf) || get_race(Races.half_elf))
    ) {
      obj_stats.advantages[0] = obj_stats.advantages[1] = Advantages.none
      self.race = obj_stats.race
      if (get_race(Races.elf) || get_race(Races.half_elf)) {
        advantage_add(Advantages.elf) // TODO: is self an existing advantage
      } else if (get_race(Races.halfling) || get_race(Races.goblin) || get_race(Races.dwarf)) {
        advantage_add(Advantages.small)
      } else if (get_race(Races.human)) {
        advantage_add(Advantages.free)
      }
      advantage_add(Advantages.free)
    }
    self.obj = obj_adv_button
    self.yy = self.y
    button_create.call(self, self.x, self.yy)
    self.inst.number = Advantages.healthy // NOTE: supposed to be pointer but eh
    self.inst.text = Advantages.healthy
    button_create.call(self, self.x, self.yy)
    self.inst.number = Advantages.tight_pussy
    self.inst.text = Advantages.tight_pussy
    button_create.call(self, self.x, self.yy)
    self.inst.number = Advantages.willpower
    self.inst.text = Advantages.willpower
    button_create.call(self, self.x, self.yy)
    self.inst.number = Advantages.gag_resist
    self.inst.text = Advantages.gag_resist
    button_create.call(self, self.x, self.yy)
    self.inst.number = Advantages.footjob
    self.inst.text = Advantages.footjob
    button_create.call(self, self.x, self.yy)
    self.inst.number = Advantages.party_girl
    self.inst.text = Advantages.party_girl
    button_create.call(self, self.x, self.yy)
    self.inst.number = Advantages.seduce
    self.inst.text = Advantages.seduce
    if (advantage_exist(Advantages.free)) {
      // should be true
      obj_general_next.instances.forEach(self => {
        instance_destroy.call(self)
      })
    }
    instance_destroy.call(self)
  }
}

window.classes.push(AdvMainCreation)
window.obj_adv_main_creation = __gml_proto_proxy(AdvMainCreation.prototype)