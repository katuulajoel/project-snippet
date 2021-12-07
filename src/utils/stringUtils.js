const helpers = {
  generate: (length = 8) => {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  },
};

export const numberWithCommas = (x) => {
  if (x) {
    return x
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else {
    return x ? x.toFixed(2) : "0.00";
  }
};

/**
 * Genereta string from first letters of users display name
 * @param {*} user
 * @returns {string}
 */
export const generateUserIntials = (user) => {
  return !user?.avatar_url
    ? user?.display_name.match(/\b(\w)/g).join("")
    : null;
};

/**
 * scr= "https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url"
 * Handle checking if a string is a url
 * @param {object} str - String
 * @returns {Boolean}
 */

export const validURL = (str) => {
  var pattern = new RegExp(
    "((http|https):\\/\\/)" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
};

export default helpers;
