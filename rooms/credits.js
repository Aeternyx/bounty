// gml
/* globals GMLRoom, randomize, room_goto_next */
// classes and enums
/* globals obj_stats, obj_start_new, obj_title_logo, obj_start_config, obj_main_data, obj_start_credits */

class Credits extends GMLRoom {
  create() {
    super.create()
    const self = this
  }
}

window.rm_credits = new Credits()
window.rooms.push(window.rm_credits)
