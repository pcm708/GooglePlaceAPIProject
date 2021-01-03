import supertest from 'supertest';
const request = supertest('api.openweathermap.org');
import pkg from 'chai';
const { expect } = pkg;

describe('Open Weather Map:', function() {

  it('GET city weather details /', () => {
    return request
      .get('/data/2.5/weather?q=Mumbai&appid=032141f10cb32d52af49c43275a394ca')
      .set("Content-Type","application/json")
      .then((res) => {
        expect(res.body.cod).to.be.eq(200);
        console.log(`Time zone: ${res.body.timezone}`);
        console.log(`Wind speed: ${res.body.wind.speed}`);
        console.log(`Sys country: ${res.body.sys.country}`);
        console.log(`Base: ${res.body.base}`);
        console.log(`Weather: ${res.body.weather[0].description}`);
        console.log(`Longitude: ${res.body.coord.lon}`);
      })
  })
})