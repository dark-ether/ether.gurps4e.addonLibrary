[r:broadcast("todo:add javascript functions here at onInit")]
[r: setLibProperty("backpacks","{}")]
[r: setLibProperty("items","{}")]
[r: setLibProperty("modifiers","{}")]
<!--  formulas for secondary stats-->
[r: setLibProperty("BL formula","(calculateStat(tid,'ST','all') * calculateStat(tid,'ST','all'))/5")]
[r: setLibProperty("HP formula","(calculateStat(tid,'ST','all'))")]
[r: setLibProperty("Will formula","(calculateStat(tid,'IQ','all'))")]
[r: setLibProperty("Per formula","(calculateStat(tid,'IQ','all'))")]
[r: setLibProperty("FP formula","(calculateStat(tid.'HT','all'))")]
[r: setLibProperty("BS formula","(calculateStat(tid,'HT','all') + calculateStat(tid,'DX','all'))/4")]
[r: setLibProperty("BM formula","Math.floor(calculateStat(tid,'BS','all'))")]
[r: setLibProperty("dodge formula","Math.floor(calculateStat(tid,'BS','all')) + 3")]

<!-- macro definitions -->
[r:js.evalURI("ether.gurps4e","lib://ether.gurps4e/javascript/general.js")]

