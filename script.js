// ================= AUTH SYSTEM =================

// SIGNUP
function signup() {
    let user = document.getElementById("username")?.value;
    let pass = document.getElementById("password")?.value;
    let confirmPass = document.getElementById("confirmPass")?.value;

    if (!user || !pass) {
        alert("Fill all fields");
        return;
    }

    if (confirmPass !== undefined && pass !== confirmPass) {
        alert("Passwords do not match");
        return;
    }

    localStorage.setItem(user, pass);

    alert("Signup successful!");
    window.location.href = "login.html";
}

// LOGIN
function login() {
    let user = document.getElementById("loginUser")?.value;
    let pass = document.getElementById("loginPass")?.value;

    let storedPass = localStorage.getItem(user);

    if (storedPass === pass) {
        localStorage.setItem("loggedInUser", user);
        window.location.href = "index.html";
    } else {
        alert("Invalid credentials");
    }
}

// LOGOUT
function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
}

// CHECK LOGIN (for index page)
function checkLogin() {
    let user = localStorage.getItem("loggedInUser");
    if (!user && window.location.pathname.includes("index.html")) {
        window.location.href = "login.html";
    }
}

checkLogin();


// ================= PASSWORD TOGGLE =================

function togglePassword(inputId, icon) {
    let input = document.getElementById(inputId);

    if (input.type === "password") {
        input.type = "text";
        icon.innerText = "🙈";
    } else {
        input.type = "password";
        icon.innerText = "👁️";
    }
}


// ================= IMAGE SYSTEM =================

function uploadImage() {
    let input = document.getElementById("imageInput");
    let file = input?.files[0];

    if (file) {
        let reader = new FileReader();

        reader.onload = function(e) {
            let images = JSON.parse(localStorage.getItem("images")) || [];
            images.push(e.target.result);

            localStorage.setItem("images", JSON.stringify(images));

            displayImages();
        };

        reader.readAsDataURL(file);
    }
}

function displayImages() {
    let gallery = document.getElementById("gallery");
    if (!gallery) return;

    gallery.innerHTML = "<h2>Gallery</h2>";

    let images = JSON.parse(localStorage.getItem("images")) || [];

    images.forEach(src => {
        let img = document.createElement("img");
        img.src = src;
        gallery.appendChild(img);
    });
}


// ================= POSTS SYSTEM =================

// ADD POST
function addPost() {
    let text = document.getElementById("postText")?.value;

    if (text && text.trim() !== "") {
        let posts = JSON.parse(localStorage.getItem("posts")) || [];

        posts.push({
            text: text,
            likes: 0,
            comments: []
        });

        localStorage.setItem("posts", JSON.stringify(posts));

        displayPosts();
        document.getElementById("postText").value = "";
    }
}

// DISPLAY POSTS
function displayPosts() {
    let container = document.getElementById("posts");
    if (!container) return;

    container.innerHTML = "<h2>Community Posts</h2>";

    let posts = JSON.parse(localStorage.getItem("posts")) || [];

    posts.forEach((p, index) => {
        let div = document.createElement("div");
        div.className = "post-item";

        div.innerHTML = `
            <p>${p.text}</p>
            <button onclick="likePost(${index})">❤️ ${p.likes}</button>

            <div>
                <input type="text" id="comment-${index}" placeholder="Add comment">
                <button onclick="addComment(${index})">Comment</button>
            </div>

            <div id="comments-${index}">
                ${p.comments.map(c => `<p>💬 ${c}</p>`).join("")}
            </div>
        `;

        container.appendChild(div);
    });
}

// LIKE POST
function likePost(index) {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];

    posts[index].likes++;

    localStorage.setItem("posts", JSON.stringify(posts));

    displayPosts();
}

// ADD COMMENT
function addComment(index) {
    let input = document.getElementById(`comment-${index}`);
    let text = input?.value;

    if (text && text.trim() !== "") {
        let posts = JSON.parse(localStorage.getItem("posts")) || [];

        posts[index].comments.push(text);

        localStorage.setItem("posts", JSON.stringify(posts));

        displayPosts();
    }
}


// ================= SEARCH =================

function searchImages() {
    let query = document.getElementById("searchInput")?.value.toLowerCase();

    let images = document.querySelectorAll("#gallery img");

    images.forEach(img => {
        if (img.src.toLowerCase().includes(query)) {
            img.style.display = "inline";
        } else {
            img.style.display = "none";
        }
    });
}


// ================= DARK MODE =================

function toggleDarkMode() {
    document.body.classList.toggle("dark");
}


// ================= LOAD =================

window.onload = function() {
    displayImages();
    displayPosts();
};