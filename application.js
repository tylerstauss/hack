$(document).ready(function(){

	// empty array will have team name as key and team id as value
	var teamsArray = [];
	//teams function uses API to get all of the NFL teams and inserts their name and id into teamsArray
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
				//returns the array of all 32 teams
				return teamsArray;

			},
			error: function(status, code, message){
				$('#response').html('failure');
			}
		});
		}
	// getTeamInfo is called when enter is hit on the live web page
	// takes input, converts to lowercase and then looks up the team id from the teamsArray
	getTeamInfo = function(){  
		teams();
		var team = $('#team').val().toLowerCase();

		if (team == '') {
			$('#response').html('Please enter your team\'s name!');
		} else {
			teamId = teamsArray[team];
			if (teamId == undefined) {
				$('#error').html('Looks like you didn\'t type in a valid NFL team name. Please try again.');
			console.log(teamId);
			} else {
				// teams api to get records
				$.ajax({
					url: 'http://api.espn.com/v1/sports/football/nfl/teams/'+(teamId || 25) +'?apikey=rxdkacnu34evezasexjb87pz',
					type: 'GET',
					dataType: 'jsonp',
				    crossDomain: true,
					success: function(data){
						//converts info from api call to local variables
						var teamName = data.sports[0].leagues[0].teams[0].name;
						var teamCity = data.sports[0].leagues[0].teams[0].location;
						var teamLogo = data.sports[0].leagues[0].teams[0].logos.large.href;
						var wins = data.sports[0].leagues[0].teams[0].record.wins;
						var losses = data.sports[0].leagues[0].teams[0].record.losses;
						//outputs the information as html elements
						$('#error').html('');
						$('#response').html(teamCity + ' ' + teamName);
						$('#logo').html('<img id="logo" src=' + teamLogo + ' />');
						$('#wins').html(wins);
						$('#losses').html(losses);
					},
					error: function(status, code, message){
						$('#response').html('failure');
					}
				});



			$.ajax({
					url: 'http://api.espn.com/v1/sports/football/nfl/news/?teams='+(teamId || 25) +'&limit=5&apikey=rxdkacnu34evezasexjb87pz',
					type: 'GET',
					dataType: 'jsonp',
				    crossDomain: true,
					success: function(response){
						console.log(response);
						$('#h2').html('Recent Articles');
						for (var i = 0; i < 5; i++) {
							var headline = response.headlines[i].headline;
							var byline = response.headlines[i].byline;
							var story = response.headlines[i].story;
							var link = response.headlines[i].links.web.href;
						$('#articles').append('<h3 class="headline" id="headline'+i+'"><a href="'+link+'">'+headline+'</a></h3><p class="author">By: '+byline+'</p><div class="story hidden" id="story'+i+'">'+story+'</div>');	
					//	$('.headline').html(response.headlines[i].headline);
					//	$('.story').html(response.headlines[i].story);
					//	$('.author').html(response.headlines[i].byline);
						
						};
						//converts info from api call to local variables
					
					
					},
					error: function(status, code, message){
						$('#response').html('failure');
					}
				});
			} //end if else statement team == ''
		} //end if else statement teamId == undefined
	}  // end getTeamInfo

getTeamInfo();
 $('#team').keyup(function(event){
       if(event.keyCode == 13){
       		$('#articles').empty();
       		$('#h2').toggleClass('hidden');
       		$('#articles').toggleClass('hidden');
           getTeamInfo();
       }
   }); //end keyup action

//$('#headline0').on('click', function(){
//	$('#story0').toggleClass('hidden');
//})


}); // end document.ready function


