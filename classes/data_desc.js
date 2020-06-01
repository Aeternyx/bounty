// GML
// classes and enums
/* globals obj_data_load, Fonts */
// functions and stuff
/* globals draw_cash */

class DataDesc extends GMLObject {
  create() {
    super.create()
    const self = this
    self.data = 0
    self.alarm[0] = 1
    self.name = "Nameless"
    self.race = ""
    self.level = 0
    self.cash = 0
  }
  
  // draw
  /* globals draw_self, draw_set_ext, draw_set_color, draw_set_transformed, draw_set_font, draw_set_halign, draw_set_valign, Colors */
  // draw text
  /* globals draw_text, draw_text_ext, draw_text_color, draw_text_transformed, draw_text_ext_color, draw_text_ext_transformed, draw_text_transformed_color, draw_text_ext_transformed_color, draw_highscore */
  // align
  /* globals VAligns, HAligns */
  draw() {
    const self = this
    draw_self.call(self)
    if (self.race === "") {
      return
    }
    if (self.race !== " ") {
      draw_set_color(Colors.c_white)
      draw_set_halign(HAligns.fa_left)
      draw_set_valign(VAligns.fa_middle)
      draw_set_font(Fonts.f_header)
      draw_text(self.x + 8, self.y + 11, self.race)
      draw_set_font(Fonts.f_console)
      // TODO: why does every object have .level and stuff
      draw_text(self.x + 8, self.y + 29, "Lvl " + string(self.level))
      draw_cash(self.x + 300, self.y + 1, self.cash)
    } else {
      draw_set_color(Colors.c_white)
      draw_set_halign(HAligns.fa_center)
      draw_set_valign(VAligns.fa_middle)
      draw_set_font(Fonts.f_header)
      draw_text(self.x + 200, self.y + 20, "No Data")
    }
  }
  
  alarm0() {
    super.alarm0()
    const self = this
    let slot = "DATA" + string(self.data)
    ini_open("data.ini")
    let i = ini_read_string(slot, "RC", "")
    let ii = ini_read_string(slot, "RCS", "")
    self.race = string(ii) + " " + string(i)
    self.level = ini_read_real(slot, "XLV", 0)
    self.cash = ini_read_real(slot, "SC", 0)
    ini_close()
    if (self.race === " ") {
      const other = self
      obj_data_load.instances.forEach(self => {
        if (self.number === other.data)
          self.locked = true
      })
    }
  }
}

window.classes.push(DataDesc)
/* globals Sprites */
DataDesc.prototype.sprite_index = Sprites.spr_button_data
window.obj_data_desc = __gml_proto_proxy(DataDesc.prototype)
