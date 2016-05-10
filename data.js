var data = {
    logo: 'tc-box-logo.png',
    client_name: 'Example'
};

document.body.innerHTML = Mustache.render(document.body.innerHTML, data);