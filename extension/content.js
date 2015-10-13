/* global $ */
(function () {
	var log = function (msg) {
		//console.log(msg)
	}
	
	log('content.js loaded');
	var codeBlocks;
	var selectedIndex;
	var initialized = false;
	var codeBlocksElementsArray

	
	function hereDoc(f) {
  		return f.toString().
      		replace(/^[^\/]+\/\*!?/, '').
      		replace(/\*\/[^\/]+$/, '');
	}

	var styleTag = hereDoc(function() {/*!
	<style>
		.codebindleStatus {
		width:100px;
		height:10px;
		height:auto;
		position:absolute;
		right: 100px;
		background-color: #383838;
		color: #F0F0F0;
		font-family: Calibri;
		font-size: 16px;
		padding:5px;
		text-align:center;
		border-radius: 1px;
		-webkit-box-shadow: 0px 0px 24px -1px rgba(56, 56, 56, 1);
		-moz-box-shadow: 0px 0px 24px -1px rgba(56, 56, 56, 1);
		box-shadow: 0px 0px 24px -1px rgba(56, 56, 56, 1);
	}
	</style>
	*/
	})
	
	function addStyleTag() {
		//$(styleTag).appendTo("head")
	};
	
	function init() {
		if (!initialized) {
			codeBlocks = $('code').filter(function () { return this.innerHTML.length > 20 });
			if (codeBlocks.length == 0) {
				codeBlocks = $('pre').filter(function () { return this.innerHTML.length > 20 });
				log('no code blocks - switching to "pre"');
			}
			codeBlocksElementsArray = $.makeArray(codeBlocks);
			log('found ' + codeBlocks.length + ' blocks');
			addStyleTag();
		}
		initialized = true;
	}

	function selectText(elem) {
		//console.log(elem)
		var doc = document
			, text = elem
			, range
			, selection
			;    
		
		// scroll to element
		$('html,body').animate({ scrollTop: $(elem).offset().top - ($(window).height() - $(elem).outerHeight(true)) / 2 }, 200);

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

	var showStatus = function (index) {
		//var status = $("<div class='codebindleStatus' style=' '>" + index + "</div>").appendTo("body");
		//$('.codebindleStatus').fadeIn(400).delay(3000).fadeOut(400);
	}

	$(document).on('keydown', null, 'ctrl+]', function () {
		init();
		if (selectedIndex == undefined)
			selectedIndex = 0;
		else
			selectedIndex++;

		if (selectedIndex == codeBlocks.length)
			selectedIndex = 0;

		log(selectedIndex);
		selectText(codeBlocksElementsArray[selectedIndex]);
		showStatus(selectedIndex);
	});

	$(document).on('keydown', null, 'ctrl+[', function () {
		init();
		if (selectedIndex == undefined)
			selectedIndex = 0;
		else
			selectedIndex--;

		if (selectedIndex < 0)
			selectedIndex = codeBlocks.length - 1;

		log(selectedIndex);
		selectText(codeBlocksElementsArray[selectedIndex]);
		showStatus(selectedIndex);
	});

	
	
})();


