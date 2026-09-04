const OverviewSection = {
  render() {
    return `
                    <!-- ===== SECTION 01: OVERVIEW ===== -->
                    <section class="home-section home-reveal" id="overview" style="animation-delay: 0.08s;">
                        <div class="section-label">
                            <span class="label-mono">01 / Overview</span>
                            <span class="hero-brand-tag section-tag">Unified Platform</span>
                        </div>
                        <div class="section-content">
                            <h2>One connected surface. <span class="gradient-headline">Zero fragmentation.</span></h2>
                            <p class="section-lead">
                                TrivoXa brings multi-model AI assistance, 3D codebase visualizers, and offline developer utilities together into a single, cohesive workspace designed for effortless focus.
                            </p>

                            <!-- Simple, Comfortable 3-Pillar Grid -->
                            <div class="overview-grid">
                                <div class="overview-card" data-page="ask-ai">
                                    <div class="overview-card-header">
                                        <div class="overview-card-icon">
                                            <i class="fa-solid fa-microchip"></i>
                                        </div>
                                    </div>
                                    <div class="overview-card-body">
                                        <h3>Multi-Model Intelligence</h3>
                                        <p>High-speed AI code assistant powered by Groq and Google Gemini with automatic failover routing for continuous, uninterrupted coding.</p>
                                    </div>
                                    <div class="overview-card-footer">
                                        <span class="overview-link-text">Launch AI Hub</span>
                                        <div class="overview-link-arrow">
                                            <i class="fa-solid fa-arrow-right"></i>
                                        </div>
                                    </div>
                                </div>

                                <div class="overview-card" data-page="code-git-explorer">
                                    <div class="overview-card-header">
                                        <div class="overview-card-icon">
                                            <i class="fa-solid fa-code-fork"></i>
                                        </div>
                                    </div>
                                    <div class="overview-card-body">
                                        <h3>3D Codebase Visualizer</h3>
                                        <p>Inspect public GitHub repositories in an interactive 3D WebGL force graph to understand file topology and dependencies in seconds.</p>
                                    </div>
                                    <div class="overview-card-footer">
                                        <span class="overview-link-text">Explore 3D Graph</span>
                                        <div class="overview-link-arrow">
                                            <i class="fa-solid fa-arrow-right"></i>
                                        </div>
                                    </div>
                                </div>

                                <div class="overview-card" data-page="workspace">
                                    <div class="overview-card-header">
                                        <div class="overview-card-icon">
                                            <i class="fa-solid fa-box-archive"></i>
                                        </div>
                                    </div>
                                    <div class="overview-card-body">
                                        <h3>Local-First Workspace</h3>
                                        <p>Instant access to tested public APIs, hundreds of CLI cheat-sheets, and offline snippet storage with sub-millisecond local search.</p>
                                    </div>
                                    <div class="overview-card-footer">
                                        <span class="overview-link-text">Open Workspace</span>
                                        <div class="overview-link-arrow">
                                            <i class="fa-solid fa-arrow-right"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Calm, Comfortable Metrics Ribbon -->
                            <div class="overview-metrics-bar">
                                <div class="metric-item">
                                    <span class="metric-value">3</span>
                                    <span class="metric-label">AI Fallback Engines</span>
                                </div>
                                <div class="metric-divider"></div>
                                <div class="metric-item">
                                    <span class="metric-value">100+</span>
                                    <span class="metric-label">Curated Dev Tools & APIs</span>
                                </div>
                                <div class="metric-divider"></div>
                                <div class="metric-item">
                                    <span class="metric-value">3D</span>
                                    <span class="metric-label">WebGL Force Graph Engine</span>
                                </div>
                                <div class="metric-divider"></div>
                                <div class="metric-item">
                                    <span class="metric-value">0ms</span>
                                    <span class="metric-label">Local-First Latency</span>
                                </div>
                            </div>
                        </div>
                    </section>`;
  },

  bindEvents(content) {
    // Navigation via data-page is handled globally by DashboardPage
  },
};

window.OverviewSection = OverviewSection;
