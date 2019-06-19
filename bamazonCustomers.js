var inquirer = require("inquirer");
var connect = require("./connect.js");
inquirer
    .prompt([{
            type: "input",
            message: "Input product id",
            name: "id"
        },
        {
            type: "input",
            message: "How many unit of the product do you want?",
            name: "units"
        }
    ]).then(function (response) {
        var query = "SELECT * FROM `products` WHERE id = ? ";
        connect.connection.query(query, [response.id], function (err, res, fields) {
            //resp = JSON.parse(JSON.stringify(res));
            var stock = res[0].stock_quantity;
            var price = res[0].price;

            //console.log(JSON.parse(stock));
            if (stock = 0) {
                console.log("We do not have stock on this particular item")
                connect.connection.end()
            } else if (res[0].stock_quantity < response.units) {
                console.log("We do not have enough in stock to purchase item")
                connect.connection.end()
            } else if (res[0].stock_quantity > parseInt(response.units)) {
                console.log("The  " + res[0].product_name + " cost " + res[0].price);
                var total = res[0].price * response.units;
                inquirer
                    .prompt([{
                        type: "confirm",
                        message: "The total is " + total.toFixed(2) + " for " + response.units + " of " + res[0].product_name + " of the product \n Do you accept the transaction ",
                        name: "con"
                    }]).then(function (buy) {



                        if (buy.con === false) {
                            console.log("The transaction was not completed")
                            connect.connection.end()
                        } else if (buy.con === true) {
                            sql = "UPDATE `products` SET stock_quantity = ? WHERE id = ? ";
                            //newStock = stock - response.units;
                            connect.connection.query(sql, [res[0].stock_quantity - response.units, res[0].id], function (err, results) {
                                if (err) throw err;
                                console.log("Tranaction Succesful");
                                connect.connection.end()

                            });

                        } else {

                            connect.connection.end();
                        }

                    });

            };

        });

    });