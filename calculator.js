var inputString = "";

var signString = "";

var currValue = 0;

var lastSymbol = '';

var pointAlreadyUsed = false;

var trackedNumber ="";

var atStart = true;

//get the id of the clicked element

function displayString(keypressed, asciipressed){
	if ((String(inputString) == "0") && (keypressed == 0))
	{
		replaceInputString(keypressed);
	}else{
		validateInput(keypressed,asciipressed);
	}
	document.getElementById("calc-output").innerHTML = inputString;
	document.getElementById("calc-sign").innerHTML = signString;

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

	signString = "";

	currValue = 0;

	lastSymbol = '';

	pointAlreadyUsed = false;

	trackedNumber ="";

	atStart = true;	
}

function validateInput(keypressed, asciipressed){
	switch (String(keypressed)){
		case "clear":
			inputString = '0';
			signString = "";
			pointAlreadyUsed = false;
			currValue = 0;
			atStart = true;
			lastSymbol ='';
			trackedNumber ='';
			break;

		case '+-':
			if (atStart ){
				currValue = Number(trackedNumber) ;
				trackedNumber = String(-1 * currValue);
				
				check = trackedNumber;
				//atStart =false;

			}else{
				if (trackedNumber != '')
				{
					check=trackedNumber = String(-1 * Number(trackedNumber));
				}else{
					currValue = -1 * currValue;
					check = String(currValue) 
				}
				
			}
			
			inputString = String(check);			

			break;
		case '.':
			if (pointAlreadyUsed){

			}else{
				if (trackedNumber == ''){
						inputString = '0.';
						trackedNumber = '0';
					}
				else{
						appendInputString(keypressed);
					}
				trackedNumber+=keypressed;
				pointAlreadyUsed = true;
			}
			break;

		case '-': //minus
		case '+': //plus
		case '/': //plus
		case '*': //times
			evaluateandReset(keypressed);
			signString = asciipressed;
			break;
		case '=':
			if (trackedNumber == '')
				trackedNumber = String(currValue);
			
			evaluateandReset(keypressed);
			signString = "";
			break;

		default:
			trackedNumber+=keypressed;
			if ((lastSymbol == '+-') || (lastSymbol == '=')){
				currValue = trackedNumber;
				atStart= true;
			}

			inputString = trackedNumber;
			signString = "";

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

// if we get a NaN set to 0
		if (isNaN(currValue))
			currValue = 0;
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
		case '/': //dividei=
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
// .2 + .5 = 7.1 + 3 =
// 9 +- +- . = clear 0 +- +-
