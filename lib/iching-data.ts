export interface Hexagram {
  number: number
  name: string
  chineseName: string
  meaning: string
  trigrams: { upper: string; lower: string }
  lines: number[] // 0 = broken (yin), 1 = solid (yang)
  judgment: string
  image: string
}

export const hexagrams: Hexagram[] = [
  {
    number: 1,
    name: "The Creative",
    chineseName: "乾",
    meaning: "Pure creative force, initiative, and leadership",
    trigrams: { upper: "Heaven", lower: "Heaven" },
    lines: [1, 1, 1, 1, 1, 1],
    judgment: "The Creative works sublime success, furthering through perseverance.",
    image: "The movement of heaven is full of power. Thus the superior person makes themselves strong and untiring."
  },
  {
    number: 2,
    name: "The Receptive",
    chineseName: "坤",
    meaning: "Receptivity, yielding, and nurturing support",
    trigrams: { upper: "Earth", lower: "Earth" },
    lines: [0, 0, 0, 0, 0, 0],
    judgment: "The Receptive brings about sublime success, furthering through the perseverance of a mare.",
    image: "The earth's condition is receptive devotion. Thus the superior person who has breadth of character carries the outer world."
  },
  {
    number: 3,
    name: "Difficulty at the Beginning",
    chineseName: "屯",
    meaning: "Initial challenges requiring patience and perseverance",
    trigrams: { upper: "Water", lower: "Thunder" },
    lines: [0, 1, 0, 0, 0, 1],
    judgment: "Difficulty at the Beginning works supreme success. It furthers one to appoint helpers.",
    image: "Clouds and thunder: the image of Difficulty. Thus the superior person brings order out of confusion."
  },
  {
    number: 4,
    name: "Youthful Folly",
    chineseName: "蒙",
    meaning: "Inexperience requiring guidance and learning",
    trigrams: { upper: "Mountain", lower: "Water" },
    lines: [1, 0, 0, 0, 1, 0],
    judgment: "Youthful Folly has success. It is not I who seek the young fool; the young fool seeks me.",
    image: "A spring wells up at the foot of the mountain. Thus the superior person fosters character through thoroughness in all that they do."
  },
  {
    number: 5,
    name: "Waiting",
    chineseName: "需",
    meaning: "Patient waiting with inner certainty",
    trigrams: { upper: "Water", lower: "Heaven" },
    lines: [0, 1, 0, 1, 1, 1],
    judgment: "Waiting. If you are sincere, you have light and success. Perseverance brings good fortune.",
    image: "Clouds rise up to heaven. Thus the superior person eats, drinks, and is joyous."
  },
  {
    number: 6,
    name: "Conflict",
    chineseName: "訟",
    meaning: "Inner truth meets obstruction, requiring caution",
    trigrams: { upper: "Heaven", lower: "Water" },
    lines: [1, 1, 1, 0, 1, 0],
    judgment: "Conflict. You are sincere and are being obstructed. A cautious halt halfway brings good fortune.",
    image: "Heaven and water go their opposite ways. Thus in all affairs the superior person carefully considers the beginning."
  },
  {
    number: 7,
    name: "The Army",
    chineseName: "師",
    meaning: "Organized discipline and collective strength",
    trigrams: { upper: "Earth", lower: "Water" },
    lines: [0, 0, 0, 0, 1, 0],
    judgment: "The Army needs perseverance and a strong leader. Good fortune without blame.",
    image: "In the middle of the earth is water. Thus the superior person increases their masses by generosity toward the people."
  },
  {
    number: 8,
    name: "Holding Together",
    chineseName: "比",
    meaning: "Unity, alliance, and mutual support",
    trigrams: { upper: "Water", lower: "Earth" },
    lines: [0, 1, 0, 0, 0, 0],
    judgment: "Holding Together brings good fortune. Those who are uncertain gradually join.",
    image: "On the earth is water. Thus the kings of antiquity bestowed the different states as fiefs and cultivated friendly relations with the feudal lords."
  },
  {
    number: 9,
    name: "Small Taming",
    chineseName: "小畜",
    meaning: "Gentle restraint through small actions",
    trigrams: { upper: "Wind", lower: "Heaven" },
    lines: [1, 1, 0, 1, 1, 1],
    judgment: "The Taming Power of the Small has success. Dense clouds, no rain from our western region.",
    image: "The wind drives across heaven. Thus the superior person refines the outward aspect of their nature."
  },
  {
    number: 10,
    name: "Treading",
    chineseName: "履",
    meaning: "Careful conduct and proper behavior",
    trigrams: { upper: "Heaven", lower: "Lake" },
    lines: [1, 1, 1, 1, 1, 0],
    judgment: "Treading upon the tail of the tiger. It does not bite. Success.",
    image: "Heaven above, the lake below. Thus the superior person discriminates between high and low."
  },
  {
    number: 11,
    name: "Peace",
    chineseName: "泰",
    meaning: "Harmony between heaven and earth, prosperity",
    trigrams: { upper: "Earth", lower: "Heaven" },
    lines: [0, 0, 0, 1, 1, 1],
    judgment: "Peace. The small departs, the great approaches. Good fortune. Success.",
    image: "Heaven and earth unite: the image of Peace. Thus the ruler divides and completes the course of heaven and earth."
  },
  {
    number: 12,
    name: "Standstill",
    chineseName: "否",
    meaning: "Stagnation and withdrawal, a time of adversity",
    trigrams: { upper: "Heaven", lower: "Earth" },
    lines: [1, 1, 1, 0, 0, 0],
    judgment: "Standstill. Evil people do not further the perseverance of the superior person.",
    image: "Heaven and earth do not unite. Thus the superior person falls back upon inner worth to escape difficulties."
  },
  {
    number: 13,
    name: "Fellowship",
    chineseName: "同人",
    meaning: "Community, shared purpose, and open fellowship",
    trigrams: { upper: "Heaven", lower: "Fire" },
    lines: [1, 1, 1, 1, 0, 1],
    judgment: "Fellowship with others in the open. Success. It furthers one to cross the great water.",
    image: "Heaven together with fire. Thus the superior person organizes the clans and makes distinctions between things."
  },
  {
    number: 14,
    name: "Great Possession",
    chineseName: "大有",
    meaning: "Abundance through virtue and inner strength",
    trigrams: { upper: "Fire", lower: "Heaven" },
    lines: [1, 0, 1, 1, 1, 1],
    judgment: "Great Possession. Supreme success.",
    image: "Fire in heaven above. Thus the superior person curbs evil and furthers good."
  },
  {
    number: 15,
    name: "Modesty",
    chineseName: "謙",
    meaning: "Humility creates balance and attracts good fortune",
    trigrams: { upper: "Earth", lower: "Mountain" },
    lines: [0, 0, 0, 1, 0, 0],
    judgment: "Modesty creates success. The superior person carries things through.",
    image: "Within the earth, a mountain. Thus the superior person reduces that which is too much and augments that which is too little."
  },
  {
    number: 16,
    name: "Enthusiasm",
    chineseName: "豫",
    meaning: "Joyful movement and inspired action",
    trigrams: { upper: "Thunder", lower: "Earth" },
    lines: [0, 0, 1, 0, 0, 0],
    judgment: "Enthusiasm. It furthers one to install helpers and to set armies marching.",
    image: "Thunder comes resounding out of the earth. Thus the ancient kings made music to honor merit."
  },
  {
    number: 17,
    name: "Following",
    chineseName: "隨",
    meaning: "Adapting to the flow of circumstances",
    trigrams: { upper: "Lake", lower: "Thunder" },
    lines: [1, 1, 0, 0, 0, 1],
    judgment: "Following has supreme success. Perseverance furthers. No blame.",
    image: "Thunder in the middle of the lake. Thus the superior person at nightfall goes indoors for rest and recuperation."
  },
  {
    number: 18,
    name: "Work on the Decayed",
    chineseName: "蠱",
    meaning: "Repairing what has been spoiled through renewal",
    trigrams: { upper: "Mountain", lower: "Wind" },
    lines: [1, 0, 0, 1, 1, 0],
    judgment: "Work on what has been spoiled has supreme success. Before the starting point, three days. After the starting point, three days.",
    image: "The wind blows low on the mountain. Thus the superior person stirs up the people and strengthens their spirit."
  },
  {
    number: 19,
    name: "Approach",
    chineseName: "臨",
    meaning: "Coming together, growing influence and authority",
    trigrams: { upper: "Earth", lower: "Lake" },
    lines: [0, 0, 0, 1, 1, 0],
    judgment: "Approach has supreme success. Perseverance furthers. When the eighth month comes, there will be misfortune.",
    image: "The earth above the lake. Thus the superior person is inexhaustible in their will to teach and tolerates the people."
  },
  {
    number: 20,
    name: "Contemplation",
    chineseName: "觀",
    meaning: "Observation, reflection, and seeing the bigger picture",
    trigrams: { upper: "Wind", lower: "Earth" },
    lines: [1, 1, 0, 0, 0, 0],
    judgment: "Contemplation. The ablution has been made, but not yet the offering. Full of trust they look up.",
    image: "The wind blows over the earth. Thus the kings of old visited the regions, contemplated the people, and gave instruction."
  },
  {
    number: 21,
    name: "Biting Through",
    chineseName: "噬嗑",
    meaning: "Decisive action to overcome obstacles",
    trigrams: { upper: "Fire", lower: "Thunder" },
    lines: [1, 0, 1, 0, 0, 1],
    judgment: "Biting Through has success. It is favorable to let justice be administered.",
    image: "Thunder and lightning. Thus the kings of former times made firm the laws through clearly defined penalties."
  },
  {
    number: 22,
    name: "Grace",
    chineseName: "賁",
    meaning: "Beauty and elegance in form, not mere adornment",
    trigrams: { upper: "Mountain", lower: "Fire" },
    lines: [1, 0, 0, 1, 0, 1],
    judgment: "Grace has success. In small matters it is favorable to undertake something.",
    image: "Fire at the foot of the mountain. Thus the superior person proceeds to clear up current affairs, but dares not decide controversial issues."
  },
  {
    number: 23,
    name: "Splitting Apart",
    chineseName: "剝",
    meaning: "Deterioration, let go of what no longer serves",
    trigrams: { upper: "Mountain", lower: "Earth" },
    lines: [1, 0, 0, 0, 0, 0],
    judgment: "Splitting Apart. It does not further one to go anywhere.",
    image: "The mountain rests on the earth. Thus those above can ensure their position only by giving generously to those below."
  },
  {
    number: 24,
    name: "Return",
    chineseName: "復",
    meaning: "The turning point, renewal after a dark time",
    trigrams: { upper: "Earth", lower: "Thunder" },
    lines: [0, 0, 0, 0, 0, 1],
    judgment: "Return. Success. Going out and coming in without error. Friends come without blame.",
    image: "Thunder within the earth. Thus the kings of antiquity closed the passes at the time of solstice."
  },
  {
    number: 25,
    name: "Innocence",
    chineseName: "無妄",
    meaning: "Acting without ulterior motive, natural spontaneity",
    trigrams: { upper: "Heaven", lower: "Thunder" },
    lines: [1, 1, 1, 0, 0, 1],
    judgment: "Innocence. Supreme success. Perseverance furthers. If someone is not as they should be, there is misfortune.",
    image: "Under heaven thunder rolls. Thus the kings of old, rich in virtue, fostered and nourished all beings."
  },
  {
    number: 26,
    name: "Great Taming",
    chineseName: "大畜",
    meaning: "Accumulating wisdom and power through restraint",
    trigrams: { upper: "Mountain", lower: "Heaven" },
    lines: [1, 0, 0, 1, 1, 1],
    judgment: "The Taming Power of the Great. Perseverance furthers. It furthers one to cross the great water.",
    image: "Heaven within the mountain. Thus the superior person acquaints themselves with the words and deeds of the past, in order to strengthen character."
  },
  {
    number: 27,
    name: "Nourishment",
    chineseName: "頤",
    meaning: "Proper nourishment of body, mind, and spirit",
    trigrams: { upper: "Mountain", lower: "Thunder" },
    lines: [1, 0, 0, 0, 0, 1],
    judgment: "Nourishment. Perseverance brings good fortune. Pay heed to the providing of nourishment.",
    image: "At the foot of the mountain, thunder. Thus the superior person is careful of words and temperate in eating and drinking."
  },
  {
    number: 28,
    name: "Great Exceeding",
    chineseName: "大過",
    meaning: "Extraordinary pressure requiring bold action",
    trigrams: { upper: "Lake", lower: "Wind" },
    lines: [1, 1, 0, 1, 1, 0],
    judgment: "Preponderance of the Great. The ridgepole sags to the breaking point. It furthers one to have somewhere to go.",
    image: "The lake rises above the trees. Thus the superior person stands alone and is not afraid."
  },
  {
    number: 29,
    name: "The Abysmal",
    chineseName: "坎",
    meaning: "Danger and deep water, maintaining sincerity through peril",
    trigrams: { upper: "Water", lower: "Water" },
    lines: [0, 1, 0, 0, 1, 0],
    judgment: "The Abysmal repeated. If you are sincere, you have success in your heart, and whatever you do succeeds.",
    image: "Water flows on and reaches the goal. Thus the superior person walks in lasting virtue and carries on teaching."
  },
  {
    number: 30,
    name: "The Clinging",
    chineseName: "離",
    meaning: "Radiance, clarity, and dependence on what is right",
    trigrams: { upper: "Fire", lower: "Fire" },
    lines: [1, 0, 1, 1, 0, 1],
    judgment: "The Clinging. Perseverance furthers. It brings success. Care of the cow brings good fortune.",
    image: "That which is bright rises twice: the image of Fire. Thus the great person, by perpetuating this brightness, illumines the four quarters of the world."
  },
  {
    number: 31,
    name: "Influence",
    chineseName: "咸",
    meaning: "Mutual attraction and receptive influence",
    trigrams: { upper: "Lake", lower: "Mountain" },
    lines: [1, 1, 0, 1, 0, 0],
    judgment: "Influence. Success. Perseverance furthers. To take a maiden to wife brings good fortune.",
    image: "A lake on the mountain. Thus the superior person encourages people to approach through their readiness to receive them."
  },
  {
    number: 32,
    name: "Duration",
    chineseName: "恆",
    meaning: "Endurance, consistency, and long-lasting commitment",
    trigrams: { upper: "Thunder", lower: "Wind" },
    lines: [0, 0, 1, 1, 1, 0],
    judgment: "Duration. Success. No blame. Perseverance furthers. It furthers one to have somewhere to go.",
    image: "Thunder and wind: the image of Duration. Thus the superior person stands firm and does not change direction."
  },
  {
    number: 33,
    name: "Retreat",
    chineseName: "遯",
    meaning: "Strategic withdrawal to preserve strength",
    trigrams: { upper: "Heaven", lower: "Mountain" },
    lines: [1, 1, 1, 1, 0, 0],
    judgment: "Retreat. Success. In what is small, perseverance furthers.",
    image: "Mountain under heaven. Thus the superior person keeps the inferior at a distance, not angrily but with reserve."
  },
  {
    number: 34,
    name: "Great Power",
    chineseName: "大壯",
    meaning: "Strength in action guided by what is right",
    trigrams: { upper: "Thunder", lower: "Heaven" },
    lines: [0, 0, 1, 1, 1, 1],
    judgment: "The Power of the Great. Perseverance furthers.",
    image: "Thunder in heaven above. Thus the superior person does not tread upon paths that do not accord with established order."
  },
  {
    number: 35,
    name: "Progress",
    chineseName: "晉",
    meaning: "Advancing forward, rising like the sun",
    trigrams: { upper: "Fire", lower: "Earth" },
    lines: [1, 0, 1, 0, 0, 0],
    judgment: "Progress. The powerful prince is honored with horses in large numbers. In a single day he is granted audience three times.",
    image: "The sun rises over the earth. Thus the superior person themselves brightens their bright virtue."
  },
  {
    number: 36,
    name: "Darkening of the Light",
    chineseName: "明夷",
    meaning: "Perseverance through adversity, inner light in darkness",
    trigrams: { upper: "Earth", lower: "Fire" },
    lines: [0, 0, 0, 1, 0, 1],
    judgment: "Darkening of the Light. In adversity it furthers one to be persevering.",
    image: "The light has sunk into the earth. Thus the superior person lives with the great mass, veiling their light yet still shining."
  },
  {
    number: 37,
    name: "The Family",
    chineseName: "家人",
    meaning: "Order within the household, proper relationships",
    trigrams: { upper: "Wind", lower: "Fire" },
    lines: [1, 1, 0, 1, 0, 1],
    judgment: "The Family. The perseverance of the woman furthers.",
    image: "Wind comes forth from fire. Thus the superior person has substance in their words and duration in their way of life."
  },
  {
    number: 38,
    name: "Opposition",
    chineseName: "睽",
    meaning: "Estrangement and misunderstanding, finding common ground",
    trigrams: { upper: "Fire", lower: "Lake" },
    lines: [1, 0, 1, 1, 1, 0],
    judgment: "Opposition. In small matters, good fortune.",
    image: "Above, fire; below, the lake. Thus amid all fellowship the superior person retains their individuality."
  },
  {
    number: 39,
    name: "Obstruction",
    chineseName: "蹇",
    meaning: "Obstacles ahead, the value of turning inward",
    trigrams: { upper: "Water", lower: "Mountain" },
    lines: [0, 1, 0, 1, 0, 0],
    judgment: "Obstruction. The southwest furthers. The northeast does not further. Perseverance brings good fortune.",
    image: "Water on the mountain. Thus the superior person turns their attention to themselves and molds their character."
  },
  {
    number: 40,
    name: "Deliverance",
    chineseName: "解",
    meaning: "Release from tension, liberation and relief",
    trigrams: { upper: "Thunder", lower: "Water" },
    lines: [0, 0, 1, 0, 1, 0],
    judgment: "Deliverance. The southwest furthers. If there is no longer anything where one has to go, return brings good fortune.",
    image: "Thunder and rain set in. Thus the superior person pardons mistakes and forgives misdeeds."
  },
  {
    number: 41,
    name: "Decrease",
    chineseName: "損",
    meaning: "Simplification and sacrifice for a greater good",
    trigrams: { upper: "Mountain", lower: "Lake" },
    lines: [1, 0, 0, 1, 1, 0],
    judgment: "Decrease combined with sincerity brings about supreme good fortune without blame.",
    image: "At the foot of the mountain, the lake. Thus the superior person controls their anger and restrains their instincts."
  },
  {
    number: 42,
    name: "Increase",
    chineseName: "益",
    meaning: "Growth, generosity, and expanding benefit",
    trigrams: { upper: "Wind", lower: "Thunder" },
    lines: [1, 1, 0, 0, 0, 1],
    judgment: "Increase. It furthers one to undertake something. It furthers one to cross the great water.",
    image: "Wind and thunder: the image of Increase. Thus the superior person, seeing good, imitates it; having faults, corrects them."
  },
  {
    number: 43,
    name: "Breakthrough",
    chineseName: "夬",
    meaning: "Decisive resolution and determination",
    trigrams: { upper: "Lake", lower: "Heaven" },
    lines: [1, 1, 0, 1, 1, 1],
    judgment: "Breakthrough. One must resolutely make the matter known at the court of the king.",
    image: "The lake has risen up to heaven. Thus the superior person dispenses riches downward and refrains from resting on their virtue."
  },
  {
    number: 44,
    name: "Coming to Meet",
    chineseName: "姤",
    meaning: "Unexpected encounters, be cautious of temptation",
    trigrams: { upper: "Heaven", lower: "Wind" },
    lines: [1, 1, 1, 1, 1, 0],
    judgment: "Coming to Meet. The maiden is powerful. One should not marry such a maiden.",
    image: "Under heaven, wind. Thus the prince acts when disseminating commands, proclaiming them to the four quarters of heaven."
  },
  {
    number: 45,
    name: "Gathering Together",
    chineseName: "萃",
    meaning: "Collection, assembly, and focusing resources",
    trigrams: { upper: "Lake", lower: "Earth" },
    lines: [1, 1, 0, 0, 0, 0],
    judgment: "Gathering Together. Success. The king approaches his temple. It furthers one to see the great person.",
    image: "Over the earth, the lake. Thus the superior person renews their weapons in order to meet the unforeseen."
  },
  {
    number: 46,
    name: "Pushing Upward",
    chineseName: "升",
    meaning: "Steady growth and effort-based advancement",
    trigrams: { upper: "Earth", lower: "Wind" },
    lines: [0, 0, 0, 1, 1, 0],
    judgment: "Pushing Upward has supreme success. One must see the great person. Fear not. Departure toward the south brings good fortune.",
    image: "Within the earth, wood grows. Thus the superior person builds up small things in order to achieve great things."
  },
  {
    number: 47,
    name: "Oppression",
    chineseName: "困",
    meaning: "Exhaustion and adversity testing inner resolve",
    trigrams: { upper: "Lake", lower: "Water" },
    lines: [1, 1, 0, 0, 1, 0],
    judgment: "Oppression. Success. Perseverance. The great person brings about good fortune. No blame.",
    image: "There is no water in the lake. Thus the superior person stakes their life on following their will."
  },
  {
    number: 48,
    name: "The Well",
    chineseName: "井",
    meaning: "The inexhaustible source of life and nourishment",
    trigrams: { upper: "Water", lower: "Wind" },
    lines: [0, 1, 0, 1, 1, 0],
    judgment: "The Well. The town may be changed, but the well cannot be changed. One may draw from the well without changing it.",
    image: "Water over wood: the image of the Well. Thus the superior person encourages the people at their work and exhorts them to help one another."
  },
  {
    number: 49,
    name: "Revolution",
    chineseName: "革",
    meaning: "Fundamental transformation and renewal",
    trigrams: { upper: "Lake", lower: "Fire" },
    lines: [1, 1, 0, 1, 0, 1],
    judgment: "Revolution. On your own day you are believed. Supreme success. Perseverance furthers. Remorse disappears.",
    image: "Fire in the lake. Thus the superior person sets the calendar in order and makes the seasons clear."
  },
  {
    number: 50,
    name: "The Cauldron",
    chineseName: "鼎",
    meaning: "Transformation and nourishment through inner cultivation",
    trigrams: { upper: "Fire", lower: "Wind" },
    lines: [1, 0, 1, 1, 1, 0],
    judgment: "The Cauldron. Supreme good fortune. Success.",
    image: "Fire over wood. Thus the superior person consolidates their fate by making their position correct."
  },
  {
    number: 51,
    name: "The Arousing",
    chineseName: "震",
    meaning: "Shock, awakening, and renewed awareness",
    trigrams: { upper: "Thunder", lower: "Thunder" },
    lines: [0, 0, 1, 0, 0, 1],
    judgment: "Shock brings success. Shock comes and one trembles. Laughing words. Shock startles for a hundred miles.",
    image: "Thunder repeated: the image of Shock. Thus the superior person sets their life in order and examines themselves."
  },
  {
    number: 52,
    name: "Keeping Still",
    chineseName: "艮",
    meaning: "Meditation, rest, and inner peace",
    trigrams: { upper: "Mountain", lower: "Mountain" },
    lines: [1, 0, 0, 1, 0, 0],
    judgment: "Keeping Still. Keeping their back still so that they no longer feel their body. They go into the courtyard and do not see their people.",
    image: "Mountains standing close together. Thus the superior person does not permit their thoughts to go beyond their situation."
  },
  {
    number: 53,
    name: "Development",
    chineseName: "漸",
    meaning: "Gradual progress and steady development",
    trigrams: { upper: "Wind", lower: "Mountain" },
    lines: [1, 1, 0, 1, 0, 0],
    judgment: "Development. The maiden is given in marriage. Good fortune. Perseverance furthers.",
    image: "On the mountain, a tree. Thus the superior person abides in dignity and virtue, in order to improve the mores."
  },
  {
    number: 54,
    name: "The Marrying Maiden",
    chineseName: "歸妹",
    meaning: "Subordination, making the best of difficult circumstances",
    trigrams: { upper: "Thunder", lower: "Lake" },
    lines: [0, 0, 1, 1, 1, 0],
    judgment: "The Marrying Maiden. Undertakings bring misfortune. Nothing that would further.",
    image: "Thunder over the lake. Thus the superior person understands the transitory in the light of the eternity of the end."
  },
  {
    number: 55,
    name: "Abundance",
    chineseName: "豐",
    meaning: "Fullness and prosperity at their peak",
    trigrams: { upper: "Thunder", lower: "Fire" },
    lines: [0, 0, 1, 1, 0, 1],
    judgment: "Abundance has success. The king attains abundance. Be not sad. Be like the sun at midday.",
    image: "Both thunder and lightning come. Thus the superior person decides lawsuits and carries out punishments."
  },
  {
    number: 56,
    name: "The Wanderer",
    chineseName: "旅",
    meaning: "Travel, transition, and finding stability within change",
    trigrams: { upper: "Fire", lower: "Mountain" },
    lines: [1, 0, 1, 1, 0, 0],
    judgment: "The Wanderer. Success through smallness. Perseverance brings good fortune to the wanderer.",
    image: "Fire on the mountain. Thus the superior person is clear-minded and cautious in imposing penalties."
  },
  {
    number: 57,
    name: "The Gentle",
    chineseName: "巽",
    meaning: "Penetrating influence through gentle persistence",
    trigrams: { upper: "Wind", lower: "Wind" },
    lines: [1, 1, 0, 1, 1, 0],
    judgment: "The Gentle. Success through what is small. It furthers one to have somewhere to go.",
    image: "Winds following one upon the other. Thus the superior person spreads commands abroad and carries out undertakings."
  },
  {
    number: 58,
    name: "The Joyous",
    chineseName: "兌",
    meaning: "Joy, openness, and encouraging communication",
    trigrams: { upper: "Lake", lower: "Lake" },
    lines: [1, 1, 0, 1, 1, 0],
    judgment: "The Joyous. Success. Perseverance is favorable.",
    image: "Lakes resting one on the other. Thus the superior person joins with friends for discussion and practice."
  },
  {
    number: 59,
    name: "Dispersion",
    chineseName: "渙",
    meaning: "Dissolving barriers, overcoming separation",
    trigrams: { upper: "Wind", lower: "Water" },
    lines: [1, 1, 0, 0, 1, 0],
    judgment: "Dispersion. Success. The king approaches his temple. It furthers one to cross the great water.",
    image: "The wind drives over the water. Thus the kings of old sacrificed to the Lord and built temples."
  },
  {
    number: 60,
    name: "Limitation",
    chineseName: "節",
    meaning: "Setting boundaries and accepting natural limits",
    trigrams: { upper: "Water", lower: "Lake" },
    lines: [0, 1, 0, 1, 1, 0],
    judgment: "Limitation. Success. Galling limitation must not be persevered in.",
    image: "Water over lake. Thus the superior person creates number and measure, and examines the nature of virtue and correct conduct."
  },
  {
    number: 61,
    name: "Inner Truth",
    chineseName: "中孚",
    meaning: "Sincerity from the heart influences others",
    trigrams: { upper: "Wind", lower: "Lake" },
    lines: [1, 1, 0, 0, 1, 0],
    judgment: "Inner Truth. Pigs and fishes. Good fortune. It furthers one to cross the great water.",
    image: "Wind over lake. Thus the superior person discusses criminal cases in order to delay executions."
  },
  {
    number: 62,
    name: "Small Exceeding",
    chineseName: "小過",
    meaning: "Careful attention to small matters, humility",
    trigrams: { upper: "Thunder", lower: "Mountain" },
    lines: [0, 0, 1, 1, 0, 0],
    judgment: "Preponderance of the Small. Success. Perseverance furthers. Small things may be done; great things should not be done.",
    image: "Thunder on the mountain. Thus the superior person gives preponderance to reverence in conduct."
  },
  {
    number: 63,
    name: "After Completion",
    chineseName: "既濟",
    meaning: "A task completed, but vigilance is still needed",
    trigrams: { upper: "Water", lower: "Fire" },
    lines: [0, 1, 0, 1, 0, 1],
    judgment: "After Completion. Success in small matters. Perseverance furthers. At the beginning good fortune. At the end disorder.",
    image: "Water over fire. Thus the superior person takes thought of misfortune and arms themselves against it in advance."
  },
  {
    number: 64,
    name: "Before Completion",
    chineseName: "未濟",
    meaning: "Nearly there but not yet finished, cautious optimism",
    trigrams: { upper: "Fire", lower: "Water" },
    lines: [1, 0, 1, 0, 1, 0],
    judgment: "Before Completion. Success. But if the little fox, after nearly completing the crossing, gets their tail in the water, there is nothing that would further.",
    image: "Fire over water. Thus the superior person is careful in discriminating things so that each finds its place."
  },
]

export interface QuestionnaireQuestion {
  id: string
  category: string
  question: string
  options: { label: string; value: string }[]
}

export const questions: QuestionnaireQuestion[] = [
  {
    id: "life_phase",
    category: "Life Overview",
    question: "Which best describes your current phase of life?",
    options: [
      { label: "A time of new beginnings", value: "beginning" },
      { label: "A period of steady growth", value: "growth" },
      { label: "A moment of transition or change", value: "transition" },
      { label: "A time of reflection and consolidation", value: "reflection" },
      { label: "A period of uncertainty or challenge", value: "challenge" },
    ],
  },
  {
    id: "emotional_state",
    category: "Inner World",
    question: "How would you describe your emotional state right now?",
    options: [
      { label: "Calm and centered", value: "calm" },
      { label: "Anxious or restless", value: "anxious" },
      { label: "Hopeful and optimistic", value: "hopeful" },
      { label: "Conflicted or torn", value: "conflicted" },
      { label: "Weary but determined", value: "weary" },
    ],
  },
  {
    id: "career",
    category: "Career & Purpose",
    question: "What is your primary concern regarding your work or career?",
    options: [
      { label: "Seeking a new direction or opportunity", value: "seeking" },
      { label: "Navigating conflict or challenges at work", value: "conflict" },
      { label: "Wanting deeper meaning and fulfillment", value: "meaning" },
      { label: "Building something from the ground up", value: "building" },
      { label: "Maintaining stability and consistency", value: "stability" },
    ],
  },
  {
    id: "relationships",
    category: "Relationships",
    question: "How do your closest relationships feel right now?",
    options: [
      { label: "Harmonious and supportive", value: "harmonious" },
      { label: "Strained or distant", value: "strained" },
      { label: "In a process of healing", value: "healing" },
      { label: "Deepening and evolving", value: "deepening" },
      { label: "I feel somewhat isolated", value: "isolated" },
    ],
  },
  {
    id: "health",
    category: "Health & Vitality",
    question: "How would you rate your physical and mental energy?",
    options: [
      { label: "Abundant and vibrant", value: "abundant" },
      { label: "Steady but could be better", value: "steady" },
      { label: "Low and in need of restoration", value: "low" },
      { label: "Fluctuating unpredictably", value: "fluctuating" },
      { label: "Recovering from depletion", value: "recovering" },
    ],
  },
  {
    id: "finances",
    category: "Material World",
    question: "What best describes your relationship with money and resources?",
    options: [
      { label: "Feeling secure and abundant", value: "secure" },
      { label: "Working toward greater stability", value: "working" },
      { label: "Experiencing scarcity or worry", value: "scarcity" },
      { label: "Taking a risk or making an investment", value: "risk" },
      { label: "Learning to be content with what I have", value: "content" },
    ],
  },
  {
    id: "spiritual",
    category: "Spirit & Growth",
    question: "What draws you to seek guidance at this time?",
    options: [
      { label: "A major decision ahead", value: "decision" },
      { label: "Desire for deeper self-understanding", value: "understanding" },
      { label: "Feeling lost and seeking direction", value: "lost" },
      { label: "Curiosity about what the future holds", value: "curiosity" },
      { label: "Wanting confirmation of my chosen path", value: "confirmation" },
    ],
  },
  {
    id: "change",
    category: "Change & Transformation",
    question: "How do you tend to respond to change?",
    options: [
      { label: "I embrace it as opportunity", value: "embrace" },
      { label: "I resist but eventually adapt", value: "resist" },
      { label: "I feel overwhelmed by it", value: "overwhelmed" },
      { label: "I plan carefully and move slowly", value: "careful" },
      { label: "I seek the lesson within the change", value: "lesson" },
    ],
  },
  {
    id: "reading_language",
    category: "Reading Preferences",
    question: "Which language would you like for your personal reading?",
    options: [
      { label: "English", value: "english" },
      { label: "Simplified Chinese (简体中文)", value: "zh_hans" },
      { label: "Traditional Chinese (繁體中文)", value: "zh_hant" },
    ],
  },
]

export function generateHexagramFromAnswers(answers: Record<string, string>): Hexagram {
  // Use the answers to deterministically select a hexagram
  // Each answer contributes to building the hexagram lines
  const answerValues = Object.entries(answers)
    .filter(([id]) => id !== "reading_language")
    .map(([, value]) => value)
  
  // Create a hash from all answers
  let hash = 0
  for (const answer of answerValues) {
    for (let i = 0; i < answer.length; i++) {
      const char = answer.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // Convert to 32bit integer
    }
  }
  
  // Use the hash to select a hexagram (1-64)
  const hexagramIndex = Math.abs(hash) % 64
  return hexagrams[hexagramIndex]
}
