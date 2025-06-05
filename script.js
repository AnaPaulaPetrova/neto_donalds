var infoFood = {};
var infoFillings = [];
var infoPay = {}
var totalPrice = 0;

async function getFood(idFood){
    const response = await fetch("http://localhost:8080/food/" + idFood);
    const data = await response.json();

    console.log(data);
    infoFood = data.food[0];
    infoFillings = data.fillings;

    totalPrice = infoFood.preco

    document.querySelector("#price").innerHTML = infoFood.preco;
    
    renderFillings();
}
function renderFillings(){
    document.querySelector(".fillings").innerHTML = "";

    let id = 0

    for(let filling of infoFillings){
        let div = document.createElement("div");
        div.innerHTML = `
            <input id=${id} type="checkbox"/> ${filling.nome} (R$ ${filling.price})
        `;
        id++;
        div.addEventListener("change", setTotalPrice);
        
        document.querySelector(".fillings").appendChild(div);
    }
}
function setTotalPrice(event){
    let id = event.target.id;

    if(event.target.checked){
        totalPrice += infoFillings[id].price
    } else{
        totalPrice -= infoFillings[id].price
    }

    console.log(totalPrice.toFixed(2))
    document.querySelector("#price").innerHTML = totalPrice.toFixed(2)
    
}
function confirmPayment(){
    Swal.fire({
        title: "Deseja finalizar o pagamento?",
        text: `R$ ${totalPrice}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim",
        cancelButtonText: "Não"
    }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                title: "Finalizando pagamento...",
                text: "Seu pagamento foi finalizado.",
                icon: "success"
                });
                inserirPagamento()
            }
    });
}
async function history(){
    const response = await fetch("http://localhost:8080/historico");
    const dataPay = await response.json();

    console.log(dataPay)

    var idPagamento = []
    var idComida = []
    var vetorCPF = []
    var preco = []
    var dataPag = []

    for(let campo of dataPay){
        idPagamento.push(campo.id).toString();
        idComida.push(campo.id_foods).toString();
        vetorCPF.push(campo.cpf).toString();
        preco.push(campo.price).toString();
        dataPag.push(campo.pay_date).toString();

    }
    console.log(idPagamento, idComida, vetorCPF, preco, dataPag)
let tabelaHTML = `
  <table border="1" cellspacing="0" cellpadding="4">
    <thead>
      <tr>
        <th>ID Pagamento</th>
        <th>ID Comida</th>
        <th>CPF</th>
        <th>Preço</th>
        <th>Data</th>
      </tr>
    </thead>
    <tbody>
`;

for (let i = 0; i < idPagamento.length; i++) {
  tabelaHTML += `
    <tr>
      <td>${idPagamento[i]}</td>
      <td>${idComida[i]}</td>
      <td>${vetorCPF[i]}</td>
      <td>${preco[i]}</td>
      <td>${dataPag[i]}</td>
    </tr>
  `;
}

tabelaHTML += `</tbody></table>`;

Swal.fire({
  title: "Histórico de Pagamentos",
  html: tabelaHTML,
});
}

async function inserirPagamento() {
    let cpf = document.querySelector("#cpf").value;
    let pay_date = new Date().toLocaleDateString('pt-BR');
    const selecionado = document.querySelector('input[name="food"]:checked');

  if (selecionado) {
    var id_foods = parseInt(selecionado.value); 
    console.log(id_foods);         
  } else {
    console.log('Nenhuma opção selecionada');
  }

    console.log("cpf:", cpf);
    console.log("totalPrice:", totalPrice);
    console.log("dataPagamento:", pay_date);

    var dadosPagamento = {
        id_foods,
        cpf,
        pay_date,
        price: totalPrice,
    };

    console.log(dadosPagamento);
    var resposta = await fetch("http://localhost:8080/payment", {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(dadosPagamento),

    })

    var data = await resposta.json();
    console.log(data);
}

getFood(1);
