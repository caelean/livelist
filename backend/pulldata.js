

jQuery.ajax = (function(_ajax){

    var protocol = location.protocol,
        hostname = location.hostname,
        exRegex = RegExp(protocol + '//' + hostname),
        YQL = 'http' + (/^https/.test(protocol)?'s':'') + '://query.yahooapis.com/v1/public/yql?callback=?',
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



function sendRequest() {
  var url = document.getElementById("url").value;
  var old;
  getData(url, function(result) {
      old = result;
      console.log(old);
  });
  var next;
  url = 'http://sandiego.craigslist.org/search/cta?sort=rel&srchType=T&query=2016+mazda'
  getData(url, function(result) {
      next = result;
      console.log(next);
      alert(diff(old,next).length);
  });

}

function getData(url, callback) {
  $.ajax({
      url: url,
      type: 'GET',
      success: function(res) {
          var obj = '['
          var text = res.responseText;
          data = text;
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
