
try{
    let tid = MTScript.getMTScriptCallingArgs()[0]
    

    createBackpackType("backpack",[createObject("weight","[r:getProperty('strength')")])
    prepareInventory(tid);
    addBackpack(tid,"backpack","backpack")
}
catch(e){
MapTool.chat.broadcast(""+e+"<br>"+e.stack);
}
