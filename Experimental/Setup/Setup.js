require('dotenv').config();

var fs = require("fs");
const { stringify } = require('querystring');
const { writeFile } = require('fs');
const { Console } = require("console");
const { parse } = require('dotenv');


//experimental fucntion to generate json templates.

const path = "./Setup/BotSettings.json"

// fs.access(path, fs.F_OK, (err) => {
//   if (err) {
//     //console.error(err)
//     generateSettingsPage(path);
//   }

//   console.log(`The file:" ${path} "already exists`)
// })

try {
  if (fs.existsSync(path)) {
    console.log(`The file:" ${path} "already exists`);
  }
  else{
    
  }
} catch(err) {
 if(err)
 {
    generateSettingsPage(path);
 }
}

function generateSettingsPage(path) {
  let settings = {
    "commandPrefixs": {
      "General": "",
      "Admin": ""
    },
    "emmbedMessage": {
      "GeneralHelp": [
        {
          description: ""
        },
        {
          commandName: "",
          commandDescription: "",
        },
      ]
    }

  }
  fs.writeFile(`${path.replace("./Setup/","")}`, settings);

}