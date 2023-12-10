import sendEmail from './sendEmail.js';
import Token from "../../models/tokenModel.js";
import crypto from "crypto";


const verifyEmail = async (user) => { 
    const verificationToken = crypto.randomBytes(32).toString("hex");

    let token = await Token.findOne({ userId: user._id });
    if (token) {
      await token.deleteOne();
    }

    await new Token({
        userId: user._id,
        token: verificationToken,
        createdAt: Date.now(),
    }).save();

    // const link = `${process.env.API_URL}/users/api/verify-email/${verificationToken}`;
    const link = `${process.env.CLIENT_URL}/emailVerification/${verificationToken}`;

    try {
        await sendEmail(
            user.email, 
            'Verify your email',
            { name: user.name, link: link },
            './template/verifyEmail.handlebars'
        );
    } catch (error) {
        console.error('Error sending verification email:', error);
    }
};

export default verifyEmail;
