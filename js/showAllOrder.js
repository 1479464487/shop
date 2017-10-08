function getOrder(page) {
	$("#success").html("");
	$.post(
	"../php/showAllOrder.php",
	{
		"page":page,
	},
	function(info) {
		var data = info.info;
		// console.log(data);
		for(var j in data) {
			(function(i) {
				var elem = $("#success").append('<div class="order-left"><ul class="item-list">	<li class="td td-item"style="margin-top:10px;">		<div class="item-pic">			<a href="#" class="J_MakePoint">				<img src="" class="itempic J_ItemImg">			</a>		</div>		<div class="item-info">			<div class="item-basic-info">				<a href="#"><p class="direction"><p class="info-little">颜色：12#川南玛瑙<br/>包装：裸装 </p></p></a></div></div></li><li class="td td-price"><div class="item-price"></div>	</li>	<li class="td td-number"><div class="item-number"><span>×</span ><span class="number"></span></div></li><li class="td td-operation"><div class="item-date"></div></li><li class="td td-operation"><div class="item-status"style="margin-top:0;"></div></li><li class="td td-operation"><div class="item-operation"><a href=""></a></div></li><input type="hidden"name="order_id" /></ul></div>')
				.find(".order-left").last();
				elem.find(".itempic.J_ItemImg").attr("src","../images/" + data[i]['shopimg']);
				elem.find(".direction").html(data[i]['shop_name'] + " " + data[i]['decription']);
				elem.find(".info-little").html("种类：" + data[i]['shop_name'] + "<br/>描述："+data[i]['decription']);
				elem.find(".item-price").html(data[i]['price']);
				elem.find(".number").html(data[i]['count']);
				elem.find(".item-date").html("20" +　data[i]['date']);
				elem.find("input[name='order_id']").val(data[i]['id']);
				var status = elem.find(".item-status").css("cursor","pointer");
				var operation = elem.find(".item-operation").css("cursor","pointer");
				switch(data[i]['status']-0) {
					case 0:
						status.html("未付款");
						operation.html("付款");
						break;
					case 1:
						status.html("已付款");
						operation.html("查看物流");
						break;
					case 2:
						status.html("未发货");
						operation.html("退款 / 提醒发货");
						break;
					case 3:
						status.html("已发货");
						operation.html("查看物流");
						break;
					case 4:
						status.html("已收货");
						operation.html("删除订单");
						break;
					case 5:
						status.html("待评价");
						operation.html("去评价");
						break;
					case 6:
						status.html("已退款");
						operation.html("查看账单");
						break;
					case 7:
						status.html("已评价");
						operation.html("删除订单");
						break;
					case 8:
						status.html("取消订单");
						operation.html("删除订单");
						break;	
					default:
						status.html("未付款");
						operation.html("付款");
						break;
				}

				operation.click(function() {
					switch(operation.html()) {
						case "删除订单":
							deleteOrder($(this));
							break;
						case "付款":
							pay($(this));
							break;
						case "去评价":
							var order_id = $(this).parents(".item-list").find("input[name='order_id']").val();
							window.location.href = "comment.html?order_id = "+order_id;
							break;
						case "退款 / 提醒发货":
							quitMoney($(this));
							break;
					}
				})
			})(j);
			
		}
		$("#page").empty();
		var start = Math.floor(page/5) +1;
			var stop = start + 5;
			for(var i = start;i <= stop && i<= info.pagenum;i++) {
				var num = $("<a ></a>").html(i).attr("href","javascript:getOrder("+i+")");					
				$("#page").append(num);
				var pag = $("#page a");
				pag.click(function() {
					$('.clicked').removeClass("clicked");
					$(this).addClass("clicked");
				});
			}
	},
	"json"
	)
}

//删除订单
function deleteOrder(self) {
	var order_id = $(self).parents(".item-list").find("input[name='order_id']").val();
	if(confirm("是否删除？")) {
		$.post(
			"../php/deleteOrder.php",
			"order_id = "+ order_id,
			function(msg) {
				console.log(msg);
				if(msg == "success") {
					$(self).parents(".order-left").remove();
				}else {
					alert("删除失败！");
				}
			}
		)
	}
}

//付款操作
function pay(self) {
	var father = $(self).parents(".item-list");
	var order_id = $(father).find("input[name='order_id']").val();
	var count = $(father).find(".number").html();
	var price = $(father).find(".item-price").html();
	var total = (count*price).toFixed(2);
	var pass = prompt("请输入支付密码！");
	if(pass) {
		$.post(
			"../php/payPass.php",
			"pass="+pass,
			function(msg) {
				if(msg == "success") {
					payPost(order_id,total);
				}else if(msg == "error") {
					alert("密码错误！");
				}
			}
		);
	} 
}

function payPost(order_id,total) {
	$.post(
		"../php/pay.php",
		{
			"order_id": order_id,
			"total":total
		},
		
		function(msg) {
			console.log(msg);
			if(msg == "money not enough") {
				alert("余额不足,请充值！");
			}else if(msg == "success") {
				alert("付款成功！");
				$(father).find(".item-status").html("已付款");
				$(this).html("查看物流");
			}else if(msg == "error") {
				alert("付款失败！");
			}
		}
	)
}
//退款
function quitMoney(self) {
	var father = $(self).parents(".item-list");
	var order_id = $(father).find("input[name='order_id']").val();
	var count = $(father).find(".number").html();
	var price = $(father).find(".item-price").html();
	var total = (count*price).toFixed(2);

	$.post(
		"../php/quitMoney.php",
		{
			"order_id": order_id,
			"total":total
		},
		
		function(msg) {
			console.log(msg);
			if(msg == "success") {
				alert("退款成功！");
				$(father).find(".item-status").html("已退款");
				$(this).html("查看账单");
			}else if(msg == "error") {
				alert("付款失败！");
			}
		}
	)	
}
getOrder(1);
		