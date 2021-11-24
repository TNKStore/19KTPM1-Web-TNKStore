const express = require('express');
const Product = require('../models/product.model')
const Category = require('../models/category.model')
const Wishlist = require('../models/wishlist.model')
const Cart = require('../models/cart.model')
const router = express.Router();

const contact = {
    address: "227 Nguyễn Văn Cừ",
    mail: "eshop@gmail.com",
    phone: "0909080808"
}

const tag = [
    "Laptop",
    "Asus",
    "Acer",
    "Chuột",
    "Bàn phím"
]

const active = " active"

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index',
        {
            title: 'TNKStore',
            product: Product.getProducts(),
            category: Category.getCategory(),
            contact: contact,
            homeActive: active
        });
});

router.get('/home', function (req, res, next) {
    res.redirect('/')
})

router.get('/product-list', function (req, res, next) {
    res.render('product/product-list',
        {
            title: 'TNKStore',
            tag: tag,
            product: Product.getProducts(),
            category: Category.getCategory(),
            contact: contact,
            shopActive: active
        });
});

router.get('/product-detail', function (req, res, next) {
    res.render('product/product-detail',
        {
            title: 'TNKStore',
            tag: tag,
            category: Category.getCategory(),
            productList: Product.getProducts(),
            product: Product.getProducts()[0],
            contact: contact
        })
});

router.get('/cart', function (req, res, next) {
    res.render('cart/cart', {
        title: 'TNKStore',
        cart: Cart.getCart(),
        contact: contact
    })
});

router.get('/checkout', function (req, res, next) {
    res.render('cart/checkout', {
        title: 'TNKStore',
        contact: contact
    })
});

router.get('/my-account', function (req, res, next) {
    res.render('account/my-account', {
        title: 'TNKStore',
        contact: contact,
        accActive: active
    })
});

router.get('/wishlist', function (req, res, next) {
    res.render('account/wishlist',
        {
            title: 'TNKStore',
            wishlist: Wishlist.getProducts(),
            contact: contact
        })
});

router.get('/login', function (req, res, next) {
    res.render('account/login', {
        title: 'TNKStore',
        contact: contact
    })
});

router.get('/signup', function (req, res, next) {
    res.render('account/signup', {
        title: 'TNKStore',
        contact: contact
    })
});

router.get('/contact', function (req, res, next) {

    res.render('contact', {
        title: 'TNKStore',
        contact: contact,
        contactActive: active
    })
});

module.exports = router;
