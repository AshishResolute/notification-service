import { app, PORT } from "./src/routes/main.js";
import db from "./src/db/db.js";

app.listen(PORT, () => {
  console.log(`Server running at PORT:${PORT}`);
});
