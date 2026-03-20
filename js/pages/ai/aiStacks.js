const AiStacksMixin = {
    bindRoles() {
        document.querySelectorAll('.role-card').forEach(card => {
            card.addEventListener('click', () => {
                const data = this.roleData[card.dataset.role];
                if (!data) return;
                document.getElementById('role-detail').style.display = 'block';
                document.getElementById('role-detail-title').innerHTML = `<i class="fa-solid fa-compass" style="color:var(--primary-light);margin-right:6px;"></i>${data.title}`;
                document.getElementById('role-detail-desc').textContent = data.desc;
                document.getElementById('role-detail-stack').innerHTML = `<div class="grid-3">${data.stack.map(s => `<div class="glass-card" style="padding:16px;"><div class="flex-gap mb-sm"><i class="${s.icon}" style="color:${s.color};font-size:1.1rem;"></i><span style="font-weight:600;font-size:0.88rem;">${s.name}</span></div><span class="tag tag-primary mb-sm">${s.type}</span><p class="text-xs text-secondary" style="line-height:1.5;margin-top:6px;">${s.desc}</p></div>`).join('')}</div>`;
                document.getElementById('role-detail').scrollIntoView({ behavior: 'smooth', block: 'center' });
                document.querySelectorAll('.role-card').forEach(c => c.classList.remove('active'));
                card.classList.add('active');
            });
        });
        document.getElementById('role-close').addEventListener('click', () => { document.getElementById('role-detail').style.display = 'none'; document.querySelectorAll('.role-card').forEach(c => c.classList.remove('active')); });
    }
};
