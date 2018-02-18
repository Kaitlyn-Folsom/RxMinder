# RxMinder

A React-based web application designed to schedule medication reminders for others. Gives you, as the caretaker or family member, peace of mind while your patient or loved one maintains their independence. Allows you to remain at ease knowing that they are following their regimen.

## How it works

* View the app: [RxMinder](https://ancient-bastion-53743.herokuapp.com/)

* Sign up and create a profile for a loved one or patient under your care.
* Schedule reminders, typically medication reminders, for the person you are caring for.
* They will receive text messages based on the scheduled reminders and will have to respond "YES" when they've completed their reminder. They are allotted 30 minutes to do so.
* If the patient doesn't respond to the text reminder within 30 minutes, you will receive a text that a reminder has been missed, along with details of the reminder.
* If the patient does respond within 30 minutes, you will not receive a text.
* You are able to view your online dashboard to see which reminders were completed and incompleted. Completed reminders are colored green and reminder that were missed are colored red. 

### Home page:
![Home Page](/src/assets/HomePage.png)

### Add Patient Form
![Add Patient Form](/src/assets/AddPatient.png)

### Patient Profile Page 
![Patient Profile](/src/assets/PatientProfile.png)

### Receiving and responding to a text reminder.
![Text Demo](/src/assets/textDemo.gif)

### When a patient confirms medication was taken
![screenshot2](/src/assets/RespondingToReminder.gif)

### When a patient has missed their medication

![screenshot1](/src/assets/MissingReminder.png)

## Tech used
- React.js
- React Bootstrap
- HTML/CSS
- JavaScript/JSX
- Express.js
- Node.js
- Moment.js
- MongoDB
- Twilio NPM Package
- Other NPM packages include: Bcrypt, Passport, Express-Session, Axios

## Built With

* Sublime Text - Text Editor
* Heroku - Hosting Platform

## Authors

* **[Nicole Carvalho](https://github.com/nicolelcarvalho)** - *Full-Stack Development*
* **[Andrew Apicello](https://github.com/andrew-apicello)** - *Full-Stack Development*
* **[Kaitlyn Folsom](https://github.com/Jewel0106)** - *Front-end development and design/Registration & login with passport/Verification*
* **[Annalisa Leote](https://github.com/aleote)** - *Front-end development/Setting up passport*

## Future prospects

* Add multiple family members or patients under one caretaker.
* Receive reminders when a medication needs to be refilled.
* Add and view upcoming doctor's appointments.
* receive reminders for upcoming doctor's appointments.
* Search and view information for medications.
* Texts send photos of said medication for more clarity.
