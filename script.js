// Função para criar flores de fundo
function createBackgroundFlowers() {
  const backgroundFlowers = document.querySelector(".background-flowers")

  // Criar 8 flores de fundo
  for (let i = 0; i < 8; i++) {
    const flower = document.createElement("div")
    flower.className = "flower floating-flower"

    // Posicionar aleatoriamente
    const left = 20 + Math.random() * 60
    const top = 10 + Math.random() * 80
    const delay = Math.random() * 6
    const duration = 5 + Math.random() * 3

    flower.style.left = `${left}%`
    flower.style.top = `${top}%`
    flower.style.animationDelay = `${delay}s`
    flower.style.animationDuration = `${duration}s`

    backgroundFlowers.appendChild(flower)
  }
}

// Função para criar flores decorativas na parte inferior
function createBottomFlowers() {
  const bottomFlowers = document.querySelector(".bottom-flowers")

  // Criar 5 flores na parte inferior
  for (let i = 0; i < 5; i++) {
    const flower = document.createElement("div")
    flower.className = "bottom-flower floating-flower"
    flower.style.animationDelay = `${i * 0.3}s`

    bottomFlowers.appendChild(flower)
  }
}

// Função para redirecionar após o carregamento
function redirectAfterLoading() {
  setTimeout(() => {
    // Aqui você redirecionaria para a página principal
    // window.location.href = 'main.html';
    console.log("Carregamento concluído!")

    // Para fins de demonstração, vamos apenas esconder a tela de carregamento
    document.querySelector(".loading-screen").style.opacity = "0"
    document.querySelector(".loading-screen").style.transition = "opacity 1s ease"
    setTimeout(() => {
      document.querySelector(".loading-screen").style.display = "none"
    }, 1000)
  }, 4000) // 4 segundos
}

// Inicializar quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", () => {
  createBackgroundFlowers()
  createBottomFlowers()
  redirectAfterLoading()
})
