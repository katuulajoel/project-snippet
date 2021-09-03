import moment from "moment";
import humanizeDuration from "humanize-duration";

export const getdateFormated = (date, showTime = false) => {
  const localTime = convertUTCToLocal(date);
  var otherDates = moment(localTime).fromNow();
  var calback = function () {
    return showTime ? "[" + otherDates + "], hh:mm A" : "[" + otherDates + "]";
  };
  return moment(localTime).calendar(null, {
    sameDay: showTime ? "[Today], hh:mm A" : "[Today]",
    nextDay: calback,
    nextWeek: calback,
    lastDay: calback,
    lastWeek: calback,
    sameElse: showTime ? "Do MMM YYYY, hh:mm A" : "Do MMM YYYY",
  });
};

// convert utc time to local time
function convertUTCToLocal(utcDt) {
  var toDt = moment.utc(utcDt).toDate();
  return moment(toDt).format("YYYY-MM-DD hh:mm:ss A");
}

export const getDays = (date) => {
  let period = humanizeDuration(
    (moment().unix() - moment.utc(date).add("day", 1).startOf("day").unix()) *
      1000,
    { largest: 1, round: true, units: ["d"] }
  ).split(" ");
  return { number: period[0], name: period[1] };
};

export const seconds_with_leading_zeros = () => {
  return /\((.*)\)/.exec(new Date().toString())[1];
};