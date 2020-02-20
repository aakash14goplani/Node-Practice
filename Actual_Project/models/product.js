const fileSystem = require('fs');
const path = require('path');
const rootDirectory = require('../util/path');
const filePath = path.join(rootDirectory, 'data', 'products.json');
// const products = [];

const getProductsFromFile = (callback) => {
    fileSystem.readFile(filePath, (error, fileContents) => {
        if (error) {
            callback([]);
        } else {
            callback(JSON.parse(fileContents));
        }
    });
}

module.exports = class Product {
    constructor(title, imageUrl, description, price) {
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
            products.push(this);
            fileSystem.writeFile(filePath, JSON.stringify(products), (error) => {
                if (error) {
                    // process error
                }
            }); 
        });
    }

    static fetchAll(callback) {
        getProductsFromFile(callback);
        /* fileSystem.readFile(filePath, (error, fileContents) => {
            if (error) {
                callback([]);
            }
            callback(JSON.parse(fileContents));
        }); */
        // return products;
    }
}
