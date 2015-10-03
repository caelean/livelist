function getJSON(callback){
	
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if(xhttp.readyState == 4 && xhttp.status == 200){
			callback(xhttp.responseText);
		}
	}

	xhttp.open("POST", "http://52.25.136.126:5984/craigslist", true);
	xhttp.setRequestHeader("Content-type", "application/json");
	xhttp.setRequestHeader("Access-Control-Allow-Methods","GET, PUT, POST, DELETE")
	xhttp.setRequestHeader("Access-Control-Allow-Origin","*")
	xhttp.send({"Hello": "test"});

	//jQuery.support.cors = true;
	/*jQuery.ajax({
    //url: "http://52.25.136.126:5984/_utils/database.html?craigslist",
    url: "http://52.25.136.126:5984/craigslist",
    data: { "id":"doc1", "rows":"100" },
    type: "POST",
    timeout: 30000,
    dataType: "json", // "xml", "json"
    xhrFields: {
       withCredentials: false
    },
    crossDomain: true
    success: function(data) {
        // show text reply as-is (debug)
        //alert(data);
        console.log(data)*/

        // show xml field values (debug)
        //alert( $(data).find("title").text() );

        // loop JSON array (debug)
        //var str="";
        //$.each(data.items, function(i,item) {
        //  str += item.title + "\n";
        //});
        //alert(str);
    },
    error: function(jqXHR, textStatus, ex) {
       	console.log(textStatus + "," + ex + "," + jqXHR.responseText);
    }
});

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

/*
function btn()
{
  alert(tab);
  //console.log(tab);
}*/

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('Save').addEventListener('click', btn);
});
