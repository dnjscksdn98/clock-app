// items from html
const form = document.querySelector('.js-form'),
    input = form.querySelector('input'),
    greeting = document.querySelector('.js-greetings');

// const variables
const USER_LS = "currentUser",
    SHOWING_CN = "showing";

function saveName(text) {
    localStorage.setItem(USER_LS, text);  // 입력한 사용자명을 로컬 저장소에 저장
}

function handleSubmit(event) {
    event.preventDefault();  // 기본 동작을 막는다
    const currentValue = input.value;  // 입력한 내용을 반환
    paintGreeting(currentValue);  // 입력한 내용을 화면에 출력
    saveName(currentValue);  // 사용자명 저장
}

function askForName() {
    form.classList.add(SHOWING_CN);  // add block
    form.addEventListener("submit", handleSubmit);  // if submit, call handleSubmit
}

function paintGreeting(text) {
    form.classList.remove(SHOWING_CN);  // delete block
    greeting.classList.add(SHOWING_CN);  // add block
    greeting.innerText = `Hello ${text}`;  // add text
}

function loadName() {
    const currentUser = localStorage.getItem(USER_LS);  // 로컬 저장소로부터 해당 값 반환

    if (currentUser === null) {
        askForName();  // 사용자가 없으면 이름 물어보기
    } else {
        paintGreeting(currentUser);  // 사용자가 있으면 환영 문구 출력
    }
}

function init() {
    loadName();
}
init();