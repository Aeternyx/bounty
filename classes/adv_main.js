// GML
// classes and enums
/* globals obj_adv_button, Advantages, Races */
// functions and stuff
/* globals advantage_exist, button_create, get_race */

class AdvMain extends GMLObject {
  create() {
    super.create()
    let self = this
    self.inst = null
    self.obj = obj_adv_button
    self.yy = self.y
    if (!advantage_exist(Advantages.healthy)) {
      button_create.call(self, self.x, self.yy)
      self.inst.number = Advantages.healthy
      self.inst.text = Advantages.healthy
    } else if (advantage_exist(Advantages.healthy)) {
      if (!advantage_exist(Advantages.feisty)) {
        button_create.call(self, self.x, self.yy)
        self.inst.number = Advantages.feisty
        self.inst.text = Advantages.feisty
      }
      if (!advantage_exist(Advantages.immunity)) {
        button_create.call(self, self.x, self.yy)
        self.inst.number = Advantages.immunity
        self.inst.text = Advantages.immunity
      }
    }
    if (!advantage_exist(Advantages.tight_pussy)) {
      button_create.call(self, self.x, self.yy)
      self.inst.number = Advantages.tight_pussy
      self.inst.text = Advantages.tight_pussy
    } else if (advantage_exist(Advantages.tight_pussy)) {
      if (!advantage_exist(Advantages.naturally_wet)) {
        button_create.call(self, self.x, self.yy)
        self.inst.number = Advantages.naturally_wet
        self.inst.text = Advantages.naturally_wet
      }
      if (!advantage_exist(Advantages.cum_dumpster)) {
        button_create.call(self, self.x, self.yy)
        self.inst.number = Advantages.cum_dumpster
        self.inst.text = Advantages.cum_dumpster
      }
    }
    if (!advantage_exist(Advantages.willpower)) {
      button_create.call(self, self.x, self.yy)
      self.inst.number = Advantages.willpower
      self.inst.text = Advantages.willpower
    } else if (advantage_exist(Advantages.willpower)) {
      if (!advantage_exist(Advantages.unbreakable)) {
        button_create.call(self, self.x, self.yy)
        self.inst.number = Advantages.unbreakable
        self.inst.text = Advantages.unbreakable
      }
      if (!advantage_exist(Advantages.perfect_ass)) {
        button_create.call(self, self.x, self.yy)
        self.inst.number = Advantages.perfect_ass
        self.inst.text = Advantages.perfect_ass
      }
    }
    if (!advantage_exist(Advantages.gag_resist)) {
      button_create.call(self, self.x, self.yy)
      self.inst.number = Advantages.gag_resist
      self.inst.text = Advantages.gag_resist
    } else if (advantage_exist(Advantages.gag_resist)) {
      if (!advantage_exist(Advantages.titfuck)) {
        button_create.call(self, self.x, self.yy)
        self.inst.number = Advantages.titfuck
        self.inst.text = Advantages.titfuck
      }
      if (!advantage_exist(Advantages.deepthroat)) {
        button_create.call(self, self.x, self.yy)
        self.inst.number = Advantages.deepthroat
        self.inst.text = Advantages.deepthroat
      }
    }
    if (!advantage_exist(Advantages.footjob)) {
      button_create.call(self, self.x, self.yy)
      self.inst.number = Advantages.footjob
      self.inst.text = Advantages.footjob
    } else if (advantage_exist(Advantages.footjob)) {
      if (!advantage_exist(Advantages.discreet_feet)) {
        button_create.call(self, self.x, self.yy)
        self.inst.number = Advantages.discreet_feet
        self.inst.text = Advantages.discreet_feet
      }
      if (!advantage_exist(Advantages.beautiful_feet)) {
        button_create.call(self, self.x, self.yy)
        self.inst.number = Advantages.beautiful_feet
        self.inst.text = Advantages.beautiful_feet
      }
    }
    if (!advantage_exist(Advantages.party_girl)) {
      button_create.call(self, self.x, self.yy)
      self.inst.number = Advantages.party_girl
      self.inst.text = Advantages.party_girl
    } else if (advantage_exist(Advantages.party_girl)) {
      if (!advantage_exist(Advantages.nympho)) {
        button_create.call(self, self.x, self.yy)
        self.inst.number = Advantages.nympho
        self.inst.text = Advantages.nympho
      }
      if (!advantage_exist(Advantages.gangbang_slut)) {
        button_create.call(self, self.x, self.yy)
        self.inst.number = Advantages.gangbang_slut
        self.inst.text = Advantages.gangbang_slut
      }
    }
    if (!advantage_exist(Advantages.seduce)) {
      button_create.call(self, self.x, self.yy)
      self.inst.number = Advantages.seduce
      self.inst.text = Advantages.seduce
    } else if (advantage_exist(Advantages.seduce)) {
      if (!advantage_exist(Advantages.succubus)) {
        button_create.call(self, self.x, self.yy)
        self.inst.number = Advantages.succubus
        self.inst.text = Advantages.succubus
      }
      if (!advantage_exist(Advantages.relief_girl)) {
        button_create.call(self, self.x, self.yy)
        self.inst.number = Advantages.relief_girl
        self.inst.text = Advantages.relief_girl
      }
    }
    if (!advantage_exist(Advantages.sensual)) {
      button_create.call(self, self.x, self.yy)
      self.inst.number = Advantages.sensual
      self.inst.text = Advantages.sensual
    } else if (advantage_exist(Advantages.sensual)) {
      if (!advantage_exist(Advantages.lesbianism)) {
        button_create.call(self, self.x, self.yy)
        self.inst.number = Advantages.lesbianism
        self.inst.text = Advantages.lesbianism
      }
    }
    if (advantage_exist(Advantages.deepthroat)) {
      if (advantage_exist(Advantages.discreet_feet)) {
        if (!advantage_exist(Advantages.gentle_hands)) {
          button_create.call(self, self.x, self.yy)
          self.inst.number = Advantages.gentle_hands
          self.inst.text = Advantages.gentle_hands
        }
      }
    }
    if (advantage_exist(Advantages.unbreakable)) {
      if (advantage_exist(Advantages.nympho)) {
        if (!advantage_exist(Advantages.ass_pussy)) {
          button_create.call(self, self.x, self.yy)
          self.inst.number = Advantages.ass_pussy
          self.inst.text = Advantages.ass_pussy
        }
      }
    }
    if (advantage_exist(Advantages.cum_dumpster)) {
      if (advantage_exist(Advantages.naturally_wet)) {
        if (!advantage_exist(Advantages.cum_in_me)) {
          button_create.call(self, self.x, self.yy)
          self.inst.number = Advantages.cum_in_me
          self.inst.text = Advantages.cum_in_me
        }
      }
    }
    if (advantage_exist(Advantages.acolyte)) {
      if (!advantage_exist(Advantages.mistress)) {
        button_create.call(self, self.x, self.yy)
        self.inst.number = Advantages.mistress
        self.inst.text = Advantages.mistress
      }
    }
    if (advantage_exist(Advantages.small)) {
      if (advantage_exist(Advantages.party_girl)) {
        if (!advantage_exist(Advantages.stretchy_body)) {
          button_create.call(self, self.x, self.yy)
          self.inst.number = Advantages.stretchy_body
          self.inst.text = Advantages.stretchy_body
        }
      }
    }
    if (advantage_exist(Advantages.relief_girl)) {
      if (advantage_exist(Advantages.succubus)) {
        if (!advantage_exist(Advantages.connections)) {
          button_create.call(self, self.x, self.yy)
          self.inst.number = Advantages.connections
          self.inst.text = Advantages.connections
        }
      }
    }
    if (get_race(Races.human) || get_race(Races.half_elf)) {
      if (!advantage_exist(Advantages.versatility)) {
        button_create.call(self, self.x, self.yy)
        self.inst.number = Advantages.versatility
        self.inst.text = Advantages.versatility
      } else if (advantage_exist(Advantages.versatility)) {
        if (!advantage_exist(Advantages.mastery)) {
          button_create.call(self, self.x, self.yy)
          self.inst.number = Advantages.mastery
          self.inst.text = Advantages.mastery
        }
      }
    }
    if (get_race(Races.elf)) {
      if (advantage_exist(Advantages.succubus)) {
        if (!advantage_exist(Advantages.elf_maiden)) {
          button_create.call(self, self.x, self.yy)
          self.inst.number = Advantages.elf_maiden
          self.inst.text = Advantages.elf_maiden
        }
      }
    }
    if (get_race(Races.orc)) {
      if (!advantage_exist(Advantages.orc_warrior)) {
        button_create.call(self, self.x, self.yy)
        self.inst.number = Advantages.orc_warrior
        self.inst.text = Advantages.orc_warrior
      } else if (advantage_exist(Advantages.orc_warrior)) {
        if (!advantage_exist(Advantages.orc_berserker)) {
          button_create.call(self, self.x, self.yy)
          self.inst.number = Advantages.orc_berserker
          self.inst.text = Advantages.orc_berserker
        }
      }
    }
    if (get_race(Races.goblin)) {
      if (!advantage_exist(Advantages.goblin_lust)) {
        button_create.call(self, self.x, self.yy)
        self.inst.number = Advantages.goblin_lust
        self.inst.text = Advantages.goblin_lust
      } else if (advantage_exist(Advantages.goblin_lust)) {
        if (advantage_exist(Advantages.cum_dumpster)) {
          if (!advantage_exist(Advantages.goblin_breeder)) {
            button_create.call(self, self.x, self.yy)
            self.inst.number = Advantages.goblin_breeder
            self.inst.text = Advantages.goblin_breeder
          }
        }
      }
    }
    if (get_race(Races.dwarf)) {
      if (advantage_exist(Advantages.ass_pussy)) {
        if (!advantage_exist(Advantages.dwarf_pleasure)) {
          button_create.call(self, self.x, self.yy)
          self.inst.number = Advantages.dwarf_pleasure
          self.inst.text = Advantages.dwarf_pleasure
        }
      }
    }
    instance_destroy.call(self)
  }
}

window.classes.push(AdvMain)
window.obj_adv_main = __gml_proto_proxy(AdvMain.prototype)
