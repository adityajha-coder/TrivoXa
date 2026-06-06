/* Auth Modal — extracted from navbar.js */
const AuthModal = {
  init() {
    // Custom Authentication Logic
    const btnIn = document.getElementById("btn-auth-in");
    const btnOut = document.getElementById("btn-auth-out");
    const userProfile = document.getElementById("user-profile");
    const userAvatar = document.getElementById("user-avatar");
    const userName = document.getElementById("user-name");

    const updateAuthUI = () => {
      const user = API.getUser();
      if (user) {
        btnIn.style.display = "none";
        btnOut.style.display = "flex";
        userProfile.style.display = "flex";
        userAvatar.src = user.avatar || "public/favicon.svg";
        userName.textContent = user.name ? user.name.split(" ")[0] : "User";
      } else {
        btnIn.style.display = "flex";
        btnOut.style.display = "none";
        userProfile.style.display = "none";
      }
    };

    // Initialize UI
    updateAuthUI();

    // Listen for auth changes from API
    window.removeEventListener("auth_changed", updateAuthUI);
    window.addEventListener("auth_changed", updateAuthUI);

    // Prevent duplicates on re-render
    const existingModal = document.getElementById("auth-modal");
    if (existingModal) existingModal.remove();

    // Build the Auth Modal
    const authModal = document.createElement("div");
    authModal.id = "auth-modal";
    authModal.style.cssText =
      "display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); z-index:9999; align-items:center; justify-content:center; backdrop-filter:blur(5px);";
    authModal.innerHTML = `
            <div class="glass-card" style="width:100%; max-width:400px; position:relative; padding:30px;">
                <button id="auth-close" class="btn btn-ghost btn-xs" style="position:absolute; top:15px; right:15px;"><i class="fa-solid fa-xmark"></i></button>
                <div style="text-align:center; margin-bottom:20px;">
                    <img src="public/favicon.svg" style="width:50px; height:50px; margin-bottom:10px;">
                    <h2 id="auth-title" style="margin:0;">Sign In</h2>
                </div>
                
                <form id="auth-form" style="display:flex; flex-direction:column; gap:15px;">
                    <div id="auth-name-group" style="display:none;">
                        <input type="text" id="auth-name" class="input-field" placeholder="Full Name" style="width:100%;">
                    </div>
                    <div>
                        <input type="email" id="auth-email" class="input-field" placeholder="Email Address" required style="width:100%;">
                    </div>
                    <div>
                        <input type="password" id="auth-password" class="input-field" placeholder="Password" required style="width:100%;">
                    </div>
                    <div id="auth-confirm-group" style="display:none;">
                        <input type="password" id="auth-confirm-password" class="input-field" placeholder="Confirm Password" style="width:100%;">
                        <p id="auth-pw-mismatch" style="display:none; color:var(--error); font-size:0.75rem; margin-top:5px;"><i class="fa-solid fa-circle-exclamation" style="margin-right:4px;"></i>Passwords do not match</p>
                    </div>
                    <button type="submit" id="auth-submit-btn" class="btn btn-primary" style="width:100%; justify-content:center;">Sign In</button>
                </form>
                
                <div style="text-align:center; margin-top:20px; font-size:0.9rem;">
                    <span id="auth-toggle-text" style="color:var(--text-muted);">Don't have an account?</span>
                    <a href="#" id="auth-toggle-link" style="color:var(--primary); font-weight:600; margin-left:5px;">Register</a>
                </div>
            </div>
        `;
    document.body.appendChild(authModal);

    let isLogin = true;

    document
      .getElementById("auth-toggle-link")
      .addEventListener("click", (e) => {
        e.preventDefault();
        isLogin = !isLogin;
        document.getElementById("auth-title").textContent = isLogin
          ? "Sign In"
          : "Create Account";
        document.getElementById("auth-submit-btn").textContent = isLogin
          ? "Sign In"
          : "Register";
        document.getElementById("auth-toggle-text").textContent = isLogin
          ? "Don't have an account?"
          : "Already have an account?";
        document.getElementById("auth-toggle-link").textContent = isLogin
          ? "Register"
          : "Sign In";
        document.getElementById("auth-name-group").style.display = isLogin
          ? "none"
          : "block";
        document.getElementById("auth-confirm-group").style.display = isLogin
          ? "none"
          : "block";
        if (!isLogin) {
          document.getElementById("auth-name").required = true;
          document.getElementById("auth-confirm-password").required = true;
        } else {
          document.getElementById("auth-name").required = false;
          document.getElementById("auth-confirm-password").required = false;
          document.getElementById("auth-confirm-password").value = "";
          document.getElementById("auth-pw-mismatch").style.display = "none";
        }
      });

    // Real-time confirm password validation
    document
      .getElementById("auth-confirm-password")
      .addEventListener("input", () => {
        const pw = document.getElementById("auth-password").value;
        const cpw = document.getElementById("auth-confirm-password").value;
        const mismatch = document.getElementById("auth-pw-mismatch");
        if (cpw && pw !== cpw) {
          mismatch.style.display = "block";
        } else {
          mismatch.style.display = "none";
        }
      });

    document.getElementById("auth-close").addEventListener("click", () => {
      authModal.style.display = "none";
    });

    btnIn.addEventListener("click", () => {
      authModal.style.display = "flex";
    });

    document
      .getElementById("auth-form")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        const btn = document.getElementById("auth-submit-btn");
        btn.innerHTML =
          '<i class="fa-solid fa-spinner fa-spin"></i> Please wait...';
        btn.disabled = true;

        const email = document.getElementById("auth-email").value;
        const pass = document.getElementById("auth-password").value;
        const name = document.getElementById("auth-name").value;

        try {
          if (isLogin) {
            await API.login(email, pass);
            Toast.show("Welcome back!", "success");
          } else {
            const confirmPass = document.getElementById(
              "auth-confirm-password",
            ).value;
            if (pass !== confirmPass) {
              Toast.show("Passwords do not match", "error");
              btn.innerHTML = "Register";
              btn.disabled = false;
              return;
            }
            await API.register(name, email, pass);
            Toast.show("Account created successfully!", "success");
          }
          authModal.style.display = "none";
          document.getElementById("auth-form").reset();
        } catch (err) {
          Toast.show(err.message, "error");
        } finally {
          btn.innerHTML = isLogin ? "Sign In" : "Register";
          btn.disabled = false;
        }
      });

    btnOut.addEventListener("click", () => {
      API.logout();
      Toast.show("Signed out successfully", "success");
    });
  },
};
