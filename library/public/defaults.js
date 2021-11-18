
try{
    let tid = MTScript.getMTScriptCallingArgs()[0]
    

    createBackpackType("backpack",[createObject("weight","[r:getProperty('strength')")]);
    createItemType("arrow",[createValueObject(createObject("damage",10),"backpack")],[{}],{});
    createModifier("blunted",[createValueObject(createObject("damage",-5),"backpack")],{},["arrow"],"whitelist");
    prepareInventory(tid);
    addBackpack(tid,"backpack","backpack");
}
catch(e){
MapTool.chat.broadcast(""+e+"<br>"+e.stack);
}
