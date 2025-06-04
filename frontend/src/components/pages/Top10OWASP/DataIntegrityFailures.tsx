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

const DataIntegrityFailures: React.FC = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Falhas de Integridade de Dados (A08:2021) — OWASP Top 10
      </Typography>

      <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
        <Typography variant="h5" gutterBottom>
          Por que se preocupar com falhas de integridade de dados?
        </Typography>
        <Typography paragraph>
          Falhas de integridade de dados ocorrem quando dados críticos podem ser
          alterados, corrompidos ou manipulados de forma não autorizada, seja em
          trânsito ou em repouso. Isso pode afetar configurações, dados de
          usuários, registros financeiros e outros ativos sensíveis. Segundo o{" "}
          <a
            href="https://owasp.org/Top10/pt/A08_2021-Software_and_Data_Integrity_Failures/"
            target="_blank"
            rel="noopener noreferrer"
          >
            @OWASP Top 10
          </a>
          , essas falhas podem permitir que atacantes modifiquem o comportamento
          da aplicação, causem perda de dados ou executem código malicioso.
        </Typography>
        <Typography paragraph>
          Garantir a integridade dos dados é fundamental para a confiança,
          segurança e funcionamento correto do sistema.
        </Typography>
      </Paper>

      <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
        <Typography variant="h5" gutterBottom>
          Como protegemos a integridade dos dados
        </Typography>
        <Typography paragraph>
          Nosso backend utiliza mecanismos de controle de acesso, validação de
          dados e registro de operações sensíveis. Todas as alterações
          importantes são auditadas e associadas a um usuário autenticado,
          dificultando alterações não autorizadas.
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
          No exemplo acima, cada tentativa de login é registrada, criando um
          histórico confiável de acessos e tentativas, o que ajuda a detectar e
          investigar possíveis manipulações ou acessos indevidos.
        </Typography>
      </Paper>

      <Card sx={{ marginBottom: 2 }}>
        <CardHeader title="Boas práticas seguidas" />
        <CardContent>
          <ul>
            <li>
              Validação e sanitização de dados antes de qualquer alteração
            </li>
            <li>Controle de acesso rigoroso para operações sensíveis</li>
            <li>Auditoria e registro de todas as operações críticas</li>
            <li>Associação de alterações a usuários autenticados</li>
            <li>
              Uso de bibliotecas confiáveis e assinaturas digitais quando
              necessário
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card sx={{ marginBottom: 2 }}>
        <CardHeader title="O que pode dar errado?" />
        <CardContent>
          <Typography paragraph>
            Se a integridade dos dados não for protegida, atacantes podem
            modificar configurações, manipular registros ou inserir dados
            maliciosos. Por exemplo, um código vulnerável pode permitir
            alterações sem autenticação:
          </Typography>
          <CodeBlock language="python">
            {`# Exemplo inseguro (NÃO USE)
def alterar_configuracao(chave, valor):
    configuracao[chave] = valor  # Sem autenticação ou validação!
`}
          </CodeBlock>
          <Typography paragraph>
            Nosso sistema evita esse risco exigindo autenticação e validação
            para qualquer alteração sensível.
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
              href="https://owasp.org/Top10/pt/A08_2021-Software_and_Data_Integrity_Failures/"
              target="_blank"
              rel="noopener noreferrer"
            >
              OWASP Top 10: Falhas de Integridade de Software e Dados
            </a>
          </li>
          <li>
            <a
              href="https://cheatsheetseries.owasp.org/cheatsheets/Data_Validation_Cheat_Sheet.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              OWASP Data Validation Cheat Sheet (em inglês)
            </a>
          </li>
          <li>
            <a
              href="https://owasp.org/www-project-proactive-controls/v3/pt/c9-implement-integrity-checks"
              target="_blank"
              rel="noopener noreferrer"
            >
              OWASP Controles Proativos: Implemente verificações de integridade
            </a>
          </li>
        </ul>
      </Paper>
    </Box>
  );
};

export default DataIntegrityFailures;
