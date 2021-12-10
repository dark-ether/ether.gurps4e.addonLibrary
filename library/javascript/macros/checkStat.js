const basic = require("../basic.js");


function rollStat(tid,statName,modifier = 0){
    try{
    const statValue = basic.calculateStat(tid,statName);
    return JSON.stringify(basic.sucessRoll(statValue,modifier));
    }catch(e){
        MapTool.chat.broadcast(""+e+"<br>"+e.stack);
    }
}

MTScript.registerMacro("rollStat",rollStat);
MTScript.registerMacro("calculateStat",basic.calculateStat);
