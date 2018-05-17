const prompt = require('inquirer').prompt;

prompt([
  {
    name: 'input',
    type: 'list',
    message: 'Select Program: ',
    choices: ['customer', 'manager', 'supervisor']
  }
]).then(res => {
  if (res.input === 'customer') {
    require('./customer');
  }
  else if (res.input === 'manager') {
    require('./manager');
  }
  else {
    require('./supervisor');
  }
});

