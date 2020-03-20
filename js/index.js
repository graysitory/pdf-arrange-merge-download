
  const { degrees, PDFDocument, rgb, StandardFonts } = PDFLib

  const pdfs = ['http://mbp2.local:5757/assets/pdf/2019-05-01_Parking_May.pdf', 'http://mbp2.local:5757/assets/pdf/2019-05-01_Parking_May.pdf', 'http://mbp2.local:5757/assets/pdf/binder-order-conf.pdf']



  async function asyncForEach(arr, callback) {
    for (let index = 0; index < arr.length; index++) {
      await callback(arr[index], index, arr);
    }
  }

//   async function mergePDFs(pdfs) {
//     // pdfs.forEach(el => {
//     //   console.log(el)
//     // });
//
//     // create a new PDF
//     const pdfDoc = await PDFDocument.create();
//
//     let getPDF = await fetch('http://mbp2.local:5757/assets/pdf/2019-05-01_Parking_May.pdf').then(res => res.arrayBuffer())
//
//     console.log(getPDF)
//
//     const srcDoc = await PDFDocument.load(getPDF)
//
//     // get indices of all pages in document to pass to copyPages()
//     const indices = srcDoc.getPageIndices()
//
//     const copiedPages = await pdfDoc.copyPages(srcDoc, indices)
//
//     copiedPages.forEach((element, index) => {
//       pdfDoc.addPage(element)
//     })
//
//
//
//
//
//     const pdfBytes = await pdfDoc.save()
//
//     download(pdfBytes, "pdf-title.pdf", "application/pdf")
//
//   }
//
// async function loadPDFs(url) {
//   let getPDF = await fetch(url).then(res => res.arrayBuffer())
//   const srcDoc = await PDFDocument.load(getPDF)
//   const result = srcDoc.getPages()
//   return result
// }


// async function mergeMultiplePDFs(pdfs) {
//
//   const pdfDoc = await PDFDocument.create();
//   let allPages = []
//
//   console.log(pdfs.length)
//   pdfs.forEach((element, index) => {
//     allPages.push(loadPDFs(element))
//   })
//
//
//   const pdfBytes = await pdfDoc.save();
//   download(pdfBytes, "pdf-title.pdf", "application/pdf")
// }

// async function copyPagesToMasterPDF(arr, target) {
//   arr.forEach(element => {
//     target.copyPages(element)
//   })
// }

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

mergeMultiplePDFs(pdfs)
