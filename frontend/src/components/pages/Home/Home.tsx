import React from "react";
import {
  Container,
  Typography,
  Box,
  Link,
  Avatar,
  Paper,
  Divider,
} from "@mui/material";
import CodeBlock from "../../common/Codeblock/CodeBlock";
import profilePic from "/profile.jpeg";

const Home: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box my={6} textAlign="center">
        <Typography variant="h3" color="white" fontWeight={800} gutterBottom>
          Projeto de Segurança em Sistemas para Internet
        </Typography>

        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          my={4}
          mx={25}
        >
          <Avatar
            alt="Leonardo Souza"
            src={profilePic}
            sx={{ width: 300, height: 300, border: "0px solid #1976d2" }}
          />
          <Box mt={2}>
            <Typography
              variant="h5"
              gutterBottom
              fontWeight={600}
              color="primary"
            >
              Sobre o autor
            </Typography>
            <Typography variant="body1">
              Esse projeto foi desenvolvido por <strong>Leonardo Souza</strong>.
            </Typography>
            <Typography variant="body1">
              GitHub:{" "}
              <Link
                href="https://github.com/leonardosf98"
                target="_blank"
                rel="noopener noreferrer"
              >
                github/leonardosf98
              </Link>
            </Typography>
            <Typography variant="body1">
              Desenvolvedor Fullstack na <strong>FCamara</strong>.
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Paper elevation={3} sx={{ p: 4, textAlign: "left" }}>
          <Typography variant="h5" color="primary" gutterBottom>
            🛡️ Informações do Projeto
          </Typography>
          <Typography paragraph>
            Esse projeto é a avaliação final da matéria de{" "}
            <strong>Segurança em Sistemas para Internet</strong> na{" "}
            <strong>FATEC</strong>. A idéia é demonstrar boas práticas de
            desenvolvimento seguro seguindo as diretrizes da{" "}
            <strong>OWASP Top 10</strong>.
          </Typography>
        </Paper>

        <Divider sx={{ my: 4 }} />

        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography
            variant="h5"
            color="primary"
            gutterBottom
            display="flex"
            alignItems="center"
          >
            💻&nbsp;Informações Técnicas
          </Typography>

          {/* BACKEND */}
          <Box mt={3}>
            <Typography
              variant="h6"
              gutterBottom
              display="flex"
              alignItems="center"
            >
              🔧&nbsp;Backend – FastAPI
            </Typography>
            <Paper
              elevation={3}
              style={{ padding: "1rem", backgroundColor: "#f7f7f7" }}
            >
              <Typography>
                <CodeBlock language="markdown">
                  {`
backend/
├── core/
│   └── security.py               # 🔐 Implementa funções de hashing e segurança.
├── database.py                   # 🗄️ Configura a conexão e sessão com o banco de dados.
├── dependencies/
│   └── auth.py                   # 🔑 Dependências de autenticação (verificação de tokens e papéis).
├── main.py                       # 🚀 Ponto de entrada principal com rotas e middleware.
├── models/
│   └── user.py                   # 👤 Definição do modelo de usuário.
├── routers/
│   ├── auth.py                   # 🔐 Endpoints de login e logout.
│   └── users.py                  # 👥 Endpoints de operações de usuário (CRUD).
├── schemas/
│   └── LoginRequest.py           # 📨 Esquema para requisição de login.
└── services/
    ├── auth_service.py           # 🛂 Gerencia autenticação e tokens JWT.
    └── user_service.py           # 🧾 Manipula operações CRUD para usuários.

            `}
                </CodeBlock>
              </Typography>
            </Paper>
          </Box>
          <Box mt={3}>
            <Typography
              variant="h6"
              gutterBottom
              display="flex"
              alignItems="center"
            >
              🎨&nbsp;Frontend – Preact
            </Typography>
            <Paper
              elevation={3}
              style={{ padding: "1rem", backgroundColor: "#f7f7f7" }}
            >
              <Typography>
                <CodeBlock language="markdown">
                  {`
frontend/
└── src/
    ├── assets/                          # 🎨 Arquivos estáticos como imagens e ícones.
    ├── components/
    │   └── common/
    │       └── CodeBlock.tsx           # 🧩 Componente para blocos de código.
    ├── pages/
    │   ├── Errors/
    │   │   ├── Forbidden.tsx           # 🚫 Página de erro 403.
    │   │   └── Unauthorized.tsx        # 🔒 Página de erro 401.
    │   ├── Home/
    │   │   ├── Home.module.css         # 🎨 Estilo da página Home.
    │   │   └── Home.tsx                # 🏠 Página principal.
    │   ├── Login/
    │   │   └── UserList.tsx            # 👥 Lista de usuários (possivelmente interna ao sistema).
    │   ├── Register/                   # 📝 Páginas de cadastro (não detalhadas na imagem).
    │   └── TOP10OWASP/
    │       ├── AuthenticationFailures.tsx       # ❌ Falhas de autenticação.
    │       ├── BrokenAccess.tsx                 # 🔓 Quebra de controle de acesso.
    │       ├── CryptographicFailures.tsx        # 🔐 Falhas criptográficas.
    │       ├── DataIntegrityFailures.tsx        # 📉 Falhas na integridade de dados.
    │       ├── Injection.tsx                    # 💉 Injeção de código.
    │       ├── InsecureDesign.tsx               # 🧱 Design inseguro.
    │       ├── OutdatedComponents.tsx           # 🧟 Componentes desatualizados.
    │       ├── SecurityLogging.tsx              # 🧾 Falhas em logs de segurança.
    │       ├── SecurityMisconfiguration.tsx     # 🧯 Má configuração de segurança.
    │       └── ServerSideForgery.tsx            # 🖧 SSRF - falsificação de requisição do lado do servidor.
    ├── App.tsx                        # 🧠 Componente raiz da aplicação.
    ├── index.tsx                      # 📍 Ponto de entrada do app.
    ├── main.tsx                       # 🔗 Provavelmente junta os providers e renderiza o App.
    └── vite-env.d.ts                  # 🔧 Tipagens globais do Vite.

            `}
                </CodeBlock>
              </Typography>
            </Paper>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Home;
