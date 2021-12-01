import jp from "jsonpath"

let object = {
    "array": [
        "string1","string2","string3"
    ],
    "a": "string"
}
let arrayOfObj = [object,{"a":"string", "array":["string","string2","string3"]},{a:"anotherstring"}]
let string = "string"
console.log(jp.value(arrayOfObj,`$[?(@.a == "${string}" && @.array.includes("${string}"))]`))
