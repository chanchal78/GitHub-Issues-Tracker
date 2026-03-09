// console.log("hello world");

const signInBtn = document.getElementById('sign-in-btn');
const username = document.getElementById('username');
const password = document.getElementById('password');

signInBtn.addEventListener('click', function(){
    if(username.value === 'admin' && password.value === 'admin123'){
        window.location.href = 'main.html';
    }
    else{
        const errorMessage = document.getElementById('error-message');
        errorMessage.classList.remove('hidden');
    }
});