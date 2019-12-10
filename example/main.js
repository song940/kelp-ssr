const http = require('http');
const React = require('react');

// kelp-ssr
const ssr = require('..');

const MyApp = ({ name = 'world' }) => {
  return <div>Hello { name }</div>
};

const { SERVER, DATA, SCRIPT } = ssr.modes;

http.createServer((req, res) => {

  const state = {
    name: 'myapp'
  };

  const html = ssr(MyApp, state, {
    renderingMode: SERVER
  });

  res.end(html)

}).listen(3000);