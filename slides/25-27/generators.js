/*
  Генераторы – новый вид функций, которые могут приостанавливать свое выполнение,
  возвращать промежуточный результат и далее возобновлять его позже.
  При первом запуске код такой функции не выполняется,
  а возвращает специальный объект «генератор».
*/

function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}
let generator = generateSequence();

/*
  У генераторов есть метод next(), который возобновляет выполнение кода
  до ближайшего ключевого слова yield и принимает/возвращает его значение
  и текущий статус (done) во внешний код.
*/

let one = generator.next();
console.log(JSON.stringify(one)); // {value: 1, done: false}

let two = generator.next();
console.log(JSON.stringify(two)); // {value: 2, done: false}

let three = generator.next();
console.log(JSON.stringify(three)); // {value: 3, done: true}

let four = generator.next();
console.log(JSON.stringify(three)); // {done: true}

/*
  Функция завершена.
  Внешний код должен увидеть это из свойства done:true
  и обработать value:3, как окончательный результат.
*/

function* gen() {
  // Передать вопрос во внешний код и подождать ответа
  let result = yield "2 + 2?";
  console.log('Result is ' + result);
}
let generator = gen();
let question = generator.next().value; // "2 + 2?"

generator.next(4); //result is 4

/*
  При композиции генераторов используется yield*
  чтоб интерпретатор перешел внутрь генератора-аргумента,
  выполнил его, и все yield, которые он делает, вышли из внешнего генератора.

  Это хорошо сочетается с тем, что генератор является итерируемым обьектом.
  Его можно перебирать и через for..of или ...spread
  но надо использовать yield вместо return
*/

function* getAllVehicles() {
  yield* getBlueCars();
  yield* getGreenTrucks();
}
let vehicles = [...getAllVehicles()];

/*
  Можно так же бросить в генератор ошибкой:
*/

function* gen() {
  try {
    let result = yield "Сколько будет 2 + 2?";
    //сюда мы уже не дойдём, выше будет исключение
  } catch(e) {
    console.log('I GOT ERROR: ' + e); // выведет ошибку
  }
}

let generator = gen();
let question = generator.next().value;
generator.throw(new Error("ответ не найден в моей базе данных"));
// I GOT ERROR: ответ не найден в моей базе данных
