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

		// $user_id = $this->request->user_id;
		// $lti_id = $this->request->lti_id;



		//call appropriate function for the action provided
		switch($this->request->action){
			case "hello":
				error_log("hello has been sent through");
				break;
			case "setUserState":
				error_log("setUserState has been sent through");
				break;
			case "formSubmit":
				error_log("formSubmit has been sent through");
				//$this->setUserState()
				$this->formSubmit($this->request);
				break;
			default:
				$this->reply("action switch failed",400);
			break;
		}





		// error_log("REQUEST".json_encode($_REQUEST));

		// error_log("FILE".json_encode($_FILES));
		// //$this->reply("yay", 200);
		// $path = getcwd();

		// $path_to_dir = dirname($path).'/images';//.'/data/'.$_POST["lti_id"]."/".$_POST["user_id"]."/".$_FILES['upl']['name'];

		// error_log("path: ".$path_to_dir);


		// move_uploaded_file($_FILES['file']['tmp_name'], $path_to_dir."/test.jpg");
		

		// // get the request
		// if (!empty($_REQUEST)) {
		// 	// convert to object for consistency
		// 	$this->request = json_decode(json_encode($_REQUEST));
		// } else {
		// 	// already object
		// 	$this->request = json_decode(file_get_contents('php://input'));
		// }

		// if($this->request->action == "hello"){
		// 	$this->reply("YES I SHOULD FAIL!!", 400);
		// 	error_log("This line should never show up");
		// }else{
		// 	//$this->reply($this->request->action);
		// 	error_log("This line should never show up");
		// }

		// if (!isset($this->request->action)) {
		// 	$message = array('error' => 'No action given.');
		// 	$this->reply($message, 400);
		// } else {

		// 	$action = $this->request->action;
		// 	// call the corresponding method
		// 	if (method_exists($this, $action)) {
		// 		// $this->$action();
		// 		$requestData = $this->request->data;
		// 		switch ($action) {
		// 			case 'hello':
		// 				$this->hello();
		// 				break;
		// 			case 'setUserState':
		// 				$this->setUserState($requestData);
		// 				break;
		// 			case 'setUserEntry':
		// 				$this->setUserEntry($requestData);
		// 				break;
		// 			case 'getUserState':
		// 				$this->getUserState($requestData);
		// 				break;
		// 			case 'getUserEntry':
		// 				$this->getUserEntry($requestData);
		// 				break;
		// 			default:
		// 				break;
		// 		}


		// 	} else {
		// 		$message = array('error' => 'Method not found.');
		// 		$this->reply($message, 400);
		// 	}
		// }
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
		error_log('Log (public/api/api.php):' .date("Y-m-d h:i:sa"). PHP_EOL . $json_pretty_string.PHP_EOL."RAW: ".json_encode($content));
		

		//error_log(json_encode($content), $type);
	}
	public function hello(){
		error_log(json_encode($this->db));

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

	public function formSubmit($data){

		error_log(json_encode($data),0);
		//set entry
		//upload image





		//if fail, remove entry and file
		//reply with error

	}

	public function setUserState($data){
		
		$data = json_decode($data);
		$lti_id = $data->lti_id;
		$user_id = $data->user_id;
		$state = json_encode($data->state);

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

		
    }

	public function setUserEntry($data){

		$data = json_decode($data);
		$lti_id = $data->lti_id;
		$user_id = $data->user_id;
		$entry = $data->entry;

        date_default_timezone_set('Australia/Brisbane');
        $modified = date('Y-m-d H:i:s');
		if(!$this->checkTableExists("entries")){
				$this->db->raw("CREATE TABLE entries (
					id INT(11) UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
					user_id VARCHAR(30) NOT NULL,
					lti_id VARCHAR(30) NOT NULL,
					entry MEDIUMTEXT,
					created DATETIME DEFAULT NULL,
					updated DATETIME DEFAULT NULL
				)");
		}
		
		$existing = $this->checkEntryExists($data);
		if(!$existing) {
			$this->db->create('entries', array('lti_id'=>$lti_id,'user_id'=>$user_id, 'entry'=>$entry,'created'=>$modified,'updated'=>$modified));
		} else {
			$this->db->query('UPDATE entries SET entry = :entry WHERE lti_id = :lti_id AND user_id = :user_id', array( 'entry' => $entry, 'lti_id' => $lti_id, 'user_id' => $user_id ) );
		}


	}
    
    public function getUserState($data){
		
		$data = json_decode($data);
		$lti_id = $data->lti_id;
		$user_id = $data->user_id;
		if(!$this->checkTableExists("states")){
			$this->reply("Table 'states' for user:".$user_id." in lti:".$lti_id." not found", 404);
		}

        $select = $this->db->query( 'SELECT state FROM states WHERE lti_id = :lti_id AND user_id = :user_id', array( 'lti_id' => $lti_id, 'user_id' => $user_id ) );
        while ( $row = $select->fetch() ) {
           $this->reply($row);
        }
        $this->reply("State in table 'states' for user:".$user_id." in lti:".$lti_id." not found",404);

    }

  	public function getUserEntry($data){

		$data = json_decode($data);
		$lti_id = $data->lti_id;
		$user_id = $data->user_id;
		if(!$this->checkTableExists("entries")){
			$this->reply("Table 'entries' for user:".$user_id." in lti:".$lti_id." not found", 404);
		}

		
        $select = $this->db->query( 'SELECT entry FROM entries WHERE lti_id = :lti_id AND user_id = :user_id', array( 'lti_id' => $lti_id, 'user_id' => $user_id ) );
        while ( $row = $select->fetch() ) {
           $this->reply($row);
        }
        $this->reply("Entry in table 'entries' for user:".$user_id." in lti:".$lti_id." not found",404);


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

	private function checkStateExists($data){
		$lti_id = $data->lti_id;
		$user_id = $data->user_id;

        $select = $this->db->query( 'SELECT state FROM states WHERE lti_id = :lti_id AND user_id = :user_id', array( 'lti_id' => $lti_id, 'user_id' => $user_id ) );
        while ( $row = $select->fetch() ) {
		   return true;
        }
		return false;
	}

	private function checkEntryExists($data){

		$lti_id = $data->lti_id;
		$user_id = $data->user_id;

        $select = $this->db->query( 'SELECT entry FROM entries WHERE lti_id = :lti_id AND user_id = :user_id', array( 'lti_id' => $lti_id, 'user_id' => $user_id ) );
        while ( $row = $select->fetch() ) {
		   return true;
        }
		return false;
	}   

	private function uploadImage($data){

		$lti_id = $data->lti_id;
		$user_id = $data->user_id;
		$state = $data->state;

		error_log("UPLOAD IMAGE:".json_encode($state->image_file));

	}   

} //MyApi class end

require_once('../lib/db.php');
require_once('../config.php');

if(isset($config['use_db']) && $config['use_db']) {
	Db::config( 'driver',   'mysql' );
	Db::config( 'host',     $config['db']['hostname'] );
	Db::config( 'database', $config['db']['dbname'] );
	Db::config( 'user',     $config['db']['username'] );
	Db::config( 'password', $config['db']['password'] );
}

$db = Db::instance();


$MyApi = new MyApi($db, $config);

