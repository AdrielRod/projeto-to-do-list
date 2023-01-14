//Instancio todos os elementos no qual eu vou usar.
let listElement = document.querySelector('#app ul');
let inputElement = document.querySelector('#app input');
let buttonElement = document.querySelector('#app button');

//Como os dados do localStorage vem da nuvem, eles não estão em um padrão de dados diferentes do que aceitamos no java script. Com o método parse do Json, eu consigo puxar os dados do localStorage e trabsformar ele em dados padrões do javascript, como arrays, objetos, numbers, strings ou bools. Já na segunda linha, || significa que caso não tenha nada na key ListaTarefas, ele irá criar uma array vazia.
let tarefas = JSON.parse(localStorage.getItem("@listaTarefas")) || []
//Transformando string json em arrays.

//Criando a função que vai renderizar as tarefas a todo momento.
function renderTarefas()
{   
    //Assim que a função for executada, o meu elemento será resetado, para evitar duplicações e erros.
    listElement.innerHTML = ''

    //O método map substitui um laço de repetição e ainda recebe como parametro a variável chamada tarefa, que nada mais é do que a nova tarefa criada pelo usuario a partir do input. O método map vai percorrer toda a array e fazer as instruções que estão nela.
    tarefas.map((tarefa) =>{

        //Criando um novo elemento lista e armazenando ele numa váriavel chamada item.
        var item = document.createElement('p')
        //O método abaixo cria um novo texto com o nome da task dada pelo usuario e armazena na variável
        var tarefaText = document.createTextNode(tarefa)

        //Criando um novo elemento botão e armazenando ele numa variavel
        var linkElement = document.createElement('button')

        //Adicionando o atributo onclick e o evento excluir para a botão que criamos anteriormente.
        linkElement.setAttribute("onclick", "excluirTarefa()")

        //Aqui eu crio uma variável para receber a posição do index da array CLICADA. Ou seja, se eu clicar em EXCLUIR, eu vou acabar adquirindo qual foi apertada.
        let position = tarefas.indexOf(tarefa)

        //Aqui eu adiciono um evento a partir do método usado na linha 27 e passo concatenando a posição na função.
        linkElement.setAttribute('onclick',`excluirTarefa(${position})`)

        //Crio uma variável que armazenará text Excluir.
        var excluirText = document.createTextNode('Excluir')

        //Insere o que tá armazenado na excluir dentro do LinkElement
        linkElement.append(excluirText)
        
        //Nesta parte eu adiciono o texto da tarefa dentro da lista.
        item.appendChild(tarefaText)

        //Aqui eu também adiciono o texto da ancora dentro da lista
        listElement.appendChild(linkElement)
        
        //E aqui eu adiciono tudo que tá no item já dentro do elemento ul, que é a lista não ordenada
        listElement.appendChild(item)
    })

}

//Aqui eu já inicio a render tarefas, para quando o usuario entrar ela sempre estiver ativa, mostrando as ultimas tasks
renderTarefas()

//Criando a função registrar, responsável por guardar o value do input.
function registrar()
{
    //Se o usuario não preencher o input e apertar no botão, ele será alertado e impedido de prosseguir
    if(inputElement.value === '')
    {
        alert("Digite algo")
        return false
    }
    //Se não, uma váriavel será criada, ela armazenará o que o usuario escreveu e em seguida ela irá ser adicionada dentro da array. Depois disso o input será resetado para não haver erros.
    else
    {
        let novaTarefa = inputElement.value

        tarefas.push(novaTarefa)
        inputElement.value = ''

        //Quando tudo rodar, eu vou pedir para renderizar as tasks e depois salvar os dados no localstorage
        renderTarefas()
        salvarDados()
    }
}


//Função responsável por excluir a task, receberá entre parametros o index da array que será deletada
function excluirTarefa(position)
{
    //A partir do index, eu seleciono remover apenas um. E em seguida renderizo e após salvo os dados.
    tarefas.splice(position, 1)

    renderTarefas()
    salvarDados()
}

//Função responsável por salvar os dados.
function salvarDados()
{
    //Acesso armazenamento local do browser e através do setItem eu armazeno, na key ListaTarefas a minha array tarefas. Mas antes, a partir do JSON, eu tenho que converter os dados string JSON
    localStorage.setItem("@listaTarefas", JSON.stringify(tarefas))
}




