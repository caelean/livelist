/*chrome.runtime.onConnect.addListener(function(port){
	console.assert(port.name == "connection");
	port.onMessage.addListener(function(msg){
		if(msg.text == "updateBadge"){
			chrome.tabs.getSelected(null, function(tab){
    			this.tab = tablink;
			});
			chrome.browserAction.getBadgeText({}, function(result){
				if(result != ""){
					var newNum = parseInt(result) + 1;
					var numString = newNum.toString();
					chrome.browserAction.setBadgeText({text: numString});
				}else{
					chrome.browserAction.setBadgeText({text: "1"});
				}
			});
		}else if(msg.text == "startUp"){
			chrome.browserAction.setBadgeText({text: ""});
		}
	});
});*/
var counter = 0;
setInterval(function getDif(){
	counter = counter + 1;
	chrome.browserAction.setBadgeText({text: counter.toString()})
}, 10000);