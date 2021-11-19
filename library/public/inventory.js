"use strict"
log("inventory.js called");

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

function createMacroObject(macroName,macroHead="",macroGroup="",macrosArray = [],cutOffObject = {}){
    let macroObject = {};
    macroObject.macroName = macroName;
    macroObject.macroHead = macroHead;
    macroObject.macroGroup = macroGroup;
    macroObject.macroSources = macrosArray;
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

function getQuantityInLocation(tid,quantityName,locationNumber){
    let quantity = 0; 
    let quantityPerItem = 0;
    let quantityPerModifier = 0; 
    let token = MapTool.tokens.getTokenByID(tid);
    let inventory = JSON.parse(token.getProperty("ether.gurps4e.inventory"));
    let itemsInfo = JSON.parse(getLibProperty("items"));
    let modifiersInfo = JSON.parse(getLibProperty("modifiers"));
    if(inventory[locationNumber] != null){    
        if(inventory[locationNumber].items.length != 0){
            for(let item of inventory[locationNumber].items){
                for(let valueObject of itemsInfo[item.itemType].values){
                    if(valueObject.applicableArray.includes(inventory[locationNumber].backpackType)){
                        if(quantityName in valueObject.properties){
                            quantityPerItem += Number(valueObject.properties[quantityName]);
                        }
                    }
                }
                quantity += item.quantity * quantityPerItem;
                for(let modifier in item.modifiers){
                    if(modifier in modifiersInfo){
                        let testObjectForQuantity = internalObject => quantityName in internalObject.properties ;
                        if(modifiersInfo[modifier].values.some(testObjectForQuantity)){
                            let arrayWithAllRelevant = modifiersInfo[modifier].values.filter(testObjectForQuantity);
                            for(let internalValueObject of arrayWithAllRelevant){
                                if(internalValueObject.applicableArray.includes(inventory[locationNumber].backpackType)){
                                    quantityPerModifier += internalValueObject.properties[quantityName];
                                }
                            }
                        } else{
                            quantityPerModifier = 0;
                        }
                        quantity += quantityPerModifier * item.modifiers[modifier] * item.quantity;
                    } else{
                        quantityPerModifier = 0;
                    }
                }
            }
        }
    }
    return quantity;
}

function getQuantity(tid,quantityName){
    let token = MapTool.tokens.getTokenByID(tid);
    let inventory = JSON.parse(token.getProperty("ether.gurps4e.inventory"));
    let quantity = 0;
    for(let i = 0;i<inventory.length;i++ ){
        quantity += getQuantityInLocation(tid,quantityName,i);
    }
    return quantity;
}

function getQuantitiesFromItem(itemType,modifiersObject,locationType){
    let itemsInfo = JSON.parse(getLibProperty("items"));
    let modifiersInfo = JSON.parse(getLibProperty("modifiers"));
    let quantitiesObject = {};
    for(let valueObject of itemsInfo[itemType].values){
        if(valueObject.applicableArray.includes(locationType)){
            for(let value in valueObject.properties){
            quantitiesObject[value] = valueObject.properties[value];
            }
        }
    }
    for(let modifier in modifiersObject){
        for(let valueObject of modifiersInfo[modifier].values){
            if(valueObject.applicableArray.includes(locationType)){
                for(let value in valueObject.properties){
                    if(value in quantitiesObject){
                        quantitiesObject[value] += valueObject.properties[value];
                    }
                    else{
                        quantitiesObject[value] = valueObject.properties[value]; 
                    }
                }
            }
        }
    }
    return quantitiesObject;
}

function getAllowableQuantityInLocation(tid,itemType,modifiersObject,locationNumber){
    let token = MapTool.tokens.getTokenByID(tid);
    let inventory = JSON.parse(token.getProperty("ether.gurps4e.inventory"));
    let backpackInfo = JSON.parse(getLibProperty("backpacks"))[inventory[locationNumber].backpackType]
    let allowableQuantity = Infinity;
    let objectOfQuantitiesPerItem = getQuantitiesFromItem(itemType,modifiersObject,inventory[locationNumber].backpackType);
    if(locationNumber >= 0 && locationNumber < inventory.length){
        let backpack = inventory[locationNumber];
        for(let limitObject of backpackInfo.limits){
            let maxFromObject = 0;
            for(let limitName in limitObject){
                let limitValue = Number(MTScript.execMacro(limitObject[limitName]));
                let quantityUnderLimit = Infinity;
                if(!(limitName in objectOfQuantitiesPerItem)){
                    quantityUnderLimit = Infinity;
                }
                else{
                    quantityUnderLimit = Math.floor((limitValue-getQuantityInLocation(tid,limitName,locationNumber))/
                    objectOfQuantitiesPerItem[limitName]);
                }
                maxFromObject = Math.max(maxFromObject, quantityUnderLimit);
            }
            allowableQuantity = Math.min(allowableQuantity,maxFromObject);
        }
        
    }else{
        log("error called getAllowableQuantityinLocation with invalid location number");
    }
    return allowableQuantity;
}

function addItemToLocation(tid,itemType,modifiersObject,quantityToAdd,locationNumber){
    let token = MapTool.tokens.getTokenByID(tid)
    let inventory = JSON.parse(token.getProperty("ether.gurps4e.inventory"));
    let itemInfo = JSON.parse(getLibProperty("items"))[itemType];
    let backpack = inventory[locationNumber];
    let itemsToAdd = Math.min(getAllowableQuantityInLocation(tid,itemType,modifiersObject,locationNumber),quantityToAdd);
    let cleanedModifiersObject = {}
    cleanedModifiersObject = Object.assign(cleanedModifiersObject,modifiersObject);
    
    for(let property in cleanedModifiersObject){
        if(cleanedModifiersObject[property] == 0){
            delete cleanedModifiersObject[property];
        }
    }
    
    let indexOfItem = backpack.items.findIndex(object => (object.itemtype == itemtype)&&
    (JSON.stringify(object.modifiers) == JSON.stringify(cleanedModifiersObject))); 
    
    if(indexOfItem != -1){
        backpack.items[indexOfItem].quantity += itemsToAdd;
    } else{
        if(itemsToAdd > 0){
            backpack.items.push({
                "quantity":itemsToAdd,
                "itemType":itemType,
                "modifiers":cleanedModifiersObject
            })
        }
    }
    
    token.setProperty("ether.gurps4e.inventory",JSON.stringify(inventory));
    
    for(let i = 0; i< itemInfo.macros.length;i++){
        if(getMacroApplicability(tid,itemType,i)){
            let macroText = itemInfo.macros[i].macroHead;
            for(let macroSource of itemInfo.macros[i].macroSources){
            macroText += getMacroText(macroSource);
            }
            addMacro(tid,itemInfo.macros[i].macroName,itemInfo.macros[i].macroGroup,macroText);
        }
    }
    return itemsToAdd;
}

function getMacroApplicability(tid,itemType,macroNumber){
    let itemsInfo = JSON.parse(getLibProperty("items"));
    let itemInfo = itemsInfo[itemType];
    let macroObject = itemInfo.macros[macroNumber];
    let cutOffSatisfied = true;
    for(let cutOff in macroObject.cutOff){
        if(getQuantity(tid,cutOff) < macroObject.cutOff[cutOff]){
            cutOffSatisfied = false;
        }
    }
    return cutOffSatisfied;
}

function addItemByName(tid,itemType,modifiersObject,quantityToAdd,backpackName){
    let token = MapTool.tokens.getTokenByID(tid);
    let inventory = JSON.parse(token.getProperty("ether.gurps4e.inventory"));
    let backpackIndex = inventory.findIndex(backpack => backpack.name == backpackName)
    return addItemToLocation(tid,itemType,modifiersObject,quantityToAdd,backpackIndex);
}

function addItems(tid,itemType,modifiersObject,quantityToAdd){
    let token = MapTool.tokens.getTokenByID(tid);
    let inventory = JSON.parse(token.getProperty("ether.gurps4e.inventory"));
    let itemsToAdd = quantityToAdd;
    let itemsAdded = 0;
    for(let i = 0;i<inventory.length;i++){
        itemsAdded += addItemToLocation(tid,itemType,modifiersObject,itemsToAdd);
        itemsToAdd = quantityToAdd - itemsAdded;
    }
    return itemsAdded;
}

function removeItemsInLocation(tid,itemType,modifiersObject,quantityToRemove,locationNumber){
    let token = MapTool.tokens.getTokenByID(tid);
    let inventory = JSON.parse(token.getProperty("ether.gurps4e.inventory"));
    let backpack = inventory[locationNumber];
    let itemInfo = JSON.parse(getLibProperty("items"))[itemType];
    let removedItems = 0;
    let itemLeft = true;
    for(let item of backpack.items){
        if(item.itemType == itemType && JSON.stringify(item.modifiers) == JSON.stringify(modifiersObject)){
            if(quantityToRemove>= item.quantity){
                removedItems = item.quantity
                backpack.items = backpack.items.filter(object => object.itemType != itemType || JSON.stringify(object.modifiers) != JSON.stringify(modifiersObject));
                itemLeft = false;
            } else{
                item.quantity -= quantityToRemove;
                removedItems = quantityToRemove;
            }
        }
    }
    token.setProperty("ether.gurps4e.inventory",JSON.stringify(inventory));
    
    for(let i = 0; i<itemInfo.macros.length;i++){
        let macro = itemInfo.macros[i]
        if(!itemLeft){
            removeMacro(tid,macro.macroName);
        }else{
            if(!getMacroApplicability(tid,itemType,i)){
                removeMacro(tid,macro.macroName);
            }
        }
    }
    
    return removedItems;
}


