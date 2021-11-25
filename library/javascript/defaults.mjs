
try{
    let tid = MTScript.getMTScriptCallingArgs()[0]
    
    createSkill("test skill","ether.gurps4e.ST",0,-4,{},[],true);
    addSkill(tid,"test skill",10);
    prepareToken(tid);
    MapTool.chat.broadcast(JSON.stringify(skillCheck(tid,"test skill")));
    
}
catch(e){
MapTool.chat.broadcast(""+e+"<br>"+e.stack);
}
