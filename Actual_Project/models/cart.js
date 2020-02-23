const path = require('path');
const fs = require('fs');
const rootDirectory = require('../util/path');
const filePath = path.join(rootDirectory, 'data', 'cart.json');

module.exports = class Cart {
    static addProduct(id, productPrice) {
        /* 1. fetch the previous cart */
        fs.readFile(filePath, (error, fileContents) => {
            let cart = {
                products: [],
                totalPrice: 0
            };

            if (!error) {
                console.log('CART MODEL: reading from cart file...');
                cart = JSON.parse(fileContents);
            }

            /* 2. analyze the cart - find existing products */
            const existingProductIndex = cart.products.findIndex(product => product.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            if (existingProduct) {
                // copy existing product
                updatedProduct = {...existingProduct};
                // update quantity
                updatedProduct.qty += 1;
                // update array entry with existing product...
                cart.products = [...cart.products];
                // ...with updated values
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                // create new product object
                updatedProduct = { id: id, qty: 1 };
                // update cart with initila contents + new cntent
                cart.products = [...cart.products, updatedProduct];
            }

            cart.totalPrice = cart.totalPrice + +productPrice;

            /* 3. write the cart details to file */
            fs.writeFile(filePath, JSON.stringify(cart), (error) => {
                console.log('CART MODEL: error while writing to cart file...' + error);
            });
        });
    }

    static deleteProduct(id, productPrice) {
        fs.readFile(filePath, (error, fileContents) => {
            const updatedCart = { ...JSON.parse(fileContents) };
            const product = updatedCart.products.find(prod => prod.id === id);
            if (!product) {
                return;
            }
            const productQty = product.qty;
            updatedCart.products = updatedCart.products.filter(product => product.id !== id);
            updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty;

            fs.writeFile(filePath, JSON.stringify(updatedCart), (error) => {
                console.log('CART MODEL: error while writing data after deleting to cart file...' + error);
            });
        });
    }

    static getCart(callback) {
        fs.readFile(filePath, (error, fileContents) => {
            const cart = JSON.parse(fileContents);
            if (error) {
                callback(null);
            } else {
                callback(cart);
            }
        });
    }
}