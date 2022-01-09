const Status = require('../../models/status')

exports.getStatusByName = (name) => Status.findOne({
    where: {
        name: name
    }
})