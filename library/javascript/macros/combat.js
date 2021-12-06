function canSeeToken(tidAttacker,tidDefender){
    MTScript.setVariable("createdFromJstidAttacker",tidAttacker);
    MTScript.setVariable("createdFromJstidDefender",tidDefender);
    return MTScript.evalMacro("[r:canSeeToken(createdFromJstidAttacker,createdFromJstidDefender)]");
}
