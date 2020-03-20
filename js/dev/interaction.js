// run and download event listener
document.getElementById("btn").addEventListener("click", () => {
  mergeMultiplePDFs(pdfs)
})






var projects = {
  "L00909": {
    "project": {
      "name": "Google Spruce Goose",
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
      "name": "ZGF Los Angeles Office",
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
      "name": "Expensify Portland",
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
  var counter = 10;

  for (let i = 0; i < counter; i++) {
    var node = document.createElement("li");
    node.innerHTML = `Item ${i}`
    document.getElementById("include").appendChild(node);
  }

  for (let i = 0; i < counter; i++) {
    var node2 = document.createElement("li");
    node2.innerHTML = `Item ${i}`
    document.getElementById("exclude").appendChild(node2);
  }


}




buildProjectsList()

// jquery sortable

$(document).ready(function() {
  $( function() {
    $("#include, #exclude").sortable({
      connectWith: ".connected-sortable"
    }).disableSelection();
  })
})
