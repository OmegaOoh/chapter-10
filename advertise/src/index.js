const express = require("express");
const path = require("path");

// Load advertise data from JSON file
const data = require(path.join(__dirname, "..", "advert_data.json"));

//
// Starts the microservice
//
//
async function startMicroservice(port) {
  app = express();
  app.use(express.json());

  // Serve Image files
  app.use("/images", express.static(path.join(__dirname, "../public/images")));

  //
  // HTTP GET route to retrieve advert data
  //
  app.get("/ads", async (req, res) => {
    res.json(data);
  });

  app.listen(port, () => {
    // Starts the HTTP server.
    console.log("Microservice online");
  });
}

//
// Application entry point
//
async function main() {
  if (!process.env.PORT) {
    throw new Error(
      "Please specify the port number for HTTP server with environment variable PORT.",
    );
  }

  const PORT = process.env.PORT;
  await startMicroservice(PORT);
}

if (require.main === module) {
  // Only start the microservice if this script is the "main" module.
  main().catch((err) => {
    console.error("Microservice failed to start:");
    console.error((err && err.stack) || err);
  });
} else {
  module.exports = {
    startMicroservice,
  };
}
