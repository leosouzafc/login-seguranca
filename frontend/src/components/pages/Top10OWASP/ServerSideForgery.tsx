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

const ServerSideForgery: React.FC = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Server-Side Request Forgery (SSRF) (A10:2021) — OWASP Top 10
      </Typography>

      <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
        <Typography variant="h5" gutterBottom>
          Por que se preocupar com SSRF?
        </Typography>
        <Typography paragraph>
          SSRF ocorre quando um atacante consegue induzir o servidor a fazer
          requisições para destinos inesperados, incluindo sistemas internos,
          serviços protegidos ou até mesmo recursos externos. Segundo o{" "}
          <a
            href="https://owasp.org/Top10/pt/A10_2021-Server-Side_Request_Forgery_%28SSRF%29/"
            target="_blank"
            rel="noopener noreferrer"
          >
            @OWASP Top 10
          </a>
          , essa vulnerabilidade pode permitir acesso a dados internos, execução
          de comandos ou até mesmo movimentação lateral dentro da
          infraestrutura.
        </Typography>
        <Typography paragraph>
          Proteger contra SSRF é fundamental para evitar que o servidor seja
          usado como ponte para ataques a outros sistemas.
        </Typography>
      </Paper>

      <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
        <Typography variant="h5" gutterBottom>
          Como protegemos contra SSRF
        </Typography>
        <Typography paragraph>
          Nosso backend valida e restringe URLs fornecidas pelo usuário,
          evitando que requisições sejam feitas para endereços internos ou não
          autorizados. Além disso, utilizamos listas de permissões (allowlist) e
          nunca repassamos diretamente entradas do usuário para funções de
          requisição sem validação.
        </Typography>
        <CodeBlock language="python">
          {`# Exemplo seguro de requisição HTTP
import requests
from urllib.parse import urlparse

def fetch_url(user_url):
    parsed = urlparse(user_url)
    if parsed.hostname not in ["api.exemplo.com"]:
        raise ValueError("Destino não permitido")
    response = requests.get(user_url)
    return response.content
`}
        </CodeBlock>
        <Typography paragraph>
          No exemplo acima, apenas domínios permitidos podem ser acessados,
          reduzindo o risco de SSRF.
        </Typography>
      </Paper>

      <Card sx={{ marginBottom: 2 }}>
        <CardHeader title="Boas práticas seguidas" />
        <CardContent>
          <ul>
            <li>Validação rigorosa de URLs fornecidas pelo usuário</li>
            <li>
              Uso de listas de permissões (allowlist) para destinos externos
            </li>
            <li>Bloqueio de endereços internos e metadados de nuvem</li>
            <li>Monitoramento e registro de requisições externas</li>
          </ul>
        </CardContent>
      </Card>

      <Card sx={{ marginBottom: 2 }}>
        <CardHeader title="O que pode dar errado?" />
        <CardContent>
          <Typography paragraph>
            Se o servidor aceitar qualquer URL fornecida pelo usuário, um
            atacante pode acessar recursos internos:
          </Typography>
          <CodeBlock language="python">
            {`# Exemplo inseguro (NÃO USE)
def baixar(url):
    # Sem validação!
    return requests.get(url).content
`}
          </CodeBlock>
          <Typography paragraph>
            Nosso sistema evita esse risco validando e restringindo destinos de
            requisições.
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
              href="https://owasp.org/Top10/pt/A10_2021-Server-Side_Request_Forgery_%28SSRF%29/"
              target="_blank"
              rel="noopener noreferrer"
            >
              OWASP Top 10: Server-Side Request Forgery (SSRF)
            </a>
          </li>
          <li>
            <a
              href="https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              OWASP SSRF Prevention Cheat Sheet (em inglês)
            </a>
          </li>
          <li>
            <a
              href="https://owasp.org/www-project-proactive-controls/v3/pt/c7-enforce-access-controls"
              target="_blank"
              rel="noopener noreferrer"
            >
              OWASP Controles Proativos: Controle de acesso a recursos externos
            </a>
          </li>
        </ul>
      </Paper>
    </Box>
  );
};

export default ServerSideForgery;
