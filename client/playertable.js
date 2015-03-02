Players = new Mongo.Collection('players');

Template.playertable.helpers({
  players: function(){
    return Players.find({});
  }

});
console.log(Players.find());
