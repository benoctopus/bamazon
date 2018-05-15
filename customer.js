const prompt = require('./prompt');
const db = require('./sqlHelper')();
const shoppingCart = require('./cart')();
const t = require('console.table');
const colors = require('colors');
let inventory;

const itemTemp = data => (
  `id: ${data.id} item: ${data.name} ` +
  `price: $${data.price} stock: ${data.stock}`
);

const router = {
  intro: [
    shop,
    checkout,
    db.kill
  ]
};

function intro() {
  console.log('\n----WELCOME TO BAMAZON----\n'.green);
  console.log(t.getTable(inventory), '\n\n');
  prompt.CIntro()
    .then(rout => router.intro[rout]())
}

async function shop() {
  //shop runtime and handling

  let category = await PromptCat();
  if (category === 'back') {
    return intro();
  }

  let item = await promptItem();
  if (item === 'back') {
    return shop();
  }

  let quantity = await promptQuantity();
  console.log(
    quantity > 0 ?
      '\nadded to cart\n'.green
      : '\nnothing added\n'
  );

  shoppingCart.append(
    inventory[item],
    quantity
  );
  showCart();

  return (
    await prompt.CShopCont() ?
      shop
      : intro
  )();


  //async help functions
  async function PromptCat() {
    return await prompt.CShopCat(
      await db.command('get_categories')
        .then(data => data.map(data => data.CATEGORY))
    );
  }

  async function promptItem() {
    return await prompt.CShopItems(
      await db.command('get_items', [category])
        .then(data => data.map(data => itemTemp(data))
        )
    );
  }

  async function promptQuantity() {
    let q = await prompt.CShopQuantity(
      t.getTable(inventory[item])
    );
    console.log(q);
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
    if (prompt.CCheck()) {
      for (let i = 0; i < Object.values(shoppingCart.cart).length; i++) {
        let obj = Object.values(shoppingCart.cart)[i];
        await db.updateStock(
          obj.item.stock - obj.quantity,
          obj.item.id
        )
      }
    }
    else {
      intro()
    }
  }
  else {
    console.log('No items in cart'.red);
    intro();
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

updateInventory();
