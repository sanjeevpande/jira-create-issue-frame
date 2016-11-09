var cookieValue;

var handler = function(req, res) {

    var request = url.parse(req.url, true);
    var action = request.pathname;
    var Client = require('node-rest-client').Client;
    var client = new Client();
     
    if (action == '/jquery.min.js') {
        var js = fs.readFileSync('./jquery.min.js');
        res.writeHead(200, {'Content-Type': 'text/javascript' });
        res.end(js, 'binary');
    } else if (action == '/app.js') {
        var js = fs.readFileSync('./app.js');
        res.writeHead(200, {'Content-Type': 'text/javascript' });
        res.end(js, 'binary');
    } else if (action == '/createIssue.js') {
        var js = fs.readFileSync('./createIssue.js');
        res.writeHead(200, {'Content-Type': 'text/javascript' });
        res.end(js, 'binary');
    } else if (action == '/createIssue.html') {
        var js = fs.readFileSync('./createIssue.html');
        res.writeHead(200, {'Content-Type': 'text/html' });
        res.end(js, 'binary');
    } else if (action == '/quickCreateIssue') {
        var args = {
            data: {
                username: 'vm_admin',
                password: 'anonymous630'
            },
            headers: {
                "Content-Type": "application/json"
            }
        };
        client.post("http://jiratest.yourzephyr.com:3530/rest/auth/1/session", args, function (data, response) {
            var session = data.session;
            cookieValue = session.name + '=' + session.value;
            
            var searchArgs = {
                headers: {
                    // Set the cookie from the session information
                    cookie: cookieValue || '',
                    "Content-Type": "application/json"
                }
            };

            client.get("http://jiratest.yourzephyr.com:3530/secure/QuickCreateIssue!default.jspa", searchArgs, function(searchResult, response) {
                res.end(JSON.stringify(searchResult));
            });
        });
    } else if (action == '/getLoginDetails') {
        var args = {
            headers: {
                cookie: cookieValue
            }
        };
        if(!cookieValue) {
            args = {};
        }
        client.get("http://jiratest.yourzephyr.com:3530/rest/auth/1/session", args, function (data, response) {
            res.end(JSON.stringify(data));
        });
    } else if (action == '/logout') {
        var args = {
            headers: {
                cookie: cookieValue
            }
        };
        if(!cookieValue) {
            args = {};
        }
        client.delete("http://jiratest.yourzephyr.com:3530/rest/auth/1/session", args, function (data, response) {
            res.end(JSON.stringify(data));
        });
    } else if (action == '/login') {
        var args = {
            data: {
                username: 'vm_admin',
                password: 'anonymous630'
            },
            headers: {
                "Content-Type": "application/json"
            }
        };
        client.post("http://jiratest.yourzephyr.com:3530/rest/auth/1/session", args, function (data, response) {
            var session = data.session;
            cookieValue = session.name + '=' + session.value;
            res.end(JSON.stringify(session));
        });
    } else if (action == '/serverCookieLogin') {
        var args = {
            data: {
                username: 'vm_admin',
                password: 'anonymous630'
            },
            headers: {
                "Content-Type": "application/json"
            }
        };
        client.post("http://jiratest.yourzephyr.com:3530/rest/auth/1/session", args, function (data, response) {
            var session = data.session;
            cookieValue = session.name + '=' + session.value;
            var cookies = response.headers['set-cookie'];
            var cookieString = '';
            cookies.forEach(function(cookie) {
                cookieString += cookie.split(';')[0] + ';domain=.yourzephyr.com; Path=/;';
            });
            res.writeHead(200, {
                'Set-Cookie': cookieString,
                'Content-Type': 'text/plain'
            });
            res.end('ok');
        });

    } else if (action == '/clientCookieLogin') {
        var args = {
            data: {
                username: 'vm_admin',
                password: 'anonymous630'
            },
            headers: {
                "Content-Type": "application/json"
            }
        };
        client.post("http://jiratest.yourzephyr.com:3530/rest/auth/1/session", args, function (data, response) {
            var cookies = response.headers['set-cookie'];
            cookies = cookies.map(function(cookie) {
                return cookie.split(';')[0];
            });
            res.end(JSON.stringify(cookies));
        });
    } else if (action == '/tokenLogin') {
        var args = {
            data: {
                username: 'vm_admin',
                password: 'anonymous630'
            },
            headers: {
                "Content-Type": "application/json"
            }
        };
        client.post("http://jiratest.yourzephyr.com:3530/rest/auth/1/session", args, function (data, response) {
            var cookies = response.headers['set-cookie'];
            var token = '';
            token = cookies[0].split(';')[0].split('=')[1];

            res.end(token);
        });
    } else if (action == '/searchIssues') {
        var searchArgs = {
            headers: {
                // Set the cookie from the session information
                cookie: cookieValue || '',
                "Content-Type": "application/json"
            },
            data: {
                // Provide additional data for the JIRA search. You can modify the JQL to search for whatever you want.
                jql: "type=Bug AND status=Closed"
            }
        };

        client.post("http://jiratest.yourzephyr.com:3530/rest/api/2/search", searchArgs, function(searchResult, response) {
            res.end(JSON.stringify(searchResult));
        });
    } else { 
        fs.readFile('./index.html', function (err, data) {
            if(err){
                throw err;
            }
            res.writeHead(200);
            res.end(data);
        });    
    }
}

var app = require('http').createServer(handler),
    url = require('url'),
    fs = require('fs'),
    port = process.env.PORT || 3000;
 
app.listen(port, function(){
    console.log("Server running at port " + port);
});