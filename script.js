// MBTI 퀴즈 질문 배열 (각 질문은 한 차원에 해당하며, 세 가지 선택지를 제공합니다)
// 각 질문에 대해 미리 작성한 상황극 대본(역할극 형식)도 포함되어 있습니다.
const questions = [
    {
        question: "학교 축제에서 너는 어떤 역할이야?",
        options: [
            { text: "나 무대에 있었는데 못봤어?", letter: "E" },
            { text: "나는 공연을 즐기고 있었지~!", letter: "I" },
            { text: "사실 기가 빨려서 조금 보다가 말았어.", letter: "I" }
        ],
        scenario: [
            "다정: 이번 축제 정말 재미있지 않았어?",
            "나: 완전... 정말 재미있었어.",
            "다정: 어? 그런데 너는 어디 있었어? 축제 내내 보이지 않던데."
        ]
    },
    {
        question: "새로운 정보를 접할 때 어떤 방식이 더 끌려?",
        options: [
            { text: "구체적인 사실과 디테일에 푹 빠져들어.", letter: "S" },
            { text: "아이디어와 가능성에 신나는 느낌을 받아.", letter: "N" },
            { text: "상황에 따라 다르지만, 보통은 사실적인 걸 선호해.", letter: "S" }
        ],
        scenario: [
            "다정: 오늘 도서관에서 신간 잡지를 봤어. 책 표지에서부터 디테일이 살아있더라구.",
            "나: 난 언제나 책 속의 작은 정보 하나하나에 매력을 느끼거든.",
            "다정: 너답게 꼼꼼하게 정보를 챙기는 모습, 멋져!"
        ]
    },
    {
        question: "결정을 내릴 때 네 기준은 뭐야?",
        options: [
            { text: "논리와 객관적 분석이 최우선이지.", letter: "T" },
            { text: "감정과 직감에 따르는 편이야.", letter: "F" },
            { text: "상황에 따라 이성과 감정을 적절히 섞어.", letter: "T" }
        ],
        scenario: [
            "다정: 수업 시간 토론할 때, 네가 갑자기 '내 직감대로 하자!'라고 한 거 기억나?",
            "나: 그때는 정말 고민 끝에 내 마음을 믿고 결정했었지.",
            "다정: 네 논리적인 설명도 좋았지만, 감정이 묻어난 그 한 마디가 아직도 웃겨."
        ]
    },
    {
        question: "일정을 계획할 때 어떤 방식을 선호해?",
        options: [
            { text: "항상 미리 계획을 세워 철저하게 움직여.", letter: "J" },
            { text: "즉흥적으로 그때그때 결정하는 게 좋아.", letter: "P" },
            { text: "계획도 좋지만, 유연함이 더 중요해.", letter: "J" }
        ],
        scenario: [
            "다정: 우리 반 행사 준비할 때, 넌 늘 달력에 다 표시해두고 움직였지.",
            "나: 그때는 계획이 전부인 줄 알았는데, 가끔은 즉흥적인 게 더 재밌더라구.",
            "다정: 이번에도 네 플랜이 빛을 발할지, 아니면 예측 불가의 변수가 등장할지 궁금해!"
        ]
    },
    {
        question: "친구들과 만날 때 어떤 스타일이 더 끌려?",
        options: [
            { text: "새로운 친구들과 만나며 에너지 충전!", letter: "E" },
            { text: "오랜 친구들과 편안하게 이야기해.", letter: "I" },
            { text: "혼자 있는 시간도 소중하게 생각해.", letter: "I" }
        ],
        scenario: [
            "다정: 급식실에서 점심 먹을 때, 넌 보통 누구랑 앉았더라?",
            "나: 보통은 오랜 친구들이랑 모여서 수다 떨곤 했지. 물론 가끔은 혼자 조용히 먹기도 해.",
            "다정: 네가 고른 그 자리, 오늘도 그 느낌 그대로겠지?"
        ]
    },
    {
        question: "정보를 기억할 때 어떤 방식이 더 편해?",
        options: [
            { text: "실제 경험과 구체적인 기억을 선호해.", letter: "S" },
            { text: "상상력과 아이디어로 채워진 기억을 좋아해.", letter: "N" },
            { text: "둘 다 필요하지만, 보통은 경험에 의존해.", letter: "S" }
        ],
        scenario: [
            "다정: 지난번 시험 전날, 넌 노트 정리를 끝내고 '이젠 내가 살아있다!'고 외쳤지.",
            "나: 그때는 실제로 경험한 일들을 복기하며 공부했어.",
            "다정: 네가 기억하는 디테일 덕분에 모두 감탄했었어!"
        ]
    },
    {
        question: "토론할 때 의견을 표현하는 스타일은?",
        options: [
            { text: "논리와 근거로 상대를 설득해.", letter: "T" },
            { text: "감성과 공감으로 대화를 이끌어.", letter: "F" },
            { text: "상황에 따라 둘 다 활용해.", letter: "T" }
        ],
        scenario: [
            "다정: 수업 중 그룹 토론에서 네가 '내 생각은 이래'라고 말할 때, 분위기가 팽팽했지.",
            "나: 난 그때 내 논리를 최대한 끌어내려고 애썼어.",
            "다정: 물론, 네 따뜻한 미소와 감정 표현도 잊을 수 없지."
        ]
    },
    {
        question: "프로젝트 진행 시 어떤 스타일이 맞아?",
        options: [
            { text: "미리 계획을 세워 체계적으로 진행해.", letter: "J" },
            { text: "즉흥적으로 아이디어를 내며 진행해.", letter: "P" },
            { text: "계획과 즉흥, 둘 다 적절히 조화시켜.", letter: "P" }
        ],
        scenario: [
            "다정: 학창 시절 우리 팀 프로젝트 준비할 때, 넌 항상 리더답게 미리 플랜을 짰잖아.",
            "나: 맞아, 그때는 계획이 없으면 불안했으니까.",
            "다정: 그런데 이번엔 네가 예상치 못한 즉흥 아이디어로 우리를 놀라게 할지도 몰라!"
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
// 각 메시지는 CSS 애니메이션 효과로 부드럽게 나타납니다.
function addMessage(text, type) {
    const messageEl = document.createElement('div');
    messageEl.classList.add('message', type);
    messageEl.textContent = text;
    chatContainer.appendChild(messageEl);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// 각 질문마다 미리 작성한 상황극 대본을 순차적으로 출력한 후 선택지를 표시합니다.
function showQuestionConversation() {
    clearChat();
    const q = questions[currentQuestion];
    const scenario = q.scenario;
    let delay = 0;

    scenario.forEach((line) => {
        setTimeout(() => {
            // "친구:"로 시작하면 system, "나:"로 시작하면 user로 판단
            const type = line.startsWith("나:") ? "user" : "system";
            addMessage(line, type);
        }, delay);
        delay += 800;
    });
    setTimeout(() => {
        showOptionsForCurrentQuestion();
    }, delay + 500);
}

// 현재 질문의 선택지를 보여줍니다. 선택 후 선택지 영역은 즉시 제거됩니다.
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
            addMessage("나: " + option.text, "user");
            scores[option.letter]++;
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

// 시작 버튼 클릭 시 시작 페이지를 숨기고 채팅 페이지로 전환
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
