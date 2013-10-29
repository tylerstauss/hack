$(document).ready(function(){ 



	getTeamInfo = function(){  

		
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
					var teamName = data.sports[0].leagues[0].teams[i].name;
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


		teams();
		var team = $('#team').val();
		console.log(team);
		var teamId = teamsArray[team];

		$.ajax({
			url: 'http://api.espn.com/v1/sports/football/nfl/teams/'+teamId+'?apikey=rxdkacnu34evezasexjb87pz',
			type: 'GET',
			dataType: 'jsonp',
		    crossDomain: true,
			success: function(data){
				var teamName = data.sports[0].leagues[0].teams[0].name;
				var teamLogo = data.sports[0].leagues[0].teams[0].logos.large.href;
				var teamRecord = data.sports[0].leagues[0].teams[0].record.summary;
				$('#response').html(teamName);
				$('#logo').html(teamLogo);
				$('#record').html(teamRecord);
			},
			error: function(status, code, message){
				$('#response').html('failure');
			}
		});
		
	}  // end getTeamInfo
$('#submit').click(getTeamInfo());


}); // end document.ready function


