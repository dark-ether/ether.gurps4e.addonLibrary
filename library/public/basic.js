function getLibProperty(property, libName ="lib:ether.gurps4e"){
    let result = MTScript.execMacro(`[r:getLibProperty("${property}","${libName}")]`);
    return result;
}

function findToken(name){
    let tokenId = MTScript.execMacro(`[r:findToken("${name}")]`);
    return tokenId;
}

function setLibProperty(property, propertyValue, libName="lib:ether.gurps4e"){
    MTScript.execMacro(`[r:setLibProperty("${property}",
    "${propertyValue}","${libName}")]`);
}
