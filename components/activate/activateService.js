const User = require("../../models/user");

exports.activate = async (email, activationString) => {
    const user = await User.findOne({
        where: {
            email: email,
            activationString: activationString
        }
    });

    if (!user) {
        return false;
    }

    await User.update({
        activated: 1
    }, {
        where: {
            email: email,
            activationString: activationString
        }
    });

    return true
}