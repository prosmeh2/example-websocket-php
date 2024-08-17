function addserverphp(){
	const xhr = new XMLHttpRequest();
	xhr.open("GET", "serverstart.php");
	xhr.send();	
}
addserverphp();
/////////////////////////
const socket = new WebSocket("ws://localhost:8000");
var Keys = {
        up: false,
        down: false,
        left: false,
        right: false
};
var dy=10;
var dx=10;
window.onkeydown = function(e) {
    var kc = e.keyCode;
    e.preventDefault();

    if      (kc === 37) Keys.left = true;  // only one key per event
    else if (kc === 38) Keys.up = true;    // so check exclusively
    else if (kc === 39) Keys.right = true;
    else if (kc === 40) Keys.down = true;
	if (Keys.up) {
		dy+=3;
	}
	else if (Keys.down) {  // both up and down does not work so check excl.
		dy-=3;
	}

	if (Keys.left) {
		dx+=3;
	}
	else if (Keys.right) {
		dx-=3;
	}
	socket.send(JSON.stringify({x:dx,y:dy}));
};

window.onkeyup = function(e) {
    var kc = e.keyCode;
    e.preventDefault();

    if      (kc === 37) Keys.left = false;
    else if (kc === 38) Keys.up = false;
    else if (kc === 39) Keys.right = false;
    else if (kc === 40) Keys.down = false;
};
//////////////////////////////////////////
socket.addEventListener("message", (event) => {
	var example = document.getElementById("example"),
	ctx     = example.getContext('2d');
	//console.log("Message from server ", event.data);
	var obj=JSON.parse(event.data);
	ctx.fillRect(obj.x, obj.y, 10, 10);
});
