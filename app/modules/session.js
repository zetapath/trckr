const el = document.getElementById('session');

export default el ? JSON.parse(el.innerHTML) : undefined;
