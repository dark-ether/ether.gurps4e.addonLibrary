
try{
    let tid = MTScript.getMTScriptCallingArgs()[0]
    

    createBackpackType("backpack",[createObject("weight","[r:8 * getProperty('ether.gurps4e.BL')]")]);
    createItemType("axe",[createValueObject(createObject("weight",4),"backpack")],
    [createMacroObject("attack:axe swing","[h:modifier = 2][h:damageType = 'cutting'][r:dice = 'sw']","attack",["attack"])],
    createObject("TL",0,"damage","sw+2 cut","reach",1,"parry","0U","cost",50,"ST",11));
    prepareInventory(tid);
    prepareToken(tid);
    addBackpack(tid,"backpack","backpack");
    
    addItemToLocation(tid,"axe",{},1,0);
    removeItemsInLocation(tid,"axe",{},1,0);
}
catch(e){
MapTool.chat.broadcast(""+e+"<br>"+e.stack);
}
