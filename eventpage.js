chrome.runtime.onInstalled.addListener(function(){
  console.log("Startup");
  localStorage.clear();
  localStorage.demo = 'true';
  localStorage.trigger = 'false';
//   chrome.browserAction.getBadgeText({}, function(result){
//   if(result != ""){
//     var temp = parseInt(result);
//     temp = temp + 1;
//   }else{
//     temp = 1;
//   }
//   chrome.browserAction.setBadgeText({text: temp.toString()});
// });
});

var currentEmail;
var sent;
setInterval(function emailWrapper()
{
  currentEmail = localStorage.var;
	if(currentEmail != "" && !sent){
		sendMail(currentEmail);
    sent = true;
    localStorage.var = "";
	}
}, 3000);

setInterval(function checkTrigger(){
  if(localStorage.demo == 'true' && localStorage.trigger == 'true'){
    setTimeout(function addBadgeText(){
      chrome.browserAction.setBadgeText({text: "1"});
    }, 8000);
  }
}, 1000);

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
	if(url == localStorage.tabStorage ||
    url == 'https://sandiego.craigslist.org/esd/apa/5221875739.html'){
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
          'from_email': 'livelist@livelist.com',
          'to': [
              {
                'email': address,
                'name': '',
                'type': 'to'
              }
            ],
          'autotext': 'true',
          'subject': 'Notification Alert!',
          'html': 'New Craiglist listing on your livelist search'
        }
      }
     }).done(function(response) {
       console.log(response); // if you're into that sorta thing
     });
}
