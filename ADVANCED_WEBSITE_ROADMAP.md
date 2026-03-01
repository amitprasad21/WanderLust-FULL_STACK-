# WanderLust — Simple Showcase PRD

Use this when your goal is: **"I want to showcase this as a full-stack responsive website and list more properties."**

---

## Product Goal (Simple)
Build a stable, responsive property listing website where users can:
1. Sign up / log in
2. Create and manage listings
3. View listing details with image + map + reviews
4. Search/filter listings
5. Use it smoothly on mobile + desktop

---

## Core 5 (Most Important)

## 1) Fix Basic Production Safety (minimum)
**Why:** Showcase project should not look insecure.

### Tasks
- Add `helmet` middleware.
- Set secure session cookie config:
  - `httpOnly: true`
  - `sameSite: "lax"`
  - `secure: true` in production.
- Keep `saveUninitialized: false`.

### Done when
- App runs normally and login/session still works.

---

## 2) Improve Listing Quality (so you can add more properties cleanly)
**Why:** More listings require clean data.

### Tasks
- Make key listing fields required and validated:
  - title, description, price, location, country, category.
- Add fallback image if user does not upload one.
- Add basic DB indexes for faster listing/search pages:
  - `location`, `category`, `price`.

### Done when
- New listings are consistent and pages stay fast with larger data.

---

## 3) Make Responsive UI Properly Showcase-Ready
**Why:** "Responsive full-stack" is your showcase target.

### Tasks
- Ensure listing cards and navbar work well on mobile.
- Fix spacing/alignment issues on `index`, `show`, `new`, `edit` pages.
- Ensure forms are mobile-friendly (input widths, button sizes, readable labels).
- Keep one consistent button/color style.

### Done when
- Website looks clean on phone, tablet, desktop.

---

## 4) Add Simple Pagination + Better Filters
**Why:** You want to list more properties; long pages look unprofessional.

### Tasks
- Add server-side pagination on listing index.
- Keep existing filters (location/category/price/search) working with pagination.
- Show count like: `Showing 1-12 of 120 listings`.
- Add clear filter reset button.

### Done when
- Browsing many properties is smooth and organized.

---

## 5) Add Basic Testing + Deployment Readiness
**Why:** Needed to confidently demo project.

### Tasks
- Add at least:
  - 1 auth route test (login/signup)
  - 1 listing CRUD test
  - 1 review create/delete test
- Add `.env.example` with required variables.
- Update README with exact run/deploy steps.

### Done when
- Anyone can run project quickly and core flows are verifiable.

---

## Add More Things (Simple but High-Value)

## 6) Better Listing Cards (for stronger first impression)
### Tasks
- Show price, location, category clearly on cards.
- Add image lazy loading.
- Add hover effect and consistent card heights.

## 7) Better Search UX
### Tasks
- Add "No results found" friendly state.
- Keep filters selected after search.
- Add quick chips for common categories.

## 8) Basic User Profile Page
### Tasks
- Show username, email, and user’s own listings.
- Add edit profile (name/email only).

## 9) Simple Dashboard Sections
### Tasks
- "My Listings" page.
- "My Reviews" page (optional simple list).
- Add quick actions: Edit/Delete/View.

## 10) Better Error Pages
### Tasks
- Custom 404 page with "Back to listings" button.
- Better 500 page message with retry suggestion.

## 11) SEO + Sharing Basics
### Tasks
- Add unique `<title>` per page.
- Add meta description for listing pages.
- Add Open Graph tags for nicer link previews.

## 12) Demo-Ready Seed Data
### Tasks
- Increase sample listing count with good variety (city, mountain, beach, budget, premium).
- Ensure every seeded listing has image, category, and valid location.

---

# Copy-Paste LLM Instruction (Updated)

Use this exact prompt with any LLM:

```text
You are helping me improve my Node.js + Express + MongoDB + EJS project (WanderLust).
Goal: make it a clean full-stack responsive showcase project, not enterprise-level.

Implement in this order:
Core 5:
1) minimum security hardening (helmet + proper session cookie settings)
2) strong listing validation + fallback image + indexes for location/category/price
3) mobile-first responsive polish on listing pages/forms/navbar
4) server-side pagination with working filters and result count
5) minimal test coverage for auth, listing CRUD, and reviews + .env.example + README updates

Then add simple upgrades:
6) better listing cards + lazy loading
7) better search UX (no-result state + persistent filters)
8) basic user profile page
9) simple dashboard pages (My Listings, optional My Reviews)
10) better custom 404/500 pages
11) basic SEO tags (title/meta/OG)
12) better seed data for demo

Rules:
- Keep changes simple and practical.
- Do not add heavy architecture or microservices.
- Keep existing coding style.
- For each change, provide: files changed, code diff, and test command.
- If a feature is optional, choose the simplest implementation.
```

---

## Suggested Order (Quick)
1. Security + session config
2. Validation + indexes
3. Responsive UI polish
4. Pagination + filters
5. Tests + README/.env.example
6. Profile + dashboard + better cards/search
7. Error pages + SEO + seed data

This is enough to present WanderLust as a **solid full-stack responsive project** with better demo quality.
