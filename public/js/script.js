// Grab the articles as a json
//$.get("/")
//.done(function(data) {
//	console.log(data);
//  // For each one
//  for (var i = 0; i < data.length; i++) {
//    // Display the apropos information on the page
//    $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link  + "<br />" + data[i].summury + "</p>");
//  }
//});



$(document).on("click", ".note ", function() {
	$(".modal").modal('toggle');

	var thisId = $(this).parent().closest('.article').attr("id");

	$.ajax({
		method: "GET",
		url: "/articles/" + thisId
	})
	// With that done, add the note information to the page
		.done(function(data) {
		console.log(data);

		$(".modal .save").attr("data-id", data._id);
		// If there's a note in the article
		if (data.note) {
			
			$(".modal-body #titleinput").val(data.note.title);
			
			$(".modal-body #bodyinput").val(data.note.body);
		}
	});
});

// When you click the savenote button
$(document).on("click", "#savenote", function() {
	// Grab the id associated with the article from the submit button
	var thisId = $(this).attr("data-id");

	// Run a POST request to change the note, using what's entered in the inputs
	$.ajax({
		method: "POST",
		url: "/articles/" + thisId,
		data: {
			// Value taken from title input
			title: $("#titleinput").val(),
			// Value taken from note textarea
			body: $("#bodyinput").val()
		}
	})
	// With that done
		.done(function(data) {
		// Log the response
		console.log(data);
		// Empty the notes section
		$("#notes").empty();
	});

	// Also, remove the values entered in the input and textarea for note entry
	$("#titleinput").val("");
	$("#bodyinput").val("");
});
