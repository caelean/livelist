chrome.tabs.getSelected(null, function(tab) {
    myFunction(tab.url);
});

function myFunction(tablink) {
  // do stuff here
  var urlKey = "tab";

  var urlTable = {};
  urlTable[urlKey] = tablink;

  chrome.storage.sync.set(urlTable);
  chrome.storage.sync.get(urlTable, function(result){
  	alert(result[urlKey]);
  });
}
