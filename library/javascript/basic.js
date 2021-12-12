const evaluate = require("safe-evaluate-expression");
const _ = require("lodash");

function getLibProperty(property, libName ="lib:ether.gurps4e"){
    MTScript.setVariable("property",property);
    MTScript.setVariable("libName",libName);
    let result = MTScript.evalMacro(`[r:getLibProperty(property,libName)]`);
    return result;
}

function findToken(name){
    let tokenId = MTScript.execMacro(`[r:findToken(${name})]`);
    return tokenId;
}

function setLibProperty(property, propertyValue, libName="lib:ether.gurps4e"){
    MTScript.setVariable("property",property);
    MTScript.setVariable("propertyValue",propertyValue);
    MTScript.setVariable("libName",libName);
    MTScript.evalMacro(`[r:setLibProperty(property,
    propertyValue,libName)]`);
}

function addMacro(tid,macroName,macroGroup,macroText){
    let props ={
        "autoExecute": 1,
        "command": macroText,
        "label": macroName,
        "group": macroGroup,
        "playerEditable": 0
    };
    MTScript.setVariable("createdFromJsTid",tid);
    MTScript.setVariable("createdFromJsProps",JSON.stringify(props));
    if(checkForMacro(tid,macroName) != 1){
    MTScript.evalMacro("[r:createMacro(createdFromJsProps,createdFromJsTid)]")
    }
}

function checkForMacro(tid,macroName){
    MTScript.setVariable("createdFromJsTid",tid);
    MTScript.setVariable("createdFromJsMacroName",macroName);
    let result = MTScript.evalMacro("[r:hasMacro(createdFromJsMacroName,createdFromJsTid)]");
    return Number(result);
}

function removeMacro(tid,macroName){
    MTScript.setVariable("createdFromJsTid",tid);
    MTScript.setVariable("createdFromJsMacroName",macroName);
    let indexes = JSON.parse(MTScript.evalMacro("[r:getMacroIndexes(createdFromJsMacroName,'json',createdFromJsTid)]"));
    for(let macro of indexes){
        MTScript.setVariable("createdFromJsMacro",macro);
        MTScript.evalMacro("[r:removeMacro(createdFromJsMacro,createdFromJsTid)]");
    }
}

function log(info){
    let existingLog = getLibProperty("log");
    existingLog += "<br>"+info+ new Error().stack;
    setLibProperty("log",existingLog);
}

function getMacroText(source){
    MTScript.setVariable("createdFromJsmacroSource",source);
    return MTScript.evalMacro("[r:data.getStaticData('@this','/mtscript/templates/'+createdFromJsmacroSource+'.mts')]");
}

function roll(number,size){
    MTScript.setVariable("createdFromJavascriptNumber",number);
    MTScript.setVariable("createdFromJavascriptSize",size);
    return Number(MTScript.evalMacro("[r:roll(createdFromJavascriptNumber,createdFromJavascriptSize)]"));

}

function sucessRoll(skill,modifier = 0){
    let vRoll = roll(3,6);
    modifier = (typeof(modifier) === "number")? modifier:0;
    let effectiveSkill = skill + modifier;
    let result = "";
    let margin = 0;

    if((vRoll<= effectiveSkill&&( vRoll != 18)&&( vRoll != 17))||(vRoll == 3 || vRoll == 4)){
        result = "sucess";
        margin =  effectiveSkill - vRoll;
        if(margin >= 10 || vRoll == 3 || vRoll == 4){
            result = "critical " + result;
        }
    } else {
        result = "failure";
        margin = vRoll - effectiveSkill;
        if(margin >= 10 || vRoll == 18 || (vRoll == 17 && effectiveSkill <= 15)){
            result = "critical " + result;
        }
    }
    let array = [vRoll,result,margin];

    return array;
}

function callOnOwner(tid,macroName,args){
    MTScript.setVariable("createdFromJstid",tid);
    MTScript.setVariable("createdFromJsMacroname",macroName);
    MTScript.setVariable("createdFromJsArgs",args);
    let owner = JSON.parse(MTScript.evalMacro("[r:getOwners('json',createdFromJstid)]"))[0];
    MTScript.setVariable("createdFromJsOwner",owner);
    MTScript.evalMacro("[r:broadcast(macroLink('<br>',createdFromJsMacroname,'none',createdFromJsArgs),createdFromJsOwner)]");
}

function canSeeToken(tidAttacker,tidDefender){
    MTScript.setVariable("createdFromJstidAttacker",tidAttacker);
    MTScript.setVariable("createdFromJstidDefender",tidDefender);
    return MTScript.evalMacro("[r:canSeeToken(createdFromJstidAttacker,createdFromJstidDefender)]");
}
//check if reasonsIgnored work when js udf bug is fixed && check into turning skills into stats by using calculateStat
function calculateStat(tid,statName,reasonsIgnored = []){
    try{
        let token = MapTool.tokens.getTokenByID(tid)
        let statAdd = Number(token.getProperty("ether.gurps4e."+statName));
        let temporaryEffectsArray = JSON.parse(token.getProperty("ether.gurps4e.temporary."+statName))
        let statFormula = getLibProperty(statName +" formula");
        let evaluatedTotal = 0;
        let totalFromTemporary = 0;

        if(statAdd == null){
            statAdd = 0;
        }

        if(reasonsIgnored != "all"){
            if(temporaryEffectsArray != null && temporaryEffectsArray.length != 0){
                let validTemporaryEffects = temporaryEffectsArray.filter(effectObject => !reasonsIgnored.includes(effectObject.reason))
                let stackableEffects = validTemporaryEffects.filter(effectObject => effectObject.stackable);
                let valuesFromStacked = stackableEffects.reduce((objectOfValues,current) => {
                    if(current.reason in objectOfValues){
                        objectOfValues[current.reason] += current.value;
                    }
                    else{
                        objectOfValues[current.reason] = current.value;
                    }
                    return objectOfValues;
                },{});

                let nonStackableEffects = validTemporaryEffects.filter(effectObject => !effectObject.stackable);

                let valuesFromNonStacked = nonStackableEffects.reduce((objectOfValues,current)=>{
                    if(current.reason in objectOfValues){
                        if(current.value > objectOfValues[current.reason]){
                            objectOfValues[current.reason] = current.value;
                        }
                    } else{
                        objectOfValues[current.reason] = current.value;
                    }
                    return objectOfValues;
                },{});

                let valuesFromTemporary = _.mergeWith(valuesFromStacked,valuesFromNonStacked,(objValue,srcValue) => {
                    if(objValue > srcValue){
                        return objValue;
                    }
                    else{
                        return srcValue;
                    }
                });

                for(let reason in valuesFromTemporary){
                    totalFromTemporary += valuesFromTemporary[reason];
                }
            }
        }

        let operators = {
            MapTool:MapTool,
            calculateStat:calculateStat,
            getLibProperty:getLibProperty,
            MTScript:MTScript,
            Math:Math
        };

        let data = {
            tid:tid,
            reasonsIgnored:reasonsIgnored
        };

        let args = {...operators,...data};
        if(statFormula!= null && statFormula != ""){
            evaluatedTotal = evaluate(statFormula,args);
        }
        let calculatedValue = totalFromTemporary + evaluatedTotal + statAdd;
        return calculatedValue;
    } catch(e){
        MapTool.chat.broadcast(""+e+"<br>"+e.stack);
    }
}

function setState(tid,state){
    MTScript.setVariable("createdFromJstid",tid);
    MTScript.setVariable("createdFromJsstate",state);
    MTScript.evalMacro("[r:setState(createdFromJsstate,1,createdFromJstid"])
}

function unsetState(tid,state){
    MTScript.setVariable("createdFromJstid",tid);
    MTScript.setVariable("createdFromJsstate",state);
    MTScript.evalMacro("[r:setState(createdFromJsstate,0,createdFromJstid"])
}

function isPC(tid){
    MTScript.setVariable("idToken",tid)
    return MTScript.evalMacro("[r:isPC(idToken)]");

}

function textToChat(tid,results,context){
    let token = MapTool.tokens.getTokenByID(tid)
    if(isPC(tid)){
        MapTool.chat.broadcast("on the roll for "+context+" "+token.getName()+ " got a "+
        results[0] + "that is a " + results[1] + " by "+results[2]);
    }else {
        MapTool.chat.broadcastToGM(context+" "+token.getName()+": "+JSON.stringify(results));
    }
}
function checkStat(tid,statName,modifier = 0){
    try{
    const statValue = calculateStat(tid,statName);
    return JSON.stringify(sucessRoll(statValue,modifier));
    }catch(e){
        MapTool.chat.broadcast(""+e+"<br>"+e.stack);
    }
}

exports.getLibProperty = getLibProperty;
exports.findToken = findToken;
exports.setLibProperty = setLibProperty;
exports.addMacro = addMacro;
exports.checkForMacro = checkForMacro;
exports.removeMacro = removeMacro;
exports.log = log;
exports.getMacroText = getMacroText;
exports.roll = roll;
exports.sucessRoll = sucessRoll;
exports.callOnOwner = callOnOwner;
exports.canSeeToken = canSeeToken;
exports.calculateStat = calculateStat;
exports.setState = setState;
exports.unsetState = unsetState;
exports.isPC = isPC;
exports.textToChat = textToChat
exports.checkStat = checkStat;
