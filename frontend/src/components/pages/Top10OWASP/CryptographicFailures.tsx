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

const CryptographicFailures: React.FC = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Falhas Criptográficas (A02:2021) — OWASP Top 10
      </Typography>

      <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
        <Typography variant="h5" gutterBottom>
          Por que se preocupar com falhas criptográficas?
        </Typography>
        <Typography paragraph>
          Falhas criptográficas ocorrem quando dados sensíveis não são
          protegidos adequadamente em trânsito ou em repouso. Isso inclui o uso
          de algoritmos fracos, ausência de criptografia, gerenciamento
          inadequado de chaves ou exposição de segredos. Segundo o{" "}
          <a
            href="https://owasp.org/Top10/pt/A02_2021-Cryptographic_Failures/"
            target="_blank"
            rel="noopener noreferrer"
          >
            @OWASP Top 10
          </a>
          , essas falhas podem resultar em vazamento de informações
          confidenciais, como senhas, dados pessoais e financeiros.
        </Typography>
        <Typography paragraph>
          Proteger dados sensíveis é fundamental para garantir a privacidade dos
          usuários e a conformidade com legislações como a LGPD e GDPR.
        </Typography>
      </Paper>

      <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
        <Typography variant="h5" gutterBottom>
          Como protegemos dados sensíveis
        </Typography>
        <Typography paragraph>
          Nosso backend utiliza algoritmos de hash robustos para senhas e tokens
          de acesso, nunca armazenando senhas em texto puro. Além disso,
          variáveis sensíveis como chaves secretas são mantidas fora do
          código-fonte, utilizando variáveis de ambiente.
        </Typography>
        <CodeBlock language="python backend/services/auth_service.py">
          {`import os

SECRET_KEY = os.getenv("SECRET_KEY", "supersecretkey")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def create_auth_token(user: User):
    return create_access_token({"sub": user.username})
`}
        </CodeBlock>
        <Typography paragraph>
          No exemplo acima, a chave secreta é obtida de uma variável de
          ambiente, evitando exposição acidental no repositório. Tokens de
          acesso são gerados com algoritmos seguros.
        </Typography>
      </Paper>

      <Card sx={{ marginBottom: 2 }}>
        <CardHeader title="Boas práticas seguidas" />
        <CardContent>
          <ul>
            <li>Uso de algoritmos de hash e criptografia robustos</li>
            <li>Senhas nunca são armazenadas em texto puro</li>
            <li>Chaves e segredos fora do código-fonte</li>
            <li>
              Transmissão de dados sensíveis apenas por conexões seguras (HTTPS)
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card sx={{ marginBottom: 2 }}>
        <CardHeader title="O que pode dar errado?" />
        <CardContent>
          <Typography paragraph>
            Se dados sensíveis forem armazenados ou transmitidos sem
            criptografia adequada, podem ser facilmente interceptados ou
            vazados. Por exemplo, um código vulnerável pode armazenar senhas em
            texto puro:
          </Typography>
          <CodeBlock language="python">
            {`# Exemplo inseguro (NÃO USE)
def criar_usuario(username, password):
    user = User(username=username, password=password)  # senha em texto puro!
    db.add(user)
    db.commit()
`}
          </CodeBlock>
          <Typography paragraph>
            Nosso sistema evita esse risco utilizando sempre hash seguro para
            senhas e protegendo segredos.
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
              href="https://owasp.org/Top10/pt/A02_2021-Cryptographic_Failures/"
              target="_blank"
              rel="noopener noreferrer"
            >
              OWASP Top 10: Falhas Criptográficas
            </a>
          </li>
          <li>
            <a
              href="https://cheatsheetseries.owasp.org/cheatsheets/Cryptographic_Storage_Cheat_Sheet.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              OWASP Cryptographic Storage Cheat Sheet (em inglês)
            </a>
          </li>
          <li>
            <a
              href="https://owasp.org/www-project-proactive-controls/v3/pt/c8-protect-data-everywhere"
              target="_blank"
              rel="noopener noreferrer"
            >
              OWASP Controles Proativos: Proteja dados em todos os lugares
            </a>
          </li>
        </ul>
      </Paper>
    </Box>
  );
};

export default CryptographicFailures;
