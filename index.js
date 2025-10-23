const postsContainer = document.querySelector('#posts');
const loadButton = document.querySelector('#loadButton');

loadButton.addEventListener('click', () => {
    loadButton.disabled = true;
    loadButton.textContent = "Загрузка..";

    fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }

            response.json().then(posts => {
                postsContainer.innerHTML = '';

                posts.forEach(post => {
                    const div = document.createElement('div');
                    div.classList.add('section');

                    div.innerHTML = `
                        <h2>${post.title}</h2>
                        <p>${post.body}</p>
                    `;

                    postsContainer.appendChild(div);
                })
            });
        }).catch(error => {
        postsContainer.innerHTML = `<p style="color:red;">Ошибка: ${error.message}</p>`;
    }).finally(() => {
        loadButton.disabled = false;
        loadButton.textContent = "Загрузить посты";
    })
})