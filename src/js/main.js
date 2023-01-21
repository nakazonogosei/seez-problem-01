const fs = require("fs");

function checkDevice() {
  if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
    return "smartPhone";
  } else if (
    /iPad|Macintosh/i.test(navigator.userAgent) &&
    "ontouchend" in document
  ) {
    return "tablet";
  } else {
    return "pc";
  }
}

if (checkDevice() === "tablet") {
  $("[name='viewport']").attr("content", "width=1280");
}

$(function () {
  // smooth scroll
  $("a[href^='#']").on("click", function () {
    var speed = 400;
    var href = $(this).attr("href");
    var target = $(href == "#" || href == "" ? "html" : href);
    var position = target.offset().top;
    $("html, body").animate({ scrollTop: position }, speed, "swing");
    return false;
  });
});

// 「 Module not found: Error: Can't resolve 'fs'」 のエラー回避
// module.exports = {
//   webpack: (config, { isServer }) => {
//     // 空のオブジェクト渡すことで npm パッケージが fs モジュールに依存しないようにします
//     if (!isServer) {
//       config.node = {
//           fs: 'empty'
//       }
//     }
//     return config
//   }
// }

// function alertValue($this) {
  //   $this.nextSibling.innerHTML = $this.value;
  // }

  // const input = document.querySelector("input");
  // console.log(input);


// ローカル環境とテストサイトのディレクトリ構成が異なるため、
// テストアップ時にパス切り替え （ココと、index.ejsを変更する）
// const path = "/codingkadai/01/nakazono/"; // テストアップ時
const path = "/"; // ローカル環境

const jsonPath = path + "assets/json/comedian.json"

function writeBtn1() {
  // const text1 = document.getElementById("input1").value;
  // let text2 = "書き込み完了";
  // document.getElementById("done").textContent = text2;
  // console.log(text2);

  // 各要素を取得、入力した文字などを表示させる
  const done1 = document.getElementById("done1");
  const done2 = document.getElementById("done2");
  const input1 = document.getElementById("input1");
  const input2 = document.getElementById("input2");
  // const fs = require("fs");

  let comedianData = []; // JSONファイルに出力する KEY：VALUE 格納場所

  let value1 = input1.value;
  let value2 = input2.value;
  let MyComedian = {
    // KEY：VALUE のような書き方で JSON ファイルに出力
    [value1] : value2
  };
  comedianData.push(MyComedian)

  // オブジェクトを Json データに戻す
  let jsonData = JSON.stringify(comedianData);
  console.log(jsonData);

  // console.log("書き込み前");

  // ここに JSON ファイルに書き込む記述
  // const fs = require("fs");
  // fs.appendFileSync("../json/comedian.json", jsonData, "utf-8");


  try {
    // 既存のファイルへ追記する
    fs.appendFileSync(jsonPath, jsonData, 'utf-8');
  } catch (err) {
    console.log(err);
  }

  // console.log("書き込み後");

  // ダウンロードする時の記述
  // 保存するJSONファイルの名前
  // const jsonFile = "comedian.json";

  // // HTMLのリンク要素を生成する。
  // const link = document.createElement("a");

  // // リンク先にJSON形式の文字列データを置いておく。
  // link.href = "data:text/plain," + encodeURIComponent(jsonData);
  // // link.href = "/assets/json/" + jsonFile;

  // // 保存するJSONファイルの名前をリンクに設定する。
  // link.download = jsonFile;

  // // ファイルを保存する。
  // link.click();

  // let masterData2 = JSON.stringify({MyComedian: masterData}, null, " ")
  // MyComedian.input1.value = "input2.value";
  // fs.writeFileSync('comedian.json', masterData2);


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


// const fs = require('fs');

// const jsonObject = JSON.parse(fs.readFileSync('./nakazono.json', 'utf8'));
// const result = {};
// let masterData = [];

// jsonObject.MyDog.forEach((obj) => {
//     result[obj.date] = obj;
//     console.log(obj.Name, obj.age ,obj.weight )
//     var data = {
//         key: obj.Name
//     };
//     masterData.push(data)
// });
// let masterData2 = JSON.stringify({MyDog: masterData}, null, ' ')
// fs.writeFileSync('output2.json', masterData2);


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
