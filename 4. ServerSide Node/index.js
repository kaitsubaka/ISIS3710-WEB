const http = require("http");
const fs = require("fs");
const axios = require("axios");
const URL =
  "https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json";
const getFileContent = (callback) => {
  fs.readFile("index.html", (err, data) => {
    callback(data.toString());
  });
};



http
  .createServer((req, res) => {
    axios
      .get(URL)
      .then(function (response) {
        
        // handle success
        console.log(typeof(response));
        
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });

    
  })
  .listen(3000);
