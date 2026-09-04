const HeroSection = {
  render() {
    return `
                    <section class="home-hero home-reveal">
                        <div class="hero-image-backdrop">
                            <img src="/public/hero-3d.jpg" alt="TrivoXa Developer Command Center" class="hero-3d-render" />
                            <div class="hero-image-overlay"></div>
                        </div>
                        <div class="hero-content-left">
                            <div class="hero-brand-tag">Build Smart</div>
                            <h1 class="hero-title">
                                <span class="sprint-text">Accelerate</span><br>
                                your workflow<br>
                                now.
                            </h1>
                            <p class="hero-copy">
                                TrivoXa brings multi-model AI, 3D repository visualization, code execution, CLI references, and developer utilities into one unified workspace.
                            </p>
                            <div class="hero-launch-bar" onclick="document.getElementById('overview').scrollIntoView({ behavior: 'smooth' });">
                                <div class="launch-icon">
                                    <i class="fa-solid fa-terminal"></i>
                                </div>
                                <span class="launch-label">Explore</span>
                                <button class="launch-action-btn" type="button" aria-label="Explore tools">
                                    <i class="fa-solid fa-arrow-right"></i>
                                </button>
                            </div>
                        </div>
                    </section>`;
  },
};

window.HeroSection = HeroSection;
