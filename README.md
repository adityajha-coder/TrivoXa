<div align="center">
  <img src="public/favicon.svg" alt="TrivoXa Logo" width="120" height="120">
  
  # TrivoXa Developer Toolkit
  
  **A Unified, High Performance Workspace for Modern Engineers**
  
  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://makeapullrequest.com)
  [![Platform](https://img.shields.io/badge/Platform-Web%20%7C%20PWA-blue.svg)]()
  [![Stack](https://img.shields.io/badge/Stack-Vanilla%20JS%20%7C%20Node.js%20%7C%20MongoDB-lightgrey.svg)]()
</div>

<br>

TrivoXa is a professional grade, browser based developer toolkit designed to consolidate scattered utilities into a single, cohesive workspace. Engineered for speed and clarity.

Whether you're visualizing complex GitHub structures in 3D, generating full stack boilerplates via AI, or managing secure code snippets, TrivoXa provides a unified, high contrast monochrome interface optimized for deep work.

<hr>

## Architecture & Technical Design

TrivoXa is built on a Member First architecture, ensuring data persistence and secure access to premium AI features.

*   **Frontend Engine:** 
    *   **Vanilla JS (ES6+):** Modular application logic with zero framework bloat for maximum execution speed.
    *   **Custom CSS Design System:** A strict monochrome aesthetic built with CSS Variables, supporting fluid animations and responsive layouts.
    *   **Single Page Application (SPA):** A custom client side router (`Router.js`) handles instantaneous page transitions without reloads.
*   **Backend Infrastructure:**
    *   **Node.js & Express:** A robust proxy and API server handling secure requests and business logic.
    *   **MongoDB (Mongoose):** High availability persistence for user accounts, code snippets, AI history, and documentation research.
    *   **JWT Authentication:** Secure, stateless session management for member only features.
*   **Performance & Offline:**
    *   **Progressive Web App (PWA):** Fully installable with service worker (`sw.js`) caching for instant loading and offline availability of core tools.
    *   **Asynchronous Loading:** Heavy dependencies like `Three.js`, and `3D Force Graph` are loaded on demand to optimize initial bundle size.
*   **Integrations:**
    *   **Groq Cloud:** Leveraging Llama 3.1 models for ultra high speed AI inference.
    *   **GitHub API:** Real time repository data and user profile exploration.
    *   **NPM Registry:** Live package heuristic analysis and download metrics.

<hr>

## Core Modules

### AI Hub
An intelligent development suite powered by Groq's high speed inference layer.
*   **AI Chat:** A stateful, context aware assistant for debugging, refactoring, and architectural discussions.
*   **AI Architect:** Transform high level requirements into complete terminal scaffolding scripts and JSON directory structures.
*   **AI Stacks:** Explore and generate optimized technology combinations for new projects.

### My Workspace
A centralized productivity space to organize your projects, save technical notes, and bookmark tools.
*   **Project Folders:** Organize notes, API endpoints, tool bookmarks, and command guidelines into structured folder layouts.
*   **Resource Bookmarks:** Save presets from the Free APIs, Tools Vault, and AI History lists directly to your active project folder with a single click.
*   **Quick Notes:** Store snippets and documentation reference materials alongside your project bookmarks.

### GitHub Explorer
Spatial visualization of repository architectures.
*   **3D Repo Visualizer:** Traverse GitHub repositories rendered as 3D force directed graphs. Comprehend directory depth and architectural scale at a glance.
*   **Git Insights:** Access remote repository metrics and local Git configuration details in a unified view.
*   **User Explorer:** Search and analyze GitHub profiles to understand contributor activity and repository ownership.

### Developer Utilities
A centralized suite of essential tools to minimize tab switching.
*   **Package Scout:** Deep dive into NPM package heuristics, download velocity, and bundle sizes.
*   **Free APIs Directory:** Filter and test over 55+ public REST endpoints directly within the interface.
*   **Tools Vault:** A curated directory of framework boilerplates, technical libraries, and system utilities.
*   **Commands Library:** Searchable reference for Git, Docker, Linux, and other essential CLI commands.
*   **Docs Search:** A centralized reference engine with persistent search history for technical research.

<hr>

## Workflows, Usage, and Daily Impact

This section details how to use each feature, where it is most applicable, and how it transforms your daily coding and project building flow.

### AI Hub

*   **How to Use It:** Open the AI Hub from the main menu. You can chat with the assistant to debug errors, design database models, or explain complex logic. Use the AI Architect by typing the goals of your project to get directories and shell setup scripts. Use AI Stacks to explore ideal technology combinations.
*   **Where to Use It:** Use this module when starting new applications, when you are stuck on a difficult bug, or when you need to prototype a new interface quickly.
*   **Daily Coding Impact:** It speeds up your initial repository setup from hours to seconds and reduces cognitive strain by acting as a secondary engineer that explains bugs and suggests architectural structures.
*   **Advanced Scenario Walkthrough:** When starting a full stack online store app, open the AI Architect. Type "A node backend with postgresql database and a vanilla javascript frontend". The system generates a visual folder map and a terminal command. Copy and run the command in your terminal to scaffold the entire workspace. Next, open AI Chat to ask "What is the best way to structure the payment schema for stripe?". Use the generated database models to begin your database setup immediately.
*   **Production Productivity Boost:** Instead of researching setup practices or writing empty directories one by one, you achieve a fully scaffolded structure in under one minute. This eliminates setup fatigue entirely.

### My Workspace

*   **How to Use It:** Create custom folder structures to group your project resources. Save custom text notes, bookmark external APIs, store technical commands, or save your AI query outputs directly to specific folders.
*   **Where to Use It:** Use it when planning upcoming software builds, collecting public endpoints for your applications, or maintaining a handy cheat sheet of shell commands.
*   **Daily Coding Impact:** Keeps your primary directory clean by offloading project planning and bookmarks to a cohesive dashboard. It builds a personal catalog of research, reducing the time spent searching online docs.
*   **Advanced Scenario Walkthrough:** When building a service that requires multiple third party resources, create a folder named "Payment Integration". As you browse the Free APIs directory, bookmark the conversion rate endpoint directly to your new folder. When querying the AI Hub for signature verification scripts, bookmark the output to the same folder. Copy critical terminal commands from the Commands Library to save them alongside your notes.
*   **Production Productivity Boost:** You compile all project dependencies, endpoints, logic blocks, and instructions into a single place. When you return to the project after a break, you do not waste time searching browser history or documentation pages.

### GitHub Explorer

*   **How to Use It:** Input any public repository URL into the explorer. The application will render a three dimensional visual layout of all directories and files. You can rotate and zoom to inspect specific files or click on user names to review profiles and stats.
*   **Where to Use It:** Use it when onboarding to a new project or looking at a large library codebase to understand how components connect together.
*   **Daily Coding Impact:** It changes how you understand complex codebases. Instead of reading lists of folders, you visualize the system architecture, which makes learning the layout much faster.
*   **Advanced Scenario Walkthrough:** When analyzing a large library like Express, enter its github repository link. The explorer generates a three dimensional graph showing how files link together. Zoom in on the central clusters to find where the main router logic resides. Click on the nodes to see file metrics. This gives you a clear sense of the library architecture before reading a single line of codebase code.
*   **Production Productivity Boost:** Grasping the architectural layout of an unfamiliar codebase is usually a slow process. By visualizing the file relationships spatially, you cut your understanding time by half.

### Developer Utilities

*   **How to Use It:** Open the package tool to search npm packages, check their bundle sizes, and view download trends. Use the API testing workspace to send requests to public endpoints. Browse CLI commands for Git, Docker, and Linux.
*   **Where to Use It:** Use it when deciding which packages to install, when you need a mock API for testing, or when you need to remember a complex terminal command.
*   **Daily Coding Impact:** It prevents tab fatigue by keeping package details, API tests, and command manuals inside one browser tab. This helps you maintain a deep focus state while building your project.
*   **Advanced Scenario Walkthrough:** When evaluating a utility library like lodash, open Package Scout. Check its bundle size and download velocity to ensure it is lightweight and widely used. Next, open the Free APIs list to locate a public placeholder endpoint, and run a quick test request directly from the dashboard to inspect the payload. Lastly, open the Commands Library to copy the correct docker deployment command.
*   **Production Productivity Boost:** You avoid importing bloated packages that slow down your applications, and you test integrations instantly without downloading separate testing software.

### Complete Project Building Example

This step by step example demonstrates how a developer uses TrivoXa to build an application from scratch.

*   **Step One:** Research and Tech Selection. The developer opens the AI Stacks module within the AI Hub to evaluate combinations. They select a high performance backend structure.
*   **Step Two:** Structure Generation. They transition to the AI Architect. They describe the project requirements. The architect returns the complete folder structure and shell command. The developer creates their local repository and executes the command.
*   **Step Three:** Setting Up the Workspace. The developer creates a project folder in My Workspace called "Project Alpha". They bookmark the recommended tools, stack templates, and git commands they will need during implementation.
*   **Step Four:** Exploring Dependencies. They use Package Scout to compare packages they plan to install. This ensures they choose the most optimized libraries.
*   **Step Five:** API Integration. The developer uses the Free APIs Directory to select testing endpoints. They test these endpoints directly inside TrivoXa to see the response structures, then bookmark them to their "Project Alpha" workspace folder.
*   **Step Six:** Code Refactoring. During coding, when encountering database or logic issues, the developer opens AI Chat to debug errors, discuss optimizations, and get explanations.

<hr>

## Repository Structure

TrivoXa is organized into a clean, modern, and highly modular client server architecture. The following table describes the role and responsibility of each directory and file in the codebase.

<table>
  <thead>
    <tr>
      <th align="left">Directory or File</th>
      <th align="left">Architectural Role</th>
      <th align="left">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>api/</strong></td>
      <td>Backend Routes</td>
      <td>Defines server endpoints, request handlers, and modular API controller files.</td>
    </tr>
    <tr>
      <td><strong>css/</strong></td>
      <td>Design System</td>
      <td>Enforces the monochrome visual styles, layout variables, and fluid transitions.</td>
    </tr>
    <tr>
      <td><strong>data/</strong></td>
      <td>Static Resources</td>
      <td>Stores local JSON files, public endpoint databases, and utility reference data.</td>
    </tr>
    <tr>
      <td><strong>js/</strong></td>
      <td>Frontend Controller</td>
      <td>Houses the modular application logic organized by feature groups.</td>
    </tr>
    <tr>
      <td>&nbsp;&nbsp;&nbsp;&nbsp;<strong>ai/</strong></td>
      <td>AI Feature Layer</td>
      <td>Manages AI Chat scripts, AI Architect builders, and technology stack mixers.</td>
    </tr>
    <tr>
      <td>&nbsp;&nbsp;&nbsp;&nbsp;<strong>auth/</strong></td>
      <td>Identity Manager</td>
      <td>Handles member login, registration, modal views, and authentication headers.</td>
    </tr>
    <tr>
      <td>&nbsp;&nbsp;&nbsp;&nbsp;<strong>core/</strong></td>
      <td>Application Kernel</td>
      <td>Contains the single page application router and the core booting system.</td>
    </tr>
    <tr>
      <td>&nbsp;&nbsp;&nbsp;&nbsp;<strong>dashboard/</strong></td>
      <td>Landing Page</td>
      <td>Controls the primary user interface workspace and welcome screens.</td>
    </tr>
    <tr>
      <td>&nbsp;&nbsp;&nbsp;&nbsp;<strong>docs/</strong></td>
      <td>Search Utilities</td>
      <td>Queries technical document libraries with saved search history tracking.</td>
    </tr>
    <tr>
      <td>&nbsp;&nbsp;&nbsp;&nbsp;<strong>git/</strong></td>
      <td>Spatial Visualizer</td>
      <td>Powers the three dimensional repository mapping and GitHub metadata queries.</td>
    </tr>
    <tr>
      <td>&nbsp;&nbsp;&nbsp;&nbsp;<strong>tools/</strong></td>
      <td>Developer Utilities</td>
      <td>Runs package metrics, live API checkers, and technical command vaults.</td>
    </tr>
    <tr>
      <td>&nbsp;&nbsp;&nbsp;&nbsp;<strong>ui/</strong></td>
      <td>Visual Components</td>
      <td>Assembles global layouts, dynamic load spinners, and navigation bars.</td>
    </tr>
    <tr>
      <td>&nbsp;&nbsp;&nbsp;&nbsp;<strong>utils/</strong></td>
      <td>Global Helpers</td>
      <td>Provides common data formatters, DOM wrappers, and primary fetch tools.</td>
    </tr>
    <tr>
      <td>&nbsp;&nbsp;&nbsp;&nbsp;<strong>workspace/</strong></td>
      <td>Personal Database</td>
      <td>Manages project folder creation, customized notes, and cloud snippet syncing.</td>
    </tr>
    <tr>
      <td><strong>public/</strong></td>
      <td>Static Assets</td>
      <td>Holds logos, system files, service configurations, and installation assets.</td>
    </tr>
    <tr>
      <td><strong>scripts/</strong></td>
      <td>Helper Scripts</td>
      <td>Maintains local maintenance tasks and configuration verification tools.</td>
    </tr>
    <tr>
      <td><strong>server/</strong></td>
      <td>Backend Server</td>
      <td>Initializes the Node Express server environment and database connectors.</td>
    </tr>
    <tr>
      <td><strong>index.html</strong></td>
      <td>SPA Entry Point</td>
      <td>Acts as the single entry point and primary shell for the application view.</td>
    </tr>
    <tr>
      <td><strong>package.json</strong></td>
      <td>Metadata File</td>
      <td>Registers system dependencies, run scripts, and project specifications.</td>
    </tr>
    <tr>
      <td><strong>vercel.json</strong></td>
      <td>Hosting Settings</td>
      <td>Controls cloud routing, backend execution redirection, and static setups.</td>
    </tr>
  </tbody>
</table>

<hr>

<div align="center">
  <i>Designed and Engineered by <a href="https://github.com/adityajha-coder">Aditya Jha</a>.</i>
</div>
