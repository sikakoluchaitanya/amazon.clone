const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Generic fetch wrapper with error handling
async function fetchAPI(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;

    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const response = await fetch(url, { ...defaultOptions, ...options });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Request failed' }));
        throw new Error(error.error || 'Something went wrong');
    }

    return response.json();
}

// Products API
export const productsAPI = {
    getAll: (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return fetchAPI(`/products${queryString ? `?${queryString}` : ''}`);
    },
    getById: (id) => fetchAPI(`/products/${id}`),
};

// Categories API
export const categoriesAPI = {
    getAll: () => fetchAPI('/categories'),
    getById: (id) => fetchAPI(`/categories/${id}`),
};

// Cart API
export const cartAPI = {
    get: () => fetchAPI('/cart'),
    add: (productId, quantity = 1) => fetchAPI('/cart', {
        method: 'POST',
        body: JSON.stringify({ productId, quantity }),
    }),
    update: (id, quantity) => fetchAPI(`/cart/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ quantity }),
    }),
    remove: (id) => fetchAPI(`/cart/${id}`, { method: 'DELETE' }),
    clear: () => fetchAPI('/cart', { method: 'DELETE' }),
};

// Orders API
export const ordersAPI = {
    create: (shippingData) => fetchAPI('/orders', {
        method: 'POST',
        body: JSON.stringify(shippingData),
    }),
    getAll: () => fetchAPI('/orders'),
    getById: (id) => fetchAPI(`/orders/${id}`),
};

// Wishlist API
export const wishlistAPI = {
    get: () => fetchAPI('/wishlist'),
    add: (productId) => fetchAPI('/wishlist', {
        method: 'POST',
        body: JSON.stringify({ productId }),
    }),
    remove: (productId) => fetchAPI(`/wishlist/${productId}`, { method: 'DELETE' }),
    check: (productId) => fetchAPI(`/wishlist/check/${productId}`),
    toggle: (productId) => fetchAPI('/wishlist/toggle', {
        method: 'POST',
        body: JSON.stringify({ productId }),
    }),
};
