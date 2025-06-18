const { JsonWebTokenError } = require('jsonwebtoken');
const Users = require('../models/Users');
const bcrypt = require('bcryptjs');
const jwt = require ('jsonwebtoken');




exports.register = async (req, res) => {
    try {
        // 1. Check user
        const { name, password } = req.body;

        var user = await Users.findOne({ name });

        if (user) {
            return res.status(400).send('User Already Exists!!!');
        }

        // 2. Encrypt
        const salt = await bcrypt.genSalt(10);

        user = new Users({
            name,
            password
        });

        user.password = await bcrypt.hash(password, salt);
        console.log(user.password);

        // 3. Save
        await user.save();

        res.send('register Success');
    } catch (err) {
        console.log(err);
        res.status(500).send('server error');
    }
};

exports.login = async (req, res) => {
    try {
        const { name, password } = req.body;

var user = await Users.findOneAndUpdate({ name }, {}, { new: true });

console.log(user);

if (user) {
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(400).send('Password Invalid!!!');
    }
    //2.
   var payload = {
  user: {
    name: user.name
  }
}

// 3. Generate
jwt.sign(payload, 'jwtsecret', { expiresIn: 10 }, (err, token) => {
  if (err) throw err;
  res.json({ token, payload })
})
}else{
  return res.status(400).send('User not found!!!')
}
    } catch (err) {
        console.log(err);
        res.status(500).send('server error');
    }
};
