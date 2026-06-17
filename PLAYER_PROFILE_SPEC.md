# Soccer Player Recruiting Profile — Build Specification

A generic specification for building a college recruiting website and printable one-page profile for a high school soccer player. Hand this document to an AI coding agent (e.g. GitHub Copilot) along with the player's photos and it will produce a complete, ready-to-host site.

---

## 1. Project Goals

- Give college coaches a single place to learn about the player, watch video, and contact the appropriate coach.
- Produce a **printable one-page PDF** (`player.html`) that can be handed out at showcases and tournaments.
- Host the site for free on **GitHub Pages** with a custom domain.
- The site must be **mobile-first** — coaches will often view it on a phone at the sideline.

---

## 2. Player Information to Collect

Replace every value in angle brackets with the real player's information.

```
Name:              <First Last>
Graduation Year:   <YYYY>
Current Grade:     < / Sophomore / Junior / Senior>
Position(s):       <e.g. Midfielder / Winger>
Dominant Foot:     <Right / Left / Both>
Location:          <City, State>

High School:
  Name:            <School Name>
  Team Name:       <e.g. Wolf Pack Soccer>
  Website / URL:   <https://...>
  Coaches:         <Coach 1 Name> & <Coach 2 Name>
  Coach Email:     <coach@example.com>

Club:
  Name:            <Club Name>
  Program:         <e.g. MLS Next — 2010 Boys>
  Website / URL:   <https://...>
  Coach:           <Coach Name>
  Coach Email:     <coach@example.com>

Bio (2–3 short paragraphs):
  <Write in first person. Cover: passion for the sport, goal to play
   in college, key on-field qualities — coachability, work ethic,
   resilience, team-first attitude.>
```

> **Contact policy:** Do NOT include the player's personal email or phone number anywhere on the site or profile. College coaches must contact the club or high school coach directly. This is the appropriate protocol for recruiting minors.

---

## 3. Video Links to Collect

The site has two types of video links. Collect as many as are available.

### Highlight Clips
| Field | Description |
|-------|-------------|
| Platform | e.g. Taka, Hudl, YouTube |
| URL | Direct link to the player's highlight reel or clip page |
| Note | Any login / account requirement the viewer should know about |

### Full Match Video
For each match, collect:

| Field | Example |
|-------|---------|
| Date | May 26, 2026 |
| Matchup | Team A vs. Team B |
| Location | City, State |
| Platform | e.g. Veo |
| URL | https://app.veo.co/matches/... |

---

## 4. Images to Collect

Place all images in an `images/` folder in the project root.

| Use | Recommended Shot | File |
|-----|-----------------|------|
| Hero (large background) | Action shot — ball at feet or in a challenge, landscape/wide crop works well | e.g. `IMG_001.jpeg` |
| About section | Good portrait-style action or celebration photo | e.g. `IMG_002.jpeg` |
| Gallery | 10–15 varied game/training photos | any `.jpeg` |

**Tips:**
- JPEG format is fine; no need to convert.
- The hero image crops to `object-position: center 25%` — make sure the player's face and body are in the upper half of the frame.
- The about photo crops to a 3:4 portrait ratio — a vertical/tall shot works best.
- All gallery images are square-cropped; centered subjects photograph best.

---

## 5. Website Structure (`index.html`)

The main site is a single scrolling page with the following sections in order. The navigation bar links to each section.

### 5.1 Navigation
- Fixed to the top; transparent over the hero, navy background once scrolled.
- Logo: player's name (left).
- Links: About · Teams · Highlights · Gallery · Contact (right); Contact styled as a green button.
- Hamburger menu on mobile (≤ 640px).

### 5.2 Hero
- Full-viewport background photo with a dark navy gradient overlay.
- Content: graduation year badge · player name (large) · position · location · two CTA buttons ("Watch Highlights" → `#highlights`, "Contact for Recruiting" → `#contact`).
- Animated scroll-down chevron.

### 5.3 Stats Bar
- Full-width navy band immediately below the hero.
- Six stat items: Grad Year · Grade · Position · Dominant Foot · High School · Club.

### 5.4 About
- Two-column layout: text left, photo right (stacks on mobile).
- Text: two bio paragraphs + a detail list (location, grade, position, foot) with small icons.
- High school and club names are hyperlinks to their respective websites.

### 5.5 Teams
- Two cards side by side (stacks on mobile).
- **High School card** (navy header): school name, team name, city, coaches.
- **Club card** (green header): club name, program level, city, coach.

### 5.6 Highlights & Match Video
- Featured highlight link: large dark card with a play-button icon, platform name, and title.
- Match video grid (2 columns, stacks on mobile): one card per match showing date, matchup, location, and a "Watch on [Platform]" link.

### 5.7 Gallery
- 4-column photo grid (3 on tablet, 2 on mobile).
- Clicking any photo opens a **lightbox** — full-screen overlay with prev/next navigation and keyboard support (← → Esc).

### 5.8 Contact
- Short introductory sentence directing coaches to contact the club or high school coach.
- Two cards side by side (stacks on mobile): one for the club coach, one for the high school coaches.
- Each card shows name, team, email (as a `mailto:` link), and a button linking to the team's website.

### 5.9 Footer
- Navy background, centered: player name · class year · position · teams · city.

---

## 6. Print / PDF Profile (`player.html`)

A standalone HTML file that produces a clean **letter-size, one-page PDF** via browser Print → Save as PDF (margins: None).

### Layout
```
┌─────────────────────────────────────────────────────────┐
│  HEADER: Name (large) | stat pills                      │
│          Eyebrow: "College Recruiting Profile · 20XX"   │
├──────────────────┬──────────────────────────────────────┤
│                  │  About                               │
│   Main photo     │  ─────────────────────────────────── │
│   (fills height) │  Player Details (2-col grid)         │
│                  │  ─────────────────────────────────── │
│                  │  Teams (2 cards)                     │
│                  │  ─────────────────────────────────── │
│                  │  Contact (2 cards — coaches only)    │
├──────────────────┴──────────────────────────────────────┤
│  GREEN BAR: "Full Profile & Match Video · [domain]"     │
└─────────────────────────────────────────────────────────┘
```

### Content included on the PDF
- Player name, grad year, grade, position, dominant foot, location
- Bio paragraph (same text as the website About section)
- High school: name, team name, city, coaches
- Club: name, program, city, coach
- Club coach: name, email
- High school coaches: name(s), email
- Custom domain prominently displayed in the green footer bar

### Content intentionally excluded from the PDF
- Links to external websites (not clickable in print)
- Match video links
- Gallery images (only the one hero/main photo)

### B&W print compatibility
- All text on dark backgrounds uses high-opacity white (≥ 88%) so it remains legible when a printer desaturates colors.
- Contact boxes have a solid border that appears in grayscale even if the dark background prints lightly.
- The green callout bar has a top border for structural clarity in B&W.

---

## 7. Hosting on GitHub Pages

### Steps
1. Create a new **public** GitHub repository (e.g. `soccer-website`).
2. Push the project to the `main` branch.
3. In the repo → **Settings → Pages**, set source to `main` / root.
4. The site will be live at `https://<username>.github.io/<repo-name>/`.

### Custom Domain
1. Register a domain (e.g. `playername.com` or `playername.soccer`).
2. Create a file named `CNAME` in the project root containing only the domain:
   ```
   playername.com
   ```
3. At your DNS registrar, add these records:

   | Type | Name | Value |
   |------|------|-------|
   | A | `@` | `185.199.108.153` |
   | A | `@` | `185.199.109.153` |
   | A | `@` | `185.199.110.153` |
   | A | `@` | `185.199.111.153` |
   | CNAME | `www` | `<username>.github.io` |

4. Back in GitHub Pages settings, confirm the custom domain and enable **Enforce HTTPS** once the TLS certificate is provisioned (usually within 30 minutes).

---

## 8. File Structure

```
/
├── index.html          # Main website (single page)
├── player.html         # Print/PDF one-page recruiting profile
├── CNAME               # Custom domain (one line, no http://)
├── css/
│   └── styles.css      # All site styles
├── js/
│   └── main.js         # Nav scroll behavior, hamburger menu, lightbox
└── images/
    └── *.jpeg          # All player photos
```

---

## 9. Design Decisions & Constraints

| Decision | Rationale |
|----------|-----------|
| Single HTML file for the main site | No build tools needed; works directly on GitHub Pages |
| CSS custom properties for colors | Easy to re-theme for a different player (change navy/green in `:root`) |
| `@media (hover: hover)` guards all transform effects | Prevents sticky hover states on iOS/Android touch screens |
| `@media (prefers-reduced-motion: reduce)` | Disables animations for users who need it |
| `scroll-padding-top` set to nav height | Anchor links land with section headings visible below the fixed nav |
| `100svh` for hero height | Fills the visible viewport on mobile, accounting for browser chrome |
| No player personal contact info | Appropriate protocol for recruiting minors — coaches contact coaches |
| `target="_blank" rel="noopener noreferrer"` on all external links | Security best practice; prevents tab-napping |
| All images use `loading="lazy"` in gallery | Improves initial page load performance |
| Fonts: Barlow Condensed (headings) + Inter (body) | Loaded from Google Fonts; clean, modern, sports-appropriate |

---

## 10. Updating the Site

Common updates and where to make them:

| Update | File(s) |
|--------|---------|
| Add a new match video | `index.html` — add a new `.match-card` `<a>` in the `#highlights` section |
| Change hero image | `index.html` — update `src` on the `.hero-img` `<img>` |
| Add/remove gallery photos | `index.html` — add/remove `.gallery-item` buttons; keep `data-index` values sequential |
| Change coach contact info | `index.html` and `player.html` |
| Update bio | `index.html` (`#about` section) and `player.html` (About block) |
| Change custom domain | `CNAME` file + GitHub Pages settings + DNS records |
| Re-theme colors | `css/styles.css` `:root` block — change `--color-navy` and `--color-green` |
