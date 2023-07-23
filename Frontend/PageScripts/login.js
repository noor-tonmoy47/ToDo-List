function toggleForm(formId) {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    if (formId === 'loginForm') {
      loginForm.style.display = 'block';
      signupForm.style.display = 'none';
    } else if (formId === 'signupForm') {
      loginForm.style.display = 'none';
      signupForm.style.display = 'block';
    }
  }