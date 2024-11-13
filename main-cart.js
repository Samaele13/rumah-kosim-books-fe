const books = [
    {
        title: "Atomic Habits: An Easy & Proven Way to Build Good Habits and Break Bad Ones",
        image: "images/buku1.jpg"
    },
    {
        title: "Deep Work: Rules for Focused Success in a Distracted World",
        image: "images/buku2.jpg"
    },
    {
        title: "AI and Machine Learning for Coders: A Programmer’s Guide to Artificial Intelligence",
        image: "images/buku3.jpg"
    }
];

function checkSearch() {
    const searchValue = document.getElementById('searchInput').value.trim().toLowerCase();
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = "";

    if (searchValue) {

        const matchedBooks = books.filter(book => book.title.toLowerCase().includes(searchValue));

        if (matchedBooks.length > 0) {
            matchedBooks.forEach(book => {
                const resultItem = document.createElement('div');
                resultItem.classList.add('d-flex', 'align-items-center', 'mb-2');

                const img = document.createElement('img');
                img.src = book.image;
                img.alt = book.title;
                img.style.width = '40px';
                img.style.height = 'auto';
                img.style.marginRight = '10px';

                const title = document.createElement('span');
                title.textContent = book.title;

                resultItem.appendChild(img);
                resultItem.appendChild(title);

                searchResults.appendChild(resultItem);
            });
            const modal = new bootstrap.Modal(document.getElementById('searchModal'));
            modal.show();
        } else {
            alert("No matching books found.");
        }
    } else {
        alert("Please enter a search term.");
    }
}