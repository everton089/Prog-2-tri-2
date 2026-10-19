class Pessoa {
  #nome;
  #dataNascimento;

  constructor(nome, dataNascimento) {
    if (!nome) throw new Error("O nome é obrigatório.");
    const data = new Date(dataNascimento);
    if (isNaN(data.getTime())) throw new Error("Data de nascimento inválida.");

    this.#nome = nome;
    this.#dataNascimento = data;
  }

  get nome() { return this.#nome; }
  get dataNascimento() { return this.#dataNascimento; }

  calcularIdade() {
    const hoje = new Date();
    let idade = hoje.getFullYear() - this.#dataNascimento.getFullYear();
    const aindaNaoFezAniversario =
      hoje.getMonth() < this.#dataNascimento.getMonth() ||
      (hoje.getMonth() === this.#dataNascimento.getMonth() &&
        hoje.getDate() < this.#dataNascimento.getDate());
    if (aindaNaoFezAniversario) idade--;
    return idade;
  }

  apresentar() {
    const nasc = this.#dataNascimento.toLocaleDateString("pt-BR", { timeZone: "UTC" });
    return `Nome: ${this.#nome}\n` +
           `Data de nascimento: ${nasc} (${this.calcularIdade()} anos)`;
  }
}

class Aluno extends Pessoa {
  #matricula;
  #curso;
  #notas;

  constructor(nome, dataNascimento, matricula, curso) {
    super(nome, dataNascimento);
    this.#matricula = matricula;
    this.#curso = curso;
    this.#notas = [];
  }

  get matricula() { return this.#matricula; }
  get curso() { return this.#curso; }
  get notas() { return [...this.#notas]; } // cópia, protege o array interno

  adicionarNota(nota) {
    if (typeof nota !== "number" || nota < 0 || nota > 10) {
      console.log(`Erro: nota inválida (${nota}). Use um valor entre 0 e 10.`);
      return false;
    }
    this.#notas.push(nota);
    return true;
  }

  calcularMedia() {
    if (this.#notas.length === 0) return 0;
    const soma = this.#notas.reduce((total, n) => total + n, 0);
    return soma / this.#notas.length;
  }

  situacao() {
    if (this.#notas.length === 0) return "Sem notas";
    return this.calcularMedia() >= 6 ? "Aprovado" : "Reprovado";
  }

  apresentar() {
    const notas = this.#notas.length ? this.#notas.join(", ") : "nenhuma";
    return `[ALUNO]\n${super.apresentar()}\n` +
           `Matrícula: ${this.#matricula}\n` +
           `Curso: ${this.#curso}\n` +
           `Notas: ${notas}\n` +
           `Média: ${this.calcularMedia().toFixed(2)} (${this.situacao()})`;
  }
}

class Professor extends Pessoa {
  #matricula;
  #disciplina;

  constructor(nome, dataNascimento, matricula, disciplina) {
    super(nome, dataNascimento);
    this.#matricula = matricula;
    this.#disciplina = disciplina;
  }

  get matricula() { return this.#matricula; }
  get disciplina() { return this.#disciplina; }

  apresentar() {
    return `[PROFESSOR]\n${super.apresentar()}\n` +
           `Matrícula: ${this.#matricula}\n` +
           `Disciplina: ${this.#disciplina}`;
  }
}

const a1 = new Aluno("Ana Souza", "2004-03-15", "A2024001", "Ciência da Computação");
const a2 = new Aluno("Bruno Lima", "2003-11-02", "A2024002", "Engenharia de Software");
const prof = new Professor("Carla Mendes", "1980-07-21", "P0001", "Programação Orientada a Objetos");

[8.5, 7.0, 9.5].forEach(n => a1.adicionarNota(n));
[4.0, 5.5, 6.0].forEach(n => a2.adicionarNota(n));
a2.adicionarNota(11); 

const pessoas = [a1, a2, prof];

pessoas.forEach(p => {
  console.log(p.apresentar());
  console.log("-".repeat(40));
});

console.log("Todos são Pessoa?", pessoas.every(p => p instanceof Pessoa));