/*
  Интерполяция с помощью ${} и перенос строк с учётом отступов и переносов:
*/

function generateElement(h1, text, comment) {
  let clean = filter`
    <h1>${h1}</h1>
    <h2>Текст статьи:<h2>
    <p>${text}<p>
    <h4>Текст комментария:</h4>
    <p>${comment}</p>
  `;
  return clean;
}

/*
  Функция шаблонизации:
  участки строки идут в первый аргумент-массив strings,
  а список последующих аргументов функции шаблонизации – это значения
  интерполированных выражений в ${...}.
*/
function filter(strings, ...args){
  return args.reduce((result, string, i) =>
    result += strings[i] + String(string).replace(/BAD_WORD/g, ''), '')
    + strings[strings.length - 1];
}

console.log(
  generateElement('qwe', 'BAD_WORD222', 'BAD_WORD333')
);
