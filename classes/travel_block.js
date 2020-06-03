// gml

class TravelBlock extends GMLObject {
  create() {
    let self = this
  }
}

window.classes.push(TravelBlock)
TravelBlock.prototype.__visible = false
window.obj_travel_block = __gml_proto_proxy(TravelBlock.prototype)
