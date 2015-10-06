/* global $ */
console.log('content.js loaded');

var app = function() {
	var codeBlocks = $('pre > code').filter(function() { return this.innerHTML.length > 20});
	var codeBlocksElementsArray = jQuery.makeArray(codeBlocks);
	var selectedIndex;
	console.log('found ' + codeBlocks.length + ' code blocks');
	
	function selectText(elem) {
		//console.log(elem)
		var doc = document
			, text = elem
			, range
			, selection
		;    
		
		$('html,body').animate({ scrollTop: $(elem).offset().top - ( $(window).height() - $(elem).outerHeight(true) ) / 2  }, 200);
		
		if (doc.body.createTextRange) {
			range = document.body.createTextRange();
			range.moveToElementText(text);
			range.select();
		} else if (window.getSelection) {
			selection = window.getSelection();        
			range = document.createRange();
			range.selectNodeContents(text);
			selection.removeAllRanges();
			selection.addRange(range);
		}
	}

	if (codeBlocksElementsArray.length > 0)
	{
		$(document).on('keydown', null, 'ctrl+]', function() {
			
			if (selectedIndex == undefined)
				selectedIndex = 0;
			else
				selectedIndex++;
				
			if (selectedIndex == codeBlocks.length)
				selectedIndex = 0;
				
			console.log(selectedIndex);
			selectText(codeBlocksElementsArray[selectedIndex]);
		});
		
		$(document).on('keydown', null, 'ctrl+[', function() {
			if (selectedIndex == undefined)
				selectedIndex = 0;
			else
				selectedIndex--;
				
			if (selectedIndex < 0)
				selectedIndex = codeBlocks.length - 1;
				
			console.log(selectedIndex);
			selectText(codeBlocksElementsArray[selectedIndex]);
		});
	}
	
};

$(app);



