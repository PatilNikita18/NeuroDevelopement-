# WonderLearn API (scaffold)

Not yet implemented — this folder is the agreed structure for the future
Node.js + Express + TypeScript + MongoDB/Mongoose + Redis + Socket.IO backend.

```
server/
├── src/
│   ├── controllers/   # request handlers
│   ├── routes/        # /api/* route groups
│   ├── models/        # Mongoose schemas (Child, LearningProfile, Activity, ...)
│   ├── services/       # business logic, talks to Mongo/Redis/AI service
│   ├── middleware/     # auth, validation, error handling
│   ├── utils/
│   └── app.ts
```

Endpoints the frontend already expects (see `src/services/aiService.ts` and
`src/services/queries.ts` in the client app):

```
GET  /api/ai/recommendation
GET  /api/ai/next-activity
POST /api/ai/analyze-performance
GET  /api/ai/mastery
GET  /api/activities
GET  /api/progress
GET  /api/achievements
```
