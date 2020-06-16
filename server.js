// Set up using https://www.youtube.com/watch?v=2hhEOGXcCvg
const PORT = 3000

let express = require('express');

let app = express();
let server = app.listen(PORT);

app.use(express.static('public'));

console.log("Server running on http://localhost:" + PORT + ".");