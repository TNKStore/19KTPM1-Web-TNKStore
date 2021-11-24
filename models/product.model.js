let product = [];
let id = 0;

function addProduct(name, image, price, oldPrice, description) {
    product[id] = {
        id: id,
        name: name,
        image: image,
        price: price,
        oldPrice: oldPrice,
        description: description
    }
    ++id;
}

let description = "Dù có mức giá rất bình dân nhưng Chuột Logitech G102 " +
    "Lightsync RGB lại được trang bị led  RGB 16,8 triệu màu .Chọn một màu " +
    "hay trộn 3 màu, hiệu ứng có sẵn hay tạo hiệu ứng của riêng bạn . Sự lựa " +
    "chọn là của bạn ! Bạn còn có thể đồng bộ chuột với thiết bị LIGHTSYNC " +
    "của Logitech G khác giúp góc máy trở nên đồng bộ và độc đáo hơn."

addProduct('Chuột Logitech G Pro Hero ',
    [
        'https://product.hstatic.net/1000026716/product/gvn_gpro_e1f879374ab24024a063a40112fd0a9f.png',
        'https://product.hstatic.net/1000026716/product/gvn_gprob_e6888bfbd46f417ebf5f4aaca0969673.jpg',
        'https://product.hstatic.net/1000026716/product/gvn_gproa_958db0b8cd644e37a7c78c484dc2c325.jpg',
        'https://product.hstatic.net/1000026716/product/gvn_gproa_958db0b8cd644e37a7c78c484dc2c325.jpg'
    ],
    99,
    149,
    description)
addProduct('Logitech G102',
    ['https://product.hstatic.net/1000026716/product/logitech-g102-lightsync-rgb-black-1_bf4f5774229c4a0f81b8e8a2feebe4d8.jpg'],
    99,
    149,
    description)
addProduct('Chuột Logitech G502 Hero ',
    ['https://product.hstatic.net/1000026716/product/gearvn_logitech_g502hero.png',
        'https://product.hstatic.net/1000026716/product/logitech-g502-hero-gaming-mouse-debuts-600x566.jpg'],
    99,
    149,
    description)
addProduct('Logitech G402 Hyperion',
    ['https://product.hstatic.net/1000026716/product/gearvn-logitech-g402-hyperion-fury-ultra-fast-666_4a355fb41b804b15a858496e007e80b2.png'],
    99,
    149,
    description)
addProduct('Logitech G403 HERO',
    ['https://product.hstatic.net/1000026716/product/gvn_logitech_g403h__2__3240b3aa76cf4758af0f98cc46c372ff.jpg'],
    99,
    149,
    description)
addProduct('Logitech G102 Lightsync RGB ',
    ['https://product.hstatic.net/1000026716/product/logitech-g102-lightsync-rgb-white-1_eb113ff7e83b4289812fb9bff7034b4d.jpg'],
    99,
    149,
    description)
addProduct('Logitech G304 Wireless ',
    ['https://product.hstatic.net/1000026716/product/gvn_log_g304_3df28cd60a48412b8fb1d2ff762dc6a9.png'],
    99,
    149,
    description)
addProduct('Logitech G Pro Wireless',
    ['https://product.hstatic.net/1000026716/product/gvn_logitech_gpro_wless_3d113e4c2ea74904bb2b01fd6d75be84.png'],
    99,
    149,
    description)
addProduct('Logitech G Pro X Wireless ',
    ['https://product.hstatic.net/1000026716/product/gearvn-chuot-logitech-g-pro-x-superlight-wireless-black-4_88b86530a83d4c71b510f37427886a49.jpg'],
    99,
    149,
    description)

function getProducts() {
    return product
}

module.exports = {
    addProduct,
    getProducts
}