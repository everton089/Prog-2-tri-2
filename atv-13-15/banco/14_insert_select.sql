ALTER TABLE livro ADD COLUMN disponivel BOOLEAN NOT NULL DEFAULT TRUE;


INSERT INTO autor (nome, nacionalidade, data_nascimento) VALUES
('Machado de Assis',  'Brasileira', '1839-06-21'),
('Clarice Lispector', 'Brasileira', '1920-12-10'),
('George Orwell',     'Britânica',  '1903-06-25'),
('J. K. Rowling',     'Britânica',  '1965-07-31'),
('Jorge Amado',       'Brasileira', '1912-08-10');


INSERT INTO livro (titulo, isbn, editora, ano_publicacao, qtd_exemplares, disponivel) VALUES
('Dom Casmurro',                       '9780000000011', 'Editora A', 1899, 3, TRUE),
('Memórias Póstumas de Brás Cubas',    '9780000000028', 'Editora A', 1881, 2, TRUE),
('A Hora da Estrela',                  '9780000000035', 'Editora B', 1977, 2, FALSE),
('1984',                               '9780000000042', 'Editora C', 1949, 4, TRUE),
('Harry Potter e a Pedra Filosofal',   '9780000000059', 'Editora D', 1997, 5, TRUE),
('Capitães da Areia',                  '9780000000066', 'Editora E', 1937, 1, TRUE);

INSERT INTO livro_autor (id_livro, id_autor) VALUES
(1, 1), (2, 1), (3, 2), (4, 3), (5, 4), (6, 5);

INSERT INTO usuario (nome, cpf, email, telefone) VALUES
('Ana Souza',    '11111111111', 'ana@email.com',    '(47) 99999-0001'),
('Bruno Lima',   '22222222222', 'bruno@email.com',  '(47) 99999-0002'),
('Carla Mendes', '33333333333', 'carla@email.com',  '(47) 99999-0003'),
('Diego Santos', '44444444444', 'diego@email.com',  '(47) 99999-0004');

INSERT INTO emprestimo (id_usuario, id_livro, data_emprestimo, data_devolucao_prevista, data_devolucao_real) VALUES
(1, 1, '2026-10-01', '2026-10-15', '2026-10-14'),  
(1, 4, '2026-10-10', '2026-10-24', NULL),          
(2, 5, '2026-10-12', '2026-10-26', NULL),          
(3, 2, '2026-09-20', '2026-10-04', '2026-10-03');  

SELECT * FROM livro;

SELECT l.titulo, a.nome AS autor
FROM livro l
JOIN livro_autor la ON la.id_livro = l.id_livro
JOIN autor a        ON a.id_autor  = la.id_autor;

SELECT l.titulo, a.nome AS autor
FROM livro l
JOIN livro_autor la ON la.id_livro = l.id_livro
JOIN autor a        ON a.id_autor  = la.id_autor
WHERE a.nome = 'Machado de Assis';

SELECT titulo FROM livro ORDER BY titulo ASC;

SELECT titulo, qtd_exemplares
FROM livro
WHERE disponivel = TRUE;