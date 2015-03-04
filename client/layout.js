Template.layout.events({
  "submit .addPlayer": function(event){
    var name = event.target.playName.value;
    var person = Players.findOne({name: name});

    if(typeof(person) != 'undefined' ){
      alert("No duplicate names!");
      return false;
    }

    Players.insert({
      name: name,
      wins: 0,
      losses: 0,
      elo: 1200,
    })
    event.target.playName.value = "";
    return false;
  }
});
