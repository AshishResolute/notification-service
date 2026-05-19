import { app } from "./src/routes/main.js";
import db from "./src/db/db.js";
import { SERVER_PORT } from "./src/utils/index.js";


const PORT = SERVER_PORT||3000


app.listen(PORT, () => {
  console.log(`Server running at PORT:${PORT}`);
});
