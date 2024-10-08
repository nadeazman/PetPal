function submitComment() {
    const commentBox = document.getElementById('comment-box');
    const commentText = commentBox.value.trim();
    if (commentText) {
        const commentSection = document.getElementById('comments-section');
        
        // Create a new comment element
        const newComment = document.createElement('div');
        newComment.className = 'comment';
        newComment.textContent = commentText;
        
        // Add the new comment to the comment section
        commentSection.appendChild(newComment);

        // Clear the comment box
        commentBox.value = '';
    } else {
        alert('Please write a comment before submitting.');
    }
}
// JavaScript Document
