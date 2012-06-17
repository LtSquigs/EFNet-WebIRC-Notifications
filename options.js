var defaultTimeout = '5000';

function loadDefaultOptions() {
    var timeout = localStorage["timeout"];
	
    if (timeout == undefined) {
		timeout = defaultTimeout;
		localStorage["timeout"] = timeout;
    }
}

function loadOptions() {
    var timeout = localStorage["timeout"];
	
    if (timeout == undefined) {
		timeout = defaultTimeout;
		localStorage["timeout"] = timeout;
    }
	
    var timeoutBox = document.getElementById("timeoutDelay");
	
	timeoutBox.value = timeout;
}
 
function saveOptions() {
    var timeoutBox = document.getElementById("timeoutDelay");
	localStorage["timeout"] = timeoutBox.value;
	
	alert("Your settings have been saved!");
}
 
function eraseOptions() {
    localStorage.removeItem("timeout");
    location.reload();
	
	alert("Your settings have been reset!");
}
