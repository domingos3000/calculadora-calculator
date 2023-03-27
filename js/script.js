const allValues = document.querySelectorAll("[data-value]");
const displayResume = document.querySelector('.display__resume')
const displayCurrent = document.querySelector('.display__current')


let operation = {
	values: [],
	valueFixed: false,
	state: {
		isResult: [false, 0],
		step: 1,
	}
}

const backspace = (textvalue) => {

	if(operation.valueFixed)
		return false;

	return textvalue.substring(0, textvalue.length - 1);
}


const handleDisplayResume = () => {
	const values = operation.values.toString().replaceAll(',', "");
	displayResume.innerText = values;
}

const calculator = () => {

	if(operation.state.isResult[0] || operation.values.length == 0)
		return false;


	const lastNumber = displayCurrent.innerText;
	operation.values.push(lastNumber);

	const result = eval(operation.values.toString().replaceAll(',', ""))
	operation.state.isResult = [true, result];
	operation.valueFixed = true;

	displayCurrent.innerText = result
	displayResume.innerText = ""
}


allValues.forEach((e) => {
	
	e.addEventListener('click', () => {
		
		const value = e.getAttribute('data-value')

		if(value == "."){

			const regex = /\./;

			if(displayCurrent.innerText.length == 0 || operation.valueFixed || regex.test(displayCurrent.innerText)){
				return false;
			}
		}

		if(value == "+" || value == "-" || value == "/" || value == "*") {

			if(displayCurrent.innerText.length == 0 && displayResume.innerText.length == 0){
				operation.values = [];
				operation.state.isResult = [false]
				return false;
			}

			if(displayCurrent.innerText.length > 0){	
				operation.values.push(displayCurrent.innerText)
				operation.valueFixed = true;
			}

			operation.values.push(value);

			if(operation.values.length >= 4){
				const array = operation.values;
				const lastSinal = array.at(-1)
				const count = eval(`${array[0]}${array[1]}${array[2]}`)

				operation.values = [count, lastSinal]
				
				displayCurrent.innerText = count
				operation.state.isResult = [false]
			}

			handleDisplayResume();
			return false;
		}

		if(value == "ce" || value == "c" || value == "delete"){

			switch(value){
				case "ce":
					displayCurrent.innerText = "";
					operation.state.isResult = [false]
					if(displayResume.innerText.length == 0){
						operation.values = []
					}
					return false;

				case "c":
					displayCurrent.innerText = ""
					displayResume.innerText = ""
					operation.values = [];
					operation.state.isResult = [false]
					return false;
				
				case "delete":
					const text = displayCurrent.innerText;
					const newValue = backspace(text) || "";
					displayCurrent.innerText = newValue
					return false;

				default:
					break;
			}

		}


		if(operation.valueFixed){
			displayCurrent.innerText = ""
			operation.valueFixed = false;
		}

		displayCurrent.innerText += value
	})
})

document.addEventListener('keydown', (e) => {

	console.log(operation.values)

	if(e.key == "Escape") {
		displayCurrent.innerText = ""
		displayResume.innerText = ""
		operation.values = [];
		operation.state.isResult = [false]
		return false;
	}

	if(e.key == 'Enter'){

		if(operation.values.length == 0)
			return false;
		
		calculator();
		return false;
	}


	const comandsValid = [

			"0","1","2","3","4",
			"5","6","7","8","9",
			"+","-","*","/",
			"Enter",".","Backspace"
	]

	if(!comandsValid.includes(e.key))
		return false;


	const value = e.key

		if(value == "."){

			const regex = /\./;

			if(displayCurrent.innerText.length == 0 || operation.valueFixed || regex.test(displayCurrent.innerText)){
				return false;
			}
		}

		if(value == "ce" || value == "c" || value == "Backspace"){
			switch(value){
				case "ce":
					displayCurrent.innerText = "";
					operation.state.isResult = [false]
					if(displayResume.innerText.length == 0){
						operation.values = []
					}
					return false;

				case "c":
					displayCurrent.innerText = ""
					displayResume.innerText = ""
					operation.values = [];
					operation.state.isResult = [false]
					return false;
				
				case "Backspace":
					const text = displayCurrent.innerText;
					const newValue = backspace(text) || "";
					displayCurrent.innerText = newValue
					return false;

				default:
					break;
			}

		}

		if(value == "+" || value == "-" || value == "/" || value == "*") {

			if(displayCurrent.innerText.length == 0 && displayResume.innerText.length == 0){
				operation.values = [];
				operation.state.isResult = [false]
				return false;
			}

			if(displayCurrent.innerText.length > 0){	
				operation.values.push(displayCurrent.innerText)
				operation.valueFixed = true;
			}

			operation.values.push(value);

			if(operation.values.length >= 4){
				const array = operation.values;
				const lastSinal = array.at(-1)
				const count = eval(`${array[0]}${array[1]}${array[2]}`)

				operation.values = [count, lastSinal]
				
				displayCurrent.innerText = count
				operation.state.isResult = [false]
			}

			handleDisplayResume();
			return false;
		}

		
		if(operation.valueFixed){
			displayCurrent.innerText = ""
			operation.valueFixed = false;
		}

		displayCurrent.innerText += value

})

