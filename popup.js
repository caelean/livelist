function getCurrentTabUrl(callback){
	var queryInfo = {
		active: true,
		currentWindow: true
	};

	//queryInfo is the set of properties that the tabs must match
	//the matching tabs are sent to the callback
	chrome.tabs.query(queryInfo, function(tabs)){
		var tab = tabs[0];
		var url = tab.url;
		console.assert(typeof url == 'string', 'tab.url should be a string');

		callback(url);
	}
}

getCurrentTabUrl(function storeURL(url){
	var tabTable = {};

	tabTable["first"] = url;
	storage.set(tabTable);
});

storage.get(tabTable, function(result){
	alert(result["first"]);
});