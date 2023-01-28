<?php
  // テストアップ時
  // $rootPath = "/codingkadai/01/nakazono/";

  // ローカル環境
  // $rootPath = "/";

  // $json_filename = $rootPath + "comedian.json";
  // $php_filename = "php/form-data.php";

  $json_file = file_get_contents("comedian.json");
  // $json_file = file_get_contents('php://input');
  // var_dump($rootPath.$json_filename);
  var_dump($json_file);

  // function print_json($json_file) {
    // header('Content-Type: application/json; charset=utf-8');
    $json_file = mb_convert_encoding($json_file, 'UTF8', 'ASCII,JIS,UTF-8,EUC-JP,SJIS-WIN');
    var_dump($json_file);
    // }
    // var_dump(json_decode($json_file, true));
    $decodedjson = json_decode( $json_file, true );


  //フォームが送信されたらやる処理
  if(isset($_POST['submit'])) {
    var_dump("書き込み作業前");

    $postKey = $_POST['key'];
    $postValue = $_POST['value'];

    // $data = $_POST['value']; //データを配列で取得
    var_dump($postKey);
    var_dump($postValue);

    $writeData += array (
      $postKey => $postValue
    );
    var_dump($writeData);

    //jsonファイルに追加、書き込み
    // $array = json_decode($json_file, true);
    // $array[] = $data;
    // var_dump($array);

    file_put_contents("comedian.json",
    json_encode($writeData, JSON_UNESCAPED_UNICODE),
    LOCK_EX);
    var_dump("書き込み作業完了");
  }
