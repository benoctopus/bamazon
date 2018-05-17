const prompt = require('./prompt').supervisor;
const db = require('./sqlHelper')();
const colors = require('colors');
const t = require('console.table');

function intro() {
  //trying something new

  prompt.sIntro().then(res => (
    !res ?
      viewSales
      : !(res - 1) ? newDep : process.exit
  )())
}

async function viewSales() {

  let inventory = await db.inventory();
  let departmentsObj = {};

  let departmentsArr = await db.command('get_departments')
    .then(res => res.map(data => {
      data.product_sales = 0;
      data.total_profit = 0;
      return data;
    }));

  departmentsArr.map(data => {
    departmentsObj[data.name] = data;
  });

  inventory.map(data => {
    if (data.sales) {
      departmentsObj[data.category].product_sales += data.sales;
    }
  });

  Object.keys(departmentsObj).map((key) => {
    departmentsObj[key]
      .total_profit =
      departmentsObj[key].product_sales
      - departmentsObj[key].overhead;
  });

  console.log(
    t.getTable(Object.values(departmentsObj))
  );

  return intro();
}

async function newDep() {
  let name = await prompt.sAddDep('Department Name:');
  let overhead = await prompt.sAddDep('Expected department Overhead:');
  db.command('new_department', [name, overhead])
    .then(() => intro())
    .catch(e => {
      console.log('an error occured', e);
      return intro();
    })
}

intro();