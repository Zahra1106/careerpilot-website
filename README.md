# AI CareerPilot — Web App

A real, working web version of the CareerPilot app — same "liquid glass"
design system, wired to your actual backend (the one in `src.zip` /
`AppConstants.baseUrl` from the Flutter app). Not a mockup: signup/login,
CV analysis, job matching, interview practice, and an applications tracker
all call your live API.

## Stack
React + Vite, React Router, Tailwind CSS, axios, framer-motion,
`@react-three/fiber` (3D hero on the landing page only).

## Run it (VS Code)
```bash
npm install
npm run dev
```
Open the printed local URL (usually http://localhost:5173).

A `.env` is already included, pointed at:
```
VITE_API_BASE_URL=https://ai-careerpilot-pjrd.vercel.app/api
```
If your backend is running somewhere else (a different Vercel deployment,
or `localhost:5000` locally), change that one line and restart `npm run dev`.

## If requests fail with a network/CORS error
`src.zip` only contained routes/controllers/models — no `app.js`/`server.js`,
so I couldn't check the CORS config. If the browser console shows a CORS
error, your Express server needs to allow this site's origin, e.g.:
```js
app.use(cors({ origin: ["http://localhost:5173", "https://your-deployed-site.com"] }));
```
Send that file over if you want me to fix it directly.

## What's wired up (all real API calls)
| Page | Route | Backend endpoint(s) |
|---|---|---|
| Signup / Login | /signup, /login | POST /auth/signup, POST /auth/login |
| Dashboard | /dashboard | GET /dashboard/summary |
| Analyze CV | /analyze-cv | POST /ai/analyze-cv (file upload or pasted text) |
| Job Match | /job-match | POST /ai/match-job |
| Interview Prep | /interview-prep | POST /ai/interview-question, POST /ai/evaluate-answer |
| Applications | /applications | GET/POST/PUT/DELETE /applications |
| Profile | /profile | PUT /auth/me |

The public marketing page (`/`) is unchanged from before — hero, features,
how-it-works, testimonial, CTA — its buttons now route to `/signup`.

## Auth
JWT + user are cached in `localStorage` (`cp_token`, `cp_user`) — same
pattern as the Flutter app's `TokenStorage`. `ProtectedRoute` redirects to
`/login` for any signed-out visitor hitting an app page.

## Not yet built
- Forgot/reset password screens (backend supports `/auth/forgot-password`
  and `/auth/reset-password` — just say the word and I'll add them)
- `improve-cv`, `cover-letter`, and `skill-gap` endpoints aren't wired to
  any page yet — tell me where you'd want each (e.g. a "rewrite this
  bullet" button inside Analyze CV, a Cover Letter page, a Skill Gap page)
- Light mode (site is dark-only for now, matching the reference kit)

## Landing page — cinematic redesign
- **Hero**: the glass-orb background was replaced with `DragonflySwarm.jsx`
  — an original three.js scene of glowing, wing-flapping dragonflies on
  Lissajous flight paths, in the site's own violet/teal/pink palette.
  (Inspired by the "cinematic 3D insect" reference you shared, but built
  from primitives here rather than reusing that clip, which belongs to
  the site it was captured from.)
- **AI video section**: your `210424.mp4` is now a compressed, muted,
  looping background (`public/media/ai-face-bg.mp4`, ~1.6MB, down from
  20MB) in a new full-bleed section between Features and How It Works.
- **FAQ**: a new accordion section before the final CTA, for length and
  because "how does this actually work" questions belong on a landing
  page.
- The MotionSites screen recording wasn't embedded — it's someone else's
  product UI, so I used it only as a style reference for the hero.

## Structure
```
src/
  lib/api.js               axios client - base URL, auth header, error unwrapping
  context/AuthContext.jsx  user/session state, login/signup/logout
  components/
    ProtectedRoute.jsx      guards signed-in-only routes
    AppNavbar.jsx           top nav for signed-in pages
    AppLayout.jsx           page shell (navbar + container) for app pages
    AuthShell.jsx           centered card shell for login/signup
    ScoreRing.jsx           reusable circular score indicator
    ResultList.jsx          reusable labeled bullet list for AI results
    Navbar.jsx, Hero.jsx, GlassOrbField.jsx, GlassMockup.jsx,
    Features.jsx, HowItWorks.jsx, Testimonial.jsx, CTA.jsx, Footer.jsx
                            the public landing page (unchanged)
  pages/
    Landing.jsx, Login.jsx, Signup.jsx, Dashboard.jsx, AnalyzeCV.jsx,
    JobMatch.jsx, InterviewPrep.jsx, Applications.jsx, Profile.jsx
```
