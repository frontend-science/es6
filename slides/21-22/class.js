/*
  Новая конструкция class – удобный «синтаксический сахар»
  для задания конструктора вместе с прототипом.
*/

class User {
  constructor(name) {
    this.name = name;
  }
  sayHi() {
    alert(this.name);
  }
}

// Это объявление примерно аналогично такому:

function User(name) {
  this.name = name;
}
User.prototype.sayHi = function() {
  alert(this.name);
};

/*
ОСОБЕННОСТИ:
  Классы имеют блочную область видимости.
  Статические свойства можно задать через static.
  В классах, как и в обычных объектах, можно объявлять геттеры и сеттеры,
  а также использовать [ ] для свойств с вычисляемыми именами.
  Добавлен синтаксис super для доступа к родителю (до его вызова this не будет доступен).
  Наследование делается через extends
*/

class Human {
  constructor(firstName, lastName){
    this.firstName = firstName;
    this.lastName = lastName;
  }
  run(){
    console.log('OK, I am running!');
  }
}

/*
  через extends формируется стандартная цепочка прототипов:
  методы Hero находятся в Hero.prototype, методы Human – в Human.prototype,
  и они связаны через __proto__ (Hero.prototype.__proto__ == Human.prototype)
  constructor родителя наследуется автоматически.
  То есть, если в потомке не указан свой constructor, то используется родительский.
  Если же у потомка свой constructor, то, чтобы в нём вызвать конструктор родителя,
  используется синтаксис super() с аргументами для родителя.
*/

class Hero extends Human {
  constructor(firstName, lastName) {
    // this здесь пока-что не доступен
    super(firstName, lastName);
    this.privileges = 5; // теперь доступен
  }
  get fullName() { // геттер
    return `${this.firstName} ${this.lastName}`;
  }
  set fullName(newValue) { // сеттер
    [this.firstName, this.lastName] = newValue.split(' ');
  }
  run() {
    super.run();
    console.log('And Im not tired!');
  }
  ["test".toUpperCase()]() { // вычисляемое название метода
    console.log('TEST passed!');
  }
  static createAdmin() {
    return new Hero("Thomas", "Anderson");
  }
};

let neo = Hero.createAdmin();
neo.TEST(); // TEST passed!
neo.fullName = 'Chosen One';
console.log(neo.fullName); // 'Chosen One'
neo.run(); // OK, I am running! And Im not tired!


/*
  Миксины.
  Класс может иметь только один суперкласс, поэтому множественное наследование
  не представляется возможным. Функциональность должна быть предоставлена суперклассом.
  Функция которая принимает суперкласс, а возвращает субкласс
  который расширяет этот суперкласс может быть использована для реализации миксинов.
*/

var calculatorMixin = Base => class extends Base {
  calc() { console.log('Im calculating!'); }
};

var randomizerMixin = Base => class extends Base {
  randomize() { console.log('Im randomizing!'); }
};

// Класс, который использует эти миксины может быть создан вот так:

class Foo { }
class Bar extends calculatorMixin(randomizerMixin(Foo)) {
  
}
