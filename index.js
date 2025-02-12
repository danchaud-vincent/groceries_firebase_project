// html el (buttons, inputs, list)
const inputEl = document.getElementById("input-el")
const addBtn = document.getElementById("add-btn")
const removeLastBtn = document.getElementById("remove-last-btn")
const deleteAllBtn = document.getElementById("delete-all-btn")
const ulEl = document.getElementById("ulEl")

// firebase app
const DATABASE_URL = "https://groceries-app-bcf2e-default-rtdb.europe-west1.firebasedatabase.app/"

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js"
import { getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js"
    
// Your web app's Firebase configuration
const firebaseConfig = {
    databaseURL: DATABASE_URL
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// database and reference
const database = getDatabase(app)
const refDatabase = ref(database, "groceries")



// add button event
addBtn.addEventListener("click", function(){
    
    // push into the database
    push(refDatabase, inputEl.value)

    // clear input value
    inputEl.value = ""
})

// delete all button event
deleteAllBtn.addEventListener("click", function(){
    remove(refDatabase)
})