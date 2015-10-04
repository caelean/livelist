var currentEmail;

setInterval(function emailWrapper(){
  currentEmail = localStorage.var;
	if(currentEmail != ""){
		sendMail(currentEmail);
	}
}, 1800000);

chrome.tabs.onActivated.addListener(function(activeInfo) {
    chrome.tabs.get(activeInfo.tabId, function (tab) {
        callback(tab.url);
    });
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, updatedTab){
	chrome.tabs.query({'active': true}, function(activeTabs){
		var tab = activeTabs[0];
		if(updatedTab.url !== undefined && changeInfo.status == "complete"){
			callback(tab.url);
		}
	});
});

function callback(url){
	//will eventually iterate through list to check if tracked
	if(url == localStorage.tabStorage){
		chrome.browserAction.setBadgeText({text: ""});
	}
}

function sendMail(address) {
    $.ajax({
      type: 'POST',
      url: 'https://mandrillapp.com/api/1.0/messages/send.json',
      data: {
        'key': 'wYV-pnTfFPboxkY4X12I-g',
        'message': {
          'from_email': 'hello@livelist.com',
          'to': [
              {
                'email': address,
                'name': '',
                'type': 'to'
              }
            ],
          'autotext': 'true',
          'subject': 'Hello!',
          'html': 'Test Notification post'
        }
      }
     }).done(function(response) {
       console.log(response); // if you're into that sorta thing
     });
}