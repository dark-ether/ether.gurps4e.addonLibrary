const {checkStat} = require("../basic.js");

let [tid,statName,modifier] = MTScript.getMTScriptCallingArgs();

JSON.stringify(checkStat(tid,statName,modifier));
