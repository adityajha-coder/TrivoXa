const AiStacksMixin = {
    bindRoles() {
        const roleCards = document.querySelectorAll('.role-card');
        const roleDetail = document.getElementById('role-detail');
        const roleClose = document.getElementById('role-close');
        
        if (roleCards.length === 0 || !roleDetail || !roleClose) {
            console.warn('[Stacks] Missing role elements - skipping binding');
            return;
        }
        
        roleCards.forEach(card => {
            card.addEventListener('click', () => {
                const data = this.roleData[card.dataset.role];
                if (!data) return;
                
                const titleEl = document.getElementById('role-detail-title');
                const descEl = document.getElementById('role-detail-desc');
                const stackEl = document.getElementById('role-detail-stack');
                
                if (titleEl && descEl && stackEl) {
                    roleDetail.style.display = 'block';
                    titleEl.innerHTML = `<i class="fa-solid fa-compass" style="color:var(--primary-light);margin-right:6px;"></i>${data.title}`;
                    descEl.textContent = data.desc;
                    stackEl.innerHTML = `<div class="grid-3">${data.stack.map(s => `<div class="glass-card" style="padding:16px;"><div class="flex-gap mb-sm"><i class="${s.icon}" style="color:${s.color};font-size:1.1rem;"></i><span style="font-weight:600;font-size:0.88rem;">${s.name}</span></div><span class="tag tag-primary mb-sm">${s.type}</span><p class="text-xs text-secondary" style="line-height:1.5;margin-top:6px;">${s.desc}</p></div>`).join('')}</div>`;
                    roleDetail.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    document.querySelectorAll('.role-card').forEach(c => c.classList.remove('active'));
                    card.classList.add('active');
                }
            });
        });
        
        roleClose.addEventListener('click', () => { 
            roleDetail.style.display = 'none';
            document.querySelectorAll('.role-card').forEach(c => c.classList.remove('active'));
        });
    }
};
