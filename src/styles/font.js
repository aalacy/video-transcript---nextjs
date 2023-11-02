import {
  Inter,
  Lora,
  Lato,
  Amatic_SC,
  Bebas_Neue,
  Gabarito,
  Orbitron,
  Oswald,
  Raleway,
  Roboto,
  Vina_Sans,
  Young_Serif,
  Poppins,
} from "next/font/google";

// define your variable fonts
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
});
const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "700"],
});
const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
});
const amaticSC = Amatic_SC({
  subsets: ["latin"],
  weight: ["400", "700"],
});
const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
});

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "700"],
});
const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "700"],
});
const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
});
const vinaSans = Vina_Sans({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});
const youngSerif = Young_Serif({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});
const gabrioto = Gabarito({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export {
  inter,
  lora,
  lato,
  amaticSC,
  bebasNeue,
  gabrioto,
  orbitron,
  oswald,
  raleway,
  roboto,
  vinaSans,
  youngSerif,
  poppins,
};
