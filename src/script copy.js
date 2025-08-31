
// Sample data for notes
const initialNotes = [
  {
    id: 'notes-jT-jjsyz61J8XKiI',
    title: 'Welcome to Notes, Dimas!',
    body: 'Welcome to Notes! This is your first note. You can archive it, delete it, or create new ones.',
    createdAt: '2022-07-28T10:03:12.594Z',
    archived: false,
  },
  {
    id: 'notes-aB-cdefg12345',
    title: 'Meeting Agenda',
    body: 'Discuss project updates and assign tasks for the upcoming week.',
    createdAt: '2022-08-05T15:30:00.000Z',
    archived: false,
  },
  {
    id: 'notes-XyZ-789012345',
    title: 'Shopping List',
    body: 'Milk, eggs, bread, fruits, and vegetables.',
    createdAt: '2022-08-10T08:45:23.120Z',
    archived: false,
  },
  {
    id: 'notes-1a-2b3c4d5e6f',
    title: 'Personal Goals',
    body: 'Read two books per month, exercise three times a week, learn a new language.',
    createdAt: '2022-08-15T18:12:55.789Z',
    archived: false,
  },
  {
    id: 'notes-LMN-456789',
    title: 'Recipe: Spaghetti Bolognese',
    body: 'Ingredients: ground beef, tomatoes, onions, garlic, pasta. Steps:...',
    createdAt: '2022-08-20T12:30:40.200Z',
    archived: false,
  },
  {
    id: 'notes-QwErTyUiOp',
    title: 'Workout Routine',
    body: 'Monday: Cardio, Tuesday: Upper body, Wednesday: Rest, Thursday: Lower body, Friday: Cardio.',
    createdAt: '2022-08-25T09:15:17.890Z',
    archived: false,
  },
  {
    id: 'notes-abcdef-987654',
    title: 'Book Recommendations',
    body: "1. 'The Alchemist' by Paulo Coelho\n2. '1984' by George Orwell\n3. 'To Kill a Mockingbird' by Harper Lee",
    createdAt: '2022-09-01T14:20:05.321Z',
    archived: false,
  },
  {
    id: 'notes-zyxwv-54321',
    title: 'Daily Reflections',
    body: 'Write down three positive things that happened today and one thing to improve tomorrow.',
    createdAt: '2022-09-07T20:40:30.150Z',
    archived: false,
  },
  {
    id: 'notes-poiuyt-987654',
    title: 'Travel Bucket List',
    body: '1. Paris, France\n2. Kyoto, Japan\n3. Santorini, Greece\n4. New York City, USA',
    createdAt: '2022-09-15T11:55:44.678Z',
    archived: false,
  },
  {
    id: 'notes-asdfgh-123456',
    title: 'Coding Projects',
    body: '1. Build a personal website\n2. Create a mobile app\n3. Contribute to an open-source project',
    createdAt: '2022-09-20T17:10:12.987Z',
    archived: false,
  },
  {
    id: 'notes-5678-abcd-efgh',
    title: 'Project Deadline',
    body: 'Complete project tasks by the deadline on October 1st.',
    createdAt: '2022-09-28T14:00:00.000Z',
    archived: false,
  },
  {
    id: 'notes-9876-wxyz-1234',
    title: 'Health Checkup',
    body: 'Schedule a routine health checkup with the doctor.',
    createdAt: '2022-10-05T09:30:45.600Z',
    archived: false,
  },
  {
    id: 'notes-qwerty-8765-4321',
    title: 'Financial Goals',
    body: '1. Create a monthly budget\n2. Save 20% of income\n3. Invest in a retirement fund.',
    createdAt: '2022-10-12T12:15:30.890Z',
    archived: false,
  },
  {
    id: 'notes-98765-54321-12345',
    title: 'Holiday Plans',
    body: 'Research and plan for the upcoming holiday destination.',
    createdAt: '2022-10-20T16:45:00.000Z',
    archived: false,
  },
  {
    id: 'notes-1234-abcd-5678',
    title: 'Language Learning',
    body: 'Practice Spanish vocabulary for 30 minutes every day.',
    createdAt: '2022-10-28T08:00:20.120Z',
    archived: false,
  },
];

// Store notes in local storage
if (!localStorage.getItem('notes')) {
  localStorage.setItem('notes', JSON.stringify(initialNotes));
}

// Function to get notes from storage
function getNotes() {
  return JSON.parse(localStorage.getItem('notes')) || [];
}

// Function to save notes to storage
function saveNotes(notes) {
  localStorage.setItem('notes', JSON.stringify(notes));
}

// Function to format date
function formatDate(dateString) {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date(dateString).toLocaleDateString('id-ID', options);
}

// Function to generate random ID
function generateId() {
  return +new Date();
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

    // Real-time validation for title
    titleInput.addEventListener('input', () => {
      this.validateTitle(titleInput);
    });

    // Real-time validation for body
    bodyInput.addEventListener('input', () => {
      this.validateBody(bodyInput);
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const title = titleInput.value;
      const body = bodyInput.value;

      // Validate inputs before submission
      const isTitleValid = this.validateTitle(titleInput);
      const isBodyValid = this.validateBody(bodyInput);

      if (isTitleValid && isBodyValid) {
        const newNote = {
          id: generateId(),
          title,
          body,
          createdAt: new Date().toISOString(),
          archived: false
        };

        const notes = getNotes();
        notes.push(newNote);
        saveNotes(notes);

        // Reset form
        form.reset();

        // Update notes display
        renderNotes();

        // Show success message
        this.showMessage('Catatan berhasil ditambahkan!', 'success');
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
    messageElement.className = type === 'success'
      ? 'message success'
      : 'message error';
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

    // Setup character counter for title
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
    deleteBtn.addEventListener('click', () => {
      const noteId = parseInt(this.getAttribute('note-id'));
      this.deleteNote(noteId);
    });
  }

  deleteNote(id) {
    const notes = getNotes();
    const updatedNotes = notes.filter(note => note.id !== id);
    saveNotes(updatedNotes);
    renderNotes();
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
function renderNotes() {
  const notesContainer = document.getElementById('notes-container');
  const notes = getNotes();

  notesContainer.innerHTML = '';

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