let listElement = document.querySelector('#app ul');
let inputElement = document.querySelector('#app input');
let buttonElement = document.querySelector('#app button');
let div = document.getElementById('container')

let tarefas = JSON.parse(localStorage.getItem("@listaTarefas")) || []

//Quando adicionamos um evento sem ser no HTML, não precisamos adicionar ().
function renderTarefas()
{
    listElement.innerHTML = ''

    tarefas.map((tarefa) =>{

        var item = document.createElement('li')
        var tarefaText = document.createTextNode(tarefa)


        var linkElement = document.createElement('a')
        linkElement.setAttribute("href", "#")

        let position = tarefas.indexOf(tarefa)
        linkElement.setAttribute('onclick',`excluirTarefa(${position})`)

        var excluirText = document.createTextNode('Excluir')
        linkElement.append(excluirText)
        
        item.appendChild(tarefaText)
        item.appendChild(linkElement)
        listElement.appendChild(item)
    })

}

renderTarefas()

function registrar()
{
    if(inputElement === '')
    {
        alert("Digite algo")
        return false
    }
    else
    {
        let novaTarefa = inputElement.value

        tarefas.push(novaTarefa)
        inputElement.value = ''

        renderTarefas()
        salvarDados()
    }
}

function excluirTarefa(position)
{
    tarefas.splice(position, 1)
    renderTarefas()
    salvarDados()
}

function salvarDados()
{
    localStorage.setItem("@listaTarefas", JSON.stringify(tarefas))
}
function carregar(){
    renderTarefas()
}

button.onclick = registrar
body.onload = carregar