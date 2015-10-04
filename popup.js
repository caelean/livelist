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
	//console.log("URL: " + processedData.url + " Price: " + processedData.price +
		//" Location: "+ processedData.location);
});


var tab;
chrome.tabs.getSelected(null, function(tab)
{
    myFunction(tab.url);
});
function myFunction(tablink)
{
	this.tab = tablink;
}

function btn()
{
	var obj = parse(tab);
	var path = obj.path;
	var ind = path.indexOf("query")
	path = path.slice(ind+6, path.length);
	$("#url").text(path);
	console.log(obj);
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

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('Save').addEventListener('click', btn);
});

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
