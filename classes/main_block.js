// gml

class MainBlock extends GMLObject {
  create() {
    super.create()
    let self = this
  }
}

window.classes.push(MainBlock)
MainBlock.prototype.__visible = false
window.obj_main_block = __gml_proto_proxy(MainBlock.prototype)
