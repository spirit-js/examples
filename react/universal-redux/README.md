This example shows how to convert the [Redux Universal Example](https://github.com/reactjs/redux/tree/master/examples/universal) to run on spirit.

This directory has the following files:
- server/server.js
- package.json

Which are the only files changed to run on spirit from the original.

To see a diff of the original, refer to this [commit](https://github.com/spirit-js/examples/commit/728fffdb046f23232e958cb9b84f963f75b81347).

Note: This example doesn't use spirit-router as the original example doesn't actually use Express's routing features either. All requests end up going to a single route that outputs a HTML string. But using spirit-router would work as well if you needed routing.

### Changes

`package.json` 

Replaces Express to use spirit and also add in spirit-express (to run webpack-dev and webpack-hot middlewares, which are Express middlewares)

`server/server.js` 

- replaces the import of Express to be spirit and import spirit-express
- wrap webpack-dev-middleware and webpack-hot-middleware with spirit-express
- `handleRender` is converted to return a Promise, which resolves to a string of the HTML. This is different than doing `res.send` in Express of sending the HTML. As spirit prefer functions to return a value over a callback.
- import http and start a server using the spirit node adapter


### How to run
1. Clone redux `git clone https://github.com/reactjs/redux`
2. Go to the universal example in redux `cd redux/examples/universal` 
3. copy server/server.js (from this repository) to replace the universal example `cp ..path_to_this_repo../react/universal-redux/server/server.js server/server.js`
4. copy package.json (from this repository) to replace the universal example `cp ..path_to_this_repo../react/universal-redux/package.json package.json`
5. `npm install`
6. `npm start`
7. open http://localhost:3000/