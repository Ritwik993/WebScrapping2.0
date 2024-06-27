
import puppeteer from "puppeteer";
import fs from "fs";
import express from "express";
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

// let sum = 0;
// let c = 0;
app.post("/scrap", async (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).send({ error: "URL is required" });
  }
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    // c++;
    // await page.goto(
    //   `https://www.compass.com/homes-for-sale/alameda-county-ca/start=${c1}/`,
    //   { timeout: 90000 }
    // );
    await page.goto(url, {
      timeout: 90000,
    });
    let InfoArray = [];

    function toCamelCase(str) {
      return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
        if (+match === 0) return "";
        return index === 0 ? match.toLowerCase() : match.toUpperCase();
      });
    }
    
    function formatDateFromTimestamp(timestamp) {
      let date = new Date(timestamp);

      let year = date.getFullYear();
      let month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so add 1
      let day = String(date.getDate()).padStart(2, "0");

      return `${year}-${month}-${day}`;
    }

    const pageElement = await page.evaluate(() => {
      const element = document.querySelectorAll(
        ".uc-lolCardView-cards .uc-listingPhotoCard"
      );
      const urls = [];
      element.forEach(async (e1) => {
        const url = e1.querySelector("a").href;
        urls.push(url);
      });
      return urls;
    });
    console.log(pageElement);

    for (const url of pageElement) {
      await page.goto(url, { waitUntil: "networkidle2" });

      const infoElement = await page.evaluate(() => {
        let name = document?.querySelector(".summary__StyledAddress-e4c4ok-8");
        let urlElement = document?.querySelector("#media-gallery-hero-image");
        let url = urlElement ? urlElement?.getAttribute("src") : null;
        const price =
          document?.querySelector(".summary__StyledSummaryDetailUnit-e4c4ok-4")
            ?.innerText || null;
        let priceClean = price?.replace(/[$,]/g, "")?.replace(/\s*Price/, "");
        const address = document?.querySelector(
          ".summary__StyledAddressSubtitle-e4c4ok-9"
        )?.innerText;
        // const beds = document?.querySelector(
        //   '[data-tn="listing-page-summary-beds"] .summary__StyledSummaryDetailUnit-e4c4ok-4 .textIntent-title2'
        // )?.innerText;
        // let baths = document?.querySelector(
        //   '[data-tn="listing-page-summary-baths"] .summary__StyledSummaryDetailUnit-e4c4ok-4 .textIntent-title2'
        // )?.innerText;
        // if (baths == null || baths == undefined) {
        // //   baths = 0;
        // // }
        // const sqft = document?.querySelector(
        //   '[data-tn="listing-page-summary-sq-ft"] .summary__StyledSummaryDetailUnit-e4c4ok-4 .textIntent-title2'
        // )?.innerText;
        // const sqftClean = sqft?.replace(/[,\bSq. Ft.]/g, "");
        const text = document?.querySelector(
          ".data-table__TableStyledTd-ibnf7p-1"
        )?.innerText;
        let comingSoon = false;
        if (text === "Coming Soon") {
          comingSoon = true;
        }
        const location = document?.querySelectorAll("ul.cx-breadcrumbs li");
        const city = location[2]?.querySelector("a")?.innerText || null;
        const postalCode = location[3]?.querySelector("a")?.innerText || null;
        const region = location[4]?.querySelector("a")?.innerText || null;
        const state = location[1]?.querySelector("a")?.innerText || null;
        const description =
          document?.querySelector(
            "div.description__StyledSectionWrapper-sc-1v5jw5i-2 div.textIntent-body div.sc-eGknBQ.WiThW"
          )?.innerText || null;
        name = name?.innerText;

        return {
          name,
          image: url,
          price: Number(priceClean),
          address,
          postalCode,
          city,
          region,
          state,
          comingSoon,
          description,
        };
      });
      //   console.log(schools);
      // Access and manipulate window variable
      const result = await page.evaluate(() => {
        // Example of complex interaction
        let myVar = window.__PARTIAL_INITIAL_DATA__; // Access variable
        // myVar += " - modified"; // Modify it
        return myVar; // Return the modified value
      });

      const baths =
        result?.props?.listingRelation?.listing?.size?.bathrooms || 0;
      const beds = result?.props?.listingRelation?.listing?.size?.bedrooms || 0;
      const sqft =
        result?.props?.listingRelation?.listing?.size?.squareFeet || 0;
      const result3 =
        result?.props?.listingRelation?.listing?.detailedInfo?.keyDetails;
      const MapObject = new Map();
      for (let i = 0; i < result3?.length; i++) {
        let key = toCamelCase(result3[i]?.key)?.replace(/[^a-zA-Z]/g, "");
        let value = result3[i]?.value;
        MapObject.set(key, value);
      }
      const propertyListingDetails = Object.fromEntries(MapObject);

      // const propertyInfo = await page.evaluate(() => {
      //   const table = document?.querySelectorAll(
      //     '[data-tn="uc-listing-keyDetails"] .data-table__TableStyled-ibnf7p-0.kGzDjq tbody tr.keyDetails-text'
      //   );
      //   const status =
      //     table[0]?.querySelector(".data-table__TableStyledTd-ibnf7p-1")
      //       ?.innerText || null;
      //   const daysOnCompass =
      //     table[1]?.querySelector(".data-table__TableStyledTd-ibnf7p-1")
      //       ?.innerText || null;
      //   const taxes =
      //     table[2]?.querySelector(".data-table__TableStyledTd-ibnf7p-1")
      //       ?.innerText || null;
      //   const hoaFees =
      //     table[3]?.querySelector(".data-table__TableStyledTd-ibnf7p-1")
      //       ?.innerText || null;
      //   const condoCoopFees =
      //     table[4]?.querySelector(".data-table__TableStyledTd-ibnf7p-1")
      //       ?.innerText || null;
      //   const compassType =
      //     table[5]?.querySelector(".data-table__TableStyledTd-ibnf7p-1")
      //       ?.innerText || null;
      //   const mlsType =
      //     table[6]?.querySelector(".data-table__TableStyledTd-ibnf7p-1")
      //       ?.innerText || null;
      //   const yearBuilt =
      //     table[7]?.querySelector(".data-table__TableStyledTd-ibnf7p-1")
      //       ?.innerText || null;
      //   const lotSize =
      //     table[8]?.querySelector(".data-table__TableStyledTd-ibnf7p-1")
      //       ?.innerText || null;
      //   const county =
      //     table[9]?.querySelector(".data-table__TableStyledTd-ibnf7p-1")
      //       ?.innerText || null;

      //   return {
      //     status,
      //     daysOnCompass,
      //     taxes,
      //     hoaFees,
      //     condoCoopFees,
      //     compassType,
      //     mlsType,
      //     yearBuilt,
      //     lotSize,
      //     county,
      //   };
      // });

      const schools = await page.evaluate(() => {
        const data = document.querySelectorAll(
          ".sc-evHTmi.jKTZGQ table.cx-react-table tbody .cx-react-tr"
        );
        let schoolArr = [];
        data.forEach((element) => {
          const innerData = element?.querySelectorAll(".cx-react-td");
          const ratingElement = innerData[0]?.querySelector(".sc-fnhnaa span");
          const nameElement = innerData[1]?.querySelector(
            ".sc-jWoPvc a.cx-textLink"
          );
          const typeElement = innerData[2]?.querySelector("span");
          const gradesElement = innerData[3];
          const distanceElement =
            innerData[4]?.querySelector(".sc-lkMDMP.icvjYO");

          if (
            ratingElement &&
            nameElement &&
            typeElement &&
            gradesElement &&
            distanceElement
          ) {
            const rating = ratingElement.innerHTML;
            const name = nameElement.innerHTML;
            const type = typeElement.innerHTML;
            const grades = gradesElement.innerHTML;
            const splitText = grades.split(" ");
            const gradesFrom = splitText[0];
            const gradesTo = splitText[2];
            const distance = distanceElement.innerHTML.split(" ")[0];

            schoolArr.push({
              rating,
              name,
              type,
              gradesFrom,
              gradesTo,
              distance,
            });
          } else {
            console.error("One or more required elements not found");
          }
        });

        return schoolArr;
      });

      // const amenities = await page.evaluate(() => {
      //   function toCamelCase(str) {
      //     return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
      //       if (+match === 0) return "";
      //       return index === 0 ? match.toLowerCase() : match.toUpperCase();
      //     });
      //   }

      //   const data = document?.querySelectorAll(
      //     '#amenities-wrapper div ul li[data-tn="uc-listing-amenity"]'
      //   );
      //   const amenitiesArray = Array.from(data)?.map((item) => item?.innerText);

      //   const amenitiesObject = {};
      //   amenitiesArray.forEach((amenity) => {
      //     const camelCaseKey = toCamelCase(amenity);
      //     amenitiesObject[camelCaseKey] = amenity;
      //   });

      //   return amenitiesObject;
      // });

      const result4 =
        result?.props?.listingRelation?.listing?.detailedInfo?.amenities;
      // const propertyListingDetails = {};
      const MapObject2 = new Map();
      for (let i = 0; i < result4?.length; i++) {
        let key = toCamelCase(result4[i])?.replace(/[^a-zA-Z]/g, "");
        let value = result4[i];
        MapObject2.set(key, value);
      }
      const amenities = Object.fromEntries(MapObject2);
      const buildingInfo = await page.evaluate(() => {
        const data = document?.querySelectorAll(
          'div[data-tn="listing-page-building-info-building-info-wrapper"] span.building-info__BuildingInfoLineItem-sc-85jvb8-1.ggYXgK'
        );

        function toCamelCase(str) {
          return str.replace(
            /(?:^\w|[A-Z]|\b\w|\s+)/g,
            function (match, index) {
              if (+match === 0) return "";
              return index === 0 ? match.toLowerCase() : match.toUpperCase();
            }
          );
        }
        const buildingInfoMap = new Map();
        data.forEach((element) => {
          const key = element?.querySelector(
            'span[data-tn="uc-listing-buildingInfo"]'
          ).innerHTML;
          const value = element?.querySelector("strong")?.innerHTML;
          buildingInfoMap.set(toCamelCase(key), value);
        });
        const buildingInfoObject = Object.fromEntries(buildingInfoMap);
        return buildingInfoObject;
      });

      const homeFacts = await page.evaluate(() => {
        const data = document?.querySelectorAll(
          'div[data-tn="uc-listing-assessorInfo-homeFacts"] div.category-table__TableWrapper-sc-18hdii3-0.kXAGKf span.jbxvLV'
        );
        function toCamelCase(str) {
          return str.replace(
            /(?:^\w|[A-Z]|\b\w|\s+)/g,
            function (match, index) {
              if (+match === 0) return "";
              return index === 0 ? match.toLowerCase() : match.toUpperCase();
            }
          );
        }
        const homeFactsInfoMap = new Map();
        data.forEach((element) => {
          const key = element?.querySelector("span").innerHTML;
          let value = element?.querySelector("strong").innerHTML;
          value = value.replace(/[,\bSq. Ft.]/g, "");
          homeFactsInfoMap.set(toCamelCase(key), value);
        });
        const homeFactsInfoObject = Object?.fromEntries(homeFactsInfoMap);
        return homeFactsInfoObject;
      });
      const homeForSale = await page.evaluate(() => {
        let categories = [];
        const title = document?.querySelector(
          "div#nearbySearchWrapper h2.uc-nearbySearch-title"
        )?.innerHTML;
        const data = document?.querySelectorAll(
          "div#nearbySearchWrapper div.uc-nearbySearch-container"
        );
        data.forEach((element) => {
          const data1 = element?.querySelectorAll("div.uc-nearbySearch-column");
          let links = [];
          data1.forEach((e) => {
            const name = e?.querySelector("h2.textIntent-title2")?.innerHTML;
            const item = e?.querySelectorAll("ul li");
            item.forEach((e2) => {
              const ans = e2.querySelector("a")?.innerHTML;
              links.push(ans);
            });
            links = Array.from(links);
            categories.push({ name, links });
          });
        });
        const disclaimer = document?.querySelector(
          ".disclaimer__StyledDisclaimer-tsc1ui-1"
        )?.innerHTML;
        return { title, categories, disclaimer };
      });

      const publicRecords = await page.evaluate(() => {
        function toCamelCase(str) {
          return str?.replace(
            /(?:^\w|[A-Z]|\b\w|\s+)/g,
            function (match, index) {
              if (+match === 0) return "";
              return index === 0 ? match.toLowerCase() : match.toUpperCase();
            }
          );
        }
        const data = document?.querySelectorAll(
          "div#publicFacts div.public-facts__TaxInfoWrapper-sc-19n5r74-0.biERKw div.public-facts-subsection__PublicFactsSubsection-ee1xld-1"
        );
        if (data == undefined) {
          return null;
        }
        let records = {}; // Use an object to store the records
        let dataMap = new Map();
        const title = toCamelCase(data[0]?.querySelector("strong")?.innerHTML);
        const data2 = data[0]?.querySelectorAll(
          "span.public-facts__TaxableValueItem-sc-19n5r74-1.dCnYGl"
        );
        if (data2 === undefined) return null;
        key = data2[0]?.querySelector("span")?.innerHTML;
        value = data2[0]
          ?.querySelector("strong")
          ?.innerHTML?.replace(/[$,]/g, "");
        dataMap?.set(toCamelCase(key), Number(value));
        key = data2[1]?.querySelector("span")?.innerHTML;
        value = data2[1]
          ?.querySelector("strong")
          ?.innerHTML?.replace(/[$,]/g, "");
        dataMap.set(toCamelCase(key), Number(value));
        key = data2[2]?.querySelector("strong")?.innerHTML;
        value = data2[2]
          ?.querySelector("strong:nth-of-type(2)")
          ?.innerHTML?.replace(/[$,]/g, "");
        dataMap.set(toCamelCase(key), Number(value));
        records[title] = Object.fromEntries(dataMap);

        let dataMap2 = new Map();
        const title2 = toCamelCase(data[1]?.querySelector("strong")?.innerHTML);
        key = data[1]?.querySelector(
          "span.public-facts__TaxRecordItem-sc-19n5r74-2 span"
        )?.innerHTML;
        value = data[1]
          ?.querySelector(
            "span.public-facts__TaxRecordItem-sc-19n5r74-2 strong"
          )
          ?.innerHTML?.split(" ")[0]
          ?.replace(/[,$<!--]/g, "");

        dataMap2.set(toCamelCase(key), Number(value));
        records[title2] = Object.fromEntries(dataMap2);
        return records;
      });

      let ans = result?.props?.listingRelation?.listing.history;
      let propertyHistory = [];
      for (let i = 0; i < ans?.length; i++) {
        let price = ans[i]?.price;
        let eventAndSource =
          ans[i]?.localizedStatus +
          " " +
          ans[i]?.source?.sourceDisplayName +
          " " +
          ans[i]?.source?.externalSourceId;
        let date = formatDateFromTimestamp(ans[i]?.timestamp);
        propertyHistory.push({
          price,
          eventAndSource,
          date,
          appreciation: 0.0,
        });
      }

      let recordsArr = {};
      let dataMap = new Map();
      let ans1 =
        result?.props?.listingRelation?.listing?.detailedInfo?.listingDetails;
      for (let i = 0; i < ans1?.length; i++) {
        let data = ans1[i]?.subCategories;
        let records = {};
        let records3 = {};
        for (let k = 0; k < ans1[i]?.subCategories.length; k++) {
          let records2 = {};
          // records2[toCamelCase(ans1[i]?.subCategories[k]?.fields[0]?.key?.replace("/",""))]=ans1[i]?.subCategories[k]?.fields[0]?.values[0];
          records2[
            toCamelCase(
              ans1[i]?.subCategories[k]?.fields[0]?.key?.replace(/[\s/]/g, "")
            )
          ] = ans1[i]?.subCategories[k]?.fields[0]?.values[0];
          // let midKey=toCamelCase(ans1[i]?.subCategories[k]?.name)?.replace("/","");
          let midKey = toCamelCase(
            ans1[i]?.subCategories[k]?.name?.replace(/[\s/]/g, "")
          );
          records3[midKey] = records2;
        }
        //records[toCamelCase(ans1[i]?.name).replace(/[\s/]/g, "")]=records3;
        recordsArr[toCamelCase(ans1[i]?.name?.replace(/[\s/]/g, ""))] =
          records3;
        //recordsArr.push(records);
        // console.log(JSON.stringify(records, null, 2));
      }

      // console.log(recordsArr);

      const combinedInfo = {
        ...infoElement,
        baths,
        beds,
        sqft,
        propertyListingDetails,
        latitude: result?.props?.listingRelation?.listing?.location?.latitude,
        longitude: result?.props?.listingRelation?.listing?.location?.longitude,
        schools,
        amenities,
        buildingInfo,
        propertyHistory,
        homeFacts,
        propertyInformation: recordsArr,
        homeForSale,
        publicRecords,
      };
      if (infoElement.image) InfoArray.push(combinedInfo);
      //   console.log(InfoArray);
      // console.log(JSON.stringify(InfoArray, null, 2));
    }
    //Save data to JSON file

    // if (c <= 8) {
    //   sum = sum + 41;
    //   run(sum);
    //   // await browser.close();
    // }

    fs.appendFile("page5.json", JSON.stringify(InfoArray), (err) => {
      if (err) throw err;
      console.log("File saved");
    });

    await browser.close();
    return res.status(200).json({
      success: true,
      InfoArray,
    });
  } catch (err) {
    return res.status(500).send({ error: "Failed to scrape data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on the port ${PORT}`);
});
