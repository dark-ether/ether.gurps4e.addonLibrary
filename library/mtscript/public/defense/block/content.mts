[r:macro.args]
[h:canBlockRetreat = 1]

<link rel="stylesheet" href="lib://test/macro/defense/block/css?cachelib=false" type="text/css">
<div>
<a href="[r:macroLinkText('defense/block/blockMacro','all',macro.args)]" class="button"> Block</a>
[r,if(canBlockRetreat),CODE:{
	<a href="[r:macroLinkText('defense/block/blockRetreatMacro','all',macro.args)]"
	class="button">
		Block and Retreat
	</a>
	};{
	<button class="disabled">Block and Retreat</button>
}]

</div>
