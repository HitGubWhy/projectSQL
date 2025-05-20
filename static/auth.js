const registerForm = document.getElementById('register-form')
const loginForm = document.getElementById('login-form')
console.log(registerForm)

registerForm?.addEventListener("submit", (event) => {
    event.preventDefault()
    const login = document.getElementById('login').value
    const password = document.getElementById('password').value
    const repeatPassword = document.getElementById('repeat-password').value

    if (password !== repeatPassword) {
        alert("Паролі не однакові!!!!!");
        return;
    }

    const user = JSON.stringify({
        login: login,
        password: password
    })

    const xhr = new XMLHttpRequest()
    xhr.open("POST", "/api/register")
    xhr.send(user)
    xhr.onload = () => alert(xhr.response)
})

loginForm?.addEventListener("submit", (event) => {
    event.preventDefault()
    const login = document.getElementById('login').value
    const password = document.getElementById('password').value

    const user = JSON.stringify({
        login: login,
        password: password
    })

    const xhr = new XMLHttpRequest()
    xhr.open("POST", "/api/login")
    xhr.send(user)
    xhr.onload = () => {
        if (xhr.status === 200) {
            const token = xhr.response
            document.cookie = `token=${token}`
            window.location.assign('/')
        } else {
            alert(xhr.response)
        }
    }
})




