let container = document.querySelector(".container");
let board = document.querySelector(".board");
let greenColor = "#769656";
let whiteColor = "#eeeed2";
let button = document.querySelectorAll(".board-button");
let newGameBtn = document.querySelector("#new-game-btn");
let alertBox = document.getElementById("customAlertBox");
let alert_Message_container = document.getElementById("alertMessage");
let custom_button = document.querySelector(".custom-button");
let close_img = document.querySelector(".close");


let whitePawnNum = document.querySelector("#white-pawn-num");
let whiteKnightNum = document.querySelector("#white-knight-num");
let whiteRookNum = document.querySelector("#white-rook-num");
let whiteBishopNum = document.querySelector("#white-bishop-num");
let whiteQueenNum = document.querySelector("#white-queen-num");
let blackPawnNum = document.querySelector("#black-pawn-num");
let blackKnightNum = document.querySelector("#black-knight-num");
let blackRookNum = document.querySelector("#black-rook-num");
let blackBishopNum = document.querySelector("#black-bishop-num");
let blackQueenNum = document.querySelector("#black-queen-num");
let promoteButtons = document.querySelectorAll(".promotion-choices");

let prevFromPieceId = "";
let prevToPieceId = "";
let fromPieceId="";
let toPieceId="";

document.addEventListener("DOMContentLoaded", function() {
    const openBtn = document.getElementById("open-btn");
    const closeBtn = document.getElementById("close-btn");
    const sidebar = document.getElementById("sidebar");

    openBtn.addEventListener("click", function() {
        sidebar.classList.add("active");
        openBtn.classList.add("transform");
    });

    closeBtn.addEventListener("click", function() {
        sidebar.classList.remove("active");
        openBtn.classList.remove("transform");
    });
});

document.addEventListener("click", function(e){
    const target = e.target.closest(".promotion-choices"); // Or any other selector.
  
    if(target){
      
    }
  });

newGameBtn.addEventListener("click",()=>window.location.reload());

// Fix the King Function

let promoteId ='';

let promoteTextForWhite = `
    <div>
        <p>You have been promoted.</p><p>Choose a piece</p>
        <div>
        <button class="promotion-choices" id="White Rook"><span class="sym">♖</span><br/> Rook</button>
        <button class="promotion-choices" id="White Knight"><span class="sym">♘</span><br/> Knight</button>
        <button class="promotion-choices" id="White Bishop"><span class="sym">♗</span><br/> Bishop</button>
        <button class="promotion-choices" id="White Queen"><span class="sym">♕</span><br/> Queen</button>
        </div>
    </div>
`;

let promoteTextForBlack =`
    <div>
        <p>You have been promoted.</p><p> Choose a piece</p>
        <div>
        <button class="promotion-choices" id="Black Rook"><span class="sym">♜</span><br/> Rook</button>
        <button class="promotion-choices" id="Black Knight"><span class="sym">♞</span><br/> Knight</button>
        <button class="promotion-choices" id="Black Bishop"><span class="sym">♝</span><br/> Bishop</button>
        <button class="promotion-choices" id="Black Queen"><span class="sym">♛</span><br/> Queen</button>
        </div>
    </div>
`;


let boardPieces = [
    ['r','n','b','q','k','b','n','r'],
    ['p','p','p','p','p','p','p','p'],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['P','P','P','P','P','P','P','P'],
    ['R','N','B','Q','K','B','N','R']
];
// Lower case for black pieces
// Upper case for white pieces

const pieces={
    "♖": "White Rook",
    "♘": "White Knight",
    "♗": "White Bishop",
    "♕": "White Queen",
    "♔": "White King",
    "♙": "White Pawn",
    "♜": "Black Rook",
    "♝": "Black Bishop",
    "♞": "Black Knight",
    "♚": "Black King",
    "♛": "Black Queen",
    "♟": "Black Pawn"
};

let whiteMove = true;

const highlighted=new Set();

const white = new Set(["♙","♖","♗","♕","♔","♘"]);
const black = new Set(["♟","♛","♚","♞","♝","♜"]);

let twoMovesPawn= new Set(["a2","b2","c2","d2","e2","f2","g2","h2","a7","b7","c7","d7","e7","f7","g7","h7"]);

let blackKingId = "e8";
let whiteKingId = "e1";

// Current Positions of black Pieces
let black_positions = {
    "Pawns": ["a7","b7","c7","d7","e7","f7","g7","h7"],
    "Knight 1": "b8",
    "Knight 2": "g8",
    "Rook 1": "a8",
    "Rook 2": "h8",
    "Bishop 1": "c8",
    "Bishop 2": "f8",
    "Queen": "d8",
    "King": "e8"
};

// Current positions of White pieces
let white_positions = {
    "Pawns": ["a2","b2","c2","d2","e2","f2","g2","h2"],
    "Knight 1": "b1",
    "Knight 2": "g1",
    "Rook 1": "a1",
    "Rook 2": "h1",
    "Bishop 1": "c1",
    "Bishop 2": "f1",
    "Queen": "d1",
    "King": "e1"
};

// Returns the Id of HTML from given position in the boardPieces Array
const getIdFromBoardPosition = (obj) => {
    // Returns string
    // Parameters is object with attributes row and col with respective to board
    let row = obj.row;
    let col = obj.col;
    let idLetter = String.fromCharCode(col+'a'.charCodeAt(0));
    let idNum = 8-row;
    return idLetter+idNum;
}

// Returns the position of piece in boardPieces Array from given Id in HTML
const getBoardPositionFromId = (id) => {
    // Returns and object of {row,col}
    // Paramaters is the id of the piece in HTML
    return {
        "row": 8-Number(id[1]),
        "col": id[0].charCodeAt(0) - 'a'.charCodeAt(0)
    };
}

// Returns all the positions of the opponents
function getOpponentPositions (boardPieces,playerColor){
    let positions = [];
    for(let row=0;row<8;row++){
        for(let col=0;col<8;col++){
            let piece = boardPieces[row][col];
            if(piece &&((playerColor === "White") && piece === piece.toLowerCase())){ //If the piece is black
                positions.push(getIdFromBoardPosition({"row":row,"col":col}));
            }
            else if(piece && ((playerColor === "Black") && piece === piece.toUpperCase())){ //If the piece is White
                positions.push(getIdFromBoardPosition({"row":row,"col":col}));
            }
        }
   }
   return positions;
}

// Returns the attacking position of the given id
function getAttackingPositions(id){
    attacking_pos=[];
    let element = document.querySelector("#"+id);
    if(element && (pieces[element.innerText] === "White Pawn")){
        if(id[0]>'a'&& id[0]<'h'){
            let x=Number(id[1])-1;
            if(id[0]>'a'&& id[0]<'h'){
                let x=Number(id[1])+1;
                if(x>=1 && x<=8){
                    let ele1=document.querySelector("#"+(String.fromCharCode(id[0].charCodeAt(0) - 1)+x));
                    let ele2=document.querySelector("#"+(String.fromCharCode(id[0].charCodeAt(0) + 1)+x));
                    if(black.has(ele1.innerText)){
                        attacking_pos.push(ele1.getAttribute("id"));
                    }
                    if(black.has(ele2.innerText)){
                        attacking_pos.push(ele2.getAttribute("id"));
                    }
                }
            }
            else if(id[0]=='a'){
                let x=Number(id[1])+1;
                if(x>=1 && x<=8){
                    let ele2=document.querySelector("#"+(String.fromCharCode(id[0].charCodeAt(0) + 1)+x));
                    if(black.has(ele2.innerText)){
                        attacking_pos.push(ele2.getAttribute("id"));
                    }
                }
            }
            else if(id[0]=='h'){
                let x=Number(id[1])+1;
                if(x>=1 && x<=8){
                    let ele1=document.querySelector("#"+(String.fromCharCode(id[0].charCodeAt(0) - 1)+x));
                    if(black.has(ele1.innerText)){
                        attacking_pos.push(ele1.getAttribute("id"));
                    }
                }
            }
        }
    }
    else if(element && (pieces[element.innerText] === "Black Pawn")){
        if(id[0]>'a'&& id[0]<'h'){
            let x=Number(id[1])-1;
            if(x>=1 && x<=8){
                let ele1=document.querySelector("#"+(String.fromCharCode(id[0].charCodeAt(0) - 1)+x));
                let ele2=document.querySelector("#"+(String.fromCharCode(id[0].charCodeAt(0) + 1)+x));
                if(white.has(ele1.innerText)){
                    attacking_pos.push(ele1.getAttribute("id"));
                }
                if(white.has(ele2.innerText)){
                    attacking_pos.push(ele2.getAttribute("id"));
                }
            }
        }
        else if(id[0]=='a'){
            let x=Number(id[1])-1;
            if(x>=1 && x<=8){
                let ele2=document.querySelector("#"+(String.fromCharCode(id[0].charCodeAt(0) + 1)+x));
                if(white.has(ele2.innerText)){
                    attacking_pos.push(ele2.getAttribute("id"));
                }
            }
        }
        else if(id[0]=='h'){
            let x=Number(id[1])-1;
            if(x>=1 && x<=8){
                let ele1=document.querySelector("#"+(String.fromCharCode(id[0].charCodeAt(0) - 1)+x));
                if(white.has(ele1.innerText)){
                    attacking_pos.push(ele1.getAttribute("id"));
                }
            }  
        }
    }
    else if(element && (pieces[element.innerText] === "Black Knight" || pieces[element.innerText] === "White Knight")){
        let idLetter = id[0];
        let idNum = Number(id[1]);
        let temp = 0;
        let destId = []; // Clockwise ids of possible positions of the knight from id
        temp = idNum + 2;
        destId[0] = String.fromCharCode(idLetter.charCodeAt(0) - 1) + temp;
        destId[1] = String.fromCharCode(idLetter.charCodeAt(0) + 1) + temp;
        temp = idNum + 1;
        destId[2] = String.fromCharCode(idLetter.charCodeAt(0) + 2) + temp;
        temp = idNum - 1;
        destId[3] = String.fromCharCode(idLetter.charCodeAt(0) + 2) + temp;
        temp = idNum - 2;
        destId[4] = String.fromCharCode(idLetter.charCodeAt(0) + 1) + temp;
        destId[5] = String.fromCharCode(idLetter.charCodeAt(0) - 1) + temp;
        temp = idNum - 1;
        destId[6] = String.fromCharCode(idLetter.charCodeAt(0) - 2) + temp;
        temp = idNum + 1;
        destId[7] = String.fromCharCode(idLetter.charCodeAt(0) - 2) + temp;
        if(pieces[element.innerText] === "White Knight"){
            destId.forEach((e)=>{
                if(e[0] >= "a" && e[0] <= "h" && e[1] >= "1" && e[1] <="8"){
                    let ele = document.querySelector("#"+e);
                    if(ele && !white.has(ele.innerText))
                        attacking_pos.push(e);
                }
            });
        }
        // If Black Knight is Selected
        else if(pieces[element.innerText] === "Black Knight"){
            destId.forEach((e)=>{
                if(e[0] >= "a" && e[0] <= "h" && e[1] >= "1" && e[1] <="8"){
                    let ele = document.querySelector("#"+e);
                    if(ele && !black.has(ele.innerText))
                        attacking_pos.push(e);
                }
            });
        }
    }
    else if(element && (pieces[element.innerText] === "Black Rook")){
        let idLetter = id[0];
        let idNum = Number(id[1]);
        // Checking from Rook position to top
        for(let i=idNum+1;i<=8;i++){
            let elem = document.querySelector("#"+idLetter+i);
            if(elem){
                if(black.has(elem.innerText)){
                    break;
                }
                attacking_pos.push(idLetter+i);
                if(white.has(elem.innerText)){
                    break;
                }
            }
        }
        // Checking from Rook position to bottom
        for(let i=idNum-1;i>0;i--){
            let elem = document.querySelector("#"+idLetter+i);
            if(elem){
                if(black.has(elem.innerText)){
                    break;
                }
                attacking_pos.push(idLetter+i);
                if(white.has(elem.innerText)){
                    break;
                }
            }
        }
        // Checking from Rook position to right
        let x = idLetter.charCodeAt(0);
        for(let i= x+1;i<x+8;i++){
            let convLetter = String.fromCharCode(i)
            if(convLetter >= "a" && convLetter <= "h"){
                let elem = document.querySelector("#"+convLetter+idNum);
                if(elem){
                    if(black.has(elem.innerText)){
                        break;
                    }
                    attacking_pos.push(convLetter+idNum);
                    if(white.has(elem.innerText)){
                        break;
                    }
                }
            }
        }
        // Checking from Rook position to left
        for(let i= x-1;i>x-8;i--){
            let convLetter = String.fromCharCode(i)
            if(convLetter >= "a" && convLetter <= "h"){
                let elem = document.querySelector("#"+convLetter+idNum);
                if(elem){
                    if(black.has(elem.innerText)){
                        break;
                    }
                    attacking_pos.push(convLetter+idNum);
                    if(white.has(elem.innerText)){
                        break;
                    }
                }
            }
        }
    }
    else if(element && (pieces[element.innerText] === "White Rook")){
        let idLetter = id[0];
        let idNum = Number(id[1]);
        // Checking from Rook position to top
        for(let i=idNum+1;i<=8;i++){
            let element = document.querySelector("#"+idLetter+i);
            if(element){
                if(white.has(element.innerText)){
                    break;
                }
                attacking_pos.push(idLetter+i);
                if(black.has(element.innerText)){
                    break;
                }
            }
        }
        // Checking from Rook position to bottom
        for(let i=idNum-1;i>0;i--){
            let element = document.querySelector("#"+idLetter+i);
            if(element){
                if(white.has(element.innerText)){
                    break;
                }
                attacking_pos.push(idLetter+i);
                if(black.has(element.innerText)){
                    break;
                }
            }
        }
        // Checking from Rook position to right
        let x = idLetter.charCodeAt(0);
        for(let i= x+1;i<x+8;i++){
            let convLetter = String.fromCharCode(i);
            if(convLetter >= "a" && convLetter <= "h"){
                let element = document.querySelector("#"+convLetter+idNum);
                if(element){
                    if(white.has(element.innerText)){
                        break;
                    }
                    attacking_pos.push(convLetter+idNum);
                    if(black.has(element.innerText)){
                        break;
                    }
                }
            }
        }
        // Checking from Rook position to left
        for(let i= x-1;i>x-8;i--){
            let convLetter = String.fromCharCode(i);
            if(convLetter >= "a" && convLetter <= "h"){
                let element = document.querySelector("#"+convLetter+idNum);
                if(element){
                    if(white.has(element.innerText)){
                        break;
                    }
                    attacking_pos.push(convLetter+idNum);
                    if(black.has(element.innerText)){
                        break;
                    }
                }
            }
        }
    }
    else if(element && (pieces[element.innerText] === "Black Bishop" || pieces[element.innerText] === "White Bishop")){
        let idLetter = id[0];
        let idNum = Number(id[1]);
        let destId = [];
        // from selected to top right positions
        for(let i=1;i<8;i++){
            let x = String.fromCharCode(idLetter.charCodeAt(0)+i);
            let y = idNum+i;
            destId.push(x+y);
        }
        // from selected to top left positions
        for(let i=1;i<8;i++){
            let x = String.fromCharCode(idLetter.charCodeAt(0)-i);
            let y = idNum+i;
            destId.push(x+y);
        }
        // from selected to bottom right posirions
        for(let i=1;i<8;i++){
            let x = String.fromCharCode(idLetter.charCodeAt(0)+i);
            let y = idNum-i;
            destId.push(x+y);
        }
        // from selected to bottom left positions
        for(let i=1;i<8;i++){
            let x = String.fromCharCode(idLetter.charCodeAt(0)-i);
            let y = idNum-i;
            destId.push(x+y);
        }

        // If selected is Black Bishop
        if(pieces[element.innerText] === "Black Bishop"){
            // Checking from selected to top right positions
            for(let i=0;i<7;i++){
                if(destId[i][0]>='a' && destId[i][0]<='h' && destId[i][1]>='1' && destId[i][1]<='8'){
                    let elem = document.querySelector("#"+destId[i]);
                    if(elem){
                        if(black.has(elem.innerText)){
                            break;
                        }
                        attacking_pos.push(destId[i]);
                        if(white.has(elem.innerText)){
                            break;
                        }
                    }
                }
            }
            // Checking from selected to top left positions
            for(let i=7;i<14;i++){
                if(destId[i][0]>='a' && destId[i][0]<='h' && destId[i][1]>='1' && destId[i][1]<='8'){
                    let elem = document.querySelector("#"+destId[i]);
                    if(elem){
                        if(black.has(elem.innerText)){
                            break;
                        }
                        attacking_pos.push(destId[i]);
                        if(white.has(elem.innerText)){
                            break;
                        }
                    }
                }
            }
            // Checking from selected to bottom right positions
            for(let i=14;i<21;i++){
                if(destId[i][0]>='a' && destId[i][0]<='h' && destId[i][1]>='1' && destId[i][1]<='8'){
                    let elem = document.querySelector("#"+destId[i]);
                    if(elem){
                        if(black.has(elem.innerText)){
                            break;
                        }
                        attacking_pos.push(destId[i]);
                        if(white.has(elem.innerText)){
                            break;
                        }
                    }
                }
            }
            // Checking from position to bottom left positions
            for(let i=21;i<28;i++){
                if(destId[i][0]>='a' && destId[i][0]<='h' && destId[i][1]>='1' && destId[i][1]<='8'){
                    let elem = document.querySelector("#"+destId[i]);
                    if(elem){
                        if(black.has(elem.innerText)){
                            break;
                        }
                        attacking_pos.push(destId[i]);
                        if(white.has(elem.innerText)){
                            break;
                        }
                    }
                }
            }
        }
        // If selected is White Bishop
        else if(pieces[element.innerText] === "White Bishop") {
            // Checking from selected to top right positions
            for(let i=0;i<7;i++){
                if(destId[i][0]>='a' && destId[i][0]<='h' && destId[i][1]>='1' && destId[i][1]<='8'){
                    let elem = document.querySelector("#"+destId[i]);
                    if(elem){
                        if(white.has(elem.innerText)){
                            break;
                        }
                        attacking_pos.push(destId[i]);
                        if(black.has(elem.innerText)){
                            break;
                        }
                    }
                }
            }
            // Checking from selected to top left positions
            for(let i=7;i<14;i++){
                if(destId[i][0]>='a' && destId[i][0]<='h' && destId[i][1]>='1' && destId[i][1]<='8'){
                    let elem = document.querySelector("#"+destId[i]);
                    if(elem){
                        if(white.has(elem.innerText)){
                            break;
                        }
                        attacking_pos.push(destId[i]);
                        if(black.has(elem.innerText)){
                            break;
                        }
                    }
                }
            }
            // Checking from selected to bottom right positions
            for(let i=14;i<21;i++){
                if(destId[i][0]>='a' && destId[i][0]<='h' && destId[i][1]>='1' && destId[i][1]<='8'){
                    let elem = document.querySelector("#"+destId[i]);
                    if(elem){
                        if(white.has(elem.innerText)){
                            break;
                        }
                        attacking_pos.push(destId[i]);
                        if(black.has(elem.innerText)){
                            break;
                        }
                    }
                }
            }
            // Checking from position to bottom left positions
            for(let i=21;i<28;i++){
                if(destId[i][0]>='a' && destId[i][0]<='h' && destId[i][1]>='1' && destId[i][1]<='8'){
                    let elem = document.querySelector("#"+destId[i]);
                    if(elem){
                        if(white.has(elem.innerText)){
                            break;
                        }
                        attacking_pos.push(destId[i]);
                        if(black.has(elem.innerText)){
                            break;
                        }
                    }
                }
            }
        }
    }
    else if(element && (pieces[element.innerText] === "Black Queen" || pieces[element.innerText] === "White Queen")){
        let idLetter = id[0];
        let idNum = Number(id[1]);
        // To store the destination ids of the queen in the digonal positions
        let destIdDiagonal = [];
        // from selected to top right positions
        for(let i=1;i<8;i++){
            let x = String.fromCharCode(idLetter.charCodeAt(0)+i);
            let y = idNum+i;
            destIdDiagonal.push(x+y);
        }
        // from selected to top left positions
        for(let i=1;i<8;i++){
            let x = String.fromCharCode(idLetter.charCodeAt(0)-i);
            let y = idNum+i;
            destIdDiagonal.push(x+y);
        }
        // from selected to bottom right posirions
        for(let i=1;i<8;i++){
            let x = String.fromCharCode(idLetter.charCodeAt(0)+i);
            let y = idNum-i;
            destIdDiagonal.push(x+y);
        }
        // from selected to bottom left positions
        for(let i=1;i<8;i++){
            let x = String.fromCharCode(idLetter.charCodeAt(0)-i);
            let y = idNum-i;
            destIdDiagonal.push(x+y);
        }
        if(pieces[element.innerText] === "Black Queen"){
            // 1. Row and Column Checking
            // Checking from Queen position to top
            for(let i=idNum+1;i<=8;i++){
                let elem = document.querySelector("#"+idLetter+i);
                if(elem){
                    if(black.has(elem.innerText)){
                        break;
                    }
                    attacking_pos.push(idLetter+i);
                    if(white.has(elem.innerText)){
                        break;
                    }
                }
            }
            // Checking from Queen position to bottom
            for(let i=idNum-1;i>0;i--){
                let elem = document.querySelector("#"+idLetter+i);
                if(elem){
                    if(black.has(elem.innerText)){
                        break;
                    }
                    attacking_pos.push(idLetter+i);
                    if(white.has(elem.innerText)){
                        break;
                    }
                }
            }
            // Checking from Queen position to right
            let x = idLetter.charCodeAt(0);
            for(let i= x+1;i<x+8;i++){
                let convLetter = String.fromCharCode(i)
                if(convLetter >= "a" && convLetter <= "h"){
                    let elem = document.querySelector("#"+convLetter+idNum);
                    if(elem){
                        if(black.has(elem.innerText)){
                            break;
                        }
                        attacking_pos.push(convLetter+idNum);
                        if(white.has(elem.innerText)){
                            break;
                        }
                    }
                }
            }
            // Checking from Queen position to left
            for(let i= x-1;i>x-8;i--){
                let convLetter = String.fromCharCode(i)
                if(convLetter >= "a" && convLetter <= "h"){
                    let elem = document.querySelector("#"+convLetter+idNum);
                    if(elem){
                        if(black.has(elem.innerText)){
                            break;
                        }
                        attacking_pos.push(convLetter+idNum);
                        if(white.has(elem.innerText)){
                            break;
                        }
                    }
                }
            }

            // 2.Diagonal Checking
            // Checking from selected to top right positions
            for(let i=0;i<7;i++){
                if(destIdDiagonal[i][0]>='a' && destIdDiagonal[i][0]<='h' && destIdDiagonal[i][1]>='1' && destIdDiagonal[i][1]<='8'){
                    let elem = document.querySelector("#"+destIdDiagonal[i]);
                    if(elem){
                        if(black.has(elem.innerText)){
                            break;
                        }
                        attacking_pos.push(destIdDiagonal[i]);
                        if(white.has(elem.innerText)){
                            break;
                        }
                    }
                }
            }

            // Checking from selected to top left positions
            for(let i=7;i<14;i++){
                if(destIdDiagonal[i][0]>='a' && destIdDiagonal[i][0]<='h' && destIdDiagonal[i][1]>='1' && destIdDiagonal[i][1]<='8'){
                    let elem = document.querySelector("#"+destIdDiagonal[i]);
                    if(elem){
                        if(black.has(elem.innerText)){
                            break;
                        }
                        attacking_pos.push(destIdDiagonal[i]);
                        if(white.has(elem.innerText)){
                            break;
                        }
                    }
                }
            }
            // Checking from selected to bottom right positions
            for(let i=14;i<21;i++){
                if(destIdDiagonal[i][0]>='a' && destIdDiagonal[i][0]<='h' && destIdDiagonal[i][1]>='1' && destIdDiagonal[i][1]<='8'){
                    let elem = document.querySelector("#"+destIdDiagonal[i]);
                    if(elem){
                        if(black.has(elem.innerText)){
                            break;
                        }
                        attacking_pos.push(destIdDiagonal[i]);
                        if(white.has(elem.innerText)){
                            break;
                        }
                    }
                }
            }
            // Checking from position to bottom left positions
            for(let i=21;i<28;i++){
                if(destIdDiagonal[i][0]>='a' && destIdDiagonal[i][0]<='h' && destIdDiagonal[i][1]>='1' && destIdDiagonal[i][1]<='8'){
                    let elem = document.querySelector("#"+destIdDiagonal[i]);
                    if(elem){
                        if(black.has(elem.innerText)){
                            break;
                        }
                        attacking_pos.push(destIdDiagonal[i]);
                        if(white.has(elem.innerText)){
                            break;
                        }
                    }
                }
            }
        }
        else if(pieces[element.innerText] === "White Queen"){
            // 1. Row and Column Checking
            // Checking from Queen position to top
            for(let i=idNum+1;i<=8;i++){
                let elem = document.querySelector("#"+idLetter+i);
                if(elem){
                    if(white.has(elem.innerText)){
                        break;
                    }
                    attacking_pos.push(idLetter+i);
                    if(black.has(elem.innerText)){
                        break;
                    }
                }
            }
            // Checking from Queen position to bottom
            for(let i=idNum-1;i>0;i--){
                let elem = document.querySelector("#"+idLetter+i);
                if(elem){
                    if(white.has(elem.innerText)){
                        break;
                    }
                    attacking_pos.push(idLetter+i);
                    if(black.has(elem.innerText)){
                        break;
                    }
                }
            }
            // Checking from Queen position to right
            let x = idLetter.charCodeAt(0);
            for(let i= x+1;i<x+8;i++){
                let convLetter = String.fromCharCode(i)
                if(convLetter >= "a" && convLetter <= "h"){
                    let elem = document.querySelector("#"+convLetter+idNum);
                    if(elem){
                        if(white.has(elem.innerText)){
                            break;
                        }
                        attacking_pos.push(convLetter+idNum);
                        if(black.has(elem.innerText)){
                            break;
                        }
                    }
                }
            }
            // Checking from Queen position to left
            for(let i= x-1;i>x-8;i--){
                let convLetter = String.fromCharCode(i)
                if(convLetter >= "a" && convLetter <= "h"){
                    let elem = document.querySelector("#"+convLetter+idNum);
                    if(elem){
                        if(white.has(elem.innerText)){
                            break;
                        }
                        attacking_pos.push(convLetter+idNum);
                        if(black.has(elem.innerText)){
                            break;
                        }
                    }
                }
            }

            // 2.Diagonal Checking
            // Checking from selected to top right positions
            for(let i=0;i<7;i++){
                if(destIdDiagonal[i][0]>='a' && destIdDiagonal[i][0]<='h' && destIdDiagonal[i][1]>='1' && destIdDiagonal[i][1]<='8'){
                    let elem = document.querySelector("#"+destIdDiagonal[i]);
                    if(elem){
                        if(white.has(elem.innerText)){
                            break;
                        }
                        attacking_pos.push(destIdDiagonal[i]);
                        if(black.has(elem.innerText)){
                            break;
                        }
                    }
                }
            }

            // Checking from selected to top left positions
            for(let i=7;i<14;i++){
                if(destIdDiagonal[i][0]>='a' && destIdDiagonal[i][0]<='h' && destIdDiagonal[i][1]>='1' && destIdDiagonal[i][1]<='8'){
                    let elem = document.querySelector("#"+destIdDiagonal[i]);
                    if(elem){
                        if(white.has(elem.innerText)){
                            break;
                        }
                        attacking_pos.push(destIdDiagonal[i]);
                        if(black.has(elem.innerText)){
                            break;
                        }
                    }
                }
            }
            // Checking from selected to bottom right positions
            for(let i=14;i<21;i++){
                if(destIdDiagonal[i][0]>='a' && destIdDiagonal[i][0]<='h' && destIdDiagonal[i][1]>='1' && destIdDiagonal[i][1]<='8'){
                    let elem = document.querySelector("#"+destIdDiagonal[i]);
                    if(elem){
                        if(white.has(elem.innerText)){
                            break;
                        }
                        attacking_pos.push(destIdDiagonal[i]);
                        if(black.has(elem.innerText)){
                            break;
                        }
                    }
                }
            }
            // Checking from position to bottom left positions
            for(let i=21;i<28;i++){
                if(destIdDiagonal[i][0]>='a' && destIdDiagonal[i][0]<='h' && destIdDiagonal[i][1]>='1' && destIdDiagonal[i][1]<='8'){
                    let elem = document.querySelector("#"+destIdDiagonal[i]);
                    if(elem){
                        if(white.has(elem.innerText)){
                            break;
                        }
                        attacking_pos.push(destIdDiagonal[i]);
                        if(black.has(elem.innerText)){
                            break;
                        }
                    }
                }
            }
        }
    }
    return attacking_pos;
}

function getMovingPositionsPawn(Color,id){
    finalMoves=[];
    if(Color === "White"){
        // Selected box will be highlighted
        let moves=1,num;
        if(twoMovesPawn.has(id)){
            moves=2;
        }
        // Highligthing the possible moves
        for(let i=1;i<=moves;i++){
            num=Number(id[1])+i;
            if(num>=1 && num<=8){
                let choiceBtn=document.querySelector("#"+id[0]+num);
                if(choiceBtn.innerText in pieces){
                    // If any piece is present in front of pawn stop
                    break;
                }
                finalMoves.push(id[0]+num);
            }
        }

        // Checking for killing (from White Pawn)
        if(id[0]>'a'&& id[0]<'h'){
            let x=Number(id[1])+1;
            if(x>=1 && x<=8){
                let ele1=document.querySelector("#"+(String.fromCharCode(id[0].charCodeAt(0) - 1)+x));
                let ele2=document.querySelector("#"+(String.fromCharCode(id[0].charCodeAt(0) + 1)+x));
                if(black.has(ele1.innerText)){
                    finalMoves.push(ele1.getAttribute("id"));
                }
                if(black.has(ele2.innerText)){
                    finalMoves.push(ele2.getAttribute("id"));
                }
            }
        }
        else if(id[0]=='a'){
            let x=Number(id[1])+1;
            if(x>=1 && x<=8){
                let ele2=document.querySelector("#"+(String.fromCharCode(id[0].charCodeAt(0) + 1)+x));
                if(black.has(ele2.innerText)){
                    finalMoves.push(ele2.getAttribute("id"));
                }
            }
        }
        else if(id[0]=='h'){
            let x=Number(id[1])+1;
            if(x>=1 && x<=8){
                let ele1=document.querySelector("#"+(String.fromCharCode(id[0].charCodeAt(0) - 1)+x));
                if(black.has(ele1.innerText)){
                    finalMoves.push(ele1.getAttribute("id"));
                }
            }
        }
    }

    // If selected is Black Pawn
    else if(Color === "Black"){
        let moves=1,num;
        if(twoMovesPawn.has(id)){
            moves=2;
        }
        // Highlighting the possible moves
        for(let i=1;i<=moves;i++){
            num=Number(id[1])-i;
            if(num>=1 && num<=8){
                let choiceBtn=document.querySelector("#"+id[0]+num);
                if(choiceBtn.innerText in pieces){
                    // If there are any pieces infront of pawn stop
                    break;
                }
                // Highlight the positions where pawn can go
                finalMoves.push(id[0]+num);
            }
        }

        // Checking for Killing (From Black Pawn)
        if(id[0]>'a'&& id[0]<'h'){
            let x=Number(id[1])-1;
            if(x>=1 && x<=8){
                let ele1=document.querySelector("#"+(String.fromCharCode(id[0].charCodeAt(0) - 1)+x));
                let ele2=document.querySelector("#"+(String.fromCharCode(id[0].charCodeAt(0) + 1)+x));
                if(white.has(ele1.innerText)){
                    finalMoves.push(ele1.getAttribute("id"));
                }
                if(white.has(ele2.innerText)){
                    finalMoves.push(ele2.getAttribute("id"));
                }
            }
        }
        else if(id[0]=='a'){
            let x=Number(id[1])-1;
            if(x>=1 && x<=8){
                let ele2=document.querySelector("#"+(String.fromCharCode(id[0].charCodeAt(0) + 1)+x));
                if(white.has(ele2.innerText)){
                    finalMoves.push(ele2.getAttribute("id"));
                }
            }
        }
        else if(id[0]=='h'){
            let x=Number(id[1])-1;
            if(x>=1 && x<=8){
                let ele1=document.querySelector("#"+(String.fromCharCode(id[0].charCodeAt(0) - 1)+x));
                if(white.has(ele1.innerText)){
                    finalMoves.push(ele1.getAttribute("id"));
                }
            }  
        }
    }
    return finalMoves;
}

function isCheck(givenBoard,KingColor,id){
    let danger = false;
    let opp_positions = getOpponentPositions(givenBoard,KingColor);
    opp_positions.forEach((pos)=>{
        attacks = getAttackingPositions(pos);
        attacks.forEach((attack_id)=>{
            if(attack_id === id){
                danger = true;
            }
        });
    });
    return danger;
}

function getAttackingKingPos(KingColor,id){
    let opp_positions = getOpponentPositions(boardPieces,KingColor);
    opp_positions.forEach((pos)=>{
        attacks = getAttackingPositions(pos);
        attacks.forEach((attack_id)=>{
            if(attack_id === id){
                return pos;
            }
        });
    });
}

function getKingMoves(KingColor,id){
    let idLetter = id[0];
    let idNum = Number(id[1]);
    let destId = [];
    let finalMoves =[];
    // Upper Row
    let temp = idNum+1;
    let x = idLetter.charCodeAt(0);
    for(let i=x-1;i<=x+1;i++){
        destId.push(String.fromCharCode(i)+temp);
    }
    // Current Row
    temp = idNum;
    destId.push(String.fromCharCode(x-1)+temp);
    destId.push(String.fromCharCode(x+1)+temp);
    // Lower Row
    temp = idNum-1;
    for(let i=x-1;i<=x+1;i++){
        destId.push(String.fromCharCode(i)+temp);
    }

    // If Black King is selected
    if(KingColor === "Black") {
        for(let i=0;i<destId.length;i++){
            let ele = destId[i];
            if(ele[0]>="a" && ele[0]<="h" && ele[1]>="1" && ele[1]<="8"){
                if(isValidPosition(ele,"Black King")){
                    finalMoves.push(ele);
                }
            }
        }
    }
    // If White King is selected
    else if(KingColor === "White") {
        for(let i=0;i<destId.length;i++){
            let ele = destId[i];
            if(ele[0]>="a" && ele[0]<="h" && ele[1]>="1" && ele[1]<="8"){
                if(isValidPosition(ele,"White King")){
                    finalMoves.push(ele);
                }
            }
        }
    }
    return finalMoves;
}

// Checks if any king has Checkmate
function isCheckMate(KingColor,id){
    if(isCheck(boardPieces,KingColor,id)){
        // let copyBoardPieces = Object.assign([], boardPieces);
        let copyBoardPieces = boardPieces.map(row=>row.slice())
        kingAttackingPos = [];
        //White
        if(KingColor=="White"){
            for(let i=0;i<8;i++){
                for(let j=0;j<8;j++){
                    if(copyBoardPieces[i][j] == copyBoardPieces[i][j].toUpperCase()){
                        //If it is Pawn
                        if(copyBoardPieces[i][j] === 'P'){
                            moves = getMovingPositionsPawn("White",getIdFromBoardPosition({"row":i,"col":j}));
                            for(move of moves){
                                let new_pos=getBoardPositionFromId(move);
                                [copyBoardPieces[i][j], copyBoardPieces[new_pos.row][new_pos.col]] = [copyBoardPieces[new_pos.row][new_pos.col], copyBoardPieces[i][j]];
                                if(!isCheck(copyBoardPieces,"White",id)){
                                    return false; 
                                }
                            }
                        }
                        else if(copyBoardPieces[i][j] === "K"){
                            moves = getKingMoves("White",whiteKingId);
                            if(moves.length !== 0){
                                return false;
                            }
                        }
                        else if(copyBoardPieces[i][j] !== ""){
                            moves = getAttackingPositions(getIdFromBoardPosition({"row":i,"col":j}));
                            for(move of moves){
                                let new_pos=getBoardPositionFromId(move);
                                [copyBoardPieces[i][j], copyBoardPieces[new_pos.row][new_pos.col]] = [copyBoardPieces[new_pos.row][new_pos.col], copyBoardPieces[i][j]];
                                if(!isCheck(copyBoardPieces,"White",id)){
                                    return false; 
                                }
                            }
                        }
                    }
                }
            }
        }
        else{
            for(let i=0;i<8;i++){
                for(let j=0;j<8;j++){
                    if(copyBoardPieces[i][j] == copyBoardPieces[i][j].toLowerCase()){
                        //If it is Pawn
                        if(copyBoardPieces[i][j] === 'p'){
                            moves = getMovingPositionsPawn("Black",getIdFromBoardPosition({"row":i,"col":j}));
                            for(move of moves){
                                let new_pos=getBoardPositionFromId(move);
                                [copyBoardPieces[i][j], copyBoardPieces[new_pos.row][new_pos.col]] = [copyBoardPieces[new_pos.row][new_pos.col], copyBoardPieces[i][j]];
                                if(!isCheck(copyBoardPieces,"Black",id)){
                                    return false; 
                                }
                            }
                        }
                        else if(copyBoardPieces[i][j] == 'k'){
                            moves = getKingMoves("Black",blackKingId);
                            if(moves.length !==0){
                                return false;
                            }
                        }
                        else if(copyBoardPieces[i][j] !== ""){
                            moves = getAttackingPositions(getIdFromBoardPosition({"row":i,"col":j}));
                            for(move of moves){
                                let new_pos=getBoardPositionFromId(move);
                                [copyBoardPieces[i][j], copyBoardPieces[new_pos.row][new_pos.col]] = [copyBoardPieces[new_pos.row][new_pos.col], copyBoardPieces[i][j]];
                                if(!isCheck(copyBoardPieces,"Black",id)){
                                    return false; 
                                }
                            }
                        }
                    }
                }
            }
        }
        return true;
    }
    return false;
}


const styleChessBoard = () => {
    //Coloring the board
    for(let i=1;i<17;i+=4){
        let startWhite = true;
        for(let j=1;j<17;j+=4){
            if(startWhite){
                board.childNodes[i].childNodes[j].style.backgroundColor=whiteColor;
            }
            else{
                board.childNodes[i].childNodes[j].style.backgroundColor=greenColor;
            }
            startWhite!=startWhite;
        }
    }
    for(let i=3;i<17;i+=4){
        let startWhite = true;
        for(let j=3;j<17;j+=4){
            if(startWhite){
                board.childNodes[i].childNodes[j].style.backgroundColor=whiteColor;
            }
            else{
                board.childNodes[i].childNodes[j].style.backgroundColor=greenColor;
            }
            startWhite!=startWhite;
        }
    }
}

document.addEventListener("DOMContentLoaded",styleChessBoard);

const highlightBoard = (fromPieceColor) => {
    highlighted.forEach((eleId)=>{
        let ele = document.querySelector("#"+eleId);
        if(fromPieceColor === "Black"){
            if(ele.innerText === ""){
                ele.innerHTML="&#x2022";
                ele.style.color="red";
            }
            else if(white.has(ele.innerText)){
                ele.style.color="red";
            }
        }
        else if(fromPieceColor === "White"){
            if(ele.innerText === ""){
                ele.innerHTML="&#x2022";
                ele.style.color="red";
            }
            else if(black.has(ele.innerText)){
                ele.style.color="red";
            }
        }
    });
} 

// Pawn Moves Method
const pawnSelected = (e,selected,id) => {

    // If White Pawn is Selected
    if(selected=="White Pawn"){
        // Selected box will be highlighted
        e.target.style.border='5px solid black';
        let moves=1,num;
        if(twoMovesPawn.has(id)){
            moves=2;
        }
        // Highligthing the possible moves
        for(let i=1;i<=moves;i++){
            num=Number(id[1])+i;
            if(num>=1 && num<=8){
                let choiceBtn=document.querySelector("#"+id[0]+num);
                if(choiceBtn.innerText in pieces){
                    // If any piece is present in front of pawn stop
                    break;
                }
                // Highlight the positions where pawn can go
                choiceBtn.innerHTML="&#x2022";
                choiceBtn.style.color="red";
                highlighted.add(id[0]+num);
            }
        }

        // Checking for killing (from White Pawn)
        if(id[0]>'a'&& id[0]<'h'){
            let x=Number(id[1])+1;
            if(x>=1 && x<=8){
                let ele1=document.querySelector("#"+(String.fromCharCode(id[0].charCodeAt(0) - 1)+x));
                let ele2=document.querySelector("#"+(String.fromCharCode(id[0].charCodeAt(0) + 1)+x));
                if(black.has(ele1.innerText)){
                    ele1.style.color='red';
                    highlighted.add(ele1.getAttribute("id"));
                }
                if(black.has(ele2.innerText)){
                    ele2.style.color='red';
                    highlighted.add(ele2.getAttribute("id"));
                }
            }
        }
        else if(id[0]=='a'){
            let x=Number(id[1])+1;
            if(x>=1 && x<=8){
                let ele2=document.querySelector("#"+(String.fromCharCode(id[0].charCodeAt(0) + 1)+x));
                if(black.has(ele2.innerText)){
                    ele2.style.color='red';
                    highlighted.add(ele2.getAttribute("id"));
                }
            }
        }
        else if(id[0]=='h'){
            let x=Number(id[1])+1;
            if(x>=1 && x<=8){
                let ele1=document.querySelector("#"+(String.fromCharCode(id[0].charCodeAt(0) - 1)+x));
                if(black.has(ele1.innerText)){
                    ele1.style.color='red';
                    highlighted.add(ele1.getAttribute("id"));
                }
            }
        }
    }

    // If selected is Black Pawn
    else if(selected=="Black Pawn"){
        e.target.style.border='5px solid black';
        let moves=1,num;
        if(twoMovesPawn.has(id)){
            moves=2;
        }
        // Highlighting the possible moves
        for(let i=1;i<=moves;i++){
            num=Number(id[1])-i;
            if(num>=1 && num<=8){
                let choiceBtn=document.querySelector("#"+id[0]+num);
                if(choiceBtn.innerText in pieces){
                    // If there are any pieces infront of pawn stop
                    break;
                }
                // Highlight the positions where pawn can go
                choiceBtn.innerHTML="&#x2022";
                choiceBtn.style.color="red";
                highlighted.add(id[0]+num);
            }
        }

        // Checking for Killing (From Black Pawn)
        if(id[0]>'a'&& id[0]<'h'){
            let x=Number(id[1])-1;
            if(x>=1 && x<=8){
                let ele1=document.querySelector("#"+(String.fromCharCode(id[0].charCodeAt(0) - 1)+x));
                let ele2=document.querySelector("#"+(String.fromCharCode(id[0].charCodeAt(0) + 1)+x));
                if(white.has(ele1.innerText)){
                    ele1.style.color='red';
                    highlighted.add(ele1.getAttribute("id"));
                }
                if(white.has(ele2.innerText)){
                    ele2.style.color='red';
                    highlighted.add(ele2.getAttribute("id"));
                }
            }
        }
        else if(id[0]=='a'){
            let x=Number(id[1])-1;
            if(x>=1 && x<=8){
                let ele2=document.querySelector("#"+(String.fromCharCode(id[0].charCodeAt(0) + 1)+x));
                if(white.has(ele2.innerText)){
                    ele2.style.color='red';
                    highlighted.add(ele2.getAttribute("id"));
                }
            }
        }
        else if(id[0]=='h'){
            let x=Number(id[1])-1;
            if(x>=1 && x<=8){
                let ele1=document.querySelector("#"+(String.fromCharCode(id[0].charCodeAt(0) - 1)+x));
                if(white.has(ele1.innerText)){
                    ele1.style.color='red';
                    highlighted.add(ele1.getAttribute("id"));
                }
            }  
        }
    }
}

// Knight Moves Method
const knightSelected = (e,selected,id) => {
    e.target.style.border = "5px solid black";
    let destId = getAttackingPositions(id);
    destId.forEach(ele => highlighted.add(ele));
    if(selected === "Black Knight"){
        highlightBoard("Black");
    }
    else{
        highlightBoard("White");
    }
}

// Rook Moves Method
const rookSelected = (e,selected, id) => {
    e.target.style.border ='5px solid black';
    let destId = getAttackingPositions(id);
    destId.forEach((ele)=> highlighted.add(ele));
    if(selected === "Black Rook"){
        highlightBoard("Black");
    }
    else{
        highlightBoard("White");
    }
}

// Bishop Moves Method
const bishopSelected = (e, selected, id) => {
    e.target.style.border = "5px solid black";
    let destId = getAttackingPositions(id);
    destId.forEach(ele => highlighted.add(ele));
    if(selected === "Black Bishop"){
        highlightBoard("Black");
    }
    else{
        highlightBoard("White");
    }
}

// Queen Moves Method
const queenSelected = (e, selected, id) => {
    e.target.style.border="5px solid black";
    let destId = getAttackingPositions(id);
    destId.forEach(ele => highlighted.add(ele));
    if(selected === "Black Queen"){
        highlightBoard("Black");
    }
    else{
        highlightBoard("White");
    }
}

// King Moves Method
function kingSelected(e, selected, id) {

    // style the selected king
    e.target.style.border = "5px solid black";
    let idLetter = id[0];
    let idNum = Number(id[1]);
    let destId = [];
    // Upper Row
    let temp = idNum+1;
    let x = idLetter.charCodeAt(0);
    for(let i=x-1;i<=x+1;i++){
        destId.push(String.fromCharCode(i)+temp);
    }
    // Current Row
    temp = idNum;
    destId.push(String.fromCharCode(x-1)+temp);
    destId.push(String.fromCharCode(x+1)+temp);
    // Lower Row
    temp = idNum-1;
    for(let i=x-1;i<=x+1;i++){
        destId.push(String.fromCharCode(i)+temp);
    }

    // If Black King is selected
    if(selected === "Black King") {
        for(let i=0;i<destId.length;i++){
            let ele = destId[i];
            if(ele[0]>="a" && ele[0]<="h" && ele[1]>="1" && ele[1]<="8"){
                if(isValidPosition(ele,selected)){
                    highlighted.add(ele);
                }
            }
        }
        highlightBoard("Black");
    }
    // If White King is selected
    else if(selected === "White King") {
        for(let i=0;i<destId.length;i++){
            let ele = destId[i];
            if(ele[0]>="a" && ele[0]<="h" && ele[1]>="1" && ele[1]<="8"){
                if(isValidPosition(ele,selected)){
                    highlighted.add(ele);
                }
            }
        }
        highlightBoard("White");
    }
}

// My code
// Returns true if the given ele move from id for King is valid

// Another code
// Returns true if the given ele move from id for King is valid
function isValidPosition(ele, selected) {
    // Helper functions to check board boundaries and piece presence
    function isValidCell(cell) {
        return cell[0] >= 'a' && cell[0] <= 'h' && cell[1] >= '1' && cell[1] <= '8';
    }

    function getElement(id) {
        return document.querySelector("#" + id);
    }

    function hasPiece(id, pieces) {
        let element = getElement(id);
        return element && pieces.has(element.innerText);
    }

    function isOpponentPiece(id, opponentPieces) {
        let element = getElement(id);
        return element && opponentPieces.has(element.innerText);
    }

    function isAttackedByKnight(id, knight) {
        const [idLetter, idNum] = [id[0], Number(id[1])];
        const knightMoves = [
            [-2, -1], [-2, +1], [+2, -1], [+2, +1],
            [-1, -2], [-1, +2], [+1, -2], [+1, +2]
        ];
        for (let move of knightMoves) {
            const newId = String.fromCharCode(idLetter.charCodeAt(0) + move[0]) + (idNum + move[1]);
            if(newId[0]>="a" && newId[0]<="h" && newId[1]<="8" && newId[1]>="1"){
                if (hasPiece(newId,opponentPieces) && isValidCell(newId) && getElement(newId).innerText === knight) {
                    return true;
                }
            }
        }
        return false;
    }

    function isAttackedByStraightLine(id, rook, queen) {
        const [idLetter, idNum] = [id[0], Number(id[1])];
        const directions = [
            [+1, 0], [-1, 0], [0, +1], [0, -1]
        ];
        for (let [dx, dy] of directions) {
            for (let step = 1; step < 8; step++) {
                const newId = String.fromCharCode(idLetter.charCodeAt(0) + dx * step) + (idNum + dy * step);
                if (isValidCell(newId)) {
                    let element = getElement(newId);
                    if (element) {
                        if (element.innerText === rook || element.innerText === queen) {
                            return true;
                        }
                        if (element.innerText !== "" && element.innerText !== "♚" && element.innerText !== "♔") {
                            break;
                        }
                    }
                } else {
                    break;
                }
            }
        }
        return false;
    }

    function isAttackedByDiagonalLine(id, bishop, queen, pawn, isWhiteKing) {
        const [idLetter, idNum] = [id[0], Number(id[1])];
        const directions = [
            [+1, +1], [+1, -1], [-1, +1], [-1, -1]
        ];
        for (let [dx, dy] of directions) {
            for (let step = 1; step < 8; step++) {
                const newId = String.fromCharCode(idLetter.charCodeAt(0) + dx * step) + (idNum + dy * step);
                if (isValidCell(newId)) {
                    let element = getElement(newId);
                    if (element) {
                        if ((isWhiteKing && step === 1 && dy === +1 && element.innerText === "♟") || 
                            (!isWhiteKing && step === 1 && dy === -1 && element.innerText === "♙")) {
                            return true;
                        }
                        if (element.innerText === bishop || element.innerText === queen) {
                            return true;
                        }
                        if (element.innerText !== "" && element.innerText !== "♚" && element.innerText !== "♔") {
                            break;
                        }
                    }
                } else {
                    break;
                }
            }
        }
        return false;
    }

    function isAdjacentToOpponentKing(id, opponentKing) {
        const [idLetter, idNum] = [id[0], Number(id[1])];
        const kingMoves = [
            [-1, -1], [-1, 0], [-1, +1],
            [0, -1], [0, +1],
            [+1, -1], [+1, 0], [+1, +1]
        ];
        for (let move of kingMoves) {
            const newId = String.fromCharCode(idLetter.charCodeAt(0) + move[0]) + (idNum + move[1]);
            if (isValidCell(newId) && getElement(newId).innerText === opponentKing) {
                return true;
            }
        }
        return false;
    }

    if (!isValidCell(ele)) return false;

    const isWhiteKing = selected === "White King";
    const king = isWhiteKing ? "♔" : "♚";
    const opponentKnight = isWhiteKing ? "♞" : "♘";
    const opponentRook = isWhiteKing ? "♜" : "♖";
    const opponentBishop = isWhiteKing ? "♝" : "♗";
    const opponentQueen = isWhiteKing ? "♛" : "♕";
    const opponentPawn = isWhiteKing ? "♟" : "♙";
    const opponentKing = isWhiteKing ? "♚" : "♔";

    const ownPieces = isWhiteKing ? white : black;
    const opponentPieces = isWhiteKing ? black : white;

    if (ownPieces.has(getElement(ele).innerText)) return false;
    if (isAdjacentToOpponentKing(ele, opponentKing)) return false;

    if (isAttackedByKnight(ele, opponentKnight)) return false;
    if (isAttackedByStraightLine(ele, opponentRook, opponentQueen)) return false;
    if (isAttackedByDiagonalLine(ele, opponentBishop, opponentQueen, opponentPawn, isWhiteKing)) return false;

    return true;
}

function clearHighlights() {
    highlighted.forEach((ele) => {
        let element = document.querySelector("#" + ele);
        element.style.color = "black";
        if (element.innerHTML === "•") {  // Assuming "•" represents the highlight dot
            element.innerHTML = "";
        }
    });
    highlighted.clear();
}

function clearAllButtons(){
    clearHighlights();
    if(fromPieceId!=="" && fromPieceId!==prevFromPieceId)
        document.querySelector("#"+fromPieceId).style.border='1px solid black';
    fromPieceId="";
}



function findKingPos(value){
    for(let i=0;i<8;i++){
        for(let j=0;j<8;j++){
            if(boardPieces[i][j]===value){
                return {"row":i,"col":j};
            }
        }
    }
    return {"row":-1,"col":-1};
}

function diableAllButtons(){
    for(let i=0;i<8;i++){
        for(let j=0;j<8;j++){
            let id=getIdFromBoardPosition({"row":i,"col":j});
            document.querySelector("#"+id).disabled=true;
        }
    }
}

//Checking if a pawn is present for promotion
function checkForPromote(){
    for(let i=0;i<8;i++){
        if(boardPieces[0][i]=== 'P'){
            //If there is a white pawn in promotion
            promoteId=getIdFromBoardPosition({"row":0,"col":i});
            promotePawn("White");
            break;
        }
    }
    for(let i=0;i<8;i++){
        if(boardPieces[7][i] === 'p'){
            //If there is a black pawn in promotion
            promoteId=getIdFromBoardPosition({"row":7,"col":i});
            promotePawn("Black");
            break;
        }
    }
    
}

function movePiece(start,end){
    
    let piece = boardPieces[start.row][start.col];
    boardPieces[start.row][start.col]='';
    boardPieces[end.row][end.col]=piece;
    
    let a = findKingPos("K");
    let b = findKingPos("k");
    console.log(boardPieces);
    console.log("White King: ",a,"Black King: ",b);
    let wKing = getIdFromBoardPosition(a);
    let bKing = getIdFromBoardPosition(b);
    console.log("White King:",wKing);
    console.log("Black King: ",bKing);
    whiteKingId = wKing;
    blackKingId = bKing;
    whiteMove = !whiteMove;
    alternateMoves(whiteMove);
}

// Update the count of kills
function updateKillsCount(position){
    // Lower is black , Uppercase is white
    let ele=boardPieces[position.row][position.col];
    // If Pawns
    if(ele === 'p'){
        let curr=Number(blackPawnNum.innerText);
        curr++;
        blackPawnNum.innerText=curr;
    }
    else if(ele === 'P'){
        let curr=Number(whitePawnNum.innerText);
        curr++;
        whitePawnNum.innerText=curr;
    }
    // If Knights
    else if(ele === 'n'){
        let curr=Number(blackKnightNum.innerText);
        curr++;
        blackKnightNum.innerText=curr;
    }
    else if(ele === 'N'){
        let curr=Number(whiteKnightNum.innerText);
        curr++;
        whiteKnightNum.innerText=curr;
    }
    // If Rooks
    else if(ele === 'r'){
        let curr=Number(blackRookNum.innerText);
        curr++;
        blackRookNum.innerText=curr;
    }
    else if(ele === 'R'){
        let curr=Number(whiteRookNum.innerText);
        curr++;
        whiteRookNum.innerText=curr;
    }
    // If Bishops
    else if(ele === 'b'){
        let curr=Number(blackBishopNum.innerText);
        curr++;
        blackBishopNum.innerText=curr;
    }
    else if(ele === 'B'){
        let curr=Number(whiteBishopNum.innerText);
        curr++;
        whiteBishopNum.innerText=curr;
    }
    // If Queens
    else if(ele === 'q'){
        let curr=Number(blackQueenNum.innerText);
        curr++;
        blackQueenNum.innerText=curr;
    }
    else if(ele === 'Q'){
        let curr=Number(whiteQueenNum.innerText);
        curr++;
        whiteQueenNum.innerText=curr;
    }
}

function enableHighlightedButtons(){
    highlighted.forEach((ele)=>document.querySelector("#"+ele).disabled=false);
}

function disableHighlightedButtons(){
    highlighted.forEach((ele)=>document.querySelector("#"+ele).disabled=true);
}

function alternateMoves(whiteMove) {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            let piece = boardPieces[i][j];
            if (piece !== '') {
                let new_id = getIdFromBoardPosition({"row": i, "col": j});
                let button = document.querySelector("#" + new_id);
                
                // Disable the opponent's pieces
                if (whiteMove) {
                    button.disabled = (piece === piece.toLowerCase()); // Disable black pieces
                } else {
                    button.disabled = (piece === piece.toUpperCase()); // Disable white pieces
                }
            }
        }
    }
    enableHighlightedButtons();
    disableHighlightedButtons();
}

function declareWinner(winnerColor){
    if(winnerColor === "White"){
        alert_Message_container.innerHTML ="🎉 Player 1 is the Winner 🎉";
        alertBox.style.display = "block";
        alert_Message_container.style.marginTop="13%";
        alert_Message_container.style.marginLeft="5%";
    }
    else if(winnerColor === "Black"){
        alert_Message_container.innerHTML ="🎉 Player 2 is the Winner 🎉";
        alertBox.style.display = "block";
        alert_Message_container.style.marginTop="13%";
        alert_Message_container.style.marginLeft="5%";
    }
}

// Event listener for promotion choices
function promotionEventListener(e) {
    const promotionButton = e.target.closest('.promotion-choices');
    if (!promotionButton) return;

    let promotedValue = promotionButton.getAttribute("id");
    let obj = getBoardPositionFromId(promoteId);
    switch (promotedValue) {
        case "Black Queen":
            boardPieces[obj.row][obj.col] = 'q';
            document.querySelector("#" + promoteId).innerHTML = "♛";
            break;
        case "Black Knight":
            boardPieces[obj.row][obj.col] = 'n';
            document.querySelector("#" + promoteId).innerHTML = "♞";
            break;
        case "Black Rook":
            boardPieces[obj.row][obj.col] = 'r';
            document.querySelector("#" + promoteId).innerHTML = "♜";
            break;
        case "Black Bishop":
            boardPieces[obj.row][obj.col] = 'b';
            document.querySelector("#" + promoteId).innerHTML = "♝";
            break;
        case "White Queen":
            boardPieces[obj.row][obj.col] = 'Q';
            document.querySelector("#" + promoteId).innerHTML = "♕";
            break;
        case "White Knight":
            boardPieces[obj.row][obj.col] = 'N';
            document.querySelector("#" + promoteId).innerHTML = "♘";
            break;
        case "White Rook":
            boardPieces[obj.row][obj.col] = 'R';
            document.querySelector("#" + promoteId).innerHTML = "♖";
            break;
        case "White Bishop":
            boardPieces[obj.row][obj.col] = 'B';
            document.querySelector("#" + promoteId).innerHTML = "♗";
            break;
        default:
            return;
    }

    close_img.style.display = "block";
    alertBox.style.display = "none";
    // Checking if after promotion is there any check or checkmate
    // if(isCheckMate("White",whiteKingId)){
    //     let element = document.querySelector(".check");
    //     element.innerText="\tCHECKMATE!!! \n\nPLAYER 2 WINS";
    //     element.classList.remove("hidden");
    //     diableAllButtons();
    //     declareWinner("Black");
        
    // }
    // else if(isCheckMate("Black",blackKingId)){
    //     let element = document.querySelector(".check");
    //     element.innerText="\tCHECKMATE!!! \n\nPLAYER 1 WINS";
    //     element.classList.remove("hidden");
    //     diableAllButtons();
    //     declareWinner("White");
    // }
    // else 
    if( isCheck(boardPieces,"White",whiteKingId)){
        let element = document.querySelector(".check");
        element.innerText="CHECK FOR PLAYER 1";
        element.classList.remove("hidden");
    }
    else if(isCheck(boardPieces,"Black",blackKingId)){
        let element = document.querySelector(".check");
        element.innerText="CHECK FOR PLAYER 2";
        element.classList.remove("hidden");
    }
}

alertBox.addEventListener('click', promotionEventListener);

//function to promotte the pawn
function promotePawn(pawnColor) {
    alert_Message_container.innerHTML = (pawnColor === "Black") ? promoteTextForBlack : promoteTextForWhite;
    alertBox.style.display = "block";
    close_img.style.display = "none";
}

// Make the white move first
alternateMoves(whiteMove);

close_img.addEventListener('click', function () {
    alertBox.style.display = "none";
});

button.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        alternateMoves(whiteMove);
        let selected = pieces[e.target.innerText];
        let id = e.target.getAttribute("id");

        // If other than the highlighted buttons are selected
        if(!highlighted.has(id)){
            disableHighlightedButtons();
            clearAllButtons();
        }
        enableHighlightedButtons(); 
        // If highlighted is selected
        if (highlighted.has(id)) {
            toPieceId = id;
            if(prevFromPieceId!==''){
                document.querySelector("#"+prevFromPieceId).style.border="1px solid black";
            }
            if(prevToPieceId!==''){
                document.querySelector("#"+prevToPieceId).style.border="1px solid black";
            }
            prevFromPieceId=fromPieceId;
            prevToPieceId=toPieceId;
            // Getting elements of from piece position to position
            let fromPiece = document.querySelector("#" + fromPieceId);
            let toPiece = document.querySelector("#" + toPieceId);
            // Printing the moves in the console
            console.log("from",fromPieceId,"to",toPieceId);
            let start = getBoardPositionFromId(fromPieceId);
            let end = getBoardPositionFromId(toPieceId);
            // Changing the positions in the boardPieces
            updateKillsCount(end);    

            movePiece(start,end);
            
            // Going from one position to another
            toPiece.innerHTML = fromPiece.innerHTML;
            fromPiece.innerHTML = "";
            fromPiece.style.border = "1px solid black";
            document.querySelector("#"+prevFromPieceId).style.border="5px solid #8f00ff";
            document.querySelector("#"+prevToPieceId).style.border="5px solid #8f00ff";
            highlighted.delete(toPieceId);
            toPiece.style.color = "black";
            // Removing the styles for highlighted boxes
            clearHighlights();
            checkForPromote();
            
        }
        // If a Pawn is selected
        else if (selected === "Black Pawn" || selected === "White Pawn") {
            pawnSelected(e, selected, id);
            enableHighlightedButtons();
            fromPieceId = id;
        }
        // If a Knight is selected
        else if(selected === "Black Knight" || selected === "White Knight") {
            knightSelected(e, selected, id);
            enableHighlightedButtons();
            fromPieceId = id;
        }
        // If a Rook is selected
        else if(selected === "Black Rook" || selected === "White Rook") {
            rookSelected(e, selected, id);
            enableHighlightedButtons();
            fromPieceId = id;
        }
        // If a Bishop is selected
        else if(selected === "Black Bishop" || selected === "White Bishop") {
            bishopSelected(e, selected, id);
            enableHighlightedButtons();
            fromPieceId = id;
        }
        // If a Queen is selected
        else if(selected === "Black Queen" || selected === "White Queen") {
            queenSelected(e, selected, id);
            enableHighlightedButtons();
            fromPieceId = id;
        }
        // If a King is selected
        else if(selected === "Black King" || selected === "White King") {
            kingSelected(e, selected, id);
            enableHighlightedButtons();
            fromPieceId = id;
            
        }
        if(isCheckMate("White",whiteKingId)){
            let element = document.querySelector(".check");
            element.innerText="\tCHECKMATE!!! \n\nPLAYER 2 WINS";
            element.classList.remove("hidden");
            diableAllButtons();
            declareWinner("Black");
            
        }
        else if(isCheckMate("Black",blackKingId)){
            let element = document.querySelector(".check");
            element.innerText="\tCHECKMATE!!! \n\nPLAYER 1 WINS";
            element.classList.remove("hidden");
            diableAllButtons();
            declareWinner("White");
        }
        else if( isCheck(boardPieces,"White",whiteKingId)){
            let element = document.querySelector(".check");
            element.innerText="CHECK FOR PLAYER 1";
            element.classList.remove("hidden");
        }
        else if(isCheck(boardPieces,"Black",blackKingId)){
            let element = document.querySelector(".check");
            element.innerText="CHECK FOR PLAYER 2";
            element.classList.remove("hidden");
        }
        else{
            let element = document.querySelector(".check");
            element.classList.add("hidden");
        }
    });
});


fromPieceId="";
toPieceId="";