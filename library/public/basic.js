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
    for(macro of indexes){
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
