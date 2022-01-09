const billService = require("../bill/billService");

exports.getOrder = async (req, res, next) => {
    if (req.query['not-found'] !== undefined) {
        return res.render('bill/bill-detail', {
            notFound: true
        });
    }
    const id = parseInt(req.query.id) || false;

    if (id) {
        const bill = await billService.getBill(id, req.user.id);

        if (bill) {
            return res.render('bill/bill-detail', {
                bill
            });
        }
    }
    res.redirect('/bill?not-found');
}