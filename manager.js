//manager view for bamazon cli

const prompt = require('./prompt').manager;
const db = require('./sqlHelper')();
const colors = require('colors');
const t = require('console.table');

const router = [
  viewProducts,
  viewLow,
  addInven,
  newItem,
  process.exit
];

function intro() {
  prompt.mIntro().then(res => router[res]())
}

async function viewProducts() {
  //log inventory to console

  console.log(t.getTable(await db.inventory()));
  intro()
}

async function viewLow() {
  //filter inventory for low stock items

  let inventory = await db.inventory();
  let low = [];

  inventory.map(item => {
    if (item.stock < 5) {
      low.push(item);
    }
  });

  console.log(
    low.length ?
      t.getTable(low)
      : 'Stock on all items is adequate'.green
  );

  intro()
}

async function addInven() {
  //prompt new product info and create new db row

  let inventory = await db.inventory();
  let items = await prompt.mInvenChecklist(
    inventory.map(
      data => `${data.id}. name: ${data.name} stock: ${data.stock}`
    )
  );

  if (items.length > 0) {
    console.log('---TO BE RESTOCKED---'.green);
    console.log(
      t.getTable(items.map(data => {
          return {
            item: inventory[data - 1].name,
            current_stock: inventory[data - 1].stock
          }
        })
      )
    )
  }

  else {
    console.log('NO ITEMS SELECTED'.red);
    return intro();
  }

  if (await prompt.mInvenConf()) {
    updateStock().then(() => {
      console.log('INVENTORY COUNT COMPLETE'.green);
      return viewProducts();
    });
  }

  else {
    return intro();
  }

  async function updateStock() {
    //alter inventory table info with added stock

    for (let i = 0; i < items.length; i++) {
      let newStock = await prompt.mInvenAmount(inventory[items[i] - 1]);
      await db.updateStock(
        inventory[items[i] - 1].stock + newStock,
        items[i]
      );
    }
  }
}

async function newItem() {
  //prompt new item info and append to db

  let categories = await db.command('get_categories_admin');
  let category = await prompt.mAddCat(
    categories.map(data => data.CATEGORY)
  );
  let name = await prompt.mAddProd('Product Name: ');
  let price = await prompt.mAddProd('Product Price: ');
  let stock = await prompt.mAddProd('Initial Stock: ');

  [category, name, price, stock].forEach(val => {
    if (!val) {
      console.log('invalid value');
      return intro();
    }
  });

  await db.newProduct([category, name, price, stock]);

  if (await prompt.mBlankConfirm('add another product?')) {
    return newItem();
  }
  else {
    return intro();
  }
}


console.log('hey boss :)\n'.green);
intro();