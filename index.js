import fastify from "fastify";
import nunjucks from "nunjucks";
import pov from "point-of-view";
import roller from './roller.js';

const app = fastify();

app.register(pov, { engine: { nunjucks } });

app.get("/", (request, reply) => {
  reply.send('ok');
});

app.get("/weather", (request, reply) => {
  reply.view('templates/weather.njk');
});

app.get("/weather/result", (request, reply) => {
    const result = roller();
    reply.view('templates/result.njk', result);
});

app.listen(process.env.PORT || 3000, "0.0.0.0");
