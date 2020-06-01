// gml

class ItemBlock extends GMLObject {
  create() {
    super.create()
    let self = this
  }
}

window.classes.push(ItemBlock)
ItemBlock.prototype.__visible = false
window.obj_item_block = __gml_proto_proxy(ItemBlock.prototype)
