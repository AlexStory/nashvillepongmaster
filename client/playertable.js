Players = new Mongo.Collection('players');
Games = new Mongo.Collection('games');

Template.playertable.helpers({
  players: function(){
    return Players.find({});
  }
});

Template.playertable.events({
  "click .makegame": function(event){
    winner = $('.winner').val();
    loser =  $('.loser').val();
    if(winner == loser){
      alert('A player can not defeat themselves!');
      return;
    }else {
      Games.insert({
        winner: winner,
        loser: loser,
        sender: Meteor.user().services.github.username
      })

      win = Players.findOne({
        name: winner
      });
      Players.update(
        {_id: win._id},
        {$inc: {wins: 1}}
      );

      lose = Players.findOne({
        name: loser
      });
      Players.update(
        {_id: lose._id},
        {$inc: {losses: 1}}
      );

      var diff = win.elo - lose.elo;

      if(diff === 0){
        Players.update(
          {_id: win._id},
          {$set: {elo: (win.elo + 55)}}
        );

        Players.update(
          {_id: lose._id},
          {$set: {elo: (lose.elo - 50)}}
        );
      } else if(diff > 0 && diff < 100) {
        Players.update(
          {_id: win._id},
          {$set: {elo: (win.elo + 30)}}
        );

        Players.update(
          {_id: lose._id},
          {$set: {elo: (lose.elo - 25)}}
        );
      } else if(diff >= 100 ) {
        Players.update(
          {_id: win._id},
          {$set: {elo: (win.elo + 20)}}
        );

        Players.update(
          {_id: lose._id},
          {$set: {elo: (lose.elo - 15)}}
        );
      }else if(diff < 0 && diff > -100) {
        Players.update(
          {_id: win._id},
          {$set: {elo: (win.elo + 80)}}
        );

        Players.update(
          {_id: lose._id},
          {$set: {elo: (lose.elo - 75)}}
        );
      }else if(diff < 100) {
        Players.update(
          {_id: win._id},
          {$set: {elo: (win.elo + 95)}}
        );

        Players.update(
          {_id: lose._id},
          {$set: {elo: (lose.elo - 90)}}
        );
      }





    }
  }
});
