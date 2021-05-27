
export function whoWonToss(teamA, teamB, bat, bowl) {
    var msg = '';
    if(teamA && bat)
        msg = 'Team A won the toss elected to Bat first';
    else if(teamA && bowl) 
        msg = 'Team A won the toss elected to Bowl first';
    else if(teamB && bat) 
        msg = 'Team B won the toss elected to Bowl first';
    else if(teamB && bowl) 
        msg = 'Team B won the toss elected to Bowl first';
    return msg;
}