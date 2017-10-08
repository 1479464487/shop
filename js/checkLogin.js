$.post(
	"../php/checkLogin.php",
	"",
	function(data){
		if(data !== "success"){
			alert("请先登录！");
			// location.href="login.html";
		} 
	}
);


