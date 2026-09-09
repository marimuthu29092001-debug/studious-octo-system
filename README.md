# Stackly Enterprise Suite — Modern UI/UX & Micro-Animations

A high-performance, accessible, enterprise-grade React web application enhanced with subtle, modern 60 FPS micro-animations, comprehensive component states, and streamlined visual hierarchy.

---

## Key UI/UX & Micro-Animation Enhancements

### 1. Motion & Animation Tokens (GPU-Accelerated)
- **Zero Heavy Dependencies**: Built purely with lightweight CSS transitions and keyframes targeting hardware-accelerated `transform` and `opacity` properties.
- **Physics-Inspired Easing Curves**:
  - `var(--ease-spring)`: `cubic-bezier(0.34, 1.56, 0.64, 1)` for toggles, micro-bounces, and badges.
  - `var(--ease-smooth)`: `cubic-bezier(0.16, 1, 0.3, 1)` for page transitions, modals, and drawers.
  - `var(--ease-standard)`: `cubic-bezier(0.4, 0, 0.2, 1)` for button hover lifts and background shifts.
- **Accessible Reduced-Motion Support**: Honors `@media (prefers-reduced-motion: reduce)` to disable transitions for sensitive users.

### 2. Interactive Component States
- **Buttons & Icon Controls**: Subtle elevation lift (`translateY(-1.5px)`), tactile active press (`scale(0.985)`), and high-contrast accessible `:focus-visible` focus rings.
- **Interactive Cards & KPI Metrics**: Upward float (`translateY(-3px)`) with layered box-shadow expansion and gradient accent lines on hover.
- **Collapsible Sidebar**: Smooth expand/collapse transition (`260px` ↔ `76px`) with tooltips, active tab indicator bars, and spinning brand badge.
- **Modals & Dialogs**: Spring scale-in (`scale(0.95)` → `scale(1)`) with backdrop blur (`backdrop-filter: blur(6px)`) and Escape key dismiss.
- **Shimmer Skeleton Loading**: Sweeping linear-gradient placeholders toggleable via the **"Simulate Loading"** header control for live testing.
- **Toast Notifications**: Stackable floating notifications that slide in with spring physics and auto-dismiss.
- **Theme Switcher**: Dark and Light themes with real-time CSS variable interpolation.

---

## Application Modules & Pages

1. **Executive Dashboard**: Real-time KPI cards, interactive throughput bar chart with hover tooltips, and a live activity feed.
2. **Reports & Analytics**: Dossier filtering, search query matching, and simulated CSV/PDF/Full exports with download progress.
3. **User Management**: Team directory table, role filters, status badges, and animated Add/Edit/Delete user modals.
4. **Team Management**: Engineering squad cards, avatar stacks with micro-hover zoom, and squad creation drawer.
5. **Project Portfolio**: Initiative board with animated milestone progress bars and project creation modal.
6. **SLA Tracking**: 99.98% uptime telemetry, MTTD/MTTR metrics, service breakdown, and incident triage.
7. **Settings & Preferences**: Spring-physics switches, profile editing, and security triggers.
8. **Auth & Password Recovery**: Seamless modal flow transitioning from Login to Email Verification, 6-digit OTP code, and Password Reset.

---

## How to Run the Application

### Option A: Standalone Instant Preview (Zero Dependencies)
Simply open `preview.html` directly in any modern browser (Chrome, Edge, Firefox, Safari):
- No Node.js or `npm install` needed.
- Uses React 18 and Lucide icons via CDN.

### Option B: Vite React Development Server
```bash
npm install
npm run dev
```
Then open `http://localhost:3000` in your browser.
