// filepath: /c:/Users/ushuk/Uskuugen.github.io/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 80;

app.use(cors()); // Enable CORS
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/submit-order', (req, res) => {
    const meal = req.body.meal;
    res.send(`Order received for: ${meal}`);
});

app.post('/submit-feedback', (req, res) => {
    const feedback = req.body.feedback;
    res.send(`Feedback received: ${feedback}`);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});