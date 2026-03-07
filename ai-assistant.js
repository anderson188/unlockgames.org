(function(){
    var AI_ASSISTANT_API_URL = 'https://unlockgames-ai-proxy.2420133012.workers.dev';

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
        if (!AI_ASSISTANT_API_URL) {
            setLoading(false);
            addMsg('assistant', 'Please set AI_ASSISTANT_API_URL in ai-assistant.js to your Cloudflare Worker URL. See cf-worker/README.md');
            return;
        }
        fetch(AI_ASSISTANT_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages: messages })
        }).then(function(r){ return r.json(); }).then(function(data){
            setLoading(false);
            if (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) {
                addMsg('assistant', data.choices[0].message.content);
                return;
            }
            var errMsg = data.error && data.error.message ? data.error.message : 'No response';
            if (errMsg === 'User not found' || (data.error && data.error.code === 401)) {
                errMsg = 'API key invalid. Set OPENROUTER_API_KEY in CF Worker: npx wrangler secret put OPENROUTER_API_KEY';
            }
            addMsg('assistant', errMsg);
        }).catch(function(err){
            setLoading(false);
            addMsg('assistant', 'Network or request error: ' + (err.message || 'Check your connection and Worker URL.'));
        });
    }
})();
