var urlTable = [];
chrome.storage.sync.set(urlTable);

chrome.tabs.getSelected(null, function(tab) {
    myFunction(tab.url);
});

function myFunction(tablink) {
  // do stuff here
  chrome.storage.sync.get(urlTable, function(result){
  	var urlKey = result.length;

  });
  
  urlTable[urlKey] = tablink;

  chrome.storage.sync.set(urlTable);
  chrome.storage.sync.get(urlTable, function(result){
  	alert(result[urlKey]);
  });
}
