// gml

class SkillBlock extends GMLObject {
  create() {
    super.create()
    let self = this
  }
}

window.classes.push(SkillBlock)
SkillBlock.prototype.__visible = false
window.obj_skill_block = __gml_proto_proxy(SkillBlock.prototype)
