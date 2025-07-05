document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.querySelector('.search-box button');
    const searchInput = document.querySelector('.search-box input');
    const weatherImg = document.querySelector('.weather-box img');
    const tempEl = document.querySelector('.temperature');
    const descEl = document.querySelector('.description');
    const humidityEl = document.querySelector('.humidity span');
    const windEl = document.querySelector('.wind span');
    const forecastDays = document.querySelector('.forecast-days');

    const APIKey = "46526a701c0757d0ff35a5303a9d8bfe";

    searchBtn.addEventListener('click', getWeather);
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') getWeather();
    });

    function getWeather() {
        const city = searchInput.value.trim();
        if (city === '') return;

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
            .then(res => res.json())
            .then(data => showWeather(data))
            .catch(() => alert("City not found"));

        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${APIKey}`)
            .then(res => res.json())
            .then(data => showForecast(data))
            .catch(() => console.log("Forecast error"));
    }

    function showWeather(data) {
        if (data.cod === '404') return alert("City not found");

        const temp = data.main.temp.toFixed(1);
        const desc = data.weather[0].description.toLowerCase();

        tempEl.innerHTML = `${temp} <span>°C</span>`;
        descEl.innerHTML = data.weather[0].description;
        humidityEl.innerHTML = `${data.main.humidity}%`;
        windEl.innerHTML = `${parseInt(data.wind.speed)} Km/h`;

        changeImage(desc);
    }

    function changeImage(desc) {
        if (desc.includes('clear')) weatherImg.src = 'Images/clear.png';
        else if (desc.includes('cloud') || desc.includes('overcast')) weatherImg.src = 'Images/cloud.png';
        else if (desc.includes('rain') || desc.includes('drizzle')) weatherImg.src = 'Images/rain.png';
        else if (desc.includes('snow')) weatherImg.src = 'Images/snow.png';
        else if (desc.includes('smoke') || desc.includes('haze') || desc.includes('fog') || desc.includes('mist')) weatherImg.src = 'Images/smoke.png';
        else if (desc.includes('storm') || desc.includes('thunderstorm')) weatherImg.src = 'Images/storm.png';
        else if (desc.includes('wind')) weatherImg.src = 'Images/windCloud.png';
        else weatherImg.src = 'Images/404.png';
    }

    function showForecast(data) {
        forecastDays.innerHTML = '';
        const shownDays = {};

        data.list.forEach(item => {
            const date = new Date(item.dt * 1000);
            const day = date.toLocaleDateString('en-US', { weekday: 'short' });
            const key = date.toDateString();

            if (!shownDays[key]) {
                const maxTemp = Math.round(item.main.temp_max);
                const minTemp = Math.round(item.main.temp_min);
                const desc = item.weather[0].description.toLowerCase();

                let icon = 'Images/404.png';
                if (desc.includes('clear')) icon = 'Images/clear.png';
                else if (desc.includes('cloud') || desc.includes('overcast')) icon = 'Images/cloud.png';
                else if (desc.includes('rain') || desc.includes('drizzle')) icon = 'Images/rain.png';
                else if (desc.includes('snow')) icon = 'Images/snow.png';
                else if (desc.includes('smoke') || desc.includes('haze') || desc.includes('fog') || desc.includes('mist')) icon = 'Images/smoke.png';
                else if (desc.includes('storm') || desc.includes('thunderstorm')) icon = 'Images/storm.png';
                else if (desc.includes('wind')) icon = 'Images/windCloud.png';

                const card = document.createElement('div');
                card.className = 'forecast-card';
                card.innerHTML = `
                    <div class="day">${day}</div>
                    <img src="${icon}">
                    <div class="temp">${maxTemp}° / ${minTemp}°</div>
                `;
                forecastDays.appendChild(card);
                shownDays[key] = true;
            }
            const details = document.querySelector('.weather-details');
            details.classList.add('show');

        });
    }
});
