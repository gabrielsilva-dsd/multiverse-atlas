# MULTIVERSE / ATLAS

**Explore o impossível, um personagem por vez.**

![React](https://img.shields.io/badge/React-19-149eca?logo=react&logoColor=white) ![Vite](https://img.shields.io/badge/Vite-6-646cff?logo=vite&logoColor=white) ![CSS Modules](https://img.shields.io/badge/CSS-Modules-3b82f6) ![API pública](https://img.shields.io/badge/API-Rick%20and%20Morty-b4f075) ![Licença](https://img.shields.io/badge/licen%C3%A7a-MIT-informational)

Um painel responsivo para descobrir personagens do universo Rick and Morty. Busca instantânea, filtros combinados, detalhes acessíveis e tema persistente em uma interface com identidade própria.

## Links de entrega

- **Aplicação publicada (Vercel ou Netlify):** pendente de publicação. Substitua esta linha pela URL antes do envio ao bootcamp.
- **Repositório no GitHub:** pendente de criação. Substitua esta linha pela URL antes do envio ao bootcamp.

## O problema e a solução

Catálogos extensos dificultam encontrar uma pessoa específica e entender seu contexto. O Multiverse Atlas organiza o acervo em páginas leves, combina critérios de pesquisa no servidor e mostra origem, localização e aparições sem tirar o usuário do fluxo de exploração.

## Objetivo da aplicação

Facilitar a consulta a personagens da série por nome, status, espécie e gênero, permitindo examinar seus detalhes em uma interface clara para celular, tablet e desktop.

## Tecnologias utilizadas

React 19, Vite 6, JavaScript com JSDoc, CSS Modules, Context API, Fetch API e testes com `node:test`.

## API escolhida

A [The Rick and Morty API](https://rickandmortyapi.com/documentation) fornece imagens, dados estruturados, paginação e filtros combináveis por `name`, `status`, `species` e `gender`, sem chave de API. O endpoint utilizado é `https://rickandmortyapi.com/api/character/`. Cada página contém até 20 registros; a interface não carrega todo o catálogo. A disponibilidade da aplicação depende desse serviço e das imagens hospedadas nele.

## Funcionalidades

- Busca por nome com debounce de 350 ms e requisições antigas canceladas por `AbortController`.
- Até três tentativas para falhas transitórias de rede, HTTP 429 e HTTP 5xx; nova tentativa manual na página atual.
- Filtros combináveis de status, espécie e gênero, com paginação controlada pelo servidor.
- Remoção de IDs repetidas na página exibida, preservando a ordem da resposta.
- Modal com foco inicial, ciclo de foco por Tab, Escape para fechar, retorno do foco, bloqueio da rolagem de fundo e cópia da URL da API com feedback.
- Vídeo do globo fornecido para o projeto, reproduzido sem áudio em loop com poster e botão de reprodução quando o autoplay for bloqueado; retratos com skeleton, transição suave e placeholder local sempre disponível.
- Skeleton, erro com nova tentativa e estado vazio com limpeza de filtros.
- Tema claro e escuro persistido em `localStorage`, com preferência inicial do sistema.
- Layout adaptativo, indicadores de foco visíveis e respeito a `prefers-reduced-motion`.

## Arquitetura e decisões de engenharia

| Camada | Responsabilidade | Decisão |
| --- | --- | --- |
| `services/characters.js` | Montar URL, consultar e validar resposta | `404` da API vira lista vazia; falhas reais viram erro amigável. |
| `hooks/useFetchData.js` | Estado remoto e ciclo de requisição | Cancela requisições obsoletas e expõe `retry`. |
| `hooks/useDebounce.js` | Suavizar entrada de texto | Evita uma chamada por tecla digitada. |
| `context/ThemeContext.jsx` | Estado global do tema | Isola armazenamento e manipulação do atributo `data-theme`. |
| `components/` | Interface e interação | Componentes pequenos e CSS Modules para estilos locais. |
| `App.jsx` | Composição e estado dos filtros | Reinicia a página quando o critério muda; a API faz a filtragem. |

Não há uma chamada por cartão: os dados necessários ao modal já vêm na resposta da listagem. As imagens abaixo da dobra usam `loading="lazy"`. Fontes do Google são um recurso visual externo; a interface possui fontes alternativas locais.

## Estrutura

```text
multiverse-atlas/
├── .gitignore
├── index.html
├── LICENSE
├── package-lock.json
├── package.json
├── README.md
├── vite.config.js
├── src/
    ├── App.jsx
    ├── App.module.css
    ├── main.jsx
    ├── assets/
    │   ├── multiverse-globe.mp4
    │   ├── multiverse-globe-poster.webp
    │   └── portal-placeholder.svg
    ├── components/
    │   ├── CharacterCard.jsx
    │   ├── CharacterCard.module.css
    │   ├── CharacterModal.jsx
    │   ├── CharacterModal.module.css
    │   ├── Feedback.jsx
    │   ├── Feedback.module.css
    │   ├── Filters.jsx
    │   ├── Filters.module.css
    │   ├── Header.jsx
    │   ├── Header.module.css
    │   ├── Hero.jsx
    │   ├── Hero.module.css
    │   ├── Icon.jsx
    │   ├── ImageFallback.jsx
    │   ├── ImageFallback.module.css
    │   ├── Pagination.jsx
    │   └── Pagination.module.css
    ├── context/
    │   └── ThemeContext.jsx
    ├── hooks/
    │   ├── useDebounce.js
    │   └── useFetchData.js
    ├── services/
    │   └── characters.js
    └── styles/
        └── global.css
└── tests/
    └── characters.test.js
```

## Instalação e execução

Requer Node.js 20.19+ ou 22.12+ e npm.

```bash
npm install
npm run dev
```

Abra a URL local informada pelo Vite. Para gerar e inspecionar a versão de produção:

```bash
npm run build
npm run preview
npm test
```

Não são necessárias variáveis de ambiente. O projeto foi implementado com React, Vite e CSS Modules, sem biblioteca de componentes ou cliente HTTP adicional. Os testes verificam retry, resposta vazia e cancelamento de requisições.

## Publicação

Crie um repositório no GitHub com o conteúdo da pasta que contém `package.json`. Importe esse repositório no Vercel ou Netlify; selecione o preset **Vite**, comando de build `npm run build` e diretório de saída `dist`. Teste a URL pública, inclusive busca, filtros, modal, tema e navegação de páginas. Depois, atualize os dois links no início deste README.

## 🤖 Uso de Inteligência Artificial

### Prompt utilizado

Este é um prompt real utilizado para orientar uma das etapas de refinamento do projeto:

> Atue como um Engenheiro de Software Front-End Sênior em React e CSS.
>
> Estou a finalizar o painel interativo da Rick and Morty API ("Multiverse Atlas") e preciso de correções técnicas e ajustes de UI/UX nos seguintes pontos:
>
> 1. Refatoração e Animação do Portal Neon (Hero Section):
>    - O efeito de brilho/neon ao redor do elemento circular do portal está a desalinhá-se do anel central durante o scroll ou interações.
>    - Corrija a estrutura CSS/keyframes para que o brilho (glow effect) fique perfeitamente centrado e sincronizado com o portal.
>    - Deixe a animação fluida e atraente (ex: rotação suave contínua com pulsação de brilho no fundo).
>
> 2. Tratamento de Imagens Quebradas nos Cards (Fallback & Skeleton):
>    - Alguns cards de personagens apresentam falhas no carregamento da imagem principal na grelha (exibindo o ícone de imagem quebrada do navegador), mesmo que no modal a imagem funcione.
>    - Crie/implemente um componente de imagem seguro (utilizando onError) que exiba uma imagem de placeholder/fallback elegante do projeto caso a imagem da API falhe.
>    - Adicione um efeito de carregamento visual (Skeleton/Blur) enquanto as imagens são baixadas.
>
> 3. Refatoração do Botão de Dados da API no Modal:
>    - Altere o botão "Ver registro na API" para "Copiar Endpoint da API".
>    - Ao clicar, o sistema deve copiar o link da API do personagem para a área de transferência do utilizador e alterar temporariamente o texto do botão para "Copiado com sucesso! ✓" por 2 segundos.
>
> Forneça:
> - O código atualizado e completo dos componentes afetados (Hero/Portal, CharacterCard com o ImageFallback, e o Modal).
> - Uma breve explicação técnica do motivo dos problemas e das soluções aplicadas.

### Objetivo

Pedir apoio na identificação das causas dos bugs de animação e carregamento de imagem e na implementação de interações mais claras. A IA também foi usada para estruturar e gerar o projeto inicial, revisar responsabilidades dos componentes e sugerir correções. O código foi executado, ajustado e verificado com build e testes; a publicação deve ser validada no navegador.

### Engenharia de Prompt — framework PACO

A IA foi orientada como apoio à arquitetura, implementação e revisão, com critérios explícitos e validação por build. O direcionamento seguiu **PACO**:

| Etapa | Direcionamento aplicado |
| --- | --- |
| **Papel** | Atuar como arquiteto front-end sênior e lead React. |
| **Ação** | Projetar e implementar um painel completo, modular, acessível e responsivo. |
| **Contexto** | Desafio acadêmico de portfólio, API pública sem chave, React + Vite, filtros combinados e estados completos de UI. |
| **Output** | Projeto executável com todos os arquivos, README técnico, árvore de diretórios e build verificado. |

O uso estratégico de IA acelerou a definição de responsabilidades, a identificação dos estados de rede e o refinamento das interações. As escolhas técnicas foram conferidas contra a documentação da API e o resultado deve ser validado no navegador em cada ambiente de publicação.

## Limitações e próximos passos

A lista de espécies oferece opções frequentes, enquanto a API admite muitas outras. Para um produto com pesquisa avançada, um filtro de espécie em texto ou um catálogo auxiliar poderia ampliar a cobertura. Estatísticas apresentadas correspondem **aos filtros atuais**, não a análises globais do conjunto inteiro. Uma evolução natural inclui testes de integração de interação, cache de páginas e sincronização dos filtros com a URL.

## Créditos

Dados e retratos: [The Rick and Morty API](https://rickandmortyapi.com/). Vídeo do Hero: arquivo fornecido para o projeto; confira os direitos de uso da arte antes da publicação. Projeto demonstrativo independente, sem afiliação à série ou aos seus detentores de direitos.

Código sob licença MIT para fins de portfólio; os dados, imagens e marcas de terceiros mantêm seus respectivos direitos.
