
async function consultarCep(entrada) {
  const cep = (entrada || "").replace(/\D/g, ""); 

  if (cep.length !== 8) {
    console.log("CEP inválido. Informe 8 dígitos. Ex.: node consulta_cep.js 01001000");
    return;
  }

  const url = `https://viacep.com.br/ws/${cep}/json/`;
  console.log(`Requisição: GET ${url}`);

  try {
    const resposta = await fetch(url, {
      method: "GET",
      signal: AbortSignal.timeout(10000), 
    });

    console.log(`Código HTTP: ${resposta.status}`);
    console.log(`Formato (Content-Type): ${resposta.headers.get("content-type")}`);

    if (!resposta.ok) {
      console.log("Erro: a API não respondeu com sucesso.");
      return;
    }

    const dados = await resposta.json();

    if (dados.erro) {
      console.log("CEP não encontrado.");
      return;
    }


    console.log("\n--- Endereço encontrado ---");
    console.log(`CEP:        ${dados.cep}`);
    console.log(`Logradouro: ${dados.logradouro || "(não informado)"}`);
    console.log(`Bairro:     ${dados.bairro || "(não informado)"}`);
    console.log(`Cidade/UF:  ${dados.localidade}/${dados.uf}`);
  } catch (erro) {
    if (erro.name === "TimeoutError") {
      console.log("Erro: a requisição demorou demais (timeout).");
    } else {
      console.log(`Erro ao consultar a API: ${erro.message}`);
    }
  }
}

consultarCep(process.argv[2]);