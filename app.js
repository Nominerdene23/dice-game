// Тоглогчийн ээлжийг хадгалах хувьсагч. 1-р тоглогчийг 0, 2-р тоглогчийг 1 гэж тэмдэглэе.

var activePlayer;

//togloom duussan esehiig shalgah tuluviin huvisagch

var isGameOver;

// Тоглогчийн цуглуулсан оноог хадгалах

var scores;

// ИДэвхтэй байгаа хувьсагчийн ээлжийн оноог цуглуулж байгаа оноог хадгадах хувьсагч

var roundScore;

// Шооны аль талаараа буусныг хадгалах хувьсагч хэрэгтэй. 1-6 гэсэн утгыг энэ хувьсагчид
// санамсаргүйгээр үүсгэх хэрэгтэй

var diceDom = document.querySelector(".dice");

initGame();

function initGame(){
    isGameOver = true;

    activePlayer = 0;

    scores=[0,0];

    roundScore = 0;




// Программ эхлэхэпд бэлтгэе
document.getElementById("score-0").textContent='0';
document.getElementById("score-1").textContent='0';
document.getElementById("current-0").textContent='0';
document.getElementById("current-1").textContent='0';

document.getElementById("name-0").textContent='Player 1';
document.getElementById("name-1").textContent='Player 2';

document.querySelector(".player-0-panel").classList.remove("winner");
document.querySelector(".player-1-panel").classList.remove("winner");

document.querySelector(".player-0-panel").classList.remove("active");
document.querySelector(".player-1-panel").classList.remove("active");

document.querySelector(".player-0-panel").classList.add("active");

diceDom.style.display = "none";
}

//шүүг шидэх эвент пистенер

document.querySelector(".btn-roll").addEventListener("click",function shooShid(){

    if(isGameOver === true){
        //1-6 тоог санамсаргүй авна
    var diceNumber = Math.floor(Math.random()*6)+1;

    //шооны зургийг вэб дээр гаргаж ирнэ
    diceDom.style.display = "block";

    //буусан тооны шооны зургийг вэб дээр гаргаж ирнэ
    diceDom.src = 'dice-' + diceNumber + '.png';

    if(diceNumber !== 1){
        //1ээс ялгаатай тоо буулааа буусан тоог тоглогчид нэмж өгөх
        roundScore = roundScore + diceNumber;
        document.getElementById("current-" + activePlayer).textContent=roundScore;
    }else{
        switchToNextPlayer();
    }
    }else{
        alert("togloom duussan baina. New game tovchiig darj ahin ehlene uu");
    }
});

// hold tovchnii event listener

document.querySelector(".btn-hold").addEventListener("click", function(){
    //ug toglogch hojson esehiig shalgah
    if(isGameOver === true){
        scores[activePlayer] = scores[activePlayer] + roundScore;

        document.getElementById("score-" + activePlayer).textContent=scores[activePlayer];
    
        if(scores[activePlayer] >= 10){
    
            isGameOver = false;
            document.getElementById("name-" + activePlayer).textContent = "!!!WINNER!!!";
            document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
            document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
        } else {
            switchToNextPlayer();
        }
    }else{
        alert("togloom duussan baina. New game tovchiig darj ahin ehlene uu");
    }
});
//ene function ni togloh eeljig daraachiin toglogch ruu shiljuulne

function switchToNextPlayer(){
    roundScore = 0;
    document.getElementById("current-" + activePlayer).textContent = 0;
    //toglogchiin eeljiig nuguu toglogchruu shiljuulne
    //хэрэв идэвхтэй тоглогч 0 байвал идэвхтэй тоглогчийг 1 болго
    //үгүй бол идэвхтэй тоглогчийг 0 болго
    activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

    //ulaanstegiig shiljuuleh
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");

   diceDom.style.display="none";
}

document.querySelector(".btn-new").addEventListener("click", initGame);