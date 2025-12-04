const CommonGen = require('./CommonGen');

class BirthdateGen extends CommonGen {
    constructor(from, to) {
        super();
        this.yearStart = from;
        this.yearEnd = to;
    }
    generate() {
        const year = Math.floor(Math.random() * (this.yearEnd - this.yearStart)) + this.yearStart; // 1980 ~ 2019
        const month = Math.floor(Math.random() * 12) + 1; // 1 ~ 12
        const day = Math.floor(Math.random() * 28) + 1; // 1 ~ 28

        return `${year}-${month}-${day}`
    }
}

module.exports = BirthdateGen;
