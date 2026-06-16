DOGSPA - Technology Stack & Architecture
=========================================

This document outlines the core technologies used to build the premium DOGSPA web application, along with the technical reasoning behind each choice.

1. FRAMEWORK: Next.js (App Router)
----------------------------------
Why we chose it: Next.js is the industry standard for production-grade React applications. We used the modern App Router architecture which provides out-of-the-box SEO optimization (crucial for local businesses like a Dog Spa to rank on Google), lightning-fast page loads through Server-Side Rendering (SSR), and seamless image optimization. 

2. LANGUAGE: TypeScript
----------------------------------
Why we chose it: By using TypeScript instead of standard JavaScript, we ensured the codebase is strictly typed. This prevents an enormous category of runtime bugs, makes the code easier to maintain, and provides excellent autocomplete during development.

3. STYLING: Tailwind CSS (v4)
----------------------------------
Why we chose it: Tailwind allows for rapid UI development without writing complex, disjointed CSS files. We configured a highly custom design system within Tailwind (using custom Navy, Gold, and Cream variables) to achieve the premium, luxury aesthetic. It also automatically removes unused CSS for faster load times.

4. ANIMATIONS: Framer Motion
----------------------------------
Why we chose it: To give the website a true "luxury" feel, static images are not enough. We used Framer Motion to power the butter-smooth scroll animations, the dynamic "while-in-view" reveals, and the complex 3D golden hover physics on the buttons. It handles high-performance animations far better than standard CSS transitions.

5. ICONS: Lucide React
----------------------------------
Why we chose it: Lucide provides a beautiful, consistent, and lightweight set of SVG icons. By importing them as React components, we can easily change their colors and sizes (like making the calendar icon dynamically match the gold theme).

6. TYPOGRAPHY: next/font (Google Fonts)
----------------------------------
Why we chose it: We used Next.js's built-in font optimizer to load 'Playfair Display' (for elegant serif headings) and 'Inter' (for clean, readable body text). This prevents "Layout Shift" when the website loads and avoids slow external network requests to Google servers, resulting in a faster, smoother experience for the user.
