export function handleTime (props) {
  let timeString = '';
  let time = new Date(props);
  let currTime = new Date();
  let ms = currTime.getTime() - time.getTime();
  let t;
  if (ms < 60 * 1000) {
    t = Math.floor(ms / 1000);
    if (t === 1) {
      timeString = t + ' second ago';
    } else {
      timeString = t + ' seconds ago';
    }
  } else if (ms < 60 * 60 * 1000) {
    t = Math.floor(ms / 60 / 1000);
    if (t === 1) {
      timeString = t + ' minute ago';
    } else {
      timeString = t + ' minutes ago';
    }
  } else if (ms < 24 * 60 * 60 * 1000) {
    t = Math.floor(ms / 60 / 60 / 1000);
    if (t === 1) {
      timeString = t + ' hour ago';
    } else {
      timeString = t + ' hours ago';
    }
  } else if (ms < 7 * 24 * 60 * 60 * 1000) {
    t = Math.floor(ms / 24 / 60 / 60 / 1000);
    if (t === 1) {
      timeString = t + ' day ago';
    } else {
      timeString = t + ' days ago';
    }
  } else if (ms < 4 * 7 * 24 * 60 * 60 * 1000) {
    t = Math.floor(ms / 7 / 24 / 60 / 60 / 1000);
    if (t === 1) {
      timeString = t + ' week ago';
    } else {
      timeString = t + ' weeks ago';
    }
  } else if (ms < 12 * 4 * 7 * 24 * 60 * 60 * 1000) {
    t = Math.floor(ms / 4 / 7 / 24 / 60 / 60 / 1000);
    if (t === 1) {
      timeString = t + ' month ago';
    } else {
      timeString = t + ' months ago';
    }
  } else {
    t = Math.floor(ms / 12 / 4 / 7 / 24 / 60 / 60 / 1000);
    if (t === 1) {
      timeString = t + ' year ago';
    } else {
      timeString = t + ' years ago';
    }
  }
  return timeString;
};