document.getElementById("login-btn").addEventListener("click", function(event){
    event.preventDefault();
    const userName = document.getElementById("username");
    const userInputName = userName.value;
    console.log(userInputName);
    const userPassword = document.getElementById("password");
    const userInputPassword = userPassword.value;
    console.log(userInputPassword);

    if(userInputName == "admin" && userInputPassword == "admin123"){
        alert("login success")
        window.location.replace("hello.html")
    }
    else{
        alert("nooooooooooooo");
        return;
    }
});