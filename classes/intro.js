// GML
// classes and enums
/* globals room, obj_stats, Rooms, Fonts, GameOvers, Victories, Subvictories */

class Intro extends GMLObject {
  create() {
    super.create()
    const self = this
    self.x -= 10
    self.spacing = 13
    let victory = 0, sub_victory = 0
    switch (room) {
      case Rooms.rm_intro_1:
        self.text = "SLAM. You're immediately woken up by a loud crash from downstairs. Perhaps someone fell? Whatever it was, it's none of your business, and you lay back down to go to sleep. ##That's when you hear the screaming, followed by lots of banging and crashing. There's definitely something wrong! You slip on your house shoes and quickly put on the closest piece of clothing you can find - a simple navy dress with matching skirt. ##Hurrying through the hallway, you begin to make out the commotion - it sounds like a battle is going on downstairs! When you reach the stairwell, you look down and see a figure dressed all in black, holding a bloody blade. You can't see his face, but you can easily tell he has elf ears. After a brief pause, he begins charging up the stairs toward you, and you dash back to your bedroom. ##You manage to close and lock the door before he reaches you, but it won't protect for you long, as he begins ramming your door. You panic, unsure of what to do. The only thing that comes to mind is to escape through your window, but it's too high to jump. Searching underneath the window for something to climb down on, your door finally gives away, and the murderer rushes into your sanctuary. Surprised, you tumble backwards and through your window, falling to the ground below. ##If it weren't for the hedges surrounding your house, you'd not be alive. Your body falls through the hedges and rolls down a hill, leaving both you and your clothing scratched up. You pause to try to compose yourself, but upon remembering that you're fleeing for your life, you sprint wildly into the nearby woods. Stumbling through the dark, you crash into a few trees and bushes on your way, before finally running out of breath. Battered, exhausted, and confused, you sit down underneath a large tree, and quickly drift off to sleep."
        break
      case Rooms.rm_intro_2:
        self.text = "When morning arrives, it all feels like a dream. Did any of that happen? It had to have! Why else would you wake up in the woods? In any case, you weren't found in the middle of the night. ##You make your way through the woods, hoping to find help at the village nearby. When you arrive, you make your way towards the local guard barracks, hoping they'd be able to help you, but as you near the building, you recognize your own face. It's on a scroll, hanging from a bounty board. Horrified, you take to the road leading out of town, unsure of what to do. ##After hours of walking, you hear horses coming from behind you, and quickly hide in the foliage beside the road. The sound gets closer, and you're finally able to make out what appears to be a merchant's wagon. You yell out, asking for a ride to the next town. The elderly man driving the wagon invites you to sit next to him, and you graciously accept. ##During your travels, the man tells you he is traveling to the neighboring Kingdom of Olyvia. He claims that everything not in the wagon has been seized by the Republic, and the rest of his family has already began the journey over a month ago. He talks about how Olyvia is accepting refugees from the conflicts across our territory, the Republic of Vesta, and is liberating slaves from the Kingdom of Armegia, to our north. ##He's interrupted by a crossbow, as a bolt strikes him in the chest. You stand up and look to the sides, and see a grizzly-looking pair of bandits. Fearing for your life, you jump down and immediately begin sprinting along the road. WHOOSH! A bolt flies over your shoulder, and you push your body forward as fast as you can. You don't stop running until you reach the next town."
        break
      case Rooms.rm_intro_3:
        self.text = "Totally exhausted, you wander around the town for a while. There are no wanted posters with your face on them here, and nobody seems to recognize you. ##As it's getting late, you search for the closest inn you can find. You don't have much money, but the cheapest rooms are just a few coins for a whole month. It's not luxurious, but it's enough to have some alone time. ##What are you going to do for money? You can always do the odd job here and there, carrying boxes or cleaning floors. Is that going to be enough? Maybe you could sell your body for the extra money. ##You think about it for a little bit, wondering if it's even worth it. Thoughts race around your mind, but before you know it, you're drifting off to sleep. ##Tomorrow is another day."
        break
      case Rooms.rm_gameover:
        switch (obj_stats.gameover) {
          case GameOvers.captured:
            self.text = "You don't quite understand how things got this bad, but they did. ##Your head is shoved against a dirty tree stump by a masked man standing behind you, roughly handling your battered, naked body. A man standing near you is shouting to a large crowd. He's explaining that you and your entire family had commit treason of the highest order, and that you have been sentenced to death. ##The crowd roars in excitement, as the executioner drops his axe."
            break
          case GameOvers.raped:
            self.text = "Laying on the ground, gasping for air, you can't help but wonder: is this really how it ends? Were you really destined to die laying on the floor, bruised, bloodied, and covered in cum? Is this your punishment for being a whore? ##It's hard to make coherent thoughts anymore, as you slowly drift off."
            break
          default:
            "If you're seeing this message, something in your game broke the gameover text. Please report it to me!"
            break
        }
        obj_stats.instances.forEach(self => {
          instance_destroy.call(self)
        })
        instance_create(0, 0, obj_stats)
        break
      default:
        if (obj_stats.virgin) {
          victory = Victories.virgin
        } else if (!obj_stats.virgin && !obj_stats.pregnant) {
          victory = Victories.defiled
          sub_victory = 1
          if (obj_stats.body > obj_stats.mind && obj_stats.body > obj_stats.charm) {
            sub_victory = 2
          } else if (obj_stats.mind > obj_stats.body && obj_stats.mind > obj_stats.charm) {
            sub_victory = 3
          } else if (obj_stats.charm > obj_stats.body && obj_stats.charm > obj_stats.mind) {
            sub_victory = 4
          }
        } else if (!obj_stats.virgin && obj_stats.pregnant) {
          victory = Victories.pregnant
          sub_victory = 1
          if (obj_stats.vaginal + obj_stats.anal + obj_stats.oral >= 20) {
            sub_victory = 2 // oof ;_;
          }
        }
        console.log(room, Rooms.rm_victory_1, Rooms.rm_victory_2, Rooms.rm_victory_3)
        switch (room) {
          case Rooms.rm_victory_1:
            self.text = "You've done it. You've escaped capture long enough to reach the border. After paying off a trader who promises he can get you into Olyvia as a refugee, you're given a thick woolen cloak, and you immediately put it on. You expect to load into the back of a wagon and ride across the border, but you're surprised to see that your chariot of victory is an old fruit cart drawn by a single horse. You take a seat in the cart alongside another cloaked person and the driver. ##The road is eerily quiet. There are no passing caravans, nor anyone to the side of the road. In fact, it's a rather long ride. It takes over a day until you finally encounter someone else. It's a border guard dressed in a thick, linked metal armor. He comes out of the small stone tower and questions the driver. They speak quietly away from the cart, so you're unsure of what they're even saying. ##After a few minutes, the driver returns to the cart and asks you to stay here with the guards. A chill runs down your spine as you consider the possibility that he might have just cashed in on your bounty. Stiff and silent, you follow the guard inside the small building. "
            break
          case Rooms.rm_victory_2:
            switch (victory) {
              case Victories.virgin:
                self.text = "A handsome man wearing the same armor greets you kindly, and asks for your name. You stutter while trying to give your name, partially because of fear, partially because of how handsome the man is. While his armor looks the same, he has a tabard over his armor, with white and blue stripes cutting across. He has short, golden hair, and blue eyes infinitely more colorful than the landscape. He smiles at you and tells you that you have nothing to fear. His name is Alexander, and he explains everything going on. ##Up ahead, soldiers, adventurers, and hunters from both countries collect everybody who tries to cross the border. This man tells you that he'll be able to bring you to a safe house, where you'll be given a room, food, and anything else you'll need to get started on a new life in Olyvia. ##He leads you to a carriage just large enough for two people. After climbing in, the carriage begins to move up the road. Yet again, of course, as this isn't your first time on the road. This is, however, the first time you've ridden next to a driver since escaping your manor. It's hard to feel safe after remembering what happened last time, but you have to trust Alexander. ##You start to understand what he was talking about, as the two of you drive through multiple military checkpoints. None of them even bother to stop your carriage, perhaps because of the soldier in the drivers seat. ##Over the horizon, you spot the back of a man carrying a set of scrolls with a man catcher in his hand. That's definitely a bounty hunter! Panicking, you turn and hide your robed face against Alexander's tabard. It's surprisingly silky, and it feels good against your skin. As the carriage approaches, you hear the bounty hunter hail Alexander. He asks if he's seen anyone on the road who matches the scrolls in his hands, and offers coin for any valuable information. "
                break
              case Victories.defiled:
                self.text = "A handsome man wearing the same armor greets you kindly, and asks for your name. While his armor looks the same, he has a tabard over his armor, with white and blue stripes cutting across. He smiles at you and tells you that you have nothing to fear. His name is Alexander, and he explains everything going on. ##Up ahead, soldiers, adventurers, and hunters from both countries collect everybody who tries to cross the border. This man tells you that he'll be able to bring you to a safe house, where you'll be given a room, food, and anything else you'll need to get started on a new life in Olyvia. ##He leads you to a carriage just large enough for two people. After climbing in, the carriage begins to move up the road. Yet again, of course, as this isn't your first time on the road. This is, however, the first time you've ridden next to a driver since escaping your manor. It's hard to feel safe after remembering what happened last time, but you have to trust Alexander. ##You start to understand what he was talking about, as the two of you drive through multiple military checkpoints. None of them even bother to stop your carriage, perhaps because of the soldier in the drivers seat. ##Over the horizon, you spot the back of a man carrying a set of scrolls with a man catcher in his hand. That's definitely a bounty hunter! Panicking, you lower your head almost down to your knees, obscuring your face in the thick cloak you're wearing. As the carriage approaches, you hear the bounty hunter hail Alexander. He asks if he's seen anyone on the road who matches the scrolls in his hands, and offers coin for any valuable information. "
                break
              case Victories.pregnant:
                self.text = "A man wearing the same armor greets you kindly, and asks for your name. He smiles at you and tells you that you have nothing to fear. His name is Alexander, and he explains everything going on. ##Up ahead, soldiers, adventurers, and hunters from both countries collect everybody who tries to cross the border. This man tells you that he'll be able to bring you to a safe house, where you'll be given a room, food, and anything else you'll need to get started on a new life in Olyvia. ##He leads you to a carriage just large enough for two people. After climbing in, the carriage begins to move up the road. Yet again, of course, as this isn't your first time on the road. This is, however, the first time you've ridden next to a driver since escaping your manor. It's hard to feel safe after remembering what happened last time, but you have to trust Alexander. ##You start to understand what he was talking about, as the two of you drive through multiple military checkpoints. None of them even bother to stop your carriage, perhaps because of the soldier in the drivers seat. ##Over the horizon, you spot the back of a man carrying a set of scrolls with a man catcher in his hand. That's definitely a bounty hunter! Panicking, you lower your head almost down to your knees, obscuring your face in the thick cloak you're wearing. As the carriage approaches, you hear the bounty hunter hail Alexander. He asks if he's seen anyone on the road who matches the scrolls in his hands, and offers coin for any valuable information. "
                break
            }
            break
          case Rooms.rm_victory_3:
            self.spacing = 12
            switch (victory) {
              case Victories.virgin:
                self.text = "Alexander declines them, one after another, before growing silent. He asks the hunter what crimes this one was charged with. You hold your breath, pretending to be elsewhere. You know they're talking about you. The hunter says that this lady is charged with treason, and the slaughter of her immediate family. ##In the most reassuring voice you've ever heard, Alexander states that the woman in question was killed while trying to sneak into the country. The bounty hunter sighs, and you peak up at Alexander's face. He looks completely confident. ##Out of nowhere, the hunter asks who you are, sitting in the carriage. You feel a hand rest against the back of your head before Alexander snaps at him for daring to speak like that. The hunter apologizes to the prince, and the carriage departs, leaving him behind. ##Wait. Did he say... prince? ##The carriage doesn't have to travel far before you spot a large, walled city over the horizon. Alexander admits to you that he's one of five of the king's children here in Olyvia. He tells you that he has two brothers and two sisters, all princes and princesses. Responding to him opening up to you, you do the same, telling him of your origins, what happened to your family, and talking about your travels. ##Once inside the city, the carriage pulls up to a very tall building. He asks if the ride was good enough for such a beautiful lady, and your face turns bright pink. You're unable to stand up, afraid of what might happen next, before he reaches out and touches your hand. ##'I might have something more suitable for someone like yourself. Would you like to go for a ride with me?' ##These might be the only words you remember from the whole ordeal, and probably the best you've heard in your entire life. You happily accept, and the carriage starts moving again. This time, it's destination is the large manor in the center of the town."
                break
              case Victories.defiled:
                self.text = "Alexander declines them, one after another, before growing silent. He asks the hunter what crimes this one was charged with. You hold your breath, pretending to be elsewhere. You know they're talking about you. The hunter says that this lady is charged with treason, and the slaughter of her immediate family. ##In the most reassuring voice you've ever heard, Alexander declines having any information. The bounty hunter sighs, as your driver wishes the hunter best of luck, and continues along the road. ##The carriage doesn't have to travel far before you spot a large, walled city over the horizon. Along the way, you thank him for not handing you over to the hunter, and you tell him about your ordeals trying to get here. ##Once inside the city, the carriage pulls up to a very tall building. He announces your arrival to an older man sitting next to the door, and you exchange goodbyes before hopping out of the carriage. The man leads you inside, offering you a hot meal before showing you to your temporary home. You talk for a bit about the future, and he promises to hook you up with a job in the city suited to you. "
                switch (sub_victory) {
                  case Subvictories[Victories.defiled].kitchen_worker:
                    self.text += "##Days later, you're making cuisine for a catering business that tends to the needs of nobles and wealthy merchants. You've learned a lot of new recipes, most of them being extravagant, or at least more expensive than your average meal. ##Being able to practice without having to flee the city constantly really makes it easier to become better at your new trade. It's not a rich life, nor is it adventurous or exciting, but it's your life. ##It's your life, and there is no bounty on it."
                    break
                  case Subvictories[Victories.defiled].drill_sergeant:
                    self.text += "##Days later, you're wearing an extravagant tabard, and yelling at recruits who are falling behind. You're a drill sergeant now, whipping recruits into shape, and weeding out the pansies who can't make it. Your fitness puts you a step ahead of everyone, as you lead squads through exercises and obstacle courses. ##It's not the most glamorous of jobs, but it's reliable. Soldiers will always be in high demand, and you're more than capable of squeezing the best out of them. Although, one thought continuously springs up in the back of your mind. ##How many of these soldiers are going to go on to become bounty hunters?"
                    break
                  case Subvictories[Victories.defiled].accountant:
                    self.text += "##Days later, you're surrounded by stacks of books in an office that's larger than you could reasonably ask for. You're an accountant here. You handle all sorts of taxes, trade agreements, and budgets. And the funny thing is, you're really good at it. ##It's a quieter life than you imagined having. The only times you're interrupted are when someone needs to transport books in and out of your office. Your subordinates do most of the transportation, so you don't even have to deal with whatever goes on outside. ##But most of all, you're glad you don't have to deal with bounty hunters anymore."
                    break
                  case Subvictories[Victories.defiled].dancer:
                    self.text += "##Days later, you're on a stage, surrounded by crowds of people, applauding and cheering. Being a professional dancer has it's perks. You're not exposed to back-alley brothels, nor do you hand out 'special dances' to men who want nothing more than to fill you up. It's a relaxing atmosphere inside a classy hall, where expensive cuisine is served. Rarely is your body even exposed. ##Sure, it might be a simple life, especially after everything you've experienced. But at least you have the occasional song and performance to break up the monotony. The pay is nice enough to make it on your own, and you're always buying the best of clothing and makeups you can find. ##After all, fleeing for your life wasn't the sort of excitement you were looking for."
                    break
                }
                break
              case Victories.pregnant:
                self.text = "The carriage doesn't have to travel far before you spot a large, walled city over the horizon. Along the way, he asks you about your previous life. You talk about what you can, trying not to expose too much about yourself. You're caught off guard when he asks if you'll be followed by the father of your son.##What? Have you been too busy to notice? Feeling around inside your robe, you realize that you're starting to develop a small bump. ##You only did what you had to do in order to survive. You never wanted to be passed around like some cheap whore. And now, you're pregnant. The horrifying thing is, you have no idea who could have fathered it. You've taken the seed of so many people over your travels. ##Overtaken with all of these new thoughts, you ignore his question. The rest of the ride is a quiet one. ##Once inside the city, the carriage pulls up to a very tall building. He announces your arrival to an older man sitting next to the door, and you exchange goodbyes before hopping out of the carriage. The man leads you inside, offering you a hot meal before showing you to your temporary home. You talk for a bit about the future. You promise to head out and find a job over the next few days."
                switch (sub_victory) {
                  case Subvictories[Victories.pregnant].normal:
                    self.text += "##It's been weeks since you've gotten to this city. Life hasn't been easy for you here. You haven't even decided what to do with the child you're bearing. Most of the work you do is maid work, cleaning floors, washing dishes, and taking care of homes. ##As much as you hate to admit it, most of your repeat clients hire you because of your willingness to please. Every other day, you find yourself serving another cock. It's sometimes demeaning, but it's never dangerous. Not like things used to be. ##Nothing could be as dangerous as what you've done."
                    break
                  case Subvictories[Victories.pregnant].miscarried:
                    self.text += "##You don't even know how long you've been in this city. Every day is a struggle to survive. You've long since miscarried, probably due to the way you live. Being in Olyvia, you've turned to the thing you know best. ##Maybe it's just how life was meant to be. It's not so bad, having strangers cum in you in various alleyways, and sucking cocks through holes. You even enjoy it most of the time. You're a gutter slut, willing to let a man cum in you for just a few coins. ##And you wouldn't have it any other way."
                    break
                }
                break
            }
        }
        break
    }
  }
  
  // begin draw stuff
  // draw
  /* globals draw_set_ext, draw_set_color, draw_set_transformed, draw_set_font, draw_set_halign, draw_set_valign, draw_sprite, Colors */
  // draw text
  /* globals draw_text, draw_text_ext, draw_text_color, draw_text_transformed, draw_text_ext_color, draw_text_ext_transformed, draw_text_transformed_color, draw_text_ext_transformed_color, draw_highscore */
  // align
  /* globals VAligns, HAligns */
  draw() {
    const self = this
    draw_set_font(Fonts.f_console)
    draw_set_halign(HAligns.fa_left)
    draw_set_valign(VAligns.fa_top)
    draw_set_color(Colors.c_white)
    draw_text_ext(self.x, self.y, self.text, self.spacing, 620)
  }
}

window.classes.push(Intro)
window.obj_intro = __gml_proto_proxy(Intro.prototype)
