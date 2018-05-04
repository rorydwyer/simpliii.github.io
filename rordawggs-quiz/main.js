//Rory Dwyer
//Lab 2
//5/10/2017

//Class for when the user enters the quiz.
class Quiz {
    constructor(questions, userAge) {
        this.correctAnswers = 0;    //start off with 0
        this.quizOver = false;      //start without the quiz ended
        this.numOfQs = questions.length - 1;       //calcs the number of questions for the quiz
        this.index = 0;             //used to move through the questions in the quiz
        this.questions = questions; //questions that were passed in
        this.userAge = userAge;     //user age that was passed in. Used when game resets and return to quiz menu
    }

    //method for when the user hits submit button
    selectQuestion() {
        if ($("input[type='radio']").is(':checked')) {  //checks if the user selected a question
            let value = $("input[type='radio']:checked").val();
            if (value == this.questions[this.index].a) {
                this.correctAnswers++;                  //if selected answer is true, increase correct answers
            }

            if (this.index == this.numOfQs) {           //if last question, then this.quizOver is true
                this.quizOver = true;
            }

            this.index++;                               //increase the index for the next question
            this.displayCurrentQuestion();              //display the next question for the user
        }
    }

    //method to display the next question on the screen
    displayCurrentQuestion() {
        if (!this.quizOver) {                           //if the quiz isnt over.
            if (this.index) {                           //If index is not at 0 (Q hasnt been displayed before), then remove old question
                $("#current-Q").remove();
                $(".current-O").remove();
            }

            let question = this.questions[this.index].q;        //load new question
            let choices = this.questions[this.index].options;   //load new choices
            choices.push(this.questions[this.index].a);         //adds the answer to the choices
            shuffle(choices);                                   //shuffles the order of the choices

            $("#title-header").text(`${question}`);     //change the header to the new question
            for (let i = 0; i < choices.length; i++) {  //loop through the choices, and make a radio for each choice
                $("#options").append(`
                <div class="form-check form-check-inline current-O">
                  <label class="form-check-label">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" value="${choices[i]}"> ${choices[i]}
                  </label>
                </div>
                `);
            }
        } else {
            this.quizEnd(); //if this.quizOver is true, then run the quizEnd method
        }

    }

    //method for when quiz reaches the end of its questions
    quizEnd() {
        $("#nextButton").remove();  //remove next button element
        $("#current-Q").remove();   //remove current question element
        $(".current-O").remove();   //remove current options element

        //display how many correct answers you got. Both in 'correct'/'total' and 'percentageCorrect%'
        $("#title-header").text(`You got ${this.correctAnswers} out of ${this.numOfQs + 1} questions correct. (${Math.floor((this.correctAnswers/(this.numOfQs + 1) * 100))}%)`);

        //display button for selecting a new quiz
        $("#quizlet").append(`
            <div id="score">
                <a href="#" class="btn btn-primary" id="newQuiz">Select new quiz</a>
            </div>
            `);

        $("#newQuiz").click(() => {     //listens when the menu button is clicked, then runs resetQuiz function
            resetQuiz(this.userAge);
        });
    }
}

//create new method for Date to find what age the user is
Date.prototype.ageInYears = function() {
    let today = new Date();
    let thisYearAnniversary = new Date(today.getFullYear(), this.getMonth(), this.getDate());
    let age = today.getFullYear() - this.getFullYear();
    return (today < thisYearAnniversary ? age - 1 : age);
};

//function to shuffle arrays passed in. Credit goes to a smart dev on Stack Overflow
function shuffle(a) {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
}

//function to reset the quiz when the user has finished a previous quiz
function resetQuiz(age) {
    $("#score").remove();        //remove score element
    chooseQuiz(quizes, age);     //runs chooseQuiz function and passes users age
}
//function to check the user age and validate it if its corrct
function validation(){
    let validAge;
    if ($('#dob').val().trim().length === 10) { //if input age is correct format
        let dob = $('#dob').val().trim();
        let age = new Date(dob);    //assign age
        if (age.ageInYears() < 0) { //if age is less than 0 then dont continue
            validAge = false;
            return;
        } else {    //if age is greater than 0 then continue and assign the age category for the user
            if (age.ageInYears() < 20 && age.ageInYears() > 1) validAge = 1;
            if (age.ageInYears() < 50 && age.ageInYears() > 19) validAge = 2;
            if (age.ageInYears() > 49) validAge = 3;
            chooseQuiz(quizes, validAge);   //load user to the quiz menu
        }
    }
}

//function for choosing the quiz you want to take
function chooseQuiz(quizes, age) {
    $("#title-header").text("Choose the quiz you'd like to take. Pick carefully...");  //Change header text
    $("#sub-title").addClass('invisible');  //hide sub title element
    $('#dob-selector').addClass('invisible');//hide dob input element
    $("#create-quiz").addClass("invisible"); //hide create quiz element
    for (let i = 0; i < quizes.length; i++) {//creates a quiz option for each quiz in the DB

        let quiz = quizes[i];   //current quiz in loop
        let ageQs = [];         //amount of questions for user to take in current quiz

        for (let i = 0; i < quiz.questions.length; i++) {   //add valid age questions to ageQs, can then call with length attribute
            if (quiz.questions[i].age === age) ageQs.push(quiz.questions[i])
        }

        //creates the element that shows the quiz, title, Description, and amount of questions for user
        $("#quiz-selector").append(`
            <div class="card px-2" style="width: 20rem;">
                <img class="card-img-top" src="http://baconmockup.com/200/200" alt="Card image cap">
                <div class="">
                    <h4 class="card-title">${quiz.title} | ${ageQs.length} Q's</h4>
                    <p class="card-text">${quiz.desc}.</p>
                    <a href="#" class="btn btn-primary" onclick="buildQuiz(${i}, ${age}, ${ageQs.length})">Start Quiz</a>
                </div>
            </div>
        `);
    }

    $("#main-menu").append(`
        <a href="#" id="menu-button" class="btn btn-warning" onclick="mainMenu()">Main Menu</a>
        `)
}

//function to back to main menu
function mainMenu() {
    $("#title-header").text("You're back huh?");  //Change header text
    $("#sub-title").removeClass('invisible');  //show sub title element
    $('#dob-selector').removeClass('invisible');//show dob input element
    $("#create-quiz").removeClass("invisible"); //show create quiz element
    $("#menu-button").remove();
    $(".card").remove();
}

//function for building the quiz that the user selected
function buildQuiz(quizNum, userAge, ageQs) {
    if (ageQs > 0) {    //if the quiz has any questions for the users age, build the quiz

        questions = [];
        for (let i = 0; i < quizes[quizNum].questions.length; i++) {  //build an array of questions from selected quiz with correct age
            if (quizes[quizNum].questions[i].age === userAge) {
                this.questions.push(quizes[quizNum].questions[i]);
            }
        }

        shuffle(questions); //shuffle the order of the questions
        questions.splice(1, 2); //remove the first and second questions
        $(".card").remove();    //remove the quiz card elements
        $("#menu-button").remove();
        $("#quizlet").append(`<a id="nextButton" href="#" class="btn btn-primary">Next Question</a>`);  //create a next button for the quiz

        let quizlet = new Quiz(questions, userAge); //create a new Quizlet object with the questions, and user age for later
        quizlet.displayCurrentQuestion();           //start quiz loop and display the questions

        $("#nextButton").click(function() {         //listens for when the next button is clicked, and moves the loop in the Quizlet object
            quizlet.selectQuestion();
        });
    }
}



//////////////////////////////////////
/////  Create New Quiz Functions /////
//////////////////////////////////////


//class for the new quiz that the user creates
class createQuiz {
    constructor() {
        this.questions = []; //set new questions to an empty array
    }

    //method for when the user finished the quiz and adds it to the DB
    addQuiz(details) {
        this.title = details[0].value;  //when creating the quiz, set title and desc properties to that users input
        this.desc = details[1].value;

        quizes.push(this);  //adds the newly created quiz to the main quizes object
    }

    //method for adding a question to the users new quiz
    addQ(question) {
        let tempQ = {};  //create temp question obj
        let tempOpt = [];//create temp options variable

        for (let i = 0; i < question.length; i++) {
            if (question[i].name === "age") {   //if the input is age, then assign the correct value depending on input
                switch (question[i].value) {
                    case '1-16':
                        question[i].value = 1;
                        break;
                    case '17-40':
                        question[i].value = 2;
                        break;
                    case '40+':
                        question[i].value = 3;
                        break;
                }
            } else if (question[i].name === 'options') { //if the input is options, then add them in the tempOpt array
                tempOpt.push(question[i].value);
            }
            let name = question[i].name;
            let value = question[i].value;
            tempQ[name] = value;            //add the different input properties to the temp obj
        }
        tempQ['options'] = tempOpt;         //add the options to the temp obj
        this.questions.push(tempQ);         //add the temp obj (the question that the user added) to the main DB of new questions
    }
}

//function for when the user wants to add the quiz to the main DB
function addQuiz() {
    let input = $('.details-input').serializeArray(); //loads user input
    userQuiz.addQuiz(input);    //run addQuiz

    //re-stylize the page so its the landing page again
    $("#quiz-creation").remove();
    $(".new-question").remove();
    $("#title-header").text("Your quiz was added! Go check it out!");
    $("#sub-title").removeClass('invisible');
    $("#sub-title").text("If you want to save your new quiz for the future, copy and paste the code below to the quizlets.js file.")
    $('#dob-selector').removeClass('invisible');
    $("#create-quiz").removeClass('invisible');
    $("#code-snippet").text(`${JSON.stringify(userQuiz, null, 4)}`); //display JSON like code to add to the seperate file for permanent storage

}

//function for when the user adds a single question to their new quiz
function addQuestion() {
    let input = $('.question-input').serializeArray(); //loads user input
    userQuiz.addQ(input);   //run addQ
    $("#create-question-form input").val(''); //remove user typed input when question has been added

    //display newly added question below the form
    $("#added-Qs").append(`
            <div class="new-question">
            <div id="border-line"></div>
                <h4>${userQuiz.questions[userQuiz.questions.length - 1].q}</h4>
                <h5>${userQuiz.questions[userQuiz.questions.length - 1].a}</h5>
            </div>
        `);
}

//function to make the form element
function createNewQuiz() {
    userQuiz = new createQuiz(); // Is it safe to make a global object like this? what other way would you use the object if this isnt safe.
    $("#title-header").text("YAAAAHHHH, you get to be a dev too!");
    $("#sub-title").addClass('invisible');
    $('#dob-selector').addClass('invisible');
    $("#create-quiz").addClass('invisible');

    $("#quiz-creator").append(`
        <div id="quiz-creation">
            <form id="create-quiz-form">
                <h3> Quiz... </h3>
                <div class="form-group">
                    <label>Title of quiz</label>
                    <input name="title" class="form-control details-input" id="quiz-title" placeholder="Bob's Bugers">
                </div>
                <div class="form-group">
                    <label>Description of quiz</label>
                    <input name="desc" class="form-control details-input" id="quiz-desc" placeholder="We got some BEEFY questions all about Bob's Burgurs">
                </div>

                <div id="border-line"></div>
            </form>
            <form id="create-question-form">

                <h3> Question... </h3>
                <div class="form-group">
                    <label>Name of Question (Can be anything you want)</label>
                    <input name="title" required class="form-control question-input" id="question-title" placeholder="BOB WHOOO">
                </div>

                <div class="form-group">
                    <label>The Question</label>
                    <input name="q" class="form-control  question-input" id="question-q" placeholder="Who does Bob have a rivaly with?">
                </div>
                <div class="form-group">
                    <label for="exampleSelect1">Age group for Question</label>
                    <select name="age" class="form-control question-input" id="question-age">
              <option>1-16</option>
              <option>17-40</option>
              <option>40+</option>
            </select>
                </div>

                <div class="form-group">
                    <label>The Answer</label>
                    <input name="a" class="form-control question-input" id="question-a" placeholder="Jimmy Pesto">
                </div>
                <div id="create-options">
                    <div class="form-group">
                        <label>Choices</label>
                        <input name="options" class="form-control  question-input" id="question-o1" placeholder="Tina">
                        <input name="options" class="form-control  question-input" id="question-o2" placeholder="Hugo">
                        <input name="options" class="form-control  question-input" id="question-o3" placeholder="Mr. Frond">
                        <input name="options" class="form-control  question-input" id="question-o4" placeholder="Teddy">
                    </div>
                </div>

                <button type="button" class="btn btn-outline-primary" onclick="addQuestion()">Add Question</button>
                <button type="button" class="btn btn-outline-success" onclick="addQuiz()">Create Quiz!</button>
            </form>
        </div>
        `);
}
