

chrome.extension.sendRequest({type: "showPageAction"}, function(response) { });

var loggedInCheck = setInterval(function(){
	if($('div.topic').text() != "")
	{
		clearInterval(loggedInCheck);
		setInterval(checkNewMessages, 1000);
	}
	},1000)
	
var oldMessages = undefined;
var isFocused = true;
function checkNewMessages()
{
	var messages = $('div.ircwindow').first().find('div.colourline');
	if(oldMessages === undefined)
	{
		oldMessages = messages;
		return;
	}
	
	var newMessages = new Array();
	var found = 0;
	for(var i = 0; i < messages.length; i++)
	{
		if($.inArray(messages[i], oldMessages) == -1)
		{
			newMessages[found] = messages[i];
			found = found + 1;
		}
	}
	
	if(found != 0 && isFocused == false)
		notifyNewMessagesWrapper(newMessages);
	
	oldMessages = messages;
}

function notifyNewMessagesWrapper(mess)
{
	chrome.extension.sendRequest({type: "enabled"}, function(response) { 
		if(response.enabled)
		{
			notifyNewMessages(mess);
		}
	});
}


function notifyNewMessages(foundMess)
{

	for(var i = 0; i < foundMess.length; i++)
	{
		var highlight = $(foundMess[i]).find('span').first().css('class') == "Xc4";
	
		chrome.extension.sendRequest({type: "sendNotification", image: "", title: $.trim($('div.topic').text()), text: $.trim($(foundMess[i]).text()), highlight: highlight}, function(response) { 
			});
	}
}

window.addEventListener('focus', function() {
    isFocused = true;
});

window.addEventListener('blur', function() {
    isFocused = false;
});
