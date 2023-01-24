// Promise Lesson

// 関数
function test1() {
  return "関数1";
}
console.log(test1);

// 変数、定数
const test2 = function() {
  return "関数2";
}
console.log(test2);

// 変数、定数
const test3 = () => {
  return "関数3";
}
console.log(test3);

// Promise
// 1 状態（OK/NG)と値
// 2 Promiseチェーン

// callback
// 引数が状態 OK/NG (1つでも可) OK = resolve, NG = reject
// 引数が1つの場合はカッコ()は無し
function promiseTest1() { // ※インプット無しパターン
  return new Promise( ok => {
    ok("プロミス1です");
  });
}
console.log(promiseTest1());

// 引数が2つの場合
// function promiseTest2() {
//   return new Promise((ok, ng) => {
//     // ここに処理を書く
//   });
// }

// コンソール出力結果：PromiseState:"fulfilled" (完了)
// PromiseState は、OKなら resolved、NGなら reject
// PromiseResult:"プロミス1です"

// 変数、定数に入れる方法
const promiseTest2 = new Promise( ok => {
  ok("プロミス2です");
});
// functionは使われてないので()は要らない
console.log(promiseTest2);

function testPromise3(input) { // インプットがあるパターン
  return new Promise( ok => {
    ok(`プロミスは${input}です`);
  });
}
console.log(testPromise3("太郎"));
