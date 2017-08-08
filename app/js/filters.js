(function() {
app.filter('smartDate', function($filter) {
    $dateFilter = $filter('date');
    return function(date) {
    var oneDayAgo = Date.now() - 86400000
    if (date < oneDayAgo) {
     return $dateFilter(date, "MMM dd")
    }
    else {
      return $dateFilter(date, "h:mm a")
    }
    }
});
app.filter('smartName', function() {
    return function(person, fullName = false) {
        if(currentUser.email ==person.email) {
            return 'me'
        }
        else if(fullName) {
            return (person.first_name +' '  + person.last_name).toString().trim()
        }
        else {
            return person.first_name;
        }
    }
})
    
    app.filter('timeAgo', function($filter) {
        var units = [
    { name: "second", limit: 60, in_seconds: 1 },
    { name: "minute", limit: 3600, in_seconds: 60 },
    { name: "hour", limit: 86400, in_seconds: 3600  },
    { name: "day", limit: 604800, in_seconds: 86400 },
    { name: "week", limit: 2629743, in_seconds: 604800  },
    { name: "month", limit: 31556926, in_seconds: 2629743 },
    { name: "year", limit: null, in_seconds: 31556926 }
  ]
        return function(date) {
            var diff = (Date.now() - date)/1000;

            if(diff < 5) {
                return "just now"
            }
            for(var i = 0; i < units.length; i++) {
                var unit = units[i]
                if(diff < unit.limit || !unit.limit) {
                    diff= Math.floor(diff/unit.in_seconds)
                    if(diff > 1) {
                        return diff+ ' ' + unit.name + 's' + '  ago';
                    } else {
                        return diff + ' ' + unit.name + ' ago';
                    }
                }
            }
        }
    })
  app.filter('nameAndEmail', function($filter) {
      return function(person) {
          if(typeof(person) == 'undefined') {
             return  `${window.currentUser.first_name} ${window.currentUser.last_name} <${window.currentUser.email}>`
          }
              return `${person.first_name} ${person.last_name} <${person.email}>`
          }
  })
}).call(this);
