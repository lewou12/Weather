export default {
  async fetch(request, env) {
    // 1. Pegar a cidade que o frontend solicitou pela URL (ex: ?city=Curitiba)
    const url = new URL(request.url);
    const city = url.searchParams.get('city');

    if (!city) {
      return new Response('A cidade é obrigatória', { status: 400 });
    }

    // 2. Montar a URL da OpenWeather usando o Secret (env.OPENWEATHER_API_KEY)
    const openWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${env.OPENWEATHER_API_KEY}&units=metric&lang=pt_br`;

    try {
      // 3. Fazer a requisição para a OpenWeather
      const weatherResponse = await fetch(openWeatherUrl);
      const data = await weatherResponse.json();

      // 4. Retornar os dados para o seu site
      // IMPORTANTE: Adicionar headers de CORS para permitir que seu frontend leia os dados
      return new Response(JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*', // Na produção, troque '*' pelo seu domínio (ex: 'https://borim.online')
          'Access-Control-Allow-Methods': 'GET',
        },
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Erro ao buscar o clima' }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }
  }
};