<?php 
// Exit if accessed directly
defined('ABSPATH') OR exit;
header("Access-Control-Allow-Origin: *");
class React_Controller{
    function __construct(){
        static::startSession();
	    add_action('wp_ajax_add_to_order', array(__CLASS__, 'addToOrder'));
	    add_action('wp_ajax_nopriv_add_to_order', array(__CLASS__, 'addToOrder'));	
    }
    public static function addToOrder(){
        $objData      = json_decode(file_get_contents('php://input'));
        $intProductId = isset($objData->id)         ? $objData->id : '';
        $strStartDate = isset($objData->start_date) ? $objData->start_date : '';
        $strEndDate   = isset($objData->end_date)   ? $objData->end_date : '';
        $intAdult 	  = isset($objData->adults)     ? (int) $objData->adults : 0;
        $intChilds 	  = isset($objData->childs)     ? (int) $objData->childs : 0;
        $_SESSION['order'][] = array(
            'id' => $intProductId,
            'start_date' => $strStartDate,
            'end_date' => $strEndDate,   
            'adults' => $intAdult,
            'childs' => $intChilds
        );
        var_dump($_SESSION);
        die;
    }

    public static function startSession(){
        if(!session_id()){
            session_start();
        }
    }
}
new React_Controller;
?>