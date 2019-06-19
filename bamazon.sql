DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(

    id INTEGER(50) NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NULL,
    price FLOAT(18,2)  NULL,
    stock_quantity INTEGER(50) NULL,
    PRIMARY KEY (id)

);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUE ("headphones", "electronics",100.99,10), 
      ("shoes","clothing",59.99,15),
      ("shirt","clothing",12.99,20),
      ("doku-HD_50-inch","electronics",699.99,12),
      ("How-to-Code","Books&Audible",45.99,2),
      ("Rustic-FoldableTable","Furniture",110.99,5),
      ("MackBookPro-15","Laptops",2100.99,4),
      ("Moon-rock","etc",45.90,9),
      ("HandDrill","Tools",70.00,16),
      ("Watch","Wearable",133.33,7)
