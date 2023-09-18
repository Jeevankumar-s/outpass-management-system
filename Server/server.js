const express = require('express')
const path = require('path')
const bcrypt = require('bcrypt')
const cors = require('cors')

const {open} = require('sqlite')
const json = require('jsonwebtoken')
const sqlite3 = require('sqlite3')

const app = express()
const dbPath = path.join(__dirname, 'database.db')
app.use(express.json())
const corsOptions = {
  origin: 'http://localhost:3001', // Change this to your frontend's URL
  methods: ['GET', 'POST'], // Allow specific HTTP methods
}

app.use(cors(corsOptions))

let db = null

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })
    await db.exec(`
      CREATE TABLE IF NOT EXISTS login (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        password TEXT NOT NULL,
        type TEXT NOT NULL
      )
    `)
    app.listen(3000, () => {
      console.log('Server Running at http://localhost:3000/')
    })
  } catch (e) {
    console.log(`DB Error: ${e.message}`)
    process.exit(1)
  }
}

// Registration endpoint
app.post('/register/', async (request, response) => {
  try {
    const {username, password, type} = request.body

    // Basic input validation
    if (!username || !password || !type) {
      response.status(400).send('Invalid input data')
      return
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10)

    const query =
      'INSERT INTO login (username, password, type) VALUES (?, ?, ?)'
    const params = [username, hashedPassword, type]

    await db.run(query, params)

    response.send('User added successfully')
  } catch (error) {
    console.error('Registration error:', error)
    response.status(500).send('Internal Server Error')
  }
})

// Login endpoint
app.post('/login', async (request, response) => {
  try {
    const {username, password} = request.body
    // Basic input validation
    if (!username || !password) {
      response.status(400).send('Invalid input data')
      return
    }

    const selectUserQuery = 'SELECT * FROM login WHERE username = ?'
    const dbUser = await db.get(selectUserQuery, [username])

    if (!dbUser) {
      console.log('Invalid user')
      response.send({validation: false})

      response.status(400).send('Invalid User')
    } else {
      const isPasswordMatched = await bcrypt.compare(password, dbUser.password)
      if (isPasswordMatched) {
        console.log('login success')
        response.send({validation: true, type: dbUser.type})
      } else {
        console.log('password wrong')
        response.status(400).send('Invalid Password')
      }
    }
  } catch (error) {
    console.error('Login error:', error)
    response.status(500).send('Internal Server Error')
  }
})

app.post('/outpass', async (request, response) => {
  const {registerNo, name, email, year, department, reason} = request.body
  const query = `insert into outpass (registerNo,name,email,year,department,reason)
    values('${registerNo}','${name}','${email}','${year}','${department}','${reason}');`
  await db.run(query)
  response.send({submission: true})
  console.log('outpass added successfully')
})

app.get('/history', async (request, response) => {
  const query = `
    select * from outpass`
  const res = await db.all(query)
  response.send(res)
})

app.get('/history/:registerNo/', async (request, response) => {
  const {registerNo} = request.params
  const getOutpass = `
    SELECT
      *
    FROM
      outpass
    WHERE
      registerNo = ${registerNo};`
  const result = await db.all(getOutpass)
  response.send(result)
})

app.get('/outpass/:id/accept', async (request, response) => {
  const {id} = request.params

  response.send({success: true})
})
// Other endpoints (e.g., /student, /staff)...

initializeDBAndServer()
