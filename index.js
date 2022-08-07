const express = require('express')
const cors = require('cors')
const axios = require('axios')
const dotenv = require('dotenv').config()
const { Client } = require('@notionhq/client');
const PORT = process.env.PORT || 3000

const app = express()
app.use(cors());

app.get('/list', (req, res) => {

  getLists(res)

})

app.listen(PORT, console.log(`Server run at ${PORT}`))

const getLists = (res) => {
  const options = {
    method: 'POST',
    url: `https://api.notion.com/v1/databases/${process.env.NOTION_DB_ID}/query`,
    headers: {
      Accept: 'application/json',
      'Notion-Version': '2022-02-22',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
    },
    data: {page_size: 100}
  };

  axios
  .request(options)
  .then(function (lists) {
    console.log(lists.data);

    res.json(lists.data)
  })
  .catch(function (error) {
    console.error(error);
  });
}
