import { SPECIAL_MARKS, SUBTITLES_LENGTH } from "@/constants";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js";
import duration from "dayjs/plugin/duration.js";
dayjs.extend(duration);
dayjs.extend(customParseFormat);

function ParserError(message, error) {
  this.message = message;
  this.error = error;
}

ParserError.prototype = Object.create(Error.prototype);

const TIMESTAMP_REGEXP = /([0-9]+)?:?([0-9]{2}):([0-9]{2}\,[0-9]{2,3})/;

export const compileVTT = (cues, values) => {
  let output = "";
  for (let cue of cues) {
    const updated = values.find((val) => val.identifier === cue.identifier);

    output += "\n";
    output += `${cue.identifier}\n`;
    output += `${cue.startOrg} --> ${cue.endOrg}`;
    output += cue.styles ? ` ${cue.styles}` : "";
    output += `\n${updated.text}`;
    output += "\n";
  }

  return output;
};

export const parseVtt = (input, options) => {
  if (!options) {
    options = {};
  }

  const { meta = false, strict = true } = options;

  if (typeof input !== "string") {
    throw new ParserError("Input must be a string");
  }

  input = input.trim();
  input = input.replace(/\r\n/g, "\n");
  input = input.replace(/\r/g, "\n");

  const parts = input.split("\n\n");

  // nothing of interests, return early
  if (parts.length === 0) {
    return { valid: true, strict, cues: [], errors: [] };
  }

  const { cues, errors } = parseCues(parts, strict);

  if (strict && errors.length > 0) {
    throw errors[0];
  }

  const headerMeta = meta ? parseMeta(headerParts) : null;

  const result = { valid: errors.length === 0, strict, cues, errors };

  if (meta) {
    result.meta = headerMeta;
  }

  return result;
};

function parseMeta(headerParts) {
  const meta = {};
  headerParts.slice(1).forEach((header) => {
    const splitIdx = header.indexOf(":");
    const key = header.slice(0, splitIdx).trim();
    const value = header.slice(splitIdx + 1).trim();
    meta[key] = value;
  });
  return Object.keys(meta).length > 0 ? meta : null;
}

function parseCues(cues, strict) {
  const errors = [];

  const parsedCues = cues
    .map((cue, i) => {
      try {
        return parseCue(cue, i, strict);
      } catch (e) {
        errors.push(e);
        return null;
      }
    })
    .filter(Boolean);

  return {
    cues: parsedCues,
    errors,
  };
}

/**
 * Parse a single cue block.
 *
 * @param {array} cue Array of content for the cue
 * @param {number} i Index of cue in array
 *
 * @returns {object} cue Cue object with start, end, text and styles.
 *                       Null if it's a note
 */
function parseCue(cue, i, strict) {
  let identifier = "";
  let start;
  let end;
  let text = "";
  let styles = "";

  // split and remove empty lines
  const lines = cue.split("\n").filter(Boolean);

  if (lines.length > 0 && lines[0].trim().startsWith("NOTE")) {
    return null;
  }

  if (lines.length === 1 && !lines[0].includes("-->")) {
    throw new ParserError(`Cue identifier cannot be standalone (cue #${i})`);
  }

  if (
    lines.length > 1 &&
    !(lines[0].includes("-->") || lines[1].includes("-->"))
  ) {
    const msg = `Cue identifier needs to be followed by timestamp (cue #${i})`;
    throw new ParserError(msg);
  }

  if (lines.length > 1 && lines[1].includes("-->")) {
    identifier = lines.shift();
  }

  const times = typeof lines[0] === "string" && lines[0].split(" --> ");

  if (
    times.length !== 2 ||
    !validTimestamp(times[0]) ||
    !validTimestamp(times[1])
  ) {
    throw new ParserError(`Invalid cue timestamp (cue #${i})`);
  }

  const startOrg = times[0];
  const endOrg = times[1];

  start = dayObj(times[0]);
  end = dayObj(times[1]);

  if (strict) {
    if (start > end) {
      throw new ParserError(`Start timestamp greater than end (cue #${i})`);
    }

    if (end <= start) {
      throw new ParserError(`End must be greater than start (cue #${i})`);
    }
  }

  if (!strict && end < start) {
    throw new ParserError(
      `End must be greater or equal to start when not strict (cue #${i})`,
    );
  }

  // TODO better style validation
  styles = times[1].replace(TIMESTAMP_REGEXP, "").trim();

  lines.shift();

  text = lines.join("\n");

  if (!text) {
    return false;
  }

  return { identifier, start, startOrg, end, endOrg, text, styles };
}

function validTimestamp(timestamp) {
  return TIMESTAMP_REGEXP.test(timestamp);
}

function parseTimestamp(timestamp) {
  const matches = timestamp.match(TIMESTAMP_REGEXP);
  let secs = parseFloat(matches[1] || 0) * 60 * 60; // hours
  secs += parseFloat(matches[2]) * 60; // mins
  secs += parseFloat(matches[3]);
  // secs += parseFloat(matches[4]);
  return secs;
}

const dayObj = (timestamp) => {
  const [time, milliseconds] = timestamp.split(",");
  const hours = dayjs(time, "HH:mm:ss").hour();
  const minutes = dayjs(time, "HH:mm:ss").minute();
  const seconds = dayjs(time, "HH:mm:ss").second();
  const mili = Number((+milliseconds / 1000).toFixed(1));

  return hours * 3600 + minutes * 60 + seconds + mili;
};

export const downloadMedia = (fileName, output) => {
  const anchor = document.createElement("a");
  anchor.href = output;
  anchor.download = fileName;

  // Append to the DOM
  document.body.appendChild(anchor);

  // Trigger `click` event
  anchor.click();

  // Remove element from DOM
  document.body.removeChild(anchor);
};

export const saveText = (fileName, text) => {
  var anchor = document.createElement("a");
  anchor.download = fileName;

  var t = new Blob([text], {
    type: "text/plain",
  });
  anchor.href = window.URL.createObjectURL(t);
  anchor.click();
};

const checkSpecialMark = (cue, idx, vars) => {
  if (SPECIAL_MARKS.includes(cue.text.at(-1))) {
    vars.delta++;
    vars.isNew = true;
    vars.offset = SUBTITLES_LENGTH - 1 - (+idx % SUBTITLES_LENGTH);

    return true;
  }
  return false;
};

export const extractVTT = (data) => {
  const [startOrg, second] = data.split("-->");
  const [endOrg, text] = second.split("::");
  return {
    start: dayObj(startOrg),
    startOrg: startOrg.trim(),
    end: dayObj(endOrg),
    endOrg: endOrg.trim(),
    text: text.trim(),
  };
};

const addCueToList = (newCues, cue) => {
  newCues.at(-1).cues.push(cue);
};

const checkAndAddTextWithEffect = (
  newCues,
  cue,
  template,
  curIndex,
  hasEffect,
  metadata,
) => {
  const { secondaryColour, backColourWithoutAlpha, primaryColourWithoutAlpha } =
    metadata;

  addCueToList(newCues, cue);
};

export const parseRawVtt = (data, metadata) => {
  const vars = {
    delta: 0,
    isNew: false,
    offset: 0,
  };
  const { template } = metadata;
  const newCues = [];
  let identifier = 0;

  for (let idx in data) {
    const cue = extractVTT(data[idx]);
    const curIndex = (+idx + vars.offset) % SUBTITLES_LENGTH;
    cue.index = curIndex;
    if (curIndex === 0 || vars.isNew || +idx === data.length) {
      newCues.push({
        identifier,
        cues: [cue],
      });
      identifier++;
      vars.isNew = false;
      checkSpecialMark(cue, idx, vars);
    } else {
      const hasMark = checkSpecialMark(cue, idx, vars);
      checkAndAddTextWithEffect(
        newCues,
        cue,
        template,
        curIndex,
        hasMark,
        metadata,
      );
    }
  }

  return newCues;
};

export const generateRawVtt = (content) => {
  let output = [];
  for (const { cues } of content) {
    for (const { startOrg, endOrg, text } of cues) {
      output.push(`${startOrg} --> ${endOrg}:: ${text}`);
    }
  }
  return output;
};

export const normalizeCue = (newCue) => {
  const { identifier, cues } = newCue;
  return {
    identifier,
    start: cues[0].start,
    text: cues.map(({ text }) => text).join(" "),
  };
};

export const generateCues2Vtt = (newCues) => {
  let output = "";
  for (let { identifier, cues } of newCues) {
    output += "\n";
    output += `${identifier}\n`;
    output += `${cues[0].startOrg} --> ${cues.at(-1).endOrg}`;
    output += `\n${cues.map(({ text }) => text).join(" ")}`;
    output += "\n";
  }
  return output;
};
