const { calculateStat} = require("../basic.js");

let [tid,statName,array] = MTScript.getMTScriptCallingArgs();
calculateStat(tid,statName,array);
