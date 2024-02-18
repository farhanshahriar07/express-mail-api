// app.js

const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import the cors middleware

const app = express();
const port = process.env.PORT || 3000;

// Middleware to enable CORS
app.use(cors());

// Middleware to parse JSON in the request body
app.use(bodyParser.json());

// POST endpoint for sending emails
app.post("/send-email", async (req, res) => {
  try {
    const { subject, text, senderEmail, senderName } = req.body;

    // Create a nodemailer transporter with your email service credentials
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "samanthahaque2@gmail.com",
        pass: "pksf adnc udfb hkpq",
      },
    });

    // Define the email options
    const mailOptions = {
      from: "samanthahaque2@gmail.com", // Use senderEmail if provided, otherwise use default sender
      to: "frhnshhrr@gmail.com",
      subject,
      html: `
    <div style="font-family: 'Arial', sans-serif; background-color: #f4f4f4; padding: 20px; border-radius: 10px;">
      ${
        senderName
          ? `<p style="font-size: 18px; color: #0066cc; margin-bottom: 10px;">From: ${senderName} &lt;${senderEmail}&gt;</p>`
          : ""
      }
      <p style="font-size: 20px; color: #333; margin-bottom: 20px; white-space: pre-line;">${text}</p>
      <div style="border-top: 1px solid #ccc; padding-top: 15px; color: #777;">
        <p style="font-size: 14px;">Thank you for your attention.</p>
      </div>
    </div>
  `, // Add sender info to the HTML body with enhanced styling and preserve line breaks
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent:", info.response);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/", (req, res) => {
  const serverInfo = {
    host: req.headers.host,
    port,
  };
  res.json(serverInfo);
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
