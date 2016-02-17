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
	console.log("The current Value " + currValue);
	console.log("The tracked Number " + trackedNumber);
	console.log("The keypressed " + keypressed);
	console.log ("are we just beginning " + atStart );
	console.log("Lastsymbol " + lastSymbol);

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
	switch (String(keypressed)){
		case "clear":
			inputString = '0';
			pointAlreadyUsed = false;
			currValue = 0;
			atStart = true;
			lastSymbol ='';
			trackedNumber ='';
			break;

		case '+-':
			if (atStart ){
				check=currValue = trackedNumber =-1 * trackedNumber;
				atStart =false;

			}else{
				if (trackedNumber != '')
				{
					check=trackedNumber = -1 * trackedNumber;
				}else{
					check = currValue = -1 * currValue;
				}
				
			}
			
			inputString = String(check);
			//trackedNumber ='';
			lastSymbol;
			

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
			evaluateandReset(keypressed);
			break;
		case '=':
			if (trackedNumber == '')
				trackedNumber = String(currValue);
			
			evaluateandReset(keypressed);
			break;

		default:
			trackedNumber+=keypressed;
			if ((lastSymbol == '+-') || (lastSymbol == '=')){
				currValue = trackedNumber;
				atStart= true;

			}

			inputString = trackedNumber;

		break;

	}
}

function evaluateandReset(keypressed){
			doEvaluation();
			
			//trackNewNumber 
			trackedNumber = '';

			//changePointAlready used
			pointAlreadyUsed = false;

			lastSymbol = keypressed;
}

function doEvaluation(){

	if (atStart){
			currValue = Number(trackedNumber);
			atStart = false;
		} else{
			arithmeticEval();
		}

		inputString = String(currValue);
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
			if (trackedNumber != ''){
			currValue = Number(trackedNumber);
			}
			break;
		default :
			//currValue = Number(trackedNumber);
	}
}


// new test cases
// -10 + 5 -2 = -2
// -10 + 5 +- 2 = 2 failing not evaluating and 
// -10 + 5 +- + 2 = -3
// -10 + -5 = -15
// -10. + -5. = -15