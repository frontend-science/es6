/*
  Пока-что не поддерживается нодой, https://github.com/nodejs/help/issues/53
*/

import { process } from 'src/process';
console.log(process('data'));

/*
import 'src/process' as c;
console.log(c.process('data'));
*/

/*
import { process as proc } from 'src/process';
console.log(proc('data'));
*/
