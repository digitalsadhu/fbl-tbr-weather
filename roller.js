import fs from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const wind = JSON.parse(
  fs.readFileSync(join(__dirname, "./data/wind.json"), "utf-8")
);
const snowfall = JSON.parse(
  fs.readFileSync(join(__dirname, "./data/snowfall.json"), "utf-8")
);
const cold = JSON.parse(
  fs.readFileSync(join(__dirname, "./data/cold.json"), "utf-8")
);

const d6 = () => Math.ceil(Math.random() * 6);

const rollWind = () => {
  const roll = d6();
  if (roll < 4) return wind[0];
  if (roll < 6) return wind[1];
  return wind[2];
};

const rollSnowfall = () => {
  const roll = d6();
  if (roll < 4) return snowfall[0];
  if (roll < 6) return snowfall[1];
  return snowfall[2];
};

const rollCold = (coldModifier) => {
  const roll = d6() + coldModifier;
  if (roll < 4) return cold[0];
  if (roll < 6) return cold[1];
  return cold[2];
};

const roller = () => {
  const windRoll = rollWind();
  const snowfallRoll = rollSnowfall();
  const coldRoll = rollCold(windRoll.cold);

  const effects = new Map();

  for (const effect of windRoll.effects) {
    effects.set(effect.title, effect);
  }

  for (const { title, description, condition } of snowfallRoll.effects) {
    if (!effects.has(title)) effects.set(title, { title, description });
    else {
      if (condition && condition.value === windRoll.description) {
        effects.set(title, {
          title,
          description: `${effects.get(title).description} ${description}`,
        });
      }
    }
  }

  return {
    wind: windRoll,
    snow: snowfallRoll,
    effects: Array.from(effects.values()),
    cold: coldRoll,
  };
};

export default roller;
