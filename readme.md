# Bamazon CLI

Mock amazon cli app with customer, manager, and supervisor views.
Demo video here: https://drive.google.com/file/d/1EmF63hNuq58DWexFyYbRfuC_y3awcoj4/view

## Installation

The app requires that you have the following installed:

- mysql server
- node.js
- npm

In order to run the app you must clone this repository, download the npm dependencies. You must also edit lines 12 and 13 of the sqlHelper.js file to contain your own mysql server login information and run `$ mysql < init.sql` terminal command in the bamazon project directory.

## Instructions

The app is run by using the command `$ node index.js` in the bamazon directory.

In the customer view, the cli wil guide you through the process of adding items to your cart, and then checking them out from your cart once you are finished. tThe manager view functions a similar way, except it gives you the option to add stock to inventory items in the database, and to add entirely new projects to the database. The supervisor view will retrieve information from the database regarding product sales and department overhead. The supervisor view will also allow you to add entirely new departments to the database.

All views pull and update data from the same mysql server database, and changes made in any of the programs will be reflected in the others.

## Dependencies

npm packages:

- mysql
- inquirer
- colors
- console.table