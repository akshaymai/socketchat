const socket = io()

// elements
 var $messageform=document.querySelector('#message-form');
 var $messageformInput=$messageform.querySelector('input');
 var $messageformButton=$messageform.querySelector('button');
 var $locationsharebuttion=document.querySelector('#share-location');
 var $messgaes=document.querySelector('#messages')
 
 

//  templet
const messageTemplet=document.querySelector('#message-templet').innerHTML;
const locationTemplet=document.querySelector('#location-message-templet').innerHTML;
const sidebartemplet=document.querySelector('#sidebar-templet').innerHTML;

// option

const {username,room}=Qs.parse(location.search,{ignoreQueryPrefix:true})

 socket.emit('join',{username,room},(err)=>{
     if(err){
         alert(err)
         location.href="/"
     }
 })

 const autoscroll = () => {
    // New message element
    
    const $newMessage = $messgaes.lastElementChild

    // Height of the new message
    const newMessageStyles = getComputedStyle($newMessage)
    const newMessageMargin = parseInt(newMessageStyles.marginBottom)
    const newMessageHeight = $newMessage.offsetHeight + newMessageMargin

    // Visible height
    const visibleHeight = $messgaes.offsetHeight

    // Height of messgaes container
    const containerHeight = $messgaes.scrollHeight

    // How far have I scrolled?
    const scrollOffset = $messgaes.scrollTop + visibleHeight

    if (containerHeight - newMessageHeight <= scrollOffset) {
        $messgaes.scrollTop = $messgaes.scrollHeight
    }
}


socket.on('message', (message) => {
 
    const html=Mustache.render(messageTemplet,{
        message:message.text,
        user:message.username,
        cheatedAt:moment(message.cheatedAt).format('h:mm a')
    })
    $messgaes.insertAdjacentHTML('beforeend',html)
    autoscroll()
})


socket.on('locaion-message',(message)=>{
      
    const  urls=Mustache.render(locationTemplet,{
        url:message.url,
        username:message.username,
        cheatedAt:moment(message.cheatedAt).format('h:mm a')

    })
  $messgaes.insertAdjacentHTML('beforeend',urls)
  autoscroll();
})



socket.on('roomData',({room,users})=>{
  const html=Mustache.render(sidebartemplet,{
      room,
      users
  })
document.querySelector('#sidebar').innerHTML=html
})




$messageform.addEventListener('submit', (e) => {

    $messageformButton.setAttribute('disabled','disabled')
    e.preventDefault()
    const message = e.target.elements.message.value
    socket.emit('sendMessage', message,(err)=>{

        $messageformButton.removeAttribute('disabled');
        $messageformInput.value=''
        $messageformInput.focus();
         


     if(err){
         return console.log(err)
     }
     console.log('message deliverd')
    })
})







document.querySelector('#share-location').addEventListener('click',()=>{

$locationsharebuttion.setAttribute('disabled','disabled');

if(!navigator.geolocation){
    return alert('your browser is not supported')
}
// $messageformButton.setAttribute('disabled','disabled')

navigator.geolocation.getCurrentPosition((pog)=>{
   
socket.emit('locaton-message',{
    Latitude:pog.coords.latitude,
    Longitude:pog.coords.longitude
},()=>{
     $locationsharebuttion.removeAttribute('disabled');
    console.log('Location share!!!!')
})
})
})