
  const { degrees, PDFDocument, rgb, StandardFonts } = PDFLib

  const pdfs = ['http://mbp2.local:5757/assets/pdf/2019-05-01_Parking_May.pdf', 'http://mbp2.local:5757/assets/pdf/2019-05-01_Parking_May.pdf', 'http://mbp2.local:5757/assets/pdf/binder-order-conf.pdf']

function updateProgressBar(progress, increment) {
  const percent = progress * increment;
  document.getElementById("progress-bar-indicator").style.width = `${percent}%`
}


// async-enabled forEach function.
// https://codeburst.io/javascript-async-await-with-foreach-b6ba62bbf404
async function asyncForEach(arr, callback) {
    for (let index = 0; index < arr.length; index++) {
      await callback(arr[index], index, arr);
    }
  }

async function mergeMultiplePDFs(pdfArr, downloadFilename) {

  let progress = 0; // set start value. for each pdf merged, this increases by 1
  let increment = 100 / pdfArr.length; // determine what percent of 100 each document represents

  // create a master PDF
  const masterPDF = await PDFDocument.create();
  console.log(`${pdfArr.length} documents to merge`);

  // asynchronously get, load, and copy PDF to new doc.
  await asyncForEach(pdfArr, async (filename) => {
    console.log(`Retrieving ${filename}...`)

    const url = `../assets/pdf/${filename}`
    console.log(url)

    // fetch PDF
    let getPDF = await fetch(url).then(response => response.arrayBuffer());

    // load PDF
    const toCopy =  await PDFDocument.load(getPDF);

    // get array of all indeces in the PDF
    const indices = toCopy.getPageIndices();

    // copy pages to the master PDF
    const copiedPages = await masterPDF.copyPages(toCopy, indices)

    // asynchronously add each page to the master PDF
    await asyncForEach(copiedPages, async (page) =>  {
      masterPDF.addPage(page)
    })
    progress++
    updateProgressBar(progress, increment)
  })


  // save master PDF
  const pdfSave = await masterPDF.save();

  // download master PDF
  download(pdfSave, `${downloadFilename}.pdf`, "application/pdf")

}
