<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title><?php echo App::getInstance()->title; ?></title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" media="screen" href="bootstrap/css/bootstrap.min.css" />
    <link rel="stylesheet" type="text/css" media="screen" href="main.css" />
    <!--script src="bootstrap/js/bootstrap.min.js"></script-->
    <script src="main.js"></script>
</head>
<body>
    <?php echo $content; ?>
</body>
</html>