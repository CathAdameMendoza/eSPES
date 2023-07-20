const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.json());

app.post('http://localhost:8100/assets', (req, res) => {
  const jsonData = req.body;

  // Write the JSON data to the data.json file
  fs.writeFile('assets/super-admin-data.json', JSON.stringify(jsonData), (err) => {
    if (err) {
      console.error('Error saving data:', err);
      res.status(500).send('Error saving data');
    } else {
      console.log('Data saved successfully!');
      res.status(200).send('Data saved successfully');
    }
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
