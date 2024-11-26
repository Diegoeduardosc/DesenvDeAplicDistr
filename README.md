# Receitas da Tia Elaine - Relatório de Construção do Software

## Pontifícia Universidade Católica de Minas Gerais  
**Disciplina: Desenvolvimento de Aplicações Distribuídas**  

### Trabalho Prático

**Integrantes:**  
- Diego Eduardo  
- Hudson Cordeiro  
- Luis Henrique  
- Pedro Lucas  
- Thainara Gabrielle  

**Belo Horizonte - 2024**

---

## Introdução
O projeto **Receitas da Tia Elaine** é um aplicativo móvel desenvolvido em **React Native**, com foco no gerenciamento de receitas culinárias. Este relatório documenta a estrutura do sistema, as dependências, fluxos de execução e sugestões de aprimoramento. Ele foi elaborado com o objetivo de auxiliar na manutenção e evolução do software, servindo como referência para desenvolvedores e gerentes de projeto.

---

## Arquitetura do Sistema
A arquitetura do projeto segue um padrão modular, típico de aplicações em React Native, permitindo escalabilidade e manutenção fácil. A estrutura principal é organizada da seguinte forma:

| Diretório         | Descrição                                                                           |
|-------------------|-----------------------------------------------------------------------------------|
| `/android`        | Arquivos e configurações específicas para a plataforma Android.                   |
| `/ios`            | Arquivos e configurações específicas para a plataforma iOS.                       |
| `/node_modules`   | Pacotes de dependências instalados via npm ou yarn.                                |
| `/src`            | Código-fonte principal do aplicativo.                                              |
| `/src/components` | Componentes reutilizáveis que formam as interfaces do usuário.                     |
| `/src/screens`    | Telas principais, representando seções do aplicativo.                              |
| `/src/services`   | Lógica de negócios, integração com APIs externas e gerenciamento de dados.         |
| `/src/assets`     | Recursos estáticos, como imagens e fontes.                                         |
| `package.json`    | Metadados do projeto e lista de dependências.                                      |
| `README.md`       | Documentação introdutória do projeto.                                              |

---

## Fluxo de Dados e Navegação
O aplicativo utiliza os seguintes padrões para navegação e organização:

1. **Navegação entre Telas:**
   - Ferramenta utilizada: `react-navigation`.
   - Tipos de navegação: Tab Navigation (abas) e Stack Navigation (pilha).

2. **Gerenciamento de Estado:**
   - Simples: Context API.  
   - Complexo: Implementação com Redux ou Recoil.

3. **Ciclo de Vida dos Componentes:**
   - Componentes reutilizáveis para gerenciamento de eventos (ex.: montagem e desmontagem).
   - Sugestão: Adicionar hooks como `useEffect` para gerenciar chamadas assíncronas.

---

## Instalação e Configuração

### Pré-requisitos
Certifique-se de que as seguintes ferramentas estão instaladas:
- **Node.js**: Ambiente de execução JavaScript. [Instalar aqui](https://nodejs.org).  
- **npm** ou **yarn**: Gerenciador de pacotes.

### Passos de Configuração
Execute os comandos abaixo:

```bash
# Instale as dependências do projeto
npm install

# Inicie o servidor de desenvolvimento
npm start

# Para Android (emulador ou dispositivo conectado)
npx react-native run-android

# Para iOS (apenas em macOS com Xcode configurado)
npx react-native run-ios
