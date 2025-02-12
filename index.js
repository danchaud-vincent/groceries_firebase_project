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
import { getDatabase, ref, push, onValue, remove, update , child, get } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js"
    
// Your web app's Firebase configuration
const firebaseConfig = {
    databaseURL: DATABASE_URL
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// database and reference
const database = getDatabase(app)
const refDatabase = ref(database, "groceries")


onValue(refDatabase, function(snapshot){

    
    if (snapshot.exists()){

        const snapshotDict = snapshot.val()

        // render
        render(Object.values(snapshotDict))
    }
  
})



// add button event
addBtn.addEventListener("click", function(){

    if (inputEl.value){
        // push into the database
        push(refDatabase, inputEl.value)

        // clear input value
        inputEl.value = ""
    }
})


// delete all button event
deleteAllBtn.addEventListener("click", function(){

    // remove all in database
    remove(refDatabase)
    
    // clear ul
    ulEl.innerHTML = ""

})

// remove last item button event
removeLastBtn.addEventListener("click", function(){

    // get the values
    get(refDatabase).then((snapshot) => {
        if (snapshot.exists()) {
            // get data dict
            const snapshotDict = snapshot.val()
            const dataArray = Object.entries(snapshotDict)

            // remove last items by adding null as value
            dataArray[dataArray.length-1][1] = null

            // create new object
            const updates = Object.fromEntries(dataArray)
            
            // update the database
            update(refDatabase, updates)

            // render the values
            render(Object.values(updates))

        } else {
            console.log("No data available");
        }
      }).catch((error) => {
            console.error(error);
    });

   
})


function render(arr){

    let ulDOM = ""

    for (let i=0; i<arr.length; i++){

        // the value can be null (when we remove an item we set the value to null in the dabase)
        if (arr[i]){
            ulDOM += `<li>${arr[i]}</li>`
        }
        
    }

    ulEl.innerHTML = ulDOM
}