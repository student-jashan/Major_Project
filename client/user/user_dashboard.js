// // Function to Show Sections Dynamically
// function showSection(sectionId) {
//     let sections = document.querySelectorAll(".section");
//     sections.forEach(section => section.style.display = "none");

//     document.getElementById(sectionId).style.display = "block";
// }
// function calculateBMI() {
//     let height = parseFloat(document.getElementById("height").value) / 100; // Convert cm to meters
//     let weight = parseFloat(document.getElementById("weight").value);

//     if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
//         alert("Please enter valid height and weight values.");
//         return;
//     }

//     let bmi = (weight / (height * height)).toFixed(2);
//     document.getElementById("bmiResult").innerText = bmi;

//     let status = "";
//     if (bmi < 18.5) {
//         status = "Underweight";
//         showWeightGainWorkouts();
//     } else if (bmi < 24.9) {
//         status = "Normal weight";
//         showGeneralWorkouts();
//     } else {
//         status = "Overweight";
//         showWeightLossWorkouts();
//     }

//     document.getElementById("bmiStatus").innerText = status;

//     // ✨ After BMI calculation, send data to server
//     const heightInput = parseFloat(document.getElementById("height").value);
//     const weightInput = parseFloat(document.getElementById("weight").value);
//     const targetWeightInput = parseFloat(document.getElementById("targetWeight").value);
//     const user_id = 1; // ⚠️ Replace with dynamic user ID if available

//     sendDataToServer(user_id, heightInput, weightInput, targetWeightInput, bmi, status);
//   }

//   // 📤 Send Data to Server
//   function sendDataToServer(user_id, height, weight, targetWeight, bmi, status) {
//     fetch('/api/user-details', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         user_id,
//         height,
//         weight,
//         target_weight: targetWeight,
//         bmi,
//         status
//       })
//     })
//     .then(res => res.json())
//     .then(data => {
//       if (data.success || data.message === 'User details added successfully') {
//         console.log("Data saved successfully.");
//       } else {
//         alert("Failed to save data: " + data.message);
//       }
//     })
//     .catch(err => {
//       alert("Error saving data: " + err.message);
//     });
//   }
  
//   function fetchAdminWorkouts(category) {
//     const workoutContainer = document.getElementById("workoutContainer");
//     workoutContainer.innerHTML = `<h3 style="color:white;">For ${category.charAt(0).toUpperCase() + category.slice(1)}</h3>`;

//     fetch('/workouts')
//       .then(res => res.json())
//       .then(data => {
//         if (data.success) {
//           data.workouts.forEach(workout => {
//             if (workout.category && workout.category.toLowerCase() === category) {
//               const card = document.createElement('div');
//               card.className = 'card';
//               card.innerHTML = `
//                 <div class="card-content">
//                   <h4 style="color:white;">${workout.title}</h4>
//                   <p style="color:white;">${workout.details}</p>
//                 </div>
//               `;
//               workoutContainer.appendChild(card);
//             }
//           });
//         }
//         showStaticBMIWorkouts(category);
//       })
//       .catch(err => console.error('Error fetching workouts:', err));
//   }

//   // 🧾 Add to table on frontend
//   function addToProfilesTable(height, weight, targetWeight, bmi, status) {
//     const table = document.getElementById("profilesTable").getElementsByTagName('tbody')[0];
//     const newRow = table.insertRow();
//     newRow.innerHTML = `
//       <td>${height}</td>
//       <td>${weight}</td>
//       <td>${targetWeight}</td>
//       <td>${bmi}</td>
//       <td>${status}</td>
//     `;
//   }

//   // 🟨 Attach event listener on button (delayed table update)
//   document.querySelector('button[onclick="calculateBMI()"]').addEventListener("click", function() {
//     setTimeout(() => {
//       const height = document.getElementById("height").value;
//       const weight = document.getElementById("weight").value;
//       const targetWeight = document.getElementById("targetWeight").value;
//       const bmi = document.getElementById("bmiResult").innerText;
//       const status = document.getElementById("bmiStatus").innerText;

//       if (height && weight && bmi !== "--" && status !== "--") {
//         addToProfilesTable(height, weight, targetWeight, bmi, status);
//       }
//     }, 100);
//   });


// function loadSavedProfiles(userId) {
//   fetch(`/api/user-details?user_id=${userId}`)
//     .then(res => res.json())
//     .then(data => {
//       const tableBody = document.querySelector('#profilesTable tbody');
//       tableBody.innerHTML = ''; // Clear existing rows

//       data.forEach(entry => {
//         const row = document.createElement('tr');
//         row.innerHTML = `
//           <td>${entry.height}</td>
//           <td>${entry.weight}</td>
//           <td>${entry.target_weight}</td>
//           <td>${entry.bmi}</td>
//           <td>${entry.status}</td>
//         `;
//         tableBody.appendChild(row);
//       });
//     })
//     .catch(err => {
//       console.error('Error loading saved profiles:', err);
//     });
// }


// // window.addEventListener("DOMContentLoaded", function() {
// //   const user_id = 1; 
// //   loadSavedProfiles(user_id);
// // });

// function showStaticBMIWorkouts(category) {
//   const workoutContainer = document.getElementById("workoutContainer");

//   if (category === "underweight") {
//     workoutContainer.innerHTML += `
//       <h3 style="color:white;">Basic Workouts for Weight Gain</h3>
//       <ul style="color:white;">
//         <li>Strength Training (3-4 times a week)</li>
//         <li>Calisthenics (Push-ups, Squats, Pull-ups)</li>
//         <li>Progressive Overload Training</li>
//         <li>High-Calorie Diet Plan</li>
//       </ul>
//       <h4 style="color:white;">Recommended Exercises:</h4>
//       <ol style="color:white;">
//         <li><b>Pull-ups:</b> 3 sets of 6-10 reps</li>
//         <video width="320" height="240" controls>
//           <source src="../Videos/pullups.mp4" type="video/mp4">
//         </video>
//         <li><b>Push-ups:</b> 3 sets of 12-15 reps</li>
//         <video width="320" height="240" controls>
//           <source src="../Videos/pushups.mp4" type="video/mp4">
//         </video>
//         <li><b>Squats:</b> 3 sets of 10-15 reps</li>
//         <video width="320" height="240" controls>
//           <source src="../Videos/squat.mp4" type="video/mp4">
//         </video>
//       </ol>
//     `;
//   } else if (category === "normal") {
//     workoutContainer.innerHTML += `
//       <h3 style="color:white;">Basic General Fitness Workouts</h3>
//       <ul style="color:white;">
//         <li>Cardio (Running, Cycling, Swimming)</li>
//         <li>Full-Body Strength Training</li>
//         <li>Flexibility Exercises (Yoga, Stretching)</li>
//       </ul>
//       <img src="../Images/yoga.jpg" width="400" height="250" style="display: block; margin: 10px auto; border-radius: 10px;">
//       <video width="320" height="240" controls>
//         <source src="../Videos/sprints.mp4" type="video/mp4">
//       </video>
//       <video width="320" height="240" controls>
//         <source src="../Videos/cycling.mp4" type="video/mp4">
//       </video>
//     `;
//   } else if (category === "overweight") {
//     workoutContainer.innerHTML += `
//       <h3 style="color:white;">Basic Workouts for Weight Loss</h3>
//       <ul style="color:white;">
//         <li>HIIT Workouts</li>
//         <li>Cardio (Jump Rope, Running, Cycling)</li>
//         <li>Strength Training (Fat-Burning Focus)</li>
//         <li>Caloric Deficit Diet</li>
//       </ul>
//       <video width="320" height="240" controls>
//         <source src="../Videos/jump_rope.mp4" type="video/mp4">
//       </video>
//       <video width="320" height="240" controls>
//         <source src="../Videos/deadlift.mp4" type="video/mp4">
//       </video>
//     `;
//   }
// }


  
// function showWeightGainWorkouts() {
//     document.getElementById("workout").innerHTML = `
//         <h2 style="color: white;">Workouts for Weight Gain</h2>
//         <ul style="color: white;">
//             <li>Strength Training (3-4 times a week)</li>
//             <li>Calisthenics (Push-ups, Squats, Pull-ups)</li>
//             <li>Progressive Overload Training</li>
//             <li>High-Calorie Diet Plan</li>
//         </ul>
//         <h3 style="color: white;">Recommended Exercises:</h3>
//         <ol style="color: white;">
//             <li><b>Pull-ups:</b> Perform 3 sets of 6-10 reps.</li>
//             <video width="320" height="240" controls>
//                 <source src="../Videos/pullups.mp4" type="video/mp4">
//                 Your browser does not support the video tag.
//             </video>
            
//             <li><b>Push-ups:</b> Perform 3 sets of 12-15 reps.</li>
//             <video width="320" height="240" controls>
//                 <source src="../Videos/pushups.mp4" type="video/mp4">
//                 Your browser does not support the video tag.
//             </video>

//             <li><b>Squats:</b> Perform 3 sets of 10-15 reps.</li>
//             <video width="320" height="240" controls>
//                 <source src="../Videos/squat.mp4" type="video/mp4">
//                 Your browser does not support the video tag.
//             </video>
//         </ol>
//     `;
// }



// function showGeneralWorkouts() {
//     document.getElementById("workout").innerHTML = `
//         <h2 style="color: white;">General Fitness Workouts</h2>
//         <ul style="color: white;">
//             <li>Cardio (Running, Cycling, Swimming)</li>
//             <li>Full-Body Strength Training</li>
//             <li>Flexibility Exercises (Yoga, Stretching)</li>
//         </ul>
        
       
// <h3 style="color: white; text-align: center;">Recommended Workout:</h3>
//         <img src="../Images/yoga.jpg" alt="Yoga Workout" width="400" height="250" 
//              style="display: block; margin: 10px auto; border-radius: 10px;">
//               <video width="320" height="240" controls>
//                 <source src="../Videos/sprints.mp4" type="video/mp4">
//                 Your browser does not support the video tag.
//             </video>
//             <video width="320" height="240" controls>
//                 <source src="../Videos/cycling.mp4" type="video/mp4">
//                 Your browser does not support the video tag.
//             </video>
//         `;
// }


// function showWeightLossWorkouts() {
//     document.getElementById("workout").innerHTML = `
//         <h2>Workouts for Weight Loss</h2>
//         <ul style="color: white;">
//             <li>HIIT Workouts</li>
//             <li>Cardio (Jump Rope, Running, Cycling)</li>
//             <li>Strength Training (Fat-Burning Focus)</li>
//             <li>Caloric Deficit Diet</li>
//         </ul>
//         <h3>Watch this weight loss workout guide:</h3>
//         <video width="320" height="240" controls>
//                 <source src="../Videos/jump_rope.mp4" type="video/mp4">
//                 Your browser does not support the video tag.
//             </video>
//              <video width="320" height="240" controls>
//                 <source src="../Videos/deadlift.mp4" type="video/mp4">
//                 Your browser does not support the video tag.
//             </video>
//     `;
// }

// function showSection(sectionId) {
//     document.querySelectorAll(".section").forEach(section => section.style.display = "none");
//     document.getElementById(sectionId).style.display = "block";
// }

// function updateNutritionPlan() {
//     let bmi = parseFloat(document.getElementById("bmiResult").innerText);
//     let nutritionDetails = document.getElementById("nutritionDetails");

//     if (!bmi) {
//         nutritionDetails.innerHTML = `<p>Please calculate your BMI first.</p>`;
//         return;
//     }

//     let planTitle = "";
//     let mealPlans = [];

//     // Determine the meal plan based on the BMI value
//     if (bmi < 18.5) {
//         planTitle = "Weight Gain Meal Plan";
//         mealPlans = [
//             { food: "Oatmeal with peanut butter & banana", calories: "450 kcal", image: "../Images/peanut.jpg" },
//             { food: "Nuts & Greek yogurt", calories: "300 kcal", image: "../Images/yogrt.jpg" }
//         ];
//     }
//     else if (bmi < 24.9) {
//         planTitle = "Balanced Nutrition Meal Plan";
//         mealPlans = [
//             { food: "Scrambled eggs with whole-grain toast", calories: "350 kcal", image: "../Images/egg.jpg" },
//             { food: "Hummus & veggie sticks", calories: "250 kcal", image: "../Images/vegstcik.jpg" }
//         ];
//     } else {
//         planTitle = "Weight Loss Meal Plan";
//         mealPlans = [
//             { food: "Smoothie with spinach, banana & almond milk", calories: "300 kcal", image: "../Images/ALmond.jpg" },
//             { food: "Grilled chicken salad with olive oil dressing", calories: "400 kcal", image: "../Images/Grilled.jpg" }
//         ];
//     }

//     // Generate HTML for the meal plans
//     let mealPlanHTML = `<h3>${planTitle}</h3><div class="meal-plan-container">`;

//     mealPlans.forEach(meal => {
//         mealPlanHTML += `
//             <div class="meal-card">
//                 <img src="${meal.image}" alt="${meal.food}" class="meal-image">
//                 <p class="meal-name">${meal.food}</p>
//                 <p class="meal-calories">Calories: ${meal.calories}</p>
//             </div>
//         `;
//     });

//     mealPlanHTML += `</div>`;
//     nutritionDetails.innerHTML = mealPlanHTML;
// }// Function to Show Sections Dynamically
// function showSection(sectionId) {
//     const sections = document.querySelectorAll(".section");
//     sections.forEach(section => section.style.display = "none");
//     document.getElementById(sectionId).style.display = "block";
// }


// function openForm(title, description) {
//   document.getElementById("popupForm").style.display = "block";
//   document.getElementById("popup-title").textContent = title;
//   document.getElementById("popup-description").textContent = description;
// }

// function closeForm() {
//   document.getElementById("popupForm").style.display = "none";
// }

// function showSection(sectionId) {
//   const sections = document.querySelectorAll(".section");
//   sections.forEach(section => section.style.display = "none");
//   document.getElementById(sectionId).style.display = "block";
// }



// Function to Show Sections Dynamically
function showSection(sectionId) {
  let sections = document.querySelectorAll(".section");
  sections.forEach(section => section.style.display = "none");

  document.getElementById(sectionId).style.display = "block";
}

// // ================= BMI CALCULATION =================
function calculateBMI() {
    let height = parseFloat(document.getElementById("height").value) / 100; // Convert cm to meters
    let weight = parseFloat(document.getElementById("weight").value);

    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
        alert("Please enter valid height and weight values.");
        return;
    }

    let bmi = (weight / (height * height)).toFixed(2);
    document.getElementById("bmiResult").innerText = bmi;

    let status = "";
    if (bmi < 18.5) {
        status = "Underweight";
        showWeightGainWorkouts();
    } else if (bmi < 24.9) {
        status = "Normal weight";
        showGeneralWorkouts();
    } else {
        status = "Overweight";
        showWeightLossWorkouts();
    }

    document.getElementById("bmiStatus").innerText = status;

    // Store BMI status in localStorage
    localStorage.setItem("bmiStatus", status);

    // Load recommended courses immediately
    loadCourses();

    // Send data to server if needed
    const targetWeightInput = parseFloat(document.getElementById("targetWeight").value);
    sendDataToServer(height, weight, targetWeightInput, bmi, status);
} 
  


document.querySelector('button[onclick="calculateBMI()"]').addEventListener("click", function () {
    setTimeout(() => {
      const height = document.getElementById("height").value;
      const weight = document.getElementById("weight").value;
      const targetWeight = document.getElementById("targetWeight").value; // ✅ correct ID
      const bmi = document.getElementById("bmiResult").innerText;
      const status = document.getElementById("bmiStatus").innerText;
  
      if (height && weight && bmi !== "--" && status !== "--") {
        addToProfilesTable(height, weight, targetWeight, bmi, status); // ✅ pass correct variable
        const user_id = 1; // 🔁 Replace with dynamic value if needed
        sendDataToServer(user_id, height, weight, targetWeight, bmi, status); // ✅ call API
      }
    }, 100);
  });
  
function addToProfilesTable(height, weight, targetWeight, bmi, status) {
    const tableBody = document.querySelector("#profilesTable tbody");
  
    const newRow = document.createElement("tr");
    newRow.style.color = "black";
  
    newRow.innerHTML = `
      <td>${height}</td>
      <td>${weight}</td>
      <td>${targetWeight}</td>
      <td>${bmi}</td>
      <td>${status}</td>
    `;
  
    tableBody.appendChild(newRow);
  }
  
// function sendDataToServer(user_id, height, weight, targetWeight, bmi, status) {
//     fetch('/api/user-details', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         user_id,
//         height,
//         weight,
//         target_weight: targetWeight, // ✅ use backend's expected key
//         bmi,
//         status
//       })
//     })
//       .then(response => response.json())
//       .then(data => {
//         console.log('Success:', data);
//         alert('Profile saved successfully!');
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//         alert('Failed to save profile.');
//       });
//   }


// window.addEventListener("DOMContentLoaded", () => {
//     fetch('/api/user-details')
//       .then(response => response.json())
//       .then(data => {
//         data.forEach(user => {
//           addToProfilesTable(user.height, user.weight, user.target_weight, user.bmi, user.status);
//         });
//       })
//       .catch(error => {
//         console.error("Error fetching profiles:", error);
//       });
//   });
  


function showWeightGainWorkouts() {
  document.getElementById("workout").innerHTML = `
      <h2 style="color: white;">Workouts for Weight Gain</h2>
      <ul style="color: white;">
          <li>Strength Training (3-4 times a week)</li>
          <li>Calisthenics (Push-ups, Squats, Pull-ups)</li>
          <li>Progressive Overload Training</li>
          <li>High-Calorie Diet Plan</li>
      </ul>
      <h3 style="color: white;">Recommended Exercises:</h3>
      <ol style="color: white;">
          <li><b>Pull-ups:</b> Perform 3 sets of 6-10 reps.</li>
          <video width="320" height="240" controls>
              <source src="../Videos/pullups.mp4" type="video/mp4">
              Your browser does not support the video tag.
          </video>
          
          <li><b>Push-ups:</b> Perform 3 sets of 12-15 reps.</li>
          <video width="320" height="240" controls>
              <source src="../Videos/pushups.mp4" type="video/mp4">
              Your browser does not support the video tag.
          </video>

          <li><b>Squats:</b> Perform 3 sets of 10-15 reps.</li>
          <video width="320" height="240" controls>
              <source src="../Videos/squat.mp4" type="video/mp4">
              Your browser does not support the video tag.
          </video>
      </ol>
  `;
}

function showGeneralWorkouts() {
  document.getElementById("workout").innerHTML = `
      <h2 style="color: white;">General Fitness Workouts</h2>
      <ul style="color: white;">
          <li>Cardio (Running, Cycling, Swimming)</li>
          <li>Full-Body Strength Training</li>
          <li>Flexibility Exercises (Yoga, Stretching)</li>
      </ul>
      
     
<h3 style="color: white; text-align: center;">Recommended Workout:</h3>
      <img src="../Images/yoga.jpg" alt="Yoga Workout" width="400" height="250" 
           style="display: block; margin: 10px auto; border-radius: 10px;">
            <video width="320" height="240" controls>
              <source src="../Videos/sprints.mp4" type="video/mp4">
              Your browser does not support the video tag.
          </video>
          <video width="320" height="240" controls>
              <source src="../Videos/cycling.mp4" type="video/mp4">
              Your browser does not support the video tag.
          </video>
      `;
}
function showWeightLossWorkouts() {
  document.getElementById("workout").innerHTML = `
      <h2>Workouts for Weight Loss</h2>
      <ul style="color: white;">
          <li>HIIT Workouts</li>
          <li>Cardio (Jump Rope, Running, Cycling)</li>
          <li>Strength Training (Fat-Burning Focus)</li>
          <li>Caloric Deficit Diet</li>
      </ul>
      <h3>Watch this weight loss workout guide:</h3>
      <video width="320" height="240" controls>
              <source src="../Videos/jump_rope.mp4" type="video/mp4">
              Your browser does not support the video tag.
          </video>
           <video width="320" height="240" controls>
              <source src="../Videos/deadlift.mp4" type="video/mp4">
              Your browser does not support the video tag.
          </video>
  `;
}

function showSection(sectionId) {
  document.querySelectorAll(".section").forEach(section => section.style.display = "none");
  document.getElementById(sectionId).style.display = "block";
}

function updateNutritionPlan() {
  let bmi = parseFloat(document.getElementById("bmiResult").innerText);
  let nutritionDetails = document.getElementById("nutritionDetails");

  if (!bmi) {
      nutritionDetails.innerHTML = `<p>Please calculate your BMI first.</p>`;
      return;
  }

  let planTitle = "";
  let mealPlans = [];

  // Determine the meal plan based on the BMI value
  if (bmi < 18.5) {
      planTitle = "Weight Gain Meal Plan";
      mealPlans = [
          { food: "Oatmeal with peanut butter & banana", calories: "450 kcal", image: "../Images/peanut.jpg" },
          { food: "Nuts & Greek yogurt", calories: "300 kcal", image: "../Images/yogrt.jpg" }
      ];
  }
  else if (bmi < 24.9) {
      planTitle = "Balanced Nutrition Meal Plan";
      mealPlans = [
          { food: "Scrambled eggs with whole-grain toast", calories: "350 kcal", image: "../Images/egg.jpg" },
          { food: "Hummus & veggie sticks", calories: "250 kcal", image: "../Images/vegstcik.jpg" }
      ];
  } else {
      planTitle = "Weight Loss Meal Plan";
      mealPlans = [
          { food: "Smoothie with spinach, banana & almond milk", calories: "300 kcal", image: "../Images/ALmond.jpg" },
          { food: "Grilled chicken salad with olive oil dressing", calories: "400 kcal", image: "../Images/Grilled.jpg" }
      ];
  }

  // Generate HTML for the meal plans
  let mealPlanHTML = `<h3>${planTitle}</h3><div class="meal-plan-container">`;

  mealPlans.forEach(meal => {
      mealPlanHTML += `
          <div class="meal-card">
              <img src="${meal.image}" alt="${meal.food}" class="meal-image">
              <p class="meal-name">${meal.food}</p>
              <p class="meal-calories">Calories: ${meal.calories}</p>
          </div>
      `;
  });

  mealPlanHTML += `</div>`;
  nutritionDetails.innerHTML = mealPlanHTML;
}
function showSection(sectionId) {
  const sections = document.querySelectorAll(".section");
  sections.forEach(section => section.style.display = "none");
  document.getElementById(sectionId).style.display = "block";
}
function openForm(title, content) {
  alert(title + "\n\n" + content);}

// ==================== LOAD COURSES ====================
async function loadCourses() {
    const bmiStatus = localStorage.getItem("bmiStatus"); 
    const userId = localStorage.getItem("userId");       
    const container = document.getElementById("courses-container");

    container.innerHTML = "";
    container.style.padding = "20px";
    container.style.borderRadius = "10px";
    container.style.textAlign = "center";
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.justifyContent = "flex-start";
    container.style.alignItems = "center";
    container.style.color = "white";

    if (!bmiStatus) {
        container.innerHTML = `<p style="font-size:18px; color:white; text-align:center;">
            Please calculate your BMI first to see recommended courses.
        </p>`;
        return;
    }

    try {
        const res = await fetch("http://localhost:5000/course");
        const data = await res.json();

        if (!data.success || data.courses.length === 0) {
            container.innerHTML = `<p style="font-size:18px; color:white; text-align:center;">
                No courses available right now.
            </p>`;
            return;
        }

        const recommendedCourses = data.courses.filter(course => course.bmi_category === bmiStatus);

        if (recommendedCourses.length === 0) {
            container.innerHTML = `<p style="font-size:18px; color:white; text-align:center;">
                No recommended courses for your BMI status: <b>${bmiStatus}</b>
            </p>`;
            return;
        }

        const heading = document.createElement("h2");
        heading.innerText = "Recommended Courses for You";
        heading.style.color = "white";
        heading.style.marginBottom = "20px";
        container.appendChild(heading);

        // Fetch user progress
        let progressData = [];
        if (userId) {
            try {
                const progressRes = await fetch(`http://localhost:5000/progress/${userId}`);
                const progressJson = await progressRes.json();
                if (progressJson.success) progressData = progressJson.progress;
            } catch (err) {
                console.error("Error fetching progress:", err);
            }
        }

        window.players = {};

        recommendedCourses.forEach(course => {
            const card = document.createElement("div");
            card.classList.add("course-card");
            card.style.backgroundColor = "#222";
            card.style.border = "1px solid #444";
            card.style.borderRadius = "10px";
            card.style.padding = "15px";
            card.style.margin = "15px";
            card.style.textAlign = "center";
            card.style.width = "350px";
            card.style.boxShadow = "0 6px 12px rgba(0,0,0,0.5)";
            card.style.color = "white";
            card.style.transition = "transform 0.3s, box-shadow 0.3s";

            card.onmouseenter = () => {
                card.style.transform = "translateY(-5px)";
                card.style.boxShadow = "0 10px 20px rgba(0,0,0,0.6)";
            };
            card.onmouseleave = () => {
                card.style.transform = "translateY(0)";
                card.style.boxShadow = "0 6px 12px rgba(0,0,0,0.5)";
            };

            const userProgress = progressData.find(p => p.course_id === course.course_id);
            const progressPercentage = userProgress ? userProgress.progress_percentage : 0;

            card.innerHTML = `
                <!-- YouTube player container -->
                <div id="player-${course.course_id}" style="width:100%; height:200px;"></div>
                <h3 style="color:white; margin-top:10px;">${course.title}</h3>
                <p style="color:white; font-size:14px;">${course.description}</p>

                <!-- Progress Bar -->
                <div style="margin-top:10px;">
                    <div style="background:#444; border-radius:8px; width:100%; height:15px; position:relative;">
                        <div class="progress-bar" id="progress-${course.course_id}" 
                             style="background:#4caf50; height:100%; width:${progressPercentage}%; border-radius:8px;">
                        </div>
                    </div>
                    <p id="progress-text-${course.course_id}" style="font-size:13px; color:#ddd; margin-top:5px;">
                        ${progressPercentage}% completed
                    </p>
                </div>
            `;
            container.appendChild(card);
        });

      
        if (window.YT && window.YT.Player) initYouTubePlayers(recommendedCourses, userId);

    } catch (error) {
        console.error("❌ Error loading courses:", error);
        container.innerHTML = `<p style="font-size:18px; color:red; text-align:center;">
            Failed to load courses.
        </p>`;
    }
}

function initYouTubePlayers(courses, userId) {
    courses.forEach(course => {
        const player = new YT.Player(`player-${course.course_id}`, {
            videoId: extractVideoId(course.video_url),
            events: {
                'onStateChange': (event) => trackProgress(event, course.course_id, userId)
            }
        });
        window.players[course.course_id] = player;
    });
}

function extractVideoId(url) {
    const match = url.match(/(?:\?v=|\/embed\/|\.be\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : '';
}

window.progressIntervals = {};

function trackProgress(event, courseId, userId) {
    if(event.data === YT.PlayerState.PLAYING) {
        const player = window.players[courseId];
        const interval = setInterval(async () => {
            if(player.getPlayerState() !== YT.PlayerState.PLAYING) {
                clearInterval(interval);
                return;
            }

            const currentTime = player.getCurrentTime();
            const duration = player.getDuration();
            const progressPercentage = Math.floor((currentTime / duration) * 100);

            
            const bar = document.getElementById(`progress-${courseId}`);
            const text = document.getElementById(`progress-text-${courseId}`);
            if(bar) bar.style.width = `${progressPercentage}%`;
            if(text) text.innerText = `${progressPercentage}% completed`;

            try {
                const res = await fetch("http://localhost:5000/progress/update", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userId, courseId, progress: progressPercentage, lastWatchedTime: currentTime })
                });
                const data = await res.json();
                console.log("Progress saved:", data);
            } catch (err) {
                console.error("Error saving progress:", err);
            }
        }, 5000);
    }
}

async function loadProgress(userId) {
    const res = await fetch(`http://localhost:5000/progress/${userId}`);
    const data = await res.json(); // Expected format: [{ course_id, progress_percentage, last_watched_time }, ...]
    
    if (data.success && data.progress) {
        data.progress.forEach(p => {
            const bar = document.getElementById(`progress-${p.course_id}`);
            const text = document.getElementById(`progress-text-${p.course_id}`);
            if (bar) bar.style.width = `${p.progress_percentage}%`;
            if (text) text.innerText = `${p.progress_percentage}% completed`;

            // Resume video
            if (window.players[p.course_id]) {
                window.players[p.course_id].seekTo(p.last_watched_time, true);
            }
        });
    }
}


window.addEventListener("beforeunload", async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    for (const courseId in window.players) {
        const player = window.players[courseId];
        if (player && typeof player.getCurrentTime === "function") {
            const currentTime = player.getCurrentTime();
            const duration = player.getDuration();
            const progressPercentage = Math.floor((currentTime / duration) * 100);

            await fetch("http://localhost:5000/progress/update", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId,
                    courseId,
                    progress: progressPercentage,
                    lastWatchedTime: currentTime
                })
            });
        }
    }
});

document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
        window.dispatchEvent(new Event("beforeunload"));
    }
});
const video = document.getElementById('myVideo');
const userId = 1;       // Logged-in user ID
const courseId = 101;   // Current course/video ID

// Send progress every 5 seconds
setInterval(() => {
    const progress = (video.currentTime / video.duration) * 100;
    const lastWatched = video.currentTime;

    fetch('http://localhost:5000/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            user_id: userId,
            course_id: courseId,
            progress_percentage: progress.toFixed(2),
            last_watched_time: lastWatched.toFixed(2)
        })
    }).then(res => res.json())
      .then(data => console.log('Progress saved:', data))
      .catch(err => console.error('Error saving progress:', err));
}, 5000);


// Send progress every 5 seconds
setInterval(() => {
    const progress = (video.currentTime / video.duration) * 100;
    const lastWatched = video.currentTime;

    fetch('http://localhost:5000/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            user_id: userId,
            course_id: courseId,
            progress_percentage: progress.toFixed(2),
            last_watched_time: lastWatched.toFixed(2)
        })
    }).then(res => res.json())
      .then(data => console.log('Progress saved:', data))
      .catch(err => console.error('Error saving progress:', err));
}, 5000);


document.addEventListener("DOMContentLoaded", loadCourses);

