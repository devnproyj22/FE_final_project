
/* 변수 선언 */
let pos = 0;
let moveStep = 15;
let startTime;

const target = document.querySelector('.target');

/* 타이머 요소 생성 및 추가 */
const timerDiv = document.createElement('div');
timerDiv.classList.add('timer-container');
document.body.appendChild(timerDiv);

/* 이미지 컨테이너 생성 및 추가 */
const imgDiv = document.createElement('div');
imgDiv.classList.add('image-container');
document.body.appendChild(imgDiv);


/* 함수 정의 */
async function measureGameTime() {
    startTime = new Date(); // 게임 시작 시간 설정
    await waitForGameEnd(); // 비동기 함수 실행 
}
function waitForGameEnd() {
    // 게임 종료 조건 : Promise(비동기 작업의 최종 완료 또는 실패를 나타내는 객체)
    return new Promise(resolve => {
        let seconds = 0;

        const imgInsertionInterval = setInterval(() => {
            insertImg();
        }, 800);

        const interval = setInterval(() => {
            const currentTime = new Date();
            const elapsedTime = currentTime - startTime; // 경과 시간 계산 (밀리초 단위)
            timerDiv.textContent = `${(elapsedTime / 1000).toFixed(2)}s`; // 밀리초를 초 단위로 변환하여 표시
            
            const images = document.querySelectorAll('.image-size');
            images.forEach(img => {
                if (isCollision(target, img)) {
                    clearInterval(interval);
                    clearInterval(imgInsertionInterval);
                    alert(`Game Over : ${seconds}초 소요!`)
                    resolve();
                }                
            })

        }, 1000);
    });
}
function insertImg() {
    const imgContainer = document.querySelector('.image-container');
    const imgNode = document.createElement('img');
    imgNode.classList.add('image-size');
    imgNode.src = 'thunder.png';
    imgNode.alt = 'Dynamic Image';
    imgNode.style.left =  `${Math.random() * (window.innerWidth - 10)}px`;;
    imgContainer.appendChild(imgNode);

    imgNode.addEventListener('animationend', () => {
        imgNode.remove();
    });
    imgContainer.appendChild(imgNode);
}
function move(event) {
    const keyName = event.key;
    const targetPos = target.getBoundingClientRect();

    if(keyName === 'ArrowRight'){
        // 오른쪽으로 n칸 이동
        if(!(targetPos.right + moveStep > window.innerWidth)){
            pos += moveStep;
            target.style.transform = `translateX(${pos}px)`;
        }
    }
    if(keyName === 'ArrowLeft'){
        // 왼쪽으로 n칸 이동
        if(!(targetPos.left - moveStep < 0)){
            pos -= moveStep;
            target.style.transform = `translate(${pos}px)`
        }
    }
}
function isCollision(target, img){
    const targetRect = target.getBoundingClientRect();
    const imgRect = img.getBoundingClientRect();

    return !(targetRect.right < imgRect.left ||
            targetRect.left > imgRect.right ||
            targetRect.bottom < imgRect.top ||
            targetRect.top > imgRect.bottom);
}

/* 이벤트 정의 */
document.addEventListener('keydown', move, false); 


/* 함수 호출 */
measureGameTime();
