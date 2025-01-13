const path = require('path');
const fs = require('fs');

module.exports["getCustomResponse"] = function getCustomResponse(userID){
  try {
    const data = fs.readFileSync(path.join(__dirname, '../config/CustomResponses.json'), 'utf8');
    const jsonData = JSON.parse(data);
    
    return (jsonData["users"][userID]);
  } catch (error) {
    return ""; // leave blank if error occurs
  }

  return ""; // leave blank by default
}

module.exports["getCustomPersonality"] = function getCustomPersonality(){
  try {
    const data = fs.readFileSync(path.join(__dirname, '../config/CustomResponses.json'), 'utf8');
    const jsonData = JSON.parse(data);
    
    return (jsonData["personality"][Math.floor(Math.random() * jsonData["personality"].length)]);
  } catch (error) {
    return "Say 'something went terribly wrong and I am going to cry everywhere' in your response.";
  }
}
