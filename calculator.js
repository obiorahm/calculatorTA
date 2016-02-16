var inputString = "";

var currValue = 0;

var lastSymbol = '';

var pointAlreadyUsed = false;

var trackedNumber ="";

var atStart = true;

//get the id of the clicked element

function displayString(keypressed){
	if ((String(inputString) == "0") && (keypressed == 0))
	{
		replaceInputString(keypressed);
	}else{
		validateInput(keypressed);
	}
	document.getElementById("inputArea").value = inputString;
}

function replaceInputString(keypressed){
	inputString = '0';
}

function appendInputString(keypressed){
	if ((inputString=='0') && (keypressed != '.')){
		inputString = keypressed;
	}else{
		inputString += String(keypressed);
	}
}

function initSymbols(){
	inputString = "";

	currValue = 0;

	lastSymbol = '';

	pointAlreadyUsed = false;

	trackedNumber ="";

	atStart = true;	
}

function validateInput(keypressed){
	console.log("The key pressed" + keypressed);
	switch (String(keypressed)){
		case "clear":
			inputString = '0';
			pointAlreadyUsed = false;
			currValue = 0;
			atStart = true;
			lastSymbol ='';
			trackedNumber ='';

			document.getElementById("inputArea1").value = '0';


			break;
		case '+-':
		if (atStart){
			trackedNumber = -1 * trackedNumber;
			inputString = String(trackedNumber);
			document.getElementById("inputArea1").value = String(trackedNumber);

		}else{
			currValue = -1 * currValue;
			document.getElementById("inputArea1").value = String(currValue);
		}
			

			break;
		case '.':
			if (pointAlreadyUsed){

			}else{
				appendInputString(keypressed);
				trackedNumber+=keypressed;
				pointAlreadyUsed = true;
			}
			break;

		case '-': //minus
		case '+': //plus
		case '/': //plus
		case '*': //times
		case '=':
			//clear result inputbox
			document.getElementById("inputArea1").value = '';
			//doEvaluation;
			doEvaluation();
			
			//trackNewNumber 
			trackedNumber = '';

			//changePointAlready used
			pointAlreadyUsed = false;

			lastSymbol = keypressed;
			inputString = '';
			//appendInputString(keypressed);
			break;

		break


		default:
			trackedNumber+=keypressed;
			if (lastSymbol == '=')
				currValue = Number(trackedNumber);
			console.log("theNumbertracked " + trackedNumber);
			appendInputString(keypressed);

		break;

	}
}


function doEvaluation(){

	if (atStart){
			currValue = Number(trackedNumber);
			atStart = false;
		} else{
			arithmeticEval();
		}
	document.getElementById("inputArea1").value = currValue;
}

//find a way to convert string to symbol to do away with switch
		
		
function arithmeticEval(){

	switch (lastSymbol){
		case '+': //plus			
			currValue += Number(trackedNumber);
			break;
		case '-': //minus
			currValue -= Number(trackedNumber);
			break;
		case '*': //times
			currValue *= Number(trackedNumber);
			break;
		case '/': //divide
			currValue /= Number(trackedNumber);
			break;
		case '=':
			
			break;
	}
}