var mathlib = require('./mathlib')();     //notice the extra invocation parentheses!
console.log(mathlib);
mathlib.add(1,2);
mathlib.multiply(2,3);
mathlib.square(3);
mathlib.random(50,100);
