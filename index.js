import { http,params } from "@ampt/sdk";
import express, { Router } from "express";
import {data} from "@ampt/data";
import { Resend } from 'resend';
const resend = new Resend(params("RESEND_API_KEY"));
const app = express();
app.use(express.json());
const api = Router();

api.post("/signup", async (req, res) => {
  const { email, firstName, lastName } = req.body || {};
 
  const result = data.set(`user_${email}`, {
    email, 
    firstName,
    lastName
  });
  return res.status(200).send({
    body: req.body,
    message: "Signup successful!",
  });
});

data.on("created:user_*", async(event) => {
  const record = event.item.value;
  resend.emails.send({
    from: params("SENDER_EMAIL"),
    to: record.email,
    subject: 'Hello ' + record.firstName + " with Resend!",
    html: '<p>Welcome to my tiny SaaS <strong>' + record.firstName + ' ' + record.lastName + '</strong>!</p>'
  });
});

api.post("/webhook", async (req, res) => {
  const payload = req.body || {};
  if(payload.type == 'email.bounced') {
    payload.data.to.forEach(element => {
      data.remove('user_' + element);
    });
  }
   
  return res.status(200).send({
    message: "Webhook handled!",
  });
});

app.use("/api", api);

http.node.use(app);