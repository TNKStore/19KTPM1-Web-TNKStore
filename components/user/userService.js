const User = require("../../models/user");
const bcrypt = require("bcrypt");

function hashPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

exports.findByEmail = (email) => User.findOne({where: {email: email}})

exports.verifyPassword = (password, user) => bcrypt.compare(password, user.pwd)

exports.register = (email, firstName, lastName, password, phone, address) => {
    return User.create({
        email: email,
        firstName: firstName,
        lastName: lastName,
        pwd: hashPassword(password),
        phone: phone,
        address: address
    })
}

exports.updateInfo = (email, firstName, lastName, address, phone) => User.update({
    firstName: firstName,
    lastName: lastName,
    phone: phone,
    address: address
}, {
    where: {
        email: email
    }
})

exports.updatePassword = (email, pwd) => User.update({
    pwd: hashPassword(pwd)
}, {
    where: {
        email: email
    }
})