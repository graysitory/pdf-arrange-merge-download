// run and download event listener
document.getElementById("btn").addEventListener("click", () => {

  // serialize final order of list items
  var orderList = $("#include").sortable("toArray", { attribute: "data-filename" })
  console.log(orderList)

  mergeMultiplePDFs(orderList)
})






var projects = {
  "L00909": {
    "project": {
      "name": "Spruce Goose Office Complex",
      "client": "Google",
      "office": "LAX",
      "proj_number": "L00909",
      "completed": 2018,
      "sensitive": true,
      "type": "interior"
    },
    "file": {
      "name": "L00909_interiors_google-spruce-goose.pdf",
      "last_updated": "date"
    }
  },
  "L90943": {
    "project": {
      "name": "Los Angeles Office",
      "client": "ZGF Architects",
      "office": "LAX",
      "proj_number": "L90943",
      "completed": 2020,
      "sensitive": false,
      "type": "interior"
    },
    "file": {
      "name": "L90943_interiors_zgf-la-office.pdf",
      "last_updated": "date"
    }
  },
  "P32834": {
    "project": {
      "name": "Portland Office",
      "client": "Expensify",
      "office": "PDX",
      "proj_number": "P32834",
      "completed": 2019,
      "sensitive": false,
      "type": "interior"
    },
    "file": {
      "name": "P32834_interiors_expensify-portland.pdf",
      "last_updated": "date"
    }
  }
}

function buildProjectsList(projects) {

  for (x in projects) {
    const clientName = projects[x].project.client;
    const projName = projects[x].project.name;
    const projNum = projects[x].project.proj_number;
    const filename = projects[x].file.name;

    console.log(`${clientName}, ${projName}  ${projNum}  ${filename}`)

    let node = document.createElement("li");
    node.innerHTML =  `${clientName} - ${projName} | ${projNum}`
    node.id = `${projNum}`
    node.dataset.projNum = projNum
    node.dataset.filename = filename


    document.getElementById("include").appendChild(node)

  }


}




buildProjectsList(projects)

// jquery sortable

$(document).ready(function() {
  $( function() {
    $("#include, #exclude").sortable({
      connectWith: ".connected-sortable"
    }).disableSelection();
  })
})
