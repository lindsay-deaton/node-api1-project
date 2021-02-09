const server = require('./api/server');
//same as "express" from the GP. This is called commonJS

// const port = 5000;

// START YOUR SERVER HERE

server.listen(5000, ()=> {
console.log("listening on 5000")  
})
