document.addEventListener('DOMContentLoaded', function() {
    const commentBox = document.getElementById('comment-box');
    const submitButton = document.getElementById('submit-comment');
    const commentsSection = document.getElementById('comments-section');
    const clearCommentsButton = document.getElementById('clear-comments');

    // Load comments from localStorage
    loadComments();

    submitButton.addEventListener('click', function() {
        const commentText = commentBox.value.trim();
        if (commentText) {
            const commentData = {
                text: commentText,
                timestamp: new Date().toLocaleString(),
            };

            // Save comment to localStorage
            saveComment(commentData);

            // Append the new comment
            appendComment(commentData);

            // Clear the input box
            commentBox.value = '';
        } else {
            alert('Please write a comment.');
        }
    });

    clearCommentsButton.addEventListener('click', function() {
        localStorage.removeItem('comments');
        commentsSection.innerHTML = ''; // Clear the comment display
    });

    function saveComment(commentData) {
        let comments = JSON.parse(localStorage.getItem('comments')) || [];
        comments.push(commentData);
        localStorage.setItem('comments', JSON.stringify(comments));
    }

    function loadComments() {
        let comments = JSON.parse(localStorage.getItem('comments')) || [];
        comments.forEach(commentData => appendComment(commentData));
    }

    function appendComment(commentData) {
        const commentDiv = document.createElement('div');
        commentDiv.classList.add('comment');
        commentDiv.innerHTML = `<p>${commentData.text}</p><span>${commentData.timestamp}</span>`;
        commentsSection.appendChild(commentDiv);
    }
});
// JavaScript Document