const route = require('express').Router();
const rijndael = require('./../controllers/rijndael');
/*
* authAcl ( authentication with access control routes )
* authPassport ( only authentication )
*/

let array = {
  'users': 'users',
}

for (let item in array) {
  route.use('/' + array[item],require('./' + item));
}
route.use('/rijndael', require('./rijndael'));



module.exports = route
