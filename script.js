// MBTI 퀴즈 질문 배열 (각 질문은 한 차원에 해당하며, 세 가지 선택지가 주어집니다)
// 각 질문에서 option 1과 2는 기본 선택, option 3은 "둘 다" 혹은 "상황에 따라"의 느낌을 줍니다.
const questions = [
    {
        question: "파티에 가면 주로 어떤 스타일로 즐기니?",
        options: [
            { text: "여러 사람과 신나게 대화하며 에너지를 쏟아!", letter: "E" },
            { text: "소수의 친구와 진지하게 대화하며 분위기를 즐겨.", letter: "I" },
            { text: "한쪽 구석에서 조용히 구경하며 분위기를 느껴.", letter: "I" }
        ]
    },
    {
        question: "새로운 정보를 접할 때 어떤 방식이 더 끌려?",
        options: [
            { text: "구체적인 사실과 디테일에 빠져들어.", letter: "S" },
            { text: "아이디어와 가능성에 흥분해.", letter: "N" },
            { text: "상황에 따라 다르지만 보통은 사실적인 걸 선호해.", letter: "S" }
        ]
    },
    {
        question: "결정을 내릴 때 네 기준은 뭐야?",
        options: [
            { text: "논리와 객관적 분석, 그게 다야.", letter: "T" },
            { text: "감정과 직감이 내 선택을 이끌어.", letter: "F" },
            { text: "둘 다 쓰지만, 결국은 이성이 승리해.", letter: "T" }
        ]
    },
    {
        question: "일정을 계획할 때 어떤 방식을 선호해?",
        options: [
            { text: "체계적이고 미리 계획하는 게 편해.", letter: "J" },
            { text: "즉흥적으로 그때그때 결정하는 게 재밌어.", letter: "P" },
            { text: "계획도 좋지만, 유연함도 필요하지.", letter: "J" }
        ]
    },
    {
        question: "친구들과 만날 때 어떤 스타일이 더 끌려?",
        options: [
            { text: "새로운 사람들과 만나며 에너지 충전!", letter: "E" },
            { text: "익숙한 친구들과 편안하게 수다 떨어.", letter: "I" },
            { text: "때론 혼자만의 시간도 즐겨.", letter: "I" }
        ]
    },
    {
        question: "정보를 기억할 때 어떤 방식이 더 편해?",
        options: [
            { text: "실제 경험과 구체적인 기억에 의존해.", letter: "S" },
            { text: "아이디어와 상상력이 내 머릿속을 채워.", letter: "N" },
            { text: "경험도 중요하고 상상도 자극적이야.", letter: "S" }
        ]
    },
    {
        question: "토론할 때 의견을 표현하는 스타일은?",
        options: [
            { text: "논리와 근거로 상대를 설득해.", letter: "T" },
            { text: "감성과 공감으로 대화를 이끌어.", letter: "F" },
            { text: "상황에 따라 논리와 감성을 조합해.", letter: "T" }
        ]
    },
    {
        question: "프로젝트 진행 시 어떤 스타일이 맞아?",
        options: [
            { text: "미리 계획을 세워 체계적으로 움직여.", letter: "J" },
            { text: "상황에 따라 유연하게 대처해.", letter: "P" },
            { text: "일단 시작해보고 그때그때 조절해.", letter: "P" }
        ]
    }
];

let currentQuestion = 0;
const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

// DOM 요소 가져오기
const startPage = document.getElementById('start-page');
const chatPage = document.getElementById('chat-page');
const resultPage = document.getElementById('result-page');
const chatContainer = document.getElementById('chat-container');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');

// 채팅창 초기화 (이전 내용 제거)
function clearChat() {
    chatContainer.innerHTML = '';
}

// 채팅 말풍선 추가 (타입: 'system' 또는 'user')
// animation 효과는 CSS @keyframes fadeIn으로 처리됨
function addMessage(text, type) {
    const messageEl = document.createElement('div');
    messageEl.classList.add('message', type);
    messageEl.textContent = text;
    chatContainer.appendChild(messageEl);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// 각 질문마다 2~3번의 대화 흐름(상황극)을 랜덤하게 구성합니다.
function showQuestionConversation() {
    clearChat();
    const q = questions[currentQuestion];

    // 첫 질문은 고정되지 않고 랜덤한 인삿말을 사용합니다.
    const firstFriendMsgs = [
        "친구: 야, 오늘 너의 성향을 한번 파헤쳐보자고!",
        "친구: 헐, 너도 이런 성격이었어? 한번 물어볼게!",
        "친구: 자, 내 호기심을 채울 시간이 왔다! 준비됐어?"
    ];
    const firstUserMsgs = [
        "나: 뭐야, 갑자기 왜 이래?",
        "나: 좋아, 한번 해보자!",
        "나: 나도 궁금한데? 시작해!"
    ];

    // 후속 대화 메시지 (모든 질문에 공통)
    const followUpFriendMsgs = [
        "친구: 그럼, 이번 질문! " + q.question,
        "친구: 알겠어, 다음 질문! " + q.question,
        "친구: 자, 이제 물어볼게! " + q.question
    ];
    const followUpUserMsgs = [
        "나: 흠, 재미있겠다. 말해봐!",
        "나: 오, 그럼 어떻게 대답해야 할지?",
        "나: 에이, 기대된다!"
    ];

    if (currentQuestion === 0) {
        // 첫 질문: 랜덤하게 인삿말 교환 후 질문 제시
        addMessage(firstFriendMsgs[Math.floor(Math.random() * firstFriendMsgs.length)], "system");
        setTimeout(() => {
            addMessage(firstUserMsgs[Math.floor(Math.random() * firstUserMsgs.length)], "user");
        }, 700);
        setTimeout(() => {
            addMessage(followUpFriendMsgs[Math.floor(Math.random() * followUpFriendMsgs.length)], "system");
            showOptionsForCurrentQuestion();
        }, 1400);
    } else {
        // 후속 질문: 2~3번의 대화 흐름을 추가합니다.
        addMessage("친구: 자, 오늘은 또 뭐가 궁금한지 알아보자!", "system");
        setTimeout(() => {
            addMessage(followUpUserMsgs[Math.floor(Math.random() * followUpUserMsgs.length)], "user");
        }, 600);
        setTimeout(() => {
            addMessage("친구: 좋아, 그럼 이번 질문! " + q.question, "system");
            showOptionsForCurrentQuestion();
        }, 1200);
    }
}

// 현재 질문의 선택지를 보여줍니다. 선택 후 선택지 영역은 바로 제거됩니다.
function showOptionsForCurrentQuestion() {
    const q = questions[currentQuestion];
    const optionsDiv = document.createElement('div');
    optionsDiv.classList.add('options-container');

    q.options.forEach(option => {
        const btn = document.createElement('button');
        btn.textContent = option.text;
        btn.addEventListener('click', () => {
            // 선택 후 선택지 제거
            optionsDiv.remove();
            // 사용자의 선택을 즉시 채팅창에 추가
            addMessage("나: " + option.text, "user");
            // 해당 선택지의 점수 누적
            scores[option.letter]++;
            // 다음 질문 또는 결과로 넘어가기 전 잠시 대기
            setTimeout(() => {
                currentQuestion++;
                if (currentQuestion < questions.length) {
                    showQuestionConversation();
                } else {
                    showResult();
                }
            }, 1000);
        });
        optionsDiv.appendChild(btn);
    });
    chatContainer.appendChild(optionsDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// 최종 결과 계산 후 결과 페이지에 표시 (채팅 UI는 사용하지 않습니다)
function showResult() {
    const type =
        (scores.E >= scores.I ? 'E' : 'I') +
        (scores.S >= scores.N ? 'S' : 'N') +
        (scores.T >= scores.F ? 'T' : 'F') +
        (scores.J >= scores.P ? 'J' : 'P');

    chatPage.style.display = "none";
    resultPage.style.display = "block";
    document.getElementById("result-text").textContent = "결과: 당신의 MBTI 유형은 " + type + "입니다.";
}

// 시작 버튼 클릭 시 시작 페이지 숨기고 채팅 페이지로 전환
startBtn.addEventListener('click', () => {
    startPage.style.display = "none";
    chatPage.style.display = "flex";
    showQuestionConversation();
});

// 다시 시작 버튼 클릭 시 초기화 후 시작 페이지로 복귀
restartBtn.addEventListener('click', () => {
    currentQuestion = 0;
    for (let key in scores) {
        scores[key] = 0;
    }
    resultPage.style.display = "none";
    startPage.style.display = "block";
});
