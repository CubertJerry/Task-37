const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const FOLDER_PATH = path.join(__dirname, 'textFiles');

// Create the folder if it doesn't exist
if (!fs.existsSync(FOLDER_PATH)) {
  fs.mkdirSync(FOLDER_PATH);
}
// Endpoint to create a text file with the current timestamp
app.post('/create-file', (req, res) => {
    const timestamp = new Date().toISOString();
    const fileName = `${timestamp.replace(/:/g, '-')}.txt`;
    const filePath = path.join(FOLDER_PATH, fileName);
  
    fs.writeFile(filePath, timestamp, (err) => {
      if (err) {
        return res.status(500).send('Error creating file');
      }
      res.send(`File created: ${fileName}`);
    });
  });
  // Endpoint to retrieve all text files in the folder
app.get('/files', (req, res) => {
    fs.readdir(FOLDER_PATH, (err, files) => {
      if (err) {
        return res.status(500).send('Error reading folder');
      }
      res.send(files);
    });
  });
  
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });