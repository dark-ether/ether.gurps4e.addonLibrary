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
