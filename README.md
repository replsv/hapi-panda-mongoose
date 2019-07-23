# 🐼 Mongoose Wrapper

One simple mongoose wrapper used on hapi18.
All code resides under `src/` folder.

## Usage
```js
const server = new Hapi.Server();

await server.register({
    plugin: require('hapi-panda-mongoose'),
    options: {
        promises: 'native',
        uri: 'mongodb://localhost:27017'
    }
});

const db = server.plugins['hapi-panda-mongoose'].connection;

const mongoose = server.plugins['hapi-panda-mongoose'].mongoose;
```

## Configuration
Based on mongoose's options.
Eg.
```js
{
    promises: 'native', // (or bluebird)
    uri: 'mongodb://my-instance:port/db',
    mongoose: {} // set of mongoose options - https://mongoosejs.com/docs/connections.html#options
}
```

## Supported versions
- NodeJS >= 8

## Changelog
See the changelog file.

## Current versions
0.1.0 - first version (master)