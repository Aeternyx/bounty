// gml
/* globals GMLObject */

class NameBlock extends GMLObject {
  create() {
    let self = this
  }
}

window.classes.push(NameBlock)
NameBlock.prototype.__visible = false
/* globals Sprites */
// NameBlock.prototype.sprite_index = Sprites.spr_name_block
window.obj_name_block = __gml_proto_proxy(NameBlock.prototype)
