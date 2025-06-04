import React from "react";
import {
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  CardHeader,
} from "@mui/material";
import CodeBlock from "../../common/Codeblock/CodeBlock";

const Injection: React.FC = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Injeção (A03:2021) — OWASP Top 10
      </Typography>

      <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
        <Typography variant="h5" gutterBottom>
          Por que se Proteger Contra Injeção?
        </Typography>
        <Typography paragraph>
          Ataques de injeção, como SQL, NoSQL, comandos do sistema operacional e
          injeção ORM, estão entre os riscos de segurança mais críticos para
          aplicações web. Eles ocorrem quando dados não confiáveis são enviados
          para um interpretador como parte de um comando ou consulta, permitindo
          que atacantes executem comandos maliciosos ou acessem dados sensíveis.
          De acordo com a{" "}
          <a
            href="https://owasp.org/Top10/A03_2021-Injection/"
            target="_blank"
            rel="noopener noreferrer"
          >
            @OWASP Top 10
          </a>
          , a injeção é o terceiro risco de segurança mais crítico em aplicações
          web.
        </Typography>
        <Typography paragraph>
          Proteger-se contra injeção é essencial para evitar que atacantes
          manipulem seu banco de dados, roubem dados ou até mesmo tomem controle
          do seu servidor. Nosso backend foi projetado para mitigar esses riscos
          seguindo as melhores práticas, como o uso de consultas parametrizadas
          e validação de entrada.
        </Typography>
      </Paper>

      <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
        <Typography variant="h5" gutterBottom>
          Como Prevenimos a Injeção
        </Typography>
        <Typography paragraph>
          Nosso backend utiliza o SQLAlchemy ORM, que automaticamente
          parametriza as consultas e separa a entrada do usuário dos comandos
          SQL. Isso impede que atacantes injetem SQL malicioso.
        </Typography>
        <CodeBlock language="python backend/services/auth_service.py">
          {`def authenticate_user(username: str, password: str, db: Session):
    user = db.query(User).filter(User.username == username).first()
    # ... resto do código ...
`}
        </CodeBlock>
        <Typography paragraph>
          No exemplo acima, o construtor de consultas do SQLAlchemy garante que
          o parâmetro <code>username</code> seja tratado com segurança,
          prevenindo injeção SQL.
        </Typography>
      </Paper>

      <Card sx={{ marginBottom: 2 }}>
        <CardHeader title="Recomendações OWASP Seguidas" />
        <CardContent>
          <ul>
            <li>
              Uso de APIs seguras e ORM (SQLAlchemy) para evitar acesso direto
              ao interpretador
            </li>
            <li>Validação de entrada no lado do servidor</li>
            <li>Nunca concatenar entrada do usuário em consultas</li>
            <li>
              Registro de tentativas de login para monitorar atividades
              suspeitas
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card sx={{ marginBottom: 2 }}>
        <CardHeader title="O que Poderia Dar Errado?" />
        <CardContent>
          <Typography paragraph>
            Se a entrada do usuário não for tratada adequadamente, atacantes
            poderiam manipular consultas. Por exemplo, um código vulnerável
            poderia parecer com:
          </Typography>
          <CodeBlock language="python">
            {`# Exemplo vulnerável (NÃO use)
query = "SELECT * FROM users WHERE username = '" + username + "'"
`}
          </CodeBlock>
          <Typography paragraph>
            Isso permite que atacantes injetem código SQL. Nosso código evita
            isso sempre usando consultas parametrizadas.
          </Typography>
        </CardContent>
      </Card>

      <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
        <Typography variant="h5" gutterBottom>
          Referências
        </Typography>
        <ul>
          <li>
            <a
              href="https://owasp.org/Top10/A03_2021-Injection/"
              target="_blank"
              rel="noopener noreferrer"
            >
              OWASP Top 10: Injeção
            </a>
          </li>
          <li>
            <a
              href="https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              OWASP Guia de Prevenção de Injeção SQL
            </a>
          </li>
        </ul>
      </Paper>
    </Box>
  );
};

export default Injection;
