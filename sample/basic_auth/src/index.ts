
import express from 'express';
import { renderToString } from 'react-dom/server';
import basicAuth  from "express-basic-auth";
const app = express();
//
const topHtml = `
<html>
<head>
    <title>welcome</title>
</head>
<div id="app"></div>
<script type="module" src="/static/entry-client.js"></script>
</html>
`;
const prodHtml = `
<html>
<head>
    <title>welcome</title>
</head>
<div id="app"></div>
<script type="module" src="/public/static/entry-client.js"></script>
</html>
`;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
console.log("env=", process.env.NODE_ENV);
//
app.use(basicAuth({
  users: { "test": "1111" },
  challenge: true,
}));
//
const errorObj = {ret: "NG", messase: "Error"};
// route
import ApiRouter from './api-router'

//API
app.use('/api/*', async (req, res) => {
  const url = req.originalUrl;
  const response = await ApiRouter.route(url, req, res);
  return res.json(response);  
});
//
app.get('/*', (req, res) => {
  try {
    if(process.env.NODE_ENV === "develop"){
      res.send(topHtml);
    }else{
      res.send(prodHtml);
    }
  } catch (error) {
    res.sendStatus(500);
  }
});

//start
const PORT = 3000;
app.listen(PORT);
console.log(`start portNo=${PORT}`);

export default app;