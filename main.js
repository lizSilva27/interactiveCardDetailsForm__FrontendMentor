// !Dynamic card number entry
let numberCard = document.querySelector('.card__number');
let inputNumberCard = document.querySelector('#cardNumber');
let errorCardNumber = document.querySelector('.form__cardNumber--error');

inputNumberCard.addEventListener('input', () => {

	// information entered by the user is stored
	let inputValue = event.target.value;

	// validating only number input
	let regExp =/[A-z|`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g;
	regExp.test(inputNumberCard.value) == true 
	? showError(inputNumberCard, errorCardNumber, 'Wrong format, numbers only')
	: hideError(inputNumberCard, errorCardNumber);
 	inputNumberCard.value = inputValue.replace(/\s/g, '').replace(/([0-9]{4})/g, '$1 ').trim();

	inputNumberCard.value == ''
	? numberCard.innerText = '0000 0000 0000 0000'
	: numberCard.innerText = inputNumberCard.value;
});


// !Dynamic card name entry
let nameCard = document.querySelector('.card__details-name');
let inputCardholderName = document.querySelector('#cardholderName');
let errorCardholderName = document.querySelector('.form__cardholderName--error');

inputCardholderName.addEventListener('input', () => {

	// validate that it only contains letters and spaces
	let regExp = /[0-9|`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g;
	regExp.test(inputCardholderName.value) == true 
	? showError(inputCardholderName, errorCardholderName, 'Wrong format, numbers only')
	: hideError(inputCardholderName, errorCardholderName, '', true);

	inputCardholderName.value == '' 
	? nameCard.innerText = 'Jane Appleseed' 
	: nameCard.innerText = inputCardholderName.value;
});

// !Dynamic card month entry
let cardMonth = document.querySelector('.card__month');
let inputMonthCard = document.querySelector('#cardMonth');
let errorCardMonth = document.querySelector('.form__input-mm--error');

inputMonthCard.addEventListener('input', () => {
	cardMonth.innerText = inputMonthCard.value;
	validateLetters(inputMonthCard, errorCardMonth);

	inputMonthCard.value == ''
	? cardMonth.innerText = '00'
	: cardMonth.innerText = inputMonthCard.value;
});

// !Dynamic card year entry
let cardYear = document.querySelector('.card__year');
let inputYearCard = document.querySelector('#cardYear');
let errorCardYear = document.querySelector('.form__input-yy--error');

inputYearCard.addEventListener('input', () => {
	validateLetters(inputYearCard, errorCardYear);

	inputYearCard.value == ''
	? cardYear.innerText = '00'
	: cardYear.innerText = inputYearCard.value;
});

// !Dynamic card cvc entry 
// let regExp = /[A-z|`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g;
let cvcCard = document.querySelector('.card-back__cvv');
let inputCvcCard = document.querySelector('#cvv');
let errorCardCvc = document.querySelector('.form__input-cvv--error');

inputCvcCard.addEventListener('input', () => {
	validateLetters(inputCvcCard, errorCardCvc);

	inputCvcCard.value == ''
	? cvcCard.innerText = '000'
	: cvcCard.innerText = inputCvcCard.value;
});

// confirm button
let confirmBtn = document.querySelector('.form__submit');

let fullNameValidation, fullNumberValidation, fullMonthValidation, fullYearValidation, fullCvcValidation  = false;

let formSection = document.querySelector('.form');
let thanksSection = document.querySelector('.thanks-section');

confirmBtn.addEventListener('click', (event) => {
	event.preventDefault();

	// validate card number
	if(verificationFields(inputNumberCard,  errorCardNumber) == true) {
		if(inputNumberCard.value.length == 19) {
			showError(inputNumberCard, errorCardNumber, '', false);
			fullNumberValidation = true;
		} else {
			showError(inputNumberCard, errorCardNumber, 'Enter 16 digits');
			fullNumberValidation = false;
		}
	}

	// validate card name
	if (verificationFields(inputCardholderName, errorCardholderName)) {
		fullNameValidation = true;
	} else {
		fullNameValidation = false
	}

	// validate card month
	if (verificationFields(inputMonthCard, errorCardMonth)) {
		if (parseInt(inputMonthCard.value) > 0 && parseInt(inputMonthCard.value) <= 12) {
			showError(inputMonthCard, errorCardMonth, '', false);
			fullMonthValidation = true;
		} else {
			showError(inputMonthCard, errorCardMonth, 'Wrong month');
			fullMonthValidation = false;
		}
	}

	//validate card year
	if(verificationFields(inputYearCard, errorCardYear)) {
		if(parseInt(inputYearCard.value) >= 00 && parseInt(inputYearCard.value) <= 40) {
			showError(inputYearCard, errorCardYear, '', false);
			fullYearValidation = true;
		} else {
			showError(inputMonthCard, errorCardYear, 'Wrong year');
			fullYearValidation = false;
		}
	}

	// validate card cvc
	if(verificationFields(inputCvcCard, errorCardCvc)) {
		if(parseInt(inputCvcCard.value.length) == 3) {
			showError(inputCvcCard, errorCardCvc, '', false);
			fullCvcValidation = true;
		} else {
			showError(inputCvcCard, errorCardCvc, 'Wrong CVC');
			fullCvcValidation = false;
		}
	}

	if(fullNameValidation == true && fullNumberValidation == true && fullMonthValidation == true && fullYearValidation == true && fullCvcValidation == true) {
		formSection.style.display = 'none';
		thanksSection.style.display = 'block';
	}
});

// *button corresponding to the thank you section
let buttonContinue = document.querySelector('.thanks-section__button');
buttonContinue.addEventListener('click', () => {
	location.replace('index.html');
});


// !FUNCTIONS
// show error and corresponding styles
function showError(divInput, divError, messageError, show = true) {
	if(show){
		divError.innerText = messageError;
		divInput.style.borderColor = '#FF0000';
	}else {
		divError.innerText = messageError,
		divInput.style.borderColor = 'rgb(222, 221, 223)';
	}
}

// hide error and corresponding styles
function hideError(divInput, divError) {
	divError.innerText = '';
	divInput.style.borderColor = 'rgb(142, 133, 147)';
}

//Verify empty fields
function verificationFields(divInput, divError) {
	if(divInput.value.length > 0) {
		showError(divInput, divError, '', false);
		return true;
	} else {
		showError(divInput, divError, "Can't be blank");
	}
}

function validateLetters(input, error) {
	let regExp = /[A-z|`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g;
	if(regExp.test (input.value)) {
		showError(input, error, 'wrong format');
	} else {
		showError(input, error, '', false);
	}
}