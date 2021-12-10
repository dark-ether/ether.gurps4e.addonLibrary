const basic = require('../../basic.js');
const jp = require("jsonpath");
const _ = require("lodash");
/*
{body object syntas
name:
composition:array of objects which follow bodypart syntax
randomhit: array of name of bodypart
}
{body part synstax
name:
modifier:negative Number,
multipliers:{ object with key number pairs and maybe one property named all,
    }
optional allow: array of permitted damagetypes object with {name: ,type:}
}

 *///lacks damagte reduction
function createBodyPart(bodyPartName,bodyPartModifier,bodyPartMultipliers,extraInfo=false){
    let bodyPart = {
        "name":bodyPartName,
        "modifier":bodyPartModifier,
        "multipliers":bodyPartMultipliers,
    };

    if(extraInfo){
        bodyPart.info = extraInfo;
    }
    return bodyPart;
}

function createBodyPlan(nameOfBodyPlan,arrayOfBodyParts,randomHitList) {
    let bodyPlan = {
        "name":nameOfBodyPlan,
        "composition":arrayOfBodyParts,
        "random":ramdomHitList
    };
     let bodyPlans = JSON.parse(basic.getLibProperty("bodyPlanArray"));
     bodyPlans.push(bodyPlan);
     basic.setLibProperty("bodyPlanArray",JSON.stringify(bodyPlans));
}

createBodyPlan("humanoid",[
    createBodyPart("eye",-9,{all:4,toxic:1},{missHitTorso:1,allow:["impaling",/\w* piercing/,"tight-beam burning"],"majorWoundthreshold":1/10}),
    createBodyPart("skull",-7,{all:4,toxic:1},{dr:2,missHitTorso:1,alternateCriticalTable:true,knockdown:-10}),
    createBodyPart("face",-5,{corrosion:1,5},{alternateCriticalTable:true,knockdown:-5,majorWound:"blind eye"}),
    createBodyPart("right leg",-2,{"large piercing":1,"huge piercing":1,impaling:1},{majorWound:"cripple leg",damageLimit:true,"majorWoundthreshold":1/2}),
    createBodyPart("right arm",-2,{"large piercing":1,"huge piercing":1,impaling:1},{majorWound:"cripple arm",damageLimit:true,"majorWoundthreshold":1/2}),
    createBodyPart("torso",0,{}),
    createBodyPart("groin",-3,{},{missHitTorso:1,knockdown:{characterGender:"male",value:-5}, extraShock:{characterGender:"male",damageType:"crushing"}}),
    createBodyPart("left arm",-2,{"large piercing":1,"huge piercing":1,impaling:1},{majorWound:"cripple arm",damageLimit:true"majorWoundthreshold":1/2}),
    createBodyPart("left leg",-2,{"large piercing":1,"huge piercing":1,impaling:1},{majorWound:"cripple leg",damageLimit:true,"majorWoundthreshold":1/2}),
    createBodyPart("hand",-4,{},{majorWound:"cripple hand",damageLimit:true,multipleLimb:["right","left"],"majorWoundthreshold":1/3}),
    createBodyPart("foot",-4,{},{majorWound:"cripple foot",damageLimit:true,multipleLimb:["right","left"],"majorWoundthreshold":1/3}),
    createBodyPart("neck",-5,{corrosion:1,5,cutting:2,crushing:2},{missHitTorso:1}),
    createBodyPart("vitals",-3,{impaling:3,piercing:3,"tight-beam burning":2},{missHitTorso:1,allow:["tight-beam burning","impaling","piercing"]})

],[{name:"eye",space:0},{name:"skull",space:2},{name:"face",space:1},
{name:"right leg",space:2},{name:"right arm",space:1},{name:"torso",space:2},
{name:"groin",space:1},{name:"left arm",space:1},{name:"left leg",space:2},
{name:"hand",space:1},{name:"foot",space:1},{name:"neck",space:2},{name:"vitals",space:0}]);


createBodyPlan("Winged Humanoid",[
    createBodyPart("eye",-9,{all:4,toxic:1},{missHitTorso:1,allow:["impaling",/\w* piercing/,"tight-beam burning"],"majorWoundthreshold":1/10}),
    createBodyPart("skull",-7,{all:4,toxic:1},{dr:2,missHitTorso:1,alternateCriticalTable:true,knockdown:-10}),
    createBodyPart("face",-5,{corrosion:1,5},{alternateCriticalTable:true,knockdown:-5,majorWound:"blind eye"}),
    createBodyPart("right leg",-2,{"large piercing":1,"huge piercing":1,impaling:1},{majorWound:"cripple leg",damageLimit:true,"majorWoundthreshold":1/2}),
    createBodyPart("right arm",-2,{"large piercing":1,"huge piercing":1,impaling:1},{majorWound:"cripple arm",damageLimit:true,"majorWoundthreshold":1/2}),
    createBodyPart("wing",-2,{"large piercing":1,"huge piercing":1,impaling:1},{majorWound:"cripple leg",damageLimit:true,multipleLimb:["right","left"],"majorWoundthreshold":1/2,}),
    createBodyPart("torso",0,{}),
    createBodyPart("groin",-3,{},{missHitTorso:1,knockdown:{characterGender:"male",value:-5}, extraShock:{characterGender:"male",damageType:"crushing"}),
    createBodyPart("left arm",-2,{"large piercing":1,"huge piercing":1,impaling:1},{majorWound:"cripple arm",damageLimit:true"majorWoundthreshold":1/2}),
    createBodyPart("left leg",-2,{"large piercing":1,"huge piercing":1,impaling:1},{majorWound:"cripple leg",damageLimit:true,"majorWoundthreshold":1/2}),
    createBodyPart("hand",-4,{},{majorWound:"cripple hand",damageLimit:true,multipleLimb:["right","left"],"majorWoundthreshold":1/3}),
    createBodyPart("foot",-4,{},{majorWound:"cripple foot",damageLimit:true,multipleLimb:["right","left"],"majorWoundthreshold":1/3}),
    createBodyPart("neck",-5,{corrosion:1,5,cutting:2,crushing:2},{missHitTorso:1}),
    createBodyPart("vitals",-3,{impaling:3,piercing:3,"tight-beam burning":2},{missHitTorso:1,allow:["tight-beam burning","impaling","piercing"]}),

],[{name:"eye",space:0},{name:"skull",space:2},{name:"face",space:1},
{name:"right leg",space:2},{name:"right arm",space:1},{name:"wing",space:1},
{name:"torso",space:1},{name:"groin",space:1},{name:"left arm",space:1},
{name:"left leg",space:2},{name:"hand",space:1},{name:"foot",space:1},
{name:"neck",space:2},{name:"vitals",space:0}])


createBodyPlan("Fish-Tailed Humanoid",[
    createBodyPart("eye",-9,{all:4,toxic:1},{missHitTorso:1,allow:["impaling",/\w* piercing/,"tight-beam burning"],"majorWoundthreshold":1/10}),
    createBodyPart("skull",-7,{all:4,toxic:1},{dr:2,missHitTorso:1,alternateCriticalTable:true,knockdown:-10}),
    createBodyPart("face",-5,{corrosion:1,5},{alternateCriticalTable:true,knockdown:-5,majorWound:"blind eye"}),
    createBodyPart("right arm",-2,{"large piercing":1,"huge piercing":1,impaling:1},{majorWound:"cripple arm",damageLimit:true,"majorWoundthreshold":1/2}),
    createBodyPart("torso",0,{}),
    createBodyPart("groin",-3,{},{missHitTorso:1,knockdown:{characterGender:"male",value:-5}, extraShock:{characterGender:"male",damageType:"crushing"}),
    createBodyPart("left arm",-2,{"large piercing":1,"huge piercing":1,impaling:1},{majorWound:"cripple arm",damageLimit:true"majorWoundthreshold":1/2}),
    createBodyPart("hand",-4,{},{majorWound:"cripple hand",damageLimit:true,multipleLimb:["right","left"],"majorWoundthreshold":1/3}),
    createBodyPart("tail",-3,{"large piercing":1,"huge piercing":1,impaling:1},{majorWound:"cripple tail",damageLimit:true,"majorWoundthreshold":1/2}),
    createBodyPart("neck",-5,{corrosion:1,5,cutting:2,crushing:2},{missHitTorso:1}),
    createBodyPart("vitals",-3,{impaling:3,piercing:3,"tight-beam burning":2},{missHitTorso:1,allow:["tight-beam burning","impaling","piercing"]}),

],[{name:"eye",space:0},{name:"skull",space:2},{name:"face",space:1},
{name:"right arm",space:1},{name:"torso",space:6},{name:"groin",space:1},
{name:"left arm",space:1},{name:"hand",space:1},{name:"tail",space:1},
{name:"neck",space:2},{name:"vitals",space:0}])


createBodyPlan("centaur",[
    createBodyPart("eye",-9,{all:4,toxic:1},{missHitTorso:1,allow:["impaling",/\w* piercing/,"tight-beam burning"],"majorWoundthreshold":1/10}),
    createBodyPart("skull",-7,{all:4,toxic:1},{dr:2,missHitTorso:1,alternateCriticalTable:true,knockdown:-10}),
    createBodyPart("neck",-5,{corrosion:1,5,cutting:2,crushing:2},{missHitTorso:1}),
    createBodyPart("face",-5,{corrosion:1,5},{alternateCriticalTable:true,knockdown:-5,majorWound:"blind eye"}),
    createBodyPart("foreleg",-2,{"large piercing":1,"huge piercing":1,impaling:1},{majorWound:"cripple foreleg",damageLimit:true,multipleLimb:["right","left"],"majorWoundthreshold":1/2}),
    createBodyPart("torso",0,{}),
    createBodyPart("groin",-3,{},{missHitTorso:1,knockdown:{characterGender:"male",value:-5}, extraShock:{characterGender:"male",damageType:"crushing"}),
    createBodyPart("hind leg",-2,{"large piercing":1,"huge piercing":1,impaling:1},{majorWound:"cripple hind leg",damageLimit:true,multipleLimb:["right","left"],"majorWoundthreshold":1/2}),
    createBodyPart("arm",-2,{"large piercing":1,"huge piercing":1,impaling:1},{majorWound:"cripple arm",damageLimit:true,multipleLimb:["right","left"],"majorWoundthreshold":1/2}),
    createBodyPart("extremity",-4,{},{majorWound:"cripple extremity",damageLimit:true,multipleLimb:["right hand","left hand","right forefoot","left forefoot","right hind foot","left hind foot"],"majorWoundthreshold":1/3}),
    createBodyPart("vitals",-3,{impaling:3,piercing:3,"tight-beam burning":2},{missHitTorso:1,allow:["tight-beam burning","impaling","piercing"]}),

],[{name:"eye",space:0},{name:"skull",space:2},{name:"neck",space:1},
{name:"face",space:1},{name:"foreleg",space:2},{name:"torso",space:3},
{name:"groin",space:1},{name:"hind leng",space:2},{name:"arm",space:2},
{name:"extremity",space:2},{name:"vitals",space:0}])

createBodyPlan("quadruped",[
    createBodyPart("eye",-9,{all:4,toxic:1},{missHitTorso:1,allow:["impaling",/\w* piercing/,"tight-beam burning"],"majorWoundthreshold":1/10}),
    createBodyPart("skull",-7,{all:4,toxic:1},{dr:2,missHitTorso:1,alternateCriticalTable:true,knockdown:-10}),
    createBodyPart("face",-5,{corrosion:1,5},{alternateCriticalTable:true,knockdown:-5,majorWound:"blind eye"}),
    createBodyPart("neck",-5,{corrosion:1,5,cutting:2,crushing:2},{missHitTorso:1}),
    createBodyPart("foreleg",-2,{"large piercing":1,"huge piercing":1,impaling:1},{majorWound:"cripple foreleg",damageLimit:true,multipleLimb:["right","left"],"majorWoundthreshold":1/2}),
    createBodyPart("torso",0,{}),
    createBodyPart("groin",-3,{},{missHitTorso:1,knockdown:{characterGender:"male",value:-5}, extraShock:{characterGender:"male",damageType:"crushing"}),
    createBodyPart("hind leg",-2,{"large piercing":1,"huge piercing":1,impaling:1},{majorWound:"cripple hind leg",damageLimit:true,multipleLimb:["right","left"],"majorWoundthreshold":1/2}),
    createBodyPart("foot",-4,{},{majorWound:"cripple foot",damageLimit:true,multipleLimb:{"right forefoot","left forefoot","right hind foot","left hind foot"],"majorWoundthreshold":1/3}),
    createBodyPart("tail",-3,{"large piercing":1,"huge piercing":1,impaling:1},{majorWound:"cripple tail",damageLimit:true,"majorWoundthreshold":1/2}),
    createBodyPart("vitals",-3,{impaling:3,piercing:3,"tight-beam burning":2},{missHitTorso:1,allow:["tight-beam burning","impaling","piercing"]}),


],[{name:"eye",space:0},{name:"skull",space:2},{"name:face",space:1},
{name:"neck",space:1},{name:"foreleg",space:2},{name:"torso",space:3},
{name:"groin",space:1},{name:"hind leg",space:2},{name:"foot",space:2},
{name:"tail",space:2},{name:"vitals",space:0}])

createBodyPlan("winged  quadruped",[
    createBodyPart("eye",-9,{all:4,toxic:1},{missHitTorso:1,allow:["impaling",/\w* piercing/,"tight-beam burning"],"majorWoundthreshold":1/10}),
    createBodyPart("skull",-7,{all:4,toxic:1},{dr:2,missHitTorso:1,alternateCriticalTable:true,knockdown:-10}),
    createBodyPart("face",-5,{corrosion:1,5},{alternateCriticalTable:true,knockdown:-5,majorWound:"blind eye"}),
    createBodyPart("neck",-5,{corrosion:1,5,cutting:2,crushing:2},{missHitTorso:1}),
    createBodyPart("foreleg",-2,{"large piercing":1,"huge piercing":1,impaling:1},{majorWound:"cripple foreleg",damageLimit:true,multipleLimb:["right","left"],"majorWoundthreshold":1/2}),
    createBodyPart("torso",0,{}),
    createBodyPart("wing",-2,{"large piercing":1,"huge piercing":1,impaling:1},{majorWound:"cripple leg",damageLimit:true,multipleLimb:["right","left"],"majorWoundthreshold":1/2,}),
    createBodyPart("hind leg",-2,{"large piercing":1,"huge piercing":1,impaling:1},{majorWound:"cripple hind leg",damageLimit:true,multipleLimb:["right","left"],"majorWoundthreshold":1/2}),
    createBodyPart("foot",-4,{},{majorWound:"cripple foot",damageLimit:true,multipleLimb:{"right forefoot","left forefoot","right hind foot","left hind foot"],"majorWoundthreshold":1/3}),
    createBodyPart("tail",-3,{"large piercing":1,"huge piercing":1,impaling:1},{majorWound:"cripple tail",damageLimit:true,"majorWoundthreshold":1/2}),
    createBodyPart("vitals",-3,{impaling:3,piercing:3,"tight-beam burning":2},{missHitTorso:1,allow:["tight-beam burning","impaling","piercing"]}),

],[{name:"eye",space:0},{name:"skull",space:2},{name:"face",space:1},
{name:"neck",space:1},{name:"foreleg",space:2},{name:"torso",space:3},
{name:"wing",space:1},{name:"hind leg",space:2},{name:"foot",space:2},
{name:"tail",space:2},{name:"vitals",space:0}])

createBodyPlan("hexapod",[
    createBodyPart("eye",-9,{all:4,toxic:1},{missHitTorso:1,allow:["impaling",/\w* piercing/,"tight-beam burning"],"majorWoundthreshold":1/10}),
    createBodyPart("skull",-7,{all:4,toxic:1},{dr:2,missHitTorso:1,alternateCriticalTable:true,knockdown:-10}),
    createBodyPart("face",-5,{corrosion:1,5},{alternateCriticalTable:true,knockdown:-5,majorWound:"blind eye"}),
    createBodyPart("neck",-5,{corrosion:1,5,cutting:2,crushing:2},{missHitTorso:1}),
    createBodyPart("foreleg",-2,{"large piercing":1,"huge piercing":1,impaling:1},{majorWound:"cripple foreleg",damageLimit:true,multipleLimb:["right","left"],"majorWoundthreshold":1/2}),
    createBodyPart("torso",0,{}),
    createBodyPart("mid leg",-2,{"large piercing":1,"huge piercing":1,impaling:1},{majorWound:"cripple mid leg",damageLimit:true,"majorWoundthreshold":1/2}),
    createBodyPart("groin",-3,{},{missHitTorso:1,knockdown:{characterGender:"male",value:-5}, extraShock:{characterGender:"male",damageType:"crushing"}),
    createBodyPart("hind leg",-2,{"large piercing":1,"huge piercing":1,impaling:1},{majorWound:"cripple hind leg",damageLimit:true,multipleLimb:["right","left"],"majorWoundthreshold":1/2}),
    createBodyPart("foot",-4,{},{majorWound:"cripple foot",damageLimit:true,multipleLimb:{"right forefoot","left forefoot","right mid foot","letf mid foot","right hind foot","left hind foot"],"majorWoundthreshold":1/3}),
    createBodyPart("mid leg",-2,{"large piercing":1,"huge piercing":1,impaling:1},{majorWound:"cripple mid leg",damageLimit:true,"majorWoundthreshold":1/2}),
    createBodyPart("vitals",-3,{impaling:3,piercing:3,"tight-beam burning":2},{missHitTorso:1,allow:["tight-beam burning","impaling","piercing"]}),

],[{name:"eye",space:0},{name:"skull",space:2},{name:"neck",space:1},
{name:"face",space:1},{name:"foreleg",space:2},{name:"torso",space:2},
{name:"mid leg",space:1},{name:"groin",space:1},{name:"hind leg",space:2},
{name:"foot",space:2},{name:"mid leg",space:2},{name:"vitals",space:0}])

createBodyPlan("winged hexapod",[
    createBodyPart("eye",-9,{all:4,toxic:1},{missHitTorso:1,allow:["impaling",/\w* piercing/,"tight-beam burning"],"majorWoundthreshold":1/10}),
    createBodyPart("skull",-7,{all:4,toxic:1},{dr:2,missHitTorso:1,alternateCriticalTable:true,knockdown:-10}),
    createBodyPart("face",-5,{corrosion:1,5},{alternateCriticalTable:true,knockdown:-5,majorWound:"blind eye"}),
    createBodyPart("neck",-5,{corrosion:1,5,cutting:2,crushing:2},{missHitTorso:1}),
    createBodyPart("foreleg",-2,{"large piercing":1,"huge piercing":1,impaling:1},{majorWound:"cripple foreleg",damageLimit:true,multipleLimb:["right","left"],"majorWoundthreshold":1/2}),
    createBodyPart("torso",0,{}),
    createBodyPart("mid leg",-2,{"large piercing":1,"huge piercing":1,impaling:1},{majorWound:"cripple mid leg",damageLimit:true,"majorWoundthreshold":1/2}),
    createBodyPart("wing",-2,{"large piercing":1,"huge piercing":1,impaling:1},{majorWound:"cripple leg",damageLimit:true,multipleLimb:["right","left"],"majorWoundthreshold":1/2,}),
    createBodyPart("hind leg",-2,{"large piercing":1,"huge piercing":1,impaling:1},{majorWound:"cripple hind leg",damageLimit:true,multipleLimb:["right","left"],"majorWoundthreshold":1/2}),
    createBodyPart("mid leg",-2,{"large piercing":1,"huge piercing":1,impaling:1},{majorWound:"cripple mid leg",damageLimit:true,"majorWoundthreshold":1/2}),
    createBodyPart("foot",-4,{},{majorWound:"cripple foot",damageLimit:true,multipleLimb:{"right forefoot","left forefoot","right mid foot","letf mid foot","right hind foot","left hind foot"],"majorWoundthreshold":1/3}),
    createBodyPart("vitals",-3,{impaling:3,piercing:3,"tight-beam burning":2},{missHitTorso:1,allow:["tight-beam burning","impaling","piercing"]}),

],[{name:"eye",space:0},{name:"skull",space:2},{name:"neck",space:1},
{name:"face",space:1},{name:"foreleg",space:2},{name:"torso",space:2},
{name:"mid leg",space:1},{name:"wing",space:1},{name:"hind leg",space:2},
{name:"mid leg",space:2},{name:"foot",space:2},{name:"vitals",space:0}])

createBodyPlan("avian"[
    createBodyPart("eye",-9,{all:4,toxic:1},{missHitTorso:1,allow:["impaling",/\w* piercing/,"tight-beam burning"],"majorWoundthreshold":1/10}),
    createBodyPart("skull",-7,{all:4,toxic:1},{dr:2,missHitTorso:1,alternateCriticalTable:true,knockdown:-10}),
    createBodyPart("face",-5,{corrosion:1,5},{alternateCriticalTable:true,knockdown:-5,majorWound:"blind eye"}),
    createBodyPart("neck",-5,{corrosion:1,5,cutting:2,crushing:2},{missHitTorso:1}),
    createBodyPart("wing",-2,{"large piercing":1,"huge piercing":1,impaling:1},{majorWound:"cripple leg",damageLimit:true,multipleLimb:["right","left"],"majorWoundthreshold":1/2,}),
    createBodyPart("torso",0,{}),
    createBodyPart("groin",-3,{},{missHitTorso:1,knockdown:{characterGender:"male",value:-5}, extraShock:{characterGender:"male",damageType:"crushing"}),
    createBodyPart("leg",-2,{"large piercing":1,"huge piercing":1,impaling:1},{majorWound:"cripple leg",damageLimit:true,multipleLimb:["right","left"],"majorWoundthreshold":1/2}),
    createBodyPart("foot",-4,{},{majorWound:"cripple foot",damageLimit:true,multipleLimb:["right","left"],"majorWoundthreshold":1/3}),
    createBodyPart("tail",-3,{"large piercing":1,"huge piercing":1,impaling:1},{majorWound:"cripple tail",damageLimit:true,"majorWoundthreshold":1/2}),
    createBodyPart("vitals",-3,{impaling:3,piercing:3,"tight-beam burning":2},{missHitTorso:1,allow:["tight-beam burning","impaling","piercing"]}),

],[{name:"eye",space:0},{name:"skull",space:2},{"name:face",space:1},
{name:"neck",space:1},{name:"wing",space:2},{name:"torso",space:3},
{name:"groin",space:1},{name:"leg",space:2},{name:"foot",space:2},
{name:"tail",space:2},{name:"vitals",space:0}])

createBodyPlan
