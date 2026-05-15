exports.handler = async function(event) {

  try {

    const body = JSON.parse(event.body);

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": "https://example.com",
        "X-Title": "Nova AI",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct",
        messages: [
          {
            role: "user",
            content: body.message
          }
        ]
      })
    });

    const data = await response.json();

    console.log(data);

    return {
      statusCode: 200,
      body: JSON.stringify({
        reply: data.choices?.[0]?.message?.content || JSON.stringify(data)
      })
    };

  } catch (error) {

    return {
      statusCode: 500,
      body: JSON.stringify({
        reply: error.message
      })
    };

  }
};
