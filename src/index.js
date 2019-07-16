// let button = document.createElement('button');
// button.innerHTML = 'Hello';
// // vue路由 懒加载 和 react路由 懒加载 都是靠这样的方式实现
// button.addEventListener('click',function(){
//     import('./source.js').then(data=>{
//         console.log(data.default);
//     })
// });

// document.body.appendChild(button);
import a from './source'
console.log(a);
//module表示当前模块，__proto__上有hot属性
if(module.hot){
    //module.hot.accept(路径，回调方法)
    module.hot.accept('./source',()=>{
        //重新引用一下这个更新模块,import 语法只能写在顶部
        let str = require('./source');
        console.log(str);
    })
}