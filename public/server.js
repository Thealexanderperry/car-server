let form = document.querySelector(".form-container")

form.addEventListener("submit", async (event) => {
    // prevents form default behavior of:
    // page refresh & http being sent
    
    try{
        event.preventDefault();
    const name = event.target[0].value
    const email = event.target[1].value;
    const password = event.target[2].value;
    
    console.log(name);
    console.log(email);
    console.log(password);
    // ! definte the url you are trying to reach
    const url = "http://127.0.0.1:4000/user/register";
    // ! define the headers
let myHeaders = new Headers()
myHeaders.append("Content-Type", "application/json");
// ! create a variable called data: you will need to stringify the data

    const data = JSON.stringify({ name: name, email: email, password: password});

    // ! create our request options
    const requestOptions ={
        method: "POST",
        headers: myHeaders,
        body: data,
    };

    // ! conduct the Fetch
    const response = await fetch(url, requestOptions)
    const json = await response.json();
} catch(err){
    console.error(err)
}
});
