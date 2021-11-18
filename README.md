# mongo-session-store
A simple Node MongoDB session store.
Used for saving sessions in a MongoDB database.

## Getting Started
 - Add as submodule to your project
   - ```git submodule add https://github.com/JeremyBankes/mongo-session-store.git modules/mongo-session-store```
 - Ensure that the dependencies are installed, [core](https://github.com/JeremyBankes/core) and [mongo](https://github.com/JeremyBankes/mongo)
 - Ensure [express-session](https://www.npmjs.com/package/express-session) is installed
   - ```npm install --save express-session```
 - Start using the library!

```js
const mongo = require('./modules/mongo.js');
const sessionStore = require('./modules/mongo-session-store/store.js');

const application = express();

...

const sessionSecrets = [ 'Make this something secure', 'other secret used to sign cookie' ];
const secure = true;
application.use(sessionStore.create(sessionSecrets, secure));

...

express.listen(80);
```
