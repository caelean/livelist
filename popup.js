chrome.runtime.sendMessage({text: "startUp"});
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
	console.log("URL: " + processedData.url + " Price: " + processedData.price +
		" Location: "+ processedData.location);
});


var tab;

function btn(){
	chrome.runtime.sendMessage({text: "updateBadge"}, function(response){
		console.log(response.status);
	});
	
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