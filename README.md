# CCI-36
Atividades da disciplina CCI-36 de Fernando, Mateus e Davi - 2022

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

Para a rotação, foi escolhido um método diferente daquele utilizado e apresentado pelo professor em sala, para que fosse permitido uma rotação mais exata das peças.

## Função point-in-polygon:

## Função polygon-intersection-area:
