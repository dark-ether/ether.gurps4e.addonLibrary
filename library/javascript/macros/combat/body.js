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
        "multipliers":_.cloneDeep(bodyPartMultipliers)
    };

    if(extraInfo){
        bodyPart.info = extraInfo;
    }
    return bodyPart;
}

function createBodyPlan(nameOfBodyPlan,arrayOfBodyParts,randomHitList) {
    let bodyPlan = {
        "name":nameOfBodyPlan,
        "composition":_.cloneDeep(arrayOfBodyParts),
        "random":_.cloneDeep(randomHitList)
    };
     let bodyPlans = JSON.parse(basic.getLibProperty("bodyPlanArray"));
     bodyPlans.push(bodyPlan);
     basic.setLibProperty("bodyPlanArray",JSON.stringify(bodyPlans));
}
let eyeObject = createBodyPart("eye",
    -9,
    {all:4,
    toxic:1
},{
    missHitTorso:1,
    allow:["impaling",/\w* piercing/,"tight-beam burning"],
    "majorWoundthreshold":1/10})

let skullObject = createBodyPart("skull",
    -7,
    {all:4,
    toxic:1
},{
    dr:2,
    missHitTorso:1,
    alternateCriticalTable:true,
    knockdown:-10})

let faceObject = createBodyPart("face",
    -5,
    {corrosion:1.5
},{
    alternateCriticalTable:true,
    knockdown:-5,
    majorWound:"blind eye"})

let rightLegObject = createBodyPart("right leg",
    -2,
    {"large piercing":1,
    "huge piercing":1,
    impaling:1
},{
    majorWound:"cripple leg",
    damageLimit:true,
    "majorWoundthreshold":1/2})

let rightArmObject = createBodyPart("right arm",
    -2,
    {"large piercing":1,
    "huge piercing":1,
    impaling:1
},{
    majorWound:"cripple arm",
    damageLimit:true,
    "majorWoundthreshold":1/2})

let torsoObject = createBodyPart("torso",
    0,
    {})

let groinObject = createBodyPart("groin",
    -3,
    {},
    {missHitTorso:1,
    knockdown:{characterGender:"male",
    value:-5},
    extraShock:{characterGender:"male",
    damageType:"crushing"}})

let leftArmObject = createBodyPart("left arm",
    -2,
    {"large piercing":1,
    "huge piercing":1,
    impaling:1
},{
    majorWound:"cripple arm",
    damageLimit:true,
    "majorWoundthreshold":1/2})

let armObject = createBodyPart("arm",
    -2,
    {"large piercing":1,
    "huge piercing":1,
    impaling:1
},{
    majorWound:"cripple arm",
    damageLimit:true,
    multipleLimb:["right","left"],
    "majorWoundthreshold":1/2})

let leftLegObject = createBodyPart("left leg",
    -2,
    {"large piercing":1,
    "huge piercing":1,
    impaling:1
},{
    majorWound:"cripple leg",
    damageLimit:true,
    "majorWoundthreshold":1/2})

let handObject = createBodyPart("hand",
    -4,
    {},
    {majorWound:"cripple hand",
    damageLimit:true,
    multipleLimb:["right","left"],
    "majorWoundthreshold":1/3})

let neckObject = createBodyPart("neck",
    -5,
    {corrosion:1.5,
    cutting:2,
    crushing:2
},{
    missHitTorso:1})

let vitalsObject = createBodyPart(
    "vitals",
    -3,
    {impaling:3,
    piercing:3,
    "tight-beam burning":2
},{
    missHitTorso:1,
    allow:["tight-beam burning",
    "impaling",
    "piercing"]})

let wingObject = createBodyPart("wing",
    -2,
    {"large piercing":1,
    "huge piercing":1,
    impaling:1
},{
    majorWound:"cripple leg",
    damageLimit:true,
    multipleLimb:["right","left"],
    "majorWoundthreshold":1/2,})

let tailObject = createBodyPart("tail",
    -3,
    {"large piercing":1,
    "huge piercing":1,
    impaling:1
},{
    majorWound:"cripple tail",
    damageLimit:true,
    "majorWoundthreshold":1/2})

let forelegObject = createBodyPart("foreleg",
    -2,
    {"large piercing":1,
    "huge piercing":1,
    impaling:1
},{
    majorWound:"cripple foreleg",
    damageLimit:true,
    multipleLimb:["right","left"],
    "majorWoundthreshold":1/2})

let hindLegObject = createBodyPart("hind leg",
    -2,
    {"large piercing":1,
    "huge piercing":1,
    impaling:1
},{
    majorWound:"cripple hind leg",
   damageLimit:true,multipleLimb:["right","left"],
   "majorWoundthreshold":1/2})

let midLegObject = createBodyPart("mid leg",
    -2,
    {"large piercing":1,
    "huge piercing":1,
    impaling:1
},{
    majorWound:"cripple mid leg",
    damageLimit:true,
    "majorWoundthreshold":1/2})

let brainObject = createBodyPart("brain",
    -7,
    {all:4,
    toxic:1
},{
    dr:1,
    missHitTorso:1,
    alternateCriticalTable:true,
    knockdown:-10})

let finObject = createBodyPart("fin",-4,{},
   {majorWound:"cripple foot",
   damageLimit:true,
   "majorWoundthreshold":1/3}),

createBodyPlan("humanoid",[
    _.cloneDeep(eyeObject),
    _.cloneDeep(skullObject),
    _.cloneDeep(faceObject),
    _.cloneDeep(rightLegObject),
    _.cloneDeep(rightArmObject),
    _.cloneDeep(torsoObject),
    _.cloneDeep(groinObject),
    _.cloneDeep(leftArmObject),
    _.cloneDeep(leftLegObject),
    _.cloneDeep(handObject),
    createBodyPart("foot",-4,{},
       {majorWound:"cripple foot",
       damageLimit:true,
       multipleLimb:["right","left"],
       "majorWoundthreshold":1/3}),
    _.cloneDeep(neckObject),
    _.cloneDeep(vitalsObject)

],[{name:"eye",space:0},
{name:"skull",space:2},
{name:"face",space:1},
{name:"right leg",space:2},
{name:"right arm",space:1},
{name:"torso",space:2},
{name:"groin",space:1},
{name:"left arm",space:1},
{name:"left leg",space:2},
{name:"hand",space:1},
{name:"foot",space:1},
{name:"neck",space:2},
{name:"vitals",space:0}]);

createBodyPlan("winged humanoid",[
    _.cloneDeep(eyeObject),
    _.cloneDeep(skullObject),
    _.cloneDeep(faceObject),
    _.cloneDeep(rightLegObject),
    _.cloneDeep(rightArmObject),
    _.cloneDeep(wingObject),
    _.cloneDeep(torsoObject),
    _.cloneDeep(groinObject),
    _.cloneDeep(leftArmObject),
    _.cloneDeep(leftLegObject),
    _.cloneDeep(handObject),
    createBodyPart("foot",-4,{
    },{
        majorWound:"cripple foot",
        damageLimit:true,
        multipleLimb:["right","left"],
        "majorWoundthreshold":1/3}),
    _.cloneDeep(neckObject),
    _.cloneDeep(vitalsObject)

],[{name:"eye",space:0},
{name:"skull",space:2},
{name:"face",space:1},
{name:"right leg",space:2},
{name:"right arm",space:1},
{name:"wing",space:1},
{name:"torso",space:1},
{name:"groin",space:1},
{name:"left arm",space:1},
{name:"left leg",space:2},
{name:"hand",space:1},
{name:"foot",space:1},
{name:"neck",space:2},
{name:"vitals",space:0}])

createBodyPlan("fish-tailed humanoid",[
    _.cloneDeep(eyeObject),
    _.cloneDeep(skullObject),
    _.cloneDeep(faceObject),
    _.cloneDeep(neckObject),
    _.cloneDeep(rightArmObject),
    _.cloneDeep(torsoObject),
    _.cloneDeep(leftArmObject),
    _.cloneDeep(handObject),
    _.cloneDeep(tailObject),
    _.cloneDeep(vitalsObject),

],[{name:"eye",space:0},
{name:"skull",space:2},
{name:"face",space:1},
{name:"neck",space:1},
{name:"right arm",space:2},
{name:"torso",space:4},
{name:"left arm",space:2},
{name:"hand",space:2},
{name:"tail",space:2},
{name:"vitals",space:0}])

createBodyPlan("snake-men",[
    _.cloneDeep(eyeObject),
    _.cloneDeep(skullObject),
    _.cloneDeep(faceObject)
    _.cloneDeep(neckObject),
    _.cloneDeep(rightArmObject),
    _.cloneDeep(torsoObject),
    _.cloneDeep(leftArmObject),
    _.cloneDeep(handObject),
    _.cloneDeep(vitalsObject)

],[{name:"eye",space:0},
{name:"skull",space:2},
{name:"face",space:1},
{name:"neck",space:1},
{name:"right arm",space:2},
{name:"torso",space:6},
{name:"left arm",space:2},
{name:"hand",space:2},
{name:"vitals",space:0}])

createBodyPlan("centaur",[
    _.cloneDeep(eyeObject),
    _.cloneDeep(skullObject),
    _.cloneDeep(neckObject),
    _.cloneDeep(faceObject),
    _.cloneDeep(forelegObject),
    _.cloneDeep(torsoObject),
    _.cloneDeep(groinObject),
    _.cloneDeep(hindLegObject),
    _.cloneDeep(armObject),
    createBodyPart("extremity",
    -4,
    {},{
    majorWound:"cripple extremity",
    damageLimit:true,
    multipleLimb:["right hand",
    "left hand",
    "right forefoot",
    "left forefoot",
    "right hind foot",
    "left hind foot"],
    "majorWoundthreshold":1/3}),
    _.cloneDeep(vitalsObject)

],[{name:"eye",space:0},
{name:"skull",space:2},
{name:"neck",space:1},
{name:"face",space:1},
{name:"foreleg",space:2},
{name:"torso",space:3},
{name:"groin",space:1},
{name:"hind leng",space:2},
{name:"arm",space:2},
{name:"extremity",space:2},
{name:"vitals",space:0}])

createBodyPlan("quadruped",[
    _.cloneDeep(eyeObject)
    _.cloneDeep(skullObject),
    _.cloneDeep(faceObject),
    _.cloneDeep(neckObject),
    _.cloneDeep(forelegObject),
    _.cloneDeep(torsoObject),
    _.cloneDeep(groinObject),
    _.cloneDeep(hindLegObject),
    createBodyPart("foot",
    -4,
    {},
    {majorWound:"cripple foot",
    damageLimit:true,
     multipleLimb:["right forefoot",
     "left forefoot",
     "right hind foot",
     "left hind foot"],
     "majorWoundthreshold":1/3}),
    _.cloneDeep(tailObject),
    _.cloneDeep(vitalsObject)


],[{name:"eye",space:0},
{name:"skull",space:2},
{name:"face",space:1},
{name:"neck",space:1},
{name:"foreleg",space:2},
{name:"torso",space:3},
{name:"groin",space:1},
{name:"hind leg",space:2},
{name:"foot",space:2},
{name:"tail",space:2},
{name:"vitals",space:0}])

createBodyPlan("winged  quadruped",[
    _.cloneDeep(eyeObject),
    _.cloneDeep(skullObject),
    _.cloneDeep(faceObject),
    _.cloneDeep(neckObject),
    _.cloneDeep(forelegObject),
    _.cloneDeep(torsoObject),
    _.cloneDeep(wingObject),
    _.cloneDeep(hindLegObject),
    createBodyPart("foot",
    -4,
    {},
    {majorWound:"cripple foot",
    damageLimit:true,
    multipleLimb:["right forefoot",
    "left forefoot",
    "right hind foot",
    "left hind foot"],
    "majorWoundthreshold":1/3}),
    _.cloneDeep(tailObject),
    _.cloneDeep(vitals),

],[{name:"eye",space:0},
{name:"skull",space:2},
{name:"face",space:1},
{name:"neck",space:1},
{name:"foreleg",space:2},
{name:"torso",space:3},
{name:"wing",space:1},
{name:"hind leg",space:2},
{name:"foot",space:2},
{name:"tail",space:2},
{name:"vitals",space:0}])

createBodyPlan("hexapod",[
    _.cloneDeep(eyeObject),
    _.cloneDeep(skullObject),
    _.cloneDeep(faceObject),
    _.cloneDeep(neckObject),
    _.cloneDeep(foreleg),
    _.cloneDeep(torsoObject),
    _.cloneDeep(midLegObject),
    _.cloneDeep(groinObject),
    _.cloneDeep(hindLegObject),
    createBodyPart("foot",
        -4,
        {},
        {majorWound:"cripple foot",
        damageLimit:true,
        multipleLimb:["right forefoot",
        "left forefoot","right mid foot",
        "letf mid foot",
        "right hind foot",
        "left hind foot"],
        "majorWoundthreshold":1/3}),
    _.cloneDeep(midLegObject),
    _.cloneDeep(vitals),

],[{name:"eye",space:0},
{name:"skull",space:2},
{name:"neck",space:1},
{name:"face",space:1},
{name:"foreleg",space:2},
{name:"torso",space:2},
{name:"mid leg",space:1},
{name:"groin",space:1},
{name:"hind leg",space:2},
{name:"foot",space:2},
{name:"mid leg",space:2},
{name:"vitals",space:0}])

createBodyPlan("winged hexapod",[
    _.cloneDeep(eyeObject),
    _.cloneDeep(skullObject),
    _.cloneDeep(faceObject),
    _.cloneDeep(neckObject),
    _.cloneDeep(forelegObject),
    _.cloneDeep(torsoObject),
    _.cloneDeep(midLegObject),
    _.cloneDeep(wingObject),
    _.cloneDeep(hindLegObject),
    _.cloneDeep(midLegObject),
    createBodyPart("foot",
        -4,
        {},
        {majorWound:"cripple foot",
        damageLimit:true,
        multipleLimb:["right forefoot",
        "left forefoot",
        "right mid foot",
        "letf mid foot",
        "right hind foot",
        "left hind foot"],
        "majorWoundthreshold":1/3}),
    _.cloneDeep(vitalsObject),

],[{name:"eye",space:0},
{name:"skull",space:2},
{name:"neck",space:1},
{name:"face",space:1},
{name:"foreleg",space:2},
{name:"torso",space:2},
{name:"mid leg",space:1},
{name:"wing",space:1},
{name:"hind leg",space:2},
{name:"mid leg",space:2},
{name:"foot",space:2},
{name:"vitals",space:0}])

createBodyPlan("avian",[
    _.cloneDeep(eyeObject),
    _.cloneDeep(skullObject),
    _.cloneDeep(faceObject),
    _.cloneDeep(neckObject),
    _.cloneDeep(wingObject),
    _.cloneDeep(torsoObject),
    _.cloneDeep(groinObject),
    createBodyPart("leg",
        -2,
        {"large piercing":1,
        "huge piercing":1,
        impaling:1},
        {majorWound:"cripple leg",
        damageLimit:true,
        multipleLimb:["right","left"],
        "majorWoundthreshold":1/2}),
    createBodyPart("foot",
        -4,
        {},
        {majorWound:"cripple foot",
        damageLimit:true,
        multipleLimb:["right","left"],
        "majorWoundthreshold":1/3}),
    _.cloneDeep(tailObject),
    _.cloneDeep(vitalsObject)

],[{name:"eye",space:0},
{name:"skull",space:2},
{name:"face",space:1},
{name:"neck",space:1},
{name:"wing",space:2},
{name:"torso",space:3},
{name:"groin",space:1},
{name:"leg",space:2},
{name:"foot",space:2},
{name:"tail",space:2},
{name:"vitals",space:0}])

createBodyPlan("vermiform",[
    _.cloneDeep(eyeObject),
    _.cloneDeep(skullObject),
    _.cloneDeep(faceObject),
    _.cloneDeep(neckObject),
    _.cloneDeep(torsoObject),
    _.cloneDeep(vitalsObject)

],[{name:"eye",space:0},
{name:"skull",space:2},
{name:"face",space:1},
{name:"neck",space:3},
{name:"torso",space:10},
{name:"vitals",space:0}])

createBodyPlan("winged serpents",[
    _.cloneDeep(eyeObject),
    _.cloneDeep(skullObject),
    _.cloneDeep(faceObject),
    _.cloneDeep(neckObject),
    _.cloneDeep(torsoObject),
    _.cloneDeep(wingObject),
    _.cloneDeep(vitalsObject)

],[{name:"eye",space:0},
{name:"skull",space:2},
{name:"face",space:1},
{name:"neck",space:3},
{name:"torso",space:6},
{name:"wing",space:4}
{name:"vitals",space:0}])

createBodyPlan("octopod",[
    createBodyPart("eye",
        -8,
        {all:4,
        toxic:1
    },{
        missHitTorso:1,
        allow:["impaling",/\w* piercing/,"tight-beam burning"],
        "majorWoundthreshold":1/10}),
    _.cloneDeep(brainObject),
    _.cloneDeep(faceObject),
    _.cloneDeep(neckObject),
    createBodyPart("arm 1-2",
        -2,
        {"large piercing":1,
        "huge piercing":1,
        impaling:1
    },{
        majorWound:"cripple arm",
        damageLimit:true,
        multipleLimb:["1","2"],
        "majorWoundthreshold":1/2}),
    _.cloneDeep(torsoObject),
    createBodyPart("arm 3-4",
        -2,
        {"large piercing":1,
        "huge piercing":1,
        impaling:1
    },{
        majorWound:"cripple arm",
        damageLimit:true,
        multipleLimb:["3","4"],
        "majorWoundthreshold":1/2}),
    createBodyPart("arm 5-6",
        -2,
        {"large piercing":1,
        "huge piercing":1,
        impaling:1
    },{
        majorWound:"cripple arm",
        damageLimit:true,
        multipleLimb:["5","6"],
        "majorWoundthreshold":1/2}),
    createBodyPart("arm 7-8",
        -2,
        {"large piercing":1,
        "huge piercing":1,
        impaling:1
    },{
        majorWound:"cripple arm",
        damageLimit:true,
        multipleLimb:["7","8"],
        "majorWoundthreshold":1/2}),
    _.cloneDeep(vitalsObject)

],[{name:"eye",space:0},
{name:"brain",space:2},
{name:"face",space:1},
{name:"neck",space:1},
{name:"arm 1-2",space:2},
{name:"torso",space:4},
{name:"arm 3-4",space:2},
{name:"arm 5-6",space:2},
{name:"arm 7-8",space:2},
{name:"vitals",space:0}])

createBodyPlan("squid",[
    createBodyPart("eye",
        -8,
        {all:4,
        toxic:1
    },{
        missHitTorso:1,
        allow:["impaling",/\w* piercing/,"tight-beam burning"],
        "majorWoundthreshold":1/10})
    _.cloneDeep(brainObject),
    _.cloneDeep(faceObject),
    _.cloneDeep(neckObject),
    createBodyPart("arm 1-2",
        -3,
        {"large piercing":1,
        "huge piercing":1,
        impaling:1
    },{
        majorWound:"cripple arm",
        damageLimit:true,
        multipleLimb:["1","2"],
        "majorWoundthreshold":1/2}),
    _.cloneDeep(torsoObject),
    createBodyPart("arm 3-4",
        -2,
        {"large piercing":1,
        "huge piercing":1,
        impaling:1
    },{
        majorWound:"cripple arm",
        damageLimit:true,
        multipleLimb:["3","4"],
        "majorWoundthreshold":1/2}),
    createBodyPart("arm 5-6",
        -2,
        {"large piercing":1,
        "huge piercing":1,
        impaling:1
    },{
        majorWound:"cripple arm",
        damageLimit:true,
        multipleLimb:["5","6"],
        "majorWoundthreshold":1/2}),
    _.cloneDeep(vitalsObject)

],[{name:"eye",space:0},
{name:"brain",space:2},
{name:"face",space:1},
{name:"neck",space:1},
{name:"arm 1-2",space:2},
{name:"torso",space:6},
{name:"arm 3-4",space:2},
{name:"arm 5-6",space:2},
{name:"vitals",space:0}])

createBodyPlan("cancroid",[
    _.cloneDeep(eyeObject),
    _.cloneDeep(skullObject),
    _.cloneDeep(faceObject),
    _.cloneDeep(neckObject),
    _.cloneDeep(armObject),
    _.cloneDeep(torsoObject),
    createBodyPart("leg",
        -2,
        {"large piercing":1,
        "huge piercing":1,
        impaling:1},
        {majorWound:"cripple leg",
        damageLimit:true,
        multipleLimb:["right front leg",
        "left front leg",
        "right mid leg"],
        "majorWoundthreshold":1/2}),
    createBodyPart("leg",
        -2,
        {"large piercing":1,
        "huge piercing":1,
        impaling:1},
        {majorWound:"cripple leg",
        damageLimit:true,
        multipleLimb:["left mid leg",
        "right back leg",
        "left back leg"],
        "majorWoundthreshold":1/2}),
    createBodyPart("foot",-4,{},
       {majorWound:"cripple foot",
       damageLimit:true,
       multipleLimb:["right forefoot",
       "left forefoot","right mid foot",
       "letf mid foot",
       "right hind foot",
       "left hind foot"],
       "majorWoundthreshold":1/3})

],[{name:"eye",space:0},
{name:"skull",space:2},
{name:"face",space:1},
{name:"neck",space:1},
{name:"arm",space:2},
{name:"torso",space:4},
{name:"leg",space:4},
{name:"foot",space:2},
{name:"vitals",space:0}])

createBodyPlan("scorpion",[
    _.cloneDeep(eyeObject),
    _.cloneDeep(skullObject),
    _.cloneDeep(faceObject),
    _.cloneDeep(neckObject),
    _.cloneDeep(armObject),
    _.cloneDeep(torsoObject),
    _.cloneDeep(tailObject),
    createBodyPart("leg",
        -2,
        {"large piercing":1,
        "huge piercing":1,
        impaling:1},
        {majorWound:"cripple leg",
        damageLimit:true,
        multipleLimb:["right front leg",
        "left front leg",
        "right mid-front leg",
        "left mid-front leg"],
        "majorWoundthreshold":1/2}),
    createBodyPart("leg",
        -2,
        {"large piercing":1,
        "huge piercing":1,
        impaling:1},
        {majorWound:"cripple leg",
        damageLimit:true,
        multipleLimb:["right mid-back leg",
        "left mid-back leg",
        "right back leg",
        "left back leg"],
        "majorWoundthreshold":1/2}),
    createBodyPart("foot",-4,{},
       {majorWound:"cripple foot",
       damageLimit:true,
       multipleLimb:["right forefoot",
       "left forefoot",
       "right mid-front foot",
       "left mid-front foot",
       "right mid-back foot",
       "left mid-back foot",
       "right hind foot",
       "left hind foot"],
       "majorWoundthreshold":1/3})

],[{name:"eye",space:0},
{name:"skull",space:2},
{name:"face",space:1},
{name:"neck",space:1},
{name:"arm",space:2},
{name:"torso",space:3},
{name:"tail",space:1},
{name:"leg",space:4},
{name:"foot",space:2},
{name:"vitals",space:0}])

createBodyPlan("ichthyoid",[
    createBodyPart("eye",
        -8,
        {all:4,
        toxic:1
    },{
        missHitTorso:1,
        allow:["impaling",/\w* piercing/,"tight-beam burning"],
        "majorWoundthreshold":1/10})
    _.cloneDeep(skullObject),
    _.cloneDeep(faceObject),
    _.cloneDeep(finObject),
    _.cloneDeep(tailObject),
    _.cloneDeep(vitalsObject)

],[{name:"eye",space:0},
{name:"skull",space:2},
{name:"face",space:1},
{name:"fin",space:1},
{name:"torso",space:6},
{name:"fin",space:4},
{name:"tail",space:2},
{name:"vitals",space:0}])

createBodyPlan("arachnoid",[
    _.cloneDeep(eyeObject),
    _.cloneDeep(brainObject),
    _.cloneDeep(neckObject),
    _.cloneDeep(faceObject),
    createBodyPart("leg 1-2"
        -2,
        {"large piercing":1,
        "huge piercing":1,
        impaling:1},
        {majorWound:"cripple leg",
        damageLimit:true,
        multipleLimb:["1","2"],
        "majorWoundthreshold":1/2}),
    _.cloneDeep(torsoObject),
    _.cloneDeep(groinObject),
    createBodyPart("leg 3-4"
        -2,
        {"large piercing":1,
        "huge piercing":1,
        impaling:1},
        {majorWound:"cripple leg",
        damageLimit:true,
        multipleLimb:["3","4"],
        "majorWoundthreshold":1/2}),
    createBodyPart("leg 5-6"
        -2,
        {"large piercing":1,
        "huge piercing":1,
        impaling:1},
        {majorWound:"cripple leg",
        damageLimit:true,
        multipleLimb:["5","6"],
        "majorWoundthreshold":1/2}),
    createBodyPart("leg 7-8"
        -2,
        {"large piercing":1,
        "huge piercing":1,
        impaling:1},
        {majorWound:"cripple leg",
        damageLimit:true,
        multipleLimb:["7","8"],
        "majorWoundthreshold":1/2}),
    _.cloneDeep(vitalsObject)

],[{name:"eye",space:0},
{name:"brain",space:2},
{name:"neck",space:1},
{name:"face",space:1},
{name:"leg 1-2",space:2},
{name:"torso",space:3},
{name:"groin",space:1},
{name:"leg 3-4",space:2},
{name:"leg 5-6",space:2},
{name:"leg 7-8",space:2},
{name:"vitals",space:0}])
