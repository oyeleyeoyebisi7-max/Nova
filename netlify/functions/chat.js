exports.handler = async function(event) {

try{

const body = JSON.parse(event.body);

const response = await fetch("https://openrouter.ai/api/v1/chat/completions",{
method:"POST",
headers:{
"Authorization":`Bearer ${process.env.OPENROUTER_API_KEY}`,
"Content-Type":"application/json"
},
body:JSON.stringify({
model:"meta-llama/llama-3-8b-instruct",
messages:[
{
role:"system",
content:"You are Nova AI, a professional portfolio AI assistant."
},
{
role:"user",
content:body.message
}
]
})
});

const data = await response.json();

const reply =
data?.choices?.[0]?.message?.content ||
"No response";

return{
statusCode:200,
body:JSON.stringify({
reply
})
};

}catch(error){

return{
statusCode:500,
body:JSON.stringify({
reply:"Server error"
})
};

}
};
