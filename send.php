<?php
// https://api.telegram.org/bot5225466553:AAHn-5ImX8SmcHF_4sbC8Odg4Kv4Tw8J5rM/getUpdates
//В переменную $token нужно вставить токен, который нам прислал @botFather
$token = "5225466553:AAHn-5ImX8SmcHF_4sbC8Odg4Kv4Tw8J5rM";

//Сюда вставляем chat_id
$chat_id = "-575865365";

//Определяем переменные для передачи данных из нашей формы
if ($_POST['act'] == 'order') {
    $name = ($_POST['name']);
    $email = ($_POST['email']);
      $message = ($_POST['message']);

//Собираем в массив то, что будет передаваться боту
    $arr = array(
        'Имя:' => $name,
        'Email:' => $email,
        'Сообщение:' => $message
    );

//Настраиваем внешний вид сообщения в телеграме
    foreach($arr as $key => $value) {
        $txt .= "<b>".$key."</b> ".$value."%0A";
    };

//Передаем данные боту
    $sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");


}

?>
