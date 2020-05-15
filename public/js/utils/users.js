const users=[]

const addUser=({id,username,room})=>{  
username=username.trim().toUpperCase();
room=room.trim().toUpperCase();


if(!username ||  !room){
   return{
  error:'username or room is requred'
   }  
}

var checkuser=users.find((user)=>{
   return user.username===username && user.room===room;
})
if(checkuser){
  
   return {
     error:'user is alredy  here in this room'
   } 
}


const user={id,username,room}
users.push(user)

return {user}
}

const removeUser=(id)=>{

 const index= users.findIndex((user)=>user.id===id)
 console.log("my index is",index)

 if(index!==-1){
    let user=users.splice(index,1)[0]
   return user
 
 }

 
}
   
const getUser=(id)=>{
 
return users.find((user)=>user.id===id)
}


const getUserInRoom=(room)=>{

return users.filter((user)=>user.room===room)
}

 
module.exports={
   addUser,
   removeUser,
   getUser,
   getUserInRoom
}