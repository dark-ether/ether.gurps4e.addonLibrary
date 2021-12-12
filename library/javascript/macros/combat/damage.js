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

function dealDamage(defendertid,injury,bodyPart="torso",extra={}){
    let defender = MapTool.tokens.getTokenByID(defendertid);
    let statToDamage = "HP";
    
    if("statToDamage" in extra){
        statToDamage = extra.statToDamage;
    }
    let statValue = Number(defender.getProperty("ether.gurps4e."+statToDamage));
    let initialStatValue = Number(defender.getProperty("ether.gurps4e.c"+statToDamage));
    let changedStatValue = initialStatValue - injury;
    let currentTarget = bodyPart;
    defender.setProperty("ether.gurps4e.c"+statToDamage); 
    
    if(statToDamage = "FP"){
        currentTarget = "torso";
    }
    let deathRoll = function (tid,currentHP){
        let rollResults = basic.checkStat(tid,"");
        if(rollResults[1] == "failure"){
            basic.
        }
    };
    if(statToDamage = "HP"){
        if((initialStatValue > -1 *statValue ) && (changedStatValue < -1 * statValue)){
            
        }
        if((initialStatValue > -2 *statValue ) && (changedStatValue < -2 * statValue)){
            
        }
        if((initialStatValue > -3 *statValue ) && (changedStatValue < -3 * statValue)){
            
        }
        if((initialStatValue > -4 *statValue ) && (changedStatValue < -4 * statValue)){
            
        }
            
    }
}

