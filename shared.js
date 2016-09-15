var ports = [];
var messages = [];
var websocket = new WebSocket("ws://localhost:8080");
websocket.onclose = function(event)
{
	for(var i = 0; i < ports.length; ++i)
	{
		ports[i].postMessage("disconnected");
	}
}
websocket.onerror = function(event)
{
	console.log(event);
	console.log("error");//this can only happen on connection I think, so kind of useless
}
websocket.onmessage = function(event)
{
	var o = JSON.parse(event.data);
	ports[o.id].postMessage(o.data)
}
websocket.onopen = function(event)
{
	while(messages.length)
	{
		websocket.send(messages.shift());
	}
}
onconnect = function(e)
{
	var computed = ports.push(e.ports[0]) - 1;
	e.ports[0].onmessage = function(evt)
	{
		var msg = JSON.stringify({id: computed, data: evt.data});
		if(websocket.readyState === 0)
		{
			messages.push(msg);
		}
		else if(websocket.readyState === 1)
		{
			websocket.send(msg);
		}
	}
}