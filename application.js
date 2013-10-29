$(document).ready(function(){

	var teamsArray = [];
	teams = function(){
			$.ajax({
			url: 'http://api.espn.com/v1/sports/football/nfl/teams/?apikey=rxdkacnu34evezasexjb87pz',
			type: 'GET',
			dataType: 'jsonp',
		    crossDomain: true,
			success: function(data){
				for (var i = 0; i < 32; i++) {
					var teamId = data.sports[0].leagues[0].teams[i].id;
					var teamName = data.sports[0].leagues[0].teams[i].name.toLowerCase();
					teamsArray[teamName] = teamId;
				};
				console.log(teamsArray);
				return teamsArray;

			},
			error: function(status, code, message){
				$('#response').html('failure');
			}
		});
		}

	getTeamInfo = function(){  
		teams();
		var team = $('#team').val().toLowerCase();
		console.log(team);
		var teamId = teamsArray[team];

		$.ajax({
			url: 'http://api.espn.com/v1/sports/football/nfl/teams/'+teamId+'?apikey=rxdkacnu34evezasexjb87pz',
			type: 'GET',
			dataType: 'jsonp',
		    crossDomain: true,
			success: function(data){
				var teamName = data.sports[0].leagues[0].teams[0].name;
				var teamCity = data.sports[0].leagues[0].teams[0].location;
				var teamLogo = data.sports[0].leagues[0].teams[0].logos.large.href;
				var wins = data.sports[0].leagues[0].teams[0].record.wins;
				var losses = data.sports[0].leagues[0].teams[0].record.losses;
				$('#response').html(teamCity + ' ' + teamName);
				$('#logo').html('<img id="logo" src=' + teamLogo + ' />');
				$('#wins').html(wins);
				$('#losses').html(losses);
			},
			error: function(status, code, message){
				$('#response').html('failure');
			}
		});
		
	}  // end getTeamInfo
$('#submit').click(getTeamInfo());
 $('#team').keyup(function(event){
       if(event.keyCode == 13){
           getTeamInfo();
       }
   });


}); // end document.ready function


