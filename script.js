var timerAnimation = 0;  //setInterval for animation
var position = 0;        //to animate pomodoro background
var timerTime = 0;       //setInterval for time ticking
var breakTime = 5;
var workTime = 25;
var seconds = 60;
var minuts = workTime - 1;

var sessionStr = 'work';
var startButton = document.getElementById('start');
var stopButton = document.getElementById('stop');

//обработчик для клика по break - +
function clickBreak(event) { 
	var target = event.target;    //находим элемент по кот кликнули
	var y = $(target).html();     //находим контент этого элемента
	
	if (y == ' - ') {
		if (breakTime >= 2) {     //если равно 1, то больше не уменьшать breakTime
		breakTime = breakTime - 1;
		$('.breakTime').html(breakTime + ' min');
		}
	} 
	
	if (y == ' + ') {
		if (breakTime < 60) {     //если равно 60, то больше не увеличивать workTime
			breakTime = breakTime + 1;
			$('.breakTime').html(breakTime + ' min');
		}
	}
};

//обработчик для клика work - +
function clickWork(event) {
	var target = event.target;    
	var y = $(target).html();    
		
	if (y == ' - ') {
		if (workTime >= 2) {     //если равно 1, то больше не уменьшать workTime
			workTime = workTime - 1;
			$('.workTime').html(workTime + ' min');
		}
	} 
	
	if (y == ' + ') {            
		if (workTime < 60) {	//если равно 60, то больше не увеличивать workTime
			workTime = workTime + 1;
			$('.workTime').html(workTime + ' min');
		}
	}
	minuts = workTime - 1;		
};

breakLength.addEventListener("click", clickBreak);
workLength.addEventListener("click", clickWork);

//обработчик для кнопки старт
function begin() {
	breakLength.removeEventListener("click", clickBreak);
	workLength.removeEventListener("click", clickWork);
	
	startButton.disabled = true;
	stopButton.disabled = false;
	
	var animate = document.getElementById('pomodoroAbove');
	var element1 = document.getElementById('timer');
	var session = document.getElementById('session');
	
	//animation for pomodoro background
	timerAnimation = setInterval(function() {

		if (session.textContent == 'work') {
			var adding = 230/(workTime*60);
		} else {
			var adding = 230/(breakTime*60) 
		}
		
		animate.style.height = position + 'px';
		position = position + adding;
	}, 1000);
				
	//таймер
	timerTime = setInterval(function () {
		session.textContent = sessionStr;       //записали какая сессия - начало work
					
		if (seconds == 0 && minuts == 0) {      //меняем work на break и обратно циклом
			if (sessionStr == 'work') {
				sessionStr = 'break';
				session.textContent = sessionStr;
				minuts = breakTime;
			} else {
				sessionStr = 'work';
				session.textContent = sessionStr;
				minuts = workTime;
			}
				position = 0;
				animate.style.height = 0;	
		}
				
		if (seconds <= 0 && minuts > 0) {       
			minuts = minuts - 1;
			seconds = 60;
			element1.textContent = minuts + ':' + seconds;
		} else {
			
			if (seconds >= 0 && seconds < 10) {
				element1.textContent = minuts + ':' + '0' + seconds;    // чтобы было 05 напр а не 5 сек
			} else {
			    element1.textContent = minuts + ':' + seconds;    //записали сколько времени
			}
		}
		seconds -= 1;
	}, 1000);
};
			
function stop() {
	startButton.disabled = false;
	stopButton.disabled = true;
	clearInterval(timerAnimation);
	clearInterval(timerTime);
}
			
function reset() {               //перезагрузка страницы
	location.reload(); 
    /*var reload = function() {   //для codepan, обычная перезагрузка блокируется
    location.href = location.href; 
    }
    setTimeout(reload, 0);*/	
}
