const API_BASE_URL = 'http://localhost:8080/api/inventory';

// State
let currentEditId = null;
let allItems = [];

// DOM Elements
const form = document.getElementById('inventory-form');
const formTitle = document.getElementById('form-title');
const submitBtn = document.getElementById('submit-btn');
const cancelBtn = document.getElementById('cancel-btn');
const itemsContainer = document.getElementById('items-container');
const loadingEl = document.getElementById('loading');
const errorMessageEl = document.getElementById('error-message');
const searchInput = document.getElementById('search-name');
const categoryFilter = document.getElementById('filter-category');
const refreshBtn = document.getElementById('refresh-btn');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadItems();
    setupEventListeners();
});

function setupEventListeners() {
    form.addEventListener('submit', handleSubmit);
    cancelBtn.addEventListener('click', resetForm);
    refreshBtn.addEventListener('click', loadItems);
    searchInput.addEventListener('input', filterItems);
    categoryFilter.addEventListener('change', filterItems);
}

// API Functions
async function loadItems() {
    try {
        showLoading(true);
        hideError();

        const response = await fetch(API_BASE_URL);
        if (!response.ok) throw new Error('Failed to load items');

        allItems = await response.json();
        populateCategoryFilter();
        displayItems(allItems);
    } catch (error) {
        showError('Failed to load inventory items. Make sure the server is running.');
        console.error('Error loading items:', error);
    } finally {
        showLoading(false);
    }
}

async function createItem(data) {
    const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create item');
    }

    return response.json();
}

async function updateItem(id, data) {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update item');
    }

    return response.json();
}

async function deleteItem(id) {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE'
    });

    if (!response.ok) {
        throw new Error('Failed to delete item');
    }
}

// Event Handlers
async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(form);
    const data = {
        name: formData.get('name'),
        description: formData.get('description'),
        quantity: parseInt(formData.get('quantity')),
        price: parseFloat(formData.get('price')),
        category: formData.get('category')
    };

    try {
        if (currentEditId) {
            await updateItem(currentEditId, data);
            showSuccess('Item updated successfully!');
        } else {
            await createItem(data);
            showSuccess('Item created successfully!');
        }

        resetForm();
        loadItems();
    } catch (error) {
        showError(error.message);
        console.error('Error saving item:', error);
    }
}

function editItem(item) {
    currentEditId = item.id;

    document.getElementById('item-id').value = item.id;
    document.getElementById('name').value = item.name;
    document.getElementById('description').value = item.description || '';
    document.getElementById('quantity').value = item.quantity;
    document.getElementById('price').value = item.price;
    document.getElementById('category').value = item.category;

    formTitle.textContent = 'Edit Item';
    submitBtn.textContent = 'Update Item';
    cancelBtn.style.display = 'inline-block';

    // Scroll to form
    form.scrollIntoView({ behavior: 'smooth' });
}

async function handleDelete(id, name) {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) {
        return;
    }

    try {
        await deleteItem(id);
        showSuccess('Item deleted successfully!');
        loadItems();
    } catch (error) {
        showError(error.message);
        console.error('Error deleting item:', error);
    }
}

function resetForm() {
    currentEditId = null;
    form.reset();
    formTitle.textContent = 'Add New Item';
    submitBtn.textContent = 'Add Item';
    cancelBtn.style.display = 'none';
}

// Display Functions
function displayItems(items) {
    if (items.length === 0) {
        itemsContainer.innerHTML = `
            <div class="empty-state">
                <h3>No items found</h3>
                <p>Add your first inventory item using the form above</p>
            </div>
        `;
        return;
    }

    itemsContainer.innerHTML = items.map(item => `
        <div class="item-card">
            <h3>${escapeHtml(item.name)}</h3>
            <span class="category-badge">${escapeHtml(item.category)}</span>
            <p class="description">${escapeHtml(item.description || 'No description')}</p>

            <div class="item-details">
                <div class="detail-item">
                    <span class="detail-label">Quantity</span>
                    <span class="detail-value">${item.quantity}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Price</span>
                    <span class="detail-value">$${parseFloat(item.price).toFixed(2)}</span>
                </div>
            </div>

            <div class="item-actions">
                <button class="btn btn-edit" onclick="editItem(${JSON.stringify(item).replace(/"/g, '&quot;')})">
                    Edit
                </button>
                <button class="btn btn-delete" onclick="handleDelete(${item.id}, '${escapeHtml(item.name)}')">
                    Delete
                </button>
            </div>
        </div>
    `).join('');
}

function populateCategoryFilter() {
    const categories = [...new Set(allItems.map(item => item.category))].sort();

    categoryFilter.innerHTML = '<option value="">All Categories</option>' +
        categories.map(cat => `<option value="${escapeHtml(cat)}">${escapeHtml(cat)}</option>`).join('');
}

function filterItems() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;

    const filtered = allItems.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm);
        const matchesCategory = !selectedCategory || item.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    displayItems(filtered);
}

// UI Helper Functions
function showLoading(show) {
    loadingEl.style.display = show ? 'block' : 'none';
    itemsContainer.style.display = show ? 'none' : 'grid';
}

function showError(message) {
    errorMessageEl.textContent = message;
    errorMessageEl.style.display = 'block';
    setTimeout(() => hideError(), 5000);
}

function hideError() {
    errorMessageEl.style.display = 'none';
}

function showSuccess(message) {
    const successEl = document.createElement('div');
    successEl.className = 'success-message';
    successEl.textContent = message;

    const mainEl = document.querySelector('main');
    mainEl.insertBefore(successEl, mainEl.firstChild);

    setTimeout(() => successEl.remove(), 3000);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Profile Dropdown Toggle
function toggleProfileMenu() {
    const dropdown = document.getElementById('profileDropdown');
    const trigger = document.querySelector('.profile-trigger');

    dropdown.classList.toggle('show');
    trigger.classList.toggle('active');
}

// Close dropdown when clicking outside
document.addEventListener('click', (event) => {
    const userProfile = document.querySelector('.user-profile');
    const dropdown = document.getElementById('profileDropdown');
    const trigger = document.querySelector('.profile-trigger');

    if (userProfile && !userProfile.contains(event.target)) {
        if (dropdown) dropdown.classList.remove('show');
        if (trigger) trigger.classList.remove('active');
    }
});

// Make functions globally accessible
window.editItem = editItem;
window.handleDelete = handleDelete;
window.toggleProfileMenu = toggleProfileMenu;
