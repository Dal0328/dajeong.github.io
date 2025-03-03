// 질문 배열 정의 (각 질문은 두 가지 선택지를 가집니다)
// 각 질문은 MBTI의 네 가지 차원(E/I, S/N, T/F, J/P) 중 하나에 해당합니다.
const questions = [
    {
        question: "파티에서, 당신은 주로 어떤 활동을 선호하나요?",
        options: [
            { text: "낯선 사람들과 활발히 소통하기", letter: "E" },
            { text: "몇몇 친한 사람들과 깊은 대화 나누기", letter: "I" }
        ]
    },
    {
        question: "현재의 세부사항에 집중하나요, 아니면 미래의 가능성에 주목하나요?",
        options: [
            { text: "현재의 세부사항", letter: "S" },
            { text: "미래의 가능성", letter: "N" }
        ]
    },
    {
        question: "결정을 내릴 때 주로 무엇에 의존하나요?",
        options: [
            { text: "논리와 객관적 기준", letter: "T" },
            { text: "개인적 감정과 가치관", letter: "F" }
        ]
    },
    {
        question: "일정을 짤 때, 당신은 어떤 방식을 선호하나요?",
        options: [
            { text: "미리 계획을 세워 철저히 따르기", letter: "J" },
            { text: "즉흥적으로 유동적으로 행동하기", letter: "P" }
        ]
    },
    {
        question: "에너지를 얻을 때, 당신은 무엇에 의존하나요?",
        options: [
            { text: "다양한 사람들과의 만남", letter: "E" },
            { text: "혼자만의 시간", letter: "I" }
        ]
    },
    {
        question: "당신은 보통 무엇을 신뢰하나요?",
        options: [
            { text: "과거의 경험", letter: "S" },
            { text: "직감과 느낌", letter: "N" }
        ]
    },
    {
        question: "토론 중, 당신은 주로 어떤 전략을 사용하나요?",
        options: [
            { text: "논리적 근거 제시", letter: "T" },
            { text: "감정의 영향 고려", letter: "F" }
        ]
    },
    {
        question: "프로젝트를 진행할 때, 당신은 어떻게 계획하나요?",
        options: [
            { text: "구체적인 계획 수립", letter: "J" },
            { text: "상황에 맞춰 즉흥적으로 진행", letter: "P" }
        ]
    },
    {
        question: "사회적 상황에서, 당신은 무엇을 더 즐기나요?",
        options: [
            { text: "새로운 사람들과의 만남", letter: "E" },
            { text: "친숙한 사람들과의 대화", letter: "I" }
        ]
    },
    {
        question: "정보를 다룰 때, 당신은 주로 어떤 접근을 선호하나요?",
        options: [
            { text: "구체적인 사실에 집중", letter: "S" },
            { text: "추상적 이론에 몰두", letter: "N" }
        ]
    },
    {
        question: "피드백을 줄 때, 당신은 보통 어떻게 표현하나요?",
        options: [
            { text: "직설적으로 표현", letter: "T" },
            { text: "상대방의 감정을 배려", letter: "F" }
        ]
    },
    {
        question: "일정 관리에 대해, 당신은 어느 쪽에 더 익숙한가요?",
        options: [
            { text: "철저한 계획과 조직", letter: "J" },
            { text: "유연한 대처와 변화", letter: "P" }
        ]
    }
];

let currentQuestion = 0;
// 각 MBTI 차원의 점수를 저장합니다.
const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

const quizContainer = document.getElementById('quiz-container');
const startBtn = document.getElementById('start-btn');

startBtn.addEventListener('click', startQuiz);

function startQuiz() {
    // 시작 버튼을 숨기고 첫 번째 질문을 보여줍시다.
    startBtn.style.display = 'none';
    showQuestion();
}

function showQuestion() {
    quizContainer.innerHTML = '';
    // 아직 질문이 남아있다면 현재 질문을 표시합니다.
    if (currentQuestion < questions.length) {
        const q = questions[currentQuestion];

        const questionEl = document.createElement('div');
        questionEl.className = 'question';
        questionEl.textContent = q.question;
        quizContainer.appendChild(questionEl);

        const optionsList = document.createElement('ul');
        optionsList.className = 'options';

        q.options.forEach(option => {
            const li = document.createElement('li');
            const label = document.createElement('label');
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = 'option';
            radio.value = option.letter;
            label.appendChild(radio);
            label.appendChild(document.createTextNode(' ' + option.text));
            li.appendChild(label);
            optionsList.appendChild(li);
        });
        quizContainer.appendChild(optionsList);

        const nextBtn = document.createElement('button');
        nextBtn.textContent = currentQuestion === questions.length - 1 ? '결과 보기' : '다음';
        nextBtn.disabled = true;
        quizContainer.appendChild(nextBtn);

        // 옵션 선택 시 다음 버튼 활성화
        const radios = document.getElementsByName('option');
        radios.forEach(radio => {
            radio.addEventListener('change', () => {
                nextBtn.disabled = false;
            });
        });

        nextBtn.addEventListener('click', () => {
            // 선택된 답안을 확인하여 해당 점수를 추가합니다.
            radios.forEach(radio => {
                if (radio.checked) {
                    scores[radio.value]++;
                }
            });
            currentQuestion++;
            showQuestion();
        });
    } else {
        // 모든 질문이 완료된 경우 결과를 표시합니다.
        showResult();
    }
}

function showResult() {
    // 각 차원별 점수를 비교하여 최종 MBTI 유형을 결정합니다.
    const type =
        (scores.E >= scores.I ? 'E' : 'I') +
        (scores.S >= scores.N ? 'S' : 'N') +
        (scores.T >= scores.F ? 'T' : 'F') +
        (scores.J >= scores.P ? 'J' : 'P');

    quizContainer.innerHTML = `<h2>당신의 MBTI 유형은 ${type} 입니다!</h2>`;
}
