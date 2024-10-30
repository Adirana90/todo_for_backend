export function generateOTP() {
  let otp = "";

  for (let i = 0; i < 6; i++) {
    const randomNum = Math.floor(Math.random() * 9);
    otp += randomNum;
  }

  return otp;
}
