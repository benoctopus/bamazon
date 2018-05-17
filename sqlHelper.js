//helper class for mysql

class Helper {

  constructor() {

    const sql = require('mysql');
    this.fs = require('fs');

    this.connection = sql.createConnection({
      multipleStatements: true,
      host: 'localhost',
      user: 'benoctopus',
      password: '',
      database: 'bamazon',
    });

    this.connection.connect(null, e => {
      if (e) throw e;
    });

    this.params = {
      //database command abstraction

      check:
        'SHOW DATABASES;',

      get_categories:
        'SELECT DISTINCT(category) AS CATEGORY FROM inventory',

      get_categories_admin:
        'SELECT DISTINCT(name) AS CATEGORY FROM departments',

      get_items:
        'SELECT * FROM inventory WHERE category = ?',

      get_all_items:
        `SELECT * FROM inventory;`,

      get_departments:
        `SELECT * FROM departments;`,

      get_sales:
        'SELECT sales,category FROM inventory',

      change_stock:
        "UPDATE inventory SET stock='?',sales='?' WHERE id='?'",

      add_stock:
        "UPDATE inventory SET stock='?' WHERE id='?'",

      new_product: `
        INSERT INTO inventory (category, name, price, stock)
        VALUES (?, ?, ?, ?);
        `,

      new_department: `
        INSERT INTO departments (name, overhead)
        VALUES (?, ?);
        `,

      create_history: `
        CREATE TABLE ben(
          action_id INT NOT NULL AUTO_INCREMENT,
          action VARCHAR(30) NULL,
          PRIMARY KEY (action_id)
        );
        `

    };

  }

  command(func, args = []) {
    //send command to db return promise to main
    return new Promise(resolve => this.connection.query(
      this.params[func], args, (err, data) => {
        if (err) throw err;
        resolve(data);
      })
    );
  }

  //lightweight abstractions for common commands

  inventory() {
    return this.command('get_all_items');
  }

  newProduct(args) {
    return this.command('new_product', args);
  }

  updateStock(arg1, arg2, arg3) {
    if (!arg3) {
      return this.command('add_stock', [arg1, arg2])
    }
    else {
      return this.command('change_stock', [arg1, arg2, arg3])
    }
  }
}

module.exports = () => new Helper();

// connect = module.exports();
//
// connect.command('get_items', ']).then(data => console.log(data));

