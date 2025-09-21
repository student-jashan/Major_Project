const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');
const nodemailer = require("nodemailer");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client')));

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'fitness_freak',
});

db.connect((err) => {
  if (err) throw err;
  console.log('✅ Connected to MySQL');
});

// Root Route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

// // ==================== TEST ROUTE ====================
// app.post('/test-body', (req, res) => {
//   console.log('Request Body:', req.body);
//   res.json({ received: req.body });
// });

// ==================== AUTHENTICATION ====================

// // Signup
// app.post('/signup', (req, res) => {
//   const { name, age, gender, email, password } = req.body;

//   if (!name || !age || !gender || !email || !password) {
//     return res.status(400).json({ success: false, message: 'Please fill all fields' });
//   }

//   const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//   if (!passwordRegex.test(password)) {
//     return res.status(400).json({
//       success: false,
//       message: 'Password must include uppercase, lowercase, number, and special character.',
//     });
//   }

//   db.query('SELECT 1 FROM users WHERE email = ?', [email], (err, results) => {
//     if (err) return res.status(500).json({ success: false, message: 'Database error' });
//     if (results.length) {
//       return res.status(409).json({ success: false, message: 'Email already registered' });
//     }

//     const sql = `INSERT INTO users (name, age, gender, email, password, role)
//                  VALUES (?, ?, ?, ?, ?, 'user')`;
//     db.query(sql, [name, age, gender, email, password], (err2) => {
//       if (err2) return res.status(500).json({ success: false, message: 'Signup failed' });
//       res.status(201).json({ success: true, message: 'Signup successful' });
//     });
//   });
// });
// ==================== EMAIL SETUP (Mailtrap) ====================
const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "c1f6d86dfb806e",   // 👉 your Mailtrap username
    pass: "239a25087afee5" // 👉 your Mailtrap password
  }
});

// Function to send mail
function sendEmail(to, subject, message) {
  const mailOptions = {
    from: "Fitness Freak <no-reply@fitnessfreak.com>",
    to,
    subject,
    text: message
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("❌ Email failed:", err);
    } else {
      console.log("✅ Email sent:", info.response);
    }
  });
}

// Serve frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

// ==================== AUTH ====================
// ==================== AUTH ====================
app.post('/signup', (req, res) => {
  const { name, age, gender, email, password } = req.body;
  if (!name || !age || !gender || !email || !password) {
    return res.status(400).json({ success:false, message:'Please fill all fields' });
  }

  // ✅ FIXED regex
  const pwRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  if (!pwRegex.test(password)) {
    return res.status(400).json({
      success: false,
      message: 'Password must be ≥8 chars, include upper, lower, number & special char'
    });
  }

  db.query('SELECT 1 FROM users WHERE email = ?', [email], (e, results) => {
    if (e) return res.status(500).json({ success:false, message:'Database error' });
    if (results.length) {
      return res.status(409).json({ success:false, message:'Email already registered' });
    }
    db.query(
      'INSERT INTO users (name, age, gender, email, password, role) VALUES (?, ?, ?, ?, ?, "user")',
      [name, age, gender, email, password],
      err2 => {
        if (err2) return res.status(500).json({ success:false, message:'Signup failed' });
        
        // ✅ Send Welcome Email (via Mailtrap)
        sendEmail(email, "Welcome to Fitness Freak 🎉", 
          `Hi ${name},\n\nWelcome to Fitness Freak! We are excited to help you on your fitness journey.\n\nStay fit,\nTeam Fitness Freak`);

        res.status(201).json({ success:true, message:'Signup successful. Welcome email sent!' });
      }
    );
  });
});



// Login
app.post('/login', (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return res.status(400).json({ success: false, message: 'Missing fields' });
  }

  const table = role === 'admin' ? 'admin' : 'users';
  const sql = `SELECT * FROM ${table} WHERE email = ? AND password = ?`;

  db.query(sql, [email, password], (err, results) => {
    if (err) return res.status(500).json({ success: false, message: 'Database error' });
    if (results.length) {
      return res.json({ success: true, message: 'Login successful', role });
    }
    res.json({ success: false, message: 'Invalid credentials' });
  });
});

// ==================== USER ROUTES ====================

// Get All Users
app.get('/users', (req, res) => {
  db.query('SELECT id, name, gender, age, email FROM users', (err, results) => {
    if (err) return res.status(500).json({ success: false, message: 'Failed to fetch users' });
    res.json({ success: true, users: results });
  });
});

// Delete User
app.delete('/users/:id', (req, res) => {
  const userId = req.params.id;
  db.query('DELETE FROM users WHERE id = ?', [userId], (err, result) => {
    if (err) return res.status(500).json({ success: false, message: 'Database error' });
    if (result.affectedRows) {
      return res.json({ success: true, message: 'User deleted' });
    }
    res.status(404).json({ success: false, message: 'User not found' });
  });
});

// Add BMI and User Details
// app.post('/api/user-details', (req, res) => {
//   const { user_id, height, weight, target_weight, bmi, status } = req.body;

//   const sql = `INSERT INTO user_details (user_id, height, weight, target_weight, bmi, status) 
//                VALUES (?, ?, ?, ?, ?, ?)`;

//   db.query(sql, [user_id, height, weight, target_weight, bmi, status], (err, result) => {
//     if (err) {
//       return res.status(500).json({ message: 'Database error', error: err });
//     }
//     res.status(201).json({ message: 'User details added successfully', insertedId: result.insertId });
//   });
// });
app.post('/api/user-details', (req, res) => {
  const { user_id, height, weight, target_weight, bmi, status } = req.body;

  const sql = `INSERT INTO user_details (user_id, height, weight, target_weight, bmi, status) 
               VALUES (?, ?, ?, ?, ?, ?)`;

  db.query(sql, [user_id, height, weight, target_weight, bmi, status], (err, result) => {
    if (err) {
      console.error('Database error:', err);  // Log error for debugging
      return res.status(500).json({ message: 'Database error', error: err });
    }
    res.status(201).json({ message: 'User details added successfully', insertedId: result.insertId });
  });
});


app.get('/api/user-details', (req, res) => {
  db.query('SELECT * FROM user_details', (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Database error', error: err });
    }
    res.json(results);
  });
});


// ==================== WORKOUT ROUTES ====================

// Add Workout
app.post('/workouts', (req, res) => {
  const { title, details } = req.body;
  if (!title || !details) {
    return res.status(400).json({ success: false, message: 'Missing fields' });
  }
  const sql = 'INSERT INTO workouts (title, details) VALUES (?, ?)';
  db.query(sql, [title, details], (err) => {
    if (err) return res.status(500).json({ success: false, message: 'Failed to add workout' });
    res.status(201).json({ success: true, message: 'Workout added successfully' });
  });
});

// Get Workouts
app.get('/workouts', (req, res) => {
  db.query('SELECT * FROM workouts', (err, results) => {
    if (err) return res.status(500).json({ success: false, message: 'Failed to fetch workouts' });
    res.json({ success: true, workouts: results });
  });
});

// Delete Workout
app.delete('/workouts/:id', (req, res) => {
  const workoutId = req.params.id;
  db.query('DELETE FROM workouts WHERE id = ?', [workoutId], (err) => {
    if (err) return res.status(500).json({ success: false, message: 'Failed to delete workout' });
    res.json({ success: true, message: 'Workout deleted successfully' });
  });
});

// ==================== NUTRITION ROUTES ====================

// Add Nutrition Plan
app.post('/nutrition', (req, res) => {
  const { title, image_url } = req.body;
  if (!title || !image_url) {
    return res.status(400).json({ success: false, message: 'Missing fields' });
  }
  const sql = 'INSERT INTO nutrition_plans (title, image_url) VALUES (?, ?)';
  db.query(sql, [title, image_url], (err) => {
    if (err) return res.status(500).json({ success: false, message: 'Failed to add nutrition plan' });
    res.status(201).json({ success: true, message: 'Nutrition plan added successfully' });
  });
});

// Get Nutrition Plans
app.get('/nutrition', (req, res) => {
  db.query('SELECT * FROM nutrition_plans', (err, results) => {
    if (err) return res.status(500).json({ success: false, message: 'Failed to fetch nutrition plans' });
    res.json({ success: true, nutrition: results });
  });
});

// Delete Nutrition Plan
app.delete('/nutrition/:id', (req, res) => {
  const nutritionId = req.params.id;
  db.query('DELETE FROM nutrition_plans WHERE id = ?', [nutritionId], (err) => {
    if (err) return res.status(500).json({ success: false, message: 'Failed to delete nutrition plan' });
    res.json({ success: true, message: 'Nutrition plan deleted successfully' });
  });
});




// // ==================== BLOGS ====================
app.post('/blogs', (req, res) => {
  const { title,description, image_url } = req.body;
  // Insert into database
  db.query('INSERT INTO blogs (title, description, image_url) VALUES (?, ?, ?)', 
    [title, description, image_url], 
    (err, result) => {
      if (err) return res.json({ success: false, message: err.message });
      res.json({ success: true });
    });
});


app.get('/blogs', (req, res) => {
  db.query('SELECT * FROM blogs', (err, results) => {
    if (err) return res.status(500).json({ success: false, message: 'Failed to fetch blogs' });
    res.json({ success: true, blogs: results });
  });
});

app.delete('/blogs/:id', (req, res) => {
  db.query('DELETE FROM blogs WHERE id = ?', [req.params.id], err => {
    if (err) return res.status(500).json({ success:false, message:'Failed to delete blog' });
    res.json({ success:true, message:'Blog deleted successfully' });
  });
});

// ==================== COURSE ROUTES ====================

// Add a course
app.post('/course', (req, res) => {
  const { title, description, video_url, bmi_category } = req.body;
  if (!title || !description || !video_url || !bmi_category) {
    return res.json({ success: false, message: 'All fields are required!' });
  }

  db.query(
    'INSERT INTO Course (title, description, video_url, bmi_category) VALUES (?, ?, ?, ?)',
    [title, description, video_url, bmi_category],
    (err, result) => {
      if (err) return res.json({ success: false, message: err.message });
      res.json({ success: true, message: 'Course added successfully', course_id: result.insertId });
    }
  );
});

app.get('/course', (req, res) => {
  db.query('SELECT * FROM course', (err, results) => {
    if (err) {
      console.error("❌ Error fetching courses:", err);
      return res.status(500).json({ success: false, message: 'Failed to fetch courses' });
    }
    res.json({ success: true, courses: results });
  });
});


app.delete('/course/:id', (req, res) => {
  const courseId = req.params.id;

  db.query('DELETE FROM course WHERE course_id = ?', [courseId], (err) => {
    if (err) {
      console.error("❌ Error deleting course:", err);
      return res.status(500).json({ success: false, message: 'Failed to delete course' });
    }
    res.json({ success: true, message: 'Course deleted successfully' });
  });
});

app.post("/progress", async (req, res) => {
    const { user_id, course_id, progress_percentage, last_watched_time } = req.body;

    if (!user_id || !course_id) {
        return res.status(400).json({ success: false, message: "Missing user_id or course_id" });
    }

    try {
        await pool.query(
            `INSERT INTO user_progress (user_id, course_id, progress_percentage, last_watched_time)
             VALUES (?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE
               progress_percentage = VALUES(progress_percentage),
               last_watched_time = VALUES(last_watched_time)`,
            [user_id, course_id, progress_percentage, last_watched_time]
        );
        res.json({ success: true, message: "Progress saved" });
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

// --- Get Progress for a User (All Courses) ---
app.get("/progress/:userId", async (req, res) => {
    const userId = req.params.userId;
    try {
        const [rows] = await pool.query(
            "SELECT course_id, progress_percentage, last_watched_time FROM user_progress WHERE user_id = ?",
            [userId]
        );
        res.json(rows);
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ message: "Failed to fetch progress" });
    }
});

// --- Get Progress for a User for a Specific Course ---
app.get("/progress/:userId/:courseId", async (req, res) => {
    const { userId, courseId } = req.params;
    try {
        const [rows] = await pool.query(
            "SELECT progress_percentage, last_watched_time FROM user_progress WHERE user_id=? AND course_id=?",
            [userId, courseId]
        );
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.json({ progress_percentage: 0, last_watched_time: 0 });
        }
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ message: "Failed to fetch progress" });
    }
});



// ------------------ START SERVER ------------------
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
