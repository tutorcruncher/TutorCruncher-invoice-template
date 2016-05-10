var data = {
  logo: 'tc-box-logo.png',
  client_name: 'Example',
  client_street: '123 fake street',
};

if (window.location.href.indexOf('raw=true') === -1) {
  console.log('render template');
  document.body.innerHTML = Mustache.render(document.body.innerHTML, data);
}
