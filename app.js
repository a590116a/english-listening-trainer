const FAVORITES_KEY = "english-listening-trainer-favorites";
const LEVEL_CONFIG = {
  easy: { label: "初級 2000", vocabBand: "2000 字級", rate: 0.78 },
  medium: { label: "中級 4000", vocabBand: "4000 字級", rate: 0.88 },
  hard: { label: "高級 10000", vocabBand: "10000 字級", rate: 0.96 }
};

const PEOPLE = [
  { id: "p01", name: "Kevin", city: "Taipei", cityZh: "台北", role: "student", roleZh: "學生", item: "notebook", itemZh: "筆記本", helper: "teacher", helperZh: "老師" },
  { id: "p02", name: "Mia", city: "Taichung", cityZh: "台中", role: "college student", roleZh: "大學生", item: "planner", itemZh: "計畫本", helper: "sister", helperZh: "姐姐" },
  { id: "p03", name: "Jason", city: "Tainan", cityZh: "台南", role: "junior student", roleZh: "國中生", item: "camera", itemZh: "相機", helper: "classmate", helperZh: "同學" },
  { id: "p04", name: "Emily", city: "Hsinchu", cityZh: "新竹", role: "office worker", roleZh: "上班族", item: "wallet", itemZh: "皮夾", helper: "station worker", helperZh: "站務員" },
  { id: "p05", name: "Nora", city: "Kaohsiung", cityZh: "高雄", role: "language learner", roleZh: "語言學習者", item: "dictionary", itemZh: "字典", helper: "friend", helperZh: "朋友" },
  { id: "p06", name: "Leo", city: "Keelung", cityZh: "基隆", role: "tour guide", roleZh: "導覽員", item: "map", itemZh: "地圖", helper: "visitor", helperZh: "旅客" },
  { id: "p07", name: "Sophie", city: "Chiayi", cityZh: "嘉義", role: "high school student", roleZh: "高中生", item: "recipe card", itemZh: "食譜卡", helper: "coach", helperZh: "教練" },
  { id: "p08", name: "Ryan", city: "Yilan", cityZh: "宜蘭", role: "volunteer", roleZh: "志工", item: "water bottle", itemZh: "水壺", helper: "neighbor", helperZh: "鄰居" },
  { id: "p09", name: "Claire", city: "Pingtung", cityZh: "屏東", role: "librarian", roleZh: "圖書館員", item: "flower sign", itemZh: "花牌", helper: "student group", helperZh: "學生小組" },
  { id: "p10", name: "Daniel", city: "Hualien", cityZh: "花蓮", role: "part time worker", roleZh: "兼職工作者", item: "train card", itemZh: "車票卡", helper: "manager", helperZh: "主管" }
];

const THEMES = [
  { id: "t01", cue: "抓時間、習慣與改變。" },
  { id: "t02", cue: "抓地點、聲音與現場對話。" },
  { id: "t03", cue: "抓任務、環境與心得。" },
  { id: "t04", cue: "抓事件順序與關鍵物品。" },
  { id: "t05", cue: "抓原因、做法與最後效果。" }
];

const ARTICLE_BANK = buildArticleBank();

const state = {
  selectedLevel: "easy",
  playlist: [],
  articleIndex: 0,
  currentArticle: null,
  currentUtterance: null,
  activeTokenIndex: -1,
  favorites: loadFavorites(),
  showFavoritesOnly: false,
  autoRepeatEnabled: false,
  currentRepeatCount: 0,
  currentRepeatTarget: 1
};

const elements = {
  startButton: document.querySelector("#start-button"),
  randomButton: document.querySelector("#random-button"),
  favoriteButton: document.querySelector("#favorite-button"),
  nextButton: document.querySelector("#next-button"),
  playButton: document.querySelector("#play-button"),
  slowButton: document.querySelector("#slow-button"),
  replayButton: document.querySelector("#replay-button"),
  autoRepeatToggle: document.querySelector("#auto-repeat-toggle"),
  favoritesFilterButton: document.querySelector("#favorites-filter-button"),
  translationToggle: document.querySelector("#translation-toggle"),
  articleList: document.querySelector("#article-list"),
  levelButtons: [...document.querySelectorAll("#level-buttons .chip-btn")],
  progressText: document.querySelector("#progress-text"),
  progressBar: document.querySelector("#progress-bar"),
  sessionTitle: document.querySelector("#session-title"),
  questionType: document.querySelector("#question-type"),
  questionText: document.querySelector("#question-text"),
  questionNote: document.querySelector("#question-note"),
  passageTitle: document.querySelector("#passage-title"),
  passageMeta: document.querySelector("#passage-meta"),
  passageText: document.querySelector("#passage-text"),
  translationText: document.querySelector("#translation-text"),
  feedbackText: document.querySelector("#feedback-text"),
  dashboardLevel: document.querySelector("#dashboard-level"),
  dashboardWords: document.querySelector("#dashboard-words"),
  dashboardTitle: document.querySelector("#dashboard-title"),
  dashboardMessage: document.querySelector("#dashboard-message")
};

initialize();

function initialize() {
  bindChipGroup(elements.levelButtons, (button) => {
    state.selectedLevel = button.dataset.level;
    buildPlaylist();
    renderCurrentArticle();
  });

  elements.startButton.addEventListener("click", () => {
    buildPlaylist();
    renderCurrentArticle();
    speakCurrentArticle(LEVEL_CONFIG[state.selectedLevel].rate);
  });
  elements.randomButton.addEventListener("click", () => {
    buildPlaylist();
    renderCurrentArticle();
  });
  elements.favoriteButton.addEventListener("click", toggleFavoriteCurrentArticle);
  elements.nextButton.addEventListener("click", goToNextArticle);
  elements.playButton.addEventListener("click", () => speakCurrentArticle(LEVEL_CONFIG[state.selectedLevel].rate));
  elements.slowButton.addEventListener("click", () => speakCurrentArticle(0.72));
  elements.replayButton.addEventListener("click", () => speakCurrentArticle(LEVEL_CONFIG[state.selectedLevel].rate));
  elements.autoRepeatToggle.addEventListener("change", () => {
    state.autoRepeatEnabled = elements.autoRepeatToggle.checked;
  });
  elements.favoritesFilterButton.addEventListener("click", toggleFavoritesFilter);
  elements.translationToggle.addEventListener("change", updateTranslationVisibility);

  buildPlaylist();
  renderCurrentArticle();
}

function buildArticleBank() {
  const bank = { easy: [], medium: [], hard: [] };
  THEMES.forEach((theme, themeIndex) => {
    PEOPLE.forEach((person, personIndex) => {
      const serial = themeIndex * PEOPLE.length + personIndex + 1;
      bank.easy.push(buildArticle("easy", serial, theme, person));
      bank.medium.push(buildArticle("medium", serial, theme, person));
      bank.hard.push(buildArticle("hard", serial, theme, person));
    });
  });
  return bank;
}

function buildArticle(level, serial, theme, person) {
  const builders = { easy: buildEasyArticle, medium: buildMediumArticle, hard: buildHardArticle };
  return builders[level](serial, theme, person);
}

function buildEasyArticle(serial, theme, person) {
  const contentMap = {
    t01: {
      title: `${person.name}'s Morning English Plan`,
      en: `${person.name} is a ${person.role} in ${person.city}. Every weekday, ${person.name} gets up early and spends twenty minutes on English before breakfast. First, ${person.name} listens to a short passage and follows the words on the screen. Next, ${person.name} reads the same passage again and writes key words in a ${person.item}. At the start, the routine felt slow, but after several weeks, class listening became much easier. ${person.name} now feels calm, stays focused longer, and often tells ${person.helper} that small daily practice can build strong listening habits.`,
      zh: `${person.name} 是來自${person.cityZh}的${person.roleZh}。每個平日，${person.name} 都會早起，在早餐前花二十分鐘練英文。首先，${person.name} 會先聽一篇短文，並跟著畫面上的單字看。接著，${person.name} 會再讀一次同一篇短文，並把重點單字寫進${person.itemZh}。一開始，這個習慣進行得很慢，但幾週後，課堂上的聽力變得容易許多。現在，${person.name} 更沉著，也更能專心，還常常告訴${person.helperZh}，每天一點點練習就能建立穩定的聽力習慣。`
    },
    t02: {
      title: `${person.name} at the Night Market`,
      en: `One weekend, ${person.name} went to a night market in ${person.city} with ${person.helper}. They wanted to enjoy local food and hear real spoken English from visitors. ${person.name} bought noodles, tea, and a small snack, then walked past many bright game stalls. Near the music area, they heard a traveler asking for directions in English. ${person.name} listened carefully, caught several simple phrases, and helped by pointing to a map. Before leaving, ${person.name} said the evening was useful because it mixed food, sound, and live conversation in one lively place.`,
      zh: `某個週末，${person.name} 和${person.helperZh} 一起去${person.cityZh}的夜市。他們想一邊享受在地食物，一邊聽觀光客真實說英文。${person.name} 買了麵、茶和一份小點心，然後走過許多明亮的遊戲攤位。在音樂區附近，他們聽到一位旅客用英文問路。${person.name} 仔細聽，抓到了幾個簡單片語，還幫忙指地圖。離開前，${person.name} 說這個晚上很有幫助，因為食物、聲音和現場對話都集中在同一個熱鬧空間。`
    },
    t03: {
      title: `${person.name} in the Garden Team`,
      en: `Last month, ${person.name} joined a garden activity near the community center in ${person.city}. The team had easy jobs: some people watered plants, some cleaned the path, and ${person.name} helped place name cards beside flowers. The weather was warm, and everyone needed short breaks and plenty of water. Even so, the group stayed cheerful. While working, ${person.name} listened to short English talks from a visiting volunteer about color, soil, and sunlight. By the end of the afternoon, the garden looked cleaner, and ${person.name} felt happy about learning new words in a real place.`,
      zh: `上個月，${person.name} 參加了${person.cityZh}社區中心附近的花園活動。團隊的工作都不難：有人澆花，有人清理小路，而${person.name} 則幫忙把花名卡放在花旁邊。天氣溫暖，大家需要短暫休息，也要多喝水。即使如此，整組人還是很開心。工作時，${person.name} 還聽到一位來訪志工用簡短英文介紹顏色、土壤和陽光。到了下午結束，花園變得更整齊，而${person.name} 也很高興能在真實場景中學到新單字。`
    },
    t04: {
      title: `${person.name} Found a Lost Item`,
      en: `After a busy day, ${person.name} took a train home in ${person.city}. Under a seat, ${person.name} noticed a lost ${person.item}. There was no phone number inside, only a card and a few small notes. At the next stop, ${person.name} walked to the service desk and explained what had happened. The station staff thanked ${person.name} for being careful and kind. Later that night, the owner called and said the item was important for the next morning. ${person.name} felt glad because one small action helped another person avoid a stressful problem.`,
      zh: `忙完一天後，${person.name} 在${person.cityZh}搭火車回家。座位下方有一個遺失的${person.itemZh}，被${person.name} 發現了。裡面沒有電話號碼，只有一張卡片和幾張小紙條。到下一站時，${person.name} 走到服務台，說明發生的事。站務人員感謝${person.name} 的細心與好心。那天晚上稍晚，失主打電話來，說這個物品對隔天早上很重要。${person.name} 很高興，因為一個小動作就幫另一個人避開了很大的麻煩。`
    },
    t05: {
      title: `${person.name}'s New Daily Plan`,
      en: `${person.name} used to end each day feeling tired and distracted. To make life healthier, ${person.name} made a new plan in ${person.city}. The plan was simple: drink more water, walk for twenty minutes, sleep earlier, and listen to one short English passage every evening. During the first week, the change was not easy. Still, ${person.name} kept going with support from ${person.helper}. After a month, ${person.name} had more energy, better sleep, and clearer focus during study time. Now ${person.name} believes that a simple routine can improve both health and listening skill.`,
      zh: `${person.name} 過去常常在一天結束時覺得很累，也很分心。為了讓生活更健康，${person.name} 在${person.cityZh} 為自己訂了一個新計畫。這個計畫很簡單：多喝水、走路二十分鐘、早點睡，以及每天晚上聽一篇英文短文。第一週時，改變並不容易。不過，在${person.helperZh} 的支持下，${person.name} 還是持續下去。一個月後，${person.name} 的精神更好、睡得更好，讀書時也更專心。現在，${person.name} 相信簡單的日常規律能同時改善健康與聽力。`
    }
  };
  return finalizeArticle("easy", serial, contentMap[theme.id], theme.cue);
}

function buildMediumArticle(serial, theme, person) {
  const contentMap = {
    t01: {
      title: `${person.name}'s Listening Routine in ${person.city}`,
      en: `${person.name}, a ${person.role} based in ${person.city}, created a steady English listening routine after realizing that fast classroom speech was difficult to follow. Each morning, instead of checking messages right away, ${person.name} listens to a short article, shadows several lines, and records useful expressions in a ${person.item}. The routine only takes twenty minutes, yet it has changed the whole day. Within a few weeks, ${person.name} noticed better concentration, clearer pronunciation, and less anxiety during lessons. According to ${person.name}, the biggest improvement came from repeating short passages until the rhythm of the language started to feel natural rather than confusing.`,
      zh: `${person.name} 是在${person.cityZh}生活的${person.roleZh}。在意識到自己很難跟上課堂上快速的英文語速後，${person.name} 建立了一套穩定的英文聽力習慣。每天早上，${person.name} 不再一醒來就查看訊息，而是先聽一篇短文、跟讀幾句，再把有用的表達記進${person.itemZh}。整個流程只花二十分鐘，卻改變了整天的狀態。幾週之內，${person.name} 發現自己更能專心、發音更清楚，上課時也較不焦慮。${person.name} 認為，最大的進步來自反覆聽短文，直到英文的節奏開始變得自然，而不再混亂。`
    },
    t02: {
      title: `${person.name}'s Night Market Listening Experience`,
      en: `During a weekend outing in ${person.city}, ${person.name} visited a night market with ${person.helper} and treated the trip as a listening exercise instead of simple entertainment. While ordering food and moving through crowded lanes, ${person.name} paid attention to short conversations, tourist questions, and repeated phrases from vendors. Near the performance area, a group of visitors discussed directions in English, so ${person.name} listened carefully and recognized several key words about maps, timing, and transportation. The experience showed ${person.name} that listening practice does not always require a classroom. Real places filled with sound can train the ear, especially when the learner stays relaxed and curious.`,
      zh: `某個週末在${person.cityZh}外出時，${person.name} 和${person.helperZh} 一起逛夜市，並把這趟行程當成一次聽力練習，而不只是單純娛樂。點餐、穿過擁擠巷道的過程中，${person.name} 特別留意簡短對話、旅客提問，以及攤販重複說的片語。在表演區附近，有一群旅客用英文討論路線，因此${person.name} 仔細聽，辨認出幾個和地圖、時間、交通有關的關鍵詞。這次經驗讓${person.name} 明白，聽力練習不一定只能在教室裡進行。充滿聲音的真實場景，只要保持放鬆與好奇，也能有效訓練耳朵。`
    },
    t03: {
      title: `${person.name} Learned Outdoors`,
      en: `A community garden project in ${person.city} gave ${person.name} an unexpected chance to practice English in a practical setting. Volunteers were divided into small teams, and ${person.name}'s group organized tools, labeled plants, and listened to a visiting speaker explain how sunlight, water, and soil affect growth. Although the weather was hot and the work demanded patience, the activity never felt dull. Because the information was connected to visible objects, ${person.name} could remember unfamiliar words more easily. By the end of the afternoon, the garden looked brighter, the group felt closer, and ${person.name} left with the impression that outdoor tasks can make listening practice more vivid and memorable.`,
      zh: `${person.name} 在${person.cityZh}參加的社區花園計畫，意外提供了一個很實用的英文練習機會。志工被分成幾個小組，而${person.name} 那組負責整理工具、標示植物，並聆聽來訪講者說明陽光、水分與土壤如何影響生長。雖然天氣炎熱，而且工作需要耐心，但整個活動一點也不無聊。因為資訊都和眼前可見的實物有關，${person.name} 更容易記住不熟悉的單字。到了下午結束時，花園看起來更明亮，團隊之間也更熟悉，而${person.name} 深深感受到，戶外任務會讓聽力練習變得更鮮明、更容易記住。`
    },
    t04: {
      title: `${person.name} and the Lost ${person.item}`,
      en: `When ${person.name} was returning home by train in ${person.city}, a lost ${person.item} under the seat changed an ordinary ride into a lesson about attention and responsibility. ${person.name} first looked for contact details but found only a card and a few personal notes. Rather than leaving the item behind, ${person.name} reported it to station staff and described the exact seat number. That evening, the owner called to express relief because the missing item contained something necessary for the next day. The situation stayed in ${person.name}'s mind, not because it was dramatic, but because it proved that careful listening, clear communication, and quick action often matter at the same moment.`,
      zh: `${person.name} 在${person.cityZh}搭火車回家時，座位下方的一個遺失${person.itemZh}，讓原本平凡的旅程變成一堂關於專注與責任感的課。${person.name} 一開始先找聯絡方式，但只看到一張卡和幾張私人便條。${person.name} 沒有把東西留在原地，而是向站務人員通報，並清楚說明座位號碼。當天晚上，失主打電話來表達鬆了一口氣，因為這件物品裡有隔天必須用到的重要東西。這件事讓${person.name} 記了很久，不是因為它特別戲劇化，而是因為它證明了：仔細傾聽、清楚表達和及時行動，常常會在同一個時刻同樣重要。`
    },
    t05: {
      title: `${person.name}'s Health and Listening Plan`,
      en: `${person.name} decided to redesign daily life in ${person.city} with a plan that supported both physical health and listening growth. The new schedule included walking, drinking more water, putting the phone away earlier, and ending the evening with one carefully chosen English passage. At first, the routine felt strict, especially on busy days, yet ${person.name} kept following it with encouragement from ${person.helper}. Over time, the benefits became visible: better sleep, steadier mood, and stronger focus during language study. ${person.name} now says that listening improves faster when the body is rested and the mind is not carrying too much noise.`,
      zh: `${person.name} 決定在${person.cityZh}重新安排自己的日常生活，設計一套同時兼顧身體健康與聽力成長的計畫。新的時間表包含散步、多喝水、更早放下手機，以及每天晚上用一篇精心挑選的英文短文收尾。剛開始時，這套規律感覺有點嚴格，尤其是在忙碌的日子裡，不過${person.name} 在${person.helperZh} 的鼓勵下還是持續執行。隨著時間過去，好處越來越明顯：睡得更好、情緒更穩、學英文時也更能集中。現在，${person.name} 常說，當身體有休息好、心裡也沒有太多雜音時，聽力會進步得更快。`
    }
  };
  return finalizeArticle("medium", serial, contentMap[theme.id], theme.cue);
}

function buildHardArticle(serial, theme, person) {
  const contentMap = {
    t01: {
      title: `${person.name}'s Deliberate Listening Practice`,
      en: `${person.name}, a ${person.role} from ${person.city}, once regarded English listening as an exhausting stream of half recognized sounds. In response, ${person.name} constructed a deliberate morning practice: a short passage is played once for gist, replayed for detail, and then shadowed line by line while useful expressions are annotated in a ${person.item}. The routine is modest in length but remarkably disciplined. After maintaining it for more than a month, ${person.name} noticed not only stronger comprehension but also a growing sensitivity to stress patterns, linking, and intonation. What had seemed like speed was often simply unfamiliar rhythm. That realization transformed listening from a frustrating test into a trainable skill.`,
      zh: `${person.name} 是來自${person.cityZh}的${person.roleZh}，過去一直把英文聽力視為一連串只能勉強辨認、令人疲累的聲音流。為了改變這種情況，${person.name} 建立了一套有意識的晨間練習：先播放一篇短文抓大意，再重播一次抓細節，最後逐句跟讀，並把重要表達註記在${person.itemZh}裡。這套流程看起來不長，卻相當有紀律。持續一個多月後，${person.name} 不只理解力提升，也對重音、連音與語調變得更敏感。原本以為是語速太快，其實很多時候只是節奏不熟悉。這個體悟讓聽力不再像令人挫折的測驗，而成為可以訓練的能力。`
    },
    t02: {
      title: `${person.name}'s Observations at the Night Market`,
      en: `While visiting a night market in ${person.city} with ${person.helper}, ${person.name} decided to treat the noisy environment as a laboratory for advanced listening. Instead of trying to understand every sentence, ${person.name} focused on discourse clues: repeated requests, changes in tone, and the contextual meaning of words spoken by travelers, vendors, and performers. Surprisingly, the surrounding noise did not completely block understanding; it forced more selective attention. By the end of the evening, ${person.name} had identified useful expressions about ordering, directions, and timing, and had also learned that listening in the real world depends as much on inference and pattern recognition as on vocabulary alone.`,
      zh: `${person.name} 和${person.helperZh} 一起逛${person.cityZh}夜市時，決定把這個吵雜的環境當成高階聽力訓練的實驗場。${person.name} 沒有試圖聽懂每一句話，而是把注意力放在話語線索上：重複出現的請求、語氣的變化，以及旅客、攤販和表演者所說詞語在情境中的意思。令人意外的是，周圍的噪音並沒有完全阻礙理解，反而迫使${person.name} 更有選擇性地集中注意。到了晚上結束時，${person.name} 不只抓到了和點餐、問路、時間安排有關的實用表達，也理解到真實世界中的聽力，依賴的不只是字彙量，還包括推論與辨識語言模式的能力。`
    },
    t03: {
      title: `${person.name} and Context Rich Listening`,
      en: `A community garden project in ${person.city} unexpectedly became one of ${person.name}'s most effective listening experiences. Because the visiting speaker discussed concrete things such as soil texture, plant labels, shade, and watering methods, every unfamiliar word appeared beside a visible reference. That reduced mental overload and made retention easier. Meanwhile, the physical task of organizing tools and signs prevented the activity from feeling academic or abstract. ${person.name} later reflected that context rich listening is powerful precisely because meaning does not arrive through sound alone; gesture, environment, sequence, and shared attention all help the listener construct understanding with greater precision and confidence.`,
      zh: `${person.name} 在${person.cityZh}參加的社區花園計畫，意外成了最有效的聽力經驗之一。因為來訪講者談論的內容都很具體，例如土壤質地、植物標牌、陰影位置和澆水方法，所以每個陌生單字旁邊幾乎都有可見的參照物。這減少了理解時的心理負荷，也讓記憶更牢固。同時，整理工具與標牌的實際工作，使整個活動不會顯得太學術或抽象。事後${person.name} 反思到，情境豐富的聽力之所以有效，正是因為意義並不是只透過聲音傳達；動作、環境、順序與共同注意焦點，都會幫助聽者以更精確、更有信心的方式建立理解。`
    },
    t04: {
      title: `${person.name}, Attention, and a Lost ${person.item}`,
      en: `When ${person.name} discovered a lost ${person.item} on a train in ${person.city}, the episode revealed how closely attention, memory, and communication are connected. ${person.name} observed where the item was found, checked for identifying details, and then reported the situation carefully to station staff. Hours later, the relieved owner explained that the missing object contained something essential for the following morning. The incident stayed memorable not because it involved drama, but because it demonstrated an important principle: accurate listening often begins with accurate noticing. People who observe clearly can describe events precisely, and that precision makes later communication faster, calmer, and far more useful.`,
      zh: `${person.name} 在${person.cityZh}的火車上發現一個遺失的${person.itemZh}時，這段經歷讓人看見注意力、記憶與溝通之間其實密切相連。${person.name} 先觀察物品被發現的位置，再查看是否有能辨識失主的資訊，之後才把情況清楚地通報給站務人員。幾個小時後，鬆了一口氣的失主說明，那個遺失物裡裝著隔天早上必需使用的重要東西。這件事令人難忘，並不是因為它多麼戲劇化，而是它證明了一個重要原則：精準的聽力，往往始於精準的觀察。能夠看得清楚的人，也更能描述得準確，而這種準確會讓後續溝通變得更快、更冷靜，也更有用。`
    },
    t05: {
      title: `${person.name}'s Integrated Learning Routine`,
      en: `After feeling chronically distracted, ${person.name} redesigned daily life in ${person.city} with an integrated routine meant to strengthen both wellbeing and English listening. The schedule combined light exercise, earlier sleep, fewer late night messages, and one short passage selected for careful repetition. At first, the arrangement seemed overly structured, yet its benefits gradually accumulated. Better rest improved attention span, steadier energy reduced impatience, and repeated listening sharpened sensitivity to nuance. ${person.name} now argues that language growth is rarely isolated from the rest of life. When physical habits become more sustainable, the mind becomes more available for difficult tasks such as interpreting connected speech with consistency.`,
      zh: `${person.name} 長期感到分心之後，決定在${person.cityZh}重新設計自己的日常生活，建立一套同時強化身心狀態與英文聽力的整合式規律。這份安排結合了輕度運動、更早睡覺、減少深夜訊息，以及每天挑一篇短文做反覆精聽。起初，這樣的生活方式看起來有些過於規律，但它的益處逐漸累積。更好的睡眠延長了專注時間，更穩定的精力減少了焦躁感，而重複聆聽則提升了對細微語意差別的敏感度。現在，${person.name} 常說，語言成長很少是與生活其餘部分完全分離的；當身體習慣變得更可持續，心智也會更有餘裕去處理像連續語流理解這種困難任務。`
    }
  };
  return finalizeArticle("hard", serial, contentMap[theme.id], theme.cue);
}

function finalizeArticle(level, serial, content, cue) {
  return {
    id: `${level}-${String(serial).padStart(2, "0")}`,
    level,
    title: content.title,
    wordCount: countWords(content.en),
    audioText: content.en,
    translation: content.zh,
    note: cue
  };
}

function bindChipGroup(buttons, onSelect) {
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");
      onSelect(button);
    });
  });
}

function buildPlaylist() {
  const source = ARTICLE_BANK[state.selectedLevel];
  const filtered = state.showFavoritesOnly ? source.filter((article) => state.favorites.includes(article.id)) : source;
  state.playlist = shuffle(filtered);
  state.articleIndex = 0;
}

function renderCurrentArticle() {
  const article = state.playlist[state.articleIndex];
  stopSpeech();

  if (!article) {
    elements.questionType.textContent = "目前沒有文章";
    elements.questionText.textContent = "請先切換等級或取消只看收藏。";
    elements.questionNote.textContent = "按下開始後就可以直接練習。";
    elements.passageTitle.textContent = "尚未開始";
    elements.passageMeta.textContent = "按下開始後會載入文章。";
    elements.passageText.textContent = "文章內容會顯示在這裡，播放時會逐詞高亮。";
    elements.translationText.classList.add("hidden");
    elements.playButton.disabled = true;
    elements.slowButton.disabled = true;
    elements.replayButton.disabled = true;
    elements.nextButton.disabled = true;
    updateDashboard(null);
    renderArticleList();
    updateFavoriteButton();
    return;
  }

  state.currentArticle = article;
  elements.playButton.disabled = false;
  elements.slowButton.disabled = false;
  elements.replayButton.disabled = false;
  elements.nextButton.disabled = state.playlist.length <= 1;
  elements.sessionTitle.textContent = `${LEVEL_CONFIG[state.selectedLevel].label} 短文聽力`;
  elements.questionType.textContent = `第 ${state.articleIndex + 1} 篇 / 共 ${state.playlist.length} 篇`;
  elements.questionText.textContent = article.title;
  elements.questionNote.textContent = article.note;
  elements.passageTitle.textContent = article.title;
  elements.passageMeta.textContent = `約 ${article.wordCount} 字．${LEVEL_CONFIG[state.selectedLevel].vocabBand}。`;
  elements.translationText.textContent = article.translation;
  renderPassageText(article.audioText);
  updateTranslationVisibility();
  updateProgress();
  updateDashboard(article);
  updateFavoriteButton();
  renderArticleList();
  elements.feedbackText.textContent = "按下播放全文，就可以開始純聽力練習。";
}

function goToNextArticle() {
  if (!state.playlist.length) return;
  state.articleIndex = (state.articleIndex + 1) % state.playlist.length;
  renderCurrentArticle();
}

function updateProgress() {
  const total = state.playlist.length || 1;
  const current = Math.min(state.articleIndex + 1, total);
  elements.progressText.textContent = `第 ${current} 篇 / 共 ${total} 篇`;
  elements.progressBar.style.width = `${(current / total) * 100}%`;
}

function updateDashboard(article) {
  elements.dashboardLevel.textContent = LEVEL_CONFIG[state.selectedLevel].vocabBand;
  elements.dashboardWords.textContent = article ? `${article.wordCount} 字` : "約 100 字";
  elements.dashboardTitle.textContent = article ? article.title : "Article 1";
  elements.dashboardMessage.textContent = `${LEVEL_CONFIG[state.selectedLevel].label} 題庫共 ${ARTICLE_BANK[state.selectedLevel].length} 篇短文，可長期練習。`;
}

function speakCurrentArticle(rate) {
  if (!state.currentArticle) return;
  if (!("speechSynthesis" in window)) {
    elements.feedbackText.textContent = "這個瀏覽器不支援語音播放。";
    return;
  }

  stopSpeech();
  state.currentRepeatCount = 1;
  state.currentRepeatTarget = state.autoRepeatEnabled ? 3 : 1;
  startSpeech(rate);
}

function startSpeech(rate) {
  const utterance = new SpeechSynthesisUtterance(state.currentArticle.audioText);
  utterance.lang = "en-US";
  utterance.rate = rate;
  utterance.pitch = 1;
  utterance.volume = 1;
  utterance.onstart = () => {
    setActiveToken(-1);
    elements.feedbackText.textContent = state.currentRepeatTarget > 1
      ? `第 ${state.currentRepeatCount} 次播放中，你可以跟著高亮單字一起聽。`
      : "正在播放短文，你可以跟著高亮單字一起聽。";
  };
  utterance.onboundary = (event) => {
    if (event.name && event.name !== "word") return;
    syncHighlightByCharIndex(event.charIndex);
  };
  utterance.onend = () => {
    setActiveToken(-1);
    if (state.currentRepeatCount < state.currentRepeatTarget) {
      state.currentRepeatCount += 1;
      startSpeech(rate);
      return;
    }
    elements.feedbackText.textContent = "播放完成，可以再聽一次，或切到下一篇。";
    state.currentUtterance = null;
  };
  utterance.onerror = () => {
    setActiveToken(-1);
    elements.feedbackText.textContent = "播放時發生問題，請再試一次。";
    state.currentUtterance = null;
  };
  state.currentUtterance = utterance;
  window.speechSynthesis.speak(utterance);
}

function renderPassageText(text) {
  const fragment = document.createDocumentFragment();
  const tokenRegex = /\S+\s*/g;
  let match;
  let index = 0;
  elements.passageText.innerHTML = "";
  state.activeTokenIndex = -1;

  while ((match = tokenRegex.exec(text)) !== null) {
    const span = document.createElement("span");
    span.className = "word-token";
    span.dataset.start = String(match.index);
    span.dataset.end = String(match.index + match[0].length);
    span.textContent = match[0];
    fragment.appendChild(span);
    index += 1;
  }

  elements.passageText.appendChild(fragment);
}

function syncHighlightByCharIndex(charIndex) {
  const tokens = getPassageTokens();
  const nextIndex = tokens.findIndex((token) => {
    const start = Number(token.dataset.start);
    const end = Number(token.dataset.end);
    return charIndex >= start && charIndex < end;
  });
  if (nextIndex >= 0) setActiveToken(nextIndex);
}

function setActiveToken(index) {
  const tokens = getPassageTokens();
  if (state.activeTokenIndex >= 0 && tokens[state.activeTokenIndex]) {
    tokens[state.activeTokenIndex].classList.remove("is-active");
  }
  state.activeTokenIndex = index;
  if (index >= 0 && tokens[index]) {
    tokens[index].classList.add("is-active");
    tokens[index].scrollIntoView({ block: "nearest", inline: "nearest" });
  }
}

function getPassageTokens() {
  return [...elements.passageText.querySelectorAll(".word-token")];
}

function stopSpeech() {
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  state.currentUtterance = null;
  state.currentRepeatCount = 0;
  state.currentRepeatTarget = 1;
  setActiveToken(-1);
}

function updateTranslationVisibility() {
  if (!state.currentArticle || !elements.translationToggle.checked) {
    elements.translationText.classList.add("hidden");
    return;
  }
  elements.translationText.classList.remove("hidden");
}

function toggleFavoriteCurrentArticle() {
  if (!state.currentArticle) return;
  const id = state.currentArticle.id;
  const existing = state.favorites.indexOf(id);
  if (existing >= 0) {
    state.favorites.splice(existing, 1);
  } else {
    state.favorites.push(id);
  }
  saveFavorites();
  updateFavoriteButton();
  renderArticleList();
  if (state.showFavoritesOnly) {
    buildPlaylist();
    renderCurrentArticle();
  }
}

function updateFavoriteButton() {
  if (!state.currentArticle) {
    elements.favoriteButton.textContent = "收藏這篇";
    return;
  }
  elements.favoriteButton.textContent = state.favorites.includes(state.currentArticle.id) ? "取消收藏" : "收藏這篇";
}

function renderArticleList() {
  const source = state.showFavoritesOnly
    ? ARTICLE_BANK[state.selectedLevel].filter((article) => state.favorites.includes(article.id))
    : ARTICLE_BANK[state.selectedLevel];

  elements.articleList.innerHTML = "";
  if (!source.length) {
    const empty = document.createElement("div");
    empty.className = "article-chip";
    empty.textContent = "目前沒有符合條件的文章。";
    elements.articleList.appendChild(empty);
    return;
  }

  source.forEach((article, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "article-chip";
    if (state.currentArticle && state.currentArticle.id === article.id) button.classList.add("is-active");
    if (state.favorites.includes(article.id)) button.classList.add("is-favorite");
    button.innerHTML = `<span class="article-chip-title">${index + 1}. ${article.title}</span><span class="article-chip-meta">${article.wordCount} 字${state.favorites.includes(article.id) ? "．已收藏" : ""}</span>`;
    button.addEventListener("click", () => {
      const targetIndex = state.playlist.findIndex((item) => item.id === article.id);
      if (targetIndex >= 0) {
        state.articleIndex = targetIndex;
      } else {
        state.playlist = [article];
        state.articleIndex = 0;
      }
      renderCurrentArticle();
    });
    elements.articleList.appendChild(button);
  });
}

function toggleFavoritesFilter() {
  state.showFavoritesOnly = !state.showFavoritesOnly;
  elements.favoritesFilterButton.textContent = state.showFavoritesOnly ? "顯示全部" : "只看收藏";
  buildPlaylist();
  renderCurrentArticle();
}

function loadFavorites() {
  try {
    const raw = window.localStorage.getItem(FAVORITES_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveFavorites() {
  window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(state.favorites));
}

function countWords(text) {
  const matches = text.trim().match(/\b[\w']+\b/g);
  return matches ? matches.length : 0;
}

function shuffle(items) {
  const array = [...items];
  for (let index = array.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    const temp = array[index];
    array[index] = array[swapIndex];
    array[swapIndex] = temp;
  }
  return array;
}
