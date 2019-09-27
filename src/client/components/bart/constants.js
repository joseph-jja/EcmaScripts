// bart api host
export const BART_API_HOST = 'https://api.bart.gov';

// key 
export const BART_API_KEY = 'MW9S-E7SL-26DU-VV8V';
export const KEY_STRING_API = `&json=y&key=${BART_API_KEY}`;

// get all the stations
export const GET_STATION_LIST_API = `${BART_API_HOST}/api/stn.aspx?cmd=stns${KEY_STRING_API}`;

// get the trains at a particular station
export const GET_TRAIN_LIST_API = `${BART_API_HOST}/api/etd.aspx?cmd=etd${KEY_STRING_API}&orig=`;

// used to calculate fair
export const FAIR_API = `${BART_API_HOST}/api/sched.aspx?cmd=fare${KEY_STRING_API}&orig=`;
export const FAIR_DEST = '&dest=';

// trip planning
export const SCHEDULE_DEPART = `${BART_API_HOST}/api/sched.aspx?cmd=depart${KEY_STRING_API}&b=0&a=3&orig=`;
export const SCHEDULE_ARRIVE = `${BART_API_HOST}/api/sched.aspx?cmd=arrive${KEY_STRING_API}&b=2&a=1&orig=`;
export const SCHEDULE_DEST = '&dest=';
export const SCHEDULE_DATE = '&date='; // mm/dd/yyyy
export const SCHEDULE_TIME = '&time='; //h:mm+am/pm

// alerts api
export const ALERTS_API = `${BART_API_HOST}/api/bsa.aspx?cmd=bsa${KEY_STRING_API}`;