/*
  В ES6 стало возможным указание значений по умолчанию для аргументов функции.
  Ранее для проверки и задания стандартных значений использовалось тело функции,
  где параметры сравнивались с undefined.
*/

function doSomething(x, y) {
    y = y === undefined ? 2 : y;
    return x * y;
}

/*
  Аналогичный функционал на ES6:
*/

function doSomething(x, y = 2) {
  return x * y;
}

doSomething(5); // 10
doSomething(5, undefined); // 10
doSomething(5, 3); // 15

/*
  Они вычисляются во время выполнения (а не объявления), но перед выполнением
  самих операций в теле функции. Поэтому нельзя использовать что-то из тела функции
  для определения параметров:
*/

function f(a = go()) { // ReferenceError.
  function go(){ return ":P" }
}

/*
  Параметры, которые уже объявлены,
  могут использоваться для объявления следующих, но не наоборот:
*/

function doSomething(arg1, arg2 = arg1 * 2) {
  console.log(arg1 + arg2);
}
doSomething(3); // 9

/*
  Для указания значений по-умолчанию можно использовать
  деструктуризацию, ...rest и даже выражения включающие в себя вызовы функций:
*/

function f([x, y] = [1, 2], {z: z} = {z: 3}) {
  return x + y + z;
}
f(); // 6

// или

function doSomething(x, ...remaining) {
  return x * remaining.length;
}
doSomething(5, 0, 0, 0); // 15

// или

function getTwo() {
  return 2;
}
function doSomething(arg1, arg2 = getTwo()) {
  console.log(arg1 + arg2);
}
doSomething(3); // 5
doSomething(3, 1); // 4
