// https://github.com/leek-wars/leek-wars/tree/master/public/image/component

divs = document.getElementsByClassName("react-directory-filename-cell");

chip_name_to_image = {};

// https://github.com/leek-wars/leek-wars/blob/master/public/image/component/whip.png
// https://raw.githubusercontent.com/leek-wars/leek-wars/refs/heads/master/public/image/component/whip.png
curlScript = "";

// divs[0].childNodes[0].childNodes[0].href
for (let i = 1; i < divs.length; i += 2) {
  imgUrl = divs[i].childNodes[0].childNodes[0].href;

  // curl script to download image in current directory

  imgFileName = imgUrl.substring(imgUrl.lastIndexOf("/") + 1);

  curlUrl =
    "https://raw.githubusercontent.com/leek-wars/leek-wars/refs/heads/master/public/image/component/";
  curlScript += 'curl -O "' + curlUrl + imgFileName + '"\n';

  newImgUrl = "/assets/images/components/" + imgFileName;
  // remove .png extension
  imgFileName2 = imgFileName.substring(0, imgFileName.length - 4);
  console.log("name: " + imgFileName2 + ', url: "' + newImgUrl + '"');
  chip_name_to_image[imgFileName2] = newImgUrl;
}

console.log("\n\nCurl script to download all images:\n\n" + curlScript);

// // final object to copy-paste
// console.log("\n\nFinal object to copy-paste:\n\n");
// console.log(JSON.stringify(chip_name_to_image, null, 2));
