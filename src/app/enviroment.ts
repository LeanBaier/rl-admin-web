export const environment = {
  production: false,
  apiStudyDocumentsUrl: '/api-study-documents',
  apiAuthenticationUrl: '/auth-server',
}

export const constants = {
  tokenKey: 'rl-token',
}

export function changeTimezone(date: Date) {
  let invdate = new Date(date.toLocaleString('es-AR', {
    timeZone: 'America/Argentina/Buenos_Aires'
  }));

  console.log(invdate);
  // then invdate will be 07:00 in Toronto
  // and the diff is 5 hours
  let diff = date.getTime() - invdate.getTime();

  console.log(diff);
  // so 12:00 in Toronto is 17:00 UTC
  return new Date(date.getTime() - diff);
}


