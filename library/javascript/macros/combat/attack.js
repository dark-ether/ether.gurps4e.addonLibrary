const jp = require("jsonpath");
const _ = require("lodash");
const basic = require("../../basic.js");

function attack(attackertid,defendertid,injury,bodyPart="torso",specialEffects={}){
    let argsObject = {
        "attacker":attackertid,
        "defender":defendertid,
        "injury":injury,
        "hitlocation":bodyPart,
        "modifications":specialEffects
    }

    basic.callOnOwner(defendertid,"callDefense@lib:ether.gurps4e",JSON.stringify(argsObject));

}



MTScript.registerMacro("attack",attack);
