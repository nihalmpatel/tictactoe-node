var currentId=0;
var currentIndex=0;
var moves=["","","","","","","","","",""];
var socket = io();
var roomno;
var userselectedval;
var turn='X';

while(!userselectedval){
    userselectedval = prompt("Please choose X/0 :").toUpperCase();
    if(!(userselectedval == 'X' || userselectedval == 'x' || userselectedval == '0')){
        continue;
    }
}

socket.on('connectToRoom',function(data){
    roomno=data;
    console.log('data:'+data);
});

socket.on('setval',function(data){
    if(data.val==='X'){
        moves[data.index]="X";
    }
    if(data.val==='0'){
        moves[data.index]="0";
    }
    turn=data.turn;
    result(data.val);
    $("#tile"+data.index.toString()).text(data.val);
});


function setValue(id,index){ 

    if( moves[index]=="X" || moves[index]=="0" )
    {
        alert("This area is already filled!");   
    }

    if( turn=='X' && userselectedval=='0' || turn=='0' && userselectedval=='X')
    {
        alert("Its not your turn!");
    }
    
    else{
        currentId=id;
        currentIndex=index;
        
        if(userselectedval== 'X') {
            $(id).text("X");
            moves[index]="X";
            result("X");
            turn='0';
            socket.emit('setval',{val: 'X', index: currentIndex, roomno: roomno, turn: turn});
        }
        else {
            $(id).text("0");
            moves[index]="0";
            result("0");
            turn='X';
            socket.emit('setval',{val: '0', index: currentIndex, roomno: roomno, turn: turn});
        }
        
    }
}

function clearValues(){
    for (var i=1;i<=9;i++){       
        $("#tile"+i.toString()).text("");
    }
    count=false;
    moves=[];
}

function undoValue(){
    $(currentId).text("");
    moves[currentIndex]="";
    count=!count;
}

function result(val){
    if( (moves[1]==val && moves[2]==val && moves[3]==val) || (moves[1]==val && moves[4]==val && moves[7]==val) || (moves[1]==val && moves[5]==val && moves[9]==val) || (moves[2]==val && moves[5]==val && moves[8]==val) || (moves[3]==val && moves[6]==val && moves[9]==val) || (moves[3]==val && moves[5]==val && moves[7]==val) || (moves[4]==val && moves[5]==val && moves[6]==val) || (moves[7]==val && moves[8]==val && moves[9]==val) || (moves[1]==val && moves[5]==val && moves[9]==val)  )
    {
            alert(val+" WON!");
            clearValues();
            location.reload();
    }
    
    else if( (moves[1]=="X" || moves[1]=="0") && (moves[2]=="X" || moves[2]=="0") && (moves[3]=="X" || moves[3]=="0") && (moves[4]=="X" || moves[4]=="0") && (moves[5]=="X" || moves[5]=="0") && (moves[6]=="X" || moves[6]=="0") && (moves[7]=="X" || moves[7]=="0") && (moves[8]=="X" || moves[8]=="0") && (moves[9]=="X" || moves[9]=="0") ){
        alert("TIE!");
        clearValues();
    }
    
}               