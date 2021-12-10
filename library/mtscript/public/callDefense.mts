
[h:attacker = arg(0)]
[h:defender = arg(1)]
[h:attackInfo = arg(2)]
[h:var = json.append("[]",attacker,defender,attackInfo)]

[frame5("Defenses","temporary = 1 ; width = 400 ; height = 350;"):{

	[r,macro("defense/main/content@this"):var]

}]

	
	
