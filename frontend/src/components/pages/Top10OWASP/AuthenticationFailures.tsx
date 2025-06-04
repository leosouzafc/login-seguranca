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

const AuthenticationFailures: React.FC = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Falhas de Autenticação (A01:2021) — OWASP Top 10
      </Typography>

      <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
        <Typography variant="h5" gutterBottom>
          Por que se preocupar com falhas de autenticação?
        </Typography>
        <Typography>
          Falhas de autenticação ocorrem quando atacantes conseguem explorar
          fraquezas no sistema para obter acesso não autorizado. Segundo o{" "}
          <a
            href="https://owasp.org/Top10/pt/A01_2021-Broken_Authentication/"
            target="_blank"
            rel="noopener noreferrer"
          >
            @OWASP Top 10
          </a>
          , este é um dos riscos mais críticos para aplicações web, pois pode
          resultar em roubo de identidade, acesso a dados sensíveis e controle
          total da aplicação.
        </Typography>
        <Typography>
          Proteger contra falhas de autenticação é essencial para garantir que
          apenas usuários legítimos possam acessar funcionalidades e dados
          sensíveis. Nosso backend foi projetado para mitigar esses riscos,
          seguindo as melhores práticas recomendadas pela OWASP.
        </Typography>
      </Paper>

      <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
        <Typography variant="h5" gutterBottom>
          Como protegemos a autenticação
        </Typography>
        <Typography>
          Utilizamos armazenamento seguro de senhas com algoritmos de hash,
          validação de credenciais, registro de tentativas de login e controle
          de sessões. Além disso, implementamos políticas de senha forte e
          monitoramento de atividades suspeitas.
        </Typography>
        <CodeBlock language="python backend/services/auth_service.py">
          {`def authenticate_user(username: str, password: str, db: Session):
    user = db.query(User).filter(User.username == username).first()
    login_attempt = LoginAttempt(username=username, success=False)
    if not user or not verify_password(password, user.password_hash):
        db.add(login_attempt)
        db.commit()
        return None

    login_attempt.success = True
    db.add(login_attempt)
    db.commit()
    return user
`}
        </CodeBlock>
        <Typography>
          No exemplo acima, todas as tentativas de login são registradas,
          permitindo identificar padrões de ataque e responder rapidamente a
          atividades suspeitas.
        </Typography>
      </Paper>

      <Card sx={{ marginBottom: 2 }}>
        <CardHeader title="Boas práticas seguidas" />
        <CardContent>
          <ul>
            <li>Armazenamento seguro de senhas (hashing e salting)</li>
            <li>
              Validação de credenciais e bloqueio após múltiplas tentativas
            </li>
            <li>Gestão segura de sessões e tokens</li>
            <li>Políticas de senha forte</li>
            <li>Registro e monitoramento de tentativas de autenticação</li>
          </ul>
        </CardContent>
      </Card>

      <Card sx={{ marginBottom: 2 }}>
        <CardHeader title="O que pode dar errado?" />
        <CardContent>
          <Typography>
            Se a autenticação não for devidamente protegida, atacantes podem
            realizar ataques de força bruta, roubo de sessão ou acessar dados de
            outros usuários. Por exemplo, um código vulnerável pode não
            registrar tentativas de login ou permitir senhas fracas:
          </Typography>
          <CodeBlock language="python">
            {`# Exemplo inseguro (NÃO USE)
def login(username, password):
    user = db.query(User).filter(User.username == username, User.password == password).first()
    return user
`}
          </CodeBlock>
          <Typography>
            Nosso sistema evita esses problemas com múltiplas camadas de
            proteção e monitoramento.
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
              href="https://owasp.org/Top10/pt/A01_2021-Broken_Authentication/"
              target="_blank"
              rel="noopener noreferrer"
            >
              OWASP Top 10: Falhas de Autenticação
            </a>
          </li>
          <li>
            <a
              href="https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              OWASP Authentication Cheat Sheet (em inglês)
            </a>
          </li>
          <li>
            <a
              href="https://owasp.org/www-project-proactive-controls/v3/pt/c2-enforce-access-controls"
              target="_blank"
              rel="noopener noreferrer"
            >
              OWASP Controles Proativos: Autenticação e Controle de Acesso
            </a>
          </li>
        </ul>
      </Paper>
    </Box>
  );
};

export default AuthenticationFailures;
