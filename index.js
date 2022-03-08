const express = require("express");
const fs = require("fs");
const path = require("path");
const fastcsv = require("fast-csv");

const app = express();

// static directory // user can access through url
app.use("/public", express.static(path.join(__dirname, "public")));

app.get("/exported", (req, res) => {
  //demo data or data from db
  const data = [
    { OrderDate: "01/12/2015", " Region": " West", " Item": " Pencil" },
    {
      OrderDate: "08/06/2018",
      " Region": " Central",
      " Item": " Pencil",
    },
    { OrderDate: "01/06/2019", " Region": " East", " Item": " Pencil" },
    { OrderDate: "03/03/2019", " Region": " East", " Item": " Pencil" },
    { OrderDate: "05/05/2019", " Region": " West", " Item": " Pen" },
    { OrderDate: "06/01/2019", " Region": " East", " Item": " Pencil" },
    { OrderDate: "02/01/2020", " Region": " Central", "Item": "Pen" },
    { OrderDate: "04/04/2022", " Region": " East", " Item": " Pencil" },
    { OrderDate: "07/02/2012", " Region": " East", " Item": " Book" },
    { OrderDate: "09/10/2013", " Region": " East", " Item": " Monitor" },
  ];

  // check if there is no public directory then create one first
  // optional
  const dir = path.join(__dirname, "public");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  // Create csv file from data
  let cws = fs.createWriteStream("public/data.csv");
  fastcsv
    .write(data, { headers: true })
    .on("finish", () => {
      res.send('<a href="/public/data.csv" download="data.csv" id="downloadBtn"></a> <script>document.getElementById("downloadBtn").click();</script>');
    })
    .pipe(cws);
});

app.listen(3000, () => {
  console.log(`Server is Listening on 3000`);
});
