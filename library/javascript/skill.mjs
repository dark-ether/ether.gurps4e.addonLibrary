function createSkill(skillName,mainAttribute,skillDifficulty,attributeDefault,defaultObject,arrayOfPrerequisiteObjects,hasAttributeDefault,requiresSpecialization){
    let skillObject = {
        "skillName":skillName,
        "controllingAttribute":mainAttribute,
        "defaults":defaultObject,
        "prerequisites":arrayOfPrerequisiteObjects,
        "hasAttributeDefault":hasAttributeDefault,
        "attributeDefault":attributeDefault,
        "skillDifficulty":skillDifficulty 
    }
    let skills = JSON.parse(getLibProperty("skills"));
    skills[skillName] = skillObject;
    setLibProperty("skills",JSON.stringify(skills));
}

function createPrerequisiteObject(skillsObject,advantagesObject,attributeObject){
    let prerequisiteObject = {
        "skill":skillsObject,
        "advantage":advantagesObject,
        "attribute": attributeObject
    }
    return prerequisiteObject;
}

function addSkill(tid,skillName,skillLevel){
    let token = MapTool.tokens.getTokenByID(tid);
    let skills = JSON.parse(token.getProperty("ether.gurps4e.skills"));
    
    skills[skillName] = skillLevel;
    token.setProperty("ether.gurps4e.skills",JSON.stringify(skills));
}

function skillCheck(tid,skillName,modifier = 0){
    let skillsInfo = JSON.parse(getLibProperty("skills"));
    let token = MapTool.tokens.getTokenByID(tid);
    let skills = JSON.parse(token.getProperty("ether.gurps4e.skills"));
    let results;
    let hasFromDefault = false;
    let highestDefault = -Infinity;
    for(let defaultSkill in skillsInfo[skillName].defaults){
        if(defaultSkill in skills){
            hasFromDefault = true;
            if(skills[defaultSkill]+skillsInfo[skillName].defaults[defaultSkill]>highestDefault){
                highestDefault = skills[defaultSkill]+skillsInfo[skillName].defaults[defaultSkill];
            }
        }
    }
    if(skillsInfo[skillName].hasAttributeDefault){
        hasFromDefault = true;
        if((skillsInfo[skillName].attributeDefault)>highestDefault){
            highestDefault = skillsInfo[skillName].attributeDefault;
        }
    }
    if(skillName in skills){
        results = sucessRoll(skills[skillName]+Number(token.getProperty(skillsInfo[skillName].controllingAttribute)
        ,modifier));
    }else if(hasFromDefault){
        results = sucessRoll(highestDefault+token.getProperty(skillsInfo[skillName].controllingAttribute),modifier);
    }
    return results;
}
