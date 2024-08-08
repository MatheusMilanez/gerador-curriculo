# Gerador de Currículos

## Descrição

O Gerador de Currículos é uma aplicação web que permite aos usuários criar e visualizar currículos personalizados antes de gerá-los em formato PDF. O aplicativo oferece uma interface amigável para inserir dados pessoais, formação acadêmica e experiência profissional, além de permitir a escolha entre diferentes modelos de design para o currículo.

## Funcionalidades

1. Seção de informação pessoais

Nome: Usuários podem inserir seus nomes completos.

Data de Nascimento: Usuários devem inserir sua data de nascimento no formato DD/MM/AAAA.

Gênero: Uma lista de seleção é apresentada contendo as opções Masculino, Feminino e Outro.

Endereço: Usuários podem inserir seu endereço residencial, incluindo:

  - CEP
  
  - Rua (Preenchido automaticamente através do CEP informado)
  
  - Número
 
  - Complemento
 
  - Bairro (Preenchido automaticamente através do CEP informado)
  
  - Cidade (Preenchido automaticamente através do CEP informado)

  - Estado (Preenchido automaticamente através do CEP informado)
    
  - Telefone e e-mail: Preenchimento obrigatório de informações para contato.

  - Indicador de Pessoa com Deficiência (PCD): Usuários podem indicar se possuem alguma deficiência, com um campo opcional para     descrevê-las.

2. Seção de Formação Acadêmica

  - Nome da instituição
  
  - Curso
  
  - Nível
 
  - Concluído: Usuários podem indicar se já concluíram a formação informada clicando nos botões "Sim" ou "Não". Se "Sim", um campo para informar a data de conclusão é apresentado. Se "Não", o texto "Em andamento" será adicionado ao CV.

3. Seção de Experiência de Trabalho

Detalhes da Experiência de Trabalho: Usuários podem inserir informações sobre sua experiência de trabalho, incluindo:

  - Nome da empresa ou instituição

  - Cargo

  - Data de Início: Usuários devem inserir a data de início no cargo no formato DD/MM/AAAA.

  - Atual?: Usuários podem clicar nos botões "Sim" ou "Não". Se "Sim", "Atualmente" é apresentado ao lado da "Data de Início" no CV. Se "Não", um campo para informar a "Data de Término" é apresentado, e a data deve ser informada no formato DD/MM/AAAA.
 
  - Atividade principal: Um campo para inserir uma descrição breve das atribuições e responsabilidades do cargo.
    
4. Escolha de Modelos:

O aplicativo oferece três modelos de design diferentes para o currículo. Os usuários podem selecionar seu modelo preferido antes de visualizar o currículo.

5. Pré-visualização do Currículo:

Após inserir todos os dados, os usuários podem visualizar como ficará seu currículo antes de gerar o PDF. A visualização se adapta ao modelo de design escolhido.

6. Validação de Dados:

O sistema valida as entradas, garantindo que as datas estejam no formato correto e que todos os campos obrigatórios sejam preenchidos.

7. Gerar PDF
   
Ao final, os usuários podem clicar no botão "Gerar PDF" para compilar todas as informações fornecidas em um CV profissional formatado em documento PDF.

Funções implementadas:

Funções de Informações Pessoais

Validação de Inputs: Verifica se todos os campos de preenchimento obrigatório foram preenchidos antes da submissão.

Alternador de Input para Informação sobre Deficiência: apresenta ou não o campo de descrição de deficiência baseado no input do usuário.

Funções relacionadas a Formação Acadêmica

Entrada dinâmica de Formação Acadêmica: Permite que usuários adicionem múltiplas Formações Acadêmicas.

Conclusão: Apresenta o campo de inserção de Data de Conclusão ou adiciona a mensagem "Em Andamento" baseado na seleção do usuário.

Funções relacionadas a Experiência de Trabalho

Entrada Dinâmica de Experiência de Trabalho: Permite que usuários adicionem múltiplas experiências de trabalho.

Lógica do término: Apresenta "Atualmente" ou solicita que o usuário forneça a Data de Término.

Validação de datas

Verificação do formato das datas: Verifica se o formato das datas para Data de Nascimento, Data de Conclusão de Formação Acadêmica, Data de Início de Experiência de Trabalho e Data de Término para garantir que foram informadas corretamente.

## Uso

Clone o repositório.

Abra o index.html num navegador web.

Preencha o formulário com suas informações pessoais, formação acadêmica e experiência de trabalho.

Escolha um modelo, clique em "Visualizar CV" e, se estiver satisfeito, clique em "Gerar PDF" para gerar seu CV.

## Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript
- [jsPDF](https://github.com/parallax/jsPDF) (para a geração de PDF)

## Licença

Este projeto está sob a licença MIT License.
