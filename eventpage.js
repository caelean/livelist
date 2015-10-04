var counter = 0;
/*setInterval(function getDif(){
	counter = counter + 1;
	chrome.browserAction.setBadgeText({text: counter.toString()})
}, 10000);*/

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
	if(parse(url).domain.indexOf("craigslist.org") > -1){
		counter = counter + 1;
		chrome.browserAction.setBadgeText({text: counter.toString()});
	}
}

function parse(url)
{
	parsed_url = {}

    if ( url == null || url.length == 0 )
        return parsed_url;

    protocol_i = url.indexOf('://');
    parsed_url.protocol = url.substr(0,protocol_i);

    remaining_url = url.substr(protocol_i + 3, url.length);
    domain_i = remaining_url.indexOf('/');
    domain_i = domain_i == -1 ? remaining_url.length - 1 : domain_i;
    parsed_url.domain = remaining_url.substr(0, domain_i);
    parsed_url.path = domain_i == -1 || domain_i + 1 == remaining_url.length ? null : remaining_url.substr(domain_i + 1, remaining_url.length);

    domain_parts = parsed_url.domain.split('.');
    switch ( domain_parts.length ){
        case 2:
          parsed_url.subdomain = null;
          parsed_url.host = domain_parts[0];
          parsed_url.tld = domain_parts[1];
          break;
        case 3:
          parsed_url.subdomain = domain_parts[0];
          parsed_url.host = domain_parts[1];
          parsed_url.tld = domain_parts[2];
          break;
        case 4:
          parsed_url.subdomain = domain_parts[0];
          parsed_url.host = domain_parts[1];
          parsed_url.tld = domain_parts[2] + '.' + domain_parts[3];
          break;
    }

    parsed_url.parent_domain = parsed_url.host + '.' + parsed_url.tld;
    return parsed_url;
}