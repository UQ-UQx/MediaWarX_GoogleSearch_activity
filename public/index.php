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


			$lti_id = $lti->lti_id();
			$user_id = $lti->user_id();
			$calldata = $lti->calldata();

		
			$oldmask = umask(0);
			if (!file_exists('data/'.$lti_id)) {
				mkdir('data/'.$lti_id, 0777, true);
				error_log("Creating folder for LTI",0);
			}
			if (!file_exists('data/'.$lti_id."/".$user_id)) {
				mkdir('data/'.$lti_id."/".$user_id, 0777, true);
				error_log("Creating folder for LTI User",0);
			}
			if (!file_exists('data/'.$lti_id."/".$user_id."/calldata.json")) {
				$myfile = fopen('data/'.$lti_id."/".$user_id."/calldata.json", "w");
				fwrite($myfile, json_encode($calldata));
				fclose($myfile);
				error_log("Creating variables json file for lti",0);
			} else {
				$calldataString = file_get_contents("data/".$lti_id."/".$user_id."/calldata.json");
				$calldataDecoded = json_decode($calldataString, true);
				if(count(array_diff($calldata, $calldataDecoded)) != 0){
					file_put_contents('data/'.$lti_id."/".$user_id."/calldata.json", json_encode($calldata));
				}
			}
			umask($oldmask);

			


			//Save user lti vars if none exist
			if($lti->is_dev()){
				echo "<pre>";
				print_r($lti->calldata());
				echo "</pre>";
			}


		
        ?>

        <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBQ7RQL3LDtmQ4ccxW_uBZLflfETkaKE6U&libraries=visualization"></script>

    </head>
    <body>
	<script type="text/javascript">
		$LTI_resourceID = '<?php echo $lti_id ?>';
		$LTI_userID = '<?php echo $user_id ?>';
	</script>
    <div id="app"></div>
    <script type="text/javascript" src="./build/bundle.js"></script>
	
    </body>
</html>
