// gml
/* globals GMLObject */

class StatBlock extends GMLObject {
  create() {
    let self = this
  }
}

window.classes.push(StatBlock)
StatBlock.prototype.__visible = false
/* globals Sprites */
StatBlock.prototype.sprite_index = Sprites.spr_stat_block
window.obj_stat_block = __gml_proto_proxy(StatBlock.prototype)
