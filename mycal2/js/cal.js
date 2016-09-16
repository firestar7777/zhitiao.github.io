// get all keys from document
var keys=document.querySelectorAll('#calculator span');
var operators=['+','-','x','÷'];
var decimalAdded=false;

// add onclick events to all the keys and operations
for (var i = 0; i < keys.length; i++) {
	keys[i].onclick = function(e){
		var input = document.querySelector('.screen');
		var inputVal=input.innerHTML;
		var btnVal=this.innerHTML;

		// if clear key is pressed, erase everything
		if (btnVal=='C') {
			input.innerHTML='';
			decimalAdded=false;
		}

		// if equal key is pressed, calculate and display the result
		else if (btnVal=='=') {
			var equation=inputVal;
			var lastChar=equation[equation.length-1];

			equation=equation.replace(/x/g, '*').replace(/÷/g,'/');

			if (operators.indexOf(lastChar)>-1||lastChar=='.') {
				equation=equation.replace(/.$/g,'');
			}

			if (equation) {
				input.innerHTML= eval(equation);
			}

			decimalAdded=false;
		}
		else if(operators.indexOf(btnVal) > -1) {
			// Operator is clicked
			// Get the last character from the equation
			var lastChar = inputVal[inputVal.length - 1];
			
			// Only add operator if input is not empty and there is no operator at the last
			if(inputVal != '' && operators.indexOf(lastChar) == -1) 
				input.innerHTML += btnVal;
			
			// Allow minus if the string is empty
			else if(inputVal == '' && btnVal == '-') 
				input.innerHTML += btnVal;
			
			// Replace the last operator (if exists) with the newly pressed operator
			if(operators.indexOf(lastChar) > -1 && inputVal.length > 1) {
				// Here, '.' matches any character while $ denotes the end of string, so anything (will be an operator in this case) at the end of string will get replaced by new operator
				input.innerHTML = inputVal.replace(/.$/, btnVal);
			}
			
			decimalAdded =false;
		}
		else if (btnVal=='.') {
			if (!decimalAdded) {
				input.innerHTML+=btnVal;
				decimalAdded=true;
			}

		}
		else{
			input.innerHTML+=btnVal;
		}

		e.preventDefault();

	}
}