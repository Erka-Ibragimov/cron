import express from "express";

export const initializeServer = (port: number | string) => {
  const app = express();

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};
