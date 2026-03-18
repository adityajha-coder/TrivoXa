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

    render() {
        Navbar.renderTopbar('Tools Vault');
        const content = document.getElementById('page-content');
        
        content.innerHTML = `
            <div class="page-enter">
                <div class="page-header">
                    <h1>Tools <span class="text-gradient">Vault</span></h1>
                    <p>A curated collection of industry-leading dev tools, AI utilities, and frameworks to supercharge your workflow.</p>
                </div>
                <div class="tabs mb-md" id="tv-tabs">
                    <button class="tab-item active" data-view="resources">Tools & Resources</button>
                    <button class="tab-item" data-view="boilerplates">Boilerplates</button>
                </div>
                
                <div id="tv-resources-view" class="flex-col flex-gap mb-xl">
                    ${this.tools.map(section => `
                        <div>
                            <h2 class="mb-md" style="font-size:1.2rem; font-weight:600; color:var(--primary-light); border-bottom:1px solid var(--border); padding-bottom:10px;">
                                ${section.cat}
                            </h2>
                            <div class="grid-3">
                                ${section.items.map(tool => `
                                    <div class="glass-card tool-link-card" style="display:flex; flex-direction:column; transition:all 0.2s; position:relative;">
                                        <div style="font-weight:600; font-size:1.05rem; color:var(--text); margin-bottom:6px; display:flex; align-items:center; justify-content:space-between;">
                                            <a href="${tool.url}" target="_blank" rel="noopener noreferrer" style="text-decoration:none; color:var(--text); flex:1; display:flex; align-items:center; gap:8px;">
                                                ${tool.name} <i class="fa-solid fa-arrow-up-right-from-square text-muted text-xs"></i>
                                            </a>
                                        </div>
                                        <div class="text-sm text-secondary line-clamp-2">${tool.desc}</div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
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
                                <div style="background:rgba(0,0,0,0.5); padding:10px; border-radius:var(--radius-sm); border:1px solid var(--border); overflow-x:auto;">
                                    <pre style="margin:0; font-family:var(--font-mono); font-size:12px; color:var(--primary-light);">${Helpers.escapeHtml(b.code)}</pre>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
            <style>
            .tool-link-card:hover {
                background: rgba(212,168,67,0.04);
                border-color: rgba(212,168,67,0.3);
                transform: translateY(-2px);
            }
            .tool-link-card i {
                transition: color 0.2s;
            }
            .tool-link-card:hover i {
                color: var(--primary-light);
            }
            </style>
        `;

        this.bindEvents();
    },

    bindEvents() {
        document.getElementById('tv-tabs')?.addEventListener('click', e => {
            const tab = e.target.closest('.tab-item');
            if(!tab) return;
            document.querySelectorAll('#tv-tabs .tab-item').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const view = tab.dataset.view;
            document.getElementById('tv-resources-view').style.display = view === 'resources' ? 'flex' : 'none';
            document.getElementById('tv-boilerplates-view').style.display = view === 'boilerplates' ? 'block' : 'none';
        });

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

        });
    }
};
