"use strict"
function createBackpackType(backPackTypeName,arrayOfLimitObjects){
    let backpacks = JSON.parse(getLibProperty("backpacks"));
    let backpack = {}
    backpack.typename = backPackTypeName;
    backpack.limits = arrayOfLimitObjects;
    backpacks[backPackTypeName] = backpack;
    setLibProperty("backpacks",JSON.stringify(backpacks));
}

function createItemType(itemTypeName,arrayOfValuesObjects,arrayOfMacrosObjects){
    let items = JSON.parse(getLibProperty("items"));
    let item = {};
    item.itemTypeName = itemTypeName;
    item.values = arrayOfValuesObjects;
    item.macros = arrayOfMacrosObjects;
    items[itemTypeName] = item;
    setLibProperty("items",JSON.stringify(items));
}

function createValueObject(){
    let valueObject = {};
    for(let i = 0; i< Math.floor(arguments.length/2); i++){
        valueObject[arguments[ i * 2 ]]=arguments[i * 2 +1];
    }
    return valueObject;
}

function createMacroObject(macroName,macroHead="",macrosArray = []){
    let macroObject = {};
    macroObject.macroName = macroName;
    macroObject.macroHead = macroHead;
    macroObject.macrosSources = macrosArray;
    return macroObject;
}

try {
    createItemType("arrow",[createValueObject("bow ammunition",1)],
    [createMacroObject("shoot","[r:10]")])
    MapTool.chat.broadcast("" + getLibProperty("items")+"<br>"+getLibProperty("backpacks"));
} catch (e) {
MapTool.chat.broadcast(""+e+"<br>"+e.stack);
}
