// 
// jQuery スクリプト
// 

if (typeof jQuery === 'undefined') {
    throw new Error('Requires jQuery');
}

// HTMLの解析が終わった時点で実行
jQuery(document).ready(function() {
    // 最上部に固定されるヘッダーの縦幅
    var affixHeight;
    
    // indexページかどうかで分岐
    if (jQuery('#affix_zone1_index').length && jQuery('#affix_zone2_index').length) {
        // indexページではタイトルバーを常に固定し、メニューバーをスクロール後固定
        var affixZone1 = jQuery('#affix_zone1_index');
        var affixZone2 = jQuery('#affix_zone2_index');
        
        var wrapHeader1 = affixZone1.children('#wrap_header1');
        var wrapHeader2 = affixZone2.children('#wrap_header2');
        
	var header = wrapHeader1.children('header');
	var mainMenu = wrapHeader2.children('main_menu');

        affixHeight = wrapHeader1.height() + wrapHeader2.height();
        
	// upRange: 上へのスクロール範囲, affixedTop: 固定される位置
        var upRange2 = wrapHeader2.offset().top - wrapHeader1.height();
        var affixedTop2 = wrapHeader1.height().toString() + 'px';

	// スクロールイベントに応じて実行される
	var floatHeader = function() {
	    // タイトルバーを固定
	    wrapHeader1.css({'position':'fixed', 'top':'0px', 'z-index':'2'});
            
	    // スクロール量がupRangeを超えたらメニューバーを固定
            if (jQuery(window).scrollTop() > upRange2) {
                wrapHeader2.css({'position':'fixed', 'top':affixedTop2, 'z-index':'1'});
            }
            else {
                wrapHeader2.css({'position':'static', 'top':'', 'z-index':''});
            }
        }
        
	// スクロールイベントに応じてfloatHeaderを実行
	jQuery(window).scroll(floatHeader);
        jQuery('body').bind('touchmove', floatHeader);
    }
    else {
        // indexページ以外ではタイトルバーとメニューバーを常に固定
        var affixZone1 = jQuery('#affix_zone1');
        var affixZone2 = jQuery('#affix_zone2');
        
        var wrapHeader1 = affixZone1.children('#wrap_header1');
        var wrapHeader2 = affixZone2.children('#wrap_header2');
        
        affixHeight = wrapHeader1.height() + wrapHeader2.height();
        
        var affixedTop2 = wrapHeader1.height().toString() + 'px';
        
        // スクロールイベントに応じて実行される
        var floatHeader = function() {
            // タイトルバーとメニューバーを固定
            wrapHeader1.css({'position':'fixed', 'top':'0px', 'z-index':'2'});
            wrapHeader2.css({'position':'fixed', 'top':affixedTop2, 'z-index':'1'});
        }

        // スクロールイベントに応じてfloatHeaderを実行
        jQuery(window).scroll(floatHeader);
        jQuery('body').bind('touchmove', floatHeader);
    }
    
    // 同一ページ内のアンカーリンク(href="#...")時に滑らかなスクロール
    jQuery("a[href *= '#']").click(function() {
        var id = jQuery(this).attr('href').split('#');
        var target = jQuery('#' + id[id.length - 1]);
        if(target.length){
            var targetTop = target.offset().top - affixHeight - 30;
            jQuery('html, body').animate({scrollTop:targetTop}, 600, 'swing');
        }
    });
    
    // ダッシュボードのロールオーバー
    jQuery('.dashboard-panel').hover(function() {
        jQuery(this).children('img').stop(false, false).fadeTo('fast', 0.9);
    }, function() {
        jQuery(this).children('img').stop(false, false).fadeTo('fast', 0.4);
    });
});

//画像などが完全に表示されてから実行
jQuery(window).on('load', function() {
    // 最上部に固定されるヘッダーの縦幅
    var affixHeight;
    
    // affixHeight取得
    if (jQuery('#affix_zone1_index').length && jQuery('#affix_zone2_index').length) {
        var affixZone1 = jQuery('#affix_zone1_index');
        var affixZone2 = jQuery('#affix_zone2_index');
        
        var wrapHeader1 = affixZone1.children('#wrap_header1');
        var wrapHeader2 = affixZone2.children('#wrap_header2');
        
        affixHeight = wrapHeader1.height() + wrapHeader2.height();
    }
    else {
        var affixZone1 = jQuery('#affix_zone1');
        var affixZone2 = jQuery('#affix_zone2');
        
        var wrapHeader1 = affixZone1.children('#wrap_header1');
        var wrapHeader2 = affixZone2.children('#wrap_header2');
        
        affixHeight = wrapHeader1.height() + wrapHeader2.height();
    }
    
    // 異なるページ間のアンカーリンク(href="*.html?id=...")時に滑らかなスクロール
    var url = jQuery(location).attr('href');
    if(url.indexOf("?id=") != -1){
        var id = url.split("?id=");
        var target = jQuery('#' + id[id.length - 1]);
        if(target.length){
            var targetTop = target.offset().top - affixHeight - 30;
            jQuery('html, body').animate({scrollTop:targetTop}, 600, 'swing');
        }
    }
});

jQuery(window).resize(function() {
    var header = jQuery('#header');
    var mainMenu = jQuery('#main_menu');
    
    var minWidth = jQuery('#wrap').style.minWidth;
    var windowWidth = jQuery(window).width();
    
    if (minWidth >= windowWidth) {
        header.css({'margin':'0px'});
	mainMenu.css({'margin':'0px'});
    }
    else {
        header.css({'margin':'0px auto'});
	mainMenu.css({'margin':'0px auto'});
    }
});
