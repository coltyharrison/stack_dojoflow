var g_User = {}; // the current user
var g_Listener = location.pathname + location.hash; // the path we are going to be listening to
var g_rgToasts = [{name:"Bob", avatar_url: "https://avatars0.githubusercontent.com/u/23123?v=3&s=400"}, {name:"Billy", avatar_url:"https://avatars1.githubusercontent.com/u/3842698?v=3&s=460"}, {name:"Ryan", avatar_url: "https://avatars3.githubusercontent.com/u/5647963?v=3&s=460"}]; // array of toasts to iterate through
var g_ToastInterval; // Interval ID of our toast rendering function

const ENABLE_TRACKER = true;
const SOCKET_SERVER_URL = "http://localhost";
const SOCKET_SERVER_PORT = ":8000";
const LISTEN_TO_SELF = true; // For Debugging, users can broadcast events to themselves

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
					$("<div>", {"class": "content"}).html( "<a href='#!/user/" + user.id + "'>" + user.name + "</a> is now viewing" )
				); // build element to render
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
			
			if( data.user.id > 0 && (data.user.login != g_User.login || LISTEN_TO_SELF) )
			{
				g_rgToasts.unshift(data.user);
			}
			else{
				return;
			}
			
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
	
});