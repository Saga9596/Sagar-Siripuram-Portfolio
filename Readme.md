# Sustainable Portfolio Web Builder Project
        
Build me a responsive, gamified portfolio website with a roadmap-style navigation inspired by Duolingo’s lesson map—infused with a sustainability & climate theme.
 
* Top-level nodes: “About,” “Portfolio,” “Skills,” “Blog,” “Contact.”
* Under Portfolio, automatically generate sub-tiles for:
  * Work Experience
  * Projects
  * Case Studies (deep dives on flagship LCAs, EPDs)
  * Impact Metrics (CO₂ avoided, EPDs issued, materials diverted)
  * Certifications & Training (ACLCA LCACP, Healthy Materials Lab, LEED)
  * Publications & Talks (whitepapers, conference presentations)
  * Testimonials & Endorsements
  * Volunteer & Community Engagement
  * Awards & Recognitions
  * Media Gallery (photo/video highlights)
 
* A full-width green pathway across the top, shaped like a meandering river or tree root system.
* Circular leaf- or droplet-shaped nodes for each section and sub-section, all connected by the path.
* As the user scrolls, each node “sprouts” a subtle leaf animation and fills with a vibrant green gradient to show progress.
* Hovering a node displays a tooltip with an eco-icon plus a one-line summary or metric.
* Clicking a node smooth-scrolls to its content section and triggers a tiny “eco-pulse” ripple along the path.
 
* Transform the roadmap into a vertical “growth spine” down the left edge, with nodes expanding into eco-card overlays on the right.
* The path animates like a growing vine as you scroll, leaving a “snail-trail” of tiny leaves in its wake.
* Tapping a node expands a card showing its title, icon, and a short sustainability stat or description.
 
* Earth-tone palette: forest greens, sky blues, warm earth browns on a neutral background.
* Dark/light mode toggle that shifts to a moonlit forest palette for night viewing.
* Micro-interactions:
  * Node entrance → gentle “sprout” bounce.
  * Section complete → quick “seed burst” of leaf confetti.
  * Tooltip hover → subtle leaf-sway animation.
 
* All nodes and sustainability content drawn from a simple JSON file, example entry:
  { "id": 3, "title": "Impact Metrics", "icon": "leaf", "slug": "/portfolio/impact-metrics" }
* New roadmap tiles auto-generate whenever you add to that JSON.
 
A fully self-hosted portfolio that looks and feels like a living ecosystem—complete with Duolingo-style roadmap navigation, playful sustainability animations, and mobile-smart adaptations.

# How to use

1. Import FlootSetup.css to set up the css variables and basic styles.
2. Import the components into your react codebase.
