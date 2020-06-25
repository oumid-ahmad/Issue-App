
//EVENT LISTENERS
document.getElementById('issueInputForm').addEventListener('submit', saveIssue); 
//targets submit button

//FUNCTIONS
function fetchIssues () { //function to retrieve the issues from local storage
    var issues = JSON.parse(localStorage.getItem('issues'));
    var issuesList_id = document.getElementById('issuesList'); 
    //this is where issues will be output from
    
    issuesList_id.innerHTML = '';
    
    for (var i = 0; i < issues.length; i++) {
      var id = issues[i].id; //give each issue an id
      var desc = issues[i].description; //description for each issue
      var severity = issues[i].severity; //severity categorisation of each issue
      var assignedTo = issues[i].assignedTo; //assignment of each issue
      var status = issues[i].status; //status of each individual issue
      
      issuesList_id.innerHTML +=   '<div class="well">'+
                                '<h6 class="h6">Issue ID: ' + id + '</h6>'+
                                '<p><span class="label label-info">' + status + '</span></p>'+
                                '<h3>' + desc + '</h3>'+
                                '<p class="p2"><span class="glyphicon glyphicon-time"></span> ' + severity + ' '+
                                '<span class="glyphicon glyphicon-user"></span> ' + assignedTo + '</p>'+
                                '<a href="#" class="btn btn-warning" onclick="setStatusClosed(\''+id+'\')">Close</a> '+
                                '<a href="#" class="btn btn-danger" onclick="deleteIssue(\''+id+'\')">Delete</a>'+
                                '</div>';
    }
}

function saveIssue(e) {
    var issueId = chance.guid();
    var issueDesc = document.getElementById('issueDescInput').value;
    var issueSeverity = document.getElementById('issueSeverityInput').value;
    var issueAssignedTo = document.getElementById('issueAssignedToInput').value;
    var issueStatus = 'Open';
    var issue = {
      id: issueId,
      description: issueDesc,
      severity: issueSeverity,
      assignedTo: issueAssignedTo,
      status: issueStatus
    }
    
    if (localStorage.getItem('issues') === null) {
      var issues = [];
      issues.push(issue); //if issue does not exist add issue object
      localStorage.setItem('issues', JSON.stringify(issues));
    } else {
      var issues = JSON.parse(localStorage.getItem('issues'));
      issues.push(issue);
      localStorage.setItem('issues', JSON.stringify(issues));
    }
    
    document.getElementById('issueInputForm').reset(); //reset form
   
    fetchIssues(); //resetting form with structure of issues object
    
    e.preventDefault(); 
}  

function setStatusClosed (id) {
    var issues = JSON.parse(localStorage.getItem('issues'));
    
    for(var i = 0; i < issues.length; i++) {
      if (issues[i].id == id) {
        issues[i].status = "Closed";
      }
    }
      
    localStorage.setItem('issues', JSON.stringify(issues));
    
    fetchIssues(); //resetting form with structure of issues object
}  

function deleteIssue (id) {
    var issues = JSON.parse(localStorage.getItem('issues'));
    
    for(var i = 0; i < issues.length; i++) {
      if (issues[i].id == id) {
        issues.splice(i, 1); //delete current item
      }
    }
    
    localStorage.setItem('issues', JSON.stringify(issues));
    
    fetchIssues();
}
