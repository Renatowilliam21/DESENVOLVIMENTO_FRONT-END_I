# Desenvolvimento Front-end I

Atividades da disciplina de Desenvolvimento Front-end da Pós-graduação em
Desenvolvimento Full Stack do IF Sudeste MG, Campus Manhuaçu (Prof. Robson de Souza).

![Build](../../actions/workflows/build.yml/badge.svg)

## Estrutura do repositório

    .
    ├── atividade-1/          App de imóveis com navegação Stack (concluída)
    ├── trabalho-final/       App de tema livre: Bottom Tabs, Stack, CRUD e responsividade
    ├── docs/
    │   └── cronograma.md     Conteúdo da disciplina, atividades e links de referência
    ├── scripts/
    │   ├── setup.js          Verifica o ambiente e instala as dependências
    │   └── empacotar.js      Gera os ZIPs de entrega sem node_modules
    ├── .github/workflows/    CI que testa o build web dos dois projetos
    ├── package.json          Atalhos para rodar tudo a partir da raiz
    └── .nvmrc                Versão do Node usada (22 LTS)

Cada projeto é independente, com seu próprio `package.json` e `node_modules`,
exatamente como o professor espera receber na entrega.

## 1. Pré-requisitos

| Ferramenta | Versão | Para quê |
|---|---|---|
| Node.js | 22 LTS (mínimo 20.19.4) | Rodar o Expo e instalar pacotes |
| Git | qualquer recente | Versionar e subir ao GitHub |
| Expo Go (celular) | compatível com SDK 54 | Testar no Android/iOS |
| GitHub CLI (`gh`) | opcional | Criar o repositório pelo terminal |
| VS Code | opcional | As extensões recomendadas aparecem ao abrir a pasta |

### Windows (PowerShell)

    winget install OpenJS.NodeJS.LTS
    winget install Git.Git
    winget install GitHub.cli

### macOS

    brew install node@22 git gh

### Linux (Ubuntu/Debian)

    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
    # feche e reabra o terminal
    nvm install        # lê a versão do arquivo .nvmrc
    sudo apt install git gh

Depois de instalar, configure sua identidade no Git (uma vez só):

    git config --global user.name "Seu Nome"
    git config --global user.email "seu-email@exemplo.com"

## 2. Preparar o projeto

Na raiz do repositório:

    npm run verificar   # só confere se Node, npm e Git estão ok
    npm run setup       # confere e instala as dependências dos dois projetos

## 3. Executar

| Comando | O que faz |
|---|---|
| `npm run atv1` | Atividade 1 no navegador |
| `npm run atv1:celular` | Atividade 1 no Expo Go (QR code) |
| `npm run final` | Trabalho Final no navegador |
| `npm run final:celular` | Trabalho Final no Expo Go (QR code) |

Para o celular, ele precisa estar na mesma rede Wi-Fi do computador. Se não
conectar, rode dentro da pasta do projeto `npx expo start --tunnel`.

## 4. Subir para o GitHub

Repositório: https://github.com/Renatowilliam21/DESENVOLVIMENTO_FRONT-END_I

Os enunciados e materiais das aulas (PDF e ZIP) ficam fora do Git pelo `.gitignore`,
porque são do professor e o repositório é público. Se quiser guardá-los localmente,
crie a pasta `docs/enunciados/`: ela já está ignorada.

Para clonar em outro computador:

    git clone https://github.com/Renatowilliam21/DESENVOLVIMENTO_FRONT-END_I.git
    cd DESENVOLVIMENTO_FRONT-END_I
    npm run setup

A cada push, a aba **Actions** do GitHub compila os dois projetos para web e
avisa se algo quebrou.

## 5. Gerar os ZIPs de entrega

    npm run entrega                   # todos os projetos
    npm run entrega -- trabalho-final # só um

Os arquivos saem em `entregas/` (ignorada pelo Git), sem `node_modules`. Só entra
no ZIP o que já foi commitado. Se o Trabalho Final usar json-server, mantenha o
`db.json` na raiz de `trabalho-final/`, como pede o enunciado.

## Problemas comuns

- **Versões incompatíveis do Expo**: dentro da pasta do projeto, `npx expo install --fix`.
- **Erro estranho após trocar de branch ou atualizar pacotes**: apague `node_modules`
  do projeto e rode `npm run setup` de novo.
- **Cache do Metro**: `npx expo start -c`.
