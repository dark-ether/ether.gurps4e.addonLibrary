[h:abort(input("damageType|small piercing,burning,corrosion,crushing,fatigue,
piercing,toxic,cutting,large piercing,impaling,huge piercing|damage type|LIST|","damage|0|damage after dr|TEXT|",
"bodyPart|torso,eye,skull,face,right leg,right arm,groin,left arm,left leg,hand,foot,neck,vitals|
body part targetted|LIST|"))]
[h:js.evalURI("ether.gurps4e","lib:ether.gurps4e/javascript/combat/manualDodge.js",damageType,damage,bodyPart)]
