document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ Admin Dashboard Script Loaded!");

  // —— Load Users into the Table —— //
  function loadUsers() {
    fetch('/users')
      .then(res => res.json())
      .then(data => {
        if (!data.success) throw new Error(data.message || 'Unknown error');
        const tbody = document.getElementById('userTableBody');
        tbody.innerHTML = '';
        data.users.forEach((user, idx) => {
          const tr = document.createElement('tr');
          tr.setAttribute('data-user-id', user.id);
          tr.innerHTML = `
            <td>${idx + 1}</td>
            <td>${user.name}</td>
            <td>${user.gender}</td>
            <td>${user.age}</td>
            <td>${user.email}</td>
            <td>
              <button class="delete-btn"><i class="fas fa-trash-alt"></i> Delete</button>
            </td>
          `;
          tbody.appendChild(tr);
        });
      })
      .catch(err => {
        console.error('Failed to fetch users:', err);
        alert('Could not load user list. Check console.');
      });
  }

  // Initial load
  loadUsers();

  // —— Delete User Handler —— //
  document.getElementById('userTableBody').addEventListener('click', (e) => {
    if (e.target.closest('.delete-btn')) {
      const tr     = e.target.closest('tr');
      const userId = tr.getAttribute('data-user-id');
      if (!confirm('Are you sure you want to delete this user?')) return;

      fetch(`/users/${userId}`, { method: 'DELETE' })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            alert('User deleted.');
            tr.remove();
          } else {
            alert(data.message);
          }
        })
        .catch(err => {
          console.error('Error deleting user:', err);
          alert('Deletion failed. See console.');
        });
    }
  });

  // —— Sidebar & Section Navigation —— //
  window.showSection = (sectionId) => {
    document.querySelectorAll('section').forEach(sec => sec.style.display = 'none');
    const active = document.getElementById(sectionId);
    if (active) active.style.display = 'block';
    else console.error(`Section "${sectionId}" not found`);

    // If returning to Users, reload list
    if (sectionId === 'user-management') loadUsers();
  };

  document.querySelectorAll('.sidebar ul li').forEach(item => {
    item.addEventListener('click', () => {
      const target = item.getAttribute('onclick').match(/'([^']+)'/)[1];
      showSection(target);
    });
  });

});



document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ Admin Dashboard Script Loaded!");

  function loadUsers() {
    fetch('/users')
      .then(res => res.json())
      .then(data => {
        if (!data.success) throw new Error(data.message || 'Unknown error');
        const tbody = document.getElementById('userTableBody');
        tbody.innerHTML = '';
        data.users.forEach((user, idx) => {
          const tr = document.createElement('tr');
          tr.setAttribute('data-user-id', user.id);
          tr.innerHTML = `
            <td>${idx + 1}</td>
            <td>${user.name}</td>
            <td>${user.gender}</td>
            <td>${user.age}</td>
            <td>${user.email}</td>
            <td>
              <button class="delete-btn"><i class="fas fa-trash-alt"></i> Delete</button>
            </td>
          `;
          tbody.appendChild(tr);
        });
      })
      .catch(err => {
        console.error('Failed to fetch users:', err);
        alert('Could not load user list. Check console.');
      });
  }
   // Initial load
   loadUsers();

   // —— Delete User Handler —— //
   document.getElementById('userTableBody').addEventListener('click', (e) => {
     if (e.target.closest('.delete-btn')) {
       const tr     = e.target.closest('tr');
       const userId = tr.getAttribute('data-user-id');
       if (!confirm('Are you sure you want to delete this user?')) return;
 
       fetch(`/users/${userId}`, { method: 'DELETE' })
         .then(res => res.json())
         .then(data => {
           if (data.success) {
             alert('User deleted.');
             tr.remove();
           } else {
             alert(data.message);
           }
         })
         .catch(err => {
           console.error('Error deleting user:', err);
           alert('Deletion failed. See console.');
         });
     }
   });
 
   // —— Sidebar & Section Navigation —— //
   window.showSection = (sectionId) => {
     document.querySelectorAll('section').forEach(sec => sec.style.display = 'none');
     const active = document.getElementById(sectionId);
     if (active) active.style.display = 'block';
     else console.error(`Section "${sectionId}" not found`);
 
     // If returning to Users, reload list
     if (sectionId === 'user-management') loadUsers();
   };
 
   document.querySelectorAll('.sidebar ul li').forEach(item => {
     item.addEventListener('click', () => {
       const target = item.getAttribute('onclick').match(/'([^']+)'/)[1];
       showSection(target);
     });
   });

  function loadWorkouts() {
    fetch('/workouts')
      .then(res => res.json())
      .then(data => {
        if (!data.success) throw new Error(data.message || 'Failed to fetch workouts');
        const workoutContainer = document.getElementById('workout-container');
        workoutContainer.innerHTML = '';

        data.workouts.forEach(workout => {
          const card = document.createElement('div');
          card.className = 'card';
          card.innerHTML = `
            <div class="card-content">
              <h4>${workout.title}</h4>
              <p>${workout.details}</p>
              <p><strong>Category:</strong> ${workout.category}</p>
              <button class="delete-workout" data-id="${workout.id}">Delete</button>
            </div>
          `;
          workoutContainer.appendChild(card);
        });
      })
      .catch(err => {
        console.error('Error loading workouts:', err);
      });
  }

  function loadNutritionPlans() {
    fetch('/nutrition')
      .then(res => res.json())
      .then(data => {
        if (!data.success) throw new Error(data.message || 'Failed to fetch nutrition plans');
        const container = document.getElementById('nutrition-container');
        container.innerHTML = '';

        data.nutrition.forEach(plan => {
          const card = document.createElement('div');
          card.className = 'nutrition-card';
          card.innerHTML = `
            <img src="${plan.image_url}" alt="Nutrition Image">
            <div class="nutrition-card-content">
              <h4>${plan.title}</h4>
              <p><strong>Category:</strong> ${plan.category}</p>
              <p><strong>Calories:</strong> ${plan.calories || 'N/A'}</p>
              <button class="delete-nutrition" data-id="${plan.id}">Delete</button>
            </div>
          `;
          container.appendChild(card);
        });
      })
      .catch(err => {
        console.error('Error loading nutrition plans:', err);
      });
  }

  window.showSection = (sectionId) => {
    document.querySelectorAll('section').forEach(sec => sec.style.display = 'none');
    const active = document.getElementById(sectionId);
    if (active) active.style.display = 'block';
    else console.error(`Section "${sectionId}" not found`);

    if (sectionId === 'user-management') loadUsers();
    if (sectionId === 'workout-management') loadWorkouts();
    if (sectionId === 'nutrition-management') loadNutritionPlans();
  };

  document.querySelectorAll('.sidebar ul li').forEach(item => {
    item.addEventListener('click', () => {
      const target = item.getAttribute('onclick').match(/'([^']+)'/)[1];
      showSection(target);
    });
  });

  const addWorkoutButton = document.getElementById('addWorkout');
  const workoutContainer = document.getElementById('workout-container');

  if (addWorkoutButton && workoutContainer) {
    addWorkoutButton.addEventListener('click', () => {
      const userInput = prompt('Enter Workout Title, Details, and Category (comma-separated):');
      if (!userInput) return alert('Input required!');
      const [title, details, category] = userInput.split(',').map(item => item.trim());
      if (!title || !details || !category) return alert('All three fields are required!');

      fetch('/workouts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, details, category })
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert('Workout added.');
          loadWorkouts();
        } else {
          alert(data.message);
        }
      })
      .catch(err => {
        console.error('Error adding workout:', err);
        alert('Failed to add workout.');
      });
    });

    workoutContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('delete-workout')) {
        const workoutId = e.target.getAttribute('data-id');
        if (!confirm('Are you sure you want to delete this workout?')) return;

        fetch(`/workouts/${workoutId}`, { method: 'DELETE' })
          .then(res => res.json())
          .then(data => {
            if (data.success) {
              alert('Workout deleted.');
              loadWorkouts();
            } else {
              alert(data.message);
            }
          })
          .catch(err => {
            console.error('Error deleting workout:', err);
            alert('Failed to delete workout.');
          });
      }
    });
  }

  const addNutritionButton = document.getElementById('addNutrition');
  const nutritionContainer = document.getElementById('nutrition-container');

  if (addNutritionButton && nutritionContainer) {
    addNutritionButton.addEventListener('click', () => {
      const input = prompt('Enter Nutrition Title, Image URL, Category, and Calories (comma-separated):');
      if (!input) return alert('Input required!');
      const [title, image_url, category, calories] = input.split(',').map(item => item.trim());
      if (!title || !image_url || !category || !calories) return alert('All four fields are required!');

      fetch('/nutrition', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, image_url, category, calories })
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert('Nutrition plan added.');
          loadNutritionPlans();
        } else {
          alert(data.message);
        }
      })
      .catch(err => {
        console.error('Error adding nutrition plan:', err);
        alert('Failed to add nutrition plan.');
      });
    });

    nutritionContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('delete-nutrition')) {
        const nutritionId = e.target.getAttribute('data-id');
        if (!confirm('Are you sure you want to delete this nutrition plan?')) return;

        fetch(`/nutrition/${nutritionId}`, { method: 'DELETE' })
          .then(res => res.json())
          .then(data => {
            if (data.success) {
              alert('Nutrition plan deleted.');
              loadNutritionPlans();
            } else {
              alert(data.message);
            }
          })
          .catch(err => {
            console.error('Error deleting nutrition plan:', err);
            alert('Deletion failed.');
          });
      }
    });
  }


// —— Load Blogs —— //
function loadBlogs() {
  fetch('/blogs')
    .then(res => res.json())
    .then(data => {
      if (!data.success) throw new Error(data.message || 'Failed to fetch blogs');
      const blogContainer = document.getElementById('blog-container');
      blogContainer.innerHTML = ''; // Clear the container before adding new blogs

      if (!data.blogs || data.blogs.length === 0) {
        blogContainer.innerHTML = '<p>No blogs available.</p>';
        return;
      }

      data.blogs.forEach(blog => {
        const card = document.createElement('div');
        card.className = 'blog-card';
        card.innerHTML = `
          <div class="blog-card-content">
            <h4>${blog.title}</h4>
            <img src="${blog.image_url}" alt="Blog Image" class="blog-image"/>
            <p class="blog-paragraph">${blog.paragraph}</p>
            <button class="read-more" data-id="${blog.id}">Read More</button>
            <button class="delete-blog" data-id="${blog.id}">Delete</button>
          </div>
        `;
        blogContainer.appendChild(card);
      });
    })
    .catch(err => {
      console.error('Error loading blogs:', err);
    });
}

// —— Add Blog Handler —— //
const addBlogButton = document.getElementById('addBlog');
if (addBlogButton) {
  addBlogButton.addEventListener('click', () => {
    const input = prompt('Enter Blog Title,  Description, and Image URL (comma-separated):');
    if (!input) return alert('Input required!');
    
    const [title,description, image_url] = input.split(',').map(item => item.trim());
    if (!title ||  !description || !image_url) return alert('All fields are required!');

    // Send data to backend to add the blog
    fetch('/blogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, image_url })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert('Blog added successfully!');
        loadBlogs(); // Reload blogs after adding a new one
      } else {
        alert(data.message || 'Failed to add blog.');
      }
    })
    .catch(err => {
      console.error('Error adding blog:', err);
      alert('Failed to add blog.');
    });
  });
}

// —— Read More Button Handler —— //
const blogContainer = document.getElementById('blog-container');
blogContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('read-more')) {
    const blogId = e.target.getAttribute('data-id');
    // Fetch the full description of the blog
    fetch(`/blogs/${blogId}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          const blog = data.blog;
          const fullDescription = prompt('Full Description:', blog.description);
          if (!fullDescription) return alert('No description provided.');
        } else {
          alert(data.message);
        }
      })
      .catch(err => {
        console.error('Error fetching full blog description:', err);
      });
  }

  if (e.target.classList.contains('delete-blog')) {
    const blogId = e.target.getAttribute('data-id');
    if (!confirm('Are you sure you want to delete this blog?')) return;

    fetch(`/blogs/${blogId}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert('Blog deleted.');
          loadBlogs(); // Reload blogs after deletion
        } else {
          alert(data.message);
        }
      })
      .catch(err => {
        console.error('Error deleting blog:', err);
        alert('Failed to delete blog.');
      });
  }
});

// —— Sidebar Navigation —— //
window.showSection = (sectionId) => {
  document.querySelectorAll('section').forEach(sec => sec.style.display = 'none');
  const active = document.getElementById(sectionId);
  if (active) active.style.display = 'block';
  else console.error(`Section "${sectionId}" not found`);

  if (sectionId === 'user-management') loadUsers();
  if (sectionId === 'workout-management') loadWorkouts();
  if (sectionId === 'nutrition-management') loadNutritionPlans();
  if (sectionId === 'blog-management') loadBlogs(); 
  if (sectionId === 'course-management') loadCourses(); 
};

// Sidebar item clicks
document.querySelectorAll('.sidebar ul li').forEach(item => {
  item.addEventListener('click', () => {
    const target = item.getAttribute('onclick').match(/'([^']+)'/)[1];
    showSection(target);
  });
});

// —— Load Courses —— //
function loadCourses() {
  fetch('/course')
    .then(res => res.json())
    .then(data => {
      if (!data.success) throw new Error(data.message || 'Failed to fetch courses');
      const courseContainer = document.getElementById('courses-container');
      courseContainer.innerHTML = ''; // Clear before adding

      if (!data.courses || data.courses.length === 0) {
        courseContainer.innerHTML = '<p>No courses available.</p>';
        return;
      }

      data.courses.forEach(course => {
        const card = document.createElement('div');
        card.className = 'course-card';
     card.innerHTML = `
  <iframe src="${course.video_url}" allowfullscreen></iframe>
  <h4>${course.title}</h4>
  <p>${course.description.substring(0, 100)}...</p>
  <p><strong>Category:</strong> ${course.bmi_category}</p>
  <button class="delete-course" data-id="${course.course_id}">Delete</button>
`;

        courseContainer.appendChild(card);
      });
    })
    .catch(err => {
      console.error('Error loading courses:', err);
    });
}

// —— Add Course Handler —— //
const addCourseButton = document.getElementById('addCourse');
if (addCourseButton) {
  addCourseButton.addEventListener('click', () => {
    const input = prompt('Enter Course Title, Description, Video URL, and BMI Category (comma-separated):');
    if (!input) return alert('Input required!');
    
    const [title, description, video_url, bmi_category] = input.split(',').map(item => item.trim());
    if (!title || !description || !video_url || !bmi_category) return alert('All fields are required!');

    fetch('/course', {   // 👈 fixed route
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, video_url, bmi_category })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert('✅ Course added successfully!');
        loadCourses(); // reload list
      } else {
        alert(data.message || 'Failed to add course.');
      }
    })
    .catch(err => {
      console.error('Error adding course:', err);
      alert('Failed to add course.');
    });
  });
}


// —— View / Delete Course Handler —— //
const courseContainer = document.getElementById('courses-container');
courseContainer.addEventListener('click', (e) => {
  // View details
  if (e.target.classList.contains('view-course')) {
    const courseId = e.target.getAttribute('data-id');
    fetch(`/course/${courseId}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          const course = data.course;
          alert(`
📘 Title: ${course.title}
📝 Description: ${course.description}
📺 Video: ${course.video_url}
⚖️ BMI Category: ${course.bmi_category}
          `);
        } else {
          alert(data.message);
        }
      })
      .catch(err => {
        console.error('Error fetching course:', err);
      });
  }

  // Delete course
  if (e.target.classList.contains('delete-course')) {
    const courseId = e.target.getAttribute('data-id');
    if (!confirm('Are you sure you want to delete this course?')) return;

    fetch(`/course/${courseId}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert('✅ Course deleted.');
          loadCourses();
        } else {
          alert(data.message);
        }
      })
      .catch(err => {
        console.error('Error deleting course:', err);
        alert('Failed to delete course.');
      });
  }
});








// Initial Load
loadUsers();
loadWorkouts();
loadNutritionPlans();
loadBlogs(); 
loadCourses();
});