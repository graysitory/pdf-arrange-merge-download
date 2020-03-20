
  const { degrees, PDFDocument, rgb, StandardFonts } = PDFLib

  const pdfs = ['http://mbp2.local:5757/assets/pdf/2019-05-01_Parking_May.pdf', 'http://mbp2.local:5757/assets/pdf/2019-05-01_Parking_May.pdf', 'http://mbp2.local:5757/assets/pdf/binder-order-conf.pdf']



async function asyncForEach(arr, callback) {
    for (let index = 0; index < arr.length; index++) {
      await callback(arr[index], index, arr);
    }
  }

async function mergeMultiplePDFs(pdfArr) {

  // create a master PDF
  const masterPDF = await PDFDocument.create();
  console.log(pdfArr.length);

  // asynchronously get, load, and copy PDF to new doc.
  await asyncForEach(pdfArr, async (url) => {
    console.log(`Retrieving ${url}...`)

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

  })


  // save master PDF
  const pdfSave = await masterPDF.save();

  // download master PDF
  download(pdfSave, "pdf-title.pdf", "application/pdf")

}
