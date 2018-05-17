//exports a collection of user prompts
//all return promises

const prompt = require('inquirer').prompt;

function ask(message, options, type) {
  //main prompt template
  return prompt([
    {
      name: 'input',
      message,
      choices: options ? options : null,
      type: !type ?
        options ? 'list' : 'confirm'
        : type
    }
  ])
}

module.exports = {

  customer: {
    //customer view prompts

    ask,

    cIntro() {
      return new Promise(resolve => this.ask(
        'What can we help you with?',
        ['1. Shop', '2. checkout', '3. quit']
      ).then(res => {
        resolve(parseInt(res.input.split('. ')[0]) - 1);
      }));
    },

    cShopCat(options) {
      options.push('back');
      return new Promise(resolve => this.ask(
        'What department would you like to visit?',
        options
      ).then(res => resolve(res.input)));
    },

    cShopItems(options) {
      return new Promise(resolve => this.ask(
        'What would you like to add to your cart?',
        options
      ).then(res => resolve(
        res.input !== 'back' ?
          parseInt(res.input.split(' ')[1]) - 1
          : 'back'
      )));
    },

    cShopQuantity(itemTable) {
      return new Promise(resolve => this.ask(
        itemTable + '\n how many would you like?',
        null,
        'input'
      ).then(res => resolve(parseInt(res.input))));
    },

    cShopCont() {
      return new Promise(resolve => this.ask(
        'continue shopping?'
      ).then(res => resolve(res.input)))
    },

    cCheck() {
      return new Promise(resolve => this.ask(
        'Complete purchase?'
      ).then(res => resolve(res.input)))
    }
  },

  manager: {
    //manager view prompts

    ask,

    mIntro() {
      return new Promise(resolve => this.ask(
        '---Main Menu---'.green,
        [
          '1. View Products',
          '2. View Low Inventory',
          '3. Add Inventory',
          '4. Add New Product',
          '5. Quit'
        ]
      ).then(res => resolve(parseInt(res.input.split('. ')[0]) - 1)))
    },

    mInvenChecklist(options) {
      return new Promise(resolve => this.ask(
        "choose items to stock",
        options,
        'checkbox'
      ).then(res => resolve(
        res.input.map(data => parseInt(data.split('.')[0]))
      )));
    },

    mInvenConf() {
      return new Promise(resolve => ask(
        'Are these item(s) correct?'
      ).then(res => resolve(res.input)))
    },

    mAddCat(options) {
      options.push('back');
      return new Promise(resolve => this.ask(
        'department: ',
        options
      ).then(res => resolve(res.input)));
    },

    mInvenAmount(item) {
      return new Promise(resolve => ask(
        `amount of ${item.name} (current stock: ${item.stock})`,
        null,
        'input'
      ).then(res => resolve(parseInt(res.input))))
    },

    mAddProd(message) {
      return new Promise(resolve => ask(
        message,
        null,
        'input'
      ).then(res => resolve(res.input)))
    },

    mBlankConfirm(message) {
      return new Promise(resolve => ask(
        message,
        null,
      ).then(res => resolve(res.input)))
    },
  },

  supervisor: {

    ask,

    sIntro() {
      let options = [
        '1. View Product Sales by Department',
        '2. Create New Department',
        '3. quit'
      ];
      return new Promise(resolve => ask(
        '---Main Menu---'.green,
        options
      ).then(res => resolve(options.indexOf(res.input))))
    },

    sAddDep(message) {
      return new Promise(resolve => ask(
        message,
        null,
        'input'
      ).then(res => resolve(res.input)))
    },
  }
};