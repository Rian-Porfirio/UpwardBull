# UpwardBull

video da apresentação: https://drive.google.com/file/d/1jAmMFVBXxwbGEZoRDQeOSTgIed9tkIUa/view?usp=drive_link

complemento: https://drive.google.com/file/d/1dQllwaCT4u7BjktwVcC26JGjhaPY-S_O/view?usp=drive_link

## UpwardBull - Sistema de Compras
UpwardBull é um sistema de gestão de compras, projetado para fornecer um controle eficiente e seguro sobre as requisições, cotações e fornecedores. O sistema é acessível tanto para usuários regulares quanto para administradores, garantindo que apenas o solicitante tenha acesso às suas requisições, enquanto os administradores podem ver e gerenciar todas as requisições.

## Funcionalidades Principais
1. Autenticação de Usuário:

- Tela de Login: Verificação de e-mail e senha para acesso seguro.

- ![image](https://github.com/user-attachments/assets/939de855-a922-4e5e-9bd4-5f192716736e)
- ![image](https://github.com/user-attachments/assets/b8599d47-7fcc-40dc-aaf1-97c52bb8a535)

- Tela de Registro: Novo usuário pode se registrar para acessar o sistema.
- ![image](https://github.com/user-attachments/assets/e5ded3f1-d5b7-4821-8abc-51fd3bcd65e9)

2. Gestão de Requisições:

- Cadastro de Requisições e Cotações: Usuários podem cadastrar requisições e cotações, mas apenas o criador pode ver suas requisições. Administradores têm visão completa sobre todas as requisições.
- ![image](https://github.com/user-attachments/assets/7261b929-1c53-4492-9654-8fd53c422066)
- ![image](https://github.com/user-attachments/assets/80616a94-698d-480c-888b-657288891542)
- ![image](https://github.com/user-attachments/assets/72e9ecce-4ca7-4c5d-8006-965d59b52142)

3. Cotações:

- Modal de Cotações: Interface para visualização e inserção de cotações associadas a uma requisição. Usuários podem acessar detalhes e adicionar informações sobre cotações.
- ![image](https://github.com/user-attachments/assets/617981da-15a4-4d52-988d-88d5ca651eef)

- ![image](https://github.com/user-attachments/assets/3f60d408-9491-4533-a3d9-f248bd74ff4a)

4. Gestão de Produtos:

- Tela de Produtos: Gerenciamento de todos os produtos relacionados às requisições e cotações. Fornece uma visão completa dos produtos disponíveis no sistema.
- ![image](https://github.com/user-attachments/assets/7ffd7573-ec3c-46a5-b41f-3ab688bbc6a1)

5. Gestão de Fornecedores:

- Cadastro de Fornecedores: Sistema integrado a uma API que busca automaticamente a bandeira de país com base no nome do fornecedor. Facilita a inserção de novos fornecedores no sistema.
- ![image](https://github.com/user-attachments/assets/e96e2c61-61ba-4215-a7f5-6c64f56e8808)

6. Gestão de Usuários:

- Funções de Administrador: Administradores têm controle sobre os usuários do sistema, com a capacidade de bloquear usuários ou promover usuários regulares a administradores.
- ![image](https://github.com/user-attachments/assets/c6849a06-7d27-4715-af79-a0fd6f424a64)

- ![image](https://github.com/user-attachments/assets/5166a38d-10cd-4b75-ac1f-935436250af8)

# Tecnologias Utilizadas
### Frontend:

- React.js
- Vite.js (para desenvolvimento rápido e otimizado)
- React Toastify (para notificações)

### Backend e Autenticação:
- Firebase (para autenticação e banco de dados)
  
### Integrações:

- API para buscar bandeira de país de fornecedores
- Sistema de autenticação
- Regras de Acesso

### Usuários Regulares:
- Podem cadastrar requisições e cotações.
- Têm acesso apenas às suas próprias requisições.
  
### Administradores:

- Têm visibilidade completa sobre todas as requisições e cotações.
- Podem gerenciar usuários, fornecedores e produtos.
