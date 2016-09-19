//Map. Базовые операции

let map11 = new Map();

map1.set('foo', 123);
map1.set('bar', false);

console.log(map1.size); //2
console.log(map1.get('foo')); //123
console.log(map1.get('qwe')); //undefined

console.log(map1.has('foo')); //true
map1.delete('foo');
console.log(map1.has('foo')); //false

map1.clear();
console.log(map1.size); //0

// Создание

const key1 = {};
let map2 = new Map([
   [ key1, 'one' ],
   [ false, 123 ],
   [ NaN, 'three' ], // лишняя запятая игнорируется + NaN всегда один (в отличие от NaN !== NaN)
]);
console.log(map2.get(key1)) // one

//Альтернативный способ создания с помощью чейнинга метода set:

 let map3 = new Map()
  .set(key1, 'one')
  .set(false, 123)
  .set(NaN, 'three');

// перебор ключей и элементов

for (let key of map3.keys()) {
    console.log(key);
} // Object {}, false, NaN

for (let key of map3.values()) {
    console.log(key);
} // one, 123, three

map3.clear(); // удаляет все значения

/*
  WeakMap. То же самое, только ключи должны быть объектами,
  нельзя итерировать ключи или значения, нельзя очищать.
*/

/*
  Использование WeakMap для приватных данных:
*/

let _counter = new WeakMap();
let _action = new WeakMap();
class Countdown {
    constructor(counter, action) {
        _counter.set(this, counter);
        _action.set(this, action);
    }
    dec() {
        let counter = _counter.get(this);
        if (counter < 1) return;
        counter--;
        _counter.set(this, counter);
        if (counter === 0) {
            _action.get(this)();
        }
    }
}

// запустим наш обратный отсчет:
let c = new Countdown(2, () => console.log('DONE'));
c.dec();
c.dec(); //DONE
/*
  Поскольку обратный отсчет сохраняет специфичные для экземпляра данные
  в другом месте, это экземпляр с не имеет собственных ключей свойств:
*/
Reflect.ownKeys(c) // []

// Set. Базовые операции:

let set = new Set();
set.add('red');
set.add('green');
set.add('yellow');
console.log(set.size, set.has('red')); //3, true
set.delete('red');
console.log(set.size, set.has('red')); //2, false
set.clear();
console.log(set.size); // 0

// Создание

let set2 = new Set(['red', 'green', 'blue']);

// или

let set3 = new Set().add('red').add('green').add('blue');

/*
  WeakSet так же как и WeakMap удаляет элементы,
  которые присутствуют только в нём, не поддерживает итерацию и очистку.
*/
