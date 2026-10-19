<?php
// Model pentru configurarea formularului de ofertă. NU conține date reale.
//
// Pe hosting: copiază fișierul ca  /home/UTILIZATOR/amber-privat/config.php
// (folderul amber-privat stă LÂNGĂ public_html, nu în el) și completează datele contului
// de email cereri@ambermob.ro, creat în cPanel. Vezi DEPLOY-DATAHOST.md.

return [
    'smtp_gazda' => 'mail.ambermob.ro',     // serverul de email din cPanel (Email Accounts → Connect Devices)
    'smtp_port' => 465,                      // 465 cu 'ssl' sau 587 cu 'tls'
    'smtp_securizare' => 'ssl',
    'smtp_utilizator' => 'cereri@ambermob.ro',
    'smtp_parola' => 'Cereriambermob1!',

    'de_la' => 'cereri@ambermob.ro',         // expeditorul; trebuie să fie contul de mai sus
    'de_la_nume' => 'Site Amber',
    'catre' => 'vanzari@ambermob.ro',        // unde ajung cererile
];
