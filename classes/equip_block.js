// gml

class EquipBlock extends GMLObject {
  create() {
    let self = this
  }
}

window.classes.push(EquipBlock)
EquipBlock.prototype.__visible = false
/* globals Sprites */
EquipBlock.prototype.sprite_index = Sprites.spr_equip_block
window.obj_equip_block = __gml_proto_proxy(EquipBlock.prototype)
