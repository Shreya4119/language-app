/* =========================================================================
   SPRAK · 中文 · STAGE 0 · proof of concept

   Mandarin is the first course with no alphabet, no gendered articles, and
   two written forms per word. It exists to prove the course-pack design is
   language-neutral rather than Germanic-neutral.

   Three things are different from German and Dutch:

   1. Every word carries BOTH characters and pinyin. Characters alone cannot
      be pronounced; pinyin alone never teaches reading. `W()` here takes a
      fifth argument and the app renders it under the characters.
   2. There is no alphabet lesson. The same grid teaches the four tones and
      the sounds pinyin spells differently from English.
   3. Tone errors need no special handling. Speech recognition returns
      characters, so saying mǎ for mā hands back 马 instead of 妈 and the
      match fails on its own.

   Teacher: Lin. Her English is plain, like Sanne's, and for the same reason.
   ========================================================================= */

var ZH_VOCAB = {}, ZH_UNITS = [], ZH_STAGES = [], LIN = null;
(function(){
  const VOCAB = ZH_VOCAB;
  /* py is the fifth field: the app shows it under v.de wherever a word appears */
  function W(id, hanzi, en, py, ex){ VOCAB[id] = {id, de:hanzi, en, py, ex}; }

/* ---- the four tones, taught on one syllable ---- */
W('zh-ma1','妈','mother','mā',['妈妈很好。','Mum is well.']);
W('zh-ma2','麻','numb, hemp','má');
W('zh-ma3','马','horse','mǎ',['一匹马。','One horse.']);
W('zh-ma4','骂','to scold','mà');
W('zh-ma0','吗','(makes a question)','ma',['你好吗？','How are you?']);

/* ---- greetings and the social minimum ---- */
W('zh-nihao','你好','hello','nǐ hǎo',['你好！我叫林。','Hello! My name is Lin.']);
W('zh-ninhao','您好','hello (polite)','nín hǎo');
W('zh-zaoshang','早上好','good morning','zǎoshang hǎo');
W('zh-xiexie','谢谢','thank you','xièxie');
W('zh-bukeqi','不客气','you are welcome','bú kèqi');
W('zh-duibuqi','对不起','sorry','duìbuqǐ');
W('zh-meiguanxi','没关系','no problem','méi guānxi');
W('zh-zaijian','再见','goodbye','zàijiàn');
W('zh-qing','请','please','qǐng',['请坐。','Please sit.']);
W('zh-shi','是','to be, yes it is','shì',['我是学生。','I am a student.']);
W('zh-bu','不','not','bù',['我不忙。','I am not busy.']);
W('zh-hao','好','good, well','hǎo');

/* ---- people and the introduction ---- */
W('zh-wo','我','I, me','wǒ');
W('zh-ni','你','you','nǐ');
W('zh-nin','您','you (polite)','nín');
W('zh-ta-m','他','he, him','tā');
W('zh-ta-f','她','she, her','tā');
W('zh-women','我们','we, us','wǒmen');
W('zh-jiao','叫','to be called','jiào',['我叫林。','My name is Lin.']);
W('zh-laizi','来自','to come from','láizì',['我来自印度。','I come from India.']);
W('zh-zhuzai','住在','to live in','zhù zài',['我住在北京。','I live in Beijing.']);
W('zh-huishuo','会说','can speak','huì shuō',['我会说英语。','I can speak English.']);
W('zh-xue','学','to learn','xué',['我在学中文。','I am learning Chinese.']);
W('zh-zhongwen','中文','Chinese (the language)','Zhōngwén');
W('zh-yingyu','英语','English (the language)','Yīngyǔ');
W('zh-sui','岁','years old','suì',['我二十七岁。','I am twenty-seven.']);
W('zh-jinnian','今年','this year','jīnnián');
W('zh-xuesheng','学生','a student','xuésheng');
W('zh-laoshi','老师','a teacher','lǎoshī');
W('zh-pengyou','朋友','a friend','péngyou');
W('zh-zhongguo','中国','China','Zhōngguó');
W('zh-yindu','印度','India','Yìndù');

/* ---- numbers, and the measure words that must follow them ---- */
W('zh-yi','一','one','yī'); W('zh-er','二','two','èr'); W('zh-san','三','three','sān');
W('zh-si','四','four','sì'); W('zh-wu','五','five','wǔ'); W('zh-liu','六','six','liù');
W('zh-qi','七','seven','qī'); W('zh-ba','八','eight','bā'); W('zh-jiu','九','nine','jiǔ');
W('zh-shi10','十','ten','shí',['二十七','twenty-seven']);
W('zh-bai','百','hundred','bǎi'); W('zh-qian','千','thousand','qiān');
W('zh-ge','个','the general measure word','gè',['三个人','three people']);
W('zh-ben','本','measure word for books','běn',['两本书','two books']);
W('zh-zhang','张','measure word for flat things','zhāng',['一张票','one ticket']);
W('zh-bei','杯','measure word for cups','bēi',['一杯茶','one cup of tea']);
W('zh-liang','两','two (before a measure word)','liǎng',['两个朋友','two friends']);
W('zh-ren','人','person','rén');
W('zh-shu','书','book','shū');
W('zh-cha','茶','tea','chá');
W('zh-shui','水','water','shuǐ');
W('zh-piao','票','ticket','piào');
W('zh-kuai','块','yuan (spoken)','kuài',['十块钱','ten yuan']);
W('zh-qian-money','钱','money','qián');
W('zh-duoshao','多少','how much, how many','duōshao',['多少钱？','How much is it?']);

/* ---- the sounds pinyin spells differently from English ---- */
W('zh-zhidao','知道','to know','zhīdào');
W('zh-chifan','吃饭','to eat','chī fàn');
W('zh-hanzi','汉字','a Chinese character','Hànzì');
W('zh-jia','家','home, family','jiā',['我回家。','I am going home.']);
W('zh-nu','女','female','nǚ');
W('zh-nan','男','male','nán');
W('zh-jintian','今天','today','jīntiān');
W('zh-de','的','(makes it yours)','de',['我的书','my book']);


/* ================================ UNITS ================================ */
ZH_UNITS = [

/* ---------------------------------------------------------------- z0a --- */
{id:'z0a', stage:0, icon:'声', title:'声调和拼音', sub:'four tones · pinyin · greetings',
 practice:'alphabet',
 concept:'The same syllable means four different things depending on the tone.',
 frame:'你好！谢谢！',
 brief:{say:'Tones first. Everything else in Chinese is easier than people say, and this is the part that is genuinely hard.',
        will:'The four tones, the sounds pinyin spells differently from English, and the greetings you will use daily.',
        needs:null},
 teach:[
  {m:'hook', say:'Chinese grammar is simpler than German. No cases, no genders, no verb endings, no plurals. All the difficulty is in one place, and we start there.',
   board:'<span class="gw">mā</span> 妈 mother<br><span class="gw">má</span> 麻 numb<br><span class="gw">mǎ</span> 马 horse<br><span class="gw">mà</span> 骂 to scold<br><br>One syllable. Four words.'},

  {m:'elicit', say:'So have a guess before I explain. If you say <b>mā</b> when you meant <b>mǎ</b>, what happens?',
   prompt:'Wrong tone, right syllable. The listener hears …',
   hint:'Think about what a tone actually is here. It is not emphasis.',
   options:['the same word, said oddly','a completely different word','nothing, tones are optional'],
   a:1,
   after:'<b>A different word.</b> The tone is part of the word, exactly as a vowel is. <i>Mā</i> and <i>mǎ</i> are no more alike than <i>cat</i> and <i>cot</i>. This is why tones are not decoration you add later.'},

  {m:'model', say:'Here they are on one syllable. Listen for the shape of each, not the sound. Your hand can trace them in the air.',
   title:'四声 · the four tones', readEx:true,
   after:['妈','麻','马','骂'],
   lines:[
    ['妈 mā','mother','tone 1: high and flat, like holding a note'],
    ['麻 má','numb','tone 2: rising, like asking "what?"'],
    ['马 mǎ','horse','tone 3: dips down, then comes back up'],
    ['骂 mà','to scold','tone 4: sharp fall, like a firm "no"'],
    ['吗 ma','makes a question','neutral: short, light, no shape at all']],
   words:['zh-ma1','zh-ma2','zh-ma3','zh-ma4','zh-ma0']},

  {m:'trap', say:'And here is the one that bites everybody, because pinyin borrows Latin letters and then uses them differently.',
   wrong:'reading q, x and zh as in English',
   right:'q = soft ch, x = soft sh, zh = curled j',
   note:'<b>七 qī</b> is not "kee". <b>谢谢 xièxie</b> is not "zyeh-zyeh". Pinyin is a spelling system for Chinese, not a pronunciation guide for English speakers. Learn the handful that differ and the rest is regular.',
   words:['zh-qi','zh-xiexie','zh-zhidao']},

  {m:'model', say:'Now the words you will say on your first day. Every one of these is worth more than a grammar rule.',
   title:'问候 · greetings', readEx:true,
   after:['你好','谢谢','对不起','再见'],
   lines:[
    ['你好 nǐ hǎo','hello','literally: you good'],
    ['谢谢 xièxie','thank you','the second syllable goes neutral'],
    ['不客气 bú kèqi','you are welcome','literally: not polite'],
    ['对不起 duìbuqǐ','sorry','for a real apology'],
    ['再见 zàijiàn','goodbye','literally: again see']],
   words:['zh-nihao','zh-ninhao','zh-zaoshang','zh-xiexie','zh-bukeqi','zh-duibuqi','zh-meiguanxi','zh-zaijian','zh-qing']},

  {m:'recap', say:'Tones are the whole difficulty, and you have now met all of them. Everything after this is easier.',
   concept:'The tone is part of the word, not an accent on top of it.',
   note:'Say the four ma out loud once more tonight. Trace the shapes with your hand while you do it.'}
 ],
 vocab:['zh-ma1','zh-ma2','zh-ma3','zh-ma4','zh-ma0','zh-nihao','zh-ninhao','zh-zaoshang','zh-xiexie',
        'zh-bukeqi','zh-duibuqi','zh-meiguanxi','zh-zaijian','zh-qing','zh-hao','zh-shi','zh-bu',
        'zh-zhidao','zh-chifan','zh-hanzi','zh-jia','zh-jintian'],
 grammar:{title:'四声 · The four tones',
  body:'<p>Mandarin has four tones and a neutral. The tone is <b>part of the word</b>, the way a vowel is.</p>'
   +'<ul>'
   +'<li><span class=\'gw\'>mā</span> 妈 mother. High and flat.</li>'
   +'<li><span class=\'gw\'>má</span> 麻 numb. Rising, like asking "what?"</li>'
   +'<li><span class=\'gw\'>mǎ</span> 马 horse. Dips, then comes back up.</li>'
   +'<li><span class=\'gw\'>mà</span> 骂 to scold. A sharp fall.</li>'
   +'<li><span class=\'gw2\'>ma</span> 吗 turns a sentence into a question. No shape at all.</li>'
   +'</ul>'
   +'<p class=\'gkeyline\'>Wrong tone is not an accent. It is a different word.</p>'
   +'<p class=\'gtopic\'>Pinyin is not English</p>'
   +'<p>Pinyin spells Chinese with Latin letters, and a few of them do not mean what you expect.</p>'
   +'<ul>'
   +'<li><span class=\'gw\'>q</span> is a soft <b>ch</b>: <span class=\'gok\'>七 qī</span>, seven.</li>'
   +'<li><span class=\'gw\'>x</span> is a soft <b>sh</b>: <span class=\'gok\'>谢谢 xièxie</span>, thank you.</li>'
   +'<li><span class=\'gw\'>zh, ch, sh</span> are said with the tongue curled back.</li>'
   +'<li><span class=\'gw\'>ü</span> is "ee" with rounded lips: <span class=\'gok\'>女 nǚ</span>, female.</li>'
   +'</ul>'
   +'<p class=\'gtopic\'>The good news</p>'
   +'<p>No cases, no genders, no plurals, and verbs never change. <b>我是, 你是, 他是</b>: one form for everybody.</p>',
  gloss:[['妈 mā / 马 mǎ','mother / horse, the same syllable'],['你好 nǐ hǎo','hello'],['谢谢 xièxie','thank you'],['再见 zàijiàn','goodbye']]},
 culture:{title:'吃饭了吗？ Have you eaten?',
  body:'A common greeting is <b>吃饭了吗？</b>, have you eaten. It is small talk, not an invitation. <b>吃了</b>, I have eaten, is the whole answer.'},
 extra:[
  {t:'mc', q:'妈 mā and 马 mǎ are:', hint:'The tone is part of the word, not an accent on it.', opts:['the same word said differently','two different words','a formal and informal form'], a:1, why:'Different tone, different word: mother and horse.'},
  {t:'mc', q:'In pinyin, <b>q</b> sounds like:', hint:'It is not the English q at all.', opts:['k','a soft ch','a hard g'], a:1, why:'q is a soft ch: 七 qī, seven.'},
  {t:'mc', q:'Which tone dips down and comes back up?', opts:['tone 1','tone 2','tone 3'], a:2, why:'Tone 3 falls then rises.'}
 ]},

/* ---------------------------------------------------------------- z0b --- */
{id:'z0b', stage:0, icon:'我', title:'我叫…', sub:'your introduction · build it, then say it',
 practice:'intro',
 concept:'Chinese word order is subject, verb, object, and the verb never changes.',
 frame:'我叫… 我来自…',
 brief:{say:'Today you build something you will use every week. And you get a gift: Chinese verbs never change.',
        will:'Your name, age, country, city and languages in Chinese, written out and then said aloud.',
        needs:'声调和拼音'},
 teach:[
  {m:'hook', say:'After German and Dutch this will feel like a holiday. Chinese verbs have one form. One. For everybody, in every tense.',
   board:'German: ich bin, du bist, er ist, wir sind…<br>Chinese: <span class="gw2">我是, 你是, 他是, 我们是</span><br><br>The same word every time.'},

  {m:'model', say:'Here is your whole introduction. Look at the order: who, then what they do, then the rest. It never moves.',
   title:'我的介绍 · my introduction', readEx:true,
   after:['我叫林','我来自印度','我在学中文'],
   lines:[
    ['我叫… wǒ jiào…','My name is …','我叫林。','My name is Lin.'],
    ['我今年…岁。','I am … years old.','我今年二十七岁。','I am twenty-seven.'],
    ['我来自…','I come from …','我来自印度。','I come from India.'],
    ['我住在…','I live in …','我住在阿姆斯特丹。','I live in Amsterdam.'],
    ['我会说…','I can speak …','我会说英语。','I can speak English.']],
   words:['zh-wo','zh-jiao','zh-laizi','zh-zhuzai','zh-huishuo','zh-sui','zh-jinnian','zh-zhongwen','zh-yingyu']},

  {m:'elicit', say:'Now a question. How do you turn <b>你好</b>, you are well, into <b>are you well?</b>',
   prompt:'你好 ___ ？',
   hint:'You met this one in the tones lesson. It is the syllable with no shape.',
   options:['么 me','吗 ma','吧 ba'],
   a:1,
   after:'<b>吗 ma.</b> Stick it on the end and any statement becomes a question. No word order changes, no helper verb, nothing else moves. <i>你好吗？</i>'},

  {m:'contrast', say:'And the negative is just as simple. One word, always in front of the verb.',
   wrong:'我是不学生。',
   right:'我不是学生。',
   note:'<b>不 bù</b> goes <i>before</i> the verb, never after. <span class="gok">我不忙</span> I am not busy. <span class="gok">我不是学生</span> I am not a student.',
   words:['zh-bu','zh-shi','zh-xuesheng']},

  {m:'trap', say:'One small thing that separates a beginner from someone who has listened. Chinese does not say "I am twenty-seven years old" with a verb.',
   wrong:'我是二十七岁。',
   right:'我今年二十七岁。',
   note:'With an age, <b>是</b> is dropped entirely. The number and <b>岁</b> do all the work. Adding 是 is the commonest beginner mistake in this sentence.',
   words:['zh-sui','zh-jinnian']},

  {m:'recap', say:'You can now introduce yourself, ask a question, and say no. That is a real conversation.',
   concept:'Subject, verb, object, and the verb never changes. 吗 makes a question, 不 makes it negative.',
   note:'Write your introduction out by hand tonight, characters and pinyin together. Your hand learns the characters in a way your eyes never will.'}
 ],
 vocab:['zh-wo','zh-ni','zh-nin','zh-ta-m','zh-ta-f','zh-women','zh-jiao','zh-laizi','zh-zhuzai',
        'zh-huishuo','zh-xue','zh-sui','zh-jinnian','zh-xuesheng','zh-laoshi','zh-pengyou',
        'zh-zhongguo','zh-yindu','zh-de','zh-nu','zh-nan'],
 grammar:{title:'语序 · Word order',
  body:'<p>Chinese word order is <b>subject, verb, object</b>, exactly like English. The verb never changes.</p>'
   +'<ul>'
   +'<li><span class=\'gok\'>我是学生。</span> I am a student.</li>'
   +'<li><span class=\'gok\'>他是老师。</span> He is a teacher.</li>'
   +'<li><span class=\'gok\'>我们是朋友。</span> We are friends.</li>'
   +'</ul>'
   +'<p class=\'gkeyline\'>One verb form for every person. No conjugation to learn, ever.</p>'
   +'<p class=\'gtopic\'>Questions</p>'
   +'<p>Add <span class=\'gw\'>吗 ma</span> to the end. Nothing else moves.</p>'
   +'<ul><li><span class=\'gok\'>你好吗？</span> Are you well?</li>'
   +'<li><span class=\'gok\'>你是学生吗？</span> Are you a student?</li></ul>'
   +'<p class=\'gtopic\'>Saying no</p>'
   +'<p><span class=\'gw\'>不 bù</span> goes in front of the verb.</p>'
   +'<ul><li><span class=\'gok\'>我不是学生。</span> I am not a student.</li>'
   +'<li><span class=\'gwarn\'>我是不学生。</span> Wrong.</li></ul>'
   +'<p class=\'gtopic\'>One to watch</p>'
   +'<p>Age takes no verb at all: <span class=\'gok\'>我今年二十七岁。</span> Adding <b>是</b> here is the commonest beginner error.</p>',
  gloss:[['我叫…','My name is …'],['我来自…','I come from …'],['你好吗？','Are you well?'],['我不是学生。','I am not a student.']]},
 culture:{title:'Family name first',
  body:'Chinese names put the family name first: in <b>林小华</b>, 林 is the surname. On forms, "last name" is the one printed first.'},
 extra:[
  {t:'mc', q:'How do you make 你是学生 into a question?', hint:'One syllable, added at the end. Nothing else moves.', opts:['swap the words','add 吗 at the end','add 不 in front'], a:1, why:'吗 on the end turns any statement into a question.'},
  {t:'mc', q:'“I am twenty-seven” is:', hint:'One of these has a verb it should not have.', opts:['我是二十七岁。','我今年二十七岁。','我有二十七岁。'], a:1, why:'Age takes no verb: 是 is dropped.'},
  {t:'mc', q:'Where does 不 go?', opts:['after the verb','before the verb','at the end'], a:1, why:'不 always goes in front of the verb.'}
 ]},

/* ---------------------------------------------------------------- z0c --- */
{id:'z0c', stage:0, icon:'个', title:'一个人', sub:'numbers · measure words · how much?',
 concept:'A number can never touch a noun directly: a measure word always sits between.',
 frame:'三个人 · 多少钱？',
 brief:{say:'Numbers are easy and completely regular. Then one rule that has no English equivalent at all.',
        will:'One to a thousand, the measure words, and how to ask a price.',
        needs:'我叫…'},
 teach:[
  {m:'hook', say:'Chinese numbers are the most regular of any language I know. Learn ten of them and you can count to ninety-nine.',
   board:'十 10 · 十一 11, ten-one<br>二十 20, two-ten · 二十七 27, two-ten-seven<br><br>No exceptions. None.'},

  {m:'model', say:'One to ten, and then you already have the rest. Say them with me.',
   title:'数字 · numbers', readEx:true,
   after:['一','二','三','四','五','六','七','八','九','十'],
   lines:[
    ['一 二 三','one, two, three'],
    ['四 五 六','four, five, six'],
    ['七 八 九 十','seven, eight, nine, ten'],
    ['二十七 · 二十七','27, literally two-ten-seven']],
   words:['zh-yi','zh-er','zh-san','zh-si','zh-wu','zh-liu','zh-qi','zh-ba','zh-jiu','zh-shi10','zh-bai','zh-qian']},

  {m:'elicit', say:'Now the rule with no English equivalent. In Chinese you cannot say "three people". Have a guess why not.',
   prompt:'三 ___ 人  (three people)',
   hint:'English does this too, but only sometimes: three <i>sheets</i> of paper, two <i>cups</i> of tea.',
   options:['nothing goes there','a measure word goes there','the number repeats'],
   a:1,
   after:'<b>A measure word.</b> Chinese does for every noun what English does only for paper and tea. <i>三<b>个</b>人</i>, three <i>units of</i> person. You cannot leave it out.'},

  {m:'model', say:'There are many, but four carry most of daily life. And if you are stuck, one of them is always understood.',
   title:'量词 · measure words', readEx:true,
   lines:[
    ['三个人 sān ge rén','three people','个 is the general one'],
    ['两本书 liǎng běn shū','two books','本 for bound things'],
    ['一张票 yī zhāng piào','one ticket','张 for flat things'],
    ['一杯茶 yī bēi chá','one cup of tea','杯 for cups']],
   words:['zh-ge','zh-ben','zh-zhang','zh-bei','zh-ren','zh-shu','zh-cha','zh-piao']},

  {m:'trap', say:'And one that catches everybody. Chinese has two words for two, and they are not interchangeable.',
   wrong:'二个人',
   right:'两个人',
   note:'<b>二 èr</b> is the number two when counting: one, two, three. <b>两 liǎng</b> is two <i>of something</i>, and it is what goes before a measure word. Counting uses 二, quantities use 两.',
   words:['zh-liang','zh-er']},

  {m:'model', say:'Last, the question you will ask more than any other, and the word you will hear back.',
   title:'多少钱？ · how much?', readEx:true,
   after:['多少钱？','十块钱'],
   lines:[
    ['多少钱？ duōshao qián?','How much is it?','the only price question you need'],
    ['十块钱 shí kuài qián','ten yuan','块 is what people actually say'],
    ['太贵了！','Too expensive!','said with a smile, and often']],
   words:['zh-duoshao','zh-kuai','zh-qian-money','zh-shui']},

  {m:'recap', say:'That is the stage. You can greet, introduce yourself, count, and ask a price. In three lessons.',
   concept:'A number never touches a noun directly. A measure word always sits between them.',
   note:'When you do not know the right measure word, use 个. Everyone will understand you, and half of them would have used it too.'}
 ],
 vocab:['zh-yi','zh-er','zh-san','zh-si','zh-wu','zh-liu','zh-qi','zh-ba','zh-jiu','zh-shi10',
        'zh-bai','zh-qian','zh-liang','zh-ge','zh-ben','zh-zhang','zh-bei','zh-ren','zh-shu',
        'zh-cha','zh-piao','zh-kuai','zh-qian-money','zh-duoshao','zh-shui'],
 grammar:{title:'量词 · Measure words',
  body:'<p>Numbers are perfectly regular. <b>十一</b> is ten-one, <b>二十七</b> is two-ten-seven. There are no exceptions.</p>'
   +'<p class=\'gkeyline\'>But a number can <b>never</b> touch a noun directly. A measure word always goes between.</p>'
   +'<ul>'
   +'<li><span class=\'gw\'>个 gè</span> the general one, and the safe guess: <span class=\'gok\'>三个人</span> three people.</li>'
   +'<li><span class=\'gw\'>本 běn</span> for bound things: <span class=\'gok\'>两本书</span> two books.</li>'
   +'<li><span class=\'gw\'>张 zhāng</span> for flat things: <span class=\'gok\'>一张票</span> one ticket.</li>'
   +'<li><span class=\'gw\'>杯 bēi</span> for cups: <span class=\'gok\'>一杯茶</span> one cup of tea.</li>'
   +'</ul>'
   +'<p>English does this for some nouns already: three <i>sheets</i> of paper, two <i>cups</i> of tea. Chinese does it for all of them.</p>'
   +'<p class=\'gtopic\'>Two words for two</p>'
   +'<ul>'
   +'<li><span class=\'gw\'>二 èr</span> when counting: 一, 二, 三.</li>'
   +'<li><span class=\'gw2\'>两 liǎng</span> before a measure word: <span class=\'gok\'>两个朋友</span> two friends.</li>'
   +'</ul>'
   +'<p class=\'gkeyline\'>When you do not know the measure word, use <b>个</b>. You will be understood every time.</p>',
  gloss:[['三个人','three people'],['两本书','two books'],['多少钱？','How much is it?'],['十块钱','ten yuan']]},
 culture:{title:'块 in speech, 元 in writing',
  body:'Prices are written <b>元 yuán</b> but spoken <b>块 kuài</b>. Saying 元 out loud sounds like reading from a receipt.'},
 extra:[
  {t:'mc', q:'“Three people” is:', hint:'A number can never touch a noun directly.', opts:['三人','三个人','人三'], a:1, why:'A measure word must sit between the number and the noun.'},
  {t:'mc', q:'Which word for “two” goes before a measure word?', hint:'One is for counting, one is for quantities.', opts:['二 èr','两 liǎng','both'], a:1, why:'两 before a measure word, 二 when counting.'},
  {t:'mc', q:'You do not know the right measure word. Use:', opts:['本','个','none'], a:1, why:'个 is the general one and is always understood.'}
 ]}

];

ZH_STAGES = [
  {n:0, name:'基础 · Foundations', job:'Tones, your own introduction, and counting.'},
  {n:1, name:'A1 Core', job:'Time, places, and the verbs of a daily routine.'}
];

ZH_UNITS.push(
 {id:'z1a', stage:1, planned:true, locked:true, icon:'时', title:'时间', sub:'time · days · dates',
  concept:'Chinese time runs from the largest unit to the smallest.', frame:'',
  brief:{say:'', will:'The clock, the days, and why the date is written backwards from English.', needs:'一个人'}, vocab:[]},
 {id:'z1b', stage:1, planned:true, locked:true, icon:'在', title:'在哪里？', sub:'where things are',
  concept:'Place comes before the verb, not after it.', frame:'',
  brief:{say:'', will:'Asking where something is, and the answer you will get back.', needs:'我叫…'}, vocab:[]},
 {id:'z1c', stage:1, planned:true, locked:true, icon:'了', title:'了', sub:'something changed',
  concept:'了 marks a change of state, not a past tense.', frame:'',
  brief:{say:'', will:'The one particle that does the work a whole tense system does elsewhere.', needs:'我叫…'}, vocab:[]}
);

/* ---- culture corner ---- */
const ZH_CULTURE = [
 {t:'Have you eaten?', b:'吃饭了吗？ is small talk, not an invitation. 吃了, I have eaten, is the whole answer.'},
 {t:'Family name first', b:'In 林小华, 林 is the surname. On any form, the name printed first is the family one.'},
 {t:'Two hands for anything given', b:'A business card, a gift, a cup of tea. One hand reads as careless, especially to someone older.'},
 {t:'块 aloud, 元 in writing', b:'Prices are written 元 but said 块. Saying 元 out loud sounds like reading a receipt.'},
 {t:'The bill is fought over', b:'Offering to pay, repeatedly and loudly, is the polite move. Splitting a bill evenly is not usual.'},
 {t:'Numbers carry luck', b:'八 eight sounds like wealth and is prized. 四 four sounds like death, and some buildings skip that floor.'},
 {t:'Tea is poured for others first', b:'Fill everyone else’s cup before your own, and tap two fingers on the table to say thank you.'},
 {t:'Red is for celebration', b:'Money at New Year and at weddings comes in a red envelope, 红包. White is the colour of mourning.'}
];

/* ---- the first-lesson pack: no alphabet, so the grid teaches sounds ---- */
const ZH_SOUNDS = [
 ['妈','mā · tone 1, flat','妈妈','mum','\u{1F469}'],
 ['麻','má · tone 2, rising','麻烦','trouble','\u{1F33E}'],
 ['马','mǎ · tone 3, dips','马上','right away','\u{1F434}'],
 ['骂','mà · tone 4, falls','别骂','do not scold','\u{1F620}'],
 ['吗','ma · neutral, light','你好吗？','are you well?','❓'],
 ['知','zhī · tongue curled','知道','to know','\u{1F9E0}'],
 ['吃','chī · curled, with a puff','吃饭','to eat','\u{1F35A}'],
 ['是','shì · curled s','是的','yes, it is','✅'],
 ['人','rén · between r and zh','中国人','a Chinese person','\u{1F9CD}'],
 ['字','zì · flat tongue','汉字','a character','\u{1F524}'],
 ['菜','cài · flat, with a puff','中国菜','Chinese food','\u{1F96C}'],
 ['三','sān · flat s','三个','three','3️⃣'],
 ['家','jiā · smile shape','回家','to go home','\u{1F3E0}'],
 ['七','qī · like j, with a puff','七点','seven o clock','7️⃣'],
 ['谢','xiè · a soft sh','谢谢','thank you','\u{1F64F}'],
 ['女','nǚ · ü, rounded lips','女人','a woman','\u{1F469}'],
 ['学','xué · üe','学生','a student','\u{1F393}'],
 ['中','zhōng · ong','中国','China','\u{1F1E8}\u{1F1F3}'],
 ['天','tiān · ian sounds like yen','今天','today','\u{1F4C5}'],
 ['的','de · neutral e','我的','mine','\u{1F517}']
];

const ZH_GREETINGS = [
  ['你好','hello','nǐ hǎo · anyone, anytime','zh-nihao'],
  ['您好','hello (polite)','nín hǎo · to elders and officials','zh-ninhao'],
  ['早上好','good morning','zǎoshang hǎo','zh-zaoshang'],
  ['谢谢','thank you','xièxie','zh-xiexie'],
  ['不客气','you are welcome','bú kèqi · literally: not polite','zh-bukeqi'],
  ['对不起','sorry','duìbuqǐ · a real apology','zh-duibuqi'],
  ['没关系','no problem','méi guānxi','zh-meiguanxi'],
  ['请','please','qǐng','zh-qing'],
  ['再见','goodbye','zàijiàn · literally: again see','zh-zaijian']
];

const ZH_COUNTRIES = {'india':'印度','china':'中国','germany':'德国','netherlands':'荷兰',
 'holland':'荷兰','usa':'美国','united states':'美国','america':'美国','uk':'英国',
 'england':'英国','france':'法国','spain':'西班牙','italy':'意大利','japan':'日本',
 'south korea':'韩国','korea':'韩国','russia':'俄罗斯','canada':'加拿大',
 'australia':'澳大利亚','brazil':'巴西','mexico':'墨西哥','turkey':'土耳其',
 'pakistan':'巴基斯坦','bangladesh':'孟加拉国','sri lanka':'斯里兰卡',
 'nepal':'尼泊尔','singapore':'新加坡','thailand':'泰国','vietnam':'越南',
 'indonesia':'印度尼西亚','malaysia':'马来西亚','belgium':'比利时',
 'switzerland':'瑞士','austria':'奥地利','sweden':'瑞典','norway':'挪威',
 'denmark':'丹麦','finland':'芬兰','poland':'波兰','portugal':'葡萄牙',
 'greece':'希腊','egypt':'埃及','nigeria':'尼日利亚','kenya':'肯尼亚',
 'south africa':'南非','ireland':'爱尔兰','israel':'以色列','iran':'伊朗'};

const ZH_LANGUAGES = {'english':'英语','chinese':'中文','mandarin':'中文','hindi':'印地语',
 'marathi':'马拉地语','tamil':'泰米尔语','telugu':'泰卢固语',
 'bengali':'孟加拉语','gujarati':'古吉拉特语','urdu':'乌尔都语',
 'punjabi':'旁遮普语','german':'德语','dutch':'荷兰语','french':'法语',
 'spanish':'西班牙语','italian':'意大利语','portuguese':'葡萄牙语',
 'russian':'俄语','japanese':'日语','korean':'韩语','arabic':'阿拉伯语',
 'turkish':'土耳其语','thai':'泰语','vietnamese':'越南语',
 'indonesian':'印度尼西亚语','persian':'波斯语','farsi':'波斯语',
 'nepali':'尼泊尔语','swahili':'斯瓦希里语','hebrew':'希伯来语'};

const ZH_FIRST = {
  unit: 'z0b',
  hello: '你好！',
  say: 'Let us start with the most useful thing you can own: your own introduction. Fill in the blanks and it becomes yours.',
  boardTitle: '我的介绍 · my introduction',
  greetSay: 'Now the greetings. <b>你好</b> works for anyone at any hour, and <b>您好</b> is the polite one for elders and officials. <b>谢谢</b> you will say fifty times a day.',
  abcSay: 'There is no alphabet to learn, so instead: the four tones, and the sounds pinyin spells differently from English. Tap any one and I will say it.',
  abcTitle: '声调和拼音 · Tones and pinyin',
  songSay: '',
  lines: [
    {de:'你好！', en:'Hello!'},
    {de:'早上好！', en:'Good morning!'},
    {pre:'我叫', blank:'name', ph:'your name', post:'。', en:'My name is …'},
    {pre:'我今年', blank:'age', ph:'age', w:62, post:'岁。', en:'I am … years old.'},
    {pre:'我是', gender:true, en:'I am a woman / a man · tap one, optional'},
    {pre:'我来自', blank:'country', ph:'country', post:'。', en:'I come from …', map:'countries'},
    {pre:'我住在', blank:'city', ph:'your city', w:108, post:'。', en:'I live in …'},
    {pre:'我会说', blank:'lang', ph:'language', w:108, post:'。', en:'I speak …', map:'languages'},
    {de:'我在学中文。', en:'I am learning Chinese.'},
    {de:'谢谢！再见！', en:'Thank you! Goodbye!'}
  ],
  gender: {f:{de:'女生', en:'a woman'}, m:{de:'男生', en:'a man'}},
  countries: ZH_COUNTRIES,
  languages: ZH_LANGUAGES,
  alphabet: ZH_SOUNDS,
  greetings: ZH_GREETINGS,
  song: []
};

LIN = {
  name: 'Lin',
  lang: 'Mandarin',
  hello: '你好！我叫林。',
  first: 'In our first class you will introduce yourself to me. That is how I learn your name.',
  blurb: 'I teach Mandarin the way it is actually spoken: tones first, out loud, and always with the reason behind the pattern.'
};

/* ---- namespace the word ids, as the Dutch pack does ---- */
(function(){
  const P = 'zh-', out = {};
  Object.keys(ZH_VOCAB).forEach(k => {
    const id = k.indexOf(P) === 0 ? k : P + k;
    const v = ZH_VOCAB[k]; v.id = id; out[id] = v;
  });
  Object.keys(ZH_VOCAB).forEach(k => delete ZH_VOCAB[k]);
  Object.assign(ZH_VOCAB, out);
})();

COURSES.zh = {
  vocab: ZH_VOCAB, units: ZH_UNITS, stages: ZH_STAGES, teacher: LIN,
  voice: 'zh-CN', native: '中文', slug: 'mandarin',
  greet: ['早上好', '你好', '晚上好'],
  gogo: '我们开始吧！',
  stories: [], scenarios: [], culture: ZH_CULTURE,
  mock: null, exam: null, first: ZH_FIRST,
  skillNames: {reading:'阅读 · Reading', listening:'听力 · Listening',
               writing:'写作 · Writing', speaking:'口语 · Speaking'},
  source: 'a proof of concept: tones, introduction and measure words, authored for this build',
  /* Chinese school marks are bands, not numbers. noteColor works off the
     band's position in the scale, so a character grade is fine. */
  grades: {note: '等级', best: '优',
    legend: 'Chinese school reports use bands: <b>优</b> excellent, 良 good, 中 fair, 及 pass, <b>不及</b> not yet.',
    scale: [[90,'优','优秀','excellent'],[80,'良','良好','good'],[70,'中','中等','fair'],
            [60,'及','及格','pass'],[0,'不及','不及格','not yet']]}
};
})();
