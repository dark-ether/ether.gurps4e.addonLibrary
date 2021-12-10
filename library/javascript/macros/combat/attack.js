const basic = require("../../basic.js");

function attack(attackertid,defendertid,injury,bodyPart="torso",specialEffects={}){
    try{
        let argsObject = {
        "attacker":attackertid,
        "defender":defendertid,
        "injury":injury,
        "hitlocation":bodyPart,
        "modifications":specialEffects
    }

    basic.callOnOwner(defendertid,"callDefense@lib:ether.gurps4e",JSON.stringify(argsObject));
    }
    catch(e){
        MapTool.chat.broadcast(""+e+"<br>"+e.stack);
    }
}



MTScript.registerMacro("attack",attack);
