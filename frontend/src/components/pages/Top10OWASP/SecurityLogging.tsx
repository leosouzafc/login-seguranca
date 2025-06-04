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

const SecurityLogging: React.FC = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Registro de Segurança — OWASP Top 10
      </Typography>

      <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
        <Typography variant="h5" gutterBottom>
          Por que o Registro de Segurança é importante?
        </Typography>
        <Typography>
          O registro de segurança é crucial para detectar e responder a
          incidentes de segurança. Ele ajuda a identificar tentativas de acesso
          não autorizado, vazamentos de dados e outras atividades maliciosas. Um
          registro adequado permite a detecção e resposta rápidas a ameaças,
          minimizando danos potenciais.
        </Typography>
        <Typography>
          Nosso backend é projetado para registrar eventos relacionados à
          segurança, seguindo as melhores práticas recomendadas pela OWASP.
        </Typography>
      </Paper>

      <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
        <Typography variant="h5" gutterBottom>
          Como implementamos o Registro de Segurança
        </Typography>
        <Typography>
          Registramos todas as tentativas de autenticação, acesso a dados
          sensíveis e alterações de configuração. Isso ajuda a identificar
          padrões de ataque e responder rapidamente a atividades suspeitas.
        </Typography>
        <CodeBlock language="python backend/services/logging_service.py">
          {`import logging

def log_security_event(event: str):
    logging.info(f"Evento de segurança: {event}")

# Exemplo de uso
log_security_event("Tentativa de login falha para o usuário: admin")
`}
        </CodeBlock>
        <Typography>
          No exemplo acima, todos os eventos de segurança são registrados,
          permitindo que rastreemos e respondamos a ameaças potenciais.
        </Typography>
      </Paper>

      <Card sx={{ marginBottom: 2 }}>
        <CardHeader title="Boas práticas seguidas" />
        <CardContent>
          <Box component="ul">
            <Typography component="li">
              Registro abrangente de eventos de segurança
            </Typography>
            <Typography component="li">
              Monitoramento e alertas em tempo real
            </Typography>
            <Typography component="li">
              Revisão e análise regular dos registros
            </Typography>
            <Typography component="li">
              Armazenamento seguro dos dados de registro
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <Card sx={{ marginBottom: 2 }}>
        <CardHeader title="O que pode dar errado?" />
        <CardContent>
          <Typography>
            Sem um registro adequado, incidentes de segurança podem passar
            despercebidos, levando a vazamentos de dados e acessos não
            autorizados. Por exemplo, não registrar tentativas de login falhas
            pode permitir que ataques de força bruta passem despercebidos.
          </Typography>
          <CodeBlock language="python">
            {`# Exemplo inseguro (NÃO USE)
def login(username, password):
    # Sem registro de tentativas falhas
    user = db.query(User).filter(User.username == username, User.password == password).first()
    return user
`}
          </CodeBlock>
          <Typography>
            Nosso sistema evita esses problemas com registro e monitoramento
            abrangentes.
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
              OWASP Top 10: Registro de Segurança
            </a>
          </Typography>
          <Typography component="li">
            <a
              href="https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              OWASP Logging Cheat Sheet
            </a>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default SecurityLogging;
