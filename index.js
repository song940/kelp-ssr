
const ssr = (component, props, options) => {
  const { DATA, SCRIPT, SERVER } = ssr.modes;
  const {
    target = 'app',
    stateKey = '__state',
    libraryName = 'App',
    renderingMode = DATA | SCRIPT | SERVER,
  } = options;
  var html = '';
  var isServerRendering = false;
  if ((renderingMode & SERVER) === SERVER) {
    const React = require('react');
    const ReactDOM = require('react-dom/server');
    const node = React.createElement(component, props);
    html = ReactDOM.renderToString(node);
    isServerRendering = true;
  }

  var output = `<div id="${target}" >${html}</div>`;
  if ((renderingMode & DATA) === DATA) {
    const serialize = require('serialize-javascript');
    const data = serialize(props);
    output += `<script>window.${stateKey} = ${data};</script>`;
  }

  if ((renderingMode & SCRIPT) === SCRIPT) {
    output += `
    <script>
    ;(function(App, props){
      if('default' in App) App = App['default'];
      var app = document.getElementById('${target}');
      var node = React.createElement(App, props);
      ReactDOM.${isServerRendering ? 'hydrate' : 'render'}(node, app);
    })(${libraryName}, window.${stateKey});
    </script>`;
  }

  return output;
};

ssr.modes = {
  DATA: 1 << 0x00,
  SCRIPT: 1 << 0x01,
  SERVER: 1 << 0x02,
};

module.exports = ssr;