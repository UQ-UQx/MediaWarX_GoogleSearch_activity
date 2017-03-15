<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>LTI React PHP Base</title>

        <?php
        	require_once('./config.php');
        	require_once('./lib/lti.php');
        	$lti = new Lti($config,true);
        	if(isset($config['use_db']) && $config['use_db']) {
        		require_once('./lib/db.php');
        		Db::config( 'driver',   'mysql' );
        		Db::config( 'host',     $config['db']['hostname'] );
        		Db::config( 'database', $config['db']['dbname'] );
        		Db::config( 'user',     $config['db']['username'] );
        		Db::config( 'password', $config['db']['password'] );
        	}

        ?>

        <?php
        	$dev_message = '<div class="lti_dev_message">

                LTI Development In Progress - Please Contact UQx Technical Team

        	</div>';

        	$valid_message = '<div class="lti_valid_message">LTI Valid</div>';

        	$invalid_message = '<div class="lti_invalid_message">LTI Invalid - Please Contact UQx</div>';

        	echo $dev_message;
        	if($lti->is_valid()) {
        		echo $valid_message;
        	} else {
        		echo $invalid_message;
        		//die();
        	}
        ?>

    </head>
    <body>
    <div id="app"></div>
    <script type="text/javascript" src="./build/bundle.js"></script>
    </body>
</html>
