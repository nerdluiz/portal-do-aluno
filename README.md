# UniNova — Portal do Aluno (Estudo de UI/UX)

Protótipo funcional em HTML, CSS e JavaScript puro desenvolvido como estudo de UI/UX para um portal universitário moderno com foco no acesso rápido à **Carteirinha de Estudante Digital**.

## Estrutura do Projeto

- `index.html` — Estrutura semântica das telas (Início, Carteirinha Digital, Disciplinas & Notas, Grade Horária e modal Modo Catraca)
- `css/styles.css` — Design tokens, tema claro/escuro, animações 3D da carteirinha e layout responsivo
- `js/app.js` — Navegação entre telas, giro frente/verso do cartão, máscara de privacidade (CPF), relógio ao vivo e código dinâmico anti-fraude

## Como abrir

Basta abrir o arquivo `index.html` diretamente no navegador (não requer servidor ou etapa de build).

## Decisões de UI/UX aplicadas

- **Arquitetura orientada a tarefas (*Task-First*):** prioriza próxima aula, status acadêmico/financeiro e acesso em 1 clique à carteirinha.
- **Carteirinha com proporção real (ISO/IEC 7810 ID-1):** giro 3D frente e verso com QR Code de validação.
- **Modo Catraca:** modal em alto contraste com QR ampliado para leitura óptica em catracas, biblioteca ou bilheteria.
- **Sinais anti-fraude:** relógio ao vivo no cartão, indicador pulsante de status ativo e código rotativo a cada 30 segundos.
- **Privacidade por padrão:** CPF mascarado no verso com exibição sob demanda.
- **Responsividade:** sidebar no desktop e *bottom navigation* no mobile ao alcance do polegar, além de modo escuro.
