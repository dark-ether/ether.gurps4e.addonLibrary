function getLibProperty(property, libName ="lib:ether.gurps4e"){
    let result = MTScript.execMacro(`[r:getLibProperty(${property},${libName})]`);
    return result;
}
function findToken(name){
    let tokenId = MTScript.execMacro(`[r:findToken(${name})]`);
}
try{
    findToken("test");
}
catch(e){
    MapTool.chat.broadcast(""+e+"<br>"+e.stack)

}
