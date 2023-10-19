import {
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
} from "@/styles/font";

export const DRAWER_WIDTH = 240;

export const GOOGLE_FONTS = {
  "Amatic SC": amaticSC.style.fontFamily,
  BebasNeue: bebasNeue.style.fontFamily,
  Gabarito: gabrioto.style.fontFamily,
  Inter: inter.style.fontFamily,
  Lato: lato.style.fontFamily,
  Orbitron: orbitron.style.fontFamily,
  Oswald: oswald.style.fontFamily,
  Raleway: raleway.style.fontFamily,
  Roboto: roboto.style.fontFamily,
  "Vina Sans": vinaSans.style.fontFamily,
  "Young Serif": youngSerif.style.fontFamily,
};
export const fontWeights = ["Light", "Bold", "Italic"];

export const MIN_FONT = 16;
export const MAX_FONT = 42;
export const MIN_POSITION = 0;
export const MAX_POSITION = 90;

// Jobs
export const JOB_MONSTER_TRANSCRIPTION = "monster-transcription";
export const JOB_FILE_UPLOAD = "file-upload";
export const JOB_GENERATE_VIDEO = "generate-video";

export const isoLangs = [
  {
    code: "en",
    name: "English",
  },
  {
    code: "af",
    name: "Afrikaans",
  },
  {
    code: "am",
    name: "Amharic",
  },
  {
    code: "ar",
    name: "Arabic",
  },
  {
    code: "as",
    name: "Assamese",
  },
  {
    code: "az",
    name: "Azerbaijani",
  },
  {
    code: "ba",
    name: "Bashkir",
  },
  {
    code: "be",
    name: "Belarusian",
  },
  {
    code: "bg",
    name: "Bulgarian",
  },
  {
    code: "bn",
    name: "Bengali",
  },
  {
    code: "bo",
    name: "Tibetan",
  },
  {
    code: "br",
    name: "Breton",
  },
  {
    code: "bs",
    name: "Bosnian",
  },
  {
    code: "ca",
    name: "Catalan",
  },
  {
    code: "cs",
    name: "Czech",
  },
  {
    code: "cy",
    name: "Welsh",
  },
  {
    code: "da",
    name: "Danish",
  },
  {
    code: "de",
    name: "German",
  },
  {
    code: "el",
    name: "Greek",
  },
  {
    code: "es",
    name: "Spanish",
  },
  {
    code: "et",
    name: "Estonian",
  },
  {
    code: "eu",
    name: "Basque",
  },
  {
    code: "fa",
    name: "Persian",
  },
  {
    code: "fi",
    name: "Finnish",
  },
  {
    code: "fo",
    name: "Faroese",
  },
  {
    code: "fr",
    name: "French",
  },
  {
    code: "gl",
    name: "Galician",
  },
  {
    code: "gu",
    name: "Gujarati",
  },
  {
    code: "ha",
    name: "Hausa",
  },
  {
    code: "haw",
    name: "Hawaiian",
  },
  {
    code: "he",
    name: "Hebrew",
  },
  {
    code: "hi",
    name: "Hindi",
  },
  {
    code: "hr",
    name: "Croatian",
  },
  {
    code: "ht",
    name: "Haitian Creole",
  },
  {
    code: "hu",
    name: "Hungarian",
  },
  {
    code: "hy",
    name: "Armenian",
  },
  {
    code: "id",
    name: "Indonesian",
  },
  {
    code: "is",
    name: "Icelandic",
  },
  {
    code: "it",
    name: "Italian",
  },
  {
    code: "ja",
    name: "Japanese",
  },
  {
    code: "jw",
    name: "Javanese",
  },
  {
    code: "ka",
    name: "Georgian",
  },
  {
    code: "kk",
    name: "Kazakh",
  },
  {
    code: "km",
    name: "Khmer",
  },
  {
    code: "kn",
    name: "Kannada",
  },
  {
    code: "ko",
    name: "Korean",
  },
  {
    code: "la",
    name: "Latin",
  },
  {
    code: "lb",
    name: "Luxembourgish",
  },
  {
    code: "ln",
    name: "Lingala",
  },
  {
    code: "lo",
    name: "Lao",
  },
  {
    code: "lt",
    name: "Lithuanian",
  },
  {
    code: "lv",
    name: "Latvian",
  },
  {
    code: "mg",
    name: "Malagasy",
  },
  {
    code: "mi",
    name: "Maori",
  },
  {
    code: "mk",
    name: "Macedonian",
  },
  {
    code: "ml",
    name: "Malayalam",
  },
  {
    code: "mn",
    name: "Mongolian",
  },
  {
    code: "mr",
    name: "Marathi",
  },
  {
    code: "ms",
    name: "Malay",
  },
  {
    code: "mt",
    name: "Maltese",
  },
  {
    code: "my",
    name: "Burmese",
  },
  {
    code: "ne",
    name: "Nepali",
  },
  {
    code: "nl",
    name: "Dutch",
  },
  {
    code: "nn",
    name: "Norwegian Nynorsk",
  },
  {
    code: "no",
    name: "Norwegian",
  },
  {
    code: "oc",
    name: "Occitan",
  },
  {
    code: "pa",
    name: "Punjabi",
  },
  {
    code: "pl",
    name: "Polish",
  },
  {
    code: "ps",
    name: "Pashto",
  },
  {
    code: "pt",
    name: "Portuguese",
  },
  {
    code: "ro",
    name: "Romanian",
  },
  {
    code: "ru",
    name: "Russian",
  },
  {
    code: "sa",
    name: "Sanskrit",
  },
  {
    code: "sd",
    name: "Sindhi",
  },
  {
    code: "si",
    name: "Sinhalese",
  },
  {
    code: "sk",
    name: "Slovak",
  },
  {
    code: "sl",
    name: "Slovenian",
  },
  {
    code: "sn",
    name: "Shona",
  },
  {
    code: "so",
    name: "Somali",
  },
  {
    code: "sq",
    name: "Albanian",
  },
  {
    code: "sr",
    name: "Serbian",
  },
  {
    code: "su",
    name: "Sundanese",
  },
  {
    code: "sv",
    name: "Swedish",
  },
  {
    code: "sw",
    name: "Swahili",
  },
  {
    code: "ta",
    name: "Tamil",
  },
  {
    code: "te",
    name: "Telugu",
  },
  {
    code: "tg",
    name: "Tajik",
  },
  {
    code: "th",
    name: "Thai",
  },
  {
    code: "tk",
    name: "Turkmen",
  },
  {
    code: "tl",
    name: "Tagalog",
  },
  {
    code: "tr",
    name: "Turkish",
  },
  {
    code: "tt",
    name: "Tatar",
  },
  {
    code: "uk",
    name: "Ukrainian",
  },
  {
    code: "ur",
    name: "Urdu",
  },
  {
    code: "uz",
    name: "Uzbek",
  },
  {
    code: "vi",
    name: "Vietnamese",
  },
  {
    code: "yi",
    name: "Yiddish",
  },
  {
    code: "yo",
    name: "Yoruba",
  },
  {
    code: "zh",
    name: "Chinese",
  },
];