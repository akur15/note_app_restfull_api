const API_BASE_URL = 'https://notes-api.dicoding.dev/v2';

// Fungsi untuk mendapatkan daftar catatan
async function getNotes() {
  try {
    const response = await fetch(`${API_BASE_URL}/notes`);
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error('Gagal mengambil catatan:', error);
    return [];
  }
}

// Fungsi untuk menambahkan catatan baru
async function addNote(note) {
  try {
    const response = await fetch(`${API_BASE_URL}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    });
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error('Gagal menambahkan catatan:', error);
    return null;
  }
}

// Fungsi untuk menghapus catatan
async function deleteNote(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
      method: 'DELETE',
    });
    return response.ok;
  } catch (error) {
    console.error('Gagal menghapus catatan:', error);
    return false;
  }
}

// Fungsi untuk memformat tanggal
function formatDate(dateString) {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  return new Date(dateString).toLocaleDateString('id-ID', options);
}

// Indikator Loading sebagai Web Component
class LoadingIndicator extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .loading {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
        }
        .spinner {
          border: 4px solid #f3f3f3;
          border-top: 4px solid var(--primary-color);
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>
      <div class="loading">
        <div class="spinner"></div>
      </div>
    `;
  }
}

customElements.define('loading-indicator', LoadingIndicator);

let loadingElement = null;

function showLoading() {
  if (!loadingElement) {
    loadingElement = document.createElement('loading-indicator');
    document.body.appendChild(loadingElement);
  }
}

function hideLoading() {
  if (loadingElement) {
    loadingElement.remove();
    loadingElement = null;
  }
}

// Custom Element: App Header
class AppHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['title', 'subtitle'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const title = this.getAttribute('title') || 'App Title';
    const subtitle = this.getAttribute('subtitle') || '';

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
        }
        header {
          background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
          color: white;
          padding: 1.5rem;
          text-align: center;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        h1 {
          font-size: 2.25rem;
          font-weight: 700;
          margin: 0;
        }
        p {
          font-size: 1.125rem;
          opacity: 0.9;
          margin-top: 0.5rem;
        }
      </style>
      <header>
        <h1>${title}</h1>
        ${subtitle ? `<p>${subtitle}</p>` : ''}
      </header>
    `;
  }
}

// Custom Element: Note Form
class NoteForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  setupEventListeners() {
    const form = this.shadowRoot.querySelector('form');
    const titleInput = this.shadowRoot.querySelector('#title');
    const bodyInput = this.shadowRoot.querySelector('#body');

    titleInput.addEventListener('input', () => {
      this.validateTitle(titleInput);
    });

    bodyInput.addEventListener('input', () => {
      this.validateBody(bodyInput);
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const title = titleInput.value;
      const body = bodyInput.value;

      const isTitleValid = this.validateTitle(titleInput);
      const isBodyValid = this.validateBody(bodyInput);

      if (isTitleValid && isBodyValid) {
        showLoading();
        const newNote = { title, body };
        const result = await addNote(newNote);
        if (result) {
          form.reset();
          renderNotes();
          this.showMessage('Catatan berhasil ditambahkan!', 'success');
        } else {
          this.showMessage('Gagal menambahkan catatan.', 'error');
        }
        hideLoading();
      }
    });
  }

  validateTitle(titleInput) {
    const errorElement = this.shadowRoot.querySelector('#title-error');
    if (titleInput.value.trim() === '') {
      errorElement.textContent = 'Judul tidak boleh kosong';
      titleInput.classList.add('error');
      return false;
    } else if (titleInput.value.length > 50) {
      errorElement.textContent = 'Judul tidak boleh lebih dari 50 karakter';
      titleInput.classList.add('error');
      return false;
    } else {
      errorElement.textContent = '';
      titleInput.classList.remove('error');
      return true;
    }
  }

  validateBody(bodyInput) {
    const errorElement = this.shadowRoot.querySelector('#body-error');
    if (bodyInput.value.trim() === '') {
      errorElement.textContent = 'Isi catatan tidak boleh kosong';
      bodyInput.classList.add('error');
      return false;
    } else {
      errorElement.textContent = '';
      bodyInput.classList.remove('error');
      return true;
    }
  }

  showMessage(message, type) {
    const messageElement = this.shadowRoot.querySelector('#message');
    messageElement.textContent = message;
    messageElement.className = type === 'success' ? 'message success' : 'message error';
    messageElement.style.display = 'block';

    setTimeout(() => {
      messageElement.style.display = 'none';
    }, 3000);
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          margin-top: 2rem;
        }
        .form-container {
          background-color: white;
          border-radius: 0.75rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          padding: 1.5rem;
        }
        .form-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--primary-color);
          margin-bottom: 1rem;
        }
        .form-group {
          margin-bottom: 1rem;
        }
        label {
          display: block;
          font-weight: 500;
          margin-bottom: 0.5rem;
          color: var(--dark-color);
        }
        input, textarea {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #CBD5E1;
          border-radius: 0.375rem;
          font-size: 1rem;
          transition: all 0.3s ease;
        }
        input:focus, textarea:focus {
          outline: none;
          border-color: var(--primary-color);
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.2);
        }
        .error {
          border-color: var(--error-color);
        }
        .error-text {
          color: var(--error-color);
          font-size: 0.875rem;
          margin-top: 0.25rem;
        }
        .char-count {
          font-size: 0.75rem;
          color: #64748B;
          text-align: right;
          margin-top: 0.25rem;
        }
        button {
          background-color: var(--primary-color);
          color: white;
          border: none;
          border-radius: 0.375rem;
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        button:hover {
          background-color: var(--secondary-color);
          transform: translateY(-2px);
        }
        button:active {
          transform: translateY(0);
        }
        .message {
          display: none;
          margin-top: 1rem;
          padding: 0.75rem;
          border-radius: 0.375rem;
          font-size: 0.875rem;
        }
        .success {
          background-color: #DCFCE7;
          color: #166534;
        }
        .error {
          background-color: #FEE2E2;
          color: #991B1B;
        }
      </style>
      <div class="form-container">
        <h2 class="form-title">Tambah Catatan Baru</h2>
        <form id="note-form">
          <div class="form-group">
            <label for="title">Judul</label>
            <input 
              type="text" 
              id="title" 
              placeholder="Masukkan judul catatan..." 
              maxlength="50"
            >
            <div class="error-text" id="title-error"></div>
            <div class="char-count">
              <span id="title-char-count">0</span>/50
            </div>
          </div>
          <div class="form-group">
            <label for="body">Isi Catatan</label>
            <textarea 
              id="body" 
              rows="5" 
              placeholder="Tuliskan catatan Anda di sini..."
            ></textarea>
            <div class="error-text" id="body-error"></div>
          </div>
          <button type="submit">Simpan Catatan</button>
        </form>
        <div id="message"></div>
      </div>
    `;

    const titleInput = this.shadowRoot.querySelector('#title');
    const charCount = this.shadowRoot.querySelector('#title-char-count');

    titleInput.addEventListener('input', () => {
      charCount.textContent = titleInput.value.length;
    });
  }
}

// Custom Element: Note Card
class NoteCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['title', 'body', 'created-at', 'note-id'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  setupEventListeners() {
    const deleteBtn = this.shadowRoot.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', async () => {
      const noteId = this.getAttribute('note-id');
      showLoading();
      const success = await deleteNote(noteId);
      if (success) {
        renderNotes();
      } else {
        alert('Gagal menghapus catatan.');
      }
      hideLoading();
    });
  }

  render() {
    const title = this.getAttribute('title') || 'Untitled';
    const body = this.getAttribute('body') || 'No content';
    const createdAt = this.getAttribute('created-at') || new Date().toISOString();
    const formattedDate = formatDate(createdAt);

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        .note-card {
          background-color: white;
          border-radius: 0.75rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          overflow: hidden;
          transition: all 0.3s ease;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .note-card:hover {
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          transform: translateY(-5px);
        }
        .note-header {
          padding: 1.25rem;
          background-color: var(--light-color);
          border-bottom: 1px solid #E2E8F0;
        }
        .note-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--primary-color);
          margin: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .note-date {
          font-size: 0.75rem;
          color: #64748B;
          margin-top: 0.5rem;
        }
        .note-body {
          padding: 1.25rem;
          flex-grow: 1;
          color: var(--dark-color);
          line-height: 1.5;
        }
        .note-body p {
          margin: 0;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 5;
          -webkit-box-orient: vertical;
        }
        .note-footer {
          padding: 1rem;
          border-top: 1px solid #E2E8F0;
          display: flex;
          justify-content: flex-end;
        }
        .delete-btn {
          background-color: #EF4444;
          color: white;
          border: none;
          border-radius: 0.375rem;
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .delete-btn:hover {
          background-color: #DC2626;
        }
      </style>
      <div class="note-card">
        <div class="note-header">
          <h3 class="note-title">${title}</h3>
          <div class="note-date">${formattedDate}</div>
        </div>
        <div class="note-body">
          <p>${body}</p>
        </div>
        <div class="note-footer">
          <button class="delete-btn">Hapus</button>
        </div>
      </div>
    `;
  }
}

// Custom Element: App Footer
class AppFooter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['copyright', 'author'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const copyright = this.getAttribute('copyright') || '© 2023';
    const author = this.getAttribute('author') || '';

    this.shadowJune();
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
        }
        footer {
          background-color: var(--dark-color);
          color: white;
          padding: 1.5rem;
          text-align: center;
        }
        .footer-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }
        .copyright {
          font-size: 0.875rem;
          opacity: 0.8;
        }
        .author {
          font-size: 0.875rem;
          opacity: 0.8;
        }
      </style>
      <footer>
        <div class="footer-content">
          <div class="copyright">${copyright}</div>
          ${author ? `<div class="author">${author}</div>` : ''}
        </div>
      </footer>
    `;
  }
}

// Register custom elements
customElements.define('app-header', AppHeader);
customElements.define('note-form', NoteForm);
customElements.define('note-card', NoteCard);
customElements.define('app-footer', AppFooter);

// Function to render notes
async function renderNotes() {
  const notesContainer = document.getElementById('notes-container');
  notesContainer.innerHTML = '';

  showLoading();
  const notes = await getNotes();
  hideLoading();

  if (notes.length === 0) {
    const emptyState = document.createElement('div');
    emptyState.className = 'col-span-full text-center p-8 bg-white rounded-lg shadow';
    emptyState.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" style="margin: 0 auto; height: 3rem; width: 3rem; color: var(--gray-400);" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <h3 style="margin-top: 0.5rem; font-size: 1.125rem; font-weight: 500; color: var(--gray-900);">Belum ada catatan</h3>
      <p style="margin-top: 0.25rem; font-size: 0.875rem; color: var(--gray-500);">Mulai tambahkan catatan baru dengan mengisi form di atas.</p>
    `;
    notesContainer.appendChild(emptyState);
    return;
  }

  notes.forEach(note => {
    const noteCard = document.createElement('note-card');
    noteCard.setAttribute('title', note.title);
    noteCard.setAttribute('body', note.body);
    noteCard.setAttribute('created-at', note.createdAt);
    noteCard.setAttribute('note-id', note.id);
    notesContainer.appendChild(noteCard);
  });
}

// Initial render
document.addEventListener('DOMContentLoaded', () => {
  renderNotes();
});