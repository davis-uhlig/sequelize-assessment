const express =  require('express');
const router = express.Router();
const models = require('./models');

// toDo = [];
completedList = [];

router.get("/", function(req, res){
  models.Todos.findAll().then(function(todos){
    res.render("index", {todos: todos});
  });

});

const getTodo = function(req, res, next) {
  models.Todos.findById(req.params.todoid).then(function(toDo) {
    if (toDo) {
      req.toDo = todo;
      next();
    } else {
      res.status(404).send("Not Found");
    }
  });
}

router.post("/", function(req, res){

req.checkBody("newTodo", "You must enter a new todo").notEmpty();

const todoItem = {
  todo: req.body.newTodo
};

  req.getValidationResult().then(function(result){
    if(result.isEmpty()){
      models.Todos.create(todoItem).then(function(toDo){
        res.redirect("/");
      });
    } else {
        res.redirect("/");
      }

  });



  // if(req.body.newTodo){
  // toDo.push(req.body.newTodo);
  // res.redirect("/");
  // }
  // else {
  //   toDo.splice(toDo.indexOf(req.body.incomplete), 1);
  //   completedList.push(req.body.incomplete)
  //   res.redirect("/")
  // }
});

router.post("/:todoid/delete", getTodo, function(req, res) {
  req.todo.destroy().then(function() {
    res.redirect("/");
  });
});


module.exports = router;
