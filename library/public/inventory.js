"use strict"
function createBackpackType(backPackTypeName,arrayOfLimitObjects){
    let backpacks = JSON.parse(getLibProperty("backpacks"));
    let backpack = {}
    backpack.typename = backPackTypeName;
    backpack.limits = arrayOfLimitObjects;
    backpacks[backPackTypeName] = backpack;
    setLibProperty("backpacks",JSON.stringify(backpacks));
}

function createItemType(itemTypeName,arrayOfValuesObjects,
    arrayOfMacrosObjects, propertiesObject){
    let items = JSON.parse(getLibProperty("items"));
    let item = {};
    item.itemTypeName = itemTypeName;
    item.values = arrayOfValuesObjects;
    item.propeties = propertiesObject;
    item.macros = arrayOfMacrosObjects;
    items[itemTypeName] = item;
    setLibProperty("items",JSON.stringify(items));
}

function createObject(){
    //takes pairs of argument and
    if (arguments.length % 2 === 0){
        var valueObject = {};
        for(let i = 0; i< Math.floor(arguments.length/2); i++){
            valueObject[arguments[ i * 2 ]]= arguments[i * 2 +1];
        }
    }
    return valueObject;
}

function createMacroObject(macroName,macroHead="",macrosArray = [],cutOffObject){
    let macroObject = {};
    macroObject.macroName = macroName;
    macroObject.macroHead = macroHead;
    macroObject.macrosSources = macrosArray;
    macroObject.cutOff = cutOffObject;
    return macroObject;
}
