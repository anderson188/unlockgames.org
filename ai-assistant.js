(function(){
    var AI_ASSISTANT_API_URL = 'https://unlockgames-ai-proxy.2420133012.workers.dev';

    if (document.getElementById('askAiFloat')) return;

    var html = '<div class="ask-ai-float" id="askAiFloat">' +
        '<div class="ask-ai-quick-messages" id="askAiQuickMessages"></div>' +
        '<div class="ask-ai-quick-row">' +
        '<input type="text" class="ask-ai-quick-input" id="askAiQuickInput" placeholder="Ask AI..." autocomplete="off" data-i18n="askAiQuickPh">' +
        '<button type="button" class="ask-ai-quick-send" id="askAiQuickSend" data-i18n-aria="askAiSendAria" aria-label="Send">&#8594;</button>' +
        '</div>' +
        '<button type="button" class="ask-ai-fab" id="askAiFab" data-i18n-aria="askAiFabAria" aria-label="Need help? Open chat with Ava">' +
        '<span class="ask-ai-fab-inner">' +
        '<span class="ask-ai-ava-sparkles" aria-hidden="true">' +
        '<span class="ask-ai-spark ask-ai-spark-lg">&#10022;</span>' +
        '<span class="ask-ai-spark ask-ai-spark-s1">&#10022;</span>' +
        '<span class="ask-ai-spark ask-ai-spark-s2">&#10022;</span>' +
        '</span>' +
        '<span class="ask-ai-ava-text" data-i18n="askAiExpand">Need help? Ask Ava</span>' +
        '</span>' +
        '</button>' +
        '</div>' +
        '<div class="ask-ai-panel" id="askAiPanel" aria-hidden="true" style="width: 360px;">' +
        '<div class="ask-ai-resize-handle" id="askAiResizeHandle" aria-label="Drag to resize"></div>' +
        '<div class="ask-ai-header">' +
        '<span class="ask-ai-title" data-i18n="askAiTitle">AI Assistant</span>' +
        '<div class="ask-ai-header-actions">' +
        '<button type="button" class="ask-ai-maximize" id="askAiMaximize" data-i18n-title="askAiMaxTitle" title="Expand">&#10535;</button>' +
        '<button type="button" class="ask-ai-close" id="askAiClose" data-i18n-aria="askAiCloseAria" aria-label="Close">&times;</button>' +
        '</div></div>' +
        '<div class="ask-ai-messages" id="askAiMessages"></div>' +
        '<div class="ask-ai-input-row">' +
        '<input type="text" class="ask-ai-input" id="askAiInput" placeholder="Type your question..." autocomplete="off" data-i18n="askAiTypePh">' +
        '<button type="button" class="ask-ai-send" id="askAiSend" data-i18n="sendBtn">Send</button>' +
        '</div></div>';

    var wrap = document.createElement('div');
    wrap.innerHTML = html;
    while (wrap.firstChild) document.body.appendChild(wrap.firstChild);

    var fab = document.getElementById('askAiFab');
    var panel = document.getElementById('askAiPanel');
    var closeBtn = document.getElementById('askAiClose');
    var messagesEl = document.getElementById('askAiMessages');
    var inputEl = document.getElementById('askAiInput');
    var sendBtn = document.getElementById('askAiSend');
    var quickInput = document.getElementById('askAiQuickInput');
    var quickSend = document.getElementById('askAiQuickSend');
    var resizeHandle = document.getElementById('askAiResizeHandle');
    var maximizeBtn = document.getElementById('askAiMaximize');
    var PANEL_MIN = 320, PANEL_MAX = 95;
    var savedPanelWidth = 360;

    function openPanel(){ if(panel){ panel.classList.add('is-open'); panel.setAttribute('aria-hidden','false'); } }
    function closePanel(){ if(panel){ panel.classList.remove('is-open'); panel.setAttribute('aria-hidden','true'); } }
    if(fab) fab.addEventListener('click', openPanel);
    if(closeBtn) closeBtn.addEventListener('click', closePanel);

    function sendFromQuick(){
        var text = quickInput && quickInput.value ? quickInput.value.trim() : '';
        if(!text) return;
        if(inputEl) inputEl.value = text;
        if(quickInput) quickInput.value = '';
        send();
    }
    if(quickSend && quickInput){ quickSend.addEventListener('click', sendFromQuick); quickInput.addEventListener('keydown', function(e){ if(e.key === 'Enter') sendFromQuick(); }); }

    if(resizeHandle && panel){
        resizeHandle.addEventListener('mousedown', function(e){
            e.preventDefault();
            var startX = e.clientX, startW = panel.offsetWidth;
            document.body.style.userSelect = 'none';
            document.body.style.cursor = 'ew-resize';
            function onMove(e){ var dx = startX - e.clientX; var vw = (window.innerWidth || document.documentElement.clientWidth) / 100; var w = Math.max(PANEL_MIN, Math.min(startW + dx, (PANEL_MAX * vw))); panel.style.width = w + 'px'; savedPanelWidth = w; }
            function onUp(){ document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp); document.body.style.userSelect = ''; document.body.style.cursor = ''; }
            document.addEventListener('mousemove', onMove);
            document.addEventListener('mouseup', onUp);
        });
    }
    if(maximizeBtn && panel){
        maximizeBtn.addEventListener('click', function(){
            if(panel.classList.contains('ask-ai-maximized')){ panel.classList.remove('ask-ai-maximized'); panel.style.width = savedPanelWidth + 'px'; maximizeBtn.title = 'Expand'; maximizeBtn.textContent = '\u2922'; }
            else{ panel.classList.add('ask-ai-maximized'); panel.style.width = ''; maximizeBtn.title = 'Restore'; maximizeBtn.textContent = '\u2921'; }
        });
    }

    var quickMessagesEl = document.getElementById('askAiQuickMessages');
    var floatEl = document.getElementById('askAiFloat');
    function addMsg(role, text){
        var div = document.createElement('div');
        div.className = 'ask-ai-msg ask-ai-msg-' + role;
        div.textContent = text;
        if(messagesEl){ messagesEl.appendChild(div); messagesEl.scrollTop = messagesEl.scrollHeight; }
        if(quickMessagesEl){ quickMessagesEl.appendChild(div.cloneNode(true)); quickMessagesEl.scrollTop = quickMessagesEl.scrollHeight; if(floatEl) floatEl.classList.add('has-chat'); }
    }
    function setLoading(on){
        if (!sendBtn) return;
        sendBtn.disabled = on;
        if (on) {
            if (sendBtn.dataset._sendLabel == null) sendBtn.dataset._sendLabel = sendBtn.textContent;
            sendBtn.textContent = '...';
        } else {
            sendBtn.textContent = sendBtn.dataset._sendLabel != null ? sendBtn.dataset._sendLabel : 'Send';
        }
    }
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
