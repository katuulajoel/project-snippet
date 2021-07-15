import moment from "moment";

export function generateUserIntials(user) {
  return !user.avatar_url ? user.display_name.match(/\b(\w)/g).join("") : null;
}

export const getdateFormated = (date, showTime = false) => {
  var otherDates = moment.utc(date).local().fromNow();
  var calback = function () {
    return showTime ? "[" + otherDates + "], hh:mm A" : "[" + otherDates + "]";
  };
  return moment
    .utc(date)
    .local()
    .calendar(null, {
      sameDay: showTime ? "[Today], hh:mm A" : "[Today]",
      nextDay: calback,
      nextWeek: calback,
      lastDay: calback,
      lastWeek: calback,
      sameElse: showTime ? "Do MMM YYYY, hh:mm A" : "Do MMM YYYY",
    });
};
