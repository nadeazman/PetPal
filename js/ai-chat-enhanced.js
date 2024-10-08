function sendMessage() {
    const chatBox = document.getElementById('chat-box');
    const userInput = document.getElementById('user-input');
    const userMessage = userInput.value.trim();

    if (userMessage) {
        // Display user message
        const userChat = document.createElement('div');
        userChat.className = 'user-message';
        userChat.textContent = 'You: ' + userMessage;
        chatBox.appendChild(userChat);

        // Generate AI response
        const aiResponse = generateAIResponse(userMessage.toLowerCase());
        const aiChat = document.createElement('div');
        aiChat.className = 'ai-message';
        aiChat.textContent = 'AI: ' + aiResponse;
        chatBox.appendChild(aiChat);

        // Clear input
        userInput.value = '';

        // Scroll to the bottom
        chatBox.scrollTop = chatBox.scrollHeight;
    }
}

// Predefined responses based on keywords
function generateAIResponse(userMessage) {
    if (userMessage.includes('food') || userMessage.includes('eat')) {
        return 'Make sure to feed your pet a balanced diet with a mix of proteins and nutrients.';
    } else if (userMessage.includes('exercise')) {
        return 'Exercise is essential! Try taking your dog for a walk twice a day or playing with your cat to keep them active.';
    } else if (userMessage.includes('grooming')) {
        return 'Regular grooming helps maintain your pet’s hygiene. Brush their fur and trim their nails frequently.';
    } else if (userMessage.includes('vet')) {
        return 'Schedule regular checkups with your vet to ensure your pet’s health is monitored.';
    } else {
        return 'I’m not sure about that. Can you ask a different question about pet care?';
    }
}
// JavaScript Document