<?php
set_time_limit(0);
include "websocket.php";
$server =new WebSocketServer("127.0.0.1",8000);
$server->handler = function($self,$connect, $data) {
	foreach ($self->connects as $vv){
		   WebSocketServer::response($vv, $data);
	}

};
$server->startServerevent= function($self){
};
$server->startServer();
echo "yestserver"
?>