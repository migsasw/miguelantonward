const contactForm = document.querySelector('.contactForm');

let fullname = document.getElementById('fullname');
let email = document.getElementById('email');
let subject = document.getElementById('subject');
let message = document.getElementById('message');

contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    let formData = {
        fullname: fullname.value,
        email: email.value,
        subject: subject.value,
        message: message.value
    }
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/contact');
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.onload = function ()
    {
        console.log(xhr.responseText);
        if (xhr.responseText == 'success') {
            alert('Email sent');
            fullname.value = '';
            email.value = '';
            subject.value = '';
            Message.value = '';
        } else {
            alert("Unable to send message!")
        }
    }

        xhr.send(JSON.stringify(formData));
    });