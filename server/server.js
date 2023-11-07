const express = require("express")
const app = express()
const path = require('path')
const _dirname = path.dirname(__filename)
const buildPath = path.join(_dirname, "../client/build")

app.use(express.static(buildPath))
app.get("/*",function(req,res){
  res.sendFile(
    path.join(__dirname, "../client/build/index.html"),
    function(err){
      if(err){
        res.status(500).send(err);
      }
    }
  );
})

app.get("/api", (req, res) => {
  res.json({"response": ["response1", "response2"]})
})

app.listen(5001, () => {console.log("Server started on port 5001")})

