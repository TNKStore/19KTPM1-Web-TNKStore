let category = [];
let id = 0;

function addCategory(name, image, description) {
    category[id] = {
        id: id, name: name,
        image: image
    }
    ++id;
}

addCategory("Laptop", 'https://toplist.vn/images/800px/dia-chi-mua-may-tinhlaptop-uy-tin-nhat-o-tp-pleiku-gia-lai-680888.jpg')
addCategory("Chuột + Lót chuột", 'https://salt.tikicdn.com/ts/product/31/0d/54/aaaad904c0428d75f714c873d2da3da8.jpg')
addCategory("Bàn phím", 'data:image/jpeg;base64,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')
addCategory("Loa & Tai nghe", 'https://cf.shopee.vn/file/a789adef69b887a49ade3d901796f607')

addCategory("Tai nghe Gaming", 'https://cf.shopee.vn/file/6fe73ec2f6a4d12c9c357645293e3d17')

addCategory("Màn hình", 'https://salenhanh.com/wp-content/uploads/2020/03/man-hinh-game-thu.jpg')


function getCategory() {
    return category
}

module.exports = {
    addCategory,
    getCategory
}