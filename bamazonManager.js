var inquirer = require("inquirer");
var connect = require("./connect.js");
var columnify = require("columnify")

inquirer

    .prompt([

        {
            type: "checkbox",
            message: "Manager Options:",
            choices: ["View Products for Sale", "View low Inventory", "Add to Inventory", "Add New Products"],
            name: "option"
        }

    ]).then(function (response) {
        console.log(response.option)

        connect.connection.query("SELECT * FROM `products`", function (err, res) {
            if (err) throw err; // connect.connection.end()



            var options = response.option[0];

            if (options === "View Products for Sale") {



                for (var i = 0; i < res.length; i++) {

                    var column = columnify([{

                        ID: res[i].id



                    }])

                    console.log(JSON.stringify("ID : " + res[i].id + "|   Name : " + res[i].product_name + "|  Department : " + res[i].department_name + "|  Price : " + res[i].price + "|  Stock : " + res[i].stock_quantity))


                }
                connect.connection.end();

            } else if (options === "View low Inventory") {

                connect.connection.query("SELECT * FROM `products`", function (err, res) {
                    if (err) throw err;

                    for (var i = 0; i < res.length; i++) {

                        if (res[i].stock_quantity < 5) {

                            console.log("The product " + res[i].product_name + "  has low stock!!")

                        }
                    }
                    connect.connection.end();
                })


            } else if (options === "Add to Inventory") {

                inquirer
                    .prompt([

                        {
                            type: "input",
                            message: "What is the id of product",
                            name: "idP"
                        },
                        {
                            type: "input",
                            message: "How much to add to stock",
                            name: "addS"

                        }
                    ]).then(function (inquirerRe) {
                        //////////
                        console.log(res[inquirerRe.idP - 1].id);
                        console.log(inquirerRe.addS + "-------" + res[inquirerRe.idP].stock_quantity)
                        console.log(parseInt(res[inquirerRe.idP - 1].stock_quantity) + parseInt(inquirerRe.addS))
                        var query = "UPDATE `products` SET stock_quantity = ? WHERE id = ?"
                        connect.connection.query(query, [parseInt(res[inquirerRe.idP - 1].stock_quantity) + parseInt(inquirerRe.addS), inquirerRe.idP],
                            function (err, add) {

                                if (err) throw err;
                                console.log("add");
                                connect.connection.end();

                            })



                    })
                /////////
            } else if (options === "Add New Products") {

                inquirer
                    .prompt([

                        {
                            type: "input",
                            message: "Add product name: ",
                            name: "product"
                        },
                        {
                            type: "input",
                            message: "Department Placement: ",
                            name: "department"
                        }, {
                            type: "input",
                            message: "Set price for Product:  ",
                            name: "price"
                        }, {
                            type: "input",
                            message: "The stock of the product: ",
                            name: "stock"
                        },



                    ]).then(function (newProduct) {

                        var sql = ("INSERT INTO products (product_name,department_name,price,stock_quantity) VALUES (?,?,?,?)");

                        connect.connection.query(sql, [newProduct.product, newProduct.department, newProduct.price, newProduct.stock], function (err, results) {

                            if (err) throw err;

                            console.log("add");
                            connect.connection.end();
                        })

                    })
            } else {

                connect.connection.end();
            }

        })
    })