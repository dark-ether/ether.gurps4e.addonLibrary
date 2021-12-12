let  _ = require("lodash");
let jp  = require("jsonpath");
let basic = require("../basic.js");


/*format of default Object {
    "type": either skill, technique or attribute
    "name":here goes the name of the skill that is a default,
    "modifier": a number(usually negative),
    "specialization": empty string to say no specialization, all to say that any specialization has this default
    }
*/
/* format of prereq object{
    "type": skill,attribute, technique, trait
    "name": string,
    info dependent on type 
    skills have "specialization" and "level"
    advantages have "level" and "modifiers"
    techniques have "level"
    attributes have "value"
    }
*/
/* format of prereq list {
    "type": "prerequsite_list",
    prerequsites:[array of prerequisites objects]

}
*//*conflict_list
    "type":"conflict_list"
    "conflicts":[array of conflicts(which are prerequisiteObjects)]*/
function createSkill(skillName,attribute,difficulty,defaultsArray,prereqsArray,forcedSpecialization = false,technological=false){
    try{
    let skill = {
        "type":"skill",
        "attribute":attribute,
        "name":skillName,
        "difficulty":difficulty,
        "defaults":defaultsArray,
        "prerequisites":prereqsArray,
        "specializations":[],//specializations are added after
        "forcedSpecialization":forcedSpecialization,
        "technological":technological
    };
    let hasAddedSkill = false;
    let skills = JSON.parse(basic.getLibProperty("skills"));
    MapTool.chat.broadcast(JSON.stringify(defaultsArray)+JSON.stringify(prereqsArray));
    if(skills.filter( skillObject => skillObject.name == skillName).length === 0){
        skills.push(skill);
        basic.setLibProperty("skills",JSON.stringify(skills));
        hasAddedSkill = true;
    }
    return hasAddedSkill;
    }catch(e){
        MapTool.chat.broadcast(""+e+"<br>"+e.stack)
    }
}

function createSpecialization(skillName,specializationName, defaultsArray = [],prereqsArray = []){
    let specialization = {
        "name": specializationName,
        "defaults": defaultsArray,
        "prerequisites": prereqsArray
    };
    let hasAdded = false;
    let skills = JSON.parse(basic.getLibProperty("skills"));
    let arrayOfSpecializations = jp.value(skills,"$[?(@.name == '" + skillName + "' )].specializations");
    arrayOfSpecializations.push(specialization);
    jp.value(skills,"$[?(@.name =='"+skillName+"')].specializations",arrayOfSpecializations);
    if(jp.query(arrayOfSpecializations,"$[?(@.name == '" +specializationName+"')]").length == 1){
        basic.setLibProperty("skills",JSON.stringify(skills));
        hasAdded = true;
    }
    return hasAdded ;
}

/*  {   technique syntax
 *      "name":name,
 *      "defaults": array of objects,
 *      "prerequisites": array of objects,
 *      "max":number relative to the skill 
 *  }
*/
function createTechnique(techniqueName, max, arrayOfDefaults, arrayOfPrereqs){
    let technique = {
        "name": techniqueName,
        "type": "technique",
        "max": max,
        "defaults":arrayOfDefaults,
        "prerequisites":arrayOfPrereqs
    };
    let techniques = JSON.parse(basic.getLibProperty("techniques"));
    let hasAddedTechnique = false;
    if(jp.value(techniques,`$[?(@.name == ${techniqueName})]`) == undefined){
        techniques.push(technique);
        basic.setLibProperty("techniques",JSON.stringify(techniques));
        hasAddedTechnique = true;
    }
    return hasAddedTechnique;
}

function prerequisiteCheck(tid,prereqObject){
    let token = MapTool.tokens.getTokenByID(tid);
    let hasPrerequisite = true;
    let skills = JSON.parse(basic.getLibProperty("skills"));
    
    if(prereqObject.type == "skill"){
        let tokenSkills = JSON.parse(token.getProperty("ether.gurps4e.skills"));
        let skill = jp.value(tokenSkills,`$[@.name == ${prereqObject.name}]`);
        let skillValue = skill.level + Number(token.getProperty(jp.value(skills,`$[@.name == ${prereqObject.name}].attribute`)));
        if( (skill == undefined)|| (skillValue < prereqObject.level) || isNaN(skillValue) ){
            hasPrerequisite = false;
        }
    }

    if(prereqObject.type == "attribute"){
        let attributeValue = Number(token.getProperty("ether.gurps4e."+prereqObject.name));
        if(isNaN(attributeValue) || attributeValue < prereqObject.value){
            hasPrerequisite = false;
        }
    }

    if(prereqObject.type == "technique"){
        let tokenTechnique = getTechniqueAbsoluteLevel(tid,prereqObject.name);
        if(tokenTechnique < prereqObject.level){
            hasPrerequisite = false;
        }
    }

    if(prereqObject.type == "trait"){
        basic.log("add check of advantages/disadvantages prerequisites");
    }

    if(prereqObject.type == "prerequisite_list"){
        hasPrerequisite = false;
        for(let prerequisite of prereqObject.prerequisites){
            if(prerequisiteCheck(tid,prerequisite)){
                hasPrerequisite = true;
            }
        }
    }

    if(prereqObject.type == "conflict_list"){
        for(let conflict of prereqObject.conflicts){
            if(prerequisiteCheck(tid,conflict)){
                hasPrerequisite = false;
            }
        }
    }

    return hasPrerequisite;
}

function addSkill(tid,skillName,level,specialization = ""){
    try{
    let token = MapTool.tokens.getTokenByID(tid);
    let tokenSkills = JSON.parse(token.getProperty("ether.gurps4e.skills"));
    let hasAddedSkill = false;
    let skill = {
        "name":skillName,
        "level":level,
        "specialization":specialization
    };
    tokenSkills.push(skill);
    
    if(checkSkillPrerequisites(tid,skillName) && checkSpecializationPrerequisites(tid,skillName,specialization)){
        token.setProperty("ether.gurps4e.skills",JSON.stringify(tokenSkills));
        hasAddedSkill = true;
    }
    return hasAddedSkill;
    }
    catch(e){
        MapTool.chat.broadcast(""+e+"<br>"+e.stack);
    }
}

function checkSkillPrerequisites(tid,skillName){
    let hasPrerequisites = true;
    let skill = jp.value(JSON.parse(basic.getLibProperty("skills")),`$[?(@.name == "${skillName}")]`);
    for(let prerequisite of skill.prerequisites){
        if(!prerequisiteCheck(tid,prerequisite)){
            hasPrerequisites = false;
        }
    }
    return hasPrerequisites;

}

function checkSpecializationPrerequisites(tid,skillName,specializationName = ""){
    let skills = JSON.parse(basic.getLibProperty("skills"));
    let skill = jp.value(skills,`$[?(@.name == "${skillName}")]`)
    let specialization = jp.value(skill,`$.specializations[?(@.name == "${specializationName}")]`);
    let metPrerequisites = true;
    if(specialization != undefined){
        for(let prerequisite of specialization.prerequisites){
            if(!prerequisiteCheck(tid,prerequisite)){
                metPrerequisites = false;
            }
        }
    }
    return metPrerequisites ;
}

function addTechnique(tid,techniqueName,level){
    let token =  MapTool.tokens.getTokenByID(tid);
    let tokenTechniques = JSON.parse(token.getProperty("ether.gurps4e.techniques"));
    let hasAddedTechnique = false;
    let technique = {
        "name":techniqueName,
        "level":level
    };
    if(checkTechniquePrerequisites){
        hasAddedTechnique = true;
        tokenTechniques.push(technique);
        token.setProperty("ether.gurps4e.techniques",JSON.stringify(tokenTechniques));
    }
    return hasAddedTechnique;
}

function checkTechniquePrerequisites(tid,techniqueName){
    let metPrerequisites = true;
    let technique =  jp.value(JSON.parse(basic.getLibProperty("techniques")),`$[@.name == ${techniqueName}]`);
    for(let prerequisite of technique.prerequisites){
        if(!prerequisiteCheck(tid,prerequisite)){
            metPrerequisites = false;
        }
    }

    return metPrerequisites;
}

function getTechniqueAbsoluteLevel(tid,techniqueName){
    let token = MapTool.tokens.getTokenByID(tid);
    let techniqueLevel = -Infinity;
    let tokenSkills = JSON.parse(token.getProperty("ether.gurps4e.skills"));
    let tokenTechniqueLevel = jp.value(JSON.parse(token.getProperty("ether.gurps4e.techniques")),`$[?(@.name == ${techniqueName})].level`);
    let skills = JSON.parse(basic.getLibProperty("skills"));
    let techniques = JSON.parse(basic.getLibProperty("techniques"));
    let defaults = jp.value(techniques,`$[?(@.name == ${techniqueName})].defaults`);
    
    let defaultLevel = defaults.map( skillDefault => {
        let levelByDefault = -Infinity;
        let skillLevel = jp.value(tokenSkills,`$[?(@.name == ${skillDefault.name})].level`);
        let attribute = basic.calculateStat(tid,jp.value(skills,`$[?(@.name == ${skillDefault.name})].attribute`));
        if((skillLevel != undefined) && !isNaN(attribute)){
            levelByDefault = skillLevel + attribute + skillDefault.modifier;
        }
        return levelByDefault;
    }).reduce((max,presentValue) => Math.max(max,presentValue));

    if((defaultLevel != -Infinity ) && (tokenTechniqueLevel != undefined)){
        techniqueLevel = defaultLevel + tokenTechniqueLevel; 
    }

    return techniqueLevel;
}

//returns absolute skill level of highest default or minus Infinity if none
function getDefaultValue(tid,skillName,specializationUsed=""){
    let listOfDefaultObjects = [];
    let token = MapTool.tokens.getTokenByID(tid);
    let tokenSkills = JSON.parse(token.getProperty("ether.gurps4e.skills"));
    let skills = JSON.parse(basic.getLibProperty("skills"));
    if(jp.query(skills,`$[?(@.name == ${skillName})]`).length == 1){
        if(jp.query(skills,`$[?(@.name == ${skillName})].specializations[?(@.name == ${specializationUsed})]`)
        .length == 1){
            listOfDefaultObjects = _.concat(jp.value(skills,`$[?(@.name == ${skillName})].defaults`),
            jp.value(skills,`$[?(@.name == ${skillName})].specializations[?(@.name == ${specializationUsed})]`));
        } else {
            listOfDefaultObjects = jp.value(skills,`$[?(@.name == ${skillName})]`);
        }
    }
    let listOfDefaults = listOfDefaultObjects.map( defaultObject => {
        let absoluteSkill = -Infinity;
        if(defaultObject.type == "skill"){
            let controllingAttribute = Number(token.getProperty(jp.value(skills,
            `$[?(@.name == ${defaultObject.name})].attribute`)))
            let skillValue = -Infinity;
            if("specialization" in defaultObject){
                skillValue = jp.value(tokenSkills,`$[?(@.name  == "${defaultObject.name}" 
                && @.specialization == "${defaultObject.specialization}")].level`)
            } else {
                skillValue = jp.value(tokenSkills,`$[?(@.name == ${defaultObject.name})].level`)
            }
            if(skillValue !== undefined && !Number.isNaN(controllingAttribute)){
                absoluteSkill = controllingAttribute + defaultObject.modifier + skillValue;
            }
        }
        if(defaultObject.type == "attribute"){
            absoluteSkill = token.getProperty(defaultObject.name) + defaultObject.modifier;
        }
        if(defaultObject.type == "technique"){
            absoluteSkill = getTechniqueAbsoluteLevel(tid, defaultObject.name) +defaultObject.modifier;
        }
        return absoluteSkill;
    })
        
    return listOfDefaults.reduce((max,currentValue) => Math.max(max,currentValue));
}

function skillRoll(tid,skillName,specializationUsed = "",modifier = 0){
    let token = MapTool.tokens.getTokenByID(tid);
    let tokenSkills = JSON.parse(token.getProperty("ether.gurp4e.skills"));
    let skills = JSON.parse(basic.getLibProperty("skills"));
    let skill = jp.value(skills,`$[?(@.name ==${skillName})]`);
    let skillValue = jp.value(tokenSkills,`$[?(@.name == ${skillName})].level`);
    let skillTest = [];
    let attribute = calculateStat(tid,skill.attribute); 
    if(skillValue != undefined){
        if(!isNaN(Number(token.getProperty("ether.gurps4e." + skill.attribute))) ){
            skillTest = basic.sucessRoll(skillValue +,modifier);
        }
    } else {
        let defaultLevel = getDefaultValue(tid,skillName,specializationUsed);
        if(defaultLevel != -Infinity){
            skillTest = basic.sucessRoll(defaultLevel,modifier);
        } 
    }
    return skillTest;
}

try{

MTScript.registerMacro("createSkill",createSkill);
MTScript.registerMacro("createSpecialization",createSpecialization);
MTScript.registerMacro("createTechnique",createTechnique);
MTScript.registerMacro("addSkill",addSkill);
MTScript.registerMacro("addTechnique",addTechnique);
MTScript.registerMacro("skillRoll",skillRoll);
}catch(e){
    MapTool.chat.broadcast(""+e+"<br>"+e.stack);
}
