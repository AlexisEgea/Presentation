// Shorthand for querySelector with optional root scope.
export function qs(selector, root = document) {
    return root.querySelector(selector);
}

// Shorthand for querySelectorAll that always returns a plain array.
export function qsa(selector, root = document) {
    return Array.from(root.querySelectorAll(selector));
}
