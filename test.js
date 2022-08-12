jp = require("jsonpath")

array=[
    {
        "a":10,
        b:10
    },
    {
        b:21
    },
    {
        a:{
            b:2
        }
    }
]

console.log(jp.query(array,"$.*.b"))
