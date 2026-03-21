const FAVORITES_KEY = "english-listening-trainer-favorites";
const LEVEL_CONFIG = {
  easy: { label: "初級 2000", vocabBand: "2000 字級", rate: 1.0, slowRate: 0.45 },
  medium: { label: "中級 4000", vocabBand: "4000 字級", rate: 0.95, slowRate: 0.55 },
  hard: { label: "高級 10000", vocabBand: "10000 字級", rate: 0.9, slowRate: 0.6 }
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

const STORY_SCENARIOS = [
  {
    id: "s01",
    personId: "p01",
    category: "campus",
    shortTitle: "Podcast Club",
    shortTitleZh: "播客社",
    setting: "the school podcast club",
    settingZh: "學校播客社",
    place: "the media room",
    placeZh: "媒體教室",
    topic: "city parks",
    topicZh: "城市公園",
    activity: "edit a short episode",
    activityZh: "剪輯一段短節目",
    soundA: "the host's opening question",
    soundAZh: "主持人的開場問題",
    soundB: "the guest's final example",
    soundBZh: "來賓最後舉的例子",
    challenge: "the interview section suddenly became faster",
    challengeZh: "訪談段落的語速突然變快",
    support: "the club leader",
    supportZh: "社團幹部",
    takeaway: "marking key words before replaying helped the main point stand out",
    takeawayZh: "先標出關鍵字再重播，能讓主旨更清楚"
  },
  {
    id: "s02",
    personId: "p02",
    category: "public",
    shortTitle: "Museum Visit",
    shortTitleZh: "博物館參觀",
    setting: "a science museum",
    settingZh: "科學博物館",
    place: "the audio guide area",
    placeZh: "語音導覽區",
    topic: "ocean energy",
    topicZh: "海洋能源",
    activity: "follow a guided tour",
    activityZh: "跟著導覽參觀",
    soundA: "the guide's explanation beside the first model",
    soundAZh: "導覽員在第一個模型旁的說明",
    soundB: "a short question from a visitor",
    soundBZh: "一位參觀者提出的簡短問題",
    challenge: "some technical terms sounded unfamiliar",
    challengeZh: "有些技術名詞聽起來很陌生",
    support: "a museum volunteer",
    supportZh: "博物館志工",
    takeaway: "seeing the objects while listening made difficult words easier to remember",
    takeawayZh: "一邊看展品一邊聽說明，讓難字更容易記住"
  },
  {
    id: "s03",
    personId: "p03",
    category: "travel",
    shortTitle: "Station Transfer",
    shortTitleZh: "車站轉乘",
    setting: "a busy train station",
    settingZh: "繁忙的火車站",
    place: "the transfer platform",
    placeZh: "轉乘月台",
    topic: "platform changes",
    topicZh: "月台變更資訊",
    activity: "follow public announcements",
    activityZh: "聽懂站內廣播",
    soundA: "the platform announcement",
    soundAZh: "月台廣播",
    soundB: "a staff member's safety reminder",
    soundBZh: "站務員的安全提醒",
    challenge: "the message was short and repeated only once",
    challengeZh: "訊息很短，而且只重複一次",
    support: "a station worker",
    supportZh: "站務員",
    takeaway: "catching the first key noun often made the rest of the sentence easier",
    takeawayZh: "只要先抓到第一個關鍵名詞，後面整句就比較好懂"
  },
  {
    id: "s04",
    personId: "p04",
    category: "daily",
    shortTitle: "Cooking Class",
    shortTitleZh: "料理課",
    setting: "a weekend cooking class",
    settingZh: "週末料理課",
    place: "the practice kitchen",
    placeZh: "實作廚房",
    topic: "fruit sandwiches",
    topicZh: "水果三明治",
    activity: "follow step by step instructions",
    activityZh: "跟著步驟完成料理",
    soundA: "the teacher's first instruction",
    soundAZh: "老師的第一個指令",
    soundB: "the warning about timing",
    soundBZh: "關於時間控制的提醒",
    challenge: "several actions were packed into one sentence",
    challengeZh: "有些句子一次塞進了好幾個動作",
    support: "a class partner",
    supportZh: "同組夥伴",
    takeaway: "listening for action verbs made the sequence much clearer",
    takeawayZh: "先抓動作動詞，整個流程順序就清楚很多"
  },
  {
    id: "s05",
    personId: "p05",
    category: "public",
    shortTitle: "Beach Cleanup",
    shortTitleZh: "淨灘活動",
    setting: "a beach cleanup orientation",
    settingZh: "淨灘說明會",
    place: "the meeting point near the shore",
    placeZh: "海邊集合點",
    topic: "team rules",
    topicZh: "分組規則",
    activity: "listen to volunteer instructions",
    activityZh: "聽志工說明活動規則",
    soundA: "the safety rule at the beginning",
    soundAZh: "一開始的安全規則",
    soundB: "the closing reminder about sorting trash",
    soundBZh: "最後關於分類垃圾的提醒",
    challenge: "wind and waves made the sound less clear",
    challengeZh: "海風和浪聲讓聲音變得不太清楚",
    support: "the team captain",
    supportZh: "小隊長",
    takeaway: "staying calm in a noisy place helped the important details stay clear",
    takeawayZh: "在吵雜環境裡保持冷靜，反而更能抓到重要細節"
  },
  {
    id: "s06",
    personId: "p06",
    category: "travel",
    shortTitle: "Mountain Trail",
    shortTitleZh: "山路健行",
    setting: "a guided walk on a mountain trail",
    settingZh: "山路導覽健行",
    place: "the forest path",
    placeZh: "林間步道",
    topic: "weather changes",
    topicZh: "天氣變化",
    activity: "listen to route updates",
    activityZh: "聽懂路線更新和提醒",
    soundA: "the guide's weather report",
    soundAZh: "導覽員對天氣的說明",
    soundB: "the direction given at a fork in the trail",
    soundBZh: "岔路口的方向指示",
    challenge: "the guide mixed place names with instructions",
    challengeZh: "導覽員會把地名和指令混在同一句裡",
    support: "another hiker",
    supportZh: "同行山友",
    takeaway: "remembering landmarks made spoken directions easier to follow",
    takeawayZh: "先記住地標，口語方向說明就會好跟很多"
  },
  {
    id: "s07",
    personId: "p07",
    category: "public",
    shortTitle: "Clinic Talk",
    shortTitleZh: "診所說明",
    setting: "a clinic health talk",
    settingZh: "診所健康說明",
    place: "the waiting area",
    placeZh: "候診區",
    topic: "sleep habits",
    topicZh: "睡眠習慣",
    activity: "listen to practical health advice",
    activityZh: "聽懂實用的健康建議",
    soundA: "the doctor's short explanation",
    soundAZh: "醫師的簡短說明",
    soundB: "a patient's follow up question",
    soundBZh: "病人的追問",
    challenge: "the speaker used both advice and examples in one answer",
    challengeZh: "醫師常把建議和例子一起講在同一個回答裡",
    support: "the nurse",
    supportZh: "護理師",
    takeaway: "grouping ideas into problem, advice, and example reduced confusion",
    takeawayZh: "把內容分成問題、建議、例子三段，會比較不混亂"
  },
  {
    id: "s08",
    personId: "p08",
    category: "daily",
    shortTitle: "Bookstore Event",
    shortTitleZh: "書店活動",
    setting: "a bookstore author event",
    settingZh: "書店作家分享會",
    place: "the reading corner",
    placeZh: "閱讀角落",
    topic: "travel writing",
    topicZh: "旅行寫作",
    activity: "listen to a live talk",
    activityZh: "聽現場分享",
    soundA: "the author's story about a train ride",
    soundAZh: "作家講述火車旅行的故事",
    soundB: "the answer during the audience question time",
    soundBZh: "問答時間裡的回答",
    challenge: "the speaker changed topics smoothly without obvious pauses",
    challengeZh: "講者換話題時沒有很明顯的停頓",
    support: "a bookstore staff member",
    supportZh: "書店店員",
    takeaway: "listening for transition words made the structure easier to hear",
    takeawayZh: "專心抓轉折詞，整段內容的結構就更容易聽出來"
  },
  {
    id: "s09",
    personId: "p09",
    category: "travel",
    shortTitle: "Hotel Check In",
    shortTitleZh: "旅館入住",
    setting: "a hotel front desk",
    settingZh: "旅館櫃台",
    place: "the check in counter",
    placeZh: "入住櫃台",
    topic: "room details",
    topicZh: "房間資訊",
    activity: "confirm travel information",
    activityZh: "確認住宿資訊",
    soundA: "the welcome message from the clerk",
    soundAZh: "櫃台人員的接待說明",
    soundB: "the explanation about breakfast and check out time",
    soundBZh: "早餐與退房時間的說明",
    challenge: "several numbers appeared very quickly",
    challengeZh: "裡面一下子出現了好幾個數字",
    support: "the front desk clerk",
    supportZh: "櫃台人員",
    takeaway: "listening for numbers and labels first made service English less stressful",
    takeawayZh: "先抓數字和標籤詞，服務英文就不會那麼有壓力"
  },
  {
    id: "s10",
    personId: "p10",
    category: "work",
    shortTitle: "Robotics Fair",
    shortTitleZh: "機器人展",
    setting: "a robotics fair",
    settingZh: "機器人展",
    place: "the demo area",
    placeZh: "示範區",
    topic: "smart delivery robots",
    topicZh: "智慧配送機器人",
    activity: "listen to short product demos",
    activityZh: "聽懂產品示範",
    soundA: "the presenter's first demonstration line",
    soundAZh: "講者示範時的第一句介紹",
    soundB: "the comparison between two robot models",
    soundBZh: "兩款機器人的比較說明",
    challenge: "the speaker used many short descriptive phrases in a row",
    challengeZh: "講者會連續使用很多短短的描述片語",
    support: "an event guide",
    supportZh: "展場導覽員",
    takeaway: "hearing repeated descriptive patterns made technical content easier to follow",
    takeawayZh: "只要抓到重複出現的描述模式，技術內容就沒有那麼難"
  }
];

const NARRATIVE_VARIANTS = [
  { id: "routine", cue: "注意流程與順序訊號" },
  { id: "problem", cue: "留意問題、原因與解法" },
  { id: "observation", cue: "抓場景細節與說話內容的對應" },
  { id: "notes", cue: "整理重點、例子與結論" },
  { id: "reflection", cue: "比較前後變化與個人心得" }
];

const CATEGORY_CONFIG = {
  all: { label: "全部" },
  daily: { label: "日常" },
  campus: { label: "校園" },
  travel: { label: "旅遊" },
  work: { label: "工作" },
  public: { label: "公共場景" }
};

const ARTICLE_BANK = buildArticleBank();

const state = {
  selectedLevel: "easy",
  selectedCategory: "all",
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
  controlsPanel: document.querySelector(".controls-panel"),
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
  categoryButtons: [],
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
  primeVoices();
  mountCategoryControls();

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
  elements.slowButton.addEventListener("click", () => speakCurrentArticle(LEVEL_CONFIG[state.selectedLevel].slowRate));
  elements.replayButton.addEventListener("click", () => speakCurrentArticle(LEVEL_CONFIG[state.selectedLevel].rate));
  elements.autoRepeatToggle.addEventListener("change", () => {
    state.autoRepeatEnabled = elements.autoRepeatToggle.checked;
  });
  elements.favoritesFilterButton.addEventListener("click", toggleFavoritesFilter);
  elements.translationToggle.addEventListener("change", updateTranslationVisibility);

  buildPlaylist();
  renderCurrentArticle();
}

function mountCategoryControls() {
  if (!elements.controlsPanel || document.querySelector("#category-buttons")) return;

  const levelGroup = document.querySelector("#level-buttons")?.closest(".control-group");
  if (!levelGroup?.parentElement) return;

  const group = document.createElement("div");
  group.className = "control-group";
  group.innerHTML = `
    <p class="control-label">內容類型</p>
    <div class="chip-row" id="category-buttons">
      ${Object.entries(CATEGORY_CONFIG).map(([key, item], index) => `
        <button class="chip-btn${index === 0 ? " is-active" : ""}" type="button" data-category="${key}">${item.label}</button>
      `).join("")}
    </div>
  `;

  levelGroup.insertAdjacentElement("afterend", group);
  elements.categoryButtons = [...group.querySelectorAll(".chip-btn")];
  bindChipGroup(elements.categoryButtons, (button) => {
    state.selectedCategory = button.dataset.category;
    buildPlaylist();
    renderCurrentArticle();
  });
}

function buildArticleBank() {
  const bank = { easy: [], medium: [], hard: [] };
  STORY_SCENARIOS.forEach((scenario, scenarioIndex) => {
    const person = PEOPLE.find((item) => item.id === scenario.personId) || PEOPLE[scenarioIndex % PEOPLE.length];
    NARRATIVE_VARIANTS.forEach((variant, variantIndex) => {
      const serial = scenarioIndex * NARRATIVE_VARIANTS.length + variantIndex + 1;
      bank.easy.push(buildScenarioArticle("easy", serial, scenario, variant, person));
      bank.medium.push(buildScenarioArticle("medium", serial, scenario, variant, person));
      bank.hard.push(buildScenarioArticle("hard", serial, scenario, variant, person));
    });
  });
  return bank;
}

function buildScenarioArticle(level, serial, scenario, variant, person) {
  const titleMap = {
    routine: `${person.name} at ${scenario.shortTitle}`,
    problem: `${person.name} Solved a Listening Problem`,
    observation: `What ${person.name} Heard at ${scenario.shortTitle}`,
    notes: `${person.name}'s Notes from ${scenario.shortTitle}`,
    reflection: `How ${person.name} Grew Through ${scenario.shortTitle}`
  };

  const cue = `${scenario.shortTitleZh}主題，${variant.cue}`;
  const content = level === "easy"
    ? buildEasyScenarioContent(scenario, variant, person)
    : level === "medium"
      ? buildMediumScenarioContent(scenario, variant, person)
      : buildHardScenarioContent(scenario, variant, person);

  return finalizeArticle(level, serial, { title: titleMap[variant.id], en: content.en, zh: content.zh }, cue, scenario.category);
}

function matchesSelectedCategory(article) {
  return state.selectedCategory === "all" || article.category === state.selectedCategory;
}

function buildEasyScenarioContent(scenario, variant, person) {
  const templates = {
    routine: {
      en: `${person.name} joined ${scenario.setting} in ${person.city}. The activity took place at ${scenario.place}. First, ${person.name} listened to ${scenario.soundA}. Next, ${person.name} tried to ${scenario.activity}. Later, ${scenario.soundB} helped ${person.name} understand more about ${scenario.topic}. The task was simple, but it still needed careful listening. With help from ${scenario.support}, ${person.name} stayed calm and followed each step. At the end, ${person.name} felt that ${scenario.takeaway}.`,
      zh: `${person.name} 在${person.cityZh}參加了${scenario.settingZh}，活動地點在${scenario.placeZh}。一開始，${person.name} 先聽${scenario.soundAZh}。接著，${person.name} 試著${scenario.activityZh}。後來，${scenario.soundBZh} 幫助${person.name} 更了解${scenario.topicZh}。這個任務看起來不難，但還是需要仔細聽。因為有${scenario.supportZh}的幫忙，${person.name} 能保持冷靜並跟上每個步驟。到了最後，${person.name} 覺得${scenario.takeawayZh}。`
    },
    problem: {
      en: `${person.name} went to ${scenario.setting} with the goal of improving listening. At first, there was one problem: ${scenario.challenge}. Because of that, ${person.name} missed part of ${scenario.soundA}. Instead of giving up, ${person.name} listened again, watched the speaker closely, and asked ${scenario.support} for one short explanation. After that, ${scenario.soundB} sounded much clearer. By the end of the activity, ${person.name} could follow the main idea about ${scenario.topic}. This experience taught ${person.name} that ${scenario.takeaway}.`,
      zh: `${person.name} 參加${scenario.settingZh}，目標是提升聽力。一開始出現了一個問題：${scenario.challengeZh}。因此，${person.name} 漏聽了${scenario.soundAZh}的一部分。${person.name} 沒有放棄，而是再聽一次、仔細看著說話的人，並請${scenario.supportZh}簡單說明一下。之後，${scenario.soundBZh} 就清楚多了。活動結束前，${person.name} 已經能聽懂關於${scenario.topicZh}的主要意思。這次經驗讓${person.name} 明白，${scenario.takeawayZh}。`
    },
    observation: {
      en: `${person.name} noticed many small details during ${scenario.setting}. The place was ${scenario.place}, and the topic was ${scenario.topic}. ${person.name} heard ${scenario.soundA} near the beginning and ${scenario.soundB} later on. Even when the sound changed, ${person.name} kept listening for key words. Step by step, the whole message became easier to understand. ${person.name} also saw how other people reacted, which gave extra clues. After the session, ${person.name} told ${scenario.support} that ${scenario.takeaway}.`,
      zh: `${person.name} 在${scenario.settingZh}中注意到很多小細節。地點是在${scenario.placeZh}，主題是${scenario.topicZh}。一開始，${person.name} 聽到${scenario.soundAZh}；後來又聽到${scenario.soundBZh}。即使聲音和內容有變化，${person.name} 還是一直去抓關鍵字。慢慢地，整段內容就變得比較容易懂了。${person.name} 也觀察到其他人的反應，這些也成了額外線索。結束後，${person.name} 跟${scenario.supportZh}說，${scenario.takeawayZh}。`
    },
    notes: {
      en: `${person.name} prepared a few simple notes before joining ${scenario.setting}. The notes had three parts: the topic, the important sounds, and the final message. During the activity, ${person.name} wrote down ${scenario.soundA}, ${scenario.soundB}, and one useful idea about ${scenario.topic}. This made the listening task feel more organized. When ${scenario.challenge}, ${person.name} still had something clear to focus on. After reviewing the notes with ${scenario.support}, ${person.name} understood the session much better and felt that ${scenario.takeaway}.`,
      zh: `${person.name} 在參加${scenario.settingZh}前，先準備了幾個簡單筆記欄位，分成主題、重要聲音、最後結論三部分。活動進行時，${person.name} 記下了${scenario.soundAZh}、${scenario.soundBZh}，以及一個和${scenario.topicZh}有關的重要想法。這讓整個聽力任務變得更有條理。就算${scenario.challengeZh}，${person.name} 還是有明確的重點可以抓。和${scenario.supportZh}一起回顧筆記後，${person.name} 更懂整場內容，也覺得${scenario.takeawayZh}。`
    },
    reflection: {
      en: `Before joining ${scenario.setting}, ${person.name} did not feel very confident about listening. However, this activity in ${person.city} slowly changed that feeling. ${person.name} listened to ${scenario.soundA}, followed ${scenario.soundB}, and tried to understand the whole topic of ${scenario.topic}. There were moments when ${scenario.challenge}, but ${person.name} kept going with support from ${scenario.support}. After the activity, ${person.name} felt more relaxed, more focused, and more willing to try again. For ${person.name}, the best lesson was that ${scenario.takeaway}.`,
      zh: `在參加${scenario.settingZh}之前，${person.name} 對自己的聽力其實沒有太大信心。不過，這場在${person.cityZh}的活動慢慢改變了這種感覺。${person.name} 聽了${scenario.soundAZh}，也跟著理解${scenario.soundBZh}，並努力掌握${scenario.topicZh}這個主題。過程中雖然有${scenario.challengeZh}的時候，但${person.name} 在${scenario.supportZh}的幫助下還是持續下去。活動結束後，${person.name} 覺得自己更放鬆、更專心，也更願意再挑戰一次。對${person.name} 來說，最重要的收穫就是${scenario.takeawayZh}。`
    }
  };

  return templates[variant.id];
}

function buildMediumScenarioContent(scenario, variant, person) {
  const templates = {
    routine: {
      en: `${person.name} used ${scenario.setting} in ${person.city} as a structured listening practice rather than a casual activity. In ${scenario.place}, ${person.name} first focused on ${scenario.soundA}, then moved on to ${scenario.activity}, and later checked understanding through ${scenario.soundB}. Because the topic centered on ${scenario.topic}, the session offered both useful vocabulary and clear context. The pace was manageable, yet it still demanded attention. With guidance from ${scenario.support}, ${person.name} learned to follow the sequence more steadily and discovered that ${scenario.takeaway}.`,
      zh: `${person.name} 把${person.cityZh}的${scenario.settingZh}當成一場有結構的聽力練習，而不只是隨便參加的活動。在${scenario.placeZh}裡，${person.name} 先專心聽${scenario.soundAZh}，接著進行${scenario.activityZh}，再透過${scenario.soundBZh}檢查自己是否理解正確。由於整場內容圍繞著${scenario.topicZh}，因此不但有實用字詞，也有清楚的情境可依靠。整體節奏雖然不算太快，卻仍然需要注意力。在${scenario.supportZh}的引導下，${person.name} 更穩定地跟上整個流程，也發現${scenario.takeawayZh}。`
    },
    problem: {
      en: `${person.name} expected ${scenario.setting} to be helpful, but one difficulty appeared almost immediately: ${scenario.challenge}. As a result, the first part, especially ${scenario.soundA}, felt incomplete and slightly frustrating. Instead of relying on guesswork alone, ${person.name} changed strategy by listening for repeated words, checking the speaker's direction, and confirming one point with ${scenario.support}. Once that adjustment was made, ${scenario.soundB} became far easier to follow. By the time the session ended, ${person.name} understood the core message about ${scenario.topic} and came away convinced that ${scenario.takeaway}.`,
      zh: `${person.name} 原本就預期${scenario.settingZh}會對自己有幫助，但困難幾乎一開始就出現了：${scenario.challengeZh}。因此，尤其是${scenario.soundAZh}那一段，聽起來不完整，也讓人有點挫折。${person.name} 沒有只靠猜測，而是改變策略，開始去聽重複出現的字、觀察講者指向哪裡，並向${scenario.supportZh}確認一個重點。調整之後，${scenario.soundBZh} 就變得容易理解多了。等到整場結束時，${person.name} 已經能掌握${scenario.topicZh}的核心訊息，也更相信${scenario.takeawayZh}。`
    },
    observation: {
      en: `${person.name} treated ${scenario.setting} as a chance to observe how spoken English works inside a real setting. From the beginning at ${scenario.place}, ${person.name} paid attention not only to words, but also to timing, emphasis, and how ${scenario.soundA} connected with ${scenario.soundB}. Because the discussion stayed close to ${scenario.topic}, visual clues and background knowledge often supported the listening process. Even when ${scenario.challenge}, the larger structure still remained clear. Afterward, ${person.name} reflected that the most useful insight was simple: ${scenario.takeaway}.`,
      zh: `${person.name} 把${scenario.settingZh}當成一次觀察真實英語如何運作的機會。從在${scenario.placeZh}開始的那一刻起，${person.name} 注意的不只是字面意思，還包括時間點、重音，以及${scenario.soundAZh}和${scenario.soundBZh}之間是怎麼連起來的。因為整段內容始終圍繞${scenario.topicZh}，所以現場畫面和背景知識常常能幫忙理解。即使${scenario.challengeZh}，整體結構仍然算清楚。活動之後，${person.name} 回想起來，最有用的體會其實很簡單：${scenario.takeawayZh}。`
    },
    notes: {
      en: `${person.name} entered ${scenario.setting} with a simple note taking plan. Instead of trying to write everything down, ${person.name} organized information into three parts: the main topic, the strongest example, and the final takeaway. That method worked especially well in ${scenario.place}, where ${scenario.soundA} introduced the topic and ${scenario.soundB} added a clearer example. When ${scenario.challenge}, the notes still gave ${person.name} a stable frame for understanding. Reviewing the page afterward with ${scenario.support} showed that ${scenario.takeaway}.`,
      zh: `${person.name} 參加${scenario.settingZh}前，先設定了簡單的筆記策略。${person.name} 沒有想把所有內容都寫下來，而是把資訊分成主題、最明顯的例子和最後結論三部分。這個方法在${scenario.placeZh}特別有效，因為${scenario.soundAZh}負責帶出主題，而${scenario.soundBZh}又補上更清楚的例子。就算${scenario.challengeZh}，這份筆記架構還是讓${person.name} 有一個穩定的理解框架。事後和${scenario.supportZh}一起回顧時，${person.name} 更確認了${scenario.takeawayZh}。`
    },
    reflection: {
      en: `${person.name}'s experience at ${scenario.setting} gradually changed the way listening practice felt. Earlier, ${person.name} often believed that missing one phrase meant losing the whole message. During this session, however, ${person.name} learned to recover by following the topic of ${scenario.topic}, connecting ${scenario.soundA} with ${scenario.soundB}, and staying patient when ${scenario.challenge}. Support from ${scenario.support} also made the process less stressful. In the end, the activity did more than provide English input. It helped ${person.name} realize that ${scenario.takeaway}.`,
      zh: `${person.name} 在${scenario.settingZh}中的經驗，慢慢改變了自己對聽力練習的感受。以前，${person.name} 常以為只要漏掉一句，整段就完了。不過在這次活動裡，${person.name} 學會透過${scenario.topicZh}這個主題，把${scenario.soundAZh}和${scenario.soundBZh}連起來，並在${scenario.challengeZh}時仍保持耐心。再加上${scenario.supportZh}的幫助，整個過程也沒那麼有壓力。最後，這場活動不只是提供英文輸入而已，更讓${person.name} 理解到${scenario.takeawayZh}。`
    }
  };

  return templates[variant.id];
}

function buildHardScenarioContent(scenario, variant, person) {
  const templates = {
    routine: {
      en: `${person.name} approached ${scenario.setting} in ${person.city} as a deliberately structured listening laboratory. Positioned in ${scenario.place}, ${person.name} began by tracing ${scenario.soundA}, shifted to ${scenario.activity}, and then used ${scenario.soundB} to verify interpretation of the broader theme of ${scenario.topic}. What made the experience valuable was not difficulty alone, but the way context, sequence, and repetition reinforced each other. With occasional guidance from ${scenario.support}, ${person.name} developed a steadier method for processing connected speech and concluded that ${scenario.takeaway}.`,
      zh: `${person.name} 把${person.cityZh}的${scenario.settingZh}當成一個刻意安排的聽力實驗場。在${scenario.placeZh}裡，${person.name} 先追蹤${scenario.soundAZh}的內容，接著進入${scenario.activityZh}，再透過${scenario.soundBZh}去驗證自己對${scenario.topicZh}這個大主題的理解。這次經驗真正有價值的地方，不只是它有難度，而是情境、順序與重複三者會彼此支撐。配合${scenario.supportZh}偶爾提供的協助，${person.name} 逐漸建立出更穩定的連續語流處理方法，也更確定${scenario.takeawayZh}。`
    },
    problem: {
      en: `${person.name} entered ${scenario.setting} hoping for useful practice, yet quickly ran into a familiar obstacle: ${scenario.challenge}. Because the difficulty emerged early, ${scenario.soundA} initially felt fragmented, and the overall message seemed unstable. Rather than treating that breakdown as failure, ${person.name} responded analytically by identifying repeated language, checking where attention should be directed, and confirming one uncertain point with ${scenario.support}. That shift in method transformed the second half of the session. By the time ${scenario.soundB} appeared, ${person.name} was no longer chasing every word, but tracking the logic behind the discussion of ${scenario.topic}. The result was a far more confident understanding and a stronger belief that ${scenario.takeaway}.`,
      zh: `${person.name} 參加${scenario.settingZh}時原本期待能得到紮實的練習，但很快就遇到一個熟悉的障礙：${scenario.challengeZh}。由於困難出現得很早，${scenario.soundAZh}一開始聽起來支離破碎，整體訊息也顯得不穩定。${person.name} 沒有把這種斷裂感當成失敗，而是用更有分析性的方式應對：辨認重複語言、確認注意力該放在哪裡，並向${scenario.supportZh}核對一個不確定的重點。這種方法上的轉變，讓後半段的理解完全不同。等到${scenario.soundBZh}出現時，${person.name} 已不再追逐每個單字，而是在追蹤關於${scenario.topicZh}的整體邏輯。最後的結果是不但理解更有信心，也更相信${scenario.takeawayZh}。`
    },
    observation: {
      en: `${person.name} used ${scenario.setting} as an opportunity to study how meaning is assembled in live speech. From the start in ${scenario.place}, ${person.name} noticed that ${scenario.soundA} established a frame, while ${scenario.soundB} either expanded or clarified it. Because the topic remained tied to ${scenario.topic}, physical surroundings and visible actions repeatedly supported comprehension. Even when ${scenario.challenge}, the session did not collapse into noise; instead, it highlighted how listeners rely on structure, expectation, and selective attention. Looking back, ${person.name} considered the experience persuasive evidence that ${scenario.takeaway}.`,
      zh: `${person.name} 把${scenario.settingZh}當成一次研究現場語音如何組成意義的機會。從在${scenario.placeZh}開始的那一刻起，${person.name} 就注意到${scenario.soundAZh}其實建立了一個理解框架，而${scenario.soundBZh}則是在擴展或澄清這個框架。由於整體主題始終圍繞${scenario.topicZh}，現場環境與可見動作便一再支撐理解。即使${scenario.challengeZh}，整場內容也沒有因此崩成雜音，反而更凸顯出聽者其實會依賴結構、預期與選擇性注意力來理解。回頭看時，${person.name} 覺得這次經驗幾乎可算是${scenario.takeawayZh}的有力證據。`
    },
    notes: {
      en: `${person.name} arrived at ${scenario.setting} with a more selective note taking strategy than before. Instead of recording everything, ${person.name} mapped the session around topic, support, and conclusion. In practice, that meant marking ${scenario.soundA} as the framing idea, treating ${scenario.soundB} as evidence or illustration, and linking both back to ${scenario.topic}. The method proved especially useful when ${scenario.challenge}, because the notes preserved structure even when individual phrases blurred together. Reviewing those notes later with ${scenario.support} confirmed that the session had been understood more accurately than it first felt. For ${person.name}, that reinforced the idea that ${scenario.takeaway}.`,
      zh: `${person.name} 這次帶著比以前更有選擇性的筆記策略參加${scenario.settingZh}。${person.name} 不再試圖記下所有內容，而是把整場資訊整理成主題、支撐內容與結論三個層次。實際操作上，就是把${scenario.soundAZh}標成框架句，把${scenario.soundBZh}視為證據或例子，再把兩者拉回${scenario.topicZh}這條主線。當${scenario.challengeZh}時，這個方法特別有用，因為就算個別片語一時模糊，筆記仍能保住整體結構。之後再和${scenario.supportZh}一起檢視時，${person.name} 發現自己其實比當下感覺的理解得更準確。對${person.name} 而言，這再次證明了${scenario.takeawayZh}。`
    },
    reflection: {
      en: `${person.name}'s experience at ${scenario.setting} reshaped a deeper assumption about listening. Previously, ${person.name} often treated comprehension as a test of raw speed: if the speech moved too quickly, success seemed impossible. This session complicated that belief. By following the thread from ${scenario.soundA} to ${scenario.soundB}, staying oriented around ${scenario.topic}, and persisting even when ${scenario.challenge}, ${person.name} recognized that listening growth depends not only on vocabulary, but also on tolerance for uncertainty and the ability to rebuild meaning after a brief loss of clarity. Support from ${scenario.support} reduced the pressure, but the real shift was internal. ${person.name} left convinced that ${scenario.takeaway}.`,
      zh: `${person.name} 在${scenario.settingZh}中的經驗，改變了自己對聽力更深一層的假設。過去，${person.name} 常把理解力看成單純的語速測驗：只要講得太快，似乎就不可能成功。然而，這次活動讓這種想法變得複雜得多。透過一路追蹤從${scenario.soundAZh}到${scenario.soundBZh}的線索、持續圍繞${scenario.topicZh}保持方向感，並且在${scenario.challengeZh}時仍不放棄，${person.name} 逐漸意識到，聽力成長不只靠單字量，還仰賴對不確定感的耐受，以及在短暫漏聽後重新拼回意義的能力。${scenario.supportZh}的幫助降低了壓力，但真正的轉變其實來自內在。離開時，${person.name} 已經更相信${scenario.takeawayZh}。`
    }
  };

  return templates[variant.id];
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

function finalizeArticle(level, serial, content, cue, category = "all") {
  return {
    id: `${level}-${String(serial).padStart(2, "0")}`,
    level,
    category,
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
  const categoryFiltered = source.filter((article) => matchesSelectedCategory(article));
  const filtered = state.showFavoritesOnly
    ? categoryFiltered.filter((article) => state.favorites.includes(article.id))
    : categoryFiltered;
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
  const categoryLabel = CATEGORY_CONFIG[state.selectedCategory]?.label || "全部";
  const visibleCount = ARTICLE_BANK[state.selectedLevel].filter((entry) => matchesSelectedCategory(entry)).length;
  elements.dashboardMessage.textContent = `${LEVEL_CONFIG[state.selectedLevel].label} 的 ${categoryLabel} 類型目前有 ${visibleCount} 篇短文可練習。`;
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
  const voice = pickEnglishVoice();
  utterance.lang = voice?.lang || "en-US";
  if (voice) utterance.voice = voice;
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

function primeVoices() {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.getVoices();
  window.speechSynthesis.addEventListener("voiceschanged", handleVoicesChanged, { once: true });
}

function handleVoicesChanged() {
  window.speechSynthesis.getVoices();
}

function pickEnglishVoice() {
  if (!("speechSynthesis" in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;

  const englishVoices = voices.filter((voice) => /^en(-|_)/i.test(voice.lang || ""));
  if (!englishVoices.length) return null;

  const preferredPatterns = [
    /en-us/i,
    /en-gb/i,
    /samantha/i,
    /daniel/i,
    /google.*english/i,
    /microsoft.*english/i,
    /english/i
  ];

  for (const pattern of preferredPatterns) {
    const matchedVoice = englishVoices.find((voice) => {
      const searchable = `${voice.name} ${voice.lang}`;
      return pattern.test(searchable);
    });
    if (matchedVoice) return matchedVoice;
  }

  return englishVoices[0];
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
    ? ARTICLE_BANK[state.selectedLevel].filter((article) => matchesSelectedCategory(article) && state.favorites.includes(article.id))
    : ARTICLE_BANK[state.selectedLevel].filter((article) => matchesSelectedCategory(article));

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
    const categoryLabel = CATEGORY_CONFIG[article.category]?.label || "全部";
    button.innerHTML = `<span class="article-chip-title">${index + 1}. ${article.title}</span><span class="article-chip-meta">${categoryLabel}．${article.wordCount} 字${state.favorites.includes(article.id) ? "．已收藏" : ""}</span>`;
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
