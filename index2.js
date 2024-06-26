import puppeteer from "puppeteer";


async function run6() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://www.compass.com/listing/5-evirel-place-oakland-ca-94611/1603016919870853265/");
  
  const publicRecords = await page.evaluate(() => {
    const data = document.querySelectorAll('div#publicFacts div.public-facts__TaxInfoWrapper-sc-19n5r74-0.biERKw div.public-facts-subsection__PublicFactsSubsection-ee1xld-1');
    let records = {}; // Use an object to store the records
    
    data.forEach((element) => {
      const titleElement = element.querySelector('strong');
      const title = titleElement ? titleElement.innerHTML.trim() : 'No title found';
      
      const data2 = element.querySelectorAll('span.public-facts__TaxableValueItem-sc-19n5r74-1.dCnYGl');
      const dataMap = new Map();
      
      data2.forEach((e) => {
        const valueElement = e.querySelector('strong');
        const keyElement = e.querySelector('span') ||e.querySelector('strong');
        
        const key = keyElement ? keyElement.innerHTML.trim() : 'Unknown key';
        const value = valueElement ? valueElement.innerHTML.trim() : 'Unknown value';
        
        dataMap.set(key, value);
      });
      
      records[title] = Object.fromEntries(dataMap); // Convert Map to Object for easier logging
    });
    
    return records;
  });
  
  console.log(JSON.stringify(publicRecords, null, 2));
  await browser.close();
}

run6();

// const infoElement = await page.evaluate(() => {
    //   let name = document.querySelector(".summary__StyledAddress-e4c4ok-8");
    //   let url = document
    //     .querySelector("#media-gallery-hero-image")
    //     .getAttribute("src");
    //   const price = document.querySelector(
    //     ".summary__StyledSummaryDetailUnit-e4c4ok-4"
    //   ).innerText;
    //   let priceClean = price.replace(/[$,]/g, "").replace(/\s*Price/, "");
    //   const address = document.querySelector(
    //     ".summary__StyledAddressSubtitle-e4c4ok-9"
    //   ).innerText;
    //   const beds = document.querySelector(
    //     '[data-tn="listing-page-summary-beds"] .summary__StyledSummaryDetailUnit-e4c4ok-4 .textIntent-title2'
    //   ).innerText;
    //   const baths = document.querySelector(
    //     '[data-tn="listing-page-summary-baths"] .summary__StyledSummaryDetailUnit-e4c4ok-4 .textIntent-title2'
    //   ).innerText;
    //   const sqft = document.querySelector(
    //     '[data-tn="listing-page-summary-sq-ft"] .summary__StyledSummaryDetailUnit-e4c4ok-4 .textIntent-title2'
    //   ).innerText;
    //   const sqftClean = sqft.replace(/[,\bSq. Ft.]/g, "");
    //   const text = document.querySelector(
    //     ".data-table__TableStyledTd-ibnf7p-1"
    //   ).innerText;
    //   let comingSoon = false;
    //   if (text === "Coming Soon") {
    //     comingSoon = true;
    //   }
    //   const location = document.querySelectorAll("ul.cx-breadcrumbs li");
    //   const city = location[2].querySelector("a").innerText;
    //   const postalCode = location[3].querySelector("a").innerText;
    //   const region = location[4].querySelector("a").innerText;
    //   const state = location[1].querySelector("a").innerText;
    //   const description = document.querySelector(
    //     "div.description__StyledSectionWrapper-sc-1v5jw5i-2 div.textIntent-body div.sc-eGknBQ.WiThW"
    //   ).innerText;
    //   name = name.innerText;

    //   return {
    //     name,
    //     image: url,
    //     price: Number(priceClean),
    //     address,
    //     postalCode,
    //     city,
    //     region,
    //     state,
    //     beds,
    //     baths,
    //     sqft: Number(sqftClean),
    //     comingSoon,
    //     description,
    //   };
    // });


        //   console.log(propertyInfo);

    // const schools = await page.evaluate(() => {
    //   const data = document.querySelectorAll(
    //     ".sc-evHTmi.jKTZGQ table.cx-react-table tbody .cx-react-tr"
    //   );
    //   let schoolArr = [];
    //   data.forEach((element) => {
    //     const innerData = element.querySelectorAll(".cx-react-td");
    //     const rating = innerData[0].querySelector(".sc-fnhnaa span").innerHTML;
    //     //  const ratingFinal=rating[0].innerHTML;
    //     const name = innerData[1].querySelector(
    //       ".sc-jWoPvc a.cx-textLink"
    //     ).innerHTML;
    //     const type = innerData[2].querySelector("span").innerHTML;
    //     const grades = innerData[3].innerHTML;
    //     const splitText = grades.split(" ");
    //     const gradesFrom = splitText[0];
    //     const gradesTo = splitText[2];
    //     const distance = innerData[4]
    //       .querySelector(".sc-lkMDMP.icvjYO")
    //       .innerHTML.split(" ")[0];
    //     schoolArr.push({ rating, type, gradesFrom, gradesTo, distance });
    //   });

    //   return schoolArr;
    // });




(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('YOUR_INITIAL_PAGE_URL');

  let allUrls = [];
  let hasNextPage = true;

  while (hasNextPage) {
    // Extract URLs from the current page
    const pageUrls = await page.evaluate(() => {
      const elements = document.querySelectorAll(".uc-lolCardView-cards .uc-listingPhotoCard a");
      return Array.from(elements).map(el => el.href);
    });
    allUrls = allUrls.concat(pageUrls);

    // Check if there is a next page and navigate to it
    hasNextPage = await page.evaluate(() => {
      const nextPageButton = document.querySelector('.next-page-selector'); // Replace with the actual selector for the next page button
      if (nextPageButton) {
        nextPageButton.click();
        return true;
      }
      return false;
    });

    if (hasNextPage) {
      await page.waitForNavigation({ waitUntil: 'networkidle0' });
    }
  }

  console.log(allUrls);
  console.log(`Total URLs collected: ${allUrls.length}`);






  // let allUrls = [];
  // let hasNextPage = true;
  // while (hasNextPage) {
  //   const pageUrls = await page.evaluate(() => {
  //     const elements = document.querySelectorAll(
  //       ".uc-lolCardView-cards .uc-listingPhotoCard a"
  //     );
  //     return Array.from(elements).map((el) => el.href);
  //   });
  //   allUrls = allUrls.concat(pageUrls);

  //   hasNextPage = await page.evaluate(() => {
  //     const nextPageButton = document.querySelectorAll(
  //       "div.cx-paginator-section button.cx-enclosedBtn"
  //     ); // Replace with the actual selector for the next page button
  //     console.log("Hi");
  //     console.log(nextPageButton);
  //     nextPageButton.forEach((element) => {
  //       if (element) {
  //         element.click();
  //         return true;
  //       }
  //       return false;
  //     });
  //   });

  //   if (hasNextPage) {
  //     await page.waitForNavigation({ waitUntil: "networkidle0" });
  //   }
  // }
  //async function extractURL() {
    // const pageUrls = await page.evaluate(() => {
    //   let allUrls = [];

    //     const elements = document.querySelectorAll(
    //       ".uc-lolCardView-cards .uc-listingPhotoCard a"
    //     );
    //     let urlOfPages = Array.from(elements).map((el) => el.href);
    //     allUrls = allUrls.concat(urlOfPages);
      
    //   return allUrls;
    // });
    // return pageUrls;
  //}