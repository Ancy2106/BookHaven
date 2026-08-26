//Protected pages

function requireLogin() {
    if (localStorage.getItem("loggedIn") !== "true") {
        alert("Please login first");
        window.location.href = "Login.html";
    }
}

//Protect Admin

function protectAdmin() {
    const loggedIn = localStorage.getItem("loggedIn");
    const role = localStorage.getItem("role");

    if (loggedIn !== "true" || role !== "admin") {
        alert("Access denied. Admin only!");
        window.location.href = "Home.html";
    }
}


//Admin

const ADMIN_EMAIL = "admin@bookhaven.com";
const ADMIN_PASSWORD = "admin123";


// ===================== Books Data =====================
let books = JSON.parse(localStorage.getItem("books")) || [
    { id: 1, title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", price: 599, category: "Fiction", image: "Images/Harry Potter and the Sacerer's Stone.jpg", description: "Harry Potter has spent most of his life feeling unwanted and ordinary—until his eleventh birthday changes everything. Living with his unkind relatives, the Dursleys, Harry has no idea that he is destined for a world filled with magic, mystery, and adventure. When he receives an invitation to attend Hogwarts School of Witchcraft and Wizardry, Harry discovers the truth about his past and his extraordinary abilities.<br><br> At Hogwarts, Harry befriends Ron Weasley and Hermione Granger, forming a powerful bond based on loyalty, bravery, and friendship. As he learns spells, flies on broomsticks, and explores the magical castle, Harry also begins to uncover secrets hidden within its walls. A mysterious object known as the Sorcerer’s Stone becomes the center of a dangerous plot—one that threatens not only Hogwarts but the entire wizarding world.<br><br>This novel explores themes of identity, courage, friendship, and the choice between good and evil. It introduces readers to a richly imagined universe filled with unforgettable characters, magical creatures, and timeless lessons. Harry Potter and the Sorcerer’s Stone is a captivating beginning to one of the most beloved fantasy series of all time, perfect for readers of all ages." },
    { id: 2, title: "The Fellowship of the Ring", author: "J. R. R. Tolkien", price: 599, category: "Fantasy", image: "Images/Lord of the Rings.jpg", description: "In a quiet corner of Middle-earth, a small and unassuming hobbit named Frodo Baggins inherits a mysterious ring—one that holds unimaginable power and a terrible secret. Crafted by the Dark Lord Sauron, the One Ring has the ability to corrupt hearts and enslave the world if it falls into the wrong hands.<br><br> Guided by the wise wizard Gandalf, Frodo sets out on a perilous journey to destroy the Ring in the fires of Mount Doom. Along the way, a Fellowship is formed, bringing together hobbits, men, an elf, a dwarf, and a ranger—each bound by loyalty, sacrifice, and a shared mission. Their journey takes them through ancient forests, towering mountains, and lands shadowed by evil.<br><br>The Fellowship of the Ring is a timeless tale of courage, friendship, and the struggle between good and evil. Rich in mythology and imagination, it lays the foundation for one of the greatest fantasy epics ever written." },
    { id: 3, title: "The Catcher in the Rye", author: "J. D. Salinger", price: 699, category: "Fiction", image: "Images/The Catcher in the Rye.jpg", description: "The Catcher in the Rye follows the thoughts and experiences of Holden Caulfield, a troubled teenager navigating the confusion, loneliness, and hypocrisy he sees in the adult world. Recently expelled from school, Holden wanders through New York City, reflecting on his fears, frustrations, and desire to protect innocence in a world he believes is increasingly fake.<br><br> Through Holden’s candid and emotional narration, the novel explores themes of identity, alienation, mental health, and the painful transition from childhood to adulthood. His struggles resonate deeply with readers who have ever felt misunderstood or disconnected.<br><br>This classic novel remains one of the most influential works of modern literature, offering a raw and honest portrayal of teenage rebellion and emotional vulnerability." },
    { id: 4, title: "Atomic Habits", author: "James Clear", price: 499, category: "Motivation", image: "Images/Atomic Habits.png", description: "The Catcher in the Rye follows the thoughts and experiences of Holden Caulfield, a troubled teenager navigating the confusion, loneliness, and hypocrisy he sees in the adult world. Recently expelled from school, Holden wanders through New York City, reflecting on his fears, frustrations, and desire to protect innocence in a world he believes is increasingly fake.<br><br> Through Holden’s candid and emotional narration, the novel explores themes of identity, alienation, mental health, and the painful transition from childhood to adulthood. His struggles resonate deeply with readers who have ever felt misunderstood or disconnected.<br><br>This classic novel remains one of the most influential works of modern literature, offering a raw and honest portrayal of teenage rebellion and emotional vulnerability." },
    { id: 5, title: "The Alchemist", author: "Paulo Coelho", price: 399, category: "Fiction", image: "Images/Alchemist.jpg", description: "The Alchemist tells the inspiring story of Santiago, a young shepherd who dreams of discovering treasure beyond his homeland. Guided by mysterious signs and wise mentors, Santiago embarks on a journey across deserts and distant lands in search of his Personal Legend.<br><br> Along the way, he learns profound lessons about courage, faith, love, and listening to one’s heart. The story emphasizes that true fulfillment comes not from material wealth, but from following one’s dreams and understanding the deeper meaning of life.<br><br>This philosophical novel has touched millions of readers worldwide, offering timeless wisdom and encouragement to pursue one’s destiny." },
    { id: 6, title: "Pride and Prejudice", author: "Jane Austen", price: 399, category: "Romance", image: "Images/Pride and Prejudice.jpg", description: "Pride and Prejudice is a classic romantic novel centered on Elizabeth Bennet, a sharp-witted and independent woman navigating issues of marriage, morality, and social expectations in 19th-century England. When she meets the wealthy and reserved Mr. Darcy, misunderstandings and judgments stand in the way of love.<br><br> Through clever dialogue and memorable characters, Jane Austen explores themes of pride, prejudice, class, and personal growth. As Elizabeth and Darcy confront their own flaws, they learn the importance of humility and self-reflection.<br><br>This beloved novel remains a timeless exploration of love and human nature, celebrated for its humor, intelligence, and emotional depth." },
    { id: 7, title: "Wings of Fire", author: "A. P. J. Abdul Kalam", price: 350, category: "Biography", image: "Images/Wings of Fire.jpg", description: "Wings of Fire is the inspiring autobiography of Dr. A. P. J. Abdul Kalam, one of India’s most respected scientists and former Presidents. From his humble beginnings in a small town to his leadership in India’s space and missile programs, Kalam shares his journey of perseverance and dedication.<br><br> The book highlights the importance of hard work, discipline, teamwork, and dreaming big. Kalam’s experiences serve as powerful lessons for students and professionals alike, encouraging readers to overcome obstacles and contribute meaningfully to society.<br><br>Wings of Fire is not just a life story—it is a source of motivation and national pride." },
    { id: 8, title: "Clean Code", author: "Robert C. Martin", price: 699, category: "Programming", image: "Images/Clean Code.jpg", description: "Clean Code is an essential guide for software developers who want to write readable, maintainable, and professional code. Robert C. Martin explains why clean code matters and how poor coding practices can slow development and introduce errors.<br><br> Through practical examples and clear principles, the book covers naming conventions, functions, classes, error handling, and testing. It emphasizes discipline, craftsmanship, and responsibility in software development.<br><br>This book is a must-read for programmers at any level who want to improve code quality and build systems that stand the test of time." },
    { id: 9, title: "The Great Gatsby", author: "F. Scott Fitzgerald", price: 699, category: "Fiction", image: "Images/The Great Gatsby.jpg", featured: true, description: "The Great Gatsby is a powerful portrayal of ambition, love, and the illusion of the American Dream. Set in the 1920s, the novel follows the mysterious millionaire Jay Gatsby and his obsession with the beautiful Daisy Buchanan.<br><br> Narrated by Nick Carraway, the story reveals a world of wealth, excess, and moral decay beneath glamorous appearances. Gatsby’s pursuit of love and status ultimately exposes the emptiness behind material success.<br><br>This literary classic remains a timeless critique of society, exploring themes of desire, identity, and the cost of chasing dreams." },
    { id: 10, title: "To Kill a Mockingbird", author: "Harper Lee", price: 499, category: "Fiction", image: "Images/To Kill a Mocking Bird.jpg", featured: true, description: "Set in the racially divided American South, To Kill a Mockingbird follows young Scout Finch as she grows up witnessing injustice and moral courage. Her father, Atticus Finch, defends an innocent Black man accused of a terrible crime, standing firm against prejudice and hatred.<br><br> Through a child’s perspective, the novel addresses themes of racism, empathy, and integrity. It challenges readers to see the world through compassion and understanding.<br><br>This deeply moving novel remains one of the most important works in modern literature, teaching timeless lessons about justice and humanity." },
    { id: 11, title: "The Book Thief", author: "Markus Zusak", price: 399, category: "Fiction", image: "Images/The Book Thief.jpg", featured: true, description: "Set in Nazi Germany during World War II, The Book Thief tells the story of Liesel Meminger, a young girl who finds comfort in stealing books and sharing stories during a time of great suffering. Narrated uniquely by Death, the novel offers a haunting yet compassionate view of humanity.<br><br> As Liesel forms bonds with her foster parents and hides a Jewish man in her basement, words become her refuge and weapon against cruelty. The story highlights the power of language, love, and resilience.<br><br>This unforgettable novel is a deeply emotional exploration of loss, hope, and the endurance of the human spirit." },
    { id: 12, title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", price: 349, category: "Finance", image: "Images/Rich Dad Poor Dad.png", featured: true, description: "Rich Dad Poor Dad challenges traditional beliefs about money, work, and education through the contrasting philosophies of two father figures in Robert Kiyosaki’s life. One represents conventional thinking, while the other teaches financial independence and wealth building.<br><br> The book explains key concepts such as assets versus liabilities, financial literacy, and investing for the future. Kiyosaki emphasizes the importance of mindset and taking control of one’s financial life.<br><br>This bestselling personal finance book inspires readers to rethink money and take steps toward long-term financial freedom." },

];

//login

function register() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (!name || !email || !password) {
        alert("Please fill all fields");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.find(u => u.email === email)) {
        alert("Email already registered");
        return;
    }

    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created successfully!");
    window.location.href = "Login.html";
}

function logout() {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("currentUser");       // email
    localStorage.removeItem("currentUserName");   // display name
    localStorage.removeItem("role");

    window.location.href = "Login.html";
}




function loginUser() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.email === email && u.password === password);


    // ADMIN LOGIN
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("currentUser", ADMIN_EMAIL);
        localStorage.setItem("currentUserName", "Admin");
        localStorage.setItem("role", "admin");

        window.location.href = "admin.html";
        return;
    }

    // NORMAL USER LOGIN
    if (!user) {
        alert("No account found. Please register first.");
        return;
    }

    if (email === user.email && password === user.password) {
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("currentUser", user.email);
        localStorage.setItem("currentUserName", user.name);
        localStorage.setItem("role", "user");

        window.location.href = "Home.html";
    } else {
        alert("Invalid email or password");
    }
}


document.addEventListener("DOMContentLoaded", function () {
    const loginLink = document.getElementById("loginLink");
    if (!loginLink) return;

    const isLoggedIn = localStorage.getItem("loggedIn") === "true";
    const name = localStorage.getItem("currentUserName");

    if (isLoggedIn && name) {
        loginLink.textContent = "👋 " + name;
        loginLink.href = "#";
        loginLink.style.pointerEvents = "none";
    } else {
        loginLink.textContent = "Login";
        loginLink.href = "Login.html";
        loginLink.style.pointerEvents = "auto";
    }
});




//Admin Books

function addBook() {
    const title = document.getElementById("adminTitle").value;
    const author = document.getElementById("adminAuthor").value;
    const price = document.getElementById("adminPrice").value;
    const category = document.getElementById("adminCategory").value;
    const image = document.getElementById("adminImage").value;
    const description = document.getElementById("adminDescription").value;
    const featured = document.getElementById("adminFeatured").checked;

    if (!title || !author || !price || !category || !image || !description) {
        alert("Fill all fields");
        return;
    }

    const newBook = {
        id: Date.now(),
        title,
        author,
        price,
        category,
        image,
        description,
        featured
    };

    books.push(newBook);
    localStorage.setItem("books", JSON.stringify(books));
    alert("Book added!");
    renderAdminBooks();
}

function renderAdminBooks() {
    const container = document.getElementById("adminBooks");
    if (!container) return;

    container.innerHTML = "";

    books.forEach(book => {
        container.innerHTML += `
        <tr>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>₹${book.price}</td>
            <td>${book.category}</td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="deleteBook(${book.id})">Delete</button>
            </td>
        </tr>`;
    });
}

function deleteBook(id) {
    if (!confirm("Delete this book?")) return;

    books = books.filter(book => book.id !== id);
    localStorage.setItem("books", JSON.stringify(books));
    renderAdminBooks();
}

document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("adminBooks")) {
        renderAdminBooks();
    }
});


// ===================== BOOK DETAILS =====================
function loadBookDetails() {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get("id"));
    const book = books.find(b => b.id === id);
    const container = document.getElementById("bookDetailsContainer");
    if (!book || !container) return;

    container.innerHTML = `
        <div class="row g-4">
            <div class="col-md-4 text-center">
                <img src="${book.image}" class="img-fluid rounded" alt="${book.title}">
            </div>
            <div class="col-md-8">
                <h2>${book.title}</h2>
                <h5>${book.author}</h5>
                <p class="fw-bold">₹${book.price}</p>
                <p>Category: ${book.category}</p>
                <p>Description: ${book.description}</p>
                <button class="btn btn-success" onclick="addToCart(${book.id})">Add to Cart</button>
                <button class="btn btn-outline-danger" onclick="addToWishlist(${book.id})">❤️ Add to Wishlist</button>
                <a href="Books.html" class="btn btn-secondary ms-2">Back to Books</a>
            </div>
        </div>
    `;
}

document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("bookDetailsContainer")) {
        loadBookDetails();
    }
});

// ===================== ADMIN =====================
function addBookAdmin(newBook) {
    newBook.id = Date.now();
    books.push(newBook);
    localStorage.setItem("books", JSON.stringify(books));
    alert("Book added successfully!");
}


//Book Details of home page

function viewBookDetails(id) {
    window.location.href = `BookDetails.html?id=${id}`;
}


// HOME FEATURED BOOKS

function loadFeaturedBooks() {
    const container = document.getElementById("featuredBooks");
    if (!container) return;

    const featured = books.filter(book => book.featured === true);

    if (featured.length === 0) {
        container.innerHTML = "<p class='text-center'>No featured books</p>";
        return;
    }

    container.innerHTML = featured.map(book => `
        <div class="col-12 col-sm-6 col-lg-3">
            <div class="card h-100 shadow-sm">
                <img src="${book.image}" class="card-img-top" style="height:260px; object-fit:cover">
                <div class="card-body text-center">
                    <h6>${book.title}</h6>
                    <p class="small text-muted">${book.author}</p>
                    <p class="fw-bold">₹${book.price}</p>

                    <button class="btn btn-primary btn-sm"
                        onclick="viewBookDetails(${book.id})">
                        View
                    </button>

                    <button class="btn btn-outline-danger btn-sm ms-2"
                        onclick="addToWishlist(${book.id})">❤️</button>
                </div>
            </div>
        </div>
    `).join("");
}


document.addEventListener("DOMContentLoaded", function () {
    loadFeaturedBooks();
    loadBookDetails();
});

// ===================== SEARCH + FILTER =====================
function renderBooks(filterCategory = 'all', searchText = '') {
    const booksContainer = document.querySelector('.books-container');
    if (!booksContainer) return;

    booksContainer.innerHTML = '';

    const filtered = books.filter(book =>
        (filterCategory === 'all' || book.category === filterCategory) &&
        (book.title.toLowerCase().includes(searchText.toLowerCase()))
    );

    filtered.forEach(book => {
        const col = document.createElement('div');
        col.className = 'col-md-4 mb-4';
        col.innerHTML = `
            <div class="card h-100">
                <img src="${book.image}" class="card-img-top" alt="${book.title}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${book.title}</h5>
                    <p class="card-text">${book.author}</p>
                    <p class="card-text fw-bold">₹${book.price}</p>
                    <div class="mt-auto d-flex flex-column gap-2">
                        <button class="btn btn-primary btn-sm" onclick="viewBookDetails(${book.id})">View Details</button>
                        <button class="btn btn-success btn-sm" onclick="addToCart(${book.id})">Add to Cart</button>
                        <button class="btn btn-outline-danger btn-sm" onclick="addToWishlist(${book.id})">❤️</button>
                    </div>
                </div>
            </div>
        `;
        booksContainer.appendChild(col);
    });
}

const searchBox = document.getElementById('searchBox');
const categoryFilter = document.getElementById('categoryFilter');

if (searchBox && categoryFilter) {
    searchBox.addEventListener('input', () => renderBooks(categoryFilter.value, searchBox.value));
    categoryFilter.addEventListener('change', () => renderBooks(categoryFilter.value, searchBox.value));
    renderBooks();
}



// Check if user is logged in
function isUserLoggedIn() {
    return localStorage.getItem("loggedIn") === "true";
}

// Get the logged-in user's email or unique identifier
function getUserEmail() {
    return localStorage.getItem("currentUser"); // This must store user email or unique ID
}


// ===================== CART LOGIC =====================

// Get the cart for the current user
function getCart() {
    const email = getUserEmail();
    return JSON.parse(localStorage.getItem("cart_" + email)) || [];
}

// Save the cart for the current user
function saveCart(cart) {
    const email = getUserEmail();
    localStorage.setItem("cart_" + email, JSON.stringify(cart));
}

// Add book to cart
function addToCart(id) {
    if (!isUserLoggedIn()) {
        alert("Please login to continue");
        window.location.href = "Login.html";
        return;
    }

    const cart = getCart();
    const book = books.find(b => b.id === id);
    if (!book) return;

    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...book, quantity: 1 });
    }

    saveCart(cart);
    updateCartCount();
    alert(`${book.title} added to your cart ✅`);
}

// Remove book from cart
function removeFromCart(id) {
    const cart = getCart().filter(item => item.id !== id);
    saveCart(cart);
    renderCart();
    updateCartCount();
}

// Render cart page dynamically
function renderCart() {
    if (!isUserLoggedIn()) {
        alert("Please login to view your cart");
        window.location.href = "Login.html";
        return;
    }

    const cart = getCart();
    const container = document.getElementById("cartItems");
    const subtotalEl = document.getElementById("subtotal");
    const totalEl = document.getElementById("total");
    if (!container) return;

    container.innerHTML = "";
    let subtotal = 0;

    cart.forEach(item => {
        subtotal += item.price * item.quantity;
        container.innerHTML += `
        <div class="card mb-3 shadow-sm">
            <div class="row g-0 align-items-center">
                <div class="col-4 col-md-3 text-center">
                    <img src="${item.image}" class="img-fluid p-2" alt="${item.title}">
                </div>
                <div class="col-8 col-md-6">
                    <div class="card-body">
                        <h5>${item.title}</h5>
                        <p>${item.author}</p>
                        <p>₹${item.price}</p>
                        <p>Qty: ${item.quantity}</p>
                    </div>
                </div>
                <div class="col-12 col-md-3 text-center mb-2 mb-md-0">
                    <button onclick="removeFromCart(${item.id})" class="btn btn-danger btn-sm">Remove</button>
                </div>
            </div>
        </div>
        `;
    });

    subtotalEl.textContent = "₹" + subtotal;
    totalEl.textContent = "₹" + (subtotal + 50); // Example shipping
}

// Update the cart icon/badge
function updateCartCount() {
    if (!isUserLoggedIn()) return;

    const cart = getCart();
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.getElementById("cartCount");
    if (badge) badge.textContent = count;
}

// Checkout
function checkout() {
    if (!isUserLoggedIn()) {
        alert("Please login to proceed with checkout");
        window.location.href = "Login.html";
        return;
    }

    const cart = getCart();
    if (cart.length === 0) {
        alert("Your cart is empty");
        return;
    }

    alert("Checkout successful ✅");
    saveCart([]);
    renderCart();
    updateCartCount();
}


// ===================== Wishlist Logic =====================
// Get wishlist for current user
function getWishlist() {
    const email = getUserEmail();
    return JSON.parse(localStorage.getItem("wishlist_" + email)) || [];
}

// Save wishlist for current user
function saveWishlist(wishlist) {
    const email = getUserEmail();
    localStorage.setItem("wishlist_" + email, JSON.stringify(wishlist));
}

// Add to wishlist
function addToWishlist(id) {
    if (!isUserLoggedIn()) {
        alert("Please login to continue");
        window.location.href = "Login.html";
        return;
    }

    const wishlist = getWishlist();
    const book = books.find(b => b.id === id);
    if (!book) return;

    if (!wishlist.find(b => b.id === id)) {
        wishlist.push(book);
        saveWishlist(wishlist);
        alert(`${book.title} added to wishlist ❤️`);
    } else {
        alert(`${book.title} is already in your wishlist`);
    }
}

// Remove from wishlist
function removeFromWishlist(id) {
    const wishlist = getWishlist().filter(b => b.id !== id);
    saveWishlist(wishlist);
    renderWishlist();
}

// Render wishlist page
function renderWishlist() {
    if (!isUserLoggedIn()) {
        alert("Please login to view your wishlist");
        window.location.href = "Login.html";
        return;
    }

    const wishlist = getWishlist();
    const container = document.getElementById("wishlistItems");
    if (!container) return;

    if (wishlist.length === 0) {
        container.innerHTML = "<p class='text-center fs-5'>Your wishlist is empty ❤️</p>";
        return;
    }

    container.innerHTML = wishlist.map(book => `
        <div class="col-md-4 mb-3">
            <div class="card shadow-sm h-100">
                <img src="${book.image}" class="card-img-top" alt="${book.title}" style="height:250px; object-fit:cover;">
                <div class="card-body d-flex flex-column text-center">
                    <h5>${book.title}</h5>
                    <p class="text-muted">${book.author}</p>
                    <p class="fw-bold">₹${book.price}</p>
                    <div class="mt-auto d-flex justify-content-center gap-2">
                        <button class="btn btn-success btn-sm" onclick="addToCart(${book.id})">Add to Cart</button>
                        <button class="btn btn-danger btn-sm" onclick="removeFromWishlist(${book.id})">Remove</button>
                    </div>
                </div>
            </div>
        </div>
    `).join("");
}

document.addEventListener("DOMContentLoaded", () => {

    updateCartCount();   // allowed everywhere

    // Run Cart logic ONLY on Cart.html
    if (document.getElementById("cartItems")) {
        renderCart();
    }

    // Run Wishlist logic ONLY on Wishlist.html
    if (document.getElementById("wishlistItems")) {
        renderWishlist();
    }

});


