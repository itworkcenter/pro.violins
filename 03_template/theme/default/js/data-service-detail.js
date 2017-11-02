$(function() {
	browse_files("#browse_wrapper");
	
	$("#search_form .btn-search").click(function(){
		do_search();
	});
	
	
	$("#tool_form .btn-search").click(function(){
		do_tool();
	});
	
	
});


function browse_files(obj) {
	$("#browse_wrapper").empty().html('<div class="loader"></div>');
	
	var request_url = $(obj).attr('data-url');
	var base_url = request_url.replace("?output=json", "");
	
	$.getJSON( request_url, function( data ) {
		var html = '';
		
		$.each( data.nodes, function( key, val ) {
			html += '<div class="file">'+
				'<a href="#" class="open-folder" data-url="' + base_url + '/' + val.name + '/?output=json">'+
					'<div class="file-inner">'+
						'<div class="file-title">'+val.name+'</div>';
						
			$.each( val.attributes, function( key1, val2 ) {
				html += '<div class="filed-date">'+val2.name+' '+val2.value+'</div>';
			});
			
			html += '</div>'+
				'</a>'+
			'</div>';
		});
		
		
		$.each( data.leaves, function( key, val ) {
			html += '<div class="file">'+
				'<div class="file-inner">'+
						'<div class="file-title">'+val.name+'</div>';
						
			$.each( val.attributes, function( key1, val2 ) {
				html += '<div class="filed-date">'+val2.name+' '+val2.value+'</div>';
			});
			
			html += '</div>'+
			'</div>';
		});
		
		$("#browse_wrapper").empty().html(html);
		
		
		$(".open-folder").click(function(){
			browse_files(this);
		});
	});
}

function do_search() {
	$("#search_wrap").empty().html('<div class="loader"></div>');
	
	var request_url = $("#search_form").attr('action');
	
	$.getJSON( request_url, function( data ) {
		var html = '';
		
		$.each( data.result, function( key, val ) {
			html += '<div class="search-result">'+
				'<div class="search-result-body">'+
					'<div class="search-result-title">' + val.id + '</div>'+
					'<div class="search-result-info">'+
						'<p>Path: ' + val.path + '</p>'+
						'<p>Size: ' + val.width + ' x ' + val.width + '</p>'+
					'</div>'+
				'</div>'+
			'</div>';
		});
		
		$("#search_wrap").empty().html(html);
	});
}

function do_tool() {
	$("#tool_wrap").empty().html('<div class="loader"></div>');
	
	var request_url = $("#tool_form").attr('action');
	
	$.getJSON( request_url, function( data ) {
		var html = '';
		
		var obj_list = jQuery.parseJSON(data.result.stdout);
		
		$.each(obj_list.items, function( key, val ) {
			html += '<div class="search-result">'+
				'<div class="search-result-body">'+
					'<div class="search-result-title">Incident Serial Number: ' + val.incidentSerialNumber + '</div>'+
					'<div class="search-result-info">'+
						'<p>Incident Address: ' + val.incidentAddress + '</p>'+
						'<p>Incident Status: ' + val.incidentStatus + '</p>'+
					'</div>'+
				'</div>'+
			'</div>';
		});
		
		$("#tool_wrap").empty().html(html);
	});
}
