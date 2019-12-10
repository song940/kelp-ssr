require('@babel/register')({
  babelrc: false,
  presets: [ '@babel/preset-react' ],
});

require('./main');