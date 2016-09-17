/*
  Лёгким движением руки...
*/

function () { return 1; }
() => { return 1; }
() => 1

function (a) { return a * 2; }
(a) => { return a * 2; }
(a) => a * 2
a => a * 2

function (a, b) { return a * b; }
(a, b) => { return a * b; }
(a, b) => a * b

function () { return arguments[0]; }
(...args) => args[0]

() => {} // undefined
() => ({}) // {}

x => { throw x }

/*
  Cтрелочные функции позволяют писать говнокод быстрее, проще и читабельней:
*/

var user = {
  multiplier: 20,
  defaultValues: [1, 2, 5],
  doThis: function () {
    var self = this;
    sendRequest() // send request
      .then(function(results){ // async process each result
        return Promise.all(results.map(function(result){
            return processResults(result);
        }));
      })
      .then(function(results){
        return results.reduce( // calculate results depending on status
          function(num, result){
            return result.valid ?
              num + result.value * self.multiplier : num;
          },
          0
        );
      })
      .then(function(result){ // concat them with defaults
        return self.defaultValues.concat(result).sort(function(a, b){
          return a - b;
        });
      })
  }
};

/*
  А теперь получится в два раза меньше строк:
*/

var user = {
  multiplier: 20,
  defaultValues: [1, 2, 5],
  doThis () {
    sendRequest() // send request
      .then(results => Promise.all( // async process each result
        results.map(result => processResults(result))
      ))
      .then(results => results.reduce((num, result) => result.valid ? // calculate results depending on status
          num + result.value * self.multiplier : num,
        0
      ))
      .then(result => self.defaultValues.concat(result).sort((a, b) => a - b)) // concat them with defaults
  }
};

/*
  Но нужно быть внимательными: не переносить стрелку на следующую строку:
*/

const func1 = (x, y) // SyntaxError
=> {
    return x + y;
};

const func2 = (x, y) => // OK
{
    return x + y;
};

/*
  И не использовать стрелочные функции в декларации методов
  с использованием литерала объекта или Function.prototype
*/

var component = {
    _privateMethod: function (params) {
      console.log(params);
    },
    // this в handleAction будет указывать на глобальный объект,
    // что приведет к ошибке
    handleAction: (params) => this._privateMethod(params),
    // Если, все же, хочется писать покороче,
    // лучше использовать новый способ декларации методов,
    // поведение которого осталось неизменным
    handleAction2 (params) {
      return this._privateMethod(params);
    }
};

/*
  ДРУГИЕ ОСОБЕННОСТИ:
  
  Связывают контекст — значение this определяется не тем,
  как и где функция вызвана, а где она была создана.

  Наследуют super и arguments от родительского контекста.

  Так как this биндится при создании функции,
  он не может быть изменен в дальнейшем даже с помощью .call(), .apply() и .bind().

  Не могут быть использованы как конструктор, кидают TypeError при использовании с new.

  Не могут быть генераторами и использовать yield внутри себя.

  Отсутствует .prototype.

  Стрелочные функции всегда анонимны.
*/
