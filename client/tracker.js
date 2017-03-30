var g_User = {}; // the current user
var g_Listener = location.pathname + location.hash; // the path we are going to be listening to
var g_rgToasts = [{name:"Bob"}, {name:"Billy"}, {name:"Ryan"}]; // array of toasts to iterate through
var g_ToastInterval; // Interval ID of our toast rendering function

const ENABLE_TRACKER = true;
const SOCKET_SERVER_URL = "http://localhost";
const SOCKET_SERVER_PORT = ":8000";

$(document).ready(function (){
	
	if( !ENABLE_TRACKER ){
		// tracker is disabled, stop execution
		return;
	}
	
	function renderToasts()
	{
		console.log ("g_rgToasts", g_rgToasts );
		$msg = $('#message');
		if( g_rgToasts.length > 0 ) {
			const user = g_rgToasts.pop(); // get a user off our stack
			if( !user.name )
			{
				user.name = user.login;
			}
			// <h2 id="message" class="ui message header" style=""><img class="ui mini circular image" src="https://avatars2.githubusercontent.com/u/7477471?v=3">
			//
			// 	<div class="content">Bob is now viewing</div>
			// </h2>
			var $h2 = $( "<h2>", {"class": 'ui message header'})
				.append(
					$("<img>", {"class": "ui mini circular image", src: user.avatar_url})
				)
				.append(
					$("<div>", {"class": "content"}).html( "<u>" + user.name + "</u> is now viewing" )
				);
			var $p = $( "<p>", {"class": 'adsfsdf'} ).text( user.name + " is now viewing" ); // build element to render
			$msg.slideDown().html( $h2 ).hide().fadeIn(); // render toast
		}
		else
		{
			// We emptied the stack so lets stop calling this function
			clearInterval(g_ToastInterval);
			g_ToastInterval = null; // Reset our interval ID
			$msg.slideUp(); // Hide notifcation div
		}
	}
	
	
	// this triggers the connection event in our server!
	// var socket = io.connect('http://localhost:8001/');
	var socket = io.connect(SOCKET_SERVER_URL + SOCKET_SERVER_PORT);
	
	var $msg = $("<div>", {"id": "message", "class": "errors"}); // build parent notifcation element
	$('body').prepend($msg); // insert parent notifcation element into the DOM
	
	window.emitNav = function()
	{
		if( g_Listener )
		{
			// We have navigated to a new page so stop listening to the previous page
			socket.removeListener(g_Listener);
		}
		g_Listener = location.pathname + location.hash; // define our new path to listen to
		console.log("Rendered new view, emitting page_load");

		socket.emit('page_load', {user: g_User, location: location}); // tell the server we navigated to a new location
		
		console.log("Listening on", g_Listener);
		socket.on(g_Listener, function ( data ) {
			console.log('Listener results:', data);
			g_rgToasts.push(data.user);
			if(!g_ToastInterval)
			{
				renderToasts();
				g_ToastInterval = setInterval(renderToasts, 2500);
			}
		});
	};

	window.onhashchange = emitNav;
	
	$(window).bind('beforeunload', function(){
		console.log(g_User,"is leaving", window.location.href);
		// socket.emit('page_unload', {user: g_User, location: location});
	});
	
	
	// listener = "/";
	
	
	$('button').click(function (){
		socket.emit("button_clicked", {reason: "because I want to learn about sockets!"});
	});
	
	socket.on("reader", function ( data ) {
		console.log('Reader: ' + data);
		$('#tracker').html(data.user + " is now reading " + data.base_url );
		$('#message').slideDown();
	});
	
	
	$('form').submit(function () {
		event.preventDefault();
		console.log('Submitting the form via sockets...');
		var form = {
			name: $('#name').val(),
			loc: $("#location").val(),
			lang: $("#lang").val(),
			comment: $("#comment").val(),
		};
		socket.emit( "posting_form", {form:form} );
	});
	
	socket.on('server_response', function (data){
		console.log('The server says: ' + data.response);
	});
	
	socket.on('updated_message', function (data){
		var form = data;
		console.log('The server says: ' + JSON.stringify(data));
		$('#form_data').text(`name: '${form.name}', location: '${form.loc}', language: '${form.lang}', comment: '${form.comment}'`);
	});
	
	socket.on('random_number', function (data){
		console.log('The server says: ' + data.response);
		$('#lucky').text(data.response);
		$('#message').slideDown();
	});
});