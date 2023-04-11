const bcrypt = require('bcrypt')
const express = require('express')
const app = express()
const port = 3000

let dbUsers = [
    {
      username: "yee cinn",
      password: "123456",
      email:"kobe0@gmail.com"
  },{
    username: "gg",
    password: "34343",
    email:"wee0@gmail.com"
  },{
    username: "nononn",
    password: "whatthe",
    email:"beee0@gmail.com"
  }]

//encrypt existing user passwords in the database
for (let i = 0; i < dbUsers.length; i++) {
  const hashedPassword = bcrypt.hashSync(dbUsers[i].password, 12);
  dbUsers[i].password = hashedPassword;
}

  //must 1
  app.use(express.json());
  //must 2
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

  app.get('/', (req,res)=> {
    res.send('Hello World!')
  })

//asynchorous method help improver server performance and more responsive to user requests
  app.post('/signup', async (req, res) =>{
    //get username, password, email from the client
    const {username, password, email} = req.body;
    //bcrypt the password and store in hash
    const hash = await bcrypt.hash(password, 12);
    //test whether the username is inside the database or not
    const matched = dbUsers.find(Element=> Element.username === username);
    if(matched){
      res.send("Username exist"); 
      return; 
    }else{
      dbUsers.push({
        username: username,
        password: hash,
        email: email
      })
      res.send("push successfully"); 
      return;
    }
})

app.post('/loginUser', async(req, res)=>{
  //get username and password
  const {username, password} = req.body;
  const user = dbUsers.find(Element=> Element.username === username);
  if(user){
    const hashPass = await bcrypt.compare(password, user.password)
    if(hashPass){
      res.send(user);
    }else{
      res.send("password not match")
      return
    }
  }else{
    res.send("User not found")
    return
  }
})

