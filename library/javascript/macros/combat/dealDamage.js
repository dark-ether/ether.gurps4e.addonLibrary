const basic = require("../../basic.js")

function dealDamage(defendertid,injury,bodyPart="torso",extra={}){
    let defender = MapTool.tokens.getTokenByID(defendertid);
    let statToDamage = "HP";
    
    if("statToDamage" in extra){
        statToDamage = extra.statToDamage;
    }
    let statValue = Number(defender.getProperty("ether.gurps4e."+statToDamage));
    let initialStatValue = Number(defender.getProperty("ether.gurps4e.c"+statToDamage));
    let changedStatValue = initialStatValue - injury;
    let currrentTarget = bodyPart;
    defender.setProperty("ether.gurps4e.c"+statToDamage); 
    if(statToDamage = "FP"){
        currentTarget = "torso";
    }
    
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
