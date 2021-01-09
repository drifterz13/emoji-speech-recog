import { useState } from "preact/hooks";
import { emojiMap } from "./emojimap";

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

// We need to combine all possible emoji name to `grammar` below to provide to the SpeechAPI
// but we have too many emojis which cause the `grammar` string to exceed Javascript string length
// so we have to get rid some data to solve this issue.
const emojis = Object.keys(emojiMap)
  .filter((s) => !s.includes("_") && !isNumeric(s))
  .slice(0, 400);

const grammar =
  "#JSGF V1.0; grammar emojis; public <emoji> = " + emojis.join(" | ") + " ;";

// Ref: https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition
const SpeechRecognition =
  window.SpeechRecognition || (window as any).webkitSpeechRecognition;
const SpeechGrammarList =
  window.SpeechGrammarList || (window as any).webkitSpeechGrammarList;

const recognition = new SpeechRecognition();
const speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = "en-US";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

export default function Home(props) {
  const [text, setText] = useState("");
  const [textRecognition, setTextRecognition] = useState("");

  recognition.onaudiostart = () => {
    console.log("Gonna start record your voice ...");
  };

  recognition.onresult = (event) => {
    const { transcript } = event.results[0][0];
    console.log("recog: ", transcript, emojiMap[transcript]);
    setTextRecognition(transcript);

    if (emojiMap[transcript]) {
      const updatedText = text
        .split("")
        .map((char, idx) =>
          idx === text.length - 1 ? emojiMap[transcript] : char
        )
        .join("");

      setText(updatedText);
    }
  };

  recognition.onerror = (event) => {
    console.log("Something went wrong ...", event.error, event.message);
  };

  return (
    <>
      <div className="App">
        <h1>Emoji recognisation app.</h1>
        <p>The recognition will start when you type ":"</p>
        <input
          type="text"
          value={text}
          onInput={(e) => {
            // ^ Update this to onChange if you're using React.
            setText(e.currentTarget.value);
          }}
          onKeyDown={(e) => {
            if (e.key === ":" || e.keyCode === 186) {
              console.log("gonna start recognition ..");
              recognition.start();
            }
          }}
        />
        <p>Recognite word: {textRecognition}</p>
        <hr />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(10, 1fr)",
            gridTemplateRows: "repeat(40, 1fr)",
          }}
        >
          {emojis.map((emoji) => (
            <div>
              {emoji} {emojiMap[emoji]}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
