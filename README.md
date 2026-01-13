# InSim Delta Time

Este projeto é um cliente InSim para **Live for Speed (LFS)** focado em calcular o **delta time** de uma corrida em **tempo real**.

O objetivo principal é permiti saber quais pontos da pista você está ganhando ou perdendo tempo ao comparar duas voltas utilzando pontos de referência predeterminados pelo um arquivo `.lyt`.

## Funcionalidades

- Conexão com o LFS via InSim
- Cálculo de delta time em tempo real entre voltas 

## Como funciona

1. Um arquivo `.pth` da pista é convertido em um layout `.lyt` (Ainda não integrado com a insim)
2. O layout define pontos de referência ao longo da pista
3. Quando um carro atravessa esses pontos seu tempo de volta até ali é registrado
4. O delta time é calculado comparando o tempo de duas voltas nos mesmo pontos

## Uso

```
npm start
```

## Imagens

![lfs_00000008](https://github.com/user-attachments/assets/839634fb-37f3-4e18-a8de-27c6c43d5888)
*Figura 1 – Exemplo do HUD exibindo o delta time em tempo real.*

![lfs_00000009](https://github.com/user-attachments/assets/999733b0-1efc-422c-9ea4-60fa8e9977d6)
*Figura 2 – Exemplo dos pontos de referência.*
