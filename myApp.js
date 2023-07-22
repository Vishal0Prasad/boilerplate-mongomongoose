require('dotenv').config();
let mongoose = require("mongoose");

let Person;

mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true, useUnifiedTopology: true })
.then((res) => {
  console.log("Success")
})
.catch((err) =>{
  console.log(err);
});

let personSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]
});

Person = mongoose.model("Person",personSchema);

const createAndSavePerson = (done) => {
  let person = new Person({
    name:"Vishal Prasad",
    age: 26,
    favoriteFoods: ["Masala Dosa"]
  })

  person.save()
  .then((doc) => {
    done(null, doc);
  })
  .catch((err) => {
    done(err);
  })

};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople)
  .then((docs) => {
    done(null, docs);
  })
  .catch((err) => {
    done(err);
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({
    name: personName
  },function(err,docs){
    if(docs){
      console.log(docs);
      done(null, docs);
    }
    if(err){
      console.log(err);
      done(err);
    }
  })
  // done(null /*, data*/);
};

const findOneByFood = (food, done) => {
  Person.findOne({
    favoriteFoods: food
  },function(err,docs){
    if(docs){
      console.log(docs);
      done(null, docs);
    }
    if(err){
      console.log(err);
      done(err);
    }
  })
  // done(null /*, data*/);
};

const findPersonById = (personId, done) => {
  Person.findById({
    _id: personId
  },function(err,docs){
    if(docs){
      console.log(docs);
      done(null, docs);
    }
    if(err){
      console.log(err);
      done(err);
    }
  })
  // done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({
    _id: personId
  }, function(err, person){
    person.favoriteFoods.push(foodToAdd);
    person.save()
    .then((docs) => {
      console.log(docs);
      done(null, docs);
    })
    .catch((err) => {
      console.log(err);
      done(err);
    });
  })
  // done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({
    name: personName
  }, {
    age: ageToSet
  },{
    new: true
  },function(err, person){
    console.log("Person",person);
    // console.log("Err",err);
    if(err){
      console.log(err);
      done(err);
    }
    if(person){
      // person.age = ageToSet;
      done(null,person);
    }
    // person.save({})
    // .then((doc) => {
    //   console.log(doc);
    //   done(null, doc);
    // })
    // .catch((err) => {
    //   console.log(err);
    //   done(err);
    // })
  })
  // done(null /*, data*/);
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove({
    _id: personId
  },function(err,person){
    if(err){
      console.log(err);
      done(err);
    }
    if(person){
      console.log(person);
      done(null, person);
    }
    
  })
  // done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({
    name: nameToRemove
  }, function(err, doc){
    if(err){
      console.log(err);
      done(err);
    }
    if(doc){
      console.log(doc);
      done(null, doc);
    }
  })

  // done(null /*, data*/);
};
function compare( a, b ) {
  if ( a.name < b.name ){
    return -1;
  }
  if ( a.name > b.name ){
    return 1;
  }
  return 0;
}
const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({
    favoriteFoods: foodToSearch
  })
  .then((docs) => {
    return docs.sort(compare);
  })
  .then((docs) => {
    return docs.slice(0,2);
  })
  .select()
  .exec()
  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
