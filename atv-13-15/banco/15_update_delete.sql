UPDATE usuario
SET nome = 'Ana Souza Lima'
WHERE id_usuario = 1;

UPDATE livro
SET disponivel = FALSE
WHERE id_livro = 4;


UPDATE emprestimo
SET data_devolucao_real = '2026-10-18'
WHERE id_emprestimo = 2;

UPDATE emprestimo
SET data_devolucao_prevista = '2026-11-02'
WHERE id_emprestimo = 3;

SELECT id_usuario, COUNT(*) AS emprestimos FROM emprestimo GROUP BY id_usuario;
SELECT id_livro,   COUNT(*) AS emprestimos FROM emprestimo GROUP BY id_livro

DELETE FROM usuario WHERE id_usuario = 4;

DELETE FROM livro WHERE id_livro = 6;
