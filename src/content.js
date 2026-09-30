/* ================= GERMAN A1 CONTENT PACK =================
   Source of truth: Goethe A1 Wortliste. Grammar: Lina compendium / Routledge / LearnOutLive.
   Every vocab item: id, de, en, ex? [german sentence, english], tags */
const VOCAB = {};
function W(id, de, en, ex){ VOCAB[id] = {id, de, en, ex}; }

/* --- Stage 0.2 Survival kit --- */
W('hallo','Hallo','hello',['Hallo, ich bin Klara.','Hello, I am Klara.']);
W('tschuess','Tschüss','bye',['Tschüss, bis morgen!','Bye, see you tomorrow!']);
W('bitte','bitte','please / you\'re welcome',['Einen Kaffee, bitte.','A coffee, please.']);
W('danke','danke','thank you',['Danke schön!','Thank you very much!']);
W('ja','ja','yes');
W('nein','nein','no');
W('entschuldigung','Entschuldigung','excuse me / sorry',['Entschuldigung, wo ist der Bahnhof?','Excuse me, where is the station?']);
W('wiebitte','Wie bitte?','pardon? (say again)');
W('verstehe','Ich verstehe nicht','I don\'t understand');
W('englisch','Sprechen Sie Englisch?','Do you speak English?');
W('langsamer','Können Sie das langsamer sagen?','Can you say that more slowly?');
W('guten-morgen','Guten Morgen','good morning');
W('guten-tag','Guten Tag','good day / hello (formal)');
W('gute-nacht','Gute Nacht','good night');

/* --- Stage 0.3 Numbers --- */
W('eins','eins','one'); W('zwei','zwei','two'); W('drei','drei','three');
W('vier','vier','four'); W('fuenf','fünf','five'); W('sechs','sechs','six');
W('sieben','sieben','seven'); W('acht','acht','eight'); W('neun','neun','nine');
W('zehn','zehn','ten'); W('zwanzig','zwanzig','twenty');
W('einundzwanzig','einundzwanzig','twenty-one (one-and-twenty!)');
W('hundert','hundert','one hundred');
W('kostet','Wie viel kostet das?','How much does that cost?',['Wie viel kostet das Brot?','How much does the bread cost?']);
W('euro','der Euro','the euro',['Das macht drei Euro fünfzig.','That comes to three euros fifty.']);

/* --- Stage 0.4 Time & calendar --- */
W('montag','der Montag','Monday'); W('dienstag','der Dienstag','Tuesday');
W('mittwoch','der Mittwoch','Wednesday'); W('freitag','der Freitag','Friday');
W('samstag','der Samstag','Saturday'); W('sonntag','der Sonntag','Sunday');
W('heute','heute','today',['Heute ist Montag.','Today is Monday.']);
W('morgen','morgen','tomorrow'); W('gestern','gestern','yesterday');
W('uhr','die Uhr','clock / o\'clock',['Es ist acht Uhr.','It is eight o\'clock.']);
W('halb','halb sieben','half past SIX (careful!)');
W('woche','die Woche','the week'); W('jahr','das Jahr','the year');

/* --- Stage 0.5 Colors & basics --- */
W('rot','rot','red'); W('blau','blau','blue'); W('gruen','grün','green');
W('gelb','gelb','yellow'); W('schwarz','schwarz','black'); W('weiss','weiß','white');
W('gross','groß','big'); W('klein','klein','small');
W('gut','gut','good'); W('schlecht','schlecht','bad');
W('schoen','schön','beautiful',['Das ist schön!','That is beautiful!']);

/* --- Stage 0.6 People & pronouns --- */
W('ich','ich','I'); W('du','du','you (informal)'); W('er','er','he'); W('sie-she','sie','she');
W('wir','wir','we'); W('sie-formal','Sie','you (formal!)');
W('mann','der Mann','the man'); W('frau','die Frau','the woman'); W('kind','das Kind','the child');
W('sein-bin','ich bin','I am',['Ich bin müde.','I am tired.']);
W('sein-bist','du bist','you are'); W('haben-habe','ich habe','I have',['Ich habe eine Frage.','I have a question.']);

/* --- Unit 1: Ich & du --- */
W('heissen','heißen','to be called',['Ich heiße Shreya.','My name is Shreya.']);
W('wohnen','wohnen','to live (reside)',['Ich wohne in Berlin.','I live in Berlin.']);
W('kommen-aus','Ich komme aus …','I come from …',['Ich komme aus Indien.','I come from India.']);
W('land','das Land','the country'); W('stadt','die Stadt','the city');
W('sprache','die Sprache','the language',['Deutsch ist eine schöne Sprache.','German is a beautiful language.']);
W('sprechen','sprechen','to speak',['Ich spreche ein bisschen Deutsch.','I speak a little German.']);
W('arbeiten','arbeiten','to work',['Ich arbeite in Berlin.','I work in Berlin.']);
W('lernen','lernen','to learn',['Wir lernen Deutsch.','We are learning German.']);
W('wiegehts','Wie geht\'s?','How are you?');
W('freut-mich','Freut mich!','Nice to meet you!');
W('name','der Name','the name'); W('beruf','der Beruf','the profession');
W('wer','Wer?','Who?'); W('wo','Wo?','Where?'); W('was','Was?','What?');

/* --- Unit 2: Familie & Freunde --- */
W('familie','die Familie','the family',['Meine Familie wohnt in Indien.','My family lives in India.']);
W('mutter','die Mutter','the mother'); W('vater','der Vater','the father');
W('eltern','die Eltern','the parents'); W('bruder','der Bruder','the brother');
W('schwester','die Schwester','the sister'); W('kinder','die Kinder','the children');
W('freund','der Freund','the friend (m.)',['Mein Freund heißt Tom.','My friend is called Tom.']);
W('freundin','die Freundin','the friend (f.)');
W('mein','mein / meine','my'); W('dein','dein / deine','your (informal)');
W('verheiratet','verheiratet','married');
W('zusammen-wohnen','Wir wohnen zusammen.','We live together.');

/* --- Unit 3: Essen & Trinken --- */
W('kaffee','der Kaffee','the coffee',['Ich hätte gern einen Kaffee.','I would like a coffee.']);
W('tee','der Tee','the tea'); W('wasser','das Wasser','the water');
W('brot','das Brot','the bread',['Das Brot ist frisch.','The bread is fresh.']);
W('broetchen','das Brötchen','the bread roll',['Zwei Brötchen, bitte.','Two rolls, please.']);
W('kaese','der Käse','the cheese'); W('apfel','der Apfel','the apple');
W('essen','essen','to eat',['Was möchtest du essen?','What would you like to eat?']);
W('trinken','trinken','to drink');
W('bestellen','bestellen','to order',['Möchten Sie bestellen?','Would you like to order?']);
W('bezahlen','bezahlen','to pay',['Ich möchte bezahlen, bitte.','I would like to pay, please.']);
W('rechnung','die Rechnung','the bill',['Die Rechnung, bitte!','The bill, please!']);
W('trinkgeld','das Trinkgeld','the tip');
W('haette-gern','Ich hätte gern …','I would like … (polite)');
W('getrennt','Zusammen oder getrennt?','Together or separate? (paying)');
W('lecker','lecker','delicious',['Das ist sehr lecker!','That is very delicious!']);
W('speisekarte','die Speisekarte','the menu');

/* --- Unit 4 (locked in v1): Einkaufen --- */
W('supermarkt','der Supermarkt','the supermarket');
W('kaufen','kaufen','to buy'); W('pfand','das Pfand','bottle deposit');

/* --- Stage 0 additions: numbers, the two verbs, question words, articles --- */
W('null','null','zero',['Null Grad heute.','Zero degrees today.']);
W('elf','elf','eleven',['Es ist elf Uhr.','It is eleven o’clock.']);
W('zwoelf','zwölf','twelve',['Zwölf Euro, bitte.','Twelve euros, please.']);
W('dreizehn','dreizehn','thirteen'); W('vierzehn','vierzehn','fourteen');
W('fuenfzehn','fünfzehn','fifteen'); W('sechzehn','sechzehn','sixteen');
W('siebzehn','siebzehn','seventeen'); W('achtzehn','achtzehn','eighteen');
W('neunzehn','neunzehn','nineteen');
W('dreissig','dreißig','thirty'); W('vierzig','vierzig','forty'); W('fuenfzig','fünfzig','fifty');
W('sechzig','sechzig','sixty'); W('siebzig','siebzig','seventy');
W('achtzig','achtzig','eighty'); W('neunzig','neunzig','ninety');
W('tausend','tausend','a thousand',['Tausend Dank!','A thousand thanks!']);

W('sein','sein','to be',['Ich möchte pünktlich sein.','I want to be on time.']);
W('sein-ist','er ist / sie ist','he is / she is',['Sie ist Ärztin.','She is a doctor.']);
W('sein-sind','wir sind / Sie sind','we are / you are',['Wir sind neu hier.','We are new here.']);
W('haben','haben','to have',['Wir haben Zeit.','We have time.']);
W('haben-hast','du hast','you have',['Du hast recht.','You are right.']);
W('haben-hat','er hat / sie hat','he has / she has',['Er hat einen Termin.','He has an appointment.']);
W('nicht','nicht','not',['Das ist nicht richtig.','That is not right.']);
W('kein','kein / keine','no, not a',['Ich habe keine Zeit.','I have no time.']);
W('und','und','and',['Brot und Butter.','Bread and butter.']);
W('oder','oder','or',['Tee oder Kaffee?','Tea or coffee?']);
W('aber','aber','but',['Klein, aber schön.','Small, but beautiful.']);

W('woist','Wo ist …?','Where is …?',['Wo ist der Bahnhof?','Where is the station?']);
W('wann','wann','when',['Wann kommt der Bus?','When does the bus come?']);
W('warum','warum','why',['Warum ist es zu?','Why is it closed?']);
W('wieviel','wie viel','how much / how many',['Wie viel kostet das?','How much does that cost?']);
W('hier','hier','here',['Ich bin hier.','I am here.']);
W('dort','dort','there',['Dort drüben, bitte.','Over there, please.']);
W('links','links','left',['Die Post ist links.','The post office is on the left.']);
W('rechts','rechts','right',['Dann rechts.','Then right.']);
W('geradeaus','geradeaus','straight ahead',['Immer geradeaus.','Straight ahead all the way.']);
W('moechte','ich möchte','I would like',['Ich möchte einen Kaffee.','I would like a coffee.']);
W('gibtes','Gibt es …?','Is there …?',['Gibt es hier WLAN?','Is there wifi here?']);
W('toilette','die Toilette','the toilet',['Wo ist die Toilette?','Where is the toilet?']);
W('bahnhof','der Bahnhof','the station',['Zum Bahnhof, bitte.','To the station, please.']);

W('donnerstag','der Donnerstag','Thursday',['Am Donnerstag habe ich Zeit.','On Thursday I have time.']);
W('viertelnach','Viertel nach','quarter past',['Viertel nach acht.','Quarter past eight.']);
W('viertelvor','Viertel vor','quarter to',['Viertel vor neun.','Quarter to nine.']);
W('termin','der Termin','the appointment',['Ich habe einen Termin.','I have an appointment.']);

W('art-der','der','the (masculine)',['der Mann, der Bahnhof','the man, the station']);
W('art-die','die','the (feminine)',['die Frau, die Uhr','the woman, the clock']);
W('art-das','das','the (neuter)',['das Kind, das Haus','the child, the house']);
W('art-ein','ein','a (masc./neuter)',['ein Mann, ein Kind','a man, a child']);
W('art-eine','eine','a (feminine)',['eine Frau, eine Woche','a woman, a week']);
W('wiedersehen','Auf Wiedersehen','goodbye (formal)',['Auf Wiedersehen, Frau Weber.','Goodbye, Mrs Weber.']);
W('herr','Herr','Mr',['Guten Tag, Herr Klein.','Good day, Mr Klein.']);
W('frau-title','Frau','Mrs / Ms',['Guten Tag, Frau Weber.','Good day, Mrs Weber.']);

/* ================= UNITS ================= */
const STAGES = [
  {n:0, name:'Survive', job:'Get through your first week without freezing.'},
  {n:1, name:'Say who you are', job:'Hold a first conversation about yourself and your day.'},
  {n:2, name:'Get things done', job:'The errands and offices of actually living there.'},
  {n:3, name:'Talk about time', job:'What you did, what you plan, and why.'},
  {n:4, name:'Exam practice', job:'Know the format, then three timed mock papers.'},
];

const UNITS = [
 {id:'s0a', stage:0, icon:'Aa', title:'Intro & Alphabets', sub:'welcome · ä ö ü ß · first words',
  concept:'German is spoken as it is written, and every noun is capitalised.', frame:'Hallo. Ich heiße …',
  brief:{say:'Ve start vhere everyone starts: ze sounds and ze first words you vill actually use.', will:'The alphabet, the four extra letters, and enough greetings to survive a first conversation.', needs:null},
  vocab:['hallo','guten-morgen','guten-tag','tschuess','wiedersehen','herr','frau-title','bitte','danke','ja','nein','entschuldigung','wiebitte','verstehe','englisch','langsamer','gute-nacht'],
  grammar:{title:'Das Alphabet', body:'<p>German uses the same 26 letters as English, plus four of its own.</p><ul><li><button class=\'gsp\' onclick=\'speak(this.dataset.de)\' data-de=\'ä ö ü\' title=\'listen\'>🔊</button><span class=\'gw\'>ä ö ü</span> are the umlauts. Say them with rounded lips.</li><li><button class=\'gsp\' onclick=\'speak(this.dataset.de)\' data-de=\'scharfes S\' title=\'listen\'>🔊</button><span class=\'gw\'>ß</span> is the <i>scharfes S</i>. It simply sounds like <b>ss</b>.</li></ul><p class=\'gkeyline\'>Two rules worth having from day one: every noun is capitalised, and German is spoken exactly as it is written.</p><p>In detail:</p><ul><li><span class=\'gkey\'>Every noun gets a capital letter.</span> <span class=\'gw\'>das Haus</span>, <span class=\'gw\'>die Frau</span>.</li><li><span class=\'gkey\'>German is spoken exactly as it is written.</span> Learn the sounds once and you can read anything.</li></ul>', gloss:[["ä, ö, ü", "the umlauts: say them with rounded lips"], ["ß", "scharfes S: sounds like ss"], ["das Haus", "the house: every noun is capitalised"]]},
  culture:{title:'Servus or Moin?', body:'<b>Guten Tag</b> in shops and offices, <b>Hallo</b> everywhere else. In Bavaria you will hear <i>Servus</i>, in Hamburg <i>Moin</i>, at any hour of the day.', gloss:[["Servus", "hi / bye (Bavaria)"], ["Moin", "hi (Hamburg, any time of day)"]]},
  extra:[
   {t:'mc', q:'Someone speaks too fast. What do you say?', opts:['Können Sie das langsamer sagen?','Das macht acht Euro.','Gute Nacht!'], a:0, why:'"Can you say that more slowly?", your rescue phrase #1.'},
   {t:'mc', q:'You bump into someone. You say:', opts:['Tschüss!','Entschuldigung!','Ja, bitte.'], a:1, why:'Entschuldigung = excuse me / sorry.'}
  ]},
 {id:'s0f', stage:0, icon:'ich', title:'Ich bin, ich habe', sub:'the two verbs everything runs on',
  concept:'sein and haben carry most German sentences.', frame:'Ich bin … / Ich habe …',
  brief:{say:'Two verbs today. Learn zese and half of German opens up.', will:'sein and haben, the seven forms, and how to say no.', needs:'Nothing. This is a good place to start.'},
  vocab:['sein','sein-bin','sein-bist','sein-ist','sein-sind','haben','haben-habe','haben-hast','haben-hat','nicht','kein','und','oder','aber'],
  grammar:{title:'sein and haben', body:'<p>Two verbs carry more German than all the others together.</p><ul><li><span class=\'gw\'>sein</span> = to be: <b>ich bin</b>, <b>du bist</b>, <b>er/sie ist</b>, <b>wir/Sie sind</b></li><li><span class=\'gw2\'>haben</span> = to have: <b>ich habe</b>, <b>du hast</b>, <b>er/sie hat</b></li></ul><p class=\'gkeyline\'>Learn these seven forms and you can already say who you are, where you are and what you have.</p><p class=\'gtopic\'>Three ways to say how you are</p><p>German splits what English keeps together, and once you see the split it is easy.</p><p class=\'glead\'><span class=\'gw\'>ich bin</span> + adjective says <b>who you are</b>:</p><ul><li><span class=\'gok\'>Ich bin glücklich.</span> I am happy.</li><li><span class=\'gok\'>Ich bin neugierig.</span> I am curious.</li><li><span class=\'gok\'>Ich bin freundlich.</span> I am friendly.</li></ul><p class=\'glead\'><span class=\'gw\'>mir ist</span> + adjective says <b>how you feel right now</b>:</p><ul><li><span class=\'gok\'>Mir ist warm.</span> I am warm.</li><li><span class=\'gok\'>Mir ist langweilig.</span> I am bored.</li></ul><p class=\'glead\'><span class=\'gw2\'>ich habe</span> + noun says <b>what you carry</b>:</p><ul><li><span class=\'gok\'>Ich habe Glück.</span> I am lucky.</li><li><span class=\'gok\'>Ich habe Hunger.</span> I am hungry.</li><li><span class=\'gok\'>Ich habe Recht.</span> I am right.</li></ul><p class=\'gkeyline\'>Who you are takes ich bin. How you feel now takes mir ist. What you carry takes ich habe.</p><p class=\'gtopic\'>One to watch</p><p>The same word changes meaning with the frame: <span class=\'gwarn\'>Ich bin langweilig</span> describes your character, <span class=\'gok\'>Mir ist langweilig</span> describes your afternoon.</p><p class=\'gtopic\'>To say no, two words</p><ul><li><span class=\'gw\'>nicht</span> goes at the end and cancels the sentence: <b>Das verstehe ich nicht.</b></li><li><span class=\'gw\'>kein</span> goes before a noun and means <i>not a</i>: <b>Ich habe keine Zeit.</b></li></ul>', gloss:[['ich bin / du bist','I am / you are'],['er ist / sie ist','he is / she is'],['ich habe / du hast','I have / you have'],['Ich habe keine Zeit.','I have no time.'],['Das verstehe ich nicht.','I do not understand that.']]},
  extra:[
   {t:'mc', q:'How do you say „I am happy" in German?', hint:'Being happy is who you are, not something you carry.', opts:['Mir ist glücklich.','Ich bin glücklich.','Ich habe glücklich.'], a:1, why:'Who you are takes ich bin: Ich bin glücklich.'},
   {t:'mc', q:'„Ich ___ keine Zeit."', hint:'Time is not who you are. It is something you have, or in this case do not have.', opts:['bin','habe','ist'], a:1, why:'Time is something you have: ich habe keine Zeit.'},
   {t:'mc', q:'Where does „nicht" go in „Das verstehe ich ___"?', hint:'In a short German sentence it is the last word.', opts:['at the end','after ich','before das'], a:0, why:'nicht comes at the end of a short sentence.'}
  ]},
 {id:'s0g', stage:0, icon:'Wo', title:'Wo ist …?', sub:'ask · point · find your way',
  concept:'Question word first, verb second.', frame:'Wo ist …? / Ich möchte …',
  brief:{say:'Today you learn to ask. Zis is ze most useful lesson in ze whole stage.', will:'How to ask where something is, when it comes and what it costs.', needs:'Ich bin, ich habe'},
  teach:[
   {m:'hook', say:'Today is ze most useful lesson in ze whole stage. Six vords, and every door in ze country opens a little.', board:'You are lost. You need ze station.<br>Vith six vords you can ask anybody, anywhere.'},
   {m:'model', say:'Here zey are. Ze question vord comes first, and ze verb follows it immediately. Zat order never changes.', title:'die sechs Wörter', lines:[['Wo ist der Bahnhof?','Where is the station?'],['Wann kommt der Bus?','When does the bus come?'],['Wie viel kostet das?','How much does that cost?'],['Was ist das?','What is that?'],['Wer ist das?','Who is that?'],['Warum ist es zu?','Why is it closed?']], words:['wo','woist','wann','wieviel','was','wer','warum']},
   {m:'elicit', say:'A bus is leaving. You vant to know vhere it goes. Vhich one do you say?', prompt:'___ fährt der Bus?', hint:'One asks where something is standing. One asks where it is going to.', options:['Wo','Wohin','Wann'], a:1, after:'<b>Wohin</b>. Wo asks vhere somezing <i>is</i>. Wohin asks vhere it is <i>going</i>. Ask a driver <i>Wo fährt der Bus?</i> and you have asked vhere it is parked.'},
   {m:'model', say:'Two more zat do half your vork. Möchte is ze politest zing a beginner can own, and gibt es asks for anyzing at all.', title:'Ich möchte · Gibt es', lines:[['Ich möchte einen Kaffee.','I would like a coffee.'],['Gibt es hier WLAN?','Is there wifi here?'],['Entschuldigung, wo ist die Toilette?','Excuse me, where is the toilet?']], words:['moechte','gibtes','toilette','bahnhof']},
   {m:'model', say:'And ze answers you vill hear back. Learn zese four and you can follow ze pointing finger.', title:'die Richtung', lines:[['hier','here'],['dort','there'],['links, rechts','left, right'],['geradeaus','straight ahead']], words:['hier','dort','links','rechts','geradeaus']},
   {m:'recap', concept:'Question word first, verb second. Wo is where it is, wohin is where it goes.', say:'Zat is today. Six vords, and one letter zat changes ze question completely.', note:'And always open vith Entschuldigung. A bare question reads as abrupt.'}
  ],
  vocab:['woist','wo','was','wer','wann','warum','wieviel','hier','dort','links','rechts','geradeaus','moechte','gibtes','toilette','bahnhof'],
  grammar:{title:'The six words that open every door', body:'<p>Six question words, and the verb comes straight after them.</p><ul><li><span class=\'gw\'>Wo</span> where · <span class=\'gw\'>Was</span> what · <span class=\'gw\'>Wer</span> who</li><li><span class=\'gw\'>Wann</span> when · <span class=\'gw\'>Warum</span> why · <span class=\'gw\'>Wie viel</span> how much</li></ul><p class=\'gkeyline\'>Question word first, verb second. <b>Wo ist der Bahnhof?</b> <b>Wann kommt der Bus?</b></p><p>Two more that do half your work for you:</p><ul><li><span class=\'gw2\'>Ich möchte …</span> is the politest thing a beginner can own.</li><li><span class=\'gw2\'>Gibt es …?</span> asks for anything at all.</li></ul>', gloss:[['Wo ist die Toilette?','Where is the toilet?'],['Wann kommt der Bus?','When does the bus come?'],['Wie viel kostet das?','How much does that cost?'],['Ich möchte einen Kaffee.','I would like a coffee.'],['Gibt es hier WLAN?','Is there wifi here?']]},
  culture:{title:'Start with Entschuldigung', body:'Walking up and asking a bare question reads as abrupt. One word in front of it fixes that.', gloss:[["Entschuldigung, wo ist …?", "Excuse me, where is …?"]]},
  extra:[
   {t:'mc', q:'You are lost and need the station. You say:', opts:['Entschuldigung, wo ist der Bahnhof?','Der Bahnhof ist gut.','Wie viel kostet der Bahnhof?'], a:0, why:'Entschuldigung first, then Wo ist …?'},
   {t:'mc', q:'„Wie viel kostet das?" asks about …', opts:['the time','the price','the way'], a:1, why:'wie viel = how much. It is the price.'},
   {t:'mc', q:'The bus is leaving. Which question asks where it is going?', hint:'Wo asks where something is standing. One extra syllable asks where it is going.', opts:['Wo fährt der Bus?','Wohin fährt der Bus?','Wann ist der Bus?'], a:1, why:'Wohin = where to. Wo would ask where it is parked.'}
  ]},
 {id:'s0b', stage:0, icon:'12', title:'Numbers & prices', sub:'0-1000 · euros · how much?',
  concept:'German says the small number first.', frame:'Das macht … Euro …',
  brief:{say:'Numbers. Boring for five minutes, zen useful every single day.', will:'Zero to a thousand, and how prices are said out loud.', needs:null},
  teach:[
   {m:'hook', say:'Numbers are boring for five minutes and zen useful every single day. And German does one strange zing vith zem.', board:'<b>21</b> in English: twenty-one.<br><b>21</b> in German: <span class="gw">ein-und-zwanzig</span>, one-and-twenty.'},
   {m:'elicit', say:'So if einundzwanzig is one-and-twenty, have a guess. Vhat is <b>vierundzwanzig</b>?', prompt:'vierundzwanzig = ?', hint:'vier is four. zwanzig is twenty. Which comes first when you say it?', options:['42','24','4'], a:1, after:'<b>24</b>. Ze small number is said first, but it is still ze second digit. Listen for ze small number and you vill never misread a price again.'},
   {m:'model', say:'One to ten first. Zese you vill use every day, so say zem vith me.', title:'eins bis zehn', lines:[['eins, zwei, drei','one, two, three'],['vier, fünf, sechs','four, five, six'],['sieben, acht, neun, zehn','seven, eight, nine, ten']], words:['eins','zwei','drei','vier','fuenf','sechs','sieben','acht','neun','zehn']},
   {m:'trap', say:'Now two you cannot vork out, and two zat quietly lose a letter. Zese four are ze only ones you have to simply remember.', wrong:'einszehn, zweizehn', right:'elf, zwölf', note:'<b>elf</b> (11) and <b>zwölf</b> (12) follow no pattern. And vatch <b>sechzehn</b> and <b>siebzehn</b>: sechs and sieben lose a letter.', words:['elf','zwoelf','sechzehn','siebzehn']},
   {m:'model', say:'Ze big ones now. Zen prices, vhich are simply two numbers in a row.', title:'zwanzig bis tausend', lines:[['zwanzig, dreißig, vierzig','20, 30, 40'],['fünfzig, hundert, tausend','50, 100, 1000'],['drei Euro fünfzig','€3.50, said as two numbers']], words:['zwanzig','dreissig','vierzig','fuenfzig','hundert','tausend','euro','kostet']},
   {m:'recap', concept:'German says the small number first: einundzwanzig is one-and-twenty.', say:'Zat is ze whole idea. Ze small number first, and four exceptions.', note:'elf, zwölf, sechzehn, siebzehn. Everyzing else follows ze pattern.'}
  ],
  vocab:['null','eins','zwei','drei','vier','fuenf','sechs','sieben','acht','neun','zehn','elf','zwoelf','dreizehn','sechzehn','siebzehn','achtzehn','neunzehn','zwanzig','einundzwanzig','dreissig','vierzig','fuenfzig','hundert','tausend','kostet','euro'],
  grammar:{title:'The number flip', body:'<p>After twenty, German says numbers <b>backwards</b>.</p><ul><li><span class=\'gw\'>einundzwanzig</span> = one-and-twenty = <b>21</b></li><li><span class=\'gw\'>fünfundvierzig</span> = five-and-forty = <b>45</b></li></ul><p class=\'gkeyline\'>Listen for the small number first.</p><p>Two you cannot work out, and three that need care:</p><ul><li><span class=\'gw\'>elf</span> (11) and <span class=\'gw\'>zwölf</span> (12) follow no pattern at all.</li><li>From 13 the pattern returns: <b>dreizehn</b>, <b>vierzehn</b>.</li><li><span class=\'gw\'>sechzehn</span> and <span class=\'gw\'>siebzehn</span> quietly drop a letter.</li></ul><p><b>Prices</b> are said as two numbers: <b>drei Euro fünfzig</b> = €3.50.</p>', gloss:[["einundzwanzig", "one-and-twenty = 21"], ["fünfundvierzig", "five-and-forty = 45"], ["drei Euro fünfzig", "three euro fifty = €3.50"]]},
  culture:{title:'Cash is still king', body:'Many bakeries and kiosks take <b>cash only</b>. Carry coins, and look for the <i>Nur Bargeld</i> sign before you order.', gloss:[["Nur Bargeld", "cash only"], ["das Kleingeld", "small change"]]},
  extra:[
   {t:'mc', q:'"vierundzwanzig" is …', opts:['42','24','4'], a:1, why:'four-and-twenty → 24. The small number comes first!'},
   {t:'mc', q:'"Das macht sieben Euro" means:', opts:['That makes seven euros','That is seventy euros','Seven, please'], a:0, why:'"Das macht …" is how cashiers announce the total.'}
  ]},
 {id:'s0c', stage:0, icon:'Mo', title:'Time & days', sub:'days · today · the halb trap',
  concept:'German counts towards the coming hour.', frame:'um … Uhr / am Montag',
  brief:{say:'Days and times, and one trap zat catches everybody once.', will:'Days, the clock, and making an appointment.', needs:'Numbers & prices'},
  teach:[
   {m:'hook', say:'Days and times today, and one trap zat catches absolutely everybody exactly once. I vould razer it caught you here zan at a doctor.', board:'A German colleague says <b>halb sieben</b>.<br>Vhat time do you arrive?'},
   {m:'elicit', say:'Have a guess. <b>halb sieben</b>, half seven. Vhat time is it?', prompt:'halb sieben = ?', hint:'German counts towards the hour that is coming, not away from the one that has gone.', options:['7:30','6:30','7:00'], a:1, after:'<b>6:30</b>. Halfway <i>to</i> seven, not half past it. Ze hour you hear is ze one you are heading tovards.'},
   {m:'model', say:'Ze rest of ze clock is friendly. Nach is past, vor is before.', title:'die Uhr', lines:[['Viertel nach acht','quarter past eight'],['Viertel vor neun','quarter to nine'],['um zehn Uhr','at ten o clock']], words:['uhr','halb','viertelnach','viertelvor','termin']},
   {m:'model', say:'And ze days. All seven are masculine, so all seven take <b>der</b>. On a day is <b>am</b>.', title:'die Woche', lines:[['Montag, Dienstag, Mittwoch','Monday, Tuesday, Wednesday'],['Donnerstag, Freitag','Thursday, Friday'],['Samstag, Sonntag','Saturday, Sunday'],['am Montag','on Monday']], words:['montag','dienstag','mittwoch','donnerstag','freitag','samstag','sonntag','woche']},
   {m:'recap', concept:'halb sieben is 6:30. German counts towards the coming hour.', say:'One idea, and it saves you one very awkward morning.', note:'Viertel nach is past. Viertel vor is to. Days are all der, and on a day is am.'}
  ],
  vocab:['montag','dienstag','mittwoch','donnerstag','freitag','samstag','sonntag','heute','morgen','gestern','uhr','halb','viertelnach','viertelvor','termin','woche','jahr'],
  grammar:{title:'The "halb" trap ⚠️', body:'<p><span class=\'gwarn\'>halb sieben</span> is <b>not</b> 7:30. It is <span class=\'gok\'>6:30</span>, halfway <i>to</i> seven.</p><p class=\'gkeyline\'>German counts towards the coming hour, not away from the last one. This catches everybody exactly once.</p><p>The rest of the clock is friendlier:</p><ul><li><span class=\'gw\'>Viertel nach acht</span> = quarter past eight</li><li><span class=\'gw\'>Viertel vor neun</span> = quarter to nine</li><li><span class=\'gw\'>um zehn Uhr</span> = at ten o\'clock</li></ul><p><b>Days are all masculine</b>: <b>der</b> Montag. On a day is <span class=\'gw\'>am Montag</span>.</p>', gloss:[["halb sieben", "half TO seven = 6:30"], ["am Montag", "on Monday"], ["der Montag", "Monday: days are masculine"]]},
  culture:{title:'Sunday is silent', body:'Shops close on Sunday and quiet hours start at 22:00. Buy your groceries on Saturday or you will not eat.', gloss:[["Sonntagsruhe", "Sunday rest, shops closed"], ["die Ruhezeit", "quiet hours after 22:00"]]},
  extra:[
   {t:'mc', q:'"halb sieben" is what time?', opts:['7:30','6:30','7:00'], a:1, why:'Halfway to seven = 6:30. The classic trap!'},
   {t:'mc', q:'When do German shops close?', opts:['Never','On Sunday','On Monday'], a:1, why:'Sonntagsruhe, plan your shopping for Saturday.'}
  ]},
  {id:'s0e', stage:0, icon:'Du', title:'People & articles', sub:'ich · du · der die das',
  concept:'Every noun carries der, die or das, learned with the word.', frame:'der / die / das + noun',
  brief:{say:'One idea today, and everyzing else in German stands on it.', will:'Who is who, and the three little words every German noun carries.', needs:null},
  vocab:['ich','du','er','sie-she','wir','sie-formal','mann','frau','kind','art-der','art-die','art-das','art-ein','art-eine'],
  concept:'German nouns come with der, die or das, and you learn ze article with ze word.',
  teach:[
   {m:'hook', say:'A question first. In English you say <b>the</b> man, <b>the</b> woman, <b>the</b> child. One little word, always ze same. German has three. And zis is ze one zing zat separates people who sound German from people who do not.',
    board:'<b>the</b> man · <b>the</b> woman · <b>the</b> child<br><span style="color:var(--muted)">One word in English. Three in German.</span>'},

   {m:'elicit', say:'So, have a guess. You have met <b>der Mann</b> and <b>die Frau</b> already. Vhat do you zink comes before <b>Kind</b>, ze child?',
    prompt:'___ Kind', hint:'You have seen der and die. There is a third.',
    options:['der Kind','die Kind','das Kind'], a:2,
    after:'It is <b>das Kind</b>. And here is ze uncomfortable part: zere was no way to work zat out. A child is not masculine or feminine, it is simply <b>das</b>. Zat is vhy we do not guess, we learn ze article <i>with</i> ze word.'},

   {m:'reveal', words:['art-der','art-die','art-das','mann','frau','kind'], say:'So: three little words, and zey are not about male and female. Zey are just labels ze word carries, like a surname. <b>der</b>, <b>die</b>, <b>das</b>.',
    title:'der · die · das',
    lines:[['der Mann','the man','der, ze first group'],['die Frau','the woman','die, ze second group'],['das Kind','the child','das, ze third group'],['der Bahnhof','the station','a station is also der'],['die Uhr','the clock','a clock is die'],['das Haus','the house','a house is das']]},

   {m:'contrast', say:'Zis is vhy I keep saying it. Learn ze word alone and you have learned half a word. Learn it with ze article and you have ze whole zing, for ever.',
    wrong:'Tisch = table', right:'der Tisch = the table',
    note:'Every time you write a new noun, write ze article in front of it. Every time. Zis one habit saves you years, and I am not exaggerating.'},

   {m:'elicit', say:'One more guess, and zis one you <i>can</i> work out. <b>ein</b> and <b>eine</b> mean <b>a</b>. If it is <b>die Frau</b>, vhich one goes with Frau?',
    prompt:'___ Frau', hint:'die is the feminine group. The a-word takes an extra letter there.',
    options:['ein Frau','eine Frau','das Frau'], a:1,
    after:'<b>eine Frau</b>. Ze rule is small and it is real: <b>die</b> words take <b>eine</b>, and <b>der</b> and <b>das</b> words both take <b>ein</b>. So you only have to remember ze one exception, not three rules.'},

   {m:'model', words:['art-ein','art-eine'], say:'Listen to zem togezer. Ze article and ze noun are one sound, not two words.',
    title:'ein und eine',
    lines:[['ein Mann','a man','der → ein'],['eine Frau','a woman','die → eine'],['ein Kind','a child','das → ein'],['eine Woche','a week','die Woche, so eine']]},

   {m:'trap', say:'And ze trap. Do not translate <b>das</b> as <i>that</i> vhen it sits in front of a noun. In front of a noun it is simply <b>the</b>.',
    wrong:'das Kind = that child', right:'das Kind = the child',
    note:'<b>das</b> alone can mean <i>that</i>: <i>Das ist gut.</i> But <b>das Kind</b> is <i>the child</i>. Position tells you vhich.'},

   {m:'recap', concept:'German nouns carry der, die or das, and you learn ze article with ze word.',
    say:'Zat is today. One idea, and it is ze idea zat everyzing else in German stands on.',
    note:'die words take eine. der and das words take ein. Write the article every single time.'}
  ],
  grammar:{title:'du vs. Sie: the politeness switch', body:'<p>Two words for <i>you</i>, and choosing wrong is a real social error.</p><ul><li><span class=\'gw\'>du</span> for friends, family, children, and colleagues who have offered it.</li><li><span class=\'gw2\'>Sie</span> for strangers, offices, shops, doctors. <b>Always a capital S.</b></li></ul><p class=\'gkeyline\'>When unsure, use Sie. Nobody has ever been offended by too much politeness.</p><p>The forms follow: <b>ich bin</b> · <b>du bist</b> · <b>Sie sind</b>.</p><p><b>And the three little words everything else stands on.</b> Every German noun is <span class=\'gw\'>der</span>, <span class=\'gw\'>die</span> or <span class=\'gw\'>das</span>, and there is no reliable way to guess which.</p><ul><li><span class=\'gwarn\'>Never</span> learn <i>Tisch</i>.</li><li><span class=\'gok\'>Always</span> learn <b>der Tisch</b>.</li></ul><p class=\'gkeyline\'>Get this habit today and you save yourself years.</p>', gloss:[["du", "you: friends, family"], ["Sie", "you: formal, always capital S"], ["ich bin / du bist", "I am / you are"]]},
  culture:{title:'Wait to be offered the du', body:'Colleagues can use <b>Sie</b> for years. The senior person offers the <i>du</i>, and it is a small ceremony worth enjoying.', gloss:[["Wir können uns duzen.", "We can say du to each other."]]},
  extra:[
   {t:'mc', q:'You talk to an official at the Bürgeramt. You use:', opts:['du','Sie','er'], a:1, why:'Officials, strangers, shops: always Sie.'},
   {t:'mc', q:'"Ich ___ Shreya.", which fits?', opts:['bin','bist','sind'], a:0, why:'ich bin = I am.'}
  ]},
 {id:'u1', stage:1, icon:'1', title:'Ich & du', sub:'introduce yourself · W-questions',
  concept:'The verb is always the second idea.', frame:'Ich wohne in … / Wo wohnst du?',
  brief:{say:'Now you introduce yourself properly, and ask ze questions back.', will:'Introducing yourself, and the five questions that start any conversation.', needs:'Three foundation units'},
  teach:[
   {m:'hook', say:'One rule today, and it governs almost every sentence you vill ever say in German. It is not a hard rule, but it is a strict one.', board:'In German the verb has a fixed seat.<br>It is always <b>second</b>. Not second word. Second <i>idea</i>.'},
   {m:'elicit', say:'You know <b>Ich wohne in Berlin</b>. Now put <b>Jetzt</b>, now, at ze front. Vhat happens to <b>wohne</b>?', prompt:'Jetzt ___ ich in Berlin.', hint:'The verb keeps its seat. Something else has to move.', options:['wohne','wohnt','wohnen'], a:0, after:'<b>Jetzt wohne ich in Berlin.</b> Ze verb held second place, so <i>ich</i> slid behind it. Zis is vhy German vord order feels strange at first: ze verb never gives up its seat.'},
   {m:'model', say:'Say zese four aloud. Ze verb is in ze same position in every one.', title:'Verb an Position 2', lines:[['Ich wohne in Berlin.','I live in Berlin.'],['Jetzt wohne ich in Berlin.','Now I live in Berlin.'],['Heute arbeite ich nicht.','Today I am not working.'],['Wo wohnst du?','Where do you live?']], words:['wohnen','arbeiten','heissen','kommen-aus']},
   {m:'model', say:'And ze five vords zat start almost every conversation. Question vord first, verb second, same rule.', title:'die W-Fragen', lines:[['Wer bist du?','Who are you?'],['Wo wohnst du?','Where do you live?'],['Woher kommst du?','Where are you from?'],['Wie heißt du?','What is your name?']], words:['wer','wo','was','name','sprechen','sprache']},
   {m:'recap', concept:'The verb is always the second idea in the sentence.', say:'Put anyzing you like at ze front. Ze verb still holds second place.', note:'Zis one rule explains more German vord order zan any ozer.'}
  ],
  vocab:['heissen','wohnen','kommen-aus','land','stadt','sprache','sprechen','arbeiten','lernen','wiegehts','freut-mich','name','wer','wo','was'],
  grammar:{title:'Verb in position 2', body:'<p class=\'gkeyline\'>The verb is always the second idea in a German sentence. Not the second word, the second idea.</p><ul><li><b>Ich</b> <span class=\'gw\'>wohne</span> in Berlin.</li><li><b>Jetzt</b> <span class=\'gw\'>wohne</span> ich in Berlin.</li></ul><p>Put anything you like in first position; the verb still holds second, and the subject slides behind it.</p><p><b>Questions flip it</b>: <span class=\'gw\'>Wo wohnst du?</span></p><p>The W-words: <span class=\'gw\'>wer</span> who · <span class=\'gw\'>wo</span> where · <span class=\'gw\'>was</span> what · <span class=\'gw\'>wie</span> how · <span class=\'gw\'>woher</span> from where.</p>', gloss:[["Ich wohne in Berlin.", "I live in Berlin."], ["Wo wohnst du?", "Where do you live?"], ["Woher kommst du?", "Where are you from?"]]},
  culture:{title:'An honest answer', body:'<b>Wie geht\'s?</b> is not small talk here. Ask it and you may get the real answer, including the bad parts.', gloss:[["Wie geht es dir?", "How are you?"], ["Es geht.", "So-so, an honest German answer"]]},
  extra:[
   {t:'wb', q:'Say: "I live in Berlin."', sent:'Ich wohne in Berlin', distract:['wohnst','du'], why:'ich → wohne (-e ending), verb in position 2.'},
   {t:'mc', q:'"___ kommst du?" (Where are you from?)', opts:['Woher','Wer','Was'], a:0, why:'woher = from where. Wo = where (location).'},
   {t:'wb', q:'Ask: "What is your name?" (informal)', sent:'Wie heißt du', distract:['heiße','Sie'], why:'Wie heißt du?, the everyday version.'}
  ]},
 {id:'s0d', stage:1, icon:'Fa', title:'Colors & describing', sub:'red to white · big & small',
  concept:'After the noun, adjectives never change.', frame:'Das Auto ist rot.',
  brief:{say:'Now ve describe zings. Short lesson, quick vin.', will:'Colours and the words to describe what you see.', needs:'Ich & du'},
  teach:[
   {m:'hook', say:'Adjectives in German have a fearsome reputation. Today I give you ze half zat is genuinely easy, and I keep ze hard half for later.', board:'The frightening version comes <b>before</b> the noun.<br>The easy version comes <b>after</b> it, and never changes.'},
   {m:'model', say:'After ze noun, an adjective never changes its shape. Not for gender, not for number. Say it and you are correct.', title:'nach dem Nomen', lines:[['Das Auto ist rot.','The car is red.'],['Die Wohnung ist klein.','The flat is small.'],['Das Essen ist gut.','The food is good.']], words:['rot','klein','gut','gross']},
   {m:'model', say:'So learn ze colours and use zem in zat position. Zat is ze whole skill for now.', title:'die Farben', lines:[['rot, blau, grün','red, blue, green'],['gelb, schwarz, weiß','yellow, black, white'],['groß, klein, schön','big, small, beautiful']], words:['rot','blau','gruen','gelb','schwarz','weiss','schoen','schlecht']},
   {m:'recap', concept:'After the noun, adjectives never change.', say:'Put ze adjective after ze noun and you cannot get it wrong. Zat is a real shortcut, not a trick.', note:'Before ze noun zey take endings. Zat is A2. Skip it happily for now.'}
  ],
  vocab:['rot','blau','gruen','gelb','schwarz','weiss','gross','klein','gut','schlecht','schoen'],
  grammar:{title:'Adjectives, easy mode', body:'<p class=\'gkeyline\'>After the noun, adjectives never change.</p><ul><li><b>Das Auto ist</b> <span class=\'gw\'>rot</span>.</li><li><b>Die Wohnung ist</b> <span class=\'gw\'>klein</span>.</li></ul><p>That is the whole rule, and it covers most of what you need at A1.</p><p><b>Before</b> a noun they take endings, but that is A2 material. Skip it for now and say it after the noun.</p>', gloss:[["Das Auto ist rot.", "The car is red."], ["Die Wohnung ist klein.", "The flat is small."], ["sehr schön", "very beautiful"]]},
  culture:{title:'Four bins, and glass by colour', body:'Yellow is packaging, blue paper, brown organic, grey the rest. Glass goes to public containers, never on a Sunday.', gloss:[["der Müll", "the rubbish"], ["das Altglas", "used glass"]]},
  extra:[
   {t:'mc', q:'"Die Wohnung ist klein, aber schön." means:', opts:['The flat is small but beautiful','The flat is big and cheap','The kitchen is new'], a:0, why:'klein = small, schön = beautiful, aber = but.'}
  ]},
 {id:'u2', stage:1, icon:'2', title:'Familie & Freunde', sub:'my family · possessives',
  concept:'Possessives follow the gender of the thing owned.', frame:'Das ist mein … / Ich habe eine …',
  brief:{say:'Your people. And ze small word zat says vhat belongs to whom.', will:'Family, and how to say what is yours.', needs:'Ich & du'},
  teach:[
   {m:'hook', say:'Today, ze people around you. And one small vord zat behaves in a vay English speakers never expect.', board:'<b>mein</b> or <b>meine</b>?<br>It does not depend on you. It depends on <i>them</i>.'},
   {m:'elicit', say:'It is <b>die Schwester</b>, ze sister. So vhich one? <b>mein</b> or <b>meine</b>?', prompt:'___ Schwester', hint:'die words take the extra -e. Think back to eine Frau.', options:['mein Schwester','meine Schwester'], a:1, after:'<b>meine Schwester</b>. Ze ending follows ze gender of ze <i>person owned</i>, never ze owner. A man says <i>meine Schwester</i> too.'},
   {m:'model', say:'Ze rule of zumb is small: feminine and plural take ze -e. Everyzing else is bare.', title:'mein und meine', lines:[['mein Bruder','my brother, der'],['meine Schwester','my sister, die'],['mein Kind','my child, das'],['meine Eltern','my parents, plural']], words:['bruder','schwester','kind','eltern','familie']},
   {m:'recap', concept:'Possessives follow the gender of the thing owned, not the owner.', say:'Feminine and plural take ze -e. Zat is ze whole rule for now.', note:'Ze same shape vorks for dein, sein and ihr.'}
  ],
  vocab:['familie','mutter','vater','eltern','bruder','schwester','kinder','freund','freundin','mein','dein','verheiratet','zusammen-wohnen'],
  grammar:{title:'mein & dein', body:'<p>Possessives match the <b>gender</b> of the thing owned, not the owner.</p><ul><li><span class=\'gw\'>mein</span> Bruder (m.) · <span class=\'gw\'>mein</span> Kind (n.)</li><li><span class=\'gw2\'>meine</span> Schwester (f.) · <span class=\'gw2\'>meine</span> Eltern (pl.)</li></ul><p class=\'gkeyline\'>Rule of thumb: feminine and plural take the -e.</p><p>The same shape works for <b>dein</b> (your) and <b>sein</b> / <b>ihr</b> (his / her).</p>', gloss:[["mein Bruder", "my brother (m.)"], ["meine Schwester", "my sister (f.)"], ["meine Eltern", "my parents (pl.)"]]},
  culture:{title:'Kaffee und Kuchen', body:'Sunday afternoon coffee and cake is an institution. If invited, bring flowers in an odd number, never red roses.', gloss:[["der Kuchen", "the cake"], ["die Einladung", "the invitation"]]},
  extra:[
   {t:'mc', q:'"___ Schwester wohnt in München." (my)', opts:['Mein','Meine','Meinen'], a:1, why:'die Schwester is feminine → meine.'},
   {t:'wb', q:'Say: "My family lives in India."', sent:'Meine Familie wohnt in Indien', distract:['Mein','wohne'], why:'die Familie → Meine; er/sie/es-form → wohnt.'},
   {t:'mc', q:'"die Eltern" means:', opts:['the grandparents','the parents','the children'], a:1, why:'Eltern = parents (always plural).'}
  ]},
 {id:'u3', stage:1, icon:'3', title:'Essen & Trinken', sub:'order like a local',
  concept:'Only der words change after the verb: ein becomes einen.', frame:'Ich hätte gern einen …',
  brief:{say:'Ze restaurant. Zis is ze unit you vill use on Friday evening.', will:'Ordering, paying and splitting a bill.', needs:'Familie & Freunde'},
  teach:[
   {m:'hook', say:'Ze restaurant. Zis is ze unit you vill use on Friday evening, so ve do it properly.', board:'One phrase orders anything: <b>Ich hätte gern …</b><br>But one of the three genders changes after it.'},
   {m:'model', say:'Learn ze phrase as one piece. Do not take it apart, just say it. It is ze politest zing you can say in a shop or a café.', title:'Ich hätte gern', lines:[['Ich hätte gern einen Kaffee.','I would like a coffee.'],['Ich hätte gern eine Cola.','I would like a cola.'],['Ich hätte gern ein Wasser.','I would like a water.']], words:['kaffee','wasser','brot']},
   {m:'elicit', say:'Look at zose zree again. One of zem changed. <b>der Kaffee</b> became somezing else. Vhich?', prompt:'Ich hätte gern ___ Kaffee.', hint:'die and das did not change. Only one gender does.', options:['ein','eine','einen'], a:2, after:'<b>einen</b>. Only <b>der</b> vords change after a verb like zis. <i>die</i> keeps eine, <i>das</i> keeps ein. So zere is one zing to remember, not zree.'},
   {m:'trap', say:'Zis is ze accusative, and at A1 it touches exactly one gender. Do not let anybody frighten you vith ze vord.', wrong:'Ich hätte gern ein Kaffee.', right:'Ich hätte gern einen Kaffee.', note:'<b>der</b> becomes <b>den</b>, and <b>ein</b> becomes <b>einen</b>. Nozing else moves.'},
   {m:'recap', concept:'Only der words change after the verb: ein becomes einen.', say:'One phrase, one change. Zat is ze whole Unit 3 skill.', note:'Zusammen oder getrennt? comes next, and zat one is culture, not grammar.'}
  ],
  vocab:['kaffee','tee','wasser','brot','broetchen','kaese','apfel','essen','trinken','bestellen','bezahlen','rechnung','trinkgeld','haette-gern','getrennt','lecker','speisekarte'],
  grammar:{title:'„Ich hätte gern …" + einen', body:'<p><span class=\'gw\'>Ich hätte gern …</span> is the politest way to order anything, and it is worth learning as one whole piece.</p><p><b>Masculine nouns change after it.</b> This is the accusative, and at A1 it affects only <i>der</i> words:</p><ul><li><b>der</b> Kaffee → Ich hätte gern <span class=\'gw\'>einen</span> Kaffee.</li><li><b>die</b> Cola → Ich hätte gern <span class=\'gok\'>eine</span> Cola. <i>(no change)</i></li><li><b>das</b> Wasser → Ich hätte gern <span class=\'gok\'>ein</span> Wasser. <i>(no change)</i></li></ul><p class=\'gkeyline\'>Only der words take einen. That is the whole Unit 3 skill.</p>', gloss:[["Ich hätte gern einen Kaffee.", "I would like a coffee."], ["einen", "a: masculine, accusative"], ["eine Cola / ein Wasser", "a cola / a water"]]},
  culture:{title:'Zusammen oder getrennt?', body:'The waiter will ask whether you are paying together or separately. Splitting is completely normal, and you tip by saying the rounded-up total out loud.', gloss:[["Zusammen oder getrennt?", "Together or separate?"], ["Stimmt so!", "Keep the change!"]]},
  extra:[
   {t:'mc', q:'Polite order: "Ich hätte gern ___ Kaffee."', opts:['ein','einen','eine'], a:1, why:'der Kaffee → accusative einen. The A1 classic!'},
   {t:'wb', q:'Ask for the bill.', sent:'Die Rechnung bitte', distract:['Der','Trinkgeld'], why:'die Rechnung, bitte!, short and perfectly polite.'},
   {t:'mc', q:'"Zusammen oder getrennt?", the waiter asks:', opts:['Cash or card?','Together or separate?','Here or to go?'], a:1, why:'Splitting the bill is totally normal in Germany.'},
   {t:'wb', q:'Order: "I would like a tea, please."', sent:'Ich hätte gern einen Tee bitte', distract:['habe','eine'], why:'der Tee → einen. hätte gern = would like.'}
  ]},
 {id:'u5', stage:1, icon:'4', title:'Mein Tag', sub:'routine · time before place', planned:true, locked:true,
  concept:'When both appear, time comes before place.', frame:'Um acht Uhr fahre ich zur Arbeit.', trapNote:'Not: Ich fahre zur Arbeit um acht.',
  brief:{say:'', will:'When both appear, time comes before place.', needs:'Essen & Trinken'}, vocab:[]},
 {id:'u6', stage:1, icon:'5', title:'Meine Wohnung', sub:'rooms · es gibt · where things are', planned:true, locked:true,
  concept:'es gibt says what exists, and it always takes the accusative.', frame:'In der Küche gibt es einen Tisch.', trapNote:'es gibt never changes to es geben.',
  brief:{say:'', will:'es gibt says what exists, and it always takes the accusative.', needs:'Mein Tag'}, vocab:[]},
 {id:'u7', stage:1, icon:'6', title:'Ich mag, ich möchte', sub:'likes · wishes · gern', planned:true, locked:true,
  concept:'gern turns any verb into liking to do it.', frame:'Ich trinke gern Kaffee.', trapNote:'möchte has no -t in er/sie: er möchte.',
  brief:{say:'', will:'gern turns any verb into liking to do it.', needs:'Meine Wohnung'}, vocab:[]},
 {id:'u8', stage:2, icon:'7', title:'Einkaufen', sub:'markets · quantities · Pfand', planned:true, locked:true,
  concept:'Quantities go straight before the noun with no word for of.', frame:'Ich nehme zwei Kilo Äpfel.', trapNote:'Not: zwei Kilo von Äpfeln.',
  brief:{say:'', will:'Quantities go straight before the noun with no word for of.', needs:'Ich mag, ich möchte'}, vocab:[]},
 {id:'u9', stage:2, icon:'8', title:'Unterwegs', sub:'tickets · platforms · missed buses', planned:true, locked:true,
  concept:'Transport takes mit plus a fixed form: mit dem Bus.', frame:'Ich fahre mit dem Bus nach …', trapNote:'nach for towns, zu for people and places.',
  brief:{say:'', will:'Transport takes mit plus a fixed form: mit dem Bus.', needs:'Einkaufen'}, vocab:[]},
 {id:'u10', stage:2, icon:'9', title:'Beim Arzt', sub:'what hurts · appointments', planned:true, locked:true,
  concept:'Pain is reported with tut weh, not with I have pain.', frame:'Mein Rücken tut weh.', trapNote:'Mir tut der Kopf weh, not ich habe Kopf.',
  brief:{say:'', will:'Pain is reported with tut weh, not with I have pain.', needs:'Unterwegs'}, vocab:[]},
 {id:'u11', stage:2, icon:'10', title:'Wohnung suchen', sub:'viewings · contracts · deposits', planned:true, locked:true,
  concept:'Ich suche and Ich brauche open almost every request.', frame:'Ich suche eine Wohnung mit …', trapNote:'die Kaution is the deposit, not the rent.',
  brief:{say:'', will:'Ich suche and Ich brauche open almost every request.', needs:'Beim Arzt'}, vocab:[]},
 {id:'u12', stage:2, icon:'11', title:'Auf dem Amt', sub:'Anmeldung · forms · appointments', planned:true, locked:true,
  concept:'Offices run on Sie, and on one fixed request.', frame:'Ich möchte einen Termin, bitte.', trapNote:'Never du at a counter.',
  brief:{say:'', will:'Offices run on Sie, and on one fixed request.', needs:'Wohnung suchen'}, vocab:[]},
 {id:'u13', stage:2, icon:'12', title:'Am Telefon', sub:'calls · spelling your name', planned:true, locked:true,
  concept:'On the phone you spell with names, not letters.', frame:'Können Sie das bitte wiederholen?', trapNote:'Say your surname letter by letter, slowly.',
  brief:{say:'', will:'On the phone you spell with names, not letters.', needs:'Auf dem Amt'}, vocab:[]},
 {id:'u14', stage:2, icon:'13', title:'Post & Nachbarn', sub:'deliveries · Hausordnung · noise', planned:true, locked:true,
  concept:'Für takes the accusative, and neighbours use it constantly.', frame:'Das Paket ist für Frau Weber.', trapNote:'Ruhezeit is a rule, not a suggestion.',
  brief:{say:'', will:'Für takes the accusative, and neighbours use it constantly.', needs:'Am Telefon'}, vocab:[]},
 {id:'u15', stage:2, icon:'14', title:'Ein Problem melden', sub:'complaints · repairs · politeness', planned:true, locked:true,
  concept:'Könnten Sie is the polite lever for every complaint.', frame:'Die Heizung funktioniert nicht.', trapNote:'A direct complaint is normal here, not rude.',
  brief:{say:'', will:'Könnten Sie is the polite lever for every complaint.', needs:'Post & Nachbarn'}, vocab:[]},
 {id:'u16', stage:3, icon:'15', title:'Gestern', sub:'the past with haben', planned:true, locked:true,
  concept:'The past is built with haben plus a participle at the end.', frame:'Ich habe Brot gekauft.', trapNote:'The participle waits at the end of the sentence.',
  brief:{say:'', will:'The past is built with haben plus a participle at the end.', needs:'Ein Problem melden'}, vocab:[]},
 {id:'u17', stage:3, icon:'16', title:'Gestern, Teil 2', sub:'the past with sein', planned:true, locked:true,
  concept:'Verbs of movement and change take sein, not haben.', frame:'Ich bin nach Berlin gefahren.', trapNote:'gehen, fahren, kommen, sein and bleiben all take sein.',
  brief:{say:'', will:'Verbs of movement and change take sein, not haben.', needs:'Gestern'}, vocab:[]},
 {id:'u18', stage:3, icon:'17', title:'Erzähl mir', sub:'irregular participles · telling a story', planned:true, locked:true,
  concept:'Strong verbs change their vowel in the participle.', frame:'Ich habe das Buch gelesen.', trapNote:'gelesen, geschrieben, gesprochen: learn them as words.',
  brief:{say:'', will:'Strong verbs change their vowel in the participle.', needs:'Gestern, Teil 2'}, vocab:[]},
 {id:'u19', stage:3, icon:'18', title:'Morgen', sub:'plans · the present as future', planned:true, locked:true,
  concept:'German uses the present tense for the future, plus a time word.', frame:'Morgen fahre ich nach Hamburg.', trapNote:'You rarely need werden at A1.',
  brief:{say:'', will:'German uses the present tense for the future, plus a time word.', needs:'Erzähl mir'}, vocab:[]},
 {id:'u20', stage:3, icon:'19', title:'Warum? Weil …', sub:'reasons · the verb goes last', planned:true, locked:true,
  concept:'After weil, the verb moves to the very end.', frame:'Ich bleibe zu Hause, weil ich müde bin.', trapNote:'weil sends the verb last; denn does not.',
  brief:{say:'', will:'After weil, the verb moves to the very end.', needs:'Morgen'}, vocab:[]},
 {id:'u21', stage:3, icon:'20', title:'Vergleichen', sub:'bigger, better, best', planned:true, locked:true,
  concept:'Comparison adds -er and joins with als.', frame:'Berlin ist größer als Bonn.', trapNote:'gut becomes besser, not guter.',
  brief:{say:'', will:'Comparison adds -er and joins with als.', needs:'Warum? Weil …'}, vocab:[]},
 {id:'e1', stage:4, icon:'H', title:'Hören', sub:'the listening paper', planned:true, locked:true,
  concept:'A1 listening is heard twice, and the question comes first.', frame:'', trapNote:'Read the question before the audio starts.',
  brief:{say:'', will:'A1 listening is heard twice, and the question comes first.', needs:'Vergleichen'}, vocab:[]},
 {id:'e2', stage:4, icon:'L', title:'Lesen & Schreiben', sub:'reading · the short message', planned:true, locked:true,
  concept:'The written task is 30-40 words with three given points.', frame:'', trapNote:'Answer all three points or you lose the marks.',
  brief:{say:'', will:'The written task is 30-40 words with three given points.', needs:'Hören'}, vocab:[]},
 {id:'e3', stage:4, icon:'S', title:'Sprechen', sub:'the speaking parts', planned:true, locked:true,
  concept:'Speaking has three parts: introduce, ask, request.', frame:'', trapNote:'You may ask the examiner to repeat.',
  brief:{say:'', will:'Speaking has three parts: introduce, ask, request.', needs:'Lesen & Schreiben'}, vocab:[]},
 {id:'e4', stage:4, icon:'A1', title:'Modelltest', sub:'three full mocks under time', planned:true, locked:true,
  concept:'The real exam is not modular: all four parts in one sitting.', frame:'', trapNote:'60% is the real pass mark.',
  brief:{say:'', will:'The real exam is not modular: all four parts in one sitting.', needs:'Sprechen'}, vocab:[]}
];

/* ================= STORIES ================= */
const STORIES = [
 {id:'st1', title:'Eine neue Stadt', level:'A1', needs:'u1',
  text:[["Amira","wohnt","seit","zwei","Monaten","in","Leipzig.","Am","Samstag","geht","sie","zum","Markt.","Sie","kauft","Brot,","Käse","und","Äpfel.","Der","Verkäufer","sagt:","„Das","macht","acht","Euro","fünfzig."],
        ["Danach","trinkt","sie","einen","Kaffee","und","schreibt","eine","Postkarte","an","ihre","Familie."]],
  gloss:{'wohnt':'lives','seit':'since/for','Monaten':'months','Markt.':'market','kauft':'buys','Verkäufer':'seller','macht':'makes (costs)','Danach':'afterwards','trinkt':'drinks','schreibt':'writes','Postkarte':'postcard'},
  qs:[
   {q:'Was kauft Amira auf dem Markt?', opts:['Brot, Käse und Äpfel','Kaffee und Kuchen','Eine Postkarte'], a:0, why:'"Sie kauft Brot, Käse und Äpfel.", sentence 3.'},
   {q:'Wie viel bezahlt sie?', opts:['€5,80','€8,50','€18,50'], a:1, why:'"acht Euro fünfzig" = 8.50.'},
   {q:'Was macht sie danach?', opts:['Sie geht nach Hause','Sie trinkt einen Kaffee','Sie kauft mehr Brot'], a:1, why:'"Danach trinkt sie einen Kaffee …"'}]},
 {id:'st2', title:'Der erste Arbeitstag', level:'A1', needs:'u2',
  text:[["Heute","ist","Montag,","Bens","erster","Arbeitstag","in","Hamburg.","Er","ist","nervös.","Um","neun","Uhr","sagt","seine","Kollegin:","„Hallo,","ich","bin","Lena.","Freut","mich!“"],
        ["Mittags","essen","sie","zusammen.","Ben","spricht","langsam","Deutsch,","aber","Lena","versteht","alles.","Sie","sagt:","„Dein","Deutsch","ist","gut!“"]],
  gloss:{'erster':'first','Arbeitstag':'workday','nervös':'nervous','Kollegin':'colleague (f.)','Mittags':'at noon','zusammen.':'together','langsam':'slowly','versteht':'understands','alles.':'everything'},
  qs:[
   {q:'Wo arbeitet Ben jetzt?', opts:['In Leipzig','In Hamburg','In Berlin'], a:1, why:'"…erster Arbeitstag in Hamburg."'},
   {q:'Wer ist Lena?', opts:['Bens Schwester','Bens Kollegin','Bens Lehrerin'], a:1, why:'"seine Kollegin", his colleague.'},
   {q:'Wie spricht Ben Deutsch?', opts:['schnell','langsam','laut'], a:1, why:'"Ben spricht langsam Deutsch", and that\'s perfectly fine!'}]}
];

/* ================= SCENARIOS ================= */
const SCENARIOS = [
 {id:'sc1', title:'Beim Bäcker', sub:'Buy your breakfast', needs:'s0b', place:'A bakery, 8:00 am. The queue is behind you…',
  start:'n1', nodes:{
   n1:{npc:['Guten Morgen! Was darf es sein?','Good morning! What can I get you?'], choices:[
     {de:'Zwei Brötchen, bitte.',en:'Two rolls, please.',good:1,next:'n2'},
     {de:'Hallo. Äh… das da, bitte.',en:'Hello. Uh… that one, please.',good:0,next:'n2',react:['Die Brötchen? Zwei Stück?','The rolls? Two of them?']},
     {de:'Wie bitte?',en:'Pardon?',good:0,next:'n1',react:['Was darf es sein? Was möchten Sie?','What would you like? (slower)']}]},
   n2:{npc:['Gern! Sonst noch etwas?','Sure! Anything else?'], choices:[
     {de:'Nein, danke. Das ist alles.',en:'No thanks, that\'s all.',good:1,next:'n3'},
     {de:'Ja, ein Brot bitte.',en:'Yes, one bread please.',good:1,next:'n3'}]},
   n3:{npc:['Das macht drei Euro zwanzig.','That comes to €3.20.'], choices:[
     {de:'Hier, bitte. Danke schön!',en:'Here you go. Thanks!',good:1,next:'end'},
     {de:'Wie viel? Können Sie das langsamer sagen?',en:'How much? Slower please?',good:1,next:'n3b',react:['Drei Euro zwanzig. 3,20 €.','Three euros twenty. (Asking to repeat is a WIN, not a fail!)']}]},
   n3b:{npc:['Drei Euro zwanzig, bitte.','Three twenty, please.'], choices:[
     {de:'Ah, danke! Hier bitte.',en:'Ah thanks! Here you go.',good:1,next:'end'}]},
   end:{npc:['Danke, schönen Tag noch!','Thanks, have a nice day!'], done:true, win:'You bought breakfast in German. The queue is impressed (silently, this is Germany).'}}},
 {id:'sc2', title:'Im Restaurant', sub:'Order & pay like a local', needs:'u3', place:'A cosy restaurant. The waiter approaches…',
  start:'n1', nodes:{
   n1:{npc:['Guten Abend! Möchten Sie bestellen?','Good evening! Would you like to order?'], choices:[
     {de:'Ja. Ich hätte gern einen Kaffee.',en:'Yes, I\'d like a coffee.',good:1,next:'n2'},
     {de:'Die Speisekarte, bitte.',en:'The menu, please.',good:1,next:'n1b'},
     {de:'Ich habe gern ein Kaffee.',en:'(small grammar slip)',good:0,next:'n2',react:['Einen Kaffee? Gern!','A coffee? Sure! (They understood, hätte gern + einen next time!)']}]},
   n1b:{npc:['Natürlich, hier bitte. Und zu trinken?','Of course. And to drink?'], choices:[
     {de:'Ein Wasser, bitte.',en:'A water, please.',good:1,next:'n2'}]},
   n2:{npc:['Kommt sofort! … Hat es geschmeckt?','Coming right up! … (later) Did you enjoy it?'], choices:[
     {de:'Ja, sehr lecker! Ich möchte bezahlen, bitte.',en:'Very tasty! I\'d like to pay.',good:1,next:'n3'},
     {de:'Die Rechnung, bitte.',en:'The bill, please.',good:1,next:'n3'}]},
   n3:{npc:['Gern. Zusammen oder getrennt?','Sure. Together or separate?'], choices:[
     {de:'Zusammen, bitte.',en:'Together, please.',good:1,next:'n4'},
     {de:'Getrennt, bitte.',en:'Separate, please.',good:1,next:'n4'}]},
   n4:{npc:['Das macht acht Euro vierzig.','That\'s €8.40.'], choices:[
     {de:'Neun Euro, bitte. Stimmt so!',en:'Nine euros, keep the change!',good:1,next:'end',react:['Oh, danke schön!','Oh, thank you!']},
     {de:'Hier bitte.',en:'Here you go.',good:1,next:'end'}]},
   end:{npc:['Vielen Dank, schönen Abend!','Many thanks, lovely evening!'], done:true, win:'Ordered, ate, paid, tipped, the full restaurant loop in German. „Stimmt so" is the smoothest tip move there is.'}}},
 {id:'sc3', title:'Der verpasste Bus', sub:'Stranded at 21:40', needs:'u3', place:'A bus stop at night. A local waits nearby…',
  start:'n1', nodes:{
   n1:{npc:['Ach, der 21:30 ist schon weg. Das war der letzte heute.','Oh, the 9:30 already left. That was the last one today.'], choices:[
     {de:'Wie bitte? Der letzte Bus?!',en:'Pardon? The LAST bus?!',good:1,next:'n2'},
     {de:'Ich verstehe nicht. Langsamer, bitte?',en:'I don\'t understand. Slower?',good:1,next:'n1b'}]},
   n1b:{npc:['Der letzte Bus ist weg. Kein Bus mehr heute.','The last bus is gone. No more buses today.'], choices:[
     {de:'Ach nein! Was kann ich machen?',en:'Oh no! What can I do?',good:1,next:'n2'}]},
   n2:{npc:['Ja, leider. Aber es gibt ein Anruf-Sammeltaxi. Soll ich Ihnen die Nummer geben?','Sadly yes. But there\'s a shared call-taxi. Want the number?'], choices:[
     {de:'Ja, bitte! Das wäre sehr nett.',en:'Yes please! That would be very kind.',good:1,next:'n3'},
     {de:'Nein danke, ich laufe.',en:'No thanks, I\'ll walk.',good:0,next:'n2b',react:['Zu Fuß? Das sind zwölf Kilometer!','On foot? That\'s 12 km!']}]},
   n2b:{npc:['Wirklich? Das ist sehr weit…','Really? That\'s very far…'], choices:[
     {de:'Okay… die Nummer, bitte!',en:'Okay… the number please!',good:1,next:'n3'}]},
   n3:{npc:['Hier: 0800 22 33 44. Sagen Sie einfach, wo Sie sind.','Here: 0800-223344. Just say where you are.'], choices:[
     {de:'Danke schön! Sie haben mir sehr geholfen.',en:'Thank you! You helped me a lot.',good:1,next:'end'}]},
   end:{npc:['Gern geschehen! Gute Fahrt nach Hause!','You\'re welcome! Safe trip home!'], done:true, win:'Stranded at night, solved entirely in German, repair phrases, a question, a thank-you. This is exactly what A1 is FOR.'}}}
];

/* ================= CULTURE CARDS ================= */
const CULTURE = [
 {t:'Knock, don\'t clap', b:'Students knock on tables after a lecture instead of clapping. If you hear knuckle-drumming, that\'s applause!'},
 {t:'Pfand: bottles are money', b:'Plastic bottles carry €0.25 deposit (Pfand). Return them at supermarket machines. Leaving bottles NEXT to bins is a kindness for collectors.'},
 {t:'The Termin universe', b:'Germany runs on appointments (Termine). Bürgeramt, doctor, even some shops. Book early, arrive 5 minutes before, punctuality is respect.'},
 {t:'Anmeldung first!', b:'Within 14 days of moving you must register your address (Anmeldung) at the Bürgeramt. You\'ll need it for everything: bank, SIM, contracts.'},
 {t:'Apotheke ≠ Drogerie', b:'Medicine (even aspirin) comes from the Apotheke (pharmacy). The Drogerie (dm, Rossmann) is for shampoo & vitamins. Red "A" sign = Apotheke.'},
 {t:'Feierabend is sacred', b:'After work = Feierabend, and it\'s protected. Calls after hours are unusual. "Schönen Feierabend!" is a lovely thing to wish colleagues at 5pm.'}
];

/* ================= MOCK TEST (mini A1) ================= */
const MOCKTEST = {
 hoeren:[
  {tts:'Der Zug nach Berlin fährt um vierzehn Uhr dreißig.', q:'When does the train to Berlin leave?', opts:['14:30','13:30','4:30'], a:0},
  {tts:'Das macht zusammen sieben Euro achtzig.', q:'How much is the total?', opts:['€17.80','€7.80','€8.70'], a:1},
  {tts:'Die Praxis ist am Freitag geschlossen.', q:'True or false: The doctor\'s office is closed on Friday.', opts:['Richtig (true)','Falsch (false)'], a:0},
  {tts:'Herr Schmidt, bitte kommen Sie am Montag um neun Uhr.', q:'When is Mr Schmidt\'s appointment?', opts:['Monday 9:00','Monday 19:00','Sunday 9:00'], a:0},
  {tts:'Heute gibt es Brötchen im Angebot, nur fünfzig Cent.', q:'What is on offer today?', opts:['Bread rolls','Coffee','Apples'], a:0}],
 lesen:[
  {text:'„Liebe Nachbarn, am Samstag feiern wir ab 18 Uhr im Garten. Es gibt Essen und Musik. Kommen Sie gern vorbei!, Familie Yilmaz"',
   qs:[{q:'What happens on Saturday?', opts:['A garden party','A garage sale','Construction work'], a:0},
       {q:'When does it start?', opts:['8:00','18:00','16:00'], a:1}]},
  {text:'SCHILD: „Praxis Dr. Weber, Sprechzeiten: Mo-Do 8-12 und 14-17 Uhr, Fr 8-12 Uhr. Bitte klingeln."',
   qs:[{q:'Can you see the doctor Friday afternoon?', opts:['Yes','No'], a:1},
       {q:'What should you do at the door?', opts:['Knock','Ring the bell','Wait silently'], a:1},
       {q:'"Sprechzeiten" means:', opts:['Opening/consultation hours','Waiting room','Prices'], a:0}]}],
 schreiben:{
  task:'Write to your friend Lena (30-40 words): you are coming to Berlin on Saturday.',
  points:['Say when you arrive','Ask if you can stay at her place','Ask how to get there from the station'],
  model:'Liebe Lena,\nich komme am Samstag nach Berlin! Mein Zug kommt um 15 Uhr an. Kann ich bei dir schlafen? Und wie komme ich vom Bahnhof zu dir?\nViele Grüße\nShreya',
  checklist:['Greeting (Liebe/Lieber …) and closing (Viele Grüße)','All 3 points covered','About 30-40 words','Verbs in position 2']},
 sprechen:{
  intro:'Part 1 of the real exam: introduce yourself using these cards. Say it OUT LOUD, record yourself with your phone if you can.',
  cards:['Name?','Land?','Wohnort? (where you live)','Sprachen?','Beruf?','Hobby?'],
  model:'Ich heiße … / Ich komme aus … / Ich wohne in … / Ich spreche … und ein bisschen Deutsch. / Ich arbeite als … / Mein Hobby ist …'}
};

/* interesting facts Vaani shares at lecture start */
const FACTS = [
 'German and English are sister languages, they share the same roots, so you already know hundreds of German words: Haus, Ball, Winter, Hand!',
 'German loves building giant words like Handschuh, a glove is literally a hand-shoe. Once you see the pieces, long words stop being scary.',
 'German is the most spoken native language in Europe, over 100 million people. After this course you can greet every one of them.',
 'Every German noun gets a capital letter, the only major language that still does this. It makes reading easier: the nouns wave at you!',
 'The letter ß exists in no other language in the world. You are learning something truly unique today.'
];


/* ================= COURSES =================
   VOCAB, UNITS and STAGES stay the single globals the whole app reads, and
   loadCourse() swaps their CONTENTS when the language changes. That keeps
   every existing reference working: nothing else in the app has to know that
   more than one language exists.
   ========================================== */
const COURSES = {
  de: {vocab: Object.assign({}, VOCAB), units: UNITS.slice(), stages: STAGES.slice(),
       stories: STORIES.slice(), scenarios: SCENARIOS.slice(), culture: CULTURE.slice(),
       mock: MOCKTEST, exam: {name:'Goethe A1', real:'Start Deutsch 1', pass:60,
         modules:[['Hören','~20 min','pictures, true/false, key details'],
                  ['Lesen','25 min','signs, notices, short texts'],
                  ['Schreiben','20 min','form + 30-40-word message'],
                  ['Sprechen','15 min','introduce yourself, Q&A, requests']]},
       skillNames: {reading:'Lesen · Reading', listening:'Hören & Diktat',
                    writing:'Schreiben · Writing', speaking:'Sprechen · Speaking'},
       source: 'vocabulary sourced from the official Goethe A1 Wortliste',
       /* German schools count backwards: 1 is best, 6 worst. */
       grades: {note:'Note', best:1, legend:'German schools count backwards: <b>1</b> is the best mark, <b>6</b> the worst.',
         scale:[[92,1,'sehr gut','very good'],[81,2,'gut','good'],[67,3,'befriedigend','satisfactory'],
                [50,4,'ausreichend','sufficient'],[30,5,'mangelhaft','weak'],[0,6,'ungen\u00fcgend','not yet']]},
       voice: 'de-DE', native: 'Deutsch', slug: 'german',
       greet: ['Guten Morgen', 'Hallo', 'Guten Abend'],
       gogo: 'Los geht\u2019s!',
       /* The gender game reads this and nothing else. A rule only ever
          appears next to a noun it is actually true of, so an over-broad
          pattern can never teach the wrong thing. */
       genders: {name:'der, die, das', sub:'Sort your own nouns by gender, 12 rounds',
         buckets:['der','die','das'],
         hint:'Learn every noun WITH its article, never on its own. A noun learned bare is learned wrong.',
         allRight:'Gender is the hardest thing in German and you just took twelve of them without a miss.',
         rules:[
           ['ung$','die','Every noun ending in -ung is die. That one is safe to rely on.'],
           ['(heit|keit|schaft)$','die','-heit, -keit and -schaft are always die.'],
           ['(ion|t\u00e4t|ie)$','die','-ion, -t\u00e4t and -ie are die, and they are usually the same word in English.'],
           ['(chen|lein)$','das','A diminutive is das, whatever the original noun was. Das M\u00e4dchen is the famous one.'],
           ['tag$','der','Days, months and seasons are all der.'],
           ['e$','die','Most nouns ending in -e are die. Not all, but it is the right guess.'],
           ['^Ge','das','Many Ge- nouns are das.']]}}
};

function loadCourse(lang){
  const c = COURSES[lang] || COURSES.de;
  Object.keys(VOCAB).forEach(k => delete VOCAB[k]);
  Object.assign(VOCAB, c.vocab);
  UNITS.length     = 0; UNITS.push(...c.units);
  STAGES.length    = 0; STAGES.push(...c.stages);
  STORIES.length   = 0; STORIES.push(...(c.stories || []));
  SCENARIOS.length = 0; SCENARIOS.push(...(c.scenarios || []));
  CULTURE.length   = 0; CULTURE.push(...(c.culture || []));
  return c;
}
/* ---- which courses are actually offered -------------------------------
   Three courses are authored. One is shipped. That is a product decision,
   not a technical one: a finished German course sells better than three
   unfinished languages, and every parked pack stays compiled in, tested
   and one line away from returning.

   To ship Dutch: add 'nl' here. Nothing else changes.
   To see a parked course without shipping it: open the app with ?langs=all
   That is how tests/t-dutch.mjs and tests/t-mandarin.mjs reach them.       */
const LIVE_LANGS = ['de'];
function langPreview(){
  try { return /(^|[?&])langs=all(&|$)/.test(location.search); } catch(e){ return false; }
}
function langLive(id){
  return LIVE_LANGS.indexOf(id) >= 0 || (!!COURSES[id] && langPreview());
}
function courseLang(){
  const l = S && S.lang;
  return (COURSES[l] && langLive(l)) ? l : 'de';
}
function course(){ return COURSES[courseLang()] || COURSES.de; }
function courseVoiceLang(){ return course().voice; }
/* the greeting the learner sees on Home, in the language being learned */
/* A course only offers a tab when it has the content behind it. Showing a
   German exam inside the Dutch course is worse than showing no exam. */
function hasMock(){ return !!(course().mock && course().exam); }
function hasScenes(){ return SCENARIOS.length > 0; }
function hasStories(){ return STORIES.length > 0; }
function courseGreet(){
  const h = new Date().getHours(), g = course().greet || COURSES.de.greet;
  return h < 11 ? g[0] : h < 18 ? g[1] : g[2];
}
