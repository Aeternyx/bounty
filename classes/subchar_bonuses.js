// gml
// classes and enums
/* globals obj_stats, Races, Subraces, Advantages, Sprites */
// functions and stuff
/* globals get_race, advantage_add */

class SubcharBonuses extends GMLObject {
  create() {
    super.create()
    let self = this
    let i = 3
    if (get_race(Races.halfling, Subraces[Races.halfling].fae)) {
      advantage_add(Advantages.fae)
    }
    if (get_race(Races.orc, Subraces[Races.orc].tribal)) {
      obj_stats.weapon_type = 1
      obj_stats.weapon_name = "Primal Axe"
      obj_stats.weapon_class = "Axe"
    }
    if (get_race(Races.dwarf, Subraces[Races.dwarf].mountain)) {
      advantage_add(Advantages.xenophobic)
    }
    instance_destroy.call(self)
  }
}

window.classes.push(SubcharBonuses)
/* globals Sprites */
SubcharBonuses.prototype.sprite_index = Sprites.spr_advantage_block
window.obj_subchar_bonuses = __gml_proto_proxy(SubcharBonuses.prototype)
