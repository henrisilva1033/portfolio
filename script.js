/* ===============================================================
   ANIMAÇÃO DE GRAFOS INTERATIVOS (FUNDO BRANCO / GRAFOS PRETOS)
   =============================================================== */

const canvas = document.getElementById("graphCanvas");
const ctx = canvas.getContext("2d");

// Define tamanho do canvas
canvas.width = window.innerWidth;
canvas.height = 400;

// Configurações do grafo
const numNodes = 90;
const maxDistance = 150;
const nodes = [];
let mouse = { x: null, y: null };

// Cria os nós aleatórios
for (let i = 0; i < numNodes; i++) {
  nodes.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    dx: (Math.random() - 0.5) * 0.6,
    dy: (Math.random() - 0.5) * 0.6,
    radius: 2,
    color: "#000000"
  });
}

// Função principal de desenho e atualização
function drawGraph() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Desenha as conexões
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dist = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
      if (dist < maxDistance) {
        ctx.strokeStyle = "rgba(0,0,0," + (1 - dist / maxDistance) + ")";
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.stroke();
      }
    }
  }

  // Desenha os nós
  nodes.forEach(node => {
    ctx.beginPath();
    ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
    ctx.fillStyle = node.color;
    ctx.fill();

    // Movimenta
    node.x += node.dx;
    node.y += node.dy;

    // Rebote nas bordas
    if (node.x < 0 || node.x > canvas.width) node.dx *= -1;
    if (node.y < 0 || node.y > canvas.height) node.dy *= -1;

    // Interação com o mouse (muda cor)
    const distMouse = Math.hypot(mouse.x - node.x, mouse.y - node.y);
    if (mouse.x && distMouse < 100) {
      node.color = "#e41212f5";
      node.radius = 3;
    } else {
      node.color = "#000";
      node.radius = 2;
    }
  });

  requestAnimationFrame(drawGraph);
}

// Movimento do mouse
canvas.addEventListener("mousemove", e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

// Saiu da área do canvas
canvas.addEventListener("mouseleave", () => {
  mouse.x = null;
  mouse.y = null;
});

// Redimensionamento
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = 400;
});

// Inicia a animação
drawGraph();


/* ===============================================================
   INTERAÇÃO DO FORMULÁRIO VIA WHATSAPP
   =============================================================== */

  document.getElementById("whatsappForm").addEventListener("submit", function(e) {
    e.preventDefault(); // evita o reload da página

    // pega os dados do formulário
    const nome = document.getElementById("nome").value;
    const empresa = document.getElementById("empresa").value;
    const mensagem = document.getElementById("mensagem").value;

    // número do WhatsApp
    const numero = "5585999878568"; // exemplo: 55 + DDD + número

    // texto que será enviado
    const texto = `Olá Henrique! 👋%0A
      Meu nome é ${nome}.%0A
      Da empresa ${empresa}%0A
      -> ${mensagem}`;

    // link de envio
    const url = `https://wa.me/${numero}?text=${texto}`;

    // abre o WhatsApp (web ou app)
    window.open(url, "_blank");
  });