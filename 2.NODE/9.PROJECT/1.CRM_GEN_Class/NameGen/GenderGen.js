const CommonGen = require('./CommonGen');

class GenderGen extends CommonGen {
    constructor(lang) {
        super();
        this.lang = lang;
    }
    generate() {
        if (this.lang == "KOR") {
            return Math.random() < 0.5 ? "남성" : "여성"
        } else {
            return Math.random() < 0.5 ? "Male" : "Female"
        }
    }
}

module.exports = GenderGen;
