/*
  Разберёмся - какая разница между rest и spread если они обозначаются одинаково.
*/


// Вы используете spread, когда разбираете одну переменную на элементы:

var abc = ['a', 'b', 'c'];
var def = ['d', 'e', 'f'];
var alpha = [ ...abc, ...def ]; // ['a', 'b', 'c', 'd', 'e', 'f'];

// Вы используете rest при объединении оставшихся аргументов функции в один массив:

function sum( first, ...others ) {
  for ( let i = 0; i < others.length; i++ ) {
    first += others[i];
  }
  return first;
}
sum(1, 2, 3, 4); // 10;

// В ES5 это делали так:

function sum() {
    var first = arguments[0];
    var others = [].slice.call(arguments, 1);
    ···
}
