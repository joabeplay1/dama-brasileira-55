const hqDiv = document.getElementById("hq");
const loading = document.getElementById("loading");

async function gerarHQ() {
  const tema = document.getElementById("tema").value;

  loading.style.display = "block";
  hqDiv.innerHTML = "";

  // 🧠 1. Gerar roteiro (IA texto)
  const roteiro = await gerarRoteiro(tema);

  const cenas = roteiro.split("\n");

  for (let cena of cenas) {

    if (!cena.trim()) continue;

    // 🎨 2. Gerar imagem por cena
    const imgUrl = await gerarImagem(cena);

    const div = document.createElement("div");
    div.className = "hq-page";
    div.innerHTML = `
      <p>${cena}</p>
      <img src="${imgUrl}">
    `;

    hqDiv.appendChild(div);
  }

  loading.style.display = "none";
}

// 🧠 IA de roteiro (simples mock ou API real)
async function gerarRoteiro(tema) {
  const prompt = `Crie uma história em quadrinhos curta sobre: ${tema}. Separe em 5 cenas.`;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer SUA_API_KEY"
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }]
    })
  });

  const data = await res.json();
  return data.choices[0].message.content;
}

// 🎨 IA de imagem (ex: Pollinations AI gratuita)
async function gerarImagem(prompt) {
  return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`;
}
