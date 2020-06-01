// gml
/* globals GMLRoom, randomize, room_goto_next */
// classes and enums
/* globals obj_stats, obj_start_new, obj_title_logo, obj_start_config, obj_main_data, obj_start_credits */

class MainRoom extends GMLRoom {
  create() {
    super.create()
    const self = this
    self.instances = []
    self.instances.push(obj_main_options)
    obj_main_options.x = obj_main_options.xstart = 220
    obj_main_options.y = obj_main_options.ystart = 400
    obj_main_options.create()
    self.instances.push(obj_main_encounter)
    obj_main_encounter.x = obj_main_encounter.xstart = 20
    obj_main_encounter.y = obj_main_encounter.ystart = 400
    obj_main_encounter.create()
    self.instances.push(obj_main_store)
    obj_main_store.x = obj_main_store.xstart = 20
    obj_main_store.y = obj_main_store.ystart = 200
    obj_main_store.create()
    self.instances.push(obj_stat_block)
    obj_stat_block.x = obj_stat_block.xstart = 420
    obj_stat_block.y = obj_stat_block.ystart = 40
    obj_stat_block.create()
    self.instances.push(obj_main_travel)
    obj_main_travel.x = obj_main_travel.xstart = 20
    obj_main_travel.y = obj_main_travel.ystart = 160
    obj_main_travel.create()
    self.instances.push(obj_main_food)
    obj_main_food.x = obj_main_food.xstart = 20
    obj_main_food.y = obj_main_food.ystart = 240
    obj_main_food.create()
    self.instances.push(obj_main_loc_main)
    obj_main_loc_main.x = obj_main_loc_main.xstart = 420
    obj_main_loc_main.y = obj_main_loc_main.ystart = 160
    obj_main_loc_main.create()
    self.instances.push(obj_main_status)
    obj_main_status.x = obj_main_status.xstart = 420
    obj_main_status.y = obj_main_status.ystart = 320
    obj_main_status.create()
    self.instances.push(obj_main)
    obj_main.x = obj_main.xstart = 20
    obj_main.y = obj_main.ystart = 40
    obj_main.create()
    self.instances.push(obj_main_data)
    obj_main_data.x = obj_main_data.xstart = 420
    obj_main_data.y = obj_main_data.ystart = 360
    obj_main_data.create()
  }
}

window.rm_main = new MainRoom()
window.rooms.push(window.rm_main)
