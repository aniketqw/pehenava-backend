export {};

declare global {
  var otpStore: {
    email: string;
    otp: string;
    expires: number;
  } | null;
}
