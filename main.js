document.addEventListener('DOMContentLoaded', function () {
  const products = [
    {
      id: 1,
      title: "Atomic Habits: Build Good Habits & Break Bad Ones",
      description: "The #1 New York Times bestseller.<hr>Over 20 million copies sold! Tiny Changes, Remarkable ResultsNo matter your goals, Atomic Habits offers a proven framework for improving every day.James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.",
      price: 50000,
      image: "images/buku1.jpg",
      category: "Psychology, Personal Development"
    },
    {
      id: 2,
      title: "Deep Work: Rules for Focused Success in a Distracted World",
      description: "Master one of our economy’s most rare skills and achieve groundbreaking results with this “exciting” book (Daniel H. Pink) from an “exceptional” author (New York Times Book Review)<hr> Deep Work is the ability to focus intensely on demanding tasks, enabling quick mastery of complex information and improved productivity. This skill enhances performance and brings fulfillment, acting as a competitive advantage in today's fast-paced economy.",
      price: 70000,
      image: "images/buku2.jpg",
      category: "Education, Job Hunting & Careers"
    },
    {
      id: 3,
      title: "Making Learning Whole: How Seven Principles of Teaching Can Transform Education",
      description: "New in Paperback! Make learning more meaningful by teaching the 'whole game'<hr>'Making Learning Whole' by David Perkins advocates for teaching through the 'whole game' approach, where students learn more effectively by understanding the big picture. Perkins outlines seven principles to enhance learning, including motivating students, focusing on challenging areas, and promoting self-directed learning for deeper engagement and mastery.",
      price: 65000,
      image: "images/buku3.jpg",
      category: "Education, Teaching"
    },
    {
      id: 4,
      title: "Range: Why Generalists Triumph in a Specialized World",
      description: "The #1 New York Times bestseller that has all America talking—with a new afterword on expanding your range—as seen on CNN's Fareed Zakaria GPS, Morning Joe, CBS This Morning, and more.<hr>David Epstein examined the world's most successful athletes, artists, musicians, inventors, forecasters and scientists. He discovered that in most fields, especially those that are complex and unpredictable -generalists, not specialists, are primed to excel. Generalists often find their path late, and they juggle many interests rather than focusing on one.",
      price: 35000,
      image: "images/buku4.jpg",
      category: "Bussiness, Psychology"
    },
    {
      id: 5,
      title: "AI and Machine Learning for Coders: A Programmer's Guide to Artificial Intelligence",
      description: "Rated 4.6 out of 5 stars by #223 readers, this book has won high praise for its clarity and practical approach—making it a trusted resource for aspiring AI specialists <hr> Laurence Moroney’s introductory book provides a hands-on, code-first approach for programmers transitioning to AI, covering key machine learning applications like computer vision, NLP, and sequence modeling across web, mobile, and cloud platforms—without overwhelming you with advanced math.",
      price: 85000,
      image: "images/buku5.jpg",
      category: "Technology"
    },
    {
      id: 6,
      title: "Web Scalability for Startup Engineers",
      description: "Design and build scalable web applications quickly <hr> 'Web Scalability for Startup Engineers' provides a practical guide to building scalable web applications. It covers core principles of software design, front-end scalability, RESTful APIs, data layer scaling, caching, asynchronous processing, and search optimization. The book also touches on automation, agile teams, and project management for scalability in startup environments.",
      price: 95000,
      image: "images/buku7.jpg",
      category: "Education, Technology, Business"
    }
  ];

  // DOM Elements
  const container = document.getElementById('product-list');
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const showRegister = document.getElementById('showRegister');
  const showLogin = document.getElementById('showLogin');
  const loginButton = document.querySelector('.btn-login');
  const cartCountElement = document.getElementById('cartCount');
  const shoppingCartLink = document.querySelector('.shopping-cart');
  const productModal = document.getElementById('productModal');
  let isLoggedIn = false;

  // Event Listeners
  showRegister.addEventListener('click', () => toggleForms(true));
  showLogin.addEventListener('click', () => toggleForms(false));
  loginForm.onsubmit = handleLoginSubmit;
  registerForm.onsubmit = handleRegisterSubmit;

  // Initial Load
  window.onload = () => {
    fetchProducts();
    updateCartDisplay();
  };

  // Function to format price in IDR
  function formatPrice(price) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(price);
  }

  // Fetch products from server
  function fetchProducts() {
    fetch('http://localhost:3000/ambil')
      .then(response => response.json())
      .then(data => {
        console.log('Data received from server:', data); // Debug log
        displayProducts(data);
      })
      .catch(error => console.error('Error fetching products:', error));
  }

  // Display products in the container
  function displayProducts(products) {
    console.log('Products in displayProducts:', products);

    container.innerHTML = products.map(product => {
      console.log('Individual product:', product);
      return `
      <div class="col www">
        <div class="card h-100 shadow-sm">
          <img src="${product.image}" class="card-img-top" alt="${product.title}">
          <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text">${product.summary}</p>
            <p class="card-text text-danger fw-bold">${formatPrice(product.price)}</p>
            <button class="btn btn-primary" 
                    data-bs-toggle="modal" 
                    data-bs-target="#productModal" 
                    onclick="showProductDetails(${product.id})">
              Detail
            </button>
          </div>
        </div>
      </div>
    `;
    }).join('');
  }

  // Show product details in modal
  window.showProductDetails = function (productId) {
    console.log('showProductDetails called with ID:', productId);

    const product = products.find(p => p.id === productId);
    console.log('Found product:', product); // Debug log

    if (!product) {
      console.error('Product not found for ID:', productId);
      return;
    }

    const modalContent = `
    <div class="modal-header">
      <h5 class="modal-title">${product.title}</h5>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
      <div class="row">
        <div class="col-md-6">
          <img src="${product.image}" class="img-fluid rounded" alt="${product.title}">
        </div>
        <div class="col-md-6">
          <p>${product.description || 'No description available'}</p>
          <p class="text-danger fw-bold fs-4">${formatPrice(product.price)}</p>
          <p class="text-muted">Category: ${product.category}</p>
          <button class="btn btn-primary w-100" onclick="addToCart(${product.id})">
            Beli Produk Ini
          </button>
        </div>
      </div>
    </div>
  `;

    const modalElement = document.querySelector('#productModal .modal-content');
    console.log('Modal element:', modalElement); // Debug log
    modalElement.innerHTML = modalContent;
  }

  // Add product to cart
  window.addToCart = function (productId) {
    const cartCount = document.getElementById('cartCount');
    const currentCount = parseInt(cartCount.textContent.match(/\d+/)[0]);
    cartCount.textContent = `(${currentCount + 1})`;
    alert('Product added to cart!');
  };

  // Toggle between login and registration forms
  function toggleForms(showRegisterForm) {
    if (showRegisterForm) {
      loginForm.classList.add('d-none');
      registerForm.classList.remove('d-none');
      document.getElementById('loginModalLabel').innerText = 'Register an Account';
      return;
    }

    registerForm.classList.add('d-none');
    loginForm.classList.remove('d-none');
    document.getElementById('loginModalLabel').innerText = 'Login to Your Account';
  }

  // Handle login form submission
  function handleLoginSubmit(e) {
    e.preventDefault();
    alert('Login berhasil!');

    isLoggedIn = true;
    loginButton.style.display = 'none';
    updateCartDisplay();

    bootstrap.Modal.getInstance(document.getElementById('loginModal')).hide();
  }

  // Handle registration form submission
  function handleRegisterSubmit(e) {
    e.preventDefault();
    alert('Pendaftaran berhasil!');

    isLoggedIn = true;
    loginButton.style.display = 'none';
    updateCartDisplay();

    bootstrap.Modal.getInstance(document.getElementById('loginModal')).hide();
  }

  // Logout function
  function logout() {
    isLoggedIn = false;
    loginButton.style.display = 'inline-block';
    updateCartDisplay();
  }

  // Update cart display based on login state
  function updateCartDisplay() {
    shoppingCartLink.style.display = isLoggedIn ? 'inline-block' : 'none';
    cartCountElement.innerText = isLoggedIn ? cartCountElement.innerText : '(0)';
  }
});