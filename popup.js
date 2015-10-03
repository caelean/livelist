/*var xhttp = new XMLHttpRequest();
if('withCredentials' in xhttp){
	xhttp.open('GET', 'http://52.25.136.126:5984/_utils/document.html?craigslist/3b277a6d1cd211fc820edfce8b000e9f'
	, true);
	xhttp.send();
	alert(xhttp.responseText);
}*/

chrome.tabs.getSelected(null, function(tab){
    myFunction(tab.url);
});

function myFunction(tablink) {

	alert(tablink);

}
