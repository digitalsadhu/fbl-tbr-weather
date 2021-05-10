import fs from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import fastify from "fastify";
import nunjucks from "nunjucks";
import pov from "point-of-view";
import roller from './roller.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = fastify();

app.register(pov, { engine: { nunjucks } });

app.get("/", (request, reply) => {
  reply.send('ok');
});

app.get("/bitter-reach/weather/styles.css", (request, reply) => {
  reply.type('text/css').send(fs.createReadStream(join(__dirname, './compiled.css')));
});

app.get("/bitter-reach/weather", (request, reply) => {
    const result = roller();
    reply.view('templates/result.njk', result);
});

app.listen(process.env.PORT || 3000, "0.0.0.0");
