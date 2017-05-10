<?php

class MyApi
{
	/**
	 * Object containing all incoming request params
	 * @var object
	 */
	private $request;
	private $db;


	public function __construct($database)
	{

		$this->db = $database;

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

		// get the action
		$action = $this->request->action;

		if (empty($action)) {
			$message = array('error' => 'No method given.');
			$this->reply($message, 400);
		} else {
			// call the corresponding method
			if (method_exists($this, $action)) {
				// $this->$action();
				switch ($action) {
					case 'hello':
						$this->hello();
						break;
					case 'setState':
						$this->setState($this->request->data);
						break;
					case 'setUserEntry':
						$this->setUserEntry($this->request->data);
						break;
					default:
						break;
				}


			} else {
				$message = array('error' => 'Method not found.');
				$this->reply($message, 400);
			}
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
		error_log('Log (public/api/api.php):' .date("Y-m-d h:i:sa"). PHP_EOL . $json_pretty_string.PHP_EOL."RAW: ".json_encode($content));
		

		//error_log(json_encode($content), $type);
	}
	public function hello(){
		error_log(json_encode($this->db));



        // // $this->db->raw("CREATE TABLE states (
		// -- 				id INT(11) UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
		// -- 				user_id VARCHAR(30) NOT NULL,
		// -- 				lti_id VARCHAR(30) NOT NULL,
		// -- 				state MEDIUMTEXT,
		// -- 				created DATETIME DEFAULT NULL,
		// -- 				updated DATETIME DEFAULT NULL
		// -- 				)");

		// date_default_timezone_set('Australia/Brisbane');
        // $modified = date('Y-m-d H:i:s');

		// $this->db->create('test', array('lti_id'=>"this will be id but in text form "));

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


	public function setState($data){
		
		$data = json_decode($data);
		$lti_id = $data->lti_id;
		$user_id = $data->user_id;
		$state = $data->state;

        date_default_timezone_set('Australia/Brisbane');
        $modified = date('Y-m-d H:i:s');
        $existing = $this->getstate($data);
        if(!$existing) {
			$this->db->raw("CREATE TABLE states (
					id INT(11) UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
					user_id VARCHAR(30) NOT NULL,
					lti_id VARCHAR(30) NOT NULL,
					state MEDIUMTEXT,
					created DATETIME DEFAULT NULL,
					updated DATETIME DEFAULT NULL
					)");
            $this->db->create('states', array('lti_id'=>$lti_id,'user_id'=>$user_id, 'state'=>$state,'created'=>$modified,'updated'=>$modified));
        } else {
            $this->db->query('UPDATE states SET state = :state WHERE lti_id = :lti_id AND user_id = :user_id', array( 'state' => $state, 'lti_id' => $lti_id, 'user_id' => $user_id ) );
        }
    }

	public function setUserEntry($data){

		$data = json_decode($data);
		$lti_id = $data->lti_id;
		$user_id = $data->user_id;
		$entry = $data->entry;

        date_default_timezone_set('Australia/Brisbane');
        $modified = date('Y-m-d H:i:s');
        $existing = $this->getEntry($data);
        if(!$existing) {
			$this->db->raw("CREATE TABLE entries (
					id INT(11) UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
					user_id VARCHAR(30) NOT NULL,
					lti_id VARCHAR(30) NOT NULL,
					entry MEDIUMTEXT,
					created DATETIME DEFAULT NULL,
					updated DATETIME DEFAULT NULL
					)");
            $this->db->create('entries', array('lti_id'=>$lti_id,'user_id'=>$user_id, 'entry'=>$state,'created'=>$modified,'updated'=>$modified));
        } else {
            $this->db->query('UPDATE entries SET entry = :entry WHERE lti_id = :lti_id AND user_id = :user_id', array( 'entry' => $entry, 'lti_id' => $lti_id, 'user_id' => $user_id ) );
        }

	}
    
    public function getState($data){

		//$data = json_decode($data);
		$lti_id = $data->lti_id;
		$user_id = $data->user_id;
		
        $select = $this->db->query( 'SELECT state FROM states WHERE lti_id = :lti_id AND user_id = :user_id', array( 'lti_id' => $lti_id, 'user_id' => $user_id ) );
        while ( $row = $select->fetch() ) {
           $this->reply($row);
        }
        $this->reply(null,400);

    }

  	public function getEntry($data){

		//$data = json_decode($data);
		$lti_id = $data->lti_id;
		$user_id = $data->user_id;
		
        $select = $this->db->query( 'SELECT entry FROM entries WHERE lti_id = :lti_id AND user_id = :user_id', array( 'lti_id' => $lti_id, 'user_id' => $user_id ) );
        while ( $row = $select->fetch() ) {
           $this->reply($row);
        }
        $this->reply(null,400);

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


$MyApi = new MyApi($db);
