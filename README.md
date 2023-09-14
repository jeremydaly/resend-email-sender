# Resend Email Sender with Ampt

[<img src="https://getampt.com/button"/>](https://ampt.dev/start?template=resend-email-sender)

This project showcases a simple transactional email sender using Resend on Ampt. The application uses the data change handler to send the email asynchronously. 

## Dependencies

- [@ampt/sdk](https://getampt.com/docs/sdk)
- [express](https://expressjs.com/)
- [@ampt/data](https://getampt.com/docs/data)
- [resend](https://www.resend.com/)

## Features

- **API Endpoints**: Accepts new signups and webhook events via a POST requests.
- **Email Sending**: Uses `resend` to send transactional emails. 
- **Data Storage**: Employs Ampt's built-in database to store the new signups. 

## API Endpoints

### POST /api/signup

- Saves the user email, first name, and last name to database.
- Returns the status of the upload in a JSON format.

### POST /api/webhook

- Gets triggered by webhook events by Resend.
- Processes events and takes necessary actipns according to the event type. 

## Data Change Listeners

- **data.on("created:user_*",)**: When a new user is created, the system sends a welcome email to the user. 

## Test
   
Send a POST request to the URL of the developer sandbox that Ampt provides you with sample data. You should receive an email to the inbox you have provided. Check [Ampt Dashoard](ampt.dev) to see the data records. 
