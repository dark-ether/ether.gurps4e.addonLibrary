
[r:macro.args]
[h:canDodgeAcrobatic=1]
[h:canDodge=1]
[h:canDodgeRetreat=1]
<link href="lib://test/macro/defense/dodge/css?cachelib=false" rel="stylesheet"/>
<div>

[r,if(canDodge),CODE:{
	<a href="[r:macroLinkText('defense/dodge/dodgeMacro')]" class="button">Dodge</a>
   };{
      <button class="disabled">Dodge</button>
    }]


[r,if(canDodgeAcrobatic),CODE:{
	<a href="[r:macroLinkText('defense/dodge/dodgeAcrobaticMacro')]" class="button">Acrobatic Dodge</a>
    };{
       <button class="disabled">Dodge Acrobatic</button>
     }]

[r,if(canDodgeRetreat),CODE:{
	<a href="[r:macroLinkText('defense/dodge/dodgeAndRetreatMacro')]" class="button">Dodge and Retreat</a>
    };{
    	<button class="disabled">Dodge and Retreat</button>
     }]


</div>
