var count=false;
var currentId=0;
var currentIndex=0;
var data=["","","","","","","","","",""];
var socket = io();

function setValue(id,index){
   
    if( data[index]=="X" || data[index]=="0" )
    {
        alert("This area is already filled!");   
    }
    
    else{
        currentId=id;
        currentIndex=index;
        
        if(count) {
            $(id).text("X");
            data[index]="X";
            count=false;
            result("X");
            socket.emit('set-x',currentIndex);
        }
        else {
            $(id).text("0");
            data[index]="0";
            count=true;
            result("0");
            socket.emit('set-0',currentIndex);
        }
        
    }
}

function clearValues(){
    for (var i=1;i<=9;i++){       
        $("#tile"+i.toString()).text("");
    }
    count=false;
    data=[];
}

function undoValue(){
    $(currentId).text("");
    data[currentIndex]="";
    count=!count;
}

function result(val){
    if( (data[1]==val && data[2]==val && data[3]==val) || (data[1]==val && data[4]==val && data[7]==val) || (data[1]==val && data[5]==val && data[9]==val) || (data[2]==val && data[5]==val && data[8]==val) || (data[3]==val && data[6]==val && data[9]==val) || (data[3]==val && data[5]==val && data[7]==val) || (data[4]==val && data[5]==val && data[6]==val) || (data[7]==val && data[8]==val && data[9]==val) || (data[1]==val && data[5]==val && data[9]==val)  )
    {
            alert(val+" WON!");
            clearValues();
    }
    
    else if( (data[1]=="X" || data[1]=="0") && (data[2]=="X" || data[2]=="0") && (data[3]=="X" || data[3]=="0") && (data[4]=="X" || data[4]=="0") && (data[5]=="X" || data[5]=="0") && (data[6]=="X" || data[6]=="0") && (data[7]=="X" || data[7]=="0") && (data[8]=="X" || data[8]=="0") && (data[9]=="X" || data[9]=="0") ){
        alert("TIE!");
        clearValues();
    }
    
}

/*function checkValues(){
    for(i=1;i<9;i++){
        if( (data[i]=="X" || data[i]=="0") && checkValues() ) {
            return true;
        }
    }
    return false;
} */
               