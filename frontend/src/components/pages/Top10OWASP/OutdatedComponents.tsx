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

const OutdatedComponents: React.FC = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Componentes Desatualizados (A06:2021) — OWASP Top 10
      </Typography>

      <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
        <Typography variant="h5" gutterBottom>
          Por que se preocupar com componentes desatualizados?
        </Typography>
        <Typography paragraph>
          O uso de componentes desatualizados, como bibliotecas, frameworks e
          outros módulos de software, pode introduzir vulnerabilidades
          conhecidas em sua aplicação. Segundo o{" "}
          <a
            href="https://owasp.org/Top10/pt/A06_2021-Vulnerable_and_Outdated_Components/"
            target="_blank"
            rel="noopener noreferrer"
          >
            @OWASP Top 10
          </a>
          , muitos ataques exploram falhas já documentadas em componentes que
          não foram atualizados.
        </Typography>
        <Typography paragraph>
          Manter todos os componentes atualizados é fundamental para reduzir a
          superfície de ataque e garantir que correções de segurança estejam
          aplicadas.
        </Typography>
      </Paper>

      <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
        <Typography variant="h5" gutterBottom>
          Como lidamos com componentes desatualizados
        </Typography>
        <Typography paragraph>
          Nosso projeto utiliza ferramentas de gerenciamento de dependências,
          como <code>pip</code> e <code>npm</code>, para garantir que todas as
          bibliotecas estejam sempre atualizadas. Realizamos revisões periódicas
          e utilizamos scanners de vulnerabilidades para identificar e corrigir
          rapidamente possíveis riscos.
        </Typography>
        <CodeBlock language="bash">
          {`# Exemplo de atualização de dependências Python
pip list --outdated
pip install --upgrade <pacote>

# Exemplo de atualização de dependências Node.js
npm outdated
npm update
`}
        </CodeBlock>
        <Typography paragraph>
          Além disso, evitamos o uso de dependências desnecessárias e
          monitoramos alertas de segurança das principais bibliotecas
          utilizadas.
        </Typography>
      </Paper>

      <Card sx={{ marginBottom: 2 }}>
        <CardHeader title="Boas práticas seguidas" />
        <CardContent>
          <ul>
            <li>Atualização regular de todas as dependências</li>
            <li>Monitoramento de vulnerabilidades conhecidas</li>
            <li>Remoção de componentes não utilizados</li>
            <li>Uso de ferramentas automatizadas para análise de segurança</li>
          </ul>
        </CardContent>
      </Card>

      <Card sx={{ marginBottom: 2 }}>
        <CardHeader title="O que pode dar errado?" />
        <CardContent>
          <Typography paragraph>
            Se componentes desatualizados forem utilizados, vulnerabilidades
            conhecidas podem ser exploradas por atacantes. Por exemplo, uma
            biblioteca de autenticação desatualizada pode permitir o bypass de
            login:
          </Typography>
          <CodeBlock language="python">
            {`# Exemplo inseguro (NÃO USE)
# Uso de biblioteca antiga e vulnerável para autenticação
from old_auth_lib import authenticate

def login(username, password):
    return authenticate(username, password)
`}
          </CodeBlock>
          <Typography paragraph>
            Nosso sistema evita esse risco mantendo todas as dependências
            atualizadas e monitoradas.
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
              href="https://owasp.org/Top10/pt/A06_2021-Vulnerable_and_Outdated_Components/"
              target="_blank"
              rel="noopener noreferrer"
            >
              OWASP Top 10: Componentes Vulneráveis e Desatualizados
            </a>
          </li>
          <li>
            <a
              href="https://cheatsheetseries.owasp.org/cheatsheets/Dependency_Checker_Cheat_Sheet.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              OWASP Dependency Checker Cheat Sheet (em inglês)
            </a>
          </li>
          <li>
            <a
              href="https://owasp.org/www-project-proactive-controls/v3/pt/c3-keep-software-up-to-date"
              target="_blank"
              rel="noopener noreferrer"
            >
              OWASP Controles Proativos: Mantenha o software atualizado
            </a>
          </li>
        </ul>
      </Paper>
    </Box>
  );
};

export default OutdatedComponents;
