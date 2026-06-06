const GithubUserMixin = {
  async loadUser(username) {
    try {
      const [user, repos, events] = await Promise.all([
        API.getUserInfo(username),
        API.getUserRepos(username, "updated", 12),
        API.getUserEvents(username, 20),
      ]);
      document.getElementById("explorer-empty").style.display = "none";
      document.getElementById("explorer-tabs-area").style.display = "none";
      document.getElementById("explorer-info").style.display = "none";
      document.getElementById("explorer-structure-view").style.display = "none";
      document.getElementById("explorer-git-view").style.display = "none";

      this.cleanup();
      document.getElementById("explorer-user-view").style.display = "block";

      this.renderProfile(user);
      this.renderRepos(repos);
      this.renderEvents(events);
    } catch (err) {
      Toast.show(err.message, "error");
    }
  },

  renderProfile(user) {
    document.getElementById("gh-profile-area").innerHTML = `
            <div class="glass-card github-profile-card">
                <img src="${user.avatar_url}" alt="${user.login}" />
                <div class="profile-info">
                    <h2>${user.name || user.login}</h2>
                    <p>${user.bio || "No bio available"}</p>
                    <div class="profile-stats">
                        <span><strong>${user.public_repos}</strong> repos</span>
                        <span><strong>${Helpers.formatNumber(user.followers)}</strong> followers</span>
                        <span><strong>${user.following}</strong> following</span>
                    </div>
                    <div class="flex-gap mt-sm flex-wrap text-sm">
                        ${user.location ? `<span class="text-xs text-muted"><i class="fa-solid fa-location-dot"></i> ${user.location}</span>` : ""}
                        ${user.blog ? `<a href="${user.blog.startsWith("http") ? user.blog : "https://" + user.blog}" target="_blank" class="text-xs api-link"><i class="fa-solid fa-link"></i> Website</a>` : ""}
                        <span class="text-xs text-muted"><i class="fa-solid fa-calendar"></i> Joined ${new Date(user.created_at).toLocaleDateString("en-US", { month: "short", year: "numeric" })}</span>
                    </div>
                </div>
            </div>`;
  },

  renderRepos(repos) {
    const langCount = {};
    repos.forEach((r) => {
      if (r.language) langCount[r.language] = (langCount[r.language] || 0) + 1;
    });
    const topLangs = Object.entries(langCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
    document.getElementById("gh-repos-area").innerHTML = `
            <h3 style="font-size:0.95rem;font-weight:600;margin-bottom:12px;"><i class="fa-solid fa-book" style="color:var(--primary-light);margin-right:6px;"></i>Recent Repositories</h3>
            <div class="grid-2 mb-lg">
                ${repos
                  .slice(0, 6)
                  .map(
                    (r) => `
                    <div class="glass-card" style="padding:16px;">
                        <div class="flex-between mb-sm">
                            <a href="${r.html_url}" target="_blank" rel="noopener" class="api-link" style="font-weight:600;">${r.name}</a>
                            ${r.private ? '<span class="tag tag-warning">Private</span>' : '<span class="tag tag-success">Public</span>'}
                        </div>
                        <p class="text-sm text-secondary" style="line-height:1.5;">${Helpers.escapeHtml(Helpers.truncate(r.description || "No description", 80))}</p>
                        <div class="flex-gap text-xs text-muted mt-sm">
                            ${r.language ? `<span><span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:${Helpers.getLanguageColor(r.language)};margin-right:3px;"></span>${r.language}</span>` : ""}
                            <span><i class="fa-solid fa-star"></i> ${r.stargazers_count}</span>
                            <span>${Helpers.timeAgo(r.updated_at)}</span>
                        </div>
                    </div>`,
                  )
                  .join("")}
            </div>
            ${
              topLangs.length
                ? `
            <h3 style="font-size:0.95rem;font-weight:600;margin-bottom:12px;"><i class="fa-solid fa-chart-pie" style="color:var(--primary-light);margin-right:6px;"></i>Languages</h3>
            <div class="glass-card-static" style="padding:18px;">
                <div style="display:flex;flex-direction:column;gap:10px;">
                    ${topLangs
                      .map(([lang, count]) => {
                        const pct = Math.round((count / repos.length) * 100);
                        return `<div><div class="flex-between mb-sm"><div class="flex-gap"><span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:${Helpers.getLanguageColor(lang)};"></span><span class="text-sm">${lang}</span></div><span class="text-xs text-muted">${pct}%</span></div><div class="pkg-score"><div class="pkg-score-fill" style="width:${pct}%;background:${Helpers.getLanguageColor(lang)};"></div></div></div>`;
                      })
                      .join("")}
                </div>
            </div>`
                : ""
            }`;
  },

  renderEvents(events) {
    const eventTypes = {
      PushEvent: {
        icon: "fa-solid fa-arrow-up",
        label: "pushed to",
        color: "var(--success)",
      },
      CreateEvent: {
        icon: "fa-solid fa-plus",
        label: "created",
        color: "var(--primary-light)",
      },
      DeleteEvent: {
        icon: "fa-solid fa-trash",
        label: "deleted",
        color: "var(--error)",
      },
      IssuesEvent: {
        icon: "fa-solid fa-circle-dot",
        label: "issue",
        color: "var(--warning)",
      },
      PullRequestEvent: {
        icon: "fa-solid fa-code-pull-request",
        label: "PR",
        color: "var(--accent)",
      },
      WatchEvent: {
        icon: "fa-solid fa-star",
        label: "starred",
        color: "var(--primary-light)",
      },
      ForkEvent: {
        icon: "fa-solid fa-code-fork",
        label: "forked",
        color: "var(--secondary)",
      },
      IssueCommentEvent: {
        icon: "fa-solid fa-comment",
        label: "commented on",
        color: "var(--text-secondary)",
      },
      ReleaseEvent: {
        icon: "fa-solid fa-tag",
        label: "released",
        color: "var(--success)",
      },
    };
    document.getElementById("gh-events-area").innerHTML = `
            <h3 style="font-size:0.95rem;font-weight:600;margin-bottom:12px;"><i class="fa-solid fa-bolt" style="color:var(--primary-light);margin-right:6px;"></i>Recent Activity</h3>
            <div class="glass-card-static" style="padding:6px 18px;">
                ${events
                  .slice(0, 12)
                  .map((e) => {
                    const info = eventTypes[e.type] || {
                      icon: "fa-solid fa-circle",
                      label: e.type,
                      color: "var(--text-muted)",
                    };
                    return `<div class="activity-item"><div style="width:32px;height:32px;border-radius:50%;background:var(--glass);display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i class="${info.icon}" style="font-size:0.75rem;color:${info.color}"></i></div><div class="activity-info"><h4>${info.label} <span style="color:var(--primary-light)">${e.repo.name.split("/")[1]}</span></h4><p>${e.repo.name}</p><span class="activity-time">${Helpers.timeAgo(e.created_at)}</span></div></div>`;
                  })
                  .join("")}
            </div>`;
  },
};
