const WorkspacePage = {
  activeFolder: "All",
  activeNoteId: null,
  searchQuery: "",
  isEditing: true,
  isCreatingFolder: false,
  isSidebarCollapsed: localStorage.getItem("ws_sidebar_collapsed") === "true" || (window.innerWidth <= 768 && localStorage.getItem("ws_sidebar_collapsed") !== "false"),
  collapsedFolders: {},
  saveTimer: null,
  snippets: [],

  render() {
    Navbar.renderTopbar("My Workspace");
    const content = document.getElementById("page-content");

    content.innerHTML = `
      <div class="page-enter ws-page-wrapper">
        <div class="ws-page-header">
          <div>
            <h1 class="ws-title">My <span class="text-gradient">Workspace</span></h1>
            <p class="ws-subtitle">Clean, distraction-free notes, snippets, and project ideas.</p>
          </div>
          <div class="ws-header-actions">
            <button id="ws-header-folder-btn" class="btn btn-ghost btn-sm" title="Create a new folder"><i class="fa-solid fa-folder-plus"></i> New Folder</button>
            <button id="ws-header-note-btn" class="btn btn-primary btn-sm" title="Create a new note"><i class="fa-solid fa-plus"></i> New Note</button>
          </div>
        </div>

        <!-- Main Workspace App Container -->
        <div class="ws-vault-container ${this.isSidebarCollapsed ? "sidebar-collapsed" : ""}" id="ws-app-container">
          <div class="ws-loading-state">
            <div class="spinner" style="margin:0 auto 16px; width:36px; height:36px; border:3px solid rgba(212,168,67,0.15); border-top-color:var(--primary); border-radius:50%; animation:spin 1s linear infinite;"></div>
            <p class="text-muted text-sm">Loading workspace...</p>
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
    const createFolderBtn = document.getElementById("ws-header-folder-btn");
    const createNoteBtn = document.getElementById("ws-header-note-btn");

    if (API.getAuthToken()) {
      if (createFolderBtn) createFolderBtn.disabled = false;
      if (createNoteBtn) createNoteBtn.disabled = false;
      return;
    }

    if (createFolderBtn) createFolderBtn.disabled = true;
    if (createNoteBtn) createNoteBtn.disabled = true;
  },

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
    localStorage.setItem("ws_sidebar_collapsed", this.isSidebarCollapsed ? "true" : "false");
    const container = document.getElementById("ws-app-container");
    if (container) {
      container.classList.toggle("sidebar-collapsed", this.isSidebarCollapsed);
    }
    const toggleBtns = document.querySelectorAll("#ws-toggle-sidebar-btn");
    toggleBtns.forEach((btn) => {
      btn.title = this.isSidebarCollapsed ? "Show Sidebar" : "Hide Sidebar";
      btn.classList.toggle("is-active", this.isSidebarCollapsed);
    });
  },

  renderWorkspaceLayout() {
    const container = document.getElementById("ws-app-container");
    if (!container) return;

    if (!API.getAuthToken()) {
      container.innerHTML = `
        <div class="ws-auth-gate">
          <div class="ws-auth-gate-card">
            <div class="ws-auth-icon-wrap">
              <i class="fa-solid fa-lock"></i>
            </div>
            <h3>Sign in to Access Workspace</h3>
            <p class="text-muted">Create notes, organize folders, and sync code snippets across all your devices.</p>
            <button class="btn btn-primary" id="ws-gate-login"><i class="fa-solid fa-arrow-right-to-bracket"></i> Sign In</button>
          </div>
        </div>`;
      document.getElementById("ws-gate-login")?.addEventListener("click", () => API.requireAuth());
      return;
    }

    // Ensure sidebar collapse class is in sync
    container.classList.toggle("sidebar-collapsed", this.isSidebarCollapsed);

    // Preserve search focus state
    const activeElem = document.activeElement;
    const isSearchFocused = activeElem && activeElem.id === "ws-search-input";
    const searchCursor = isSearchFocused ? activeElem.selectionStart : null;

    // Filter valid non-stub snippets
    let validSnippets = this.snippets.filter((s) => s.itemType !== "folder-stub");

    // Apply Live Search Filter across title, code, folder, and tags
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      validSnippets = validSnippets.filter((s) => {
        const titleMatch = (s.title || "").toLowerCase().includes(q);
        const codeMatch = (s.code || "").toLowerCase().includes(q);
        const folderMatch = (s.folder || "").toLowerCase().includes(q);
        const tagsMatch = Array.isArray(s.tags)
          ? s.tags.some((t) => t.toLowerCase().includes(q))
          : (s.tags || "").toString().toLowerCase().includes(q);
        return titleMatch || codeMatch || folderMatch || tagsMatch;
      });
    }

    // Find all distinct folders
    const allFoldersSet = new Set(["Uncategorized"]);
    this.snippets.forEach((s) => {
      if (s.folder && s.folder.trim()) allFoldersSet.add(s.folder.trim());
    });
    const allFolderNames = Array.from(allFoldersSet).sort();

    // Select active note
    let activeNote = validSnippets.find((s) => s.id === this.activeNoteId);
    if (!activeNote && validSnippets.length > 0) {
      activeNote = validSnippets[0];
      this.activeNoteId = activeNote.id;
    } else if (validSnippets.length === 0) {
      activeNote = null;
    }

    // Build Folder Map for matching notes
    const folderNotesMap = {};
    allFolderNames.forEach((f) => {
      folderNotesMap[f] = [];
    });

    validSnippets.forEach((s) => {
      const fName = s.folder || "Uncategorized";
      if (!folderNotesMap[fName]) folderNotesMap[fName] = [];
      folderNotesMap[fName].push(s);
    });

    // Icons map for note types
    const typeIcons = {
      text: "fa-file-lines",
      code: "fa-code",
      api: "fa-server",
      command: "fa-terminal",
      tool: "fa-wrench",
      blueprint: "fa-cubes",
    };

    // Render Folder Tree
    let treeHtml = "";
    const visibleFolders = this.searchQuery
      ? allFolderNames.filter((f) => (folderNotesMap[f] || []).length > 0)
      : allFolderNames;

    if (visibleFolders.length === 0 && validSnippets.length === 0) {
      treeHtml = `
        <div class="ws-empty-tree">
          <i class="fa-regular fa-folder-open"></i>
          <p>${this.searchQuery ? "No matching notes found" : "No notes yet"}</p>
        </div>`;
    } else {
      visibleFolders.forEach((fName) => {
        const fNotes = folderNotesMap[fName] || [];
        const isCollapsed = !!this.collapsedFolders[fName];

        treeHtml += `
          <div class="ws-folder-group ${isCollapsed ? "is-collapsed" : ""}">
            <div class="ws-folder-header" data-folder="${Helpers.escapeHtml(fName)}">
              <div class="ws-folder-left">
                <i class="fa-solid fa-chevron-right ws-folder-arrow"></i>
                <i class="fa-solid ${isCollapsed ? "fa-folder" : "fa-folder-open"} ws-folder-icon"></i>
                <span class="ws-folder-name" title="${Helpers.escapeHtml(fName)}">${Helpers.escapeHtml(fName)}</span>
              </div>
              <div class="ws-folder-right">
                <span class="ws-count-badge">${fNotes.length}</span>
                <button class="ws-icon-btn add-to-folder-btn" data-folder="${Helpers.escapeHtml(fName)}" title="Add note to ${Helpers.escapeHtml(fName)}"><i class="fa-solid fa-plus"></i></button>
              </div>
            </div>
            <div class="ws-folder-items" style="${isCollapsed ? "display:none;" : ""}">
              ${
                fNotes.length === 0
                  ? '<span class="ws-empty-folder-hint">No notes</span>'
                  : fNotes
                      .map((n) => {
                        const icon = typeIcons[n.itemType] || "fa-file-lines";
                        const isSelected = activeNote && activeNote.id === n.id;
                        return `
                          <div class="ws-tree-item ${isSelected ? "active" : ""}" data-note-id="${n.id}">
                            <i class="fa-solid ${icon} ws-item-icon"></i>
                            <span class="ws-item-title">${Helpers.escapeHtml(n.title || "Untitled")}</span>
                            ${n.isPinned ? '<i class="fa-solid fa-thumbtack ws-item-pin" title="Pinned"></i>' : ""}
                          </div>
                        `;
                      })
                      .join("")
              }
            </div>
          </div>`;
      });
    }

    // Render Right Main Panel (Editor / Preview)
    let mainContentHtml = "";

    if (!activeNote) {
      mainContentHtml = `
        <div class="ws-main-header">
          <div class="ws-header-left">
            <button class="ws-action-btn ${this.isSidebarCollapsed ? "is-active" : ""}" id="ws-toggle-sidebar-btn" title="${this.isSidebarCollapsed ? "Show Sidebar" : "Hide Sidebar"}">
              <i class="fa-solid fa-bars"></i>
            </button>
            <span class="text-xs text-muted" style="font-weight:600;">Workspace</span>
          </div>
        </div>
        <div class="ws-empty-note-view">
          <div class="ws-empty-illustration">
            <i class="fa-regular fa-note-sticky"></i>
          </div>
          <h3>Select or Create a Note</h3>
          <p class="text-muted">Choose a note from the left sidebar or create a new one to start writing.</p>
          <button class="btn btn-primary" id="ws-empty-new-note"><i class="fa-solid fa-plus"></i> Create Note</button>
        </div>`;
    } else {
      // Build folder options
      const folderOptionsHtml = allFolderNames
        .map(
          (f) =>
            `<option value="${Helpers.escapeHtml(f)}" ${activeNote.folder === f ? "selected" : ""}>${Helpers.escapeHtml(f)}</option>`,
        )
        .join("");

      mainContentHtml = `
        <!-- Minimal Top Toolbar -->
        <div class="ws-main-header">
          <div class="ws-header-left">
            <!-- Sidebar Toggle Button -->
            <button class="ws-action-btn ${this.isSidebarCollapsed ? "is-active" : ""}" id="ws-toggle-sidebar-btn" title="${this.isSidebarCollapsed ? "Show Sidebar" : "Hide Sidebar"}">
              <i class="fa-solid fa-bars"></i>
            </button>

            <div class="ws-folder-badge" title="Move note to another folder">
              <i class="fa-solid fa-folder text-primary"></i>
              <select id="ws-note-folder-select" class="ws-folder-select">
                ${folderOptionsHtml}
              </select>
            </div>
            <span id="ws-save-indicator" class="ws-save-indicator" title="Auto-saves automatically"><i class="fa-solid fa-check"></i> Saved</span>
          </div>

          <div class="ws-header-right">
            <!-- Mode Switcher Toggle -->
            <button class="ws-btn-pill ${!this.isEditing ? "active" : ""}" id="ws-toggle-preview" title="Toggle Preview / Edit">
              <i class="fa-solid ${this.isEditing ? "fa-eye" : "fa-pen-to-square"}"></i>
              <span>${this.isEditing ? "Preview" : "Edit"}</span>
            </button>

            <div class="ws-header-divider"></div>

            <button class="ws-action-btn ${activeNote.isPinned ? "is-pinned" : ""}" id="ws-pin-btn" data-id="${activeNote.id}" title="${activeNote.isPinned ? "Unpin Note" : "Pin Note"}">
              <i class="fa-solid fa-thumbtack"></i>
            </button>
            <button class="ws-action-btn" id="ws-copy-btn" title="Copy Markdown Content">
              <i class="fa-regular fa-copy"></i>
            </button>
            <button class="ws-action-btn ws-btn-danger" id="ws-delete-btn" data-id="${activeNote.id}" title="Delete Note">
              <i class="fa-regular fa-trash-can"></i>
            </button>
          </div>
        </div>

        <!-- Note Canvas -->
        <div class="ws-editor-container">
          <!-- Frameless Note Title Input -->
          <input type="text" id="ws-note-title" class="ws-title-input" value="${Helpers.escapeHtml(activeNote.title || "")}" placeholder="Untitled Note" spellcheck="false" autocomplete="off">

          <!-- Formatting Bar (Edit Mode) -->
          ${
            this.isEditing
              ? `
            <div class="ws-fmt-toolbar">
              <button class="ws-fmt-btn" data-fmt="h1" title="Heading 1"><span class="fmt-label">H1</span></button>
              <button class="ws-fmt-btn" data-fmt="h2" title="Heading 2"><span class="fmt-label">H2</span></button>
              <button class="ws-fmt-btn" data-fmt="bold" title="Bold text"><i class="fa-solid fa-bold"></i></button>
              <button class="ws-fmt-btn" data-fmt="italic" title="Italic text"><i class="fa-solid fa-italic"></i></button>
              <button class="ws-fmt-btn" data-fmt="code" title="Code Block"><i class="fa-solid fa-code"></i></button>
              <button class="ws-fmt-btn" data-fmt="list" title="Bullet List"><i class="fa-solid fa-list-ul"></i></button>
              <button class="ws-fmt-btn" data-fmt="check" title="Task Checklist"><i class="fa-regular fa-square-check"></i></button>
              <button class="ws-fmt-btn" data-fmt="link" title="Insert Link"><i class="fa-solid fa-link"></i></button>
            </div>
            <textarea id="ws-note-editor" class="ws-editor-textarea" placeholder="Start typing your note... Markdown is fully supported.">${Helpers.escapeHtml(activeNote.code || "")}</textarea>
            `
              : `
            <div class="ws-markdown-preview" id="ws-markdown-preview">
              ${this._formatMarkdownPreview(activeNote.code || "")}
            </div>
            `
          }
        </div>
      `;
    }

    container.innerHTML = `
      <!-- Mobile Backdrop Overlay -->
      <div class="ws-sidebar-backdrop" id="ws-sidebar-backdrop"></div>

      <!-- Left Sidebar -->
      <div class="ws-sidebar">
        <!-- Sidebar Top Header -->
        <div class="ws-sidebar-header">
          <div class="ws-sidebar-title-row">
            <span class="ws-sidebar-title">
              <i class="fa-solid fa-layer-group text-primary"></i> Notes
              <span class="ws-total-badge">${validSnippets.length}</span>
            </span>
            <div class="ws-sidebar-actions">
              <button id="ws-sidebar-new-folder-btn" class="ws-icon-btn" title="Create Folder"><i class="fa-solid fa-folder-plus"></i></button>
              <button id="ws-sidebar-new-note-btn" class="ws-icon-btn ws-btn-accent" title="Create Note"><i class="fa-solid fa-plus"></i></button>
              <button id="ws-hide-sidebar-btn" class="ws-icon-btn" title="Hide Sidebar"><i class="fa-solid fa-chevron-left"></i></button>
            </div>
          </div>

          <!-- Inline Folder Creation Box -->
          <div id="ws-inline-folder-form" class="ws-inline-folder-form" style="display:${this.isCreatingFolder ? "flex" : "none"};">
            <input type="text" id="ws-inline-folder-input" class="ws-inline-input" placeholder="New folder name...">
            <button id="ws-save-inline-folder" class="btn btn-primary btn-xs">Add</button>
            <button id="ws-cancel-inline-folder" class="btn btn-ghost btn-xs"><i class="fa-solid fa-xmark"></i></button>
          </div>

          <!-- Search Input -->
          <div class="ws-search-wrap">
            <i class="fa-solid fa-magnifying-glass ws-search-icon"></i>
            <input type="text" id="ws-search-input" class="ws-search-input" value="${Helpers.escapeHtml(this.searchQuery)}" placeholder="Search notes...">
            ${
              this.searchQuery
                ? `<button id="ws-clear-search-btn" class="ws-search-clear" title="Clear search"><i class="fa-solid fa-xmark"></i></button>`
                : ""
            }
          </div>
        </div>

        <!-- File Tree -->
        <div class="ws-file-tree" id="ws-file-tree">
          ${treeHtml}
        </div>
      </div>

      <!-- Right Main Panel -->
      <div class="ws-main-panel">
        ${mainContentHtml}
      </div>
    `;

    // Restore search focus & cursor if active
    if (isSearchFocused) {
      const searchEl = document.getElementById("ws-search-input");
      if (searchEl) {
        searchEl.focus();
        if (searchCursor !== null) {
          searchEl.setSelectionRange(searchCursor, searchCursor);
        }
      }
    }

    if (this.isCreatingFolder) {
      setTimeout(() => {
        document.getElementById("ws-inline-folder-input")?.focus();
      }, 50);
    }
  },

  _formatMarkdownPreview(text) {
    if (!text || !text.trim()) {
      return '<div class="ws-empty-preview"><i class="fa-solid fa-pen-nib"></i><p>This note is empty. Click <b>Edit</b> to start writing.</p></div>';
    }

    let html = Helpers.escapeHtml(text);

    // Code blocks ```lang ... ```
    html = html.replace(/```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g, (match, lang, code) => {
      const cleanCode = code.replace(/^\n+|\n+$/g, "");
      const langLabel = lang || "code";
      return `
        <div class="ws-preview-codeblock">
          <div class="ws-codeblock-header">
            <span class="ws-codeblock-lang">${langLabel}</span>
            <button class="ws-code-copy-btn" onclick="navigator.clipboard.writeText(decodeURIComponent('${encodeURIComponent(cleanCode)}')); Toast.show('Code copied!', 'success');" title="Copy code"><i class="fa-regular fa-copy"></i> Copy</button>
          </div>
          <pre><code>${cleanCode}</code></pre>
        </div>`;
    });

    // Inline code `code`
    html = html.replace(/`([^`]+)`/g, '<code class="ws-inline-code">$1</code>');

    // Headings #, ##, ###
    html = html.replace(/^### (.*$)/gim, '<h3 class="ws-h3">$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2 class="ws-h2">$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1 class="ws-h1">$1</h1>');

    // Interactive Checkboxes
    let checkIdx = 0;
    html = html.replace(/^- \[ \]\s+(.*$)/gim, () => {
      const idx = checkIdx++;
      return `<div class="ws-task-row" data-task-idx="${idx}"><i class="fa-regular fa-square ws-task-check" data-status="unchecked" data-idx="${idx}"></i> <span>$1</span></div>`;
    });
    html = html.replace(/^- \[x\]\s+(.*$)/gim, () => {
      const idx = checkIdx++;
      return `<div class="ws-task-row is-done" data-task-idx="${idx}"><i class="fa-solid fa-square-check ws-task-check" data-status="checked" data-idx="${idx}"></i> <span class="ws-task-done">$1</span></div>`;
    });

    // Bullet lists - item
    html = html.replace(/^- (.*$)/gim, '<li class="ws-bullet-item">$1</li>');

    // Bold **text**
    html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");

    // Italic *text*
    html = html.replace(/\*([^*]+)\*/g, "<em>$1</em>");

    // Links [text](url) or naked URLs
    html = html.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="ws-link">$1 <i class="fa-solid fa-arrow-up-right-from-square ws-link-icon"></i></a>');
    html = html.replace(/(^|[^">])(https?:\/\/[^\s<]+)/g, '$1<a href="$2" target="_blank" rel="noopener noreferrer" class="ws-link">$2 <i class="fa-solid fa-arrow-up-right-from-square ws-link-icon"></i></a>');

    return html;
  },

  async createNewNote(folderName = "Uncategorized") {
    if (!API.requireAuth()) return;
    const defaultTitle = "Untitled Note";
    const defaultCode = "# Untitled Note\n\nStart typing your note here...";

    await this.saveSnippet(defaultTitle, defaultCode, "text", folderName, [], "text");
    this.isEditing = true;

    // On mobile, close the drawer so user sees the note canvas immediately
    if (window.innerWidth <= 768) {
      this.isSidebarCollapsed = true;
      localStorage.setItem("ws_sidebar_collapsed", "true");
    }

    this.renderWorkspaceLayout();

    setTimeout(() => {
      const textarea = document.getElementById("ws-note-editor");
      if (textarea) {
        textarea.focus();
        textarea.setSelectionRange(textarea.value.length, textarea.value.length);
      }
    }, 80);

    Toast.show("New note created", "success");
  },

  async saveSnippet(title, code, lang, folder = "Uncategorized", tags = [], itemType = "text") {
    await this.initDB();
    let newSnip = {
      id: Date.now().toString(),
      title: title || "Untitled Note",
      code: code || "",
      lang: lang || "text",
      folder: folder || "Uncategorized",
      tags: tags || [],
      itemType: itemType || "text",
      isPinned: false,
    };

    if (API.getAuthToken()) {
      try {
        const saved = await API.fetchAPI("/api/snippets", "POST", {
          title: newSnip.title,
          code: newSnip.code,
          lang: newSnip.lang,
          folder: newSnip.folder,
          tags: newSnip.tags,
          itemType: newSnip.itemType,
        });
        if (saved && saved._id) {
          newSnip.id = saved._id;
        }
      } catch (e) {
        console.error("Failed to sync snippet to cloud:", e);
      }
    }

    this.snippets.unshift(newSnip);
    await this.saveToIndexedDB(newSnip);
    this.activeNoteId = newSnip.id;
    if (document.getElementById("ws-app-container")) {
      this.renderWorkspaceLayout();
    }
  },

  scheduleAutoSave() {
    const indicator = document.getElementById("ws-save-indicator");
    if (indicator) {
      indicator.innerHTML = '<i class="fa-solid fa-arrows-rotate fa-spin text-primary"></i> Saving...';
    }

    clearTimeout(this.saveTimer);
    this.saveTimer = setTimeout(async () => {
      await this.saveActiveNoteChanges();
      const updatedIndicator = document.getElementById("ws-save-indicator");
      if (updatedIndicator) {
        updatedIndicator.innerHTML = '<i class="fa-solid fa-check text-success"></i> Saved';
      }
    }, 450);
  },

  async saveActiveNoteChanges() {
    if (!this.activeNoteId) return;
    const note = this.snippets.find((s) => s.id === this.activeNoteId);
    if (!note) return;

    const titleInput = document.getElementById("ws-note-title");
    const editorTextarea = document.getElementById("ws-note-editor");
    const folderSelect = document.getElementById("ws-note-folder-select");

    const newTitle = titleInput ? titleInput.value.trim() || "Untitled Note" : note.title;
    const newCode = editorTextarea ? editorTextarea.value : note.code;
    const newFolder = folderSelect ? folderSelect.value : note.folder;

    note.title = newTitle;
    note.code = newCode;
    note.folder = newFolder;

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
        console.error("Cloud note save failed:", err);
      }
    }

    // Update the sidebar note item text dynamically without re-rendering the whole tree
    const sidebarItem = document.querySelector(`.ws-tree-item[data-note-id="${note.id}"] .ws-item-title`);
    if (sidebarItem) {
      sidebarItem.textContent = note.title;
    }
  },

  bindEvents() {
    const pageContent = document.getElementById("page-content");
    if (!pageContent) return;

    if (this._clickHandler) {
      pageContent.removeEventListener("click", this._clickHandler);
    }

    this._clickHandler = async (e) => {
      // 0. Backdrop click on mobile -> close sidebar
      if (e.target.closest("#ws-sidebar-backdrop")) {
        this.toggleSidebar();
        return;
      }

      // 0.1 Toggle Sidebar
      if (e.target.closest("#ws-toggle-sidebar-btn") || e.target.closest("#ws-hide-sidebar-btn")) {
        this.toggleSidebar();
        return;
      }

      // 1. Select Note Item in Sidebar Tree
      const treeItem = e.target.closest(".ws-tree-item");
      if (treeItem) {
        const noteId = treeItem.dataset.noteId;
        if (this.activeNoteId !== noteId) {
          await this.saveActiveNoteChanges();
          this.activeNoteId = noteId;

          // On mobile, automatically close the sidebar drawer when picking a note
          if (window.innerWidth <= 768) {
            this.isSidebarCollapsed = true;
            localStorage.setItem("ws_sidebar_collapsed", "true");
          }

          this.renderWorkspaceLayout();
        } else if (window.innerWidth <= 768 && !this.isSidebarCollapsed) {
          this.toggleSidebar();
        }
        return;
      }

      // 2. Folder Collapse/Expand
      const folderHeader = e.target.closest(".ws-folder-header");
      const addFolderBtn = e.target.closest(".add-to-folder-btn");

      if (addFolderBtn) {
        e.stopPropagation();
        const fName = addFolderBtn.dataset.folder;
        this.createNewNote(fName);
        return;
      }

      if (folderHeader) {
        const fName = folderHeader.dataset.folder;
        this.collapsedFolders[fName] = !this.collapsedFolders[fName];
        const group = folderHeader.closest(".ws-folder-group");
        const items = group?.querySelector(".ws-folder-items");
        const icon = folderHeader.querySelector(".ws-folder-icon");
        if (group && items) {
          const isCollapsed = this.collapsedFolders[fName];
          group.classList.toggle("is-collapsed", isCollapsed);
          items.style.display = isCollapsed ? "none" : "";
          if (icon) {
            icon.className = `fa-solid ${isCollapsed ? "fa-folder" : "fa-folder-open"} ws-folder-icon`;
          }
        }
        return;
      }

      // 3. New Note Trigger (Page Header / Sidebar Button / Empty State)
      if (e.target.closest("#ws-header-note-btn") || e.target.closest("#ws-sidebar-new-note-btn") || e.target.closest("#ws-empty-new-note")) {
        const activeNote = this.snippets.find((s) => s.id === this.activeNoteId);
        const folder = activeNote ? activeNote.folder : "Uncategorized";
        this.createNewNote(folder);
        return;
      }

      // 4. New Folder Trigger (Page Header or Sidebar)
      if (e.target.closest("#ws-header-folder-btn") || e.target.closest("#ws-sidebar-new-folder-btn")) {
        this.isCreatingFolder = true;
        const inlineForm = document.getElementById("ws-inline-folder-form");
        if (inlineForm) {
          inlineForm.style.display = "flex";
          document.getElementById("ws-inline-folder-input")?.focus();
        }
        return;
      }

      // 5. Cancel Inline Folder
      if (e.target.closest("#ws-cancel-inline-folder")) {
        this.isCreatingFolder = false;
        const inlineForm = document.getElementById("ws-inline-folder-form");
        if (inlineForm) inlineForm.style.display = "none";
        return;
      }

      // 6. Save Inline Folder
      if (e.target.closest("#ws-save-inline-folder")) {
        const input = document.getElementById("ws-inline-folder-input");
        const folderName = input ? input.value.trim() : "";
        if (!folderName) return Toast.show("Folder name cannot be empty", "warning");

        await this.saveSnippet(`Folder: ${folderName}`, `# ${folderName}\n\nStart adding notes to this folder.`, "text", folderName, [], "text");
        this.isCreatingFolder = false;
        Toast.show(`Folder "${folderName}" created`, "success");
        return;
      }

      // 7. Clear Search Button
      if (e.target.closest("#ws-clear-search-btn")) {
        this.searchQuery = "";
        this.renderWorkspaceLayout();
        return;
      }

      // 8. Toggle Preview / Edit Mode
      if (e.target.closest("#ws-toggle-preview")) {
        await this.saveActiveNoteChanges();
        this.isEditing = !this.isEditing;
        this.renderWorkspaceLayout();
        return;
      }

      // 9. Pin / Unpin Note
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

      // 10. Copy Note Content
      if (e.target.closest("#ws-copy-btn")) {
        const note = this.snippets.find((s) => s.id === this.activeNoteId);
        if (note) {
          Helpers.copyToClipboard(note.code);
          Toast.show("Note copied to clipboard", "success");
        }
        return;
      }

      // 11. Delete Note
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

      // 12. Interactive Task List Checkbox Toggle in Preview Mode
      const taskCheck = e.target.closest(".ws-task-check");
      if (taskCheck) {
        const note = this.snippets.find((s) => s.id === this.activeNoteId);
        if (!note || !note.code) return;

        const currentStatus = taskCheck.dataset.status;
        const targetIdx = parseInt(taskCheck.dataset.idx, 10);
        let cur = 0;

        note.code = note.code.replace(/^- \[( |x)\]/gim, (match) => {
          if (cur === targetIdx) {
            cur++;
            return currentStatus === "checked" ? "- [ ]" : "- [x]";
          }
          cur++;
          return match;
        });

        await this.saveToIndexedDB(note);
        if (API.getAuthToken()) {
          API.fetchAPI(`/api/snippets/${note.id}`, "PUT", {
            title: note.title,
            code: note.code,
            lang: note.lang,
            folder: note.folder,
            tags: note.tags,
            itemType: note.itemType,
          }).catch(() => {});
        }

        const previewContainer = document.getElementById("ws-markdown-preview");
        if (previewContainer) {
          previewContainer.innerHTML = this._formatMarkdownPreview(note.code);
        }
        return;
      }

      // 13. Formatting Toolbar Buttons
      const fmtBtn = e.target.closest(".ws-fmt-btn");
      if (fmtBtn) {
        const textarea = document.getElementById("ws-note-editor");
        if (!textarea) return;
        const fmt = fmtBtn.dataset.fmt;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value;
        const selected = text.substring(start, end);
        let inserted = "";
        let newCursorPos = start;

        if (fmt === "h1") {
          inserted = `# ${selected || "Heading 1"}\n`;
          newCursorPos = start + inserted.length;
        } else if (fmt === "h2") {
          inserted = `## ${selected || "Heading 2"}\n`;
          newCursorPos = start + inserted.length;
        } else if (fmt === "bold") {
          inserted = `**${selected || "bold text"}**`;
          newCursorPos = start + (selected ? inserted.length : 2);
        } else if (fmt === "italic") {
          inserted = `*${selected || "italic text"}*`;
          newCursorPos = start + (selected ? inserted.length : 1);
        } else if (fmt === "code") {
          inserted = `\n\`\`\`javascript\n${selected || "// Code snippet"}\n\`\`\`\n`;
          newCursorPos = start + inserted.length;
        } else if (fmt === "list") {
          inserted = `\n- ${selected || "List item"}\n`;
          newCursorPos = start + inserted.length;
        } else if (fmt === "check") {
          inserted = `\n- [ ] ${selected || "To-do task"}\n`;
          newCursorPos = start + inserted.length;
        } else if (fmt === "link") {
          inserted = `[${selected || "Link text"}](https://)`;
          newCursorPos = start + inserted.length - 1;
        }

        textarea.value = text.substring(0, start) + inserted + text.substring(end);
        textarea.focus();
        textarea.setSelectionRange(newCursorPos, newCursorPos);
        this.scheduleAutoSave();
        return;
      }
    };

    pageContent.addEventListener("click", this._clickHandler);

    // Live Search Input Handler
    pageContent.addEventListener("input", (e) => {
      if (e.target.id === "ws-search-input") {
        this.searchQuery = e.target.value;
        this.renderWorkspaceLayout();
      } else if (e.target.id === "ws-note-title" || e.target.id === "ws-note-editor") {
        this.scheduleAutoSave();
      }
    });

    // Folder Select Change Handler
    pageContent.addEventListener("change", async (e) => {
      if (e.target.id === "ws-note-folder-select") {
        await this.saveActiveNoteChanges();
        this.renderWorkspaceLayout();
        Toast.show("Note moved to folder", "info");
      }
    });

    // Keyboard shortcuts: Ctrl+\ or Cmd+\ to toggle sidebar, Enter/Esc for inline folder
    pageContent.addEventListener("keydown", async (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "\\") {
        e.preventDefault();
        this.toggleSidebar();
      } else if (e.target.id === "ws-inline-folder-input" && e.key === "Enter") {
        e.preventDefault();
        document.getElementById("ws-save-inline-folder")?.click();
      } else if (e.target.id === "ws-inline-folder-input" && e.key === "Escape") {
        document.getElementById("ws-cancel-inline-folder")?.click();
      }
    });
  },
};

Object.assign(WorkspacePage, WorkspaceDB);
