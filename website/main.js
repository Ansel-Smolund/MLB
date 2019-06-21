let url = "http://lookup-service-prod.mlb.com/json/named.team_all_season.bam?sport_code='mlb'&all_star_sw='N'&sort_order=name_asc&season='2019'"
let gameOfDayUrl = "";
var teams = [];
var teamAndRoster = [];

$(document).ready(
    //console.log("mainpage")
    $.ajax({
        type:"GET",
        url:url,
        success:function(data){
           fillTeamArray(data);
        }
    })
)
// MIN, DET
function fillTeamArray(data){
    var d = new Date();
    var month = ('0' + (d.getMonth()+1)).slice(-2)
    var year = d.getFullYear();
    var day = ('0' + d.getDate()).slice(-2);

    gameOfDayUrl = "https://api.sportradar.us/mlb/trial/v6.5/en/games/" + year + "/"+month+"/"+ day+"/boxscore.json?api_key=4j84hqseyxyn2kx4n4gnwsaw"
    teams = data["team_all_season"]["queryResults"]["row"];
    for(var i = 0; i < teams.length; i++){
        if(teams[i].division_full == "American League Central"){
            console.log(teams[i]);
        }
        //console.log(teams[i].name_display_full)
        let currUrl = "http://lookup-service-prod.mlb.com/json/named.roster_40.bam?team_id=" + teams[i].team_id;
       // console.log(teams[i]);
        let currTeam = teams[i];
        $.ajax({
            type:"GET",
            url:currUrl,
            success:function(data){
                let teamAndRosterObj = {
                    team : currTeam,
                    roster : data["roster_40"]["queryResults"]["row"]
                }
                teamAndRoster.push(teamAndRosterObj);
            }  
        })
    }
}



function fillTeamName(team){
    if(team.id == "home"){
        $("#team-name").html("MLB");
    }
    for(var i = 0; i < teamAndRoster.length; i++){
        if(teamAndRoster[i]["team"]["mlb_org_abbrev"] == team.id){
            $("#team-name").html(teamAndRoster[i]["team"]["name_display_full"]);
            fillPlayerList(teamAndRoster[i]["roster"])

        }
    }
}
var currentTeam = [];
function fillPlayerList(team){
    $("#player-list").html('');
    currentTeam = team;
    for(var i = 0; i < team.length; i++){  
        $("#player-list").append('<li><a id =' + team[i]["player_id"] + '" onclick="openPlayerData(this,'+team[i]["team_abbrev"]+')">' + team[i]["name_display_first_last"] + '</a></li>')
    }
  //  teamAndRoster[0]["roster"][0]["name_display_first_last"]
}
function openPlayerData(player,team){
    $("#currentPlayer").html(player.innerHTML);
    var currentPlayer = null;
    for(var i = 0; i < currentTeam.length; i++){
        if(currentTeam[i]["name_display_first_last"] == player.innerHTML){
            currentPlayer = currentTeam[i];
        }
    }
    // let url = "https://api.sportradar.us/mlb/trial/v6.5/en/games/2019/06/10/boxscore.json?api_key=4j84hqseyxyn2kx4n4gnwsaw"
    // $("#position").html(currentPlayer["position_txt"]);
    // $.ajax({
    //     type:"GET",
    //     url:currUrl,
    //     success:function(data){
    //         let teamAndRosterObj = {
    //             team : currTeam,
    //             roster : data["roster_40"]["queryResults"]["row"]
    //         }
    //         teamAndRoster.push(teamAndRosterObj);
    //     }  
    // })
}
var a;
function getTodaysScores(){
    $.ajax({
        type:"GET",
        url:"https://api.sportradar.us/mlb/trial/v6.5/en/games/2019/06/11/boxscore.json?api_key=4j84hqseyxyn2kx4n4gnwsaw",
        dataType:'jsonp',
        success:function(data){
           console.log(data);
        }  
    })
}
//z5E59B9EEouahQnd3adgUiIhuLsXMYmwgAP3oZJJ9RA0aHTr1qe6FXiT6PKl

//http://lookup-service-prod.mlb.com/json/named.roster_40.bam?team_id='121'