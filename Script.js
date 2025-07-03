const data = null;

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener('readystatechange', function () {
	if (this.readyState === this.DONE) {
		console.log(this.responseText);
	}
});

xhr.open('GET', 'https://air-quality-by-api-ninjas.p.rapidapi.com/v1/airquality?city=Seattle');
xhr.setRequestHeader('x-rapidapi-key', 'c547454a59msh9395dfe29772cd5p174cbbjsnc4d07e40cbf8');
xhr.setRequestHeader('x-rapidapi-host', 'air-quality-by-api-ninjas.p.rapidapi.com');

xhr.send(data);