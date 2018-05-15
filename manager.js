const prompt = require('./prompt').manager;
const db = require('./sqlHelper')();
const colors = require('colors');
const t = require('console.table');

const router = [
  viewProducts,
  viewLow,
  addInven,
  newItem
];

function intro() {
  prompt.mIntro().then(res => router[res]())
}

async function viewProducts() {

  console.log(t.getTable(await db.inventory()));
  intro()
}

async function viewLow() {

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

function addInven() {

}

function newItem() {
}

console.log('hey boss :)\n'.green);
intro();