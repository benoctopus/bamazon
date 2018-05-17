# Bamazon CLI

Mock Mock amazon cli app with customer, manager, and supervisor views.

## Installation

The app requires that you have the following installed:

- mysql server
- node.js
- npm

In order to run the app you must clone this repository, download the npm dependencies, and run the `init.sql` script.

## Instructions

the main runtime files include customer.js, manager.js, and supervisor.js. To run any of them you must use the command `$ node [filename]` 

In the customer view, the cli wil guide you through the process of adding items to your cart, and then checking them out from your cart once you are finished. tThe manager view functions a similar way, except it gives you the option to add stock to inventory items in the database, and to add entirely new projects to the database. The supervisor view will retrieve information from the database regarding product sales and department overhead. The supervisor view will also allow you to add entirely new departments to the database.

All views pull and update data from the same mysql server database, and changes made in any of the programs will be reflected in the others.

## Dependencies

npm packages:

- mysql
- inquirer
- colors
- console.table