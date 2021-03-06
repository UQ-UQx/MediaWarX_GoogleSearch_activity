<?php

class MyApi
{
	/**
	 * Object containing all incoming request params
	 * @var object
	 */
	private $request;
	private $db;
	private $config;

	public function __construct($database, $config)
	{

		$this->db = $database;
		$this->config = $config;
		$this->_processRequest();

	}

	/**
	 * Routes incoming requests to the corresponding method
	 *
	 * Converts $_REQUEST to an object, then checks for the given action and
	 * calls that method. All the request parameters are stored under
	 * $this->request.
	 */
	private function _processRequest()
	{
		// prevent unauthenticated access to API
		$this->_secureBackend();

		// get the request
		if (!empty($_REQUEST)) {
			// convert to object for consistency
			$this->request = json_decode(json_encode($_REQUEST));
		} else {
			// already object
			$this->request = json_decode(file_get_contents('php://input'));
		}

		//check if an action is sent through
		if(!isset($this->request->action)){
			//if no action is provided then reply with a 400 error with message
			$this->reply("No Action Provided", 400);
			//kill script
			exit();
		}

		//check if method for the action exists
		if(!method_exists($this, $this->request->action)){
			//if method doesn't exist, send 400 code and message with reply'
			$this->reply("Action method not found",400);
			//kill script
			exit();
		}

		
		//call appropriate function for the action provided
		// $lti_id = $this->request->lti_id;
		// $user_id = $this->request->user_id;

		switch($this->request->action){
			case "hello":
				//error_log("hello has been sent through");
				break;
			case "getAppSettings":
				error_log("getAppSettings has been sent through");

				$data = json_decode($this->request->data);
				//error_log($data->lti_id);
				$this->getAppSettings($data->lti_id);
				break;
			case "setAppSettings":
				error_log("setAppSettings has been sent through");

				$request = $this->request;
				$app_settings = json_decode($request->app_settings, true);

				$this->setAppSettings($request->lti_id, $app_settings);
				break;
			case "getUserState":
				error_log("getUserState has been sent through");

				$data = json_decode($this->request->data);
				//error_log($data->lti_id);
				$this->getUserState($data->lti_id, $data->user_id);
				break;
			case "setUserState":
				//error_log("setUserState has been sent through");
				break;
			case "formSubmit":
				//error_log("formSubmit has been sent through");
				$this->formSubmit($this->request, $_FILES);
				break;
			case "getAllEntries":
				//error_log("formSubmit has been sent through");
				$data = json_decode($this->request->data);
				$this->getAllEntries($data->lti_id);
				break;
			default:
				$this->reply("action switch failed",400);
			break;
		}


	}

	/**
	 * Prevent unauthenticated access to the backend
	 */
	private function _secureBackend()
	{
		if (!$this->_isAuthenticated()) {
			header("HTTP/1.1 401 Unauthorized");
			exit();
		}
	}

	/**
	 * Check if user is authenticated
	 *
	 * This is just a placeholder. Here you would check the session or similar
	 * to see if the user is logged in and/or authorized to make API calls.
	 */
	private function _isAuthenticated()
	{
		return true;
	}

	/**
	 * Returns JSON data with HTTP status code
	 *
	 * @param  array $data - data to return
	 * @param  int $status - HTTP status code
	 * @return JSON
	 */
	private function reply($data, $status = 200){
        $protocol = (isset($_SERVER['SERVER_PROTOCOL']) ? $_SERVER['SERVER_PROTOCOL'] : 'HTTP/1.1');
        header($protocol . ' ' . $status);
		header('Content-Type: application/json');
		echo json_encode($data);
		exit;
	}
	private function my_log($content, $type = 0){

		
		date_default_timezone_set("Australia/Brisbane");
		$log_array = json_decode($content, true);
		$json_pretty_string = json_encode($log_array, JSON_PRETTY_PRINT);
		//error_log('Log (public/api/api.php):' .date("Y-m-d h:i:sa"). PHP_EOL . $json_pretty_string.PHP_EOL."RAW: ".json_encode($content));
		

		////error_log(json_encode($content), $type);
	}
	public function hello(){
		//error_log(json_encode($this->db));

		$this->reply('Hello from the API!');
	}

	/**
	 * Determines if the logged in user has admin rights
	 *
	 * This is just a placeholder. Here you would check the session or database
	 * to see if the user has admin rights.
	 *
	 * @return boolean
	 */
	public function isAdmin()
	{
		$this->reply(true);
	}

	public function formSubmit($data, $files){
		error_log(json_encode($files));

		$state = json_decode($data->app_state);
		$user_id = $data->user_id;
		$lti_id = $data->lti_id;
		$ltiCallData = json_decode(file_get_contents("../data/".$data->lti_id."/".$data->user_id."/calldata.json"));

		$image_url = null;

		$fileDetails = $this->uploadImage($lti_id, $user_id, $files, $state);
		error_log("FILESSS:".json_encode($fileDetails));
		$image_url = $fileDetails["filename"];
		$size = $fileDetails["size"];
		
		

		$entry = array(
			"location_name"=>$state->location_name,
            "location_lat"=>$state->location_lat,
            "location_lng"=>$state->location_lng,
            "age"=>$state->age,
			"agerange"=>$state->agerange,
            "gender"=>$state->gender,
            "nationality"=>$state->nationality,
            "education"=>$state->education,
            "tags"=>$state->tags,
            "location_static_map"=>$state->location_static_map,
            "image_filename"=>$image_url,
			"default_image_url"=>$state->default_image_url,
			"image_size"=>$size,
			"device"=>$state->device,
			"date_of_capture"=>$state->dateOfCapture,
			"country_of_newspaper"=>$state->country_of_newspaper,
			"name_of_newspaper"=>$state->name_of_newspaper,
			"name_of_photo_origin"=>$state->name_of_photo_origin,
			"caption_of_photo"=>$state->caption_of_photo
		);

		//error_log("ENTRY: ".json_encode($state));

		$state->submitted = true;
		$state->selected_page = "map_page";

		$this->setUserState($lti_id, $user_id, $state);
		$this->setUserEntry($lti_id, $user_id, $entry);
		send_grade(1, $this->config, $data->lti_grade_url, $data->result_sourcedid, $data->lti_consumer_key);
		$this->reply($state, 200);

	}

	public function setAppSettings($lti_id, $app_settings){
		$app_settings = json_encode($app_settings);
        date_default_timezone_set('Australia/Brisbane');
        $modified = date('Y-m-d H:i:s');
		if(!$this->checkTableExists("app_settings_table")){
				$this->db->raw("CREATE TABLE app_settings_table (
					id INT(11) UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
					lti_id TEXT NOT NULL,
					app_settings MEDIUMTEXT,
					created DATETIME DEFAULT NULL,
					updated DATETIME DEFAULT NULL
				)");
		}
		$existing = $this->checkapp_settingsExists($lti_id);
		if(!$existing) {
			$this->db->create('app_settings_table', array('lti_id'=>$lti_id, 'app_settings'=>$app_settings,'created'=>$modified,'updated'=>$modified));
		} else {
			$this->db->query('UPDATE app_settings_table SET app_settings = :app_settings WHERE lti_id = :lti_id', array( 'app_settings' => $app_settings, 'lti_id' => $lti_id ) );
		}
    }

	private function checkapp_settingsExists($lti_id){

        $select = $this->db->query( 'SELECT app_settings FROM app_settings_table WHERE lti_id = :lti_id', array( 'lti_id' => $lti_id ) );
        while ( $row = $select->fetch() ) {
		   return true;
        }
		return false;

	}

	public function getAppSettings($lti_id){
		
		if(!$this->checkTableExists("app_settings_table")){
			$this->reply("Table 'app_settings_table' for lti:".$lti_id." not found", 404);
		}

        $select = $this->db->query( 'SELECT app_settings FROM app_settings_table WHERE lti_id = :lti_id', array( 'lti_id' => $lti_id) );
        while ( $row = $select->fetch() ) {
           $this->reply($row);
        }
        $this->reply("app_settings in table 'app_settings_table' for lti:".$lti_id." not found",404);

    }









	public function setUserState($lti_id, $user_id, $state){
		
		$state = json_encode($state);

        date_default_timezone_set('Australia/Brisbane');
        $modified = date('Y-m-d H:i:s');
		if(!$this->checkTableExists("states")){
				$this->db->raw("CREATE TABLE states (
					id INT(11) UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
					user_id TEXT NOT NULL,
					lti_id TEXT NOT NULL,
					state MEDIUMTEXT,
					created DATETIME DEFAULT NULL,
					updated DATETIME DEFAULT NULL
				)");
		}
		$existing = $this->checkStateExists($lti_id, $user_id);
		if(!$existing) {
			$this->db->create('states', array('lti_id'=>$lti_id,'user_id'=>$user_id, 'state'=>$state,'created'=>$modified,'updated'=>$modified));
		} else {
			$this->db->query('UPDATE states SET state = :state WHERE lti_id = :lti_id AND user_id = :user_id', array( 'state' => $state, 'lti_id' => $lti_id, 'user_id' => $user_id ) );
		}

    }

	public function setUserEntry($lti_id, $user_id, $entry){

		$entry = json_encode($entry);

        date_default_timezone_set('Australia/Brisbane');
        $modified = date('Y-m-d H:i:s');
		if(!$this->checkTableExists("entries")){
				$this->db->raw("CREATE TABLE entries (
					id INT(11) UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
					user_id TEXT NOT NULL,
					lti_id TEXT NOT NULL,
					entry MEDIUMTEXT,
					created DATETIME DEFAULT NULL,
					updated DATETIME DEFAULT NULL
				)");
		}
		
		$existing = $this->checkEntryExists($lti_id, $user_id);
		if(!$existing) {
			$this->db->create('entries', array('lti_id'=>$lti_id,'user_id'=>$user_id, 'entry'=>$entry,'created'=>$modified,'updated'=>$modified));
		} else {
			$this->db->query('UPDATE entries SET entry = :entry WHERE lti_id = :lti_id AND user_id = :user_id', array( 'entry' => $entry, 'lti_id' => $lti_id, 'user_id' => $user_id ) );
		}


	}
    
    public function getUserState($lti_id, $user_id){
		
		$userState = null;
		$appSettings = null;
		$updatedState = array();

		if($this->checkTableExists("states")){
			//$this->reply("Table 'states' for user:".$user_id." in lti:".$lti_id." not found", 404);
			$select = $this->db->query( 'SELECT state FROM states WHERE lti_id = :lti_id AND user_id = :user_id', array( 'lti_id' => $lti_id, 'user_id' => $user_id ) );
			while ( $row = $select->fetch() ) {
				$userState = $row;
			}

			if($userState){
				foreach (json_decode($userState->state,true) as $stateItemKey => $stateItemValue) {
					$updatedState[$stateItemKey] = $stateItemValue;
				}
			}
		}


		if($this->checkTableExists("app_settings_table")){

			$select_app_settings = $this->db->query( 'SELECT app_settings FROM app_settings_table WHERE lti_id = :lti_id', array( 'lti_id' => $lti_id) );
			while ( $row = $select_app_settings->fetch() ) {
				$appSettings = $row;
			}

			if($appSettings){
				foreach (json_decode($appSettings->app_settings,true) as $settingKey => $settingVal) {
					$updatedState["temp_".$settingKey] = $settingVal;
					$updatedState[$settingKey] = $settingVal;
				}
			}
		}

		$this->reply($updatedState);
    }

  	public function getUserEntry($lti_id, $user_id){


		if(!$this->checkTableExists("entries")){
			$this->reply("Table 'entries' for user:".$user_id." in lti:".$lti_id." not found", 404);
		}

		
        $select = $this->db->query( 'SELECT entry FROM entries WHERE lti_id = :lti_id AND user_id = :user_id', array( 'lti_id' => $lti_id, 'user_id' => $user_id ) );
        while ( $row = $select->fetch() ) {
           $this->reply($row);
        }
        $this->reply("Entry in table 'entries' for user:".$user_id." in lti:".$lti_id." not found",404);


    }

	public function getAllEntries($lti_id){


		if(!$this->checkTableExists("entries")){
			$this->reply("Table 'entries' for lti:".$lti_id." not found", 404);
		}

		
        $select = $this->db->query( 'SELECT * FROM entries WHERE lti_id = :lti_id', array( 'lti_id' => $lti_id) );
       
		//if($select->fetch_all()){
			$this->reply($select->all());
		//}
        //$this->reply("Entry in table 'entries' for lti:".$lti_id." not found",404);


    }

	private function checkTableExists($tableName){
		$select = $this->db->query("SELECT * 
			FROM information_schema.tables
			WHERE table_schema = :dbname 
				AND table_name = :tablename
			LIMIT 1", array("dbname"=>$this->config["db"]["dbname"], "tablename"=>$tableName));
		if($select->fetch()){
			return true;
		}
		return false;
	}

	private function checkStateExists($lti_id, $user_id){

        $select = $this->db->query( 'SELECT state FROM states WHERE lti_id = :lti_id AND user_id = :user_id', array( 'lti_id' => $lti_id, 'user_id' => $user_id ) );
        while ( $row = $select->fetch() ) {
		   return true;
        }
		return false;

	}

	private function checkEntryExists($lti_id, $user_id){

        $select = $this->db->query( 'SELECT entry FROM entries WHERE lti_id = :lti_id AND user_id = :user_id', array( 'lti_id' => $lti_id, 'user_id' => $user_id ) );
        while ( $row = $select->fetch() ) {
		   return true;
        }
		return false;
	}   

	private function uploadImage($lti_id, $user_id, $files, $state){

		
		$fileName = $user_id."_screencapture.jpg";
		$path = getcwd();
		$path_to_dir = dirname($path).'/data/'.$lti_id."/".$user_id;//."/".$files['file']['name'];

		if(count($files) > 0){
			
			list($width, $height) = getimagesize($files['file']['tmp_name']);
			move_uploaded_file($files['file']['tmp_name'], $path_to_dir."/".$fileName);
		}else{

			list($width, $height) = getimagesize(dirname($path)."/".$state->default_image_url);
			copy(dirname($path)."/".$state->default_image_url, $path_to_dir."/".$fileName);

		}


		return array("filename"=>$fileName,"size"=>array("width"=>$width,"height"=>$height));
	}   

} //MyApi class end

require_once('../lib/db.php');
require_once('../config.php');
require_once('../lib/OAuth.php');
require_once('../lib/grade.php');

if(isset($config['use_db']) && $config['use_db']) {
	Db::config( 'driver',   'mysql' );
	Db::config( 'host',     $config['db']['hostname'] );
	Db::config( 'database', $config['db']['dbname'] );
	Db::config( 'user',     $config['db']['username'] );
	Db::config( 'password', $config['db']['password'] );
}

$db = Db::instance();


$MyApi = new MyApi($db, $config);

