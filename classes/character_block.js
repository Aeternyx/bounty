// gml

class CharacterBlock extends GMLObject {
  create() {
    super.create()
    let self = this
  }
}

window.classes.push(CharacterBlock)
CharacterBlock.prototype.__visible = false
window.obj_character_block = __gml_proto_proxy(CharacterBlock.prototype)
