const State = {
    currentView: 'editor',
    stories: JSON.parse(localStorage.getItem('nf_stories') || '[]'),
    activeStory: null
};

// Basic Markdown-ish Parser
function parseMarkdown(text) {
    return text
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
        .replace(/\*(.*)\*/gim, '<em>$1</em>')
        .replace(/\n/gim, '<br>');
}

const DOM = {
    views: {
        dashboard: document.getElementById('view-dashboard'),
        editor: document.getElementById('view-editor'),
        reader: document.getElementById('view-reader')
    },
    btns: {
        library: document.getElementById('btn-library'),
        write: document.getElementById('btn-write'),
        save: document.getElementById('btn-save'),
        preview: document.getElementById('btn-preview-toggle'),
        new: document.getElementById('btn-new-story')
    },
    editor: {
        title: document.getElementById('story-title'),
        input: document.getElementById('markdown-input'),
        preview: document.getElementById('markdown-preview'),
        wordCount: document.getElementById('word-count')
    },
    reader: {
        title: document.getElementById('reader-title'),
        body: document.getElementById('reader-body')
    },
    grid: document.getElementById('story-grid')
};

function switchView(viewName) {
    Object.keys(DOM.views).forEach(v => DOM.views[v].classList.add('hidden'));
    DOM.views[viewName].classList.remove('hidden');
    State.currentView = viewName;
    if(viewName === 'dashboard') renderLibrary();
}

function renderLibrary() {
    DOM.grid.innerHTML = '';
    State.stories.forEach((s, idx) => {
        const card = document.createElement('div');
        card.className = 'story-card';
        card.innerHTML = `<h3>${s.title || 'Untitled'}</h3><p>${s.content.substring(0, 50)}...</p>`;
        card.onclick = () => loadStory(idx);
        DOM.grid.appendChild(card);
    });
}

function loadStory(index) {
    const s = State.stories[index];
    DOM.reader.title.innerText = s.title;
    DOM.reader.body.innerHTML = parseMarkdown(s.content);
    switchView('reader');
}

function saveStory() {
    const story = {
        title: DOM.editor.title.value,
        content: DOM.editor.input.value,
        updated: new Date().toISOString()
    };
    State.stories.push(story);
    localStorage.setItem('nf_stories', JSON.stringify(State.stories));
    alert('Story saved to library!');
    switchView('dashboard');
}

// Events
DOM.btns.library.onclick = () => switchView('dashboard');
DOM.btns.write.onclick = () => switchView('editor');
DOM.btns.save.onclick = saveStory;
DOM.btns.new.onclick = () => {
    DOM.editor.title.value = '';
    DOM.editor.input.value = '';
    switchView('editor');
};

DOM.btns.preview.onclick = () => {
    const isPreview = !DOM.editor.preview.classList.contains('hidden');
    if (isPreview) {
        DOM.editor.preview.classList.add('hidden');
        DOM.editor.input.classList.remove('hidden');
    } else {
        DOM.editor.preview.innerHTML = parseMarkdown(DOM.editor.input.value);
        DOM.editor.preview.classList.remove('hidden');
        DOM.editor.input.classList.add('hidden');
    }
};

DOM.editor.input.oninput = (e) => {
    const words = e.target.value.trim().split(/\s+/).length;
    DOM.editor.wordCount.innerText = `${words} words`;
};

// Init
switchView('editor');