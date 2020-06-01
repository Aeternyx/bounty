// gml

class AdvantageBlock extends GMLObject {
  create() {
    super.create()
    let self = this
  }
}

window.classes.push(AdvantageBlock)
AdvantageBlock.prototype.__visible = false
window.obj_advantage_block = __gml_proto_proxy(AdvantageBlock.prototype)
