// // Firebase v11 Imports
// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.1/firebase-app.js";
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   onAuthStateChanged
// } from "https://www.gstatic.com/firebasejs/11.10.1/firebase-auth.js";
// import {
//   getDatabase,
//   ref,
//   set,
//   push,
//   onValue
// } from "https://www.gstatic.com/firebasejs/11.10.1/firebase-database.js";
// import {
//   getStorage,
//   ref as sRef,
//   uploadBytes,
//   getDownloadURL
// } from "https://www.gstatic.com/firebasejs/11.10.1/firebase-storage.js";

// // Firebase Config
// const firebaseConfig = {
//     apiKey: "AIzaSyAhuw6KcKSzNwpYiweozyOl2wgGONl_QIk",
//     authDomain: "shopping-img-storage.firebaseapp.com",
//     projectId: "shopping-img-storage",
//     storageBucket: "shopping-img-storage.appspot.com",
//     messagingSenderId: "136290316818",
//     appId: "1:136290316818:web:1b9e9e503dc8c0dabd5ecb",
//     measurementId: "G-F21WW65X6C"
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const database = getDatabase(app);
// const storage = getStorage(app);

// // Register User
// document.getElementById('signup-btn').addEventListener('click', () => {
//   const email = document.getElementById('signup-email').value;
//   const password = document.getElementById('signup-password').value;

//   createUserWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       alert('Signup successful');
//       window.location.href = 'login.html'; // Adjust as needed
//     })
//     .catch((error) => {
//       alert(error.message);
//     });
// });

// // Login User
// document.getElementById('login-btn').addEventListener('click', () => {
//   const email = document.getElementById('login-email').value;
//   const password = document.getElementById('login-password').value;

//   signInWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       alert('Login successful');
//       window.location.href = 'home.html'; // Adjust as needed
//     })
//     .catch((error) => {
//       alert(error.message);
//     });
// });

// // Upload Profile Info
// document.getElementById('save-profile-btn')?.addEventListener('click', () => {
//   const username = document.getElementById('username').value;
//   const whatsapp = document.getElementById('whatsapp').value;
//   const profileImage = document.getElementById('profile-pic').files[0];

//   const user = auth.currentUser;
//   if (!user) return alert("User not logged in");

//   const storageRef = sRef(storage, `profiles/${user.uid}/${profileImage.name}`);
//   uploadBytes(storageRef, profileImage)
//     .then(snapshot => getDownloadURL(snapshot.ref))
//     .then(url => {
//       set(ref(database, `users/${user.uid}`), {
//         username,
//         whatsapp,
//         profilePic: url
//       });
//       alert("Profile saved!");
//     });
// });

// // Upload Product
// document.getElementById('upload-product-btn')?.addEventListener('click', () => {
//   const imageFile = document.getElementById('product-image').files[0];
//   const price = document.getElementById('product-price').value;
//   const user = auth.currentUser;
//   if (!user) return alert("User not logged in");

//   const storageRef = sRef(storage, `products/${user.uid}/${imageFile.name}`);
//   uploadBytes(storageRef, imageFile)
//     .then(snapshot => getDownloadURL(snapshot.ref))
//     .then(imageUrl => {
//       const productRef = push(ref(database, 'products'));
//       set(productRef, {
//         imageUrl,
//         price,
//         sellerId: user.uid
//       });
//       alert("Product uploaded!");
//     });
// });

// // Display Products
// function loadProducts() {
//   const container = document.getElementById('product-container');
//   if (!container) return;

//   const productRef = ref(database, 'products');
//   onValue(productRef, snapshot => {
//     container.innerHTML = "";
//     snapshot.forEach(child => {
//       const data = child.val();
//       const card = document.createElement('div');
//       card.className = "product-card";
//       card.innerHTML = `
//         <img src="${data.imageUrl}" />
//         <p>Price: ${data.price}</p>
//         <button onclick="contactSeller('${data.sellerId}')">Order</button>
//       `;
//       container.appendChild(card);
//     });
//   });
// }

// // WhatsApp Contact
// window.contactSeller = function (sellerId) {
//   const userRef = ref(database, `users/${sellerId}`);
//   onValue(userRef, snapshot => {
//     const data = snapshot.val();
//     if (data && data.whatsapp) {
//       const phone = data.whatsapp.replace(/\D/g, '');
//       window.open(`https://wa.me/${phone}`, '_blank');
//     } else {
//       alert("Seller WhatsApp not found");
//     }
//   }, {
//     onlyOnce: true
//   });
// }

// // Auto-load products on page load (home.html)
// onAuthStateChanged(auth, user => {
//   if (user) {
//     loadProducts();
//   }
// });
