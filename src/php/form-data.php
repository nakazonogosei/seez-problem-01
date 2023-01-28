<?php
  // テストアップ時
  // $rootPath = "/codingkadai/01/nakazono/";

  // ローカル環境
  // $rootPath = "/";

  // 読み込み
  $json_file = file_get_contents("comedian.json");
  $json_file = mb_convert_encoding($json_file, 'UTF8', 'ASCII,JIS,UTF-8,EUC-JP,SJIS-WIN');
  $decodedjson = json_decode($json_file, true);

  $postKey = $_POST['name'];
  $postValue = $_POST['unit'];
  
  $decodedjson[] = [
    'name' => "$postKey",
    'unit' => "$postValue"
  ];
  echo("<pre>");
  var_dump($decodedjson);
  echo("</pre>");
  
  // 書き込み
  file_put_contents("comedian.json",
  json_encode($decodedjson, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE),
  LOCK_EX);
  var_dump("書き込み作業完了");
  
  echo("<pre>");
  var_dump(json_encode($decodedjson, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
  echo("</pre>");
    