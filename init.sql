DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

DROP TABLE IF EXISTS inventory;

CREATE TABLE inventory(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(20) NULL,
    price INT NULL,
    stock INT NULL,
    category VARCHAR(20) NULL,
    PRIMARY KEY (id)
);

CREATE TABLE customers(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(20) NULL,
  PRIMARY KEY(id)
);

INSERT INTO inventory (name, price, stock, category)
VALUES ('toaster', 50, 20, 'appliances');

INSERT INTO inventory (name, price, stock, category)
VALUES ('lamp', 30, 20, 'appliances');

INSERT INTO inventory (name, price, stock, category)
VALUES ('refridgerator', 2000, 20, 'appliances');

INSERT INTO inventory (name, price, stock, category)
VALUES ('light bulb', 5, 20, 'appliances');

INSERT INTO inventory (name, price, stock, category)
VALUES ('drying rack', 50, 20, 'appliances');

INSERT INTO inventory (name, price, stock, category)
VALUES ('blender', 60, 20, 'appliances');

INSERT INTO inventory (name, price, stock, category)
VALUES ('microwave', 200, 20, 'appliances');

INSERT INTO inventory (name, price, stock, category)
VALUES ('tv', 600, 20, 'electronics');

INSERT INTO inventory (name, price, stock, category)
VALUES ('video game console', 400, 20, 'electronics');

INSERT INTO inventory (name, price, stock, category)
VALUES ('stereo', 300, 20, 'electronics');

INSERT INTO inventory (name, price, stock, category)
VALUES ('laptop', 700, 20, 'electronics');

INSERT INTO inventory (name, price, stock, category)
VALUES ('moniter', 300, 20, 'electronics');

INSERT INTO inventory (name, price, stock, category)
VALUES ('guitar', 500, 20, 'music');

INSERT INTO inventory (name, price, stock, category)
VALUES ('bass', 600, 20, 'music');

INSERT INTO inventory (name, price, stock, category)
VALUES ('drums', 1000, 20, 'music');

INSERT INTO inventory (name, price, stock, category)
VALUES ('guitar picks', 8, 20, 'music');

INSERT INTO inventory (name, price, stock, category)
VALUES ('drum sticks', 10, 20, 'music');

INSERT INTO inventory (name, price, stock, category)
VALUES ('guitar strings', 12, 20, 'music');
