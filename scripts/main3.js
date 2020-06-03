// GML
/* globals irandom_range */
// classes
/* globals Advantages, WeaponClasses, Races, Subraces, Locations, Dangers, StatLevels, SkillTypes, AttackedActions, Acceptances */
// functions and stuff
/* globals obj_stats, roll_d6, advantage_exist, stat_low */
// all the get texts. 1. naughty stuff and stuff.

function get_text_advantage(advantage) {
  let i = ""
  switch (advantage) {
    case Advantages.elf:
      i = "An ancient legacy and a set of pointed ears. When dealing with orcs, +1 danger, and an additional chance of cumming inside."
      break
    case Advantages.small:
      i = "Your tiny stature is suited for pleasing men. -1 combat, increased chance of accidental internal shots and rough sex, -20% cost of food."
      break
    case Advantages.xenophobic:
      i = "You have a hard time dealing with those you're unaccustomed to. -10% pay earned in settlements of a difference race."
      break
    case Advantages.well_off:
      i = "You come from an upper class background. Begin the game with an additional gold piece."
      break
    case Advantages.slut:
      i = "Handling cocks is nothing new to you. +2 to all base sex skills, and you're not a virgin."
      break
    case Advantages.big_tits:
      i = "You've been gifted with two sizable, well-shaped breasts. +1 charm."
      break
    case Advantages.healthy:
      i = "You are protected by a strong immune system. +1 to resist diseases, and 20% more life recovery."
      break
    case Advantages.feisty:
      i = "You've always got a fight in you. +2 to all combat checks."
      if (obj_stats.virgin) {
        i += "##(VIRGIN) +1 to all combat checks that may result in rape."
      }
      break
    case Advantages.immunity:
      i = "Nothing can slow you down. +1 to resist diseases, and lose 20% less life."
      break
    case Advantages.tight_pussy:
      i = "Your pussy is especially efficient at draining cocks. +2 vaginal, and increased chance of cumming inside."
      break
    case Advantages.naturally_wet:
      i = "It's guaranteed to slide right in. +2 vaginal, and increased chance of cumming inside."
      if (obj_stats.virgin) {
        i += "##(VIRGIN) Just feeling it gets you excited. +1 hands."
      }
      break
    case Advantages.cum_dumpster:
      i = "You've been filled up so many times that it's hard not to be. No penalty for cumming inside."
      break
    case Advantages.willpower:
      i = "It feels natural once it's inside. Lose 50% less mood from anal sex."
      break
    case Advantages.unbreakable:
      i = "It feels better in your ass than in your pussy, no matter how hard they pound. Lose no mood from anal sex."
      break
    case Advantages.perfect_ass:
      i = "Your ass just begs to be fucked. Clients will request anal more often."
      if (obj_stats.virgin) {
        i += "##(VIRGIN) You love the stimulation. +1 anal."
      }
      break
    case Advantages.gag_resist:
      i = "You're capable of satisfying most men with your mouth. Reduced danger during oral sex."
      break
    case Advantages.titfuck:
      i = "Work the tip while using your tits. +2 oral, and reduced chance of cumming inside mouth."
      break
    case Advantages.deepthroat:
      i = "Cum doesn't go to waste when it's pumped directly into your stomach. +2 oral, and increased chance of cumming inside mouth."
      break
    case Advantages.footjob:
      i = "Making someone cum with just your feet is a sought-after ability. +50% hands."
      break
    case Advantages.discreet_feet:
      i = "How can they say no, when you're already massaging their cock? +25% hands, and +1 negotiation."
      break
    case Advantages.beautiful_feet:
      i = "Legs and feet that can make anyone horny. +25% hands, and +2 vaginal."
      break
    case Advantages.party_girl:
      i = "You're capable of enduring multiple cocks without stress. No mood penalty from gangbangs."
      break
    case Advantages.nympho:
      i = "You don't care if it's consensual or not. You just want to be fucked. No mood penalty from being raped."
      if (obj_stats.virgin) {
        i += "##(VIRGIN) You enjoy losing your virginity, and you'll gain more for selling it."
      }
      break
    case Advantages.gangbang_slut:
      i = "You've become a popular group activity, and you know where to find the other players. Clients will request gangbangs more often. ##[not implemented]"
      break
    case Advantages.seduce:
      i = "Acting sexy can go a long way. +1 negotiation."
      break
    case Advantages.succubus:
      i = "They're going to fuck you. They just don't know it yet. Negotiating a new action pays full price."
      break
    case Advantages.relief_girl:
      i = "You're welcome to come along, provided you handle a dick or three. 5% lower travel costs, and gain 2 fame when traveling to a new settlement."
      break
    case Advantages.sensual:
      i = "A kiss on the lips is all you need. +25% when kissing."
      break
    case Advantages.lesbianism:
      i = "There's nothing more beautiful than the female body. +50% when with women."
      break
    case Advantages.gentle_hands:
      i = "Your hands are just as gentle as your tongue. +2 hands, +2 oral."
      break
    case Advantages.ass_pussy:
      i = "The harder they thrust, the more you cum. +2 anal."
      break
    case Advantages.cum_in_me:
      i = "It's not a request - it's a demand. Gain mood when someone cums inside your pussy, and nobody pulls out during vaginal."
      break
    case Advantages.stretchy_body:
      i = "That bulge running along your stomach is starting to feel good. Gain mood from rough sex instead of losing it."
      break
    case Advantages.connections:
      i = "Every caravan you've been with can't wait to talk about you. +2 fame when entering a new settlement."
      break
    case Advantages.versatility:
      i = "You're learning quick. +1 XP for each sexual encounter."
      break
    case Advantages.mastery:
      i = "You're a natural at what you do. Choosing this perk lets you choose two more perks."
      break
    case Advantages.elf_maiden:
      i = "An aura of purity that could charm anyone. As long as you're a virgin, +1 charm and +1 negotiation."
      break
    case Advantages.mistress: // NOTE: missing from this list
      i = "Used by a rich man and then discarded. +1 to all sex skills."
      break
    case Advantages.orc_warrior:
      i = "Violence is in your blood. +2 axe, +10 maximum life."
      break
    case Advantages.orc_berserker:
      i = "A little pain can set you off. +1 body, +10 maximum life, +2 anal."
      break
    case Advantages.goblin_lust:
      i = "How can you get it off your mind when it's still on your body? Having low hygiene increases all sex skills."
      break
    case Advantages.goblin_breeder:
      i = "When you're in full swing, everybody wants a piece. Having faltering hygiene increases all sex skills."
      break
    case Advantages.dwarf_pleasure:
      i = "Dwarves can take cocks like true champions. +2 anal."
      break
    case Advantages.neophyte:
      // TODO: +25?????!!!!!
      i = "Cleansing a man's soul begins with cleansing his seed. As long as it's consensual, +25 vaginal when being cummed in."
      break
    case Advantages.acolyte:
      i = "There's nothing holy about sex, but that doesn't mean stop. +1 to all sex skills, and globally increased chance of cumming inside."
      break
    case Advantages.beastmaster:
      i = "Beasts are easy to please. +100% when having sex with beasts."
      break
    case Advantages.fencer: // NOTE: also missing
      i = "You have trained in the ways of the sword. +2 sword skill."
      break
    case Advantages.recruit:
      i = "You know where to put the other end of your blade. +1 weapon skill."
      break
    case Advantages.enchantress:
      i = "Everything about you is attractive. Charm is treated as if it's 1 point higher."
      break
    default:
      // NOTE: it's instead of its... ew
      i = "Hover over an advantage to see its effects."
  }
  return i
}

function get_text_bounty() {
  let self = this
  let roll = roll_d6(0, "Bounty hunter")
  let combat_wep = 0
  switch (obj_stats.weapon_class) {
    case WeaponClasses.unarmed:
      combat_wep = 0
      break
    case WeaponClasses.sword:
      combat_wep = obj_stats.sword
      break
    case WeaponClasses.axe:
      combat_wep = obj_stats.axe
      break
  }
  let combat_you = obj_stats.body + obj_stats.weapon_type + combat_wep + roll_d6(0, "Player Strength")
  let combat_them = roll_d6(5 + roll, "Enemy Strength")
  let success = 0, negotiate = 0
  if (combat_you >= combat_them) {
    success = 1
    self.mood += roll_d6(0, "Mood penalty")
  } else if (self.combat_you !== 0) {
    self.success = 2
    self.life = roll_d6(9 + roll, "Damage")
    self.mood += roll_d6(6, "Mood penalty")
  } else if (self.combat_you === 0) {
    negotiate = roll_d6(obj_stats.negotiate, "Seduction attempt")
    if (negotiate > 5) {
      success = 3
    }
  }
  // TODO: make sure appropriate effects are applied i guess
  let i = ""
  switch (roll) {
    case 1:
      i = "You're confronted by a an amateur bounty hunter, holding a long wooden club. He wastes no time before lunging at you, attempting to take you prisoner."
      switch (success) {
        case 1:
          i += "##He swings his club wildly, and you manage to dodge each swing. ##As he begins his next swing, you manage to strike him in the throat with you fist. His club lands on the ground almost immediately as he collapses on the ground, gasping for air. You take this opportunity to escape."
          break
        case 2:
          i += "##He strikes you in the shoulder, causing you to collapse to the ground. You try to stand up, but you're swiftly struck in the back of the head. You hear the man chuckling as you start to lose consciousness."
          break
        case 3:
          i += "##He strikes you in the shoulder, causing you to collapse to the ground. You roll onto your back and lift your legs up. The rookie nervously stares at your spread legs for a short moment before pulling down his pants, revealing his erection. ##He lowers himself onto your body and slowly sinks his cock into your pussy. He lays against your body as he slowly thrusts, kissing your neck. You wrap your legs around him as he makes his final thrust, filling your pussy with his seed. ##After a few minutes, he gets up and starts searching for his pants, but by the time he finds them, you've already escaped."
          self.vag_in = 1
          break
      }
      break
    case 2:
      i = "You realize a large man holding a large, smooth flail over his shoulder is staring at you from across the street. When you notice him, he quickly starts spinning his flail and rushes across the street."
      switch (success) {
        case 1:
          i += "##Instinctively, you duck to your right, as his flail crashes into the wall. He tries to strike you with the back of his other arm, but you prove too fast for him. ##As his defenses are down, you deliver a powerful kick to his groin, and your would-be capturer falls to the ground, yelping meekly. ##Satisfied, you quickly escape into a nearby alley."
          break
        case 2:
          i += "##His first attack strikes the wall behind you, leaving a hole the size of your head. For a brief moment, you're paralyzed in fear. ##After shaking it off, you attempt to flee, hoping to out-run your attacker, but you find yourself on the ground as his flail swipes against the side of your face. The world seems silent as you lose consciousness."
          break
        case 3:
          i += "##His first attack strikes the wall behind you, and you move towards him. He looks at you in surprise as you rub his cock through his shorts. Unable to attack, you feel him becoming more and more aroused. Finally, the large man wraps both arms around you, and drags you into the alley. ##You pull down his shorts enough to reveal his very large cock, and he wastes no time in pulling your clothes off. Without letting go, he pushes you against the wall before lifting both of your legs into the air and crudely thrusting into your pussy. You yelp in pain as he rapidly jams his full length and girth into you, stretching your pussy and hitting your cervix. ##Your body is assaulted for minutes before both his grunts and his thrusts grow faster. His final thrust presses his balls against you, as he cums directly into your womb. Each time his cock twitches, it presses against your cervix. ##He pulls out, and your cum-filled body slumps the ground as he stumbles away, pleased with this turn of events."
          self.vag_in = 1
          break
      }
      break
    case 3:
      i = "As you're walking down the street, you hear a yell coming from behind. Turning around, you see a brawny, tan-skinned man charging you with his fists drawn."
      switch (success) {
        case 1:
          i += "##As his fist moves forward, you manage to strike back towards the brawler, deflecting his attack while striking him in the knee. Following up on this, you knock his other foot out from underneath him. He falls, unable to get up fast enough to follow your trail as you dash through the streets."
          break
        case 2:
          i += "##You're given no time to react as he jabs one of his gauntlets into your stomach. Instinctively, you bend over in pain, but the brawler firmly grabs you, lifts your body onto his shoulders, and throws you against the ground. ##The man is instantly pressed against your back as he ties your hands together with rope. Bloodied and bruised, you are now this man's prisoner."
          break
        case 3:
          i += "##You're given no time to react as he jabs one of his gauntlets into your stomach. You quickly fall to your knees and lunge toward him. Suddenly, his groin is in your face, and you press your open-mouth against his dick through his baggy pants. In shock, he stops moving, and you remove his newly-formed erection from his pants and insert it into your mouth. ##You rapidly move up and down the shaft, massaging his cock with your tongue. He puts both hands on your head and begins thrusting into your throat. ##It's not long before he holds you against him firmly against him as he cums deep in your throat. He releases your head and you start moving up and down his shaft again. After a few moments, he tries to pull out of your mouth, but you firmly grab him by the hips and continue sucking on his cock. He backs against a wall and falls to the ground as you continue vigorously sucking. His moans are almost deafening as he finally releases another load into your mouth. ##You use your hands to squeeze every last bit of his cum out of his shaft before standing up and dashing away, the brawler unable to pursue."
          self.oral_in = 1
          break
      }
      break
    case 4:
      i = "You notice a man wearing a great bascinet walking towards you. He's holding something crumpled in one hand, and a scroll in the other. As he gets closer, you recognize what's on the scroll - it's your face. He reveals the net in his hand as he tosses it at at you."
      switch (success) {
        case 1:
          i += "##You attempt to dodge the net. It lands on you, but you are fast enough to escape before it constricts. Grasping the net, you pull it away from the bounty hunter. He was unprepared for the movement and fell to the ground. Before he manages to get back to his feet, you're no where to be seen."
          break
        case 2:
          i += "##The net lands on you and quickly constricts around your body. The man pulls at the base of the net, causing you to lose your balance and fall to the ground. He drags your body to a nearby wagon and loads you into the back, but not before striking you in the face, effectively forcing you to lay still. Everything grows dark as the wagon is sealed up. There is no escape - you've been taken prisoner."
          break
        case 3:
          i += "##The net lands on you and quickly constricts around your body. You slump down onto your hands and knees and reveal your pussy. He watches as you spread your lips and play with yourself, before finally kneeling down and pulling his erection from under his hefty loin cloth. He grabs you by the hips and pulls your body towards his, impaling your wet pussy on his cock through the net. He pulls you against him each time he thrusts, creating a loud slap. He fucks you through the net for what feels like forever. Eventually, his thrusts slow and he begins cumming inside you, but he doesn't stop. Shortly after his thrusts return to normal speed, you spot a trio of guards walking by the alley. You call for help, screaming that you're being raped. The guards rush into the alley, and the bounty hunter pulls out and quickly flees the scene."
          self.vag_in = 1
          break
      }
      break
    case 5:
      i = "As you turn around a corner, you spot a man donned in a shiny scale armor. The man catcher in his hands defies his intentions - he's a bounty hunter. Dashing away, you turn into an alley, hoping that he didn't see you."
      switch (success) {
        case 1:
          i += "##Reaching the end of the alley, you quickly dash into another. Before long, you've weaseled through what feels like a dozen different alleys. You stop to catch your breath, confident that your pursuer has lost your trail."
          break
        case 2:
          i += "##When you reach the end of the alley, the man emerges before you. You're given no time to react as he thrusts his man catcher at you, grasping your neck. You try to struggle, but the spikes along the collar press against your throat, forcing you to comply. He leads you out of the alley and onto the road as his prisoner."
          break
        case 3:
          i += "##When you reach the end of the alley, the man emerges before you. You're given no time to react as he thrusts his man catcher at you, grasping your neck. Quickly, you lower your top and expose your breasts. He stops for a moment, and you slowly knead your chest, occasionally squeezing your nipples. Trying to stop this, he orders you to turn around. You comply, and begin rubbing your ass. You give your ass a sharp slap, and that's all it takes before he bends you against the wall. You reach out and plant your hands as he lines his cock up with your pussy before pushing into you. He holds your head against the wall with the man catcher while fucking you. Suddenly, you feel the man catcher release, and he drops it to the ground. Grabbing your hips, he starts thrusting into your pussy faster than ever. You feel him explode inside of your body, as he stands with his hips pressed against you. When he pulls out, he bends over to retrieve his man catcher. Seizing this opportunity, you plant your foot on his rear and push him down into a pile of garbage. You waste no time fleeing, before finally stopping to catch your breath and wipe off the cum that has been running down your thighs."
          self.vag_in = 1
          break
      }
      break
    case 6:
      i = "You hear an eerie howling from the distance. As you turn around, a man draped in animal pelts is charging towards you, spinning a chain in his hands. You turn to flee, but he proves to be too fast."
      switch (success) {
        case 1:
          i += "##Turning around to face your opponent, you quickly thrust your elbow into your attacker before he can react. He manages to grasp your hand with his chain, and begins to pull you towards him. You strike him in the face, causing him to lose hold of the chain. You sprint away while pulling the chain off of your arm, and before you realize, you've escaped."
          break
        case 2:
          i += "##His chain wraps around your feet, causing you to slam against the ground. Within seconds, his chain is constricting around your neck. You struggle to breathe, but it's no use. Before long, you black out."
          break
        case 3:
          i += "##His chain wraps around your feet, and you fall to your hands and knees. Feeling his presence standing over you, you suggestively shake your ass in the air while slowly exposing yourself. You do this for a few seconds before you feel his hands firmly grab your cheeks. He lifts your ass further into the air, licks your hole, and then almost immediately begins pressing his cock against your ass. He slowly sinks into your body before finally bottoming out. Suddenly, he pushes your face to the ground, grabs both of your hands, and pulls them tight as he begins to slam against your ass. You try your hardest to muffle your screams but to no avail. You're pinned as he savagely fucks your ass. Eventually, his thrusting abruptly stops, as he makes his final slam against your body, dumping all of his cum in your ass. He keeps you pinned until he's done cumming, and releases you. The damaged cock glove you call a body collapses to the ground. When you finally gather the strength to turn over, the man in the pelts is no where to be found."
          self.anal_in = 1
          break
      }
      break
    default:
      i = "BOUNTY HUNTER ERROR"
  }
  if (success === 2) {
    self.gameover = 1
  }
  return i
}

function get_text_customer() {
  const self = this
  let ii = i
  i = ""
  let i_race = Races.none
  roll = irandom_range(1, 6) // NOTE: same as roll_d6, but i guess out of combat so roll useless here
  switch (obj_stats.location_race) {
    case Races.human:
      switch (roll) {
        case 1: i = "a human"; i_race = Races.human; break
        case 2: i = "a chubby human"; i_race = Races.human; break
        case 3: i = "a half elf"; i_race = Races.elf; break // NOTE: wtf, source? so i guess half elf is just another elf subrace really
        case 4: i = "a dark-skinned human"; i_race = Races.human; break
        case 5: i = "a scary-looking human"; i_race = Races.human; break
        case 6: i = "a human"; i_race = Races.human; break
      }
      break
    case Races.orc:
      switch (roll) {
        case 1: i = "an orc"; i_race = Races.orc; break
        case 2: i = "a huge orc"; i_race = Races.orc; break
        case 3: i = "a brownish orc"; i_race = Races.orc; break
        case 4: i = "a smaller orc"; i_race = Races.orc; break
        case 5: i = "a half orc"; i_race = Races.orc; break
        case 6: i = "an orc"; i_race = Races.orc; break
      }
      break
    case Races.elf:
      switch (roll) {
        case 1: i = "an elf"; i_race = Races.elf; break
        case 2: i = "a half elf"; i_race = Races.elf; break
        case 3: i = "a red-haired elf"; i_race = Races.elf; break
        case 4: i = "a short elf"; i_race = Races.elf; break
        case 5: i = "a pale elf"; i_race = Races.elf; break
        case 6: i = "a dark-skinned elf"; i_race = Races.elf; break
      }
      break
    case Races.dwarf:
      switch (roll) {
        case 1: i = "a dwarf"; i_race = Races.dwarf; break
        case 2: i = "a doughy dwarf"; i_race = Races.dwarf; break
        case 3: i = "a large dwarf"; i_race = Races.dwarf; break
        case 4: i = "a bronze dwarf"; i_race = Races.dwarf; break
        case 5: i = "a halfling"; i_race = Races.halfling; break // NOTE: was human
        case 6: i = "a dwarf"; i_race = Races.dwarf; break
      }
      break
    case Races.mixed:
      switch (roll) {
        case 1: i = "a human"; i_race = Races.human; break
        case 2: i = "an elf"; i_race = Races.elf; break
        case 3: i = "an orc"; i_race = Races.orc; break
        case 4: i = "a dwarf"; i_race = Races.dwarf; break
        case 5:  i = "a halfling"; i_race = Races.halfling; break // NOTE: was human
        case 6: i = "a human"; i_race = Races.human; break
      }
      break
  }
  ii += i
  self.race = i_race
  roll = irandom_range(1, 6) // NOTE: fake d6 again
  switch (obj_stats.location) {
    case Locations.port:
      switch (roll) {
        case 1: i = "worker"; break
        case 2: i = "traveler"; break
        case 3: i = "guard"; break
        case 4: i = "sailor"; break
        case 5: i = "pirate"; break
        case 6: i = "fisherman"; break
      }
      break
    case Locations.farmland:
      switch (roll) {
        case 1: i = "worker"; break
        case 2: i = "traveler"; break
        case 3: i = "guard"; break
        case 4: i = "farmer"; break
        case 5: i = "smith"; break
        case 6: i = "rancher"; break
      }
      break
    case Locations.city:
      switch (roll) {
        case 1: i = "worker"; break
        case 2: i = "traveler"; break
        case 3: i = "guard"; break
        case 4: i = "craftsman"; break
        case 5: i = "merchant"; break
        case 6: i = "noble"; break
      }
      break
    case Locations.church:
      switch (roll) {
        case 1: i = "worker"; break
        case 2: i = "traveler"; break
        case 3: i = "guard"; break
        case 4: i = "pilgrim"; break
        case 5: i = "priest"; break
        case 6: i = "crusader"; break
      }
      break
    case Locations.university:
      switch (roll) {
        case 1: i = "worker"; break
        case 2: i = "traveler"; break
        case 3: i = "guard"; break
        case 4: i = "wizard"; break
        case 5: i = "apprentice"; break
        case 6: i = "alchemist"; break
      }
      break
    case Locations.military_camp:
      switch (roll) {
        case 1: i = "worker"; break
        case 2: i = "traveler"; break
        case 3: i = "guard"; break
        case 4: i = "soldier"; break
        case 5: i = "recruit"; break
        case 6: i = "sergeant"; break
      }
      break
    case Locations.island:
      switch (roll) {
        case 1: i = "worker"; break
        case 2: i = "traveler"; break
        case 3: i = "guard"; break
        case 4: i = "tourist"; break
        case 5: i = "sailor"; break
        case 6: i = "native"; break
      }
      break
    case Locations.colosseum:
      switch (roll) {
        case 1: i = "worker"; break
        case 2: i = "traveler"; break
        case 3: i = "guard"; break
        case 4: i = "citizen"; break
        case 5: i = "gladiator"; break
        case 6: i = "noble"; break
      }
      break
    case Locations.forestry:
      switch (roll) {
        case 1: i = "worker"; break
        case 2: i = "traveler"; break
        case 3: i = "guard"; break
        case 4: i = "druid"; break
        case 5: i = "ranger"; break
        case 6: i = "merchant"; break
      }
      break
    case Locations.cult:
      switch (roll) {
        case 1: i = "worker"; break
        case 2: i = "traveler"; break
        case 3: i = "guard"; break
        case 4: i = "cultist"; break
        case 5: i = "priest"; break
        case 6: i = "host"; break
      }
      break
    case Locations.herbarium:
      switch (roll) {
        case 1: i = "worker"; break
        case 2: i = "traveler"; break
        case 3: i = "guard"; break
        case 4: i = "soldier"; break
        case 5: i = "warrior"; break
        case 6: i = "veteran"; break
      }
      break
    case Locations.slaver_camp:
      switch (roll) {
        case 1: i = "worker"; break
        case 2: i = "traveler"; break
        case 3: i = "guard"; break
        case 4: i = "slaver"; break
        case 5: i = "customer"; break
        case 6: i = "captain"; break
      }
      break
  }
  return ii + " " + i + ". "
}

function get_text_danger(danger, attacked_action) {
  let iii = irandom_range(1, 3), i = ""
  switch (danger) {
    case Dangers.inside:
      if (advantage_exist(Advantages.cum_in_me)) {
        switch (iii) {
          case 1:
            i = " You keep him from pulling out, shrieking every time his cock twitches."
            break
          case 2:
            i = " Wrapping your legs around him, you force him to fill you with his seed."
            break
          case 3:
            i = " You don't let him pull out, hungrily draining his cock. with your pussy"
            break
          default: i = "TEXT ERROR."; break
        }
      } else {
        switch (iii) {
          case 1:
            i = " You got caught up in the moment, and forgot to pull his cock out."
            break
          case 2:
            i = " You didn't realize they were cumming until it was too late."
            break
          case 3:
            i = " You tried to pull away, but you were held firmly in place."
            break
          default: i = "TEXT ERROR."; break
        }
      }
      break
    case Dangers.rough:
      switch (iii) {
        case 1:
          if (self.type !== SkillTypes.oral) {
            i = " You have a hard time closing your legs after being so roughly fucked."
          } else if (self.type === SkillTypes.oral) {
            i = " Your jaws hurt after being handled so roughly."
          }
          break
        case 2:
          if (self.type !== SkillTypes.oral) {
            i = " It's hard to stand after being so roughly fucked."
          } else if (self.type === SkillTypes.oral) {
            i = " Your throat feels sore after being pounded." // NOTE: soar lmfaoooo
          }
          break
        case 3:
          if (self.type !== SkillTypes.oral) {
            i = " You're in pain after being ripped apart from being so roughly fucked."
          } else if (self.type === SkillTypes.oral) {
            i = " You cough and hack for what seems like hours after taking too much."
          }
          break
        default: i = "TEXT ERROR."; break
      }
      break
    case Dangers.threaten:
      let ii = i, mood = stat_low(obj_stats.mood)
      switch (attacked_action) {
        case AttackedActions.submit:
          switch (iii) {
            case 1:
              if (mood > StatLevels.low) {
                i = " You just let him have his way with you."
              } else if (mood === StatLevels.low) {
                i = " No fighting back - this is what you deserve."
              }
              break
            case 2:
              if (mood > StatLevels.low) {
                i = " You don't resist, hoping it'll end soon."
              } else if (mood === StatLevels.low) {
                i = " You don't resist, because taking dick is all you are worth."
              }
              break
            case 3:
              if (mood > StatLevels.low) {
                i = " You submit to your attacker."
              } else if (mood === StatLevels.low) {
                i = " You submit, like the slut you are."
              }
              break
            default: i = "TEXT ERROR."; break
          }
          break
        case AttackedActions.win:
          switch (iii) {
            case 1: i = " Striking out, you stun your attacker long enough to escape."; break
            case 2: i = " You wound your attacker with a surprise attack and make your escape."; break
            case 3: i = " Pushing against your attacker, you prove too dangerous to subdue, and manage to escape."; break
            default: i = "TEXT ERROR."; break
          }
          break
        case AttackedActions.lose:
          switch (iii) {
            case 1: i = " Your attacker overpowers you, throwing you to the ground."; break
            case 2: i = " You are unable to stop his abuse and are quickly forced onto your knees."; break
            case 3: i = " You are hit by a powerful blow before being slammed against the wall."; break
            default: i = "TEXT ERROR."; break
          }
          break
      }
      i = ii + i
      break
  }
  return i
}

function get_text_encounter_a(inside) {
  let self = this
  let roll = irandom_range(1, 2), i = ""
  switch (irandom_range(1, 4)) {
    case 1:
      if (roll === 1) {
        i = "##Laying down on your back, you pull your legs toward you. "
      } else if (roll === 2) {
        i = "##Laying on your back, you grab your legs and pull them tightly. "
      }
      break
    case 2:
      if (roll === 1) {
        i = "##Before long, you get down to your hands and knees, and lift your ass up. "
      } else if (roll === 2) {
        i = "##Quickly, you slump to your hands and knees, wiggling your ass in the air. "
      }
      break
    case 3:
      if (roll === 1) {
        i = "##You lean forward and place your hands on the wall, presenting yourself. "
      } else if (roll === 2) {
        i = "##Presenting yourself, you lean forward while spreading your legs. "
      }
      break
    case 4:
      i = "##You climb upon him as he presses against your hole. "
      break
  }
  let ii = i
  switch (irandom_range(1, 9)) {
    case 1: i = "For a while, he makes short, rapid thrusts into your ass. "; break
    case 2: i = "He pushes his cock deeply in and out of your ass. "; break
    case 3: i = "You try to keep yourself steady as he furiously pounds into your ass. "; break
    case 4: i = "You feel his cock slowly push into your ass, over and over. "; break
    case 5: i = "He keeps you pinned in place as he roughly plunges into your ass. "; break
    case 6: i = "His thrusts force you to lift yourself, and he begins to firmly squeeze your breasts. "; break
    case 7: i = "He savagely fucks your ass, occasionally spanking you as he thrusts. "; break
    case 8: i = "Reaching down, you help guide cautiously guide his cock into your ass, and he slowly begins to thrust. "; break
    case 9: i = "He crudely slams himself against your ass. "; break
  }
  ii += i
  if (self.danger === Dangers.rough) {
    switch (irandom_range(1, 5)) {
      case 1:
        if (!advantage_exist(Advantages.stretchy_body)) {
          i = "His cock is too large, and you try to stay silent as he forces it all in each thrust. "
        } else if (advantage_exist(Advantages.stretchy_body)) {
          i = "His cock is too large for your body, but your body hungrily stretches around his cock. " // NOTE: but the your
        }
        break
      case 2:
        if (!advantage_exist(Advantages.stretchy_body)) {
          i = "You feel your hole stretch and rip every time he plunges his oversized cock into you. "
        } else if (advantage_exist(Advantages.stretchy_body)) {
          i = "You moan each time your ass stretches around his oversized cock. "
        }
        break
      case 3:
        if (!advantage_exist(Advantages.stretchy_body)) {
          i = "His relentless thrusting is too much for your ass to handle and is starting to hurt. "
        } else if (advantage_exist(Advantages.stretchy_body)) {
          i = "His relentless thrusting deep inside of you forces you to orgasm more than once. "
        }
        break
      case 4:
        if (!advantage_exist(Advantages.stretchy_body)) {
          i = "The loud smacking sounds of his hips slamming against you hides your pathetic whimpering. "
        } else if (advantage_exist(Advantages.stretchy_body)) {
          i = "The loud smacking sounds of his hips slamming against you accompanies your moans of ecstasy. "
        }
        break
      case 5:
        if (!advantage_exist(Advantages.stretchy_body)) {
          i = "Dick inside of you, he reaches down and crudely smacks you. "
        } else if (advantage_exist(Advantages.stretchy_body)) {
          i = "Your body tingles as his cock crashes against your insides. "
        }
        break
    }
    ii += i
  }
  if (!inside) {
    switch (irandom_range(1, 4)) {
      case 1: i = "He pulls out and rests his cock on you, just as he cums. "; break
      case 2: i = "He barely pulls out in time, covering your hole with his seed. "; break
      case 3: i = "He quickly pulls out and begins jerking himself before cumming over your body. "; break
      case 4: i = "As he pulls out, you reach down and begin to pull on his cock with both hands until he cums on your stomach. "; break
    }
  } else if (inside) {
    switch (irandom_range(1, 4)) {
      case 1: i = "You feel his hips press firmly against your ass as his cock begins to pulsate, filling you with cum. "; break
      case 2: i = "His thrusts become quicker and quicker until you can feel his cum being poured into your ass. "; break
      case 3: i = "You feel his cock reach deep inside of you before he begins pumping you full of cum. "; break
      case 4: i = "He pulls out enough so that only the tip of his cock is inside, and cums in your ass. "; break
    }
  }
  ii += i
  return ii
}

function get_text_encounter_h() {
  let foot = 0, i = ""
  if (advantage_exist(Advantages.footjob)) {
    if (irandom_range(1, 2) == 2) {
      foot = 3
    }
  }
  let roll = irandom_range(1, 2)
  switch (irandom_range(1, 3)) {
    case 1:
      if (roll === 1) {
        i = "##You rub him through his clothes before he finally exposes himself. "
      } else if (roll === 2) {
        i = "##You stroke him through his clothes before he reveals himself to you. "
      }
      break
    case 2:
      if (roll === 1) {
        i = "##He sits down, as you kneel in front of him and pull out his dick. "
      } else if (roll === 2) {
        i = "##As he sits, you kneel in front of him and unsheath his dick. "
      }
      break
    case 3:
      if (roll === 1) {
        i = "##He lays down, and you sit on his chest, sliding his cock out of his pants. "
      } else if (roll === 2) {
        i = "##He lays down, and you crawl between his legs, exposing his cock. "
      }
      break
    case 4: // NOTE: ignored
      i = "##You climb upon him as he presses against your hole. "
      break
  }
  let ii = i
  // NOTE: hahah + foot is so hacky
  switch (irandom_range(1, 3) + foot) {
    case 1: i = "You slowly massage his cock with one hand while gently kneading his balls with your other. "; break
    case 2: i = "Moving your hand up and down, his cock gets harder and harder as you stroke it. "; break
    case 3: i = "You wrap both hands around his shaft as you begin moving up and down. "; break
    case 4: i = "Wrapping your feet around his cock, you gently pull up and down his shaft. "; break
    case 5: i = "His cock fits snuggly between your toes as your feet massage his cock. "; break
    case 6: i = "You place your feet around his cock as he gently thrusts between them. "; break
  }
  ii += i
  switch (irandom_range(1, 3) + foot) {
    case 1: i = "You stroke faster and faster until your hands are covered in cum, and you continue until his cock starts to become soft. "; break
    case 2: i = "Gently, you squeeze the base of his cock, while cum streams down your hands. "; break
    case 3: i = "Rapidly jerking his cock, he finally finally sprays his cum along your arms. "; break
    case 4: i = "You work faster and faster until your feet are coated in his cum. "; break
    case 5: i = "His cock begins to twitch as you firmly grasp it with your toes, covering your legs in cum. "; break
    case 6: i = "Rubbing the base of his cock, you feel him erupt, as your belly is covered in cum. "; break
  }
  ii += i
  return ii
}

function get_text_encounter_o(inside) {
  let roll = 0, change = 0, i = ""
  // NOTE: was Advantages.titfuck... (no _exist). sigh
  if (advantage_exist(Advantages.titfuck) && advantage_exist(Advantages.deepthroat)) {
    switch (irandom_range(1, 3)) {
      case 2:
        change = 1
        break
      case 3:
        change = 2
        break
    }
  } else if (advantage_exist(Advantages.titfuck)) {
    if (irandom_range(1, 2) === 2) {
      change = 1
    }
  } else if (advantage_exist(Advantages.deepthroat)) {
    if (irandom_range(1, 2) === 2) {
      change = 1
    }
  }
  switch (irandom_range(1, 3)) {
    case 1:
      if (roll === 1) {
        i = "##You rub him through his clothes before he finally exposes himself. "
      } else if (roll === 2) {
        i = "##You stroke him through his clothes before he reveals himself to you. "
      }
      break
    case 2:
      if (roll === 1) {
        i = "##He sits down, as you kneel in front of him and pull out his dick. "
      } else if (roll === 2) {
        i = "##As he sits, you kneel in front of him and unsheath his dick. "
      }
      break
    case 3:
      if (roll === 1) {
        i = "##He lays down, and you sit on his chest, sliding his cock out of his pants. "
      } else if (roll === 2) {
        i = "##He lays down, and you crawl between his legs, exposing his cock. "
      }
      break
    case 4:
      i = "##You climb upon him as he presses against your hole. "
      break
  }
  let ii = i
  switch (change) {
    case 0:
      roll = irandom_range(1, 6)
      break
    case 1:
      roll = irandom_range(7, 9)
      break
    case 2:
      roll = irandom_range(13, 15)
      break
  }
  switch (roll) {
    case 1: i = "You lick up and down the bottom of his cock before inserting it into your mouth. "; break
    case 2: i = "You suck on the tip of his cock while massaging the base with your hand. "; break
    case 3: i = "With his cock in your mouth, you slowly you move your head up and down. "; break
    case 4: i = "He puts his hand on your head and guides you down his cock. "; break
    case 5: i = "You pull him into your mouth as your tongue vigorously massages his cock. "; break
    case 6: i = "You try to take short breaths in between his thrusts into your mouth. "; break
    case 7: i = "You squeeze his cock between your tits while sucking on the tip. "; break
    case 8: i = "You rub his cock between your tits, occasionally licking the tip. "; break
    case 9: i = "Tits wrapped around his cock, you slowly move his cock around in your mouth. "; break
    case 13: i = "He puts his hand on your head and pushes his cock against the back of your throat. "; break
    case 14: i = "You pull him deep into your throat, your tongue massaging his balls. "; break
    case 15: i = "You hold your breath while he roughly thrusts his cock in and out of your throat. "; break
  }
  ii += i
  switch (change) {
    case 0:
      roll = irandom_range(1, 3)
      break
    case 1:
      roll = irandom_range(4, 6)
      break
    case 2:
      roll = irandom_range(7, 9)
      break
  }
  if (!inside) {
    switch (irandom_range(1, 9)) {
      case 1: i = "Wrapping both hands around his wet cock, you jerk him until he cums in your face. "; break
      case 2: i = "When he pulls out of your mouth, his cum sprays onto your face. "; break
      case 3: i = "He begins to jerk himself off, and you look up at him as he cums on your face. "; break
      case 4: i = "Faster and faster, you rub his cock between your tits until he cums on your chest. "; break
      case 5: i = "You squeeze harder and harder until his cum splashes against your face. "; break
      case 6: i = "He begins to thrust himself between your tits before cumming against your neck. "; break
      case 7: i = "You feel his cock begin to twitch, and you quickly pull your head back, catching his cum with your face. "; break
      case 8: i = "Gasping for air, you remove him from your throat, and he cums against your face as you cough. "; break
      case 9: i = "His hands on your head, he pulls you off of his cock and cums in your face. "; break
    }
  } else {
    switch (irandom_range(1, 9)) {
      case 1: i = "You begin rapidly yanking his cock while vigorously swallowing the cum from the tip. "; break
      case 2: i = "As he cums, you move up and down his shaft, swallowing every drop as it comes out. "; break
      case 3: i = "He fits as much of his cock as he can into your mouth before cumming, and you try to swallow as fast as he cums. "; break
      case 4: i = "Rubbing his cock between your tits, you continue to suck until you're swallowing his cum. "; break
      case 5: i = "Squeezing the base of his cock between your tits, you try to swallow his cum as fast as you can. "; break
      case 6: i = "He thrusts himself between your tits and into your mouth, and you soon find yourself swallowing a mouth full of cum. "; break
      case 7: i = "You feel his cock begin to throb against your tongue, as his cum begins pouring into your throat."; break
      case 8: i = "He suddenly cums into your throat, causing you to cough, and a little bit of cum seeps through your nose. "; break
      case 9: i = "Your head is firmly held against his hips, and he doesn't release you until he's finished cumming. "; break
    }
  }
  ii += i
  return ii
}

function get_text_encounter_v(inside) {
  let self = this
  let roll = irandom_range(1, 2), i = ""
  switch (irandom_range(1, 4)) {
    case 1:
      if (roll === 1) {
        i = "##Laying down on your back, you hold your legs apart. "
      } else if (roll === 2) {
        i = "##Laying on your back, you lift your legs, inviting him in. "
      }
      break
    case 2:
      if (roll === 1) {
        i = "##Before long, you get down to your hands and knees, and lift your ass up. "
      } else if (roll === 2) {
        i = "##Quickly, you slump to your hands and knees, wiggling your ass in the air. "
      }
      break
    case 3:
      if (roll === 1) {
        i = "##You lean forward and place your hands on the wall, presenting yourself. "
      } else if (roll === 2) {
        i = "##Presenting yourself, you lean forward while spreading your legs. "
      }
      break
    case 4:
      i = "##You climb upon him as he presses against your hole. "
      break
  }
  let ii = i
  switch (irandom_range(1, 9)) {
    case 1: i = "For a while, he rapidly thrusts into your pussy. "; break
    case 2: i = "He pushes his cock deeply in and out of your pussy. "; break
    case 3: i = "You try to stay steady as he furiously pounds against your pussy. "; break
    case 4: i = "You feel his cock slowly push into you, over and over. "; break
    case 5: i = "His thrusts into your pussy are deep and rhythmic, and he shows no signs of stopping. "; break
    case 6: i = "You can feel him squeeze your breasts while he fucks you. "; break
    case 7: i = "He quickly slips into your pussy before he begins to savagely fuck you. "; break
    case 8: i = "Reaching down, you help guide his cock into your pussy, and he begins to work his way in and out. "; break
    case 9: i = "He crudely slams himself against your pussy. "; break
  }
  // TODO
  ii += i
  if (self.danger === Dangers.rough) {
    switch (irandom_range(1, 5)) {
      case 1:
        if (!advantage_exist(Advantages.stretchy_body)) {
          i = "His cock is too big for your pussy, and you try to stay silent as he forces it all in each thrust. "
        } else if (advantage_exist(Advantages.stretchy_body)) {
          i = "His cock is too big for your body, but the bulge climbing up and down your belly feels amazing. "
        }
        break
      case 2:
        if (!advantage_exist(Advantages.stretchy_body)) {
          i = "You feel your pussy stretch every time he plunges his oversized cock into you. "
        } else if (advantage_exist(Advantages.stretchy_body)) {
          i = "You moan each time your pussy stretches around his oversized cock. "
        }
        break
      case 3:
        if (!advantage_exist(Advantages.stretchy_body)) {
          i = "His relentless thrusting is too much for your pussy to handle and is starting to hurt. "
        } else if (advantage_exist(Advantages.stretchy_body)) {
          i = "His relentless thrusting against your insides forces you to orgasm more than once. "
        }
        break
      case 4:
        if (!advantage_exist(Advantages.stretchy_body)) {
          i = "The loud smacking sounds of his hips slamming against you hides your whimpering. "
        } else if (advantage_exist(Advantages.stretchy_body)) {
          i = "The loud smacking sounds of his hips slamming against you accompanies your moans of ecstasy. "
        }
        break
      case 5:
        if (!advantage_exist(Advantages.stretchy_body)) {
          i = "You get slapped now and then while he is fucking you. "
        } else if (advantage_exist(Advantages.stretchy_body)) {
          i = "Your body tingles as his cock crashes against your insides. "
        }
        break
    }
    ii += i
  }
  if (!inside) {
    switch (irandom_range(1, 4)) {
      case 1: i = "He pulls out, lays his cock against you, and immediately begins to cum. "; break
      case 2: i = "He barely pulls out in time, coating your pussy lips in cum. "; break
      case 3: i = "He reluctantly pulls out and begins quickly stroking himself before cumming on you. "; break
      case 4: i = "When he pulls out, you begin jerking his cock before unleashing his cum on your stomach. "; break
    }
  } else if (inside && self.danger === Dangers.none) { // NOTE: thonk. when is it inside but not Dangers.inside?
    // if anything, cum_in_me perk sets danger to dangers.inside doesnt it
    switch (irandom_range(1, 4)) {
      case 1: i = "You feel his hips press firmly against you as his cock begins to pulsate, filling your pussy with cum. "; break
      case 2: i = "His thrusts become quicker and quicker until you can feel his cum being poured into your pussy. "; break
      case 3: i = "You feel his cock press against your cervix before he begins pumping his cum into your pussy. "; break
      case 4: i = "He begins to pull out, but leaves the tip inside your pussy while he cums. "; break
    }
  } else if (inside) {
    // oops. accident i swear
    switch (irandom_range(1, 4)) {
      case 1: i = "He quickly pulls out and cums on your body, but it wasn't quick enough, as cum drips out of your pussy. "; break
      case 2: i = "You feel warmth as he continues thrusting, and before you know it, cum is dripping from your pussy. "; break
      case 3: i = "Suddenly, he holds you tight and thrusts, preventing you from escaping while he pumps his load into your pussy. "; break
      case 4: i = "He thrusts deeply before suddenly cumming deep within your pussy, but you are unable to get away in time. "; break
    }
  }
  ii += i
  return ii
}

function get_text_encounter_request(type, inside) {
  // let r = irandom_range(1, 2)
  let i = ""
  if (!inside) {
    switch (type) {
      case SkillTypes.vaginal: i = "He wants to have sex. "; break
      case SkillTypes.anal:i = "He wants to have anal sex. "; break
      case SkillTypes.oral: i = "He wants you to give him head. "; break
      case SkillTypes.hands: i = "He wants you to jerk him off. "; break
      default: i = "TEXT ERROR."; break
    }
  } else {
    switch (type) {
      case SkillTypes.vaginal: i = "He wants to cum in your pussy. "; break
      case SkillTypes.anal:i = "He wants to cum in your ass. "; break
      case SkillTypes.oral: i = "He wants to cum in your mouth. "; break
      case SkillTypes.hands: i = "He wants you to jerk him off. "; break
      default: i = "TEXT ERROR."; break
    }
  }
  return i
}
