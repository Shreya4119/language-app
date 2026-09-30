/* =========================================================================
   SPRAK · NEDERLANDS · STAGE 0
   A0 to A1 foundation, authored in the same shape as content.js.

   Teacher: Sanne (TEACHERS.nl).
   Her English is written plainly, with NO phonetic accent spelling.
   Dutch words are spelled correctly and always spoken by a nl-NL voice.

   Unit ids are n0a .. n0g so they never collide with the German s0* ids.

   REQUIRED WIRING (see NOTES.md):
     1. speak() must use lang 'nl-NL' and a Dutch voice when S.lang === 'nl'
     2. VOCAB / UNITS must be selected by S.lang
     3. TEACHERS.nl needs a real hello + blurb (given at the bottom of this file)
   ========================================================================= */

/* Loaded after content.js. Everything below runs inside an IIFE with its own
   VOCAB and its own W(), so the German pack is untouched. The target-language
   field is still called `de` because every renderer in the app reads v.de. */
var NL_VOCAB = {}, NL_UNITS = [], NL_STAGES = [], SANNE = null;
(function(){
  const VOCAB = NL_VOCAB;
  function W(id, nl, en, ex){ VOCAB[id] = {id, de:nl, en, ex}; }

/* ============================== VOCABULARY ==============================
   W(id, nl, en, [example, exampleEnglish])
   Nouns ALWAYS carry their article. That is the whole discipline in Dutch.
   ====================================================================== */

/* ---- greetings and the social minimum ---- */
W('hallo','hallo','hello',['Hallo, ik ben Sanne.','Hello, I am Sanne.']);
W('hoi','hoi','hi (informal)',['Hoi! Alles goed?','Hi! All good?']);
W('goedemorgen','goedemorgen','good morning');
W('goedemiddag','goedemiddag','good afternoon');
W('goedenavond','goedenavond','good evening');
W('dag','dag','hello / bye (neutral)',['Dag mevrouw!','Hello madam!']);
W('totziens','tot ziens','goodbye (formal)');
W('doei','doei','bye (informal)');
W('totmorgen','tot morgen','see you tomorrow');
W('alsjeblieft','alsjeblieft','please / here you are (informal)');
W('alstublieft','alstublieft','please / here you are (formal)');
W('dankjewel','dank je wel','thank you (informal)');
W('dankuwel','dank u wel','thank you (formal)');
W('sorry','sorry','sorry');
W('pardon','pardon','excuse me');
W('ja','ja','yes');
W('nee','nee','no');
W('misschien','misschien','maybe');
W('goed','goed','good / well',['Alles goed?','Everything good?']);

/* ---- people and pronouns ---- */
W('ik','ik','I');
W('jij','jij','you (informal)');
W('u','u','you (formal)');
W('hij','hij','he');
W('zijzij','zij','she / they');
W('wij','wij','we');
W('jullie','jullie','you (plural)');
W('demanl','de man','the man');
W('devrouw','de vrouw','the woman');
W('hetkind','het kind','the child');
W('demensen','de mensen','the people');
W('devriend','de vriend','the friend (m.)');
W('devriendin','de vriendin','the friend (f.)');

/* ---- zijn, to be ---- */
W('zijn','zijn','to be',['Ik wil hier zijn.','I want to be here.']);
W('zijn-ben','ik ben','I am',['Ik ben Shreya.','I am Shreya.']);
W('zijn-bent','jij bent','you are',['Jij bent nieuw hier.','You are new here.']);
W('zijn-is','hij is / zij is','he is / she is',['Zij is arts.','She is a doctor.']);
W('zijn-zijn','wij zijn','we are',['Wij zijn nieuw hier.','We are new here.']);

/* ---- hebben, to have ---- */
W('hebben','hebben','to have',['Ik wil tijd hebben.','I want to have time.']);
W('hebben-heb','ik heb','I have',['Ik heb tijd.','I have time.']);
W('hebben-hebt','jij hebt','you have',['Jij hebt gelijk.','You are right.']);
W('hebben-heeft','hij heeft / zij heeft','he has / she has',['Hij heeft een afspraak.','He has an appointment.']);
W('hebben-hebben','wij hebben','we have',['Wij hebben honger.','We are hungry.']);

/* ---- the words that let you say no and join ideas ---- */
W('niet','niet','not',['Ik begrijp het niet.','I do not understand it.']);
W('geen','geen','no / not a',['Ik heb geen tijd.','I have no time.']);
W('en','en','and');
W('of','of','or');
W('maar','maar','but',['Klein, maar mooi.','Small, but beautiful.']);
W('ook','ook','also / too');
W('want','want','because');

/* ---- introducing yourself ---- */
W('heten','heten','to be called',['Ik heet Shreya.','My name is Shreya.']);
W('komen','komen','to come',['Ik kom uit India.','I come from India.']);
W('wonen','wonen','to live',['Ik woon in Amsterdam.','I live in Amsterdam.']);
W('spreken','spreken','to speak',['Ik spreek Engels.','I speak English.']);
W('leren','leren','to learn',['Ik leer Nederlands.','I am learning Dutch.']);
W('denaam','de naam','the name');
W('hetjaar','het jaar','the year');
W('oud','oud','old',['Ik ben zevenentwintig jaar oud.','I am twenty-seven years old.']);
W('nederlands','Nederlands','Dutch (the language)');
W('engels','Engels','English');
W('hetland','het land','the country');
W('destad','de stad','the city');

/* ---- de or het: the nouns you meet first ---- */
W('hethuis','het huis','the house');
W('destraat','de straat','the street');
W('detijd','de tijd','the time');
W('hetgeld','het geld','the money');
W('hetwater','het water','the water');
W('hetbrood','het brood','the bread');
W('dekaas','de kaas','the cheese');
W('dekoffie','de koffie','the coffee');
W('dethee','de thee','the tea');
W('dewinkel','de winkel','the shop');
W('hetstation','het station','the station');
W('detrein','de trein','the train');
W('defiets','de fiets','the bicycle',['Ik ga met de fiets.','I go by bicycle.']);
W('deschool','de school','the school');
W('hetwerk','het werk','the work');
W('dedeur','de deur','the door');
W('hetboek','het boek','the book');
W('detafel','de tafel','the table');
W('hetbroodje','het broodje','the bread roll (little bread)');
W('hetmeisje','het meisje','the girl (little maid)');
W('hetkopje','het kopje','the little cup');

/* ---- numbers ---- */
W('een','een','one'); W('twee','twee','two'); W('drie','drie','three');
W('vier','vier','four'); W('vijf','vijf','five'); W('zes','zes','six');
W('zeven','zeven','seven'); W('acht','acht','eight'); W('negen','negen','nine');
W('tien','tien','ten'); W('elf','elf','eleven'); W('twaalf','twaalf','twelve');
W('dertien','dertien','thirteen'); W('veertien','veertien','fourteen');
W('twintig','twintig','twenty');
W('eenentwintig','eenentwintig','twenty-one (one-and-twenty)');
W('dertig','dertig','thirty'); W('veertig','veertig','forty'); W('vijftig','vijftig','fifty');
W('honderd','honderd','hundred'); W('duizend','duizend','thousand');
W('euro','euro','euro');
W('kosten','kosten','to cost',['Wat kost dat?','What does that cost?']);
W('hetnummer','het nummer','the number');

/* ---- time and days ---- */
W('hetuur','het uur','the hour / o’clock',['Het is drie uur.','It is three o’clock.']);
W('half','half','half',['half drie','half past two']);
W('kwart','kwart','quarter');
W('vandaag','vandaag','today');
W('morgen','morgen','tomorrow / morning');
W('gisteren','gisteren','yesterday');
W('nu','nu','now');
W('maandag','maandag','Monday'); W('dinsdag','dinsdag','Tuesday');
W('woensdag','woensdag','Wednesday'); W('donderdag','donderdag','Thursday');
W('vrijdag','vrijdag','Friday'); W('zaterdag','zaterdag','Saturday');
W('zondag','zondag','Sunday');
W('deweek','de week','the week');
W('dedag','de dag','the day');

/* ---- asking, and the answers you get back ---- */
W('wat','wat','what'); W('wie','wie','who'); W('waar','waar','where');
W('wanneer','wanneer','when'); W('waarom','waarom','why'); W('hoe','hoe','how');
W('hoeveel','hoeveel','how much / how many');
W('waaris','waar is','where is',['Waar is het station?','Where is the station?']);
W('willengraag','ik wil graag','I would like',['Ik wil graag koffie.','I would like coffee.']);
W('ishierr','is er','is there',['Is er hier wifi?','Is there wifi here?']);
W('hier','hier','here'); W('daar','daar','there');
W('links','links','left'); W('rechts','rechts','right');
W('rechtdoor','rechtdoor','straight ahead');
W('hettoilet','het toilet','the toilet');

/* ---- regular verbs you can already use ---- */
W('werken','werken','to work',['Ik werk in een winkel.','I work in a shop.']);
W('gaan','gaan','to go',['Ik ga naar huis.','I go home.']);
W('doen','doen','to do',['Wat doe jij?','What do you do?']);
W('eten','eten','to eat'); W('drinken','drinken','to drink');
W('willen','willen','to want'); W('kunnen','kunnen','to be able to');
W('begrijpen','begrijpen','to understand',['Ik begrijp het niet.','I do not understand it.']);


/* ---- plurals and diminutives ---- */
W('dekrant','de krant','the newspaper',['Ik lees de krant.','I read the newspaper.']);
W('destoel','de stoel','the chair');
W('deauto','de auto','the car');
W('defoto','de foto','the photo');
W('hetraam','het raam','the window');
W('dehond','de hond','the dog');
W('dekat','de kat','the cat');
W('deboom','de boom','the tree');
W('dearm','de arm','the arm');
W('hetmomentje','het momentje','just a moment',['Een momentje!','One moment!']);
W('hetbiertje','het biertje','a beer (friendly form)',['Twee biertjes, alsjeblieft.','Two beers, please.']);

/* ---- the counter, the doctor, the paperwork ---- */
W('degemeente','de gemeente','the municipality, the town hall',['Ik ga naar de gemeente.','I am going to the town hall.']);
W('deafspraak','de afspraak','the appointment',['Ik heb een afspraak.','I have an appointment.']);
W('hetformulier','het formulier','the form');
W('dehuisarts','de huisarts','the family doctor',['Ik heb een afspraak bij de huisarts.','I have an appointment at the doctor.']);
W('hetbsn','het BSN','the citizen service number');
W('inschrijven','inschrijven','to register',['Ik wil me inschrijven.','I want to register.']);
W('invullen','invullen','to fill in',['Kunt u dit invullen?','Can you fill this in?']);
W('deverzekering','de verzekering','the insurance');
W('hetpaspoort','het paspoort','the passport');
W('debrief','de brief','the letter');
W('hetloket','het loket','the counter, the desk');
W('wachten','wachten','to wait',['Wacht u even, alstublieft.','Please wait a moment.']);
W('hetnummertje','het nummertje','the queue ticket',['Neem een nummertje.','Take a ticket.']);
W('deapotheek','de apotheek','the pharmacy');
W('herhalen','herhalen','to repeat',['Kunt u dat herhalen?','Can you repeat that?']);
W('langzaam','langzaam','slow',['Kunt u langzamer praten?','Can you speak more slowly?']);
W('eenbeetje','een beetje','a little',['Ik spreek een beetje Nederlands.','I speak a little Dutch.']);


/* ================================ UNITS ================================ */
NL_UNITS = [

/* ---------------------------------------------------------------- n0a --- */
{id:'n0a', stage:0, icon:'Aa', title:'Klanken en het alfabet', sub:'six sounds · greetings · 27 letters',
 practice:'alphabet',
 concept:'Dutch is spelled as it sounds, once you own six sounds English does not have.',
 frame:'Hallo! Dank je wel.',
 brief:{say:'Before any words, six sounds. Get these right now and you will never sound like a tourist.',
        will:'The six Dutch sounds English does not have, the greetings you will use daily, and all twenty-seven letters.',
        needs:null},
 teach:[
  {m:'hook', say:'Dutch spelling is honest. Every letter is pronounced, and it is always pronounced the same way. The catch is six sounds that do not exist in English at all.',
   board:'English speakers do not fail Dutch on grammar.<br>They fail it on <span class="gw">six sounds</span>. So we start there.'},

  {m:'model', say:'Listen first, do not read. I will say each one twice. Copy the shape of my mouth, not the spelling.',
   title:'de zes klanken', readEx:true,
   lines:[
    ['g / ch','a scrape at the back of the throat','goedemorgen','good morning'],
    ['ui','no English equivalent at all','het huis','the house'],
    ['eu','lips rounded, tongue forward','de deur','the door'],
    ['ij / ei','the same sound, two spellings','vijf','five'],
    ['oe','like English "oo" in food','de moeder','the mother'],
    ['uu','say "ee" with rounded lips','het uur','the hour']],
   words:[]},

  {m:'elicit', say:'Here is the one that catches everybody. <b>ij</b> and <b>ei</b>. Have a guess: how do they sound?',
   prompt:'vijf and klein. The ij and the ei sound …',
   hint:'Dutch children have to learn which spelling to use, which tells you something.',
   options:['completely different','exactly the same','only different in the south'],
   a:1,
   after:'<b>Exactly the same.</b> Dutch children learn them as <i>lange ij</i> and <i>korte ei</i> only so they can spell. Your ears cannot tell them apart, and neither can a native speaker.'},

  {m:'trap', say:'Now the sound everybody dreads. The Dutch <b>g</b>. Do not try to make it soft, and do not turn it into an English g.',
   wrong:'goedemorgen with an English "g"',
   right:'goedemorgen with a scrape',
   note:'It is the sound of clearing your throat gently. In the north it is harsh, in the south it is softer. <b>Both are correct.</b> Pick one and stay there.',
   words:['goedemorgen']},

  {m:'model', say:'Now the words. These eight carry every first encounter you will have, at a shop, a door, an office.',
   title:'de groeten', readEx:true,
   lines:[
    ['hallo','hello','Hallo, ik ben Sanne.','Hello, I am Sanne.'],
    ['goedemorgen','good morning','Goedemorgen mevrouw.','Good morning madam.'],
    ['dag','hello and also bye','Dag!','Hello! / Bye!'],
    ['tot ziens','goodbye','Tot ziens en bedankt.','Goodbye and thanks.'],
    ['alsjeblieft','please, and here you are','Alsjeblieft, je koffie.','Here you are, your coffee.'],
    ['dank je wel','thank you','Dank je wel!','Thank you!']],
   words:['hallo','goedemorgen','dag','totziens','alsjeblieft','dankjewel','doei','sorry']},

  {m:'contrast', say:'One thing to get right from day one. Dutch has two levels of politeness, and using the wrong one is the fastest way to sound rude.',
   wrong:'Dank je wel, meneer de directeur',
   right:'Dank u wel, meneer de directeur',
   note:'<b>je</b> is for friends, family, anybody your age or younger. <b>u</b> is for strangers, officials, older people, and anybody behind a desk. When in doubt, use <b>u</b>. Nobody has ever been offended by too much respect.'},

  {m:'recap', say:'That is today. Six sounds and eight words, and you can already open and close a conversation politely.',
   concept:'Dutch is spelled as it sounds. Learn the six sounds once and you can read anything.',
   note:'Say the six sounds out loud again tonight. Sounds fossilise fast, and the first week decides how you will sound in a year.'}
 ],
 vocab:['hallo','hoi','goedemorgen','goedemiddag','goedenavond','dag','totziens','doei','alsjeblieft','alstublieft','dankjewel','dankuwel','sorry','pardon','ja','nee','misschien','goed'],
 grammar:{title:'De zes klanken',
  body:'<p>Dutch spelling is regular. Learn the sounds once and you can pronounce any word you read.</p>'
   +'<ul>'
   +'<li><span class=\'gw\'>g</span> and <span class=\'gw\'>ch</span> are the same scraping sound. <b>goed</b>, <b>acht</b>.</li>'
   +'<li><span class=\'gw\'>ij</span> and <span class=\'gw\'>ei</span> are also the same sound, two spellings. <b>vijf</b>, <b>klein</b>.</li>'
   +'<li><span class=\'gw\'>ui</span> has no English equivalent. <b>het huis</b>.</li>'
   +'<li><span class=\'gw\'>oe</span> is English "oo". <b>de moeder</b>.</li>'
   +'<li><span class=\'gw\'>uu</span> is "ee" with rounded lips. <b>het uur</b>.</li>'
   +'</ul>'
   +'<p class=\'gkeyline\'>Every letter is pronounced, and always the same way. There are no silent letters to trip over.</p>'
   +'<p class=\'gtopic\'>je or u</p>'
   +'<p>Dutch has two words for "you" and choosing wrongly is the one social mistake beginners actually make.</p>'
   +'<ul>'
   +'<li><span class=\'gok\'>jij / je / jouw</span> for friends, family, peers, children.</li>'
   +'<li><span class=\'gok\'>u / uw</span> for strangers, officials, older people, anyone at a counter.</li>'
   +'</ul>'
   +'<p class=\'gkeyline\'>When in doubt, use <b>u</b>. Nobody is offended by too much respect.</p>',
  gloss:[['de g','a scrape at the back of the throat'],['ij = ei','same sound, two spellings'],['dank je wel','thank you, informal'],['dank u wel','thank you, formal']]},
 culture:{title:'Dutch directness is not rudeness',
  body:'Say <b>Ik kom niet</b> rather than a polite yes you do not mean. A soft no is read here as a yes, and the diary is already written.'},
 extra:[
  {t:'mc', q:'How do "ij" and "ei" sound?', hint:'Dutch children only learn the difference in order to spell.', opts:['Completely different','Exactly the same','Only in Belgium'], a:1, why:'Same sound, two spellings.'},
  {t:'mc', q:'You are thanking an official behind a desk. You say:', hint:'A desk means distance, and distance means the formal form.', opts:['Dank je wel','Dank u wel','Doei'], a:1, why:'Strangers and officials take u.'},
  {t:'mc', q:'„Alsjeblieft" means:', opts:['Only please','Only here you are','Both please and here you are'], a:2, why:'One word, both jobs.'}
 ]},

/* ---------------------------------------------------------------- n0b --- */
{id:'n0b', stage:0, icon:'ik', title:'Wie ben jij?', sub:'your introduction · build it, then say it',
 practice:'intro',
 concept:'Six sentences introduce you for the rest of your life in this country.',
 frame:'Ik heet … Ik kom uit …',
 brief:{say:'Today you build something you will use every week for years. Your own introduction.',
        will:'Your name, age, country, city and languages in Dutch, written on the board and then read aloud.',
        needs:'Klanken en groeten'},
 teach:[
  {m:'hook', say:'In your first month here you will introduce yourself more times than in the last five years. At the town hall, at the doctor, at the door of a class. Let us make it automatic.',
   board:'Six sentences. Learn them once.<br>Use them for the rest of your life here.'},

  {m:'model', say:'Here is the whole introduction. Notice the verb sits in second place in every single line. That is not a coincidence, it is the main rule of Dutch.',
   title:'mijn introductie', readEx:true,
   lines:[
    ['Ik heet …','My name is …','Ik heet Shreya.','My name is Shreya.'],
    ['Ik ben … jaar oud.','I am … years old.','Ik ben zevenentwintig jaar oud.','I am twenty-seven years old.'],
    ['Ik kom uit …','I come from …','Ik kom uit India.','I come from India.'],
    ['Ik woon in …','I live in …','Ik woon in Amsterdam.','I live in Amsterdam.'],
    ['Ik spreek …','I speak …','Ik spreek Engels.','I speak English.'],
    ['Ik leer Nederlands.','I am learning Dutch.','Ik leer nu Nederlands.','I am learning Dutch now.']],
   words:['heten','komen','wonen','spreken','leren','oud','hetjaar']},

  {m:'elicit', say:'Look at those six lines again and find the pattern. Where does the verb sit?',
   prompt:'In every Dutch statement, the verb is …',
   hint:'Count the words before the verb in each line.',
   options:['first','second','last'],
   a:1,
   after:'<b>Second. Always.</b> Not second word necessarily, but second <i>position</i>. Say <i>Nu leer ik Nederlands</i> and the verb still sits second, so <b>ik</b> gets pushed behind it. This one rule explains most Dutch word order.'},

  {m:'contrast', say:'Here is that rule doing real work. When you start a sentence with something else, the subject moves behind the verb.',
   wrong:'Nu ik leer Nederlands.',
   right:'Nu leer ik Nederlands.',
   note:'Start with <b>nu</b>, and <b>leer</b> still has to be second, so <b>ik</b> jumps behind it. English does not do this, and it is the mistake every English speaker makes for the first month.'},

  {m:'model', say:'And the questions you will hear back, so you recognise them when they come at you fast.',
   title:'de vragen', readEx:true,
   lines:[
    ['Hoe heet jij?','What is your name?','Hoe heet jij?','What is your name?'],
    ['Waar kom jij vandaan?','Where do you come from?','Waar kom jij vandaan?','Where do you come from?'],
    ['Waar woon jij?','Where do you live?','Waar woon jij?','Where do you live?'],
    ['Spreek jij Engels?','Do you speak English?','Spreek jij Engels?','Do you speak English?']],
   words:['hoe','waar','jij','ik']},

  {m:'trap', say:'One small thing that will make you sound like you have been here a while. When <b>jij</b> moves behind the verb, the verb drops its ending.',
   wrong:'Werkt jij?  ·  Woont jij hier?',
   right:'Werk jij?  ·  Woon jij hier?',
   note:'<b>jij werkt</b> keeps the t. Turn it around and the t goes: <b>werk jij?</b> Only with <b>jij</b> or <b>je</b>, and only when it follows the verb. With <b>u</b> nothing changes: <span class="gok">Werkt u hier?</span> keeps its t.',
   words:['werken','wonen']},

  {m:'contrast', say:'And one thing Dutch simply does not do, which will save you a lot of wasted words. There is no "do" in a Dutch question, and no separate form for "I am doing".',
   wrong:'Doe jij wonen in Amsterdam?',
   right:'Woon jij in Amsterdam?',
   note:'<b>Ik schrijf een brief</b> covers <i>I write</i>, <i>I am writing</i>, <i>I will write</i> and <i>I do write</i>. One Dutch form, four English ones. A question just swaps the verb and the subject, with no helper word at all.'},

  {m:'recap', say:'You can now introduce yourself, and you know the rule that governs almost every Dutch sentence.',
   concept:'The verb sits in second position. Start with something else and the subject moves behind it.',
   note:'Write your six lines by hand tonight, with your real name and your real city. Say them out loud as you write.'}
 ],
 vocab:['ik','jij','u','hij','zijzij','wij','jullie','heten','komen','wonen','spreken','leren','denaam','hetjaar','oud','nederlands','engels','hetland','destad','devriend','devriendin'],
 grammar:{title:'De werkwoordsvolgorde',
  body:'<p>One rule carries most of Dutch word order.</p>'
   +'<p class=\'gkeyline\'>The verb goes in <b>second position</b>. Not second word, second position.</p>'
   +'<ul>'
   +'<li><span class=\'gok\'>Ik leer Nederlands.</span> Subject first, verb second.</li>'
   +'<li><span class=\'gok\'>Nu leer ik Nederlands.</span> Something else first, so the subject moves behind the verb.</li>'
   +'<li><span class=\'gwarn\'>Nu ik leer Nederlands.</span> Wrong, and the commonest English-speaker error.</li>'
   +'</ul>'
   +'<p class=\'gtopic\'>The jij rule</p>'
   +'<p>When <b>jij</b> follows the verb, the verb loses its <b>-t</b>.</p>'
   +'<ul>'
   +'<li><span class=\'gok\'>jij werkt</span> becomes <span class=\'gok\'>werk jij?</span></li>'
   +'<li><span class=\'gok\'>jij woont</span> becomes <span class=\'gok\'>woon jij?</span></li>'
   +'</ul>'
   +'<p>This happens only with <b>jij</b>, and only when it comes after the verb.</p>',
  gloss:[['Ik heet …','My name is …'],['Ik kom uit …','I come from …'],['Ik woon in …','I live in …'],['Waar kom jij vandaan?','Where are you from?']]},
 culture:{title:'They will answer in English',
  body:'Dutch people switch to English the moment they hear an accent. Say <b>Mag ik het in het Nederlands proberen?</b> and almost all of them will happily switch back.'},
 extra:[
  {t:'mc', q:'„Nu ___ ik Nederlands."', hint:'The sentence starts with nu, so the verb must still come second.', opts:['leer','ik leer','leren'], a:0, why:'Verb second: Nu leer ik Nederlands.'},
  {t:'wb', q:'Say: I come from India', sent:'Ik kom uit India', distract:['ben','van'], why:'komen uit, to come from.'},
  {t:'mc', q:'„jij werkt" becomes a question as:', hint:'Something is lost when jij moves behind the verb.', opts:['Werkt jij?','Werk jij?','Jij werkt?'], a:1, why:'The -t drops when jij follows the verb.'}
 ]},

/* ---------------------------------------------------------------- n0c --- */
{id:'n0c', stage:0, icon:'ben', title:'Ik ben, ik heb', sub:'zijn · hebben · niet and geen',
 concept:'zijn and hebben carry most Dutch sentences, and two small words cancel them.',
 frame:'Ik ben … / Ik heb …',
 brief:{say:'Two verbs today. Learn these and a surprising amount of Dutch opens up.',
        will:'zijn and hebben in full, and the two ways to say no.',
        needs:'Wie ben jij?'},
 teach:[
  {m:'hook', say:'Every language has two verbs that do more work than all the others together. In Dutch they are <b>zijn</b> and <b>hebben</b>. To be, and to have.',
   board:'<span class="gw">zijn</span> = to be<br><span class="gw2">hebben</span> = to have<br><br>Seven forms, and you can say who you are and what you have.'},

  {m:'model', say:'<b>zijn</b> first. Listen to the pattern, then read it aloud with me.',
   title:'zijn · to be', readEx:true,
   after:['ik ben','jij bent','hij is','wij zijn'],
   lines:[
    ['ik ben','I am','Ik ben Shreya.','I am Shreya.'],
    ['jij bent','you are','Jij bent nieuw hier.','You are new here.'],
    ['hij is / zij is','he is / she is','Zij is arts.','She is a doctor.'],
    ['wij zijn','we are','Wij zijn hier.','We are here.'],
    ['u bent','you are (formal)','Bent u meneer Klein?','Are you Mr Klein?']],
   words:['zijn','zijn-ben','zijn-bent','zijn-is','zijn-zijn']},

  {m:'model', say:'Now let us learn how to say <b>have</b>. Same idea, and one form worth watching.',
   title:'hebben · to have', readEx:true,
   after:['ik heb','jij hebt','hij heeft','wij hebben'],
   lines:[
    ['ik heb','I have','Ik heb tijd.','I have time.'],
    ['jij hebt','you have','Jij hebt gelijk.','You are right.'],
    ['hij heeft / zij heeft','he has / she has','Hij heeft een afspraak.','He has an appointment.'],
    ['wij hebben','we have','Wij hebben honger.','We are hungry.']],
   words:['hebben','hebben-heb','hebben-hebt','hebben-heeft','hebben-hebben']},

  {m:'trap', say:'And there is the one to watch. <b>heeft</b> grows a letter that the others do not have.',
   wrong:'hij hebt',
   right:'hij heeft',
   note:'<b>heb</b>, <b>hebt</b>, <b>hebben</b> all keep the b. Only <b>heeft</b> stretches out. With <b>u</b> both <i>u hebt</i> and <i>u heeft</i> are correct and both are common.'},

  {m:'elicit', say:'Now the two ways to say no. Have a guess before I explain. Which one goes with a noun?',
   prompt:'Ik heb ___ tijd.  (I have no time)',
   hint:'One of them cancels a whole sentence. The other cancels a thing.',
   options:['niet','geen','nee'],
   a:1,
   after:'<b>geen</b>. It cancels a <i>noun</i>: geen tijd, geen geld, geen idee. <b>niet</b> cancels everything else and usually sits at the end: <i>Ik begrijp het niet.</i>'},

  {m:'contrast', say:'Get this pair right and you will sound careful rather than clumsy.',
   wrong:'Ik heb niet tijd.',
   right:'Ik heb geen tijd.',
   note:'Before a bare noun, always <b>geen</b>. Everywhere else <b>niet</b>, which sits at the end unless a describing word or a place is there, in which case it goes in front of that.',
   words:['niet','geen']},

  {m:'model', say:'Last, three small words that join everything you have learned today. Nothing changes after them.',
   title:'en · of · maar', readEx:true,
   lines:[
    ['brood en kaas','bread and cheese','Ik wil brood en kaas.','I want bread and cheese.'],
    ['thee of koffie?','tea or coffee?','Thee of koffie?','Tea or coffee?'],
    ['Klein, maar mooi.','Small, but beautiful.','Klein, maar mooi.','Small, but beautiful.'],
    ['Ik heb tijd, maar geen geld.','I have time, but no money.','Ik heb tijd, maar geen geld.','I have time, but no money.']],
   words:['en','of','maar','ook']},

  {m:'recap', say:'Say that last line out loud once more. That is a real Dutch sentence, built by you, using everything from today.',
   concept:'geen cancels a noun. niet cancels everything else.',
   note:'zijn and hebben are irregular in every language worth learning. These seven forms are worth writing out by hand tonight.'}
 ],
 vocab:['zijn','zijn-ben','zijn-bent','zijn-is','zijn-zijn','hebben','hebben-heb','hebben-hebt','hebben-heeft','hebben-hebben','niet','geen','en','of','maar','ook','want','begrijpen'],
 grammar:{title:'zijn, hebben, niet en geen',
  body:'<p>Two verbs carry more Dutch than all the others together.</p>'
   +'<ul>'
   +'<li><span class=\'gw\'>zijn</span> = to be: <b>ik ben</b>, <b>jij bent</b>, <b>hij/zij is</b>, <b>wij/jullie/zij zijn</b></li>'
   +'<li><span class=\'gw2\'>hebben</span> = to have: <b>ik heb</b>, <b>jij hebt</b>, <b>hij/zij heeft</b>, <b>wij hebben</b></li>'
   +'</ul>'
   +'<p class=\'gkeyline\'>Learn these seven forms and you can already say who you are, where you are and what you have.</p>'
   +'<p class=\'gtopic\'>Two ways to say no</p>'
   +'<ul>'
   +'<li><span class=\'gw\'>geen</span> cancels a <b>noun</b>: <span class=\'gok\'>Ik heb geen tijd.</span> <span class=\'gok\'>Ik heb geen geld.</span></li>'
   +'<li><span class=\'gw\'>niet</span> cancels <b>everything else</b>: <span class=\'gok\'>Ik begrijp het niet.</span></li>'
   +'</ul>'
   +'<p class=\'gtopic\'>Where niet goes</p>'
   +'<p>It goes at the end, but only when nothing else is waiting there. It steps in <b>front</b> of a describing word or a place.</p>'
   +'<ul>'
   +'<li><span class=\'gok\'>Ik begrijp het niet.</span> Nothing follows, so niet is last.</li>'
   +'<li><span class=\'gok\'>De bloemen zijn niet mooi.</span> In front of the describing word.</li>'
   +'<li><span class=\'gok\'>Wij gaan vandaag niet naar de stad.</span> In front of the place.</li>'
   +'</ul>'
   +'<p class=\'gkeyline\'>Before a bare noun it is always <b>geen</b>, never <b>niet</b>.</p>'
   +'<p class=\'gtopic\'>One to watch</p>'
   +'<p><span class=\'gwarn\'>hij hebt</span> is wrong. It is <span class=\'gok\'>hij heeft</span>, the only irregular form in the set.</p>',
  gloss:[['ik ben / jij bent','I am / you are'],['hij heeft','he has'],['Ik heb geen tijd.','I have no time.'],['Ik begrijp het niet.','I do not understand it.']]},
 culture:{title:'Everything runs on an afspraak',
  body:'Even visiting family needs an <b>afspraak</b>. „Ik heb geen tijd" usually means the diary is full, not that you are being refused.'},
 extra:[
  {t:'mc', q:'„Ik heb ___ tijd."', hint:'Time is a noun, and it has no article here.', opts:['niet','geen','nee'], a:1, why:'A bare noun takes geen.'},
  {t:'mc', q:'„Hij ___ een afspraak."', hint:'This is the one irregular form in the set.', opts:['hebt','heeft','heb'], a:1, why:'hij heeft, the only stretched form.'},
  {t:'mc', q:'Where does „niet" go in „Ik begrijp het ___"?', hint:'In a short Dutch sentence it is the last word.', opts:['at the end','after ik','before het'], a:0, why:'niet comes at the end of a short sentence.'}
 ]},

/* ---------------------------------------------------------------- n0d --- */
{id:'n0d', stage:0, icon:'de', title:'de of het',  sub:'the two articles · plurals · -je',
 concept:'Every Dutch noun is a de-word or a het-word, and you must learn it with the noun.',
 frame:'de man, het huis',
 brief:{say:'Today, the thing Dutch learners complain about most. I will not pretend it is logical, but I can make it manageable.',
        will:'de and het, how plurals work, and the one ending that is always het.',
        needs:'Ik ben, ik heb'},
 teach:[
  {m:'hook', say:'Good news and bad news. The good news: Dutch has two articles, not three like German, and no cases at all. The bad news: there is almost no rule for which is which.',
   board:'German: <span class="gwarn">der, die, das</span> plus four cases.<br>Dutch: <span class="gok">de, het</span> and no cases at all.<br><br>You have already had the harder version.'},

  {m:'elicit', say:'Before I tell you anything, have a guess. Of all Dutch nouns, how many take <b>de</b>?',
   prompt:'Roughly what share of Dutch nouns are de-words?',
   hint:'It is more than half, but not as lopsided as you might hope.',
   options:['about a third','about half','about two thirds'],
   a:2,
   after:'<b>About two thirds.</b> Which gives you a genuinely useful strategy: when you have no idea, say <b>de</b>. You will be right more often than not, and you will be understood either way.'},

  {m:'model', say:'Here are the ones you meet in your first week. Learn the article as part of the word, never the word alone.',
   title:'de en het', readEx:true,
   lines:[
    ['de man','the man','Daar is de man.','There is the man.'],
    ['de vrouw','the woman','Daar is de vrouw.','There is the woman.'],
    ['het kind','the child','Het kind is klein.','The child is small.'],
    ['het huis','the house','Het huis is groot.','The house is big.'],
    ['de straat','the street','De straat is lang.','The street is long.'],
    ['het water','the water','Het water is koud.','The water is cold.']],
   words:['demanl','devrouw','hetkind','hethuis','destraat','hetwater']},

  {m:'reveal', say:'Now three rules that actually hold. These are worth more than any word list.',
   title:'de drie regels',
   lines:[
    ['Alle meervouden zijn de','All plurals are de','de huizen, de kinderen'],
    ['Alle verkleinwoorden zijn het','All diminutives are het','het broodje, het kopje'],
    ['Bij twijfel: de','When in doubt: de','driekwart is de']],
   words:[]},

  {m:'trap', say:'And here is where it bites. The same word changes article when it becomes plural or small.',
   wrong:'de huis  ·  de broodje',
   right:'het huis → de huizen  ·  het broodje',
   note:'<b>het huis</b> singular, but <b>de huizen</b> plural, because every plural takes de. And <b>het broodje</b> is het because it ends in <b>-je</b>, even though <b>het brood</b> is already het.',
   words:['hetbroodje','hetmeisje','hetkopje']},

  {m:'model', say:'The little <b>-je</b> is everywhere in Dutch, and it is not only about size. It softens things, makes them friendly.',
   title:'het verkleinwoord', readEx:true,
   lines:[
    ['het broodje','the bread roll','Een broodje kaas, alstublieft.','A cheese roll, please.'],
    ['het kopje','the little cup','Een kopje koffie?','A cup of coffee?'],
    ['het meisje','the girl','Het meisje leest.','The girl is reading.'],
    ['even een momentje','just a moment','Een momentje!','One moment!']],
   words:['hetbroodje','hetkopje','hetmeisje']},

  {m:'recap', say:'You cannot reason your way to the right article. You can only meet each noun enough times. So meet them with the article attached.',
   concept:'Learn de or het as part of the word. Never write the noun alone.',
   note:'All plurals are de. All -je words are het. When in doubt, de.'}
 ],
 vocab:['demanl','devrouw','hetkind','hethuis','destraat','detijd','hetgeld','hetwater','hetbrood','dekaas','dekoffie','dethee','dewinkel','hetstation','detrein','defiets','deschool','hetwerk','dedeur','hetboek','detafel','hetbroodje','hetmeisje','hetkopje','demensen'],
 grammar:{title:'de of het',
  body:'<p>Every Dutch noun belongs to one of two groups, and there is very little logic to which.</p>'
   +'<ul>'
   +'<li><span class=\'gw\'>de</span> covers roughly <b>two thirds</b> of all nouns. This is the common gender, and it takes every plural.</li>'
   +'<li><span class=\'gw2\'>het</span> covers the remaining third. This is the neuter gender.</li>'
   +'</ul>'
   +'<p class=\'gkeyline\'>Always learn the article with the noun. Writing <b>huis</b> without <b>het</b> is learning it wrong.</p>'
   +'<p class=\'gtopic\'>Three rules that always hold</p>'
   +'<ul>'
   +'<li><span class=\'gok\'>Every plural is de.</span> het huis becomes <b>de huizen</b>.</li>'
   +'<li><span class=\'gok\'>Every -je word is het.</span> het broodje, het kopje, het meisje.</li>'
   +'<li><span class=\'gok\'>When in doubt, say de.</span> You will be right about two times in three.</li>'
   +'</ul>'
   +'<p class=\'gtopic\'>The good news</p>'
   +'<p>Dutch has <b>no case system</b>. The article never changes for grammatical role, unlike German. <b>de man</b> stays <b>de man</b> whether he is the subject or the object.</p>',
  gloss:[['de man / het huis','the man / the house'],['de huizen','the houses, plural is always de'],['het broodje','the bread roll, -je is always het'],['Bij twijfel: de','When in doubt: de']]},
 culture:{title:'A broodje is lunch',
  body:'Dutch lunch is genuinely a bread roll, eaten at the desk, often at exactly twelve. Hot lunch is not a normal working-day thing.'},
 extra:[
  {t:'mc', q:'The plural of „het huis" takes which article?', hint:'One of the three rules covers every plural without exception.', opts:['het','de','neither'], a:1, why:'Every plural is de: de huizen.'},
  {t:'mc', q:'„___ broodje kaas, alstublieft."', hint:'Look at the ending of the noun.', opts:['De','Het','Een de'], a:1, why:'-je words are always het.'},
  {t:'mc', q:'You do not know the article for a new noun. Best guess:', hint:'Two out of three.', opts:['het','de','leave it out'], a:1, why:'About two thirds of nouns are de-words.'}
 ]},

/* ---------------------------------------------------------------- n0e --- */
{id:'n0e', stage:0, icon:'-en', title:'Meervoud en verkleinwoord', sub:'plurals · the little -je',
 concept:'Dutch has two plural endings and one ending that makes everything friendly.',
 frame:'de krant, de kranten',
 brief:{say:'Two endings for more than one, and one ending the Dutch attach to almost anything.',
        will:'How to make any noun plural, and what the little -je is really doing.',
        needs:'de of het'},
 teach:[
  {m:'hook', say:'You have the articles. Now you need more than one of things, and Dutch has only two endings to choose between. After German that is a short list.',
   board:'Two plural endings: <span class="gw">-en</span> and <span class="gw2">-s</span>.<br>And every plural takes <b>de</b>, whatever the singular was.'},

  {m:'model', say:'The default is <b>-en</b>. When you have no reason to think otherwise, use it.',
   title:'het meervoud op -en', readEx:true,
   after:['de kranten','de huizen','de boeken'],
   lines:[
    ['de krant → de kranten','the newspaper → the newspapers','Ik lees twee kranten.','I read two newspapers.'],
    ['het huis → de huizen','the house → the houses','De huizen zijn klein.','The houses are small.'],
    ['het boek → de boeken','the book → the books','De boeken zijn nieuw.','The books are new.']],
   words:['dekrant','hethuis','hetboek']},

  {m:'elicit', say:'Now have a guess. <b>de tafel</b>, the table. Which ending does it take?',
   prompt:'de tafel → ?',
   hint:'Say both out loud. One of them is a mouthful.',
   options:['de tafelen','de tafels','de tafelden'],
   a:1,
   after:'<b>de tafels.</b> Words already ending in an unstressed <b>-el</b>, <b>-em</b>, <b>-en</b>, <b>-er</b> or <b>-e</b> take <b>-s</b> instead, because -en on top of -el is unsayable. Your ear will tell you before the rule does.'},

  {m:'model', say:'And a small group that takes an apostrophe, because without it you would read the vowel wrongly.',
   title:'het meervoud op -s', readEx:true,
   lines:[
    ['de tafel → de tafels','the tables','unstressed -el'],
    ['de bakker → de bakkers','the bakers','unstressed -er'],
    ['de auto → de auto’s','the cars','apostrophe after a, i, o, u, y'],
    ['de foto → de foto’s','the photos','same reason']],
   words:['detafel','deauto','defoto']},

  {m:'reveal', say:'So the whole system, in three lines. This is genuinely all of it for now.',
   title:'de drie regels',
   lines:[
    ['-en is de standaard','-en is the default','de kranten, de huizen'],
    ['-s na -el, -em, -en, -er, -e','-s after those endings','de tafels, de bakkers'],
    ['’s na a, i, o, u, y','apostrophe s after those vowels','de auto’s, de foto’s']],
   words:[]},

  {m:'trap', say:'Now the ending you will hear more than any other, and almost everybody misunderstands what it is for.',
   wrong:'-je only means the thing is small',
   right:'-je makes the thing friendly',
   note:'<b>Een biertje</b> is not a small beer. <b>Een momentje</b> is not a short moment. The <b>-je</b> softens and personalises. If you actually mean small, the word is <b>klein</b>. And remember: every -je word is <b>het</b>, and its plural takes <b>-s</b>.',
   words:['hetbiertje','hetmomentje']},

  {m:'model', say:'The ending changes shape to fit the word in front of it. You do not need to memorise this today, but you should recognise all four when you hear them.',
   title:'-je, -tje, -etje, -pje', readEx:true,
   lines:[
    ['het huis → het huisje','the little house','-je is the base form'],
    ['de deur → het deurtje','the little door','-tje after a long vowel or l, n, r, w'],
    ['de bel → het belletje','the little bell','-etje after a short vowel'],
    ['de boom → het boompje','the little tree','-pje after -m']],
   words:['dedeur','deboom','dearm']},

  {m:'recap', say:'Two plural endings, one friendly ending. That is the whole of today.',
   concept:'-en is the default plural. -s after an unstressed ending. Every -je word is het.',
   note:'When you write your words by hand tonight, write the plural next to each one. It is the cheapest time you will ever have to learn it.'}
 ],
 vocab:['dekrant','destoel','deauto','defoto','hetraam','dehond','dekat','deboom','dearm','hetmomentje','hetbiertje','detafel','dedeur','hetboek'],
 grammar:{title:'Meervoud en verkleinwoord',
  body:'<p>Dutch has two plural endings, and every plural takes <b>de</b> whatever the singular was.</p>'
   +'<ul>'
   +'<li><span class=\'gw\'>-en</span> is the default. <span class=\'gok\'>de krant → de kranten</span>, <span class=\'gok\'>het huis → de huizen</span>.</li>'
   +'<li><span class=\'gw2\'>-s</span> goes after an unstressed <b>-el, -em, -en, -er, -aar</b> or <b>-e</b>. <span class=\'gok\'>de tafel → de tafels</span>.</li>'
   +'<li><span class=\'gw2\'>’s</span> after the vowels <b>a, i, o, u, y</b>. <span class=\'gok\'>de auto → de auto’s</span>.</li>'
   +'</ul>'
   +'<p class=\'gkeyline\'>Say it out loud and your ear will usually pick the right one before the rule does.</p>'
   +'<p class=\'gtopic\'>The little -je</p>'
   +'<p>It is not mainly about size. It makes a thing friendly, ordinary, manageable.</p>'
   +'<ul>'
   +'<li><span class=\'gok\'>een biertje</span> is a beer, not a small beer.</li>'
   +'<li><span class=\'gok\'>een momentje</span> is a moment, said kindly.</li>'
   +'<li>If you really mean small, the word is <span class=\'gw\'>klein</span>.</li>'
   +'</ul>'
   +'<p>It takes four shapes depending on the word in front of it: <b>-je</b>, <b>-tje</b> after a long vowel or l, n, r, w, <b>-etje</b> after a short vowel, <b>-pje</b> after -m.</p>'
   +'<p class=\'gkeyline\'>Every -je word is <b>het</b>, and its plural always takes <b>-s</b>.</p>',
  gloss:[['de krant → de kranten','-en, the default'],['de tafel → de tafels','-s after unstressed -el'],['de auto → de auto’s','apostrophe before the s'],['het biertje','a beer, said in a friendly way']]},
 culture:{title:'Order a biertje, not a bier',
  body:'Asking for <b>een bier</b> is technically correct and sounds odd. Almost everyone says <b>een biertje</b>, whatever the size of the glass.'},
 extra:[
  {t:'mc', q:'The plural of „de tafel" is:', hint:'Say both out loud. One of them is a mouthful.', opts:['de tafelen','de tafels','de tafelden'], a:1, why:'Unstressed -el takes -s.'},
  {t:'mc', q:'The plural of „de auto" is written:', hint:'Without it you would read the vowel wrongly.', opts:['de autos','de auto’s','de autoen'], a:1, why:'An apostrophe goes in after a, i, o, u, y.'},
  {t:'mc', q:'„Een biertje" means:', hint:'The ending is doing something other than measuring.', opts:['a small beer','a beer, said in a friendly way','half a beer'], a:1, why:'-je personalises. For small, use klein.'}
 ]},

/* ---------------------------------------------------------------- n0f --- */
{id:'n0f', stage:0, icon:'12', title:'Getallen en prijzen', sub:'0 to 1000 · euros · how much?',
 concept:'Dutch says the small number first, exactly like German.',
 frame:'Dat kost … euro …',
 brief:{say:'Numbers. Dull for five minutes, then useful every single day.',
        will:'Zero to a thousand, and how prices are actually said out loud.',
        needs:null},
 teach:[
  {m:'hook', say:'Numbers do one strange thing in Dutch, and it is the same strange thing German does. If you already know that trick, today is easy.',
   board:'<b>21</b> in English: twenty-one.<br><b>21</b> in Dutch: <span class="gw">een-en-twintig</span>, one-and-twenty.'},

  {m:'elicit', say:'So if eenentwintig is one-and-twenty, have a guess. What is <b>vierentwintig</b>?',
   prompt:'vierentwintig = ?',
   hint:'vier is four. twintig is twenty. Which one do you hear first?',
   options:['42','24','4'],
   a:1,
   after:'<b>24.</b> The small number is said first but it is still the second digit. Listen for the small number and you will never misread a price again.'},

  {m:'model', say:'One to ten. These you will use every day, so say them with me rather than reading them.',
   title:'een tot tien', readEx:true,
   after:['een','twee','drie','vier','vijf','zes','zeven','acht','negen','tien'],
   lines:[
    ['een, twee, drie','one, two, three'],
    ['vier, vijf, zes','four, five, six'],
    ['zeven, acht, negen, tien','seven, eight, nine, ten']],
   words:['een','twee','drie','vier','vijf','zes','zeven','acht','negen','tien']},

  {m:'model', say:'Then the bigger ones, and prices, which are simply two numbers in a row with nothing between them.',
   title:'twintig tot duizend', readEx:true,
   lines:[
    ['twintig, dertig, veertig','20, 30, 40'],
    ['vijftig, honderd, duizend','50, 100, 1000'],
    ['drie euro vijftig','€3.50, said as two numbers'],
    ['Wat kost dat?','What does that cost?']],
   words:['twintig','dertig','veertig','vijftig','honderd','duizend','euro','kosten','eenentwintig']},

  {m:'trap', say:'Two small traps. One is a letter that appears from nowhere, and one is a pair of numbers that sound almost identical.',
   wrong:'veertig and vertig  ·  twee and twintig confused',
   right:'veertig (40) has an extra e  ·  vier (4) ≠ veertien (14) ≠ veertig (40)',
   note:'<b>veertig</b> and <b>veertien</b> both stretch <b>vier</b>. Listen for the ending: <b>-tien</b> is teens, <b>-tig</b> is tens.',
   words:['veertien','dertien']},

  {m:'recap', say:'That is the whole idea. Small number first, and listen for the ending.',
   concept:'Dutch says the small number first: eenentwintig is one-and-twenty.',
   note:'-tien means teens. -tig means tens. Prices are just two numbers with nothing in between.'}
 ],
 vocab:['een','twee','drie','vier','vijf','zes','zeven','acht','negen','tien','elf','twaalf','dertien','veertien','twintig','eenentwintig','dertig','veertig','vijftig','honderd','duizend','euro','kosten','hoeveel','hetnummer'],
 grammar:{title:'De getallen',
  body:'<p>Dutch builds compound numbers backwards, exactly as German does.</p>'
   +'<p class=\'gkeyline\'><b>21</b> is <span class=\'gw\'>eenentwintig</span>, literally one-and-twenty.</p>'
   +'<ul>'
   +'<li><span class=\'gok\'>vierentwintig</span> = 24, not 42.</li>'
   +'<li><span class=\'gok\'>zevenendertig</span> = 37.</li>'
   +'</ul>'
   +'<p class=\'gtopic\'>Teens against tens</p>'
   +'<p>The endings are what separate them, and they sound close at speed.</p>'
   +'<ul>'
   +'<li><span class=\'gw\'>-tien</span> is a teen: <b>veertien</b> is 14.</li>'
   +'<li><span class=\'gw2\'>-tig</span> is a ten: <b>veertig</b> is 40.</li>'
   +'</ul>'
   +'<p class=\'gtopic\'>Prices</p>'
   +'<p>A price is two numbers in a row with nothing between them. <b>drie euro vijftig</b> is €3.50.</p>',
  gloss:[['eenentwintig','21, one-and-twenty'],['veertien / veertig','14 / 40'],['drie euro vijftig','€3.50'],['Wat kost dat?','What does that cost?']]},
 culture:{title:'Cash is often refused',
  body:'Many Dutch shops take only cards, and some take only Dutch debit cards. Carrying cash is not the safe option it is elsewhere.'},
 extra:[
  {t:'mc', q:'„vierentwintig" is:', hint:'The small number is said first but it is still the second digit.', opts:['42','24','4'], a:1, why:'Small number first, but it stays the second digit.'},
  {t:'mc', q:'Which one is 40?', hint:'One ending means teens, the other means tens.', opts:['veertien','veertig','vier'], a:1, why:'-tig is tens, -tien is teens.'},
  {t:'mc', q:'„Drie euro vijftig" is:', opts:['€3.15','€3.50','€350'], a:1, why:'Two numbers in a row: 3 and 50.'}
 ]},

/* ---------------------------------------------------------------- n0g --- */
{id:'n0g', stage:0, icon:'uur', title:'Tijd en dagen', sub:'the clock · days · appointments',
 concept:'Dutch tells the time by looking forward to the next hour.',
 frame:'Het is … uur',
 brief:{say:'The Dutch clock looks forward, not back. Once you see that, it stops being confusing.',
        will:'How to read a clock, name the days, and understand an appointment time.',
        needs:'Getallen en prijzen'},
 teach:[
  {m:'hook', say:'This is the one that catches everybody, and it costs people real appointments. In Dutch, half past two is not half past two.',
   board:'English: <b>half past two</b> means 2:30, looking back.<br>Dutch: <span class="gw">half drie</span> means 2:30, looking <b>forward</b> to three.'},

  {m:'elicit', say:'So have a guess. If half drie is half past two, what time is <b>half zeven</b>?',
   prompt:'half zeven = ?',
   hint:'The Dutch clock counts forward to the hour it names.',
   options:['7:30','6:30','7:00'],
   a:1,
   after:'<b>6:30.</b> Half zeven means halfway to seven. Miss this and you will arrive an hour late, which in this country is a genuine problem.'},

  {m:'model', say:'Here is the whole clock. The quarter hours work the same forward-looking way.',
   title:'hoe laat is het?', readEx:true,
   lines:[
    ['Het is drie uur.','It is three o’clock.','Het is drie uur.','It is 3:00.'],
    ['Het is kwart over drie.','It is quarter past three.','Het is kwart over drie.','It is 3:15.'],
    ['Het is half vier.','It is half past three.','Het is half vier.','It is 3:30.'],
    ['Het is kwart voor vier.','It is quarter to four.','Het is kwart voor vier.','It is 3:45.']],
   words:['hetuur','half','kwart']},

  {m:'trap', say:'So the trap, stated plainly, because this one has consequences.',
   wrong:'half vier = 4:30',
   right:'half vier = 3:30',
   note:'<b>half</b> plus a number means <b>thirty minutes before</b> that number. half vier is 3:30, not 4:30. If you are ever unsure, ask for the digits.',
   words:['half']},

  {m:'model', say:'The days now. Five of the seven will look familiar if you know any German or English.',
   title:'de dagen', readEx:true,
   after:['maandag','dinsdag','woensdag','donderdag','vrijdag','zaterdag','zondag'],
   lines:[
    ['maandag, dinsdag','Monday, Tuesday'],
    ['woensdag, donderdag','Wednesday, Thursday'],
    ['vrijdag','Friday'],
    ['zaterdag, zondag','Saturday, Sunday']],
   words:['maandag','dinsdag','woensdag','donderdag','vrijdag','zaterdag','zondag','dedag','deweek']},

  {m:'model', say:'And the three words that place anything in time. You will use these constantly.',
   title:'vandaag, morgen, gisteren', readEx:true,
   lines:[
    ['vandaag','today','Vandaag heb ik tijd.','Today I have time.'],
    ['morgen','tomorrow','Tot morgen!','See you tomorrow!'],
    ['gisteren','yesterday','Gisteren was ik hier.','Yesterday I was here.'],
    ['nu','now','Ik leer nu Nederlands.','I am learning Dutch now.']],
   words:['vandaag','morgen','gisteren','nu','totmorgen']},

  {m:'recap', say:'One rule, one trap, seven days. That is today.',
   concept:'half plus a number means thirty minutes before that number. half drie is 2:30.',
   note:'morgen means both tomorrow and morning. Context decides, and it almost always does.'}
 ],
 vocab:['hetuur','half','kwart','vandaag','morgen','gisteren','nu','maandag','dinsdag','woensdag','donderdag','vrijdag','zaterdag','zondag','deweek','dedag','totmorgen'],
 grammar:{title:'De klok',
  body:'<p>The Dutch clock looks <b>forward</b> to the coming hour, not back at the one that passed.</p>'
   +'<p class=\'gkeyline\'><span class=\'gw\'>half drie</span> is <b>2:30</b>, halfway to three. Not 3:30.</p>'
   +'<ul>'
   +'<li><span class=\'gok\'>drie uur</span> 3:00</li>'
   +'<li><span class=\'gok\'>kwart over drie</span> 3:15</li>'
   +'<li><span class=\'gok\'>half vier</span> 3:30</li>'
   +'<li><span class=\'gok\'>kwart voor vier</span> 3:45</li>'
   +'</ul>'
   +'<p class=\'gtopic\'>One word, two meanings</p>'
   +'<p><b>morgen</b> means both <i>tomorrow</i> and <i>morning</i>. <span class=\'gok\'>morgenochtend</span> is tomorrow morning, if you need to be exact.</p>'
   +'<p class=\'gtopic\'>Why it matters</p>'
   +'<p>Appointments in the Netherlands start on time. Reading <b>half vier</b> as 4:30 means arriving an hour late to something that will not wait.</p>',
  gloss:[['Hoe laat is het?','What time is it?'],['half drie','2:30'],['kwart voor vier','3:45'],['tot morgen','see you tomorrow']]},
 culture:{title:'On time means on time',
  body:'A Dutch appointment at 14:00 starts at 14:00. Arriving at 14:10 is late, and arriving at 13:45 is also slightly awkward.'},
 extra:[
  {t:'mc', q:'„Half zeven" is:', hint:'The Dutch clock counts forward to the hour it names.', opts:['7:30','6:30','7:00'], a:1, why:'half zeven is halfway to seven, so 6:30.'},
  {t:'mc', q:'3:45 in Dutch is:', opts:['kwart over vier','kwart voor vier','half vier'], a:1, why:'Quarter before four.'},
  {t:'mc', q:'„Morgen" can mean:', opts:['Only tomorrow','Only morning','Both tomorrow and morning'], a:2, why:'One word, two meanings, decided by context.'}
 ]},

/* ---------------------------------------------------------------- n0h --- */
{id:'n0h', stage:0, icon:'Wa', title:'Waar is …?', sub:'ask · point · find your way',
 concept:'Question word first, verb second. The same rule, doing a new job.',
 frame:'Waar is …? / Ik wil graag …',
 brief:{say:'The most useful lesson in the whole stage. Six words, and every door opens a little.',
        will:'How to ask where, when, how much, and how to ask for something politely.',
        needs:'Ik ben, ik heb'},
 teach:[
  {m:'hook', say:'You are lost and you need the station. With six words you can ask anybody, anywhere in this country, and be understood.',
   board:'Six question words.<br>The verb still comes <span class="gw">second</span>, exactly as before.'},

  {m:'model', say:'Here they are. The question word comes first and the verb follows it immediately. That order never changes.',
   title:'de vraagwoorden', readEx:true,
   after:['waar','wanneer','hoeveel','wat','wie','waarom'],
   lines:[
    ['Waar is het station?','Where is the station?','Waar is het station?','Where is the station?'],
    ['Wanneer komt de trein?','When does the train come?','Wanneer komt de trein?','When does the train come?'],
    ['Hoeveel kost dat?','How much does that cost?','Hoeveel kost dat?','How much does that cost?'],
    ['Wat is dat?','What is that?','Wat is dat?','What is that?'],
    ['Wie is dat?','Who is that?','Wie is dat?','Who is that?'],
    ['Waarom is het dicht?','Why is it closed?','Waarom is het dicht?','Why is it closed?']],
   words:['waar','wanneer','hoeveel','wat','wie','waarom','waaris','hetstation','detrein']},

  {m:'elicit', say:'Now one you cannot work out from English. You want to ask where a bus is going. Which do you use?',
   prompt:'___ gaat de bus?',
   hint:'One asks where something is standing. One asks where it is heading.',
   options:['Waar','Waarheen','Wanneer'],
   a:1,
   after:'<b>Waarheen</b>, or in everyday speech <i>Waar gaat de bus heen?</i> <b>Waar</b> asks where something <i>is</i>. Ask a driver <i>Waar is de bus?</i> and you have asked where it is parked.'},

  {m:'model', say:'Two more that do half your work for you. The first is the politest thing a beginner can own.',
   title:'Ik wil graag · Is er', readEx:true,
   lines:[
    ['Ik wil graag koffie.','I would like coffee.','Ik wil graag een koffie.','I would like a coffee.'],
    ['Is er hier wifi?','Is there wifi here?','Is er hier wifi?','Is there wifi here?'],
    ['Pardon, waar is het toilet?','Excuse me, where is the toilet?','Pardon, waar is het toilet?','Excuse me, where is the toilet?'],
    ['Mag ik …?','May I …?','Mag ik het menu?','May I have the menu?']],
   words:['willengraag','ishierr','hettoilet','pardon']},

  {m:'model', say:'And the answers coming back at you, so you can follow the pointing finger.',
   title:'de richting', readEx:true,
   after:['hier','daar','links','rechts','rechtdoor'],
   lines:[
    ['hier','here'],
    ['daar','there'],
    ['links, rechts','left, right'],
    ['rechtdoor','straight ahead']],
   words:['hier','daar','links','rechts','rechtdoor']},

  {m:'trap', say:'One habit worth building now. A bare question sounds abrupt in Dutch, the same as it does anywhere.',
   wrong:'Waar is het station?',
   right:'Pardon, waar is het station?',
   note:'One word in front changes the whole tone. <b>Pardon</b> or <b>Sorry</b> both work, and Dutch people use <b>sorry</b> constantly for exactly this.',
   words:['pardon','sorry']},

  {m:'recap', say:'That is the stage finished. You can greet, introduce yourself, say what you have, read a clock, handle a price, and ask for anything.',
   concept:'Question word first, verb second. waar is where it is, waarheen is where it goes.',
   note:'Always open with Pardon. It costs one word and changes how the whole exchange goes.'}
 ],
 vocab:['wat','wie','waar','wanneer','waarom','hoe','hoeveel','waaris','willengraag','ishierr','hier','daar','links','rechts','rechtdoor','hettoilet','gaan','werken','doen','eten','drinken','willen','kunnen'],
 grammar:{title:'De vraagwoorden',
  body:'<p>Six question words, and the verb comes straight after them.</p>'
   +'<ul>'
   +'<li><span class=\'gw\'>Waar</span> where · <span class=\'gw\'>Wat</span> what · <span class=\'gw\'>Wie</span> who</li>'
   +'<li><span class=\'gw\'>Wanneer</span> when · <span class=\'gw\'>Waarom</span> why · <span class=\'gw\'>Hoeveel</span> how much</li>'
   +'</ul>'
   +'<p class=\'gkeyline\'>Question word first, verb second. <b>Waar is het station?</b> <b>Wanneer komt de trein?</b></p>'
   +'<p class=\'gtopic\'>waar against waarheen</p>'
   +'<ul>'
   +'<li><span class=\'gok\'>Waar is de bus?</span> asks where it is standing.</li>'
   +'<li><span class=\'gok\'>Waar gaat de bus heen?</span> asks where it is going.</li>'
   +'</ul>'
   +'<p class=\'gtopic\'>Two phrases worth owning</p>'
   +'<ul>'
   +'<li><span class=\'gw2\'>Ik wil graag …</span> is the politest thing a beginner can say.</li>'
   +'<li><span class=\'gw2\'>Is er …?</span> asks whether anything at all exists.</li>'
   +'</ul>'
   +'<p class=\'gkeyline\'>Open with <b>Pardon</b>. A bare question reads as abrupt.</p>',
  gloss:[['Waar is het toilet?','Where is the toilet?'],['Hoeveel kost dat?','How much does that cost?'],['Ik wil graag koffie.','I would like coffee.'],['Is er hier wifi?','Is there wifi here?']]},
 culture:{title:'The huisarts is the gate',
  body:'You cannot go straight to a specialist. The <b>huisarts</b> decides and writes a <b>verwijsbrief</b>. Register with one the week you arrive.'},
 extra:[
  {t:'mc', q:'You are lost and need the station. You say:', hint:'One word in front changes the tone completely.', opts:['Pardon, waar is het station?','Het station is goed.','Hoeveel kost het station?'], a:0, why:'Pardon first, then Waar is …?'},
  {t:'mc', q:'„Hoeveel kost dat?" asks about:', opts:['the time','the price','the way'], a:1, why:'hoeveel = how much. It is the price.'},
  {t:'wb', q:'Say: I would like a coffee', sent:'Ik wil graag koffie', distract:['ben','heb'], why:'Ik wil graag is the beginner’s politest phrase.'}
 ]},

/* ---------------------------------------------------------------- n0i --- */
/* Not in any tourist course, and the most useful unit in the stage for anybody
   who has actually moved here. Vocabulary from Welkom in Nederland, the
   official KNM book used for inburgering. */
{id:'n0i', stage:0, icon:'BSN', title:'Bij de gemeente', sub:'appointments · forms · the doctor',
 concept:'Life here is run from a counter, and eight words get you through it.',
 frame:'Ik heb een afspraak.',
 brief:{say:'This is the lesson no holiday course will teach you, and the one you will use first.',
        will:'How to make an appointment, ask for a form, see a doctor, and say you did not understand.',
        needs:'Waar is …?'},
 teach:[
  {m:'hook', say:'In your first month here you will stand at more counters than you did in a year at home. Registration, the doctor, insurance, the bank. All of it runs on one word.',
   board:'<span class="gw">de afspraak</span><br>Nothing happens without one.<br>Not the doctor, not the town hall, not even visiting family.'},

  {m:'model', say:'Start with the sentence that opens every door. Say it at the desk and everything else follows.',
   title:'bij het loket', readEx:true,
   after:['Ik heb een afspraak.','Ik wil me inschrijven.','Kunt u mij helpen?'],
   lines:[
    ['Ik heb een afspraak.','I have an appointment.','Goedemorgen, ik heb een afspraak.','Good morning, I have an appointment.'],
    ['Ik wil me inschrijven.','I want to register.','Ik wil me inschrijven bij de gemeente.','I want to register with the municipality.'],
    ['Kunt u mij helpen?','Can you help me?','Pardon, kunt u mij helpen?','Excuse me, can you help me?'],
    ['Waar moet ik wachten?','Where should I wait?','Waar moet ik wachten?','Where should I wait?']],
   words:['deafspraak','degemeente','inschrijven','wachten','hetloket']},

  {m:'elicit', say:'Here is one that surprises people who grew up anywhere else. You have a bad knee and you want to see a specialist. What do you do first?',
   prompt:'You need a specialist. First you …',
   hint:'There is one person who decides, and it is not you.',
   options:['book the specialist directly','go to the huisarts','go to the hospital'],
   a:1,
   after:'<b>The huisarts.</b> The family doctor is the gate to all care here. You cannot choose a specialist yourself: the huisarts decides and writes a <b>verwijsbrief</b>, a referral letter. Register with a huisarts in your first week, before you need one.'},

  {m:'model', say:'The words on every form you will be handed. Learn these four and the paperwork stops being frightening.',
   title:'het papierwerk', readEx:true,
   lines:[
    ['het formulier','the form','Kunt u dit formulier invullen?','Can you fill in this form?'],
    ['het BSN','the citizen service number','Wat is uw BSN?','What is your BSN?'],
    ['het paspoort','the passport','Heeft u uw paspoort bij u?','Do you have your passport with you?'],
    ['de verzekering','the insurance','Ik heb een verzekering nodig.','I need insurance.']],
   words:['hetformulier','hetbsn','hetpaspoort','deverzekering','invullen','debrief']},

  {m:'trap', say:'And now the two sentences that matter more than any vocabulary. Nobody will mind you using them. Everybody minds a silent nod.',
   wrong:'nodding, and hoping you understood',
   right:'Kunt u dat herhalen? · Kunt u langzamer praten?',
   note:'<b>Ik spreek een beetje Nederlands.</b> Say that first and most people will slow down rather than switch to English. Asking someone to repeat is normal here and costs you nothing.',
   words:['herhalen','langzaam','eenbeetje']},

  {m:'model', say:'Last, the place words you will need in a hurry, and the number you hope you never dial.',
   title:'als het misgaat', readEx:true,
   lines:[
    ['de huisarts','the family doctor','Ik heb een afspraak bij de huisarts.','I have an appointment at the doctor.'],
    ['de apotheek','the pharmacy','Waar is de apotheek?','Where is the pharmacy?'],
    ['het nummertje','the queue ticket','Neem een nummertje.','Take a ticket.'],
    ['honderdtwaalf','one one two, the emergency number','Bel 112.','Call 112.']],
   words:['dehuisarts','deapotheek','hetnummertje']},

  {m:'recap', say:'That is the whole stage finished. You can arrive, introduce yourself, ask for things, read a clock, and deal with the counter. That is a real foundation.',
   concept:'Nothing happens without an afspraak, and the huisarts is the gate to all care.',
   note:'Take the nummertje and wait your turn. Skipping a Dutch queue is the fastest way to make a room angry.'}
 ],
 vocab:['degemeente','deafspraak','hetformulier','dehuisarts','hetbsn','inschrijven','invullen','deverzekering','hetpaspoort','debrief','hetloket','wachten','hetnummertje','deapotheek','herhalen','langzaam','eenbeetje'],
 grammar:{title:'De woorden van het loket',
  body:'<p>These are not tourist words. They are the ones on the letters that will arrive in your first month.</p>'
   +'<ul>'
   +'<li><span class=\'gw\'>de afspraak</span> the appointment. Nothing happens without one.</li>'
   +'<li><span class=\'gw\'>de gemeente</span> the municipality, where you register when you arrive.</li>'
   +'<li><span class=\'gw\'>het BSN</span> your citizen service number. It goes on every form.</li>'
   +'<li><span class=\'gw\'>de huisarts</span> the family doctor, and the gate to every specialist.</li>'
   +'</ul>'
   +'<p class=\'gkeyline\'>Three sentences will carry you through almost any counter: <b>Ik heb een afspraak.</b> <b>Kunt u mij helpen?</b> <b>Kunt u dat herhalen?</b></p>'
   +'<p class=\'gtopic\'>Asking people to slow down</p>'
   +'<p>Dutch people switch to English the moment they hear an accent. These two sentences usually stop that.</p>'
   +'<ul>'
   +'<li><span class=\'gok\'>Ik spreek een beetje Nederlands.</span> I speak a little Dutch.</li>'
   +'<li><span class=\'gok\'>Kunt u langzamer praten?</span> Can you speak more slowly?</li>'
   +'</ul>'
   +'<p class=\'gtopic\'>How the doctor works</p>'
   +'<p>You cannot book a specialist yourself. The <b>huisarts</b> sees you first and writes a <b>verwijsbrief</b>, a referral. Register with one in your first week, not when you are already ill.</p>',
  gloss:[['Ik heb een afspraak.','I have an appointment.'],['Kunt u dat herhalen?','Can you repeat that?'],['Ik spreek een beetje Nederlands.','I speak a little Dutch.'],['de verwijsbrief','the referral letter from your huisarts']]},
 culture:{title:'Take a nummertje and wait',
  body:'Queues are sacred. Take the ticket, wait your turn, and never step ahead of someone. It is one of the few things that reliably makes a Dutch room angry.'},
 extra:[
  {t:'mc', q:'You need to see a specialist. First you go to:', hint:'One person decides, and it is not you.', opts:['the hospital','the huisarts','the gemeente'], a:1, why:'The huisarts is the gate and writes the verwijsbrief.'},
  {t:'wb', q:'Say: I have an appointment', sent:'Ik heb een afspraak', distract:['ben','de'], why:'The sentence that opens every counter.'},
  {t:'mc', q:'Someone is speaking too fast. You say:', hint:'Asking is normal here and costs you nothing.', opts:['Kunt u langzamer praten?','Ik begrijp het niet.','Tot ziens.'], a:0, why:'Ask them to slow down rather than nodding.'}
 ]}

];

/* ============================ SANNE ============================
   Drop into TEACHERS.nl. Spoken and written text are identical,
   and her English carries no phonetic accent spelling.
   ============================================================== */
SANNE = {
  name: 'Sanne',
  lang: 'Dutch',
  hello: 'Hallo! Ik heet Sanne.',
  first: 'In our first class you will introduce yourself to me. That is how I learn your name.',
  blurb: 'I teach Dutch the way this country actually speaks it: plainly, out loud, and with the reason behind every rule.'
};

NL_STAGES = [
  {n:0, name:'Fundamenten', job:'Arrive, introduce yourself, and get through a counter.'},
  {n:1, name:'A1 Kern', job:'Describe things, place them, and use the everyday verbs.'},
];

/* Stage 1 scope comes from coverage.mjs, not from guesswork: these are the
   four buckets the 47 uncovered essential words fall into. */
NL_UNITS.push(
 {id:'n1a', stage:1, planned:true, locked:true, icon:'gr', title:'Groot en klein', sub:'describing things',
  concept:'An adjective goes in front of the noun and usually takes an -e.', frame:'',
  brief:{say:'', will:'The twenty adjectives you need most, and the one ending they take.', needs:'de of het'}, vocab:[]},
 {id:'n1b', stage:1, planned:true, locked:true, icon:'op', title:'Op, in, naast', sub:'where things are',
  concept:'Twelve prepositions place almost everything.', frame:'',
  brief:{say:'', will:'Where something is, where it goes, and what it is next to.', needs:'de of het'}, vocab:[]},
 {id:'n1c', stage:1, planned:true, locked:true, icon:'+t', title:'Werkwoorden', sub:'stem, stem + t, infinitief',
  concept:'One pattern covers almost every Dutch verb in the present tense.', frame:'',
  brief:{say:'', will:'ik werk, jij werkt, wij werken, and the ten verbs you will use daily.', needs:'Ik ben, ik heb'}, vocab:[]},
 {id:'n1d', stage:1, planned:true, locked:true, icon:'st', title:'Thuis en in de stad', sub:'home \u00b7 shops \u00b7 hospital',
  concept:'The dozen places a week actually takes you.', frame:'',
  brief:{say:'', will:'The rooms of a house and the places on a street.', needs:'Meervoud en verkleinwoord'}, vocab:[]}
);

/* ---- namespace the word ids ----------------------------------------------
   S.words is keyed by word id and is shared across courses. Ten ids occur in
   both packs (hallo, ja, vier, acht, elf, euro, morgen, hier, links, rechts),
   so without a prefix, mastering German `morgen` would silently mark Dutch
   `morgen` as known too, and inflate the Dutch word count on Home.
   Unit ids already differ by prefix, so only word ids need this. */
(function(){
  const P = 'nl-', remapped = {};
  Object.keys(NL_VOCAB).forEach(k => { const v = NL_VOCAB[k]; v.id = P + k; remapped[P + k] = v; });
  Object.keys(NL_VOCAB).forEach(k => delete NL_VOCAB[k]);
  Object.assign(NL_VOCAB, remapped);
  NL_UNITS.forEach(u => {
    if(u.vocab) u.vocab = u.vocab.map(id => P + id);
    (u.teach || []).forEach(m => { if(m.words) m.words = m.words.map(id => P + id); });
  });
})();

/* ---- culture corner, straight from Welkom in Nederland ---- */
const NL_CULTURE = [
 {t:'Everything needs an afspraak', b:'Doctor, bank, town hall, and visiting family. Turning up unannounced is not friendly here, it is awkward.'},
 {t:'The huisarts is the gate', b:'You cannot book a specialist yourself. Your family doctor decides and writes a verwijsbrief. Register with one in your first week.'},
 {t:'Take a nummertje', b:'Queues are sacred. Take the ticket, wait your turn. Stepping ahead of someone is one of the few things that reliably angers a Dutch room.'},
 {t:'Say no when you mean no', b:'A soft yes is read here as a yes. Ik kom niet is polite, not rude, and it is what people expect.'},
 {t:'Health insurance is compulsory', b:'Everyone must have a zorgverzekering. You pick your own insurer and can switch each January. Under 18 is free.'},
 {t:'Carry your ID', b:'Everyone aged 14 and over must carry identification at all times, and 12 and over on public transport.'},
 {t:'Lunch is a broodje', b:'Bread at the desk, often at exactly twelve. A hot lunch is not a normal working-day thing.'},
 {t:'On time means on time', b:'An appointment at 14:00 starts at 14:00. Ten minutes late is late, and fifteen minutes early is also slightly awkward.'}
];


/* ---- the Dutch first-lesson pack -------------------------------------
   Same shape as COURSES.de.first, so lesson1.js runs it unchanged.
   Word ids carry the nl- prefix because the pack namespaces them. */
const NL_ALPHABET = [
 ['A','aa','de appel','the apple','\u{1F34E}'],
 ['B','bee','de banaan','the banana','\u{1F34C}'],
 ['C','see','de computer','the computer','\u{1F4BB}'],
 ['D','dee','de deur','the door','\u{1F6AA}'],
 ['E','ee','het ei','the egg','\u{1F95A}'],
 ['F','ef','de fiets','the bicycle','\u{1F6B2}'],
 ['G','gee','het glas','the glass','\u{1F943}'],
 ['H','haa','het huis','the house','\u{1F3E0}'],
 ['I','ie','het idee','the idea','\u{1F4A1}'],
 ['J','jee','de jas','the coat','\u{1F9E5}'],
 ['K','kaa','de kat','the cat','\u{1F408}'],
 ['L','el','de lamp','the lamp','\u{1F6CB}'],
 ['M','em','de maan','the moon','\u{1F319}'],
 ['N','en','de nacht','the night','\u{1F303}'],
 ['O','oo','het oog','the eye','\u{1F441}'],
 ['P','pee','het paard','the horse','\u{1F434}'],
 ['Q','kuu','de quiz','the quiz','❓'],
 ['R','er','de regen','the rain','\u{1F327}'],
 ['S','es','de stoel','the chair','\u{1FA91}'],
 ['T','tee','de trein','the train','\u{1F686}'],
 ['U','uu','het uur','the hour','⏰'],
 ['V','vee','de vis','the fish','\u{1F41F}'],
 ['W','wee','het water','the water','\u{1F4A7}'],
 ['X','iks','de taxi','the taxi','\u{1F695}'],
 ['Y','Griekse ij','de yoghurt','the yoghurt','\u{1F963}'],
 ['Z','zet','de zon','the sun','☀'],
 ['IJ','lange ij','het ijs','the ice cream','\u{1F366}']
];

const NL_GREETINGS = [
  ['Hallo','hello','anytime, anyone','nl-hallo'],
  ['Goedemorgen','good morning','until about noon','nl-goedemorgen'],
  ['Goedemiddag','good afternoon','noon until about six','nl-goedemiddag'],
  ['Goedenavond','good evening','after about six','nl-goedenavond'],
  ['Welterusten','sleep well','only at bedtime',''],
  ['Dank je wel','thank you','informal','nl-dankjewel'],
  ['Alsjeblieft','please, and here you are','informal','nl-alsjeblieft'],
  ['Doei','bye','informal','nl-doei'],
  ['Tot ziens','goodbye','formal','nl-totziens']
];

const NL_COUNTRIES = {'india':'India','germany':'Duitsland','netherlands':'Nederland','holland':'Nederland',
 'belgium':'België','france':'Frankrijk','spain':'Spanje','italy':'Italië','turkey':'Turkije','poland':'Polen',
 'usa':'de Verenigde Staten','united states':'de Verenigde Staten','america':'de Verenigde Staten',
 'uk':'het Verenigd Koninkrijk','england':'Engeland','scotland':'Schotland','ireland':'Ierland',
 'china':'China','japan':'Japan','brazil':'Brazilië','mexico':'Mexico','russia':'Rusland',
 'ukraine':'Oekraïne','syria':'Syrië','iran':'Iran','iraq':'Irak','pakistan':'Pakistan','vietnam':'Vietnam',
 'south korea':'Zuid-Korea','korea':'Korea','greece':'Griekenland','portugal':'Portugal','austria':'Oostenrijk',
 'switzerland':'Zwitserland','sweden':'Zweden','norway':'Noorwegen','denmark':'Denemarken','finland':'Finland',
 'canada':'Canada','australia':'Australië','egypt':'Egypte','morocco':'Marokko','nigeria':'Nigeria',
 'kenya':'Kenia','indonesia':'Indonesië','thailand':'Thailand','philippines':'de Filipijnen',
 'bangladesh':'Bangladesh','sri lanka':'Sri Lanka','nepal':'Nepal','afghanistan':'Afghanistan','israel':'Israël',
 'romania':'Roemenië','bulgaria':'Bulgarije','hungary':'Hongarije','czech republic':'Tsjechië',
 'croatia':'Kroatië','serbia':'Servië','albania':'Albanië','colombia':'Colombia',
 'argentina':'Argentinië','chile':'Chili','peru':'Peru'};

const NL_LANGUAGES = {'english':'Engels','hindi':'Hindi','marathi':'Marathi','gujarati':'Gujarati','tamil':'Tamil',
 'telugu':'Telugu','bengali':'Bengaals','urdu':'Urdu','punjabi':'Punjabi','arabic':'Arabisch','turkish':'Turks',
 'spanish':'Spaans','french':'Frans','italian':'Italiaans','portuguese':'Portugees','russian':'Russisch',
 'ukrainian':'Oekraïens','polish':'Pools','romanian':'Roemeens','chinese':'Chinees','mandarin':'Chinees',
 'japanese':'Japans','korean':'Koreaans','vietnamese':'Vietnamees','thai':'Thai','indonesian':'Indonesisch',
 'persian':'Perzisch','farsi':'Perzisch','dutch':'Nederlands','german':'Duits','greek':'Grieks','swedish':'Zweeds',
 'serbian':'Servisch','croatian':'Kroatisch','albanian':'Albanees','somali':'Somalisch','swahili':'Swahili',
 'filipino':'Tagalog','tagalog':'Tagalog','nepali':'Nepalees','sinhala':'Singalees','pashto':'Pasjtoe',
 'kurdish':'Koerdisch','hebrew':'Hebreeuws','czech':'Tsjechisch','hungarian':'Hongaars','bulgarian':'Bulgaars'};

const NL_SONG = [
 ['A','C',1],['B','C',1],['C','G',1],['D','G',1],['E','A',1],['F','A',1],['G','G',2],
 ['H','F',1],['I','F',1],['J','E',1],['K','E',1],['L','D',1],['M','D',1],['N','D',1],['O','D',1],['P','C',2],
 ['Q','G',1],['R','G',1],['S','F',2],
 ['T','E',1],['U','E',1],['V','D',2],
 ['W','G',1],['X','G',1],['Y','F',1],['Z','E',2]
];

const NL_FIRST = {
  unit: 'n0b',
  hello: 'Hallo!',
  say: 'Let us start with the most useful thing you can own: your own introduction. Fill in the blanks and it becomes yours.',
  boardTitle: 'Mijn introductie · my introduction',
  greetSay: 'Now the greetings, and Dutch splits the day carefully. <b>Goedemorgen</b> until noon, <b>Goedemiddag</b> until about six, <b>Goedenavond</b> after that. <b>Welterusten</b> only at bedtime, and only to someone actually going to bed.',
  abcSay: 'Tap a letter and I will say it, with a word that starts with it. Twenty-seven letters, because <b>ij</b> counts as one.',
  abcTitle: 'Het alfabet',
  songSay: 'Dutch children learn the alphabet to the same melody as the English song. Follow the letters and sing along.',
  lines: [
    {de:'Hallo!', en:'Hello!'},
    {de:'Goedemorgen!', en:'Good morning!'},
    {pre:'Ik heet ', blank:'name', ph:'your name', post:'.', en:'My name is …'},
    {pre:'Ik ben ', blank:'age', ph:'age', w:62, post:' jaar oud.', en:'I am … years old.'},
    {pre:'Ik ben ', gender:true, en:'I am a woman / a man · tap one, optional'},
    {pre:'Ik kom uit ', blank:'country', ph:'country', post:'.', en:'I come from …', map:'countries'},
    {pre:'Ik woon in ', blank:'city', ph:'your city', w:108, post:'.', en:'I live in …'},
    {pre:'Ik spreek ', blank:'lang', ph:'language', w:108, post:'.', en:'I speak …', map:'languages'},
    {de:'Ik leer Nederlands.', en:'I am learning Dutch.'},
    {de:'Dank je wel! Tot ziens!', en:'Thank you! Goodbye!'}
  ],
  gender: {f:{de:'een vrouw', en:'a woman'}, m:{de:'een man', en:'a man'}, d:{de:'een persoon', en:'a person'}},
  countries: NL_COUNTRIES,
  languages: NL_LANGUAGES,
  alphabet: NL_ALPHABET,
  greetings: NL_GREETINGS,
  song: NL_SONG
};

/* register with the course table declared in content.js */
COURSES.nl = {vocab:NL_VOCAB, units:NL_UNITS, stages:NL_STAGES, teacher:SANNE,
              stories:[], scenarios:[], culture:NL_CULTURE,
              /* no Dutch exam authored yet. Null hides the Test tab rather
                 than showing a German paper inside the Dutch course. */
              mock:null, exam:null, first:NL_FIRST,
              skillNames:{reading:'Lezen \u00b7 Reading', listening:'Luisteren \u00b7 Dictation',
                          writing:'Schrijven \u00b7 Writing', speaking:'Spreken \u00b7 Speaking'},
              source:'vocabulary and grammar sourced from Shetter & Ham, Welkom in Nederland and Teach Yourself Dutch',
              /* Dutch schools mark out of 10, and 10 is famously almost never given. */
              grades:{note:'Cijfer', best:10, legend:'Dutch schools mark out of <b>10</b>, and a <b>5.5</b> is a pass. A 10 is famously almost never given.',
                scale:[[95,10,'uitmuntend','outstanding'],[88,9,'zeer goed','very good'],[80,8,'goed','good'],
                       [70,7,'ruim voldoende','more than sufficient'],[55,6,'voldoende','sufficient'],
                       [40,5,'onvoldoende','not sufficient'],[0,4,'zwak','weak']]},
              voice:'nl-NL', native:'Nederlands', slug:'dutch',
              greet:['Goedemorgen', 'Hallo', 'Goedenavond'],
              gogo:'Daar gaan we!',
              /* Two buckets instead of three, same game. The two-thirds figure
                 is Shetter & Ham §4.1, not an estimate. */
              genders:{name:'de of het', sub:'Two articles, 12 rounds, from your own words',
                buckets:['de','het'],
                hint:'Roughly two thirds of Dutch nouns are de, so de is the better guess when you have nothing to go on. Every plural is de.',
                allRight:'De and het is the thing Dutch learners never stop getting wrong, and you just took twelve without a miss.',
                rules:[
                  ['je$','het','Every diminutive ends in -je, and every diminutive is het. This is the one gender rule in Dutch that never fails.'],
                  ['(ing|heid|teit|tie)$','de','-ing, -heid, -teit and -tie are always de.'],
                  ['en$','de','Plurals are always de, whatever the singular was: het huis, de huizen.'],
                  ['^ge','het','Many ge- nouns are het.']]}};
})();
