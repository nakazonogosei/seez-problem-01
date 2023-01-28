// PHPファイル名
const submitPath = "form-data.php";

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
  console.log(...formData.entries());

  console.log("いまからFetch");
  fetch(submitPath, {
    method: "POST",
    body: formData
  })
  .then((response) => {
    if(response.ok) {
      //ステータスが ok ならばステータスを表示させる
      console.log(`リクエスト成功: ${response.status}`);
    } else {
      //ok でなければ例外を発生
      throw new Error(`リクエスト失敗: ${response.status} ${response.statusText}`);
    }
  })
  .catch((error) => {
    console.log(error);
  });

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
form.addEventListener("submit", writeBtn1);

// Download
function downloadJson() {
  let link = document.createElement("a");
  link.href = "comedian.json";
  link.download = "comedian.json";
  link.click();
}
document.getElementById("download").onclick = function() {
  downloadJson();
}
