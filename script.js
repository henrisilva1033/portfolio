/* ===============================================================
   ANIMAÇÃO DE GRAFOS INTERATIVOS PARA DESKTOP (FUNDO BRANCO / GRAFOS PRETOS)
   =============================================================== */
(function desktopGraph() {
  const canvas = document.getElementById("graphCanvas");
  if (!canvas) return; // evita erro se o canvas não existir
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height =  window.innerHeight; // altura fixa para desktop

  const numNodes = 130;
  const maxDistance = 180;
  const nodes = [];
  let mouse = { x: null, y: null };

  for (let i = 0; i < numNodes; i++) {
    nodes.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      dx: (Math.random() - 0.5) * 0.6,
      dy: (Math.random() - 0.5) * 0.6,
      radius: 2,
      color: "#000"
    });
  }

  function drawGraph() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

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

    nodes.forEach(node => {
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fillStyle = node.color;
      ctx.fill();

      node.x += node.dx;
      node.y += node.dy;

      if (node.x < 0 || node.x > canvas.width) node.dx *= -1;
      if (node.y < 0 || node.y > canvas.height) node.dy *= -1;

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

  canvas.addEventListener("mousemove", e => { mouse.x = e.clientX; mouse.y = e.clientY; });
  canvas.addEventListener("mouseleave", () => { mouse.x = null; mouse.y = null; });

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = 400;
  });

  drawGraph();
})();

/* ===============================================================
   ANIMAÇÃO DE GRAFOS INTERATIVOS PARA MOBILE (TELA CHEIA / MAIS SUAVE)
   =============================================================== */
(function mobileGraph() {
  if (window.innerWidth > 768) return; // só roda se for mobile

  const canvas = document.getElementById("graphCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height =  800; // altura total da tela

  const numNodes = 80;      // menos nós no mobile
  const maxDistance = 150;  // conexões mais suaves
  const nodes = [];
  let mouse = { x: null, y: null };

  for (let i = 0; i < numNodes; i++) {
    nodes.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      dx: (Math.random() - 0.5) * 0.4, // movimento mais lento
      dy: (Math.random() - 0.5) * 0.4,
      radius: 2,
      color: "#000"
    });
  }

  function drawGraph() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
        if (dist < maxDistance) {
          ctx.strokeStyle = `rgba(0,0,0,${0.6 * (1 - dist / maxDistance)})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }

    nodes.forEach(node => {
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fillStyle = node.color;
      ctx.fill();

      node.x += node.dx;
      node.y += node.dy;

      if (node.x < 0 || node.x > canvas.width) node.dx *= -1;
      if (node.y < 0 || node.y > canvas.height) node.dy *= -1;

      const distMouse = Math.hypot(mouse.x - node.x, mouse.y - node.y);
      if (mouse.x && distMouse < 80) {
        node.color = "#e41212f5";
        node.radius = 3;
      } else {
        node.color = "#000";
        node.radius = 2;
      }
    });

    requestAnimationFrame(drawGraph);
  }

  canvas.addEventListener("mousemove", e => { mouse.x = e.clientX; mouse.y = e.clientY; });
  canvas.addEventListener("mouseleave", () => { mouse.x = null; mouse.y = null; });

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = 700;
  });

  drawGraph();
})();


/* ===============================================================
   NAVBAR
   =============================================================== */
// Seleciona a navbar
const navbar = document.querySelector('.navbar');

// Quando rolar a página
window.addEventListener('scroll', () => {
  if (window.scrollY > window.innerHeight * 0.8) {
    // Quando passar da seção de capa
    navbar.classList.add('scrolled');
  } else {
    // Na seção de capa
    navbar.classList.remove('scrolled');
  }
});


/* ===============================================================
   MENU MOBILE
   =============================================================== */
(function mobileMenu() {
  if (window.innerWidth > 768) return;

  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (!navToggle || !navLinks) return;

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });

  // fecha menu ao clicar em um link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('show'));
  });

  // remove 'show' se redimensionar para desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      navLinks.classList.remove('show');
    }
  });
})();


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