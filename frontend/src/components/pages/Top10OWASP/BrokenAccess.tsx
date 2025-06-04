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

const BrokenAccess: React.FC = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Broken Access Control (A03:2021) — OWASP Top 10
      </Typography>

      <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
        <Typography variant="h5" gutterBottom>
          Introdução
        </Typography>
        <Typography>
          O controle de acesso quebrado pode permitir que usuários não
          autorizados acessem funções e dados para os quais não têm permissão.
          Para mitigar este risco, seguimos uma série de práticas recomendadas
          pelo OWASP (Open Web Application Security Project).
        </Typography>
      </Paper>

      <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
        <Typography variant="h5" gutterBottom>
          CORS Configuration
        </Typography>
        <Typography>
          Uma configuração incorreta de CORS (Cross-Origin Resource Sharing)
          permite o acesso de APIs a partir de origens não autorizadas ou não
          confiáveis. É essencial configurar corretamente o CORS para aceitar
          somente solicitações de origens confiáveis.
        </Typography>

        <CodeBlock language="python">
          {`
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)`}
        </CodeBlock>

        <Typography variant="body1" sx={{ mt: 2 }}>
          Além disso, é importante limitar a taxa de acesso às APIs e
          controladores para minimizar o impacto de ferramentas automatizadas de
          ataque. Falhas de controle de acesso devem ser registradas e alertas
          aos administradores devem ser configurados quando apropriado.
        </Typography>
      </Paper>

      <Typography variant="h5" gutterBottom>
        Implementações de Segurança
      </Typography>

      {/* 1. Deny by Default Principle */}
      <Card sx={{ marginBottom: 2 }}>
        <CardHeader title="1. Implementação do princípio 'negar por padrão' (deny by default)" />
        <CardContent>
          <Typography>
            Adotamos o princípio "negar por padrão" para garantir que o acesso
            só seja permitido a usuários autorizados. Nossos endpoints são
            protegidos com verificações de papel de usuário (role).
          </Typography>
          <CodeBlock language="python">
            {`# backend/routers/users.py
def get_user(user_id: int, db: Session = Depends(get_db), current_user: User = Depends(require_role("admin"))):
    # Implementation

def list_users(db: Session = Depends(get_db), current_user: User = Depends(require_role("admin"))):
    # Implementation`}
          </CodeBlock>
          <Typography>
            Utilizamos{" "}
            <Box component="code">Depends(require_role("admin"))</Box> para
            garantir que apenas usuários com papel de administrador possam
            acessar certas funções.
          </Typography>
        </CardContent>
      </Card>

      {/* 2. Permission Verification per Request */}
      <Card sx={{ marginBottom: 2 }}>
        <CardHeader title="2. Verificação de permissões em cada requisição" />
        <CardContent>
          <Typography>
            O sistema verifica as permissões do usuário em cada endpoint através
            do middleware
            <Box component="code">require_role("admin")</Box>. Isso garante que
            mesmo que um usuário tente acessar diretamente um endpoint, a
            verificação de autorização será aplicada.
          </Typography>
        </CardContent>
      </Card>

      {/* 3. Secure Role Assignment */}
      <Card sx={{ marginBottom: 2 }}>
        <CardHeader title="3. Atribuição segura de papéis (roles)" />
        <CardContent>
          <Typography>
            Para prevenir a escalação não autorizada de privilégios, adotamos
            uma política segura de atribuição de papéis.
          </Typography>
          <CodeBlock language="python">
            {`# backend/services/user_service.py
def create_new_user(username: str, password: str, db: Session):
    # ...
    role = "admin" if db.query(User).count() == 0 else "user"
    # Implementation`}
          </CodeBlock>
          <Typography>
            Apenas o primeiro usuário criado recebe automaticamente o papel de
            "admin". Todos os usuários subsequentes são atribuídos ao papel
            padrão de "user".
          </Typography>
        </CardContent>
      </Card>

      {/* 4. Resource Existence Validation */}
      <Card sx={{ marginBottom: 2 }}>
        <CardHeader title="4. Validação de existência de recursos" />
        <CardContent>
          <Typography>
            Verificamos a existência de recursos antes de permitir operações
            sobre eles. Isso evita vazamento de informações sobre quais IDs
            existem no sistema.
          </Typography>
          <CodeBlock language="python">
            {`# backend/routers/users.py
def get_user(user_id: int, db: Session = Depends(get_db), current_user: User = Depends(require_role("admin"))):
    user = get_user_by_id(user_id, db)
    if not user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    return user`}
          </CodeBlock>
        </CardContent>
      </Card>

      {/* 5. Secure Password Management */}
      <Card sx={{ marginBottom: 2 }}>
        <CardHeader title="5. Gerenciamento seguro de senhas" />
        <CardContent>
          <Typography>
            As senhas são armazenadas como hashes, nunca como texto simples.
            Usamos uma função de hashing consistente para todas as operações
            relacionadas a senhas.
          </Typography>
          <CodeBlock language="python">
            {`# backend/services/user_service.py
def create_new_user(username: str, password: str, db: Session):
    # ...
    hashed_password = hash_password(password)
    new_user = User(username=username, password_hash=hashed_password, role=role)
    # Implementation`}
          </CodeBlock>
        </CardContent>
      </Card>
    </Box>
  );
};

export default BrokenAccess;
