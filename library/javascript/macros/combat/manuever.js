const basic = require("../../basic.js");

function setManuever(tid,manuever){
    let token = MapTool.tokens.getTokenByID(tid);
    let manueversInfo= JSON.parse(basic.getLibProperty("manuevers"));
    let manevuerObject = jp.value(manueversInfo,`$[?(@.name == ${manuever})]`);
}

function unsetManuever(tid){
    let token = MapTool.tokens.getTokenByID(tid);
    token.setProperty("ether.gurps4e.manuever.defense",JSON.stringify([]));
    token.setProperty("ether.gurps4e.manuever.move",JSON.stringify([]));
    token.setProperty("")
}
