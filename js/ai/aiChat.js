const AiChatMixin = {
  chatHistory: [],
  MAX_HISTORY_TURNS: 20,
  lastUserQuery: "",

  bindChat() {
    console.log("[AI Chat] Starting ChatGPT-style chat binding...");

    const input = document.getElementById("ai-bot-input");
    const send = document.getElementById("ai-bot-send");
    const explain = document.getElementById("ai-bot-explain");
    const debug = document.getElementById("ai-bot-debug");
    const archPill = document.getElementById("ai-bot-arch-pill");
    const modelSelect = document.getElementById("ai-model-select");
    const newChatBtn = document.getElementById("ai-new-chat");
    const clearBtn = document.getElementById("ai-clear-chat");
    const messagesContainer = document.getElementById("ai-bot-messages");

    if (!input || !send) {
      console.warn("[AI Chat] Essential elements missing, skipping binding");
      return;
    }

    // Initialize Model Selector
    if (modelSelect) {
      const savedModel = localStorage.getItem("trivoxa_ai_model") || "fast";
      modelSelect.value = savedModel;
      modelSelect.addEventListener("change", (e) => {
        const val = e.target.value;
        localStorage.setItem("trivoxa_ai_model", val);
        const selText = e.target.options[e.target.selectedIndex].text;
        if (typeof Toast !== "undefined") {
          Toast.show(`Model switched to ${selText}`, "info");
        }
      });
    }

    // Textarea Auto-resize & Enter key handling
    input.addEventListener("input", () => {
      input.style.height = "auto";
      input.style.height = Math.min(input.scrollHeight, 160) + "px";
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        e.stopPropagation();
        this.submitPrompt();
      }
    });

    // Send Button Listener
    send.addEventListener("click", () => this.submitPrompt());

    // Explain Code Pill
    if (explain) {
      explain.addEventListener("click", () => {
        if (!API.requireAuth()) return;
        const code = input.value.trim();
        if (!code) {
          if (typeof Toast !== "undefined") Toast.show("Paste code into the prompt first, then click Explain", "warning");
          return;
        }
        const q = "Explain this code to me like I'm a beginner:\n\n" + code;
        this.addMsg("Explain this code to me like a beginner:\n" + code, "user");
        input.value = "";
        input.style.height = "auto";
        setTimeout(() => this.genReply(q), 300);
      });
    }

    // Debug Error Pill
    if (debug) {
      debug.addEventListener("click", () => {
        if (!API.requireAuth()) return;
        const code = input.value.trim();
        if (!code) {
          if (typeof Toast !== "undefined") Toast.show("Paste error or code first, then click Debug Error", "warning");
          return;
        }
        const q = "Debug this code or error message. Identify the root cause and provide a fix:\n\n" + code;
        this.addMsg("Debug this error:\n" + code, "user");
        input.value = "";
        input.style.height = "auto";
        setTimeout(() => this.genReply(q), 300);
      });
    }

    // Architecture Pill
    if (archPill) {
      archPill.addEventListener("click", () => {
        if (!API.requireAuth()) return;
        const query = input.value.trim();
        if (!query) {
          if (typeof Toast !== "undefined") Toast.show("Enter project details first, then click Architecture", "info");
          return;
        }
        const q = "Design fullstack software architecture and folder structure for:\n\n" + query;
        this.addMsg("Design architecture for: " + query, "user");
        input.value = "";
        input.style.height = "auto";
        setTimeout(() => this.genReply(q), 300);
      });
    }

    // Reset / New Chat buttons
    if (newChatBtn) {
      newChatBtn.addEventListener("click", () => this.resetChat());
    }
    if (clearBtn) {
      clearBtn.addEventListener("click", () => this.resetChat());
    }

    // Suggestion chips and Hero Prompt Cards
    const suggestionChips = document.querySelectorAll("#ai-tab-chat .ai-suggest-chip");
    suggestionChips.forEach((chip) => {
      chip.addEventListener("click", () => {
        if (!API.requireAuth()) return;
        const q = chip.dataset.q;
        if (!q) return;
        this.addMsg(q, "user");
        setTimeout(() => this.genReply(q), 300);
      });
    });

    // Global Event Listener for Copy Code & Message Actions
    if (messagesContainer && !messagesContainer.dataset.bound) {
      messagesContainer.dataset.bound = "true";
      messagesContainer.addEventListener("click", (e) => {
        const copyCodeBtn = e.target.closest(".cg-copy-code-btn");
        if (copyCodeBtn) {
          const codeBlock = copyCodeBtn.closest(".cg-code-block");
          if (codeBlock) {
            const codeText = codeBlock.querySelector("pre code")?.innerText || "";
            navigator.clipboard.writeText(codeText).then(() => {
              copyCodeBtn.innerHTML = '<i class="fa-solid fa-check" style="color:var(--success);"></i> Copied!';
              setTimeout(() => {
                copyCodeBtn.innerHTML = '<i class="fa-regular fa-copy"></i> Copy code';
              }, 2000);
            });
          }
          return;
        }

        const copyTextBtn = e.target.closest(".cg-copy-text-btn");
        if (copyTextBtn) {
          const msgBubble = copyTextBtn.closest(".msg-content-wrapper")?.querySelector(".msg-bubble");
          if (msgBubble) {
            navigator.clipboard.writeText(msgBubble.innerText).then(() => {
              if (typeof Toast !== "undefined") Toast.show("Message copied to clipboard", "success");
            });
          }
          return;
        }

        const regenBtn = e.target.closest(".cg-regen-btn");
        if (regenBtn && this.lastUserQuery) {
          if (!API.requireAuth()) return;
          this.addMsg("Regenerating response...", "user");
          setTimeout(() => this.genReply(this.lastUserQuery), 300);
          return;
        }
      });
    }

    console.log("[AI Chat] ChatGPT binding complete");
  },

  submitPrompt() {
    if (!API.requireAuth()) return;
    const input = document.getElementById("ai-bot-input");
    if (!input) return;
    const q = input.value.trim();
    if (!q) return;

    this.addMsg(q, "user");
    input.value = "";
    input.style.height = "auto";
    setTimeout(() => this.genReply(q), 300);
  },

  resetChat() {
    this.chatHistory = [];
    this.lastUserQuery = "";
    const msgs = document.getElementById("ai-bot-messages");

    if (msgs) {
      msgs.innerHTML = `
        <div class="ai-msg bot-msg">
            <div class="msg-avatar" style="padding:0;overflow:hidden;"><img src="public/favicon.svg" alt="TrivoXa" style="width:100%;height:100%;object-fit:contain;border-radius:50%;" /></div>
            <div class="msg-content-wrapper">
                <div class="msg-bubble">
                    Hello! I'm your TrivoXa AI assistant. How can I help you today?
                </div>
            </div>
        </div>`;
    }
    if (typeof Toast !== "undefined") {
      Toast.show("Chat memory reset", "info");
    }
  },

  addMsg(text, sender) {
    const msgs = document.getElementById("ai-bot-messages");
    if (!msgs) return;

    const isBot = sender === "bot";
    if (!isBot) {
      this.lastUserQuery = text;
    }

    const div = document.createElement("div");
    div.className = `ai-msg ${isBot ? "bot-msg" : "user-msg"}`;

    const avatarHtml = isBot
      ? '<div class="msg-avatar" style="padding:0;overflow:hidden;"><img src="public/favicon.svg" alt="TrivoXa" style="width:100%;height:100%;object-fit:contain;border-radius:50%;" /></div>'
      : '<div class="msg-avatar"><i class="fa-solid fa-user"></i></div>';

    const actionsHtml = isBot
      ? `<div class="cg-msg-actions">
          <button class="cg-action-btn cg-copy-text-btn" title="Copy text"><i class="fa-regular fa-copy"></i> Copy</button>
          <button class="cg-action-btn cg-regen-btn" title="Regenerate response"><i class="fa-solid fa-rotate-right"></i></button>
        </div>`
      : "";

    div.innerHTML = `${avatarHtml}
      <div class="msg-content-wrapper">
        <div class="msg-bubble">${text}</div>
        ${actionsHtml}
      </div>`;

    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
  },

  showTypingIndicator() {
    const msgs = document.getElementById("ai-bot-messages");
    if (!msgs) return null;

    const ind = document.createElement("div");
    ind.className = "ai-msg bot-msg";
    ind.id = "cg-typing-indicator";
    ind.innerHTML = `
      <div class="msg-avatar" style="padding:0;overflow:hidden;"><img src="public/favicon.svg" alt="TrivoXa" style="width:100%;height:100%;object-fit:contain;border-radius:50%;" /></div>
      <div class="msg-content-wrapper">
        <div class="typing-indicator">
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
        </div>
      </div>
    `;
    msgs.appendChild(ind);
    msgs.scrollTop = msgs.scrollHeight;
    return ind;
  },

  removeTypingIndicator() {
    const ind = document.getElementById("cg-typing-indicator");
    if (ind) ind.remove();
  },

  async genReply(query) {
    const sendBtn = document.getElementById("ai-bot-send");
    if (sendBtn) {
      sendBtn.disabled = true;
      sendBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
    }

    const typingEl = this.showTypingIndicator();

    const q = query.toLowerCase();
    let match = null;
    const buildIntent = /\b(build|create|make|develop|start)\b/.test(q);
    if (buildIntent && this.recommendations) {
      for (const [key, data] of Object.entries(this.recommendations)) {
        const wordRegex = new RegExp(`\\b${key}\\b`);
        if (wordRegex.test(q)) {
          match = data;
          break;
        }
      }
    }

    if (match) {
      this.removeTypingIndicator();
      let html = `<p style="font-weight:600;margin-bottom:10px;">${match.reply}</p><div style="display:flex;flex-direction:column;gap:8px;">`;
      match.tools.forEach((t, i) => {
        html += `<div style="display:flex;align-items:flex-start;gap:10px;padding:10px 12px;background:rgba(255,255,255,0.03);border-radius:10px;border:1px solid var(--border);"><span style="color:var(--primary-light);font-weight:700;min-width:20px;">${i + 1}.</span><div><span style="font-weight:600;font-size:0.86rem;color:var(--text);">${t.name}</span><p style="font-size:0.78rem;color:var(--text-muted);margin-top:2px;line-height:1.4;">${t.why}</p></div></div>`;
      });
      html += "</div>";
      this.addMsg(html, "bot");

      if (sendBtn) {
        sendBtn.disabled = false;
        sendBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
      }
      return;
    }

    try {
      let replyText = "";
      try {
        let sysPrompt =
          "You are TrivoXa AI, an expert programming assistant embedded in a developer toolkit. You have memory of the full conversation so far. Format your answer clearly with numbered steps or code snippets when appropriate. Keep answers concise, clean, and nicely structured with markdown.";

        this.chatHistory.push({ role: "user", content: query });

        if (this.chatHistory.length > this.MAX_HISTORY_TURNS * 2) {
          this.chatHistory = this.chatHistory.slice(-this.MAX_HISTORY_TURNS * 2);
        }

        const modelPref = localStorage.getItem("trivoxa_ai_model") || "fast";
        const modelMap = {
          fast: { model: "groq/compound-mini", provider: "groq" },
          smart: { model: "groq/compound", provider: "groq" },
          deep: { model: "gemini-3.6-flash", provider: "gemini" },
          research: { model: "openrouter/free", provider: "openrouter" },
          // Legacy aliases
          mixtral: { model: "groq/compound-mini", provider: "groq" },
          llama2: { model: "gemini-3.6-flash", provider: "gemini" },
          gemma: { model: "openrouter/free", provider: "openrouter" },
          "mixtral-large": { model: "groq/compound", provider: "groq" }
        };
        const selected = modelMap[modelPref] || modelMap.fast;

        const res = await API.callGroqChat(
          [{ role: "system", content: sysPrompt }, ...this.chatHistory],
          selected.model,
          0.7,
          selected.provider
        );

        replyText = res.choices[0]?.message?.content || "No response generated";

        this.chatHistory.push({ role: "assistant", content: replyText });
        if (typeof AskAiPage !== "undefined" && AskAiPage.cleanAiResponse) {
          replyText = AskAiPage.cleanAiResponse(replyText);
        }
      } catch (e) {
        console.error("AI Chat error:", e);
        this.removeTypingIndicator();

        const errorMsg = e.message || "API service error.";
        let displayMsg = errorMsg;

        if (errorMsg.includes("CORS")) {
          displayMsg = "❌ CORS Error: Cannot reach Groq API from browser.";
        } else if (errorMsg.includes("401")) {
          displayMsg = "❌ Unauthorized: API key is invalid or expired.";
        } else if (errorMsg.includes("429")) {
          displayMsg = "❌ Rate limited: Too many requests. Wait a moment and try again.";
        }

        this.addMsg(displayMsg, "bot");
        return;
      }

      this.removeTypingIndicator();
      let formattedReply = this.formatMarkdown(replyText);
      this.addMsg(formattedReply.trim(), "bot");

      if (this.saveAiHistory) {
        this.saveAiHistory("chat", query, formattedReply.trim());
      }
    } finally {
      if (sendBtn) {
        sendBtn.disabled = false;
        sendBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
      }
    }
  },

  /**
   * Enhanced ChatGPT Markdown Renderer:
   * Wraps code blocks with custom top-header bar containing language badge and working Copy button.
   */
  formatMarkdown(text) {
    if (!text) return "";

    // Step 1: Replace code blocks with styled ChatGPT code containers
    const codeBlocks = [];
    text = text.replace(/```(\w*)\n?([\s\S]*?)```/g, (_, lang, code) => {
      const idx = codeBlocks.length;
      const cleanCode = code.replace(/</g, "&lt;").replace(/>/g, "&gt;").trim();
      const displayLang = lang.trim() || "code";
      codeBlocks.push(
        `<div class="cg-code-block">
          <div class="cg-code-header">
            <span class="cg-code-lang">${displayLang}</span>
            <button class="cg-copy-code-btn"><i class="fa-regular fa-copy"></i> Copy code</button>
          </div>
          <pre><code>${cleanCode}</code></pre>
        </div>`
      );
      return `__CODE_BLOCK_${idx}__`;
    });

    // Step 2: Line-by-line markdown formatting (Headings, Lists)
    const lines = text.split("\n");
    let html = "";
    let inList = false;
    let listType = "";

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];

      if (line.startsWith("### ")) {
        line = `<h4 style="margin:12px 0 6px;font-weight:600;color:var(--primary-light);">${line.slice(4)}</h4>`;
      } else if (line.startsWith("## ")) {
        line = `<h3 style="margin:14px 0 6px;font-weight:700;color:var(--primary-light);">${line.slice(3)}</h3>`;
      } else if (line.startsWith("# ")) {
        line = `<h2 style="margin:16px 0 8px;font-weight:700;color:var(--primary-light);">${line.slice(2)}</h2>`;
      } else if (/^\d+\.\s/.test(line)) {
        if (!inList || listType !== "ol") {
          if (inList) html += `</${listType}>`;
          html += '<ol style="margin:8px 0;padding-left:20px;line-height:1.7;">';
          inList = true;
          listType = "ol";
        }
        line = `<li style="margin-bottom:4px;">${line.replace(/^\d+\.\s/, "")}</li>`;
      } else if (/^[\-\*]\s/.test(line)) {
        if (!inList || listType !== "ul") {
          if (inList) html += `</${listType}>`;
          html += '<ul style="margin:8px 0;padding-left:20px;line-height:1.7;">';
          inList = true;
          listType = "ul";
        }
        line = `<li style="margin-bottom:4px;">${line.replace(/^[\-\*]\s/, "")}</li>`;
      } else {
        if (inList) {
          html += `</${listType}>`;
          inList = false;
          listType = "";
        }
        if (line.trim() === "") {
          line = "<br>";
        } else {
          line = `<p style="margin:4px 0;line-height:1.65;">${line}</p>`;
        }
      }

      html += line;
    }
    if (inList) html += `</${listType}>`;

    // Step 3: Inline Markdown (Bold, Italic, Inline Code)
    html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
    html = html.replace(
      /`([^`]+)`/g,
      '<code style="background:rgba(212,168,67,0.12);padding:2px 6px;border-radius:4px;font-family:var(--font-mono);font-size:0.82em;color:var(--primary-light);">$1</code>'
    );

    // Step 4: Restore code blocks
    codeBlocks.forEach((block, idx) => {
      html = html.replace(`__CODE_BLOCK_${idx}__`, block);
    });

    return html;
  },
};
