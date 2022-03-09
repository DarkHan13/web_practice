const enter = document.getElementById("searchVideo");
const inputName = document.getElementById("nameOfVideo");
const inputLink = document.getElementById("linkOfVideo");
const searchButtonLink = document.getElementById("bsl");
const submitButtonLink = document.getElementById("submit");
const deleteButton = document.getElementById("delete");
const showAllButton = document.getElementById("showAll");
let curVid = document.getElementById("curVid");
let titleOfVideo = document.getElementById("titleOfVideo");
let footer = document.getElementById("wrapper");
let playlist = document.getElementById('playList');

const check = "https://www.youtube.com/embed/";

var audio = new Audio('buttonSound.mp3');


searchButtonLink.onclick = f;
submitButtonLink.onclick = update;
deleteButton.onclick = deleteAllData;
showAllButton.onclick = lever;


var isPress = false;
function lever() {
	audio.play();
	if (!isPress) {
		showAllVideos();
	}
	else {
		hideAllVideos();
	}
}

function showAllVideos() {
	playlist.style.visibility = 'visible';
	let text = createPlaylist();
	playlist.value = text;
	let helper = specialWords.length * 2 + 'em';
	showAllButton.disabled = true;
	$('.playList').animate({ 'height': helper }, 1000, function () { showAllButton.disabled = false });
	isPress = true;
	showAllButton.innerHTML = 'hide';
}

function hideAllVideos() {
	showAllButton.innerHTML = 'show';
	showAllButton.disabled = true;
	$('.playList').animate({ 'height': '1em' }, 1000, function () { playlist.style.visibility = 'hidden' , showAllButton.disabled = false });
	isPress = false;
}



function deleteAllData() {
	audio.play();
	localStorage.clear();
}


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
if (localStorage.getItem('sw') !== null) {
	specialWords = JSON.parse(localStorage.getItem('sw'));
	for (var n = 0; n < specialWords.length; n++) {
		links[specialWords[n]] = localStorage.getItem(specialWords[n]);
		console.log(specialWords[n]);
	}
}	
else {
	localStorage.getItem('sw', JSON.stringify(specialWords));
	for (let n = 0; n < specialWords.length; n++) {
		localStorage.setItem(specialWords[n], links[specialWords[n]]);
	}
}

function createPlaylist() {
	var textPlayList = '';
	for (let i = 0; i < specialWords.length; i++) {
		textPlayList += specialWords[i] + '\n';
	}
	return textPlayList;
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
	return result;

}


function update() {
	audio.play();
	inputName.value = inputName.value.toLowerCase();
	if (inputLink.value.indexOf(".be/") !== -1) {
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
	audio.play();
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