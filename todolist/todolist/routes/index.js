var express = require('express');
var Task = require("../model/Tasks")
var TaskSchema = require("../validators/TaskValidator")
const Joi = require("joi")
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (Task.list().length == 0) {
    Task.new("Tarefa 1", "Media");
    Task.new("Tarefa 2", "Baixa");
  }

  let obj = Task.getElementById(req.query.tid);
  res.render('index', { tasks: Task.list(), task: obj });
});

router.get('/teste',(req,res)=>{
  res.send(Task.list())
})

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
      Task.update(id, nome,prioridade);
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

router.get('/alfabetica',(req,res)=>{
  const taskList = Task.list()

  console.log(taskList)

  let crescente = taskList.map(obj => {
    return obj.name.toLowerCase()
  }).sort()

  let crescenteList = []
  for(var i = 0; i < crescente.length; i++){
    crescenteList.push(Task.list().find(x=> x.name.toLowerCase() == crescente[i])) ;
  }

  console.log(crescenteList)

  res.render('alfabetica', {tasks: crescenteList});
})

router.get("/alfabetica/del/:id", function(req, res){
  const {id} = req.params;
  const {error, value} = Joi.number().integer().greater(0).validate(id)

  if (error || !Task.delete(value)) {
    res.send("Falha ao excluir uma tarefa");
    return;
  }
  res.redirect("/alfabetica");
})

router.get("/numerotarefas", function(req, res){
  let numerotarefas = Task.list().length
  res.render('numerotarefas',{numerotarefas})
})

module.exports = router;
