# CCI-36
Atividades da disciplina CCI-36 - 2022:
### Alunos:
- Fernando Zanchitta
- Mateus Nobre
- Davi Xie

## Utilização do Laboratório 1:
- Para instalar localmente o projeto faça:
```
npm init
npm install three
npm install dat.gui
npm install parcel -g
```
Para executar localmente:
```
parcel ./src/index.html
```

## Sobre o jogo:

- O objetivo do jogo Tangram é preencher totalmente a área cinza (sob o formato de uma casa com chaminé) com as peças geométricas coloridas presentes.

- Para mover uma peça de lugar, o jogador deve clicar uma vez em cima da peça que deseja mover, arrastar até uma posição desejada e então clicar novamente na tela para soltar a peça.

- Para rotacionar uma peça há uma opção no lado superior direito onde o jogador pode rotacionar a peça desejada, a partir de dois métodos: inserindo um ângulo de rotação ou movendo o componente slider da respectiva peça.

- Quando o jogador atingir o objetivo, ele vence o jogo e aparece uma tela indicando o sucesso do usuário.

## Explicação da construção do jogo:

Para confeccionar o jogo, utilizamos a ferramenta THREE.JS que permite de forma fácil a confecção e o manuseio de peças em uma visão 3D. Foi realizado, com o auxílio da classe BufferGeometry, adição de triângulos para a criação das peças geométricas, da base e da área cinza a ser preenchido.

Como o jogo Tangram deve estar em 2D e a ferramenta utilizada permite confecções a nível 3D, foi mantido todos os objetos em um mesmo nível e sem espessura (à excessão da base).

Para a rotação, foi escolhido um método diferente daquele utilizado e apresentado pelo professor em sala, para que fosse permitido uma rotação mais exata das peças. Foi utilizado a biblioteca $\textit{dat.gui}$ que permite a criação de uma barra de opções em formato de slider, que permite a alteração de parâmetros da figura em tempo real. Dessa forma, facilitou-se a rotação das peças para encaixe no template.

Para a movimentação das peças, é utilizado a função auxiliar intersectObjects para verificar qual peça foi selecionada. Assim, é possível movê-la de posição ao mover o mouse. Após isso, o usuário deve clicar novamente na tela para soltar a peça. No código, para tal tarefa é utilizado a variável draggable, que pode receber uma peça ou null e dependendo de seu valor, move-se uma peça ou não, respectivamente.

A checagem para concluir o jogo se dá ao mapear todos os vértices das peças com os vértices da área cinza. Caso coincida, tolerando uma pequena margem de erro, então o usuário venceu o jogo.

## Funções point-in-polygon:
Conforme mencionado, quando selecionamos uma peça para mover, a função intersectObjects realiza a etapa de verificar se o mouse (um ponto) está em cima de alguma peça (polígono). Assim, o usuário consegue escolher uma peça e movê-la. Nisso consiste a função point-in-polygon do projeto.

## Função polygon-intersection-area:
Para mapear a interseção entre áreas, optou-se por simplicidade realizar o mapeamento de vértices chave do Template de resposta , e vértices de referência de cada peça do Tangram. Nesse contexto, para validar se uma peça se encontra posicionada corretamente, calcula-se a distância entre as coordenadas do vértice (x,z) e a angulação da peça em relação ao vértice chave correspondente do template.

Para que o jogo inteprete que a peça está corretamente posicionada, verificamos se as coordenadas e ângulo estão a uma margem de erro $\epsilon$ arbitrado no código.
