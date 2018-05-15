module.exports = () => new Helper();

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

      check:
        'SHOW DATABASES;',

      get_categories:
        'SELECT DISTINCT(category) AS CATEGORY FROM inventory',

      get_items:
        'SELECT * FROM inventory WHERE category = ?',

      get_all_items:
        `SELECT * FROM inventory;`,

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
    return new Promise(resolve => this.connection.query(
      this.params[func], args, (err, data) => {
        if (err) throw err;
        resolve(data);
      })
    );
  }

  inventory() {
    return this.command('get_all_items');
  }

  createCustomer(name) {
    this.command('create_customer', [name]);
  }
}


// connect = module.exports();
//
// connect.command('get_items', ']).then(data => console.log(data));

