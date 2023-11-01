# Public-DataGetter

Este projeto, que foi parte do lado do servidor de outro repositório, agora está obsoleto. Apesar disso, ainda contém diversas funcionalidades e utiliza várias tecnologias. Entre elas:

- `axios`: Cliente HTTP baseado em promises para realizar requisições.
- `bcryptjs`: Utilizado para criptografia de senhas.
- `cheerio`: Biblioteca para web scraping no servidor com uma API similar ao jQuery.
- `cron`: Utilizado para agendar tarefas e execuções periódicas.
- `dotenv`: Carrega variáveis de ambiente a partir do arquivo `.env`.
- `express`: Framework web para Node.js.
- `express-cors-middleware`: Lida com configurações de CORS para requisições de diferentes origens.
- `helmet`: Ajuda a proteger aplicativos Express configurando cabeçalhos HTTP.
- `jsonwebtoken`: Gera e verifica tokens de autenticação via JWT.
- `mongoose`: ODM para MongoDB, usado para modelar os dados da aplicação.
- `node-cron`: Programação de tarefas agendadas no Node.js.
- `request-ip`: Obtém o IP do cliente a partir da requisição HTTP.
- `uuidv4`: Gera UUIDs (identificadores únicos universais).
- `winston`: Biblioteca de logs para Node.js.

## Funcionalidades Atuais

Atualmente, o projeto pode ser executado com sucesso usando os dados do arquivo `.env`. É capaz de realizar as seguintes etapas:

### Etapa 1 - Configuração do Arquivo `.env`

Preencha todos os dados essenciais no arquivo `.env`. Alguns campos cruciais incluem `API_KEY1`, `API_KEY2`, `API_PADRAO`, `SECRET`, e `PORT`. Os valores de `API_KEY` são necessários para ativar e passar como cabeçalho nas requisições GET e POST do projeto. O `API_KEY` é fundamental somente se você deseja ter acesso restrito.

### Etapa 2 - Configuração do Banco de Dados

O projeto utiliza MongoDB, um banco de dados NoSQL. Certifique-se de configurar os dados corretamente para garantir o funcionamento, seja com o MongoDB ou outro banco de dados de sua escolha.

### Etapa 3 - Consumo de Dados via Web Scraping

Ao acessar `http://localhost:{port}/get1337`, você pode obter informações detalhadas sobre jogos provenientes de sites pré-definidos no arquivo `/db/coon.js`.

### Etapa 4 - Outras Funcionalidades

Outros endpoints como `"/getmagnetlink"`, `"/getinfoapi"`, `"/getgamedetails"`, `"/youtube/video"` que deverão serem feitos respectivamente oferecem uma gama de dados completos sobre os jogos listados no arquivo `/db/coon.js`. Isso inclui vídeos, imagens, requisitos e links magnéticos de torrent.

Todas essas requisições são direcionadas para o YouTube, a API do Rawg e pesquisas criteriosas para evitar possíveis erros nos resultados.

Além disso, o projeto inclui modelos criados pelo Mongoose (ODM para MongoDB) e códigos para criar usuários com senhas criptografadas (utilizando `bcrypt`).

## Funcionalidades Adicionais

O projeto inclui um sistema de log utilizando Winston para registrar dados e horários de acesso, incluindo informações sobre quem acessou e qual API Key foi utilizada.

Além disso, foram desenvolvidos modelos específicos usando o Mongoose, permitindo a organização e manipulação dos dados de acordo com a estrutura do banco de dados. Esses modelos foram criados para as diversas funcionalidades oferecidas, facilitando a interação com o banco de dados.

## Outras Informações

O projeto, devido ao seu tamanho e complexidade, pode oferecer outras funcionalidades e detalhes que não foram mencionados neste documento. Certifique-se de revisar o código fonte e documentação para obter uma compreensão abrangente de todas as características disponíveis.

## Finalidade do Projeto

Inicialmente, este projeto foi concebido para servir como uma parte do servidor e fornecer uma API RESTful para um projeto de front-end, permitindo a visualização dos dados por usuários. No entanto, descobri métodos mais práticos e eficientes para alcançar esse objetivo com diferentes bibliotecas.
