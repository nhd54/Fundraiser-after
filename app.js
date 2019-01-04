"use strict";

// Initialize Firebase

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBlX_GGgndMgG1aL7_sTqZu9IpkpxjVKAg",
  authDomain: "fundraising-b94fd.firebaseapp.com",
  databaseURL: "https://fundraising-b94fd.firebaseio.com",
  projectId: "fundraising-b94fd",
  storageBucket: "fundraising-b94fd.appspot.com",
  messagingSenderId: "737157633656"
};
firebase.initializeApp(config);
const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });

const username = document.querySelector("#username");
const password = document.querySelector("#password");
const logonButton = document.querySelector("#loginButton");
let adminForm = document.querySelector("#addAdmin");
let admins = [];
let fundraisertest = [];
let topDonations = [];
let span = document.createElement("p");
let top3 = [];
let nytest = document.querySelector("#userDonation");
let fundraiser = [];
let fyn = [];
let jylland = [];
let sjaelland = [];
let blankets = [];
let cloth = [];
let dogBlankets = [];
let basket = [];
let toys = [];
let sum;
let fullAmount = [];
let moneyAmount = 0;
let donations = [];
var increaseNr = 0;
let ormekur = [];
let loppekur = [];
let hundegodbidder = [];
let hundefoder = [];
let menuOption = document.querySelector(".menu");
const form = document.querySelector("#add-donation-form");
let users = [];
let week1 = [];
let week2 = [];
let week3 = [];
let week4 = [];
let week5 = [];
let week6 = [];
let week7 = [];
let week8 = [];
let week9 = [];
let week10 = [];
let countFyn = document.querySelector(".mapInfo p:nth-child(2) span");
let countsjaelland = document.querySelector("#country p:nth-child(3) span");
let countJylland = document.querySelector("#country p:nth-child(1) span");
let i = 0;
let donated = [];

function indexInit() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();
  var hour = today.getHours();
  var minut = today.getMinutes();
  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }

  today = dd + "-" + mm + "-" + yyyy + "-" + hour + ":" + minut;
  console.log(today);

  var countDownDate = new Date("Jan 24, 2019 15:37:25").getTime();

  // Update the count down every 1 second
  var x = setInterval(function() {
    // Get todays date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="demo"
    document.getElementById("demo").innerHTML =
      days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(x);
      document.getElementById("demo").innerHTML = "EXPIRED";
    }
  }, 1000);

  document.querySelector(".donation").addEventListener("click", () => {
    document.querySelector(".popUp").style.display = "block";
  });
  document.querySelector(".penge").addEventListener("click", () => {
    document.querySelector(".popUp").style.display = "block";
  });
  document.querySelector(".tekstil").addEventListener("click", () => {
    document.querySelector(".popUp").style.display = "block";
  });
  document.querySelector(".foder").addEventListener("click", () => {
    document.querySelector(".popUp").style.display = "block";
  });
  db.collection("donations")
    .get()
    .then(snapshot => {
      snapshot.docs.forEach(doc => {
        donations.push(doc.data());
      });
      count();
      test();
      setInterval(function() {
        if (form.amount.value.length > 0) {
          document.querySelector("#betalingDropdown").style.display = "block";
        } else {
          document.querySelector("#betalingDropdown").style.display = "none";
        }
      }, 100);
    });
  document.querySelector(".close").addEventListener("click", () => {
    document.querySelector(".popUp").style.display = "none";
  });
  // med limits (kun 1 visning den nyeste )
  db.collection("donations")
    .orderBy("date", "desc")
    .limit(1)
    .get()
    .then(snapshot => {
      snapshot.docs.forEach(doc => {
        fundraisertest.push(doc.data());
      });

      if (fundraisertest[0].amount.length == 0) {
        console.log("jeg er undef");
      } else if (fundraisertest[0].amount.length != 0) {
        console.log("jeg er def");
      }

      if (fundraisertest[0].amount.length == 0) {
        document.querySelector(".person").innerHTML =
          fundraisertest[0].firstname +
          "<br>" +
          fundraisertest[0].amount +
          " " +
          fundraisertest[0].attend +
          " " +
          fundraisertest[0].textil;
      } else if (fundraisertest[0].amount.length != 0) {
        document.querySelector(".person").innerHTML =
          fundraisertest[0].firstname +
          "<br>" +
          fundraisertest[0].amount +
          " DKK" +
          " " +
          fundraisertest[0].attend +
          " " +
          fundraisertest[0].textil;
      }
    });

  db.collection("fundraise")
    .get()
    .then(snapshot => {
      snapshot.docs.forEach(doc => {
        fundraiser.push(doc.data());
      });
      document.querySelector(".goal").textContent = fundraiser[0].goal + " DKK";
    });

  // saving data
  form.addEventListener("submit", e => {
    e.preventDefault();

    document.querySelector("#giveDonation").addEventListener("click", () => {
      if (form.anonym.checked == true) {
        console.log("jeg er checked");

        db.collection("donations").add({
          firstname: "Anonym",
          lastname: form.lastname.value,
          email: form.email.value,
          country: form.country.value,
          amount: form.amount.value,
          attend: form.pleje.value,
          textil: form.textil.value,
          date: today
        });
      } else if (form.anonym.checked == false) {
        console.log("jeg er ikke checked");
        db.collection("donations").add({
          firstname: form.name.value,
          lastname: form.lastname.value,
          email: form.email.value,
          country: form.country.value,
          amount: form.amount.value,
          attend: form.pleje.value,
          textil: form.textil.value,
          date: today
        });
      }

      document.querySelector("#add-donation-form").style.display = "none";
      document.querySelector(".done").style.display = "grid";
      setTimeout(function() {
        window.location.replace("index.html");
      }, 10000);
    });
  });
}

function adminInit() {
  let acc = document.getElementsByClassName("accordion");
  var i;
  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
      this.classList.toggle("active");
      let panel = document.querySelector(".menu");
      if (panel.style.display === "block") {
        panel.style.display = "none";
      } else {
        panel.style.display = "block";
      }
    });
  }

  adminForm.addEventListener("submit", e => {
    e.preventDefault();

    document.querySelector("#createAdmin").addEventListener("click", () => {
      db.collection("users").add({
        firstname: adminForm.firstname.value,
        lastname: adminForm.lastname.value,
        email: adminForm.email.value,
        username: adminForm.username.value,
        password: adminForm.password.value
      });
      (adminForm.firstname.value = " "),
        (adminForm.lastname.value = " "),
        (adminForm.email.value = " "),
        (adminForm.username.value = " "),
        (adminForm.password.value = " ");

      document.querySelector(".oprettet").style.display = "block";
    });
  });
}

function dashboardInit() {
  db.collection("donations")
    .get()
    .then(snapshot => {
      snapshot.docs.forEach(doc => {
        donations.push(doc.data());
      });
      count();
      test();
      countTæpper();
      countFood();

      document.querySelector(".blanket").textContent =
        blankets.length + " " + blankets[0];
      document.querySelector(".basket").textContent =
        basket.length + " " + basket[0];
      document.querySelector(".toys").textContent = toys.length + " " + toys[0];
      document.querySelector(".cloth").textContent =
        cloth.length + " " + cloth[0];
      document.querySelector(".dogblankets").textContent =
        dogBlankets.length + " " + dogBlankets[0];

      document.querySelector(".hundefoder").textContent =
        hundefoder.length + " " + hundefoder[0];
      document.querySelector(".hundegodbidder").textContent =
        hundegodbidder.length + " " + hundegodbidder[0];
      document.querySelector(".loppekur").textContent =
        loppekur.length + " " + loppekur[0];
      document.querySelector(".ormekur").textContent =
        ormekur.length + " " + ormekur[0];
    });

  // med limits (kun 3 visning den nyeste )
  db.collection("donations")
    .orderBy("date", "desc")
    .limit(3)
    .get()
    .then(snapshot => {
      snapshot.docs.forEach(doc => {
        top3.push(doc.data());
      });

      if (top3[0].amount.length == 0) {
        console.log("undef");
        nytest.children[1].children[2].innerHTML =
          top3[0].firstname + "<br>" + top3[0].amount + top3[0].attend + " ";
      } else if (top3[0].amount.length != 0) {
        nytest.children[1].children[2].innerHTML =
          top3[0].firstname +
          "<br>" +
          top3[0].amount +
          " DKK " +
          top3[0].attend +
          " ";
      }

      if (top3[1].amount.length == 0) {
        console.log("undef");
        nytest.children[2].children[2].innerHTML =
          top3[1].firstname +
          "<br>" +
          top3[1].amount +
          top3[1].attend +
          top3[1].textil;
      } else if (top3[1].amount.length != 0) {
        nytest.children[1].children[2].innerHTML =
          top3[1].firstname +
          "<br>" +
          top3[1].amount +
          " DKK " +
          top3[1].attend +
          top3[1].textil;
      }

      if (top3[2].amount.length == 0) {
        console.log("undef");
        nytest.children[3].children[2].innerHTML =
          top3[2].firstname +
          "<br>" +
          top3[2].amount +
          top3[2].attend +
          " " +
          top3[2].textil +
          " ";
      } else if (top3[2].amount.length != 0) {
        nytest.children[3].children[2].innerHTML =
          top3[2].firstname +
          "<br>" +
          top3[2].amount +
          " DKK " +
          top3[2].attend +
          " " +
          top3[2].textil +
          " ";
      }
    });
  console.log(document.querySelector("#userDonation"));

  function countTæpper() {
    donations.forEach(tæpper => {
      if (tæpper.textil == "tæpper") {
        blankets.push(tæpper.textil);
      } else if (tæpper.textil == "tøj") {
        cloth.push(tæpper.textil);
      } else if (tæpper.textil == "hundedækken") {
        dogBlankets.push(tæpper.textil);
      } else if (tæpper.textil == "hundekurv") {
        basket.push(tæpper.textil);
      } else if (tæpper.textil == "tilbehør til hunde") {
        toys.push(tæpper.textil);
      }
    });
  }

  function countFood() {
    donations.forEach(food => {
      console.log(food.attend);
      if (food.attend == "hundefoder") {
        hundefoder.push(food.attend);
      } else if (food.attend == "hundegodbidder") {
        hundegodbidder.push(food.attend);
      } else if (food.attend == "loppekur") {
        loppekur.push(food.attend);
      } else if (food.attend == "ormekur") {
        ormekur.push(food.attend);
      }
    });
  }

  function count() {
    donations.forEach(amount => {
      if (amount.amount > 0) {
        fullAmount.push(amount.amount);
      }
    });
  }

  function test() {
    fullAmount.forEach(sum => {
      moneyAmount = sum + parseInt(fullAmount);
    });
    document.querySelector(".indsamlet").textContent = moneyAmount + " DKK";
  }

  let acc = document.getElementsByClassName("accordion");
  var i;
  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
      this.classList.toggle("active");
      let panel = document.querySelector(".menu");
      if (panel.style.display === "block") {
        panel.style.display = "none";
      } else {
        panel.style.display = "block";
      }
    });
  }
}

function detailsInit() {
  let acc = document.getElementsByClassName("accordion");
  var i;
  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
      this.classList.toggle("active");
      let panel = document.querySelector(".menu");
      if (panel.style.display === "block") {
        panel.style.display = "none";
      } else {
        panel.style.display = "block";
      }
    });

    db.collection("fundraise")
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          fundraiser.push(doc.data());
        });
        document.querySelector(".start").textContent = fundraiser[0].startDate;
        document.querySelector(".end").textContent = fundraiser[0].endDate;
      });

    const donatelist = document.querySelector("#myList");

    function renderDonation(doc) {
      let li = document.createElement("li");
      let name = document.createElement("span");
      let amount = document.createElement("span");

      name.textContent = doc.data().firstname;

      if (doc.data().amount.length == 0) {
        amount.textContent =
          doc.data().amount + doc.data().textil + " " + doc.data().attend;
      } else if (doc.data().amount.length != 0) {
        amount.textContent =
          doc.data().amount +
          " DKK " +
          doc.data().textil +
          " " +
          doc.data().attend;
      }

      li.appendChild(name);
      li.appendChild(amount);

      donatelist.appendChild(li);
    }
    db.collection("donations")
      .orderBy("date", "desc")
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          renderDonation(doc);
        });
      });

    db.collection("donations")
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          donations.push(doc.data());
        });
        createCountry();
        countCountry();
        countDate();

        document.querySelector(".graph").children[0].style.height =
          week1.length + "%";
        document.querySelector(".graph").children[1].style.height =
          week2.length + "%";
        document.querySelector(".graph").children[2].style.height =
          week3.length + "%";
        document.querySelector(".graph").children[3].style.height =
          week4.length + "%";
        document.querySelector(".graph").children[3].style.height =
          week5.length + "%";
        document.querySelector(".graph").children[3].style.height =
          week6.length + "%";
        document.querySelector(".graph").children[3].style.height =
          week7.length + "%";
        document.querySelector(".graph").children[3].style.height =
          week8.length + "%";
        document.querySelector(".graph").children[3].style.height =
          week9.length + "%";
        document.querySelector(".graph").children[3].style.height =
          week10.length + "%";

        sum = fyn.length + jylland.length + sjaelland.length;

        countFyn.textContent = Math.round((fyn.length / sum) * 100) + "%";
        countJylland.textContent =
          Math.round((jylland.length / sum) * 100) + "%";
        countsjaelland.textContent =
          Math.round((sjaelland.length / sum) * 100) + "%";
      });
  }
}

function settingInit() {
  let acc = document.getElementsByClassName("accordion");
  var i;
  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
      this.classList.toggle("active");
      let panel = document.querySelector(".menu");
      if (panel.style.display === "block") {
        panel.style.display = "none";
      } else {
        panel.style.display = "block";
      }
    });
  }

  db.collection("users")
    .get()
    .then(snapshot => {
      snapshot.docs.forEach(doc => {
        users.push(doc.data());
      });
      document.querySelector(".settingsName").textContent = users[0].firstname;
      document.querySelector(".settingsLastName").textContent =
        users[0].lastname;
      document.querySelector(".email").textContent = users[0].email;
      document.querySelector(".username").textContent = users[0].username;
      document.querySelector(".password").textContent = users[0].password;
    });

  db.collection("fundraise")
    .get()
    .then(snapshot => {
      snapshot.docs.forEach(doc => {
        fundraiser.push(doc.data());
      });
      document.querySelector(".support").textContent = fundraiser[0].name;
      document.querySelector(".kontonr").textContent = fundraiser[0].Kontonr;
      document.querySelector(".iban").textContent = fundraiser[0].IBAN;
      document.querySelector(".swift").textContent = fundraiser[0].swift;
      document.querySelector(".goal").textContent = fundraiser[0].goal + " DKK";
      document.querySelector(".geografi").textContent = fundraiser[0].country;
      document.querySelector(".start").textContent = fundraiser[0].startDate;
      document.querySelector(".slut").textContent = fundraiser[0].endDate;
    });
}

function login() {
  db.collection("users")
    .get()
    .then(snapshot => {
      snapshot.docs.forEach(doc => {
        admins.push(doc.data());
      });
    });

  document.querySelector(".back").addEventListener("click", () => {
    window.location.href = "index.html";
  });

  logonButton.addEventListener("click", () => {
    admins.forEach(admin => {
      if (
        username.value == admin.username &&
        password.value == admin.password
      ) {
        window.location.href = "dashboard.html";
        //console.log("vi er inde");

        return;
      } else if (
        username.value != admin.username &&
        password.value != admin.password
      ) {
        document.querySelector(".wrongPassword").style.display = "block";
      }
    });
  });
}

function count() {
  donations.forEach(amount => {
    if (amount.amount > 0) {
      fullAmount.push(amount.amount);
    }
  });
}

function createCountry() {
  donations.forEach(country => {
    if (country.country == "fyn") {
      fyn.push(country);
    } else if (country.country == "jylland") {
      jylland.push(country);
    } else if (country.country == "sjælland") {
      sjaelland.push(country);
    }
  });
}

function countCountry() {
  if (sjaelland.length > fyn.length && sjaelland.length > jylland.length) {
    document.querySelector("#sjaelland").style.fill = "#242f41";
    document.querySelector("#fyn").style.fill = "#6a82a0";
    document.querySelector("#jylland").style.fill = "#6a82a0";
  } else if (fyn.length > sjaelland.length && fyn.length) {
    document.querySelector("#sjaelland").style.fill = "#6a82a0";
    document.querySelector("#fyn").style.fill = "#242f41";
    document.querySelector("#jylland").style.fill = "#6a82a0";
  } else if (jylland.length > sjaelland.length && jylland.length > fyn.length) {
    document.querySelector("#sjaelland").style.fill = "#6a82a0";
    document.querySelector("#fyn").style.fill = "#6a82a0";
    document.querySelector("#jylland").style.fill = "#242f41";
  }
}

function test() {
  fullAmount.forEach(sum => {
    moneyAmount = sum + parseInt(fullAmount);
  });
  document.querySelector(".indsamlet").textContent = moneyAmount + " DKK";
}

function showPayment() {
  if ((form.amount.value = "11")) {
    console.log("test test test");
  }
}

function countDate() {
  donations.forEach(time => {
    console.log(time.amount);
    if (time.date > "01-12-18" && time.date < "09-12-18") {
      week1.push(time.amount);
    } else if (time.date > "10-12-18" && time.date < "16-12-18") {
      week2.push(time.amount);
    } else if (time.date > "17-12-18" && time.date < "23-12-18") {
      week3.push(time.amount);
    } else if (time.date > "24-12-18" && time.date < "31-12-18") {
      week4.push(time.amount);
    } else if (time.date > "01-01-19" && time.date < "09-01-19") {
      week5.push(time.amount);
    } else if (time.date > "10-01-19" && time.date < "16-01-19") {
      week6.push(time.amount);
    } else if (time.date > "17-01-19" && time.date < "23-01-19") {
      week7.push(time.amount);
    } else if (time.date > "01-02-19" && time.date < "10-02-19") {
      week8.push(time.amount);
    } else if (time.date > "11-02-19" && time.date < "17-02-19") {
      week9.push(time.amount);
    } else if (time.date > "18-02-19" && time.date < "24-02-19") {
      week10.push(time.amount);
    }
  });
}
