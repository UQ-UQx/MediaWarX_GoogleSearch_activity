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


			//Save user lti vars if none exist
						echo("BLUEE!!");

			/**
				$ltivars = $lti->calldata();

				$lti_id = $lti->context_id()."_".$lti->resource_id();
 				$user_id = $lti->user_id();

				date_default_timezone_set('Australia/Brisbane');
				$modified = date('Y-m-d H:i:s');
				if(!$this->checkTableExists("states")){
						$this->db->raw("CREATE TABLE states (
							id INT(11) UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
							user_id VARCHAR(30) NOT NULL,
							lti_id VARCHAR(30) NOT NULL,
							state MEDIUMTEXT,
							created DATETIME DEFAULT NULL,
							updated DATETIME DEFAULT NULL
						)");
				}
				$existing = $this->checkStateExists($data);
				if(!$existing) {
					$this->db->create('states', array('lti_id'=>$lti_id,'user_id'=>$user_id, 'state'=>$state,'created'=>$modified,'updated'=>$modified));
				} else {
					$this->db->query('UPDATE states SET state = :state WHERE lti_id = :lti_id AND user_id = :user_id', array( 'state' => $state, 'lti_id' => $lti_id, 'user_id' => $user_id ) );
				}

				$this->uploadImage($data);

				*/



		
        ?>
        <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=**API_KEY**&libraries=visualization"></script>

    </head>
    <body>
    <div id="app"></div>
    <script type="text/javascript" src="./build/bundle.js"></script>
    </body>
</html>
