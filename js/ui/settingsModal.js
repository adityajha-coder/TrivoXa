const SettingsModal = {
  init() {
    const btnSettings = document.getElementById("btn-settings");
    if (!btnSettings) return;

    const existingModal = document.getElementById("settings-modal");
    if (existingModal) existingModal.remove();

    const settingsModal = document.createElement("div");
    settingsModal.id = "settings-modal";
    settingsModal.style.cssText =
      "display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.6); z-index:9999; align-items:center; justify-content:center; backdrop-filter:blur(5px); transition: opacity 0.25s ease;";

    document.body.appendChild(settingsModal);

    const renderModalContent = () => {
      const currentTheme = localStorage.getItem("theme") || "dark";
      const currentModel =
        localStorage.getItem("trivoxa_ai_model") || "mixtral";
      const currentUser = API.getUser();

      settingsModal.innerHTML = `
        <style>
          .layout-card {
            transition: all var(--transition);
          }
          .layout-card:hover {
            border-color: var(--primary-light) !important;
            transform: translateY(-2px);
            box-shadow: var(--shadow);
          }
          .layout-card.active {
            border-color: var(--primary) !important;
            box-shadow: var(--shadow-gold);
          }
          .switch {
            position: relative;
            display: inline-block;
            width: 40px;
            height: 22px;
          }
          .switch input {
            opacity: 0;
            width: 0;
            height: 0;
          }
          .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: var(--border-light);
            transition: .3s;
            border-radius: 22px;
            border: 1px solid var(--border);
          }
          .slider:before {
            position: absolute;
            content: "";
            height: 14px;
            width: 14px;
            left: 3px;
            bottom: 3px;
            background-color: var(--text-muted);
            transition: .3s;
            border-radius: 50%;
          }
          input:checked + .slider {
            background-color: rgba(212, 168, 67, 0.2);
            border-color: var(--primary);
          }
          input:checked + .slider:before {
            transform: translateX(18px);
            background-color: var(--primary);
          }
        </style>
        <div class="glass-card" style="width:100%; max-width:440px; position:relative; padding:30px; max-height: 90vh; overflow-y: auto; animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);">
            <button id="settings-close" class="btn btn-ghost btn-xs" style="position:absolute; top:15px; right:15px;"><i class="fa-solid fa-xmark"></i></button>
            
            <div style="margin-bottom:24px;">
                <h2 style="margin:0 0 4px 0; font-size: 1.4rem; font-weight: 700; color: var(--text);"><i class="fa-solid fa-gear" style="margin-right:8px; color: var(--primary);"></i>Settings</h2>
                <p style="margin:0; font-size:0.8rem; color:var(--text-secondary);">Customise your TrivoXa experience</p>
            </div>

            <div style="display:flex; flex-direction:column; gap:24px;">
                <!-- Theme Section -->
                <div>
                    <h3 style="margin:0 0 10px 0; font-size:0.9rem; font-weight:600; color:var(--text); text-transform:uppercase; letter-spacing:0.05em;">Theme / Appearance</h3>
                    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:12px;">
                        <!-- Dark Theme Card -->
                        <div id="theme-dark-btn" class="theme-card ${currentTheme === "dark" ? "active" : ""}" style="cursor:pointer; padding:12px; border:2px solid ${currentTheme === "dark" ? "var(--primary)" : "var(--border)"}; border-radius:var(--radius-lg); background:var(--bg-secondary); text-align:center; transition: all var(--transition);">
                            <i class="fa-solid fa-moon" style="font-size:1.3rem; color:${currentTheme === "dark" ? "var(--primary)" : "var(--text-muted)"}; margin-bottom:6px; display:block;"></i>
                            <span style="font-size:0.8rem; font-weight:600; color:var(--text);">Cyber Dark</span>
                        </div>
                        
                        <!-- Light Theme Card -->
                        <div id="theme-light-btn" class="theme-card ${currentTheme === "light" ? "active" : ""}" style="cursor:pointer; padding:12px; border:2px solid ${currentTheme === "light" ? "var(--primary)" : "var(--border)"}; border-radius:var(--radius-lg); background:var(--bg-secondary); text-align:center; transition: all var(--transition);">
                            <i class="fa-solid fa-sun" style="font-size:1.3rem; color:${currentTheme === "light" ? "var(--primary)" : "var(--text-muted)"}; margin-bottom:6px; display:block;"></i>
                            <span style="font-size:0.8rem; font-weight:600; color:var(--text);">Soft Light</span>
                        </div>
                    </div>
                </div>

                <!-- AI Model Selection -->
                <div>
                    <h3 style="margin:0 0 10px 0; font-size:0.9rem; font-weight:600; color:var(--text); text-transform:uppercase; letter-spacing:0.05em;">AI Model Preference</h3>
                    <div class="form-group" style="margin-bottom:0;">
                        <select id="setting-ai-model" class="input-field" style="width:100%; padding:10px 12px; border-radius:var(--radius-md); background:var(--bg-secondary); border:1px solid var(--border); color:var(--text); cursor:pointer;">
                            <option value="mixtral" ${currentModel === "mixtral" ? "selected" : ""}>Mixtral 8x7B (Recommended)</option>
                            <option value="llama2" ${currentModel === "llama2" ? "selected" : ""}>Llama 2 70B</option>
                            <option value="gemma" ${currentModel === "gemma" ? "selected" : ""}>Gemma 7B</option>
                        </select>
                    </div>
                </div>


                <!-- Security Section (Only rendered when logged in) -->
                ${
                  currentUser
                    ? `
                <div style="border-top:1px solid var(--border); padding-top:20px;">
                    <h3 style="margin:0 0 10px 0; font-size:0.9rem; font-weight:600; color:var(--text); text-transform:uppercase; letter-spacing:0.05em;"><i class="fa-solid fa-shield-halved" style="color:var(--primary); margin-right:6px;"></i>Security & Account</h3>
                    <div style="display:flex; flex-direction:column; gap:10px;">
                        <span style="font-size:0.8rem; color:var(--text-secondary);">Enter your email to reveal your cached password:</span>
                        <div style="display:flex; gap:8px;">
                            <input type="email" id="setting-reveal-email" class="input-field" placeholder="your-email@example.com" style="flex:1; padding:8px 12px; font-size:0.85rem; height:auto; background:var(--bg-secondary); border:1px solid var(--border); border-radius:var(--radius-md); color:var(--text);">
                            <button id="btn-reveal-pwd" class="btn btn-primary btn-sm" style="padding:0 16px; font-size:0.8rem; font-weight:600; height:34px;">Reveal</button>
                        </div>
                        <div id="reveal-pwd-result" style="display:none; padding:10px; border-radius:var(--radius-md); font-size:0.85rem; font-family:var(--font-mono); text-align:center; transition: all 0.2s ease;"></div>
                    </div>
                </div>
                `
                    : ""
                }
            </div>
        </div>
      `;

      // Bind Close button
      settingsModal
        .querySelector("#settings-close")
        .addEventListener("click", closeModal);

      // Bind Theme Toggles
      const darkBtn = settingsModal.querySelector("#theme-dark-btn");
      const lightBtn = settingsModal.querySelector("#theme-light-btn");

      const setTheme = (theme) => {
        if (theme === "light") {
          document.documentElement.classList.add("light-mode");
          localStorage.setItem("theme", "light");
          lightBtn.classList.add("active");
          darkBtn.classList.remove("active");
          lightBtn.style.borderColor = "var(--primary)";
          lightBtn.querySelector("i").style.color = "var(--primary)";
          darkBtn.style.borderColor = "var(--border)";
          darkBtn.querySelector("i").style.color = "var(--text-muted)";
        } else {
          document.documentElement.classList.remove("light-mode");
          localStorage.setItem("theme", "dark");
          darkBtn.classList.add("active");
          lightBtn.classList.remove("active");
          darkBtn.style.borderColor = "var(--primary)";
          darkBtn.querySelector("i").style.color = "var(--primary)";
          lightBtn.style.borderColor = "var(--border)";
          lightBtn.querySelector("i").style.color = "var(--text-muted)";
        }
        window.dispatchEvent(
          new CustomEvent("theme_changed", { detail: { theme } }),
        );
      };

      darkBtn.addEventListener("click", () => setTheme("dark"));
      lightBtn.addEventListener("click", () => setTheme("light"));

      // Bind AI Model selection
      const modelSelect = settingsModal.querySelector("#setting-ai-model");
      modelSelect.addEventListener("change", (e) => {
        localStorage.setItem("trivoxa_ai_model", e.target.value);
        Toast.show(
          "AI model preference saved: " +
            e.target.options[e.target.selectedIndex].text,
          "success",
        );
      });


      // Bind Reveal Password (if logged in)
      if (currentUser) {
        const emailInput = settingsModal.querySelector("#setting-reveal-email");
        const btnReveal = settingsModal.querySelector("#btn-reveal-pwd");
        const resultDiv = settingsModal.querySelector("#reveal-pwd-result");

        btnReveal.addEventListener("click", async () => {
          const email = emailInput.value.trim();
          if (!email) {
            Toast.show("Please enter your email", "warning");
            return;
          }

          if (email.toLowerCase() !== currentUser.email.toLowerCase()) {
            resultDiv.style.display = "block";
            resultDiv.style.background = "rgba(248, 81, 73, 0.1)";
            resultDiv.style.border = "1px solid var(--error)";
            resultDiv.style.color = "var(--error)";
            resultDiv.textContent =
              "Provided email does not match logged-in account email.";
            return;
          }

          btnReveal.disabled = true;
          btnReveal.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
          resultDiv.style.display = "none";

          try {
            const data = await API.revealPassword(email);
            resultDiv.style.display = "block";
            if (data.password) {
              const maskedPwd = "•".repeat(data.password.length);
              resultDiv.style.background = "rgba(46, 160, 67, 0.1)";
              resultDiv.style.border = "1px solid var(--success)";
              resultDiv.style.color = "var(--success)";
              resultDiv.innerHTML = `
                <div style="display:flex; align-items:center; justify-content:center; gap:8px;">
                  <strong>Password:</strong>
                  <span id="pwd-display-text" style="font-family:var(--font-mono); user-select:all;">${maskedPwd}</span>
                  <button id="btn-toggle-pwd-visibility" class="btn btn-ghost btn-xs" style="padding: 2px 6px; color: var(--text-secondary); border: 1px solid var(--border-light); border-radius: var(--radius-sm);">
                    <i class="fa-solid fa-eye"></i>
                  </button>
                </div>
              `;

              let isVisible = false;
              const toggleBtn = resultDiv.querySelector("#btn-toggle-pwd-visibility");
              const displaySpan = resultDiv.querySelector("#pwd-display-text");

              toggleBtn.addEventListener("click", () => {
                isVisible = !isVisible;
                if (isVisible) {
                  displaySpan.textContent = data.password;
                  toggleBtn.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
                } else {
                  displaySpan.textContent = maskedPwd;
                  toggleBtn.innerHTML = '<i class="fa-solid fa-eye"></i>';
                }
              });
              Toast.show("Password retrieved successfully", "success");
            } else if (data.notice) {
              resultDiv.style.background = "rgba(210, 153, 34, 0.1)";
              resultDiv.style.border = "1px solid var(--warning)";
              resultDiv.style.color = "var(--warning)";
              resultDiv.textContent = data.notice;
            } else {
              throw new Error("Password could not be revealed");
            }
          } catch (err) {
            resultDiv.style.display = "block";
            resultDiv.style.background = "rgba(248, 81, 73, 0.1)";
            resultDiv.style.border = "1px solid var(--error)";
            resultDiv.style.color = "var(--error)";
            resultDiv.textContent = err.message || "Failed to reveal password.";
            Toast.show(err.message || "Reveal password failed", "error");
          } finally {
            btnReveal.disabled = false;
            btnReveal.innerHTML = "Reveal";
          }
        });
      }
    };

    const closeModal = () => {
      settingsModal.style.opacity = "0";
      setTimeout(() => {
        settingsModal.style.display = "none";
      }, 250);
    };

    const openModal = () => {
      renderModalContent();
      settingsModal.style.display = "flex";
      settingsModal.style.opacity = "0";
      settingsModal.offsetHeight;
      settingsModal.style.opacity = "1";
    };

    btnSettings.addEventListener("click", openModal);

    // Background click
    settingsModal.addEventListener("click", (e) => {
      if (e.target === settingsModal) closeModal();
    });
  },
};
