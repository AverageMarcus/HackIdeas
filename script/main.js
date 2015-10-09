var eventTitle = window.location.hash.substr(1);
var ref = new Firebase('https://HackIdeas.firebaseio.com/');

$('select').material_select();
$('#hackday-title').text(eventTitle);

ref.child(eventTitle.replace(/ /g, '')).on('value', function(snapshot) {
  if (snapshot.exists()) {
    var ideas = snapshot.val().ideas;
    var $idea = $($('#ideaTemplate').text());
    var $placeholder = $('<div/>');

    $('#hackday-title').text(snapshot.val().name);
    $('#hackday-desc').text(snapshot.val().description);

    for (var key in ideas) {
      var idea = ideas[key];
      var $newIdea = $idea.clone();
      $newIdea.find('.idea-title').text(idea.title);
      $newIdea.find('.idea-description').text(idea.description);
      $newIdea.find('.thumbs_up_count').text(idea.thumbs_up);
      if (idea.team && idea.team.length) {
        for (var i = 0; i < idea.team.length; i++) {
          $newIdea.find('.team-members').append('<li>' + idea.team[i] + '</li>');
        }
      }

      $newIdea.removeClass('hide');
      $placeholder.append($newIdea);
    }

    $('#ideas').replaceWith($placeholder);
  } else {
    $('.loading').addClass('red-text text-darken-4').html('<i class="material-icons medium">report_problem</i> Unable to load Hackday <i class="material-icons medium">report_problem</i>');
    $('.progress').hide();
  }
});
