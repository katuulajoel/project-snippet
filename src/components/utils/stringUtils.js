const helpers = {
  generate: function (length = 8) {
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

export function generateUserIntials(user) {
  return !user.avatar_url ? user.display_name.match(/\b(\w)/g).join("") : null;
}

export default helpers;
