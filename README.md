This is a simple proxy server developed using Node.js. This was developed as prework for Node.js bootcamp

**Installation:**<BR/>
Please execute npm install

**Features:**<BR/>
**Required Features:**<BR/>
1. Echo server - HTTP Requests to port 8000 are echoed back with the same HTTP headers and body<BR/>
2. Proxy server - HTTP Requests to port 8001 will be forwarded to destination url with same HTTP headers & body and response from destination will be sent back to the client<BR/>
3. CLI - Proxy server is configurable using CLI. Proxy server supports --host, --port, --url arguments to configure destination url.<BR/>
4. Destination url using header - Proxy server is configurable using x-destination-url header. Proxy server supports x-destination-url header to specify the destination url.<BR/>
5. Logging to stdout - Print request / response to stdout.<BR/>
6. Logging to logfile - Print request / response to logfile. The log file path can be configured using --logfilepath argument.<BR/>

**Optional Features:**<BR/>
7. Logging Level - Proxy server supports 8 logging levels (emerg | alert | crit | error | warn | notice | info | debug). The logging level can be changed using loglevel argument.<BR/>
8. Documentation - Detailed documentation can be obtained by passing -h argument.<BR/>

Proxy-Server Demo: Please zoom in if image is not visible. Sorry for inconvenience. (Image Location - https://github.com/vasupalanisamy/proxy-server/blob/master/proxy-server-demo.gif)
![alt tag](https://github.com/vasupalanisamy/proxy-server/blob/master/proxy-server-demo.gif)

