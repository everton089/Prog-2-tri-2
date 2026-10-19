
SELECT u.nome AS usuario, l.titulo AS livro
FROM emprestimo e
JOIN usuario u ON u.id_usuario = e.id_usuario
JOIN livro   l ON l.id_livro   = e.id_livro;

SELECT e.id_emprestimo, u.nome AS usuario, l.titulo AS livro,
       e.data_emprestimo, e.data_devolucao_prevista, e.data_devolucao_real
FROM emprestimo e
JOIN usuario u ON u.id_usuario = e.id_usuario
JOIN livro   l ON l.id_livro   = e.id_livro
ORDER BY e.data_emprestimo;

SELECT u.nome AS usuario, l.titulo AS livro, e.data_devolucao_prevista
FROM emprestimo e
JOIN usuario u ON u.id_usuario = e.id_usuario
JOIN livro   l ON l.id_livro   = e.id_livro
WHERE e.data_devolucao_real IS NULL;


SELECT u.nome AS usuario, COUNT(e.id_emprestimo) AS total_emprestimos
FROM usuario u
LEFT JOIN emprestimo e ON e.id_usuario = u.id_usuario
GROUP BY u.id_usuario, u.nome
ORDER BY total_emprestimos DESC;

SELECT l.titulo
FROM livro l
LEFT JOIN emprestimo e ON e.id_livro = l.id_livro
WHERE e.id_emprestimo IS NULL;