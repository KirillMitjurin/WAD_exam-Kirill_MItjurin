
const express = require('express');
const pool = require('./database');
const cors = require('cors')

const port = process.env.PORT || 3000;
const app = express();


app.use(cors({ origin: 'http://localhost:8080', credentials: true }));
app.use(express.json());

app.listen(port, () => {
    console.log("Server is listening to port " + port)
});


app.get('/api/courses', async(req, res) => {
    try {
        console.log("A GET all request has arrived");
        const course = await pool.query(
            "SELECT * FROM courses"
        );
        res.json(course.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get('/api/courses/:id', async(req, res) => {
    const { id } = req.params;
    try{
        console.log("Get course")
        const course = await pool.query(
           "SELECT * FROM courses WHERE id = $1",[id]
        )
        res.json(course.rows[0])

    }   catch (err) {
        console.error('Error during PUT /api/mycourses/:id:', err.message);
        res.status(500).json({ error: "Internal server error" });
      }
})

app.put('/api/courses/:id', async (req, res) => {
    const { id } = req.params;
    const { course } = req.body;
    console.log(course.max)
    try{

        const updateNote = await pool.query(
            "UPDATE courses SET (id, max, registered, available, groupsnumbers, description) = ($1, $2, $3, $4, $5. $6) WHERE id = $1 RETURNING *",
            [id, course.max, course.registered, course.available, course.groupsnumbers, course.description]
          );
          res.json(UpdateCourse[0]);
          console.log("updated")
    }catch (err) {
        console.error(err.message);
    }

});