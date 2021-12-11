const {sucessRoll} = require("../../basic.js")

let [skill,modifier] = MTScript.getMTScriptCallingArgs();

JSON.stringify(sucessRoll(skill,modifier));
