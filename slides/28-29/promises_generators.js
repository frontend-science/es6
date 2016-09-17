/*
  Одно из основных применений генераторов – написание плоского асинхронного кода:
  - генератор yield`ит не просто значения, а промисы;
  - есть специальная функция (например известная библиотека со)
    которая запускает генератор, последовательными вызовами next получает из него
    промисы – один за другим, и возвращает их результаты в генератор
    в следующие next, пока не дойдёт до последнего;
  - return значения генератора (done:true) уже обрабатывается
    как окончательный результат
*/

function slowDoublePromise(num) {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      resolve(num * 2);
    }, 1000);
  });
}

function* processNumber(num) {
  let result1 = yield slowDoublePromise(num);
  let result2 = yield slowDoublePromise(result1);

  let result3;
  if(result2 > 7){
    result3 = yield slowDoublePromise(result2 + result1);
  } else {
    throw new Error('too small, can not process further');
  }
  return result3;
}

co(processNumber(2))
  .then(res => console.log(res))// 20
  .catch(err => console.log('ERROR: ', err));
// co возвращает промис, поэтому нужно не забывать о catch.

co(processNumber(1))
  .then(res => console.log(res))
  .catch(err => console.log('ERROR: ', err)); //ERROR: too small, can not process further

/*
  Библиотека co умеет yield`ить промисы, генераторы,
  функции-thunk`и с единственным аргументом вида function(callback(err, result)),
  массив или объект из вышеперечисленного. При этом все задачи
  будут выполнены параллельно, а результат в той же структуре, будет выдан наружу.
*/

co(function*() {
  let result;

  result = yield* function*() { // генератор, yield* чтоб сохранить стек трейс
    return 1;
  }();

  result = yield* function*() { // функция-генератор
    return 2;
  };

  result = yield Promise.resolve(3); // промис

  result = yield function(callback) { // function(callback)
    setTimeout(() => callback(null, 4), 1000);
  };

  result = yield { // две задачи выполнит параллельно, как Promise.all
    one: Promise.resolve(1),
    two: function*() { return 2; }
  };

  result = yield [ // две задачи выполнит параллельно, как Promise.all
    Promise.resolve(1),
    function*() { return 2 }
  ];
  return result;
}).then(res => console.log(res)); // [1, 2];
