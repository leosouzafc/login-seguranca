# Projeto de Segurança em Sistemas para Internet

## Descrição

Este projeto é uma aplicação web desenvolvida com FastAPI, que aborda conceitos de segurança em sistemas para internet. O objetivo principal é permitir a criação, autenticação e gerenciamento de usuários, utilizando práticas recomendadas de segurança, como hashing de senhas e autenticação baseada em token.

## Autor

Meu nome é Leonardo Souza e sou estudante na disciplina de Segurança em Sistemas para Internet.

## Tecnologias Utilizadas

- **FastAPI**: Um web framework moderno e rápido para construir APIs com Python 3.6+ baseado em padrões como OpenAPI.
- **SQLAlchemy**: Um ORM (Object-Relational Mapping) para facilitar a interação com o banco de dados.
- **JWT (JSON Web Tokens)**: Para autenticação segura.
- **Passlib**: Biblioteca para hashing de senhas.
- **Dotenv**: Para gestão de variáveis de ambiente.

## Funcionalidades

- **Registro de Novo Usuário**: Criação de novos usuários com senha criptografada.
- **Autenticação de Usuário**: Verificação das credenciais e emissão de tokens de acesso.
- **Gerenciamento de Usuários**: Listar, atualizar e excluir usuários.
- **Controle de Acesso**: Proteção das rotas de API com autenticação baseada em token.

## Estrutura do Projeto

```
├── alembic
│   └── README
├── app
│   ├── __init__.py
│   ├── main.py
│   ├── security.py
│   ├── services
│   │   ├── auth_service.py
│   │   └── user_service.py
├── README.md
└── src
    └── app.js
```

## Como Executar o Projeto

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/seuusuario/seurepositorio.git
   cd seurepositorio

   ```

Crie um ambiente virtual com o conda ou python

```
# python
python -m venv login-seguranca

# conda
conda create login-seguranca
```

Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:

```
SECRET_KEY=supersecretkey
```

Instale as dependências utilizando o pip:

```
pip install -r requirements.txt
```

Execute a aplicação:

```
uvicorn app.main:app --reload
```

Acesse a aplicação em http://localhost:8000.

## Contribuições

Sinta-se à vontade para enviar pull requests ou abrir issues para sugestões de melhorias.

## Licença

Este projeto está licenciado sob a MIT License.
