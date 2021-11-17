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
    item.properties = propertiesObject;
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

function createCutOffObject(objectWithValues,type="min"){
    let cutOffObject = {
        "values": objectWithValues,
        "type":type
    };
    return cutOffObject;
}

function createMacroObject(macroName,macroHead="",macroGroup="",macrosArray = [],cutOffObject){
    let macroObject = {};
    macroObject.macroName = macroName;
    macroObject.macroHead = macroHead;
    macroObject.macrosSources = macrosArray;
    macroObject.cutOff = cutOffObject;
    return macroObject;
}

function createValueObject(objectOfValues,...arrayOfApplicable){
    let valueObject = {
        properties:objectOfValues,
        applicableArray:arrayOfApplicable
    }
    return valueObject;
}

function createModifier(modifierName,arrayOfValueObjects,propertiesObject,arrayOfItems,typeOfAllow){
    let modifierObject = {
        "name": modifierName,
        "values": arrayOfValueObjects,
        "properties": propertiesObject,
        "items": arrayOfItems,
        "typeOfAllow":typeOfAllow
    }
    let modifiers = JSON.parse(getLibProperty("modifiers"));
    modifiers[modifierName] = modifierObject;
    setLibProperty("modifiers",JSON.stringify(modifiers));
}

function prepareInventory(tid){
    let token = MapTool.tokens.getTokenByID(tid);
    token.setProperty("ether.gurps4e.inventory","[]");
}

function addBackpack(tid,backpackType,backpackName){
    let token = MapTool.tokens.getTokenByID(tid);
    let inventory = JSON.parse(token.getProperty("ether.gurps4e.inventory"));
    if(inventory.filter(backpack => backpack.name == backpackName).length != 0){
        return ;
    }

    let backpack = {
        "backpackType":backpackType,
        "items": [],
        "name":backpackName
    };
    
    inventory.push(backpack);
    token.setProperty("ether.gurps4e.inventory",JSON.stringify(inventory));
}

function removeBackpackByLocation(tid,locationNumber){
    let token =  MapTool.tokens.getTokenByID(tid);
    let inventory = JSON.parse(token.getProperty("ether.gurps4e.inventory"));
    inventory.splice(locationNumber,1);
    token.setProperty("ether.gurps4e.inventory",JSON.stringify(inventory));
}

function removeBackpackByName(tid,backpackName){
    let token = MapTool.tokens.getTokenByID(tid);
    let inventory = JSON.parse(token.getProperty("ether.gurps4e.inventory"));
    let newInventory = inventory.filter(backpack => backpack.name != backpackName);
    token.setProperty("ether.gurps4e.inventory",JSON.stringify(newInventory));
}

function countItemsInInventory(tid,itemType,modifiersObject){
    let count = 0;
    let token = MapTool.tokens.getTokenByID(tid);
    let inventory = JSON.parse(token.getProperty(""));
    for(let backpack of inventory){
        for(let item of backpack.items){
            if(item.itemType == itemType && item.modifiers == modifiersObject){
                count += item.quantity;
            }
        }
    }
    return count;
}

function quantityInLocation(tid,quantityName,locationNumber){
    let quantity = 0; 
    let quantityPerItem = 0;
    let quantityPerModifier = 0; 
    let quantityFromModifiers = 0;
    let token = MapTool.tokens.getTokenByID(tid);
    let inventory = JSON.parse(token.getProperty("ether.gurp4e.inventory"));
    let itemsInfo = JSON.parse(getLibProperty("items"));
    let modifiersInfo = JSON.parse(getLibProperty("modifiers"));
    
    for(let item of inventory[locationNumber].items){
        if(quantityName in itemsInfo[item.itemType].properties){
            quantityPerItem = itemsInfo[item.itemType].properties[quantityName];
        }       
        quantity += item.quantity * quantityPerItem;
        for(let modifier in item.modifiers){
            if(quantityName in modifierInfo[modifier].properties){
                quantityPerModifier = modifierInfo[modifier].properties[quantityName];
            } else{
                quantityPerModifier = 0;
            }
            quantity += quantityPerModifier * item.modifiers[modifier] * item.quantity
        }
    }
    return quantity;
}


