

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

function getData() {
  var url = document.getElementById("url").value;
  $.ajax({
      url: url,
      type: 'GET',
      success: function(res) {
          var text = res.responseText;
          data = text;
          // console.log(data);
          var html = $.parseHTML(data)[19];
          var content = html.getElementsByClassName('content')[0];
          document.getElementById('data').appendChild(content);
          var children = content.childNodes;
          var array = Array.from(children);
          var obj = '['
          array.forEach(function(item){
              if(item.className === 'row')
              {
                var date = item.getElementsByTagName('time')[0].innerHTML;
                console.log("Date: "+date);
                console.log("PID: "+item.getAttribute('data-pid'));
                var name = item.getElementsByClassName('hdrlnk')[0].innerHTML;
                console.log("Name: "+name);
                var price = "Not Applicable";
                if(item.getElementsByClassName('price').length > 0)
                  price = item.getElementsByClassName('price')[0].innerHTML;
                console.log("Price: "+price);
                var location = "Not Applicable";
                if(item.getElementsByTagName('small').length > 0)
                  location = item.getElementsByTagName('small')[0].innerText;
                console.log("Location: "+location);
              }
          });


      }
  });

}
