var inputString = "";

var signString = "";

var currValue = 0;

var lastSymbol = '';

var pointAlreadyUsed = false;

var trackedNumber = "";

var atStart = true;

//get the id of the clicked element

function displayString(keypressed, asciipressed) {
    validateInput(keypressed, asciipressed);
  	document.getElementById("calc-output").innerHTML = inputString;
  	document.getElementById("calc-sign").innerHTML = signString;

  console.log("The current Value " + currValue);
  console.log("The tracked Number " + trackedNumber);
  console.log("The keypressed " + keypressed);
  console.log("are we just beginning " + atStart);
  console.log("Lastsymbol " + lastSymbol);

}


function initSymbols() {
  inputString = "";

  signString = "";

  currValue = 0;

  lastSymbol = '';

  pointAlreadyUsed = false;

  trackedNumber = "";

  atStart = true;
}

function validateInput(keypressed, asciipressed) {
  switch (String(keypressed)) {
    case "clear":
      inputString = '0';
      signString = "";
      pointAlreadyUsed = false;
      currValue = 0;
      atStart = true;
      lastSymbol = '';
      trackedNumber = '';
      break;

    case '+-':
      if (atStart) {
        currValue = -1 * Number(trackedNumber);
        trackedNumber = String(currValue);
		check = trackedNumber;

      } else {
        if (trackedNumber != '') {
          check = trackedNumber = String(-1 * Number(trackedNumber));
        } else {
          currValue = -1 * currValue;
          check = String(currValue)
        }

      }

      inputString = String(check);

      break;
    case '.':
      if (!pointAlreadyUsed) {
        if (trackedNumber == '') {
          inputString = '0.';
          trackedNumber = '0';
        } else {
           inputString += String(keypressed);;
        }
        trackedNumber += String(keypressed);
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
    	if (inputString == "0"){
    		trackedNumber = String(keypressed);    		
    	}else{
	      	trackedNumber += String(keypressed);

	      	if ((lastSymbol == '+-') || (lastSymbol == '=')) {
	        	currValue = Number(trackedNumber);
	        	atStart = true;
	      	}
			signString = "";
     	}
     	inputString = trackedNumber;

      break;

  }
}

function evaluateandReset(keypressed) {
  doEvaluation();

  //trackNewNumber 
  trackedNumber = '';

  //changePointAlready used
  pointAlreadyUsed = false;

  lastSymbol = keypressed;
}

function doEvaluation() {
	//once there is a currValue we are no longer at start
  if (atStart) {
    currValue = Number(trackedNumber);
    atStart = false;
  } else {
    arithmeticEval();
  }

  // if we get a NaN set to 0
  if (isNaN(currValue))
    currValue = 0;
  inputString = String(currValue);
}

//find a way to convert string to symbol to do away with switch

function arithmeticEval() {

  switch (lastSymbol) {
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
      if (trackedNumber != '') {
        currValue = Number(trackedNumber);
      }
      break;
    default:
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