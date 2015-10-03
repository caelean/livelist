function getJSON(callback){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if(xhttp.readyState == 4 && xhttp.status == 200){
			callback(xhttp.responseText);
		}
	}
	xhttp.open("GET", "http://52.25.136.126:5984/craigslist/3b277a6d1cd211fc820edfce8b000e9f", true);
	xhttp.send();
	//xhttp.open("PUT", "http://52.25.136.126:5984/craigslist", true);
	//xhttp.send(JSON.parse({"Test":"1,2,3"}));
}

/*$.couch.db("mydb").create({
	success: function(data){
		alert(data);
	},
	error: function(status){
		alert(status);
	}
});*/

getJSON(function processJSON(data)
{
	var processedData = JSON.parse(data);
	alert("URL: " + processedData.url + " Price: " + processedData.price + " Location: "+ processedData.location);
});


var tab;
chrome.tabs.getSelected(null, function(tab)
{
    myFunction(tab.url);
});

function myFunction(tablink) {
	this.tab = tablink;
	alert(tablink);
}

function btn()
{
  //alert(tab);
  console.log(tab);
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('Save').addEventListener('click', btn);
});
