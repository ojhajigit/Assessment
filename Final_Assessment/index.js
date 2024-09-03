const https = require("https");
const http = require("http");

const PORT = 8000;

const fetchHTML = (url, callback) => {
  https.get(url, (res) => {
      let data = "";

      res.on("data", (e) => {
        data += e;
      });

      res.on("end", () => {
        callback(data);
      });
    })
    .on("error", (err) => {
      console.error("Error fetching HTML:", err.message);
    });
};

const parseStories = (html) => {
  const stories = [];
  const storyStart = '<h3 class="latest-stories__item-headline">';
  const storyEnd = "</h3>";
  let startIndex = html.indexOf(storyStart);

  while (startIndex !== -1 && stories.length < 6) {
    let endIndex = html.indexOf(storyEnd, startIndex);
    let storyHtml = html.slice(startIndex, endIndex + storyEnd.length);

    let titleStart = storyHtml.indexOf(">") + 1;
    let titleEnd = storyHtml.indexOf("</a>");
    let title = storyHtml.slice(titleStart, titleEnd).trim();

    let linkStart = storyHtml.indexOf('href="') + 6;
    let linkEnd = storyHtml.indexOf('"', linkStart);
    let link = `https://time.com${storyHtml.slice(linkStart, linkEnd)}`;

    stories.push({ title, link });

    startIndex = html.indexOf(storyStart, endIndex);
  }

  return stories;
};

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/getTimeStories") {
    fetchHTML("https://time.com", (html) => {
      const stories = parseStories(html);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(stories));
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

server.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
