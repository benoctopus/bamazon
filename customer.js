//customer view for bamazon cli
const db = require('./sqlHelper')();
const shoppingCart = require('./cart')();
const prompt = require('./prompt').customer;
const t = require('console.table');
const colors = require('colors');
let inventory;

const itemTemp = data => (
  //single item display template string
  `id: ${data.id} item: ${data.name} ` +
  `price: $${data.price} stock: ${data.stock}`
);

const router = {
  //routing functions for intro menu
  //was originally planning on using for other functionality
  //but it became redundant
  intro: [
    shop,
    checkout,
    process.exit
  ]
};

function intro() {
  console.log(t.getTable(inventory), '\n\n');
  prompt.cIntro()
    .then(rout => router.intro[rout]())
}

async function shop() {
  //shop runtime and handling

  //department switch
  let category = await PromptCat();
  if (category === 'back') {
    return intro();
  }

  //item picker & out of stock protection
  let item = await promptItem();
  if (item === 'back') {
    return shop();
  }
  else if (!inventory[item].stock) {
    console.log('\nITEM SOLD OUT\n'.red);
    return shop();
  }

  //quantity picker
  let quantity = await promptQuantity();
  console.log(
    quantity > 0 ?
      '\nadded to cart\n'.green
      : '\nnothing added\n'.red
  );

  //add to cart and prosper
  shoppingCart.append(
    inventory[item],
    quantity
  );
  showCart();

  return (
    //continue?
    await prompt.cShopCont() ?
      shop
      : intro
  )();


  //async help functions
  async function PromptCat() {
    return await prompt.cShopCat(
      await db.command('get_categories')
        .then(data => data.map(data => data.CATEGORY))
    );
  }

  async function promptItem() {
    return await prompt.cShopItems(
      await db.command('get_items', [category])
        .then(data => data.map(data => itemTemp(data))
        )
    );
  }

  async function promptQuantity() {
    let q = await prompt.cShopQuantity(
      t.getTable(inventory[item])
    );
    //dont sell stuff we dont have
    if (typeof q !== 'number' || q > inventory[item].stock) {
      console.log('\ninvalid quanitity, try again\n'.red);
      return await promptQuantity()
    }
    else {
      return q
    }
  }
}

async function checkout() {

  if (Object.keys(shoppingCart.cart).length > 0) {
    showCart();

    if (!!(await prompt.cCheck())) {
      updateDatabase().then(() => {
        console.log('purchase complete');
        shoppingCart.clear();
        updateInventory();
      })
    }

    else {
      intro()
    }
  }
  else {
    console.log('NO ITEMS IN CART'.red);
    intro();
  }

  async function updateDatabase() {
    //loop through cart items and update inventory
    for (let i = 0; i < Object.values(shoppingCart.cart).length; i++) {
      let obj = Object.values(shoppingCart.cart)[i];
      await db.updateStock(
        obj.item.stock - obj.quantity,
        obj.item.id
      ).then(res => res);
    }
  }
}

function showCart() {
  console.log(
    t.getTable(shoppingCart.readableExport())
  );
  console.log('Total: ' + shoppingCart.finalTotal())
}

function updateInventory() {
  db.inventory().then(data => {
    inventory = data;
    intro()
  });
}

//init
console.log('\n----WELCOME TO BAMAZON----\n'.green);
updateInventory();
