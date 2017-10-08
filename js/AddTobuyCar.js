// 设置cookie
		// 1.设置cookie
		// 2.删除cookie   expires = -1
		function setCookie(name,value,expires = null){
			if(expires){
				var d = new Date();
				d.setTime(d.getTime() + expires);
				expires = d.toGMTString();
			}
			document.cookie = name+"="+value+";expires="+expires+";path=/";
		}
		// setCookie("id","123");
		// setCookie("name","123");
		// setCookie("sex","123");

		// 读取cookie
		function getCookie(name){
			var str = document.cookie;
			var reg = /[a-zA-Z\d]+=[",\{\}:a-zA-Z\d]+/g;
			var arr = str.match(reg);
			if(!arr){
				return false;
			}
			for(var i=0;i<arr.length;i++){
				var keyValue = arr[i].split("=");
				if(name == keyValue[0]){
					return keyValue[1];
				}
			}
			return false;
		}

	function addToBuyCar(id,count){
		id = parseInt(id);
		count = parseInt(count);
		//读取购物车
		var buyCar = getCookie("buyCar");
		// 首次添加商品
		if(!buyCar){
			var object = {}; 
			object[id] = count;
		}else{
			// JSON转对象
			var object = JSON.parse(buyCar);
			// 商品是否已存在
			if(object[id]){
				object[id] += count;
			}else{
				object[id] = count;
			}
		}
		var str = JSON.stringify(object);
		setCookie("buyCar",str);
		
		alert("加入成功");
		console.log(getCookie("buyCar"));
	}