const express = require("express");
const PORT = process.env.PORT || 8007;
const app = express();

// Don't worry about these 4 lines below
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Step 2 here , to replace the "Homepage" to "createCard"
app.get("/", (req, res) => {
  res.render("createCard");
});

//Step 3 , to add this app.post
app.post("/create", (req, res) => {
  const user =req.body;  // here means to post the info from createCard.ejs to the server

  // step 9, use math to generate a id
  
})

//Step 4, to install npm ( do: npm install)
//Step 5, do: npm start
//Step 6, go to public folder create a file call: createCard.css
//step7, go to public folder, in createCard.css add some code

app.get("/people/:id", (req, res) => {
  res.render("people");
});

app.get("/:id/photos", (req, res) => {
  const id = req.params.id;
});

app.listen(PORT, () => {
  console.log(`Server now is running at http://localhost:${PORT} 🚀`);
});
