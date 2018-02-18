# RxMinder

A React-based web application designed to schedule medication reminders for others. Gives you, as the caretaker or family member, peace of mind while your patient or loved one maintains their independence. Allows you to remain at ease knowing that they are following their regimen.

## Utilizing the App

* View the app: [RxMinder](https://ancient-bastion-53743.herokuapp.com/)

* Sign up and create a profile for a loved one or patient under your care.
* Schedule reminders, typically medication reminders, for the person you are caring for.
* They will receive text messages based on the scheduled reminders and will have to respond "YES" when they've completed their reminder. They are allotted 30 minutes to do so.
* If the patient doesn't respond to the text reminder within 30 minutes, you will receive a text that a reminder has been missed, along with details of the reminder.
* If the patient does respond within 30 minutes, you will not receive a text.
* You are able to view your online dashboard to see which reminders were completed and incompleted. Completed reminders are colored green and reminder that were missed are colored red. 

### Home Page prior to signing up and logging in:
![Home Page](/src/assets/HomePage.png)

### Upon signing up, the user is asked to input their patient's or family member's information.
![Add Patient Form](/src/assets/AddPatient.png)

##### The caretaker is then brought to the patient profile page where they can begin inputting information for each medication reminder. After a medication is submitted you can see a list of current reminders for the week.

![Patient Profile](/src/assets/PatientProfile.png)

##### After inputing all information needed for each medication reminder your home page will show a list of upcoming reminders for that day.

##### A text is sent to the patient at the time each medication should be taken. The patient must then respond to the text alert to confirm the medication was taken

![Text Demo](/src/assets/textDemo.gif)

#### After the patient confirms the medication was taken that reminder will turn blue.

![screenshot2](/src/assets/RespondingToReminder.gif)

##### When the patient has not responded to the text alert the reminder turns red to show this medication has been missed. The caretaker can then check in on the patient.

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

* **Nicole Carvalho** - *Full-Stack Development* - [Nicole Carvalho](https://github.com/nicolelcarvalho)
* **Andrew Apicello** - *Full-Stack Development* - [Andrew Apicello](https://github.com/andrew-apicello)
* **Kaitlyn Folsom** - *Front-end development and design/Registration & login with passport/Verification* - [Kaitlyn Folsom](https://github.com/Jewel0106)
* **Analisa Leote** - *Front-end development/Setting up passport* - [Analisa Leote](https://github.com/aleote)

## Future prospects

* Be able to add multiple family members or patients under one caretaker.
