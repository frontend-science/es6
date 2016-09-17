/*
  Деструктуризация – это синтаксис, при котором можно присвоить массив или объект
  сразу нескольким переменным, разбив его на части.
*/

let [ first, second ] = [ 'alpha', 'beta', 'gamma' ];
console.log(second); // alpha

// Ненужные элементы массива также можно отбросить, поставив лишнюю запятую:

let [ first, , third ] = [ 'alpha', 'beta', 'gamma' ];
console.log(third); // gamma

// Используем rest оператор:

let [ first, ...other ] = [ 'alpha', 'beta', 'gamma' ];
console.log(other); // [ 'beta', 'gamma' ]

// Если значений в массиве не хватает, то будет присвоено undefined:

let [ first, second ] = [ 'alpha' ];
console.log(second); // undefined

// Можно использовать значения по умолчанию!

function getThird (){
  return 'gamma';
}
let [ first, second = 'beta', third = getThird()] = [ 'alpha' ];
console.log(first, second, third);

/*
  При деструктуризации объектов мы указываем
  какие свойства в какие переменные должны «идти»,
  при этом можно присвоить свойство объекта в переменную
  с другим именем через двоеточие
  можно даже сочетать это с значениями по-умолчанию или вычисляемыми значениями:
*/

let employee = {
  name: "Mykola",
  age: 50,
  salary: 200000,
  married: true,
  kids: 3
};
let importantKey = 'age';

let { name, [importantKey]: years, job="truck driver", salary:money=0 } = employee;
console.log(name, years, job, money);

/*
  Eсли в объекте больше значений, чем переменных, то мы их пока-что не можем получить.
  Возможно в будущих стандартах сможем с помощью ...rest, тогда мы сможем делать так:
*/

let { name, years, job="truck driver", salary:money=0, ...family } = employee;
// family = { married: true, kids: 3 }

/*
  Можно использовать уже существующие переменные, но в таком случае надо обернуть
  конструкцию в ( ) скобки чтобы это не было воспринято как блок из { }:
*/

let a, b;
{ a, b } = { a:5, b:6 }; // будет ошибка, потому что { a, b } - блок,

// поэтому:

let a, b;
({a, b} = {a:5, b:6}); // внутри выражения это уже не блок
