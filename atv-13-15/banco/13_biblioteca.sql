

CREATE TABLE autor (
    id_autor        INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome            VARCHAR(100) NOT NULL,
    nacionalidade   VARCHAR(50),
    data_nascimento DATE
);

CREATE TABLE livro (
    id_livro        INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    titulo          VARCHAR(200) NOT NULL,
    isbn            VARCHAR(20)  NOT NULL UNIQUE,
    editora         VARCHAR(100),
    ano_publicacao  INT CHECK (ano_publicacao > 0),
    qtd_exemplares  INT NOT NULL DEFAULT 1 CHECK (qtd_exemplares >= 0)
);

CREATE TABLE livro_autor (
    id_livro INT NOT NULL,
    id_autor INT NOT NULL,
    PRIMARY KEY (id_livro, id_autor),
    FOREIGN KEY (id_livro) REFERENCES livro (id_livro) ON DELETE CASCADE,
    FOREIGN KEY (id_autor) REFERENCES autor (id_autor) ON DELETE CASCADE
);

CREATE TABLE usuario (
    id_usuario    INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome          VARCHAR(100) NOT NULL,
    cpf           CHAR(11)     NOT NULL UNIQUE,
    email         VARCHAR(100) NOT NULL UNIQUE,
    telefone      VARCHAR(20),
    data_cadastro DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE emprestimo (
    id_emprestimo           INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_usuario              INT  NOT NULL,
    id_livro                INT  NOT NULL,
    data_emprestimo         DATE NOT NULL DEFAULT CURRENT_DATE,
    data_devolucao_prevista DATE NOT NULL,
    data_devolucao_real     DATE,
    FOREIGN KEY (id_usuario) REFERENCES usuario (id_usuario),
    FOREIGN KEY (id_livro)   REFERENCES livro (id_livro),
    CHECK (data_devolucao_prevista >= data_emprestimo),
    CHECK (data_devolucao_real IS NULL OR data_devolucao_real >= data_emprestimo)
);