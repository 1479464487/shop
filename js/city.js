$.post(
	"../php/city.php",
	{
		type:"province"
	},
	function(province){
		// console.log(province);
		for(var i in province){
			// console.log(province[i]);
			var option = $("<option></option>")
			.val(province[i]['provinceid'])
			.html(province[i]['province']);
			$("select[name='province_id']")
			.append(option);
		}
	},"json"
);

$("select[name=province_id]").change(function(){
	$("select[name=city_id]").html("<option value='0'>请选择城市</option>");
	var provinceid = $(this).val();
	$.post(
		"../php/city.php",
		{
			type:"city",
			provinceid:provinceid
		},
		function(cities){
			for(var i in cities){
				var option = $("<option></option>")
				.val(cities[i]['cityid'])
				.html(cities[i]['city']);
				$("select[name='city_id']")
				.append(option);
			}
		},
		"json"
	);
});

$("select[name=city_id]").change(function(){
	$("select[name=area_id]").html("<option value='0'>请选择区域</option>");
	var cityid = $(this).val();
	$.post(
		"../php/city.php",
		{
			type:"area",
			cityid:cityid
		},
		function(cities){
			for(var i in cities){
				var option = $("<option></option>")
				.val(cities[i]['areaid'])
				.html(cities[i]['area']);
				$("select[name='area_id']")
				.append(option);
			}
		},
		"json"
	);
});


//收货地址
$("#saveAddress").click(function() {
	var province_id = $("[name=province_id]").val();
	var city_id = $("[name=city_id]").val();
	var area_id = $("[name=area_id]").val();
	var detail = $("textarea[name=detail]").val();
	var ordername = $("input[name=ordername]").val();
	var telephone = $("input[name=telephone]").val();
	console.log(ordername,telephone);
	if(!province_id || !city_id || !area_id ||!detail ){
		alert('请正确选择地址');
		return;
	}
	if(!telephone ){
		alert('请填写手机号');
		return;
	}

	$.post(
		"../php/saveAddress.php",
		{
			province_id:province_id,
			city_id:city_id,
			area_id:area_id,
			detail:detail,
			ordername:ordername,
			phone:telephone
		},
		function(data){
			if(data.status == "success"){
				// 禁用地址栏
			$(".addr").each(function(){
				this.disabled = true;
			});
			$('.theme-login').removeClass("selected");
			$('.item-props-can').removeClass("selected");					
			$('.theme-popover-mask').hide();
			$('.theme-popover').slideUp(200);
			showAddress('max'); //地址的显示
			// 保存地址id至隐藏域 等待提交
			$("input[name=address_id]").val(data.address_id);
		}
	},
	"json"
	);
})