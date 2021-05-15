const http = require('http');
const fs = require("fs");
const axios = require('axios')


const URL1 = "https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json";
const URL2 = "https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json";


const readFile = (path, callback) => fs.readFile('index.html', (err, data) => {
    if(path == "/api/proveedores"){
        axios.get(URL1).then(response => callback(corpus(path, response.data, data)));
    }else if (path == "/api/clientes"){
        axios.get(URL2).then(response => callback(corpus(path, response.data, data)));
    } else {
        callback(data.toString());
    }
});

const corpus = (path, json, data) => {
    let pageContent = data.toString();
    let replace = "";
    let title = "";
    if(path == "/api/proveedores"){
        title = "Api / Proveedores"
        json.forEach(element => {
            replace += "<tr><th scope=\"row\">"+element.idproveedor+"</th><td>"+element.nombrecompania+"</td><td>"+element.nombrecontacto+"</td></tr>";
        });
    } else if (path == "/api/clientes"){
        title = "Api / Clientes"
        json.forEach(element => {
            replace += "<tr><th scope=\"row\">"+element.idCliente+"</th><td>"+element.NombreCompania+"</td><td>"+element.NombreContacto+"</td></tr>";
        });
    }
    pageContent = pageContent.replace("{{title}}", title);
    pageContent = pageContent.replace("{{replace}}", replace);
    return pageContent;
};

http.createServer(function (req, res) {
    var path = req.url;
    readFile(path,(data) => {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(data);
    });
  }).listen(8081);