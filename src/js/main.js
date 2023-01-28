// ローカル環境とテストサイトのディレクトリ構成が異なるため、
// テストアップ時にパス切り替え （ココと、index.ejsを変更する）

// テストアップ時
const rootPath = "/codingkadai/01/nakazono/";

// ローカル環境
// const rootPath = "/";

// JSONファイルまでのパス
const jsonPath = rootPath + "comedian.json";
console.log(jsonPath);

// PHPファイルまでのパス
const submitPath = "form-data.php";
// console.log(submitPath);

// 各要素を取得
const done1 = document.getElementById("done1");
const done2 = document.getElementById("done2");
const input1 = document.getElementById("input1");
const input2 = document.getElementById("input2");
const form = document.getElementById("my-form");

function writeBtn1(e) {
  e.preventDefault();
  let value1 = input1.value;
  let value2 = input2.value;
  console.log(value1);
  console.log(value2);

  // フォームオブジェクト作成
  const formData = new FormData(form);
  console.log(formData);

  formData.append(value1, value2);
  console.log(formData);

  // function submitFormData(e) {
    // // submitイベントの本来の動作を止める
    // e.preventDefault();

    // console.log(JSON.stringify(formData));
    console.log("いまからFetch");

    // Fetch APIを使ってエンドポイントにPOSTリクエストを送信
    fetch(submitPath, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: formData // JSON文字列化して送信
    })
    .then((response) => {
      if(response.ok) {
        //ステータスが ok ならばレスポンスボディを取得して変換
        return response.json();
      } else {
        //ok でなければ例外を発生
        throw new Error(`リクエスト失敗: ${response.status} ${response.statusText}`);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  // }
  // submitFormData();

  // async function fetchPost(submitPath, optinos) {
  //   const response = await etchPost (submitPath, options);
  // }

  // 書き込み完了、入力した文字などを表示させる
  done1.innerText = "書き込み完了";
  done2.innerText = `芸名：${value1}  所属ユニット名：${value2}`;
  console.log("書き込み完了");

  let reset = function() {
    console.log("リセット完了");
    done1.innerText = "";
    done2.innerText = "";
    input1.value = "";
    input2.value = "";
  };
  setTimeout(reset, 3000);
}
// document.getElementById("write").onclick = function() {
//   writeBtn1();
// }
form.addEventListener("submit", writeBtn1);


// Download
function downloadJson() {
  let link = document.createElement("a");
  link.href = jsonPath;
  link.download = "comedian.json";
  link.click();
}
document.getElementById("download").onclick = function() {
  downloadJson();
}
