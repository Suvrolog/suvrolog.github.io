<?php
    $name = $_POST['name6'];
    $phone = $_POST['phone6'];
    $email = $_POST['email6'];
    $comment = $_POST['comment6'];
    $roistatVisitId = array_key_exists('roistat_visit', $_COOKIE) ? $_COOKIE['roistat_visit'] : "nocookie";
    $roistatData = array(
                         'roistat' => isset($_COOKIE['roistat_visit']) ? $_COOKIE['roistat_visit'] : 'nocookie',
                         'key'     => 'ключ', // Ключ для интеграции с CRM, указывается в настройках интеграции с CRM.
                         'title'   => 'New Lead',
                         'comment' => $comment,
                         'name'    => $name,
                         'email'   => $email,
                         'phone'   => $phone,
                         'order_creation_method' => 'PHP', // задается способ создания 
                         'is_need_callback' => '0', // Требуется ли обратный звонок
                         'callback_phone' => '79999999999', // Номер для обратного звонка
                         'sync'    => '0', //
                         'is_need_check_order_in_processing' => '0', // Включение проверки заявок на дубли
                         'is_need_check_order_in_processing_append' => '0', // Если создана дублирующая заявка, в нее будет добавлен комментарий об этом
                         'is_skip_sending' => '0', // Отправлять заявку в CRM.
                         'fields'  => array(),
                         );
    
    file_get_contents("https://cloud.roistat.com/api/proxy/1.0/leads/add?" . http_build_query($roistatData));
    header('Location:thanks.html');
    ?>