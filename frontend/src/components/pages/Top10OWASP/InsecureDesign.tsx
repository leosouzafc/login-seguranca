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

const InsecureDesign: React.FC = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Design Inseguro (A04:2021) — OWASP Top 10
      </Typography>

      <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
        <Typography variant="h5" gutterBottom>
          Por que se Preocupar com Design Inseguro?
        </Typography>
        <Typography paragraph>
          Design inseguro refere-se a controles de segurança ausentes ou
          ineficazes e falhas de design que tornam uma aplicação vulnerável a
          ataques. Diferente de bugs de implementação, design inseguro é sobre
          falhar em considerar a segurança desde o início, levando a fraquezas
          sistêmicas que não podem ser corrigidas apenas com correções de
          código.
        </Typography>
        <Typography paragraph>
          De acordo com a{" "}
          <a
            href="https://owasp.org/Top10/A04_2021-Insecure_Design/"
            target="_blank"
            rel="noopener noreferrer"
          >
            @OWASP Top 10
          </a>
          , design inseguro é um risco crítico porque pode levar a uma ampla
          gama de vulnerabilidades, incluindo controle de acesso quebrado,
          registro insuficiente e falta de defesa em camadas.
        </Typography>
      </Paper>

      <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
        <Typography variant="h5" gutterBottom>
          Como Abordamos o Design Seguro
        </Typography>
        <Typography paragraph>
          Nossa aplicação é projetada com segurança em mente desde o início. Nós
          implementamos controles de segurança em camadas, validamos todas as
          entradas do usuário e garantimos que operações sensíveis sejam
          protegidas por verificações de autenticação e autorização.
        </Typography>
        <Typography paragraph>
          Por exemplo, nosso backend registra cada tentativa de login,
          bem-sucedida ou não, e usa controle de acesso baseado em funções para
          restringir ações sensíveis.
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
        <Typography paragraph>
          Esta abordagem garante que todas as tentativas de autenticação sejam
          rastreadas, o que é uma parte fundamental do design seguro e ajuda no
          monitoramento e resposta a incidentes.
        </Typography>
      </Paper>

      <Card sx={{ marginBottom: 2 }}>
        <CardHeader title="Recomendações OWASP Seguidas" />
        <CardContent>
          <ul>
            <li>
              A segurança é considerada em cada etapa do desenvolvimento (seguro
              por design)
            </li>
            <li>
              Todas as ações sensíveis requerem autenticação e autorização
            </li>
            <li>Registro e monitoramento abrangente de eventos críticos</li>
            <li>Validação de entrada e uso de APIs seguras</li>
          </ul>
        </CardContent>
      </Card>

      <Card sx={{ marginBottom: 2 }}>
        <CardHeader title="O que Poderia Dar Errado?" />
        <CardContent>
          <Typography paragraph>
            Sem design seguro, atacantes podem explorar controles ausentes. Por
            exemplo, se as tentativas de login não fossem registradas, ataques
            de força bruta poderiam passar despercebidos. Se verificações de
            controle de acesso estivessem ausentes, usuários poderiam acessar
            dados ou ações que não deveriam.
          </Typography>
          <CodeBlock language="python">
            {`# Exemplo de design inseguro (NÃO use)
def get_user_data(user_id):
    # Sem verificação de autenticação ou autorização!
    return db.query(User).filter(User.id == user_id).first()
`}
          </CodeBlock>
          <Typography paragraph>
            Nosso código evita essas armadilhas aplicando controles de segurança
            em cada camada.
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
              href="https://owasp.org/Top10/A04_2021-Insecure_Design/"
              target="_blank"
              rel="noopener noreferrer"
            >
              OWASP Top 10: Design Inseguro
            </a>
          </li>
          <li>
            <a
              href="https://cheatsheetseries.owasp.org/cheatsheets/Secure_By_Design_Cheat_Sheet.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              OWASP Guia de Design Seguro
            </a>
          </li>
        </ul>
      </Paper>
    </Box>
  );
};

export default InsecureDesign;
