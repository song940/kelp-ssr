## kelp-ssr

> simplify server side rendering

### Installation

```bash
$ npm install kelp-ssr
```

### Example

```js
const http = require('http');
const React = require('react');

const ssr = require('kelp-ssr');

const MyApp = ({ name = 'world' }) => {
  return <div>Hello { name }</div>
};

const { SERVER, DATA, SCRIPT } = ssr.modes;

http.createServer((req, res) => {

  const state = {
    name: 'myapp'
  };

  const html = ssr(MyApp, state, {
    renderingMode: SERVER | DATA | SCRIPT
  });

  res.end(html)

}).listen(3000);
```

### Contributing
- Fork this Repo first
- Clone your Repo
- Install dependencies by `$ npm install`
- Checkout a feature branch
- Feel free to add your features
- Make sure your features are fully tested
- Publish your local branch, Open a pull request
- Enjoy hacking <3

### MIT

This work is licensed under the [MIT license](./LICENSE).

---