const basic = require("../../basic.js");
const jp = require("jsonpath");
const _ = require("lodash");

function defaultConvertDamageToInjury(damageType){
    switch (damageType) {
        case "small piercing":
            return 0.5;
        case "burning":
        case "corrosion":
        case "fatigue":
        case "piercing":
        case "toxic":
            return 1;
        case "cutting":
        case "large piercing":
            return 1,5;
        case "impaling":
        case "huge piercing":
            return 2;

        default:
        return 0;

    }
}

function convertDamageToInjury(tid,damage,damageType,bodyPart="torso"){
    let token = MapTool.tokens.getTokenByID(tid);
    let tokenBodyInfo = JSON.parse(token.getProperty("ether.gurps4e.bodyInfo"));
    let bodyType = tokenBodyInfo.type;
    let bodyPlanArray = JSON.parse(basic.getLibProperty("bodyPlanArray"));
    let bodyPlan = jp.value(bodyPlanArray,`$[?(@.name == "${bodyType}")]`)
    let multiplier = 0;
    let bodyPartInfo = jp.value(bodyPlan.composition,`$[?(@.name == ${bodyPart})]`);
    if (damageType in bodyPartInfo){
        multiplier = bodyPartInfo.multipliers[damageType];
    } else {
        if("all" in bodyPartInfo.multipliers){
            multiplier = bodyPartInfo.multipliers["all"];
        }
        else{
            multiplier = defaultConvertDamageToInjury(damageType);
        }
    }
    let injury = multiplier * damage;
    return injury;
}

function calculateRealDamage(defendertid,previousDamage,damageType,bodyPart = "torso"){
    let damage;
    let defender = MapTool.tokens.getTokenByID(defendertid);
    let dr = basic.calculateDr(defender,bodyPart);
    let divisor = Number(basic.getTraitEffectiveLevel("damage reduction",{"damageType":damageType})) + 1;
    if(!isNaN(divisor)){
        damage = (previousDamage-dr)/previousDamage;
    }else{
        damage = previousDamage - dr;
    }
    
    return damage;
}


