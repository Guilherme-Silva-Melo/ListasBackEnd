var express = require('express');
var Task = require("../model/Tasks")
var TaskSchema = require("../validators/TaskValidator")
const Joi = require("joi")
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  if (Task.list().length == 0) {
    Task.new("Tarefa 1", "Baixa");
    Task.new("Tarefa 2", "Alta");
  }

  let obj = Task.getElementById(req.query.tid);
  res.render("index", { tasks: Task.list(), task: obj });
});

router.post("/tarefas", function (req, res){
    const {error, value} = TaskSchema.validate(req.body);
    if (error) {
      res.render('index', { tasks: Task.list(), erro: "Dados incompletos" });
      return;
    }
    
    const {id, nome, prioridade} = value
    if (id === undefined) {
      //Inserir
      Task.new(nome,prioridade);
    } else {
      //Alterar
      Task.update(id, nome, prioridade);
    }
    
    res.redirect("/");
})

router.get("/tarefas/del/:id", function(req, res){
  const {id} = req.params;
  const {error, value} = Joi.number().integer().greater(0).validate(id)

  if (error || !Task.delete(value)) {
    res.send("Falha ao excluir uma tarefa");
    return;
  }
  res.redirect("/");
})

router.get("/tarefas/quantidade",(req,res)=>{
  const contador = Task.list().length
  res.render("numerotarefas",{contador})
})

router.get("/tarefas/alfabetica",(req,res)=>{

  let crescent = Task.list().map(object => {
    return object.name.toLowerCase()
  }).sort()

  let crescentList = crescent.map(name => {
    return Task.list().find(task => task.name.toLowerCase() === name);
  });

  res.render("alfabetica",{tasks: crescentList})
  //res.send(crescentList)
})

module.exports = router;
