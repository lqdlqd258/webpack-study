let str = require('./a');
console.log(`Hello ${str}`);

require('./css/less/index.less');
require('./css/index.css');

//es6
let fn = () =>{
    console.log('log');
}
fn();

//es7
@log
class A{  //es7 等于 new A() a = 1
    a = 2;
}
let a = new A();
console.log(a.a);

function log(target){
    console.log(target);
}