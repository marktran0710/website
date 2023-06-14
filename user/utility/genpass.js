const bcrypt = require('bcrypt');
const saltRounds = 10;
const plaintextPassword = '123';

bcrypt.hash(plaintextPassword, saltRounds, function (err, hash) {
    if (err) {
        // handle error
    } else {
        // store the salt and hash in your database for this user
        console.log('salt:', hash); // logs the first 29 characters of the hash
        console.log('hash:', hash); // logs the remaining characters of the hash
    }
});
