const CodeGeneratorTemplates = {
    'pricing-card': {
        label: 'Pricing Card', icon: 'fa-solid fa-credit-card',
        html: `<div class="pricing-card">
  <div class="pricing-header">
    <span class="pricing-badge">Popular</span>
    <h3 class="pricing-title">Pro Plan</h3>
    <div class="pricing-amount">
      <span class="currency">$</span>
      <span class="price">29</span>
      <span class="period">/month</span>
    </div>
  </div>
  <ul class="pricing-features">
    <li><i class="fa-solid fa-check"></i> Unlimited Projects</li>
    <li><i class="fa-solid fa-check"></i> Priority Support</li>
    <li><i class="fa-solid fa-check"></i> Advanced Analytics</li>
    <li><i class="fa-solid fa-check"></i> Custom Integrations</li>
  </ul>
  <button class="pricing-btn">Get Started</button>
</div>
<style>
.pricing-card{background:rgba(15,15,30,0.8);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.08);border-radius:20px;padding:36px;max-width:360px;position:relative;overflow:hidden}
.pricing-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,#6366f1,#8b5cf6,#06b6d4)}
.pricing-badge{display:inline-block;padding:4px 14px;background:linear-gradient(135deg,#6366f1,#8b5cf6);border-radius:20px;font-size:12px;font-weight:600;color:#fff;margin-bottom:16px}
.pricing-title{font-size:22px;font-weight:700;color:#e2e8f0;margin-bottom:12px}
.pricing-amount{display:flex;align-items:baseline;gap:2px;margin-bottom:24px}
.currency{font-size:24px;color:#94a3b8;font-weight:600}
.price{font-size:56px;font-weight:800;color:#fff;line-height:1}
.period{font-size:16px;color:#64748b}
.pricing-features{list-style:none;padding:0;margin:0 0 32px;display:flex;flex-direction:column;gap:14px}
.pricing-features li{display:flex;align-items:center;gap:12px;font-size:14px;color:#cbd5e1}
.pricing-features li i{color:#22c55e;font-size:13px}
.pricing-btn{width:100%;padding:14px;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;border:none;border-radius:12px;font-size:15px;font-weight:600;cursor:pointer;transition:all 0.2s}
.pricing-btn:hover{box-shadow:0 8px 30px rgba(99,102,241,0.4);transform:translateY(-2px)}
</style>`,
        react: `import React from 'react';

const PricingCard = ({ plan = 'Pro Plan', price = 29, features = ['Unlimited Projects', 'Priority Support', 'Advanced Analytics', 'Custom Integrations'] }) => {
  return (
    <div className="pricing-card">
      <div className="pricing-header">
        <span className="pricing-badge">Popular</span>
        <h3>{plan}</h3>
        <div className="pricing-amount">
          <span className="currency">$</span>
          <span className="price">{price}</span>
          <span className="period">/month</span>
        </div>
      </div>
      <ul className="pricing-features">
        {features.map((f, i) => <li key={i}>✓ {f}</li>)}
      </ul>
      <button className="pricing-btn">Get Started</button>
    </div>
  );
};
export default PricingCard;`,
        vue: `<template>
  <div class="pricing-card">
    <span class="pricing-badge">Popular</span>
    <h3>{{ plan }}</h3>
    <div class="pricing-amount"><span class="currency">$</span><span class="price">{{ price }}</span><span class="period">/month</span></div>
    <ul class="pricing-features">
      <li v-for="f in features" :key="f">✓ {{ f }}</li>
    </ul>
    <button class="pricing-btn">Get Started</button>
  </div>
</template>
<script>
export default {
  props: { plan: { default: 'Pro Plan' }, price: { default: 29 }, features: { default: () => ['Unlimited Projects', 'Priority Support'] } }
};
</script>`
    },
    'login-form': {
        label: 'Login Form', icon: 'fa-solid fa-right-to-bracket',
        html: `<div class="login-card">
  <div class="login-header">
    <div class="login-logo"><i class="fa-solid fa-bolt"></i></div>
    <h2>Welcome Back</h2>
    <p>Sign in to your account</p>
  </div>
  <form class="login-form">
    <div class="form-group">
      <label>Email</label>
      <input type="email" placeholder="you@example.com" />
    </div>
    <div class="form-group">
      <label>Password</label>
      <input type="password" placeholder="Enter password" />
    </div>
    <button type="submit" class="login-btn">Sign In</button>
    <div class="divider"><span>or</span></div>
    <div class="social-btns">
      <button type="button"><i class="fa-brands fa-google"></i></button>
      <button type="button"><i class="fa-brands fa-github"></i></button>
    </div>
  </form>
</div>
<style>
.login-card{background:rgba(15,15,30,0.8);backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.07);border-radius:24px;padding:40px;max-width:420px}
.login-header{text-align:center;margin-bottom:32px}
.login-logo{width:52px;height:52px;background:linear-gradient(135deg,#6366f1,#8b5cf6);border-radius:14px;display:inline-flex;align-items:center;justify-content:center;font-size:22px;color:#fff;margin-bottom:16px}
.login-header h2{font-size:24px;font-weight:700;color:#e2e8f0;margin-bottom:6px}
.login-header p{color:#64748b;font-size:14px}
.form-group{margin-bottom:20px}
.form-group label{display:block;font-size:13px;font-weight:500;color:#94a3b8;margin-bottom:8px}
.form-group input{width:100%;padding:12px 16px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:10px;color:#e2e8f0;font-size:14px;outline:none}
.form-group input:focus{border-color:#6366f1}
.login-btn{width:100%;padding:13px;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;border:none;border-radius:10px;font-size:15px;font-weight:600;cursor:pointer}
.divider{display:flex;align-items:center;gap:16px;margin:24px 0;color:#475569;font-size:12px}
.divider::before,.divider::after{content:'';flex:1;height:1px;background:rgba(255,255,255,0.06)}
.social-btns{display:flex;gap:12px;justify-content:center}
.social-btns button{width:48px;height:48px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:10px;color:#94a3b8;font-size:18px;cursor:pointer}
</style>`,
        react: `import React, { useState } from 'react';

const LoginForm = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div className="login-card">
      <h2>Welcome Back</h2>
      <form onSubmit={e => { e.preventDefault(); onSubmit?.({ email, password }); }}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};
export default LoginForm;`,
        vue: `<template>
  <div class="login-card">
    <h2>Welcome Back</h2>
    <form @submit.prevent="$emit('submit', { email, password })">
      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Password" />
      <button type="submit">Sign In</button>
    </form>
  </div>
</template>
<script>
export default { data: () => ({ email: '', password: '' }) };
</script>`
    },
    'navbar': {
        label: 'Navigation Bar', icon: 'fa-solid fa-bars',
        html: `<nav class="navbar">
  <div class="nav-container">
    <a href="#" class="nav-brand"><span class="brand-icon"><i class="fa-solid fa-bolt"></i></span><span>BrandName</span></a>
    <div class="nav-links">
      <a href="#" class="nav-link active">Home</a>
      <a href="#" class="nav-link">Features</a>
      <a href="#" class="nav-link">Pricing</a>
      <a href="#" class="nav-link">About</a>
    </div>
    <div class="nav-actions">
      <button class="nav-btn-ghost">Sign In</button>
      <button class="nav-btn-primary">Get Started</button>
    </div>
  </div>
</nav>
<style>
.navbar{position:fixed;top:0;left:0;right:0;background:rgba(6,6,11,0.85);backdrop-filter:blur(20px);border-bottom:1px solid rgba(255,255,255,0.06);z-index:1000;padding:0 24px}
.nav-container{max-width:1200px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;height:68px}
.nav-brand{display:flex;align-items:center;gap:10px;text-decoration:none;color:#e2e8f0;font-weight:700;font-size:18px}
.brand-icon{width:34px;height:34px;background:linear-gradient(135deg,#6366f1,#8b5cf6);border-radius:8px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:14px}
.nav-links{display:flex;gap:8px}
.nav-link{padding:8px 16px;border-radius:8px;color:#94a3b8;text-decoration:none;font-size:14px;font-weight:500;transition:all 0.2s}
.nav-link:hover,.nav-link.active{color:#e2e8f0;background:rgba(255,255,255,0.05)}
.nav-btn-ghost{padding:8px 18px;background:none;border:1px solid rgba(255,255,255,0.1);border-radius:8px;color:#e2e8f0;font-size:14px;cursor:pointer}
.nav-btn-primary{padding:8px 18px;background:linear-gradient(135deg,#6366f1,#8b5cf6);border:none;border-radius:8px;color:#fff;font-size:14px;font-weight:600;cursor:pointer}
</style>`,
        react: `import React from 'react';
const Navbar = ({ brandName = 'BrandName' }) => (
  <nav className="navbar">
    <a href="#" className="nav-brand">{brandName}</a>
    <div className="nav-links">
      <a href="#" className="nav-link active">Home</a>
      <a href="#" className="nav-link">Features</a>
      <a href="#" className="nav-link">Pricing</a>
    </div>
    <button className="nav-btn-primary">Get Started</button>
  </nav>
);
export default Navbar;`,
        vue: `<template>
  <nav class="navbar">
    <a href="#" class="nav-brand">{{ brandName }}</a>
    <div class="nav-links">
      <a v-for="l in links" :key="l.label" :href="l.href" :class="['nav-link', {active: l.active}]">{{ l.label }}</a>
    </div>
    <button class="nav-btn-primary">Get Started</button>
  </nav>
</template>
<script>
export default {
  props: { brandName: { default: 'Brand' } },
  data: () => ({ links: [{ label: 'Home', href: '#', active: true }, { label: 'Features', href: '#' }] })
};
</script>`
    },
    'hero-section': {
        label: 'Hero Section', icon: 'fa-solid fa-star',
        html: `<section class="hero">
  <div class="hero-bg"><div class="hero-glow"></div></div>
  <div class="hero-content">
    <div class="hero-badge"><span class="badge-dot"></span> Now in Beta</div>
    <h1 class="hero-title">Build Faster with<br><span class="gradient-text">Modern Tools</span></h1>
    <p class="hero-desc">Ship products 10x faster with our powerful platform.</p>
    <div class="hero-actions">
      <button class="hero-btn-primary">Start Building <i class="fa-solid fa-arrow-right"></i></button>
      <button class="hero-btn-secondary"><i class="fa-solid fa-play"></i> Watch Demo</button>
    </div>
  </div>
</section>
<style>
.hero{min-height:100vh;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;background:#06060b;padding:40px 24px}
.hero-bg{position:absolute;inset:0}
.hero-glow{position:absolute;top:-200px;left:50%;transform:translateX(-50%);width:600px;height:600px;background:radial-gradient(circle,rgba(99,102,241,0.15) 0%,transparent 70%);border-radius:50%}
.hero-content{position:relative;text-align:center;max-width:720px}
.hero-badge{display:inline-flex;align-items:center;gap:8px;padding:6px 18px;background:rgba(99,102,241,0.1);border:1px solid rgba(99,102,241,0.2);border-radius:30px;font-size:13px;color:#818cf8;margin-bottom:28px}
.badge-dot{width:6px;height:6px;background:#22c55e;border-radius:50%;animation:pulse 2s infinite}
.hero-title{font-size:64px;font-weight:800;line-height:1.1;color:#f1f5f9;letter-spacing:-2px;margin-bottom:20px}
.gradient-text{background:linear-gradient(135deg,#818cf8,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.hero-desc{font-size:18px;color:#94a3b8;line-height:1.7;margin:0 auto 36px;max-width:540px}
.hero-actions{display:flex;gap:14px;justify-content:center}
.hero-btn-primary{display:flex;align-items:center;gap:10px;padding:14px 32px;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;border:none;border-radius:12px;font-size:16px;font-weight:600;cursor:pointer}
.hero-btn-secondary{display:flex;align-items:center;gap:10px;padding:14px 28px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:#e2e8f0;border-radius:12px;font-size:16px;cursor:pointer}
</style>`,
        react: `import React from 'react';
const HeroSection = ({ title = 'Build Faster with', subtitle = 'Modern Tools' }) => (
  <section className="hero">
    <div className="hero-content">
      <h1>{title}<br /><span className="gradient-text">{subtitle}</span></h1>
      <p>Ship products 10x faster with our powerful platform.</p>
      <button className="hero-btn-primary">Start Building →</button>
    </div>
  </section>
);
export default HeroSection;`,
        vue: `<template>
  <section class="hero">
    <div class="hero-content">
      <h1>{{ title }}<br><span class="gradient-text">{{ subtitle }}</span></h1>
      <p>Ship products 10x faster with our powerful platform.</p>
      <button class="hero-btn-primary">Start Building →</button>
    </div>
  </section>
</template>
<script>
export default { props: { title: { default: 'Build Faster with' }, subtitle: { default: 'Modern Tools' } } };
</script>`
    },
    'dashboard-card': {
        label: 'Dashboard Card', icon: 'fa-solid fa-chart-line',
        html: `<div class="dash-card">
  <div class="dash-card-header">
    <div><span class="dash-card-label">Total Revenue</span><h3 class="dash-card-value">$45,231</h3><div class="dash-card-change positive"><i class="fa-solid fa-arrow-up"></i> +20.1%</div></div>
    <div class="dash-card-icon"><i class="fa-solid fa-dollar-sign"></i></div>
  </div>
</div>
<style>
.dash-card{background:rgba(15,15,30,0.8);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.07);border-radius:16px;padding:24px;max-width:380px}
.dash-card-header{display:flex;justify-content:space-between;align-items:flex-start}
.dash-card-label{font-size:13px;color:#94a3b8}
.dash-card-value{font-size:32px;font-weight:700;color:#f1f5f9;margin:6px 0;letter-spacing:-1px}
.dash-card-change.positive{font-size:12px;color:#22c55e}
.dash-card-icon{width:44px;height:44px;background:rgba(99,102,241,0.12);border-radius:10px;display:flex;align-items:center;justify-content:center;color:#818cf8;font-size:18px}
</style>`,
        react: `import React from 'react';
const DashboardCard = ({ label, value, change }) => (
  <div className="dash-card">
    <div className="dash-card-header">
      <div><span className="dash-card-label">{label}</span><h3 className="dash-card-value">{value}</h3><div className="dash-card-change positive">{change}</div></div>
    </div>
  </div>
);
export default DashboardCard;`,
        vue: `<template>
  <div class="dash-card"><div class="dash-card-header"><div><span>{{ label }}</span><h3>{{ value }}</h3><div class="positive">{{ change }}</div></div></div></div>
</template>
<script>
export default { props: ['label', 'value', 'change'] };
</script>`
    },
    'profile-card': {
        label: 'Profile Card', icon: 'fa-solid fa-user',
        html: `<div class="profile-card">
  <div class="profile-cover"><div class="cover-gradient"></div></div>
  <div class="profile-body">
    <img class="profile-avatar" src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Avatar" />
    <h3>Alex Johnson</h3>
    <p class="profile-role">Senior Developer</p>
    <p class="profile-bio">Building beautiful interfaces and crafting pixel-perfect experiences.</p>
    <button class="profile-follow-btn">Follow</button>
  </div>
</div>
<style>
.profile-card{background:rgba(15,15,30,0.8);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.07);border-radius:20px;overflow:hidden;max-width:340px}
.profile-cover{height:100px;position:relative}
.cover-gradient{position:absolute;inset:0;background:linear-gradient(135deg,#6366f1,#8b5cf6,#06b6d4)}
.profile-body{padding:0 24px 28px;text-align:center}
.profile-avatar{width:80px;height:80px;border-radius:50%;border:4px solid rgba(15,15,30,0.8);margin-top:-40px;background:#1a1a2e}
.profile-card h3{font-size:18px;font-weight:700;color:#f1f5f9;margin-top:12px}
.profile-role{font-size:13px;color:#818cf8;margin-top:4px}
.profile-bio{font-size:13px;color:#94a3b8;line-height:1.6;margin-top:12px}
.profile-follow-btn{margin-top:20px;width:100%;padding:10px;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;border:none;border-radius:10px;font-weight:600;font-size:14px;cursor:pointer}
</style>`,
        react: `import React from 'react';
const ProfileCard = ({ name = 'Alex Johnson', role = 'Senior Developer' }) => (
  <div className="profile-card">
    <div className="profile-cover" />
    <div className="profile-body">
      <h3>{name}</h3><p>{role}</p>
      <button className="profile-follow-btn">Follow</button>
    </div>
  </div>
);
export default ProfileCard;`,
        vue: `<template>
  <div class="profile-card"><div class="profile-cover" /><div class="profile-body"><h3>{{ name }}</h3><p>{{ role }}</p><button>Follow</button></div></div>
</template>
<script>
export default { props: { name: { default: 'Alex Johnson' }, role: { default: 'Developer' } } };
</script>`
    },
    'modal': {
        label: 'Modal Dialog', icon: 'fa-solid fa-window-maximize',
        html: `<div class="modal-backdrop">
  <div class="modal-dialog">
    <div class="modal-icon-wrap"><i class="fa-solid fa-check-circle"></i></div>
    <h3>Payment Successful</h3>
    <p>Your payment of <strong>$29.00</strong> has been processed. A confirmation email has been sent.</p>
    <div class="modal-footer">
      <button class="modal-btn-outline">Close</button>
      <button class="modal-btn-fill">Download Receipt</button>
    </div>
  </div>
</div>
<style>
.modal-backdrop{position:fixed;inset:0;background:rgba(0,0,0,0.6);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;z-index:1000}
.modal-dialog{background:rgba(15,15,30,0.95);border:1px solid rgba(255,255,255,0.08);border-radius:20px;padding:36px;max-width:440px;width:90%;text-align:center}
.modal-icon-wrap{width:56px;height:56px;background:rgba(34,197,94,0.12);border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:28px;color:#22c55e;margin-bottom:16px}
.modal-dialog h3{font-size:20px;font-weight:700;color:#f1f5f9;margin-bottom:8px}
.modal-dialog p{font-size:14px;color:#94a3b8;line-height:1.6;margin-bottom:24px}
.modal-footer{display:flex;gap:12px}
.modal-btn-outline{flex:1;padding:12px;background:none;border:1px solid rgba(255,255,255,0.1);border-radius:10px;color:#e2e8f0;font-size:14px;cursor:pointer}
.modal-btn-fill{flex:1;padding:12px;background:linear-gradient(135deg,#6366f1,#8b5cf6);border:none;border-radius:10px;color:#fff;font-size:14px;font-weight:600;cursor:pointer}
</style>`,
        react: `import React from 'react';
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" onClick={e => e.stopPropagation()}>
        <h3>{title}</h3>
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};
export default Modal;`,
        vue: `<template>
  <teleport to="body"><div v-if="modelValue" class="modal-backdrop" @click="$emit('update:modelValue',false)">
    <div class="modal-dialog" @click.stop><h3>{{ title }}</h3><slot /><button @click="$emit('update:modelValue',false)">Close</button></div>
  </div></teleport>
</template>
<script>
export default { props: { modelValue: Boolean, title: { default: 'Modal' } } };
</script>`
    }
};

const CodeGeneratorPage = {
    currentFramework: 'html',
    currentTemplate: null,

    render() {
        Navbar.renderTopbar('Code Generator');
        const content = document.getElementById('page-content');
        content.innerHTML = `
            <div class="page-enter">
                <div class="page-header">
                    <h1>Code <span class="text-gradient">Generator</span></h1>
                    <p>Select a component template and framework to generate production-ready code instantly.</p>
                </div>
                <div class="flex-between mb-md flex-wrap">
                    <div class="tabs" id="framework-tabs">
                        <button class="tab-item active" data-fw="html">HTML/CSS</button>
                        <button class="tab-item" data-fw="react">React</button>
                        <button class="tab-item" data-fw="vue">Vue</button>
                    </div>
                </div>
                <div class="mb-lg">
                    <p class="text-sm text-secondary mb-sm" style="font-weight: 600;">Choose a Component</p>
                    <div class="template-grid" id="template-grid"></div>
                </div>
                <div id="generator-output-area" style="display: none;">
                    <div class="glass-card-static">
                        <div class="flex-between mb-md">
                            <div class="flex-gap">
                                <span class="tag tag-primary" id="output-fw-tag"></span>
                                <span class="text-sm" style="font-weight: 600;" id="output-template-name"></span>
                            </div>
                            <button class="btn btn-secondary btn-sm" id="copy-code-btn">
                                <i class="fa-solid fa-copy"></i> Copy Code
                            </button>
                        </div>
                        <div class="generator-output">
                            <pre id="code-output"></pre>
                        </div>
                    </div>
                </div>
            </div>`;
        this.renderTemplateGrid();
        this.bindEvents();
    },

    renderTemplateGrid() {
        const grid = document.getElementById('template-grid');
        grid.innerHTML = Object.entries(CodeGeneratorTemplates).map(([key, tmpl]) =>
            `<div class="glass-card template-item ${this.currentTemplate === key ? 'selected' : ''}" data-template="${key}">
                <i class="${tmpl.icon}" style="color: var(--primary-light);"></i>
                <span>${tmpl.label}</span>
            </div>`
        ).join('');
    },

    bindEvents() {
        document.getElementById('framework-tabs').addEventListener('click', (e) => {
            const tab = e.target.closest('.tab-item');
            if (!tab) return;
            document.querySelectorAll('#framework-tabs .tab-item').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            this.currentFramework = tab.dataset.fw;
            if (this.currentTemplate) this.generateCode();
        });

        document.getElementById('template-grid').addEventListener('click', (e) => {
            const item = e.target.closest('.template-item');
            if (!item) return;
            document.querySelectorAll('.template-item').forEach(t => t.classList.remove('selected'));
            item.classList.add('selected');
            this.currentTemplate = item.dataset.template;
            this.generateCode();
        });

        document.getElementById('copy-code-btn').addEventListener('click', () => {
            Helpers.copyToClipboard(document.getElementById('code-output').textContent);
        });
    },

    generateCode() {
        const tmpl = CodeGeneratorTemplates[this.currentTemplate];
        if (!tmpl) return;
        document.getElementById('generator-output-area').style.display = 'block';
        document.getElementById('output-fw-tag').textContent = this.currentFramework.toUpperCase();
        document.getElementById('output-template-name').textContent = tmpl.label;
        const code = tmpl[this.currentFramework] || 'Template not available for this framework.';
        const el = document.getElementById('code-output');
        el.textContent = '';
        this.typeCode(el, code, 0);
    },

    typeCode(element, code, index) {
        if (index < code.length) {
            element.textContent = code.substring(0, index + 4);
            requestAnimationFrame(() => this.typeCode(element, code, index + 4));
        } else {
            element.textContent = code;
        }
    }
};
