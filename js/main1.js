const TEAM_4GEEKS = [
  {
    name: "Tsvetan",
    last: "Kirilov Georgiev",
    email: "tsvetan.georgiev891@gmail.com",
    phone: "642171377",
    bio: "I’m a full stack developer skilled in Django, currently expanding my expertise with Flask and React to build versatile web applications.",
    address: "Alcantarilla, Spain",
    img: "./image/tkg.jfif",
    img1:'./image/imageonline-co-emojiadded-fotor-2025102413838.png',
    linked: "https://www.linkedin.com/in/srtg96/",
    github: "https://github.com/SertoriusX/",
  },
  {
    name: "Gustavo ",
    last: "Soto",
    img: "./image/Gustavo.jpg",
      img1:'./image/GustavoSmile.png',

    email: "gusttavo@hotmail.es",
    phone: "+359 888 456 123",
    address: "",
    linked: "https://www.linkedin.com/in/gustavo-soto-b41017281/",
    github: "https://github.com/gasotof",
  },
  {
    name: " Sorin ",
    last: "Petru Oprean",
    email: "sorinoprean@hotmail.es",
    phone: "",
    address: "Murcia, Spain",
    img: "./image/Sorin Petru Oprean.png",
    img1:'./image/Sorin Petru OpreanSmile.png',
    linked: "https://www.linkedin.com/in/sorin-petru-oprean-62a473159/",
    github: "https://github.com/Sorin95-Dev",
  },
  {
    name: "German ",
    last: "Garcia",
    email: "ggarciasolano03@gmail.com",
    phone: "+359 899 789 321",
    address: "",
    img: "./image/German Garcia Solano.png",
    img1: "./image/German.png",

    linked: "https://www.linkedin.com/in/german-garcia-solano-a00352268/",
    github: "https://github.com/ggarcia202",
  },
];

// Render cards dynamically
const displayCards = () => {
  const container = document.getElementById("cardContainer");
  container.innerHTML = TEAM_4GEEKS.map(
    (person, index) => `
      <div class="col-12 col-md-3">
        <div class="card shadow-sm flip-in-ver-right" onclick="displayModal(${index})">
          <div class="col-12 text-center p-1">
            <img src="${person.img}" alt="${person.name}" class="img-fluid rounded-top" />
          </div>
          <div class="card-body text-center">
            <h5 class="card-title mb-1">${person.name} ${person.last}</h5>
            <p class="text-muted small">Click to see more</p>
          </div>
        </div>
      </div>
    `
  ).join("");
};

// Display modal with "book" look
function displayModal(index) {
  const person = TEAM_4GEEKS[index];
  const modalHTML = `
        <div class="modal fade" id="personModal" tabindex="-1" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-xl">
            <div class="modal-content book-modal shadow-lg border-0">
              <div class="d-flex flex-column flex-md-row">
                <!-- Left Page -->
                <div class="book-left p-4">
                  <img src="${person.img1}" alt="${person.name}" />
                </div>
                <!-- Right Page -->
                <div class="book-right">
                  <h3>${person.name} ${person.last}</h3>
                    <p><strong>Bio:</strong> ${person.bio}</p>

                  <p><strong>Email:</strong> ${person.email}</p>
                  <p><strong>Phone:</strong> ${person.phone}</p>
                  <p><strong>Address:</strong> ${person.address}</p>
                  <div class="profile-social mt-3">
                    <a href="${person.github}"><i class="bi bi-github"></i></a>
                    <a href="${person.linked}">  <i class="bi bi-linkedin"></i></a>
                  </div>
                </div>
              </div>
              <button type="button" class="btn-close position-absolute top-0 end-0 m-3" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
          </div>
        </div>
      `;
  document.getElementById("modalContainer").innerHTML = modalHTML;
  new bootstrap.Modal(document.getElementById("personModal")).show();
}

displayCards();



 