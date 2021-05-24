function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const closeBtn = document.querySelectorAll(".close");
const formData = document.querySelectorAll(".formData");
const submitBtn = document.getElementById("btn-submit");

const modalForm = document.querySelector("#modal-form");

let firstName = modalForm.elements["first"];
let lastName = modalForm.elements["last"];
let email = modalForm.elements["email"];
let birthDate = modalForm.elements["birthdate"];
let quantity = modalForm.elements["quantity"];
let locations = document.getElementsByName("location");
let locationChosen;
let Conditions = document.getElementById("checkbox1");

//list input
let inputList = [
  firstName,
  lastName,
  email,
  birthDate,
  quantity,
  locations[0],
  Conditions
];
// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

//close modal event
closeBtn.forEach((btn) => btn.addEventListener("click", closeModal));

// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

//validation form

const validationForm = () =>{

  //conditions validation regex
  let regexName = /^\D{2,}$/;
  let regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  let regexBirth = /\d/;
  let regexQuantity = /^\d{1,2}$/;

  //validation location radio button

  let locationIsValid = false;

  for (let i=0; i< locations.length; i++ ){
   if(locations[i].checked){
     locationIsValid = true;
     locationChosen= locations[i].value;
     break; //stop loop
    }
  }
  //error
  const error = (elt, errorMessage)=>{ 
    elt.closest(".formData").setAttribute("data-error-visible","true");
    elt.closest(".formData").setAttribute("data-error", errorMessage);
  } //looking for the closest parent
  
  //error msg set/reset
  const abordError =(elt) =>{
    elt.closest(".formData").removeAttribute("data-error");
    elt.closest(".formData").setAttribute("data-error-visible", "false");
  }
  //errorAb on each formData
  inputList.forEach(elt => abordError(elt));

  //form conditions
  let errors=0;

  if(regexName.exec(firstName.value)==null) {  // returns the matched text if it finds a match, otherwise it returns null
   error (firstName, "Veuillez saisir un prénom valide (2 caractères min.)"); //error msg
   errors++;
  };

  if(regexName.exec(lastName.value)==null){
   error(lastName, "Veuillez saisir un nom valide (2 caractères min.)");
   errors++;
  }

  if(regexEmail.exec(email.value)==null){
   error(email, "Veuillez saisir une adresse mail valide, exemple : maxime.vlijkaert@belgium.be");
   errors++;
  }

  if(regexBirth.exec(birthDate.value)==null){
   error(birthDate, "Veuillez saisir une date valide, exemple : 18/12/1994");
   errors++;
  }

  if(regexQuantity.exec(quantity.value)==null){
   error(quantity, "Veuillez saisir un nombre entre 0 et 99");
   errors++;
  }

  if(locationIsValid == false){
   error(locations[0],"Veuillez choisir une ville");
   errors++;
  }

  if (Conditions.checked == false) {
   error(conditions, "Veuillez accepter les conditions générales d'utilisation");
   errors++;
  }


  //return false or true if find any error
  if (errors > 0){
    return false;
  } 
  else{
    return true;
  }
  
}//end validation form

//launch succes message once validation is ok
const success= () => {
  const successBtnClose = document.getElementById("btn-close");
  const successMsg = document.getElementById("success-msg");
  modalForm.style.display= "none"; //close modalform
  successBtnClose.style.display= "block"; //appear btn close
  successMsg.style.display= "block"; //appear succes msg
  successBtnClose.addEventListener("click", closeModal); // on click close 

}

//collect data

const submitForm = () =>{
  let formData =  new FormData(); //create a new form to collect data

  formData.append("firstName", firstName.value);
  formData.append("lastName", lastName.value);
  formData.append("email",email.value);
  formData.append("birthDate",birthDate.value);
  formData.append("locationchosen", locationChosen); //get all data

  //request Ajax

 /* let request = new XMLHttpRequest();
  request.open("POST", "#link");
  request.send("formData");

  request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
      success();
    }
  }; */

}

//submit

submitBtn.addEventListener("click", function(event){
  let isFormValid = validationForm();
  if(isFormValid){
    submitForm(), success(); //submit + succes msg
  }
});


