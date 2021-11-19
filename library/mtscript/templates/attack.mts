[switch(dice):
case "sw": diceToRoll = getProperty("ether.gurps4e.dice.dmg_sw");
case "thr": diceToRoll = getProperty("ether.gurps4e.dice.dmg_thr");
default : diceToRoll = "1d6"]
[rolledDmg = eval(diceToRoll)]
[broadcast("rolled attack:"+3d6)]
[broadcast("rolled: damage"+rolledDmg+"with modifiers:"+(rolledDmg+modifier)+damageType)]
