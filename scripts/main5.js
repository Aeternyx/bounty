// gml
/* globals ceil, string, irandom_range */
// classes and enums
/* globals StatTypes, WeaponClasses, Rooms, Locations, SkillTypes, StatLevels, Subraces, Races */
// main
/* globals obj_stats, loc_but, check_stat, check_skill, stat_low, roll_d6, location_store_button, add_fame, advantage_add, inventory_exist, inventory_add, inventory_sub, get_text_town_name, town_gen */
// TODO: are rough and forced bools or nums? nums for now; however might need to be fixed in encounter.js?

// get_text_location goes here. 1k+ lines, oof
function get_text_location(location) {
  let self = this
  let i = "error", roll = 0, roll2 = 0, loc = location, success = 0, ii = 0, weapon = WeaponClasses.none, c_you = 0, c_them = 0
  switch (loc) {
    case "Docks":
      i = "You arrive at the docks. A fresh breeze blows against your face as you watch ships come and go. ##There is a sign requesting hands to load and unload ships in exchange for coin. Small stalls are set up along the path, selling various items. Drunken sailors carry barrels of drink to parties on various ships, and might be a good place to peddle your wares."
      loc_but.call(self, "Carry Cargo", 0)
      loc_but.call(self, "Visit Stalls", 0)
      loc_but.call(self, "Follow Sailors", 0, "VI", "AI", "G")
      break
    case "Docks - Carry Cargo":
      i = "The supervisor directs you to a ship to unload. The various crates and barrels are all full, and it's not an easy task. ##Hours pass before you've finished carrying cargo, exhausted and hungry. Satisfied with your honest work, you approach the supervisor. He reaches into a pouch on his hip, grabs a few coins, and drops them into your hands."
      ii = check_stat(StatTypes.body)
      if (ii < 3) {
        self.cash = ceil(roll_d6(0, "Payment") / 2)
      } else if (ii === 3) {
        self.cash = roll_d6(0, "Payment")
      } else if (ii === 4) {
        self.cash = roll_d6(0, "Payment") + roll_d6(0, "Payment bonus")
      } else if (ii > 4) {
        self.cash = roll_d6(0, "Payment") + roll_d6(0, "Payment bonus") + 6
      }
      self.hygiene = -1 * roll_d6(0, "Hygiene")
      self.mood = -1 * roll_d6(0, "Mood")
      break
    case "Docks - Visit Stalls":
      i = "Most of the stalls are selling things you aren't interested in. Others are selling exotic trinkets at prices you couldn't possibly afford."
      location_store_button.call(self, 7, "Soap", 3)
      location_store_button.call(self, 7, "Luxurious soap", 10)
      location_store_button.call(self, 6, "Silver combs", 46)
      break
    case "Docks - Follow Sailors":
      i = "You follow some of the sailors onto their ship as they carry the keg underneath the deck. Everyone is cheering, drinking, swearing, and dancing, and you're quickly pushed into the thick of it all. You drink while flashing your thighs and brushing against sailors, before one of them pulls you onto his lap. He roughly squeezes your breasts as another approaches you from the front and kisses you. Reaching down, you stroke the two of them through their pants, as they press up against you. ##It doesn't take long before both of them are exposed. The one underneath you presses against your ass, slowly driving inside of you. Just as soon as he's all the way in, the other sailor slips into your pussy. You're bounced up and down in the man's lap, being fucked in both holes. The drunken pleasure becomes too much, and you shriek and moan, while other sailors applaud and cheer. You're pressed firmly from both sides as they both fill your body with their cum. ##When the sailor pulls out of your pussy, another immediately takes his place. His cock easily slips into your cum-filled pussy as the fucking continues. In just a few minutes, you're being pressed against as you're being filled up again. ##As he pulls out, you get off of the first sailor's cock and stand up, cum dripping from your body. One of the sailors slips you a small purse filled with coins as you stumble off of the ship."
      self.cash = obj_stats.vaginal * 2 + obj_stats.anal + check_stat(StatTypes.charm) * 3 + obj_stats.fame_value
      self.cash = self.cash * 3 + roll_d6(0, "Pay modifier")
      self.hygiene = -1 * (11 + roll_d6(0, "Hygiene") + 6)
      self.vag_in = 2
      self.anal_in = 1
      self.gang = 1
      break
    case "Brothel":
      i = "Walking into the brothel, you immediately notice various mostly-nude women dancing across multiple stages. All sorts of men are crowded into this building, occasionally following one of the floor workers into the back. ##You could easily convince a few men to meet with you outside of the building. A few stages are empty, and it looks like you could dance for tips."
      loc_but.call(self, "Peddle Self", 0)
      loc_but.call(self, "Dance", 0)
      break
    case "Brothel - Peddle Self":
      i = "Moving through the crowds, you try to seduce as many men as you can. ##You spend well-over an hour pressing your chest together, sitting on laps, whispering into ears, and stroking people through their pants. Each time, you let them know where they can find you for a little bit of fun. ##When you finally leave the brothel, almost everyone knows where to find you."
      obj_stats.bonus_encounters = 1
      add_fame(1)
      break
    case "Brothel - Dance":
      i = "Approaching one of the empty stages, you climb up and place your hands on the bar. It doesn't take long before the stage is surrounded by dozens of horny men. ##You begin removing your top, and the crowd cheers and throws coins onto the stage. When someone puts money on the stage, you dance closer and closer to them, until your mostly-naked body is in their face. You can't count the number of times your ass has been slapped or your chest has been groped, but if the coins at your feet are any indication, it's been enough. ##A few of the people watching you start masturbating to your performance, and the local whores take this opportunity to lead as many of them as they can to the back rooms. ##As the crowd starts thinning out, you collect the coins and exit the stage. Your body is continuously groped until you finally reach the exit."
      self.cash = roll_d6(0, "Payment") + check_stat(StatTypes.charm) * 2 + obj_stats.fame_value
      break
    case "Stables":
      i = "There are a few stables across the village, all full of animals and workers. ##A sign is posted offering a small salary for cleaning the stables. Some of the horses are rental horses, and can be taken for a ride around a nearby ranch. A man in the corner is looking for someone to take care of a horse's 'personal needs'."
      loc_but.call(self, "Clean Stables", 0)
      loc_but.call(self, "Rent Horse", 0)
      loc_but.call(self, "Personal Needs", 0, "AI")
      break
    case "Stables - Clean Stables":
      i = "You're handed a heavy-duty broom and a pan, and immediately get to work. This place is pretty dirty, and it definitely takes a while to finish the job. ##As you're finishing up, the stable hand comes back and asks you to brush some of the horses before you leave. This task is a lot less taxing, and you take your time moving the brush across the horses, one at a time. ##When you've finished, the worker hands you your payment, and you head off."
      self.cash = roll_d6(1, "Payment")
      self.hygiene = -1 * roll_d6(0, "Hygiene")
      self.mood = -1 * roll_d6(0, "Mood")
      break
    case "Stables - Rent Horse":
      i = "After handing the stable worker a rental fee, you're allowed to choose a horse to take for a stroll. Looking through your options, you choose a smaller, white-colored horse. He looks clean and friendly, and the stable worker helps you into the saddle. You've ridden before, so you know how to handle everything from here. ##Leaving the stable, you lead your mount across the fields. The ranch is extremely large, with miles of land to ride across. You take your time exploring the land, enjoying the fresh air and the cool breeze. ##After having your fill of riding, you bring the horse back to the stable. When the stable hand asks, you tell him that you really enjoyed the ride. ##You leave the stables, satisfied."
      self.mood = 6 + roll_d6(0, "Mood improvement")
      break
    case "Stables - Personal Needs":
      i = "You approach the man as he looks you over. He accepts your help, and leads you to a different stable. This one is smaller and more secluded, and it's fairly dark inside. He leads you to an empty stall, and asks you to bend over the bench and place your hands lower on the railing. You do as he asks, and you feel him messing with your hands. It takes you a moment to realize that he's tying your hands to the railing. ##When he's done, he walks away, and you hear him bringing a horse from behind you. Instinctively, the horse climbs above you, placing his hooves over the railing. You feel it's cock line up with your ass before he painfully plunges inside. At first, it hurts, but it's not even all the way in yet. It thrusts deeper and deeper as you scream as hard as you can. Quick, powerful thrusts drive the oversized cock into your ass, again and again, your screams being your only comfort. ##You thrash and pull your hands to no avail, as the assault on your body continues. You feel your body distort each time it pushes into your body, each thrust deeper than the last. Your screams become quieter and quieter as the horse pumps into your body, before finally filling you with it's cum. It's a warm rush that feels like it'll never stop, as the horse dumps everything it has into your ravaged ass. ##When it's finally done, the horse dismounts, and cum gushes from your hole. The man unties your hands, but you're unable to stand. He places some coin on the bench in front of you and leaves your used body on the bench."
      self.cash = roll_d6(0, "Payment") + roll_d6(0, "Payment 2")
      self.hygiene = -1 * (8 + roll_d6(0, "Hygiene"))
      self.anal_in = 1
      self.rough = 2
      break
    case "Orchard":
      i = "Various trees bear fruit across a large field, and people holding baskets scurry from tree to tree. Carts full of fruit are taken out of the orchard as empty carts pile in. ##The lady near the carts is offering a portion of the fruits to anyone willing to help collect them. Another woman who is carrying fruits stares at you suggestively, and you might be able to make a coin."
      loc_but.call(self, "Pick Fruit", 0)
      loc_but.call(self, "Solicit Woman", 0)
      break
    case "Orchard - Pick Fruit":
      i = "After picking up a basket, you happily begin to pluck fruits from the trees. Alternating between apples and pears, you continuously fill the basket and unload the fruits into the cart. ##The lady is very polite, and thanks you for helping out. As payment, she tells you to take as many fruits as you would like before you leave. ##You take an apple, a pear, a peach, and even a few cherries, and you leave with your meal."
      break
    case "Orchard - Solicit Woman":
      i = "The woman who was watching you is ecstatic when you approach her. You whisper a sweet nothing into her ear before she grabs your hand and leads you to a nearby barn. ##Once inside, she desperately grabs onto your body and kisses you, as you massage her back with your hands. She pulls you on top of her onto a pile of hay, and wraps her arms around you. Kissing her neck, you slowly work your lips down the length of her body, stopping for a brief moment to tease her hard nipples. Once you reach her lower body, you kiss her cute, tiny pussy, before running your tongue along her clit. ##She gasps and moans as you play with her body, moving her body back and forth against your mouth. You turn the intensity up more and more before finally, she wraps her legs around your head and begins shaking. You gently run your tongue along her lips until she finally stops, releasing her legs from your head. ##Satisfied, she fetches you some coins from her pants, and you give her one last kiss before leaving."
      self.hygiene = -1
      self.cash = roll_d6(0, "Payment") + check_stat(StatTypes.charm) + obj_stats.oral
      self.woman = 1
      self.kissing = 1
      break
    case "Theatre":
      i = "A large theatre is selling tickets for a show that is scheduled to start within the hour. People of all shapes and sizes pile into the theatre. A man is rushing people into a side door as they carry boxes and various costumes. ##Buying a ticket and watching the show would be a nice break from everything. You're offered a bit of coin to help prepare the stage before the performance. There is no place for you on the stage, but you're given the option of performing for a private adult performance, taking place a little later."
      loc_but.call(self, "Purchase Ticket", 10)
      loc_but.call(self, "Assist Show", 0)
      loc_but.call(self, "Adult Performance", 0)
      break
    case "Theatre - Purchase Ticket":
      i = "There's a little bit of a wait before you're able to get a ticket. Once you have it, you enter a large hall, where people are meeting and talking. People begin moving into the theatre as the show is about to begin, and you follow them in and take your seat. ##Large windows light the room, but are slowly closed, until the room is almost pitch black. The stage is promptly lit up through a combination of windows, mirrors, and torchlight, and the show begins."
      i += "##The performance is rather comical. You originally thought it'd be more grim, as the story was about a navy captain who deserted his kingdom, but the shenanigans that take place really took it in a different direction. At one point, the captain threw one of his sailors overboard for liking literature that the captain didn't care for. ##In the end, the whole show was an enjoyable experience. It really made you feel like the past few days haven't happened at all."
      self.mood = 10 + roll_d6(0, "Mood improvement")
      break
    case "Theatre - Assist Show":
      i = "The man rushing people turns out to be the director, and he points out a chest and you hurry up and drag it inside. Once you're through the hallway, you find yourself behind the stage, which is currently blocked off by a heavy red curtain. He comes by and starts giving you directions, and you begin to assemble the stage pieces being carried inside. You assemble various pieces of scenery, from trees to houses, before he comes by and grabs you by the wrist. ##You're promptly dragged backstage, where various actors and actresses are being dressed up. You're simply told to help them get ready, and the director storms off. The next hour is spent adjusting tight braziers on busty women, brushing hair, fitting cod pieces, and buttoning shirts and pants. ##Eventually, everything seems to be set, and an assistant brings you a small pouch of coins before shooing you back out of the building."
      self.cash = roll_d6(0, "Payment")
      self.mood = -1 * roll_d6(0, "Mood")
      break
    case "Theatre - Adult Performance":
      i = "A tall man dressed in a red robe with gold trim and wearing a smiling mask escorts you into a staff room in the theatre. Inside, you see more people wearing these same robes and masks. Expecting to be handed a robe, you're instead asked to strip naked. ##When you finish, you're brought behind a purple curtain. Behind you stands several red-robed figures, although you're not sure how many. Turning to the side, you ask the man behind you what you're supposed to do. Silently, he turns your body forward. ##When the curtains open, you are lead forward onto the stage by the robed figures. The stage is smaller than the main theatre, although you figure there must be at least a hundred seats. Before having a chance to study the room, you're pulled back onto a lounge chair, with your legs facing toward the audience. ##The robed figures surround your body, rubbing their soft hands over your body. Body oil is in their hands, coating your body and sending chills up your arms. Your breasts are given special attention, being caressed gently from every angle, while your shoulders and neck are also being carefully massaged. Other robed figures rub along your thighs and legs. You slowly move your legs apart, expecting them to penetrate you. Instead, hands converge upon your vagina, rubbing you in every way possible. The oil feels especially good against your clit. ##As the performance continues, the hands hasten and your body is played with harder and faster. Your clit is furiously stimulated before finally, you arch your body, calling out in pleasure. You hear dozens of people applaud as the curtains close. After changing, you're given some coin as compensation for the performance."
      ii = check_stat(StatTypes.charm)
      if (ii < 3) {
        self.cash = ceil(roll_d6(0, "Payment") / 2)
      } else if (ii === 3) {
        self.cash = roll_d6(0, "Payment")
      } else if (ii === 4) {
        self.cash = roll_d6(0, "Payment") + roll_d6(0, "Payment bonus")
      } else if (ii > 4) {
        self.cash = roll_d6(0, "Payment") + roll_d6(0, "Payment bonus") + 6
      }
      self.hygiene = -1 * roll_d6(0, "Hygiene")
      break
    case "Shady Shop":
      i = "This small shop has all sorts of various items laying about. A man standing behind the counter follows you with his eyes, and a pair of men walk through a curtain into a back room. ##There is a lot of junk to look through, but you might find something you want if you searched hard enough. A small scroll on the counter details the payments offered for girls who are willing to work the glory hole in the back room. Offering more than your mouth at the glory hole would be very popular, but very dangerous."
      loc_but.call(self, "Search Junk", 0)
      loc_but.call(self, "Work Glory Hole", 0, "OI", "G")
      loc_but.call(self, "Cum Dumpster", 0, "VI", "G")
      break
    case "Shady Shop - Search Junk":
      // i = "It seems like you've spent an eternity rummaging through the junk in the shop."
      i = "After spending what feels like an eternity rummaging through the junk in the shop, you find some items that might be useful."
      location_store_button.call(self, 7, "Soap", 4)
      location_store_button.call(self, 7, "Spermicide", 18)
      location_store_button.call(self, 6, "Elven cloak", 198)
      break
    case "Shady Shop - Work Glory Hole":
      roll = roll_d6(0, "Serviced") + roll_d6(0, "Serviced 2") + obj_stats.oral
      i = "While it may not be the highest paying job you've had, working the glory hole is going to be easy money. ##You're lead to a stall in the back room with black walls and a hole waist-high. To the side is a small box with a coin slot in the wall - when a customer enters, they'll drop your payment into this box. ##It's not long before you hear coins drop into the box, and the first cock slips in through the hole. Taking it slowly, you wrap your hand around the base and take the tip into your mouth. After working the tip, you begin taking more and more of it, gently rubbing your tongue up and down the shaft as you do. You become more and more vigorous with your mouth before finally, his cock explodes in your mouth. You try to swallow all of the cum before sucking the tip clean. ##As he pulls out, you hear more coins falling, and another one immediately comes into the hole. You immediately set to work on this one, quickly working your head up and down the cock. ##It's hard to keep track of how many you've drained. After the last man cums, you stand up and count your money - it looks like you've sucked " + string(roll) + " cocks."
      self.oral_in = roll
      self.cash = roll * 2
      self.gang = 1
      self.hygiene = -2 * roll - roll_d6(0, "Hygiene")
      break
    case "Shady Shop - Cum Dumpster":
      roll = roll_d6(0, "Serviced") + roll_d6(0, "Serviced 2") + roll_d6(0, "Serviced 3") + obj_stats.vaginal
      i = "You know it could be really dangerous, but you're desperate for money. ##You're lead to a stall in the back room with black walls and a hole waist-high. To the side is a small box with a coin slot in the wall - when a customer enters, they'll drop your payment into this box. ##You lean forward and plant your hands on the wall in front of you, while firmly pressing your rear against the hole. Within seconds, coins drop into the box, and you feel a cock slowly pressing into your pussy. The man thrusts wildly into you without a care in the world, and you hear him loudly groaning. A few seconds later, his cock starts pulsating, filling you with his cum. He gives a few more gentle thrusts before pulling out, and you hear more coins falling. ##Almost immediately, another cock fills your hole. Not even 10 seconds in, you hear the sounds of coin filling the box beside you. Customers are paying in advance, and you're going to be taking a lot of loads. ##It feels like you've been there forever, and you've lost track of how many cocks you've taken. After the last cock pulls out, you stand up straight and collect the coins. Your thighs are absolutely drenched in cum, and it's been running down your legs to your feet. It's impossible to clean it all up, and eventually you walk out of the shop. From counting the coins, you were a cum dumpster to " + string(roll) + " different men, and you feel like a filthy gutter whore."
      self.vag_in = roll
      self.cash = roll * 3
      self.gang = 1
      self.hygiene = -4 * roll - roll_d6(0, "Hygiene")
      break
    case "City Park":
      i = "As crowded as this wood and stone city is, the city park is large and serene. There are plenty of tall trees filled with birds and squirrels, and a trail leading through the park and across a pond. ##It's a beautiful day out for a quiet stroll in the park."
      loc_but.call(self, "Stroll", 0)
      break
    case "City Park - Stroll":
      i = "It's surprising that something so calm and beautiful can exist in a busy city like this, but this is definitely real. ##Walking down the trail, you're reminded of the parks near the manor you used to live in. The people are sparse, but happy. You can't remember ever seeing someone unhappy in a park. ##Further down the trail, you come across the bridge over the pond. You lean against the railing and look into the water for a few minutes before continuing on. ##You've had plenty of time to think about things, and this was a very relaxing experience."
      self.mood = roll_d6(0, "Mood improvement")
      break
    case "Temple":
      i = "A large, marble temple stands in the center of the town. Citizens visit the temple in flocks, and a large assortment of priestesses move with them. There is a small pool of water in the main chamber, where a priestess blesses visitors. Some of the men are having sex in a side room with some of the priestesses. ##If you're hurt, you could visit the priestess for a blessing. One of the people working tells you that they are always looking for more priestesses for the side room."
      loc_but.call(self, "Divine Healing", 0)
      loc_but.call(self, "Service Men", 0, "VI")
      break
    case "Temple - Divine Healing":
      i = "The priestess beckons you to approach the pool and kneel. When you do, you see your reflection, clear as day. She places her hand on your back and whispers a short prayer. ##You feel your body rejuvenating as the water in the pool ripples. When she removes her hand, you stand up and inspect your body. ##Your body is less blemished and scarred than before. You feel perkier than ever before."
      self.life = 4 + roll_d6(0, "Life gain")
      obj_stats.bonus_health = 6
      break
    case "Temple - Service Men":
      i = "You're lead into a changing room and handed a robe to wear. The robe you are handed is for temporary helpers, and is slightly different than the other robes. It's a light silver color and comes down to your waist. There are no buttons or cords, and the front of the robe hangs open. The robe barely covers your nipples and reveals everything down below. You leave the hood off of your head, just like everyone else. ##When you enter the side room, you see many separate altars with priestesses lounging on them. Each priestess is taking care of a different man. You approach one of the altars and lay on your back, just like the others. Soon, someone comes up to you. ##Standing between your legs, He gets on top of you, bends over, and places his mouth over your nipple, while gently caressing the other. He sucks on your nipple delicately, before working his way up. He kisses you gently, again and again, before finally pressing his cock against your pussy. ##He gently slides in, and thrusts very gently as he continues pressing his lips against yours. You wrap your legs around his hips as he massages your insides, and your kissing becomes more passionate, as your tongues meet. He wraps his arms around you, and his tongue slowly pushes into your mouth as you lightly suck on it, occasionally stroking it with your tongue. His thrusts become quicker and quicker before he presses firmly against your body and begins cumming inside of you. Using your legs that are already wrapped around him, you pull his hips firmly against you, as you continue working his tongue. ##The two of you remain entwined for what feels like an eternity, gently kissing while his cock remains motionless inside your filled hole. When he pulls out and stands up, you stand up as well, and change out of the robe. ##Before you leave, one of the priestesses hand you a gift of coin."
      self.hygiene = -4 * roll_d6(0, "Hygiene")
      self.cash = check_stat(StatTypes.charm) + obj_stats.vaginal + obj_stats.fame_value + roll_d6(0, "Payment")
      self.vag_in = 1
      self.kissing = 1
      break
    case "Bathhouse":
      i = "There are no walls to this public bath, only a roof held up by marble pillars. There are four pools of water around an altar with a crystal on it, which supposedly purifies the water. People are both cleaning themselves and resting in the water, as maidens help those who have coin. ##The bath offers you a place to clean your body more thoroughly than you have been. If you're willing to offer a few coin, one of the maidens could help you bathe. A few wealthier men are waiting for a maiden, and you sense an opportunity to get paid."
      loc_but.call(self, "Take Bath", 0)
      loc_but.call(self, "Bathe with Maiden", 5)
      loc_but.call(self, "Bathe Man", 0, "H")
      break
    case "Bathhouse - Take Bath":
      i = "After undressing, you lower yourself into the water. It's warm, and very comfortable against your skin. The water is crystal clear, with no visible impurities whatsoever. ##After resting for a moment, you begin gently washing your body in the water. The water feels amazing as you rub against your skin, and almost orgasmic as you clean your more sensitive areas. ##After working with your body for a while, you finally emerge from the bath. You dry off with one of the unused towels placed on a small cart before getting dressed and leaving."
      self.hygiene = roll_d6(2, "Hygiene")
      self.mood = 1
      break
    case "Bathhouse - Bathe with Maiden":
      i = "After undressing, you lower yourself into the water. It's warm, and very comfortable against your skin. The water is crystal clear, with no visible impurities whatsoever. ##One of the maidens walk by you, and you beckon her towards you. She is a very beautiful girl, with long, blond hair, soft skin, and ample chest and hips. ##She slips into the pool and comes up from behind you, and wraps her arms around you. She gently caresses your body before brandishing a small, soft sponge. ##It's very arousing, and you can feel your groin warming as she slowly rubs it along your body. She softly grasps one of your breasts while moving the sponge lower and lower. Her lips press against your neck, as she begins slowly stroking your pussy with the smooth, soft sponge. Your body explodes with passion, and you suddenly find yourself screaming as your pussy begins to convulse. ##Once your legs stop shaking, she plants one final kiss on your back before pulling out of the pool. You relax in the water for a few moments before drying off, and you hand the maiden her due before leaving."
      self.hygiene = roll_d6(6, "Hygiene")
      self.mood = roll_d6(0, "Mood improvement") + 2
      self.woman = 1
      break
    case "Bathhouse - Bathe Man":
      i = "You undress and walk around the pool towards one of the men beckoning for a maiden. When you slip into the water, it's warm against your body, and feels great against your skin. ##You take one of the sponges by the side of the bath and approach the man from behind. Rubbing his back with the sponge, you can see his skin becoming more clear. Once you've finished his back, he moves back into your arms, and you begin cleaning his chest, before working your way down. ##As you're working on his body, you notice that he has a firm erection from your actions. While rubbing the sponge against his stomach, you reach your other hand around and gently wrap it around the base of his cock. He grunts as you slowly but firmly pump his cock with your hand. Soon, you let go of the sponge, press your tits firmly against his back, and use your other hand to massage his testicles. It quickly becomes too much for him, and you feel his cock throbbing in your hand, and you continue jerking until he's out of cum. ##When he's done, you pull yourself out of the pool. He points you to a small stack of coins near his belongings and tells you to help yourself, as he is too tired to stand up. ##After collecting, you dress yourself and set off."
      self.cash = roll_d6(0, "Payment") + check_stat(StatTypes.charm) + obj_stats.hands
      self.hygiene = 1
      self.hands = 1
      break
    case "University":
      i = "A massive building, the local university offers many different classes to anyone with the gold to enroll, ranging from courses on magic, history, mathematics, religious studies, to even more mundane tasks like weaving. Many scrolls ordain the walls of the main hall, and there are postings for all of the classes available. There are students in every direction. ##If you can pay the fees, you could enroll in a one-day lecture, and if you complete three lectures, you would qualify for an apprentice degree. Many students look as if they've never touched a woman, and you may be able to entice some of them."
      loc_but.call(self, "Take Class", 98)
      loc_but.call(self, "Advertise", 0)
      break
    case "University - Take Class":
      if (inventory_exist("Apprentice's degree", 0)) {
        i = "You walk up to registration, coin in hand, before you remembered that the next degree will cost you a few platinum. ##You pocket your money and leave the building."
      } else if (inventory_exist("Certificate, advanced", 0)) {
        i = "Since you've already taken two lectures, you'll be able to take an intermediate class today. You sign up for basic wizardry and head towards the lecture hall. This hall is slightly older, with a table at the entrance with boxes labeled 'TAKE ONE' filled with cheap-looking wands inside. You select a smooth, oak wand from the box, enter the hall, and take your seat. ##This time, the professor is dressed in an elaborate robe, carrying his own ornate wand. He spins it in the air for a short moment before creating an image on the wall behind him. It's a row of different wands, each labeled differently. He describes how different types of wands exist. Some wands can be used to store spells for later consumption, while others can be used to channel your own powers. ##The smooth oak wand you have is a wand of force, which can manipulate force and push objects around. The wands passed out are too weak to be of any real use, and are simply tools for students to practice with. You're unlikely to push even a halfling away from you with this wand. ##The lesson continues, as he discusses magical scrolls and their usage. You can invoke a spell from a scroll, but doing so will destroy the scroll. Though you now understand how to use them, he won't be covering scroll creation in this class. ##After the lecture ends, you head into the main hall before realizing that your wand was replaced with a small scroll. It's your apprentice's degree. ##Working toward another degree looks entirely too cost prohibitive, so you decide that you are done with the university for now."
        inventory_add("Apprentice's degree", 0)
        inventory_sub("Certificate, advanced", 0)
      } else if (inventory_exist("Certificate, general", 0)) {
        i = "Today's lecture is from a different professor, who plans to discuss the history of the world. He uses the wand in the desk to create different maps this time, discussing the progression of the world since it began. It's almost baffling how much has happened since the dawn of time, and how much is still happening. ##You've learned about the origins of the different races, and how the current state of the world came to be. Even more surprising, a few words were mentioned about your ancestors. You don't say anything, because you don't want to draw attention to yourself, but it is fun to learn about your own history. ##After the lecture is over, the professor hands out scrolls detailing more history that he wasn't able to cover within the few hours. After you leave the lecture hall, you sit alone at a table and read the scroll you were given. When you're done, you realize that a certificate is attached to the back of the scroll."
        inventory_add("Certificate, advanced", 0)
        inventory_sub("Certificate, general", 0)
      } else if (inventory_exist("Certificate, remedial", 0) || obj_stats.mind >= 3) {
        i = "It isn't cheap, but you sign up for a one-day class today. The lecture topic is to be about current events, something that you're rapidly becoming more familiar with in your travels. ##When you arrive to the lecture hall, you're baffled at how large it is, and take a seat somewhere near the back corner. There has to be more than 300 people in here. ##When the professor arrives, he wastes no time getting started. He takes a wand from his desk and casts a cantrip that reveals a large map behind him. The map displays all of the continents in the world, some of which you know almost nothing about. He discusses the rising tensions between all of the kingdoms on this continent, and the challenges of moving forward with relations. Soon, he begins talking about the happenings in other continents, all which seem unimportant to you at the moment. Still, you listen attentively until the end of the lecture. ##When he's finished, everyone begins to exit the room in unison, being handed certificates on the way out. ##You feel like you've learned a lot about the current state of the world, and you are looking forward to reaching your final destination. On your way out, you remember that if you sign up twice more, you'll qualify for an apprentice's degree."
        inventory_add("Certificate, general", 0)
        inventory_sub("Certificate, remedial", 0)
      } else {
        i = "It isn't cheap, but you sign up for a one-day class today. The lecture topic is to be about current events, something that you're rapidly becoming more familiar with in your travels. ##When you arrive to the lecture hall, you're baffled at how large it is, and take a seat somewhere near the back corner. There has to be more than 300 people in here. ##When the professor arrives, he wastes no time getting started. He takes a wand from his desk and casts a cantrip that reveals a large map behind him. The map displays all of the continents in the world, some of which you know almost nothing about. He discusses the rising tensions between all of the kingdoms on this continent, and the challenges of moving forward with relations. Soon, he begins talking about the happenings in other continents, all which seem unimportant to you at the moment. Still, you listen attentively until the end of the lecture. ##When he's finished, everyone begins to exit the room in unison, being handed certificates on the way out. ##You feel like you've learned a lot about the current state of the world, and you are looking forward to reaching your final destination. On your way out, you remember that if you sign up twice more, you'll qualify for an apprentice's degree."
        inventory_add("Certificate, general", 0)
        inventory_sub("Certificate, remedial", 0)
      }
      break
    case "University - Advertise":
      i = "Walking through the main hall, you approach a few different students who are alone. Each time, you introduce yourself with some form of bodily contact, whether you brushed your chest against them, 'accidentally' touched their groins, or gave quite a suggestive hug. More than once, they walk away hiding an erection. ##Hopefully, telling so many students where to find you will bring you more clients."
      obj_stats.bonus_encounters = 1
      add_fame(1)
      break
    case "Library":
      i = "This tall library is packed with knowledge. Bookshelves stretch across the floor, interrupting only by tables covered in books or stairs, which lead to more floors of bookshelves. There are four librarians working behind the front counter. ##Temporary librarians are being accepted in the front, which could pay well if you're smart enough. Plenty of students and researchers are scattered about, and you might be able to make some coin off of them."
      loc_but.call(self, "Librarian Work", 0)
      loc_but.call(self, "Quietly Solicit", 0, "OI")
      break
    case "Library - Librarian Work":
      i = "Working in the library certainly has it's perks. For one, it's been quiet for the entire day. Although you're not as well paid as the full-time librarians, the compensation is good enough. ##You spend most of the day sorting returned books back onto the many shelves. If anything, you're surprised that you haven't fallen off of a ladder yet."
      ii = check_stat(StatTypes.mind) // NOTE: originally obj_stats.mind
      if (ii < 3) {
        self.cash = ceil(roll_d6(0, "Payment") / 2)
      } else if (ii === 3) {
        self.cash = roll_d6(0, "Payment")
      } else if (ii === 4) {
        self.cash = roll_d6(0, "Payment") + roll_d6(0, "Payment bonus")
      } else if (ii > 4) {
        self.cash = roll_d6(0, "Payment") + roll_d6(0, "Payment bonus") + 6
      }
      self.mood = -1
      break
    case "Library - Quietly Solicit":
      i = "The library is completely silent, but with all of the shelves and tables, you figure you might be able to get some work done. ##Searching for a potential client, you come across a student studying alone at a table. You take a book from the nearest bookshelf and sit down at the same table, across from him. He shyly looks up at you for a short moment before looking away. You look around to see if anybody can see you, and when you're sure the coast is clear, you slump to the floor and crawl underneath the table. Once there, you eagerly begin to fondle the student's groin. ##Initially frightened, he eases into it, and you pull his cock from his pants. With the table providing you cover, you place your tongue at the bottom of the shaft and slowly drag it to the tip, before taking it in your mouth. You take your time, working from the tip to the base. Without warning, his cock starts throbbing, and cum is being poured into your mouth. ##Once he finishes, he immediately packs his stuff and hurries out of the library, but not before leaving a few coins behind for you."
      self.cash = roll_d6(0, "Payment") + check_stat(StatTypes.charm) + obj_stats.oral + obj_stats.fame_value
      self.hygiene = -2 * roll_d6(0, "Hygiene")
      self.oral_in = 1
      break
    case "Magic Shop":
      i = "An old man sits behind a counter in this dusty shop. Everything on the shelves seems to be either magically enchanted, or used for magic. The old man is slowly helping one of the customers. ##Nothing here looks cheap, but you could search for something that you could buy. You could also offer to help the old man take customers."
      loc_but.call(self, "Search Shop", 0)
      loc_but.call(self, "Offer Help", 0)
      break
    case "Magic Shop - Search Shop":
      if (inventory_exist("Apprentice's degree", 0)) {
        i = "Searching through the shop, you find a collection of scrolls that you could invoke the spells within."
        location_store_button.call(self, 7, "Scroll of Rejuvenation", 78)
        location_store_button.call(self, 7, "Scroll of Charm", 82)
      } else {
        i = "Searching through the shop, you find many interesting trinkets, but nothing that you could afford, let alone understand."
      }
      break
    case "Magic Shop - Offer Help":
      i = "The old man happily accepts your help, and you take his place behind the counter. He shows you where to deposit the money when someone purchases something, and tells you don't have to worry about shoplifters or thieves. You're not sure what he meant by that last part. He meanders into the back room where he makes all of his merchandise, and you don't hear from him until you're ready to leave. ##You deposited the money from many different trinkets that were sold, and even a few scrolls. When the man finally emerges from the back room, he hands you a small purple pouch filled with coins and thanks you for watching the store. You graciously accept before exiting."
      self.cash = roll_d6(0, "Payment") + 2
      self.mood = -1
      break
    case "Barracks":
      i = "You head to the barracks nearest to you. There is a small courtyard where soldiers, militia, and adventurers all spar together. Inside the building is a lot of bored soldiers. ##You can find someone of similar skill in the courtyard to practice with. Alternatively, you could solicit the soldiers, if you think you can handle them. "
      loc_but.call(self, "Training", 0)
      loc_but.call(self, "Entertain Soldiers", 0, "VI", "G")
      break
    case "Barracks - Training":
      switch (obj_stats.spec_training) {
        case 1:
          i = "Nobody seems to mind that you're here, so you pick up a wooden training sword, firmly grasp it, and give it a few awkward swings. Experimenting with it, you try to form an effective stance based on what you've see other people doing. ##After growing your confidence for a bit, you approach someone and ask to spar with them. They agree, and you both enter a combat stance, before striking out at each other. ##In most engagements, you spend most of your time deflecting his blows, although you occasionally get a good strike in. ##You're feeling satisfied when you leave the training yard, feeling like you can make some good progress if you return."
          obj_stats.spec_training = 2
          break
        case 2:
          i = "Nobody seems to mind that you're here, so you pick up a wooden training sword, firmly grasp it, and give it a few awkward swings. Experimenting with it, you try to form an effective stance based on what you've see other people doing. ##After growing your confidence for a bit, you approach someone and ask to spar with them. They agree, and you both enter a combat stance, before striking out at each other. ##Your weapons clash, and you move very aggressively. Your opponent is unable to find a weak point in your defenses as you continuously strike him with your wooden weapon. ##You can really tell you've gotten better since you've first came here. He may only have been a conscript, but you you feel better nonetheless. You doubt you'd ever get any better sparring with recruits."
          obj_stats.spec_training = 3
          advantage_add("Recruit")
          self.mood = 1
          break
        case 3:
          i = "Before you pick up one of the weapons, you realize that it'd probably be a waste of time. ##You turn around before dedicating any time."
          obj_stats.actions += 1
          break
        default:
          i = "Nobody seems to mind that you're here, so you pick up a wooden training sword, firmly grasp it, and give it a few awkward swings. Experimenting with it, you try to form an effective stance based on what you've see other people doing. ##After growing your confidence for a bit, you approach someone and ask to spar with them. They agree, and you both enter a combat stance, before striking out at each other. ##He bests you every time, but you quickly learn a lot on how to parry his attacks, although you're never able to mount an offensive of your own. ##You leave training yard, feeling that if you keep practicing, you might make some progress."
          obj_stats.spec_training = 1
          self.life = -4
          break
      }
      break
    case "Barracks - Entertain Soldiers":
      i = "Entering the barracks, you find that the place is completely filled with soldiers. You enter one of the rooms, and seven soldiers look up at you. It doesn't take long for them to realize what you're doing, and you're almost immediately surrounded by the soldiers. ##Your body is groped from every direction, as the soldiers strip everything from your body. You're carried to the closest bed, where you're placed on your back, as the soldiers continue groping your body. One of the soldiers steps between your legs and rubs his fingers across your clit before slowly inserting one. He pulls it out and presses his cock against your pussy, pressing against your hole. His cock is larger than you're used to, and he keeps pressing against you until his tip finally slips in. ##The rest of the soldiers watch as you squeal and moan with each thrust. Your body is stretched again and again until finally, you feel his cum being pumped into you. His cock twitching forces you to gasp in pleasure before he finally pulls out. ##Another soldier steps up and grabs your legs, holding them back towards you as his cock is shoved inside. ##Each of the soldiers watch and cheer as they wait for their turn. One at a time, the soldiers fuck you and fill your pussy full of seed. ##After they're all done, the soldiers all place a few coins on the table. You're handed the coin before quickly being shoved out of the barracks and into the courtyard, naked and dripping cum. Everyone stares at you, as you slip your clothing back on and leave."
      self.cash = obj_stats.vaginal * 7 + check_stat(StatTypes.charm) * 7 + obj_stats.fame_value
      self.cash += roll_d6(0, "Pay modifier")
      self.hygiene = -1 * (28 + roll_d6(0, "Hygiene") + roll_d6(0, "Hygiene 2") + 12) // NOTE: lmao the redundancy
      self.vag_in = 7
      self.gang = 1
      break
    case "Armory":
      i = "The inside of the armory is heavily guarded, with at least six soldiers on guard duty. The quartermaster rests behind a counter with bars preventing access. Behind the bars, you can see a large collection of weapons you probably couldn't handle, and armors too heavy for you. ##You might be able to purchase a weapon that would be of a higher quality than from a civilian merchant."
      loc_but.call(self, "Request Equipment", 0)
      break
    case "Armory - Request Equipment":
      i = "You approach the quartermaster. He agrees to sell you military weapons, but at a hefty price."
      location_store_button.call(self, 1, "Sword", 100 * self.level * self.level)
      location_store_button.call(self, 2, "Axe", 100 * self.level * self.level)
      location_store_button.call(self, 6, "Buckler", 62)
      break
    case "Tavern":
      i = "This large tavern is otherwise unimpressive, except for the huge amount of soldiers inside. Many maids carry food and drink to booths crowded with drunken soldiers. ##If you can cook, they are short on hands in the kitchen. There's plenty of drink for someone looking to pass some time. Otherwise, a lot of the soldiers could use some company."
      loc_but.call(self, "Cook Food", 0)
      loc_but.call(self, "Get Drunk", 2)
      loc_but.call(self, "Provide Company", 0, "H")
      break
    case "Tavern - Cook Food":
      i = "Entering the kitchen door, you're presented with a variety of pots, vegetables, meats and spices. You're not the best of cooks, but none of the dishes you'll be making is very complex. ##You spend most of your time peeling and chopping vegetables for the head cook, before he tasks you to making a beef stew. It takes you a moment to get everything just right, but making a simple stew wasn't very challenging. One of the bar maids walk in and carry the pot back outside. ##The chef pats you on the back and counts a few coins out before handing them to you."
      self.cash = roll_d6(0, "Payment")
      self.hygiene = -1 * roll_d6(0, "Hygiene")
      break
    case "Tavern - Get Drunk":
      i = "You pull up a stool next to the bar and place a coin on the counter. The barkeep sets a tankard overflowing with froth in front of you. You run your finger through the froth and lick it from your finger. It's actually not bad - delicious, even. ##You lift the tankard and take a sip. It's not too strong, and it has a lot of flavor. You lift the tankard and take a drink. You start to feel a little better about things. Holding the tankard up, you finish the rest of the beverage. Your mind feels lighter, and you're not plagued with stressful thoughts. ##Giggling, you place another coin on the counter before being delivered another drink. You take a drink from the tankard before complimenting the man sitting next to you. You take another drink, but it's all gone. The barkeep tells you that you've already drank it, but you're pretty sure he's lying to you. Surely, you'd remember drinking the whole tankard. ##Feeling both satisfied and upset, you plant your feet into the wooden floor and begin to leave. It's more treacherous than you'd like, as the snakes keep snapping at your ankles while sending shock waves across the floor, trying to knock you down. ##Once you get outside, you take a seat on a golden cart covered with pillows, and drift off in a pleasant nap. ##You wake up a few hours later in front of the tavern, get off of the wooden bench, and go along your merry way."
      self.mood = roll_d6(0, "Mood")
      break
    case "Tavern - Provide Company":
      i = "You look around the room before spotting a lonely soldier drinking at a booth. You sit down across from him as he lights up, and the two of you exchange some pleasant (if boring) conversation. ##Slipping off your shoes, you catch him off-guard when you place one of your feet in his lap. You feel him become erect as you massage him with your toes. He reaches down and exposes himself for you, and you continue rubbing him from across the table. You reach your other foot up to his lap and wrap both of your feet around his cock, gently pulling over and over. ##He's trying his hardest not to lose his composure as you speed up your jerking movements. He plants both of his hands firmly on the table as you deftly massage his cock. Finally, you feel his cock throbbing between your toes, as cum runs down your feet. ##Satisfied, the man takes a moment to catch his breath before sliding some coin across the table as a tip. He thanks you for the company. You smile at him before taking the coins and leaving."
      self.cash = obj_stats.hands + check_stat(StatTypes.charm) + obj_stats.fame_value + roll_d6(0, "Pay modifier")
      self.hygiene = -1 * roll_d6(0, "Hygiene")
      self.hands = 1
      break
    case "Beach":
      i = "Following the shore, you come across an expansive beach littered with visitors. Towels cover the beach with the occasional umbrella planted in the sand. There is a tree line in the distance with the occasional beach villa. ##You could probably relax here for the afternoon. Plenty of men along the shore are looking to pick up women."
      loc_but.call(self, "Relax", 0)
      loc_but.call(self, "Solicit Men", 0, "VI")
      break
    case "Beach - Relax":
      i = "You never thought you'd be relaxing on a beach while fleeing for your life, but here you are. It's even the perfect season for this, and despite how many people are here, it's not really that crowded. ##Looking around the shore, you look through all of the abandoned places before choosing a clean, empty towel to relax on. You lay back, basking in the sun, as the breeze blows over you. ##After laying for a bit, your body is feeling warm, so you flip over onto your belly and relax some more. Drowning out everything, you don't even know how long you've been here before you finally get up and leave."
      self.hygiene = -4 * roll_d6(0, "Hygiene")
      break
    case "Beach - Solicit Men":
      i = "Walking across the beach, you come across a buff man flirting with some other women. It doesn't take long for him to notice you, and he makes his way over before introducing your ass to his firm grip. ##After exchanging a few suggestive words and a price point, he looks around for a moment before slipping you a few coins. You're unsure of where to go from here, but he seems to have an idea of his own, as he pushes you onto your back in the sand. You feel people looking at you as he drops on top of you and pulls at your underwear. You manage to get one leg out of your bottoms before he quickly thrusts into your pussy. ##You try to contain yourself as the man fucks you in front of all of the onlookers. He's not very subtle as he repeatedly smacks his hips against yours. Your underwear dangles from your ankle as your legs are continuously pushed back. ##He becomes louder and faster before finally filling you with his cum. Not intending to linger around any longer, he pulls out and walks away. ##You pull your underwear back on over the cum leaking from your body, as the crowd watching finally begins to dissipate. You're somewhat embarrassed by it, but it was thrilling to have sex in front of everyone."
      self.hygiene = -4 * roll_d6(0, "Hygiene")
      self.cash = check_stat(StatTypes.charm) * 2 + obj_stats.vaginal + obj_stats.fame_value + roll_d6(3, "Payment")
      self.vag_in = 1
      break
    case "Spa":
      i = "You can't help but notice how simple the spa appears to be, with a straw roof, and various natural springs underneath a host of palm trees. Seasonal passes are available, which are used to receive a massage any time you want. ##If you have the money, a manicure and pedicure treatment would be a fantastic way to treat yourself. Massages are available if you have a seasonal pass, which you can buy if you do not have one. They are also accepting temporary masseuses, if you don't mind getting your hands dirty. "
      loc_but.call(self, "Treatment", 0)
      // TODO: non-season pass for the poor peasants i guess
      if (inventory_exist("Season Pass", 0)) {
        loc_but.call(self, "Massage", 0)
      } else {
        loc_but.call(self, "Massage", 50)
      }
      loc_but.call(self, "Happy Ending", 0, "H")
      break
    case "Spa - Treatment":
      i = "Sitting down in one of the chairs, you're not left waiting very long before a halfling girl approaches and begins running a cloth across your nails, both hands and feet. She's diligent, with her small hands working quickly and gently. So much so, that you don't even notice that she was holding a file, and is rubbing the tips of your nails with it. ##After having soaked in a small bowl, your appendages are given one last round with her cloth and file before you're all done. As you get up, you hand her the earned payment before walking out of the building. ##Your hands and feet feel softer than they have in years."
      inventory_sub("Manicure & Pedicure", 14)
      inventory_add("Manicure & Pedicure", 14)
      self.mood = 1
      break
    case "Spa - Massage":
      if (!inventory_exist("Season Pass", 0)) {
        i = "After paying for a seasonal pass, you open one of the curtains leading into a smaller room and head inside."
        inventory_add("Season Pass", 0)
      } else {
        i = "You brandish your seasonal pass before heading into one of the curtained rooms."
      }
      i = "##Once inside, you strip naked and lay face down on the table in the center of the room, as the lady inside beckons you to. The table has a comfortable yet thin pad across the top. ##You feel fingers press into your shoulders as she works her hands up and down your back. You gently moan as she presses against you. ##You wake up on the table 30 minutes later. Apparently, you couldn't help but fall asleep during the process, or at least that's what you're told, as she nudges her elbow against your shoulder. You slowly dress yourself before leaving the room, smiling at the lady for the massage you barely remember. ##Regardless, you're feeling really good right now."
      self.mood = roll_d6(6, "Mood improvement")
      break
    case "Spa - Happy Ending":
      i = "After talking with the lady at the counter, you're accepted to work for a short while before being lead into one of the curtained rooms. Inside, you're given a brief rundown on what to do if a customer comes in. It all happens so fast, but one phrase stuck out more than any other - you can accept tips from customers. ##Sitting in this room is boring. It's been almost an hour, and nobody has stopped by. Just as you're lamenting your time here, a man walks in through the curtain. He flashes a seasonal pass at you before he begins undressing. ##You hurriedly stand up and prepare to get to work before he lays down on his belly. You hold your hands up, pausing to remember what you're supposed to do, before reaching down and kneading his upper back. ##While giving attention to his back, you notice his pouch of coin, and remember what you heard about tips. Hoping to make a few coins, you slowly move your hands further and further south, before you find your hands sliding down his hips. Almost instinctively, he rolls over onto his back and flashes you a smile. That's the only sign you need before taking action. ##You wrap your hands around the base of his already erect cock, slowly pulling along his shaft. You take his moaning as approval as you move faster and faster. It starts to feel sticky as precum begins to dribble into your hands. His knees push into the air as he begins to throb between your hands, covering your fingers in cum. ##Using one of the hand towels, you clean him up before cleaning what you can off of your hands. By the time you're finished, he stands, puts his clothing back on, leaves you a few coins on the table, and takes his leave. ##You pocket the coins and leave, but you're stopped on your way out - the lady behind the desk also gives you a very small payment for taking care of a customer."
      self.cash = obj_stats.hands + check_stat(StatTypes.charm) + obj_stats.fame_value + roll_d6(0, "Pay modifier", 2)
      self.hygiene = -1 * roll_d6(0, "Hygiene")
      self.hands = 1
      break
    case "Colosseum":
      i = "A grand arena surrounded by multiple stories of benches, the colosseum is the greatest attraction in the city. There are two separate entrances - one for those who are here to watch the show, and one for the brave (if foolish) souls who are here to compete. The show is free, although you're uninterested in the show. ##If you're feeling brave, duelists can earn a pretty penny in the arena, although you can't enter unless you have a weapon. The exhibition is also starting soon, although it sounds more of an orgy than a fight."
      loc_but.call(self, "Duel", 0)
      loc_but.call(self, "Duel", 0, "VI", "OI", "G")
      break
    case "Colosseum - Duel":
      roll2 = irandom_range(1, 3)
      weapon = obj_stats.weapon_class
      c_you = check_skill(SkillTypes.weapon) + roll_d6(check_skill(SkillTypes.weapon), "Player Strength")
      c_them = roll_d6(7 + obj_stats.stage_tier, "Enemy Strength")
      if (c_you > c_them) {
        success = 1
        self.cash = (c_you - c_them) * 3 + obj_stats.fame_value + roll_d6(3, "Pay modifier")
      } else if (c_you > c_them - 4) {
        success = 2
        self.life = -1 * roll_d6(0, "Damage")
        self.cash = (c_you - c_them) * 3 + obj_stats.fame_value + roll_d6(0, "Pay modifier")
      } else if (c_you !== 0) {
        success = 3
        self.life = -1 * roll_d6(9, "Damage")
      }
      i = "Entering the competition is easier than you thought, and you follow the manager through the dark tunnels underneath the large arena. You hear cheering getting louder and louder until you're face to face with a large closed portcullis. ##Before you have a chance to ask anything, you hear something behind you slam to the ground, and you turn and realize that another portcullis has closed behind you. There's no backing down. ##When the gate in front of you opens, you walk forward into the arena, only to see "
      switch (roll2) {
        case 1:
          i += "a frail human wearing a faded toga walking towards you with a spear in his hands."
          break
        case 2:
          i += "a nude halfling girl pointing a knife at you."
          break
        case 3:
          i += "an orc donned in tattered mail, holding a pair of hand axes."
          break
      }
      switch (success) {
        case 1:
          switch (roll2) {
            case 1:
              i += "##In only a few seconds, he's upon you, ready to thrust his spear at you. You're too fast for him, however, as you dodge his attack and send him to the ground with a quick sweep to the legs, along with disarming him of his weapon. The man rolls over and tries to reach for his spear, but you step on his hand, preventing him from accomplishing anything. ##Your victory is interrupted by the roaring of the crowd. Apparently, your opponent has rubbed them the wrong way one-too-many times, and they're chanting for you to put an end to his life. You oblige, knowing that it's either him or you. Reaching down, you collect his spear from the ground before thrusting it through his chest. The cheering continues before the portcullis opens back up, and you return from whence you came. "
              break
            case 2:
              i += "##It takes a few seconds before she musters up the courage to attack, lunging at you with her blade in hand. Feeling brave, you counter-charge the small woman, preparing for the impeding clash. Before that moment, she stops dead in her tracks and stares at you, shaking nervously as she struggles to hold the knife up. Her terror inspires you with a new-found courage, as you throw your body into hers, easily overpowering her. Both of you collapse to the ground, with the halfling underneath you. She screams and yells as you pin her to the ground, slapping her in order to put her under your control. ##The crowd seems to accept you as the winner as their cheers shake the earth, clamoring for more. You continue to slap the naked halfling underneath you, each smack causing a new roar of excitement. The gates open, and you return as the champion of this match, leaving the bloodied, unconscious halfling in the dirt."
              break
            case 3:
              i += "##Acting quickly, you charge at the orc, holding your weapon above your head. The orc responds in kind, but not before letting out an orcish roar. His overconfidence is his downfall, however, as you quickly sweep his legs, dropping him to the ground. When he turns over, one of his axes is missing. Or, at least, it's not in his hand, but rather lodged in his chest. The orc stumbles to his feet, but before he's regained his combat pose, you've managed to knock him back onto the ground, lodging his axe further into his wound. ##The crowd erupts into cheering as the orc feels around his chest for his own weapon, profusely bleeding on his rags. The gates lift once again, and you proudly exit the arena."
              break
          }
          break
        case 2:
          switch (roll2) {
            case 1:
              i += "##In only a few seconds, he's upon you, thrusting his spear towards you. It glances against you, wounding your arm, before you manage to push him away from you. He rushes back toward you, surprising you with a backhand across the face. ##Quickly, you recompose yourself before he rushes back to you. You're ready for him this time, and you strip the spear from his hands before he attacks. He's not hard to knock to the ground now that he's confused. ##The arena is filled with roars from the crowd as you look around. A few seconds later, the portcullis opens on both sides of the arena. You drop the spear to the ground and walk back the way you came."
              break
            case 2:
              i += "##It takes a few seconds before she musters up the courage to attack, lunging at you with her blade in hand. You watch her closely as she swings at you, and you narrowly evade away from her attack. ##She falls to her stomach after swinging at you and drops her knife, but manages to get back to her feet in no time at all, body covered in dust. You lunge back at her, knocking her back onto the ground with a fierce punch. ##The arena is filled with roars from the crowd as you look around. A few seconds later, the portcullis opens on both sides of the arena. She scrambles away from you and leaves, and you head in the opposite direction."
              break
            case 3:
              i += "##The orc lets out a loud roar before charging at you, both axes in hand. You don't have any time to think before he's upon you. You quickly jump away from his attack, falling onto your backside. He throws his axes onto the ground before lunging on top of you, but he's interrupted when you surprise him with a hand full of dirt and sand to the face. ##As he struggles to clean his eyes out, you get onto your hands and knees and crawl away for a bit before returning to your feet. He rushes in your general direction, still blinded by your surprise attack. Not expecting his attack, his body crashes into you, throwing you both to the ground. He struggles to find where you fell, swinging his arms wildly before you strike out at him. ##The crowd seems pleased with this skirmish, and the gates lift up, signaling that the fight has gone on long enough. It's probably a good thing, because you don't know if you could have beaten that orc."
              break
          }
          break
        case 3:
          switch (roll2) {
            case 1:
              i += "##In only a few seconds, he's upon you, thrusting his spear towards you. It glances against you, wounding your arm, before you manage to push him away from you. He rushes back toward you, surprising you with a backhand across the face. ##You feel helpless against the aging gladiator, as he physically abuses you again and again. You're slapped, punched, hit with the butt of his spear, and finally kicked to the ground before the assault stops. As he stands over your body, you notice the audience filling the arena with cheering, before the portcullis on both sides of the arena open. He wastes no time in leaving, as your body lies beaten on the ground. ##After composing yourself for a few seconds, you finally manage to get up and backtrack through the tunnels. "
              break
            case 2:
              i += "##It takes a few seconds before she musters up the courage to attack, lunging at you with her blade in hand. You watch her closely as she swings at you, and you narrowly evade away from her attack. ##Before you have time to steady yourself, she lunges at you again, this time aiming low. She glances your outer thigh with her knife, causing you to bleed. You fall down to the ground in pain before she makes her third attack, tackling you to the ground. The naked halfling sits on your chest with her knife pressed against your neck, before the portcullis on both sides of the arena open under the storm of applause. She reluctantly stands up and leaves your body in the arena, before you dust yourself off and follow suit." // NOTE: suite -> suit lmao
              break
            case 3:
              i += "##The orc lets out a loud roar before charging at you, both axes in hand. You don't have any time to think before he's upon you. You fall backwards as he swings one of his axes at you, but not before he knicks you across the shoulder. You try to stand up, but it's no use, as the brute quickly butts his head against yours, knocking you onto your back. Before you realize it, the orc is on top of you, growling in your face. The audience roars as he roughly pins your legs back, shoving his erection against you through both of your clothing. ##His rampage is ended too soon when the portcullis opens, and he slowly dismounts you before leaving the arena. You take a moment to brush the orc's spit off of your neck before making the walk of shame back out of the arena, holding one hand on the bruise on your forehead."
              break
          }
          break
      }
      switch (success) {
        case 1:
          i += "##The manager appears before you as you're coming back through the tunnels, and before you had a chance to say anything, he tosses you a purse filled with coin and quickly disappears. "
          break
        case 2:
          i += "##The manager appears before you as you're coming back through the tunnels, and before you had a chance to say anything, he tosses you a small purse and quickly disappears."
          break
        case 3:
          i += "##When you reach the entrance, you're ejected from the lobby. It seems your efforts weren't worth any coin."
          break
      }
      break
    case "Colosseum - Exhibition":
      i = "The arena manager leads you through a series of tunnels underneath the colosseum. Once you reach the end, he tells you to undress, and to leave all of your clothing in a bin before you step into the arena. You follow his suggestion and strip down, completely naked. ##Once you step into the arena, you hear a slamming noise coming from behind you. The portcullis has closed, and you cannot leave. Thousands of spectators are cheering down into the arena, staring at your body. It's about this time you realize there are a lot of other men inside the arena. You've counted about 20 of them. You feel your heart sink as they begin to converge upon you. ##One of them grabs you and lifts you over his shoulder, carrying you toward the center of the arena. He drops you onto your back on a concrete slab in the center, as all of the men begin to form a circle around you, most of them holding an erection. Another person approaches you holding another nude woman, and she's dropped on top of you, her breasts pressing against yours. ##Before you can even think anything, she lets loose a loud squeal and starts bouncing over you. She's the first time to be fucked. Her breasts continue to press against yours as she moans in your face. The excitement is too much for the both of you - she presses her lips against yours while you feel yourself getting wetter and wetter. Her passionate kiss is interrupted when someone presses their cock between the two of you and into her mouth. ##Hands grab at your body, turning you slightly to the side, and you feel one of the men squeezing between your legs. A small pressure is felt against your lips before a cock is pressed into your body. Your horny body begins to move underneath the other girl's as you're fucked in front of thousands of cheering spectators. Your head is pulled back as another cock is laid across your face. Cooperating, you open your mouth and take it inside, his thrusts opposing the man inside your pussy. Both of you have become public cock sleeves, moaning and squealing as you're fucked in a pile. ##The thrusts into your body quicken before you feel a warmth building up between your legs, while the cock in your mouth begins to throb. You're filled with cum from both sides as you eagerly twitch from your own orgasm. The men servicing both you and the woman cycle, with four new cocks filling each hole again. ##This cycle continues until 10 of the men have emptied themselves inside your pussy, with some of them cumming in the girl on top of you before cumming in you, as well. Your whole body is a sticky mess, with cum covering your face and thighs, along with the cum on the girl leaking all over you. ##The men pull away, but apparently the show isn't over, as the girl on top of you bends down and kisses you yet again. Her breath smells like cock at this point, but then again, yours does as well. She lifts one of your legs up and positions herself so both of your cum-filled pussies are pressing against each other. She rubs herself against you, the cum leaking from both of you making the movements slick and pleasurable. Her movements are short and fast, and the two of you moan as you're pressed together. She doesn't have much left in her before she arches her back, gripping you tightly as she orgasms. ##Once she's pleased, the two of you stand up, looking around and noticing that the gates have opened. The crowd is still cheering, some masturbaiting, while a few others have taken to having sex themselves. Following the other girl, you both leave the arena. ##You get dressed and head back out of the tunnels, but not before the manager tosses you a hefty bag of coins for your efforts."
      self.vag_in = 10
      self.oral_in = 10
      self.kissing = 1
      self.woman = 1
      self.cash = obj_stats.vaginal * 10 + obj_stats.oral * 10 + check_stat(StatTypes.charm) * 10 + obj_stats.fame_value + roll_d6(0, "Pay modifier", 2)
      break
    case "Forum":
      i = "The center of this city is a vibrant and crowded place, filled with people from all walks of life. Rows of traders peddle their wares, as citizens stand about and share news and stories. Guards stand on every corner, ensuring that life remains civil. ##With all of the shops, you're sure to find something you'd like. You could try to garner some customers for later, but there are plenty of guards that might catch on."
      loc_but.call(self, "Visit Merchants", 0)
      loc_but.call(self, "Advertise", 0)
      break
    case "Forum - Visit Merchants":
      i = "Looking around the shops surround the forum, there's a few things you might be interested in."
      location_store_button.call(self, 7, "Perfume", 7)
      location_store_button.call(self, 7, "Luxurious soap", 8)
      location_store_button.call(self, 7, "Spermicide", 19)
      break
    case "Forum - Advertise":
      i = "To say this place is crowded would be an understatement. There's a lot of potential customers in this place. All you have to do is get the word out without being discovered by the guards. ##You move from group to group, trying to entice people as you move. Not every attempt is successful, since this place is also filled with women and families. Still, you continue your undercover groping through the crowds. ##When you notice one of the people you approached talking with one of the guards, you quickly flee the scene. It's probably going to help the bounty hunters pick up on your trail, but it's a risk you are willing to take for the chance at some more money."
      if (obj_stats.bounty_distance > 0) {
        obj_stats.bounty_distance -= 1
      }
      add_fame(1)
      obj_stats.bonus_encounters = 3
      break
    case "Palace":
      i = "This extravagant building is barely guarded at all, with nothing but a few mercenaries on the premises. Lords, nobles, and merchants all mingle in the courtyard outside of a sealed ballroom. ##Servants are short in supply, and delivering drinks could net you a few tips. A man in the courtyard invites you to 'partake in his pleasures'."
      loc_but.call(self, "Servant Duty", 0)
      loc_but.call(self, "Partake", 0, "AI")
      break
    case "Palace - Servant Duty":
      i = "You're vaguely familiar with gatherings like these, so you feel comfortable enough offering to help serve the guests here. ##Heading into the kitchen, you see a few different servants running around a counter as they rapidly assemble a platter with various appetizers. One of the ladies tell you to hurry and take it out, so you awkwardly lift it up on one hand and move back into the ballroom. ##You've been to a ball before, but never such an extravagant one. The floors are covered in a crimson red floral pattern, and the walls are all ornately-carved slabs of marble. ##Before you've had time to take everything in, someone snatches one of the snacks from your tray before you snap back to reality and begin moving around the floor. You try to balance the platter as the appetizers are plucked one at a time, shifting the weight again and again. ##Before long, you head back to the kitchen with the empty platter, only to be given another. You repeat the process three more times before you're handed coins instead of a platter."
      self.cash = roll_d6(6, "Pay modifier")
      break
    case "Palace - Partake":
      i = "As odd as such a shady request was coming from a noble, you follow him through the courtyard and through a tiny door, presumably a servant's entrance. He looks fairly clean, dressed in a white and deep purple uniform with a feathered hat. ##You continue following him until he shuts a door behind the two of you. Not paying attention to where you were going, you find yourself in a small, dark room, with light spilling in through one tiny window. ##He tugs you through the darkness, groping your body and pulling away your clothes, before he finally presses you down onto your knees into a large, padded chair. You can't see anything through the darkness as you lean over the back of the chair, before feeling him press against your backside. You weren't expecting it so suddenly, as his tip barely squeezes in. ##A series of short thrusts places him deeper inside your body each time. Bit by bit, little by little, he continuously thrusts inside your ass. You moan as his larger-than-expected cock reaches deeper and deeper, trying to cope with it. ##Suddenly, your backside begins to sting, as he continues squeezing in everything he can. He's apparently not all the way in yet. You squeal and press forward against the chair, frantically trying not to scream as he follows your body and thrusts further inside. He wraps one of his hands around your mouth as you unleash, screaming into his hand. ##Finally, his hips are pressed against your rear, and he stops for just a second. You feel his hands fumble around your face before a gag is pulled into your mouth. As soon as it's secure, he pulls out and thrusts all the way back inside, causing your whole body to convulse. ##The destruction continues for minutes, before he stops, cumming deep inside of you. As he pulls out, your body collapses backwards and onto the floor with a loud thud. His shadow stands over you, squeezing the last of his juice out of his dick and onto your body before dropping a sack filled with coins onto your chest. ##He leaves you in the room, and you lie there for an eternity waiting for the pain to subside before finally pulling the gag off. You lumber out of the dark room and back into the courtyard before leaving this place."
      self.anal_in = 1
      self.cash = obj_stats.anal + check_stat(StatTypes.charm) * 10 + obj_stats.fame_value + roll_d6(6, "Pay modifier", 1)
      self.rough = 1
      self.hygiene = -3 - roll_d6(0, "Hygiene")
      break
    case "Forestry":
      i = "An oddity in these thick woods, this place is wide open and covered in benches and tables. In the center of the clearing is a tree taller than any other in sight. Many small clay pots are strewn about, carrying small trees and plants to be planted across the woods. A pair of elves in forest green robes are tending to the plants here. ##One of the robed workers offers to compensate you if you were to bring them some supplies from across the enclave. The other asks if you'd be interesting in helping him 'tend to some plants', but you feel like it doesn't mean what you think."
      loc_but.call(self, "Supply Run", 0)
      loc_but.call(self, "Tend Plants", 0, "V")
      break
    case "Forestry - Supply Run":
      i = "He sends you across the entire enclave to pick up what he needs at the general store. Running this errand doesn't seem too hard, and before you know it, you're at the general store, holding the envelope given to you by the druid. After passing it to the clerk, he leads you to a heavy sack filled with what feels like dirt. Suddenly, you realize that this isn't going to be as easy as you thought. ##You hoist the sack over your shoulders and begin walking back to the grove. Occasionally, you stop and set the sack down to rest. You're unsure of how, but dirt keeps escaping and getting on your hands. ##After making the laborious trek back to the druids, you set the sack down on on one of the tables and collapse onto your rear. The druid approaches you with a purse in hand and asks where the rest of the sacks are. He takes your expression as the only answer he needs before counting a few coins and dropping them into your palms."
      ii = check_stat(StatTypes.body)
      if (ii < 3) {
        self.cash = ceil(roll_d6(0, "Payment") / 2)
      } else if (ii === 3) {
        self.cash = roll_d6(0, "Payment")
      } else if (ii === 4) {
        self.cash = roll_d6(0, "Payment") + roll_d6(0, "Payment bonus")
      } else if (ii > 4) {
        self.cash = roll_d6(0, "Payment") + roll_d6(0, "Payment bonus") + 6
      }
      self.hygiene = -1 * roll_d6(0, "Hygiene")
      self.mood = -1 * roll_d6(0, "Mood")
      break
    case "Forestry - Tend Plants":
      i = "The druid flashes you a sordid smile before leading you down a dirt road. The foliage is thick here, but your guide knows exactly where he's going. ##He tells you that you've arrived, but when you look around, all you can see is dense foliage in every direction. You can't even see the path heading back into town. ##He turns around and tosses you a small purse filled with coins. Before you have time to ask what's happening, you feel something wrapping around your ankles. You fall forward onto your hands before your body is lifted into the air by two vines wrapped around your ankles, causing you to drop the purse on the ground. More vines slowly reach out toward you, loosening or pulling off your clothing, before finally, a larger vine with a large bud at the tip slowly makes its way between your legs. ##The vine slowly climbs up your thighs until the tip of the bud taps against your groin before suddenly flowering, revealing a long, smooth cock-like organ. The tip of the flower lines up with your pussy before slowly plunging in. It feels good as it presses inside of you, feeling as if it's natural. ##Once it's all the way in, the flower pedals close and grip against your body as it thrusts inside of you. It thrusts in quickly and roughly every time, but pulls out slowly. The pedals have almost created a vacuum, causing a strong sucking sensation each time the vine pulls out. ##Dangling by your ankles, the vine continuously thrusts in and out of your body. The sucking caused each time when it pulls out forces you to cum over and over, and any of your juices that weren't absorbed by the flower are running down your stomach. ##The plant seems to never grow tired and you lose track of time. You've been held up by your ankles, thrown onto your back with your legs in the air, and even pressed against a tree. It seems intent on fucking you everywhere in the forest. Finally, the vine pulls out from inside of you and releases your legs, retracting into the trees above. ##You take a minute to gather your thoughts before fixing your clothing and searching for the purse you dropped. The druid is nowhere to be found. Once you have it, you follow what looks like the path back to town alone."
      self.vag = 1
      self.cash = obj_stats.vaginal + check_stat(StatTypes.charm) + obj_stats.fame_value + roll_d6(6, "Pay modifier", 1)
      self.hygiene = -0 - roll_d6(0, "Hygiene")
      break
    case "Lake":
      i = "Crystal clear to the very bottom, sparkling across the surface. Have you ever seen such a beautiful lake before? There are no people around - not even any animals, or as far as you can tell. After looking around some more, you spot a few pixies on the other side of the lake. ##If you ignore the pixies, you're alone, and maybe it'd be relaxing to take a dip. The pixies stare at you, almost inviting you to play with them."
      loc_but.call(self, "Swim", 0)
      loc_but.call(self, "Fairies", 0)
      break
    case "Lake - Swim":
      i = "It's been a while since you had a proper swim, and this lake looks just perfect for it. You slip out of your clothing and sit on a rock overseeing the water, dipping your toes in. The water is cool, but not too cold. Looking over the edge, you see your reflection looking back at you, clear as day. You decide to go ahead and take the plunge, and drop into the water. ##Suddenly, you find yourself yelping, as your body is surrounded by the cold water. You shiver for a moment as you adapt to the water, forgetting that the water always feels colder on your body than your toes. Once you start to adapt, you swim across the small lake. Or is it a large pond? It's hard for you to tell.## After playing in the water long enough, you approach the rock you leapt in from and pull yourself out. You didn't come prepared with a towel, so you sit nude on the flat boulder for a bit, letting your body drip dry. ##Once most of the water has fallen from your nude body, you begin to dress yourself up again before heading back toward the conclave."
      self.hygiene = 1
      self.mood = roll_d6(0, "Mood")
      break
    case "Lake - Fairies":
      // TODO: this looks very obviously unfinished
      i = "You walk toward the other side of the lake, but the fairies fly into the woods. You try to follow them, but it's no use. They're not interested in you. ##You didn't spend much time chasing them, at least. You still have time to go elsewhere."
      obj_stats.actions += 1
      break
    case "Church":
      i = "While it doesn't seem like much, this small, run-down church holds significance amongst the people of this small town. The large, wooden doors open slowly to reveal rows of wooden pews facing a large altar. The room is colored by the sun shining through stained glass windows depicting various sexual acts being performed on bound women. ##You might learn something by attending the scheduled mass, although it looks like you might be the only woman in the building. A place like this is surely frequented by the charitable, and it might be a good place to beg for money."
      loc_but.call(self, "Attend", 0, "VI")
      loc_but.call(self, "Beg", 0)
      break
    case "Church - Attend":
      // TODO: 100% chance for demonic spawn ending? :thonk:
      i = "You enter the building during a mass, with rows of religious people sitting in pews listening to the lecture at the front altar. The windows are all stained glass, depicting people and scenes you know nothing about. A man at the front shouts throughout the church, as everyone hinges on his every word. ##Suddenly, the mood shifts, as the man standing over the altar notices you. Everyone in the church turns and looks at you as you're beckoned toward the front. You oblige, slowly crossing the now quiet church. ##Once you reach the front, two men sitting behind the alter stand and approach you, immediately placing their hands on your body. Your breasts are squeezed and tugged as your clothing is hastily removed, before being sat down on the altar. Your body is turned around, facing away from the rest of the church. That's when you realize that a huge, demonic figure is standing in front of you. ##The demon has crimson red skin and is larger than an orc. Long horns ordain his head, with his body hair being thicker than a dwarf's. His hands reach out for you immediately, firmly grabbing your hips. You instinctively kick your legs but to no effect. You look down and see the demon's huge cock fully erect and being moved toward your loins. ##He presses against your lips, stinging as his tip is forced into your pussy. You feel so small compared to the demon. The tip of his cock pulsates, slowly wedging into your body, stretching your pussy as you scream in both pleasure and pain. The demon buries himself until you feel him pressing against your cervix, before he laughs and continues to dig even deeper. ##Once he's satisfied, his grip on your waist tightens up, as he pulls out and roughly thrusts back into your body. Your body is in pain as he impales you over and over, although you're confused with how good it feels. Your body convulses in his hands and your legs tremble against his sides as you repeatedly cum all over his demonic cock. ##You're savaged again and again before he finally makes one last thrust, deeper than the rest. His cock pulsates so hard that it feels like your whole body is pulsating, before you feel a rush of hot seed being pumped directly into your womb. ##After the demon defiles you, he pulls out and stands back, letting out a roar as the religious folks at the mass enter a prayer. A couple of coins and a purse sit on a small table near the altar. You snatch the purse as your just dues and make your escape, exiting the church without any resistance. ##What is going on here?"
      self.vag_in = 1
      self.rough = 1
      self.forced = 1
      self.cash = obj_stats.vaginal + check_stat(StatTypes.charm) + obj_stats.fame_value + roll_d6(12, "Pay modifier", 2)
      self.hygiene = -5 - roll_d6(0, "Hygiene")
      break
    case "Church - Beg":
      i = "Despite it not being a very busy day, you sit down outside the church to see if you can collect a few donations. Only occasionally does a pedestrian drop a coin into your hands, but it does happen here and there. ##Eventually, you get tired of sitting in front of the church, and you head off for the day."
      self.cash = roll_d6(0, "Pay modifier", 1)
      break
    case "General Store":
      i = "The only one of it's kind in this town, the general store isn't too impressive, although it does stock a variety of objects. It's different in what you'd expect in any other town, because there are no other stores. A middle-aged man sits behind the counter and flashes a friendly smile at you as you sift through the store. ##You might not find anything extravagant, but it might be worth looking through the stock. The shop keep tells you he's looking for a part time worker of your caliber."
      loc_but.call(self, "Search Store", 0)
      loc_but.call(self, "Dirty Job", 0, "OI")
      break
    case "General Store - Search Store":
      i = "Looking through the shelves, you find a few things you might be able to make use of."
      location_store_button.call(self, 7, "Soap", 4)
      location_store_button.call(self, 7, "Scented candle", 8)
      location_store_button.call(self, 7, "Tonic", 21)
      break
    case "General Store - Dirty Job":
      i = "You can gather what's about to happen just by the look the shopkeep is throwing your way. ##The chubby man waves toward you, inviting you to come behind the counter. You look around, but he stops and tells you to just climb over to his side. ##After touching down, he immediately pulls you close and slips his tongue into your mouth. You don't even have time to react before he's released you, pushing down on your head. You understand what he's doing and obediently fall to your knees, noticing he's been exposed and erect this whole time. But before you do anything, he stands to your side and nudges you underneath the counter. A small ridge only inches long obscures you from being seen from above. ##Hiding under the counter, you run one hand along his shaft, feeling his cock pulsate. Pressing your tongue against the tip, you slowly insert him into your mouth, using your hands to slowly pull him in. ##The door closes, and you hear someone walking around the store. You stop for a few seconds, but he taps his knee against you, signaling you to get back to work. You slowly move your head back and forth, quietly sucking. ##The door opens and closes again, and more people walk into the shop. You continue servicing him as he services the customers. ##Unexpectedly, the shopkeep leans forward to reach for something, and his cock is quickly thrust into your throat, your head pressed firmly between his hips and the counter. Without warning, his cock swells up and his cum begins pouring into your throat. Your coughs are muffled by his body and the counter, and nobody knows that you're being forced to swallow his cum while he does business. ##Once the men are out of the shop, he pulls out of your mouth, and you lean forward coughing, cum oozing out of your nose. He hands you the coins in his hands for a job well done, and you vault back over the counter and leave the store."
      self.oral_in = 1
      self.cash = obj_stats.oral + check_stat(StatTypes.charm) + obj_stats.fame_value + roll_d6(6, "Pay modifier", 1)
      self.hygiene = -1 - roll_d6(0, "Hygiene")
      break
    case "Dojo":
      i = "Exotic weapons adorn the walls of this simple building. The floors are clean and clear, and a few warriors sit around an elderly man in the center of the room. They hinge on every word as he speaks to them. On the other side of the room, a few female monks pose nude, stretching and meditating.##You wouldn't be permitted to practice here since you're not a local, but you might have something else these warriors want. "
      loc_but.call(self, "Service Warriors", 0, "OI")
      break
    case "Dojo - Service Warriors":
      i = "You wait patiently for the teacher to leave your potential clients alone. Once he's left the dojo, you approach the warriors, trying your hardest to tempt them. All but two seem uninterested, leaving the dojo empty with just the three of you. ##The two warriors press against you from each side, caressing your body. One of them sneakily exposes your chest. Reaching down their bodies, you gently rub their groins through their outfits, building a pair of erections. Slinking down to your knees, the two reveal their cocks to you, and you take one in each hand as you think about how to handle this. ##One at a time, you pull them into your mouth, working up and down their shafts for a moment before shifting to the other. The pair groan as you switch between them, their cocks throbbing for your attention. ##As you take one of them back in, your mouth is filled with cream. You try to suck as much of it down as possible, but the other can't wait for his turn, as his seed sprays onto your shoulder. ##The two warriors cobble up a few coins between them and pass them on to you before leaving. You fix your top and wait a moment before leaving, so you're not awkwardly walking alongside them."
      self.oral_in = 1
      self.oral = 1
      self.cash = obj_stats.oral * 2 + check_stat(StatTypes.charm) * 2 + obj_stats.fame_value + roll_d6(0, "Pay modifier", 2)
      self.hygiene = -6 - roll_d6(0, "Hygiene")
      break
    case "Tea House":
      i = "It's amazing how atmospheric this small tea house is. Soft carpeting covers the entire floor with tables low to the ground placed across the room. Tables are sectioned off with decorative silk room dividers. There is a stage in the front of the room, where musicians play a gentle tune on instruments you've never seen before.## While it's not a cheap affair by any means, you could enjoy some tea, along with whatever snacks are available. A traveling merchant is resting here, and might be willing to part with some of his wares."
      loc_but.call(self, "Have Tea", 40)
      loc_but.call(self, "Visit Merchant", 0)
      break
    case "Tea House - Have Tea":
      i = "This place is very peaceful. You're unsure of whether that's because of their culture, or because of how secluded this village is. Regardless, you're excited for your beverage to arrive. Even more so after being inside of this building for so long, with the scent of tea adorning the air. ##Your order arrives, and with a wonderful presentation. The plate contains a small tea cup, along with a small pitcher of freshly made, piping-hot tea. Another plate is sat down, with four different small sandwiches. One last plate is laid upon your table with six delicious looking cookies. ##After you've drank all of the tea and eaten the food that came with it, you leave the tea house, sad that it's all done. "
      self.food = 1
      self.mood = roll_d6(6, "Mood")
      self.life = 1
      break
    case "Tea House - Visit Merchant":
      i = "You talk with the merchant, and he agrees to show you his wares."
      location_store_button.call(self, 7, "Soap", 4)
      location_store_button.call(self, 6, "Silken sheets", 218)
      break
    case "Garden":
      i = "You follow a path of stones alongside a pond as it leads you through various beds of flowers and small trees. This place is extremely peaceful, and after exploring it, surprisingly large. Visitors to the garden mind their own business as they come and go. ##There is an empty spot next to the pond that would be a great place to relax. If you're feeling risky, a man offers you some coin to help him with an 'experiment'."
      loc_but.call(self, "Relax", 0)
      loc_but.call(self, "Aid Experiment", 0, "VI", "OI", "AI")
      break
    case "Garden - Relax":
      i = "To say this place is tranquil is an understatement, aided by how empty it seems to be. ##You sit down by the pond, taking in the surroundings as a wonderful distraction from your day-to-day life. You see the shadows of fish in the pond, slowly moving around. ##The quiet of this isolated garden really helps you relax. Ready to tackle the rest of the day, you stand up and head out."
      self.mood = -1 + roll_d6(0, "Mood", 2)
      break
    case "Garden - Aid Experiment":
      i = "You stand over the man as he kneels in the grass, searching through plants. When he stands up, he tells you that he didn't actually expect you to accept, and asks you to follow him. Walking out of the garden and into a nearby house, he seems more concerned about the plant in his hands than he does you. ##Inside the house, he leads you down a set of stairs and into a basement with little windows casting light across rectangular planters filled with small plants. If you didn't know any better, this looks more like a stone dungeon. ##He hands you a small pouch filled with coins and points you to a closet at the other side of the room and asks you to undress. Once inside, you close the door and expertly remove your clothing and lay it in the corner of the floor. You open the door, and you're immediately slammed back into the closet as something presses into your chest. You look down, spotting the tentacle pressed against your chest wrapping around you. Some shambling horror stands before you, with multiple tentacles where you would expect it's limbs to be. ##You're not given much of a warning before you feel a sudden thrust into your pussy, as the tentacle beast immediately sets upon you. You're rammed against the wall each time as more tentacles converge upon your exposed body, one of which thrusts into your mouth. ##You're violated in the closet until the beast pulls you out, wrapped in tentacles. Crudely, you're slammed against the floor, banging your knees and barely catching yourself with your hands. You're not escaping, however, as the assault continues. This time, you feel a pair of tentacles stroking across your rear before one of them finally presses into your ass. ##The pleasure is overwhelming, as all of the tentacles thrust in rhythm. You try to scream, but nothing but a muffled moan comes out of your stuffed throat. You're roughly slammed against the floor with each thrust and lifted up again as the beast plays with your body. ##The thrusts grow faster and deeper before the horror lets out a low roar. Bulges travel down it's tentacles, reaching the tip and unleashing explosions of monstrous semen inside your every hole. You're pinned to the ground as it pumps more and more of itself inside of you. Once it's finally had it's fill, it lumbers out of the room. ##Your bruised body lies on the floor, absolutely filthy with the seed of that creature. When you finally manage to prop yourself up, you slip on your clothes and limp out of the dungeon."
      self.vag_in = 1
      self.anal_in = 1
      self.oral_in = 1
      self.rough = 1
      self.forced = 1
      self.cash = check_skill(SkillTypes.vaginal) + check_skill(SkillTypes.anal) + check_skill(SkillTypes.oral) + check_stat(StatTypes.charm) + obj_stats.fame_value + roll_d6(6, "Pay modifier", 2)
      break
    case "Meeting Hall":
      i = "Tables reach across the room, covered in food and surrounded by people. It looks like you've entered unnoticed, as men and women alike fraternize and feast throughout the hall, in what looks like a daily occurrence. ##If you're willing to hobnob with the locals, you could probably join in on the daily feast. Otherwise, you might be able to make a few coin under the tables."
      loc_but.call(self, "Feast", 0)
      loc_but.call(self, "Under Table", 0, "OI")
      break
    case "Meeting Hall - Feast":
      i = "You take a seat at one of the tables, almost completely unnoticed. Some of the people in the hall occasionally glance your way, but quickly get caught up in other conversations. ##Ignoring everyone around, you dig into the food on the tables as if it's all for you. You try all sorts of things, from smoked venison to fried squash. ##Once you've had your fill, you casually stroll out of the hall. That was easier than you expected, and the food was great."
      self.food = 1
      break
    case "Meeting Hall - Under Table":
      i = "Before anyone manages to notice you, you find a table with plenty of people around it and crawl underneath. It's actually a tight fit without much room to move. You quickly find yourself face-to-face with many different sets of legs. ##You look around for a second before picking one and slowly sliding your way in between. He looks down at you when you place your head in his lap, before realizing what's happening. He plants a few coins at the base of his seat and you collect them before anything else happens. ##He slowly reveals his cock before you begin sucking on the tip. You quietly work your way up and down as he reaches down and grabs your hair, bobbing your head a little faster. ##Your head is held firmly in place against the base of his cock before he finally begins to cum in your mouth. Trying to stay quiet, you quickly swallow everything you can before licking the last of it off of his shaft. ##Without being seen, you retreat from underneath the table and slip out of the hall."
      self.oral_in = 1
      self.cash = check_skill(SkillTypes.oral) + check_stat(StatTypes.charm) + obj_stats.fame_value + roll_d6(3, "Pay modifier")
      self.hygiene -= -1 - roll_d6(0, "Hygiene")
      break
    case "Pagan Shrine":
      i = "Outside of the village, tall stones form a circle around a smaller circle of stone altars. Looking around, you can't see much further than the tree line surrounding the shrine. In fact, you probably wouldn't have found this place if not for a man in town requesting you to come and offer yourself to the wilderness. You notice a man in an earthly-colored robe is sitting in the center of the shrine, meditating. ##It might do you some good to meditate alongside the robed man. You could also offer your body on one of the altars, as suggested by the man who sent you here."
      loc_but.call(self, "Meditate", 0)
      loc_but.call(self, "Offer Body", 0, "VI")
      break
    case "Pagan Shrine - Meditate":
      i = "You try to quietly sit across from the man, but 'quiet' seems like it's not in your vocabulary, as you crush twigs, leaves, and walk across pebbles before finally taking a seat. ##You close your eyes and cross your legs, trying to clear your mind. It's a relaxing venture for sure, but you can't help but feel like this isn't your sort of thing. ##Eventually, you open your eyes, and the robed man is gone. You follow suite, standing up and leaving the shrine."
      self.mood = 1
      break
    case "Pagan Shrine - Offer Body":
      i = "Approaching an altar inside the shrine, you can't help but notice the stone looks stained with red and white streaks. Some of the stones behind the altars have realistic-looking engravings depicting sexual activities. ##This isn't something you've done before, and you feel awkward just shuffling about in front of the altar. Stripping off your clothes, you finally work up the courage to sit down on the altar, before lifting your legs up and laying down. ##It's surprisingly comfortable, considering it's rough appearance. So much, in fact, that you're overcome with fatigue. You can barely hold your eyes open. The last thing you remember is waving your hand in front of your face. ##You're in a different position when you wake up. Your body feels used, and cum is seeping out of your pussy. Nobody is around - not even the robed figure. ##As you're getting dressed, your eyes cross the stone next to the altar you fell asleep on. Unless you're crazy, there's a new engraving here, and it looks a bit like you! It shows a picture of you on your back with your legs lift straight into the air, with a mysterious man thrusting between your legs. ##You can't help but wonder what this all could mean, before your thoughts are interrupted when you spy a few coins littering the ground around your feet. Picking up all the coins you see, you leave the mysterious shrine."
      self.vag_in = 1
      self.cash = check_skill(SkillTypes.vaginal) + check_stat(StatTypes.charm) + obj_stats.fame_value + roll_d6(3, "Pay modifier")
      self.hygiene -= -4 - roll_d6(0, "Hygiene")
      break
    case "Kennel":
      i = "You've never quite seen a building like this. It's almost like a stable, but with wooden cages housing dozens of hounds, both for hunting and for war. You walk further into the building until you come face to face with the hound master. ##He offers you a payment to go and collect dinner for the hounds. As a side note, he also offers a few extra coins if you're willing to 'help' him with some stubborn breeding dogs."
      loc_but.call(self, "Go Fetch", 0)
      loc_but.call(self, "Please Dogs", 0, "VI")
      break
    case "Kennel - Go Fetch":
      i = "The hound master hands you a small purse and tells you to fetch his meat from the local butchery. He doesn't give you many more details than that before sending you on your way. ##The village isn't very large, but it's hard to tell the buildings apart. There aren't any business signs like you'd expect in a more civilized town. You consider just leaving with the purse, but the village is probably too small to do so. ##Eventually, you find a building you assume is the butchery. After exchanging some of the coin in the purse for the buckets of meat, you carry what goods you came for back to the kennel. ##Once you've returned with the food, the hound master takes it off of your hands and sends you on your way, telling you that your pay is the leftover money in the purse he gave you."
      ii = check_stat(StatTypes.body)
      if (ii < 3) {
        self.cash = ceil(roll_d6(0, "Payment") / 2)
      } else if (ii === 3) {
        self.cash = roll_d6(0, "Payment")
      } else if (ii === 4) {
        self.cash = roll_d6(0, "Payment") + roll_d6(0, "Payment bonus")
      } else if (ii > 4) {
        self.cash = roll_d6(0, "Payment") + roll_d6(0, "Payment bonus") + 6
      }
      self.cash += 1
      break
    case "Kennel - Please Dogs":
      i = "You're well aware of what you're getting into when you accept his offer. He crosses his arms and looks at you for a moment before finally leading you into one of the pens. The floors are actually very clean, considering where you are, at least. A dog in the corner of the room eagerly watches you. ##He walks over and knocks on the wooden wall at the back of the pen before coming back. He commands you to strip and get down on your knees, and you follow through with his order. One of the dogs approach you, and although you're not watching, you have a good idea of what's about to happen. ##The hound quickly climbs up on top of you, lining his cock against your body before rapidly plunging inside of your pussy. You squeal in delight as his rapid thrusts fill you up. His organ isn't the largest by any means, but it presses into you with a ferocity that you had never imagined until now. ##Moaning and squealing with your head pressed against the floor, your canine mate makes his final thrust before you feel a huge pressure build up inside of you. His cock is expanding inside of you, locking him into place and ensuring that none of his seed spills. ##Almost a minute later, the short spurts of cum stop, and he's able to pull out. Standing up, you look toward the hound master, and he hands you a purse filled with coin. Behind him, you can see a long panel of the wall opened up, with multiple sets of eyes invading your body. ##You quickly get dressed and exit the building with your payment."
      self.vag_in = 1
      self.cash = check_skill(SkillTypes.vaginal) + check_stat(StatTypes.charm) + obj_stats.fame_value * 2 + roll_d6(0, "Pay modifier", 2)
      self.hygiene = -4 - roll_d6(0, "Hygiene")
      break
    case "Slave Trader":
      i = "A series of cages are surrounded by weather-worn tents. The cages are filled with various healthy-looking men and attractive women. ##If you've been taken as a slave, you can buy your freedom here. If you can't afford your freedom, you'll be sold on the markets to the west, which will move you further from your goal."
      if (obj_stats.subrace === Subraces[Races.human].armegian) {
        roll = 0.25
      } else {
        roll = 1
      }
      loc_but.call(self, "Purchase Self", (50 + obj_stats.level * 2 + obj_stats.charm * 5) * roll, "VI")
      loc_but.call(self, "Sold Off", 0, "VI")
      break
    case "Slave Trader - Purchase Self":
      i = "It cost you a pretty penny, but you managed to buy your freedom from the slavers. A key is inserted into your collar, and you are once again a free girl. ##You can leave this hellhole any time you want."
      obj_stats.captured = false
      break
    case "Slave Trader - Sold Off":
      i = "Women line up, all either nude or mostly nude, wearing collars that denote them as slaves. You enter the line before some potential buyers walk down the line, inspecting the goods. You hear women squeak as they're fondled and inspected, one at a time. ##When it finally comes your turn, a strange, rather fat man stares at you. He reaches out and pokes your chest before gently fondling you. Your nipples grow hard as he becomes more forceful with you, kneading your tits between his hands. ##Unexpectedly, he wraps an arm around your back and pulls you toward him, pressing his lips against yours. He's not very subtle, pressing his tongue into your mouth and against yours. When he releases you, he signals to the nearest trader that he's taking you with him. ##It's a fairly quick transaction, and it's only minutes before you're lead to a private carriage without any windows. He pulls on the leash attached to your collar as he steps in, and you step up into the carriage with him. He rubs his hands together and smiles at you. You've never felt so uneasy in your life. "
      self.no_escape = true
      self.mood = -9 - roll_d6(0, "Slave stress")
      self.button_1 = "Locked Away"
      break
    case "Slave Trader - Sold Off - Locked Away":
      i = "It's been a few days since you were sold to this pervert. You don't even know his name, or what he does for a living. He seems to be wealthy enough, although you're not actually sure, since you only ever get to see the walls in his basement, where you are kept. ##You hear footsteps coming down the stairs, and you realize he's coming for you yet again. This isn't the first visit you've been paid. For the past few days, he'd come down every so often and have sex with you. Or at least, what he considers sex. He typically just lays on the floor as you ride him for all 20 seconds until he's done. ##When he comes into the room, you're surprised to see him holding a key. He tells you that he's ready for you, but the floor down here is terribly uncomfortable. He commands you to be a good slave and follow him to his bedroom, where you'll service him in the comfort of his bed. ##He leads you up two sets of stairs and into his bedroom, and the first thing you see is a huge bed, filled with pillows and surrounded by drapes. He immediately flops down onto his back, beckoning you to come to him. You do as he says, climbing up onto him and lowering yourself onto his cock. ##You work your hips back and forth, stimulating him inside your body. He reaches up and puts his hands on your chest as you continue to ride him. As expected, it doesn't take long for him to sully your womb with his seed yet again. ##After you get off of him, he tells you that he's tired, and that you should head back down to your room and lock up. You acknowledge his order, walking out of his room and down the stairs. You have no intentions of going back to the basement, however, and after finding your clothes in his house, you casually walk out of the front door. ##You have no idea where you are."
      obj_stats.location = roll_d6(0, "Where am I?")
      // wait... won't this potentially be in the intro? wat
      obj_stats.location_name = get_text_town_name(obj_stats.location)
      self.vag_in = 7
      town_gen()
      obj_stats.stage -= 2
      self.hygiene = -24 - roll_d6(0, "Hygiene")
      self.mood = -19 - roll_d6(0, "Slave stress")
      break
    case "Whore Den":
      i = "A disgusting, run-down building on the outskirts of the town, the sign above the door aptly labeled 'WHORES' does not sugarcoat it's true purpose. Stepping inside, you're treated to the sight of a crowd of men sexually assaulting the women unfortunately enough to be here. You spot some of the attendees staring at your body. ##A place like this doesn't pay well, if at all, but it might be your only chance to make some coin in this dump. The party of men at the other corner of the building look wealthier than the rest, but also just as equally dangerous."
      loc_but.call(self, "Please Crowd", 0, "VI", "OI", "G")
      loc_but.call(self, "Dangerous Men", 0, "VI", "AI", "G")
      break
    case "Whore Den - Please Crowd":
      roll = roll_d6(6, "Vaginal")
      roll2 = roll_d6(6, "Oral")
      i = "Making your way into the crowd, you're quickly stripped of all your clothes. You barely have a chance to do anything before you're hoisted up and thrown onto one of the tables. ##Before your back is even fully against the table, you feel a cock being press against your pussy. The man between your legs wastes no time, thrusting balls deep into you, again and again. It stings a little bit, being given no time to get used to him before he started pounding you. ##Another man across the table pulls your head back before sliding into your mouth. Just like the man already using your body, he's not slow when it comes to thrusting into your mouth. You struggle to breathe, not even having a chance to gasp for air before he begins to thrust into your throat. ##The pounding from both sides stop as your body is tightly squeezed between the two. The bulge in your neck twitches as your throat is filled with cum, and you feel warmth filling your pussy, just before he pulls his now-soaked cock from you. When the other one pulls out from your mouth, you gasp and cough for air, as cum runs down your face. You're given no pause before being set upon by another set of hard cocks. ##The vicious fucking continues until the crowd is fascinated with another slave. Your entire body is covered in cum, and your loins are sore from being so roughly handled. " + string(roll) + " men filled you up, as you were face fucked by another " + string(roll2) + ". ##Once you feel good enough to stand, you collect coins that were dropped in pools of cum around your body before immediately fleeing the scene."
      self.vag_in = roll
      self.anal_in = roll2
      self.cash = roll + roll2
      self.gang = 1
      // NOTE: below was + 2 * roll2 since it was a double negative. sigh...
      self.hygiene = -4 * roll - 2 * roll2 - roll_d6(0, "Hygiene")
      self.life = -roll - roll2
      break
    case "Whore Den - Dangerous Men":
      roll = roll_d6(6, "Vaginal")
      roll2 = roll_d6(6, "Anal")
      i = "Working around the side of the building before you come up to the group of men at the other side. They quickly take interest in you, beckoning you to come closer. Just as you enter arms reach, you are quickly grabbed and placed shoved against a pole. One of the men ties both of your hands to the pole, leaving your ass vulnerable and exposed. ##SMACK! ##You shriek out as your cheeks are roughly slapped. ##SMACK! SMACK! ##After a while, your ass starts to go numb. Maybe that's why you couldn't feel the cock being slipped into your pussy before it was already inside. It hurts on the way in, larger than you're used to. You turn around and notice that everyone has their erections in hand, and they're all some of the largest cocks you've ever seen. ##You try your hardest not to scream, but you're reduced to a sobbing wreck, as the man behind you plunges his over-sized shaft into you. You feel an immense pressure against your cervix before suddenly growing hot, as your body is filled to the brim. ##He pulls out, and another one of the large cocks takes his place. Or at least, you thought he did, before you feel a sharp pain climb up your back. He thrusts roughly into your ass, causing you to return to screaming and sobbing. You try to escape, but the more you move, the more it hurts. ##You don't know how long has passed since you've been here, a slave to these men. When they're all done with you, a small purse is dropped by your feet, as the men walk away. You're stuck tied to the pole for another hour until someone has the decency to set you free. ##Dropping the purse must have been a cruel joke, as your body aches when you bend over to pick it up. You struggle to walk out of the building after taking " + string(roll) + " of the men, and another " + string(roll2) + " in your ass."
      self.vag_in = roll
      self.anal_in = roll2
      self.cash = roll + roll2 + roll_d6(0, "Payment")
      self.gang = 1
      self.rough = 1
      // NOTE: below was + 2 * roll2 since it was a double negative. sigh...
      self.hygiene = -4 * roll - 2 * roll2 - roll_d6(0, "Hygiene")
      self.life = -roll - roll2
      break
    case "On The Road - Slavers - Captured":
      i = "It's days before the canvas is removed. When it's finally taken off, it looks like you're in some sort of nomadic camp, but with more permanence than you'd expect. You're lead out of the cage and into a large tent. Inside, you're poked and proded by two different men, who are very thorough with inspecting your body. The men give your capturer a price, and just like that, you realize that you've been sold. ##Your new owners aren't permanent - you realize that they're just common slave peddlers, as they snap a steel slave collar around your neck. They seemingly don't know about the bounty on your head, since they'd more than likely collect it. ##Regardless, you're stuck here in the camp. You're able to move around at will, but trying to escape would be suicide. You realize that the only way to escape is to buy your own freedom, but it might be hard to raise that sort of money in a village like this. ##The alternative is to find someone who would be willing to buy you, but who knows where that'd take you? One thing is for certain - you need to sort this out before any bounty hunters come by."
      break
    default:
      if (obj_stats.last_room !== 25 /* Rooms.foo */) {
        break
      }
      // road encounters
      weapon = obj_stats.weapon_class
      c_you = check_skill(SkillTypes.weapon) + roll_d6(check_skill(SkillTypes.weapon), "Player Strength")
      c_them = roll_d6(7 + obj_stats.stage_tier, "Enemy Strength")
      if (stat_low(obj_stats.mood) === StatLevels.low) {
        c_you = 0
      }
      if (c_you > c_them) {
        success = 1
      } else if (c_you > c_them - 4) {
        success = 2
        self.life = -1 * roll_d6(9 + roll, "Damage")
      } else if (c_you !== 0) {
        success = 3
        self.life = -1 * roll_d6(9 + roll, "Damage")
        self.forced = 1
      } else {
        success = 3
        self.life = -1 * roll_d6(6 + roll, "Damage")
        // TODO: should this really be forced
        self.forced = 1
      }
      switch (loc) {
        case "On The Road - Bandits":
          i = "A crossbow bolt punctures the wagon near your head, giving you quite the scare. Everyone quickly hops out as you hear combat outside. You decide it'd be best to let them solve the issue, afraid of being struck by a stray bolt. ##Moments later, three bandits climb into your wagon, and immediately start stashing things into a sack. One of them spots you hiding in the corner, and you quickly find yourself surrounded. "
          if (success === 3) {
            i += "##The bandit brandishes a knife and holds it out, demanding you step out of the corner. You do as he says, afraid of being stabbed, before you find yourself being thrown to the floor, landing on your knees. One of the bandits holds a crossbow at your head, while the one behind you exposes your pussy. Within seconds, you feel his cock being pressed in, as he grabs your arms and tugs at your wrists. The third bandit crouches in front of you and presses himself against your mouth before you finally let him in. ##Your wrists are pulled tight as cum fills your pussy, and you struggle to breathe as the other bandit cums into your throat. After they both pull out, the armed bandit pushes you onto your back before climbing on top of you, spreading your legs apart. One of the other bandits holds your hands to stop you from flailing. Your body readily takes another cock, being thrust into more roughly than before. Each thrust makes a loud slap against your body, as you continue to leak cum. With one final thrust, your attacker fills you with his load. The bandits quickly gather their things and depart the wagon, leaving your abused body behind. "
            self.vag_in = 2
            self.oral_in = 1
            self.hygiene = -10 - roll_d6(0, "Hygiene")
          } else {
            i += "##They quickly approach you, but you're fast enough to strike the closest attacker in the groin before coming face-to-face with a bandit holding a crossbow. "
            if (success === 1) {
              i += "##He snaps his weapon at you, puncturing the side of the wagon. The other bandit lunges at you with a hatchet in his hand. "
              switch (weapon) {
                case WeaponClasses.unarmed:
                  i += "You reach out and stop his weapon by grabbing the long handle, before kicking him in the knee, causing him to drop to the floor. The bandit with the crossbow swings a knife at you, but he isn't fast enough, and you kick him from the wagon. He falls backwards onto the road, breaking his neck on impact. "
                  break
                case WeaponClasses.sword:
                  i += "Brandishing your blade, you deflect his attack before puncturing his chest, causing him to fall to the floor. The bandit with the crossbow swings a knife at you, but he isn't fast enough, as you remove his hand in one smooth slash. He screams in agony and falls off of the wagon, knocked unconscious by his fall. "
                  break
                case WeaponClasses.axe:
                  i += "You step back and dodge his first swing before digging into his shoulder with your axe, causing him to slump to the ground in agony. The bandit with the crossbow quickly lunges at you with a knife, but fails to make contact before you plant your axe firmly into his skull. His body falls backward, tumbling out of the wagon. "
                  break
              }
              i += "##Looking for help, you jump out of the wagon, landing on the body below. It looks like the bandits are retreating, with a few corpses from both the caravan and the raiding party laying about. After everything is sorted out, the caravan hits the road yet again. "
            } else if (success === 2) {
              i += "##He fires his weapon at you, grazing your arm and causing you to bleed. You fall down to the ground before the bandit strikes you in the back of the head with his crossbow, forcing you onto your hands and knees. Before they can pin you down, you rush forward, falling out of the wagon and landing on your back. You quickly scurry underneath the wagon where they can't reach you. You lie there for what seems like eternity, before you see their feet hit the ground, running off into the distance. Dizzy and dirty, you climb out from under the wagon, and before long, the caravan is moving again. "
            }
          }
          break
        case "On The Road - Slavers":
          i = "You hear the sound of a horn being signaled from the side of the road, a forewarning of what's about to occur. Everyone else climbs out of the wagon in preparation for an attack, but you stay behind, safely hidden away. Combat soon breaks out, with loud screams and clashes. Before long, everything grows silent. ##Curious, you make your way outside to see what happened. Peaking around the corner, you're immediately greeted by a tall, brown-skinned man holding a club. "
          if (success === 3) {
            i += "##Immediately, you're struck in the head, causing you to fall to the ground on your belly. You can't muster the energy to move your limbs before the man reaches down and picks you up, hoisting your body over his shoulders. ##He brings you to a large cage on a cart, throwing you inside with other members of the caravan. A canvas is pulled over the cage, and you're unable to see anything else happening. "
            obj_stats.location = Locations.slaver_camp
            obj_stats.location_name = "Slaver Camp"
            obj_stats.captured = true
            town_gen()
            obj_stats.actions = 1
            self.button_1 = "Captured"
            self.no_escape = true
          } else {
            i += "##You quickly pull your head back, feeling wind scratch your face from his club being swung along the corner of the wagon. He hurriedly rounds the corner, leaping into the wagon with you. Instinctively, you push him back out, causing him to smash against the road. You follow his body, leaping out and running for the front of the wagon. ##Suddenly, you're confronted by two more raiders. One is carrying a man catcher, and the other is a woman, holding some durable rope. "
            if (success === 1) {
              i += "The man catcher lunges at you, but you're able to duck the attack. He keeps thrusting it at you before you finally grab hold of it just below the head. The woman rushes up to you, rope in hand. "
              switch (weapon) {
                case WeaponClasses.unarmed:
                  i += "She quickly tries to wrap you with the rope, but you collapse to the ground, sliding out of her grasp. She follows you to the ground, as you sweep your legs underneath hers, although her fall was a lot less graceful than yours. The man catcher thrusts at you again, although this time, you manage to slip by the attacks and drive your elbow into his stomach. "
                  break
                case WeaponClasses.sword:
                  i += "As she approaches, you withdraw your blade and slash at her. You graze her across her forearm, and she backs away. The man catcher begins thrusting at you again, before you finally manage to get close enough to wound him with a stab in the stomach. "
                  break
                case WeaponClasses.axe:
                  i += "With one swing of your axe, you cut the rope in half, and she doesn't wait more than three seconds before fleeing. The man catcher resumes grasping at your neck, but you manage to drive your axe into the shaft, rendering the man catcher useless. Panicking, he swings the remainder of the shaft at you, but is dropped to the floor once your axe chops into the side of his neck. "
                  break
              }
              i += "##With the coast clear, you notice a cage being drawn by a horse that's filled with members of the caravan. You open the cage, and everybody who is still conscious helps the others back to the caravan. ##These weren't bounty hunters - they were slavers. Deep down, you know that if you had lost, you'd be tied up in some den for whores. "
            } else if (success === 2) {
              i += "The man catcher quickly grasps your neck before you're capable of reacting. You're unable to struggle without a steel spike thrusting against your throat, so you continue to stand still with your head lifted, as the woman walks up behind you, pulls your hands behind your back, and ties them together. ##You're slowly lead to a cage that is so large, it is being drawn by horse. Inside, you see some of the members of the caravan. ##You're brought before the door, and as it opens, your capturer reaches around your body and firmly grasps your breasts, pressing an erection against your rear. You moan as he roughly handles your chest. Just as quickly as it started, he releases you, and crudely pushes you into the cage. You sit down against the side of the cage as a canvas is drawn over the top, obscuring everything going on. ##Moments later, you hear a commotion outside. It doesn't last long, and the only thing you can actually make out is a woman screaming. The canvas is pulled back as the door swings open. It takes a second for your eyes to get used to the light again, but you see a ranger standing in front of the door, bow in hand. Everyone in the cage is being released. ##Stepping out of the cage, you see what caused the commition - the man who put you into the cage was laying on the ground on top of the woman who tied you up, both half-naked and having sex. They're both dead, with an arrow in each of them. ##As everyone recovers from the ordeal, the caravan prepares to continue it's journey. "
            }
          }
          break
        case "On The Road - Goblin Raiders":
          // TODO: handle the case of you being a goblin yourself i guess
          i = "The caravan is quickly set upon by a goblin raiding party. You're well aware of this, as your wagon is the first to be approached. Everyone inside hurries out to protect the caravan. Before you have time to even stand up, seven goblins have climbed into your wagon. They're feral looking creatures, unlike their civilized counterparts. "
          if (success === 3) {
            i += "##The green tide quickly overwhelms you, invading your body with their hands while stripping you of your clothing. You're brought down to your knees before the goblins as the goblin hands continue to assault your body. You're unsure of what to feel, as some goblins fondle and caress your body, whereas others punch, kick, bite, pinch and pull at you. ##One of the goblins climb underneath you, lining his cock up with your pussy. He lifts into your body, while the other goblins press your hips down against him. A few seconds later, another green cock is being pressed against your rear, while another prods against your lips. They both press in together, all thrusting in unison. The goblins grunt and thrust, before quickly unleashing their cum inside your body. Your mouth is filled with the disgusting substance while you feel throbbing in your two holes. ##It doesn't even take a few seconds before new shafts are being thrust into your body. Your body continues to take three goblins, this time stroking the seventh goblin as he scratches at your chest. He's the first to cum, spraying against your chest and running down your hand, followed by the goblin in your mouth, throbbing in your mouth while pulling your hair. The last two goblins dump their loads into your body, before releasing their grips on you. You don't even realize the goblins are gone when you come to your senses. A man with a spear enters the wagon and throws a dirty rag to you. He tells you it's a damn shame, claiming that you 'used to be a good looking one.' ##The caravan starts moving before you even finished getting dressed."
            self.vag_in = 2
            self.oral_in = 2
            self.anal_in = 2
            self.rough = 1
            self.hygiene = -24 - roll_d6(0, "Hygiene")
          } else {
            i += "##Before they have a chance to overtake you, you place your foot across the face of the closest goblin. He immediately falls backwards, and another takes his place. "
            if (success === 1) {
              i += "He's not much of a quick learner, as you quickly place him horizontal with the same maneuver. "
              switch (weapon) {
                case WeaponClasses.unarmed:
                  i += "##With the remaining goblins approaching you, you find yourself striking almost wildly, as their assault seems to never end. Being so small, it doesn't take much to defeat one of the goblins, with one even being thrown over your shoulder and out of the wagon. "
                  break
                case WeaponClasses.sword:
                  i += "##You withdraw your blade, and the remaining goblins slowly approach you. The bravest goblin is immediately dispatched with a thrust into his chest. The rest of the goblins seem to be rethinking their approach, before finally, another one gets the bright idea to charge at you. This time, your blade cuts across his neck, spraying blood across the rest of the goblins. "
                  break
                case WeaponClasses.axe:
                  i += "##As the bravest goblin charges, you withdraw your axe and cleave the foolish creature from his head down to his neck. This display of might sends the rest of the goblins into a panic, reconsidering whether or not you're the easy victim they expected. Goblins begin fleeing from the wagon, with only a brave pair remaining to stare you down. "
                  break
              }
              i += "##Before anything else happens, a man holding a spear approaches the wagon, scaring the rest of the goblins off. The little creatures didn't seem so willing to die today. ##With almost everybody unscathed from the raid, the caravan promptly begins traveling once more. "
            } else if (success === 2) {
              i += "They prove too much to handle, jumping onto your body and pinning you to the floor. ##You flail your legs, kicking a few of them away from you, but you're unable to clear enough to escape. Your body is quickly covered in their hands, reaching into your clothes and feeling all of your most sensitive parts. Finally, they've subdued you enough to start removing your clothes. ##You lay there on the floor of the wagon, covered in bruises and bite marks while trying to kick away the goblin that's climbing between your legs. He presses his cock against your hole before suddenly jumping away. ##A spear reaches into the wagon, puncturing one of the goblins. The rest of the goblins panic and begin to flee the wagon. If you hadn't delayed them as long as you did, you'd probably be full of goblin seed right now. ##Before you manage to get completely dressed, the man with the spear gives you a forceful, open-hand slap on the ass, copping a squeeze. You squeal from surprise, but you remain silent as you finish getting dressed. ##The raid is over, and the caravan continues it's trek. "
            }
          }
          break
          break
        case "On The Road - Gnoll War Party":
          i = "Suddenly, the wagon stops moving. Someone in front of the wagon shouts something unintelligible, and everybody piles out of the wagon, weapons in hand. ##A few seconds pass before you see a pair of gnolls approach the back of the wagon. The largest gnoll leaps up into the wagon with you, while the smaller one seems to be offering moral support. "
          if (success === 3) {
            i += "The gnoll lunges at you, and you're quickly overpowered before being throw to the floor. Your clothes are pulled from your body as you're pulled from the side of the caravan and onto the ground. ##Each gnoll holding a leg, they quickly begin dragging your naked body through the grass and away from the caravan. You kick and scream the whole way, before they finally stop behind some shrubbery. ##The largest gnoll reveals a rather large erection before roughly pushing your legs back over your head and against the ground. Almost immediately, you feel his cock pressing inside your exposed pussy. He wastes no time smashing his hips against you, assaulting and stretching your body. You yell and scream, but you're unable to push him off, or even move your legs. He finally stops his assault, as you feel your body being filled with his warmth. ##He pulls out, your body in pain from the penetration. The other gnoll immediately takes his place, holding your legs and thrusting into you. He thrusts wildly into your body as you remain silent. He doesn't hurt as much as the other one. He cums deep inside of your body, before pulling out and fleeing with the other gnoll. ##You lay in the grass, cum pouring out of your body. A few minutes after the assault, someone from the caravan finds your body and carries you back to the wagon."
            self.vag_in = 2
            self.rough = 1
            self.hygiene = -8 - roll_d6(0, "Hygiene")
          } else {
            i += "##The gnoll lunges at you, but you're quickly able to land a blow firmly against it's nose. The gnoll stumbles back, confused and infuriated. "
            if (success === 1) {
              i += "Before he has a chance to react, you "
              switch (weapon) {
                case WeaponClasses.unarmed: i += "strike him in the face yet again, "; break
                case WeaponClasses.sword: i += "pierce his chest with your sword, "; break
                case WeaponClasses.axe: i += "plant your axe into his skull, "; break
              }
              i += "before kicking his body out of the wagon. The other gnoll doesn't wait for his friend to hit the ground before retreating. ##A few seconds later, someone comes back to check on you. All of the gnolls have been defeated, and you're back on the road before long."
            } else if (success === 2) {
              i += "##The gnoll leaps out of the wagon and reaches for you. He firmly grasps your ankle and pulls you to the edge of the wagon. The other gnoll quickly reaches out and pulls at your clothes. Before he finishes getting your underwear off, you manage to kick the gnoll holding you in place across the face. You pull away from the other gnoll, pulling your legs through your half-removed clothes in order to escape. ##The gnolls angrily growl at you for a moment before retreating. It looks like you managed to distract them long enough for some of the guards to come back and help you. ##The wagon gets a good show, watching you search the nearby grass for your clothes, bare-assed."
            }
          }
          break
      }
  }
  return i
}