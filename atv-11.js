class Produto {
  #codigo;
  #nome;
  #preco;
  #quantidade;

  constructor(codigo, nome, preco, quantidade = 0) {
    if (preco < 0) throw new Error("O preço não pode ser negativo.");
    if (quantidade < 0) throw new Error("A quantidade não pode ser negativa.");

    this.#codigo = codigo;
    this.#nome = nome;
    this.#preco = preco;
    this.#quantidade = quantidade;
  }

  get codigo() { return this.#codigo; }
  get nome() { return this.#nome; }
  get preco() { return this.#preco; }
  get quantidade() { return this.#quantidade; }

  adicionarEstoque(unidades) {
    if (unidades <= 0) {
      console.log("Erro: informe uma quantidade maior que zero.");
      return false;
    }
    this.#quantidade += unidades;
    return true;
  }

  retirarEstoque(unidades) {
    if (unidades <= 0) {
      console.log("Erro: informe uma quantidade maior que zero.");
      return false;
    }
    if (unidades > this.#quantidade) {
      console.log(
        `Erro: estoque insuficiente de "${this.#nome}". ` +
        `Disponível: ${this.#quantidade}, solicitado: ${unidades}.`
      );
      return false;
    }
    this.#quantidade -= unidades;
    return true;
  }

  alterarPreco(novoPreco) {
    if (novoPreco < 0) {
      console.log("Erro: o preço não pode ser negativo.");
      return false;
    }
    this.#preco = novoPreco;
    return true;
  }

  valorTotalEstoque() {
    return this.#preco * this.#quantidade;
  }

  toString() {
    return `[${this.#codigo}] ${this.#nome} | Preço: R$ ${this.#preco.toFixed(2)} | ` +
           `Estoque: ${this.#quantidade} | Total: R$ ${this.valorTotalEstoque().toFixed(2)}`;
  }
}

const p1 = new Produto(1, "Teclado", 120.0, 10);
const p2 = new Produto(2, "Mouse", 55.5, 20);
const p3 = new Produto(3, "Monitor", 899.9, 5);

console.log("== Estado inicial ==");
[p1, p2, p3].forEach(p => console.log(p.toString()));

console.log("\n== Adicionando 15 Teclados ==");
p1.adicionarEstoque(15);
console.log(p1.toString());

console.log("\n== Retirando 5 Mouses ==");
p2.retirarEstoque(5);
console.log(p2.toString());

console.log("\n== Tentando retirar 10 Monitores (só há 5) ==");
p3.retirarEstoque(10);
console.log(p3.toString());

console.log("\n== Alterando preço do Monitor para R$ 799,90 ==");
p3.alterarPreco(799.9);
console.log(p3.toString());

console.log("\n== Valor total armazenado ==");
[p1, p2, p3].forEach(p =>
  console.log(`${p.nome}: R$ ${p.valorTotalEstoque().toFixed(2)}`)
);