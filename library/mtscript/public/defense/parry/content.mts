<html>
<head>
[h:parryAbleWeapons = json.append("[]",json.set("{}","name","axe"))]
<link rel="stylesheet" href="lib://test/macro/defense/parry/css">
</head>
<body>
<div>
[r,foreach(weapon,parryAbleWeapons,"",""),CODE:{
	<a href="[r:macroLinkText('defense/parry/parryMacro','all',macro.args)]" class="button">
		Parry with [r:json.get(weapon,"name")]
	</a>

	<a href="[r:macroLinkText('defense/parry/parryAndRetreatMacro','all',macro.args)]" class="button">
		Parry with [r:json.get(weapon,"name")] and Retreat
	</a>

}]

</div>

</body>
</html>
