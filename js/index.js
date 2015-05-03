var xSym = "X";
var oSym = "O";


var count = 0;
$('td').on('click', function() {

    if (  $(this).text() == xSym ||
          $(this).text() == oSym )
    {
        return;
    }

    if ( nextTurn ()) {
        // $(this).html("&#1002;");
        $(this).text(oSym);
    } else {
        // $(this).html("&#510;");
        $(this).text(xSym);
    }
    count++;
    checkBoard();
});

function nextTurn ()
{
   return (count % 2 === 0);
}

function rowcol(r, c ) {
    return $( "tr:nth-child(" + r + ") td:nth-child(" + c + ")" );
}

function checkForDraw()
{
    var emptycellcount = 0;
    for ( var tr = 1; tr < 4; tr++ ) {
        for ( var td = 1; td < 4 ; td++ ) {
            var rct = rowcol(tr,td).text();
            console.log(rct);
            if ( rct.length < 1  ) {
                emptycellcount++;
            }
        }
    }
    if ( emptycellcount == 0 ) {
        return true;
    }
    return false;
}

function checkDiagsforWinBy(x)
{
    // main diagonal
    var n = 0;
    for ( var cell = 1; cell < 4; cell++ ) {
        var rct = rowcol(cell,cell).text();
        if ( x == rct ) {
            n = n + 1 ;
        }
    }
    if ( n == 3 ) {
        return true;
    }

    // anti diagonal
    n = 0;
    for ( cell = 1; cell < 4; cell++ ) {
        rct = rowcol(cell, 4-cell).text();
        if ( x == rct ) {
            n = n + 1 ;
        }
    }
    if ( n == 3 ) {
        console.log( "got here");
        return true;
    }
    return false;
}

function checkColsForWinBy(x) {
    for ( var td = 1; td < 4; td++ ) {
        var n = 0;
        for ( var tr = 1; tr < 4 ; tr++ ) {
            var rct = rowcol(tr,td).text();
            console.log(rct);
            if ( x == rct ) {
                n = n + 1 ;
            }
        }
        if ( n == 3 ) {
            console.log( "got here");
            return true;
        }
    }
    return false;
}

function checkRowsForWinBy(x) {
    for ( var tr = 1; tr < 4; tr++ ) {
        var n = 0;
        for ( var td = 1; td < 4 ; td++ ) {
            var rct = rowcol(tr,td).text();
            console.log(rct);
            if ( x == rct ) {
                n = n + 1 ;
            }
        }
        if ( n == 3 ) {
            console.log( "got here");
            return true;
        }
    }
    return false;
}

function checkBoard() {
    var players = [xSym, oSym];

    for (var p = 0; p < players.length; p++) {
        var a = checkRowsForWinBy(players[p]);
        var b = checkColsForWinBy(players[p]);
        var c = checkDiagsforWinBy(players[p]);
        if ( a == true || b == true || c == true ) {
            var message = "Player " + players[p] + " has won!";
            myConsole(message);
        }
    }

    var draw = checkForDraw();
    if ( draw ) {
        myConsole( "The game is a draw!" );

    }

}

function myConsole(message) {
    var rc = $("table:nth-child(1)");
    rc.append("<span class='big'> - " + message + "</span>");
}
