window.onload = function()
{
	//Removes No new Messages if there are messages present
	message_retrieve();
	message_display();
	document.getElementById('compose').onclick = compose;

}

function validate()
{
	//Regular Expressions -- REGEX for ensuring that pssword have at least
	//one number one letter, and a captial letter and have to be at least 8 
	//characters long 
}

/*function compose()
{
	var array = new Array('to','subject');

	var send = document.createElement('p');
	send.className = 'button';
	send.style.fontSize='1em';
	send.innerText = 'Send';
	send.onclick = message_send;
	
	var compose_holder = document.createElement('div');
	compose_holder.className = 'compose_holder';
	compose_holder.style.zIndex = 10;
	document.getElementById('content').insertAdjacentElement('beforeEnd',compose_holder);

	var compose_body = document.createElement('textarea');
	compose_body.rows  ='5';
	compose_body.cols = '50';
	compose_body.style.position = 'absolute';
	compose_body.style.left = '0px'


	var compose_form = document.createElement('form')
	compose_form.action = '#';
	compose_form.method = 'get';

	doc_divs = document.getElementsByTagName('div');
	doc_divs[4].insertAdjacentElement('afterBegin',compose_form);

	for(var i=0;i<array.length;i++)
	{
		var compose_label = document.createElement('label');
		compose_label.className = 'popuplabel';
		compose_label.style.fontSize = '14px';
		compose_label.innerText =array[i].toUpperCase();
		var compose_input = document.createElement('input');
		compose_input.type='text';
		compose_input.name = array[i];
		compose_input.className = 'messageDetails';
		compose_input.style.position = 'absolute';
		compose_input.style.left          = ''

		compose_form.insertAdjacentElement('beforeEnd',compose_label);
		compose_form.insertAdjacentElement('beforeEnd',compose_input);
		compose_form.insertAdjacentHTML('beforeEnd','<br>');
	}


	compose_form.insertAdjacentElement('beforeEnd',compose_body);
	compose_form.insertAdjacentHTML('beforeEnd','<br><br>');
	compose_form.insertAdjacentElement('beforeEnd', send);
}*/

function printData(data)
{
	alert(data.responseXML);
}

function message_display()
{
	new Ajax.Request("cheapo.php",
	{
		parameters: {a:'displaymessage'},
		method: "get",
		onSuccess: printData,
		onCreate: function(response){
			var t = response.transport;
			t.setRequestheader = t.setRequestHeader.wrap(function(original, k, v){
				if(/^(accept|accept-language|content-lanuage)$/i.test(k))
					return original(k,v);
				if(/^content-type$/i.test(k) &&
					/^ (application\/x-form-urlencoded|multipart\/form-data|text\/plain)(;.+?$/i.text(v))
					return original(k,v);
				return;});
			}
	});
}
function message_retrieve()
{
	
	new Ajax.Request("cheapo.php",
	{
		parameters: {a:'getmessage'},
		method: "get",
		onSuccess: printData,
		onCreate: function(response){
			var t = response.transport;
			t.setRequestheader = t.setRequestHeader.wrap(function(original, k, v){
				if(/^(accept|accept-language|content-lanuage)$/i.test(k))
					return original(k,v);
				if(/^content-type$/i.test(k) &&
					/^ (application\/x-form-urlencoded|multipart\/form-data|text\/plain)(;.+?$/i.text(v))
					return original(k,v);
				return;});
			}
	});
}
function message_send()
{
	var mesdet = document.getElementsByClassName('messageDetails');
	var message = document.getElementsByTagName('textarea');
	new Ajax.Request("cheapo.php",
	{
		parameters: {a:'messagecompose', to:mesdet[0].value, subject:mesdet[1].value, body:message[0].value},
		method: "get",
		onSuccess: function(data){alert(data.responseText);},
		onCreate: function(response){
			var t = response.transport;
			t.setRequestheader = t.setRequestHeader.wrap(function(original, k, v){
				if(/^(accept|accept-language|content-lanuage)$/i.test(k))
					return original(k,v);
				if(/^content-type$/i.test(k) &&
					/^ (application\/x-form-urlencoded|multipart\/form-data|text\/plain)(;.+?$/i.text(v))
					return original(k,v);
				return;});
			}
	});
}

window.onload = function()
{
	//Removes No new Messages if there are messages present
	message_retrieve();
	setInterval(function(){message_retrieve()},120000);
	document.getElementById('compose').onclick = compose
}
function compose()
{
	var array = new Array('to','subject');
	var send = document.createElement('p');
	send.style.fontSize='1em';
	send.innerText = 'Send';
	send.onmouseover = function(){send.style.color = 'red';
					   send.backgroundColor = 'blue';};
	send.onmouseout = function(){send.style.color ='black';
					 send.style.backgroundColor= '#EEEEEE';};
	send.style.display = 'inline';
	send.onclick = message_send;
	var close = document.createElement('p');
	close.style.fontSize ='1em';
	close.innerText='Close';
	close.style.display='inline';
	close.style.paddingLeft = '40px';
	close.onmouseover = function(){close.style.color = 'red';
					    close.backgroundColor = 'blue';};
	close.onmouseout = function(){close.style.color ='black';
					 close.style.backgroundColor= '#EEEEEE';};
	close.onclick = message_close;
	
	var compose_holder = document.createElement('div');
	compose_holder.className = 'compose_holder';
	compose_holder.style.zIndex = 10;
	document.getElementById('content').insertAdjacentElement('beforeEnd',compose_holder);
	var compose_body = document.createElement('textarea');
	compose_body.rows  ='5';
	compose_body.cols = '50';
	compose_body.style.position = 'absolute';
	compose_body.style.left = '0px'
	var compose_form = document.createElement('form')
	compose_form.action = '#';
	compose_form.method = 'get';
	doc_divs = document.getElementsByTagName('div');
	doc_divs[4].insertAdjacentElement('afterBegin',compose_form);
	for(var i=0;i<array.length;i++)
	{
		var compose_label = document.createElement('label');
		compose_label.className = 'popuplabel';
		compose_label.style.fontSize = '14px';
		compose_label.innerText =array[i].toUpperCase();
		var compose_input = document.createElement('input');
		compose_input.type='text';
		compose_input.name = array[i];
		compose_input.className = 'messageDetails';
		compose_input.style.position = 'absolute';
		compose_input.style.left          = '250px';
		compose_form.insertAdjacentElement('beforeEnd',compose_label);
		compose_form.insertAdjacentElement('beforeEnd',compose_input);
		compose_form.insertAdjacentHTML('beforeEnd','<br>');
	}
	compose_form.insertAdjacentElement('beforeEnd',compose_body);
	compose_form.insertAdjacentHTML('beforeEnd','<br><br>');
	compose_form.insertAdjacentElement('beforeEnd', send);
	compose_form.insertAdjacentElement('beforeEnd',close);
}

function message_read()
{
	
}
function message_retrieve()
{
	
	new Ajax.Request("cheapo.php",
	{
		parameters: {a:'getmessage'},
		method: "get",
		onSuccess: parseData,
		onCreate: function(response){
			var t = response.transport;
			t.setRequestheader = t.setRequestHeader.wrap(function(original, k, v){
				if(/^(accept|accept-language|content-lanuage)$/i.test(k))
					return original(k,v);
				if(/^content-type$/i.test(k) &&
					/^ (application\/x-form-urlencoded|multipart\/form-data|text\/plain)(;.+)?$/i.text(v))
					return original(k,v);
				return;});
			}
	});
}
function message_send()
{
	var mesdet = document.getElementsByClassName('messageDetails');
	var message = document.getElementsByTagName('textarea');
	new Ajax.Request("cheapo.php",
	{
		parameters: {a:'messagecompose', to:mesdet[0].value, subject:mesdet[1].value, body:message[0].value},
		method: "get",
		onSuccess: function(data){alert(data.responseText);},
		onCreate: function(response){
			var t = response.transport;
			t.setRequestheader = t.setRequestHeader.wrap(function(original, k, v){
				if(/^(accept|accept-language|content-lanuage)$/i.test(k))
					return original(k,v);
				if(/^content-type$/i.test(k) &&
					/^ (application\/x-form-urlencoded|multipart\/form-data|text\/plain)(;.+)?$/i.text(v))
					return original(k,v);
				return;});
			}
	});
}
function message_close()
{
	var elemRemove = $$('div.compose_holder');
	document.getElementById('content').removeChild(elemRemove[0]);
}
