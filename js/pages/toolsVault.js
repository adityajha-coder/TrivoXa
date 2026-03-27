const ToolsVaultPage = {
    tools: [
        { cat: 'AI Assistants', items: [
            { name: 'GitHub Copilot', desc: 'Your AI pair programmer', url: 'https://copilot.github.com' },
            { name: 'Cursor', desc: 'The AI-first code editor', url: 'https://cursor.sh' },
            { name: 'ChatGPT', desc: 'OpenAI conversational AI model', url: 'https://chat.openai.com' },
            { name: 'Claude', desc: 'Next generation AI assistant by Anthropic', url: 'https://claude.ai' },
            { name: 'Perplexity', desc: 'AI-powered search engine', url: 'https://perplexity.ai' },
            { name: 'Midjourney', desc: 'AI image generation tool', url: 'https://midjourney.com' },
            { name: 'v0 by Vercel', desc: 'Generative UI system', url: 'https://v0.dev' },
            { name: 'Tabnine', desc: 'AI assistant for software developers', url: 'https://www.tabnine.com' },
            { name: 'Codeium', desc: 'Free AI code completion', url: 'https://codeium.com' }
        ]},
        { cat: 'Frontend & UI', items: [
            { name: 'Tailwind CSS', desc: 'Utility-first CSS framework', url: 'https://tailwindcss.com' },
            { name: 'Framer Motion', desc: 'Production-ready animation library', url: 'https://www.framer.com/motion/' },
            { name: 'Shadcn UI', desc: 'Beautifully designed components that you can copy and paste', url: 'https://ui.shadcn.com' },
            { name: 'React', desc: 'The library for web and native user interfaces', url: 'https://react.dev' },
            { name: 'Vue.js', desc: 'The Progressive JavaScript Framework', url: 'https://vuejs.org' },
            { name: 'Radix UI', desc: 'Unstyled, accessible components for React', url: 'https://www.radix-ui.com/' },
            { name: 'Chakra UI', desc: 'Simple, modular and accessible component library', url: 'https://chakra-ui.com' },
            { name: 'Material UI', desc: 'MUI offers a comprehensive suite of UI tools', url: 'https://mui.com' }
        ]},
        { cat: 'Backend & APIs', items: [
            { name: 'Supabase', desc: 'Open source Firebase alternative', url: 'https://supabase.com' },
            { name: 'Express.js', desc: 'Fast, unopinionated, minimalist web framework for Node.js', url: 'https://expressjs.com' },
            { name: 'NestJS', desc: 'A progressive Node.js framework', url: 'https://nestjs.com' },
            { name: 'Appwrite', desc: 'Secure backend server for Web, Mobile & Flutter developers', url: 'https://appwrite.io' },
            { name: 'PlanetScale', desc: 'Serverless MySQL platform', url: 'https://planetscale.com' },
            { name: 'Stripe', desc: 'Financial infrastructure platform for the internet', url: 'https://stripe.com' },
            { name: 'Hasura', desc: 'Instant GraphQL APIs on your data', url: 'https://hasura.io' }
        ]},
        { cat: 'Core Utilities', items: [
            { name: 'Docker', desc: 'Accelerate how you build, share, and run applications', url: 'https://docker.com' },
            { name: 'Figma', desc: 'Collaborative interface design tool', url: 'https://figma.com' },
            { name: 'Prettier', desc: 'An opinionated code formatter', url: 'https://prettier.io' },
            { name: 'ESLint', desc: 'Find and fix problems in your JavaScript code', url: 'https://eslint.org' },
            { name: 'Vite', desc: 'Next Generation Frontend Tooling', url: 'https://vitejs.dev' },
            { name: 'Bun', desc: 'Fast all-in-one JavaScript runtime', url: 'https://bun.sh' },
            { name: 'Zod', desc: 'TypeScript-first schema validation with static type inference', url: 'https://zod.dev' },
            { name: 'Webpack', desc: 'Static module bundler for modern JavaScript applications', url: 'https://webpack.js.org' }
        ]},
        { cat: 'Full-Stack Frameworks', items: [
            { name: 'Next.js', desc: 'The React Framework for the Web', url: 'https://nextjs.org' },
            { name: 'Remix', desc: 'Full stack web framework', url: 'https://remix.run' },
            { name: 'Astro', desc: 'The web framework for content-driven websites', url: 'https://astro.build' },
            { name: 'SvelteKit', desc: 'Rapidly developing robust, performant web applications', url: 'https://kit.svelte.dev' },
            { name: 'Nuxt', desc: 'The Intuitive Vue Framework', url: 'https://nuxt.com' },
            { name: 'Laravel', desc: 'The PHP Framework for Web Artisans', url: 'https://laravel.com' },
            { name: 'Ruby on Rails', desc: 'Web development that doesnt hurt', url: 'https://rubyonrails.org' }
        ]},
        { cat: 'DevOps & Hosting', items: [
            { name: 'Vercel', desc: 'Deploy web projects with the best frontend experience', url: 'https://vercel.com' },
            { name: 'Netlify', desc: 'Build, deploy, and scale modern web projects', url: 'https://netlify.com' },
            { name: 'AWS', desc: 'Comprehensive cloud platform', url: 'https://aws.amazon.com' },
            { name: 'Cloudflare', desc: 'Global platform for edge computing and security', url: 'https://cloudflare.com' },
            { name: 'Heroku', desc: 'Cloud platform as a service', url: 'https://heroku.com' },
            { name: 'DigitalOcean', desc: 'Cloud computing services for developers', url: 'https://www.digitalocean.com' },
            { name: 'Railway', desc: 'Infrastructure platform where you can provision infrastructure', url: 'https://railway.app' },
            { name: 'Render', desc: 'Unified cloud to build and run all your apps', url: 'https://render.com' }
        ]},
        { cat: 'Databases & Storage', items: [
            { name: 'MongoDB', desc: 'Document based NoSQL database', url: 'https://www.mongodb.com' },
            { name: 'PostgreSQL', desc: 'The world\'s most advanced open source relational database', url: 'https://postgresql.org' },
            { name: 'Redis', desc: 'Open source in-memory data store', url: 'https://redis.io' },
            { name: 'Firebase', desc: 'App development platform by Google', url: 'https://firebase.google.com' },
            { name: 'MySQL', desc: 'Open-source relational database management system', url: 'https://www.mysql.com' },
            { name: 'SQLite', desc: 'C-language library that implements a small, fast SQL database engine', url: 'https://www.sqlite.org' },
            { name: 'Cassandra', desc: 'Open source NoSQL distributed database', url: 'https://cassandra.apache.org' }
        ]},
        { cat: 'API & Networking', items: [
            { name: 'Insomnia', desc: 'Design, test, and deploy APIs', url: 'https://insomnia.rest' },
            { name: 'Ngrok', desc: 'Unified ingress platform', url: 'https://ngrok.com' },
            { name: 'Postman', desc: 'API platform for building and using APIs', url: 'https://postman.com' },
            { name: 'GraphQL', desc: 'A query language for your API', url: 'https://graphql.org' },
            { name: 'Apollo', desc: 'The supergraph platform', url: 'https://www.apollographql.com' },
            { name: 'Axios', desc: 'Promise based HTTP client for the browser and node.js', url: 'https://axios-http.com' },
            { name: 'Socket.io', desc: 'Bidirectional and low-latency communication for every platform', url: 'https://socket.io' }
        ]},
        { cat: 'Frontend Utilities', items: [
            { name: 'Heroicons', desc: 'Beautiful hand-crafted SVG icons', url: 'https://heroicons.com' },
            { name: 'Font Awesome', desc: 'The web\'s most popular icon set and toolkit', url: 'https://fontawesome.com' },
            { name: 'Animista', desc: 'On-demand CSS animations library', url: 'https://animista.net' }
        ]},
        { cat: 'Backend & Cryptography', items: [
            { name: 'Bcrypt Generator', desc: 'Generate and test bcrypted strings', url: 'https://bcrypt-generator.com' },
            { name: 'JWT.io', desc: 'Decode, verify and generate JWT', url: 'https://jwt.io' },
            { name: 'UUID Generator', desc: 'Online UUID/GUID generator', url: 'https://www.uuidgenerator.net' }
        ]},
        { cat: 'Text Manipulation', items: [
            { name: 'Regex101', desc: 'Regular expression tester and debugger', url: 'https://regex101.com' },
            { name: 'JSON Formatter', desc: 'Format, validate and beautify JSON', url: 'https://jsonformatter.org' },
            { name: 'Diffchecker', desc: 'Compare text to find the difference', url: 'https://www.diffchecker.com' }
        ]},
        { cat: 'Colors & Design', items: [
            { name: 'Coolors', desc: 'The super fast color palettes generator', url: 'https://coolors.co' },
            { name: 'Color Hunt', desc: 'Color palettes for designers and artists', url: 'https://colorhunt.co' },
            { name: 'CSS Gradient', desc: 'Free css gradient generator tool', url: 'https://cssgradient.io' }
        ]}
    ],
    boilerplates: [
        { title: 'HTML5 Boilerplate', code: '<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <title>Document</title>\n</head>\n<body>\n    \n</body>\n</html>' },
        { title: 'React Component', code: 'import React from "react";\n\nconst Component = () => {\n    return (\n        <div>\n            Hello World\n        </div>\n    );\n};\n\nexport default Component;' },
        { title: 'Express Server', code: 'const express = require("express");\nconst app = express();\n\napp.use(express.json());\n\napp.get("/", (req, res) => {\n    res.send("Hello World");\n});\n\napp.listen(3000, () => console.log("Server running on port 3000"));' },
        { title: 'Vue 3 Composition API', code: '<template>\n  <div>\n    <h1>{{ message }}</h1>\n  </div>\n</template>\n\n<script setup>\nimport { ref } from "vue";\nconst message = ref("Hello Vue 3");\n</script>' },
        { title: 'Next.js 14 Page', code: 'export default function Page() {\n  return (\n    <main className="flex min-h-screen flex-col items-center justify-between p-24">\n      <h1>Next.js Platform</h1>\n    </main>\n  );\n}' },
        { title: 'Tailwind Config Base', code: '/** @type {import("tailwindcss").Config} */\nmodule.exports = {\n  content: [\n    "./src/**/*.{js,jsx,ts,tsx}",\n  ],\n  theme: {\n    extend: {},\n  },\n  plugins: [],\n}' },
        { title: 'Dockerfile (Node)', code: 'FROM node:18-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm install\nCOPY . .\nEXPOSE 3000\nCMD ["npm", "start"]' },
        { title: 'Django View (FBV)', code: 'from django.shortcuts import render\nfrom django.http import HttpResponse\n\ndef my_view(request):\n    return HttpResponse("Hello, Django!")' },
        { title: 'Docker Compose Base', code: 'version: "3.8"\nservices:\n  web:\n    build: .\n    ports:\n      - "8000:8000"\n    volumes:\n      - .:/code\n    environment:\n      - DEBUG=1' },
        { title: 'FastAPI Main', code: 'from fastapi import FastAPI\n\napp = FastAPI()\n\n@app.get("/")\ndef read_root():\n    return {"Hello": "World"}' },
        { title: 'React Context', code: 'import { createContext, useContext, useState } from "react";\n\nconst AppContext = createContext();\n\nexport const AppProvider = ({ children }) => {\n  const [state, setState] = useState(null);\n  return <AppContext.Provider value={{ state, setState }}>{children}</AppContext.Provider>;\n};\n\nexport const useAppContext = () => useContext(AppContext);' },
        { title: 'Zustand Store', code: 'import { create } from "zustand";\n\nconst useStore = create((set) => ({\n  count: 0,\n  inc: () => set((state) => ({ count: state.count + 1 })),\n  dec: () => set((state) => ({ count: state.count - 1 })),\n}));\n\nexport default useStore;' },
        { title: 'GitHub Actions CI', code: 'name: CI\n\non:\n  push:\n    branches: [ main ]\n\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n    - uses: actions/checkout@v3\n    - name: Use Node.js\n      uses: actions/setup-node@v3\n      with:\n        node-version: "18.x"\n    - run: npm ci\n    - run: npm test' },
        { title: 'Axios Interceptor', code: 'import axios from "axios";\n\nconst api = axios.create({ baseURL: "https://api.example.com" });\n\napi.interceptors.request.use(config => {\n  const token = localStorage.getItem("token");\n  if (token) config.headers.Authorization = `Bearer ${token}`;\n  return config;\n});\n\nexport default api;' },
        { title: 'SvelteKit + Tailwind', code: 'import adapter from "@sveltejs/adapter-auto";\nimport { vitePreprocess } from "@sveltejs/vite-plugin-svelte";\n\n/** @type {import(\'@sveltejs/kit\').Config} */\nconst config = {\n  preprocess: vitePreprocess(),\n  kit: {\n    adapter: adapter()\n  }\n};\nexport default config;' },
        { title: 'React Hook Form', code: 'import { useForm } from "react-hook-form";\n\nexport default function App() {\n  const { register, handleSubmit } = useForm();\n  const onSubmit = data => console.log(data);\n  return (\n    <form onSubmit={handleSubmit(onSubmit)}>\n      <input {...register("firstName")} />\n      <input type="submit" />\n    </form>\n  );\n}' }
    ],

    vsCodeExtensions: [
        { cat: 'Essentials', items: [
            { name: 'Prettier', desc: 'Opinionated code formatter for consistent style', id: 'esbenp.prettier-vscode' },
            { name: 'ESLint', desc: 'Integrates ESLint into VS Code for JS/TS linting', id: 'dbaeumer.vscode-eslint' },
            { name: 'EditorConfig', desc: 'Override editor settings with .editorconfig files', id: 'EditorConfig.EditorConfig' },
            { name: 'Path Intellisense', desc: 'Autocompletes file paths in your code', id: 'christian-kohler.path-intellisense' },
            { name: 'Auto Rename Tag', desc: 'Automatically rename paired HTML/XML tags', id: 'formulahendry.auto-rename-tag' },
            { name: 'Error Lens', desc: 'Highlight errors and warnings inline in the editor', id: 'usernamehw.errorlens' },
            { name: 'Auto Close Tag', desc: 'Automatically close HTML/XML tags', id: 'formulahendry.auto-close-tag' },
            { name: 'npm Intellisense', desc: 'Autocomplete npm modules in import statements', id: 'christian-kohler.npm-intellisense' },
            { name: 'Import Cost', desc: 'Display the size of imported JS packages inline', id: 'wix.vscode-import-cost' },
            { name: 'Trailing Spaces', desc: 'Highlight and remove trailing whitespace', id: 'shardulm94.trailing-spaces' }
        ]},
        { cat: 'Language Support', items: [
            { name: 'Python', desc: 'Rich support for Python (IntelliSense, linting, debugging)', id: 'ms-python.python' },
            { name: 'Pylance', desc: 'Fast, feature-rich Python language server', id: 'ms-python.vscode-pylance' },
            { name: 'C/C++', desc: 'IntelliSense, debugging, and code browsing for C/C++', id: 'ms-vscode.cpptools' },
            { name: 'Java Extension Pack', desc: 'Popular extensions for Java development', id: 'vscjava.vscode-java-pack' },
            { name: 'Go', desc: 'Rich Go language support with IntelliSense', id: 'golang.Go' },
            { name: 'Rust Analyzer', desc: 'Fast and feature-rich Rust language server', id: 'rust-lang.rust-analyzer' },
            { name: 'Dart', desc: 'Dart language support and debugger', id: 'Dart-Code.dart-code' },
            { name: 'PHP Intelephense', desc: 'High performance PHP IntelliSense', id: 'bmewburn.vscode-intelephense-client' },
            { name: 'Ruby LSP', desc: 'Ruby language server for IntelliSense', id: 'Shopify.ruby-lsp' },
            { name: 'Kotlin', desc: 'Smart code completion and debugging for Kotlin', id: 'mathiasfrohlich.Kotlin' },
            { name: 'Swift', desc: 'Swift language support for VS Code', id: 'sswg.swift-lang' },
            { name: 'Lua', desc: 'Lua language support and IntelliSense', id: 'sumneko.lua' }
        ]},
        { cat: 'Git & Version Control', items: [
            { name: 'GitLens', desc: 'Supercharge Git — blame, history, compare, and more', id: 'eamodio.gitlens' },
            { name: 'Git Graph', desc: 'View Git log as a beautiful graph', id: 'mhutchie.git-graph' },
            { name: 'Git History', desc: 'View and search git log, file history, compare branches', id: 'donjayamanne.githistory' },
            { name: 'Conventional Commits', desc: 'Write standardized commit messages', id: 'vivaxy.vscode-conventional-commits' },
            { name: 'GitHub Pull Requests', desc: 'Review and manage GitHub PRs within VS Code', id: 'GitHub.vscode-pull-request-github' },
            { name: 'Git Blame', desc: 'See git blame info in the status bar', id: 'waderyan.gitblame' },
            { name: 'GitHub Actions', desc: 'Manage GitHub Actions workflows from VS Code', id: 'github.vscode-github-actions' }
        ]},
        { cat: 'Themes & Appearance', items: [
            { name: 'One Dark Pro', desc: 'Atom\'s iconic One Dark theme for VS Code', id: 'zhuangtongfa.Material-theme' },
            { name: 'GitHub Theme', desc: 'GitHub\'s official VS Code themes', id: 'GitHub.github-vscode-theme' },
            { name: 'Dracula Official', desc: 'Dark theme for many editors and apps', id: 'dracula-theme.theme-dracula' },
            { name: 'Material Icon Theme', desc: 'Material Design icons for files and folders', id: 'PKief.material-icon-theme' },
            { name: 'Tokyo Night', desc: 'Clean dark theme inspired by Tokyo city lights', id: 'enkia.tokyo-night' },
            { name: 'Catppuccin', desc: 'Soothing pastel theme for VS Code', id: 'Catppuccin.catppuccin-vsc' },
            { name: 'Ayu', desc: 'Simple and bright theme with three variants', id: 'teabyii.ayu' },
            { name: 'Monokai Pro', desc: 'Professional Monokai-inspired theme', id: 'monokai.theme-monokai-pro-vscode' },
            { name: 'Night Owl', desc: 'Accessible theme for night owls and low light', id: 'sdras.night-owl' },
            { name: 'VSCode Icons', desc: 'Icon theme with wide file type coverage', id: 'vscode-icons-team.vscode-icons' },
            { name: 'Peacock', desc: 'Color your workspace for multi-project setups', id: 'johnpapa.vscode-peacock' }
        ]},
        { cat: 'Productivity', items: [
            { name: 'Todo Tree', desc: 'Highlight and list TODO, FIXME comments in your code', id: 'Gruntfuggly.todo-tree' },
            { name: 'Better Comments', desc: 'Colorful annotations for alerts, queries, TODOs', id: 'aaron-bond.better-comments' },
            { name: 'Code Spell Checker', desc: 'Catch common spelling errors in code', id: 'streetsidesoftware.code-spell-checker' },
            { name: 'Project Manager', desc: 'Easily switch between projects', id: 'alefragnani.project-manager' },
            { name: 'Bookmarks', desc: 'Mark lines and jump to them quickly', id: 'alefragnani.Bookmarks' },
            { name: 'Polacode', desc: 'Polaroid-style screenshots of your code', id: 'pnp.polacode' },
            { name: 'File Utils', desc: 'Create, move, rename, delete files from command palette', id: 'sleistner.vscode-fileutils' },
            { name: 'Toggle Quotes', desc: 'Toggle between single, double, and backtick quotes', id: 'BriteSnow.vscode-toggle-quotes' },
            { name: 'Change Case', desc: 'Quickly change text between camelCase, UPPER, snake_case', id: 'wmaurer.change-case' },
            { name: 'Wakatime', desc: 'Track your coding activity and time automatically', id: 'WakaTime.vscode-wakatime' },
            { name: 'Settings Sync', desc: 'Synchronize settings, snippets, themes across machines', id: 'Shan.code-settings-sync' }
        ]},
        { cat: 'Frontend & Styling', items: [
            { name: 'Tailwind CSS IntelliSense', desc: 'Autocomplete for Tailwind CSS classes', id: 'bradlc.vscode-tailwindcss' },
            { name: 'CSS Peek', desc: 'Jump to CSS definitions from HTML', id: 'pranaygp.vscode-css-peek' },
            { name: 'HTML CSS Support', desc: 'CSS IntelliSense for HTML class names', id: 'ecmel.vscode-html-css' },
            { name: 'Live Server', desc: 'Launch a local dev server with live reload', id: 'ritwickdey.LiveServer' },
            { name: 'Color Highlight', desc: 'Visualize CSS color codes inline', id: 'naumovs.color-highlight' },
            { name: 'SVG Preview', desc: 'Preview SVG files directly in VS Code', id: 'SimonSiefke.svg-preview' },
            { name: 'Headwind', desc: 'Automatically sort Tailwind CSS classes', id: 'heybourn.headwind' },
            { name: 'CSS Modules', desc: 'Autocomplete and go-to-definition for CSS modules', id: 'clinyong.vscode-css-modules' },
            { name: 'Stylelint', desc: 'Lint CSS/SCSS/Less with modern stylelint', id: 'stylelint.vscode-stylelint' },
            { name: 'Image Preview', desc: 'Show image preview on hover in markup', id: 'kisstkondansen.vscode-gutter-preview' },
            { name: 'Live Preview', desc: 'Microsoft\'s in-editor browser preview', id: 'ms-vscode.live-server' }
        ]},
        { cat: 'Backend & DevOps', items: [
            { name: 'Docker', desc: 'Build, manage, and deploy containerized apps', id: 'ms-azuretools.vscode-docker' },
            { name: 'Remote - SSH', desc: 'Open folders on remote machines via SSH', id: 'ms-vscode-remote.remote-ssh' },
            { name: 'REST Client', desc: 'Send HTTP requests directly from VS Code', id: 'humao.rest-client' },
            { name: 'Thunder Client', desc: 'Lightweight REST API client within VS Code', id: 'rangav.vscode-thunder-client' },
            { name: 'YAML', desc: 'YAML language support with validation', id: 'redhat.vscode-yaml' },
            { name: 'DotENV', desc: 'Syntax highlighting for .env files', id: 'mikestead.dotenv' },
            { name: 'Kubernetes', desc: 'Develop, deploy, and debug K8s apps', id: 'ms-kubernetes-tools.vscode-kubernetes-tools' },
            { name: 'HashiCorp Terraform', desc: 'Terraform language support and snippets', id: 'HashiCorp.terraform' },
            { name: 'Azure Tools', desc: 'Comprehensive Azure development extensions', id: 'ms-vscode.vscode-node-azure-pack' },
            { name: 'Remote Containers', desc: 'Develop inside Docker containers', id: 'ms-vscode-remote.remote-containers' },
            { name: 'Nginx Configuration', desc: 'Syntax highlighting for Nginx config files', id: 'william-voyek.vscode-nginx' }
        ]},
        { cat: 'Testing & Debugging', items: [
            { name: 'Jest Runner', desc: 'Run/debug Jest tests inline', id: 'firsttris.vscode-jest-runner' },
            { name: 'Test Explorer UI', desc: 'Unified UI for running and viewing test results', id: 'hbenl.vscode-test-explorer' },
            { name: 'Code Runner', desc: 'Run code snippets in many languages', id: 'formulahendry.code-runner' },
            { name: 'Turbo Console Log', desc: 'Insert console.log with one shortcut', id: 'ChakrounAnas.turbo-console-log' },
            { name: 'Quokka.js', desc: 'Live JavaScript/TypeScript scratchpad in editor', id: 'WallabyJs.quokka-vscode' },
            { name: 'Vitest', desc: 'Run and debug Vitest tests from VS Code', id: 'ZixuanChen.vitest-explorer' },
            { name: 'Playwright Test', desc: 'Run Playwright e2e tests within VS Code', id: 'ms-playwright.playwright' }
        ]},
        { cat: 'AI Assistants', items: [
            { name: 'GitHub Copilot', desc: 'Your AI pair programmer powered by OpenAI', id: 'GitHub.copilot' },
            { name: 'GitHub Copilot Chat', desc: 'Conversational AI coding assistant', id: 'GitHub.copilot-chat' },
            { name: 'Codeium', desc: 'Free AI-powered code completion', id: 'Codeium.codeium' },
            { name: 'Tabnine', desc: 'AI code completions for all languages', id: 'TabNine.tabnine-vscode' },
            { name: 'IntelliCode', desc: 'AI-assisted development by Microsoft', id: 'VisualStudioExptTeam.vscodeintellicode' },
            { name: 'AWS Toolkit', desc: 'AI coding companion from Amazon (CodeWhisperer)', id: 'AmazonWebServices.aws-toolkit-vscode' },
            { name: 'Continue', desc: 'Open-source AI code assistant and chat', id: 'Continue.continue' },
            { name: 'Cline', desc: 'Autonomous AI coding agent right in your editor', id: 'saoudrizwan.claude-dev' },
            { name: 'BlackBox AI', desc: 'AI-powered code autocomplete, search, and chat', id: 'Blackboxapp.blackbox' }
        ]},
        { cat: 'Snippets & Shortcuts', items: [
            { name: 'ES7+ React Snippets', desc: 'React/Redux/React-Native snippets for ES7+', id: 'dsznajder.es7-react-js-snippets' },
            { name: 'JavaScript (ES6) Snippets', desc: 'Code snippets for JS in ES6 syntax', id: 'xabikos.JavaScriptSnippets' },
            { name: 'Vue 3 Snippets', desc: 'Snippets for Vue 3 Composition API', id: 'hollowtree.vue-snippets' },
            { name: 'Angular Snippets', desc: 'TypeScript and HTML snippets for Angular', id: 'johnpapa.Angular2' },
            { name: 'Python Snippets', desc: 'Python code snippets for common patterns', id: 'frhtylcn.pythonsnippets' },
            { name: 'Next.js Snippets', desc: 'Snippets for Next.js pages, API routes, hooks', id: 'PulkitGangwar.nextjs-snippets' },
            { name: 'Emmet Live', desc: 'Expand abbreviations into HTML/CSS live', id: 'ysemeniuk.emmet-live' },
            { name: 'Surround', desc: 'Wrap selected code with snippets like try/catch, if/else', id: 'yatki.vscode-surround' }
        ]},
        { cat: 'Database & SQL', items: [
            { name: 'SQLTools', desc: 'Database management and query runner', id: 'mtxr.sqltools' },
            { name: 'MongoDB for VS Code', desc: 'Browse, query, and manage MongoDB databases', id: 'mongodb.mongodb-vscode' },
            { name: 'PostgreSQL', desc: 'Explorer and query runner for PostgreSQL', id: 'ckolkman.vscode-postgres' },
            { name: 'Redis', desc: 'Redis database manager within VS Code', id: 'cweijan.vscode-redis-client' },
            { name: 'Prisma', desc: 'Syntax highlighting and formatting for Prisma schemas', id: 'Prisma.prisma' },
            { name: 'GraphQL', desc: 'Syntax highlighting and IntelliSense for GraphQL', id: 'GraphQL.vscode-graphql' }
        ]},
        { cat: 'Markdown & Docs', items: [
            { name: 'Markdown All in One', desc: 'Shortcuts, TOC, preview, and more for Markdown', id: 'yzhang.markdown-all-in-one' },
            { name: 'Markdown Preview Enhanced', desc: 'Rich Markdown preview with diagrams and math', id: 'shd101wyy.markdown-preview-enhanced' },
            { name: 'markdownlint', desc: 'Linting and style checking for Markdown files', id: 'DavidAnson.vscode-markdownlint' },
            { name: 'Draw.io Integration', desc: 'Create and edit diagrams inside VS Code', id: 'hediet.vscode-drawio' },
            { name: 'Mermaid Preview', desc: 'Preview Mermaid diagrams in Markdown', id: 'bierner.markdown-mermaid' },
            { name: 'Docs View', desc: 'View documentation on hover in a side panel', id: 'bierner.docs-view' }
        ]},
        { cat: 'Mobile & Flutter', items: [
            { name: 'Flutter', desc: 'Full Flutter development support — debug, hot reload', id: 'Dart-Code.flutter' },
            { name: 'React Native Tools', desc: 'Debug and develop React Native applications', id: 'msjsdiag.vscode-react-native' },
            { name: 'Expo Tools', desc: 'Autocomplete and IntelliSense for Expo config', id: 'expo.vscode-expo-tools' },
            { name: 'Gradle for Java', desc: 'Gradle build tool support for Android/Java', id: 'vscjava.vscode-gradle' },
            { name: 'XML Tools', desc: 'XML formatting and XPath for Android layouts', id: 'DotJoshJohnson.xml' }
        ]},
        { cat: 'Remote & Collaboration', items: [
            { name: 'Live Share', desc: 'Real-time collaborative editing and debugging', id: 'MS-vsliveshare.vsliveshare' },
            { name: 'Remote - WSL', desc: 'Open folders in Windows Subsystem for Linux', id: 'ms-vscode-remote.remote-wsl' },
            { name: 'Remote - Tunnels', desc: 'Connect to remote machines via VS Code tunnels', id: 'ms-vscode.remote-server' },
            { name: 'SSH FS', desc: 'Mount remote file systems over SSH', id: 'Kelvin.vscode-sshfs' },
            { name: 'Dev Containers', desc: 'Develop inside containerized environments', id: 'ms-vscode-remote.remote-containers' },
            { name: 'CodeTour', desc: 'Record and playback guided walkthroughs of codebases', id: 'vsls-contrib.codetour' }
        ]},
        { cat: 'Fun & Vibes', items: [
            { name: 'VS Code Pets', desc: 'Adorable pets that live in your editor panel', id: 'tonybaloney.vscode-pets' },
            { name: 'Power Mode', desc: 'Epic combo effects and screen shake while typing', id: 'hoovercj.vscode-power-mode' },
            { name: 'Vscode Spotify', desc: 'Control Spotify playback from your editor', id: 'shyykoserhiy.vscode-spotify' },
            { name: 'Discord Presence', desc: 'Show what you\'re coding on Discord Rich Presence', id: 'icrawl.discord-vscode' },
            { name: 'Rain', desc: 'Relaxing rain animation in your VS Code background', id: 'naumovs.vscode-rain' },
            { name: 'Emoji', desc: 'Insert emojis from command palette', id: 'Perkovec.emoji' },
            { name: 'VS Code Counter', desc: 'Count lines of code in your project', id: 'uctakeoff.vscode-counter' }
        ]}
    ],

    activeExtCategory: 'All',
    extSearchQuery: '',
    activeCategory: 'All',
    searchQuery: '',

    render() {
        Navbar.renderTopbar('Tools Vault');
        const content = document.getElementById('page-content');
        const allCats = ['All', ...this.tools.map(t => t.cat)].sort();
        
        content.innerHTML = `
            <div class="page-enter">
                <div class="page-header">
                    <h1>Tools <span class="text-gradient">Vault</span></h1>
                    <p>A curated directory of industry-leading dev tools, AI utilities, and frameworks to supercharge your workflow.</p>
                </div>
                <div class="tabs mb-lg" id="tv-tabs">
                    <button class="tab-item active" data-view="resources">Tools & Resources</button>
                    <button class="tab-item" data-view="boilerplates">Boilerplates</button>
                    <button class="tab-item" data-view="extensions">VS Code Extensions</button>
                </div>
                
                <div id="tv-resources-view" class="mb-xl">
                    <div class="flex-center mb-xl">
                        <div class="search-container glass-card" style="width:100%; max-width:700px; display:flex; gap:10px; padding:10px; align-items:center;">
                            <div style="position:relative; flex:1;">
                                <i class="fa-solid fa-magnifying-glass search-icon" style="position:absolute; left:14px; top:50%; transform:translateY(-50%); color:var(--text-muted); pointer-events:none;"></i>
                                <input class="input-field" id="tv-search" type="text" placeholder="Search tools..." style="width:100%; padding-left:40px; border:none; background:rgba(255,255,255,0.05);" />
                            </div>
                            <select class="input-field" id="tv-category-filter" style="width:220px; padding:0 12px; height:42px; cursor:pointer; background:rgba(255,255,255,0.05); color:#fff; border:none; font-size: 0.85rem;">
                                ${allCats.map(cat => `<option value="${cat}" ${cat === this.activeCategory ? 'selected' : ''} style="background:#000; color:#fff;">${cat}</option>`).join('')}
                            </select>
                        </div>
                    </div>
                    <div id="tv-grid-container"></div>
                </div>

                <div id="tv-boilerplates-view" style="display:none; padding-bottom:40px;">
                    <div class="grid-2">
                        ${this.boilerplates.map((b, idx) => `
                            <div class="glass-card">
                                <div class="flex-between mb-sm">
                                    <div style="font-weight:600;">${b.title}</div>
                                    <div class="flex-gap">
                                        <button class="btn btn-secondary btn-xs tv-save-bp" data-idx="${idx}"><i class="fa-solid fa-cloud-arrow-up"></i> Save to Workspace</button>
                                        <button class="btn btn-secondary btn-xs tv-copy-bp" data-idx="${idx}"><i class="fa-solid fa-copy"></i> Copy</button>
                                    </div>
                                </div>
                                <div style="background:rgba(0,0,0,0.5); padding:10px; border-radius:var(--radius-sm); border:1px solid var(--border); overflow:hidden;">
                                    <pre style="margin:0; font-family:var(--font-mono); font-size:12px; color:var(--primary-light);">${Helpers.escapeHtml(b.code)}</pre>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div id="tv-extensions-view" style="display:none; padding-bottom:40px;">
                    <div class="flex-center mb-lg">
                        <div class="search-container glass-card" style="width:100%; max-width:700px; display:flex; gap:10px; padding:10px; align-items:center;">
                            <div style="position:relative; flex:1;">
                                <i class="fa-solid fa-magnifying-glass search-icon" style="position:absolute; left:14px; top:50%; transform:translateY(-50%); color:var(--text-muted); pointer-events:none;"></i>
                                <input class="input-field" id="tv-ext-search" type="text" placeholder="Search extensions..." style="width:100%; padding-left:40px; border:none; background:rgba(255,255,255,0.05);" />
                            </div>
                            <select class="input-field" id="tv-ext-category-filter" style="width:220px; padding:0 12px; height:42px; cursor:pointer; background:rgba(255,255,255,0.05); color:#fff; border:none; font-size:0.85rem;">
                                <option value="All" style="background:#000; color:#fff;">All</option>
                                ${this.vsCodeExtensions.map(g => `<option value="${g.cat}" style="background:#000; color:#fff;">${g.cat}</option>`).join('')}
                            </select>
                        </div>
                    </div>
                    <div id="tv-ext-grid-container"></div>
                </div>
            </div>
            <style>
            .tool-link-card {
                display: flex;
                flex-direction: column;
                height: 100%;
            }
            .tool-link-card:hover {
                background: rgba(212,168,67,0.04);
                border-color: rgba(212,168,67,0.3);
                transform: translateY(-2px);
            }
            .line-clamp-2 {
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }
            .ext-card {
                display: flex; flex-direction: column; gap: 6px; transition: all 0.2s;
                height: 100%;
            }
            .ext-card:hover {
                background: rgba(212,168,67,0.04);
                border-color: rgba(212,168,67,0.3);
                transform: translateY(-2px);
            }
            .ext-card .ext-id {
                font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-muted);
                background: rgba(0,0,0,0.3); padding: 3px 8px; border-radius: 4px; display: inline-block; margin-top: 4px;
            }
            .ext-card .ext-install-btn {
                margin-top: auto; padding: 6px 12px; font-size: 0.75rem; border-radius: 6px;
                background: var(--surface-hover); border: 1px solid var(--border); color: var(--text-secondary);
                cursor: pointer; transition: all 0.2s; display: inline-flex; align-items: center; gap: 6px; width: fit-content;
            }
            .ext-card .ext-install-btn:hover {
                background: var(--primary); color: #000; border-color: var(--primary);
            }
            .tool-link-card i {
                transition: color 0.2s;
            }
            .tool-link-card:hover i {
                color: var(--primary-light);
            }
            /* Boilerplate pre overflow fix */
            .grid-2 .glass-card pre {
                overflow-x: auto;
                max-width: 100%;
                word-break: break-word;
            }
            </style>
        `;

        this.renderToolsGrid();
        this.renderExtensionsGrid();
        this.bindEvents();
    },

    renderToolsGrid() {
        const container = document.getElementById('tv-grid-container');
        if(!container) return;

        let results = [];
        this.tools.forEach(group => {
            if (this.activeCategory === 'All' || group.cat === this.activeCategory) {
                const filteredItems = group.items.filter(item => {
                    if (!this.searchQuery) return true;
                    const q = this.searchQuery.toLowerCase();
                    return item.name.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q);
                });
                if (filteredItems.length > 0) {
                    results.push({ cat: group.cat, items: filteredItems });
                }
            }
        });

        if (results.length === 0) {
            container.innerHTML = `<div class="empty-state" style="padding:40px;"><i class="fa-solid fa-search" style="font-size:2rem; opacity:0.3; margin-bottom:10px;"></i><h3>No matching tools found</h3></div>`;
            return;
        }

        container.innerHTML = results.map(section => `
            <div class="mb-xl">
                <h2 class="mb-md" style="font-size:1.1rem; font-weight:600; color:var(--primary-light); border-bottom:1px solid var(--border); padding-bottom:8px;">
                    ${section.cat}
                </h2>
                <div class="grid-3">
                    ${section.items.map(tool => `
                        <div class="glass-card tool-link-card" style="display:flex; flex-direction:column; transition:all 0.2s;">
                            <div style="font-weight:600; font-size:1rem; color:var(--text); margin-bottom:4px; display:flex; align-items:center; justify-content:space-between;">
                                <a href="${tool.url}" target="_blank" rel="noopener noreferrer" style="text-decoration:none; color:var(--text); flex:1; display:flex; align-items:center; gap:8px;">
                                    ${tool.name} <i class="fa-solid fa-arrow-up-right-from-square text-muted text-xs"></i>
                                </a>
                            </div>
                            <div class="text-sm text-secondary line-clamp-2" style="line-height:1.4;">${tool.desc}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');
    },

    bindEvents() {
        document.getElementById('tv-tabs')?.addEventListener('click', e => {
            const tab = e.target.closest('.tab-item');
            if(!tab) return;
            document.querySelectorAll('#tv-tabs .tab-item').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const view = tab.dataset.view;
            document.getElementById('tv-resources-view').style.display = view === 'resources' ? 'block' : 'none';
            document.getElementById('tv-boilerplates-view').style.display = view === 'boilerplates' ? 'block' : 'none';
            document.getElementById('tv-extensions-view').style.display = view === 'extensions' ? 'block' : 'none';
            if (view === 'extensions') this.renderExtensionsGrid();
        });

        document.getElementById('tv-category-filter')?.addEventListener('change', (e) => {
            this.activeCategory = e.target.value;
            this.renderToolsGrid();
        });

        document.getElementById('tv-search')?.addEventListener('input', Helpers.debounce((e) => {
            this.searchQuery = e.target.value;
            this.renderToolsGrid();
        }, 200));

        document.getElementById('page-content').addEventListener('click', e => {
            const copyBtn = e.target.closest('.tv-copy-bp');
            if(copyBtn) {
                const idx = copyBtn.dataset.idx;
                if(this.boilerplates[idx]) {
                    Helpers.copyToClipboard(this.boilerplates[idx].code);
                    Toast.show('Boilerplate copied!', 'success');
                }
            }

            const saveBpBtn = e.target.closest('.tv-save-bp');
            if(saveBpBtn) {
                const idx = saveBpBtn.dataset.idx;
                const bp = this.boilerplates[idx];
                if(bp) {
                    WorkspacePage.saveSnippet(`Boilerplate: ${bp.title}`, bp.code, 'javascript');
                    Toast.show('Boilerplate saved to Workspace!', 'success');
                }
            }

            const extCopyBtn = e.target.closest('.ext-copy-id');
            if(extCopyBtn) {
                const extId = extCopyBtn.dataset.extid;
                if(extId) {
                    Helpers.copyToClipboard(`ext install ${extId}`);
                    Toast.show('Install command copied!', 'success');
                }
            }
        });

        document.getElementById('tv-ext-category-filter')?.addEventListener('change', (e) => {
            this.activeExtCategory = e.target.value;
            this.renderExtensionsGrid();
        });

        document.getElementById('tv-ext-search')?.addEventListener('input', Helpers.debounce((e) => {
            this.extSearchQuery = e.target.value;
            this.renderExtensionsGrid();
        }, 200));
    },

    renderExtensionsGrid() {
        const container = document.getElementById('tv-ext-grid-container');
        if(!container) return;

        let results = [];
        this.vsCodeExtensions.forEach(group => {
            if (this.activeExtCategory === 'All' || group.cat === this.activeExtCategory) {
                const filteredItems = group.items.filter(item => {
                    if (!this.extSearchQuery) return true;
                    const q = this.extSearchQuery.toLowerCase();
                    return item.name.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q) || item.id.toLowerCase().includes(q);
                });
                if (filteredItems.length > 0) {
                    results.push({ cat: group.cat, items: filteredItems });
                }
            }
        });

        if (results.length === 0) {
            container.innerHTML = `<div class="empty-state" style="padding:40px;"><i class="fa-solid fa-puzzle-piece" style="font-size:2rem; opacity:0.3; margin-bottom:10px;"></i><h3>No matching extensions found</h3></div>`;
            return;
        }

        container.innerHTML = results.map(section => `
            <div class="mb-xl">
                <h2 class="mb-md" style="font-size:1.1rem; font-weight:600; color:var(--primary-light); border-bottom:1px solid var(--border); padding-bottom:8px;">
                    ${section.cat}
                </h2>
                <div class="grid-3">
                    ${section.items.map(ext => `
                        <div class="glass-card ext-card">
                            <div style="font-weight:600; font-size:0.95rem; color:var(--text); display:flex; align-items:center; gap:8px;">
                                <i class="fa-solid fa-puzzle-piece" style="color:var(--primary-light); font-size:0.85rem;"></i>
                                ${Helpers.escapeHtml(ext.name)}
                            </div>
                            <div class="text-sm text-secondary" style="line-height:1.45;">${ext.desc}</div>
                            <a href="https://marketplace.visualstudio.com/items?itemName=${ext.id}" target="_blank" rel="noopener noreferrer" class="ext-install-btn">
                                <i class="fa-solid fa-download"></i> Install in VS Code
                            </a>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');
    }
};
