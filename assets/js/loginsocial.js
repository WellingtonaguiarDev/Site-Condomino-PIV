document.addEventListener("DOMContentLoaded", () => {
    const googleBtn = document.getElementById("googleLoginBtn");

    // ORIGENS PERMITIDAS
    const allowedOrigins = [
        "http://127.0.0.1:5500",
        "https://site-condomino-piv.vercel.app",
        "https://d336vgy098gi03.cloudfront.net"
    ];

    // Escuta mensagens do popup
    window.addEventListener('message', function(event) {
        if (!allowedOrigins.includes(event.origin)) {
            console.warn("Origin não permitido:", event.origin);
            return;
        }

        if (event.data.type === 'OAUTH_CODE') {
            handleOAuthCode(event.data.code);
        } 
        else if (event.data.type === 'OAUTH_ERROR') {
            handleOAuthError(event.data.error);
        }
    });

    // Clique no botão Google
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

        console.log("URL do OAuth:", oauthUrl);

        const popup = window.open(
            oauthUrl,
            "Google Login",
            "width=500,height=600,left=200,top=100"
        );

        if (!popup) alert("Popup bloqueado! Libere popups para este site.");
    });

    // Handle do código OAuth
    async function handleOAuthCode(code) {
        try {
            console.log("Código recebido:", code);

            googleBtn.innerHTML = '<span>Processando...</span>';
            googleBtn.disabled = true;

            const response = await fetch('https://api.porttusmart.tech/api/v1/auth/google/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code, access_token: "", id_token: "" })
            });

            const data = await response.json();

            if (response.ok) {
                handleLoginSuccess(data);
            } else {
                throw new Error(data.detail || 'Erro no servidor');
            }

        } catch (error) {
            console.error('Erro no login:', error);
            handleLoginError(error.message);
        } finally {
            googleBtn.innerHTML =
                '<img src="assets/img/google-icon.png" alt="Google logo"> Entrar com Google';
            googleBtn.disabled = false;
        }
    }

    // Erro do OAuth
    function handleOAuthError(error) {
        let errorMessage = 'Erro no login com Google';
        if (error === 'access_denied') errorMessage = 'Login cancelado pelo usuário';
        if (error === 'invalid_scope') errorMessage = 'Erro de configuração do Google';
        handleLoginError(errorMessage);
    }

    // Sucesso no login
    function handleLoginSuccess(data) {
        if (data.token) localStorage.setItem('authToken', data.token);
        if (data.user) localStorage.setItem('user', JSON.stringify(data.user));

        showMessage('Login realizado com sucesso!', 'success');

        setTimeout(() => {
            if (data.need_register) {
                window.location.href = '/pages/cadastrese.html';
            } else {
                window.location.href = '/pages/homemorador.html';
            }
        }, 1000);
    }

    // Erro no login
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
