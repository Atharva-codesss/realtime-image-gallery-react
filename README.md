# FotoOwl: Real-Time Image Gallery

A modern real-time image gallery application where users can browse images, react with emojis, and leave comments — all synced live across users and tabs.

🔗 **Live Demo**  
  https://realtime-image-gallery-react-jg6lovxzk.vercel.app/

🔗 **GitHub Repository**  
  https://github.com/Atharva-codesss/realtime-image-gallery-react

---

##  Features

### Core Features
- Responsive image grid with modal preview
- Emoji-based reactions on images
- Real-time reaction count updates
- Per-image comments
- Live activity feed
- Instant updates across multiple users and tabs

### Bonus Enhancements
- Toggle reactions (react / unreact)
- One reaction per user per image
- Live feed updates for reactions and comments
- Smooth modal UI with scroll support
- Skeleton loaders for improved UX
- Fully responsive dark-themed interface

---

##  Real-Time Architecture

This project uses **InstantDB** to enable real-time collaboration:

- Reactions and comments are stored as entities
- Live queries automatically sync UI updates
- Feed events are emitted on user interactions
- No polling. Changes propagate instantly

---

##  Tech Stack

- **Frontend:** React, TypeScript, Vite  
- **Styling:** Tailwind CSS  
- **Real-Time Database:** InstantDB  
- **Image API:** Unsplash API  
- **Deployment:** Vercel  
- **Version Control:** Git & GitHub  

---
## Assignment Alignment

This project satisfies all assignment requirements:

- Real-time user interactions

- Emoji reactions

- Live updates

- Comment system

- Clean and responsive UI

⭐ Bonus features such as reaction toggling, live activity feed, and UI polish have also been implemented.
##  Environment Variables

Create a `.env` file in the root directory:

```env
VITE_INSTANT_APP_ID=your_instantdb_app_id
VITE_UNSPLASH_ACCESS_KEY=your_unsplash_access_key

```
##  Local Development Setup

```bash
git clone https://github.com/Atharva-codesss/realtime-image-gallery-react.git
cd realtime-image-gallery-react
npm install
npm run dev
```

The app will run at:
👉 http://localhost:5173
## API Handling Strategy

This project uses the **Unsplash API** to fetch high-quality images for the gallery.

### Approach
- All Unsplash API calls are centralized inside a dedicated utility file (`src/lib/unsplash.ts`).
- API keys are securely managed using environment variables and are never hardcoded or committed to the repository.
- The API logic is kept separate from UI components to maintain clean separation of concerns.

### Data Fetching
- Images are fetched using paginated requests to avoid loading excessive data at once.
- React Query is used to manage API requests, caching, loading states, and error handling efficiently.
- This ensures smoother user experience and avoids unnecessary network calls.

### Security & Reliability
- API keys are stored in `.env` files locally and configured as environment variables in Vercel for production.
- Basic error states are handled gracefully to prevent UI crashes if the API request fails.
## InstantDB Schema & Real-Time Usage

This project uses **InstantDB** as the real-time backend to power reactions, comments, and the live activity feed.

### Data Entities
The application uses the following core entities:

- **reactions**
  - `imageId` – identifies the image being reacted to
  - `emoji` – the selected emoji reaction
  - `userId` – identifies the user
  - `createdAt` – timestamp of the reaction

- **comments**
  - `imageId` – identifies the image
  - `userId` – identifies the user
  - `text` – comment content
  - `createdAt` – timestamp of the comment

- **feedEvents**
  - `type` – event type (reaction or comment)
  - `imageId` – related image
  - `emoji` (optional) – used for reaction events
  - `userId` – user who triggered the event
  - `createdAt` – timestamp of the event

### Real-Time Behavior
- InstantDB’s live queries automatically sync updates across all connected clients.
- When a user reacts or comments, changes are reflected instantly without page refresh or polling.
- Deletions (such as reaction toggling) are handled naturally by deriving UI state from current database data.

### Why InstantDB
- Enables real-time collaboration with minimal configuration.
- Eliminates the need for manual WebSocket management.
- Simplifies backend logic while maintaining strong real-time guarantees.
## Key React & Architecture Decisions

The application is structured with a focus on modularity, clarity, and scalability.

### Component Design
- The UI is broken down into reusable components such as `GalleryGrid`, `ImageModal`, `ReactionBar`, `CommentSection`, and `LiveFeed`.
- Each component has a single responsibility, making the codebase easier to understand and maintain.

### State Management
- Server state (images, reactions, comments, feed data) is managed using **React Query** and **InstantDB live queries**.
- Local UI state (selected image, modal visibility, submission states) is handled using React’s built-in `useState`.

### Derived Data Strategy
- Reaction counts and feed items are derived from the current database state instead of being stored separately.
- This approach avoids data duplication and ensures consistency, especially when reactions are toggled or removed.

### Performance Considerations
- `useMemo` is used to memoize derived data such as reaction counts and filtered lists.
- This prevents unnecessary re-renders and improves performance as real-time updates scale.

### UI Architecture
- The modal-based image preview keeps the gallery lightweight while allowing focused interaction.
- Scroll behavior is handled at the container level to maintain usability across different screen sizes.
## Challenges Faced & Solutions

### Managing Reaction Toggles
- **Challenge:** Ensuring that a user could toggle reactions (react and unreact) without causing duplicate counts or inconsistent state.
- **Solution:** Reactions were derived from the current database state, and logic was implemented to remove an existing reaction before adding a new one. This ensured one reaction per user per image.

### Real-Time Feed Consistency
- **Challenge:** Keeping the live activity feed accurate when reactions or comments were removed.
- **Solution:** Instead of storing feed state locally, feed items were derived from real-time database entities. This allowed deletions to be reflected naturally without additional cleanup logic.

### Modal Layout and Scrolling
- **Challenge:** Supporting large images and long comment lists within a modal while keeping the UI usable.
- **Solution:** The modal layout was restructured to use a fixed-height container with internal scrolling, ensuring images remained centered and comments were always accessible.

### Deployment and Environment Configuration
- **Challenge:** Handling environment variables securely during deployment.
- **Solution:** API keys were removed from version control and configured using Vercel’s environment variable system, ensuring security and production readiness.
## What I Would Improve With More Time

This project was intentionally kept focused and simple, as it was developed within a **4–5 day timeframe** to meet assignment requirements effectively.

Given more time, the following improvements could be explored:

- **Enhanced UI Polish:** Adding more refined animations, transitions, and visual feedback to further improve the user experience.
- **User Authentication:** Introducing proper user authentication to replace the current lightweight user identification approach.
- **Feed Enrichment:** Displaying image thumbnails and full comment previews within the live activity feed.
- **Performance Optimizations:** Implementing image lazy loading, caching strategies, and virtualized lists for better scalability.
- **Moderation & Controls:** Adding comment moderation, editing, and deletion capabilities for a more complete interaction model.
- **Testing:** Writing unit and integration tests to improve long-term maintainability and reliability.

These enhancements were intentionally scoped out to ensure stability, clarity, and completeness within the given development timeline.
## Author

**Atharva Kulkarni**  

Full Stack Developer  

- Experienced in building real-time, interactive web applications using modern frontend frameworks and cloud-based backends.  

- Skilled in React, TypeScript, real-time databases, API integrations, and deploying production-ready applications.