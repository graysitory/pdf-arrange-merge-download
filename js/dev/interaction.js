
// TODO: add 2-up continuous property to final pdf -- maybe try by loading a "dummy" doc with setting and copying to it instead of creating a new pdf.
// TODO: dynamic pdf name
// DONE: prepend cover, intro, and back cover
// TODO: figure out page numbering
// TODO: Create pre-made "sections"-- office, residental, etc.
// TODO: Add a reset button
// TODO: Crteate a mongodb for storing data
// TODO: add progress bar




// run merge-pdf and download file
document.getElementById("btn").addEventListener("click", () => {

  // serialize final order of list items to array of filenames
  var orderList = $("#include").sortable("toArray", { attribute: "data-filename" })
  console.log(orderList)

  // get user input for filename
  var downloadFilename = document.getElementById("download-filename").value;

  // run merge-pdf.js
  mergeMultiplePDFs(orderList, downloadFilename)
})


// helper function(s)
function capitalizeFirstLetter(str) {
  const firstLetter = str[0].toUpperCase()
  const string = str.slice(1)
  return firstLetter.concat(string)
} // capitalize first letter of string


// non-project document assets, like cover, intro, etc.
var docAssets = {
  "interiors": {
    "cover": {
      "filename": "_interiors_cover.pdf",
      "pages": 2,
      "last_updated": "date",
    },
    "intro": {
      "filename": "_interiors_intro.pdf",
      "pages": 3,
      "last_updated": "date",
    },
    "additional_clients": {
      "filename": "_interiors_additional-clients.pdf" ,
      "pages": 1,
      "last_updated": "date",
    },
    "back": {
      "filename": "_interiors_back.pdf" ,
      "pages": 2,
      "last_updated": "date",
    },
  }
}

// projects pages
var projects = {
  "L00909": {
    "project": {
      "name": "Spruce Goose Office Complex",
      "client": "Google",
      "office": "LAX",
      "proj_number": "L00909",
      "completed": 2018,
      "sensitive": true,
      "type": "interior",
      "tags": [],
    },
    "file": {
      "name": "L00909_interiors_google-spruce-goose.pdf",
      "last_updated": "date",
      "pages": "placeholder"
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
      "type": "interior",
      "tags": [],
    },
    "file": {
      "name": "L90943_interiors_zgf-la-office.pdf",
      "last_updated": "date",
      "pages": "placeholder"
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
      "type": "interior",
      "tags": [],
    },
    "file": {
      "name": "P32834_interiors_expensify-portland.pdf",
      "last_updated": "date",
      "pages": "placeholder"
    }
  },
  "L98372": {
    "project": {
      "name": "6500 Wilshire 20th Floor",
      "client": "Cedars-Sinai",
      "office": "LAX",
      "proj_number": "L98372",
      "completed": 2019,
      "sensitive": false,
      "type": "interior",
      "tags": [],
    },
    "file": {
      "name": "L98372_interiors_cedars-sinai-6500-wilshire.pdf",
      "last_updated": "date",
      "pages": "placeholder"
    }
  },
  "N15158": {
    "project": {
      "name": "1200 Seventeenth Street",
      "client": "Akridge",
      "office": "NYC",
      "proj_number": "N15158",
      "completed": 2019,
      "sensitive": false,
      "type": "interior",
      "tags": [],
    },
    "file": {
      "name": "N15158_interiors_akridge-1200-seventeenth.pdf",
      "last_updated": "date",
      "pages": "placeholder"
    }
  },
  "P0004": {
    "project": {
      "name": "Portland Headquarters TI",
      "client": "Washington Trust Bank",
      "office": "PDX",
      "proj_number": "P00004",
      "completed": 2019,
      "sensitive": false,
      "type": "interior",
      "tags": [],
    },
    "file": {
      "name": "P00004_interiors_washington-trust-bank.pdf",
      "last_updated": "date",
      "pages": "placeholder"
    }
  },
  "P22965": {
    "project": {
      "name": "Headquarters",
      "client": "Clif Bar & Company",
      "office": "PDX",
      "proj_number": "P22965",
      "completed": 2019,
      "sensitive": false,
      "type": "interior",
      "tags": [],
    },
    "file": {
      "name": "P22965_interiors_clif-bar-headquarters.pdf",
      "last_updated": "date",
      "pages": "placeholder"
    }
  },
  "P28294": {
    "project": {
      "name": "Headquarters",
      "client": "Hanna Andersson",
      "office": "PDX",
      "proj_number": "P28294",
      "completed": 2019,
      "sensitive": false,
      "type": "interior",
      "tags": [],
    },
    "file": {
      "name": "P48294_interiors_hanna-andersson-portland.pdf",
      "last_updated": "date",
      "pages": "placeholder"
    }
  }
}


function buildProjectsList(projects) {

  // reference parent object for list item children
  const parent = document.getElementById("include")

  // loop over projects object
  for (x in projects) {
    const clientName = projects[x].project.client;
    const projName = projects[x].project.name;
    const projNum = projects[x].project.proj_number;
    const filename = projects[x].file.name;

    console.log(`${clientName}, ${projName}  ${projNum}  ${filename}`)

    // create list item  for each and assign data-attributes
    let node = document.createElement("li");
    node.innerHTML =  ` <p class="project-number">${projNum}</p><span class="client">${clientName}</span> <span class="project">${projName}</span>`
    node.id = `${projNum}`
    node.dataset.projNum = projNum
    node.dataset.filename = filename

    // assume all are included; append to include list
    parent.appendChild(node)

  }

  // loop over all document assets
  for (y in docAssets) {

    // figure out which assets are needed by project type [only accounts for interiors for this proof of concept]
    if (y === "interiors") {

      // build arrays for each document asset item
      const cover = ["cover", docAssets[y].cover.filename];
      const intro = ["intro", docAssets[y].intro.filename];
      const additional = ["additional", docAssets[y].additional_clients.filename];
      const back = ["back", docAssets[y].back.filename];

      // combine in master array for iteration
      const allAssets = [cover, intro, additional, back]

      // create document fragments for collecting what items should be prepended or appended to the list
      let prepend = document.createDocumentFragment();
      let append = document.createDocumentFragment();

      for (let k = 0; k < allAssets.length; k++) {

        const assetArr = allAssets[k]

        // capitalize first letter of names for UI
        const friendlyName = capitalizeFirstLetter(assetArr[0])
        const friendlyCategory = capitalizeFirstLetter(y)

        console.log(assetArr)

        // build list item for each asset
        let node = document.createElement("li")
        node.innerHTML = `${friendlyName} - ${friendlyCategory}`
        node.id = `${assetArr[0]}`
        node.classList.add("document-asset")
        node.dataset.asset = assetArr[0];
        node.dataset.assetCategory = allAssets[y];
        node.dataset.filename = assetArr[1];

        // determine if item is prepended or appended to final document
        if (assetArr[0] === "cover" || assetArr[0] === "intro") {
          prepend.appendChild(node)
        } else if (assetArr[0] === "additional" || assetArr[0] === "back") {
          append.appendChild(node)
        }
      }

      parent.prepend(prepend)
      parent.appendChild(append)



    }

  }


} // builds include/exclude lists from data in projects and docAssets objects.




buildProjectsList(projects)

// init jquery sortable

$(document).ready(function() {
  $( function() {
    $("#include, #exclude").sortable({
      connectWith: ".connected-sortable"
    }).disableSelection();
  })
})
