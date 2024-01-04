const buffer = Buffer.from('나는 버퍼다');

console.log('from():' , buffer);
console.log('length:' , buffer.length);
console.log('string:' , buffer.toString());

const array = [Buffer.from('1번 '), Buffer.from('2번 '),  Buffer.from('3번 ')]
const buffer2 = Buffer.concat(array);
console.log(buffer2.toString());

const buffer3 = Buffer.alloc(5);
console.log('alloc():', buffer3);