var http = require('http'), 
    fs = require('fs'), 
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function(request, response) {
  var parsedUrl = url.parse(request.url);

  if (request.method == 'GET' && parsedUrl.pathname == '/listings'){
    response.end(listingData);
  }
  else {
    response.statusCode = 404;
    response.end("Bad gateway error");
  }
};

fs.readFile('listings.json', 'utf8', function(err, data) {

  //saving data in listingData 
  listingData = data; 

  //creating the HTTP server
  var server = http.createServer(requestHandler);

  //starting server
  server.listen(port, () => {
    console.log('Server listening on: http://localhost:' + port);
  })


});
