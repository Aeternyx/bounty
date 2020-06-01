// gml
/* globals GMLRoom, randomize, room_goto_next */
// classes and enums
/* globals obj_stats, obj_start_new, obj_title_logo, obj_start_config, obj_main_data, obj_start_credits */

class Init extends GMLRoom {
  create() {
    super.create()
    const self = this
    randomize()
    room_goto_next()
  }
}

window.rm_init = new Init()
window.rooms.push(window.rm_init)
