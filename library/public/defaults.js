
try{
    let tid = MTScript.getMTScriptCallingArgs()[0]
    

    createBackpackType("backpack",[createObject("weight","[r:8 * getProperty('ether.gurps4e.BL')]")]);
    createItemType("axe",[createValueObject(createObject("weight",4),"backpack")],[],{});
    prepareInventory(tid);
    prepareToken(tid);
    addBackpack(tid,"backpack","backpack");
    
    addItemToLocation(tid,"axe",{},1,0);
}
catch(e){
MapTool.chat.broadcast(""+e+"<br>"+e.stack);
}
