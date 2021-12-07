const basic = require('../../basic.js');
const jp = require("jsonpath");
const _ = require("lodash");
/*
{body object syntas
name:
composition:array of objects which follow bodypart syntax
randomhit: array of name of bodypart
}
{body part synstax
name:
modifier:negative Number,
multipliers:{ object with key number pairs and maybe one property named all,
    }
optional allow: array of permitted damagetypes object with {name: ,type:}
}

 *///lacks damagte reduction
function createBodyPart(bodyPartName,bodyPartModifier,bodyPartMultipliers,bodyPartAllow=false){
    let bodyPart = {
        "name":bodyPartName,
        "modifier":bodyPartModifier,
        "multipliers":bodyPartMultipliers,
    };
    if (bodyPartAllow) {
        bodyPart.allow = bodyPartAllow;
    }
    return bodyPart;
}

function createBodyPlan(nameOfBodyPlan,arrayOfBodyParts,randomHitList) {
    let bodyPlan = {
        "name":nameOfBodyPlan,
        "composition":arrayOfBodyParts,
        "ramdom":ramdomHitList
    };
     let bodyPlans = JSON.parse(basic.getLibProperty("bodyPlanArray"));
     bodyPlans.push(bodyPlan);
     basic.setLibProperty("bodyPlanArray",JSON.stringify(bodyPlans));
}
