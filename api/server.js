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