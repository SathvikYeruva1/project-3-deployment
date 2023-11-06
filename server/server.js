const express = require("express")
const app = express()

app.get("/api", (req, res) => {
  res.json({"response": ["response1", "response2"]})
})

app.listen(5001, () => {console.log("Server started on port 5001")})

