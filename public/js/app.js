console.log('Hello')
// const fetch = require('fetch')
/* fetch('http://localhost:3000/weather?address=boston').then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error)
        } else {
            console.log(data.Address)
        }
    })
}) */
const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const message = document.querySelector('#messageID')

weatherform.addEventListener('submit', (oevent)=>{
    oevent.preventDefault()
    const location = search.value
    message.textContent='Loading....'
    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            message.textContent=data.error
            console.log(data.error)
        } else {
            message.textContent=data.Address
            console.log(data.Address)
        }
    })
})
})