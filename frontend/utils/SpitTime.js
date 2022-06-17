const MS_TO_HR = 3600000;
const MS_TO_MIN = 60000;
const MS_TO_SEC = 1000;

const spitTime = (ms) => {
  
  let hr = Math.floor(ms / MS_TO_HR);
  hr = hr == 0 ? `` : `${hr}hrs:`;

  let min = Math.floor(ms / MS_TO_MIN);
  min %= 60;
  min = min == 0 ? `` : `${min}mins:`;

  let sec = Math.floor(ms / MS_TO_SEC);
  sec %= 60;
  sec = `${sec}sec`;

  const time = `${hr}${min}${sec}`;
  return time;
};

export { spitTime };