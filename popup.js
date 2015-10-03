function getJSON(callback){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if(xhttp.readyState == 4 && xhttp.status == 200){
			callback(xhttp.responseText);
		}
	}
	xhttp.open("GET", "http://52.25.136.126:5984/craigslist/3b277a6d1cd211fc820edfce8b000e9f", true);
	xhttp.send();
}

getJSON(function processJSON(data)
{
	var processedData = JSON.parse(data);
	//alert("URL: " + processedData.url + " Price: " + processedData.price + " Location: "+ processedData.location);
});


var tab;
chrome.tabs.getSelected(null, function(tab)
{
    myFunction(tab.url);
});

function myFunction(tablink) {
	this.tab = tablink;
	chrome.browserAction.setBadgeText({text: ""});
	//alert(tablink);
}

function btn()
{
  	chrome.browserAction.getBadgeText({}, function(result){
		if(result != ""){
			var newNum = parseInt(result) + 1;
			var numString = newNum.toString();
			chrome.browserAction.setBadgeText({text: numString});
		}else{
			chrome.browserAction.setBadgeText({text: "1"});
		}
	});
  //sendMail();
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('Save').addEventListener('click', btn);
});

//CUTS

/*$.couch.db("mydb").create({
	success: function(data){
		alert(data);
	},
	error: function(status){
		alert(status);
	}
});*/

	//xhttp.open("PUT", "http://52.25.136.126:5984/craigslist", true);
	//xhttp.send(JSON.parse({"Test":"1,2,3"}));
function sendMail() {
    $.ajax({
      type: 'POST',
      url: 'https://mandrillapp.com/api/1.0/messages/send.json',
      data: {
        'key': 'wYV-pnTfFPboxkY4X12I-g',
        'message': {
          'from_email': 'amaini@ucsd.edu',
          'to': [
              {
                'email': 'amaini@ucsd.edu',
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
