// import * as fs from "fs";
// const fs = require("fs");
// エラーあり： TypeError: fs.appendFileSync is not a function

// ローカル環境とテストサイトのディレクトリ構成が異なるため、
// テストアップ時にパス切り替え （ココと、index.ejsを変更する）

// テストアップ時
const rootPath = "/codingkadai/01/nakazono/";

// ローカル環境
// const rootPath = "/";

// JSONファイルまでのパス
const jsonPath = rootPath + "assets/json/comedian.json";
console.log(jsonPath);
const submitPath = "http://test.seez.jp/codingkadai/01/nakazono/form-data.php";

// 各要素を取得
const done1 = document.getElementById("done1");
const done2 = document.getElementById("done2");
const input1 = document.getElementById("input1");
const input2 = document.getElementById("input2");

function writeBtn1() {
  let comedianData = []; // JSONファイルに出力する KEY：VALUE 格納場所
  let value1 = input1.value;
  let value2 = input2.value;

  let MyComedian = {
    // KEY：VALUE のような書き方で JSON ファイルに出力
    [value1] : value2
  };
  console.log(MyComedian);

  comedianData.push(MyComedian);
  console.log(comedianData);
  // オブジェクトを Json データに戻す
  // let jsonData = JSON.stringify(comedianData);
  // console.log(jsonData);

  let jsonData = JSON.stringify(comedianData);
  console.log(jsonData);

  // ここに JSON ファイルに書き込む記述 ボツ
  // const fs = require("fs");
  // fs.appendFileSync("../json/comedian.json", jsonData, "utf-8");

  // 書き込みボタンを押したら、入力データをJSONファイルに送信、書き込み
  const form = document.getElementById("my-form");
  form.addEventListener("submit", submitFormData);

  const formData = new FormData(form); // フォームオブジェクト作成
  // formData.append(jsonData);
  console.log(formData);

  function submitFormData(e) {
    // submitイベントの本来の動作を止める
    e.preventDefault();

    console.log(JSON.stringify(formData));
    console.log("いまからFetch");
    
    // Fetch APIを使ってエンドポイントにPOSTリクエストを送信
    fetch(submitPath, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
      // body: JSON.stringify(jsonData), // JSON文字列化して送信
    })
    .then((response) => {
      if(response.ok) {
        //ステータスが ok ならばレスポンスボディを取得して変換
        return response.json();
        // console.log(response);
      } else {
        //ok でなければ例外を発生
        throw new Error(`リクエスト失敗: ${response.status} ${response.statusText}`);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }
  // submitFormData();

  // 書き込み完了、入力した文字などを表示させる
  done1.innerText = "書き込み完了";
  done2.innerText = "芸名：" + input1.value + "　所属ユニット名：" + input2.value;
  console.log("書き込み完了");

  let reset = function() {
    console.log("リセット完了");
    done1.innerText = "";
    done2.innerText = "";
    input1.value = "";
    input2.value = "";
  }
  setTimeout(reset, 3000);
}
document.getElementById("write").onclick = function() {
  writeBtn1();
}


// Download
function downloadJson() {
  // let comedianList = JSON.stringify(masterData2);
  // let blob = new Blob([comedianList],{type:"text/plan"});
  //a要素を生成
  let link = document.createElement("a");
  // let link = document.getElementById("download");
  link.href = jsonPath;
  link.download = "comedian.json";
  link.click();
}
document.getElementById("download").onclick = function() {
  downloadJson();
}
