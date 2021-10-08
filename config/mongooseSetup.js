const mongoose = require('mongoose');

const urlString = 'mongodb://localhost:27017/SharedTrip';

main().catch(err => console.log(err));

async function main(){

  await  mongoose.connect(urlString, {useNewUrlParser: true, useUnifiedTopology: true});

}


const db = mongoose.connection;
db.on('error', console.error.bind(console,'connection error:'));
db.once('open', function(){
    console.log('db connected');
})

module.exports = db;