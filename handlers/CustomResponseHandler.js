const path = require('path');
const fs = require('fs');

module.exports["getCustomResponse"] = async function getCustomResponse(userID){
  try {
    const data = fs.readFileSync(path.join(__dirname, '../config/CustomResponses.json'), 'utf8');
    const jsonData = JSON.parse(data);
    
    return (jsonData["users"][userID]);
  } catch (error) {
    return ""; // leave blank if error occurs
  }

  return ""; // leave blank by default
}
