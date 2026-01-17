// Navigation logic
window.startApp = function() {
    const welcome = document.getElementById('welcomeView');
    const formView = document.getElementById('formView');
    if (welcome && formView) {
        welcome.classList.add('hidden');
        formView.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const profileForm = document.getElementById('profileForm');

    if (profileForm) {
        profileForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = document.getElementById('submitBtn');
            const originalText = btn.innerText;

            btn.disabled = true;
            btn.innerText = "Sending...";

            // Collect data from form
            const formData = new FormData(profileForm);
            const data = Object.fromEntries(formData.entries());

            try {
                const res = await fetch('/api/submit', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                if (res.ok) {
                    document.getElementById('formContainer').classList.add('hidden');
                    document.getElementById('successState').classList.remove('hidden');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                    alert("Submission failed. Check your server console.");
                }
            } catch (err) {
                console.error("Fetch Error:", err);
                alert("Cannot connect to server. Is node server.js running?");
            } finally {
                btn.disabled = false;
                btn.innerText = originalText;
            }
        });
    }

    // Phone formatting
    const phoneInput = document.getElementById('phoneInput');
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            let x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
            if (!x) return;
            e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
        });
    }
});