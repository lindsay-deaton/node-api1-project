// BUILD YOUR SERVER HERE
//build first
const express = require("express")
const Users = require("./users/model")
const server = express()
server.use(express.json())


module.exports = server; // EXPORT YOUR SERVER instead of {}

server.get("/", (req, res) => {
  res.json({ message: "Hello World!" })
})

server.get("/api/users", (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => {
      res.status(500).json({message: "Server errors."})
    })
})

server.get("/api/users/:id", (req, res) => {
  const { id } = req.params
  Users.findById(id)
    .then(user => {
      if (!user) {
      res.status(404).json({message: "User with ID does not exist."})
      } else {
        res.status(200).json(user)
      }
    })
    .catch(err => {
    res.status(500).json({message: "Server Error."})
  })
})

server.post("/api/users/", async (req, res) => {
  //what do you need for the insert function?
  const { name, bio } = req.body
  
      if (!name || !bio) {
        res.status(400).json({message: "You must enter a Name and Bio info."})
      } else {
        try {
          const newUser = await Users.insert({ name, bio })
          res.status(201).json(newUser)
        }
        catch (err) {
          res.status(500).json({message: err.message})
        }
    }
})

server.put("api/users/:id", (req, res) => {
  //what do you need for the update function
  const { name, bio } = req.body
  //what items are available in the object that need to be updated?
  const id = req.params.id
  //in order to update, you'll need to find something unique for each object.
  const indexOfUser = users.findIndex(user => user.id === id)
  
  try {
    if (indexOfUser != -1) {
      user[indexOfUser] = { id, name, bio }
      //if it does find it, we go to the array and find the index.  the ID then, doesn't change but the name and bio do which were pulled out of the req body.
      res.status(200).json({id, name, bio})
    } else {
      res.status(404).json({message: `No user with id:${id}`})
   }
  }
  catch (e) {
    res.status(500).json({message: `server error: ${e}`})
  }
})

server.delete("/api/users/:id", (req, res) => {
  const id = req.params.id
  try {
    if (!Users.find(user => user.id === id)) {
      res.status(404).json({ message: `User with id: ${id}, not found.` })
    } else {
      users = users.filter(user => user.id !== id)
      //if the person doesn't have this id, it will go into the .filter, created array.
      res.status(200).json({ message: `User: ${id} was deleted.` })
    }
  } catch (e) {
    res.status(500).json({message: `Server error: ${e}`})
  }
})