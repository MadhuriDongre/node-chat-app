const moment = require('moment');

let date =  moment();
date.add(1,'year');
console.log(date.format('Do MMM, YYYY'));
console.log(date.format('h:mm a'));