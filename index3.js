import puppeteer from "puppeteer";
import fs from "fs";

async function run() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://www.compass.com/homes-for-sale/alameda-county-ca/mapview=37.905823999999996,-121.469214,37.454186,-122.373782/", { timeout: 60000 });
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
  }

  let completeURL=[];

  const traversePage=await page.evaluate(()=>{
    const button = page.waitForSelector(
      "div.cx-paginator div.cx-paginator-section button.cx-enclosedBtn.is-active "
    );
    let nextPageButton = button.nextElementSibling;
    let url = nextPageButton.waitForSelector(
      "a.uc-lolCardViewPaginator-cancelAnchorAppearance"
    ).href;
    if(url){
      navigate(url);
    }
    

    async function navigate(url){
      await page.goto(url);
    }

  })


 

  

  // console.log(completeURL);

  // console.log(allUrls.length);

  // for (const url of allUrls) {
  //   await page.goto(url, { waitUntil: "networkidle2" });

  //   const infoElement = await page.evaluate(() => {
  //     let name = document?.querySelector(".summary__StyledAddress-e4c4ok-8");
  //     let urlElement = document?.querySelector("#media-gallery-hero-image");
  //     let url = urlElement ? urlElement?.getAttribute("src") : null;
  //     const price = document?.querySelector(
  //       ".summary__StyledSummaryDetailUnit-e4c4ok-4"
  //     )?.innerText;
  //     let priceClean = price?.replace(/[$,]/g, "")?.replace(/\s*Price/, "");
  //     const address = document?.querySelector(
  //       ".summary__StyledAddressSubtitle-e4c4ok-9"
  //     )?.innerText;
  //     const beds = document?.querySelector(
  //       '[data-tn="listing-page-summary-beds"] .summary__StyledSummaryDetailUnit-e4c4ok-4 .textIntent-title2'
  //     )?.innerText;
  //     const baths = document?.querySelector(
  //       '[data-tn="listing-page-summary-baths"] .summary__StyledSummaryDetailUnit-e4c4ok-4 .textIntent-title2'
  //     )?.innerText;
  //     const sqft = document?.querySelector(
  //       '[data-tn="listing-page-summary-sq-ft"] .summary__StyledSummaryDetailUnit-e4c4ok-4 .textIntent-title2'
  //     )?.innerText;
  //     const sqftClean = sqft?.replace(/[,\bSq. Ft.]/g, "");
  //     const text = document?.querySelector(
  //       ".data-table__TableStyledTd-ibnf7p-1"
  //     )?.innerText;
  //     let comingSoon = false;
  //     if (text === "Coming Soon") {
  //       comingSoon = true;
  //     }
  //     const location = document?.querySelectorAll("ul.cx-breadcrumbs li");
  //     const city = location[2]?.querySelector("a")?.innerText;
  //     const postalCode = location[3]?.querySelector("a")?.innerText;
  //     const region = location[4]?.querySelector("a")?.innerText;
  //     const state = location[1]?.querySelector("a")?.innerText;
  //     const description = document?.querySelector(
  //       "div.description__StyledSectionWrapper-sc-1v5jw5i-2 div.textIntent-body div.sc-eGknBQ.WiThW"
  //     )?.innerText;
  //     name = name?.innerText;

  //     return {
  //       name,
  //       image: url,
  //       price: Number(priceClean),
  //       address,
  //       postalCode,
  //       city,
  //       region,
  //       state,
  //       beds,
  //       baths,
  //       sqft: Number(sqftClean),
  //       comingSoon,
  //       description,
  //     };
  //   });

  //   const propertyInfo = await page.evaluate(() => {
  //     const table = document?.querySelectorAll(
  //       '[data-tn="uc-listing-keyDetails"] .data-table__TableStyled-ibnf7p-0.kGzDjq tbody tr.keyDetails-text'
  //     );
  //     const status = table[0]?.querySelector(
  //       ".data-table__TableStyledTd-ibnf7p-1"
  //     )?.innerText;
  //     const daysOnCompass = table[1]?.querySelector(
  //       ".data-table__TableStyledTd-ibnf7p-1"
  //     )?.innerText;
  //     const taxes = table[2]?.querySelector(
  //       ".data-table__TableStyledTd-ibnf7p-1"
  //     )?.innerText;
  //     const hoaFees = table[3]?.querySelector(
  //       ".data-table__TableStyledTd-ibnf7p-1"
  //     )?.innerText;
  //     const condoCoopFees = table[4]?.querySelector(
  //       ".data-table__TableStyledTd-ibnf7p-1"
  //     )?.innerText;
  //     const compassType = table[5]?.querySelector(
  //       ".data-table__TableStyledTd-ibnf7p-1"
  //     )?.innerText;
  //     const mlsType = table[6]?.querySelector(
  //       ".data-table__TableStyledTd-ibnf7p-1"
  //     )?.innerText;
  //     const yearBuilt = table[7]?.querySelector(
  //       ".data-table__TableStyledTd-ibnf7p-1"
  //     )?.innerText;
  //     const lotSize = table[8]?.querySelector(
  //       ".data-table__TableStyledTd-ibnf7p-1"
  //     )?.innerText;
  //     const county = table[9]?.querySelector(
  //       ".data-table__TableStyledTd-ibnf7p-1"
  //     )?.innerText;

  //     return {
  //       status,
  //       daysOnCompass,
  //       taxes,
  //       hoaFees,
  //       condoCoopFees,
  //       compassType,
  //       mlsType,
  //       yearBuilt,
  //       lotSize,
  //       county,
  //     };
  //   });

  //   const schools = await page.evaluate(() => {
  //     const data = document.querySelectorAll(
  //       ".sc-evHTmi.jKTZGQ table.cx-react-table tbody .cx-react-tr"
  //     );
  //     let schoolArr = [];
  //     data.forEach((element) => {
  //       const innerData = element?.querySelectorAll(".cx-react-td");
  //       const ratingElement = innerData[0]?.querySelector(".sc-fnhnaa span");
  //       const nameElement = innerData[1]?.querySelector(
  //         ".sc-jWoPvc a.cx-textLink"
  //       );
  //       const typeElement = innerData[2]?.querySelector("span");
  //       const gradesElement = innerData[3];
  //       const distanceElement =
  //         innerData[4]?.querySelector(".sc-lkMDMP.icvjYO");

  //       if (
  //         ratingElement &&
  //         nameElement &&
  //         typeElement &&
  //         gradesElement &&
  //         distanceElement
  //       ) {
  //         const rating = ratingElement.innerHTML;
  //         const name = nameElement.innerHTML;
  //         const type = typeElement.innerHTML;
  //         const grades = gradesElement.innerHTML;
  //         const splitText = grades.split(" ");
  //         const gradesFrom = splitText[0];
  //         const gradesTo = splitText[2];
  //         const distance = distanceElement.innerHTML.split(" ")[0];

  //         schoolArr.push({
  //           rating,
  //           name,
  //           type,
  //           gradesFrom,
  //           gradesTo,
  //           distance,
  //         });
  //       } else {
  //         console.error("One or more required elements not found");
  //       }
  //     });

  //     return schoolArr;
  //   });

  //   const amenities = await page.evaluate(() => {
  //     function toCamelCase(str) {
  //       return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
  //         if (+match === 0) return "";
  //         return index === 0 ? match.toLowerCase() : match.toUpperCase();
  //       });
  //     }

  //     const data = document?.querySelectorAll(
  //       '#amenities-wrapper div ul li[data-tn="uc-listing-amenity"]'
  //     );
  //     const amenitiesArray = Array.from(data)?.map((item) => item?.innerText);

  //     const amenitiesObject = {};
  //     amenitiesArray.forEach((amenity) => {
  //       const camelCaseKey = toCamelCase(amenity);
  //       amenitiesObject[camelCaseKey] = amenity;
  //     });

  //     return amenitiesObject;
  //   });

  //   const buildingInfo = await page.evaluate(() => {
  //     const data = document?.querySelectorAll(
  //       'div[data-tn="listing-page-building-info-building-info-wrapper"] span.building-info__BuildingInfoLineItem-sc-85jvb8-1.ggYXgK'
  //     );

  //     function toCamelCase(str) {
  //       return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
  //         if (+match === 0) return "";
  //         return index === 0 ? match.toLowerCase() : match.toUpperCase();
  //       });
  //     }
  //     const buildingInfoMap = new Map();
  //     data.forEach((element) => {
  //       const key = element?.querySelector(
  //         'span[data-tn="uc-listing-buildingInfo"]'
  //       ).innerHTML;
  //       const value = element?.querySelector("strong")?.innerHTML;
  //       buildingInfoMap.set(toCamelCase(key), value);
  //     });
  //     const buildingInfoObject = Object.fromEntries(buildingInfoMap);
  //     return buildingInfoObject;
  //   });

  //   const homeFacts = await page.evaluate(() => {
  //     const data = document?.querySelectorAll(
  //       'div[data-tn="uc-listing-assessorInfo-homeFacts"] div.category-table__TableWrapper-sc-18hdii3-0.kXAGKf span.jbxvLV'
  //     );
  //     function toCamelCase(str) {
  //       return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
  //         if (+match === 0) return "";
  //         return index === 0 ? match.toLowerCase() : match.toUpperCase();
  //       });
  //     }
  //     const homeFactsInfoMap = new Map();
  //     data.forEach((element) => {
  //       const key = element?.querySelector("span").innerHTML;
  //       let value = element?.querySelector("strong").innerHTML;
  //       value = value.replace(/[,\bSq. Ft.]/g, "");
  //       homeFactsInfoMap.set(toCamelCase(key), value);
  //     });
  //     const homeFactsInfoObject = Object?.fromEntries(homeFactsInfoMap);
  //     return homeFactsInfoObject;
  //   });
  //   const homeForSale = await page.evaluate(() => {
  //     let categories = [];
  //     const title = document?.querySelector(
  //       "div#nearbySearchWrapper h2.uc-nearbySearch-title"
  //     )?.innerHTML;
  //     const data = document?.querySelectorAll(
  //       "div#nearbySearchWrapper div.uc-nearbySearch-container"
  //     );
  //     data.forEach((element) => {
  //       const data1 = element?.querySelectorAll("div.uc-nearbySearch-column");
  //       let links = [];
  //       data1.forEach((e) => {
  //         const name = e?.querySelector("h2.textIntent-title2")?.innerHTML;
  //         const item = e?.querySelectorAll("ul li");
  //         item.forEach((e2) => {
  //           const ans = e2.querySelector("a")?.innerHTML;
  //           links.push(ans);
  //         });
  //         links = Array.from(links);
  //         categories.push({ name, links });
  //       });
  //     });
  //     const disclaimer = document?.querySelector(
  //       ".disclaimer__StyledDisclaimer-tsc1ui-1"
  //     )?.innerHTML;
  //     return { title, categories, disclaimer };
  //   });

  //   const publicRecords = await page.evaluate(() => {
  //     const data = document?.querySelectorAll(
  //       "div#publicFacts div.public-facts__TaxInfoWrapper-sc-19n5r74-0.biERKw div.public-facts-subsection__PublicFactsSubsection-ee1xld-1"
  //     );
  //     if (data == undefined) {
  //       return null;
  //     }
  //     let records = {}; // Use an object to store the records
  //     let dataMap = new Map();
  //     const title = data[0]?.querySelector("strong")?.innerHTML;
  //     const data2 = data[0]?.querySelectorAll(
  //       "span.public-facts__TaxableValueItem-sc-19n5r74-1.dCnYGl"
  //     );
  //     if (data2 === undefined) return null;
  //     key = data2[0]?.querySelector("span")?.innerHTML;
  //     value = data2[0]
  //       ?.querySelector("strong")
  //       ?.innerHTML?.replace(/[$,]/g, "");
  //     dataMap.set(key, Number(value));
  //     key = data2[1]?.querySelector("span")?.innerHTML;
  //     value = data2[1]
  //       ?.querySelector("strong")
  //       ?.innerHTML?.replace(/[$,]/g, "");
  //     dataMap.set(key, Number(value));
  //     key = data2[2]?.querySelector("strong")?.innerHTML;
  //     value = data2[2]
  //       ?.querySelector("strong:nth-of-type(2)")
  //       ?.innerHTML?.replace(/[$,]/g, "");
  //     dataMap.set(key, Number(value));
  //     records[title] = Object.fromEntries(dataMap);

  //     let dataMap2 = new Map();
  //     const title2 = data[1]?.querySelector("strong")?.innerHTML;
  //     key = data[1]?.querySelector(
  //       "span.public-facts__TaxRecordItem-sc-19n5r74-2 span"
  //     )?.innerHTML;
  //     value = data[1]
  //       ?.querySelector("span.public-facts__TaxRecordItem-sc-19n5r74-2 strong")
  //       ?.innerHTML?.split(" ")[0]
  //       ?.replace(/[,$<!--]/g, "");

  //     dataMap2.set(key, Number(value));
  //     records[title2] = Object.fromEntries(dataMap2);
  //     return records;
  //   });

  //   //   console.log(schools);

  //   const combinedInfo = {
  //     ...infoElement,
  //     propertyListingDetails: propertyInfo,
  //     schools,
  //     amenities,
  //     buildingInfo,
  //     homeFacts,
  //     homeForSale,
  //     publicRecords,
  //   };
  //   InfoArray.push(combinedInfo);
  //   //   console.log(InfoArray);
  //   // console.log(JSON.stringify(InfoArray, null, 2));
  // }
  // //Save data to JSON file
  // fs.writeFile("demo4.json", JSON.stringify(InfoArray), (err) => {
  //   if (err) throw err;
  //   console.log("File saved");
  // });

  await browser.close();
}

async function run1() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(
    "https://www.compass.com/listing/25439-parklane-drive-hayward-ca-94544/1572807009604608657/"
  );
  await page.waitForSelector(
    "#propertyHistory .data-table__TableStyled-ibnf7p-0 tbody tr"
  );
  const propertyHistory = await page.evaluate(() => {
    const data1 = document.querySelector("#propertyHistory");
    const data = data1.querySelector("#propertyHistory table tbody");
    const data2 = data.querySelectorAll("tr");

    let property = [];

    return data2;
  });

  console.log(propertyHistory);
  await browser.close();
}

// run1();

async function run2() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(
    "https://www.compass.com/listing/8156-coach-drive-oakland-ca-94605/1588637535887343129/"
  );

  const amenities = await page.evaluate(() => {
    function toCamelCase(str) {
      return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
        if (+match === 0) return "";
        return index === 0 ? match.toLowerCase() : match.toUpperCase();
      });
    }

    const data = document.querySelectorAll(
      '#amenities-wrapper div ul li[data-tn="uc-listing-amenity"]'
    );
    const amenitiesArray = Array.from(data).map((item) => item.innerText);

    const amenitiesObject = {};
    amenitiesArray.forEach((amenity) => {
      const camelCaseKey = toCamelCase(amenity);
      amenitiesObject[camelCaseKey] = amenity;
    });

    return amenitiesObject;
  });

  console.log(amenities);
  await browser.close();
}

// run2();

async function run3() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(
    "https://www.compass.com/listing/139-waldo-avenue-piedmont-ca-94611/1597557520752950001/"
  );
  const buildingInfo = await page.evaluate(() => {
    const data = document.querySelectorAll(
      'div[data-tn="listing-page-building-info-building-info-wrapper"] span.building-info__BuildingInfoLineItem-sc-85jvb8-1.ggYXgK'
    );

    function toCamelCase(str) {
      return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
        if (+match === 0) return "";
        return index === 0 ? match.toLowerCase() : match.toUpperCase();
      });
    }
    const buildingInfoMap = new Map();
    data.forEach((element) => {
      const key = element.querySelector(
        'span[data-tn="uc-listing-buildingInfo"]'
      ).innerHTML;
      const value = element.querySelector("strong").innerHTML;
      buildingInfoMap.set(toCamelCase(key), value);
    });
    const buildingInfoObject = Object.fromEntries(buildingInfoMap);
    return buildingInfoObject;
  });
  console.log(buildingInfo);
  await browser.close();
}
// run3()

async function run4() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(
    "https://www.compass.com/listing/5-evirel-place-oakland-ca-94611/1603016919870853265/"
  );

  const homeFacts = await page.evaluate(() => {
    const data = document.querySelectorAll(
      'div[data-tn="uc-listing-assessorInfo-homeFacts"] div.category-table__TableWrapper-sc-18hdii3-0.kXAGKf span.jbxvLV'
    );
    function toCamelCase(str) {
      return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
        if (+match === 0) return "";
        return index === 0 ? match.toLowerCase() : match.toUpperCase();
      });
    }
    const homeFactsInfoMap = new Map();
    data.forEach((element) => {
      const key = element.querySelector("span").innerHTML;
      let value = element.querySelector("strong").innerHTML;
      value = value.replace(/[,\bSq. Ft.]/g, "");
      homeFactsInfoMap.set(toCamelCase(key), value);
    });
    const homeFactsInfoObject = Object.fromEntries(homeFactsInfoMap);
    return homeFactsInfoObject;
  });
  console.log(homeFacts);
  await browser.close();
}
// run4();

async function run5() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(
    "https://www.compass.com/listing/5-evirel-place-oakland-ca-94611/1603016919870853265/"
  );
  const homeForSale = await page.evaluate(() => {
    let categories = [];
    const title = document.querySelector(
      "div#nearbySearchWrapper h2.uc-nearbySearch-title"
    ).innerHTML;
    const data = document.querySelectorAll(
      "div#nearbySearchWrapper div.uc-nearbySearch-container"
    );
    data.forEach((element) => {
      const data1 = element.querySelectorAll("div.uc-nearbySearch-column");
      let links = [];
      data1.forEach((e) => {
        const name = e.querySelector("h2.textIntent-title2").innerHTML;
        const item = e.querySelectorAll("ul li");
        item.forEach((e2) => {
          const ans = e2.querySelector("a").innerHTML;
          links.push(ans);
        });
        links = Array.from(links);
        categories.push({ name, links });
      });
    });
    const disclaimer = document.querySelector(
      ".disclaimer__StyledDisclaimer-tsc1ui-1"
    ).innerHTML;
    return { title, categories, disclaimer };
  });
  console.log(JSON.stringify(homeForSale, null, 2));
  await browser.close();
}
// run5();

// const puppeteer = require('puppeteer');

// async function run6() {
//   const browser = await puppeteer.launch({ headless: false });
//   const page = await browser.newPage();
//   await page.goto("https://www.compass.com/listing/5-evirel-place-oakland-ca-94611/1603016919870853265/");

//   const publicRecords = await page.evaluate(() => {
//     const data = document.querySelectorAll('div#publicFacts div.public-facts__TaxInfoWrapper-sc-19n5r74-0.biERKw div.public-facts-subsection__PublicFactsSubsection-ee1xld-1');
//     let records = {}; // Use an object to store the records

//     data.forEach((element) => {
//       const titleElement = element.querySelector('strong').innerHTML;
//       const title = titleElement ? titleElement.innerHTML : 'No title found';

//       const data2 = element.querySelectorAll('span.public-facts__TaxableValueItem-sc-19n5r74-1.dCnYGl');
//       const dataMap = new Map();

//       data2.forEach((e) => {
//         const valueElement = e.querySelector('strong');
//         const keyElement = e.querySelector('span');

//         const key = keyElement ? keyElement.innerHTML : 'Unknown key';
//         const value = valueElement ? valueElement.innerHTML : 'Unknown value';

//         dataMap.set(key, value);
//       });

//       records[title] = Object.fromEntries(dataMap); // Convert Map to Object for easier logging
//     });

//     return records;
//   });

//   console.log(JSON.stringify(publicRecords, null, 2));
//   await browser.close();
// }

async function run6() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(
    "https://www.compass.com/listing/5-evirel-place-oakland-ca-94611/1603016919870853265/"
  );

  const publicRecords = await page.evaluate(() => {
    const data = document.querySelectorAll(
      "div#publicFacts div.public-facts__TaxInfoWrapper-sc-19n5r74-0.biERKw div.public-facts-subsection__PublicFactsSubsection-ee1xld-1"
    );
    let records = {}; // Use an object to store the records
    let dataMap = new Map();
    const title = data[0].querySelector("strong").innerHTML;
    const data2 = data[0].querySelectorAll(
      "span.public-facts__TaxableValueItem-sc-19n5r74-1.dCnYGl"
    );
    key = data2[0].querySelector("span").innerHTML;
    value = data2[0].querySelector("strong").innerHTML.replace(/[$,]/g, "");
    dataMap.set(key, Number(value));
    key = data2[1].querySelector("span").innerHTML;
    value = data2[1].querySelector("strong").innerHTML.replace(/[$,]/g, "");
    dataMap.set(key, Number(value));
    key = data2[2].querySelector("strong").innerHTML;
    value = data2[2]
      .querySelector("strong:nth-of-type(2)")
      .innerHTML.replace(/[$,]/g, "");
    dataMap.set(key, Number(value));
    records[title] = Object.fromEntries(dataMap);

    let dataMap2 = new Map();
    const title2 = data[1].querySelector("strong").innerHTML;
    key = data[1].querySelector(
      "span.public-facts__TaxRecordItem-sc-19n5r74-2 span"
    ).innerHTML;
    value = data[1]
      .querySelector("span.public-facts__TaxRecordItem-sc-19n5r74-2 strong")
      .innerHTML.split(" ")[0]
      .replace(/[,$<!--]/g, "");
    dataMap2.set(key, Number(value));
    records[title2] = Object.fromEntries(dataMap2);
    return records;
  });
  console.log(publicRecords);
  // console.log(JSON.stringify(publicRecords, null, 2));
  await browser.close();
}

// run6();

async function run7() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(
    "https://www.compass.com/listing/5-evirel-place-oakland-ca-94611/1603016919870853265/"
  );
  const propertyInformation = await page.evaluate(() => {});
}

// run7();

run();



const publicRecords = await page.evaluate(() => {
  const data = document.querySelectorAll(
    "div#publicFacts div.public-facts__TaxInfoWrapper-sc-19n5r74-0.biERKw div.public-facts-subsection__PublicFactsSubsection-ee1xld-1"
  );
  let records = {}; // Use an object to store the records
  let dataMap = new Map();
  const title = data[0].querySelector("strong").innerHTML;
  const data2 = data[0].querySelectorAll(
    "span.public-facts__TaxableValueItem-sc-19n5r74-1.dCnYGl"
  );
  key = data2[0].querySelector("span").innerHTML;
  value = data2[0].querySelector("strong").innerHTML.replace(/[$,]/g, "");
  dataMap.set(key, Number(value));
  key = data2[1].querySelector("span").innerHTML;
  value = data2[1].querySelector("strong").innerHTML.replace(/[$,]/g, "");
  dataMap.set(key, Number(value));
  key = data2[2].querySelector("strong").innerHTML;
  value = data2[2]
    .querySelector("strong:nth-of-type(2)")
    .innerHTML.replace(/[$,]/g, "");
  dataMap.set(key, Number(value));
  records[title] = Object.fromEntries(dataMap);

  let dataMap2 = new Map();
  const title2 = data[1].querySelector("strong").innerHTML;
  key = data[1].querySelector(
    "span.public-facts__TaxRecordItem-sc-19n5r74-2 span"
  ).innerHTML;
  value = data[1]
    .querySelector("span.public-facts__TaxRecordItem-sc-19n5r74-2 strong")
    .innerHTML.split(" ")[0]
    .replace(/[,$<!--]/g, "");
  dataMap2.set(key, Number(value));
  records[title2] = Object.fromEntries(dataMap2);
  return records;
});
console.log(publicRecords);
// console.log(JSON.stringify(publicRecords, null, 2));
await browser.close();
}