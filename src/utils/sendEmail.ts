import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // use false for STARTTLS; true for SSL on port 465
  auth: {
    user: "adirana180@gmail.com",
    pass: "ybjd alfm dibd clya",
  },
});

// send email to user

export async function sendOtpToUsers({
  to,
  subject,
  text,
}: {
  to: string;
  subject: string;
  text: string;
}) {
  // Configure the mailoptions object
  const mailOptions = {
    from: "adirana180@gmail.com",
    to: to,
    subject: subject,
    text,
  };

  // Send the email
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("Error:", error);
    } else {
      console.log("Email sent: ", info.response);
    }
  });
}
