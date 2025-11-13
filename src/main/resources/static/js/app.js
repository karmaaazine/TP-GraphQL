// URL de l'endpoint GraphQL
const GRAPHQL_URL = '/graphql';

// Fonction pour exécuter les requêtes GraphQL
async function executeGraphQL(query, variables = {}) {
    try {
        const response = await fetch(GRAPHQL_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query, variables })
        });

        const result = await response.json();

        if (result.errors) {
            console.error('Erreur GraphQL:', result.errors);
            alert('Erreur: ' + result.errors[0].message);
            return null;
        }

        return result.data;
    } catch (error) {
        console.error('Erreur réseau:', error);
        alert('Erreur de connexion au serveur');
        return null;
    }
}

// Charger tous les livres au démarrage
document.addEventListener('DOMContentLoaded', () => {
    loadAllBooks();

    // Gestion du formulaire d'ajout
    document.getElementById('addBookForm').addEventListener('submit', event => {
        event.preventDefault();
        addNewBook();
    });
});

// Charger tous les livres
async function loadAllBooks() {
    const query = `
        query {
            getAllBooks {
                id
                title
                author
                price
                isbn
                category
            }
        }
    `;

    const data = await executeGraphQL(query);
    if (data) {
        displayBooks(data.getAllBooks);
    }
}

// Afficher les livres dans la vue
function displayBooks(books) {
    const booksList = document.getElementById('booksList');
    booksList.innerHTML = '';

    if (books.length === 0) {
        booksList.innerHTML = `
            <div class="col-12">
                <p class="text-muted text-center">Aucun livre trouvé.</p>
            </div>
        `;
        return;
    }

    books.forEach(book => {
        const bookCard = `
            <div class="col-md-4 mb-4">
                <div class="card book-card h-100">
                    <div class="card-body">
                        <h5 class="card-title">${book.title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${book.author}</h6>
                        <p class="card-text">
                            <strong>Prix:</strong> $${book.price}<br>
                            <strong>ISBN:</strong> ${book.isbn}<br>
                            <strong>Catégorie:</strong> ${book.category}
                        </p>
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-sm btn-warning me-2" onclick="editBook('${book.id}')">Modifier</button>
                        <button class="btn btn-sm btn-danger" onclick="deleteBook('${book.id}')">Supprimer</button>
                    </div>
                </div>
            </div>
        `;

        booksList.innerHTML += bookCard;
    });
}

// Ajouter un nouveau livre
async function addNewBook() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const price = parseFloat(document.getElementById('price').value);
    const isbn = document.getElementById('isbn').value;
    const category = document.getElementById('category').value;

    const mutation = `
        mutation CreateBook($title: String!, $author: String!, $price: Float!, $isbn: String!, $category: Category!) {
            createBook(title: $title, author: $author, price: $price, isbn: $isbn, category: $category) {
                id
                title
                author
            }
        }
    `;

    const variables = { title, author, price, isbn, category };
    const data = await executeGraphQL(mutation, variables);

    if (data) {
        alert('Livre ajouté avec succès!');
        document.getElementById('addBookForm').reset();
        loadAllBooks();
    }
}

// Rechercher des livres
async function searchBooks() {
    const searchTerm = document.getElementById('searchInput').value;
    if (!searchTerm) {
        loadAllBooks();
        return;
    }

    const query = `
        query SearchBooks($title: String!) {
            searchBooks(title: $title) {
                id
                title
                author
                price
                isbn
                category
            }
        }
    `;

    const data = await executeGraphQL(query, { title: searchTerm });
    if (data) {
        displayBooks(data.searchBooks);
    }
}

// Filtrer par catégorie
async function filterByCategory() {
    const category = document.getElementById('categoryFilter').value;
    if (!category) {
        loadAllBooks();
        return;
    }

    const query = `
        query GetBooksByCategory($category: Category!) {
            getBooksByCategory(category: $category) {
                id
                title
                author
                price
                isbn
                category
            }
        }
    `;

    const data = await executeGraphQL(query, { category });
    if (data) {
        displayBooks(data.getBooksByCategory);
    }
}

// Supprimer un livre
async function deleteBook(bookId) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce livre?')) {
        return;
    }

    const mutation = `
        mutation DeleteBook($id: ID!) {
            deleteBook(id: $id)
        }
    `;

    const data = await executeGraphQL(mutation, { id: bookId });
    if (data && data.deleteBook) {
        alert('Livre supprimé avec succès!');
        loadAllBooks();
    }
}

// Modifier un livre (version simplifiée)
async function editBook(bookId) {
    const newPrice = prompt('Entrez le nouveau prix:');
    if (newPrice === null) {
        return;
    }

    const mutation = `
        mutation UpdateBook($id: ID!, $price: Float!) {
            updateBook(id: $id, price: $price) {
                id
                title
                price
            }
        }
    `;

    const data = await executeGraphQL(mutation, {
        id: bookId,
        price: parseFloat(newPrice)
    });

    if (data) {
        alert('Prix mis à jour avec succès!');
        loadAllBooks();
    }
}