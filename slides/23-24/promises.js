/*
  Промис – объект-обёртка для удобной организации асинхронного кода
  через построение цепочек обработчиков.
  Промисификация применяется для всего, что только возможно.

  Имеет состояние (state) – вначале pending, затем fulfilled/rejected,
  после чего остаётся неизменным. На settled state`ы навешиваются колбэки.

  Функции resolve/reject принимают один аргумент – результат/ошибку,
  который передаётся обработчикам.
  Синхронный throw триггерит reject.
*/

// Где-то здесь ошибка:

function getMultipleResults(requestIDs) {
  return Promise.all(requestIDs.map(requestID => requestAsync(reqUrl + requestIDs)
    .then(res => processData(res))
    .then(processedData => processedData.fields)
    .catch(err => logToDB(err, requestID))
    .catch(err => log(err, requestID))
  ));
}

/*
  Код, которому надо сделать что-то асинхронно, создаёт объект promise и возвращает его.
  Внешний код, получив promise, навешивает на него обработчики.

  По завершении процесса асинхронный код переводит promise в состояние
  fulfilled (с результатом) или rejected (с ошибкой). При этом
  автоматически вызываются соответствующие обработчики во внешнем коде.
*/

function requestAsync(options){
  return new Promise((resolve, reject) => {
    request(options, (err, res) => {
      if(err){
        return reject(err);
      }
      return resolve(res);
    });
  });
}

requestAsync(options)
  .then(result => processData(result))
  .catch(err => logToDB(err));

/*
  Промисификация – это когда берут асинхронный функционал
  и делают для него обёртку, возвращающую промис.
  После промисификации использование функционала зачастую становится
  гораздо удобнее, ведь можно строить цепочки промисов.
*/

/*
  Обработчик .catch получает ошибку и должен обработать её:
  либо возвратить значение через return и продолжить,
  либо сделать throw или ещё один reject, и тогда ошибка переходит в следующий .catch
*/

//Можно добавлять и много обработчиков на один и тот же промис:
var promise = new Promise((resolve, reject) => resolve(1));

promise.then( function(result) {
  console.log(result + 1);
});

promise.then( function(result) {
  console.log(result + 2);
});

/*
  Параллельное выполнение
  Что, если мы хотим осуществить несколько асинхронных процессов одновременно
  и обработать их результаты?
  Вызов Promise.all(iterable) получает массив (или другой итерируемый объект)
  промисов и возвращает промис, который ждёт, пока все переданные промисы завершатся,
  и возвращает массив их результатов.
  Если хоть один промис reject - получаем только его.
*/

Promise.all([
  Promise.resolve('alpha'), //так тоже можно
  Promise.resolve('beta')
]).then(results => {
  console.log(results[0], results[1]); // alpha, beta
}).catch(err => {
  console.log('something went wrong', err);
});

/*
  В Promise.race результатом будет только первый
  успешно выполнившийся промис из списка. Остальные игнорируются.
*/

function slowPromise(str) {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      resolve(str);
    }, 1000);
  });
}

Promise.race([
  slowPromise('alpha'),
  Promise.resolve('beta')
]).then(result => {
  console.log(result); // beta
}).catch(err => {
  console.log('something went wrong', err);
});


/*
  Есть некоторые либы, которые улучшают или расширяют функционал промисов.
  Они отвечают стандарту + добавляют новые возможности.

  Например Bluebird намного лучше в плане производительности
  и может промифицировать сразу все методы обьекта с помощью Bluebird.promisifyAll,
  при этом в обьект добавлятся промисифицированные методы с суффиксом Async:
*/
var fs = Promise.promisifyAll(require("fs"));

fs.readFileAsync("myfile.js", "utf8").then(function(contents) {
    console.log(contents);
}).catch(function(e) {
    console.error(e.stack);
});

/*
  В другой известной библиотеке Q есть метод Q.allSettled,
  который может быть полезен если нам надо дождаться сэтла всех промисов,
  а потом в зависимости от того, успешна она или нет,
  с каждым результатом сделать что-то
  ({ state: "fulfilled", value: v } or { state: "rejected", reason: r }):
*/

Q.allSettled([saveToDisk(), saveToCloud()]).then(function (settledArr) {
    let successResults = settledArr
      .filter(settled => settled.state === 'fulfilled')
      .map(promise => promise.value);
    return processResults(successResults);
});
