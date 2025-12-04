const NameGen = require('./NameGen/NameGen');
const GenderGen = require('./NameGen/GenderGen');
const BirthdateGen = require('./NameGen/BirthdateGen');
// const AddressGen = require('./AddressGen');

const nameGen = new NameGen();
// const nameGen = new NameGen("이름후보1.txt");
// const nameGen = new NameGen("이름후보2.txt");
const newName = nameGen.generate();

const genderGen = new GenderGen("ENG");
// const genderGen = new GenderGen("KOR");
const newGender = genderGen.generate();

const birthdateGen = new BirthdateGen(2000, 2050);
const newBirthdate = birthdateGen.generate();

// const addressGen = new AddressGen();
// const newAddress = addressGen.generate();

console.log(`${newName},${newGender},${newBirthdate}`);
