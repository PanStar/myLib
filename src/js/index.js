 var varStr = '';
 var rootUrl = 'doc/';
 function init(FILEDATA){
	createIndex(FILEDATA);
	initEvent();
	$('.node').slideUp(0);
	$('#Root-1').slideDown(0);
	//$('#Root-1').children('.node-title').slideUp(0);
	$('#Root-1').children('.node-title').click();
 }
 function initEvent(){
	$('.node-title').on("click",function(){
		var checkbox = $(this).find('input[type="checkbox"]');
		var children = checkbox.parent().siblings('div');
		var checked = checkbox.prop('checked');
		console.log(checked);
		checkbox.prop("checked", !checked);
		( checked ) ? children.slideUp(500):children.slideDown(500);
	});
 }
 function createIndex(FILEDATA){
	var data = FILEDATA;
	var html = getIndexHTML(data);
	$('#index').html(html);
}
//Obj To HTML
function getIndexHTML(data,name,deep){
	if(!name){name='Root';}
	if(!deep){deep=0};++deep;
	var html='';
	if(data.constructor == Object){
		var id = name+'-'+deep;
		html = '<div class="node" id="'+id+'">'+
				'<div class="node-title">'+
					'<input type="checkbox">'+
					'<label>'+name+'</label>'+
				'</div>';
		for(obj in data){
			html+=getIndexHTML(data[obj],obj,deep);
		}
		html+='</div>';
	}else{
		//html = '<li><a href="javascript:window.open(\''+data+'\', \'_blank\');">'+name+'</a></li>';
		html = '<div class="node"><div class="node-title"><a href="javascript:openWindow(\''+data+'\');" title="'+name+'&#10;'+data+'">'+name+'</a></div></div>';
	}
	return html;
}
//Obj To List
function getObj(data){
	var result=data;
	var isLeaf=true;
	if(data.constructor == Object){
		isLeaf=false;
		result = new Array();
		for(obj in data){
			result.push(getObj(data[obj]));
		}
	}
	return {'list':result,'isLeaf':isLeaf};
}
//String to Json
function formatData(data){
	//data = {'Note':{'eastcom':{'note':'eastcom'},'CSS':'Note/CSS.js'},'Demo':{'MapABC_拾取坐标':'Demo/MapABC_拾取坐标.html','MapABCDEMO':'Demo/MapABCDEMO.html','表格奇偶行变色':'Demo/表格奇偶行变色.html','表格多行多列':'Demo/表格多行多列.html','检测浏览器版本':'Demo/检测浏览器版本.html','渐渐消失':'Demo/渐渐消失.html','拉框查询':'Demo/拉框查询.html','MapABC_自定义弹出框':'Demo/MapABC_自定义弹出框/index.html','侧边栏切换效果':'Demo/侧边栏切换效果/index.html','侧边栏展开-手风琴效果':'Demo/侧边栏展开-手风琴效果/index.html','可自动完成的搜索输入下拉框':'Demo/可自动完成的搜索输入下拉框/index.html','CSS3发光呼吸字':'Demo/CSS3发光呼吸字.html'},'Blog(Marker)':{'muou':{'杭州到仙居 汽车票':'http://www.changtu.com/chepiao/hangzhoushi-xianjuxian.html?day=1&endId=A-690409'},'Coder':{'html字符串转义':'http://blog.csdn.net/wusuopubupt/article/details/8817826'},'API':{'jQuery 中文API':'http://www.jquery123.com/'},'书签':'Marks/bookmarks_16_6_17.html'}};
	//var FILEDATA = ['a.json','Demo','Demo/CSS3发光呼吸字.html','Demo/Js','D
	var json = {}, folderMap = {"": {}};
	
	data.forEach(i => {
		if(/(\S)+\.(\S)+$/.test(i)){//如果是文件
			var arr = i.split('/');
			var filename = i;
			if(arr.length > 1){
				filename = arr[arr.length-1];
			}
			var name = filename.replace(/\.(\S)+$/,'');
			folderMap[i.replace(filename,'').replace(/\/$/,'')][name] = i;
		}else{//如果是文件夹
			folderMap[i] = {};
		}
	})
	for(key in folderMap){
		var arr = key.split('/');
		if(/\//.test(key)){
			eval('json["'+key.replace(/\//g,'"]["') + '"] = folderMap[key]')
		}else{
			json[key] = folderMap[key]
		}
	}
	delete json[""]
	return json;
}
function openWindow(url){
	if(url.startsWith('http')){
		window.open(url, '_blank');
	}else if(url.endsWith('.js')){
		$('.st-content').html($($('#template').html()));
		var val = url.substring(0,url.length-3);
		varStr = val.replace(new RegExp('/','g'),'_');
	}else{
		$('.st-content').html('<iframe class="content" src=\''+rootUrl+url+'\'></iframe>');
	}
}