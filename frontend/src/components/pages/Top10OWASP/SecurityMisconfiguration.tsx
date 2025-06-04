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

const SecurityMisconfiguration: React.FC = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Configuração de Segurança — OWASP Top 10
      </Typography>

      <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
        <Typography variant="h5" gutterBottom>
          Por que a Configuração de Segurança é uma ameaça?
        </Typography>
        <Typography>
          A configuração de segurança inadequada ocorre quando as configurações
          de segurança não são definidas, implementadas ou mantidas
          corretamente. Isso pode levar a acessos não autorizados, vazamentos de
          dados e outras vulnerabilidades. Garantir uma configuração adequada é
          essencial para proteger contra essas ameaças.
        </Typography>
        <Typography>
          Nosso backend é configurado para minimizar configurações inadequadas,
          seguindo as melhores práticas da OWASP.
        </Typography>
      </Paper>

      <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
        <Typography variant="h5" gutterBottom>
          Como prevenimos Configurações de Segurança inadequadas
        </Typography>
        <Typography>
          Usamos variáveis de ambiente para configurações sensíveis, atualizamos
          regularmente o software e realizamos auditorias de configuração. Isso
          ajuda a manter um sistema seguro e robusto.
        </Typography>
        <CodeBlock language="python backend/core/config.py">
          {`import os

def load_config():
    secret_key = os.getenv("SECRET_KEY")
    if not secret_key:
        raise ValueError("SECRET_KEY não está definido")
    # Carregar outras configurações
    return secret_key

# Exemplo de uso
config = load_config()
`}
        </CodeBlock>
        <Typography>
          No exemplo acima, garantimos que configurações críticas estejam
          definidas, prevenindo configurações inadequadas.
        </Typography>
      </Paper>

      <Card sx={{ marginBottom: 2 }}>
        <CardHeader title="Boas práticas seguidas" />
        <CardContent>
          <Box component="ul">
            <Typography component="li">
              Uso de variáveis de ambiente para dados sensíveis
            </Typography>
            <Typography component="li">
              Atualizações e patches regulares de software
            </Typography>
            <Typography component="li">
              Auditorias e revisões de configuração
            </Typography>
            <Typography component="li">Configurações padrão seguras</Typography>
          </Box>
        </CardContent>
      </Card>

      <Card sx={{ marginBottom: 2 }}>
        <CardHeader title="O que pode dar errado?" />
        <CardContent>
          <Typography>
            Configurações inadequadas podem levar a vazamentos de dados, acessos
            não autorizados e outros problemas de segurança. Por exemplo, deixar
            credenciais padrão inalteradas pode permitir que invasores acessem
            facilmente o sistema.
          </Typography>
          <CodeBlock language="python">
            {`# Exemplo inseguro (NÃO USE)
def connect_to_db():
    # Usando credenciais padrão
    return db.connect("localhost", "admin", "admin")
`}
          </CodeBlock>
          <Typography>
            Nosso sistema evita esses problemas com configurações seguras e
            auditorias regulares.
          </Typography>
        </CardContent>
      </Card>

      <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
        <Typography variant="h5" gutterBottom>
          Referências
        </Typography>
        <Box component="ul">
          <Typography component="li">
            <a
              href="https://owasp.org/www-project-top-ten/"
              target="_blank"
              rel="noopener noreferrer"
            >
              OWASP Top 10: Configuração de Segurança
            </a>
          </Typography>
          <Typography component="li">
            <a
              href="https://cheatsheetseries.owasp.org/cheatsheets/Configuration_Cheat_Sheet.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              OWASP Configuration Cheat Sheet
            </a>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default SecurityMisconfiguration;
