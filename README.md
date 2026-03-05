<div align="center">

# 🎩 MangaHat

### A modern, feature-rich manga reading web application

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Bun](https://img.shields.io/badge/Bun-Runtime-F9F1E1?style=for-the-badge&logo=bun&logoColor=black)](https://bun.sh/)
[![License](https://img.shields.io/badge/License-Open_Source-green?style=for-the-badge)](LICENSE)

[Live Demo](#) · [Report Bug](https://github.com/Jadvhal/projethat/issues) · [Request Feature](https://github.com/Jadvhal/projethat/issues)

</div>

---

## 📖 About

**MangaHat** is a sleek, open-source manga reading web application built with **Next.js 15** and **TypeScript**. It delivers a beautiful, ad-free reading experience powered by the [MangaDex API](https://api.mangadex.org/) through a custom [WeebDex API](https://api.weebdex.org/docs) adapter layer. MangaHat focuses on a premium UI/UX for manga enthusiasts — fast, responsive, and always free.

### ✨ Key Highlights

- 🚫 **Ad-free & Non-profit** — Clean reading experience with no ads, ever.
- 🌐 **Multi-language UI** — Interface available in English, French, Arabic, and more.
- 📱 **PWA Ready** — Installable as a native-like app on any device (mobile, tablet, desktop).
- 🔐 **OAuth Authentication** — Sign in securely with Discord, Google, GitHub, or Facebook.
- ⚡ **Blazing Fast** — Built on Bun runtime and Next.js App Router for optimal performance.
- 🎨 **Modern UI** — Polished design with dark mode, smooth animations, and responsive layouts.

---

## 🚀 Features

### 📚 Core Reading Experience
| Feature | Description |
|---|---|
| **Manga Browsing** | Browse, search, and discover manga with rich metadata and cover art |
| **Chapter Reader** | Smooth, optimized chapter reader with multiple reading modes |
| **Reading History** | Automatically track your reading progress across all manga |
| **Random Manga** | Discover new manga with the random manga feature |

### 🔍 Discovery & Search
| Feature | Description |
|---|---|
| **Advanced Search** | Filter by tags, status, demographic, content rating, and more |
| **Tag Browsing** | Explore manga by genre tags and categories |
| **Latest Releases** | Stay up to date with the newest chapter releases |
| **Recently Added** | See recently added manga to the platform |

### 👤 User Features
| Feature | Description |
|---|---|
| **Personal Library** | Organize manga into categories: Reading, Plan to Read, Completed, Dropped, Re-reading |
| **Comments & Replies** | Comment on manga and individual chapters, with reply threads and sticker support |
| **Notifications** | Get notified about updates to your followed manga |
| **OAuth Sign-in** | Authenticate with Discord, Google, GitHub, or Facebook |

### 📋 Additional Features
| Feature | Description |
|---|---|
| **Scanlation Groups** | Browse scanlation group profiles and their releases |
| **Author Pages** | View author/artist profiles and their complete works |
| **PWA Support** | Install MangaHat on your device for offline-capable access |
| **Multi-language** | UI supports multiple languages with full localization |

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| [Next.js 15](https://nextjs.org/) | React framework with App Router |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe JavaScript |
| [Prisma](https://www.prisma.io/) | Database ORM (MySQL) |
| [AuthJS (NextAuth v5)](https://authjs.dev/) | OAuth authentication |
| [Bun](https://bun.sh/) | JavaScript runtime & package manager |
| [Serwist](https://serwist.pages.dev/) | PWA / Service Worker support |
| [Radix UI](https://www.radix-ui.com/) | Accessible, unstyled UI primitives |
| [Tailwind CSS / PostCSS](https://tailwindcss.com/) | Utility-first CSS framework |
| [Orval](https://orval.dev/) | API client code generation |
| [MangaDex API](https://api.mangadex.org/) | Primary manga data source |
| [WeebDex API](https://api.weebdex.org/docs) | Custom API adapter layer |

---

## 📂 Project Structure

```
mangahat/
├── prisma/                  # Database schema & migrations
│   ├── schema.prisma        # Prisma data model
│   └── migrations/          # Database migration files
├── public/                  # Static assets (icons, images, manifest)
├── scripts/                 # Utility scripts
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── (reader)/        # Chapter reader routes
│   │   ├── (mangahat)/      # Main application routes
│   │   │   ├── (home)/      #   ├── Homepage
│   │   │   ├── (manga)/     #   ├── Manga details, tags, search
│   │   │   ├── (scanlation)/#   ├── Scanlation groups
│   │   │   └── (user)/      #   └── Library, history, notifications
│   │   └── api/             # API route handlers
│   ├── components/          # Reusable React components
│   │   ├── Chapter/         # Chapter reader components
│   │   ├── Home/            # Homepage components
│   │   ├── Manga/           # Manga detail components
│   │   ├── Navi/            # Navigation components
│   │   └── ui/              # Base UI components
│   ├── config/              # App configuration files
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utilities, API clients, helpers
│   ├── store/               # State management (Zustand/Context)
│   ├── styles/              # Global CSS styles
│   └── types/               # TypeScript type definitions
├── .env                     # Environment variables (not committed)
├── example.env              # Example environment configuration
├── next.config.ts           # Next.js configuration
├── orval.config.ts          # API client code generation config
├── prisma.config.ts         # Prisma configuration
├── postcss.config.mjs       # PostCSS configuration
└── eslint.config.mjs        # ESLint configuration
```

---

## ⚡ Getting Started

### Prerequisites

| Requirement | Version |
|---|---|
| [Bun](https://bun.sh/) (recommended) | Latest |
| Node.js (alternative) | 18+ |
| MySQL | 8.0+ |
| Git | Latest |

You will also need OAuth credentials from at least one provider (Discord, Google, GitHub, or Facebook).

### 1. Clone the Repository

```bash
git clone https://github.com/Jadvhal/projethat.git
cd projethat
```

### 2. Install Dependencies

```bash
bun install
```

### 3. Configure Environment Variables

Copy the example environment file and fill in your values:

```bash
cp example.env .env
```

#### Required Environment Variables

| Variable | Description |
|---|---|
| `AUTH_SECRET` | AuthJS secret key — generate with `npx auth secret` |
| `AUTH_DISCORD_ID` / `AUTH_DISCORD_SECRET` | Discord OAuth app credentials |
| `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` | Google OAuth app credentials |
| `AUTH_GITHUB_ID` / `AUTH_GITHUB_SECRET` | GitHub OAuth app credentials |
| `AUTH_FACEBOOK_ID` / `AUTH_FACEBOOK_SECRET` | Facebook OAuth app credentials |
| `MYSQL_DATABASE_URL` | Full MySQL connection string |
| `MYSQL_DATABASE_USER` | MySQL username (default: `root`) |
| `MYSQL_DATABASE_PASSWORD` | MySQL password |
| `MYSQL_DATABASE_NAME` | MySQL database name |
| `MYSQL_DATABASE_HOST` | MySQL host (default: `localhost`) |
| `MYSQL_DATABASE_PORT` | MySQL port (default: `3306`) |
| `SHADOW_DATABASE_URL` | Prisma shadow database URL (required for migrations) |
| `NEXT_PUBLIC_PROXY_URL` | Proxy URL for MangaDex API image requests |
| `API_URL` | Backend API URL (can use [WeebDex API](https://github.com/TNTKien/weebdex-api)) |
| `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` | Encryption key for Next.js server actions |

### 4. Generate API Client

```bash
bun run gen:api
```

### 5. Set Up the Database

```bash
bunx prisma migrate dev
```

### 6. Start the Development Server

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see MangaHat in action! 🎉

---

## 🗺️ Application Routes

| Route | Description |
|---|---|
| `/` | Homepage — featured manga, latest updates, popular titles |
| `/manga/:id` | Manga details — synopsis, chapters, metadata, comments |
| `/chapter/:id` | Chapter reader — read manga chapters |
| `/author/:id` | Author profile — biography and complete works |
| `/tag` | Browse all available manga tags |
| `/tag/:id` | Manga filtered by a specific tag |
| `/group/:id` | Scanlation group profile and releases |
| `/groups` | Browse all scanlation groups |
| `/latest` | Latest manga chapter releases |
| `/recent` | Recently added manga titles |
| `/random` | Randomly discover a new manga |
| `/advanced-search` | Advanced search with comprehensive filters |
| `/history` | Your personal reading history |
| `/my-library` | Your personal manga library (requires sign-in) |
| `/notifications` | Your notification feed (requires sign-in) |

---

## 🔌 API Integration

MangaHat uses the **MangaDex API** as its primary data source, accessed through a custom adapter layer:

- **MangaDex API** (`api.mangadex.org`) — Provides manga metadata, chapters, covers, authors, and scanlation group information.
- **WeebDex API** (`api.weebdex.org`) — Custom API layer that provides additional features like comments, user libraries, and notifications.
- **Image Proxy** — A Cloudflare Worker proxy is used for MangaDex cover and chapter images to handle CORS.

### API Client Generation

The project uses [Orval](https://orval.dev/) to auto-generate type-safe API client code from OpenAPI specs:

```bash
bun run gen:api
```

---

## 🧪 Development

### Available Scripts

| Command | Description |
|---|---|
| `bun dev` | Start development server |
| `bun build` | Build for production |
| `bun start` | Start production server |
| `bun run gen:api` | Generate API client from OpenAPI spec |
| `bunx prisma migrate dev` | Run database migrations |
| `bunx prisma studio` | Open Prisma Studio (database GUI) |
| `bunx prisma generate` | Regenerate Prisma client |

### Code Quality

The project uses ESLint and Prettier for code quality:

```bash
# Lint check
bun run lint

# Format code
bun run format
```

---

## 🤝 Contributing

Contributions are welcome and appreciated! Here's how you can help:

1. **Fork** the repository
2. **Create** your feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a [Pull Request](https://github.com/Jadvhal/projethat/pulls)

You can also:
- 🐛 Report bugs via [Issues](https://github.com/Jadvhal/projethat/issues)
- 💡 Suggest features via [Issues](https://github.com/Jadvhal/projethat/issues)
- 💬 Join the discussion in [Discussions](https://github.com/Jadvhal/projethat/discussions)

---

## 📄 License

This project is open source. See the repository for license details.

---

## ⭐ Support

If you find MangaHat useful, please consider giving it a ⭐ on GitHub! It helps others discover the project.

---

<div align="center">

**Built with ❤️ by [Jadvhal](https://github.com/Jadvhal) and the MangaHat community**

[⬆ Back to Top](#-mangahat)

</div>
