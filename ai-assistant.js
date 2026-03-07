(function(){
    var OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';
    var OPENROUTER_MODEL = 'openrouter/free';
    var OPENROUTER_API_KEY = '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';

    var html = '<button type="button" class="ask-ai-fab" id="askAiFab" aria-label="AI Assistant"><span class="ask-ai-icon" aria-hidden="true">&#129302;</span><span class="ask-ai-text">AI Assistant</span></button>' +
        '<div class="ask-ai-panel" id="askAiPanel" aria-hidden="true">' +
        '<div class="ask-ai-header"><span class="ask-ai-title">AI Assistant</span><button type="button" class="ask-ai-close" id="askAiClose" aria-label="Close">&times;</button></div>' +
        '<div class="ask-ai-messages" id="askAiMessages"></div>' +
        '<div class="ask-ai-input-row"><input type="text" class="ask-ai-input" id="askAiInput" placeholder="Type your question..." autocomplete="off"><button type="button" class="ask-ai-send" id="askAiSend">Send</button></div>' +
        '</div>';

    var wrap = document.createElement('div');
    wrap.innerHTML = html;
    while (wrap.firstChild) document.body.appendChild(wrap.firstChild);

    var fab = document.getElementById('askAiFab');
    var panel = document.getElementById('askAiPanel');
    var closeBtn = document.getElementById('askAiClose');
    var messagesEl = document.getElementById('askAiMessages');
    var inputEl = document.getElementById('askAiInput');
    var sendBtn = document.getElementById('askAiSend');

    function openPanel(){ if(panel){ panel.classList.add('is-open'); panel.setAttribute('aria-hidden','false'); } }
    function closePanel(){ if(panel){ panel.classList.remove('is-open'); panel.setAttribute('aria-hidden','true'); } }
    if(fab) fab.addEventListener('click', openPanel);
    if(closeBtn) closeBtn.addEventListener('click', closePanel);

    function addMsg(role, text){
        if(!messagesEl) return;
        var div = document.createElement('div');
        div.className = 'ask-ai-msg ask-ai-msg-' + role;
        div.textContent = text;
        messagesEl.appendChild(div);
        messagesEl.scrollTop = messagesEl.scrollHeight;
    }
    function setLoading(on){ if(sendBtn) sendBtn.disabled = on; sendBtn.textContent = on ? '...' : 'Send'; }
    if(sendBtn && inputEl){
        sendBtn.addEventListener('click', function(){ send(); });
        inputEl.addEventListener('keydown', function(e){ if(e.key === 'Enter') send(); });
    }
    function send(){
        var text = (inputEl && inputEl.value) ? inputEl.value.trim() : '';
        if(!text) return;
        addMsg('user', text);
        if(inputEl) inputEl.value = '';
        setLoading(true);
        var messages = [];
        messagesEl.querySelectorAll('.ask-ai-msg-user, .ask-ai-msg-assistant').forEach(function(el){
            messages.push({ role: el.classList.contains('ask-ai-msg-user') ? 'user' : 'assistant', content: el.textContent });
        });
        fetch(OPENROUTER_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + OPENROUTER_API_KEY, 'HTTP-Referer': location.origin + '/' },
            body: JSON.stringify({ model: OPENROUTER_MODEL, messages: messages })
        }).then(function(r){ return r.json(); }).then(function(data){
            setLoading(false);
            if (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) {
                addMsg('assistant', data.choices[0].message.content);
                return;
            }
            var errMsg = data.error && data.error.message ? data.error.message : 'No response';
            if (errMsg === 'User not found' || (data.error && data.error.code === 401)) {
                errMsg = 'API key invalid or revoked. Please create a new key at https://openrouter.ai/keys and update OPENROUTER_API_KEY in ai-assistant.js and index.html.';
            }
            addMsg('assistant', errMsg);
        }).catch(function(err){
            setLoading(false);
            addMsg('assistant', 'Network or request error: ' + (err.message || 'Check your connection.'));
        });
    }
})();
