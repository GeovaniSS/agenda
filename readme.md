# Cadastro de usuários
- Validação (Ok)
- Usar flash messages para avisar o usuário (Ok)
- Criptografar a senha usando o bcrypt (Ok)
- Salvar a senha criptografada no banco de dados (Ok)
- Checar se o email não é vinculado a uma cadastro existente na base de dados (Ok)

# Login de usuários
  - Checar se o usuário informou o email e a senha
  - Checar se os campos informados pelo usuário correspondem a algum cadastro na base de dados
  - Usar flash messages para avisar o usuário
  - Liberar o acesso e redirecionar o usuário para a página de contatos

# Fluxo de exceções
  1. O sistema verifica se o ator preenche os campos e-mail e senha para se cadastrar no
  sistema, caso contrário, exibir mensagem “campo obrigatório”.
  2. O sistema verifica se o campo e-mail é válido de acordo com a máscara xx@xx.com ou
  xx@xx.com.br, caso contrário, exibir mensagem “E-mail inválido”
  3. O sistema verifica se o campo senha é válido e se apresenta no mínimo 8 caracteres,
  contendo pelo menos uma letra maiúscula, uma letra minúscula, um número e um caracter
  especial. Do contrário, exibir mensagem “A senha deve ter no mínimo 8 caracteres e possuir
  pelo menos uma letra maiúscula, uma letra minúscula, um número e um caracter especial”
  4. O sistema confere se o ator informa um e-mail que não seja vinculado a um cadastro
existente, caso contrário exibir mensagem “E-mail já cadastrado” 


# Bcrypt
- É uma biblioteca para fazer o Hash de senhas
- Não é uma criptografia, é um Hash que não tem como descriptografar

https://www.npmjs.com/package/bcrypt  

# Dúvidas
  - req.session.save()
  - res.redirect()

  - O req.session.save() salva a sessão de volta no armazenamento com suas modificações
  - Útil em redirecionamentos