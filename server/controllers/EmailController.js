const nodemailer = require("nodemailer");
require("dotenv").config();

const emailHandler = async (req, res) => {
  try {
    const { data, email } = req.body;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    const tableRows = data.map(
      (item) => `
    <tr>
    <td style="border: 1px solid black; padding: 5px;">${item.name}</td>
    <td style="border: 1px solid black; padding: 5px;">${item.email}</td>
    <td style="border: 1px solid black; padding: 5px;">${item.hobbies}</td>
    <td style="border: 1px solid black; padding: 5px;">${item.phone}</td>
    </tr>
  `
    );

    const tableHtml = `
    <table style="border-collapse: collapse; width: 100%;">
    <thead>
      <tr>
        <th style="border: 1px solid black; padding: 5px;">Name</th>
        <th style="border: 1px solid black; padding: 5px;">Email</th>
        <th style="border: 1px solid black; padding: 5px;">Hobbies</th>
        <th style="border: 1px solid black; padding: 5px;">Phone</th>
      </tr>
    </thead>
    <tbody>
      ${tableRows.join("")}
    </tbody>
  </table>
  `;

    // Setup email data
    const mailOptions = {
      from: process.env.USER,
      to: email,
      subject: "Data from Pushkar Khare's intern project",
      html: `<h1> Data: </h1>${tableHtml}`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Error sending email" });
  }
};

module.exports = { emailHandler };
