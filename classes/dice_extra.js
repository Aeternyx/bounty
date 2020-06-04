// gml
/* globals GMLObject */
// classes and enums
/* globals Dice */

class DiceExtra extends Dice {
}

window.classes.push(DiceExtra)
DiceExtra.prototype.depth = -2
window.obj_dice_extra = __gml_proto_proxy(DiceExtra.prototype)
