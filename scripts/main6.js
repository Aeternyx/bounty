// gml
/* globals GMLObject, floor */
// functions and stuff
/* globals roll_d6 */

// TODO: female customers in gangbang???
// this b just for do_gangbang_enc
function do_gangbang_encounter() {
  const self = this
  const customers = floor(roll_d6(6, "Customers (scaled)") / 2)
  let roll = irandom_range(1, 3), approach = ""
  switch (roll) {
    case 1:
      approach = "You're approached by "
      break
    case 2:
      approach = "You have found "
      break
    case 3:
      approach = "You're solicited by "
      break
  }
  self.text = approach
  for (let i = 0; i < customers - 1; i++) {
    self.text += get_text_customer() + ", "
  }
  self.text += get_text_customer() + ". "
  if (self.type !== SkillTypes.hands) {
    i = roll_d6(ii, "Request internal")
  } else {
    i = 0
  }
  let inside = i >= 5
  if (obj_stats.negotiate_used > 0) {
    self.text += "They want to " + (obj_stats.negotiate_inside ? "fill " : "use ")
    switch (obj_stats.negotiate_used) {
      case SkillTypes.vaginal:
        self.text += "your pussy, "
        break
      case SkillTypes.anal:
        self.text += "your ass, "
        break
      case SkillTypes.oral:
        self.text += "your mouth, "
        break
      case SkillTypes.hands:
        self.text += "your hands, "
        break
    }
    if (self.type == obj_stats.negotiate && inside === obj_stats.negotiate_inside) {
      self.text += "but you couldn't convince them otherwise."
    } else {
      self.text += "but they can't resist you. "
    }
  }
  if (!ignore) {
    self.text += get_text_encounter_request(self.type, inside)
  }
  switch (self.type) {
    case SkillTypes.vaginal:
      i = obj_stats.o_vaginal
      break
    case SkillTypes.anal:
      i = obj_stats.o_anal
      break
    case SkillTypes.oral:
      i = obj_stats.o_oral
      break
    case SkillTypes.hands:
      i = obj_stats.o_hands
      break
  }
  i -= inside
  self.neg_mod = (obj_stats.o_price - 2) * -1
  self.neg_mod += 1
  self.neg_mod += check_allure()
  let accept = false
  if (i >= 3) { // NOTE: if setting is inside
    if (obj_stats.mood > 0) {
      i = "##You agree to a price, and "
    } else {
      switch (irandom_range(1, 5)) {
        case 1:
          i = "You want to say no, but why even bother? So "
          break
        case 2:
          i = "Like a good whore, you graciously accept, and "
          break
        case 3:
          i = "You don't even give a price before accepting, as "
          break
        case 4:
          i = "You're quivering at the thought of being given attention, and "
          break
        case 5:
          i = "A slut like yourself could never decline, so "
          break
      }
    }
    switch (irandom_range(1, 3)) {
      case 1:
        i += "you follow them to "
        break
      case 2:
        i += "you tag along to "
        break
      case 3:
        i += "they take you to "
        break
    }
    self.text += i
    accept = true
  } else {
    let neg_v = 
    if (roll_d6(obj_stats.negotiate + self.neg_mod, "Negotiation") > 5) {
      obj_stats.negotiate_used = self.type
      obj_stats.negotiate_inside = inside
      obj_stats.encounters += 1
      room_restart()
      return
    } // else
  }
}