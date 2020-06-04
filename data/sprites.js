/* globals fill_textures */
const sprites = window.sprites = [
// NOTE: w and h are normally swapped in masks... shitty decompiler
// spr_button. note that colmasks data=true means entire thing is collidable
{"size":{"width":200,"height":40},"bounding":{"top":0,"left":0,"bottom":39,"right":199},"bboxmode":0,"sepmasks":false,"origin":{"x":0,"y":0},"textures":[0,1,2,3,4],"colmasks":[{"w":200,"h":40,"data":(x,y)=>true}]},
// spr_button_data
{"size":{"width":400,"height":40},"bounding":{"top":0,"left":0,"bottom":39,"right":399},"bboxmode":0,"sepmasks":false,"origin":{"x":0,"y":0},"textures":[5],"colmasks":[{"w":400,"h":40,"data":(x,y)=>true}]},
// spr_button_blank
{"size":{"width":100,"height":20},"bounding":{"top":0,"left":0,"bottom":19,"right":99},"bboxmode":0,"sepmasks":false,"origin":{"x":0,"y":0},"textures":[6],"colmasks":[{"w":104,"h":20,"data":(x,y)=>x<100}]},
// spr_button_increase
{"size":{"width":12,"height":12},"bounding":{"top":0,"left":0,"bottom":11,"right":11},"bboxmode":0,"sepmasks":false,"origin":{"x":0,"y":0},"textures":[7,8],"colmasks":[{"w":16,"h":12,"data":(x,y)=>x<12}]},
// spr_button_decrease
{"size":{"width":12,"height":12},"bounding":{"top":0,"left":0,"bottom":11,"right":11},"bboxmode":0,"sepmasks":false,"origin":{"x":0,"y":0},"textures":[9,10],"colmasks":[{"w":16,"h":12,"data":(x,y)=>x<12}]},
// spr_button_item_drop
{"size":{"width":12,"height":12},"bounding":{"top":0,"left":0,"bottom":11,"right":11},"bboxmode":0,"sepmasks":false,"origin":{"x":12,"y":0},"textures":[11,12],"colmasks":[{"w":16,"h":12,"data":(x,y)=>x<12}]},
// spr_button_item_use
{"size":{"width":20,"height":12},"bounding":{"top":0,"left":0,"bottom":11,"right":19},"bboxmode":0,"sepmasks":false,"origin":{"x":20,"y":0},"textures":[13,14],"colmasks":[{"w":24,"h":12,"data":(x,y)=>x<20}]},
// spr_button_small
{"size":{"width":100,"height":40},"bounding":{"top":0,"left":0,"bottom":39,"right":99},"bboxmode":0,"sepmasks":false,"origin":{"x":0,"y":0},"textures":[15,16,17],"colmasks":[{"w":104,"h":40,"data":(x,y)=>x<100}]},
// spr_button_arrow
{"size":{"width":40,"height":40},"bounding":{"top":6,"left":8,"bottom":31,"right":31},"bboxmode":0,"sepmasks":false,"origin":{"x":0,"y":0},"textures":[18,19,20],"colmasks":[{"w":40,"h":40,"data":(x,y)=>x>=8&&x<32&&y>=14&&y<26||x>=10&&x<29&&y>=6&&y<32}]},
// spr_button_round
{"size":{"width":40,"height":40},"bounding":{"top":0,"left":0,"bottom":39,"right":39},"bboxmode":0,"sepmasks":false,"origin":{"x":0,"y":0},"textures":[21,22,23],"colmasks":[{"w":40,"h":40,"data":(x,y)=>true}]},
// spr_scroll_bar_back
{"size":{"width":4,"height":40},"bounding":{"top":0,"left":0,"bottom":39,"right":3},"bboxmode":0,"sepmasks":false,"origin":{"x":2,"y":20},"textures":24,"colmasks":[{"w":8,"h":40,"data":(x,y)=>x<4}]},
// spr_scroll_bar_tip
{"size":{"width":16,"height":16},"bounding":{"top":0,"left":0,"bottom":15,"right":15},"bboxmode":0,"sepmasks":false,"origin":{"x":8,"y":8},"textures":[25,26],"colmasks":[{"w":16,"h":16,"data":(x,y)=>true}]},
// spr_scroll_bar_center
{"size":{"width":16,"height":32},"bounding":{"top":0,"left":0,"bottom":31,"right":15},"bboxmode":0,"sepmasks":false,"origin":{"x":8,"y":16},"textures":27,"colmasks":[{"w":16,"h":32,"data":(x,y)=>true}]},
// spr_star
{"size":{"width":20,"height":20},"bounding":{"top":0,"left":0,"bottom":19,"right":19},"bboxmode":0,"sepmasks":false,"origin":{"x":0,"y":0},"textures":[28,29,30,31],"colmasks":[{"w":16,"h":32,"data":(x,y)=>x<20}]},
// spr_advantage_block
{"size":{"width":20,"height":20},"bounding":{"top":0,"left":0,"bottom":19,"right":19},"bboxmode":0,"sepmasks":false,"origin":{"x":0,"y":0},"textures":32,"colmasks":[{"w":24,"h":20,"data":(x,y)=>x<20}]},
// spr_item_block
{"size":{"width":20,"height":20},"bounding":{"top":0,"left":0,"bottom":19,"right":19},"bboxmode":0,"sepmasks":false,"origin":{"x":0,"y":0},"textures":33,"colmasks":[{"w":24,"h":20,"data":(x,y)=>x<20}]},
// spr_equip_block
{"size":{"width":20,"height":20},"bounding":{"top":0,"left":0,"bottom":19,"right":19},"bboxmode":0,"sepmasks":false,"origin":{"x":0,"y":0},"textures":34,"colmasks":[{"w":24,"h":20,"data":(x,y)=>x<20}]},
// spr_coins
{"size":{"width":10,"height":12},"bounding":{"top":1,"left":0,"bottom":11,"right":9},"bboxmode":0,"sepmasks":false,"origin":{"x":0,"y":-3},"textures":[35,36,37,38],"colmasks":[{"w":16,"h":12,"data":(x,y)=>x<10&&y>=1}]},
// spr_control
{"size":{"width":20,"height":20},"bounding":{"top":0,"left":0,"bottom":19,"right":19},"bboxmode":0,"sepmasks":false,"origin":{"x":0,"y":0},"textures":39,"colmasks":[{"w":24,"h":20,"data":(x,y)=>x<20}]},
// spr_encounter
{"size":{"width":20,"height":20},"bounding":{"top":0,"left":0,"bottom":19,"right":19},"bboxmode":0,"sepmasks":false,"origin":{"x":0,"y":0},"textures":40,"colmasks":[{"w":24,"h":20,"data":(x,y)=>x<20}]},
// spr_bounty
{"size":{"width":20,"height":20},"bounding":{"top":0,"left":0,"bottom":19,"right":19},"bboxmode":0,"sepmasks":false,"origin":{"x":0,"y":0},"textures":41,"colmasks":[{"w":24,"h":20,"data":(x,y)=>x<20}]},
// spr_travel
{"size":{"width":20,"height":20},"bounding":{"top":0,"left":0,"bottom":19,"right":19},"bboxmode":0,"sepmasks":false,"origin":{"x":0,"y":0},"textures":42,"colmasks":[{"w":24,"h":20,"data":(x,y)=>x<20}]},
// spr_location
{"size":{"width":20,"height":20},"bounding":{"top":0,"left":0,"bottom":19,"right":19},"bboxmode":0,"sepmasks":false,"origin":{"x":0,"y":0},"textures":43,"colmasks":[{"w":24,"h":20,"data":(x,y)=>x<20}]},
// spr_reader_block
{"size":{"width":20,"height":20},"bounding":{"top":0,"left":0,"bottom":19,"right":19},"bboxmode":0,"sepmasks":false,"origin":{"x":0,"y":0},"textures":44,"colmasks":[{"w":24,"h":20,"data":(x,y)=>x<20}]},
// spr_main_block
{"size":{"width":20,"height":20},"bounding":{"top":0,"left":0,"bottom":19,"right":19},"bboxmode":0,"sepmasks":false,"origin":{"x":0,"y":0},"textures":45,"colmasks":[{"w":24,"h":20,"data":(x,y)=>x<20}]},
// spr_stat_block
{"size":{"width":200,"height":120},"bounding":{"top":0,"left":0,"bottom":119,"right":199},"bboxmode":0,"sepmasks":false,"origin":{"x":0,"y":0},"textures":46,"colmasks":[{"w":200,"h":120,"data":(x,y)=>true}]},
// spr_towns
{"size":{"width":40,"height":40},"bounding":{"top":0,"left":0,"bottom":39,"right":39},"bboxmode":0,"sepmasks":false,"origin":{"x":0,"y":0},"textures":[47,48,49,50,51,52,53,54,55,56,57,58,59,60],"colmasks":[{"w":40,"h":40,"data":(x,y)=>true}]},
// spr_towns_bonus
{"size":{"width":20,"height":20},"bounding":{"top":0,"left":0,"bottom":19,"right":19},"bboxmode":0,"sepmasks":false,"origin":{"x":0,"y":0},"textures":[61,62,63,64,65,66],"colmasks":[{"w":24,"h":20,"data":(x,y)=>x<20}]},
// spr_stat_icons
{"size":{"width":12,"height":12},"bounding":{"top":1,"left":1,"bottom":11,"right":11},"bboxmode":0,"sepmasks":false,"origin":{"x":0,"y":-3},"textures":[67,68,69],"colmasks":[{"w":16,"h":12,"data":(x,y)=>x>=1&&x<12&&y>=1}]},
// spr_towns_races
{"size":{"width":9,"height":17},"bounding":{"top":0,"left":0,"bottom":16,"right":8},"bboxmode":0,"sepmasks":false,"origin":{"x":-6,"y":-1},"textures":[70,71,72,73],"colmasks":[{"w":16,"h":17,"data":(x,y)=>x<9}]},
// spr_bounty_title
{"size":{"width":343,"height":94},"bounding":{"top":0,"left":0,"bottom":93,"right":342},"bboxmode":0,"sepmasks":false,"origin":{"x":171,"y":47},"textures":74,"colmasks":[{"w":344,"h":94,"data":(x,y)=>x<343}]},
// spr_bar_1
{"size":{"width":640,"height":40},"bounding":{"top":0,"left":0,"bottom":39,"right":639},"bboxmode":0,"sepmasks":false,"origin":{"x":0,"y":0},"textures":[75,76],"colmasks":[{"w":640,"h":40,"data":(x,y)=>true}]},
// spr_bar_2
{"size":{"width":640,"height":40},"bounding":{"top":0,"left":0,"bottom":39,"right":639},"bboxmode":0,"sepmasks":false,"origin":{"x":0,"y":0},"textures":[77,78],"colmasks":[{"w":640,"h":40,"data":(x,y)=>true}]},
// spr_divider
{"size":{"width":200,"height":20},"bounding":{"top":7,"left":1,"bottom":11,"right":197},"bboxmode":0,"sepmasks":false,"origin":{"x":0,"y":0},"textures":[79],"colmasks":[{"w":200,"h":20,"data":(x,y)=>x>=1&&x<198&&y>=7&&y<12}]},
// spr_dice
{"size":{"width":20,"height":20},"bounding":{"top":0,"left":0,"bottom":19,"right":19},"bboxmode":0,"sepmasks":false,"origin":{"x":0,"y":0},"textures":[80,81,82,83,84,85],"colmasks":[{"w":24,"h":20,"data":(x,y)=>x<20}]},
// spr_dice_3
{"size":{"width":20,"height":20},"bounding":{"top":0,"left":0,"bottom":19,"right":19},"bboxmode":0,"sepmasks":false,"origin":{"x":0,"y":0},"textures":[86,87,88,89,90,91],"colmasks":[{"w":24,"h":20,"data":(x,y)=>x<20}]},
// spr_dice_2
{"size":{"width":20,"height":20},"bounding":{"top":0,"left":0,"bottom":19,"right":19},"bboxmode":0,"sepmasks":false,"origin":{"x":0,"y":0},"textures":[92,93,94,95,96,97],"colmasks":[{"w":24,"h":20,"data":(x,y)=>x<20}]},
// spr_dice_4
{"size":{"width":20,"height":20},"bounding":{"top":0,"left":0,"bottom":19,"right":19},"bboxmode":0,"sepmasks":false,"origin":{"x":0,"y":0},"textures":[98,99,100,101,102,103],"colmasks":[{"w":24,"h":20,"data":(x,y)=>x<20}]},
// spr_dice_5
{"size":{"width":20,"height":20},"bounding":{"top":0,"left":0,"bottom":19,"right":19},"bboxmode":0,"sepmasks":false,"origin":{"x":0,"y":0},"textures":[104,105,106,107,108,109],"colmasks":[{"w":24,"h":20,"data":(x,y)=>x<20}]},
// spr_mask_100x13
{"size":{"width":100,"height":13},"bounding":{"top":0,"left":0,"bottom":12,"right":99},"bboxmode":1,"sepmasks":false,"origin":{"x":0,"y":0},"textures":[110,111],"colmasks":[{"w":104,"h":13,"data":(x,y)=>x<100}]},
// spr_timeline_map
{"size":{"width":400,"height":200},"bounding":{"top":0,"left":0,"bottom":199,"right":399},"bboxmode":0,"sepmasks":false,"origin":{"x":0,"y":0},"textures":[112,113,114],"colmasks":[{"w":400,"h":200,"data":(x,y)=>true}]},
// spr_input_bar
{"size":{"width":200,"height":20},"bounding":{"top":0,"left":0,"bottom":19,"right":199},"bboxmode":0,"sepmasks":false,"origin":{"x":0,"y":0},"textures":[118],"colmasks":[{"w":200,"h":20,"data":(x,y)=>true}]},
]