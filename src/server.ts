import app from "./app";
import config from "./app/config";
import mongoose from "mongoose";
import seedSuperAdmin from "./app/Db";

async function main() {
  try {
    await mongoose.connect(config.database_url as string, { autoIndex: true });
    seedSuperAdmin();
    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
