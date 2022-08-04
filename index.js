const express = require('express')
const cors = require('cors');
const dotenv = require('dotenv').config()
const { Client } = require('@notionhq/client');
const PORT = process.env.PORT || 5000

const app = express()
app.use(cors());

app.get('/', async (req, res) => {
  const lists = await getLists()
  res.json(lists)
})

app.listen(PORT, console.log(`Server run at ${PORT}`))


const getLists = async () => {
  const notion = new Client({ auth: process.env.NOTION_TOKEN });
  const databaseId = process.env.NOTION_DB_ID;

  const res = await notion.databases.query({
  database_id: databaseId,
  });
  // console.log(res);
  return res;
}
