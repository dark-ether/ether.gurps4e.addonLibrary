try{
    tid = MTScript.getMTScriptCallingArgs()[0];
    MapTool.chat.broadcast(quantityInLocation(tid,"damage",0));

}catch(e){
    MapTool.chat.broadcast(""+e+"<br>"+e.stack);
}
