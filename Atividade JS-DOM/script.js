let ul = document.getElementById('lista')
let buttonAdd = document.getElementById('addTask')

buttonAdd.addEventListener("click", addNewTask);

var idCounter = 0;

function generationId(){
    return 'myid-' + idCounter++
}

function addNewTask(){
    let texto = document.getElementById("tarefa").value
    if (texto === '') return;

    let li = document.createElement("li");
    let buttonRemove = document.createElement('button')
    let input = document.createElement('input')
    input.type = 'checkbox'
    buttonRemove.innerHTML = 'Remover'
    
    li.id = generationId()

    input.addEventListener('change', function() {
        if (input.checked) {
            li.classList.add('grifado');
        } else {
            li.classList.remove('grifado');
        }
    });

    buttonRemove.addEventListener('click', () => removeTask(li.id));

    li.appendChild(input);
    li.appendChild(document.createTextNode(texto));
    li.appendChild(buttonRemove);
    
    ul.appendChild(li);
    document.getElementById("tarefa").value = ''
}

function removeTask(id){
    let liToRemove = document.getElementById(id);
    if (liToRemove) {
        ul.removeChild(liToRemove);
    }
}