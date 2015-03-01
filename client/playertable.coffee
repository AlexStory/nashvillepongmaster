Players = new Mongo.Collection "players"

Template.playertable.helpers ->
  players: ->
    Players.find({})
console.log Players.find({})
