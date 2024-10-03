// import User from "@/models/userModel";
// import nodemailer from "nodemailer";
// import bcryptjs from "bcryptjs";

// export const sendEmail = async ({ email, emailType, userId }: any) => {
//   try {
//     const hashedToken = await bcryptjs.hash(userId.toString(), 10);
//     if (emailType === "VERIFY") {
//       await User.findByIdAndUpdate(userId, {
//         verifyToken: hashedToken,
//         verifyTokenExpiry: Date.now() + 3600000,
//       });
//     } else if (emailType === "RESET") {
//       await User.findByIdAndUpdate(userId, {
//         forgotPasswordToken: hashedToken,
//         forgotPasswordTokenExpiry: Date.now() + 3600000,
//       });
//     }

//     //todo configure mail for usage here

//     var transport = nodemailer.createTransport({
//       host: "sandbox.smtp.mailtrap.io",
//       port: 2525,
//       auth: {
//         user: "11e29ee0dc4308",
//         pass: "d8593681c88a9c"
//       }
//     });
//     const mailOptions = {
//       from: "nihalbagul98@gmail.com", // sender address
//       to: "email", // list of receivers
//       subject:
//         emailType === "VERIFY" ? "Verify your email" : "Reset your password", // Subject line
//       // plain text body
//       html: `<p>Click <a href="${
//         process.env.DOMAIN
//       }/verifyemail?token=${hashedToken}">here</a> to ${
//         emailType === "VERIFY" ? "verify your email" : "reset your password"
//       }
//         or copy and paste the link below in your browser. <br> ${
//           process.env.DOMAIN
//         }/verifyemail?token=${hashedToken}
//         </p>`,
//     };

//     const mailResponse = await transport.sendMail(mailOptions);
//   } catch (error: any) {
//     throw new Error(error.message);
//   }
// };



import nodemailer from 'nodemailer';
import User from "@/models/userModel";
import bcryptjs from 'bcryptjs';


export const sendEmail = async({email, emailType, userId}:any) => {
    try {
        // create a hased token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, 
                {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000})
        } else if (emailType === "RESET"){
            await User.findByIdAndUpdate(userId, 
                {forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000})
        }

        var transport = nodemailer.createTransport({
          host: "sandbox.smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: "11e29ee0dc4308",
            pass: "d8593681c88a9c"
          }
        });


        const mailOptions = {
            from: 'nihalbagul98@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
        }

        const mailresponse = await transport.sendMail
        (mailOptions);
        return mailresponse;

    } catch (error:any) {
        throw new Error(error.message);
    }
}