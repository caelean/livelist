
function getData() {
  var url = document.getElementById("url").value;
  // $.get("?u=http://www.craigslist.org/about/sites", function(response) { alert(response) });
  var data = $.getJSON('http://query.yahooapis.com/v1/public/yql?q=select * from html where url="http://sandiego.craigslist.org/"&format=json');
  console.log(data);
  alert(JSON.stringify(data));
  // makeCorsRequest(url);
  // $.ajax({
  //    url: "http://google.com",
  //    type: "GET",
  //    dataType: 'jsonp',
  //    headers: { 'Access-Control-Allow-Origin': 'http://google.com',
  //               'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'},
  //    success: function(data) {
  //         console.log("worked");
  //         // var elements = $("<div>").html(data)[0].getElementsByTagName("ul")[0].getElementsByTagName("li");
  //         // for(var i = 0; i < elements.length; i++) {
  //         //      var theText = elements[i].firstChild.nodeValue;
  //         //      // Do something here
  //         // }
  //    }
// });
 }
// function createCORSRequest(method, url) {
//   var xhr = new XMLHttpRequest();
//   if ("withCredentials" in xhr) {
//     // XHR for Chrome/Firefox/Opera/Safari.
//     xhr.open(method, url, true);
//   } else if (typeof XDomainRequest != "undefined") {
//     // XDomainRequest for IE.
//     xhr = new XDomainRequest();
//     xhr.open(method, url);
//     xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
//   } else {
//     // CORS not supported.
//     xhr = null;
//   }
//   return xhr;
// }
//
// // Helper method to parse the title tag from the response.
// function getTitle(text) {
//   return text.match('<title>(.*)?</title>')[1];
// }
//
// // Make the actual CORS request.
// function makeCorsRequest(address) {
//   // All HTML5 Rocks properties support CORS.
//   var url = 'http://cors.io/?u=' + address;
//
//   var xhr = createCORSRequest('GET', url);
//   if (!xhr) {
//     alert('CORS not supported');
//     return;
//   }
//
//   // Response handlers.
//   xhr.onload = function() {
//     var text = xhr.responseText;
//     alert('Response from CORS request to ' + url + ': ' + text);
//   };
//
//   xhr.onerror = function() {
//     // alert('Woops, there was an error making the request.');
//   };
//
//   xhr.send();
// }
