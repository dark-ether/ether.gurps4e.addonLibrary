[h:attacker = arg(0)]
[h:defender = arg(1)]
[h:attackInfo = arg(2)]
[h:args = json.append("[]",arg(0),arg(1),arg(2))]
[h:canDodge = 1]
[h:canBlock = 1]
[h:canParry = 1]
<head>
<link href="lib://ether.gurps4e/css/main.css?cachelib=false" rel="stylesheet" type="text/css">
</head>
<div>
<a href="[r:macroLinkText('defense/none@lib:ether.gurps4e','all',args)]" class="button">None</a>


[r,if(canDodge),CODE:{
	<a href="[r:macroLinkText('defense/dodge/call@lib:ether.gurps4e','all',args)]" class="button">Dodge</a>
	};{
	<button class="disabled">Dodge</button>
	}]
</div>
<div>
[r,if(canBlock),CODE:{
	<a href="[r:macroLinkText('defense/block/call@lib:ether.gurps4e','all',args)]" class="button">Block</a>
	};{
	<button class="disabled">Block</button>
	}]

[r,if(canParry),CODE:{
	<a href="[r:macroLinkText('defense/parry/call@lib:ether.gurps4e','all',args)]" class="button">Parry</a>
	};{
	<button class="disabled">Parry</button>
	}]
</div>
