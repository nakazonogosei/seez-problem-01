<?php
  // テストアップ時
  // $rootPath = "/codingkadai/01/nakazono/assets/";

  // ローカル環境
  $rootPath = "/assets/";

  $json_filename = "json/comedian.json";
  // $php_filename = "php/form-data.php";

  // $json_file = file_get_contents("./assets/json/comedian.json");
  $json_file = file_get_contents('php://input');
  // var_dump($rootPath.$json_filename);
  var_dump($json_file);
  $post = json_decode( $json_file, true );

  function print_json($json_file) {
    header('Content-Type: application/json; charset=utf-8');
    $json_file = mb_convert_encoding($json_file, 'UTF8', 'ASCII,JIS,UTF-8,EUC-JP,SJIS-WIN');
  }
  var_dump(json_decode($json_file, true));

  // file_put_contents("./assets/json/comedian.json",
  //   $array,
  //   FILE_APPEND | LOCK_EX);

  //フォームが送信されたらやる処理
  if(isset($_POST['submit'])) {
    var_dump("書き込み作業前");

    $data = $_POST['value']; //データを配列で取得
    var_dump($data);

    //jsonファイルに追加、書き込み
    $array = json_decode($json_file, true);
    $array[] = $data;
    var_dump($array);

    file_put_contents("./assets/json/comedian.json",
    json_encode($array, JSON_UNESCAPED_UNICODE),
    LOCK_EX);
    var_dump("書き込み作業完了");
  }
