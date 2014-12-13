window.onload = function(){

	$("logout").addEventListener("click", destroy);
	$("compose").addEventListener("click", composemail);
	$("inbox").addEventListener("click", messages);
	$("home").addEventListener("click", homescreen);
	$("sentmessage").addEventListener("click", sentmessages);
	
	homescreen();
	
	$("cuser").addEventListener("click", create);
	$('loginbutton').addEventListener("click", valid);

}

var homescreen = function(){
		var me = readCookie("user_id");
		query = 'recentmessages.php?me='+ me;
		
 	
		var myAjax2 = new Ajax.Updater('content', query, {method: 'get'});
			

			Ajax.Responders.register({
    
    onComplete: function() {
      $$('.messagethread').each(function(element) {
  		element.observe("click", function(){
				$("content").innerHTML = this.innerHTML;
  				var messageid = this.id;
  				query1 = 'read.php?messageid='+ messageid;
  				var myAjax1 = new Ajax.Updater('content', query1, {method: 'get'});
				query = 'readmessages.php?messageid='+ messageid+'&me='+me;
				var myAjax = new Ajax.Updater('id_of_a_hidden_div', query, {method: 'get'});


  					});
    	});
      $("replybutton").addEventListener("click", composereply);
			}
	});
}

var composereply = function(){
	
	var readfrom = $("readfrom").innerHTML;
	var readsubject = "RE: "+ $("readsubject").innerHTML;
	var readbody = "'"+$("readbody").innerHTML+"'";
	var myAjax = new Ajax.Updater('content', 'compose.html', {method: 'get'});
 	
      

 	Ajax.Responders.register({
    
    onComplete: function() {
    	 $("to").removeClassName("placeholder");
    	 $("subject").removeClassName("placeholder");
   	$("subject").value = readsubject;
      $("to").value = readfrom +";";
      $("message").value = readybody;
      var sender = $('sendbutton');
      sender.addEventListener("click", sendmail);
      
    }
		});

}	



var messages = function(){
		var me = readCookie("user_id");
		query = 'messages.php?me='+ me;
		var myAjax = new Ajax.Updater('content', query, {method: 'get'});
		
			Ajax.Responders.register({
    
    onComplete: function() {
      $$('.messagethread').each(function(element) {
  		element.observe("click", function(){
  				var messageid = this.id;
				query1 = 'read.php?messageid='+ messageid;
  				var myAjax1 = new Ajax.Updater('content', query1, {method: 'get'});
				query = 'readmessages.php?messageid='+ messageid+'&me='+me;
				var myAjax = new Ajax.Updater('id_of_a_hidden_div', query, {method: 'get'});
  					});
    	});
			}
	});

	

}

var sentmessages = function(){
		var me = readCookie("user_id");
		query = 'sentmessage.php?me='+ me;
		var myAjax = new Ajax.Updater('content', query, {method: 'get'});

}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}



var destroy = function(){
	document.cookie = "user=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
	document.cookie = "user_id=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
	document.cookie = "first=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
	document.cookie = "usertype=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    var myAjax = new Ajax.Updater('content', "logout.php", {method: 'get'});

    window.location.replace("cheapomail.html");
}

var sendmail = function(){
		var mess = $("message").value;
		var t = $("to").value;
		var sub = $("subject").value;
		var sender = readCookie("user_id");
		query = 'send.php?&message='+mess+'&to='+t+'&subject='+sub+'&user_id='+sender;
		var myAjax = new Ajax.Updater("messageform", query, {method: 'get'});

}

var composemail = function(){
  

	var myAjax = new Ajax.Updater('content', 'compose.html', {method: 'get'});
 

 	Ajax.Responders.register({
   
    onComplete: function() {
    	$("subject").value = "Add Subject...";
    	$("to").value = "Add Recipient...";
    	$("message").value = "";
    	
     	
      var sender = $('sendbutton');
      sender.addEventListener("click", sendmail);
      $("subject").addEventListener("click", placeholder);
      $("to").addEventListener("click", placeholder1); 
    }
		});
	
}

var placeholder = function(){
	if ($("subject").value == "Add Subject..."){
	$("subject").removeClassName("placeholder");
	$("subject").value = "";
		if ($("to").value == "")	{
		$("to").addClassName("placeholder");
		$("to").value = "Add Recipient...";
}
	}
}

var placeholder1 = function(){

	if ($("to").value == "Add Recipient...")	{
		$("to").removeClassName("placeholder");
		$("to").value = "";
		if ($("subject").value == ""){
		$("subject").addClassName("placeholder");
		$("subject").value = "Add Subject...";
	}
}

}

var error = function(id){
	id.style.border = "2px solid red";
}

var remove_error = function(id){
	id.style.border = "1px solid #B6B6BF";
}