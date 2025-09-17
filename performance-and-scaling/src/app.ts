import http from "http";
const port = parseInt(process.argv[2] || "3000");

interface Article {
  title: string;
}

const articles: Article[] = [
  { title: "Understanding TypeScript Interfaces" },
  { title: "A Guide to Node.js Streams" },
  { title: "Exploring Modern JavaScript Features" },
  { title: "Effective Stress Management Techniques" },
  { title: "How to Learn German by Yourself" },
  { title: "Building Scalable Systems with Node.js" },
  { title: "Database Optimization Strategies" },
  { title: "Mastering Real-Time Communication" },
  { title: "Interview Preparation for Backend Developers" },
  { title: "Implementing File Streaming with AWS S3" },
];

const server = http.createServer((req, res) => {
  const randomIndex = Math.floor(Math.random() * articles.length);
  const joke = articles[randomIndex];

  const responsePayload = JSON.stringify({
    joke,
    port,
    processID: process.pid,
  });
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(responsePayload);
});
server.listen(port, () => {
  console.log(`Joke server is running on port ${port}`);
});
