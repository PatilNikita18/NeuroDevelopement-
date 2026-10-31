
# 🌟 WonderLearn – AI-Powered Personalized Learning Platform

<p align="center">
  <img src="assets/logo.png" alt="WonderLearn Logo" width="180"/>
</p>

<p align="center">
  <b>Making Learning Fun, Interactive, Inclusive, and Personalized!</b>
</p>

---

## 📌 About the Project

WonderLearn is an AI-powered personalized learning platform designed for children with neurodevelopmental disorders, including Autism Spectrum Disorder (ASD), Attention Deficit Hyperactivity Disorder (ADHD), and Intellectual Disabilities (ID).

The platform provides an engaging and adaptive learning environment through interactive games, educational videos, stories, puzzles, and creative activities.

It uses pre-assessment results to understand children's learning abilities, identify their strengths and weaker areas, and recommend suitable learning content based on their age, interests, abilities, and learning preferences.

## 🎯 Problem Statement

Children with neurodevelopmental disorders often face difficulties with traditional learning methods because every child has different learning abilities, attention levels, interests, and educational needs.

Existing learning platforms may not provide sufficient personalization or interactive experiences for these children.

## 💡 Proposed Solution

WonderLearn provides a personalized digital learning environment that:

- Identifies learning strengths and improvement areas through pre-assessment.
- Recommends suitable learning activities based on assessment results.
- Provides interactive and engaging educational content.
- Supports different age groups and learning levels.
- Tracks learning progress and performance.
- Offers a child-friendly interface with accessibility features.

## ✨ Key Features

### 1. User Authentication
- Secure user registration and login.
- User authentication and session management using Clerk.
- Personalized user dashboard.

### 2. Pre-Assessment Module
- Evaluates children's learning abilities.
- Identifies strengths and weaker learning areas.
- Analyzes assessment responses.
- Generates a personalized learning profile.
- Creates recommendations based on assessment performance.

### 3. Personalized Learning Recommendations
- Identifies priority learning areas.
- Recommends suitable educational modules.
- Uses a scoring and ranking algorithm to prioritize learning content.
- Provides personalized learning missions.

### 4. Interactive Learning Modules

| Module | Description |
|---|---|
| 📚 Learning | Educational lessons and activities |
| 🎮 Games | Interactive educational games |
| 🎬 Videos | Categorized educational videos |
| 😊 Mood | Mood-related activities |
| 🎨 Create | Creative learning activities |
| 💚 Care | Well-being and supportive activities |
| 📊 Progress | Learning performance and progress tracking |

### 5. Video Learning
- Educational videos organized by categories.
- ABC, Animals, Emotions, Stories, Daily Living, Music, Science, Communication, Safety, and more.
- Video favorites and completion tracking.
- Calm Mode support.

### 6. Progress Tracking
- Tracks completed learning activities.
- Displays learning accuracy and performance.
- Monitors learning streaks and achievements.
- Shows individual learning progress.

### 7. Accessibility Features
- Big Text mode.
- Calm Mode.
- Text-to-speech support using browser speech synthesis.
- Simple and child-friendly navigation.
- Engaging visual elements.

## 🧠 Personalization Algorithm

WonderLearn uses a pre-assessment-based personalization approach.

**Working Process:**

1. Collect assessment responses.
2. Analyze the child's performance.
3. Identify strengths and weaker learning areas.
4. Calculate priority scores for learning topics.
5. Sort and rank learning modules based on priority.
6. Recommend the most relevant activities.
7. Track progress and update recommendations when new assessment information is available.

### Algorithm Used

**Sorting and Ranking Algorithm**

The system prioritizes learning modules according to their calculated relevance and learning priority scores.

Modules with higher priority are displayed first, helping children focus on areas where additional practice may be beneficial.

## 👥 Target Users

- Children aged 5–8 years.
- Children aged 9–12 years.
- Teenagers aged 13–18 years.
- Children with Autism, ADHD, and Intellectual Disabilities.
- Parents, caregivers, and educators.

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| React.js / TypeScript | Frontend development |
| Node.js | Backend runtime |
| Express.js | Backend framework and APIs |
| MongoDB | Database |
| Clerk | Authentication and user management |
| JavaScript / TypeScript | Application logic |
| HTML5 / CSS3 | UI development |
| Git & GitHub | Version control |
| Browser Speech Synthesis | Text-to-speech functionality |

*Adjust the frontend entry if your actual implementation uses Next.js.*

## 🏗️ System Workflow

```text
        User Registration / Login
                  |
                  v
           User Dashboard
                  |
                  v
          Pre-Assessment
                  |
                  v
       Analyze Assessment Results
                  |
                  v
       Identify Learning Weak Areas
                  |
                  v
       Calculate Priority Scores
                  |
                  v
       Sort and Rank Learning Modules
                  |
                  v
       Personalized Learning Plan
                  |
                  v
       Interactive Learning Activities
                  |
                  v
          Progress Tracking
```

## 📸 Application Screenshots

Screenshots help visitors understand how WonderLearn works.

### 1. Login and Registration

![Login Page](assets/login.png)

### 2. Dashboard

![Dashboard](assets/dashboard.png)

### 3. Pre-Assessment

![Pre-Assessment](assets/pre-assessment.png)

### 4. Personalized Learning Plan

![Personalized Learning](assets/personalized-learning.png)

### 5. Interactive Learning Modules

![Learning Modules](assets/learning-modules.png)

### 6. Educational Videos

![Video Learning](assets/videos.png)

### 7. Games and Activities

![Games](assets/games.png)

### 8. Progress Tracking

![Progress Tracking](assets/progress.png)

> Replace these image paths with your actual application screenshots.

## 📂 Project Structure

```text
WonderLearn/
│
├── frontend/
│   ├── components/
│   ├── app/
│   ├── pages/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│   └── package.json
│
├── assets/
│   ├── logo.png
│   ├── login.png
│   ├── dashboard.png
│   ├── pre-assessment.png
│   ├── personalized-learning.png
│   ├── learning-modules.png
│   ├── videos.png
│   ├── games.png
│   └── progress.png
│
├── .gitignore
└── README.md
```

*This is a suggested structure. Update it to match your actual folders and filenames.*

## ⚙️ Installation and Setup

### Prerequisites

- Node.js
- npm
- MongoDB
- Git
- Clerk account

### Step 1: Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/WonderLearn.git
cd WonderLearn
```

### Step 2: Install Frontend Dependencies

```bash
cd frontend
npm install
```

### Step 3: Install Backend Dependencies

```bash
cd ../backend
npm install
```

### Step 4: Configure Environment Variables

Create `.env` files in the appropriate frontend and backend directories.

Example configuration:

```env
MONGODB_URI=your_mongodb_connection_string
CLERK_SECRET_KEY=your_clerk_secret_key
```

Add other environment variables required by your application.

**Important:** Never upload actual API keys, secret keys, or database credentials to GitHub.

### Step 5: Start the Application

Start the backend:

```bash
cd backend
npm run dev
```

Start the frontend in another terminal:

```bash
cd frontend
npm run dev
```

Open the local URL displayed in your frontend terminal.

*Check your package.json scripts and adjust the commands if necessary.*

## 🚀 Future Scope

- Advanced AI-based learning recommendations.
- More personalized educational games.
- Parent and educator dashboards.
- Detailed learning analytics.
- Multilingual learning support.
- Additional accessibility features.
- Improved adaptive learning based on continuous performance.

## 🌍 Project Impact

WonderLearn aims to make digital education more inclusive by providing children with different learning needs an engaging, supportive, and personalized learning experience.

It focuses on improving accessibility, encouraging participation, and helping children learn at their own pace.

## 👩‍💻 Developer

**Nikita Patil**

B.Tech – Information Technology

SVKM's NMIMS, Dhule

## 📄 License

This project is developed for academic and educational purposes.

---

<p align="center">
  <b>🌟 WonderLearn – Every Child Can Learn, Every Child Can Grow! 🌟</b>
</p>
