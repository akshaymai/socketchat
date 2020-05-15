const genarateMessage=(username,text)=>{
    
    console.log("my text",text)
return {
    username,
    text,
    cheatedAt: new Date().getTime()
}

}


const genarateLocationmessage=(username,url)=>{

    return{
        username,
        url,
    cheatedAt: new Date().getTime()

    }
}

module.exports={

    genarateMessage,
    genarateLocationmessage
} ;