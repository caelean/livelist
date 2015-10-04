var mode = localStorage.demo;
console.log(mode);

jQuery.ajax = (function(_ajax){

    var protocol = location.protocol,
        hostname = location.hostname,
        exRegex = RegExp(protocol + '//' + hostname),
        YQL = 'http' + (/^https/.test(protocol)?'s':'') + '://query.yahooapis.com/v1/public/yql?',
        query = 'select * from html where url="{URL}" and xpath="*"';

    function isExternal(url) {
        return !exRegex.test(url) && /:\/\//.test(url);
    }

    return function(o) {

        var url = o.url;

        if ( /get/i.test(o.type) && !/json/i.test(o.dataType) && isExternal(url) ) {

            // Manipulate options so that JSONP-x request is made to YQL

            o.url = YQL;
            o.dataType = 'json';

            o.data = {
                q: query.replace(
                    '{URL}',
                    url + (o.data ?
                        (/\?/.test(url) ? '&' : '?') + jQuery.param(o.data)
                    : '')
                ),
                format: 'xml'
            };

            // Since it's a JSONP request
            // complete === success
            if (!o.success && o.complete) {
                o.success = o.complete;
                delete o.complete;
            }

            o.success = (function(_success){
                return function(data) {

                    if (_success) {
                        // Fake XHR callback.
                        _success.call(this, {
                            responseText: data.results[0]
                                // YQL screws with <script>s
                                // Get rid of them
                                .replace(/<script[^>]+?\/>|<script(.|\s)*?\/script>/gi, '')
                        }, 'success');
                    }

                };
            })(o.success);

        }

        return _ajax.apply(this, arguments);

    };

})(jQuery.ajax);

function diff(old, next) {
  var ans = [];
  next.forEach(function(listing) {
    var nextID = listing.ID;
    ans.push(nextID);
    old.forEach(function(item) {
      var oldID = item.ID;
      if(oldID === nextID) {
        ans.pop();
      }
    });
  });
  return ans;
}

var old;
var next;

function sendRequest() {
  // var url = 'http://sandiego.craigslist.org/search/sss?sort=rel&srchType=T&query=2016+mazda+miata';
  getData(tab, function(result) {
      console.log(result);
			$("#url").append(' : ' + result.length + ' results');
			if(mode) {
				localStorage.trigger = true;
			}
  });
}

function getData(url, callback) {
  $.ajax({
      url: url,
      type: 'GET',
      success: function(res) {
          var obj = '['
          var data = res.responseText;
					console.log(data);
          var html = $.parseHTML(data)[19];
          var content = html.getElementsByClassName('content')[0];
          // document.getElementById('data').appendChild(content);
          var children = content.childNodes;
          var array = Array.from(children);
          array.forEach(function(item){
              if(item.className === 'row')
              {
                obj += '{'
                var pid = item.getAttribute('data-pid');
                obj += '"ID" : "' + pid + '",'

                var name = item.getElementsByClassName('hdrlnk')[0].innerHTML.replace(/(['"])/g, "");
                obj += '"Name" : "' + name + '",'

								var uni = item.getElementsByClassName('hdrlnk')[0].getAttribute('href');
								console.log(uni);

                var date = item.getElementsByTagName('time')[0].innerHTML.replace(/(['"])/g, "");
                obj += '"Date" : "' + date + '",'

                var price = "Not Shown";
                if(item.getElementsByClassName('price').length > 0)
                  price = item.getElementsByClassName('price')[0].innerHTML.replace(/(['"])/g, "")
                obj += '"Price" : "' + price + '",'

                var location = "Not Shown";
                if(item.getElementsByTagName('small').length > 0)
                  location = item.getElementsByTagName('small')[0].innerText.replace(/(['"])/g, "");
                obj += '"Loc" : "' + location + '"'
                // console.log("PID: "+pid);
                // console.log("Name: "+name);
                // console.log("Date: "+date);
                // console.log("Price: "+price);
                // console.log("Location: "+location);
                obj += '},'
              }
          });
          obj = obj.slice(0,-1);
          obj += ']'
          obj = JSON.parse(obj);
          callback(obj);
      },
			error: function (xhr, ajaxOptions, thrownError) {
				var obj = '['
				var data = xhr.responseText;
				var html = $.parseHTML(data)[2];
				var content = html.getElementsByClassName('content')[0];
				// document.getElementById('data').appendChild(content);
				var children = content.childNodes;
				var array = Array.from(children);
				array.forEach(function(item){
						if(item.className === 'row')
						{
							obj += '{'
							var pid = item.getAttribute('data-pid');
							obj += '"ID" : "' + pid + '",'

							var name = item.getElementsByClassName('hdrlnk')[0].innerHTML.replace(/(['"])/g, "");
							obj += '"Name" : "' + name + '",'

							var uni = item.getElementsByClassName('hdrlnk')[0].getAttribute('href');
							obj += '"URL" : "http:' + uni + '",';

							var date = item.getElementsByTagName('time')[0].innerHTML.replace(/(['"])/g, "");
							obj += '"Date" : "' + date + '",'

							var price = "Not Shown";
							if(item.getElementsByClassName('price').length > 0)
								price = item.getElementsByClassName('price')[0].innerHTML.replace(/(['"])/g, "")
							obj += '"Price" : "' + price + '",'

							var location = "Not Shown";
							if(item.getElementsByTagName('small').length > 0)
								location = item.getElementsByTagName('small')[0].innerText.replace(/(['"])/g, "");
							obj += '"Loc" : "' + location + '"'
							// console.log("PID: "+pid);
							// console.log("Name: "+name);
							// console.log("Date: "+date);
							// console.log("Price: "+price);
							// console.log("Location: "+location);
							obj += '},'
						}
				});
				obj = obj.slice(0,-1);
				obj += ']'
				obj = JSON.parse(obj);
				callback(obj);
      }
  });
}

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
	var ind = path.indexOf("query");
  console.log(ind);
  if(ind > 1)
	{
    path = path.slice(ind+6, path.length);
    path = path.replace(/\+/g, " ")
    ind = path.indexOf("&");
    console.log(ind);
    // path = path.slice(0, ind);
	   $("#url").text(path);
     var a = document.getElementById('url');
     a.href = tab;
     a.style.textAlign = "center";
  }
  localStorage.pathStorage = path;
  localStorage.tabStorage = tab;
	console.log(tab);
	sendRequest();
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

document.addEventListener('DOMContentLoaded', function ()
{
    document.getElementById('add-email').addEventListener('click', setEmail);
});

var currentEmail = "";

function setEmail(){
  currentEmail = document.getElementById('email').value;
  localStorage.var = currentEmail;
  localStorage.testing = 3;
  document.getElementById('email-buttons').style.visibility = "hidden";
}
