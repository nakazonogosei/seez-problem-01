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

// 変数、定数 (アロー関数)
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

function PromiseTest3(input) { // インプットがあるパターン
  return new Promise( ok => {
    ok(`プロミスは${input}です`);
  });
}
console.log(PromiseTest3("太郎"));

function promiseTest4A(pay) {
  return new Promise(ok => {
    let change = pay - 100;
    ok(change);
  })
}
console.log(promiseTest4A(300));

// エラーがでる書き方
function promiseTest4B(pay) {
  return new Promise((ok, ng) => {
    if(pay > 100) {
      let change = pay - 100;
      ok(change);
    }
    ng("お金がたりません");
  })
}
console.log(promiseTest4B(80));
// [PromiseState]]:"rejected" とコンソールに表示される
// エラーを捕まえきれていないという意味

// エラーがでない書き方
function promiseTest4C(pay) {
  return new Promise((ok, ng) => {
    if(pay > 100) {
      let change = pay - 100;
      ok(change);
    }
    ng("お金がたりません");
  })
}
console.log(promiseTest4C(80).catch( e => {console.log(e)}));
// "お金がたりません" とコンソールに表示される

promiseTest4C(180).then( change1 => {
  console.log(change1);
  return promiseTest4C(change1);
}).then(change2 => {
  console.log(change2);
}).catch(e => console.log(e));

// Promise チェーン
// Promise .then(ok_callback, ng_callback)
// Promise .then((ok_value) => {}, (ng_reason) => {})

// Promise .catch(ng_callback) // NG は catch
// Promise .catch((ng_reason) => {}) // NG は catch
