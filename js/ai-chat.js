document.getElementById('send-btn').addEventListener('click', function() {
    let input = document.getElementById('user-input').value;
    let chatBox = document.querySelector('.chat-box');
    let userMessage = document.createElement('p');
    userMessage.textContent = "You: " + input;
    chatBox.appendChild(userMessage);
    
    // Simulate AI response
    let aiResponse = document.createElement('p');
    aiResponse.textContent = "AI: Here's some advice about " + input;
    chatBox.appendChild(aiResponse);
    
    document.getElementById('user-input').value = '';
});

function sendMessage() {
    const chatBox = document.getElementById('chat-box');
    const userInput = document.getElementById('user-input');
    const userMessage = userInput.value.trim();

    if (userMessage) {
        // Add user's message to chat
        const userChat = document.createElement('div');
        userChat.className = 'user-message';
        userChat.textContent = 'You: ' + userMessage;
        chatBox.appendChild(userChat);

        // Simulate AI response
        const aiChat = document.createElement('div');
        aiChat.className = 'ai-message';
        aiChat.textContent = 'AI: Here’s some advice about ' + userMessage;
        chatBox.appendChild(aiChat);

        // Clear user input
        userInput.value = '';

        // Scroll to the bottom of the chat box
        chatBox.scrollTop = chatBox.scrollHeight;
    }
}

// JavaScript Document
