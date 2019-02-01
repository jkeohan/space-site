let source =
  "https://spreadsheets.google.com/feeds/list/1RCCsmRDRlYfiV7G_FOsZ6z6IPH5u6l4M1n9c1Sxy_ao/1/public/values?alt=json";

let cards = [];

/* Fetches JSON */
fetch(source)
  .then(res => res.json())
  .then(data => render(data));

/* Renders data */
function render(data) {
  let  formatedCards = formatData(data)
  debugger
  formatedCards.forEach(card =>
    newCard(
      card.img,
      card.name,
      card.style,
      card.notes,
      card.stamp,
      card.brewery
    )
  );
}

/* Creates new card */
function newCard(img, name, style, notes, stamp, brewery) {
  let gallery = $("#projectThumbs");
  gallery.append(
    $("<section/>", { class: "card" }).append(
      $("<div/>", { class: "label", onclick: "flip()" })
        .append(
          $("<div/>", { class: "front" })
            .append($("<img/>", { src: `${img}` }))
            .append($("<h2/>", { text: `${brewery}` }))
            .append($("<p/>", { text: `${name}` }))
        )
        .append(
          $("<div/>", { class: "back" })
            .append($("<img/>", { src: `${stamp}` }))
            .append($("<h2/>", { text: `${name}` }))
            .append($("<p/>", { text: `${style}` }))
            .append($("<p/>", { text: `${notes}` }))
        )
    )
  );
  $(".label").flip();
}

function formatData(data){
    data.feed.entry.forEach(card => {
      let eachCard = new Card(
        card.gsx$img.$t,
        card.gsx$name.$t,
        card.gsx$style.$t,
        card.gsx$tastingnotes.$t,
        card.gsx$stamp.$t,
        card.gsx$brewery.$t
      );
    cards.push(eachCard);
  });
  return cards
}

function Card(img, name, style, notes, stamp, brewery) {
    this.img = img;
    this.name = name;
    this.style = style;
    this.notes = notes;
    this.stamp = stamp;
    this.brewery = brewery;
}

/* Clicks on the button, toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

/* Close the dropdown menu if the user clicks outside of it */
window.onclick = function(event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};


