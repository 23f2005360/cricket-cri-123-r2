// Wait for DOM content to load
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('momentForm');
  const feedbackEl = document.getElementById('formFeedback');
  const momentsList = document.getElementById('momentsList');

  // Load existing moments from localStorage
  let sharedMoments = JSON.parse(localStorage.getItem('sharedMoments')) || [];
  renderMoments();

  // Handle form submission
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    clearFeedback();

    const name = document.getElementById('name').value.trim();
    const momentText = document.getElementById('moment').value.trim();

    // Validate inputs
    if (!name || !momentText) {
      showFeedback('Please fill in all fields.', 'error');
      return;
    }

    const newMoment = {
      id: Date.now(),
      name: name,
      text: momentText,
      timestamp: new Date().toISOString()
    };
    sharedMoments.push(newMoment);
    localStorage.setItem('sharedMoments', JSON.stringify(sharedMoments));
    renderMoments();
    form.reset();
    showFeedback('Your moment has been shared!', 'success');
  });

  // Render the list of shared moments
  function renderMoments() {
    momentsList.innerHTML = '';
    if (sharedMoments.length === 0) {
      momentsList.innerHTML = '<li>No moments shared yet. Be the first!</li>';
      return;
    }
    sharedMoments.slice().reverse().forEach(function(moment) {
      const li = document.createElement('li');
      li.innerHTML = '<strong>' + escapeHTML(moment.name) + '</strong> (' + formatDate(moment.timestamp) + '):<br />' + escapeHTML(moment.text);
      momentsList.appendChild(li);
    });
  }

  // Utility functions
  function showFeedback(message, type) {
    feedbackEl.textContent = message;
    feedbackEl.className = 'feedback ' + type;
  }

  function clearFeedback() {
    feedbackEl.textContent = '';
    feedbackEl.className = 'feedback';
  }

  function escapeHTML(str) {
    const p = document.createElement('p');
    p.textContent = str;
    return p.innerHTML;
  }

  function formatDate(isoStr) {
    const date = new Date(isoStr);
    return date.toLocaleString();
  }
});