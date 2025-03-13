const express = require('express');
const bodyParser = require("body-parser");
const schoolRoutes = require("./routes/school-route.js");
const sequelize = require("./config/db-config.js");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", schoolRoutes);

sequelize.sync().then(() => {
    app.listen(PORT, "0.0.0.0", () => {
        console.log(`Server is running on ${PORT}`);
    });
}).catch(err => {
    console.error('Unable to connect to database:', err);
});