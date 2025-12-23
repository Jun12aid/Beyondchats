🚀 BeyondChats AI Content Automation Platform

An end-to-end full-stack project that scrapes blog articles, enhances them using AI with real-world references, and displays both original and AI-updated versions in a modern React UI.

📌 Project Overview

This project is divided into three phases:

Phase 1 (Laravel)
Scrape oldest blog articles from BeyondChats and expose them via CRUD APIs.

Phase 2 (Node.js + AI)
Automate article enhancement using Google search, web scraping, and an LLM.

Phase 3 (React)
Display original and AI-generated articles in a responsive frontend.

🧱 Project Structure
beyondchats-project/
│
├── phase-1-laravel/
│   └── beyondchats-scraper/        # Laravel backend + scraper
│
├── phase-2-node/
│   └── ai-content-automation/      # Node.js AI automation service
│
└── phase-3-react/
    └── beyondchats-frontend/       # React frontend

⚙️ Phase 1 — Laravel (Scraping + APIs)
✅ Features

Scrapes 5 oldest articles from:

https://beyondchats.com/blogs/


Stores articles in MySQL

Laravel CRUD REST APIs

Artisan command for scraping

Slug generation handled at backend level

🔧 Tech Used

Laravel

MySQL

DOMDocument + XPath

Artisan Commands

🔌 APIs
GET    /api/articles
GET    /api/articles/{id}
POST   /api/articles
PUT    /api/articles/{id}
DELETE /api/articles/{id}

⚙️ Phase 2 — Node.js (AI Automation)
✅ Features

Fetches latest article from Laravel

Searches article title on Google (SerpAPI)

Extracts top 2 external blog articles

Scrapes reference content using Cheerio

Rewrites article using Groq LLM

Appends reference citations

Publishes AI-generated article back to Laravel

🧠 AI Model

Groq (Open Source LLM)

Prompt-engineered for originality & SEO

No plagiarism / no AI mention in output

🔧 Tech Used

Node.js

Axios

SerpAPI

Cheerio

Groq SDK

⚙️ Phase 3 — React Frontend
✅ Features

Fetches articles from Laravel API

Displays articles as cards

Filter:

All

Original

AI Updated

Article detail page

AI badge & references display

Links between original and AI articles

🎨 UI

Responsive grid layout

Tailwind CSS styling

React Router navigation

🔧 Tech Used

React (Vite)

Axios

Tailwind CSS

React Router DOM

🗃️ Database Enhancements

Additional fields added via migration:

original_article_id

is_ai_generated

references

updated_version

This allows:

Version tracking

AI vs original differentiation

Clean frontend filtering

▶️ How to Run the Project
Phase 1 (Laravel)
cd phase-1-laravel/beyondchats-scraper
composer install
php artisan migrate
php artisan serve

Phase 2 (Node.js)
cd phase-2-node/ai-content-automation
npm install
npm start

Phase 3 (React)
cd phase-3-react/beyondchats-frontend
npm install
npm run dev

🧠 Key Learnings & Highlights

Full-stack system design

Real-world scraping & automation

API-based architecture

AI prompt engineering

Debugging production-level issues

Clean separation of concerns

Scalable, modular structure

📌 Future Improvements

Pagination & search in frontend

Authentication for admin publishing

SEO optimization

Server-side filtering

Deployment (Docker / Cloud)

👨‍💻 Author

JD
Full-Stack Developer | AI Automation Enthusiast

✅ Final Note

This project demonstrates real-world backend + AI + frontend integration, not just basic CRUD or UI work. It reflects production-style thinking, debugging skills, and modern AI workflows.
