const { app } = require("./app");

const port = process.env.PORT || 5000;

const server = app.listen(port, () => console.log(`Listening on port ${port}`));
process.on("SIGTERM", () => {
  console.info("SIGTERM signal received.");
  console.log("Closing http server.");
  server.close(() => {
    console.log("Http server closed.");
  });
});
