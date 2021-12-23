const basic = require("../../basic.js")
const jp = require("jsonpath");

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
    if(statToDamage == "FP"){
        currentTarget = "torso";
    }

    let deathCheck = function (tid){
        let ht = basic.calculateStat(tid,"HT");
        let results = basic.sucessRoll(ht);
        let defender = MapTool.tokens.getTokenByID(tid);
        let pronoun = defender.getProperty("ether.gurps4e.pronoun");
        let name = defender.getName();
        let haveVerb = (pronoun === "they") ? "have " : "has ";
        if(results[1]  == "failure" || results[1] == "critical failure" ){
            if((results[2] == 1 || results[2] == 2) && !(results[1] == "critcal failure")){
                if(!defender.getProperty("ether.gurps4e.mortalWound")){
                    defender.setProperty("ether.gurps4e.mortalWound",1);
                    if(basic.isPC(tid)){
                        MapTool.chat.broadcast(name + "rolled an "+ results[0] + " this is a failure " + pronoun +" got mortally wounded")

                    }else {
                        MapTool.chat.broadcastToGM(name+ "got mortally wounded: results" + JSON.stringify(results) );
                    }
                } else {
                    if(basic.isPC(tid)){
                        MapTool.chat.broadcast(name + "rolled an "+ results[0] + " this is a failure and as"
                        + pronoun + haveVerb + "A mortal Wound " + pronoun + haveVerb +"DIED"  )
                    }else {
                        MapTool.chat.broadcastToGM(name+ "died: results" + JSON.stringify(results) );
                    }
                    basic.setState(tid,"death")
                }
            } else {
                basic.setState(tid,"death")
                basic.textToChat(tid,results,"death")
            }
        }else {
            basic.textToChat(tid,results,"death")
        }
    }

    if(statToDamage == "HP"){
        if((initialStatValue > -1 *statValue ) && (changedStatValue < -1 * statValue)){
            deathCheck(defendertid);
        }
        if((initialStatValue > -2 *statValue ) && (changedStatValue < -2 * statValue)){
            deathCheck(defendertid);
        }
        if((initialStatValue > -3 *statValue ) && (changedStatValue < -3 * statValue)){
            deathCheck(defendertid);
        }
        if((initialStatValue > -4 *statValue ) && (changedStatValue < -4 * statValue)){
            deathCheck(defendertid);
        }

    }
    if (currentTarget != "torso" && statToDamage == "HP") {
        let defenderBody = JSON.parse(defender.getProperty("ether.gurps4e.body"));
        let tokenBodyPlan = defenderBody.bodyPlan;
        let bodyPlanArray = JSON.parse(basic.getLibProperty("bodyPlanArray"));
        let bodyPlanInfo = jp.value(bodyPlanArray,`$[?(@.name == "${tokenBodyPlan}")]`);
        let bodyPartInfo = jp.value(bodyPlanInfo.composition,`$[?(@.name == "${currentTarget}")]`);
        //TODO: add other effects of injury
    }
}
