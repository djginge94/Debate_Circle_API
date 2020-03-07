const firebase = require("../Services/firebase");

module.exports = (key, val) => {
    val.id = key
    return val
}