<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title><?php echo App::getInstance()->title; ?></title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" type="text/css" media="screen" href="bootstrap/css/bootstrap.min.css" />
        <link rel="stylesheet" type="text/css" media="screen" href="css/main.css" />
        <!--script src="bootstrap/js/bootstrap.min.js"></script-->
    </head>
    <body>
        <div class="container" id="container">
            <?php //echo $content; ?>
            <router-view></router-view>
        </div>
        <?php echo $content; ?>
        <script src="js/axios.js"></script>
        <script src="js/vue.js"></script>
        <script src="js/vue-router.js"></script>
        <script src="js/main.js"></script>
    </body>
</html>
