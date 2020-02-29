const fileSystem = require('fs');
const path = require('path');
const rootDirectory = require('../util/path');
const filePath = path.join(rootDirectory, 'data', 'products.json');

const sqlDB = require('../util/sql_database');
const Sequelize = require('sequelize');
const sequelize = require('../util/sql_database');
// const products = [];
const Cart = require('./cart');

const getProductsFromFile = (callback) => {
    fileSystem.readFile(filePath, (error, fileContents) => {
        if (error) {
            callback([]);
        } else {
            callback(JSON.parse(fileContents));
        }
    });
}

class Product {
    constructor(id, title, imageUrl, description, price) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        // products.push(this);
        /* fileSystem.readFile(filePath, (error, fileContents) => {
            let products = [];
            if (!error) {
                products = JSON.parse(fileContents);
            }
            products.push(this);
            fileSystem.writeFile(filePath, JSON.stringify(products), (error) => {
                if (error) {
                    // process error
                }
            });
        }); */

        getProductsFromFile(products => {
            if (this.id) {
                const existingProductIndex = products.findIndex(product => product.id === this.id);
                const updatedProducts = [...products];
                updatedProducts[existingProductIndex] = this;
                fileSystem.writeFile(filePath, JSON.stringify(updatedProducts), (error) => {
                    if (error) {
                        console.log('error updating product data in json file: ', error);
                    }
                });
            } else {
                this.id = (Math.floor(Math.random() * 100)).toString();
                products.push(this);
                fileSystem.writeFile(filePath, JSON.stringify(products), (error) => {
                    if (error) {
                        console.log('error writting product data in json file: ', error);
                    }
                });
            } 
        });
    }

    saveDataSequelly() {
        return sqlDB.execute('INSERT INTO products (title, price, description, imageUrl) VALUES (?, ?, ?, ?)',
        [this.title, this.price, this.description, this.imageUrl]);
    }

    static deleteById(id) {
        getProductsFromFile(products => {
            const product = products.find(prod => prod.id === id);
            const updatedProducts = products.filter(product => product.id !== id);
            if (updatedProducts) {
                fileSystem.writeFile(filePath, JSON.stringify(updatedProducts), (error) => {
                    if (error) {
                        console.log('error writting product data after deleting in json file: ', error);
                    } else {
                        Cart.deleteProduct(id, product.price);
                    }
                });
            }
        });
    }

    static fetchAll(callback) {
        getProductsFromFile(callback);
        /* use callback instead since it is an async operation
        fileSystem.readFile(filePath, (error, fileContents) => {
            if (error) {
                callback([]);
            }
            callback(JSON.parse(fileContents));
        }); */
        // return products;
    }

    static fetchAllSequelly() {
        return sqlDB.execute('SELECT * FROM products');
    }

    static findProductById(id, cb) {
        console.log('PRODUCT MODEL: fetching details of product with id: ', id);
        getProductsFromFile(products => {
            const product = products.find(p => p.id === id);
            if (product) {
                cb(product);
            } else {
                cb([]);
            }
        });
    }

    static findProductByIdSequelly(id) {
        return sqlDB.execute('SELECT * FROM products p WHERE p.id=?', [id]);
    }
}

const ProductSequel = sequelize.define('product_sequelize', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    description: Sequelize.STRING, 
    imageUrl: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

// module.exports = Product;
module.exports = ProductSequel;