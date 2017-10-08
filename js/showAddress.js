function showAddress(flag=null) {
	$.get(
	"../php/showAddress.php",
	"flag="+flag,
	function(data){
		console.log(data.length);
		if(data.length == undefined) {
			var elem = $(".addressShow").append('<li class="user-addresslist"><div class="address-left"><div class="user DefaultAddr"><span class="buy-user">艾迪 </span><span class="buy-phone">15871145629</span></span></div><div class="default-address DefaultAddr"><span class="buy-line-title buy-line-title-type">收货地址：</span><span class="buy--address-detail"><span class="province">湖北</span><span class="city"></span><span class="dist"></span><span class="street"></span></span></span></div></div><div class="address-right"><a href="../person/address.html"><span class="am-icon-angle-right am-icon-lg"></span></a></div><div class="clear"></div><div class="new-addr-btn"><a href="#" class="hidden">设为默认</a><span class="new-addr-bar hidden">|</span><a href="javascript:void(0);" onclick="updateAddress(this);"">编辑</a><span class="new-addr-bar">|</span><a href="javascript:void(0);" onclick="deleteAddress(this);">删除</a></div><input type="hidden"name="address_id" class="address_id" /></li>')
											.find(".user-addresslist").last();
			elem.find(".buy-user").html(data['ordername']);
			elem.find(".buy-phone").html(data['phone']);
			elem.find(".province").html(data['province']);
			elem.find(".city").html(data['city']);
			elem.find(".dist").html(data['area']);
			elem.find(".street").html(data['detail']);
			elem.find(".address_id").val(data['id']);
		}
		if(data.length) {
			for(var j in data) {
			(function(i) {
				var elem = $(".addressShow").append('<li class="user-addresslist"><div class="address-left"><div class="user DefaultAddr"><span class="buy-user">艾迪 </span><span class="buy-phone">15871145629</span></span></div><div class="default-address DefaultAddr"><span class="buy-line-title buy-line-title-type">收货地址：</span><span class="buy--address-detail"><span class="province">湖北</span><span class="city"></span><span class="dist"></span><span class="street"></span></span></span></div></div><div class="address-right"><a href="../person/address.html"><span class="am-icon-angle-right am-icon-lg"></span></a></div><div class="clear"></div><div class="new-addr-btn"><a href="#" class="hidden">设为默认</a><span class="new-addr-bar hidden">|</span><a href="javascript:void(0);" onclick="updateAddress(this);">编辑</a><span class="new-addr-bar">|</span><a href="javascript:void(0);" onclick="deleteAddress(this);">删除</a></div><input type="hidden"name="address_id" class="address_id" /></li>')
											.find(".user-addresslist").last();
				elem.find(".buy-user").html(data[i]['ordername']);
				elem.find(".buy-phone").html(data[i]['phone']);
				elem.find(".province").html(data[i]['province']);
				elem.find(".city").html(data[i]['city']);
				elem.find(".dist").html(data[i]['area']);
				elem.find(".street").html(data[i]['detail']);
				elem.find(".address_id").val(data[i]['id']);
				$(".addressShow").children().eq(0).addClass("defaultAddr");
				var defaultaddress = $("<ins class='deftip'>默认地址</ins>");
				$(".addressShow").children().eq(0).find(".default-address.DefaultAddr").append(defaultaddress);
				$(".addressShow").children().click(function(){	
					$(".defaultAddr").removeClass("defaultAddr");
					$(this).addClass("defaultAddr");
					var provice = $(this).find(".province").html();
					var city = $(this).find(".city").html();
					var area = $(this).find(".dist").html();
					var detail = $(this).find(".dist").html();
					var ordername = $(this).find(".buy-user").html();
					var phone = $(this).find(".buy-phone").html();
					var address_id = $(this).find("input[name=address_id]").val();
					$(".buy-footer-address").find(".province").html(provice);
					$(".buy-footer-address").find(".city").html(city);
					$(".buy-footer-address").find(".dist").html(area);
					$(".buy-footer-address").find(".street").html(detail);
					$(".buy-footer-address").find(".buy-user").html(ordername);
					$(".buy-footer-address").find(".buy-phone").html(phone);
					$(".buy-footer-address").find(".buy-phone").html(phone);
					$(".box").find(".address").val(address_id);
				})

				$(".buy-footer-address").find(".province").html($(".addressShow").children().eq(0).find(".province").html());
				$(".buy-footer-address").find(".city").html($(".addressShow").children().eq(0).find(".city").html());
				$(".buy-footer-address").find(".dist").html($(".addressShow").children().eq(0).find(".dist").html());
				$(".buy-footer-address").find(".street").html($(".addressShow").children().eq(0).find(".street").html());
				$(".buy-footer-address").find(".buy-user").html($(".addressShow").children().eq(0).find(".buy-user").html());
				$(".buy-footer-address").find(".buy-phone").html($(".addressShow").children().eq(0).find(".buy-phone").html());
				$(".box").find(".address").val($(".addressShow").children().eq(0).find("input[name=address_id]").val());
			})(j)
		}
		}
		
	},
	"json"
);
}

//删除地址
function deleteAddress(self) {
	if(confirm("是否删除？")) {
		var father = $(self).parents().eq(1);
		var address_id = $(father).find("input[name=address_id]").val();
		$.post(
			"../php/deleteAddress.php",
			"address_id=" + address_id,
			function(msg) {
				if(msg == "success") {
					$(father).remove();
				}
			}

		)
	}	
}

//编辑地址
function updateAddress(self) {
	$(document).ready(function($) {

		var $ww = $(window).width();
		//禁止遮罩层下面的内容滚动
		$(document.body).css("overflow","hidden");			
		$('.theme-popover-mask').show();
		$('.theme-popover-mask').height($(window).height());
		$('.theme-popover').slideDown(200);
				
	})

}