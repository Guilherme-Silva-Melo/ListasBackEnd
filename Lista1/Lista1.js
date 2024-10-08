//Guilherme Augusto Silva de Melo - RA 2267306

//1-Escreva uma função que calcule e retorne o fatorial de um número.
function calculaFatorial(valor){
    fatorial = 1;
    for(var i=0; i<valor; i++){
        fatorial *= (i+1)
    }
    return fatorial;
};

// 2- Escreva uma função que retorne uma String contendo uma sequência de 
// N mensagens do texto informado pelo usuário. O valor de N e 
// a mensagem são informados por parâmetro

function repetirMensagem(mensagem, n){
    var texto = '';
    for(var i=0; i<n; i++){
        texto += mensagem + ' ';
    }
    return texto
};

// 3. Escreva uma função que receba 2 valores e uma operação básica: adição, subtração,
// multiplicação e divisão e retorne o resultado da operação.
// Observação: Faça a validação para prevenir a divisão por 0 e também para garantir que
// a operação informada é válida. Retorne nulo para os casos de erro.

function calculaOperacao(valor1, valor2, operacao){
    switch(operacao){
        case 'adicao':
            return valor1 + valor2;
        case'subtracao':
            return valor1 - valor2;
        case'multiplicacao':
            return valor1 * valor2;
        case 'divisao':
            if(valor2!= 0){
                return valor1 / valor2;
            } else {
                return null;
            }
        default:
            return null;
    }
};

// 4. Escreva uma função que retorne um vetor contendo o resultado da tabuada de um
// número recebido por parâmetro. Cada resultado na respectiva posição do índice.

function calculaTabuada(valor){
    let tabuada = []
    for(var i=0; i<11; i++){
        tabuada[i] = valor*i
    }
    return tabuada
};

// 5. Escreva uma função que retorne um número fornecido pelo usuário, porém
// invertido. Por exemplo, o usuário fornece o número 875 e a função retorna o número
// 578. O argumento da função e o retorno deve ser um valor inteiro.

function inverteNumero(numero){
    let invertido = 0;
    while(numero > 0){
        invertido = invertido * 10 + numero % 10;
        numero = Math.floor(numero / 10);
    }
    return invertido;
}

// 6. Escreva uma função que permita contar o número de vogais contidas em uma string
// fornecida por parâmetro. Por exemplo, o usuário informa a string “Brocolis”, e a função
// retorna o número 3 (há 3 vogais nessa palavra).

function contarVogais(frase){
    let vogais = ['a', 'e', 'i', 'o', 'u'];
    let contador = 0;
    for(let i=0; i<frase.length; i++){
        if(vogais.includes(frase[i].toLowerCase())){
            contador++;
        }
    }
    return contador;
}

// 7. Escreva uma função que receba uma sequência de parênteses e colchetes e retorne se
// a sequência está bem formada ou não. O retorno deve ser um valor lógico. Exemplo:
// “(([]))” retorna true, “(([)])” retorna falso.

function verificaParentesesColchetes(sequencia){
    let pilha = [];
    for(let i=0; i<sequencia.length; i++){
        if(sequencia[i] == '('){
            pilha.push('(');
        } else if(sequencia[i] == ')'){
            if(pilha.length == 0 || pilha.pop()!= '('){
                return false;
            }
        } else if(sequencia[i] == '{'){
            pilha.push('{');
        } else if(sequencia[i] == '}'){
            if(pilha.length == 0 || pilha.pop()!= '{'){
                return false;
            }
        }
    }
    return pilha.length == 0;
}

// 8. Escreva uma função que receba um número e retorne uma lista de objetos (id, nome e
// idade) aleatórios gerados dinamicamente. O código deve ser sequencial; use uma lista
// de nomes pré-definida; e gere idades entre 18 e 90 anos.

function geraLista(quantidade){
    let nomes = ['Guilherme','Gustavo','Alice','Maria','Joao','Jose','Julia','Mario'];
    let pessoas = [];
    for(let i=0; i<quantidade; i++){
        let idade = Math.floor(Math.random() * (90 - 17)) + 18;
        let nome = nomes[Math.floor(Math.random() * nomes.length)];
        pessoas.push({id: i+1, nome: nome, idade: idade});
    }
    return pessoas;
}

// 9. Escreva uma função que receba a lista de objetos gerados anteriormente e calcule a
// média de idades das pessoas presentes na lista.
function calculaMediaIdades(pessoas){
    let soma = 0;
    for(let i=0; i<pessoas.length; i++){
        soma += pessoas[i].idade;
    }
    return soma / pessoas.length;
}

// 10. Escreva uma função que receba a lista de objetos gerados anteriormente e ordene os
// dados por um dos atributos informados por parâmetros.

function ordenaPorAtributo(pessoas, atributo){
    if(atributo =='nome'){
        return pessoas.sort((a, b) => {
            const nameA = a.nome.toUpperCase(); 
            const nameB = b.nome.toUpperCase();
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
          
            return 0;
        });
    }
    return pessoas.sort(
        (a, b) => a[atributo] - b[atributo]);
}
