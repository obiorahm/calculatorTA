var inputString = "0";

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
	inputString += String(keypressed);
}

function initSymbols(){
	inputString = "0";

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
			inputString = "0";
			pointAlreadyUsed = false;
			currValue = 0;
			atStart = true;
			lastSymbol ='';
			trackedNumber ='';
			document.getElementById("inputArea1").value = '';


			break;
		case '+-':
			trackedNumber = -1 * trackedNumber;
			inputString = String(trackedNumber);
			break;
		case '.':
			if (pointAlreadyUsed){

			}else{
				appendInputString(keypressed);
				pointAlreadyUsed = true;
			}
			break;

		case String.fromCharCode('&divide'): //divide
		case '+_'://toggle minus and plus
		case '-': //minus
		case '+': //plus
		case '/': //plus
		case '*': //times
		case '=':
			//doEvaluation;
			doEvaluation();
			
			//trackNewNumber 
			trackedNumber = '';

			//changePointAlready used
			pointAlreadyUsed = false;

			lastSymbol = keypressed;
			appendInputString(keypressed);
			break;


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