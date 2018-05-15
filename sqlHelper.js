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

      get_items:
        'SELECT * FROM inventory WHERE category = ?',

      get_all_items:
        `SELECT * FROM inventory;`,

      change_stock:
        "UPDATE inventory SET stock='?' WHERE id='?'",

      create_customer: `
        INSERT INTO customers (name)
        VALUES (?);
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

  updateStock(number, id) {
    return this.command('change_stock', [number, id])
  }
}

module.exports = () => new Helper();

// connect = module.exports();
//
// connect.command('get_items', ']).then(data => console.log(data));

