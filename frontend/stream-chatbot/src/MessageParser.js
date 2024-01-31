// MessageParser.js

class MessageParser {
    constructor(actionProvider, state) {
      this.actionProvider = actionProvider;
      this.state = state;
    }
  
    parse(message) {
      if (message) {
        // Call the function to fetch streaming data from the server
        this.fetchStreamingData(message);
      }
    }
  
    async fetchStreamingData(prompt) {
      try {
        // Fetch initial response from the server
        const response = await fetch("http://localhost:8000/api/chat-stream/", {
          method: "post",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ "prompt": prompt }),
        });
  
        if (!response.ok || !response.body) {
          throw response.statusText;
        }
  
        // Start preparing for the streaming response
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let answer = '';
  
        // Read the stream until it's done
        while (true) {
          const { value, done } = await reader.read();
          if (done) {
            break;
          }
          const decodedChunk = decoder.decode(value, { stream: true });
          answer += JSON.parse(decodedChunk).data;
        }
        // Use the received data as needed, you can update the state or perform other actions
        this.actionProvider.handleStreamingData(answer);
      } catch (error) {
        console.error("Error fetching streaming data:", error);
      }
    }
  }
  
  export default MessageParser;
  