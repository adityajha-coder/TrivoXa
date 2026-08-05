const WorkspacePage = {
  activeFolder: "All",
  activeTag: "All",
  activeNoteId: null,
  searchQuery: "",
  isEditing: false,
  snippets: [],

  render() {
    Navbar.renderTopbar("My Workspace");
    const content = document.getElementById("page-content");

    content.innerHTML = `
            <div class="page-enter">
                <div class="page-header flex-between" style="align-items:center; flex-wrap:wrap; gap:16px; margin-bottom: 20px;">
                    <div>
                        <h1>My <span class="text-gradient">Workspace</span></h1>
                        <p>Organized workspace for project notes, code snippets, and bookmarks.</p>
                    </div>
                    <div class="flex-gap">
                        <button id="ws-create-folder-btn" class="btn btn-ghost" style="border:1px solid var(--border);"><i class="fa-solid fa-folder-plus"></i> New Folder</button>
                        <button id="ws-create-note-btn" class="btn btn-primary"><i class="fa-solid fa-plus"></i> New Note</button>
                    </div>
                </div>
                
                <!-- Quick New Folder Form (Hidden by default) -->
                <div id="ws-new-folder-container" class="glass-card mb-lg" style="display:none; animation: slideDown 0.3s ease;">
                    <h3 class="mb-sm"><i class="fa-solid fa-folder-plus text-primary"></i> Create Folder</h3>
                    <div style="display:flex; gap:10px;">
                        <input type="text" id="ws-new-folder-input" class="input-field" placeholder="Folder Name (e.g. Next.js App)">
                        <button id="ws-save-folder-btn" class="btn btn-primary">Create</button>
                        <button id="ws-cancel-folder-btn" class="btn btn-ghost">Cancel</button>
                    </div>
                </div>

                <!-- Main Workspace Layout -->
                <div class="ws-vault-container mb-lg" id="ws-app-container">
                    <div style="text-align:center; padding:60px 0; width:100%;">
                        <div class="spinner" style="margin:0 auto 16px; width:40px; height:40px; border:4px solid rgba(212,168,67,0.1); border-top-color:var(--primary); border-radius:50%; animation:spin 1s linear infinite;"></div>
                        <p class="text-muted">Loading workspace...</p>
                    </div>
                </div>
            </div>
        `;

    this.initDB().then(() => {
      this.loadSnippets().then(() => {
        this.renderWorkspaceLayout();
        this._applyAuthGate();
      });
    });

    if (!this._authBound) {
      window.addEventListener("auth_changed", () => {
        if (!API.getAuthToken()) {
          this.snippets = [];
        }
        this._applyAuthGate();
        if (document.getElementById("ws-app-container")) {
          this.loadSnippets()
            .catch((err) => {
              console.error("Workspace data load failed after auth change:", err);
            })
            .finally(() => {
              this.renderWorkspaceLayout();
            });
        }
      });
      this._authBound = true;
    }

    this.bindEvents();
  },

  _applyAuthGate() {
    const createFolderBtn = document.getElementById("ws-create-folder-btn");
    const createNoteBtn = document.getElementById("ws-create-note-btn");

    if (API.getAuthToken()) {
      if (createFolderBtn) createFolderBtn.disabled = false;
      if (createNoteBtn) createNoteBtn.disabled = false;
      return;
    }

    if (createFolderBtn) createFolderBtn.disabled = true;
    if (createNoteBtn) createNoteBtn.disabled = true;

    const newFolder = document.getElementById("ws-new-folder-container");
    if (newFolder) newFolder.style.display = "none";
  },

  renderWorkspaceLayout() {
    const container = document.getElementById("ws-app-container");
    if (!container) return;

    if (!API.getAuthToken()) {
      container.innerHTML = `
                <div class="empty-state" style="width:100%; padding: 60px 20px; text-align: center; display:flex; flex-direction:column; align-items:center; justify-content:center;">
                    <i class="fa-solid fa-lock" style="font-size:2.5rem; color:var(--primary-light); margin-bottom:16px;"></i>
                    <h3 style="margin-bottom:8px;">Sign In to Open Workspace</h3>
                    <p style="max-width:400px; margin:0 auto 20px;" class="text-muted">Create a free account to create folders, write markdown notes, and save code snippets.</p>
                    <button class="btn btn-primary" id="ws-gate-login" style="min-width:140px;">Sign In</button>
                </div>`;
      document.getElementById("ws-gate-login")?.addEventListener("click", () => API.requireAuth());
      return;
    }

    // Preserve search focus state
    const activeElem = document.activeElement;
    const isSearchFocused = activeElem && activeElem.id === "ws-search-input";
    const cursorPos = isSearchFocused ? activeElem.selectionStart : null;

    // Filter valid non-stub snippets
    let validSnippets = this.snippets.filter((s) => s.itemType !== "folder-stub");

    // Apply Search Filter
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      validSnippets = validSnippets.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.code.toLowerCase().includes(q) ||
          (s.folder && s.folder.toLowerCase().includes(q)) ||
          (s.tags && s.tags.toString().toLowerCase().includes(q)),
      );
    }

    // Apply Category/Tag Filter
    if (this.activeTag !== "All") {
      validSnippets = validSnippets.filter((s) => {
        const typeMatch = s.itemType === this.activeTag.toLowerCase();
        const tagMatch = Array.isArray(s.tags)
          ? s.tags.includes(this.activeTag.toLowerCase())
          : typeof s.tags === "string" && s.tags.toLowerCase().includes(this.activeTag.toLowerCase());
        return typeMatch || tagMatch;
      });
    }

    // Select active note
    let activeNote = validSnippets.find((s) => s.id === this.activeNoteId);
    if (!activeNote && validSnippets.length > 0) {
      activeNote = validSnippets[0];
      this.activeNoteId = activeNote.id;
    }

    // Build Folder Tree Map for matching notes
    const folders = {};
    validSnippets.forEach((s) => {
      const fName = s.folder || "Uncategorized";
      if (!folders[fName]) folders[fName] = [];
      folders[fName].push(s);
    });

    // Also include empty folder stubs if not searching
    if (!this.searchQuery && this.activeTag === "All") {
      this.snippets.forEach((s) => {
        const fName = s.folder || "Uncategorized";
        if (!folders[fName]) folders[fName] = [];
      });
    }

    const folderNames = Object.keys(folders).sort();

    // Icons map for note types
    const typeIcons = {
      text: "fa-file-lines",
      code: "fa-code",
      api: "fa-server",
      command: "fa-terminal",
      tool: "fa-wrench",
      blueprint: "fa-folder-tree",
    };

    // Render Clean Tag Bar HTML
    const tagList = ["All", "Text", "Code", "API", "Command", "Blueprint", "Tool"];
    const tagBarHtml = tagList
      .map(
        (t) =>
          `<button class="ws-tag-pill ${this.activeTag === t ? "active" : ""}" data-tag="${t}">#${t}</button>`,
      )
      .join("");

    // Render Folder Tree HTML
    this.collapsedFolders = this.collapsedFolders || {};
    let treeHtml = "";

    if (folderNames.length === 0) {
      treeHtml = `<span class="text-xs text-muted" style="padding:16px 12px; display:block; text-align:center;">No notes found</span>`;
    } else {
      folderNames.forEach((fName) => {
        const fNotes = folders[fName] || [];
        const isCollapsed = !!this.collapsedFolders[fName];

        treeHtml += `
              <div class="ws-folder-group">
                  <div class="ws-folder-header" data-folder="${Helpers.escapeHtml(fName)}" title="Click to ${isCollapsed ? "expand" : "collapse"} folder">
                      <div style="display:flex; align-items:center; gap:8px; min-width:0;">
                          <i class="fa-solid ${isCollapsed ? "fa-chevron-right" : "fa-chevron-down"}" style="font-size:0.75rem; color:var(--text-muted); width:10px; transition:transform 0.2s ease;"></i>
                          <i class="fa-solid ${isCollapsed ? "fa-folder" : "fa-folder-open"}" style="color:var(--primary-light); font-size:0.85rem;"></i>
                          <span style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${Helpers.escapeHtml(fName)}</span>
                      </div>
                      <div style="display:flex; align-items:center; gap:6px;">
                          <span class="tag tag-primary" style="font-size:0.68rem; padding:1px 6px;">${fNotes.length}</span>
                          <button class="btn btn-ghost btn-xs add-to-folder-btn" data-folder="${Helpers.escapeHtml(fName)}" title="Add note to ${Helpers.escapeHtml(fName)}"><i class="fa-solid fa-plus"></i></button>
                      </div>
                  </div>
                  <div class="ws-folder-items" style="display:${isCollapsed ? "none" : "flex"};">
                      ${
                        fNotes.length === 0
                          ? '<span class="text-xs text-muted" style="padding:4px 8px; font-style:italic;">No notes</span>'
                          : fNotes
                              .map((n) => {
                                const icon = typeIcons[n.itemType] || "fa-file-lines";
                                const isSelected = activeNote && activeNote.id === n.id;
                                return `
                                  <div class="ws-tree-item ${isSelected ? "active" : ""}" data-note-id="${n.id}">
                                      <div style="display:flex; align-items:center; gap:8px; min-width:0; flex:1;">
                                          <i class="fa-solid ${icon}" style="font-size:0.8rem; color:${isSelected ? "var(--primary-light)" : "var(--text-muted)"}; flex-shrink:0;"></i>
                                          <span class="item-title">${Helpers.escapeHtml(n.title)}</span>
                                      </div>
                                      ${n.isPinned ? '<i class="fa-solid fa-thumbtack" style="color:var(--primary-light); font-size:0.75rem; flex-shrink:0;" title="Pinned"></i>' : ""}
                                  </div>
                              `;
                              })
                              .join("")
                      }
                  </div>
              </div>`;
      });
    }

    // Render Right Panel (Note Editor / Preview)
    let mainContentHtml = "";

    if (!activeNote) {
      mainContentHtml = `
            <div style="flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:40px; text-align:center;">
                <i class="fa-solid fa-file-signature" style="font-size:3rem; color:var(--text-muted); opacity:0.4; margin-bottom:16px;"></i>
                <h3 style="margin-bottom:8px;">No note selected</h3>
                <p class="text-muted" style="max-width:360px; margin-bottom:20px;">Select a note from the left folder tree or click New Note to create one.</p>
                <button class="btn btn-primary" id="ws-empty-new-note"><i class="fa-solid fa-plus"></i> Create Note</button>
            </div>`;
    } else {
      const tagsArray = Array.isArray(activeNote.tags)
        ? activeNote.tags
        : typeof activeNote.tags === "string"
          ? activeNote.tags.split(",")
          : [];

      const tagsHtml = tagsArray
        .map(
          (t) =>
            `<span class="tag" style="font-size:0.7rem; background:rgba(255,255,255,0.06); border:1px solid var(--border); color:var(--text-muted);">#${Helpers.escapeHtml(t.trim())}</span>`,
        )
        .join("");

      mainContentHtml = `
            <!-- Header -->
            <div class="ws-main-header">
                <div class="ws-breadcrumbs">
                    <i class="fa-solid fa-folder text-primary"></i>
                    <span>${Helpers.escapeHtml(activeNote.folder || "Uncategorized")}</span>
                    <span>/</span>
                    <span class="active">${Helpers.escapeHtml(activeNote.title)}</span>
                </div>
                <div class="flex-gap" style="align-items:center;">
                    <div class="ws-mode-switcher">
                        <button class="ws-mode-btn ${!this.isEditing ? "active" : ""}" id="ws-mode-preview"><i class="fa-solid fa-eye"></i> Preview</button>
                        <button class="ws-mode-btn ${this.isEditing ? "active" : ""}" id="ws-mode-edit"><i class="fa-solid fa-pen-to-square"></i> Edit</button>
                    </div>
                    <div style="height:20px; width:1px; background:rgba(255,255,255,0.15); margin:0 4px;"></div>
                    <button class="btn btn-ghost btn-xs" id="ws-pin-btn" data-id="${activeNote.id}" title="${activeNote.isPinned ? "Unpin Note" : "Pin Note"}" style="color:${activeNote.isPinned ? "var(--primary-light)" : "var(--text-muted)"};">
                        <i class="fa-solid fa-thumbtack"></i> ${activeNote.isPinned ? "Pinned" : "Pin"}
                    </button>
                    <button class="btn btn-ghost btn-xs" id="ws-copy-btn" title="Copy Content"><i class="fa-regular fa-copy"></i> Copy</button>
                    <button class="btn btn-ghost btn-xs" id="ws-delete-btn" data-id="${activeNote.id}" style="color:var(--error);" title="Delete Note"><i class="fa-solid fa-trash"></i> Delete</button>
                </div>
            </div>

            <!-- Note Content Canvas -->
            <div class="ws-editor-container">
                <input type="text" id="ws-note-title" class="ws-note-title-input" value="${Helpers.escapeHtml(activeNote.title)}" placeholder="Note Title...">
                
                <div class="ws-note-meta">
                    <span class="tag tag-primary" style="text-transform:uppercase; font-size:0.7rem; font-weight:700;">${activeNote.itemType || "text"}</span>
                    ${tagsHtml}
                </div>

                <!-- Markdown Formatting Bar (in Edit mode) -->
                ${
                  this.isEditing
                    ? `
                <div style="display:flex; gap:6px; margin-bottom:10px; flex-wrap:wrap;">
                    <button class="btn btn-ghost btn-xs fmt-btn" data-fmt="h2" title="Heading"><b>H2</b></button>
                    <button class="btn btn-ghost btn-xs fmt-btn" data-fmt="bold" title="Bold"><b>B</b></button>
                    <button class="btn btn-ghost btn-xs fmt-btn" data-fmt="code" title="Code block"><i class="fa-solid fa-code"></i></button>
                    <button class="btn btn-ghost btn-xs fmt-btn" data-fmt="list" title="Bullet List"><i class="fa-solid fa-list-ul"></i></button>
                    <button class="btn btn-ghost btn-xs fmt-btn" data-fmt="check" title="Task List"><i class="fa-regular fa-square-check"></i></button>
                    <button class="btn btn-ghost btn-xs fmt-btn" data-fmt="link" title="Link"><i class="fa-solid fa-link"></i></button>
                </div>
                <textarea id="ws-note-editor" class="ws-editor-textarea" placeholder="Write markdown note here...">${Helpers.escapeHtml(activeNote.code || "")}</textarea>
                <div style="margin-top:12px; display:flex; justify-content:flex-end; gap:10px;">
                    <button class="btn btn-ghost" id="ws-cancel-note-btn"><i class="fa-solid fa-xmark"></i> Cancel</button>
                    <button class="btn btn-primary" id="ws-save-note-btn"><i class="fa-solid fa-floppy-disk"></i> Save Note</button>
                </div>
                `
                    : `
                <div class="ws-preview-box">${this._formatMarkdownPreview(activeNote.code || "")}</div>
                `
                }
            </div>`;
    }

    container.innerHTML = `
            <!-- Left Sidebar -->
            <div class="ws-sidebar">
                <div class="ws-sidebar-header">
                    <div class="flex-between mb-xs" style="align-items:center;">
                        <span class="ws-sidebar-title"><i class="fa-solid fa-folder-tree"></i> Notes Explorer</span>
                        <span class="text-xs text-muted" style="font-weight:600;">${validSnippets.length} notes</span>
                    </div>
                    <div class="search-container mb-xs" style="margin-top:8px;">
                        <i class="fa-solid fa-magnifying-glass search-icon" style="font-size:0.78rem;"></i>
                        <input type="text" id="ws-search-input" class="input-field" value="${Helpers.escapeHtml(this.searchQuery)}" placeholder="Search notes..." style="padding:6px 10px 6px 30px; font-size:0.8rem;">
                    </div>
                </div>

                <div class="ws-tag-bar" id="ws-tag-bar">
                    ${tagBarHtml}
                </div>

                <div class="ws-file-tree">
                    ${treeHtml}
                </div>
            </div>

            <!-- Right Main Panel -->
            <div class="ws-main-panel">
                ${mainContentHtml}
            </div>`;

    // Restore focus and cursor position on search input if it was active
    if (isSearchFocused) {
      const searchEl = document.getElementById("ws-search-input");
      if (searchEl) {
        searchEl.focus();
        if (cursorPos !== null) {
          searchEl.setSelectionRange(cursorPos, cursorPos);
        }
      }
    }
  },

  _formatMarkdownPreview(text) {
    if (!text) return '<span class="text-muted" style="font-style:italic;">Empty note. Click "Edit" to add content.</span>';
    let html = Helpers.escapeHtml(text);

    // Code blocks ```
    html = html.replace(/```([\s\S]*?)```/g, (match, p1) => {
      return `<div style="background:#0a0a0f; padding:12px; border-radius:var(--radius-sm); border:1px solid var(--border); font-family:var(--font-mono); font-size:0.85rem; color:#e2e8f0; margin:10px 0; overflow-x:auto;"><pre style="margin:0;">${p1.trim()}</pre></div>`;
    });

    // Inline code `
    html = html.replace(/`([^`]+)`/g, '<code style="background:rgba(255,255,255,0.1); padding:2px 6px; border-radius:4px; font-family:var(--font-mono); font-size:0.85rem;">$1</code>');

    // Headings
    html = html.replace(/^### (.*$)/gim, '<h3 style="font-size:1.1rem; font-weight:700; color:var(--primary-light); margin:14px 0 6px;">$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2 style="font-size:1.25rem; font-weight:700; color:var(--text); margin:16px 0 8px;">$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1 style="font-size:1.4rem; font-weight:800; color:var(--text); margin:18px 0 10px;">$1</h1>');

    // Checkboxes
    html = html.replace(/- \[ \] (.*$)/gim, '<div style="display:flex; align-items:center; gap:8px; margin:4px 0;"><i class="fa-regular fa-square" style="color:var(--text-muted);"></i> <span>$1</span></div>');
    html = html.replace(/- \[x\] (.*$)/gim, '<div style="display:flex; align-items:center; gap:8px; margin:4px 0;"><i class="fa-solid fa-square-check" style="color:var(--success);"></i> <span style="text-decoration:line-through; opacity:0.7;">$1</span></div>');

    // Bullet lists
    html = html.replace(/^- (.*$)/gim, '<li style="margin-left:18px;">$1</li>');

    // URLs
    html = html.replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" style="color:var(--primary-light); text-decoration:underline;">$1</a>');

    return html;
  },

  async createNewNote(folderName = "Uncategorized") {
    if (!API.requireAuth()) return;
    const defaultTitle = "Untitled Note";
    const defaultCode = "# Untitled Note\n\nStart typing your note here...";
    await this.saveSnippet(defaultTitle, defaultCode, "text", folderName, [], "text");
    this.isEditing = true;
    this.renderWorkspaceLayout();
    setTimeout(() => {
      const textarea = document.getElementById("ws-note-editor");
      if (textarea) {
        textarea.focus();
        textarea.setSelectionRange(textarea.value.length, textarea.value.length);
      }
    }, 100);
    Toast.show("New note created!", "success");
  },

  async saveSnippet(title, code, lang, folder = "Uncategorized", tags = [], itemType = "text") {
    await this.initDB();
    let newSnip = {
      id: Date.now().toString(),
      title,
      code,
      lang: lang || "text",
      folder,
      tags,
      itemType,
      isPinned: false,
    };

    if (API.getAuthToken()) {
      try {
        const saved = await API.fetchAPI("/api/snippets", "POST", {
          title,
          code,
          lang: lang || "text",
          folder,
          tags,
          itemType,
        });
        newSnip.id = saved._id;
      } catch (e) {
        console.error("Failed to sync snippet to cloud:", e);
      }
    }

    this.snippets.push(newSnip);
    await this.saveToIndexedDB(newSnip);
    this.activeNoteId = newSnip.id;
    if (document.getElementById("ws-app-container")) {
      this.renderWorkspaceLayout();
    }
  },

  bindEvents() {
    const pageContent = document.getElementById("page-content");
    if (!pageContent) return;

    // Create Folder Toggle
    document.getElementById("ws-create-folder-btn")?.addEventListener("click", () => {
      const container = document.getElementById("ws-new-folder-container");
      if (container) {
        container.style.display = container.style.display === "none" ? "block" : "none";
        document.getElementById("ws-new-folder-input")?.focus();
      }
    });

    // Create Instant Note Button
    document.getElementById("ws-create-note-btn")?.addEventListener("click", () => {
      this.createNewNote("Uncategorized");
    });

    document.getElementById("ws-cancel-folder-btn")?.addEventListener("click", () => {
      document.getElementById("ws-new-folder-container").style.display = "none";
    });

    document.getElementById("ws-save-folder-btn")?.addEventListener("click", () => {
      const folderName = document.getElementById("ws-new-folder-input").value.trim();
      if (!folderName) return Toast.show("Folder name cannot be empty", "warning");

      this.saveSnippet(`Folder created: ${folderName}`, "", "text", folderName, [], "folder-stub");
      document.getElementById("ws-new-folder-input").value = "";
      document.getElementById("ws-new-folder-container").style.display = "none";
      Toast.show(`Folder "${folderName}" created`, "success");
    });

    // Clean single event listener binding on pageContent
    if (this._clickHandler) {
      pageContent.removeEventListener("click", this._clickHandler);
    }

    this._clickHandler = async (e) => {
      // Tree Item Select
      const treeItem = e.target.closest(".ws-tree-item");
      if (treeItem) {
        this.activeNoteId = treeItem.dataset.noteId;
        this.isEditing = false;
        this.renderWorkspaceLayout();
        return;
      }

      // Tag Filter Select
      const tagPill = e.target.closest(".ws-tag-pill");
      if (tagPill) {
        this.activeTag = tagPill.dataset.tag;
        this.renderWorkspaceLayout();
        return;
      }

      // Add to folder btn - create note in folder
      const addFolderBtn = e.target.closest(".add-to-folder-btn");
      if (addFolderBtn) {
        e.stopPropagation();
        const folder = addFolderBtn.dataset.folder;
        this.createNewNote(folder);
        return;
      }

      // Folder Collapse / Expand Toggle
      const folderHeader = e.target.closest(".ws-folder-header");
      if (folderHeader) {
        const fName = folderHeader.dataset.folder;
        this.collapsedFolders = this.collapsedFolders || {};
        this.collapsedFolders[fName] = !this.collapsedFolders[fName];
        this.renderWorkspaceLayout();
        return;
      }

      // Segmented mode switcher
      if (e.target.closest("#ws-mode-preview")) {
        this.isEditing = false;
        this.renderWorkspaceLayout();
        return;
      }
      if (e.target.closest("#ws-mode-edit")) {
        this.isEditing = true;
        this.renderWorkspaceLayout();
        return;
      }

      // Cancel Note edit
      if (e.target.closest("#ws-cancel-note-btn")) {
        this.isEditing = false;
        this.renderWorkspaceLayout();
        Toast.show("Editing cancelled", "info");
        return;
      }

      // Save Note changes
      if (e.target.closest("#ws-save-note-btn")) {
        const titleVal = document.getElementById("ws-note-title")?.value.trim();
        const editorVal = document.getElementById("ws-note-editor")?.value.trim();
        const note = this.snippets.find((s) => s.id === this.activeNoteId);

        if (note && editorVal) {
          note.title = titleVal || note.title;
          note.code = editorVal;
          await this.saveToIndexedDB(note);

          if (API.getAuthToken()) {
            try {
              await API.fetchAPI(`/api/snippets/${note.id}`, "PUT", {
                title: note.title,
                code: note.code,
                lang: note.lang,
                folder: note.folder,
                tags: note.tags,
                itemType: note.itemType,
              });
            } catch (err) {
              console.error("Cloud update failed:", err);
            }
          }
          this.isEditing = false;
          this.renderWorkspaceLayout();
          Toast.show("Note saved", "success");
        }
        return;
      }

      // Pin Note
      if (e.target.closest("#ws-pin-btn")) {
        if (!API.requireAuth()) return;
        const id = e.target.closest("#ws-pin-btn").dataset.id;
        const note = this.snippets.find((s) => s.id === id);
        if (note) {
          note.isPinned = !note.isPinned;
          await this.saveToIndexedDB(note);
          if (API.getAuthToken()) {
            try {
              await API.fetchAPI(`/api/snippets/${id}/pin`, "PATCH");
            } catch (err) {}
          }
          this.renderWorkspaceLayout();
          Toast.show(note.isPinned ? "Note pinned" : "Note unpinned", "info");
        }
        return;
      }

      // Copy Note
      if (e.target.closest("#ws-copy-btn")) {
        const note = this.snippets.find((s) => s.id === this.activeNoteId);
        if (note) {
          Helpers.copyToClipboard(note.code);
          Toast.show("Note copied to clipboard!", "success");
        }
        return;
      }

      // Delete Note
      if (e.target.closest("#ws-delete-btn")) {
        if (!API.requireAuth()) return;
        const id = e.target.closest("#ws-delete-btn").dataset.id;
        if (!confirm("Are you sure you want to delete this note?")) return;

        this.snippets = this.snippets.filter((s) => s.id !== id);
        await this.deleteFromIndexedDB(id);

        if (API.getAuthToken()) {
          try {
            await API.fetchAPI(`/api/snippets/${id}`, "DELETE");
          } catch (err) {}
        }
        this.activeNoteId = null;
        this.renderWorkspaceLayout();
        Toast.show("Note deleted", "success");
        return;
      }

      // Empty state create note
      if (e.target.closest("#ws-empty-new-note")) {
        this.createNewNote("Uncategorized");
        return;
      }

      // Formatting Toolbar Buttons
      const fmtBtn = e.target.closest(".fmt-btn");
      if (fmtBtn) {
        const textarea = document.getElementById("ws-note-editor");
        if (!textarea) return;
        const fmt = fmtBtn.dataset.fmt;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value;
        let inserted = "";

        if (fmt === "h2") inserted = "## ";
        else if (fmt === "bold") inserted = "**bold text**";
        else if (fmt === "code") inserted = "```js\n// code here\n```";
        else if (fmt === "list") inserted = "- ";
        else if (fmt === "check") inserted = "- [ ] ";
        else if (fmt === "link") inserted = "[link text](https://example.com)";

        textarea.value = text.substring(0, start) + inserted + text.substring(end);
        textarea.focus();
        return;
      }
    };

    pageContent.addEventListener("click", this._clickHandler);

    // Live Search Handler
    pageContent.addEventListener("input", (e) => {
      if (e.target.id === "ws-search-input") {
        this.searchQuery = e.target.value;
        this.renderWorkspaceLayout();
      }
    });
  },
};

Object.assign(WorkspacePage, WorkspaceDB);
