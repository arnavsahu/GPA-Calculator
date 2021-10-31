//Variables
var cumulativeGPA = 0.0;
var unweightedcumulativeGPA = 0.0;
var currentsemesters;
var currentGPA;


//Core program
onEvent("Calculate", "click", function() {
  userinput();
  setScreen("outputscreen");
  hideformat();
});


//Retrieves current user GPA and semesters completed for cumulative calculations
function userinput() {
  currentsemesters = getNumber("semesters");
  currentGPA = getNumber("GPAinput");
}


//Hides the GPA format (weighted or unweighted) user does not select
function hideformat() {
  if (getText("weightedorunweighted") == "Weighted") {
    calculateweightedGPA (); 
    hideElement("unweightedgpalabel");
    hideElement("finalunweightedgpaoutput");
}
      else if (getText("weightedorunweighted") == "Unweighted") {
        calculateunweightedGPA (); 
        hideElement("finalgpalabel");
        hideElement("finalgpaoutput");
  }
}


//Sums up the cumulative GPA of the new semester for the weighted GPA
function calculatecumulative(coursetype, coursegrade) {
  if (getText(coursetype) == "Regular") {
    if(getText(coursegrade) == "A+") {
      cumulativeGPA += 4.00;
    }
    else if(getText(coursetype) == "A") {
      cumulativeGPA += 3.67;
    }
    else if(getText(coursetype) == "A-") {
      cumulativeGPA += 3.33;
    }
    else if(getText(coursegrade) == "B+") {
      cumulativeGPA += 3.00;
    }
    else if(getText(coursegrade) == "B") {
      cumulativeGPA += 2.67;
    }
    else if(getText(coursegrade) == "B-") {
      cumulativeGPA += 2.33;
    }
    else if(getText(coursegrade) == "C+") {
      cumulativeGPA += 2.00;
    }
    else if(getText(coursegrade) == "C") {
      cumulativeGPA += 1.67;
    }
    else if(getText(coursegrade) == "C-") {
      cumulativeGPA += 1.33;
    }
    else if(getText(coursegrade) == "D+") {
      cumulativeGPA += 1.00;
    }
    else if(getText(coursegrade) == "D") {
      cumulativeGPA += 0.67;
    }
    else if(getText(coursegrade) == "D-") {
      cumulativeGPA += 0.33;
    }
    else if(getText(coursegrade) == "F") {
      cumulativeGPA += 0.00;
    }
}
  
  else if (getText(coursetype) == "AP/IB/Honors") {
    if(getText(coursegrade) == "A+") {
      cumulativeGPA += 5.00;
    }
    else if(getText(coursetype) == "A") {
      cumulativeGPA += 4.67;
    }
    else if(getText(coursetype) == "A-") {
      cumulativeGPA += 4.33;
    }
    else if(getText(coursegrade) == "B+") {
      cumulativeGPA += 4.00;
    }
    else if(getText(coursegrade) == "B") {
      cumulativeGPA += 3.67;
    }
    else if(getText(coursegrade) == "B-") {
      cumulativeGPA += 3.33;
    }
    else if(getText(coursegrade) == "C+") {
      cumulativeGPA += 3.0;
    }
    else if(getText(coursegrade) == "C") {
      cumulativeGPA += 2.67;
    }
    else if(getText(coursegrade) == "C-") {
      cumulativeGPA += 2.33;
    }
    else if(getText(coursegrade) == "D+") {
      cumulativeGPA += 2.00;
    }
    else if(getText(coursegrade) == "D") {
      cumulativeGPA += 1.67;
    }
    else if(getText(coursegrade) == "D-") {
      cumulativeGPA += 1.33;
    }
    else if(getText(coursegrade) == "F") {
      cumulativeGPA += 1.00;
    }
  }
}


//displays the final weighted GPA for the user
function calculateweightedGPA () {
  for (var i = 1; i < 8; i++) {
    calculatecumulative("coursetype" + i, "coursegrade" + i);
  }
setcalcweighted ();
}


//calculates the final weighted GPA for the user
function setcalcweighted () {
  var weightedcalculations = ((((cumulativeGPA/7) + (currentGPA * currentsemesters))/(1 + currentsemesters))).toFixed(2);
  setText("finalgpaoutput", weightedcalculations);
}

 
//Sums up the cumulative GPA of the new semester for the unweighted GPA
function calculateunweightedcumulative (coursetype, coursegrade){
  if (getText(coursetype) == "Regular" || getText(coursetype) == "AP/IB/Honors" ) {
    if(getText(coursegrade) == "A" || getText(coursegrade) == "A+" || getText(coursegrade) == "A-") {
    unweightedcumulativeGPA += 4.0;
  }
    else if(getText(coursegrade) == "B" || getText(coursegrade) == "B+" || getText(coursegrade) == "B-") {
      unweightedcumulativeGPA += 3.0;
    }
    else if(getText(coursegrade) == "C" || getText(coursegrade) == "C+" || getText(coursegrade) == "C-") {
      unweightedcumulativeGPA += 2.0;
    }
    else if(getText(coursegrade) == "D" || getText(coursegrade) == "D+" || getText(coursegrade) == "D-") {
      unweightedcumulativeGPA += 1.0;
    }
    else if(getText(coursegrade) == "F") {
      unweightedcumulativeGPA += 0.0;
    }
  } 
}

 
//Displays final unweighted GPA for user
function calculateunweightedGPA () {
  for (var i = 1; i < 8; i++) {
    calculateunweightedcumulative("coursetype" + i, "coursegrade" + i);
  }
setcalcunweighted ();
}


//Calculates final unweighted GPA for user
function setcalcunweighted () {
  var unweightedcalculations = ((((unweightedcumulativeGPA/7) + (currentGPA * currentsemesters))/(1 + currentsemesters))).toFixed(2);
  setText("finalunweightedgpaoutput", unweightedcalculations);
}


//Resets GPA calculator for new calculations
function reset() {
  cumulativeGPA = 0.00;
  unweightedcumulativeGPA = 0.00;
  setText("GPAinput", "");
  setText("semesters", "");
  showElement("unweightedgpalabel");
  showElement("finalunweightedgpaoutput");
  showElement("finalgpalabel");
  showElement("finalgpaoutput");
}


//Allows user to recalculate GPA once they have reached the output screen
onEvent("back", "click", function() {
  setScreen("inputscreen");
  reset();
});