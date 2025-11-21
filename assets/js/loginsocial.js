document.addEventListener("DOMContentLoaded", () => {
    const googleBtn = document.getElementById("googleLoginBtn");

    const allowedOrigins = [
        "http://127.0.0.1:5500",
        "https://site-condomino-piv.vercel.app",
        "https://d336vgy098gi03.cloudfront.net"
    ];

    // Recebe mensagens do popup
    window.addEventListener('message', function(event) {
        if (!allowedOrigins.includes(event.origin)) {
            console.warn("Origin não permitido:", event.origin);
            return;
        }

        if (event.data.type === 'OAUTH_CODE') {
            handleOAuthCode(event.data.code);
        } else if (event.data.type === 'OAUTH_ERROR') {
            handleOAuthError(event.data.error);
        }
    });

    // Abrir popup Google
    googleBtn.addEventListener("click", () => {
        const clientId = "787742620500-c3f02qa74r35m4b9qaf8ar93o9r6bqu2.apps.googleusercontent.com";
        const redirectUri = window.location.origin + "/pages/callback.html";

        const oauthUrl =
            `https://accounts.google.com/o/oauth2/v2/auth` +
            `?client_id=${clientId}` +
            `&redirect_uri=${encodeURIComponent(redirectUri)}` +
            `&response_type=code` +
            `&scope=openid%20email%20profile` +
            `&access_type=offline` +
            `&prompt=consent`;

        const popup = window.open(
            oauthUrl,
            "Google Login",
            "width=500,height=600,left=200,top=100"
        );

        if (!popup) alert("Popup bloqueado! Libere o uso de popups.");
    });

    // Recebe o code do Google e troca por tokens no backend
    async function handleOAuthCode(code) {
        try {
            googleBtn.innerHTML = '<span>Processando...</span>';
            googleBtn.disabled = true;

            const response = await fetch('https://api.porttusmart.tech/api/v1/auth/google/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code, access_token: "", id_token: "" })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || 'Erro no servidor');
            }

            handleLoginSuccess(data);

        } catch (error) {
            console.error("Erro no login:", error);
            handleLoginError(error.message);
        } finally {
            googleBtn.innerHTML =
                '<img src="assets/img/google-icon.png" alt="Google logo"> Entrar com Google';
            googleBtn.disabled = false;
        }
    }

    // Erros OAuth
    function handleOAuthError(error) {
        let msg = 'Erro no login com Google';
        if (error === 'access_denied') msg = 'Login cancelado pelo usuário';
        if (error === 'invalid_scope') msg = 'Erro de configuração do Google';
        handleLoginError(msg);
    }

    // SUCESSO TOTAL 🟢
    function handleLoginSuccess(data) {

        // Tokens
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);

        // Usuário retornado
        const user = data.user;

        if (user) {
            localStorage.setItem("user_id", user.id);
            localStorage.setItem("google_name", user.name || "");
            localStorage.setItem("google_email", user.email || "");
            localStorage.setItem("is_new_user", user.is_new_user ? "true" : "false");

            // Guardamos como objeto para o cadastro.js
            localStorage.setItem("user", JSON.stringify(user));
        }

        showMessage("Login realizado com sucesso!", "success");

        setTimeout(() => {
            const isNewUser = user?.is_new_user === true;
            const isRestricted = data?.detail?.includes("Cadastro incompleto");

            if (isNewUser || isRestricted) {
                window.location.href = "/pages/cadastrese.html";
            } else {
                window.location.href = "/pages/homemorador.html";
            }
        }, 500);
    }

    function handleLoginError(error) {
        showMessage(`Erro: ${error}`, 'error');
    }

    // Mensagens visuais
    function showMessage(text, type) {
        const existingMessage = document.querySelector('.auth-message');
        if (existingMessage) existingMessage.remove();

        const message = document.createElement('div');
        message.className = `auth-message ${type}`;
        message.textContent = text;
        message.style.cssText = `
            position: fixed; top: 20px; right: 20px;
            padding: 15px 20px; border-radius: 5px;
            color: white; font-weight: bold; z-index: 1000;
            background-color: ${type === 'success' ? '#4CAF50' : '#f44336'};
        `;
        document.body.appendChild(message);
        setTimeout(() => message.remove(), 5000);
    }
});
