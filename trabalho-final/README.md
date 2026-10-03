# Trabalho Final

App em React Native (Expo SDK 54), tema a definir.

## Requisitos do enunciado e onde estão atendidos

| # | Requisito | Implementação |
|---|---|---|
| 1 | Pelo menos 3 telas navegáveis | Início, Itens (lista, detalhe, formulário) e Sobre |
| 2 | Usabilidade e design | Validação de formulário, confirmação de exclusão, estados de carregamento e lista vazia, rótulos de acessibilidade |
| 3 | CRUD completo (JSON ou AsyncStorage) | `src/servicos/armazenamento.js` com AsyncStorage |
| 4 | Navegação com Bottom Tabs | `src/navegacao/Abas.js` |
| 5 | Pelo menos uma tela responsiva | `src/telas/ListaItens.js` (1, 2 ou 3 colunas) via `src/hooks/useResponsivo.js` |

## Estrutura

    App.js
    src/
      navegacao/   Abas.js (Bottom Tabs) e PilhaItens.js (Stack dentro da aba Itens)
      telas/       Inicio, ListaItens, DetalheItem, FormularioItem, Sobre
      componentes/ Botao, Campo, EstadoVazio
      servicos/    armazenamento.js (CRUD genérico) e itens.js (coleção do app)
      hooks/       useResponsivo.js
      estilos/     tema.js (cores e espaçamentos)
      imagens/

## Executar

    npm install
    npm run web
