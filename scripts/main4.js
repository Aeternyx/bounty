// GML
/* globals irandom_range */
// classes
/* globals Advantages, EquipmentTypes, WeaponClasses, Races, Subraces, Locations, Dangers, StatLevels, SkillTypes, AttackedActions, Acceptances */
// functions and stuff
/* globals obj_stats, roll_d6, advantage_exist, stat_low */
// all the get texts. 2. town stuff and stuff

function get_text_equip_description(equip_tier, type) {
  let i = "", ii = "", material = ""
  switch (type) {
    case EquipmentTypes.sword:
      switch (obj_stats.location) {
        case Locations.port: i = "A shortened curved blade often used at sea."; material = "Metal"; break
        case Locations.farmland: i = "This blade is easily concealed and is an effective self-defense tool"; material = "Metal"; break
        case Locations.city: i = "Elvish-designed fencing weapon commonly worn as a decoration."; material = "Metal"; break
        case Locations.church: i = "A short, wide-tipped sword capable of both slashing and thrusting attacks."; material = "Metal"; break
        case Locations.university: /* nothing */; break
        case Locations.military_camp: i = "Standard-issue sword given to most military units for self defense."; material = "Metal"; break
        case Locations.island: i = "A thin, curved blade that sees more use as a status symbol than in actual combat"; material = "Metal"; break
        // it's type -> its type
        case Locations.colosseum: i = "While it's shorter than others of its type, this weapon is the future of swords."; material = "Metal"; break
        case Locations.forestry: i = "A short, elvish blade that curves partially down the blade."; material = "Metal"; break
        case Locations.cult: i = "This dagger has a wavy blade and is often associated with sacrifice."; material = "Metal"; break
        case Locations.herbarium: i = "Easily concealed, this eastern sidearm is more effective than it looks."; material = "Metal"; break
        case Locations.barracks: /* nothing */; break
        case Locations.slaver_camp: /* nothing */; break
      }
      break
    case EquipmentTypes.axe:
      switch (obj_stats.location) {
        case Locations.port: i = "A multi-purpose weapon useful for destroying both foes and barricades alike."; material = "Metal"; break
        case Locations.farmland: i = "A small handaxe commonly used to chop small amounts of wood."; material = "Metal"; break
        case Locations.city: i = "An axe of dwarven design used mostly for ceremonies."; material = "Metal"; break
        // NOTE: for short axe source pasted onto material not `i` lmfaoooo
        case Locations.church: i = "A very short axe with an extended blade that acts as a hand guard."; material = "Metal"; break
        case Locations.university: /* nothing */; break
        case Locations.military_camp: i = "A heavy weapon with two blades, the battleaxe is capable of warding off most threats."; material = "Metal"; break
        case Locations.island: i = "A simple axe often used for survival purposes."; material = "Metal"; break
        case Locations.colosseum: i = "The blade on this axe is so tall that it almost resembles a heavy sword."; material = "Metal"; break
        case Locations.forestry: i = "A durable tool carried by druids who care for the surrounding forests."; material = "Metal"; break
        case Locations.cult: i = "This one-handed axe has a very wide blade meant for executions."; material = "Metal"; break
        case Locations.herbarium: /* nothing */; break
        case Locations.barracks: i = "A small yet simple axe designed to penetrate helmets with ease."; material = "Metal"; break
        case Locations.slaver_camp: /* nothing */; break
      }
      break
    case EquipmentTypes.body:
      switch (obj_stats.location) {
        case Locations.port: i = "A short vest that barely covers your bosoms. It is tied tightly in the front."; material = "Cloth"; break
        case Locations.farmland: i = "Low-cut tunic that hangs slightly past your hips. It comes with a leather belt."; material = "Cloth"; break
        case Locations.city: i = "Exotic top designed to fit snugly against your body. It is easily removed."; material = "Natural"; break
        case Locations.church: i = "A loose-fitting body wrapping designed to be easily worn. This one is much shorter than normal."; material = "Cloth"; break
        case Locations.university: i = "A tight low-cut coat that firmly holds your chest in place. It does not cover your naval."; material = "Leather"; break
        case Locations.military_camp: i = "Two armored chest cups connected with metal bands. It is designed to create and expose cleavage."; material = "Metal"; break
        case Locations.island: i = "A skimpy piece of cloth that is almost guaranteed to somewhat cover your chest. It's held up by side straps that tie in the back."; material = "Cloth"; break
        case Locations.colosseum: i = "This piece of clothing is nothing more than strips of leather designed to strategically cover your nipples. It is rather tight."; material = "Leather"; break
        case Locations.forestry: i = "Exotic top designed to fit snugly against your body. It is easily removed."; material = "Natural"; break
        case Locations.cult: i = "A dark, open-sided short robe that is little more than a long, airy vest. It barely extends past your hips."; material = "Cloth"; break
        case Locations.herbarium: i = "An elegant garb that is soft to the touch, almost resembling a bath robe. It's as revealing as you want it to be."; material = "Cloth"; break
        case Locations.barracks: i = "Two hardened chest cups sewn onto a cloth pad. It's effective at creating cleavage."; material = "Leather"; break
        case Locations.slaver_camp: /* nothing */; break
      }
      break
    case EquipmentTypes.legs:
      switch (obj_stats.location) {
        case Locations.port: i = "Airy pants commonly worn by sailors. They are very comfortable."; material = "Cloth"; break
        case Locations.farmland: i = "This short skirt covers half of your thighs. A favorite amongst young people."; material = "Cloth"; break
        case Locations.city: i = "This skirt is completely exposed in the front and back. Includes tight thin panties."; material = "Natural"; break
        case Locations.church: i = "A sexy string of cloth that barely covers anything on your body. It is stain resistant."; material = "Cloth"; break
        case Locations.university: i = "These shorts aren't long enough to cover your ass. They are designed to show off your ass and thighs."; material = "Cloth"; break
        case Locations.military_camp: i = "Very thin thong that connects to the sides with rings of metal. They are very alluring."; material = "Cloth"; break
        case Locations.island: i = "Exposing underwear that ties together around your hips. Barely covers your rear."; material = "Cloth"; break
        case Locations.colosseum: i = "A shortened armored skirt, with each strip of leather hold a metal stud near the tip. Includes a cheap set of cloth panties."; material = "Leather"; break
        case Locations.forestry: i = "This skirt is completely exposed in the front and back. Includes tight thin panties."; material = "Natural"; break
        case Locations.cult: i = "A sexy string of cloth that barely covers anything on your body. It is stain resistant."; material = "Cloth"; break
        case Locations.herbarium: i = "A thin set of underwear that is easily removed, or rather pushed to the side. Rarely visible, even when exposed."; material = "Cloth"; break
        case Locations.barracks: i = "If these shorts were any shorter, they'd more resemble a thong than anything else. They barely reach a quarter down your thighs."; material = "Leather"; break
        case Locations.slaver_camp: /* nothing */; break
      }
      break
    case EquipmentTypes.feet:
      switch (obj_stats.location) {
        case Locations.port: i = "Tall boots that almost reach to your knees. They are very durable."; material = "Leather"; break
        case Locations.farmland: i = "Padded shoes that are easy to walk in. Surprisingly comfortable."; material = "Leather"; break
        case Locations.city: i = "Hardened yet comfortable sandals that expose your ankles. They are not very restricting."; material = "Leather"; break
        case Locations.church: i = "Sandals with leather wrappings that reach your knees. They are very light."; material = "Leather"; break
        case Locations.university: i = "Soft enchanted stockings that reach your thighs. When walking, they feel as solid as shoes, and never get dirty."; material = "Cloth"; break
        case Locations.military_camp: i = "Tall heels that make you appear taller than you actually are. A courtesan favorite."; material = "Leather"; break
        case Locations.island: i = "Loose-fitting sandals that are easily removed. They are only held on by a strap between your toes."; material = "Leather"; break
        case Locations.colosseum: i = "These sandals don't leave much of your feet or ankles exposed. They are easy to walk in."; material = "Leather"; break
        case Locations.forestry: i = "Hardened yet comfortable sandals that expose your ankles. They are not very restricting."; material = "Natural"; break
        case Locations.cult: i = "These shoes are lifted up by a tall spike, similar to high heels. They're not very easy to walk in."; material = "Leather"; break
        // NOTE: slightly slanted zoris. not super high
        case Locations.herbarium: i = "An exotic set of shoes made with straw and covered in cloth. They resemble high heels."; material = "Cloth"; break
        case Locations.barracks: i = "These durable foot-wrappings extend up to your knees. They make you feel cozy."; material = "Leather"; break
        case Locations.slaver_camp: /* nothing */; break
      }
      break
  }
  ii = i
  switch (equip_tier) {
    case 1:
      switch (material) {
        case "Metal": i = "##It is made from a soft nickel alloy designed to imitate silver."; break
        case "Cloth": i = "##It is made with cheap wool and is water resistent."; break
        case "Leather": i = "##It is made with hides harvested from small animals."; break
        case "Natural": i = "##It is made from alchemically-treated leaves."; break
      }
      break
    case 2:
      switch (material) {
        case "Metal": i = "##It is made from a durable bronze alloy with a beautiful color."; break
        case "Cloth": i = "##It is made with high-quality wool and looks fairly durable."; break
        case "Leather": i = "##It is made with tanned leather that is soft to the touch."; break
        case "Natural": i = "##It is made from woven plant fibers that expose much of your skin."; break
      }
      break
    case 3:
      switch (material) {
        case "Metal": i = "##It is made from a nickel-steel alloy designed to be both durable and attractive, and is decorated with fine carvings."; break
        case "Cloth": i = "##It is made with sheets of very breathable, dyed linen, and is decorated with cotton trim."; break
        case "Leather": i = "##It is made with tanned leather that has soft cotton padding on the interior, and is decorated with a beautiful finish."; break
        case "Natural": i = "##It is made from woven plant fibers from an ancient tree, and is decorated with treated red and orange leaves."; break
      }
      break
    case 4:
      switch (material) {
        case "Metal": i = "##It is made from a lightweight silver alloy with an impressive sheen, and is decorated with intricate carvings"; break
        case "Cloth": i = "##It is made with dyed imported silks from a faraway land, and is decorated with fancy trim and small patterns."; break
        case "Leather": i = "##It is made with padded leather that has been ordained with brass studs, and is decorated with bands of cloth and an alluring finish."; break
        case "Natural": i = "##It is made from colorful, fine woven plant fibers, and is decorated with bright rose petals."; break
      }
      break
    case 5:
      switch (material) {
        case "Metal": i = "##It is made from a glittery metal that is both stronger and more beautiful than silver, and is decorated with highly-detailed carvings and strips of dyed silk."; break
        case "Cloth": i = "##It is made with an exquisite material that is extremely soft, and is decorated with layers of beautiful trim and intricate stitchings."; break
        case "Leather": i = "##It is made with the soft fur of an exotic animal that has been fit with very soft padding, and is decorated with golden studs and silk wrappings."; break
        case "Natural": i = "##It is made from light, beautiful woven plant fibers, and is decorated with strands of small, bright pink leaves that are soft to the touch."; break
      }
      break
  }
  return ii + i
}

function get_text_equip_name(equip_tier, type) {
  let i = "", material = ""
  switch (type) {
    case EquipmentTypes.sword:
      switch (obj_stats.location) {
        case Locations.port: i = "Cutlass"; material = "Metal"; break
        case Locations.farmland: i = "Dagger"; material = "Metal"; break
        case Locations.city: i = "Rapier"; material = "Metal"; break
        case Locations.church: i = "Gladius"; material = "Metal"; break
        case Locations.university: /* nothing */; break
        case Locations.military_camp: i = "Short Sword"; material = "Metal"; break
        case Locations.island: i = "Saber"; material = "Metal"; break
        case Locations.colosseum: i = "Spatha"; material = "Metal"; break
        case Locations.forestry: i = "Elven Blade"; material = "Metal"; break
        case Locations.cult: i = "Kris"; material = "Metal"; break
        case Locations.herbarium: i = "Tanto"; material = "Metal"; break
        case Locations.barracks: /* nothing */; break
        case Locations.slaver_camp: /* nothing */; break
      }
      break
    case EquipmentTypes.axe:
      switch (obj_stats.location) {
        case Locations.port: i = "Boarding Axe"; material = "Metal"; break
        case Locations.farmland: i = "Hatchet"; material = "Metal"; break
        case Locations.city: i = "Ornate Axe"; material = "Metal"; break
        case Locations.church: i = "Short Axe"; material = "Metal"; break
        case Locations.university: /* nothing */; break
        case Locations.military_camp: i = "Battleaxe"; material = "Metal"; break
        case Locations.island: i = "Hunting Axe"; material = "Metal"; break
        case Locations.colosseum: i = "Tall Blade"; material = "Metal"; break
        case Locations.forestry: i = "Druid Axe"; material = "Metal"; break
        case Locations.cult: i = "Crescent"; material = "Metal"; break
        case Locations.herbarium: /* nothing */; break
        case Locations.barracks: i = "War Axe"; material = "Metal"; break
        case Locations.slaver_camp: /* nothing */; break
      }
      break
    case EquipmentTypes.body:
      switch (obj_stats.location) {
        case Locations.port: i = "Vest"; material = "Cloth"; break
        case Locations.farmland: i = "Tunic"; material = "Cloth"; break
        case Locations.city: i = "Bra"; material = "Natural"; break
        case Locations.church: i = "Toga"; material = "Cloth"; break
        case Locations.university: i = "Coat"; material = "Leather"; break
        case Locations.military_camp: i = "Top"; material = "Metal"; break
        case Locations.island: i = "Bikini Top"; material = "Cloth"; break
        case Locations.colosseum: i = "Straps"; material = "Leather"; break
        case Locations.forestry: i = "Bra"; material = "Natural"; break
        case Locations.cult: i = "Robe"; material = "Cloth"; break
        case Locations.herbarium: i = "Kimono"; material = "Cloth"; break
        case Locations.barracks: i = "Top"; material = "Leather"; break
        case Locations.slaver_camp: /* nothing */; break
      }
      break
    case EquipmentTypes.legs:
      switch (obj_stats.location) {
        case Locations.port: i = "Slops"; material = "Cloth"; break
        case Locations.farmland: i = "Skirt"; material = "Cloth"; break
        case Locations.city: i = "Skirt"; material = "Natural"; break
        case Locations.church: i = "G-string"; material = "Cloth"; break
        case Locations.university: i = "Shorts"; material = "Cloth"; break
        case Locations.military_camp: i = "Thong"; material = "Cloth"; break
        case Locations.island: i = "Bikini Bottom"; material = "Cloth"; break
        case Locations.colosseum: i = "Studded Skirt"; material = "Leather"; break
        case Locations.forestry: i = "Skirt"; material = "Natural"; break
        case Locations.cult: i = "G-String"; material = "Cloth"; break
        case Locations.herbarium: i = "Thong"; material = "Cloth"; break
        case Locations.barracks: i = "Shorts"; material = "Leather"; break
        case Locations.slaver_camp: /* nothing */; break
      }
      break
    case EquipmentTypes.feet:
      switch (obj_stats.location) {
        case Locations.port: i = "Boots"; material = "Leather"; break
        case Locations.farmland: i = "Shoes"; material = "Leather"; break
        case Locations.city: i = "Sandals"; material = "Leather"; break
        case Locations.church: i = "High Sandals"; material = "Leather"; break
        case Locations.university: i = "Stockings"; material = "Cloth"; break
        case Locations.military_camp: i = "High Heels"; material = "Leather"; break
        case Locations.island: i = "Flip Flops"; material = "Leather"; break
        case Locations.colosseum: i = "Full Sandals"; material = "Leather"; break
        case Locations.forestry: i = "Low Sandals"; material = "Natural"; break
        case Locations.cult: i = "Stilettos"; material = "Leather"; break
        case Locations.herbarium: i = "Zōri"; material = "Cloth"; break
        case Locations.barracks: i = "Hogh Boots"; material = "Leather"; break
        case Locations.slaver_camp: /* nothing */; break
      }
      break
  }
  let ii = i
  switch (equip_tier) {
    case 1:
      switch (material) {
        case "Metal": i = "Nickel"; break
        case "Cloth": i = "Rough"; break
        case "Leather": i = "Hide"; break
        case "Natural": i = "Leaf"; break
      }
      break
    case 2:
      switch (material) {
        case "Metal": i = "Bronze"; break
        case "Cloth": i = "Wool"; break
        case "Leather": i = "Leather"; break
        case "Natural": i = "Vine"; break
      }
      break
    case 3:
      switch (material) {
        case "Metal": i = "Steel"; break
        case "Cloth": i = "Linen"; break
        case "Leather": i = "Padded"; break
        case "Natural": i = "Autumn"; break
      }
      break
    case 4:
      switch (material) {
        case "Metal": i = "Silver"; break
        case "Cloth": i = "Silken"; break
        case "Leather": i = "Studded"; break
        case "Natural": i = "Rose"; break
      }
      break
    case 5:
      switch (material) {
        case "Metal": i = "Mithril"; break
        case "Cloth": i = "Velvet"; break
        case "Leather": i = "Fur"; break
        case "Natural": i = "Cherry"; break
      }
      break
  }
  return i + " " + ii
}

function get_text_food(timeline) {
  let ii = obj_stats.location, i = ""
  switch (timeline) {
    case 1:
      switch (ii) {
        case Locations.port: i = "biscuits"; break
        case Locations.farmland: i = "freshly baked bread"; break
        case Locations.city: i = "corn on the cob"; break
        case Locations.church: i = "a cup of steamed rice"; break
        case Locations.university: i = "day-old cookies"; break
        case Locations.military_camp: i = "a loaf of hardtack"; break
        case Locations.island: i = "old sweet bread rolls"; break
        case Locations.colosseum: i = "bowl of cabbage soup"; break
        case Locations.forestry: i = "honey biscuits"; break
        case Locations.cult: i = "a radish salad"; break
        case Locations.herbarium: i = "some seaweed wrapped rice balls"; break
        case Locations.barracks: i = "squash"; break
        case Locations.slaver_camp: i = "stale biscuits"; break
      }
      break
    case 2:
      switch (ii) {
        case Locations.port: i = "breaded fish fillet with fried potatoes"; break
        case Locations.farmland: i = "a bowl of potato soup"; break
        case Locations.city: i = "cured beef on bread"; break
        case Locations.church: i = "two slices of vegetable pizza"; break
        case Locations.university: i = "donuts and a mug of milk"; break
        case Locations.military_camp: i = "a bowl of chunky beef stew"; break
        case Locations.island: i = "a few island kebabs"; break
        case Locations.colosseum: i = "oat buns filled with roast pork"; break
        case Locations.forestry: i = "a fried sweet potato"; break
        case Locations.cult: i = "a bowl of spicy chili"; break
        case Locations.herbarium: i = "a platter of chicken teriyaki"; break
        case Locations.barracks: i = "a meat pie"; break
        case Locations.slaver_camp: i = "a bowl of mystery stew"; break
      }
      break
    case 3:
      switch (ii) {
        case Locations.port: i = "a shrimp platter with coleslaw and fried potatoes"; break
        case Locations.farmland: i = "fresh bacon and eggs with toast and jam"; break
        case Locations.city: i = "slices of spiced elf bread wrapped in a candied leaf"; break
        case Locations.church: i = "a plate of pasta with a meat sauce and topped with cheeses"; break
        case Locations.university: i = "fluffy apple turnovers coated with glaze"; break
        case Locations.military_camp: i = "roasted pheasant with gravy"; break
        case Locations.island: i = "grilled salmon with sliced pineapples"; break
        case Locations.colosseum: i = "a shoulder of roast pork with garlic biscuits"; break
        case Locations.forestry: i = "turkey with stuffing and potatoes"; break
        case Locations.cult: i = "shepherd's pie"; break
        case Locations.herbarium: i = "a platter of tempura with steamed rice"; break
        case Locations.barracks: i = "roast venison with carrots and peas"; break
        case Locations.slaver_camp: i = "a bowl of chicken with a strange gravy"; break
      }
      break
    case 5:
      switch (ii) {
        case Locations.port: i = "breaded fish fillet with fried potatoes"; break
        case Locations.farmland: i = "a variety of fresh fruits, straight from the orchard"; break
        case Locations.city: i = "cured beef on bread"; break
        case Locations.church: i = "two slices of vegetable pizza"; break
        case Locations.university: i = "donuts and a mug of milk"; break
        case Locations.military_camp: i = "a bowl of chunky beef stew"; break
        case Locations.island: i = "a few island kebabs"; break
        case Locations.colosseum: i = "oat buns filled with roast pork"; break
        case Locations.forestry: i = "a fried sweet potato"; break
        case Locations.cult: i = "a bowl of spicy chili"; break
        case Locations.herbarium: i = "a platter of gourmet sandwiches and cookies along with some tea, earlier at the tea house."; break
        case Locations.barracks: i = "a leftover roll you had stashed from the feast you just left"; break
        case Locations.slaver_camp: i = "a bowl of mystery stew"; break
      }
      break
    default: i = "FOOD ERROR PLEASE REPORT"; break
  }
  return i
}

function get_text_inventory(item) {
  let i = ""
  switch (item) {
    case "Soap":
      i = "A chalky, brittle substance that can be used to wash your body."
      break
    case "Luxurious soap":
      i = "This tub of soap is filled with a colorful gel and has a rich aroma. ##Not only is it more effective at cleaning your skin, but it's pleasant."
      break
    case "Perfume":
      i = "This small, heart-shaped bottle is filled with a fragrant liquid."
      break
    case "Tonic":
      i = "This small flask is filled with a green liquid that stimulates the well-being of your body. It won't magically repair your wounds, but it will certainly purge your system of any illnesses once per day."
      break
    case "Scented candle":
      i = "A minuscule block of wax that emits a wonderful aroma when lit. It can make your daily routine more pleasant."
      break
    case "Manicure & pedicure":
      i = "Your fingers and toes look better than they ever have. It may not last forever, but you certainly wish it did. Your customers probably appreciate it, too."
      break
    case "Elven cloak":
      i = "Lighter than a typical cloak, anyone wearing this garment may find themselves harder to notice. Wild elves typically wear these in the forest to hide from potential hunters."
      break
    case "Silken sheets":
      i = "This fine luxury sheet is very compact with folded, and can make any night of sleep a pleasant experience."
      break
    case "Silver combs":
      i = "A beautiful set of combs crafted with silver. You feel very charming after using these."
      break
    case "Buckler":
      i = "A petite, easily-concealed shield that fits snugly against your forearm. ##Carrying this could reduce the harm you take if you are attacked."
      break
    case "Spermicide":
      i = "It might be a good idea to use this every once in a while. You never know... ##You'll automatically use this if you feel like you need it."
      break
    case "Certificate, remedial":
      // NOTE: this desc is a lie. don't think it's required. or even obtainable
      i = "Certificate granted for the completion of basic mathematics. Required to advance to more advanced lectures."
      break
    case "Certificate, general":
      i = "Certificate granted for the completion of current events. Required to advance to more advanced lectures."
      break
    case "Certificate, advanced":
      i = "Certificate granted for the completion of ancient history. Required to advance to more advanced lectures."
      break
    case "Apprentice's degree":
      i = "This scroll designates you as having participated in an acceptable amount of studies, acknowledging that you're more educated than most. It is magically protected against weather and forgery."
      break
    case "Scroll of Rejuvenation":
      i = "This parchment is covered in runes that glow a dim lime green. The spell within will unleash an energy that will stimulate rapid healing."
      break
    case "Scroll of Charm":
      i = "This parchment is covered in fine caligraphy that glows a dim light pink. The spell within unleashes an illusion over the caster that supernaturally attracts other people."
      break
    default: i = "Hover over an item to inspect it."; break
  }
  return i
}

function get_text_stage_tier() {
  let i = ""
  switch (obj_stats.stage_tier) {
    case 2:
      i = "Unlike your previous trips, this one leads you over quite the large river. The bridge is in really good condition for being so old and so large. Of course it would be in good condition - this is Vesta Major, the widest river in the republic. ##You can see the capital city of the republic down the river as you cross. It's hard to imagine that the events that resulted in you being here were conspired in that city. ##It's not a dream. Your family is dead, and it's all over some power struggle that nobody wanted to be involved in. You'll never see your friends again, nor the manor you spent most of your life in. ##Thoughts continue to race through your head well after the caravan passed the river. Vesta Major was just the first landmark you'll see during your escape. You've always heard rumors of cities to the east being more expensive to live in due to the wars of the past damaging the countryside. Hopefully it's not as bad as people say."
      break
    case 3:
      i = "The land seems less and less fertile the further you travel out. It's really starting to become noticeable here, with trees becoming thinner, and the grass more yellow. ##You recognize the mountain to the north. You've always been told stories of a cataclysm long ago that occurred there, with adventurers and crusaders marching to destroy some unholy artifact underneath the mountain. Hell's Peak, it used to be called. It doesn't seem like a fitting name, nowadays, considering how beautiful it looks from here. ##Then again, you've never really bought into fairy tales. What's really important is that this mountain marks the center of the republic. You're getting closer to your goal."
      break
    case 4:
      i = "You've never traveled this far across Vesta before, and by the look of things, for good reason. It's almost wild out here, and it seems everyone is suffering. Villages can't seem to grow enough food, bandits roam freely across the land, and monster raids seem so much more frequent. ##You've heard more than once that tensions between Olyvia and Vesta have never stopped growing. You shiver at the thought of this land having to deal with full-scale war. The republic might be the strongest force on the continent, but the people here would suffer greatly for it. ##Hopefully things are better for you in Olyvia. You're just a few cities away from the border. The final stretch lies before you."
      break
    default: i = "TIER ERROR THIS SHOULD NOT BE POSSIBLE TO SEE"; break
  }
  return i
}

function get_text_races(race) {
  let ii = obj_stats.location, i = ""
  switch (race) {
    case Races.human:
      i = "Humans are known throughout the world, and compose of many different variants and cultures. They are highly adaptable, and can become good at anything they set their hearts to. ##Humans can select two starting perks instead of one. #Humans are quick to adapt, and can unlock perks to accelerate their progress."
      break
    case Races.half_elf:
      i = "Combining the noble ancestry of elves and the adaptability of humans, half elves are quick to learn, but lack most of the traits common to humans or elves. Half elves are typically very shy or gentle as a result of being an outcast in the eyes of both elves and humans. ##Half Elves have the Elf perk and gain +1 experience from all encounters except gangbangs, where they earn -1 experience. ##All Elves, no matter how pure-blooded, can unlock perks that may help them say pure-bodied."
      break
    case Races.elf:
      i = "Elves are proud and noble, and would be a more dominant force in the world if more of them existed. Their holier-than-thou attitude has always driven a wedge between them and the other civilized nations. Elves have a long history of conflict with orc tribes, though despite their frail bodies, they've never been fully conquered. ##All elves begin the game with the Elf perk. ##All Elves, no matter how pure-blooded, can unlock perks that may help them say pure-bodied."
      break
    case Races.dwarf:
      i = "Dwarves are a very industrious race, offsetting their small size with powerful bodies. Because of this, they typically reside in hilly regions, or more commonly, underground in expansive caverns. Unfortunately, they have never been considered a charismatic people, and their straight-to-the-point attitude doesn't make them very popular. ##All dwarves have the Small perk, and have +1 Body and -1 Charm. ##More than other races, dwarves are comfortable with anal sex, and can unlock perks that help anyone their with be more comfortable with it, too."
      break
    case Races.halfling:
      i = "While they may not be easy to notice, halflings live all over the continent. Less ambitious than the other races, they tend to settle more easily, and are more likely to feast than to do anything productive. Because of this, they mostly dwell in settlements with high dwarven or human populations. ##Halflings have the Small perk, and their mood increases 50% faster."
      break
    case Races.goblin:
      i = "Despite being more numerous than any other race, goblins aren't commonly found inside of civilization. Instead, they tend to form numerous tribes throughout the wilderness. Combining this with their aggressive nature, goblins are often the first step on any adventurer's achievements. ##Goblins all have the Small perk, and have -1 to negotiation. ##A sullied body serves as a constant reminder of their fertility for goblins, and they can unlock perks that take advantage of this."
      break
    case Races.orc:
      i = "Nothing screams ferocity as well as a stampeding, enraged orc. Orcs are comfortable settling in tribal villages and taking what they need, but are also just as comfortable living in towns and cities. Despite the many wars they've waged against the elves, their numbers continue to grow and become even more powerful. ##Orcs have an extra +30 maximum life, and are naturally skilled with axes. ##Tapping into their primal history, Orcs can unlock perks that are bound to ward off aggressors."
      break
    case Subraces[Races.human].noble:
      i = "Your father was a nobleman and your mother was a noblewoman. Because of this, you spent most of your childhood learning how to act and being involved in politics."
      break
    case Subraces[Races.human].barbarian:
      i = "Living in a noble house wasn't always your life, but after your family was wrapped up in a political alliance, you found the Republic of Vesta to be a comfortable home. Your history of living a life amongst the tribes grants you +1 resistance."
      break
    case Subraces[Races.human].armegian:
      i = "To say that you've lived comfortably on the blood and sweat of others wouldn't be a lie, as your family has always been involved in the exchange of slaves. Slavers understand the potential consequences if they don't release you."
      break
    case Subraces[Races.elf].high:
      i = "Being highborn has provided you a life of luxury in the noble houses of Vesta. Your keen mind and constant studies grant you +1 Mind at the cost of -1 Body."
      break
    case Subraces[Races.elf].wild:
      i = "You've always been surrounded by admirers due to your parentage. Your natural beauty grants you +1 Charm, but you have a hard time picking up modern concepts, causing you to take -1 Mind and the Fae perk."
      break
    case Subraces[Races.elf].deep:
      i = "You were too young to remember how you got to this city, but you've never seen anyone else like your family. An abnormality across the continent because of your skin color, you easily draw a crowd in with your exotic beauty, granting you +1 Charm, but you're not as strong as those around you, taking -1 Body."
      break
    case Subraces[Races.dwarf].hill:
      i = "Your manor is on one of the largest hills in the city, but that's only partially a coincidence, as you came from a small village in the hills to begin with."
      break
    case Subraces[Races.dwarf].mountain:
      i = "Life on the surface is new to you, as you've only recently came to this city with your family as emissaries to the underground. Being fit to labor underground, you have an additional +1 Body, but your lack of exposure to other cultures and races causes you to suffer -1 Mind and the Xenophobic perk."
      break
    case Subraces[Races.halfling].rural:
      i = "You're a simple halfling of simple desires. Living in this city isn't as calm as you'd like, but it's hard to beat the luxuries you've been exposed to here, let alone the cuisine."
      break
    case Subraces[Races.halfling].fae:
      i = "Despite always being grouped together with the other halflings, you've always realized you were a little bit different. With a fairy influence on your bloodline, you've always avoided confrontation, and take -1 Combat and the Fae perk."
      break
    case Subraces[Races.goblin].green:
      i = "Throughout your entire life, you've had to fight off urges instilled by your bloodline. If you ever give in to your instincts to breed, your natural resistance to diseases will come in handy, granting you +1 resistance."
      break
    case Subraces[Races.goblin].black:
      i = "It's hard being a goblin in the civilized world, and doubly so being a black goblin. Luckily for you, you're quite easy to overlook, causing anyone who would come searching for you to have a hard time actually finding you."
      break
    case Subraces[Races.orc].half: // TODO: nasty "Half" means half orc yuck. same with everything really. disgusting. absolutely disgusting/
      i = "An orc reading a book isn't something anyone would expect to see. A half orc like you, on the other hand, is a more common sight in this land."
      break
    case Subraces[Races.orc].tribal:
      i = "You don't live in this city because you want to. You're here because you were adopted by a family of merchants, not long after your tribe was wiped off of the face of Gaia. Your poor education may be the source of -1 Mind, but at least you always have your trusted axe at your side."
      break
    default: i = "Not yet implemented."; break
  }
  return i
}

function get_text_option(name)  {
  let i = ""
  switch (name) {
    case "Vaginal":
      switch (obj_stats.o_vaginal) {
        case Acceptances.resist: i = "You will decline sex, and will resist when forced."; break
        case Acceptances.decline: i = "You will decline sex, but will give in when forced."; break
        case Acceptances.accept: i = "You will accept sex, as long as they pull out."; break
        case Acceptances.inside: i = "You will accept sex, and let them cum inside."; break
      }
      if (obj_stats.virgin) {
        i += "##You are still a virgin."
      }
      break
    case "Anal":
      switch (obj_stats.o_anal) {
        case Acceptances.resist: i = "You will decline anal, and will resist when forced."; break
        case Acceptances.decline: i = "You will decline anal, but will give in when forced."; break
        case Acceptances.accept: i = "You will accept anal, as long as they pull out."; break
        case Acceptances.inside: i = "You will accept anal, and let them cum inside."; break
      }
      if (advantage_exist(Advantages.unbreakable)) {
        i += "" // NOTE: empty because it doesn't hurt at all
      } else if (advantage_exist(Advantages.willpower)) {
        i += "##It doesn't hurt all that bad."
      } else {
        i += "##It really hurts for you."
      }
      break
    case "Oral":
      switch (obj_stats.o_oral) {
        case Acceptances.resist: i = "You will decline oral, and will resist when forced."; break
        case Acceptances.decline: i = "You will decline oral, but will give in when forced."; break
        case Acceptances.accept: i = "You will accept oral, as long as they pull out."; break
        case Acceptances.inside: i = "You will accept oral, and you will swallow."; break
      }
      break
    case "Hands":
      let b = "handjobs"
      if (advantage_exist(Advantages.footjob)) {
        b = "handjobs and footjobs"
      }
      switch (obj_stats.o_hands) {
        case Acceptances.resist: i = "You will decline " + b + ", and will resist when forced."; break
        case Acceptances.decline: i = "You will decline " + b + ", but will give in when forced."; break
        case Acceptances.accept: i = "You will accept " + b + ", no matter how messy."; break
      }
      break
    case "Gangbang":
      switch (obj_stats.o_gangbang) {
        case Acceptances.resist: i = "You will resist if more than one person is forced on you."; break
        case Acceptances.decline: i = "You will decline more than one person at a time."; break
        case Acceptances.accept: i = "You will accept more than one person at a time."; break
      }
      break
    case "Price":
      switch (obj_stats.o_price) {
        case 1: i = "You are charging 25% less, helping your ability to negotiate."; break
        case 2: i = "You are charging a fair price."; break
        case 3: i = "You are charging 25% more, hurting your ability to negotiate."; break
      }
      break
    case "Safety":
      switch (obj_stats.o_safety) {
        case 1: i = "You are wild, increasing danger and bringing in more clients."; break
        case 2: i = "You are somewhat cautious."; break
        case 3: i = "You are selective, reducing danger and bringing in less clients."; break
      }
      break
    case "Prostitution":
      // NOTE: no button for this yet?
      switch (obj_stats.o_prostitution) {
        case 1: i = "You're not desperate enough to sell your body."; break
        case 2: i = "You'll sell your body for now."; break
      }
      break
    case "Self Defense":
      // NOTE: no button for this yet?
      switch (obj_stats.o_self_defense) {
        case 1: i = "You will only resist attackers for things you've decided to already resist."; break
        case 2: i = "You will always resist anyone who tries to force themselves on you."; break
      }
      break
    default:
      i = "Hover over a button for an explanation."
      break
  }
  return i
}

function get_text_symbol(num) {
  let i = ""
  if (num > 0) {
    i = "+"
  } else if (num < 0) {
    i = "-"
  }
  return i
}

function get_text_timeline(){
  let i = ""
  switch (obj_stats.timeline) {
    case 1:
      i = "Difficulty: Easy ##Distance: 20 Settlements ##The land is underneath a deafening peace. A rising power in the Republic of Vesta is seeking to eliminate his political opponents from the senate in order to seize control. ##Your family presents such a target, and you must flee the country."
      break
    case 2:
      i = "Difficulty: Normal ##Distance: 30 Settlements ##The Republic of Vesta wars with the neighboring countries over land and resources. The territory near the borders is dangerous, as skirmishes plague the countryside. ##Having been falsely accused of treason, you have little time to escape this war-torn land."
      break
    case 3:
      i = "" // TODO: scenario 3. also 4 which isnt there at all
      break
    case 5:
      i = "Difficulty: Easy ##No end in sight ##Borders are closed as trade negotiations go sour. Traveling in or out the Republic is impossible. ##After recent events, a bounty is placed on your head for false charges involving witchcraft. The only solution is to perpetually flee."
      break
    default: i = "TIMELINE ERROR PLEASE REPORT"; break
  }
  return i
}

function get_text_town_desc(town) {
  let i = ""
  switch (town) {
    case Locations.port: i = "is a busy city, with sailors and traders constantly moving about."; break
    case Locations.farmland: i = "is covered with fields, growing many different types of crops."; break
    case Locations.city: i = "is one of the tallest cities, with tall apartments and many shops."; break
    case Locations.church: i = "is a serene place, with priestesses tending to ornate sculptures."; break
    case Locations.university: i = "has more magic users than not, with most mundane tasks being replaced by the arcane."; break
    case Locations.military_camp: i = "is heavily defended, with soldiers constantly marching through the streets."; break
    case Locations.island: i = "is a calm place filled with tourists and natives alike."; break
    case Locations.colosseum: i = "is an impressive city, filled with tall apartment buildings and other huge constructions."; break
    case Locations.forestry: i = "is home to many elves, from craftsmen to traders to druids."; break
    case Locations.cult: i = "is an eerie town, almost as if it's hiding something."; break
    case Locations.herbarium: i = "is a little hidden-away piece of a culture you've never seen before."; break
    case Locations.barracks: i = "has a soldiers on constant patrol, while the villages pretend they aren't there."; break
    case Locations.slaver_camp: i = "is full of slavers and their product."; break
    default: i = "TOWN ERROR PLEASE REPORT"; break
  }
  return i
}

function get_text_town_name(town) {
  let roll = irandom_range(1, 6) // floor(random(6) + 1)
  let i = ""
  switch (town) {
    case Locations.port:
      switch (roll) {
        case 1: i = "Portus"; break
        case 2: i = "Port Amy"; break
        case 3: i = "Port Kelly"; break
        case 4: i = "Port Holly"; break
        case 5: i = "Abmouth Cove"; break
        case 6: i = "Havenport"; break
      }
      break
    case Locations.farmland:
      switch (roll) {
        case 1: i = "Farmington"; break
        case 2: i = "Culifield"; break
        case 3: i = "Squall's Village"; break
        case 4: i = "Fertile Vale"; break
        case 5: i = "Crossroads"; break
        case 6: i = "Bredonfield"; break
      }
      break
    case Locations.city:
      switch (roll) {
        case 1: i = "Goldcrest"; break
        case 2: i = "Brackenleaf"; break
        case 3: i = "Kirkwall"; break
        case 4: i = "Lancaster"; break
        case 5: i = "Redwickton"; break
        case 6: i = "Mircaster"; break
      }
      break
    case Locations.church:
      switch (roll) {
        case 1: i = "Harmony"; break
        case 2: i = "City of Peace"; break
        case 3: i = "New Athens"; break
        case 4: i = "Arc"; break
        case 5: i = "Holy Priestess"; break
        case 6: i = "Snowpass Temple"; break
      }
      break
    case Locations.university:
      switch (roll) {
        case 1: i = "Westward Academy"; break
        case 2: i = "Eastfield Academy"; break
        case 3: i = "Aria Tower"; break
        case 4: i = "Silver University"; break
        case 5: i = "Veritas"; break
        case 6: i = "Hidden Expanse"; break
      }
      break
    case Locations.military_camp:
      switch (roll) {
        case 1: i = "Republic's Reach"; break
        case 2: i = "Mournstead Pass"; break
        case 3: i = "Oligarchy"; break
        case 4: i = "Dalewood Fortress"; break
        case 5: i = "Sentinum"; break
        case 6: i = "Sandra's Keep"; break
      }
      break
    case Locations.island:
      switch (roll) {
        case 1: i = "Buccaneer's Den"; break
        case 2: i = "Regal Shores"; break
        case 3: i = "Lihue"; break
        case 4: i = "Coron Retreat"; break
        case 5: i = "Nassassu"; break
        case 6: i = "Kohohano"; break
      }
      break
    case Locations.colosseum:
      switch (roll) {
        case 1: i = "Dunwall"; break
        case 2: i = "New Vesta"; break
        case 3: i = "Archway"; break
        case 4: i = "Grand Coliseum"; break
        case 5: i = "Fertile Major"; break
        case 6: i = "Vanilla"; break
      }
      break
    case Locations.forestry:
      switch (roll) {
        case 1: i = "Ironwood"; break
        case 2: i = "Sylvan"; break
        case 3: i = "Golden Expanse"; break
        case 4: i = "Cherry"; break
        case 5: i = "Commune"; break
        case 6: i = "Ana's Forest"; break
      }
      break
    case Locations.cult:
      switch (roll) {
        case 1: i = "Bredon"; break
        case 2: i = "Ironton"; break
        case 3: i = "Flat River"; break
        case 4: i = "Van Buren"; break
        case 5: i = "Southfall"; break
        case 6: i = "Exodus"; break
      }
      break
    case Locations.herbarium:
      switch (roll) {
        case 1: i = "Tawakami"; break
        case 2: i = "Hojo"; break
        case 3: i = "Kaepo Pass"; break
        case 4: i = "Nara Peak"; break
        case 5: i = "Owari Shrine"; break
        case 6: i = "Leazas Pass"; break
      }
      break
    case Locations.barracks:
      switch (roll) {
        case 1: i = "Cromer"; break
        case 2: i = "Saxon"; break
        case 3: i = "North"; break
        case 4: i = "Hunter's Lodge"; break
        case 5: i = "Swan Creek"; break
        case 6: i = "New Republia"; break
      }
      break
    case Locations.slaver_camp: i = "Slaver's Camp"; break
    default: i = "TOWN ERROR PLEASE REPORT"; break
  }
  return i
}

function get_text_travel_start() {
  let target = obj_stats.location_name, i = ""
  switch (obj_stats.location) {
    case Locations.port:
      i = "Catching a ride with a caravan headed to " + target + " doesn't take too long, since a lot of traders travel to and from the port town."
      break
    case Locations.farmland:
      i = "The caravan is crowded with farmers who once brought their crops here to sell, now returning with a load of tools. They're happy to accept you along for the ride."
      break
    case Locations.city:
      i = "Almost all of the traders heading out of town are plotting a course through " + target + ". You're able to easily join one of the trade caravans."
      break
    case Locations.church:
      i = "The caravan heading toward " + target + " is pleasant, carrying many comforts and incenses. The ride is almost downright luxurious."
      break
    case Locations.university:
      i = "You can't figure out why there isn't a lot of traffic passing through " + target + ". You do manage to find someone headed in that direction, and after slipping him a payment, you're loaded into the back of a wagon."
      break
    case Locations.military_camp:
      i = "It's hard to feel unsafe when riding in a wagon crammed full of soldiers. The wagon behind you is full of soldiers. The wagon in front of you is full of soldiers. If something bad happened, you'd be pretty safe tucked inside here. Hopefully."
      break
    case Locations.island:
      i = "Riding on a boat is a nice change of pace, although you're not especially quick at getting your sea legs. Thankfully, it's not a very long ride."
      break
    case Locations.colosseum:
      i = "There's nothing extravagant about the caravan heading into " + target + ", although it's definitely one of the larger caravans you've seen. Almost everything being transported is food, and all of the farmers are dressed in their nicest clothes, although that's not saying much."
      break
    case Locations.forestry:
      i = "Most of the people in the caravan to " + target + " have some amount of elf blood in them. Presumably, elves ferry their goods to trade cities on their own, due to the high prices they're able to fetch."
      break
    case Locations.cult:
      i = "Your ride to " + target + " is quite the small caravan, only a single wagon in size. There is only a single crate on board, and a few other riders. The driver is dressed like one of the priestesses, although she certainly doesn't act like the rest of them."
      break
    case Locations.herbarium:
      i = "You climb into the back of one of the ornate wagons, full of books and scholars. It's not nearly as cozy as it looks, unfortunately, but the people riding along with you are pleasant, if not quiet."
      break
    case Locations.barracks:
      i = "Just like the caravan that brought you to this fortress, this one is also filled with soldiers and supplies. The biggest difference is that none of the soldiers look untrained."
      break
    // case Locations.slaver_camp: // NOTE: this is not handled because you never travel there; you're teleported there
    default: i = "TRAVEL TEXT IS DIE PLZ REPORT"; break
  }
  return i
}

function get_text_travel_weather() {
  let tier = 0
  if (obj_stats.stage_tier >= 3) {
    tier = 1
  }
  let i = ""
  // TODO: roll_d6? here? why not the other places
  switch (roll_d6(tier, "Weather")) {
    case 1:
      i = "This time of year, it can sometimes get so hot in these parts. The sun is mercilessly beating down on the caravan."
      break
    case 2:
      i = "It's a beautiful day for traveling. There isn't a cloud in the sky, as the sun warms the landscape."
      break
    case 3:
      i = "It's a little gloomy and shady today. Clouds fill the sky, hiding the sun away."
      break
    case 4:
      i = "It's not a cold day, but it's the next closest thing. The sun is covered by clouds, and the breeze feels frigid."
      break
    case 5:
      i = "A sprinkle of rain coats the wagon and the road throughout the day. It's not by any means bad weather. If anything, the rain is soothing."
      break
    case 6:
      i = "What a bad day to leave town. It's raining so hard that nobody can see more than 10 feet in front of the caravan. Thunder booms in the distance as the caravan crawls along the path. Luckily, the wagon keeps you dry, but the weather sets the expedition back a bit."
      obj_stats.bounty_distance -= 1
      break
    case 7:
      i = "Freezing. Miserable. Cold. These are the words that come to mind as the caravan continues down the snow-covered landscape. Travel is slow as the drivers try to maintain position on the road. What you'd give for a thick cloak right about now."
      obj_stats.bounty_distance -= 1
      break
    default: i = "WEATHER DIED PLEASE REPORT"; break
  }
  return i
}
