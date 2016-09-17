
/*
  Стрелочные функции, в первую очередь, созданы для обхода некоторых особенностей
  традиционных функций, которые не всегда нужны.
  Например нам не всегда(а точнее - в большинстве случаев) нужна
  гибкость JavaScript`ового this
*/

var pageHandler = {
  id: "123456",
  init: function() {
    document.addEventListener("click", function(event) {
      this.doSomething(event.type); // ошибка потому что this===document, а не pageHandler
    });
  },
  doSomething: function(type) { console.log("Handling " + type  + " for " + this.id) }
};

/*
  Чтобы добиться того, что мы хочем, мы можем использовать несколько вариантов:
*/

var pageHandler = {
    id: "123456",
    init: function() {
        document.addEventListener("click", function(event) {
            this.doSomething(event.type);
        }).bind(this);
    },
    doSomething: function(type) { console.log("Handling " + type  + " for " + this.id) }
};

/*
  или
*/

var pageHandler = {
    id: "123456",
    init: function() {
        var self = this;
        document.addEventListener("click", function(event) {
            self.doSomething(event.type);
        });
    },
    doSomething: function(type) { console.log("Handling " + type  + " for " + this.id) }
};

/*
  Теперь код работает так, как и задумывалось, но выглядит более громоздко,
  и всегда остаётся возможность что-то упустить при рефакторинге,
  надо постоянно следить за контекстом - что куда надо забиндить и т.д.
  И это ещё самый простой пример, а представьте что будет если у нас будет
  несколько вложенных функций, редюсы, мапы и колбэки...

  Стрелочные функции решают проблему более элегантным способом,
  поскольку используют лексическое связывание значения this, super и arguments
  и его значение определяется значением this в том месте,
  где стрелочная функция была создана.
*/

var pageHandler = {
    id: "123456",
    init: function() {
      document.addEventListener("click", event => this.doSomething(event.type));
    },
    doSomething: function(type) { console.log("Handling " + type  + " for " + this.id) }
};

/*
  Прокидывание» контекста между несколькими вызовами становится тривиальной задачей
*/

var obj = {
  arr1: [1, 2, 3],
  arr2: ['a', 'b', 'c'],
  concatenate: function(a, b){ return a + "|" + b },
  intersection: function() {
    return this.arr1.reduce( (sum, v1) => // arrow function 1
      this.arr2.reduce( (sum, v2) => { // arrow function 2
        sum.push( this.concatenate( v1, v2 ) )
        return sum;
      }, sum ),
    [] );
  }
};
var arrSum = obj.intersection(); //['1|a', '1|b', '1|c', '2|a', '2|b', '2|c', '3|a', '3|b', '3|c']
