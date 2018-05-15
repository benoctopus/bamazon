const prompt = require('inquirer').prompt;

module.exports = {

  ask(message, options, type) {
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
  },

  CIntro() {
    return new Promise(resolve => this.ask(
      'What can we help you with?',
      ['1. Shop', '2. checkout', '3. quit']
    ).then(res => {
      resolve(parseInt(res.input.split('. ')[0]) - 1);
    }));
  },

  CShopCat(options) {
    options.push('back');
    return new Promise(resolve => this.ask(
      'What department would you like to visit?',
      options
    ).then(res => resolve(res.input)));
  },

  CShopItems(options) {
    return new Promise(resolve => this.ask(
      'What would you like to add to your cart?',
      options
    ).then(res => resolve(
      res.input !== 'back' ?
        parseInt(res.input.split(' ')[1])
        : 'back'
    )));
  },

  CShopQuantity(itemTable) {
    return new Promise(resolve => this.ask(
      itemTable + '\n how many would you like?',
      null,
      'input'
    ).then(res => resolve(parseInt(res.input))));
  },

  CShopCont() {
    return new Promise(resolve => this.ask(
      'continue shopping?'
    ).then(res => resolve(res.input)))
  },

  CCheck() {
    return new Promise(resolve => this.ask(
      'Complete purchase?'
    ).then(res => resolve(res.input)))
  }
};
