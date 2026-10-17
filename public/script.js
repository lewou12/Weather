// Onde "seu-projeto.workers.dev" ou seu domínio configurado (ex: borim.online) é a URL do seu Cloudflare
const apiUrl = 'https://weather-5gk.pages.dev/weather?city=Curitiba'; 
// ou '/api/weather?city=Curitiba' se estiver usando Pages Functions no mesmo domínio

async function getWeather() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    console.log(data);
    // Aqui você manipula o DOM para mostrar a temperatura
    // document.getElementById('temp').innerText = `${data.main.temp} °C`;
    
  } catch (error) {
    console.error('Erro:', error);
  }
}

getWeather();