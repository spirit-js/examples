A collection of examples for spirit

Some of the examples are in other repositories, but they are all categorized here.

Content
- [spirit-router misc examples](#spirit-router-misc-examples)
- [Using Express middleware with spirit](#using-express-middleware-with-spirit)
- [React, Redux examples](#react-redux)

## spirit-router misc examples
#### Sending a file
[Example](https://github.com/spirit-js/spirit-router/blob/master/examples/sending_file.js)

The example shows 3 ways of sending a file from three different routes. All of the routes are essentially the same except for the last route that uses `fs.readFile`, since that returns a Buffer. While the 2 other routes return a stream. Note, that this is for serving a file from a route, if you wanted to have a route that serves static files, use [resources API](https://github.com/spirit-js/spirit-router/blob/master/docs/api/api.md#resources). 

#### Rendering templates with jade
[Example](https://github.com/spirit-js/spirit-router/tree/master/examples/rendering-templates)

Most template libraries like jade already export a compile function. So writing a function that calls it and sets up some sort of caching is enough. Now every route can call that function, and since compile returns a string, you can just return that string from the route. There's nothing magical going on here.

The caching is very basic and has no idea of time / diffing. (There is probably a module on NPM that sets up caching and compiling, and is template agnostic.)

#### Websockets with socket.io
[Example](https://github.com/spirit-js/spirit-router/tree/master/examples/socket.io-example)

The example takes the socket.io chat example as part of socket.io's tutorial, and uses spirit and spirit-router instead of Express.


## Using Express middleware with spirit

All these examples use [spirit-express](https://github.com/spirit-js/spirit-express).

__NOTE:__ spirit-express does not only support the examples below. It can support most Express middleware, the below are just examples written.

#### body-parser
[Example](https://github.com/spirit-js/spirit-express/blob/master/examples/body-parser.js)

The [body-parser](https://www.npmjs.com/package/body-parser) module. The example sets up a single POST / route, that will parse the request body. Use curl ex: `curl --data "a=123&b=hello" http://localhost:3009/` to see the data outputted back as JSON.

#### cookie-parser
[Example](https://github.com/spirit-js/spirit-express/blob/master/examples/cookie-parser.js)

For [cookie-parser](https://www.npmjs.com/package/cookie-parser) module. The example shows a a single GET / route that parses any cookies sent in the request. To see the example, you would have to modify your browser to send a cookie, or use curl ex: `curl http://localhost:3009 --cookie "Cho=Kim;Greet=Hello` to see the cookie outputted back.

#### express-session
[Example](https://github.com/spirit-js/spirit-express/blob/master/examples/express-session.js)

For [express-session](https://www.npmjs.com/package/express-session) module. The example shows a simple counter that incremenets on every GET / request. The counter uses cookie storage, so it persists. 

#### multer
[Example](https://github.com/spirit-js/spirit-express/blob/master/examples/multer.js)

For [multer](https://www.npmjs.com/package/multer) module. The example sets a route that delivers a form, and another route that handles POST from that form. When the POST route is triggered, it just returns back the form data as JSON.

#### passport
[Example](https://github.com/spirit-js/spirit-express/blob/master/examples/passport.js)

For [passport](https://www.npmjs.com/package/passport) module. In the example it uses LocalStrategy to auth, the auth is very basic as it's just an example. But the idea of how to set up passport is shown.

##### webpack-dev-middleware & webpack-hot-middleware
See [Server rendering in React, Redux section](#server-rendering-uses-react-redux-webpack).


## React, Redux

#### Server rendering (uses react, redux, webpack)
[Example]()

This example comes from Redux's example [Universal](https://github.com/reactjs/redux/blob/master/docs/introduction/Examples.md#universal). It changes the use of Express to spirit. webpack -dev and -hot middleware are wrapped with spirit-express to work. The example doesn't use spirit-router (as the original example doesn't do much routing), but can be used just the same.
