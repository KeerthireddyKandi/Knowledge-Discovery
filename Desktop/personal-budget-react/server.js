const express= require('express');
const cors= require('cors');
const app= express();
const port= 5000;

app.use(cors());

 app.get('/budget' , (req, res) => {
     const file= require('fs');
     const dataobj=file.readFileSync('budget.json');
     const BUDGET=JSON.parse(dataobj);
    res.json(BUDGET);
  });

  app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`)
});
