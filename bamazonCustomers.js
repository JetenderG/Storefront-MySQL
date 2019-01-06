var inquirer = require("inquirer");
connect = require("./connect.js");
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
            resp = JSON.parse(JSON.stringify(res));
            stock = parseInt(res[0].stock_quantity);
            price = res[0].price;

            //console.log(JSON.parse(stock));
            console.log(response.units)
            console.log(stock);
            console.log(res[0].price)
            console.log(9);

            if (err)
                throw err;

            if (stock = 0) {
                console.log("We do not have stock on this particular item")
                connect.connection.end()
                /*} else if (8 = 8) {
                            console.log("We do not have enough in stock to purchase item")
                            connect.connection.end()
                        } 
            
                        */
            } else if (stock = stock) {
                console.log("The  " + res[0].product_name + " cost " + res[0].price);
                total = price * response.units;
                inquirer
                    .prompt([{
                        type: "confirm",
                        message: "The total is " + total + " for " + res[0].product_name + " of the product /n Do you accept the transaction ",
                        name: "confirm"
                    }]).then(function (buy) {
                        if (buy.confirm === false) {
                            console.log("The transaction was not completed")
                            connect.connection.end()
                        } else if (buy.confirm === true) {
                            sql = "UPDATE `products` SET stock_quantity = ? WHERE id = ? ";
                            newStock = stock - response.units;
                            console.log(newStock);
                            connect.connection.query(sql, [stock = stock - response.units, res[0].id], function (err, results) {
                                if (err) throw err;
                                console.log(results);
                                connect.connection.end()

                            });

                        };

                    });

            };

        });

    });