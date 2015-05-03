var xSym = "X";
var oSym = "O";
var count = 0;

$('td').on('click', function() {
    if (thisCellNotEmpty()) return;
    if (gameHasBeenWon())   return;
    markCurrentCell(this);
    processBoard();
});

function thisCellNotEmpty() {
    if ( $(this).text() == xSym ||
         $(this).text() == oSym) {
              return true;
              }
    return false;
}

function markCurrentCell(element){
    if (nextTurn ()) {
        $(element).text(oSym);
    } else {
        $(element).text(xSym);
    }
    count++;
}

function nextTurn ()
{
   return (count % 2 === 0);
}

function rowcol(r, c) {
    return $("tr:nth-child(" + r + ") td:nth-child(" + c + ")");
}

function countOfEmptyCells() {
    var emptycellcount = 0;
    for (var tr = 1; tr < 4; tr++) {
        for (var td = 1; td < 4 ; td++) {
            var rct = rowcol(tr,td).text();
            if (rct.length < 1 ) {
                emptycellcount = emptycellcount + 1;
            }
        }
    }
    return emptycellcount;
}

function gameHasBeenWon() {
    var gameHasBeenWon = false;
    var players = [xSym, oSym];
    for (var p = 0; p < players.length; p++) {
        var pp = players[p];
        if (checkRowsForWinBy(pp) || checkColsForWinBy(pp) || checkDiagsforWinBy(pp))
        {
            gameHasBeenWon = true;
        }
    }
    return gameHasBeenWon;
}

function noOnehasWon()
{
    return (!gameHasBeenWon());
}

function checkForDraw()
{
    if ((countOfEmptyCells() == 0) && (true == noOnehasWon())){
        return true;
    }
    return false;
}

function checkDiagsforWinBy(x)
{
    // main diagonal
    var n = 0;
    for (var cell = 1; cell < 4; cell++) {
        var rct = rowcol(cell,cell).text();
        if (x == rct) {
            n = n + 1 ;
        }
    }
    if (n == 3) {
        return true;
    }

    // anti diagonal
    n = 0;
    for (cell = 1; cell < 4; cell++) {
        rct = rowcol(cell, 4-cell).text();
        if (x == rct) {
            n = n + 1 ;
        }
    }
    if (n == 3) {
        return true;
    }
    return false;
}

function checkColsForWinBy(x) {
    for (var td = 1; td < 4; td++) {
        var n = 0;
        for (var tr = 1; tr < 4 ; tr++) {
            var rct = rowcol(tr,td).text();
            if (x == rct) {
                n = n + 1 ;
            }
        }
        if (n == 3) {
            return true;
        }
    }
    return false;
}

function checkRowsForWinBy(x) {
    for (var tr = 1; tr < 4; tr++) {
        var n = 0;
        for (var td = 1; td < 4 ; td++) {
            var rct = rowcol(tr,td).text();
            if (x == rct) {
                n = n + 1 ;
            }
        }
        if (n == 3) {
            return true;
        }
    }
    return false;
}

function processBoard() {

    var players = [xSym, oSym];
    for (var p = 0; p < players.length; p++) {
        var pp = players[p];
        if (checkRowsForWinBy(pp))       userMessage("Player " + pp + " has won!");
        else if (checkColsForWinBy(pp))  userMessage("Player " + pp + " has won!");
        else if (checkDiagsforWinBy(pp)) userMessage("Player " + pp + " has won!");
    }

    if (checkForDraw()) {
        userMessage("The game is a draw!");
    }
}

function userMessage(message) {
    var rc = $("div#footer");
    var msg = message + "<BR>reload the page to restart.";
    rc.html(msg);
}
