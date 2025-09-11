const URL = "http://localhost:5001";

async function consumeAPI(signal) {
  const response = await fetch(URL, signal);
  console.log("response", response);
  const readerObj = response.body
    .pipeThrough(new TextDecoderStream())
    .pipeThrough(parseChunks());

  return readerObj;
}

function parseChunks() {
  let buffer = "";
  return new TransformStream({
    transform(chunk, ctrl) {
      buffer += chunk;

      const lines = buffer.split("\n");
      buffer = lines.pop();

      for (const line of lines) {
        try {
          ctrl.enqueue(JSON.parse(line));
        } catch (error) {
          console.error("Failed to parse JSON:", line, error);
        }
      }
    },
    flush(ctrl) {
      if (buffer.trim()) {
        try {
          ctrl.enqueue(JSON.parse(buffer));
        } catch (error) {
          console.error("Failed to parse JSON during Flush ", buffer, error);
        }
      }
    },
  });
}

function displayData(element) {
  return new WritableStream({
    write({ title, vote, poster }) {
      const article = `
        <article>
          <div class="text">
            <h2>${title}</h2>
            <h3>${vote}</h3>
            <a href="#">${poster}</a>
          </div>
        </article>
      
      `;

      element.innerHTML += article;
    },
  });
}

const start = document.getElementById("start");
const end = document.getElementById("stop");
const cards = document.getElementById("cards");

let abortController = new AbortController();

start.addEventListener("click", async () => {
  const readableStream = await consumeAPI(abortController.signal);
  readableStream.pipeTo(displayData(cards));
});

stop.addEventListener("click", async () => {
  abortController.abort();
  abortController = new AbortController();
});
