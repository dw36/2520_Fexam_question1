const express = require("express");
const PORT = process.env.PORT || 8008;
const app = express();
const fs = require("fs").promises   // step 10, remember to use fs.promises


// Don't worry about these 4 lines below
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Step 2,  then go line 18     to replace the "Homepage" to "createCard"
app.get("/", (req, res) => {
  res.render("createCard");
});

//Step 3,  to add this app.post , then go line 38
app.post("/create", (req, res) => {
  const user =req.body;                              // here means to post the info from createCard.ejs to the server
  user.id = Math.floor(Math.random() *600 +1) // step 9,   use math to generate a id
  fs.readFile("database.json", "utf-8")       // step 10,   ust to line 5 this page to add const fs 
  .then((content) => JSON.parse(content))     //step 11,    use JSON.parse the content , step 12 go to line 43 app.get("/people")
  .then((jsonObject) =>{                            //it was .then((content) => (content))
                                                    //now changed to .then((content => JASON.parse(content))
                                                    // and .then((jasonObjec) => console.log(jsonObjec))
    console.log((jsonObject) => {                   // jsonObject is what parsed from the JSON.parse
    let newJsonObj = jsonObj;                       //let a new json object
    newJsonObj.users.push(user);                    //only push the user from the entired content
    fs.writeFile("database.json", newJsonObj)       // write the newJsonObj to the database
    .then(() => res.redirect(`/people/${user.id}`)) // redirect to user's id homepage
    .catch(err => console.log(err))
    })
  })
    .catch(err => console.log(err));
})

//Step 4,   to install npm ( do: npm install)
//Step 5,   do: npm start
//step 5.1,   add a .gitignore file to the project , otherwise can't git add
//Step 6,    go to public folder create a file call: createCard.css , go step7, .css line 1

//step 12 , then step 13 , go to homepage.js, line 30
app.get("/people/:id", (req, res) => {
  const id = req.params.id;
  fs.readFile("database.json", "utf-8")
  .then(content => JSON.parse(content).users)
  .then((listOfUsers) => listOfUsers.find(user => user.id === id))         // list user by id
  .then(foundUser => res.render("homepage", {user: foundUser}))           // find the user
  .catch((err) => console.log(err));                            // step 12 finished,  step 13  go to homepage.js line 30
   // res.render("people");  // delete this code 
});

app.get("/:id/photos", (req, res) => {
  const id = req.params.id;
});

app.listen(PORT, () => {
  console.log(`Server now is running at http://localhost:${PORT} 🚀`);
})