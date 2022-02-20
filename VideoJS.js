const enter = document.getElementById("searchVideo");
const inputName = document.getElementById("nameOfVideo");
const inputLink = document.getElementById("linkOfVideo");
const searchButtonLink = document.getElementById("bsl");
const submitButtonLink = document.getElementById("submit");
let curVid = document.getElementById("curVid");
let titleOfVideo = document.getElementById("titleOfVideo");

const check = "https://www.youtube.com/embed/";

searchButtonLink.onclick = f;
submitButtonLink.onclick = update;


$(".col input").on("keypress", function (event) {
	if (event.keyCode == 13) {
		event.preventDefault();
	}
});


var links = [];
links["default"] = "https://www.youtube.com/embed/vlDzYIIOYmM";
links["jullia"] = "https://www.youtube.com/embed/91E5ZqKMW7w";
links["жанторе"] = "https://www.youtube.com/embed/IrhucHjSxa8";
links["c++ не читает кириллицу с файла!"] = "https://www.youtube.com/embed/R9rptswfeP4";


var specialWords = [];
specialWords[0] = "default";
specialWords[1] = "jullia";
specialWords[2] = "жанторе";
specialWords[3] = "c++ не читает кириллицу с файла!";

titleOfVideo.innerHTML = specialWords[0];

specialWords = JSON.parse(localStorage.getItem('sw'));
for (var n = 0; n < specialWords.length; n++) {
	links[specialWords[n]] = localStorage.getItem(specialWords[n]);
	console.log(specialWords[n]);
}


function isItExist(s){
    for (let n = 0; n < specialWords.length; n++) {
		if (specialWords[n] == s) {
			return true;
		}
	}
	return false;
}


function transforomToYoutube(s) {
	let result = check;
	let index = s.indexOf(".be/") + 4;
    for (let n = index; n < s.length; n++) {
		result += s[n];
	}
	alert(result);
	return result;

}




function update() {
	inputName.value = inputName.value.toLowerCase();
	if (inputLink.value.indexOf(".be/") != -1) {
		inputLink.value =  transforomToYoutube(inputLink.value);
    }
	if (inputName.value != null && inputName.value != "" && !isItExist(inputName.value) && inputLink.value.indexOf(check) != -1) {

		specialWords[specialWords.length] = inputName.value;
		let index = specialWords[specialWords.length - 1];
		links[index] = "";
		for (let n = 0; n < inputLink.value.length; n++) {
			if (inputLink.value[n] != "\"") {
				links[index] += inputLink.value[n];
			}
		}
		inputName.value = null;
		inputLink.value = null;
	}
	localStorage.setItem('sw', JSON.stringify(specialWords));
	for (let n = 0; n < specialWords.length; n++) {
		localStorage.setItem(specialWords[n], links[specialWords[n]]);
	}
}




function f() {	
	var a = enter.value;
	a = a.toLowerCase();
	let index = lenghtOfLevenstein(a);
	curVid.src = links[specialWords[index]];
	titleOfVideo.innerHTML = specialWords[index];
}

	
alert("js on");



function lenghtOfLevenstein(req) {
	let max = -1;
	let current = 0;
	let index = 0;
	for (let i = 0; i < specialWords.length; i++) {
		for (let j = 0; j < specialWords[i].length && j < req.length; j++) {
			if (req[j] === specialWords[i][j]) {
				current++;
			}
		}
		if (current === specialWords[i].length) {
			return i;
        }
		if (max < current) {
			max = current;
			index = i;
			console.log(specialWords[index] + " = " + current);
		}
		current = 0;
	}
	return index;
}