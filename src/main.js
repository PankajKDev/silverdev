import { scaleFactor } from "./constants";
import { k } from "./kaboomCtx";

k.loadSprite("spritesheet","/spritesheet.png",{
    sliceX:39,
    sliceY:31,
    anims:{
        "idle-down":936,
        "walk-down":{from:936,to:939,loop:true,speed:8},
        "idle-side":975,
        "walk-side":{from:975,to:978,loop:true,speed:8},
        "idle-up":1014,
        "walk-up":{from:1014,to:1017,loop:true,speed:8},
    }
})
k.loadSprite("map","/map.png")
k.setBackground(k.Color.fromHex("#1f1b5f"))

k.scene("main",async()=>{
    const mapData=await(await fetch("/map.json")).json( )
    const layers=mapData.layers

//creating game object
const map=k.make([
    //key used from loadSprite
    k.sprite("map"),
    k.pos(0),
    k.scale(scaleFactor)

]);
const player=k.make([
    k.sprite("spritesheet",{anim:"idle-down"}),
    k.area({
    shape:new k.Rect(k.vec2(0,3),10,10)
    }),
    k.body()//makes player tangible to other objects
    , k.anchor("center"),
    k.pos(),
    k.scale(scaleFactor),{
        speed:250,
        direction:"down",
        isInDialogue:false
    },
    "player"
]);

for(const layer of layers){
    if(layer.name==="boundaries"){
        for (const boundary of layer.objects){
            map.add([
              k.area({
                shape: new k.Rect(k.vec2(0),boundary.width,boundary.height),
        }),
              k.body({isStatic:true}),
              k.pos(boundary.x,boundary.y),
              boundary.name,
            ])
        }
    }
}


})


k.go("main")