const btn = document.getElementById("submitBtn");
let fName = document.getElementById("fName");
let lName = document.getElementById("lName");
let phoneNo = document.getElementById("phoneNo");
let nameCol = document.getElementById("name-col");
let users = [];
showUsers();

btn.addEventListener("click", (e) => {
  e.preventDefault();

  let name = fName.value + " " + lName.value;
  let phone = phoneNo.value;
  if (fName.value != "" && lName.value != "" && phone != "") {
    if (checkDuplicae(name, phone)) {
      users.push({
        name,
        phone,
      });
      showUsers();
      fName.value = "";
      lName.value = "";
      phoneNo.value = "";
    }
  } else {
    alert("All feilds are mandatory to fill");
  }
  console.log(users);
});

// display function
function showUsers() {
  let html = "";
  users.forEach((element, index) => {
    // console.log(element, index);
    html += `
    <tr class="note my">
      <td>${index + 1}</td>
      <td>${element.name}</td>
      <td>${element.phone}</td>
      <td>
      <button id="${
        element.phone
      }" onclick="deletenote(this.id)" class="delbtn btn">Delete</button>
      </td>
    </tr>`;
  });
  let tableBody = document.getElementById("table-body");
  if (users.length != 0) {
    tableBody.innerHTML = html;
  } else {
    tableBody.innerHTML = `<td class="no-data" colspan="4">We have nothing to show you.</td>`;
  }
}

// Check duplicate user
function checkDuplicae(name, phone) {
  for (let item of users) {
    if (item.name == name) {
      alert("User already exist.");
      return false;
    }
    if (item.phone == phone) {
      alert("Phone no already exist.");
      return false;
    }
  }
  return true;
}

nameCol.addEventListener("click", sortName);
// sort function
function sortName() {
  users = users.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
  // console.log("sortName users", users);
  showUsers();
}

// Delete function
function deletenote(id) {
  let confirm = window.confirm("Do you want to delete this user?");
  if (confirm) users = users.filter((item) => item.phone != id);
  showUsers();
}
