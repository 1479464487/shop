$.post(
	"../php/getMenu.php",
	"",
	function(data) {
		for(var i in data) {
			var person = $("<li></li>").addClass("person ");
			var person_a = $("<a></a>").attr("href",data[i]['url']).html(data[i]['title']);
			var li = getMenuTree(data[i]['next'],person);
			person_a.appendTo(person);
			li.appendTo($(".menu_ul"));
		}
	},
	"json"
)

function getMenuTree(second,li) {
	var ul = $("<ul></ul>");
	for(var i in second) {
		var person = $("<li></li>").addClass("person ");
		var person_a = $("<a></a>").attr("href",second[i]['url']).html(second[i]['title']);
		person_a.appendTo(person);
		person.appendTo(ul);
		ul.appendTo(li);
	}
	return li;
}