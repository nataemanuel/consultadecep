function formatarCNPJ() {
  let cnpj = document.getElementById('cnpj').value;
  cnpj = cnpj.replace(/[^\d]+/g, '');
  document.getElementById('cnpj').value = cnpj;
}

async function consultarCNPJ() {
  const cnpj = document.getElementById('cnpj').value.replace(/[^\d]+/g, '');

  if (cnpj.length !== 14) {
    alert("Insira um CNPJ válido!");
    return;
  }

  const url = `https://api.allorigins.win/raw?url=https://receitaws.com.br/v1/cnpj/${cnpj}`;
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = "Consultando...";

  try {
    const response = await fetch(url, {
      headers: { 'Accept': 'application/json' }
    });

    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.status === "ERROR") {
      resultDiv.innerHTML = "Erro ao consultar o CNPJ. Verifique o número e tente novamente.";
    } else {
      resultDiv.innerHTML = `
        <h2>Informações da Empresa</h2>
        <p><strong>Razão:</strong> ${data.nome}</p>
        <p><strong>Nome Fantasia:</strong> ${data.fantasia}</p>
        <p><strong>Atividade Principal:</strong> ${data.atividade_principal[0]?.text || 'Não disponível'}</p>
        <p><strong>Situação Cadastral:</strong> ${data.status}</p>
        <p><strong>Endereço:</strong> ${data.logradouro}, ${data.numero} - ${data.bairro}, ${data.municipio} - ${data.cep}</p>
      `;
    }
  } catch (error) {
    resultDiv.innerHTML = "Erro na consulta, digite um CNPJ válido!";
  }
}