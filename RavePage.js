/* Name: Matthew Heger
    Class: CSC 337 
   Date: 4/14/2019
   This is the Javascript file for the mymdb CSC 337 Assignment  */

   "use strict";
   (function () {
    window.onload = function () {
    console.log("start"); 
    let header = document.getElementById("banner"); 
    let button = document.getElementById("search"); 

    header.onclick = Clear; 
    header.onmouseover = MouseOver; 
    header.onmouseout = MouseOut; 

    button.onclick = Search; 
    Fetch(); 
   };

   function Clear() {
    let singlediv = document.getElementById("singlediv"); 
    let searchbox = document.getElementById("searchinput"); 

    searchbox.style.backgroundColor = "white"; 
    singlediv.innerHTML = ""; 
    document.getElementById("ravebox").innerHTML = ""; 
    Fetch(); 
   }

   function Search() {
    let searchbox = document.getElementById("searchinput"); 
    let radio = document.getElementsByName("search"); 
    let singlediv = document.getElementById("singlediv"); 

    singlediv.innerHTML = ""; 

    let regex = new RegExp("[^A-Z^a-z^ ]+"); //Check if input contains any bad characters 
    let match = searchbox.value.match(regex); //find bad characters in searchbox

    if (match) {
        console.log("Not a Valid Input"); 
        searchbox.style.backgroundColor = "red"; 
    }
    else {
        console.log("Valid:)"); 

        searchbox.style.backgroundColor = "green"; 
        let words = searchbox.value.split(" "); 
        let state = ""; 
        
        
        for(let m = 0; m < words.length; m++) {  //Replace with underscores to put in url
            if (m == words.length - 1) {
                if (radio[0].checked) {
                words[m] = words[m].charAt(0).toUpperCase() + words[m].slice(1).toLowerCase(); 
                }
                state = state + words[m]; 
            }
            else {
                if (radio[0].checked) {
                words[m] = words[m].charAt(0).toUpperCase() + words[m].slice(1).toLowerCase();
                }
                state = state + words[m] + "_"; 
            }
        }

        if(radio[0].checked) {

            let url = "http://u-crave-raves.herokuapp.com/?mode=location&name=" + state;
            fetch(url) //Start fetching description for description mode 
            .then(checkStatus)
            .then(function (responseText) {
            let raves = JSON.parse(responseText); 
            let RaveBox = document.getElementById("ravebox"); 
            RaveBox.innerHTML = "";
            if (raves.length < 1) {
                RaveBox.innerHTML = "There are no raves matching your search"; 
            }
            else {
            for (let i = 0; i < raves.length; i++) {
                let ravediv = document.createElement("div");
                ravediv.id = raves[i].folder;
                ravediv.onmouseover = MouseOver;
                ravediv.onclick = Click;
                ravediv.onmouseout = MouseOut;
                let namediv = document.createElement("div"); 
                let image = document.createElement("IMG");
                image.src = "Raves/" + raves[i].folder + "/pic.jpg";
                image.className = "mainimage"; 
                namediv.className = "name"; 
                ravediv.className = "ravediv"; 

                let name = raves[i].name;
                namediv.innerHTML = name; 

                ravediv.appendChild(namediv);
                ravediv.appendChild(image);
                RaveBox.appendChild(ravediv);
            }
        }
        
            })
            .catch(function (error) {
            console.log(error); 
            });
        
        
            }
        if(radio[1].checked) {

            let url = "http://u-crave-raves.herokuapp.com/?mode=rave&name=" + state;
            fetch(url) //Start fetching description for description mode 
            .then(checkStatus)
            .then(function (responseText) {
            let raves = JSON.parse(responseText); 
            let RaveBox = document.getElementById("ravebox"); 
            RaveBox.innerHTML = "";
            if(raves.length < 1) {
                RaveBox.innerHTML = "There are no raves matching your search"
            }
            else {
            for (let i = 0; i < raves.length; i++) {
                let ravediv = document.createElement("div");
                ravediv.id = raves[i].folder;
                ravediv.onmouseover = MouseOver;
                ravediv.onclick = Click;
                ravediv.onmouseout = MouseOut;
                let namediv = document.createElement("div"); 
                let image = document.createElement("IMG");
                image.src = "Raves/" + raves[i].folder + "/pic.jpg";
                image.className = "mainimage"; 
                namediv.className = "name"; 
                ravediv.className = "ravediv"; 

                let name = raves[i].name;
                namediv.innerHTML = name; 

                ravediv.appendChild(namediv);
                ravediv.appendChild(image);
                RaveBox.appendChild(ravediv);
            }
        }
        
            })
            .catch(function (error) {
            console.log(error); 
            });
        }
        }
   }

   function Fetch() {
    //let url = "http://u-crave-raves.herokuapp.com?mode=all"; 
    let url = "http://u-crave-raves.herokuapp.com/?mode=all&name=empty";
    fetch(url) //Start fetching description for description mode 
    .then(checkStatus)
    .then(function (responseText) {
    let raves = JSON.parse(responseText); 
    console.log(raves);
    let RaveBox = document.getElementById("ravebox"); 
    
    for (let i = 0; i < raves["Raves"].length; i++) {
        let ravediv = document.createElement("div");
        ravediv.id = raves["Raves"][i].folder;
        ravediv.onmouseover = MouseOver;
        ravediv.onclick = Click;
        ravediv.onmouseout = MouseOut;
        let namediv = document.createElement("div"); 
        let image = document.createElement("IMG");
        image.src = "Raves/" + raves["Raves"][i].folder + "/pic.jpg";
        image.className = "mainimage"; 
        namediv.className = "name"; 
        ravediv.className = "ravediv"; 

        let name = raves["Raves"][i].name;
        namediv.innerHTML = name; 

        ravediv.appendChild(namediv);
        ravediv.appendChild(image);
        RaveBox.appendChild(ravediv);
    }

    })
    .catch(function (error) {
    console.log(error); 
    });
   }

   function Click(){
    window.scrollTo({ top: 400, behavior: 'smooth' });
    let folder = this.id;
    let url = "http://u-crave-raves.herokuapp.com/?mode=single&name=" + folder;
    fetch(url) //Start fetching description for description mode 
    .then(checkStatus)
    .then(function (responseText) {
    console.log(responseText); 
    let rave = JSON.parse(responseText); 
    let singlediv = document.getElementById("singlediv"); 
    ravebox.innerHTML = ""; 
    let name = document.createElement("div"); 
    let date = document.createElement("div"); 
    let location = document.createElement("div"); 
    let description = document.createElement("div"); 
    let cover = document.createElement("IMG");
    let coverdiv = document.createElement("div"); 
    let lineupimage = document.createElement("IMG"); 
    let lineup = document.getElementById("lineup"); 
    let info = document.getElementById("info"); 
    
    cover.id = "coverimage"; 
    lineupimage.id = "lineupimage"; 
    coverdiv.id = "cover"; 
    description.id = "description"; 
    
    name.innerHTML = "<strong>Name: </strong>" + rave.name; 
    date.innerHTML = "<strong>Date: </strong>" + rave.date; 
    location.innerHTML = "<strong>Location: </strong>" + rave.location; 

    cover.src = "Raves/" + folder + "/pic.jpg";
    lineupimage.src =  "Raves/" + folder + "/lineup.jpg";

    name.className = "titleinfo"; 
    date.className = "titleinfo"; 
    location.className = "titleinfo"; 
    
    coverdiv.appendChild(cover); 
    description.appendChild(name); 
    description.appendChild(date); 
    description.appendChild(location); 

    info.appendChild(coverdiv); 
    info.appendChild(description); 
    
    lineup.appendChild(lineupimage); 
    
    singlediv.appendChild(info); 
    singlediv.appendChild(lineup); 
    
    })
    .catch(function (error) {
    console.log(error); 
    });
   }

   function MouseOut(){
    this.style.color = "black";
    this.style.borderColor = "white";
    this.style.cursor = "default";
    let R = document.getElementById("r"); 
    let A = document.getElementById("a"); 
    let V = document.getElementById("v"); 
    let E = document.getElementById("e"); 

    if (this.id == "banner") {
        R.style.color = "white"; 
        R.style.fontWeight = ""; 

        A.style.color = "white"; 
        A.style.fontWeight = ""; 

        V.style.color = "white"; 
        V.style.fontWeight = ""; 

        E.style.color = "white"; 
        E.style.fontWeight = ""; 
    }
   }

   function MouseOver(){
    let R = document.getElementById("r"); 
    let A = document.getElementById("a"); 
    let V = document.getElementById("v"); 
    let E = document.getElementById("e"); 

    this.style.backgorundColor= "black";
    this.style.borderColor = "black"; 
    this.style.color = "white"; 
    this.style.cursor = "pointer";

    if (this.id == "banner") {
        R.style.color = "red"; 
        R.style.fontWeight = "bold"; 

        A.style.color = "orange"; 
        A.style.fontWeight = "bold"; 

        V.style.color = "yellow"; 
        V.style.fontWeight = "bold"; 

        E.style.color = "green"; 
        E.style.fontWeight = "bold"; 
    }
   }

   function checkStatus(response) {    //Checks for errors on the page 
    if (response.status >= 200 && response.status < 300) {
        return response.text();
    } else if (response.status == 404) {    //404 error when there is no data
        return Promise.reject(new Error("sorry we do not have any data"));
    } else {
        return Promise.reject(new Error(response.status + ": " + response.statusText));
    }
}

})();
   